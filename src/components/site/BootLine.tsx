"use client";

import { useEffect, useRef, useState } from "react";

/**
 * The hero's typed terminal line (research spike 002, Andrew's pick).
 * One-shot typewriter reusing the placeholder's rAF engine idea, with the
 * spike's craft recipe: human-jittered cadence (base 30ms/char, uniform
 * [0.5x, 1.5x] jitter — TypeIt's verified formula), an extra beat after
 * spaces, and a caret that blinks three times after completion, then rests.
 *
 * Accessibility (critic-verified): aria-label on a <p> is spec-prohibited
 * (name-prohibited role), and per-keystroke announcements are screen-reader
 * spam — so the FULL sentence ships visually-hidden and static while the
 * animated copy is aria-hidden. The server renders the full sentence in the
 * typed slot too (no-JS visitors see everything); the client clears it at
 * mount — while the line is still inside its CSS boot fade, so the swap is
 * invisible. Reduced motion renders the full line immediately.
 */

const BASE_MS = 30;
const SPACE_EXTRA_MS = 75;
const START_DELAY_MS = 1200; // after the subline container's boot fade
const CARET_REST_BLINKS = 3;
const CARET_PHASE_MS = 530; // OS caret convention

export default function BootLine({
  text,
  className,
  caretClassName,
}: {
  text: string;
  className?: string;
  caretClassName?: string;
}) {
  const [shown, setShown] = useState(text); // SSR: full sentence (no-JS safe)
  const [caretVisible, setCaretVisible] = useState(false);
  const doneRef = useRef(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(text);
      return;
    }

    let alive = true;
    let timer: ReturnType<typeof setTimeout>;
    setShown("");
    setCaretVisible(true);

    const typeFrom = (i: number) => {
      if (!alive) return;
      if (i >= text.length) {
        doneRef.current = true;
        // let the caret blink a few times, then rest (WCAG 2.2.2-friendly)
        timer = setTimeout(
          () => alive && setCaretVisible(false),
          CARET_REST_BLINKS * CARET_PHASE_MS * 2,
        );
        return;
      }
      setShown(text.slice(0, i + 1));
      const jitter = BASE_MS * (0.5 + Math.random());
      const extra = text[i] === " " ? SPACE_EXTRA_MS : 0;
      timer = setTimeout(() => typeFrom(i + 1), jitter + extra);
    };

    timer = setTimeout(() => typeFrom(0), START_DELAY_MS);
    return () => {
      alive = false;
      clearTimeout(timer);
    };
  }, [text]);

  return (
    <span className={className}>
      <span className="visually-hidden">{text}</span>
      <span aria-hidden="true">{shown}</span>
      {caretVisible && (
        <span className={caretClassName} aria-hidden="true">
          _
        </span>
      )}
    </span>
  );
}
