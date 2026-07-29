"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import styles from "./P1Gate.module.css";

/**
 * Password gate for the Platform One case study (Andrew's spec + Figma
 * password element 7086:3494 / locked-state example 7086:2148,
 * 2026-07-29): the hero stays readable; everything below renders
 * blurred and inert, with the password plate fixed in the viewport
 * center whenever the locked region is on screen. A correct entry
 * fades the plate and the blur out on the site's Apple ease
 * (cubic-bezier(0.455, 0.03, 0.515, 0.955)) and unlocks for the
 * session.
 *
 * The password is a soft screen-door for recruiters, not security —
 * it ships client-side by design. Swap PASSWORD when Andrew rotates
 * it.
 */

const PASSWORD = "P1_P@ss";
const STORAGE_KEY = "am-p1-unlocked";
/** unlock fade duration — the gentler pass Andrew asked for (2026-07-29) */
const LEAVE_MS = 820;

export default function P1Gate({ children }: { children: ReactNode }) {
  const [unlocked, setUnlocked] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const [error, setError] = useState(false);
  const [dialogOn, setDialogOn] = useState(false);
  const gateRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const focusedOnce = useRef(false);

  // Session persistence: unlock once per tab session (no animation on
  // the restored path — the visitor already saw it).
  useEffect(() => {
    try {
      if (sessionStorage.getItem(STORAGE_KEY) === "1") setUnlocked(true);
    } catch {
      /* storage blocked — gate simply stays per-load */
    }
  }, []);

  // The plate is only present while the locked region is actually on
  // screen — the hero above scrolls free of it.
  useEffect(() => {
    if (unlocked) return;
    const gate = gateRef.current;
    if (!gate) return;
    const io = new IntersectionObserver(
      ([entry]) => setDialogOn(entry.isIntersecting),
      { rootMargin: "-25% 0px -15% 0px" },
    );
    io.observe(gate);
    return () => io.disconnect();
  }, [unlocked]);

  // First appearance moves focus into the field so the keyboard path
  // costs zero extra clicks; later re-entries don't steal focus.
  useEffect(() => {
    if (dialogOn && !focusedOnce.current && !leaving) {
      focusedOnce.current = true;
      inputRef.current?.focus({ preventScroll: true });
    }
  }, [dialogOn, leaving]);

  const submit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const value = inputRef.current?.value ?? "";
      if (value !== PASSWORD) {
        setError(true);
        inputRef.current?.select();
        return;
      }
      setError(false);
      setLeaving(true);
      try {
        sessionStorage.setItem(STORAGE_KEY, "1");
      } catch {
        /* fine */
      }
      window.setTimeout(() => setUnlocked(true), LEAVE_MS);
    },
    [],
  );

  if (unlocked && !leaving) return <>{children}</>;
  if (unlocked) return <>{children}</>;

  return (
    <div
      ref={gateRef}
      className={leaving ? `${styles.gate} ${styles.leaving}` : styles.gate}
    >
      {/* The study stays in the document (layout, no reflow on unlock)
          but is unreadable, unclickable, unselectable, and out of the
          accessibility tree until the gate lifts. */}
      <div className={styles.lockedContent} aria-hidden inert>
        {children}
      </div>
      <div className={styles.veil} aria-hidden="true" />

      {/* Always mounted while locked so the plate can ease in and out
          (visibility gates focusability when hidden). */}
      <div
        className={
          dialogOn && !leaving
            ? `${styles.plateWrap} ${styles.plateWrapOn}`
            : styles.plateWrap
        }
        role="dialog"
        aria-label="This case study is password protected"
        aria-hidden={!dialogOn || undefined}
      >
          {/* Andrew's password window (Figma 7086:3494): dark 40px tile
              grid, orange hatch tiles, one orange mono prompt, a white
              pill input — no button, Enter submits (single-input forms
              submit implicitly). */}
          <form className={styles.plate} onSubmit={submit}>
            <span className={`${styles.hatch} ${styles.hatchTl}`} aria-hidden="true" />
            <span className={`${styles.hatch} ${styles.hatchTr}`} aria-hidden="true" />
            <span className={`${styles.hatch} ${styles.hatchBr}`} aria-hidden="true" />
            <label className={styles.platePrompt} htmlFor="p1-gate-password">
              Enter Password to see full case study:
            </label>
            <input
              ref={inputRef}
              id="p1-gate-password"
              className={
                error
                  ? `${styles.plateInput} ${styles.plateInputError}`
                  : styles.plateInput
              }
              type="password"
              autoComplete="off"
              spellCheck={false}
              aria-invalid={error || undefined}
              aria-describedby={error ? "p1-gate-error" : undefined}
              onChange={() => setError(false)}
            />
            {error && (
              <p id="p1-gate-error" className={styles.plateError}>
                {"// ACCESS_DENIED — CHECK THE PASSWORD AND TRY AGAIN"}
              </p>
            )}
          </form>
      </div>
    </div>
  );
}
