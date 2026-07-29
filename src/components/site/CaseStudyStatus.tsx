import { PlusMark } from "./motifs";
import styles from "./CaseStudyStatus.module.css";

/**
 * Case Study Status block — spec §5, node 6727:4215 at page (125, 902), 1478x160.
 * Renders its own top boundary separator (design y=902, overhanging to the
 * plate edges) with plus marks pinning the interior-rule intersections, plus
 * the interior column rule segments for this band (x=124/484/1604 at 1728).
 * Must be composed inside a `.content` wrapper (content column = 100%).
 */
export default function CaseStudyStatus() {
  return (
    <section
      className={styles.status}
      aria-labelledby="case-study-status-title"
    >
      {/* Interior column rules (Vectors 15/17/16), straddling the content
          column edges; the mid rule starts at the separator (y=902). */}
      <span className={`${styles.vrule} ${styles.vruleLeft}`} aria-hidden="true" />
      <span className={`${styles.vrule} ${styles.vruleMid}`} aria-hidden="true" />
      <span className={`${styles.vrule} ${styles.vruleRight}`} aria-hidden="true" />

      {/* Top boundary separator (y=902), 1608px-equivalent width */}
      <div className={styles.separator} aria-hidden="true">
        <PlusMark className={`${styles.sepMark} ${styles.sepMarkLeft}`} />
        <PlusMark className={`${styles.sepMark} ${styles.sepMarkRight}`} />
      </div>

      <div className={styles.block}>
        <h2 id="case-study-status-title" className={styles.title}>
          {"Case Study Status"}
        </h2>

        <div className={styles.terminal}>
          {/* Decorative boot-log flourish (aria-hidden: #EC4E09 at this size
              fails AA for announced text — UX audit item 5). Andrew's Figma
              revision 2026-07-29 (home frame 7041:144): INITIALIZING restored,
              the two through-line rows collapsed to his single status row. */}
          <p className={styles.initLine} aria-hidden="true">
            <span className={styles.slashes}>{"//"}</span>
            <span>{" INITIALIZING..."}</span>
          </p>
          <p className={styles.statusRow}>
            <span className={styles.statusLabel}>{"STATUS: "}</span>
            <span className={styles.statusValue}>...3 high level</span>
          </p>
        </div>
      </div>
    </section>
  );
}
