"use client";

import { useEffect, useRef } from "react";

/**
 * Cursor-following robot for the hero — the placeholder site's gaze system
 * (GazePortrait) ported onto the transparent 9x9 atlas (Figma "atlas no bg
 * 1", node 7:2) so the plus-lattice shows through behind the robot.
 *
 * Rendered as a CSS sprite (background-position stepping on a 900%-sized
 * atlas) instead of a canvas: SSR-paints the resting frame immediately and
 * frame changes are single style writes driven by rAF. Mapping is the
 * placeholder's exact math: cursor X across the viewport -> smoothed 0..1
 * (0.35 lerp) + sinusoidal idle drift -> frame 0..80, row-major.
 *
 * prefers-reduced-motion: no listeners, no loop — the resting frame stays.
 */

const ATLAS = "/hero/robot-atlas.webp";
const COLS = 9;
const ROWS = 9;
const TOTAL = COLS * ROWS;
const REST_FRAME = Math.floor(TOTAL / 2); // center gaze

function framePosition(idx: number): string {
  const col = idx % COLS;
  const row = Math.floor(idx / COLS);
  return `${(col / (COLS - 1)) * 100}% ${(row / (ROWS - 1)) * 100}%`;
}

export default function HeroGaze({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let mouse = 0.5;
    let smooth = 0.5;
    let lastIdx = REST_FRAME;
    let rafId: number;
    const t0 = performance.now();

    const tick = (now: number) => {
      smooth += (mouse - smooth) * 0.35;
      const drift = Math.sin((now - t0) / 3000) * 0.015;
      const val = Math.max(0, Math.min(1, smooth + drift));
      const idx = Math.round(val * (TOTAL - 1));
      if (idx !== lastIdx) {
        lastIdx = idx;
        el.style.backgroundPosition = framePosition(idx);
      }
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    const onMouse = (e: MouseEvent) => {
      mouse = e.clientX / window.innerWidth;
    };
    const onTouch = (e: TouchEvent) => {
      if (e.touches[0]) mouse = e.touches[0].clientX / window.innerWidth;
    };
    window.addEventListener("mousemove", onMouse, { passive: true });
    window.addEventListener("touchmove", onTouch, { passive: true });

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("touchmove", onTouch);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      aria-hidden="true"
      style={{
        backgroundImage: `url(${ATLAS})`,
        backgroundSize: `${COLS * 100}% ${ROWS * 100}%`,
        backgroundPosition: framePosition(REST_FRAME),
        backgroundRepeat: "no-repeat",
      }}
    />
  );
}
