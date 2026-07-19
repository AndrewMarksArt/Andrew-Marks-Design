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
}: {
  children: ReactNode;
  caption?: string;
  sub?: ReactNode;
  label: string;
  aspect: number;
  naturalWidth: number;
}) {
  return (
    <figure className={styles.figure}>
      <ZoomableFigure
        label={label}
        aspect={aspect}
        naturalWidth={naturalWidth}
        caption={caption}
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
