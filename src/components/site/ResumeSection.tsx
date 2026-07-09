import { Fragment } from "react";
import { PlusMark, TripleChevron } from "./motifs";
import styles from "./ResumeSection.module.css";

type ResumeEntry = {
  company: string;
  role: string;
  /** Second line of the role paragraph: date range (rows 1-3) or institution (row 4). */
  meta: string;
  body: string;
};

// Literal copy from .claude/design-spec-portfolio-redesign.md §3
// (en dash U+2013, right single quote U+2019).
const ENTRIES: ResumeEntry[] = [
  {
    company: "Metronome",
    role: "UX Researcher",
    meta: "12/’24 – Present",
    body: "I led a behavioral analytics tool that unified 56,854 user identities across six data sources, and designed the conversational UX for Platform One’s AI Assistant, projected to cut support tickets up to 40%.",
  },
  {
    company: "Freelance",
    role: "UX Research & Product Design",
    meta: "09/’23 – Present",
    body: "I lead product and UX design for early-stage AI teams, from conversational interfaces and user flows to shipped redesigns. Open to short-term contract work.",
  },
  {
    company: "Northrop Grumman",
    role: "UI/UX Engineer, Payload & Ground Systems",
    meta: "07/’21 – 8/’23",
    body: "UI development for payload and ground systems, integrating real-time telemetry and mission-critical data, and built an onboarding site that cut new-hire ramp from 10 to 7 days.",
  },
  {
    company: "Masters Degree",
    role: "Information Systems Technology",
    meta: "Claremont Graduate University",
    body: "M.S. in Information Systems Technology with an emphasis in data science, plus an MA in Art Business adding a creative and business dimension.",
  },
];

/**
 * Resume band (spec §5 "Resume section" + §4):
 * - Full-bleed divider on top (2px rule + plus marks pinned on the plate-edge
 *   rules) separating the case studies from the resume.
 * - Semi-transparent resume plate with edge-clipped plus-mark corner brackets
 *   (one quadrant of a 64px plus mark per corner, overhanging the plate 4px).
 * - Header row (mono label + triple chevron / peach button) and four resume
 *   entries split title-left / role+body-right, separated by --rule-soft rules.
 *
 * Expects to be rendered as a direct child of .plateMain (it applies the
 * global .content inset itself; the divider is full-bleed via .fullBleed).
 */
export function ResumeSection() {
  return (
    <section aria-labelledby="resume-heading">
      {/* Divider (6727:3917): 1728x32, 2px center rule, 32px plus marks
          centered on the x=60/1668 vertical page rules. */}
      <div className={`fullBleed ${styles.divider}`} aria-hidden="true">
        <PlusMark className={`${styles.dividerMark} ${styles.dividerMarkLeft}`} />
        <PlusMark className={`${styles.dividerMark} ${styles.dividerMarkRight}`} />
      </div>

      <div className="content">
        <div className={styles.plate}>
          {/* Corner brackets: bottom-right/-left/top-right/top-left quadrants
              of a 64px plus (8px arms), clipped to 32x32 windows. */}
          <span className={`${styles.corner} ${styles.cornerTopLeft}`} aria-hidden="true">
            <PlusMark size={64} />
          </span>
          <span className={`${styles.corner} ${styles.cornerTopRight}`} aria-hidden="true">
            <PlusMark size={64} />
          </span>
          <span className={`${styles.corner} ${styles.cornerBottomLeft}`} aria-hidden="true">
            <PlusMark size={64} />
          </span>
          <span className={`${styles.corner} ${styles.cornerBottomRight}`} aria-hidden="true">
            <PlusMark size={64} />
          </span>

          <header className={styles.header}>
            <div className={styles.headerLeft}>
              <h2 id="resume-heading" className={styles.label}>
                Resume Highlights
              </h2>
              <TripleChevron className={styles.chevrons} />
            </div>
            {/* Dead link for now — real interactions land later. */}
            <a className={styles.button} href="/resume">
              See Full Resume<span aria-hidden="true"> {"→"}</span>
            </a>
          </header>

          <hr aria-hidden="true" className={`${styles.sep} ${styles.sepHeader}`} />

          {ENTRIES.map((entry, i) => (
            <Fragment key={entry.company}>
              {i > 0 && <hr aria-hidden="true" className={styles.sep} />}
              <article className={styles.row}>
                <h3 className={styles.title}>{entry.company}</h3>
                <div className={styles.rowBody}>
                  <p className={styles.role}>
                    {entry.role}
                    <br />
                    <span className={styles.meta}>{entry.meta}</span>
                  </p>
                  <p className={styles.desc}>{entry.body}</p>
                </div>
              </article>
            </Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ResumeSection;
