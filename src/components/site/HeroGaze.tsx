"use client";

import { useEffect, useRef } from "react";
import MAP from "./heroGazeMap.json";

/**
 * Cursor-following robot v6 — 2D star-graph tracking over five clips.
 *
 * Five direction videos (design/assets/robot video/directions/), all
 * generated from one shared reference still, form an 8-spoke star in gaze
 * space: level left-right, vertical up-down, the up-left -> down-right
 * diagonal, and center -> up-right / center -> down-left half-spokes. Node
 * 0 is the canonical center pose (the reference). The cursor targets the
 * node whose measured eye-gaze is nearest in (x, y) and the robot travels
 * there along the graph via a precomputed next-hop matrix — chain edges
 * are a few video frames apart, hub edges join each clip to center at its
 * measured center-crossing (all pixel-verified at build time). Spoke-to-
 * spoke travel passes through center, which reads as the robot naturally
 * re-orienting its head.
 *
 * heroGazeMap.json (built by scripts/build-gaze-atlas.py):
 *   cols/rows  atlas grid dimensions
 *   nodes      gaze (x, y) per node, piecewise-normalized around the
 *              center pose so cursor (0.5, 0.5) = center exactly
 *   targetable node indices the argmin may select
 *   next       next-hop matrix (next[i][i] = i)
 *   rest       the center node: initial paint, reduced-motion, scrolled-away
 *   squint     proximity-override node, or -1 when the clips provide none
 *
 * Hysteresis tuning comes from the v5 design-review simulations: an
 * absolute epsilon plus a minimum switch interval stops cursor jitter from
 * churning the target, and far-away candidates need a stricter (but not
 * paranoid — the star has no fake seams) gate against boundary flapping.
 */

const ATLAS = "/hero/robot-atlas-v6.webp";
const COLS: number = MAP.cols;
const ROWS: number = MAP.rows;
const N: number = MAP.n;
const NODES: number[][] = MAP.nodes;
const TARGETABLE: number[] = MAP.targetable;
const NEXT: number[][] = MAP.next;
const REST_IDX: number = MAP.rest;
const SQUINT_IDX: number = MAP.squint;

const Y_WEIGHT = 1.0; // piecewise normalization already makes axes symmetric
const SMOOTH_MOUSE = 0.22;
const SMOOTH_TOUCH = 0.1; // scroll IS touchmove — blur sweeps into a glance
const HYST = 0.85; // multiplicative form only — NEVER rewrite as a division
const HYST_EPS = 1.5e-4;
const MIN_SWITCH_TICKS = 8; // 133ms dwell between retargets
const FAR_HOPS = 6;
const FAR_RATIO = 0.7; // far targets must be clearly better (sector jitter)
const SPEED_BUDGET = 2; // per tick: two chain hops OR one shortcut hop
const SQUINT_MARGIN = 48;

function pos(idx: number): string {
  // CSS background-position % resolves as (container - image) * p: with the
  // image 8x the element, column c sits at c/(COLS-1) — the -1 is load-bearing.
  const i = Math.min(Math.max(idx | 0, 0), N - 1);
  const col = i % COLS;
  const row = Math.floor(i / COLS);
  return `${(col / (COLS - 1)) * 100}% ${(row / (ROWS - 1)) * 100}%`;
}

function cost(i: number, sx: number, sy: number): number {
  const dx = NODES[i][0] - sx;
  const dy = NODES[i][1] - sy;
  return dx * dx + Y_WEIGHT * dy * dy;
}

/** graph hops from a to b following the next-hop matrix (small, bounded) */
function hopDist(a: number, b: number): number {
  let cur = a;
  let d = 0;
  while (cur !== b && d <= N) {
    cur = NEXT[cur][b];
    d++;
  }
  return d;
}

export default function HeroGaze({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let alive = true;
    let mx = NODES[REST_IDX][0];
    let my = NODES[REST_IDX][1];
    let sx = mx;
    let sy = my;
    let smooth = SMOOTH_MOUSE;
    let cur = REST_IDX; // integer node id, end to end
    let target = REST_IDX;
    let tickN = 0;
    let lastSwitch = -MIN_SWITCH_TICKS;
    let lastRendered = -1;
    let near = false;
    let rafId: number;
    let rect = el.getBoundingClientRect();

    const updateRect = () => {
      rect = el.getBoundingClientRect();
    };

    const tick = () => {
      if (!alive) return;
      tickN++;
      sx += (mx - sx) * smooth;
      sy += (my - sy) * smooth;

      // desired node: proximity squint > scrolled-away rest > nearest gaze
      let want: number;
      let deliberate = false;
      if (near && SQUINT_IDX >= 0) {
        want = SQUINT_IDX;
        deliberate = true;
      } else if (rect.bottom < 0) {
        want = REST_IDX;
        deliberate = true;
      } else {
        want = target;
        let best = Infinity;
        for (const i of TARGETABLE) {
          const c = cost(i, sx, sy);
          if (c < best) {
            best = c;
            want = i;
          }
        }
      }

      if (want !== target && tickN - lastSwitch >= MIN_SWITCH_TICKS) {
        let ok = deliberate;
        if (!ok) {
          // both costs recomputed fresh against the smoothed cursor
          const cNew = cost(want, sx, sy);
          const cCur = cost(target, sx, sy);
          const ratio = hopDist(target, want) > FAR_HOPS ? FAR_RATIO : HYST;
          ok = cNew < ratio * cCur - HYST_EPS;
        }
        if (ok) {
          target = want;
          lastSwitch = tickN;
        }
      }

      // travel: chain hop costs 1, shortcut hop costs the whole budget so a
      // rendered transition is always a single vetted edge or two chain frames
      let budget = SPEED_BUDGET;
      while (budget > 0 && cur !== target) {
        const step = NEXT[cur][target];
        const isChain = Math.abs(step - cur) === 1;
        if (!isChain && budget < SPEED_BUDGET) break;
        cur = step;
        budget -= isChain ? 1 : SPEED_BUDGET;
      }

      if (cur !== lastRendered) {
        lastRendered = cur;
        el.style.backgroundPosition = pos(cur);
      }
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    const onMouse = (e: MouseEvent) => {
      smooth = SMOOTH_MOUSE;
      mx = Math.min(1, Math.max(0, e.clientX / window.innerWidth));
      my = Math.min(1, Math.max(0, e.clientY / window.innerHeight));
      near =
        e.clientX > rect.left - SQUINT_MARGIN &&
        e.clientX < rect.right + SQUINT_MARGIN &&
        e.clientY > rect.top - SQUINT_MARGIN &&
        e.clientY < rect.bottom + SQUINT_MARGIN;
    };
    const onTouch = (e: TouchEvent) => {
      const t = e.touches[0];
      if (!t) return;
      smooth = SMOOTH_TOUCH;
      mx = Math.min(1, Math.max(0, t.clientX / window.innerWidth));
      my = Math.min(1, Math.max(0, t.clientY / window.innerHeight));
      near = false; // a finger covering the robot can't see it squint
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
