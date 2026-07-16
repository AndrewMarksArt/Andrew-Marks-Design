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
const START_DELAY_MS = 1000; // after the subline container's boot fade
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

    // Type by Unicode code point, not UTF-16 index: the sheep emoji is a
    // surrogate pair (2 UTF-16 units) — slicing mid-pair would flash a
    // broken half-surrogate for one frame and count it as two steps.
    const units = Array.from(text);

    const typeFrom = (i: number) => {
      if (!alive) return;
      if (i >= units.length) {
        doneRef.current = true;
        // let the caret blink a few times, then rest (WCAG 2.2.2-friendly)
        timer = setTimeout(
          () => alive && setCaretVisible(false),
          CARET_REST_BLINKS * CARET_PHASE_MS * 2,
        );
        return;
      }
      setShown(units.slice(0, i + 1).join(""));
      const jitter = BASE_MS * (0.5 + Math.random());
      const extra = units[i] === " " ? SPACE_EXTRA_MS : 0;
      timer = setTimeout(() => typeFrom(i + 1), jitter + extra);
    };

    // Under the boot film, typing waits for the film's text beat instead
    // of the mount clock; a skip renders the full line instantly.
    const filmed = document.documentElement.hasAttribute("data-film");
    const onFilmText = () => {
      timer = setTimeout(() => typeFrom(0), START_DELAY_MS);
    };
    const onFilmSkip = () => {
      alive = false;
      clearTimeout(timer);
      setShown(text);
      setCaretVisible(false);
    };
    if (filmed) {
      if (document.documentElement.classList.contains("film-skip")) {
        onFilmSkip();
      } else if (document.documentElement.classList.contains("film-text")) {
        onFilmText();
      } else {
        window.addEventListener("am:film-text", onFilmText, { once: true });
        window.addEventListener("am:film-skip", onFilmSkip, { once: true });
      }
    } else {
      timer = setTimeout(() => typeFrom(0), START_DELAY_MS);
    }

    return () => {
      alive = false;
      clearTimeout(timer);
      window.removeEventListener("am:film-text", onFilmText);
      window.removeEventListener("am:film-skip", onFilmSkip);
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
