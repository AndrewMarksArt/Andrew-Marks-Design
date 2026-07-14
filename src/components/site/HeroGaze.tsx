"use client";

import { useEffect, useRef } from "react";
import MAP from "./heroGazeMap.json";

/**
 * Cursor-following robot v8 — direct 9x9 gaze-grid lookup.
 *
 * The atlas IS the map (built by scripts/build-gaze-atlas.py): cell
 * (row, col) holds the pose for cursor position (col/8, row/8) — center
 * cell = neutral pose, top-left = looking up-left, and so on. The cursor
 * converts straight to a sheet position with light smoothing; no graph, no
 * pathfinding, no travel model. This is the placeholder site's proven
 * direct-lookup mechanism in two dimensions.
 *
 * The only rendering nicety kept from the graph era: when the shown cell
 * changes, the new pose cross-dissolves in over ~90ms on a second layer,
 * softening pose steps into motion. A small rounding margin keeps a cursor
 * parked on a cell boundary from shimmering between two poses.
 */

const ATLAS = "/hero/robot-atlas-v8.webp";
const COLS: number = MAP.cols;
const ROWS: number = MAP.rows;
const REST: number = MAP.rest;

const SMOOTH_MOUSE = 0.18;
const SMOOTH_TOUCH = 0.1; // scroll IS touchmove — blur sweeps into a glance
const FADE_MS = 90;
const SNAP_MARGIN = 0.55; // cells; > 0.5 = hysteresis against boundary flicker

function pos(cell: number): string {
  // CSS background-position % resolves as (container - image) * p: with the
  // image COLS x the element, column c sits at c/(COLS-1) — the -1 matters.
  const i = Math.min(Math.max(cell | 0, 0), COLS * ROWS - 1);
  const col = i % COLS;
  const row = Math.floor(i / COLS);
  return `${(col / (COLS - 1)) * 100}% ${(row / (ROWS - 1)) * 100}%`;
}

// The wrapper is positioned by its CSS-module class (Hero.module.css
// .robot) — no position/inset here or the inline style would override it.
const baseStyle: React.CSSProperties = {
  backgroundImage: `url(${ATLAS})`,
  backgroundSize: `${COLS * 100}% ${ROWS * 100}%`,
  backgroundPosition: pos(REST),
  backgroundRepeat: "no-repeat",
};
const fadeStyle: React.CSSProperties = {
  ...baseStyle,
  position: "absolute",
  inset: 0,
  opacity: 0,
};

export default function HeroGaze({ className }: { className?: string }) {
  const baseRef = useRef<HTMLDivElement>(null);
  const fadeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const base = baseRef.current;
    const fade = fadeRef.current;
    if (!base || !fade) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let alive = true;
    let mx = 0.5;
    let my = 0.5;
    let sx = 0.5;
    let sy = 0.5;
    let smooth = SMOOTH_MOUSE;
    let col = COLS >> 1;
    let row = ROWS >> 1;
    let shown = REST;
    let fadeFrom = -1;
    let fadeStart = 0;
    let rafId: number;
    let rect = base.getBoundingClientRect();

    const updateRect = () => {
      rect = base.getBoundingClientRect();
    };

    const tick = (now: number) => {
      if (!alive) return;
      // hero scrolled out of view -> drift home to the neutral pose
      const tx = rect.bottom < 0 ? 0.5 : mx;
      const ty = rect.bottom < 0 ? 0.5 : my;
      sx += (tx - sx) * smooth;
      sy += (ty - sy) * smooth;

      // snap to a new cell only when the smoothed position has clearly
      // left the current one (SNAP_MARGIN > 0.5 = boundary hysteresis)
      const fx = sx * (COLS - 1);
      const fy = sy * (ROWS - 1);
      if (Math.abs(fx - col) > SNAP_MARGIN) col = Math.round(fx);
      if (Math.abs(fy - row) > SNAP_MARGIN) row = Math.round(fy);
      const cell = row * COLS + col;

      if (cell !== shown) {
        // mid-fade retarget: promote the in-flight pose, start a new ramp
        fadeFrom = shown;
        shown = cell;
        fadeStart = now;
        base.style.backgroundPosition = pos(fadeFrom);
        fade.style.backgroundPosition = pos(shown);
      }
      if (fadeFrom >= 0) {
        const t = Math.min(1, (now - fadeStart) / FADE_MS);
        const e = t * t * (3 - 2 * t);
        fade.style.opacity = String(e);
        if (t >= 1) {
          base.style.backgroundPosition = pos(shown);
          fade.style.opacity = "0";
          fadeFrom = -1;
        }
      }
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    const onMouse = (e: MouseEvent) => {
      smooth = SMOOTH_MOUSE;
      mx = Math.min(1, Math.max(0, e.clientX / window.innerWidth));
      my = Math.min(1, Math.max(0, e.clientY / window.innerHeight));
    };
    const onTouch = (e: TouchEvent) => {
      const t = e.touches[0];
      if (!t) return;
      smooth = SMOOTH_TOUCH;
      mx = Math.min(1, Math.max(0, t.clientX / window.innerWidth));
      my = Math.min(1, Math.max(0, t.clientY / window.innerHeight));
    };

    window.addEventListener("mousemove", onMouse, { passive: true });
    window.addEventListener("touchmove", onTouch, { passive: true });
    window.addEventListener("resize", updateRect, { passive: true });
    window.addEventListener("scroll", updateRect, { passive: true });

    return () => {
      alive = false;
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("touchmove", onTouch);
      window.removeEventListener("resize", updateRect);
      window.removeEventListener("scroll", updateRect);
    };
  }, []);

  return (
    <div ref={baseRef} className={className} aria-hidden="true" style={baseStyle}>
      <div ref={fadeRef} style={fadeStyle} />
    </div>
  );
}
