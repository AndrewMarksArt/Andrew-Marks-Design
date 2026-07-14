"use client";

import { useEffect, useRef } from "react";
import GAZE_MAP from "./heroGazeMap.json";

/**
 * Cursor-following robot v3 — the "scrub the timeline" model.
 *
 * The atlas holds 61 frames of Andrew's scanning video in TEMPORAL order
 * (8x8 sheet, stabilized + edge-extruded). Each tick, the current frame
 * scrubs a few steps toward the frame whose measured gaze (from
 * heroGazeMap.json: [x, y, glowHeight] per frame, normalized) best matches
 * the cursor — so every rendered transition is between temporally adjacent
 * frames and the head always MOVES through poses instead of jumping
 * between them. Squint (cursor near the robot) and wide-eyed alert (fast
 * cursor pass) are just timeline targets reached by the same scrub.
 *
 * v2's grid model caused the jerk Andrew saw: the video's gaze coverage is
 * a curve, and rectangular-gridding a curve makes dead plateaus and pose
 * cliffs. Scrubbing follows the curve itself.
 */

const ATLAS = "/hero/robot-atlas-v3.webp";
const COLS = 8;
const ROWS = 8;
const N = GAZE_MAP.length;

const SPEED = 1.7; // frames per tick (~100 source-frames/s at 60fps)
const X_WEIGHT = 1;
const Y_WEIGHT = 0.55; // vertical gaze span is smaller — weigh it less
const HYSTERESIS = 0.06; // distance bonus for staying near the current frame
const SQUINT_MARGIN = 48;
const ALERT_SPEED = 2.2; // viewport-widths/sec
const ALERT_HOLD_MS = 500;

// derived targets
const SQUINT_IDX = GAZE_MAP.reduce((m, g, i) => (g[2] < GAZE_MAP[m][2] ? i : m), 0);
const WIDE_IDX = GAZE_MAP.reduce((m, g, i) => (g[2] > GAZE_MAP[m][2] ? i : m), 0);
const REST_IDX = GAZE_MAP.reduce(
  (m, g, i) =>
    Math.abs(g[0] - 0.5) + Math.abs(g[1] - 0.5) <
    Math.abs(GAZE_MAP[m][0] - 0.5) + Math.abs(GAZE_MAP[m][1] - 0.5)
      ? i
      : m,
  0
);

function pos(idx: number): string {
  const col = idx % COLS;
  const row = Math.floor(idx / COLS);
  return `${(col / (COLS - 1)) * 100}% ${(row / (ROWS - 1)) * 100}%`;
}

function nearestFrame(mx: number, my: number, cur: number): number {
  let best = 0;
  let bestCost = Infinity;
  for (let i = 0; i < N; i++) {
    const dx = GAZE_MAP[i][0] - mx;
    const dy = GAZE_MAP[i][1] - my;
    const cost =
      X_WEIGHT * dx * dx +
      Y_WEIGHT * dy * dy +
      HYSTERESIS * Math.abs(i - cur) / N;
    if (cost < bestCost) {
      bestCost = cost;
      best = i;
    }
  }
  return best;
}

export default function HeroGaze({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let mx = 0.5;
    let my = 0.4;
    let cur = REST_IDX;
    let target = REST_IDX;
    let lastRendered = -1;
    let rafId: number;
    let rect = el.getBoundingClientRect();
    let near = false;
    let alertUntil = 0;
    let lastMoveAt = 0;
    let lastX = 0.5;

    const updateRect = () => {
      rect = el.getBoundingClientRect();
    };

    const tick = (now: number) => {
      if (near) {
        target = SQUINT_IDX;
      } else if (now < alertUntil) {
        target = WIDE_IDX;
      } else if (now - lastMoveAt < 2500 || lastMoveAt === 0) {
        target = nearestFrame(mx, my, cur);
      } else {
        // idle: small wander around wherever we settled
        target = Math.max(
          0,
          Math.min(N - 1, Math.round(target + Math.sin(now / 1500) * 0.6))
        );
      }

      const delta = target - cur;
      cur += Math.max(-SPEED, Math.min(SPEED, delta));
      const idx = Math.round(cur);
      if (idx !== lastRendered) {
        lastRendered = idx;
        el.style.backgroundPosition = pos(idx);
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
      const now = performance.now();
      if (lastMoveAt) {
        const dt = (now - lastMoveAt) / 1000;
        const speed = Math.abs(mx - lastX) / Math.max(dt, 0.008);
        if (speed > ALERT_SPEED && !near) alertUntil = now + ALERT_HOLD_MS;
      }
      lastMoveAt = now;
      lastX = mx;
    };
    const onTouch = (e: TouchEvent) => {
      if (e.touches[0]) {
        mx = e.touches[0].clientX / window.innerWidth;
        my = e.touches[0].clientY / window.innerHeight;
        lastMoveAt = performance.now();
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
        backgroundPosition: pos(REST_IDX),
        backgroundRepeat: "no-repeat",
      }}
    />
  );
}
