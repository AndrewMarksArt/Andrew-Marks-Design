"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  unlockP1,
  type UnlockState,
} from "../../../app/case-studies/platform-one/actions";
import styles from "./P1Gate.module.css";

/**
 * Locked-state view of the Platform One study (Andrew's password window,
 * Figma 7086:3494 / locked example 7086:2148). Server-gated since
 * 2026-07-31: this component renders INSTEAD of the study body — the
 * locked region is a pre-blurred capture of the real content
 * (p1-locked-preview.webp, illegible by construction), so the response
 * contains no gated text for View Source or crawlers to read. The plate
 * posts to a server action that checks P1_PASSWORD (env var, never in
 * the bundle) and sets an httpOnly session cookie; on success the plate
 * fades on the site's Apple ease and router.refresh() streams the real
 * study in.
 */

/** unlock fade duration — the gentler pass Andrew asked for (2026-07-29) */
const LEAVE_MS = 820;
const INITIAL: UnlockState = { ok: false, error: false };

export default function P1LockedGate() {
  const router = useRouter();
  const [state, formAction, pending] = useActionState(unlockP1, INITIAL);
  const [leaving, setLeaving] = useState(false);
  const [dialogOn, setDialogOn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const gateRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const focusedOnce = useRef(false);

  // The plate is only present while the locked region is actually on
  // screen — the hero above scrolls free of it.
  useEffect(() => {
    const gate = gateRef.current;
    if (!gate) return;
    const io = new IntersectionObserver(
      ([entry]) => setDialogOn(entry.isIntersecting),
      { rootMargin: "-25% 0px -15% 0px" },
    );
    io.observe(gate);
    return () => io.disconnect();
  }, []);

  // First appearance moves focus into the field so the keyboard path
  // costs zero extra clicks; later re-entries don't steal focus.
  useEffect(() => {
    if (dialogOn && !focusedOnce.current && !leaving) {
      focusedOnce.current = true;
      inputRef.current?.focus({ preventScroll: true });
    }
  }, [dialogOn, leaving]);

  // Success: fade the plate out, then pull the unlocked render — the
  // cookie is already set, so the refresh streams the full study.
  useEffect(() => {
    if (!state.ok) return;
    setLeaving(true);
    const t = window.setTimeout(() => router.refresh(), LEAVE_MS);
    return () => window.clearTimeout(t);
  }, [state.ok, router]);

  // A wrong attempt reselects the field for an immediate retry.
  useEffect(() => {
    if (state.error) inputRef.current?.select();
  }, [state]);

  return (
    <div
      ref={gateRef}
      className={leaving ? `${styles.gate} ${styles.leaving}` : styles.gate}
    >
      {/* Pre-blurred capture of the study — the locked page's only
          "content". Decorative by design. */}
      <div className={styles.lockedContent} aria-hidden="true">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className={styles.previewImg}
          src="/case-studies/platform-one/p1-locked-preview.webp"
          alt=""
          width={1440}
          height={1500}
          loading="lazy"
        />
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
        <form className={styles.plate} action={formAction}>
          <span className={`${styles.hatch} ${styles.hatchTl}`} aria-hidden="true" />
          <span className={`${styles.hatch} ${styles.hatchTr}`} aria-hidden="true" />
          <span className={`${styles.hatch} ${styles.hatchBr}`} aria-hidden="true" />
          <p className={styles.plateNote}>
            {"// THIS STUDY DETAILS WORK ON AN ACTIVE DoW PLATFORM · FULL VERSION SHARED ON REQUEST"}
          </p>
          <label className={styles.platePrompt} htmlFor="p1-gate-password">
            Enter Password to see full case study:
          </label>
          <div className={styles.plateField}>
            <input
              ref={inputRef}
              id="p1-gate-password"
              name="password"
              className={
                state.error
                  ? `${styles.plateInput} ${styles.plateInputError}`
                  : styles.plateInput
              }
              type={showPassword ? "text" : "password"}
              autoComplete="off"
              spellCheck={false}
              disabled={pending || leaving}
              aria-invalid={state.error || undefined}
              aria-describedby={state.error ? "p1-gate-error" : undefined}
            />
            {/* show/hide toggle (Andrew, 2026-07-31). type=button so Enter
                in the field still submits; mousedown is swallowed so focus
                stays in the input while toggling. */}
            <button
              type="button"
              className={styles.plateEye}
              aria-label={showPassword ? "Hide password" : "Show password"}
              aria-pressed={showPassword}
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => setShowPassword((v) => !v)}
            >
              {showPassword ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M2 12C4.5 7 8 4.5 12 4.5S19.5 7 22 12c-2.5 5-6 7.5-10 7.5S4.5 17 2 12Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                  <circle cx="12" cy="12" r="3.2" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M4 20 20 4" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M2 12C4.5 7 8 4.5 12 4.5S19.5 7 22 12c-2.5 5-6 7.5-10 7.5S4.5 17 2 12Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                  <circle cx="12" cy="12" r="3.2" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              )}
            </button>
          </div>
          {state.error && !pending && (
            <p id="p1-gate-error" className={styles.plateError}>
              {"// ACCESS_DENIED: CHECK THE PASSWORD AND TRY AGAIN"}
            </p>
          )}
          {/* Enter submits, but a pasted-with-the-mouse password needs a
              visible way in too (Andrew, 2026-07-31). */}
          <button
            type="submit"
            className={styles.plateSubmit}
            disabled={pending || leaving}
          >
            {pending || leaving ? "CHECKING..." : "UNLOCK"}
          </button>
          <p className={styles.plateRequest}>
            {"Don't have the password? "}
            <a
              className={styles.plateRequestLink}
              href="mailto:andrew.colin.marks@gmail.com?subject=Platform%20One%20case%20study%20access"
            >
              Request access
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
