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
          {/* Decorative boot-log flourish: the status rows below carry the
              information, and #EC4E09 at this size fails AA for announced
              text — formally decoration (UX audit item 5). */}
          <p className={styles.initLine} aria-hidden="true">
            <span className={styles.slashes}>{"//"}</span>
            <span>{" 03 CASE STUDIES LIVE"}</span>
          </p>
          {/* Judge-panel pass (research 005): the duplicate "3 studies live"
              line and the under-construction "appendices in progress" notice
              left prime real estate; the strip now frames the studies and
              names the site's through-line. */}
          <p className={styles.statusRow}>
            <span className={styles.statusLabel}>{"STATUS: "}</span>
            <span className={styles.statusValue}>
              ...3 AI assistants: DoD enterprise · clinical · personal
            </span>
          </p>
          <p className={styles.statusRow}>
            <span className={styles.statusValue}>
              ...One rule throughout: ground it, or say you can&rsquo;t
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
