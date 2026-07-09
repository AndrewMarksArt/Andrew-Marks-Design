import { Fragment, type ReactNode } from "react";
import Image from "next/image";
import { PlusMark } from "./motifs";
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
};

const CASES: CaseStudy[] = [
  {
    num: "1",
    title: "Platform One AI Assistant & Chat Bot",
    img: "/case-studies/platform-one.png",
    alt: "Platform One website with the P1 Assistant chat panel open, offering answers and quick links for account questions",
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
              <Image
                className={styles.screenshot}
                src={cs.img}
                alt={cs.alt}
                width={1440}
                height={1080}
                sizes="(max-width: 1023px) 94vw, 62vw"
                priority={i === 0}
              />
              <p className={styles.desc}>{cs.desc}</p>
            </div>
          </article>
        </Fragment>
      ))}
    </section>
  );
}
