import Image from "next/image";
import styles from "./Footer.module.css";

/**
 * Footer band — spec §5 "Footer band".
 * Solid var(--ink) band, 1608x405 at (60, 5657) in the 1728 design: sits
 * INSIDE the .page gutters (not full-bleed), flush to page bottom, radius 0.
 * Wordmarks are the flattened Strelka SVG exports (white 0.9 fill baked);
 * the real text lives in the visually-hidden <h2>.
 */

/**
 * Abstract US-flag mark, 139x80 (spec §5): 36x36 canton square, two 95x14
 * short bars right of it (8px gap), two 139x14 full bars below; rows at
 * y 0/22/44/66, all var(--on-dark).
 */
function FlagMark({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="139"
      height="80"
      viewBox="0 0 139 80"
      fill="none"
      aria-hidden="true"
    >
      <rect width="36" height="36" fill="var(--on-dark)" />
      <rect x="44" width="95" height="14" fill="var(--on-dark)" />
      <rect x="44" y="22" width="95" height="14" fill="var(--on-dark)" />
      <rect y="44" width="139" height="14" fill="var(--on-dark)" />
      <rect y="66" width="139" height="14" fill="var(--on-dark)" />
    </svg>
  );
}

/**
 * Globe mark, 105x60 (spec §5): three 60px circles (r=29.25) overlapping at
 * 22.5px steps, 1.5px var(--on-dark) strokes, middle circle dashed.
 * Dash pattern measured from the 1:1 export (ledger #16 said unmeasured):
 * 12 dashes around the middle circle, dash ~9.2px / gap ~6.1px.
 */
function GlobeMark({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="105"
      height="60"
      viewBox="0 0 105 60"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="30" cy="30" r="29.25" stroke="var(--on-dark)" strokeWidth="1.5" />
      <circle
        cx="52.5"
        cy="30"
        r="29.25"
        stroke="var(--on-dark)"
        strokeWidth="1.5"
        strokeDasharray="9.2 6.1"
      />
      <circle cx="75" cy="30" r="29.25" stroke="var(--on-dark)" strokeWidth="1.5" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className={styles.band}>
      <h2 className="visually-hidden">Andrew Marks Design</h2>

      {/* "Andrew Marks" wordmark: 1576x160, 30px below band top, full content width */}
      <Image
        className={styles.wordmarkMain}
        src="/footer/andrew-marks-wordmark.svg"
        alt=""
        aria-hidden="true"
        width={1576}
        height={160}
        unoptimized
      />

      {/* Second row: "Design" wordmark 820x160 (24px below), flag at x=977,
          globe top-right; legal bottom-right — flag/legal/wordmark all
          bottom-align 31px above the band bottom (y=6031 in the design). */}
      <div className={styles.row2}>
        <Image
          className={styles.wordmarkDesign}
          src="/footer/design-wordmark.svg"
          alt=""
          aria-hidden="true"
          width={820}
          height={160}
          unoptimized
        />
        <FlagMark className={styles.flag} />
        <GlobeMark className={styles.globe} />
        <p className={styles.legal}>
          {"// [C] 2026"}
          <br />
          {"// USER: ANDREW MARKS"}
          <br />
          {"// ALL_RIGHTS_RESERVED_INIT"}
        </p>
      </div>
    </footer>
  );
}
