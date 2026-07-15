"use client";

import { useEffect, useRef } from "react";
import styles from "./BootFilm.module.css";

/**
 * The load film (Andrew's storyboard, Figma section 6760:13736) — the site
 * drafts itself into existence in its own design language:
 *
 *   start state (visible from first paint, pre-JS): hatch + a small ×
 *   A  the × rotates and grows into a plus (registration mark)
 *   B  rules grow out of the plus to the viewport edges
 *   C  the crosshair travels to the plate's top-left registration point
 *   D  the plate's structural rules draw in, plus-marks pop at the
 *      intersections, and a white window opens at center revealing the robot
 *   E  the window expands into the full plate while the robot travels to
 *      its hero slot
 *   handoff — the real page (identical pixels) is revealed beneath and the
 *   overlay crossfades away; then the chrome (meta line types, NameMark
 *   rises), then the existing hero text ladder + typewriter
 *
 * ARCHITECTURE: the film is an OVERLAY of doubles above the real page,
 * which is server-rendered in its final state and merely hidden while the
 * film plays. An inline <head> script stamps <html data-film> BEFORE first
 * paint only when: home page, first visit this session, no reduced-motion,
 * viewport >= 1024. No stamp -> nothing is ever hidden (no-JS, crawlers,
 * repeat visits, mobile, reduced-motion all render instantly). Skip (any
 * input) finishes every animation and reveals the finished page in one
 * frame — the page was there all along.
 *
 * Geometry is measured from the real (hidden but laid-out) DOM at film
 * start, so the landing states match the page at any viewport size. The
 * window/robot reveal animates rects (top/left/width/height) — a deliberate
 * exception to the transforms-only house rule: two elements, one-shot,
 * inside an isolated fixed overlay; verified against the frame-pacing
 * harness like everything else.
 */

const EXPO = "cubic-bezier(0.19, 1, 0.22, 1)";
const TRAVEL = "cubic-bezier(0.65, 0, 0.35, 1)";

// beat schedule (ms from film start)
const T = {
  markTurn: 0, //   A: x -> +
  rulesOut: 300, // B: rules to edges
  travel: 950, //   C: crosshair to anchor
  grid: 1400, //    D: structural rules + marks + window reveal
  expand: 2200, //  E: window -> plate, robot -> hero slot
  handoff: 2750, // real page revealed, overlay fades
  chrome: 2850, //  meta types, NameMark rises
  text: 3250, //    hero text ladder (existing) + typewriter
};

export default function BootFilm() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const docEl = document.documentElement;
    const root = rootRef.current;
    if (!root || !docEl.hasAttribute("data-film")) return;

    const finishFilm = (viaSkip: boolean) => {
      if (finished) return;
      finished = true;
      try {
        sessionStorage.setItem("am-film-seen", "1");
      } catch {
        /* private mode */
      }
      if (viaSkip) {
        anims.forEach((a) => a.finish());
        timers.forEach(clearTimeout);
        docEl.classList.add("film-page", "film-chrome", "film-text", "film-skip");
        window.dispatchEvent(new Event("am:film-skip"));
        root.style.display = "none";
      }
      skipEvents.forEach((t) => window.removeEventListener(t, onSkip));
    };
    const onSkip = () => finishFilm(true);
    const skipEvents = ["pointerdown", "keydown", "wheel", "touchstart"];

    let finished = false;
    const anims: Animation[] = [];
    const timers: ReturnType<typeof setTimeout>[] = [];

    // A page restored mid-scroll shouldn't play a film pinned to the top
    if (window.scrollY > 4) {
      docEl.classList.add("film-page", "film-chrome", "film-text", "film-skip");
      root.style.display = "none";
      finishFilm(false);
      return;
    }

    const $ = (k: string) => root.querySelector<HTMLElement>(`[data-f="${k}"]`)!;
    const mark = $("mark");
    const hRule = $("h");
    const vRule = $("v");
    const glRight = $("glr");
    const glHero = $("glh");
    const pmA = $("pma");
    const pmB = $("pmb");
    const win = $("win");
    const robot = $("robot");

    // ---- measure the real page (hidden, but laid out) ----
    const plateEl = document.querySelector(".plateMain");
    const metaRuleEl = document.querySelector('[class*="metaBar"] hr');
    const heroCanvas = document.querySelector('canvas[class*="robot"]');
    if (!plateEl || !heroCanvas) {
      // structure missing (shouldn't happen) — bail to the finished page
      docEl.classList.add("film-page", "film-chrome", "film-text", "film-skip");
      root.style.display = "none";
      finishFilm(false);
      return;
    }
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const plate = plateEl.getBoundingClientRect();
    const slot = heroCanvas.getBoundingClientRect();
    const anchor = {
      x: plate.left + 1,
      y: (metaRuleEl ? metaRuleEl.getBoundingClientRect().top : plate.top + 56) + 1,
    };

    const run = (
      el: HTMLElement,
      kf: Keyframe[],
      opts: KeyframeAnimationOptions,
    ) => {
      const a = el.animate(kf, { fill: "both", ...opts });
      anims.push(a);
      return a;
    };

    // ---- A + B + C as ONE animation per element ----
    // One multi-keyframe animation per element, no composite modes: Chrome's
    // animation-replacement rule auto-removes earlier finished transform
    // animations once a later one finishes, snapping elements back to their
    // CSS base state (caught live: the mark reverted to x mid-film).
    const dx = anchor.x - vw / 2;
    const dy = anchor.y - vh / 2;
    const SPAN = T.travel + 430; // 0 .. end of travel
    const at = (ms: number) => ms / SPAN;

    // mark: x -> + (0..380), hold, travel (950..1380)
    run(
      mark,
      [
        {
          offset: 0,
          transform: "translate(-50%, -50%) rotate(45deg) scale(1)",
          easing: EXPO,
        },
        {
          offset: at(380),
          transform: "translate(-50%, -50%) rotate(0deg) scale(1.4)",
        },
        {
          offset: at(T.travel),
          transform: "translate(-50%, -50%) rotate(0deg) scale(1.4)",
          easing: TRAVEL,
        },
        {
          offset: 1,
          transform: `translate(-50%, -50%) translate(${dx}px, ${dy}px) rotate(0deg) scale(1.4)`,
        },
      ],
      { duration: SPAN },
    );

    // rules: grow (300..900), hold, travel (950..1380)
    run(
      hRule,
      [
        { offset: 0, transform: "scaleX(0) translateY(0)" },
        { offset: at(T.rulesOut), transform: "scaleX(0) translateY(0)", easing: EXPO },
        { offset: at(900), transform: "scaleX(1) translateY(0)" },
        { offset: at(T.travel), transform: "scaleX(1) translateY(0)", easing: TRAVEL },
        { offset: 1, transform: `scaleX(1) translateY(${dy}px)` },
      ],
      { duration: SPAN },
    );
    run(
      vRule,
      [
        { offset: 0, transform: "scaleY(0) translateX(0)" },
        { offset: at(T.rulesOut), transform: "scaleY(0) translateX(0)", easing: EXPO },
        { offset: at(900), transform: "scaleY(1) translateX(0)" },
        { offset: at(T.travel), transform: "scaleY(1) translateX(0)", easing: TRAVEL },
        { offset: 1, transform: `scaleY(1) translateX(${dx}px)` },
      ],
      { duration: SPAN },
    );

    // ---- D: structure draws in + the window reveals the robot ----
    glRight.style.left = `${plate.right - 1}px`;
    run(glRight, [{ transform: "scaleY(0)" }, { transform: "scaleY(1)" }], {
      delay: T.grid,
      duration: 520,
      easing: EXPO,
    });
    glHero.style.top = `${slot.bottom - 1}px`;
    run(glHero, [{ transform: "scaleX(0)" }, { transform: "scaleX(1)" }], {
      delay: T.grid + 80,
      duration: 520,
      easing: EXPO,
    });
    pmA.style.left = `${plate.right}px`;
    pmA.style.top = `${anchor.y}px`;
    pmB.style.left = `${plate.left}px`;
    pmB.style.top = `${slot.bottom}px`;
    [pmA, pmB].forEach((pm, i) =>
      run(
        pm,
        [
          { transform: "translate(-50%, -50%) scale(0)", opacity: 0 },
          { transform: "translate(-50%, -50%) scale(1)", opacity: 1 },
        ],
        { delay: T.grid + 260 + i * 120, duration: 260, easing: EXPO },
      ),
    );

    // window + robot: single animations spanning D (open at center) and E
    // (expand to plate / travel to slot) — same one-animation-per-element
    // rule as above.
    const cw = Math.min(vw * 0.3, 520);
    const ch = cw * 1.06;
    const cell = { left: (vw - cw) / 2, top: (vh - ch) / 2 };
    const rw = cw * 0.94;
    const winStart = T.grid + 120;
    const winSpan = T.expand + 520 - winStart;
    const wAt = (ms: number) => (ms - winStart) / winSpan;
    run(
      win,
      [
        {
          offset: 0,
          left: `${vw / 2}px`,
          top: `${vh / 2}px`,
          width: "0px",
          height: "0px",
          easing: EXPO,
        },
        {
          offset: wAt(winStart + 620),
          left: `${cell.left}px`,
          top: `${cell.top}px`,
          width: `${cw}px`,
          height: `${ch}px`,
        },
        {
          offset: wAt(T.expand),
          left: `${cell.left}px`,
          top: `${cell.top}px`,
          width: `${cw}px`,
          height: `${ch}px`,
          easing: TRAVEL,
        },
        {
          offset: 1,
          left: `${plate.left}px`,
          top: "0px",
          width: `${plate.width}px`,
          height: `${vh}px`,
        },
      ],
      { delay: winStart, duration: winSpan },
    );
    // the robot is a child of the window (clipped while it opens): its
    // coordinates are window-local. Bottom-centered in the cell, then to
    // the hero slot relative to the window's landing rect (plate.left, 0).
    run(
      robot,
      [
        {
          offset: 0,
          left: `${(cw - rw) / 2}px`,
          top: `${ch - rw}px`,
          width: `${rw}px`,
          height: `${rw}px`,
        },
        {
          offset: wAt(T.expand),
          left: `${(cw - rw) / 2}px`,
          top: `${ch - rw}px`,
          width: `${rw}px`,
          height: `${rw}px`,
          easing: TRAVEL,
        },
        {
          offset: 1,
          left: `${slot.left - plate.left}px`,
          top: `${slot.top}px`,
          width: `${slot.width}px`,
          height: `${slot.height}px`,
        },
      ],
      { delay: winStart, duration: winSpan },
    );

    // ---- handoff + chrome + text (class-driven; CSS does the rest) ----
    timers.push(
      setTimeout(() => {
        docEl.classList.add("film-page");
        run(root, [{ opacity: 1 }, { opacity: 0 }], {
          duration: 260,
          easing: "ease",
        }).finished.then(() => {
          if (!finished) root.style.display = "none";
        });
      }, T.handoff),
      setTimeout(() => docEl.classList.add("film-chrome"), T.chrome),
      setTimeout(() => {
        docEl.classList.add("film-text");
        window.dispatchEvent(new Event("am:film-text"));
        finishFilm(false);
      }, T.text),
    );

    skipEvents.forEach((t) =>
      window.addEventListener(t, onSkip, { passive: true }),
    );

    return () => {
      timers.forEach(clearTimeout);
      anims.forEach((a) => a.cancel());
      skipEvents.forEach((t) => window.removeEventListener(t, onSkip));
    };
  }, []);

  return (
    <div ref={rootRef} className={styles.overlay} aria-hidden="true">
      {/* horizontal + vertical viewport rules (grow from center, then travel) */}
      <span data-f="h" className={styles.hRule} />
      <span data-f="v" className={styles.vRule} />
      {/* structural doubles for beat D (positioned at runtime) */}
      <span data-f="glr" className={styles.glVert} />
      <span data-f="glh" className={styles.glHorz} />
      <svg data-f="pma" className={styles.pm} viewBox="0 0 32 32">
        <path d="M16 4V28M4 16H28" stroke="var(--black)" strokeWidth="2" />
      </svg>
      <svg data-f="pmb" className={styles.pm} viewBox="0 0 32 32">
        <path d="M16 4V28M4 16H28" stroke="var(--black)" strokeWidth="2" />
      </svg>
      {/* the white window that reveals the robot, then becomes the plate */}
      <div data-f="win" className={styles.win}>
        <img
          data-f="robot"
          className={styles.robot}
          src="/hero/robot-first-frame.webp"
          alt=""
        />
      </div>
      {/* the registration mark: starts as x (rotated plus), turns upright */}
      <svg data-f="mark" className={styles.mark} viewBox="0 0 32 32">
        <path d="M16 3V29M3 16H29" stroke="var(--black)" strokeWidth="2.2" />
      </svg>
    </div>
  );
}
