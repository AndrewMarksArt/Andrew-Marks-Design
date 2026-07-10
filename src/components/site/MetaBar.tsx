import { Fragment } from "react";
import { PlusMark } from "./motifs";
import styles from "./MetaBar.module.css";

/**
 * Top utility line (spec §3/§5 "Meta bar") + the full-bleed y=56 rule.
 * Copy is the exact literal string, split at the `//` boundaries so each
 * segment wraps as a unit on small screens (never truncates).
 * Joined with double spaces via `white-space: pre-wrap` — the rendered
 * text content matches the spec string exactly.
 */
const SEGMENTS = [
  "IDENTITY_AUTH",
  "// UID: Andrew Marks",
  "// SEC_LEVEL: TOP_SECRET",
  "// LOC: 36.5298° N, 87.3595° W",
  "// VER: 0.9.2-BETA",
];

export function MetaBar() {
  return (
    <div className={styles.metaBar}>
      <div className="content">
        <p className={styles.line}>
          {SEGMENTS.map((segment, i) => (
            <Fragment key={segment}>
              {i > 0 && "  "}
              <span className={styles.segment}>{segment}</span>
            </Fragment>
          ))}
        </p>
      </div>
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
