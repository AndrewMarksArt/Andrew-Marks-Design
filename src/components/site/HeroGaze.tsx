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
 */

const ATLAS_HD_SRC = "/hero/robot-atlas-live2-hd.webp";
const ATLAS_SD_SRC = "/hero/robot-atlas-live2.webp";
const COLS = 9;
const ROWS = 9;
const TOTAL = COLS * ROWS;
const FRAME_HD = 1024;
const FRAME_SD = 512;

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

    /* Perf pass 2026-07-29 (Andrew: sluggish page, freeze on tab return).
       The HD sheet is a 9216px image — roughly a 340MB decoded texture —
       and tab switches evict it from the GPU, so the next drawImage
       re-uploaded the whole thing on the main thread's watch. Buffers at
       or below 512px are pixel-identical from the original 512-cell
       sheet at a quarter of the texture, so HD is reserved for buffers
       that can actually resolve it. */
    const frame = buf > FRAME_SD ? FRAME_HD : FRAME_SD;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let mouse = 0.5;
    let smooth = 0.5;
    let lastIdx = -1;
    let animationFrameId = 0;
    let alive = true;

    const draw = (idx: number) => {
      const col = idx % COLS;
      const row = Math.floor(idx / COLS);
      ctx.clearRect(0, 0, buf, buf);
      ctx.drawImage(
        atlas,
        col * frame + 1, row * frame + 1, frame - 2, frame - 2,
        0, 0, buf, buf,
      );
    };

    const atlas = new Image();
    atlas.src = frame === FRAME_HD ? ATLAS_HD_SRC : ATLAS_SD_SRC;

    let t0 = 0;
    let started = false;

    /* Perf pass 2026-07-29: the loop used to run for the life of the
       page — every rAF, hero on-screen or not, tab visible or not, and
       the idle drift forced a giant-atlas drawImage every second or so.
       It now runs only while the canvas is (near) the viewport in a
       visible tab; everything below the hero scrolls free of it. */
    let running = false;
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
      // dropping the background here is an invisible swap. (Without the
      // placeholder, the blank canvas waiting on the 1.6MB atlas read as
      // the robot "blinking in".)
      draw(Math.round(0.5 * (TOTAL - 1)));
      canvas.style.background = "none";
      if (reduced) return;
      t0 = performance.now();
      resumeLoop();
    };
    // decode() rasterizes the 9216px sheet off the main thread, but the
    // ~340MB GPU texture upload happens at the FIRST drawImage — at
    // whatever network-timed moment decode resolves, possibly mid-film.
    // So the first draw (= the placeholder swap) is LATCHED behind both
    // decode AND the film's stationary text beat (or a skip); the inline
    // CSS placeholder — the same center frame — covers the whole wait,
    // so the mask reveal always shows the robot. Once decoded, a 1x1
    // offscreen draw during film downtime pre-warms the texture so the
    // gated swap costs nothing. Plain loads (no film) draw on decode,
    // exactly as before. (Andrew's ask, 2026-07-16.)
    const docEl = document.documentElement;
    let drawGate =
      !docEl.hasAttribute("data-film") ||
      docEl.classList.contains("film-text") ||
      docEl.classList.contains("film-skip");
    let decoded = false;
    const tryStart = () => {
      if (decoded && drawGate) start();
    };
    const openDrawGate = () => {
      drawGate = true;
      tryStart();
    };
    const warmTexture = () => {
      if (!alive) return;
      const oc = document.createElement("canvas");
      oc.width = oc.height = 1;
      oc.getContext("2d")?.drawImage(atlas, 0, 0, 1, 1, 0, 0, 1, 1);
    };
    const onDecoded = () => {
      decoded = true;
      // 2026-07-29 (film regression, caught by Andrew): NO pre-text
      // warming while the film gate is closed. The idle-warm assumed the
      // slow HD decode always resolved during film downtime — the SD
      // sheet decodes fast enough to land the ~85MB texture upload right
      // on the mark's spin (beats A-B froze; plus appeared late, unspun).
      // The upload now rides start() at the film's stationary text beat,
      // exactly where the 2026-07-16 design put the gated swap. Plain
      // loads (gate already open) start immediately, as before.
      tryStart();
    };
    atlas
      .decode()
      .then(onDecoded)
      .catch(() => {
        atlas.onload = onDecoded;
        if (atlas.complete) onDecoded();
      });

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
    let followTimer: ReturnType<typeof setTimeout> | undefined;
    const startFollowing = () => {
      window.addEventListener("mousemove", handleMouseMove, { passive: true });
      window.addEventListener("touchmove", handleTouchMove, { passive: true });
    };
    const onFilmText = () => {
      openDrawGate();
      followTimer = setTimeout(startFollowing, FOLLOW_AFTER_FILM_TEXT_MS);
    };
    const onFilmSkip = () => {
      openDrawGate();
      clearTimeout(followTimer);
      startFollowing();
    };
    if (document.documentElement.hasAttribute("data-film")) {
      if (document.documentElement.classList.contains("film-skip")) {
        startFollowing();
      } else if (document.documentElement.classList.contains("film-text")) {
        onFilmText();
      } else {
        window.addEventListener("am:film-text", onFilmText, { once: true });
        window.addEventListener("am:film-skip", onFilmSkip, { once: true });
      }
    } else {
      followTimer = setTimeout(
        startFollowing,
        Math.max(0, FOLLOW_AFTER_NAV_MS - performance.now()),
      );
    }

    return () => {
      alive = false;
      running = false;
      clearTimeout(followTimer);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("am:film-text", onFilmText);
      window.removeEventListener("am:film-skip", onFilmSkip);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, []);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
