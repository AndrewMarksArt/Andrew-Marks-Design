"use client";

import { useEffect } from "react";
import styles from "./OperatingRecord.module.css";

/**
 * Zero-UI enhancement for OperatingRecord. The section is fully
 * functional without this (native details/summary); everything here is
 * additive: deep-link open, Esc-close, print open-all, selection guard.
 * NO scroll-compensation JS — native scroll anchoring owns the
 * exclusive-close reflow (pre-build review A3: toggle fires post-paint,
 * and bare scrollBy would glide under html{scroll-behavior:smooth}).
 * Single effect + full cleanup = StrictMode-safe without latches.
 */
export default function OperatingRecordEnhance() {
  useEffect(() => {
    const section = document.getElementById("operating-record-section");
    if (!section) return;
    const all = () =>
      Array.from(section.querySelectorAll<HTMLDetailsElement>("details"));

    const openFromHash = () => {
      const id = window.location.hash.slice(1);
      if (!id.startsWith("rec-")) return;
      const el = document.getElementById(id);
      if (el instanceof HTMLDetailsElement) el.open = true;
    };
    openFromHash();

    // print: exclusive-open `name` makes "open all" impossible while set —
    // drop the attribute, open, then restore open-state BEFORE re-adding
    // the name (or the restore itself re-triggers exclusivity)
    let prior: boolean[] = [];
    const onBeforePrint = () => {
      const a = all();
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

    // Esc closes the open record and returns focus to its summary —
    // scoped to focus-inside-section, so the boot film's window-level
    // Escape skip never collides (film runs with focus on <body>)
    const onKeydown = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (!section.contains(document.activeElement)) return;
      const open = all().find((d) => d.open);
      if (!open) return;
      open.open = false;
      open
        .querySelector("summary")
        ?.focus({ preventScroll: true });
    };

    // (a) a click that ends a text selection inside the summary should not
    // toggle the row — recruiters copy exactly this text; (b) the whole
    // open record is click-to-close (Andrew's spec), same selection guard
    const onClick = (e: MouseEvent) => {
      if (!(e.target instanceof Element)) return;
      const sel = window.getSelection();
      const selecting = sel && !sel.isCollapsed;
      const summary = e.target.closest("summary");
      if (summary) {
        if (selecting && sel.anchorNode && summary.contains(sel.anchorNode)) {
          e.preventDefault();
        }
        return; // native toggle handles summary clicks
      }
      const details = e.target.closest("details");
      if (
        details instanceof HTMLDetailsElement &&
        details.open &&
        section.contains(details)
      ) {
        if (selecting) return; // copying readout text must not close it
        details.open = false;
        details
          .querySelector("summary")
          ?.focus({ preventScroll: true });
      }
    };

    // cursor-following "EXPAND" tip over closed records — fine pointers
    // only; decorative (aria-hidden, no pointer events); hides the moment
    // a record opens (Andrew's spec: tip only while the section is closed)
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    let tip: HTMLDivElement | null = null;
    if (finePointer.matches) {
      tip = document.createElement("div");
      tip.className = styles.tip;
      tip.textContent = "EXPAND";
      tip.setAttribute("aria-hidden", "true");
      document.body.appendChild(tip);
    }
    const hideTip = () => {
      if (tip) delete tip.dataset.on;
    };
    const onPointerMove = (e: PointerEvent) => {
      if (!tip) return;
      const t = e.target instanceof Element ? e.target : null;
      const details = t?.closest("details");
      if (details && !details.open && section.contains(details)) {
        tip.style.transform = `translate3d(${e.clientX + 16}px, ${e.clientY + 18}px, 0)`;
        tip.dataset.on = "1";
      } else {
        hideTip();
      }
    };
    // 'toggle' doesn't bubble — capture catches it at the section
    const onToggle = () => hideTip();

    window.addEventListener("hashchange", openFromHash);
    window.addEventListener("beforeprint", onBeforePrint);
    window.addEventListener("afterprint", onAfterPrint);
    document.addEventListener("keydown", onKeydown);
    section.addEventListener("click", onClick);
    section.addEventListener("pointermove", onPointerMove);
    section.addEventListener("pointerleave", hideTip);
    section.addEventListener("toggle", onToggle, true);
    return () => {
      window.removeEventListener("hashchange", openFromHash);
      window.removeEventListener("beforeprint", onBeforePrint);
      window.removeEventListener("afterprint", onAfterPrint);
      document.removeEventListener("keydown", onKeydown);
      section.removeEventListener("click", onClick);
      section.removeEventListener("pointermove", onPointerMove);
      section.removeEventListener("pointerleave", hideTip);
      section.removeEventListener("toggle", onToggle, true);
      tip?.remove();
    };
  }, []);

  return null;
}
