"use client";

import { useEffect, useRef } from "react";
import MAP from "./heroGazeMap.json";

/**
 * Cursor-following robot v4 — the "monotonic line" model.
 *
 * The atlas holds one pose-continuous sweep assembled from the scanning
 * video: run B (frames 23-56, gaze left -> center-right), a bridge (frames
 * 59-108, ~every 3rd) whose virtual X is squeezed into the ~1% sliver
 * between the runs — a cursor crossing plays a quick head-flick, and no
 * cursor position rests on a bridge pose — then run C (109-120, gaze
 * continues center-right -> hard right where B left off). Every adjacent
 * pair of cells is within 3 video frames, so stepping through the line is
 * ALWAYS smooth — and because the line is monotonic in (virtual) gaze X,
 * the cursor maps DIRECTLY to a position on it: the robot follows the
 * mouse like the placeholder site did, with no timeline tours.
 *
 * heroGazeMap.json: { vx: normalized virtual gaze-X per line index
 * (strictly increasing), squint: line index of the slit-eye frame, n }.
 * Proximity to the robot targets the squint; the scrub limiter (±2
 * cells/tick) keeps every rendered transition adjacent.
 */

const ATLAS = "/hero/robot-atlas-v3.webp";
const COLS = 8;
const ROWS = 8;
const N: number = MAP.n;
const VX: number[] = MAP.vx;
const SQUINT_IDX: number = MAP.squint;
const REST_IDX = Math.round(N * 0.45); // center-ish gaze

const SPEED = 2; // max cells per tick
const SMOOTH = 0.22; // cursor smoothing
const SQUINT_MARGIN = 48;

function pos(idx: number): string {
  const col = idx % COLS;
  const row = Math.floor(idx / COLS);
  return `${(col / (COLS - 1)) * 100}% ${(row / (ROWS - 1)) * 100}%`;
}

/** cursor x (0..1) -> line index via the monotonic virtual-X table */
function lineIndex(x: number): number {
  let lo = 0;
  let hi = N - 1;
  while (lo < hi) {
    const mid = (lo + hi) >> 1;
    if (VX[mid] < x) lo = mid + 1;
    else hi = mid;
  }
  if (lo > 0 && Math.abs(VX[lo - 1] - x) < Math.abs(VX[lo] - x)) lo -= 1;
  return lo;
}

export default function HeroGaze({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let mx = 0.5;
    let sx = 0.5;
    let cur = REST_IDX;
    let lastRendered = -1;
    let rafId: number;
    let rect = el.getBoundingClientRect();
    let near = false;

    const updateRect = () => {
      rect = el.getBoundingClientRect();
    };

    const tick = (now: number) => {
      sx += (mx - sx) * SMOOTH;
      const drift = Math.sin(now / 3000) * 0.012;
      const target = near
        ? SQUINT_IDX
        : lineIndex(Math.max(0, Math.min(1, sx + drift)));

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
      near =
        e.clientX > rect.left - SQUINT_MARGIN &&
        e.clientX < rect.right + SQUINT_MARGIN &&
        e.clientY > rect.top - SQUINT_MARGIN &&
        e.clientY < rect.bottom + SQUINT_MARGIN;
    };
    const onTouch = (e: TouchEvent) => {
      if (e.touches[0]) mx = e.touches[0].clientX / window.innerWidth;
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
