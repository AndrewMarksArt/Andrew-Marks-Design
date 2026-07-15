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
  sweep: 1450, //   D/E: the reveal wipe expands out of the anchor
  sweepEnd: 2600,
  handoff: 2650, // curtains gone; overlay crosshair fades
  chrome: 2800, //  meta types, NameMark rises
  text: 3200, //    hero text ladder (existing) + typewriter
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
    const curtR = $("cr");
    const curtB = $("cb");

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
    // The anchor is the CENTER of the real top-left corner plus mark (the
    // MetaBar's plusLeft) so the traveling mark lands exactly on it — same
    // position, same 32px size — and the reveal-jump beneath is invisible.
    const realMark = document.querySelector(
      '[class*="metaBar"] [class*="plusLeft"]',
    );
    const markRect = realMark ? realMark.getBoundingClientRect() : null;
    const anchor = markRect
      ? { x: markRect.left + markRect.width / 2, y: markRect.top + markRect.height / 2 }
      : {
          x: plate.left,
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
    // Travel delta is measured from the mark's RENDERED center — not
    // innerWidth/2, which includes the scrollbar and landed the mark 7px
    // off the real corner mark (caught live as a doubled line + plus).
    const c0 = mark.getBoundingClientRect();
    const dx = anchor.x - (c0.left + c0.width / 2);
    const dy = anchor.y - (c0.top + c0.height / 2);
    const SPAN = T.travel + 430; // 0 .. end of travel
    const at = (ms: number) => ms / SPAN;

    // mark: x -> + (0..380), hold, travel (950..1380). Lands at scale(1) =
    // exactly the real 32px corner mark it sits down on.
    run(
      mark,
      [
        {
          offset: 0,
          transform: "translate(-50%, -50%) rotate(45deg) scale(0.72)",
          easing: EXPO,
        },
        {
          offset: at(380),
          transform: "translate(-50%, -50%) rotate(0deg) scale(1)",
        },
        {
          offset: at(T.travel),
          transform: "translate(-50%, -50%) rotate(0deg) scale(1)",
          easing: TRAVEL,
        },
        {
          offset: 1,
          transform: `translate(-50%, -50%) translate(${dx}px, ${dy}px) rotate(0deg) scale(1)`,
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

    // ---- D/E: the reveal wipe — everything expands OUT OF the anchor ----
    // Two hatch-patterned curtains (identical to the body background, so
    // they read as the page background itself) retreat rightward and
    // downward from the anchor, unmasking the REAL page beneath: the white
    // plate, the robot already sitting in its hero slot, the rules. The
    // structural lines grow out of the anchor to lead the sweep, and
    // plus-marks pop as they arrive at their intersections. Compositor-only
    // (translates); no doubles, no seams.
    const sweepDur = T.sweepEnd - T.sweep;
    // Curtains run from t=0 so they COVER EVERYTHING through beats A-C
    // (fill:both + a delayed start would pre-apply the retreated first
    // keyframe and leave the page's top-left corner peeking out — shipped
    // that bug once). At sweep start they jump to the anchor — invisible,
    // because the landed overlay crosshair + mark sit exactly over the
    // real rules/mark that jump reveals — then retreat. Mid-keyframes pin
    // the moments each edge crosses the content it reveals (plate right
    // edge / hero rule) for line + mark choreography.
    const sAt = (ms: number) => ms / T.sweepEnd;
    run(
      curtR,
      [
        { offset: 0, transform: "translateX(0px)" },
        { offset: sAt(T.sweep), transform: "translateX(0px)" },
        {
          offset: sAt(T.sweep + 16),
          transform: `translateX(${anchor.x}px)`,
          easing: TRAVEL,
        },
        {
          offset: sAt(T.sweep + sweepDur * 0.62),
          transform: `translateX(${plate.right + 24}px)`,
          easing: "ease-out",
        },
        { offset: 1, transform: `translateX(${vw}px)` },
      ],
      { duration: T.sweepEnd },
    );
    run(
      curtB,
      [
        { offset: 0, transform: "translateY(0px)" },
        { offset: sAt(T.sweep), transform: "translateY(0px)" },
        {
          offset: sAt(T.sweep + 16),
          transform: `translateY(${anchor.y}px)`,
          easing: TRAVEL,
        },
        {
          offset: sAt(T.sweep + sweepDur * 0.62),
          transform: `translateY(${slot.bottom + 24}px)`,
          easing: "ease-out",
        },
        { offset: 1, transform: `translateY(${vh}px)` },
      ],
      { duration: T.sweepEnd },
    );

    // lines grow out of the anchor with the sweep
    glHero.style.top = `${slot.bottom - 1}px`;
    run(glHero, [{ transform: "scaleX(0)" }, { transform: "scaleX(1)" }], {
      delay: T.sweep + 80,
      duration: 640,
      easing: EXPO,
    });
    glRight.style.left = `${plate.right - 1}px`;
    run(glRight, [{ transform: "scaleY(0)" }, { transform: "scaleY(1)" }], {
      delay: T.sweep + sweepDur * 0.5,
      duration: 480,
      easing: EXPO,
    });
    // marks pop as the structure reaches their intersections
    pmB.style.left = `${plate.left}px`;
    pmB.style.top = `${slot.bottom}px`;
    pmA.style.left = `${plate.right}px`;
    pmA.style.top = `${anchor.y}px`;
    [
      { pm: pmB, at: T.sweep + 240 },
      { pm: pmA, at: T.sweep + sweepDur * 0.62 },
    ].forEach(({ pm, at: when }) =>
      run(
        pm,
        [
          { transform: "translate(-50%, -50%) scale(0)", opacity: 0 },
          { transform: "translate(-50%, -50%) scale(1)", opacity: 1 },
        ],
        { delay: when, duration: 260, easing: EXPO },
      ),
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
      {/* the reveal curtains: hatch-painted covers (identical to the body
          background) that retreat right/down from the anchor, unmasking
          the real page beneath. Cover everything until the sweep. */}
      <div data-f="cr" className={styles.curtainR} />
      <div data-f="cb" className={styles.curtainB} />
      {/* structural lines + marks growing out of the anchor (above the
          curtains — the drafting lines span the hatch, per the storyboard) */}
      <span data-f="glr" className={styles.glVert} />
      <span data-f="glh" className={styles.glHorz} />
      <svg data-f="pma" className={styles.pm} viewBox="0 0 32 32" fill="none">
        <path d="M16 0V32M0 16H32" stroke="var(--black)" strokeWidth="4" />
      </svg>
      <svg data-f="pmb" className={styles.pm} viewBox="0 0 32 32" fill="none">
        <path d="M16 0V32M0 16H32" stroke="var(--black)" strokeWidth="4" />
      </svg>
      {/* the registration mark: starts as x (rotated plus), turns upright */}
      <svg data-f="mark" className={styles.mark} viewBox="0 0 32 32" fill="none">
        <path d="M16 0V32M0 16H32" stroke="var(--black)" strokeWidth="4" />
      </svg>
    </div>
  );
}
