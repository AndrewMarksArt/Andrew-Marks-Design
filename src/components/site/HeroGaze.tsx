"use client";

import { useEffect, useRef } from "react";
import MAP from "./heroGazeMap.json";

/**
 * Cursor-following robot v5 — 2D pose-graph tracking.
 *
 * The source video is a gaze TOUR (center -> left -> up-left -> across the
 * top -> center [blink] -> up-right -> back-left slightly down [blink] ->
 * bottom-right [squint]), so tracking is two-dimensional: the cursor
 * targets the node whose measured eye-gaze is nearest in (x, y), and the
 * robot travels there along a graph whose every edge is a verified-smooth
 * transition — chain edges are 2 video frames apart, shortcut edges join
 * the tour's self-crossings (near-identical poses, hand-inspected). Travel
 * follows a precomputed next-hop matrix, so the rendered sequence can never
 * jump between unrelated poses; blinks appear naturally when a route passes
 * through the video's blink frames.
 *
 * heroGazeMap.json (built by scripts/build-gaze-atlas.py):
 *   nodes      normalized gaze (x, y) per node, timeline order
 *   targetable node indices the argmin may select — blink/blur/squint and
 *              duplicate-center frames are traversal-only
 *   next       61x61 next-hop matrix (next[i][i] = i)
 *   rest       center-level eyes-open node: initial paint, reduced-motion,
 *              scrolled-away pose
 *   squint     narrowest-glow node, reachable only via proximity override
 *
 * Tuning below comes from simulation (design-review panel, 2026-07-14):
 * hysteresis needs BOTH an absolute epsilon and a minimum switch interval
 * or cursor jitter churns the target; far-away candidates need a stricter
 * gate or the bottom-left seam (a data gap: no bottom-left gaze exists in
 * the video) flaps between look-left segments 45 hops apart.
 */

const ATLAS = "/hero/robot-atlas-v5.webp";
const COLS = 8;
const ROWS = 8;
const N: number = MAP.n;
const NODES: number[][] = MAP.nodes;
const TARGETABLE: number[] = MAP.targetable;
const NEXT: number[][] = MAP.next;
const REST_IDX: number = MAP.rest;
const SQUINT_IDX: number = MAP.squint;

const Y_WEIGHT = 0.6; // Y is pre-amplified ~2.8x by normalization; keep low
const SMOOTH_MOUSE = 0.22;
const SMOOTH_TOUCH = 0.1; // scroll IS touchmove — blur sweeps into a glance
const HYST = 0.85; // multiplicative form only — NEVER rewrite as a division
const HYST_EPS = 1.5e-4;
const MIN_SWITCH_TICKS = 8; // 133ms dwell between retargets
const FAR_HOPS = 6;
const FAR_RATIO = 0.55; // far targets must be decisively better
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
      if (near) {
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
