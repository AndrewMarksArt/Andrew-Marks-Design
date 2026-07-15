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
    atlas.onload = () => {
      if (!alive) return;
      if (reduced) {
        draw(Math.round(0.5 * (TOTAL - 1)));
        return;
      }
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

    const handleMouseMove = (e: MouseEvent) => {
      mouse = e.clientX / window.innerWidth;
    };
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches[0]) {
        mouse = e.touches[0].clientX / window.innerWidth;
      }
    };

    // The robot is present from first paint but holds its center gaze
    // until the hero's text ladder has finished (~1.5s after navigation)
    // — then it wakes up and starts following the cursor. performance.now()
    // is navigation-relative, so a late hydration just means no extra wait.
    const FOLLOW_AFTER_NAV_MS = 1600;
    const followTimer = setTimeout(() => {
      window.addEventListener("mousemove", handleMouseMove, { passive: true });
      window.addEventListener("touchmove", handleTouchMove, { passive: true });
    }, Math.max(0, FOLLOW_AFTER_NAV_MS - performance.now()));

    return () => {
      alive = false;
      clearTimeout(followTimer);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, []);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
