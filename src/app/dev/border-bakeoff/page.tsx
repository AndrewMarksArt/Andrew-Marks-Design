import type { Metadata } from "next";
import Image from "next/image";
import styles from "./bakeoff.module.css";

/**
 * DEV-ONLY bake-off page for the case-study border hover animation
 * (research spike .claude/research/001-border-hover-animation.md).
 * Three treatments on identical real cards, isolated from the zoom and
 * character animations so only the border is being judged.
 * Not linked from the site; delete after the decision.
 */

export const metadata: Metadata = {
  title: "border bake-off (dev)",
  robots: { index: false, follow: false },
};

const IMG = "/case-studies/platform-one.png";

function Dieline({ className }: { className: string }) {
  return (
    <svg className={styles.dielineSvg} aria-hidden="true" focusable="false">
      <rect className={className} pathLength={100} />
    </svg>
  );
}

function MarchDieline() {
  return (
    <svg className={styles.dielineSvg} aria-hidden="true" focusable="false">
      <rect className={styles.marchRect} />
    </svg>
  );
}

export default function BorderBakeoff() {
  return (
    <main className={styles.page}>
      <p className={styles.title}>{"// DEV: BORDER_BAKEOFF — research spike 001"}</p>
      <p className={styles.hint}>
        Hover (or tab to) each card. Only the border animates — zoom and
        characters are intentionally absent.
      </p>

      <div className={styles.grid}>
        <div className={styles.card}>
          <span className={`${styles.frame} ${styles.cardDraw}`} tabIndex={0}>
            <Image className={styles.shot} src={IMG} alt="" width={1440} height={1080} />
            <Dieline className={styles.drawRect} />
          </span>
          <p className={styles.label}>
            {"01 // DRAW-ON DIELINE — plotter traces the cutline once, retracts on exit"}
          </p>
        </div>

        <div className={styles.card}>
          <span className={`${styles.frame} ${styles.cardMarch}`} tabIndex={0}>
            <Image className={styles.shot} src={IMG} alt="" width={1440} height={1080} />
            <MarchDieline />
          </span>
          <p className={styles.label}>
            {"02 // MARCHING DIELINE — dashed cut path crawls while hovered"}
          </p>
        </div>

        <div className={styles.card}>
          <span className={`${styles.frame} ${styles.cardBeam}`} tabIndex={0}>
            <Image className={styles.shot} src={IMG} alt="" width={1440} height={1080} />
            <span className={styles.beamRing} aria-hidden="true" />
          </span>
          <p className={styles.label}>
            {"03 // IN-RING BEAM — the border line itself carries a current"}
          </p>
        </div>
      </div>
    </main>
  );
}
