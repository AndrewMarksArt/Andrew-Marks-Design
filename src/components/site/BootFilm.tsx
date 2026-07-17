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
// Apple's easeInOutQuad (verified from their shipped easing table) — the
// gentle voice for the reveal sweep, the post-reveal cadence, and (since
// Andrew's fluidity pass 2026-07-16) the whole A-C opening: spin, rule
// draw, and corner travel all ride this curve.
const APPLE = "cubic-bezier(0.455, 0.03, 0.515, 0.955)";

// beat schedule (ms from film start). Opening rebuilt to Andrew's spoken
// storyboard (2026-07-16): still hatch → the x FADES in → hold → rotate
// into the plus → beat → the rules draw out of it → beat → glide to the
// corner → reveal. The 300ms stillness + 350ms fade also spend the
// hydration tail (fonts settling, the robot atlas decode kicking off) on
// a frame that cannot visibly stutter — motion starts ~850ms in, when
// the main thread has gone quiet. Everything from the sweep onward keeps
// its internal rhythm, shifted by the longer opening.
const T = {
  fadeIn: 300, //   the x fades in over 350ms (start frame is pure hatch)
  spin: 850, //     A: x does a full spin, growing into the plus (done 1470)
  rulesOut: 1620, // B: rules draw to the edges after a 150ms beat (done 2160)
  travel: 2240, //  C: crosshair to anchor after an 80ms beat (lands 2580)
  sweep: 2680, //   D/E: ONE continuous reveal wipe out of the anchor
  sweepEnd: 3880,
  handoff: 3940, // curtains gone; overlay crosshair fades
  chrome: 4260, //  meta types, NameMark rises
  text: 4600, //    hero text ladder (existing) + typewriter — tightened
  //                from chrome+600 to chrome+340 (Andrew: text arrived a
  //                beat late; it now starts while the NameMark is still
  //                rising, same overlap the pre-rebuild pacing had)
};

export default function BootFilm() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const docEl = document.documentElement;
    const root = rootRef.current;
    if (!root || !docEl.hasAttribute("data-film")) return;

    // One film per page load. StrictMode (dev) re-runs this effect on the
    // SAME root mid-film — bail and leave the film alone (the cleanup
    // below no-ops for the same reason), otherwise every animation is
    // cancelled and rebuilt inside the film's first frame, which reads as
    // a stutter on the mark spin. A FRESH root while the stamp persists
    // must not replay — hide it and bail.
    if (docEl.hasAttribute("data-film-started")) {
      if (!root.hasAttribute("data-film-running")) root.style.display = "none";
      return;
    }
    docEl.setAttribute("data-film-started", "");
    root.setAttribute("data-film-running", "");

    // Once the film has fully settled, drop its state from <html>: every
    // film-gated rule's end state equals its base state, so removal is
    // visually a no-op — but the attribute survives client-side
    // navigation, where it retyped the navbar on case pages and replayed
    // the whole film on returns home (closing UX audit F2).
    const releaseFilmState = () => {
      docEl.classList.remove(
        "film-page",
        "film-chrome",
        "film-text",
        "film-skip",
      );
      docEl.removeAttribute("data-film");
      docEl.removeAttribute("data-film-started");
    };

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
        // skip pins every final state instantly — release right away
        releaseFilmState();
      } else {
        // natural finish: wait out NameMark's 750ms chrome rise
        timers.push(setTimeout(releaseFilmState, 850));
      }
      skipEvents.forEach((t) => window.removeEventListener(t, onSkip));
    };
    const onSkip = () => finishFilm(true);
    const skipEvents = ["pointerdown", "keydown", "wheel", "touchstart"];

    let finished = false;
    const anims: Animation[] = [];
    const timers: ReturnType<typeof setTimeout>[] = [];

    // A page restored mid-scroll shouldn't play a film pinned to the top.
    // Dispatch the skip event too: listeners gated on the film (HeroGaze's
    // draw latch) must wake even though the film never ran.
    if (window.scrollY > 4) {
      docEl.classList.add("film-page", "film-chrome", "film-text", "film-skip");
      window.dispatchEvent(new Event("am:film-skip"));
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
      window.dispatchEvent(new Event("am:film-skip"));
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
    const SPAN = 2580; // 0 .. end of travel (landing pinned — sweep depends on it)
    const at = (ms: number) => ms / SPAN;

    // the x fades in out of the still hatch (its CSS base opacity is 0 —
    // the film's first 300ms shows nothing but the page background)
    run(mark, [{ opacity: 0 }, { opacity: 1 }], {
      delay: T.fadeIn,
      duration: 350,
      easing: APPLE,
    });

    // mark: hold as the x while it fades in, full spin x -> + while
    // growing (850..1470, Apple ease), hold while the rules draw, then
    // glide to the anchor (2240..2580, Apple ease). Lands at scale(1) =
    // exactly the real 32px corner mark it sits down on. 45deg -> 360deg
    // reads as a full revolution for the 4-fold-symmetric mark.
    run(
      mark,
      [
        {
          offset: 0,
          transform: "translate(-50%, -50%) rotate(45deg) scale(0.72)",
        },
        {
          offset: at(T.spin),
          transform: "translate(-50%, -50%) rotate(45deg) scale(0.72)",
          easing: APPLE,
        },
        {
          offset: at(1470),
          transform: "translate(-50%, -50%) rotate(360deg) scale(1)",
        },
        {
          offset: at(T.travel),
          transform: "translate(-50%, -50%) rotate(360deg) scale(1)",
          easing: APPLE,
        },
        {
          offset: 1,
          transform: `translate(-50%, -50%) translate(${dx}px, ${dy}px) rotate(360deg) scale(1)`,
        },
      ],
      { duration: SPAN },
    );

    // rules: draw out of the landed plus (1620..2160, Apple ease),
    // breathe, travel with the mark (2240..2580)
    run(
      hRule,
      [
        { offset: 0, transform: "scaleX(0) translateY(0)" },
        { offset: at(T.rulesOut), transform: "scaleX(0) translateY(0)", easing: APPLE },
        { offset: at(2160), transform: "scaleX(1) translateY(0)" },
        { offset: at(T.travel), transform: "scaleX(1) translateY(0)", easing: APPLE },
        { offset: 1, transform: `scaleX(1) translateY(${dy}px)` },
      ],
      { duration: SPAN },
    );
    run(
      vRule,
      [
        { offset: 0, transform: "scaleY(0) translateX(0)" },
        { offset: at(T.rulesOut), transform: "scaleY(0) translateX(0)", easing: APPLE },
        { offset: at(2160), transform: "scaleY(1) translateX(0)" },
        { offset: at(T.travel), transform: "scaleY(1) translateX(0)", easing: APPLE },
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
    // real rules/mark that jump reveals — then ONE continuous glide to the
    // far edge (a pinned mid-keyframe made the reveal read as two jerky
    // sections; Andrew's ruling: single sweep, Apple's gentle ease).
    const sAt = (ms: number) => ms / T.sweepEnd;
    // The curtains never move — only their clip-path inset animates. The
    // hatch is viewport-locked by construction (no counter-translating
    // inner layer), and film start promotes ZERO full-viewport layers —
    // the old model promoted four at the hydration tail, landing a raster
    // burst exactly on the mark spin (the beat-A stutter, perf audit).
    // Trade-off: clip-path animation is main-thread-driven in every stable
    // engine, but the sweep window is main-thread-quiet and this exact
    // model passed Andrew's QA in the 2026-07-16 perf pass.
    const sweep = (el: HTMLElement, side: "left" | "top", jump: number, max: number) => {
      const inset = (px: number) =>
        side === "left" ? `inset(0 0 0 ${px}px)` : `inset(${px}px 0 0 0)`;
      run(
        el,
        [
          { offset: 0, clipPath: inset(0) },
          { offset: sAt(T.sweep), clipPath: inset(0) },
          { offset: sAt(T.sweep + 16), clipPath: inset(jump), easing: APPLE },
          { offset: 1, clipPath: inset(max) },
        ],
        { duration: T.sweepEnd },
      );
    };
    sweep(curtR, "left", anchor.x, vw);
    sweep(curtB, "top", anchor.y, vh);

    // The hero-section bottom rule + its plus mark appear WITH the wipe,
    // not before it (Andrew, 2026-07-16: at a fixed sweep+100 delay they
    // floated on the hatch ~800ms before the edge reached their row).
    // Start each as curtB's Apple-eased edge passes it: APPLE is
    // easeInOutQuad, which inverts analytically.
    const invApple = (p: number) =>
      p <= 0 ? 0 : p >= 1 ? 1 : p < 0.5 ? Math.sqrt(p / 2) : 1 - Math.sqrt((1 - p) / 2);
    const glideStart = T.sweep + 16;
    const glideDur = T.sweepEnd - glideStart;
    const rowRevealAt = (y: number) =>
      glideStart + glideDur * invApple((y - anchor.y) / (vh - anchor.y));
    const heroLineAt = rowRevealAt(slot.bottom - 1);
    glHero.style.top = `${slot.bottom - 1}px`;
    run(glHero, [{ transform: "scaleX(0)" }, { transform: "scaleX(1)" }], {
      delay: heroLineAt,
      // always lands before the handoff crossfade begins
      duration: Math.max(140, Math.min(320, T.handoff - 40 - heroLineAt)),
      easing: EXPO,
    });
    // the right rule + far marks land as the (Apple-eased) edge reaches them
    glRight.style.left = `${plate.right - 1}px`;
    run(glRight, [{ transform: "scaleY(0)" }, { transform: "scaleY(1)" }], {
      delay: T.sweep + sweepDur * 0.72,
      duration: 420,
      easing: EXPO,
    });
    pmB.style.left = `${plate.left}px`;
    pmB.style.top = `${slot.bottom}px`;
    pmA.style.left = `${plate.right}px`;
    pmA.style.top = `${anchor.y}px`;
    [
      // pmB sits ON the hero bottom rule — it pops as that rule draws
      { pm: pmB, at: heroLineAt + 60 },
      { pm: pmA, at: T.sweep + sweepDur * 0.8 },
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
      // Mid-film this is StrictMode's simulated unmount (dev) — leave the
      // film alone (cancelling rebuilds everything in the first frame). A
      // real unmount can't arrive mid-film: navigating requires an input,
      // and any input skips and finishes the film first.
      if (!finished) return;
      timers.forEach(clearTimeout);
      anims.forEach((a) => a.cancel());
      skipEvents.forEach((t) => window.removeEventListener(t, onSkip));
    };
  }, []);

  return (
    <div ref={rootRef} className={styles.overlay} aria-hidden="true">
      {/* horizontal + vertical viewport rules (grow from center, then
          travel). They paint ABOVE the hatch curtains — the curtains sit
          at z -1 at the back of the overlay — so the beat-B draw is
          actually visible (it regressed behind the curtains when the
          reveal became a mask wipe). */}
      <span data-f="h" className={styles.hRule} />
      <span data-f="v" className={styles.vRule} />
      {/* the reveal curtains: hatch-painted covers whose clip-path insets
          retreat right/down from the anchor, unmasking the real page
          beneath. The elements never move, so the hatch stays viewport-
          locked with no counter-translating inner layer. Cover everything
          until the sweep. */}
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
