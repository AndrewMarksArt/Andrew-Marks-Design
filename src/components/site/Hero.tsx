import Image from "next/image";
import { preload } from "react-dom";
import HeroGaze from "./HeroGaze";
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

export default function Hero() {
  // Gaze atlas is a CSS background (no <img> priority hint) — preload it so
  // the resting frame paints with the hero instead of popping in late.
  // Filename is versioned (v5): the atlas layout must match the bundled
  // heroGazeMap.json, so a new build ships under a new URL — never overwrite
  // a deployed atlas in place (browser cache serves stale cells).
  preload("/hero/robot-atlas-v6.webp", { as: "image" });

  return (
    <section className={styles.hero}>
      <h1 className="visually-hidden">Andrew Marks — UX &amp; Product Designer</h1>

      {/* Masked robot band: plus lattice behind, cursor-following gaze
          portrait in front (placeholder site's system, transparent atlas).
          Decorative. */}
      <div className={styles.band} aria-hidden="true">
        <PlusLattice />
        <HeroGaze className={styles.robot} />
      </div>

      <div className={`content ${styles.text}`}>
        {/* Strelka display words — flattened SVG lockups (spec ruling #1);
            the real text is in the <h1> above. */}
        <div className={styles.words} aria-hidden="true">
          <Image
            className={`${styles.word} ${styles.wordUx}`}
            src="/hero/ux-product.svg"
            alt=""
            width={734}
            height={77}
            priority
            unoptimized
          />
          <Image
            className={`${styles.word} ${styles.wordDesigner}`}
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
            design..." the 24px paragraph. */}
        <p className={styles.tagline}>
          Building agentic workflows &amp; complex AI systems for humans,
          agents, &amp; everything in between.
        </p>
        {/* Terminal micro-graphic (Andrew's ruling): the electric-sheep line
            in the meta bar's exact utility style, with the site's `//`
            comment idiom — a wry boot-log aside under the subhead. */}
        <p className={styles.subline}>
          <span aria-hidden="true">{"// "}</span>
          Research &amp; design for users wrangling electric sheep.
        </p>
      </div>
    </section>
  );
}
