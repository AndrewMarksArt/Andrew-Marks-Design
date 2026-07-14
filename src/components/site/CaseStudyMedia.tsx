"use client";

import {
  useCallback,
  useState,
  type CSSProperties,
  type MouseEvent,
} from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./CaseStudies.module.css";

/**
 * One peeking character on an interactive case-study card. Geometry is
 * measured from the Figma hover frames (rest = "Hover State 1", engaged =
 * "Hover State 2"): the wrapper is positioned at the ENGAGED location and
 * `rest` is the transform that tucks it outside the frame. `inner` carries
 * any constant flip/rotate baked into the design (kept off the animation).
 */
export type PeekSprite = {
  src: string;
  /** intrinsic asset size (next/image) */
  width: number;
  height: number;
  /** engaged-position geometry, relative to the 1073x750 frame */
  left: string;
  top: string;
  spriteWidth: string;
  aspect: string;
  /** transform at rest (tucked outside the frame) */
  rest: string;
  /** constant transform on the img itself (mirror/rotation) */
  inner?: string;
  /** crop anchor when the asset overflows the sprite box (default center) */
  objectPosition?: string;
  /** entrance stagger (exit is always immediate) */
  delay?: string;
};

export default function CaseStudyMedia({
  img,
  alt,
  href,
  sprites,
  priority,
}: {
  img: string;
  alt: string;
  href: string;
  sprites: PeekSprite[];
  priority?: boolean;
}) {
  const [peeked, setPeeked] = useState(false);

  // Touch devices get Andrew's two-beat spec: first tap plays the peek,
  // second tap navigates. Pointer devices navigate on click (hover already
  // played the animation).
  const handleClick = useCallback(
    (e: MouseEvent<HTMLAnchorElement>) => {
      const touchOnly = window.matchMedia("(hover: none)").matches;
      if (touchOnly && !peeked) {
        e.preventDefault();
        setPeeked(true);
      }
    },
    [peeked]
  );

  return (
    <Link
      href={href}
      className={styles.mediaLink}
      data-peek={peeked || undefined}
      onClick={handleClick}
      aria-label={`${alt} — view case study`}
    >
      <span className={styles.mediaFrame}>
        <Image
          className={styles.mediaShot}
          src={img}
          alt=""
          width={1440}
          height={1080}
          priority={priority}
          sizes="(max-width: 1023px) 94vw, 62vw"
        />
        {sprites.map((s) => (
          <span
            key={s.src}
            className={styles.peekSprite}
            aria-hidden="true"
            style={
              {
                left: s.left,
                top: s.top,
                width: s.spriteWidth,
                aspectRatio: s.aspect,
                "--peek-rest": s.rest,
                "--peek-inner": s.inner ?? "none",
                "--peek-delay": s.delay ?? "0ms",
              } as CSSProperties
            }
          >
            <Image
              src={s.src}
              alt=""
              width={s.width}
              height={s.height}
              style={
                s.objectPosition
                  ? { objectPosition: s.objectPosition }
                  : undefined
              }
            />
          </span>
        ))}
      </span>
      {/* Border beam v4 (bake-off winner): twin in-ring beams born at the
          top-left and bottom-right corners, each sweeping half the
          perimeter to die at the other's origin, fading in/out. The ring
          layer recolors the border line itself (masked annulus); the glow
          layer rides the same path unmasked for the halo. Siblings of the
          clipped frame so nothing is cut off. */}
      <span className={styles.beamGlows} aria-hidden="true">
        <span className={`${styles.beamHalo} ${styles.beamA}`} />
        <span className={`${styles.beamHalo} ${styles.beamB}`} />
      </span>
      <span className={styles.beamRing} aria-hidden="true">
        <span className={`${styles.beamSeg} ${styles.beamA}`} />
        <span className={`${styles.beamSeg} ${styles.beamB}`} />
      </span>
    </Link>
  );
}
