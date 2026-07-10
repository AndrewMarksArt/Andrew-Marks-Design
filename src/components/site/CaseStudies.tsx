import { Fragment, type ReactNode } from "react";
import Image from "next/image";
import { PlusMark } from "./motifs";
import CaseStudyMedia, { type PeekSprite } from "./CaseStudyMedia";
import styles from "./CaseStudies.module.css";

/**
 * Case Studies — three rows (spec §5 "Case-study row" + ledger ruling #4).
 * Renders the separator above row 1 (design y=1062) and the two mid-gap
 * separators (y=1991/2952), all overhanging to the plate edges with plus
 * marks pinning the interior-rule intersections, plus the interior column
 * rules spanning the whole band. Copy strings are the exact spec §3 values.
 * Must be composed inside a `.content` wrapper (content column = 100%).
 */

type CaseStudy = {
  num: string;
  title: string;
  img: string;
  alt: string;
  desc: ReactNode;
  /** Rows with hover interactions render CaseStudyMedia */
  href?: string;
  sprites?: PeekSprite[];
};

/* Sprite geometry measured from the Figma hover frames (values are the
   engaged position; `rest` tucks the character outside the clipped frame).
   Platform One: 6739:4672 → 6739:4669. ChatVET: 6745:4681 → 6745:4677. */
const GROGU: PeekSprite = {
  src: "/case-studies/grogu-peek.webp",
  width: 720,
  height: 335,
  left: "5.41%", // 58 / 1073
  top: "0%",
  spriteWidth: "48.09%", // 516 / 1073
  aspect: "516 / 240",
  rest: "translateY(-102%) rotate(-3.33deg)", // Figma 176.67° vs 180°
  inner: "rotate(180deg)", // hangs upside down
};

const CHATVET_CAT: PeekSprite = {
  src: "/case-studies/chatvet-peek-cat.webp",
  width: 840,
  height: 1115,
  left: "0.12%", // 1.33 / 1073
  top: "68.67%", // 515 / 750
  spriteWidth: "26.02%", // 279.22 / 1073
  aspect: "279.222 / 370.727",
  /* rest center Δ (−192px, +265.3px) as % of the sprite box + the 17.94°
     tilt it rolls off as it rises */
  rest: "translate(-68.76%, 71.57%) rotate(17.73deg)",
  inner: "rotate(0.21deg)",
};

const CHATVET_DOG: PeekSprite = {
  src: "/case-studies/chatvet-peek-dog.webp",
  width: 1024,
  height: 1024,
  left: "78.94%", // ≈847 / 1073
  top: "51.5%", // ≈386.3 / 750
  spriteWidth: "25.45%", // 273.14 / 1073
  aspect: "273.138 / 362.65",
  /* rest Δ (+240px, +160px) — slides in diagonally from off the right edge */
  rest: "translate(87.87%, 44.12%)",
  inner: "scaleY(-1) rotate(-179.42deg)", // = horizontal mirror + 0.58° tilt
};

/* Knowledge OS (6749:4690 → 6749:4687): the hero robot itself (identical
   asset, reused from /hero/) peeks from the bottom-left — mirrored + tilted
   12.82° (scaleY(-1) rotate(-167.18°)), rising diagonally up-right. */
const KNOWLEDGE_ROBOT: PeekSprite = {
  src: "/hero/robot.webp",
  width: 1200,
  height: 2101,
  left: "-3.06%", // inner box top-left -32.85 / 1073
  top: "44.25%", // 331.87 / 750
  spriteWidth: "41.65%", // 446.87 / 1073
  aspect: "446.872 / 619.312",
  rest: "translate(-48.34%, 68.46%)", // Δ(-216px, +424px) from engaged
  inner: "scaleY(-1) rotate(-167.18deg)",
  objectPosition: "top", // bottom ~26% cropped, matching the hero band
};

const CASES: CaseStudy[] = [
  {
    num: "1",
    title: "Platform One AI Assistant & Chat Bot",
    img: "/case-studies/platform-one.png",
    alt: "Platform One website with the P1 Assistant chat panel open, offering answers and quick links for account questions",
    href: "/case-studies/platform-one",
    sprites: [GROGU],
    desc: (
      <>
        An AI assistant projected to{" "}
        <strong>cut support tickets up to 40%</strong> inside the Air
        Force&apos;s flagship software factory.
      </>
    ),
  },
  {
    num: "2",
    title: "Chat VET an AI Suite for Veterinary Medicine",
    img: "/case-studies/chat-vet.png",
    alt: "chatVET app home screen: clinical search bar and VetMed prompt templates for veterinary professionals",
    href: "/case-studies/chat-vet",
    sprites: [CHATVET_CAT, CHATVET_DOG],
    desc: (
      <>
        An AI copilot that <strong>saves veterinarians 15 minutes per case</strong>
        , answering from Merck Veterinary Manual instead of the open web.
      </>
    ),
  },
  {
    num: "3",
    title: "AI Powered Personal Knowledge OS",
    img: "/case-studies/knowledge-os.png",
    alt: "Arclight knowledge dashboard listing captured links with sources, categories, scores, and agent navigation",
    href: "/case-studies/knowledge-os",
    sprites: [KNOWLEDGE_ROBOT],
    desc: (
      <>
        A <strong>multi-agent system that reads 1,000&apos;s of sources</strong>{" "}
        building a living corpus I can leverage to build and explore with.
      </>
    ),
  },
];

function Separator({ className }: { className: string }) {
  return (
    <div className={`${styles.separator} ${className}`} aria-hidden="true">
      <PlusMark className={`${styles.sepMark} ${styles.sepMarkLeft}`} />
      <PlusMark className={`${styles.sepMark} ${styles.sepMarkRight}`} />
    </div>
  );
}

export default function CaseStudies() {
  return (
    <section className={styles.caseStudies} aria-labelledby="case-studies-title">
      <h2 id="case-studies-title" className="visually-hidden">
        Case Studies
      </h2>

      {/* Interior column rules (Vectors 15/17/16), continuing down from the
          status block to the divider band */}
      <span className={`${styles.vrule} ${styles.vruleLeft}`} aria-hidden="true" />
      <span className={`${styles.vrule} ${styles.vruleMid}`} aria-hidden="true" />
      <span className={`${styles.vrule} ${styles.vruleRight}`} aria-hidden="true" />

      {/* Separator above row 1 (design y=1062) */}
      <Separator className={styles.separatorTop} />

      {CASES.map((cs, i) => (
        <Fragment key={cs.num}>
          {/* Mid-gap separators (design y=1991/2952) */}
          {i > 0 && <Separator className={styles.separatorMid} />}
          <article className={styles.row}>
            <div className={styles.rail} aria-hidden="true">
              <span className={styles.numeral}>{cs.num}</span>
            </div>
            <div className={styles.card}>
              <h3 className={styles.title}>{cs.title}</h3>
              {cs.sprites && cs.href ? (
                <CaseStudyMedia
                  img={cs.img}
                  alt={cs.alt}
                  href={cs.href}
                  sprites={cs.sprites}
                  priority={i === 0}
                />
              ) : (
                <Image
                  className={styles.screenshot}
                  src={cs.img}
                  alt={cs.alt}
                  width={1440}
                  height={1080}
                  sizes="(max-width: 1023px) 94vw, 62vw"
                  priority={i === 0}
                />
              )}
              <p className={styles.desc}>{cs.desc}</p>
            </div>
          </article>
        </Fragment>
      ))}
    </section>
  );
}
