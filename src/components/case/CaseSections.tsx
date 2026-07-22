import type { ReactNode } from "react";
import Link from "next/link";
import CaseStudyMedia from "../site/CaseStudyMedia";
import { CASE_MEDIA } from "../site/caseMedia";
import { PlusMark } from "../site/motifs";
import styles from "./case.module.css";

/**
 * Case-study page primitives, shared by the three templates (Figma
 * "Case Study Templates" section 6759:6347). The templates are part
 * wireframe: gray media areas render as labeled PlaceholderBox elements
 * (terminal idiom) until real imagery lands, honoring the Figma
 * annotations verbatim.
 */

/** Gray media placeholder with a mono terminal label. */
export function PlaceholderBox({
  label = "// IMG_PENDING",
  aspect,
  className,
}: {
  label?: string;
  aspect?: string;
  className?: string;
}) {
  return (
    <div
      className={`${styles.placeholder} ${className ?? ""}`}
      style={aspect ? { aspectRatio: aspect } : undefined}
      aria-hidden="true"
    >
      <span>{label}</span>
    </div>
  );
}

/** Split-screen hero: text column + media placeholder (annotation:
 *  "'hero' place holder split screen image and text"). */
export function CaseHero({
  eyebrow,
  title,
  intro,
  media,
}: {
  eyebrow: string;
  title: string;
  intro: ReactNode[];
  /** real hero figure — replaces the wireframe placeholder when supplied */
  media?: ReactNode;
}) {
  return (
    <header className={`content ${styles.hero}`}>
      <div className={styles.heroText}>
        <p className={styles.eyebrow}>{eyebrow}</p>
        <h1 className={styles.title}>{title}</h1>
        <div className={styles.intro}>
          {intro.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </div>
      {media ? (
        <div className={`${styles.heroMedia} ${styles.heroMediaFig}`}>
          {media}
        </div>
      ) : (
        <PlaceholderBox
          className={styles.heroMedia}
          label="// HERO_IMG_PENDING"
        />
      )}
    </header>
  );
}

/** Meta strip (Figma revision 2026-07-21: one accent-ruled plate with
 *  square corner pins, dashed interior dividers, halftone dot fields
 *  bleeding off the corners). Values split on " · " render as stacked
 *  lines, matching the design's one-item-per-line columns. */
export function StatsStrip({
  items = [
    { label: "ROLE:", value: "..." },
    { label: "TIMEFRAME:", value: "..." },
    { label: "TEAM:", value: "..." },
    { label: "STATUS:", value: "..." },
  ],
}: {
  items?: { label: string; value: string }[];
}) {
  return (
    <div className={`content ${styles.statsWrap}`}>
      <dl className={styles.stats}>
        <i className={`${styles.statPin} ${styles.statPinTl}`} aria-hidden="true" />
        <i className={`${styles.statPin} ${styles.statPinTr}`} aria-hidden="true" />
        <i className={`${styles.statPin} ${styles.statPinBl}`} aria-hidden="true" />
        <i className={`${styles.statPin} ${styles.statPinBr}`} aria-hidden="true" />
        {items.map((it) => (
          <div key={it.label} className={styles.statCell}>
            <dt>{it.label}</dt>
            <dd>
              {it.value.split(" · ").map((line, i) => (
                <span key={i} className={styles.statLine}>
                  {line}
                </span>
              ))}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

/** Standard alternating section: sticky-feel heading column left, body
 *  copy + media right (media slot is free-form). */
export function CaseSection({
  heading,
  lede,
  children,
  media,
}: {
  heading: ReactNode;
  /** body paragraphs under the heading (left column) */
  lede?: ReactNode[];
  /** optional extra body columns (e.g. the three-column band) */
  children?: ReactNode;
  /** media area (PlaceholderBox compositions) */
  media?: ReactNode;
}) {
  return (
    <section className={`content ${styles.section}`}>
      <div className={styles.sectionGrid}>
        <div className={styles.sectionLeft}>
          <h2 className={styles.sectionHeading}>{heading}</h2>
          {lede?.map((p, i) => (
            <p key={i} className={styles.sectionBody}>
              {p}
            </p>
          ))}
        </div>
        <div className={styles.sectionRight}>
          {children}
          {media}
        </div>
      </div>
    </section>
  );
}

/** Centered closing section ("Projected impact and the honest road to
 *  launch" pattern) with the carousel placeholder below (annotation:
 *  "image carousel place holder"). */
export function CenteredSection({
  heading,
  paragraphs,
  emphasis,
  carousel = true,
  children,
}: {
  heading: string;
  paragraphs: ReactNode[];
  /** bolded closing line */
  emphasis?: ReactNode;
  carousel?: boolean;
  /** evidence blocks below the copy (stat tiles, artifacts) — replaces
   *  the carousel when a study pins its closing proof instead */
  children?: ReactNode;
}) {
  return (
    <section className={`content ${styles.centered}`}>
      <h2 className={styles.centeredHeading}>{heading}</h2>
      {paragraphs.map((p, i) => (
        <p key={i} className={styles.centeredBody}>
          {p}
        </p>
      ))}
      {emphasis && <p className={styles.centeredEmphasis}>{emphasis}</p>}
      {children}
      {carousel && (
        <div className={styles.carousel} aria-hidden="true">
          <div className={`${styles.carouselFade} ${styles.carouselFadeLeft}`} />
          <PlaceholderBox
            className={styles.carouselMain}
            label="// CAROUSEL_PENDING"
          />
          <div
            className={`${styles.carouselFade} ${styles.carouselFadeRight}`}
          />
        </div>
      )}
    </section>
  );
}

/** Cross-link to the next case study — full-bleed divider on top, then a
 *  hero-style split: text column left (top-aligned to the card), the
 *  home-page interactive card on the right. Only the card is a link; the
 *  heading is plain text. */
export function UpNext({
  title,
  desc,
  href,
}: {
  title: string;
  desc: string;
  href: string;
}) {
  const media = CASE_MEDIA[href];
  return (
    <section className={styles.upNextSection}>
      {/* Divider (Figma 6881:1177 = 6727:3917): full-bleed 2px rule, plus
          marks pinned to the plate edges. */}
      <div
        className={`fullBleed ${styles.upNextDivider}`}
        aria-hidden="true"
      >
        <PlusMark
          className={`${styles.upNextDividerMark} ${styles.upNextDividerMarkLeft}`}
        />
        <PlusMark
          className={`${styles.upNextDividerMark} ${styles.upNextDividerMarkRight}`}
        />
      </div>

      <div className={`content ${styles.upNext}`}>
        <div className={styles.upNextText}>
          <p className={styles.upNextLabel}>UP NEXT:</p>
          <h2 className={styles.upNextTitle}>{title}</h2>
          <p className={styles.upNextDesc}>{desc}</p>
        </div>
        <div className={styles.upNextMediaCol}>
          {media ? (
            <CaseStudyMedia
              img={media.img}
              alt={media.alt}
              href={href}
              sprites={media.sprites}
              beam={media.beam}
            />
          ) : (
            <Link href={href} tabIndex={-1} aria-hidden="true">
              <PlaceholderBox
                className={styles.upNextMedia}
                label="// NEXT_CASE_IMG_PENDING"
              />
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
