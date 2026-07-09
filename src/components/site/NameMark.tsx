import { FoldedChevron } from "./motifs";
import styles from "./NameMark.module.css";

/**
 * Name-mark lockup (spec §5): logo square (white circle-crosshair) +
 * bordered name box (ANDREW MARKS + underline bar) + bordered spacer +
 * QR/registration block + barcode bars, with 7 accent folded chevrons
 * hanging below the name box (6 left-aligned at 30px pitch + 1 outlier
 * right-aligned with the underline end).
 *
 * All internal dimensions are em-based off the 48px lockup font size so
 * the whole mark scales proportionally below 640px. The brand name is
 * real text (the page h1 lives in Hero).
 */

/** Solid --ink-deep square with the white circle-crosshair. */
function LogoSquare() {
  return (
    <div className={styles.logo} aria-hidden="true">
      <svg viewBox="0 0 77 77" fill="none">
        {/* 48.8px circle + full-diameter crosshair lines, 1.2px white */}
        <circle
          cx="38.5"
          cy="38.5"
          r="24.4"
          stroke="var(--plate)"
          strokeWidth="1.2"
        />
        <path
          d="M38.5 14.1V62.9M14.1 38.5H62.9"
          stroke="var(--plate)"
          strokeWidth="1.2"
        />
      </svg>
    </div>
  );
}

/**
 * QR/registration block interior: hollow 53px square of 8px bars,
 * knocked out by 12px white bars, 12px dark center restored.
 */
function QrBlock() {
  return (
    <div className={styles.qr} aria-hidden="true">
      <svg viewBox="0 0 53 53" fill="none">
        <rect
          x="4"
          y="4"
          width="45"
          height="45"
          stroke="var(--ink-deep)"
          strokeWidth="8"
        />
        <rect y="20.5" width="53" height="12" fill="var(--plate)" />
        <rect x="20.5" width="12" height="53" fill="var(--plate)" />
        <rect
          x="20.5"
          y="20.5"
          width="12"
          height="12"
          fill="var(--ink-deep)"
        />
      </svg>
    </div>
  );
}

/** Five 6px-tall data bars, widths 30/21/81/66/95 at 12px pitch. */
const BAR_WIDTHS = [30, 21, 81, 66, 95];

function BarcodeBars() {
  return (
    <div className={styles.barcode} aria-hidden="true">
      <svg width="95" height="54" viewBox="0 0 95 54" fill="none">
        {BAR_WIDTHS.map((w, i) => (
          <rect
            key={i}
            y={i * 12}
            width={w}
            height="6"
            fill="var(--ink-deep)"
          />
        ))}
      </svg>
    </div>
  );
}

export function NameMark() {
  return (
    <div className={`content ${styles.nameMark}`}>
      <div className={styles.lockup}>
        <LogoSquare />
        <div className={styles.nameBox}>
          <div className={styles.nameText}>Andrew Marks</div>
          <div className={styles.bar} aria-hidden="true" />
          <div className={styles.chevrons} aria-hidden="true">
            {Array.from({ length: 6 }, (_, i) => (
              <FoldedChevron key={i} className={styles.chevron} />
            ))}
            <FoldedChevron
              className={`${styles.chevron} ${styles.chevronEnd}`}
            />
          </div>
        </div>
        <div className={styles.spacer} aria-hidden="true" />
        <QrBlock />
        <BarcodeBars />
      </div>
    </div>
  );
}

export default NameMark;
