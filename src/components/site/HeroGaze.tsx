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
 * keyed to transparency at 1024px, and rebuilt at 512px cells so the
 * ~660px display renders crisp instead of upscaling 256px frames.
 * Mouse X maps straight to a frame index with 0.35 smoothing plus a
 * slow sinusoidal idle drift; frames render on a canvas with a 1px
 * source inset. Nothing else — no graph, no grid, no dissolve.
 * Tracking constants are verbatim from the live page.
 */

const ATLAS_SRC = "/hero/robot-atlas-live2.webp";
const COLS = 9;
const ROWS = 9;
const TOTAL = COLS * ROWS;
const FRAME_W = 512;
const FRAME_H = 512;

export default function HeroGaze({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = FRAME_W;
    canvas.height = FRAME_H;

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
      ctx.clearRect(0, 0, FRAME_W, FRAME_H);
      ctx.drawImage(
        atlas,
        col * FRAME_W + 1, row * FRAME_H + 1, FRAME_W - 2, FRAME_H - 2,
        1, 1, FRAME_W - 2, FRAME_H - 2,
      );
    };

    const atlas = new Image();
    atlas.src = ATLAS_SRC;

    let t0 = 0;
    const start = () => {
      if (!alive) return;
      // First draw is the center frame — pixel-identical to the inline
      // data-URI placeholder painted by CSS since first paint — so
      // dropping the background here is an invisible swap. (Without the
      // placeholder, the blank canvas waiting on the 1.6MB atlas read as
      // the robot "blinking in".)
      draw(Math.round(0.5 * (TOTAL - 1)));
      canvas.style.background = "none";
      if (reduced) return;
      t0 = performance.now();

      function tick(now: number) {
        if (!alive) return;
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
      animationFrameId = requestAnimationFrame(tick);
    };
    // decode() rasterizes the 4608px sheet off the main thread so the
    // first draw can't hitch the text ladder mid-animation
    atlas
      .decode()
      .then(start)
      .catch(() => {
        atlas.onload = start;
        if (atlas.complete) start();
      });

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
      followTimer = setTimeout(startFollowing, FOLLOW_AFTER_FILM_TEXT_MS);
    };
    const onFilmSkip = () => {
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
      clearTimeout(followTimer);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      window.removeEventListener("am:film-text", onFilmText);
      window.removeEventListener("am:film-skip", onFilmSkip);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, []);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
