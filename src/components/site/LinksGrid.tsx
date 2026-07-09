import type { ReactElement } from "react";
import Link from "next/link";

import { ArrowOutIcon, PlusMark } from "./motifs";
import styles from "./LinksGrid.module.css";

/* --------------------------------------------------------------------------
   Dot grid — spec §5 "Dot grid": 368x210, 12 cols x 8 rows, 6px idle dots
   (rgba(0,0,0,0.33)), 8px active dots (r=3.5 + 1px stroke, accent) in five
   2x2 clusters. Pitches: x (368-6)/11, y (210-6)/7 (justify-between).
   -------------------------------------------------------------------------- */

const DOT_COLS = 12;
const DOT_ROWS = 8;
const DOT_X_PITCH = (368 - 6) / (DOT_COLS - 1);
const DOT_Y_PITCH = (210 - 6) / (DOT_ROWS - 1);

/** Active pattern (0-indexed): rows 1-2 & 5-6 at cols 2-3 and 8-9; rows 3-4 at cols 5-6. */
function isActiveDot(row: number, col: number): boolean {
  const outerRow = row === 1 || row === 2 || row === 5 || row === 6;
  const outerCol = col === 2 || col === 3 || col === 8 || col === 9;
  const centerRow = row === 3 || row === 4;
  const centerCol = col === 5 || col === 6;
  return (outerRow && outerCol) || (centerRow && centerCol);
}

function DotGrid() {
  const dots: ReactElement[] = [];
  for (let row = 0; row < DOT_ROWS; row++) {
    for (let col = 0; col < DOT_COLS; col++) {
      const active = isActiveDot(row, col);
      dots.push(
        <circle
          key={`${row}-${col}`}
          cx={Number((3 + col * DOT_X_PITCH).toFixed(2))}
          cy={Number((3 + row * DOT_Y_PITCH).toFixed(2))}
          r={active ? 3.5 : 3}
          fill={active ? "var(--accent)" : "var(--dot-idle)"}
          stroke={active ? "var(--accent)" : undefined}
          strokeWidth={active ? 1 : undefined}
        />,
      );
    }
  }
  return (
    <svg
      className={styles.dotGrid}
      width="368"
      height="210"
      viewBox="0 0 368 210"
      fill="none"
      aria-hidden="true"
    >
      {dots}
    </svg>
  );
}

/* --------------------------------------------------------------------------
   Coil — spec §5 "Coil + R badge": 159x23 frame, 1px black line at y=11.72,
   five overlapping r=11 circles at 15px pitch (cx 49.5..109.5).
   -------------------------------------------------------------------------- */

const COIL_CX = [49.5, 64.5, 79.5, 94.5, 109.5];

function CoilMark() {
  return (
    <svg
      className={styles.coil}
      width="159"
      height="23"
      viewBox="0 0 159 23"
      fill="none"
      aria-hidden="true"
    >
      <path d="M0 11.72H159" stroke="var(--black)" strokeWidth="1" />
      {COIL_CX.map((cx) => (
        <circle
          key={cx}
          cx={cx}
          cy="11.72"
          r="11"
          stroke="var(--black)"
          strokeWidth="1"
        />
      ))}
    </svg>
  );
}

/* --------------------------------------------------------------------------
   Links grid band — spec §4 "Links grid" + §5 "Links-grid cell".
   Full-bleed band (top/bottom rules cross the gutters); the 3x2 grid rides
   the plate. Must be rendered as a direct child of .plateMain (NOT inside
   a .content wrapper) so the fullBleed negative margins line up.
   -------------------------------------------------------------------------- */

export function LinksGrid() {
  return (
    <section
      className={`fullBleed ${styles.band}`}
      aria-labelledby="links-heading"
    >
      <h2 id="links-heading" className="visually-hidden">
        Links
      </h2>

      {/* Corner registration marks on the band-rule x plate-rule crossings */}
      <PlusMark className={`${styles.plus} ${styles.plusTopLeft}`} />
      <PlusMark className={`${styles.plus} ${styles.plusTopRight}`} />
      <PlusMark className={`${styles.plus} ${styles.plusBottomLeft}`} />
      <PlusMark className={`${styles.plus} ${styles.plusBottomRight}`} />

      <div className={styles.grid}>
        <div className={`${styles.cell} ${styles.cellResume}`}>
          <Link href="/resume" className={styles.link}>
            01 resume
          </Link>
          <ArrowOutIcon className={styles.icon} />
          <p className={styles.desc}>
            <strong>Product Designer engineering intuitive UX solutions</strong>{" "}
            for complex DoD, GovTech, and AI ecosystems.
          </p>
        </div>

        <div className={`${styles.cell} ${styles.cellXcom}`}>
          <a
            href="https://x.com/andrwemarksart"
            target="_blank"
            rel="noreferrer"
            className={styles.link}
          >
            02 X.com
          </a>
          <ArrowOutIcon className={styles.icon} />
          <p className={styles.desc}>
            <strong>Follow @andrwemarksart</strong> for design, vibe coding,
            the latest AI news, and things I think are cool or interesting.
          </p>
        </div>

        <div className={`${styles.cell} ${styles.cellLinkedIn}`}>
          <a
            href="https://www.linkedin.com/in/andrwemarksart/"
            target="_blank"
            rel="noreferrer"
            className={styles.link}
          >
            03 Linked in
          </a>
          <ArrowOutIcon className={styles.icon} />
          <span className={styles.hatch} aria-hidden="true" />
          <p className={styles.desc}>
            <strong>Connect with me on LinkedIn</strong> /in/andrwemarksart/ as
            I build-in-public projects on AI agents & the future of UX.
          </p>
        </div>

        <div className={`${styles.cell} ${styles.cellDots}`} aria-hidden="true">
          <DotGrid />
        </div>

        <div className={`${styles.cell} ${styles.cellGitHub}`}>
          <a
            href="https://github.com/AndrewMarksArt"
            target="_blank"
            rel="noreferrer"
            className={styles.link}
          >
            04 GitHub
          </a>
          <ArrowOutIcon className={styles.icon} />
          <p className={styles.desc}>
            <strong>View my public work on GitHub</strong>. DM for access to
            select private AI and UX repositories.
          </p>
        </div>

        <div className={`${styles.cell} ${styles.cellAbout}`}>
          <a href="#about" className={styles.link}>
            05 About
          </a>
          <span className={styles.reg} aria-hidden="true">
            <CoilMark />
            <span className={styles.badge}>R</span>
          </span>
          <p className={styles.desc}>
            <strong>Focused on the architecture of human-AI collaboration</strong>
            , from secure DoD systems to rapid AI prototyping, I use my
            background{" "}
            <strong>
              to simplify complex data into high-performance UX research and
              designs
            </strong>{" "}
            allowing AI systems to scale.
          </p>
        </div>
      </div>
    </section>
  );
}

export default LinksGrid;
