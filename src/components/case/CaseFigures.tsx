import type { ReactNode } from "react";
import ZoomableFigure from "./FigureLightbox";
import { PlaceholderBox } from "./CaseSections";
import styles from "./CaseFigures.module.css";

/**
 * Shared figure units for the case studies (extracted from PlatformOne
 * once ChatVET/Knowledge OS gained drafted figures too).
 */

/** Drafted-figure wrapper: framed, click-to-enlarge inline-SVG asset +
 *  real caption text. Self-captioned figures (footnotes inside the SVG)
 *  omit the caption; label/aspect/naturalWidth feed the lightbox. */
export function AssetFigure({
  children,
  caption,
  sub,
  label,
  aspect,
  naturalWidth,
  unframed = false,
}: {
  children: ReactNode;
  caption?: string;
  sub?: ReactNode;
  label: string;
  aspect: number;
  naturalWidth: number;
  /** product screenshots render bare (Andrew's rule, 2026-07-29);
   *  charts and flow diagrams keep the plate */
  unframed?: boolean;
}) {
  return (
    <figure className={styles.figure}>
      <ZoomableFigure
        label={label}
        aspect={aspect}
        naturalWidth={naturalWidth}
        caption={caption}
        unframed={unframed}
      >
        {children}
      </ZoomableFigure>
      {caption && (
        <figcaption className={styles.figureCaption}>
          {caption}
          {sub && <span className={styles.figureSub}>{sub}</span>}
        </figcaption>
      )}
    </figure>
  );
}

/** One drafting-grid stat card, the Platform One closer pattern.
 *  P1 itself ships these as Figma exports; this is the same card rebuilt
 *  from design-system motifs for the studies that have no export. To swap
 *  in an export later, replace <StatCard> with
 *  <img className={styles.statCard} …/> — the row styling is identical. */
export function StatCard({ label, value }: { label: string; value: string }) {
  // 3 x 3 registration crosses, positioned to frame the label bar
  const xs = [12.9, 50, 87.1];
  const ys = [13.3, 28, 84.8];
  return (
    <div className={styles.statCard}>
      {ys.map((y) =>
        xs.map((x) => (
          <i
            key={`${x}-${y}`}
            className={styles.statCardMark}
            style={{ left: `${x}%`, top: `${y}%` }}
            aria-hidden="true"
          />
        ))
      )}
      <span className={styles.statCardLabel}>{label}</span>
      {/* P1's exports are all short ("-40%", "~1 FTE"); longer values like
          "~15 min" wrap and run past the plate, so the numeral steps down a
          tier by length and never wraps. */}
      <span
        className={styles.statCardValue}
        style={{
          // tiers are the P1 numeral (108px at the shipped card width)
          // scaled 1 / 0.75 / 0.60, mirrored in the Figma component
          fontSize:
            value.length > 6
              ? "clamp(26px, 3.78vw, 65px)"
              : value.length > 4
                ? "clamp(32px, 4.70vw, 81px)"
                : undefined,
        }}
      >
        {value}
      </span>
    </div>
  );
}

/** Figma-exported stat card (Andrew's card frames, 2026-07-29) — the
 *  image form the drawn StatCard was built to be swapped for. The export
 *  carries its own plate, grid and border. */
export function StatCardImg({ src, alt }: { src: string; alt: string }) {
  return <img loading="lazy" className={styles.statCardImg} src={src} alt={alt} />;
}

/** The closer's two-card row (P1 `.statCards`). */
export function StatCards({ children }: { children: ReactNode }) {
  return <div className={styles.statCards}>{children}</div>;
}

/** Wireframe media unit: labeled image placeholder + two caption strips
 *  (Figma 480x322-over-25px-bars idiom). Label names the planned visual
 *  so the page doubles as the production checklist. */
export function CaptionedMedia({
  label = "// IMG_PENDING",
  aspect = "480 / 322",
}: {
  label?: string;
  aspect?: string;
}) {
  return (
    <div className={styles.mediaUnit}>
      <PlaceholderBox aspect={aspect} label={label} />
      <div className={styles.captions}>
        <PlaceholderBox aspect="480 / 25" label="// CAPTION_PENDING" />
        <div className={styles.captionShort}>
          <PlaceholderBox aspect="434 / 25" label="" />
        </div>
      </div>
    </div>
  );
}
