"use client";

import { useEffect, useRef } from "react";

/**
 * Cursor-following robot — direct port of the live temp page's
 * GazePortrait (main:src/components/GazePortrait.tsx), the mechanism and
 * footage that are proven in production on andrewmarks.net.
 *
 * The atlas is the temp page's /atlas.jpg — 81 frames of the original
 * robot video in a 9x9 sheet, one continuous head sweep with natural
 * blinks baked in — upscaled 4x with Real-ESRGAN (realesr-animevideov3,
 * the temporally-stable video model; approved by Andrew 2026-07-14),
 * keyed to transparency at 1024px, and rebuilt at 512px cells — then
 * given an HD pass (2026-07-16, scripts/upscale-live2-atlas.py): every
 * cell re-run through ESRGAN and re-cut at 1024px, and the canvas buffer
 * sized to device pixels, because a fixed small buffer stretched by the
 * compositor reads as blur no matter how good the atlas is.
 * Mouse X maps straight to a frame index with 0.35 smoothing plus a
 * slow sinusoidal idle drift; frames render on a canvas with a 1px
 * source inset. Nothing else — no graph, no grid, no dissolve.
 * Tracking constants are verbatim from the live page.
 *
 * DRAWING PIPELINE (2026-07-30, film regression #2 postmortem): the
 * canvas never draws from the sheet <img> directly anymore. Measured on
 * Andrew's Intel UHD iGPU at DPR 2.5: the FIRST drawImage from a sheet
 * is a 350-430ms (SD) / 530-690ms (HD) main-thread longtask — 1.3s
 * under load — because Chrome lazily re-rasterizes the WHOLE decoded
 * sheet at first use, and every timing home we gave that stall (hydration,
 * text beat, post-typing) just moved the freeze onto a different beat
 * (regressions #1 and #2). And createImageBitmap(<img>, crop) is no
 * escape: Chromium runs it synchronously ON the main thread and
 * re-decodes the full sheet per call (image_element_base.cc routes only
 * SVG sources async; image_bitmap.cc builds a fresh ImageDecoder every
 * time — verified against Chromium main, 2026-07-29). So a dedicated
 * Worker fetches the sheet as a Blob, decodes it ONCE off-main, and
 * slices lazily-requested buf-sized per-frame ImageBitmaps that transfer
 * back zero-copy. Each frame is then a ≤4MB texture uploaded in ~1-3ms
 * on first draw — no monolithic texture, no full-sheet raster on the
 * main thread, ever. Frames cache in a byte-budgeted LRU (all 81 fit at
 * mobile sizes for less memory than the old SD sheet). Browsers without
 * Worker/createImageBitmap keep the legacy whole-sheet path.
 */

const ATLAS_HD_SRC = "/hero/robot-atlas-live2-hd.webp";
const ATLAS_SD_SRC = "/hero/robot-atlas-live2.webp";
const COLS = 9;
const ROWS = 9;
const TOTAL = COLS * ROWS;
const FRAME_HD = 1024;
const FRAME_SD = 512;
const CENTER = Math.round(0.5 * (TOTAL - 1));

/* The slicer worker. Strictly sequential: one job at a time, so a sheet
 * swap can never close a bitmap a slice is still reading. Sheet jobs
 * jump the queue; slice jobs run newest-first so the frame the gaze
 * wants NOW never waits behind a stale sweep. Slices resize to the
 * canvas buffer when the engine honors resize options; otherwise the
 * raw cell transfers and the main thread scales at draw time (same
 * small texture either way).
 * The decoded sheet (85MB SD / 340MB HD of raw pixels) self-releases
 * after 4s without slice requests — unlike Chrome's image cache it is
 * NOT browser-evictable, so holding it for the page's life would pin
 * more memory than the old path. The compressed Blob stays as the
 * re-decode source; a request after release just pays the off-thread
 * decode again as latency (cached frames keep drawing meanwhile). */
const WORKER_SRC = `
let sheet = null, cell = 0, buf = 0, blob = null;
const jobs = [];
let busy = false;
let idleTimer = 0;
const armIdle = () => {
  clearTimeout(idleTimer);
  idleTimer = setTimeout(() => {
    if (sheet) { sheet.close(); sheet = null; }
  }, 4000);
};
async function pump() {
  if (busy) return;
  busy = true;
  while (jobs.length) {
    const si = jobs.findIndex((j) => j.type === "sheet");
    const job = si >= 0 ? jobs.splice(si, 1)[0] : jobs.pop();
    if (job.type === "sheet") {
      try {
        const bm = await createImageBitmap(job.blob);
        if (sheet) sheet.close();
        sheet = bm;
        blob = job.blob;
        cell = job.cell;
        buf = job.buf;
        postMessage({ type: "ready", tier: cell });
      } catch (e) {
        postMessage({ type: "sheetfail" });
      }
    } else {
      if (job.tier !== cell) {
        postMessage({ type: "drop", idx: job.idx, tier: job.tier });
        continue;
      }
      try {
        if (!sheet) sheet = await createImageBitmap(blob);
      } catch (e) {
        postMessage({ type: "fail", idx: job.idx, tier: job.tier });
        continue;
      }
      const sx = (job.idx % ${COLS}) * cell + 1;
      const sy = ((job.idx / ${COLS}) | 0) * cell + 1;
      try {
        let bm;
        try {
          bm = await createImageBitmap(sheet, sx, sy, cell - 2, cell - 2, {
            resizeWidth: buf, resizeHeight: buf, resizeQuality: "high",
          });
        } catch (e) {
          bm = await createImageBitmap(sheet, sx, sy, cell - 2, cell - 2);
        }
        postMessage({ type: "frame", idx: job.idx, tier: cell, bitmap: bm }, [bm]);
      } catch (e) {
        postMessage({ type: "fail", idx: job.idx, tier: job.tier });
      }
    }
  }
  busy = false;
  armIdle();
}
onmessage = (e) => {
  clearTimeout(idleTimer);
  jobs.push(e.data);
  pump();
};
`;

export default function HeroGaze({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Buffer at real device resolution, capped at the source cell size —
    // the page is laid out (hidden, not display:none) under the boot
    // film, so the rect is measurable here.
    const dpr = window.devicePixelRatio || 1;
    const cssSize = canvas.getBoundingClientRect().width || FRAME_HD;
    const buf = Math.min(FRAME_HD, Math.max(64, Math.round(cssSize * dpr)));
    canvas.width = buf;
    canvas.height = buf;
    ctx.imageSmoothingQuality = "high";

    /* Perf pass 2026-07-29: buffers at or below 512px are pixel-identical
       from the original 512-cell sheet at a quarter of the raster, so HD
       is reserved for buffers that can actually resolve it. */
    const wantHD = buf > FRAME_SD;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    // 2026-07-30 (Andrew): the autonomous looking-around gaze (2026-07-29)
    // was choppy on real phones. Touch devices now show the static resting
    // pose instead — Hero.module.css swaps the canvas background to
    // /hero/robot-static.webp at (hover: none), pixel-matched to the
    // inline placeholder beneath it — and skip the atlas, the worker and
    // the rAF loop entirely: 42KB instead of a 1.6MB sheet.
    if (window.matchMedia("(hover: none)").matches) return;

    let mouse = 0.5;
    let smooth = 0.5;
    let lastIdx = -1;
    let animationFrameId = 0;
    let alive = true;
    let started = false;
    let running = false;

    // ---- bitmap pipeline state ----
    let mode: "bitmap" | "sheet" = "sheet";
    let worker: Worker | null = null;
    let currentTier = 0; // cell size the worker has confirmed 'ready'
    const bitmaps = new Map<number, { bm: ImageBitmap; tier: number }>();
    const pendingKey = new Set<string>();
    let drawnIdx = -1;
    let drawnTier = 0;
    let sliceFailures = 0;
    // Byte-budgeted LRU (~128MB ceiling): all 81 frames fit at buf<=645
    // (small windows — cheaper than the old resident SD sheet); 32
    // entries at buf=1024. Unlike the old monolith, ImageBitmaps are
    // page-owned and NOT browser-evictable, so the cap is load-bearing,
    // not polish. (Touch devices never reach this pipeline — they show
    // the static pose, see the hover:none return above.)
    const MAX_BITMAPS = Math.max(
      8,
      Math.min(TOTAL, Math.floor((128 << 20) / (buf * buf * 4))),
    );

    // ---- legacy sheet path (no-Worker browsers, or slicing failed) ----
    let atlas = new Image();
    let frame = FRAME_SD; // cell size of the legacy sheet
    let legacyStarted = false;
    let lastSrc = "";

    const drawFromSheet = (idx: number) => {
      const col = idx % COLS;
      const row = Math.floor(idx / COLS);
      ctx.clearRect(0, 0, buf, buf);
      ctx.drawImage(
        atlas,
        col * frame + 1, row * frame + 1, frame - 2, frame - 2,
        0, 0, buf, buf,
      );
      drawnIdx = idx;
      drawnTier = frame;
    };
    const drawBitmap = (idx: number) => {
      const e = bitmaps.get(idx);
      if (!e) return;
      ctx.clearRect(0, 0, buf, buf); // frames are alpha-keyed
      ctx.drawImage(e.bm, 0, 0, e.bm.width, e.bm.height, 0, 0, buf, buf);
      drawnIdx = idx;
      drawnTier = e.tier;
      bitmaps.delete(idx); // LRU touch
      bitmaps.set(idx, e);
    };
    const lruSet = (idx: number, entry: { bm: ImageBitmap; tier: number }) => {
      bitmaps.delete(idx);
      bitmaps.set(idx, entry);
      while (bitmaps.size > MAX_BITMAPS) {
        let evicted = false;
        for (const key of bitmaps.keys()) {
          if (key === lastIdx || key === drawnIdx) continue;
          if (key === CENTER && !started) continue;
          bitmaps.get(key)?.bm.close();
          bitmaps.delete(key);
          evicted = true;
          break;
        }
        if (!evicted) break;
      }
    };
    const nearestSliced = (idx: number) => {
      for (let d = 1; d < TOTAL; d++) {
        if (bitmaps.has(idx - d)) return idx - d;
        if (bitmaps.has(idx + d)) return idx + d;
      }
      return -1;
    };
    const requestFrame = (idx: number) => {
      if (mode !== "bitmap" || !worker || currentTier === 0) return;
      if (idx < 0 || idx >= TOTAL) return;
      const prev = bitmaps.get(idx);
      if (prev && prev.tier >= currentTier) return;
      const key = idx + ":" + currentTier;
      if (pendingKey.has(key)) return;
      // prefetch throttle; the current frame and the gate-opening center
      // frame always go through
      if (pendingKey.size >= 8 && idx !== lastIdx && idx !== CENTER) return;
      pendingKey.add(key);
      worker.postMessage({ type: "slice", idx, tier: currentTier });
    };
    const draw = (idx: number) => {
      if (mode === "sheet") {
        drawFromSheet(idx);
        return;
      }
      requestFrame(idx);
      if (running) {
        // ±1 prefetch smooths sweeps; gated on the loop actually running
        // so reduced-motion sessions cache exactly one frame
        requestFrame(idx + 1);
        requestFrame(idx - 1);
      }
      const use = bitmaps.has(idx) ? idx : nearestSliced(idx);
      if (use < 0) return; // keep the last painted frame / CSS placeholder
      const e = bitmaps.get(use)!;
      if (use !== drawnIdx || e.tier !== drawnTier) drawBitmap(use);
    };

    let t0 = 0;

    /* Perf pass 2026-07-29: the loop runs only while the canvas is
       (near) the viewport in a visible tab; everything below the hero
       scrolls free of it. */
    let inView = true;
    let pageShown = typeof document !== "undefined" ? !document.hidden : true;

    function tick(now: number) {
      if (!alive || !running) return;
      smooth += (mouse - smooth) * 0.35;
      const drift = Math.sin((now - t0) / 3000) * 0.015;
      const val = Math.max(0, Math.min(1, smooth + drift));
      const idx = Math.round(val * (TOTAL - 1));
      if (idx !== lastIdx) {
        lastIdx = idx;
        draw(idx);
      }
      animationFrameId = requestAnimationFrame(tick);
    }
    const resumeLoop = () => {
      if (running || !started || reduced || !inView || !pageShown || !alive)
        return;
      running = true;
      animationFrameId = requestAnimationFrame(tick);
    };
    const pauseLoop = () => {
      running = false;
      cancelAnimationFrame(animationFrameId);
    };

    const start = () => {
      if (started || !alive) return;
      started = true;
      // First draw is the center frame — pixel-identical to the inline
      // data-URI placeholder painted by CSS since first paint — so
      // dropping the background here is an invisible swap. In bitmap
      // mode start() is only reachable once the center bitmap is
      // resident, so the swap has zero slice latency.
      draw(CENTER);
      canvas.style.background = "none";
      if (reduced) return;
      t0 = performance.now();
      resumeLoop();
    };
    // The first draw (= the placeholder swap) is LATCHED behind both
    // decode AND the film's stationary text beat (or a skip); the inline
    // CSS placeholder — the same center frame — covers the whole wait,
    // so the mask reveal always shows the robot. (Andrew's ask,
    // 2026-07-16.)
    const docEl = document.documentElement;
    let drawGate =
      !docEl.hasAttribute("data-film") ||
      docEl.classList.contains("film-text") ||
      docEl.classList.contains("film-skip");
    let decoded = false;
    const tryStart = () => {
      if (decoded && drawGate) start();
    };

    // ---- loading ----
    // 2026-07-29 (film regression #2): film loads never touch the HD
    // sheet while anything moves — they load the SD sheet (a quarter of
    // the raster) at the text beat, draw from it, and upgrade to HD only
    // after the typewriter has finished, when the page is static and a
    // one-frame hold on the robot's gaze reads as the robot pausing.
    // Plain loads load their real tier immediately, exactly as before.
    let loadStarted = false;
    let upgradeStarted = false;
    let upgradeTimer: ReturnType<typeof setTimeout> | undefined;

    const onSheetDecoded = () => {
      decoded = true;
      if (started && lastIdx >= 0) drawFromSheet(lastIdx);
      else tryStart();
    };
    const legacyLoad = (src: string) => {
      if (legacyStarted || !alive) return;
      legacyStarted = true;
      frame = src === ATLAS_HD_SRC ? FRAME_HD : FRAME_SD;
      atlas.src = src;
      atlas
        .decode()
        .then(onSheetDecoded)
        .catch(() => {
          atlas.onload = onSheetDecoded;
          if (atlas.complete) onSheetDecoded();
        });
    };
    const fallbackToSheet = () => {
      // one-way safety valve: worker construction/slicing failed —
      // re-exposes the legacy whole-sheet path but never a blank robot
      if (!alive || mode === "sheet") return;
      mode = "sheet";
      try {
        worker?.terminate();
      } catch {
        /* already dead */
      }
      worker = null;
      for (const { bm } of bitmaps.values()) bm.close();
      bitmaps.clear();
      pendingKey.clear();
      drawnIdx = -1;
      if (lastSrc) legacyLoad(lastSrc);
    };
    const onWorkerMessage = (e: MessageEvent) => {
      const m = e.data as {
        type: string;
        idx?: number;
        tier?: number;
        bitmap?: ImageBitmap;
      };
      if (!alive) {
        m.bitmap?.close();
        return;
      }
      if (m.type === "ready") {
        currentTier = m.tier!;
        // center gates the placeholder swap; after an HD sheet swap the
        // settled frame re-slices sharp and repaints on arrival
        requestFrame(CENTER);
        if (started && lastIdx >= 0) requestFrame(lastIdx);
        return;
      }
      if (m.type === "frame") {
        pendingKey.delete(`${m.idx}:${m.tier}`);
        const prev = bitmaps.get(m.idx!);
        if (m.tier! < currentTier || (prev && prev.tier >= m.tier!)) {
          m.bitmap!.close(); // stale tier / never downgrade
        } else {
          if (prev) prev.bm.close();
          lruSet(m.idx!, { bm: m.bitmap!, tier: m.tier! });
        }
        if (!decoded && bitmaps.has(CENTER)) {
          decoded = true;
          tryStart();
        }
        if (started && lastIdx >= 0 && bitmaps.has(lastIdx)) {
          const cur = bitmaps.get(lastIdx)!;
          if (drawnIdx !== lastIdx || drawnTier !== cur.tier)
            drawBitmap(lastIdx);
        }
        return;
      }
      if (m.type === "drop") {
        pendingKey.delete(`${m.idx}:${m.tier}`);
        return;
      }
      if (m.type === "fail") {
        pendingKey.delete(`${m.idx}:${m.tier}`);
        if (++sliceFailures > 2) fallbackToSheet();
        return;
      }
      if (m.type === "sheetfail") fallbackToSheet();
    };
    try {
      if (
        typeof Worker === "function" &&
        typeof createImageBitmap === "function"
      ) {
        const url = URL.createObjectURL(
          new Blob([WORKER_SRC], { type: "application/javascript" }),
        );
        worker = new Worker(url);
        URL.revokeObjectURL(url);
        worker.onmessage = onWorkerMessage;
        worker.onerror = () => fallbackToSheet();
        mode = "bitmap";
      }
    } catch {
      worker = null;
      mode = "sheet";
    }

    const beginLoad = (src: string) => {
      if (loadStarted || !alive) return;
      loadStarted = true;
      lastSrc = src;
      if (mode === "bitmap" && worker) {
        const cell = src === ATLAS_HD_SRC ? FRAME_HD : FRAME_SD;
        fetch(src)
          .then((r) => {
            if (!r.ok) throw new Error(String(r.status));
            return r.blob();
          })
          .then((blob) => {
            if (!alive || mode !== "bitmap" || !worker) return;
            worker.postMessage({ type: "sheet", blob, cell, buf });
          })
          .catch(() => fallbackToSheet());
      } else {
        legacyLoad(src);
      }
    };
    const upgradeToHD = () => {
      if (upgradeStarted || !wantHD || !alive) return;
      upgradeStarted = true;
      if (mode === "bitmap" && worker) {
        if (currentTier === FRAME_HD) return;
        fetch(ATLAS_HD_SRC)
          .then((r) => {
            if (!r.ok) throw new Error(String(r.status));
            return r.blob();
          })
          .then((blob) => {
            if (!alive || mode !== "bitmap" || !worker) return;
            worker.postMessage({
              type: "sheet",
              blob,
              cell: FRAME_HD,
              buf,
            });
          })
          .catch(() => {
            /* keep drawing from SD */
          });
      } else {
        if (frame === FRAME_HD) return;
        const hd = new Image();
        hd.src = ATLAS_HD_SRC;
        hd.decode()
          .then(() => {
            if (!alive || mode !== "sheet") return;
            atlas = hd;
            frame = FRAME_HD;
            if (started && lastIdx >= 0) drawFromSheet(lastIdx);
          })
          .catch(() => {
            /* keep drawing from SD */
          });
      }
    };
    const scheduleUpgrade = (delayMs: number) => {
      if (!wantHD) return;
      clearTimeout(upgradeTimer);
      upgradeTimer = setTimeout(() => {
        if (typeof window.requestIdleCallback === "function") {
          window.requestIdleCallback(upgradeToHD, { timeout: 2000 });
        } else {
          upgradeToHD();
        }
      }, delayMs);
    };
    const openDrawGate = () => {
      drawGate = true;
      beginLoad(ATLAS_SD_SRC);
      tryStart();
    };
    const warmTexture = () => {
      if (!alive) return;
      if (mode === "bitmap") {
        // per-frame textures re-upload in ~1-3ms; just repaint the frame
        if (drawnIdx >= 0 && bitmaps.has(drawnIdx)) drawBitmap(drawnIdx);
        return;
      }
      const oc = document.createElement("canvas");
      oc.width = oc.height = 1;
      oc.getContext("2d")?.drawImage(atlas, 0, 0, 1, 1, 0, 0, 1, 1);
    };

    // Perf pass 2026-07-29: pause off-screen and in hidden tabs; on
    // return from another tab, re-warm the (likely evicted) texture at
    // idle so the first visible draw doesn't stall the main thread.
    const io = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        if (inView) resumeLoop();
        else pauseLoop();
      },
      { rootMargin: "160px" },
    );
    io.observe(canvas);
    const onVisibility = () => {
      pageShown = !document.hidden;
      if (!pageShown) {
        pauseLoop();
        return;
      }
      const rewarm = () => {
        warmTexture();
        resumeLoop();
      };
      if (typeof window.requestIdleCallback === "function") {
        window.requestIdleCallback(rewarm, { timeout: 300 });
      } else {
        setTimeout(rewarm, 50);
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    const handleMouseMove = (e: MouseEvent) => {
      mouse = e.clientX / window.innerWidth;
    };
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches[0]) {
        mouse = e.touches[0].clientX / window.innerWidth;
      }
    };

    // The robot is present from first paint but holds its center gaze
    // until the hero's text has finished — then it wakes up and follows
    // the cursor. Plain loads: ~1.6s after navigation (performance.now()
    // is navigation-relative, so late hydration adds no extra wait).
    // Under the boot film: waits for the film's text beat instead (or
    // wakes immediately on skip).
    const FOLLOW_AFTER_NAV_MS = 1600;
    const FOLLOW_AFTER_FILM_TEXT_MS = 1400;
    // HD lands after the typewriter's slowest plausible finish (typing
    // starts at text+1000 and runs ~2.4-3.4s of jittered keystrokes);
    // after a skip everything is already pinned, so only a short breath.
    const HD_AFTER_FILM_TEXT_MS = 5200;
    const HD_AFTER_FILM_SKIP_MS = 1200;
    let followTimer: ReturnType<typeof setTimeout> | undefined;
    const startFollowing = () => {
      window.addEventListener("mousemove", handleMouseMove, { passive: true });
      window.addEventListener("touchmove", handleTouchMove, { passive: true });
    };
    const onFilmText = () => {
      openDrawGate();
      scheduleUpgrade(HD_AFTER_FILM_TEXT_MS);
      followTimer = setTimeout(startFollowing, FOLLOW_AFTER_FILM_TEXT_MS);
    };
    const onFilmSkip = () => {
      openDrawGate();
      scheduleUpgrade(HD_AFTER_FILM_SKIP_MS);
      clearTimeout(followTimer);
      startFollowing();
    };
    if (document.documentElement.hasAttribute("data-film")) {
      if (document.documentElement.classList.contains("film-skip")) {
        // Skipped before hydration: page is pinned to its end state.
        beginLoad(ATLAS_SD_SRC);
        scheduleUpgrade(HD_AFTER_FILM_SKIP_MS);
        startFollowing();
      } else if (document.documentElement.classList.contains("film-text")) {
        onFilmText();
      } else {
        window.addEventListener("am:film-text", onFilmText, { once: true });
        window.addEventListener("am:film-skip", onFilmSkip, { once: true });
      }
    } else {
      // No film this load — fetch the real tier right away; the CSS
      // placeholder covers until the first frame is ready.
      beginLoad(wantHD ? ATLAS_HD_SRC : ATLAS_SD_SRC);
      followTimer = setTimeout(
        startFollowing,
        Math.max(0, FOLLOW_AFTER_NAV_MS - performance.now()),
      );
    }

    return () => {
      alive = false;
      running = false;
      clearTimeout(followTimer);
      clearTimeout(upgradeTimer);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("am:film-text", onFilmText);
      window.removeEventListener("am:film-skip", onFilmSkip);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      try {
        worker?.terminate();
      } catch {
        /* already dead */
      }
      worker = null;
      for (const { bm } of bitmaps.values()) bm.close();
      bitmaps.clear();
      pendingKey.clear();
    };
  }, []);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
