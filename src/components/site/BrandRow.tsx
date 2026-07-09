import { PlusMark } from "./motifs";
import styles from "./BrandRow.module.css";

/**
 * Brand band between the hero and the case-study status section:
 * full-bleed rules at y=791 and y=866 with a 73px band between them —
 * color-swatch row left (16px inside the plate edge) and the
 * hazard-slant design mark right (right edge 16px inside the plate).
 * Both rules are pinned by plus marks on the plate-edge verticals
 * (root marks at y=775/850). Entirely decorative.
 */

/* 7 slanted parallelograms: 27.2px wide, slanting 34.85px right over
   36.55px height (~43.6deg, "\" lean); measured x-offsets (irregular
   at the tail — kept exact). */
const MARK_OFFSETS = [0, 37, 74, 111, 148, 182, 217.7];

/* Swatch fills: none / teal / green-gray / ink-deep */
const SWATCH_CLASSES = ["swatchNone", "swatchTeal", "swatchGreen", "swatchInk"];

function Rule() {
  return (
    <div className={`fullBleed ${styles.ruleRow}`}>
      <hr className="hrule" />
      <PlusMark className={`${styles.plus} ${styles.plusLeft}`} />
      <PlusMark className={`${styles.plus} ${styles.plusRight}`} />
    </div>
  );
}

export function BrandRow() {
  return (
    <div className={styles.brandRow} aria-hidden="true">
      <Rule />
      <div className={styles.band}>
        <div className={styles.swatches}>
          {SWATCH_CLASSES.map((cls) => (
            <span key={cls} className={`${styles.swatch} ${styles[cls]}`} />
          ))}
        </div>
        <svg
          className={styles.mark}
          width="279.75"
          height="36.55"
          viewBox="0 0 279.75 36.55"
          fill="none"
        >
          {MARK_OFFSETS.map((x) => (
            <path
              key={x}
              d={`M${x} 0h27.2l34.85 36.55h-27.2Z`}
              fill="var(--ink)"
            />
          ))}
        </svg>
      </div>
      <Rule />
    </div>
  );
}

export default BrandRow;
