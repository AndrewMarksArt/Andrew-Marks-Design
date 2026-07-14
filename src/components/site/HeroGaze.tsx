"use client";

import { useEffect, useRef } from "react";
import MAP from "./heroGazeMap.json";

/**
 * Cursor-following robot v7 — star-graph tracking with cross-dissolve.
 *
 * Pose data (see scripts/build-gaze-atlas.py): five direction clips form an
 * 8-spoke star in gaze space; node 0 is the canonical center pose; chains
 * join the hub at pixel-verified center-crossings; a next-hop matrix routes
 * travel so consecutive poses are always graph-adjacent.
 *
 * Rendering: TWO stacked layers of the same atlas. The scrub position along
 * the travel path is CONTINUOUS — (from, to, frac) — and the top layer's
 * opacity is frac, so every step between adjacent poses plays as a short
 * cross-dissolve instead of a hard cut. Discrete stepping was the last
 * source of perceived chop: no matter how dense the atlas, hard cuts read
 * as flip-book; the dissolve reads as in-between motion. Travel speed eases
 * with remaining distance (fast when far, gentle on arrival).
 *
 * heroGazeMap.json: cols/rows (atlas grid), nodes (gaze per node,
 * piecewise-normalized around center so cursor (0.5, 0.5) = center pose),
 * targetable, next (next[i][i] = i), rest, squint (-1 = no squint pose).
 *
 * Hysteresis tuning from the v5 design-review simulations: absolute
 * epsilon + minimum switch dwell stop cursor jitter from churning the
 * target; far candidates need a clearer margin against sector flapping.
 */

const ATLAS = "/hero/robot-atlas-v7.webp";
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
// travel speed in nodes/sec: eases with remaining hops — snappy when far,
// soft landing on arrival. 12..55 spans "one-node adjust" to "corner dash".
const RATE_MIN = 12;
const RATE_MAX = 55;
const RATE_PER_HOP = 11;

function pos(idx: number): string {
  // CSS background-position % resolves as (container - image) * p: with the
  // image COLS x the element, column c sits at c/(COLS-1) — the -1 matters.
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

// The wrapper is positioned by its CSS-module class (Hero.module.css
// .robot) — no position/inset here or the inline style would override it.
const baseStyle: React.CSSProperties = {
  backgroundImage: `url(${ATLAS})`,
  backgroundSize: `${COLS * 100}% ${ROWS * 100}%`,
  backgroundPosition: pos(REST_IDX),
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
    let mx = NODES[REST_IDX][0];
    let my = NODES[REST_IDX][1];
    let sx = mx;
    let sy = my;
    let smooth = SMOOTH_MOUSE;
    // continuous scrub state: dissolving from -> to, frac in [0, 1)
    let from = REST_IDX;
    let to = REST_IDX;
    let frac = 0;
    let target = REST_IDX;
    let tickN = 0;
    let lastSwitch = -MIN_SWITCH_TICKS;
    let lastTime = 0;
    let near = false;
    let rafId: number;
    let rect = base.getBoundingClientRect();

    const updateRect = () => {
      rect = base.getBoundingClientRect();
    };

    const tick = (now: number) => {
      if (!alive) return;
      const dt = lastTime ? Math.min((now - lastTime) / 1000, 0.05) : 1 / 60;
      lastTime = now;
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

      // travel: advance the continuous scrub along the next-hop path
      if (to === from && target !== from) {
        to = NEXT[from][target];
        frac = 0;
      } else if (to !== from && NEXT[from][target] !== to) {
        // rerouted mid-dissolve: play the dissolve backwards to `from`,
        // then pick the new direction — never a hard cut
        const t = from;
        from = to;
        to = t;
        frac = 1 - frac;
      }
      if (to !== from) {
        const remaining = hopDist(from, target);
        const rate = Math.min(
          RATE_MAX,
          Math.max(RATE_MIN, remaining * RATE_PER_HOP),
        );
        frac += rate * dt;
        while (frac >= 1) {
          frac -= 1;
          from = to;
          if (from === target) {
            to = from;
            frac = 0;
            break;
          }
          to = NEXT[from][target];
        }
      }

      base.style.backgroundPosition = pos(from);
      if (to !== from) {
        fade.style.backgroundPosition = pos(to);
        // smoothstep the opacity ramp — softer than linear at the ends
        const f = frac * frac * (3 - 2 * frac);
        fade.style.opacity = String(f);
      } else {
        fade.style.opacity = "0";
      }
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    const onMouse = (e: MouseEvent) => {
      smooth = SMOOTH_MOUSE;
      mx = Math.min(1, Math.max(0, e.clientX / window.innerWidth));
      my = Math.min(1, Math.max(0, e.clientY / window.innerHeight));
      near =
        e.clientX > rect.left - 48 &&
        e.clientX < rect.right + 48 &&
        e.clientY > rect.top - 48 &&
        e.clientY < rect.bottom + 48;
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
    <div ref={baseRef} className={className} aria-hidden="true" style={baseStyle}>
      <div ref={fadeRef} style={fadeStyle} />
    </div>
  );
}
