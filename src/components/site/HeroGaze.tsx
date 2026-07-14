"use client";

import { useEffect, useRef } from "react";

/**
 * Cursor-following robot v2 — built from Andrew's "Robot Scanning Motion"
 * video (121 frames, border-flood keyed to transparency, auto-mapped by
 * eye-glow centroid). The atlas is a 9x5 sprite sheet:
 *
 *   rows 0-3: gaze grid — cursor X -> column (left..right),
 *             cursor Y -> row (up..down)
 *   row 4:    expressions — cols 0-2 squint (by cursor X third),
 *             cols 3-5 wide/alert (by cursor X third)
 *
 * Personality triggers: squint when the cursor comes close to the robot
 * (proximity to the element rect + margin); brief wide-eyed alert on a
 * fast cursor pass. Otherwise 2D gaze with smoothing + idle drift.
 * prefers-reduced-motion: static resting frame, no listeners.
 */

const ATLAS = "/hero/robot-atlas-v2.webp";
const COLS = 9;
const ROWS = 5; // 4 gaze rows + 1 expression row
const GAZE_ROWS = 4;
const EXPR_ROW = 4;
const REST: [number, number] = [4, 1];

const SQUINT_MARGIN = 48; // px around the robot that triggers the squint
const ALERT_SPEED = 2.2; // viewport-widths/second that triggers alert
const ALERT_HOLD_MS = 450;

function pos(col: number, row: number): string {
  return `${(col / (COLS - 1)) * 100}% ${(row / (ROWS - 1)) * 100}%`;
}

export default function HeroGaze({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let mx = 0.5;
    let my = 0.4;
    let sx = mx;
    let sy = my;
    let last = "";
    let rafId: number;
    let rect = el.getBoundingClientRect();
    let near = false;
    let alertUntil = 0;
    let lastMove = 0;
    let lastX = 0.5;
    const t0 = performance.now();

    const updateRect = () => {
      rect = el.getBoundingClientRect();
    };

    const tick = (now: number) => {
      sx += (mx - sx) * 0.25;
      sy += (my - sy) * 0.25;
      const drift = Math.sin((now - t0) / 3000) * 0.015;

      let col: number;
      let row: number;
      if (near) {
        // squint, roughly tracking x
        col = Math.min(2, Math.floor(sx * 3));
        row = EXPR_ROW;
      } else if (now < alertUntil) {
        col = 3 + Math.min(2, Math.floor(sx * 3));
        row = EXPR_ROW;
      } else {
        const gx = Math.max(0, Math.min(1, sx + drift));
        const gy = Math.max(0, Math.min(1, sy + drift * 0.5));
        col = Math.round(gx * (COLS - 1));
        row = Math.round(gy * (GAZE_ROWS - 1));
      }

      const p = pos(col, row);
      if (p !== last) {
        last = p;
        el.style.backgroundPosition = p;
      }
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    const onMouse = (e: MouseEvent) => {
      mx = e.clientX / window.innerWidth;
      my = e.clientY / window.innerHeight;
      near =
        e.clientX > rect.left - SQUINT_MARGIN &&
        e.clientX < rect.right + SQUINT_MARGIN &&
        e.clientY > rect.top - SQUINT_MARGIN &&
        e.clientY < rect.bottom + SQUINT_MARGIN;
      // alert on fast horizontal passes
      const now = performance.now();
      if (lastMove) {
        const dt = (now - lastMove) / 1000;
        const speed = Math.abs(mx - lastX) / Math.max(dt, 0.008);
        if (speed > ALERT_SPEED && !near) alertUntil = now + ALERT_HOLD_MS;
      }
      lastMove = now;
      lastX = mx;
    };
    const onTouch = (e: TouchEvent) => {
      if (e.touches[0]) {
        mx = e.touches[0].clientX / window.innerWidth;
        my = e.touches[0].clientY / window.innerHeight;
      }
    };

    window.addEventListener("mousemove", onMouse, { passive: true });
    window.addEventListener("touchmove", onTouch, { passive: true });
    window.addEventListener("resize", updateRect, { passive: true });
    window.addEventListener("scroll", updateRect, { passive: true });

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("touchmove", onTouch);
      window.removeEventListener("resize", updateRect);
      window.removeEventListener("scroll", updateRect);
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
        backgroundPosition: pos(REST[0], REST[1]),
        backgroundRepeat: "no-repeat",
      }}
    />
  );
}
