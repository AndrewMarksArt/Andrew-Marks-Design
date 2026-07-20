"use client";

import { useEffect } from "react";
import styles from "./OperatingRecord.module.css";

/**
 * Zero-UI enhancement for OperatingRecord. The section is fully functional
 * without this (native details/summary); everything here is additive:
 * deep-link open, Esc-close, print open-all, selection guard, cursor tip,
 * and the WAAPI fold/unfold controller (BootFilm is the WAAPI precedent).
 * NO scroll-compensation JS — native scroll anchoring owns the reflow
 * (pre-build review A3). Single effect + full cleanup = StrictMode-safe.
 */
export default function OperatingRecordEnhance() {
  useEffect(() => {
    const section = document.getElementById("operating-record-section");
    if (!section) return;
    const all = () =>
      Array.from(section.querySelectorAll<HTMLDetailsElement>("details"));

    // --- WAAPI fold/unfold controller -----------------------------------
    const APPLE = "cubic-bezier(0.455, 0.03, 0.515, 0.955)";
    const OPEN_MS = 320;
    const CLOSE_MS = 260;
    // live check per toggle (never cached): the CSS PRM kill-switch cannot
    // reach WAAPI, so this JS gate is load-bearing; mid-session OS toggles
    // take effect on the very next click.
    const prm = window.matchMedia("(prefers-reduced-motion: reduce)");
    const anims = new Map<HTMLDetailsElement, Animation>();
    const readoutOf = (d: HTMLDetailsElement) =>
      d.querySelector<HTMLElement>(`:scope > .${styles.readout}`);
    const settle = (d: HTMLDetailsElement) => {
      anims.get(d)?.cancel();
      anims.delete(d);
      delete d.dataset.anim;
    };
    // physical properties on purpose (horizontal-tb section; WebKit logical-
    // keyframe support was historically patchy). offsetHeight is border-box —
    // correct here because globals.css sets * { box-sizing: border-box }.
    const boxOf = (r: HTMLElement) => {
      const cs = getComputedStyle(r);
      return {
        height: `${r.offsetHeight}px`,
        paddingBottom: cs.paddingBottom,
        marginTop: cs.marginTop,
      };
    };
    const ZERO = { height: "0px", paddingBottom: "0px", marginTop: "0px" };

    const openRecord = (d: HTMLDetailsElement) => {
      const r = readoutOf(d);
      if (!r || prm.matches) {
        settle(d);
        d.open = true;
        return;
      }
      // interrupt-safe: measure the mid-flight box BEFORE cancel
      const from = d.dataset.anim === "close" ? boxOf(r) : ZERO;
      settle(d);
      d.open = true; // name-exclusivity snaps the sibling shut HERE (instant by design)
      const to = boxOf(r); // post-open natural box, same task — no paint between
      d.dataset.anim = "open"; // gates .record[data-anim] .readout overflow: clip
      const a = r.animate([from, to], { duration: OPEN_MS, easing: APPLE });
      anims.set(d, a);
      a.onfinish = () => settle(d); // ends AT natural auto height — no snap, no inline styles left
    };

    const closeRecord = (d: HTMLDetailsElement) => {
      const r = readoutOf(d);
      if (!r || prm.matches) {
        settle(d);
        d.open = false;
        return;
      }
      if (d.dataset.anim === "close") return; // already folding
      const from = boxOf(r); // natural, or mid-flight when interrupting an open
      settle(d);
      d.dataset.anim = "close";
      // fill:"forwards" is load-bearing: it holds height 0 until open=false
      // lands; default fill would flash the readout at full height.
      const a = r.animate([from, ZERO], {
        duration: CLOSE_MS,
        easing: APPLE,
        fill: "forwards",
      });
      anims.set(d, a);
      // onfinish (not .finished promise): never fires when an interrupt
      // cancels. ORDER MATTERS: open=false BEFORE settle/cancel.
      a.onfinish = () => {
        d.open = false;
        settle(d);
      };
    };

    // deep-link: instant by design (the browser is simultaneously scrolling
    // to the anchor). settle() first — a mid-close fill:"forwards" would
    // otherwise strand the readout at 0px height with open=true.
    const openFromHash = () => {
      const id = window.location.hash.slice(1);
      if (!id.startsWith("rec-")) return;
      const el = document.getElementById(id);
      if (el instanceof HTMLDetailsElement) {
        settle(el);
        el.open = true;
      }
    };
    openFromHash();

    // print: exclusive-open `name` makes "open all" impossible while set —
    // drop the attribute, open, then restore open-state BEFORE re-adding the
    // name. settle() everything first so no fill is mid-flight in the snapshot.
    let prior: boolean[] = [];
    const onBeforePrint = () => {
      const a = all();
      a.forEach((d) => settle(d));
      prior = a.map((d) => d.open);
      a.forEach((d) => {
        d.removeAttribute("name");
        d.open = true;
      });
    };
    const onAfterPrint = () => {
      const a = all();
      a.forEach((d, i) => {
        d.open = prior[i] ?? false;
      });
      a.forEach((d) => d.setAttribute("name", "operating-record"));
    };

    // --- cursor tip: fine pointers only, decorative, viewport-clamped ----
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    let tip: HTMLDivElement | null = null;
    let tipW = 0;
    let tipH = 0;
    const setTipLabel = (t: string) => {
      if (!tip || tip.textContent === t) return;
      tip.textContent = t;
      tipW = tip.offsetWidth; // measured only on label change — twice, ever
      tipH = tip.offsetHeight;
    };
    const ensureTip = () => {
      if (tip || !finePointer.matches) return;
      tip = document.createElement("div");
      tip.className = styles.tip;
      tip.setAttribute("aria-hidden", "true");
      document.body.appendChild(tip);
      setTipLabel("EXPAND"); // primes the size cache
    };
    ensureTip();
    const hideTip = () => {
      if (tip) delete tip.dataset.on;
    };
    const onFinePointerChange = () => {
      if (finePointer.matches) {
        ensureTip();
      } else {
        tip?.remove();
        tip = null;
      }
    };
    let lastX = -1;
    let lastY = -1;
    const onPointerMove = (e: PointerEvent) => {
      if (!tip) return;
      // hybrid devices: touch drags must never drive the chip
      if (e.pointerType !== "mouse" && e.pointerType !== "pen") {
        hideTip();
        return;
      }
      lastX = e.clientX;
      lastY = e.clientY;
      const t = e.target instanceof Element ? e.target : null;
      const details = t?.closest("details");
      if (details && section.contains(details)) {
        setTipLabel(details.open ? "CLOSE" : "EXPAND");
        // clamp inside the visual viewport — html{overflow-x:clip} silently
        // swallows anything past the right edge. clientWidth/clientHeight
        // exclude the scrollbar.
        const x = Math.min(
          e.clientX + 16,
          document.documentElement.clientWidth - tipW - 8,
        );
        const y = Math.min(
          e.clientY + 18,
          document.documentElement.clientHeight - tipH - 8,
        );
        tip.style.transform = `translate3d(${x}px, ${y}px, 0)`;
        tip.dataset.on = "1";
      } else {
        hideTip();
      }
    };
    // 'toggle' doesn't bubble — capture catches it at the section. Refresh
    // the label in place (no EXPAND→gone→CLOSE blink) and settle a sibling
    // force-closed by name-exclusivity mid-animation.
    const onToggle = (e: Event) => {
      const d = e.target;
      if (d instanceof HTMLDetailsElement && !d.open) settle(d);
      if (!tip || !tip.dataset.on) return;
      const under = document.elementFromPoint(lastX, lastY);
      const det = under instanceof Element ? under.closest("details") : null;
      if (det && section.contains(det)) {
        setTipLabel(det.open ? "CLOSE" : "EXPAND");
      } else {
        hideTip();
      }
    };

    // Esc: dismiss the tip from anywhere first (WCAG 1.4.13 — magnification
    // users can't otherwise clear it), then close the open record. Guard
    // widened to body/null focus so Safari mouse-opens can Esc-close (Safari
    // never focuses a summary on click); safe against the boot film's Escape
    // skip — the film self-skips on rec-* deep links and records start closed.
    const onKeydown = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      hideTip();
      const ae = document.activeElement;
      if (!section.contains(ae) && ae !== document.body && ae !== null) return;
      const open = all().find((d) => d.open);
      if (!open) return;
      closeRecord(open);
      open.querySelector("summary")?.focus({ preventScroll: true });
    };

    // (a) a click ending a text selection inside the summary must not toggle
    // (recruiters copy exactly this text); (b) summary clicks route through
    // the controller — Enter/Space synthesize clicks, so keyboard gets the
    // same animated motion (parity); (c) the whole open record is
    // click-to-close on fine pointers only, never for AT-synthesized clicks.
    const onClick = (e: MouseEvent) => {
      if (!(e.target instanceof Element)) return;
      const sel = window.getSelection();
      const selecting = sel && !sel.isCollapsed;
      const summary = e.target.closest("summary");
      if (summary) {
        if (selecting && sel.anchorNode && summary.contains(sel.anchorNode)) {
          e.preventDefault();
          return;
        }
        const d = summary.closest("details");
        if (d instanceof HTMLDetailsElement && section.contains(d)) {
          e.preventDefault(); // controller owns the toggle
          if (!d.open || d.dataset.anim === "close") {
            openRecord(d);
          } else {
            closeRecord(d);
          }
        }
        return;
      }
      const details = e.target.closest("details");
      if (
        details instanceof HTMLDetailsElement &&
        details.open &&
        section.contains(details)
      ) {
        if (selecting) return; // copying readout text must not close it
        if (e.detail === 0) return; // AT-synthesized activation mid-read must not close
        if (!finePointer.matches) return; // coarse pointers: summary tap + Esc close instead
        closeRecord(details);
        details.querySelector("summary")?.focus({ preventScroll: true });
      }
    };

    window.addEventListener("hashchange", openFromHash);
    window.addEventListener("beforeprint", onBeforePrint);
    window.addEventListener("afterprint", onAfterPrint);
    window.addEventListener("scroll", hideTip, { passive: true });
    document.addEventListener("keydown", onKeydown);
    section.addEventListener("click", onClick);
    section.addEventListener("pointermove", onPointerMove);
    section.addEventListener("pointerleave", hideTip);
    section.addEventListener("toggle", onToggle, true);
    finePointer.addEventListener("change", onFinePointerChange);
    return () => {
      window.removeEventListener("hashchange", openFromHash);
      window.removeEventListener("beforeprint", onBeforePrint);
      window.removeEventListener("afterprint", onAfterPrint);
      window.removeEventListener("scroll", hideTip);
      document.removeEventListener("keydown", onKeydown);
      section.removeEventListener("click", onClick);
      section.removeEventListener("pointermove", onPointerMove);
      section.removeEventListener("pointerleave", hideTip);
      section.removeEventListener("toggle", onToggle, true);
      finePointer.removeEventListener("change", onFinePointerChange);
      anims.forEach((a) => a.cancel());
      anims.clear();
      all().forEach((d) => delete d.dataset.anim);
      tip?.remove();
      tip = null;
    };
  }, []);

  return null;
}
