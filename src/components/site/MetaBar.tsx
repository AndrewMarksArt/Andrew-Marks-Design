import { Fragment } from "react";
import Link from "next/link";
import { PlusMark } from "./motifs";
import styles from "./MetaBar.module.css";

/**
 * Sticky terminal navbar + the full-bleed y=56 rule (Andrew's spec,
 * 2026-07-16, revised per adversarial UX audit):
 *
 *   ID_AUTH // Andrew Marks          // CASE_STUDIES: link | link | link
 *
 * ROUTE-AWARE (audit blocker): this bar renders on home AND on all three
 * case-study pages (via CaseShell), so the active-page marker follows the
 * route — on home the name is active (and a #top back-to-top anchor); on
 * a case page that case's link is active and the name is a plain link
 * home. Active/hover glyphs use --accent-deep (#EC4E09 fails AA at this
 * size, 3.71:1); the underlines carry the bright brand --accent, which is
 * legal for non-text (1.4.11) — so the bar keeps Andrew's orange without
 * a failing glyph. Geist Mono's weight-invariant advances make the
 * semibold hover reflow-free. Pure anchors — still a server component.
 *
 * Wrap contract: every link is a nowrap unit with its trailing pipe glued
 * on (a wrap can never strand a "|" at line start); pipes and the "// "
 * prefixes are aria-hidden decoration.
 */

type CaseSlug = "platform-one" | "chat-vet" | "knowledge-os";
export type MetaBarCurrent = "home" | CaseSlug;

const CASE_LINKS: { slug: CaseSlug; label: string; href: string }[] = [
  {
    slug: "platform-one",
    label: "P1 AI Assistant",
    href: "/case-studies/platform-one",
  },
  {
    slug: "chat-vet",
    label: "ChatVET AI Copilot",
    href: "/case-studies/chat-vet",
  },
  {
    slug: "knowledge-os",
    label: "Personal OS",
    href: "/case-studies/knowledge-os",
  },
];

export function MetaBar({ current = "home" }: { current?: MetaBarCurrent }) {
  return (
    <div className={styles.metaBar}>
      <nav className={`content ${styles.bar}`} aria-label="Primary">
        <p className={`${styles.line} ${styles.idLine}`}>
          <span className={styles.segment}>
            <span aria-hidden="true">{"ID_AUTH // "}</span>
            {current === "home" ? (
              <a className={styles.navLink} href="#top" aria-current="page">
                Andrew Marks
              </a>
            ) : (
              <Link className={styles.navLink} href="/">
                Andrew Marks
              </Link>
            )}
          </span>
        </p>
        <p className={`${styles.line} ${styles.navLine}`}>
          {CASE_LINKS.map((c, i) => (
            <Fragment key={c.slug}>
              {i > 0 && " "}
              <span className={styles.segment}>
                {i === 0 && (
                  <span aria-hidden="true">{"// CASE_STUDIES: "}</span>
                )}
                <Link
                  className={styles.navLink}
                  href={c.href}
                  aria-current={current === c.slug ? "page" : undefined}
                >
                  {c.label}
                </Link>
                {i < CASE_LINKS.length - 1 && (
                  <span aria-hidden="true">{" |"}</span>
                )}
              </span>
            </Fragment>
          ))}
        </p>
      </nav>
      {/* y=56 rule, full-bleed, pinned by plus marks centered on the
          plate-edge verticals (root marks at (44,44)/(1652,44)) */}
      <div className={`fullBleed ${styles.ruleRow}`} aria-hidden="true">
        <hr className="hrule" />
        <PlusMark className={`${styles.plus} ${styles.plusLeft}`} />
        <PlusMark className={`${styles.plus} ${styles.plusRight}`} />
      </div>
    </div>
  );
}

export default MetaBar;
