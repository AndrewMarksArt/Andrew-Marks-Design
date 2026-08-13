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

// beat schedule (ms from film start). Opening per Andrew's spoken
// storyboard (2026-07-16): still hatch → the x FADES in → hold → rotate
// into the plus → beat → the rules draw out of it → beat → glide to the
// corner → reveal. RETIMED 2026-07-20 (Andrew: ~5s "feels a bit long"):
// every beat kept, tempo tightened ~25% — text lands at 3450 (was 4600),
// the reveal starts at 2050 (was 2680). The opening quiet (still + fade
// + hold = 760ms before the spin) is compressed only mildly: it spends
// the hydration tail (fonts settling, atlas decode) on frames that
// cannot visibly stutter — the perf audit once caught a raster burst
// landing exactly on the spin start; QA should watch that beat.
const T = {
  fadeIn: 260, //   the x fades in over 300ms (start frame is pure hatch)
  spin: 760, //     A: x does a full spin, growing into the plus (done 1200)
  rulesOut: 1300, // B: rules draw to the edges after a 100ms beat (done 1660)
  travel: 1720, //  C: crosshair to anchor after a 60ms beat (lands 1970)
  sweep: 2050, //   D/E: ONE continuous reveal wipe out of the anchor
  sweepEnd: 2890,
  handoff: 2950, // curtains gone; overlay crosshair fades
  chrome: 3200, //  meta types, NameMark rises
  text: 3450, //    hero text ladder (existing) + typewriter (chrome+250 —
  //                keeps the arrives-while-NameMark-rises overlap Andrew
  //                ratified, proportionally tightened with the rest)
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
      // Once-per-session is a pass the VIEWER spends, not the machine
      // (Andrew's live catch, 2026-08-02: a health-skip was burning the
      // pass, so the film never played for sessions that never saw it).
      // Health verdicts that fire before any real beat — render-delay,
      // stall — leave the pass intact so the next load retries; input
      // skips and anything mid-film mark it seen.
      const v = docEl.getAttribute("data-film-verdict");
      if (v !== "render-delay" && v !== "stall") {
        try {
          sessionStorage.setItem("am-film-seen", "1");
        } catch {
          /* private mode */
        }
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
      document.removeEventListener("visibilitychange", onHide);
    };
    // Every skip verdict stamps WHY on <html> (data-film-verdict) — it
    // survives releaseFilmState, so QA can always ask which door the
    // film left through.
    const verdict = (why: string) => docEl.setAttribute("data-film-verdict", why);
    const onSkip = () => {
      verdict("input");
      finishFilm(true);
    };
    const skipEvents = ["pointerdown", "keydown", "wheel", "touchstart"];

    let finished = false;
    const anims: Animation[] = [];
    const timers: ReturnType<typeof setTimeout>[] = [];

    // Skip listeners attach BEFORE the frame-health gate below, so input
    // during the wait still skips straight to the finished page.
    skipEvents.forEach((t) =>
      window.addEventListener(t, onSkip, { passive: true }),
    );
    // Leaving the tab mid-film used to mean rejoining a film that had kept
    // playing on the clock — the same mid-flight corruption the health
    // gate exists to prevent. Hidden tab -> land the finished page.
    const onHide = () => {
      if (document.hidden) {
        verdict("hidden");
        finishFilm(true);
      }
    };
    document.addEventListener("visibilitychange", onHide);

    // A page restored mid-scroll shouldn't play a film pinned to the top.
    // Dispatch the skip event too: listeners gated on the film (HeroGaze's
    // draw latch) must wake even though the film never ran.
    if (window.scrollY > 4) {
      verdict("scroll-restore");
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

    const startFilm = () => {
      if (finished) return;

      // ---- measure the real page (hidden, but laid out) ----
      const plateEl = document.querySelector(".plateMain");
      const metaRuleEl = document.querySelector('[class*="metaBar"] hr');
      const heroCanvas = document.querySelector('canvas[class*="robot"]');
      if (!plateEl || !heroCanvas) {
        // structure missing (shouldn't happen) — bail to the finished page
        verdict("structure");
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
      const SPAN = 1970; // 0 .. end of travel (landing pinned — sweep depends on it)
      const at = (ms: number) => ms / SPAN;

      // the x fades in out of the still hatch (its CSS base opacity is 0 —
      // the film's first 260ms shows nothing but the page background)
      run(mark, [{ opacity: 0 }, { opacity: 1 }], {
        delay: T.fadeIn,
        duration: 300,
        easing: APPLE,
      });

      // mark: hold as the x while it fades in, full spin x -> + while
      // growing (760..1200, Apple ease), hold while the rules draw, then
      // glide to the anchor (1720..1970, Apple ease). Lands at scale(1) =
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
            offset: at(1200),
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

      // rules: draw out of the landed plus (1300..1660, Apple ease),
      // breathe, travel with the mark (1720..1970)
      run(
        hRule,
        [
          { offset: 0, transform: "scaleX(0) translateY(0)" },
          { offset: at(T.rulesOut), transform: "scaleX(0) translateY(0)", easing: APPLE },
          { offset: at(1660), transform: "scaleX(1) translateY(0)" },
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
          { offset: at(1660), transform: "scaleY(1) translateX(0)" },
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

      // The anchor was measured at film start; a late web-font swap can
      // reflow the page a few px BETWEEN measurement and the reveal, and
      // the landed crosshair then sits just below the real rules — a
      // doubled line + plus marks through the whole sweep, vanishing
      // when the overlay fades (Andrew's catch, 2026-08-06). Re-measure
      // as the sweep begins and close any residual gap: the CSS
      // translate longhand composes with the WAAPI transforms so the
      // nudge never fights the animations, and the beat-D furniture that
      // has not appeared yet simply re-anchors before its pop.
      timers.push(
        setTimeout(() => {
          if (finished || !realMark) return;
          const r = realMark.getBoundingClientRect();
          const dxFix = r.left + r.width / 2 - anchor.x;
          const dyFix = r.top + r.height / 2 - anchor.y;
          if (Math.abs(dxFix) < 0.5 && Math.abs(dyFix) < 0.5) return;
          mark.style.translate = `${dxFix}px ${dyFix}px`;
          hRule.style.translate = `0px ${dyFix}px`;
          vRule.style.translate = `${dxFix}px 0px`;
          const slotNow = heroCanvas.getBoundingClientRect();
          const plateNow = plateEl.getBoundingClientRect();
          glHero.style.top = `${slotNow.bottom - 1}px`;
          glRight.style.left = `${plateNow.right - 1}px`;
          pmB.style.left = `${plateNow.left}px`;
          pmB.style.top = `${slotNow.bottom}px`;
          pmA.style.left = `${plateNow.right}px`;
          pmA.style.top = `${anchor.y + dyFix}px`;
        }, T.sweep),
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

    };

    // ---- frame-health gate (2026-07-30, the real regression-#2 fix) ----
    // The film's WAAPI clock runs whether or not the compositor can
    // present frames. On a starved GPU (Andrew's daily setup: Figma + a
    // many-tab Chrome sharing a 2GB-VRAM iGPU driving a 4K panel at DPR
    // 2.5) frames present at 5-10fps and first paint itself arrives late —
    // the film "plays in the background" and the viewer joins mid-flight:
    // white, then flashes, then the reveal. Reproduced under a synthetic
    // WebGL burner; unreproducible in any healthy browser instance. No
    // retiming of the beats can fix a machine that isn't presenting
    // frames, so the film defends itself with three verdicts, all landing
    // via the existing skip path (one clean frame lands the final page):
    //   1. RENDER DELAY — if first paint arrived >500ms after the response
    //      finished (healthy: <300ms even at 4K; measured from responseEnd
    //      so slow networks don't lose the film), the machine has already
    //      proven it can't present: skip before the film starts.
    //   2. STALL BUDGET — the film starts instantly (no added latency; the
    //      quiet still-hatch opening doubles as the measurement window),
    //      and if frames dropped during the first 650ms exceed ~300ms of
    //      accumulated stall the page lands before the spin beat. Streak
    //      criteria failed here in testing: starved tabs surface lucky
    //      60fps bursts long enough to fool any short "N consecutive
    //      good frames" wait — budget the badness instead.
    //   3. WATCHDOG — through the reveal sweep, any single >600ms stall
    //      finishes the film instantly.
    const SAMPLE_MS = 650; //        verdict lands before the spin (760)
    const FRAME_OK_MS = 42; //       a frame within ~24fps counts as delivered
    const STALL_BUDGET_MS = 300; //  tolerates warmup hitches, fails starvation
    const WATCHDOG_STALL_MS = 600;
    let filmT0 = 0;
    let lastFrameT = 0;
    let stalled = 0;
    let healthRaf = 0;
    const watchdog = (now: number) => {
      if (finished) return; // natural text-beat finish or input skip
      if (now - filmT0 > T.sweepEnd + 200) return; // page revealed; done
      if (lastFrameT && now - lastFrameT > WATCHDOG_STALL_MS) {
        verdict("watchdog");
        finishFilm(true);
        return;
      }
      lastFrameT = now;
      healthRaf = requestAnimationFrame(watchdog);
    };
    const probe = (now: number) => {
      if (finished) return;
      if (lastFrameT) {
        const d = now - lastFrameT;
        if (d > FRAME_OK_MS) stalled += d - 17;
      }
      lastFrameT = now;
      if (stalled > STALL_BUDGET_MS) {
        verdict("stall");
        finishFilm(true); // starved: the finished page beats a broken film
        return;
      }
      healthRaf = requestAnimationFrame(
        now - filmT0 < SAMPLE_MS ? probe : watchdog,
      );
    };
    const beginFilm = (checkRenderDelay: boolean) => {
      if (finished) return;
      if (checkRenderDelay) {
        const nav = performance.getEntriesByType("navigation")[0] as
          | PerformanceNavigationTiming
          | undefined;
        const fp = performance
          .getEntriesByType("paint")
          .find((p) => p.name === "first-paint");
        const renderDelay = fp && nav ? fp.startTime - nav.responseEnd : 0;
        if (renderDelay > 500) {
          verdict("render-delay");
          finishFilm(true);
          return;
        }
      }
      filmT0 = performance.now();
      startFilm();
      healthRaf = requestAnimationFrame(probe);
    };
    // Background-tab opens (middle-click, "open in new tab") used to skip
    // AND burn the once-per-session pass — the film never played for a
    // session that never saw it (Andrew's live catch, 2026-08-02). The
    // page is invisible anyway, so HOLD the film and start it fresh the
    // first time the visitor actually looks. The render-delay verdict is
    // skipped on that path: first-paint timing is meaningless for a load
    // that spent minutes hidden.
    const onFirstVisible = () => {
      if (document.hidden || finished) return;
      document.removeEventListener("visibilitychange", onFirstVisible);
      beginFilm(false);
    };
    if (document.hidden) {
      document.addEventListener("visibilitychange", onFirstVisible);
    } else {
      beginFilm(true);
    }

    return () => {
      // Mid-film this is StrictMode's simulated unmount (dev) — leave the
      // film alone (cancelling rebuilds everything in the first frame). A
      // real unmount can't arrive mid-film: navigating requires an input,
      // and any input skips and finishes the film first.
      if (!finished) return;
      cancelAnimationFrame(healthRaf);
      timers.forEach(clearTimeout);
      anims.forEach((a) => a.cancel());
      skipEvents.forEach((t) => window.removeEventListener(t, onSkip));
      document.removeEventListener("visibilitychange", onFirstVisible);
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
