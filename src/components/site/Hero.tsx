import Image from "next/image";
import type { CSSProperties } from "react";
import HeroGaze from "./HeroGaze";
import BootLine from "./BootLine";
import styles from "./Hero.module.css";

/**
 * Hero band — spec §5 "Hero band" + §3 hero text styles.
 *
 * Left column (content grid): Strelka display-word SVGs (flattened lockups,
 * real text lives in the visually-hidden <h1>), 36px tagline, 24px sub-line.
 * Right: masked band (notched-silhouette mask) holding the 99-mark rotated
 * plus lattice behind the robot portrait, anchored to the bottom rule.
 *
 * Band geometry (page coords at 1728): (76, 81.5) 1592x709.5 — 16px inside
 * the left rule, flush to the right rule, bottom on the y=791 rule. Rendered
 * here as an absolutely positioned, bottom-anchored box with the design
 * aspect ratio so it scales fluidly and tops out at the measured overlap.
 */

/** Plus-mark lattice, measured (spec §5): 11 rows x 9 marks.
 *  Origin mark center at band-relative (818, 498.5) — pixel-fit against the
 *  1:1 export (page (894, 580)). In-row step +47.128,+46.037; row offset
 *  +41.43,-42.41. Marks outside the 1592x709.5 viewport clip, as in Figma. */
const LATTICE_ROWS = 11;
const LATTICE_COLS = 9;
const ORIGIN_X = 818;
const ORIGIN_Y = 498.5;
const STEP_X = 47.128;
const STEP_Y = 46.037;
const ROW_X = 41.43;
const ROW_Y = -42.41;

function latticePoints(): { key: string; x: string; y: string }[] {
  const points = [];
  for (let i = 0; i < LATTICE_ROWS; i++) {
    for (let j = 0; j < LATTICE_COLS; j++) {
      points.push({
        key: `${i}-${j}`,
        x: (ORIGIN_X + j * STEP_X + i * ROW_X).toFixed(2),
        y: (ORIGIN_Y + j * STEP_Y + i * ROW_Y).toFixed(2),
      });
    }
  }
  return points;
}

function PlusLattice() {
  return (
    <svg
      className={styles.lattice}
      viewBox="0 0 1592 709.5"
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        {/* 26.353px "+" of two 2px strokes, accent-deep @0.83, rotated -45.67deg
            (renders as an "x"; rotation applied per instance below). */}
        <path
          id="hero-x-mark"
          d="M-13.1765 0H13.1765M0 -13.1765V13.1765"
          stroke="var(--accent-deep)"
          strokeWidth="2"
          strokeOpacity="0.83"
        />
      </defs>
      {latticePoints().map((p) => (
        <use
          key={p.key}
          href="#hero-x-mark"
          transform={`translate(${p.x} ${p.y}) rotate(-45.67)`}
        />
      ))}
    </svg>
  );
}

/** Phones (≤639, see Hero.module.css): the same 99-mark cluster in a
 *  SQUARE viewBox centered on it. The cluster's bounding box is ~792x793
 *  by construction (11 rows x 9 marks on the rhombic steps), so a square
 *  crop shows the whole pattern undistorted — the height-fitted desktop
 *  viewBox read as squished-from-the-sides on phones (Andrew,
 *  2026-07-30). Own defs id: sprite refs into a display:none svg are
 *  unreliable in older engines. */
function PlusLatticeMobile() {
  return (
    <svg
      className={styles.latticeMobile}
      viewBox="803 59 823 823"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <path
          id="hero-x-mark-m"
          d="M-13.1765 0H13.1765M0 -13.1765V13.1765"
          stroke="var(--accent-deep)"
          strokeWidth="2"
          strokeOpacity="0.83"
        />
      </defs>
      {latticePoints().map((p) => (
        <use
          key={p.key}
          href="#hero-x-mark-m"
          transform={`translate(${p.x} ${p.y}) rotate(-45.67)`}
        />
      ))}
    </svg>
  );
}

export default function Hero() {
  // 2026-07-29: the HD-atlas preload is gone. HeroGaze manages its own
  // loading — plain loads fetch their real tier immediately; film loads
  // draw from the SD sheet (decoded at the text beat) and upgrade to HD
  // only after the typewriter settles, because decoding the 9216px sheet
  // while the film plays stalled frame presentation on real GPUs
  // (Andrew's catch). The inline CSS placeholder covers the robot until
  // the atlas lands, so nothing pops.

  return (
    <section className={styles.hero}>
      <h1 className="visually-hidden">Andrew Marks, UX &amp; Product Designer</h1>

      {/* Masked robot band: plus lattice behind, cursor-following gaze
          portrait in front (placeholder site's system, transparent atlas).
          Decorative. Present from first paint with NO entrance animation
          (Andrew's ruling) — but the gaze doesn't follow the cursor until
          the text ladder has finished (gated inside HeroGaze). */}
      <div className={styles.band} aria-hidden="true">
        <PlusLattice />
        <PlusLatticeMobile />
        <HeroGaze className={styles.robot} />
      </div>

      <div className={`content ${styles.text}`}>
        {/* Strelka display words — flattened SVG lockups (spec ruling #1);
            the real text is in the <h1> above. Boot items 1-2: Apple's
            block rise+fade at whole-lockup granularity (per-char is
            impossible on flattened SVGs, and Apple never splits anyway). */}
        <div className={styles.words} aria-hidden="true">
          <Image
            className={`${styles.word} ${styles.wordUx} ${styles.bootItem}`}
            style={{ "--boot-i": 1 } as CSSProperties}
            src="/hero/ux-product.svg"
            alt=""
            width={734}
            height={77}
            priority
            unoptimized
          />
          <Image
            className={`${styles.word} ${styles.wordDesigner} ${styles.bootItem}`}
            style={{ "--boot-i": 2 } as CSSProperties}
            src="/hero/designer.svg"
            alt=""
            width={530}
            height={77}
            priority
            unoptimized
          />
        </div>

        {/* Copy swapped between the two slots (Andrew, 2026-07-09): the
            "Building agentic..." line is the 36px subhead, "Research &
            design..." the 24px paragraph. Boot item 3. */}
        <p
          className={`${styles.tagline} ${styles.bootItem}`}
          style={{ "--boot-i": 3 } as CSSProperties}
        >
          Building agentic workflows &amp; complex AI systems for humans,
          agents, &amp; everything in between.
        </p>
        {/* Terminal micro-graphic (Andrew's ruling): the electric-sheep line
            in the meta bar's exact utility style, with the site's `//`
            comment idiom — a wry boot-log aside under the subhead.
            Boot item 4: the container fades in, then the sentence types
            itself (research spike 002; the 55-glyph sentence is typed, the
            "// " prefix stays static). */}
        <p
          className={`${styles.subline} ${styles.bootItem}`}
          style={{ "--boot-i": 4 } as CSSProperties}
        >
          <span aria-hidden="true">{"// "}</span>
          <BootLine
            text="Research & design for users wrangling electric sheep. 🐑"
            caretClassName={styles.caret}
          />
        </p>
      </div>
    </section>
  );
}
