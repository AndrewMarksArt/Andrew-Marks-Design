"use client";

import { useCallback, useState, type MouseEvent } from "react";
import Image from "next/image";
import styles from "./CaseStudies.module.css";

/**
 * Interactive case-study media — Figma "Hover State 1/2 - Platform One"
 * (nodes 6739:4672 → 6739:4669): the whole image is the link. Hover zooms
 * the screenshot ~5% while the peek-a-boo character drops in upside-down
 * from the top edge (rest: fully above, tilted 3.33°; end: flush at top,
 * square 180°). Mouse-out eases back. Touch/keyboard toggle the same state
 * via data-peek.
 *
 * Navigation is STUBBED (Andrew's ruling: no case-study page until the
 * animation is signed off) — clicks preventDefault and toggle the peek.
 */
export default function CaseStudyMedia({
  img,
  alt,
  priority,
}: {
  img: string;
  alt: string;
  priority?: boolean;
}) {
  const [peeked, setPeeked] = useState(false);

  const handleClick = useCallback((e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setPeeked((p) => !p);
  }, []);

  return (
    <a
      href="/case-studies/platform-one"
      className={styles.mediaLink}
      data-peek={peeked || undefined}
      onClick={handleClick}
      aria-label={`${alt} — case study coming soon`}
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
        <span className={styles.peekSprite} aria-hidden="true">
          <Image
            src="/case-studies/grogu-peek.webp"
            alt=""
            width={720}
            height={335}
          />
        </span>
      </span>
    </a>
  );
}
