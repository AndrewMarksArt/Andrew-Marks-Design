"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import styles from "./MetaBar.module.css";

/**
 * Phone navigation (Andrew, 2026-07-29): below 640px the case-study
 * links piled up under the ID line, so they move into a drawer that
 * slides in from the right behind a hamburger. The drawer keeps the
 * bar's terminal voice — mono, `//` furniture, underlined links,
 * aria-current on the active page. Closes on scrim tap, Escape, or
 * navigation; body scroll locks while open.
 */

type NavLink = { slug: string; label: string; href: string };

export default function MobileNav({
  current,
  links,
}: {
  current: string;
  links: NavLink[];
}) {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, close]);

  return (
    <>
      <button
        type="button"
        className={styles.menuBtn}
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-controls="mobile-nav-drawer"
        onClick={() => setOpen((v) => !v)}
      >
        <span className={styles.menuBar} aria-hidden="true" />
        <span className={styles.menuBar} aria-hidden="true" />
        <span className={styles.menuBar} aria-hidden="true" />
      </button>

      <div
        className={open ? `${styles.scrim} ${styles.scrimOn}` : styles.scrim}
        aria-hidden="true"
        onClick={close}
      />

      <nav
        id="mobile-nav-drawer"
        className={open ? `${styles.drawer} ${styles.drawerOpen}` : styles.drawer}
        aria-label="Case studies"
        aria-hidden={!open || undefined}
      >
        <p className={styles.drawerEyebrow}>{"// CASE_STUDIES:"}</p>
        <ul className={styles.drawerList}>
          {links.map((c) => (
            <li key={c.slug}>
              <Link
                className={styles.drawerLink}
                href={c.href}
                aria-current={current === c.slug ? "page" : undefined}
                onClick={close}
              >
                {c.label}
              </Link>
            </li>
          ))}
        </ul>
        <p className={styles.drawerFoot}>
          <span aria-hidden="true">{"ID_AUTH // "}</span>
          <Link className={styles.drawerLink} href="/" onClick={close}>
            Andrew Marks
          </Link>
        </p>
      </nav>
    </>
  );
}
