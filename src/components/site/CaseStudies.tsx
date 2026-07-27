import { Fragment, type ReactNode } from "react";
import { PlusMark } from "./motifs";
import CaseStudyMedia from "./CaseStudyMedia";
import { CASE_MEDIA } from "./caseMedia";
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
  href: string;
  desc: ReactNode;
};

/* Card media (screenshot + peek sprites + beam) lives in the shared
   caseMedia registry, keyed by href, so the home grid and the case-study
   UP NEXT cross-link render identical cards. Only the num/title/desc — the
   home-grid-specific copy — stays here. */
const CASES: CaseStudy[] = [
  {
    num: "1",
    title: "Platform One AI Assistant & Chat Bot",
    href: "/case-studies/platform-one",
    desc: (
      <>
        An AI assistant projected to{" "}
        <strong>cut support tickets by roughly 40%</strong> inside the Air
        Force&apos;s flagship software factory.
      </>
    ),
  },
  {
    num: "2",
    title: "ChatVET — an AI Copilot for Veterinary Medicine",
    href: "/case-studies/chat-vet",
    desc: (
      <>
        An AI copilot that <strong>vets say saves them about 15 minutes per case</strong>
        , answering from Merck Veterinary Manual instead of the open web.
      </>
    ),
  },
  {
    num: "3",
    title: "AI Powered Personal Knowledge OS",
    href: "/case-studies/knowledge-os",
    desc: (
      <>
        A <strong>multi-agent system that reads 300–400 sources a week</strong>{" "}
        into a 4,000+ source living corpus — built solo, in production.
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

      {CASES.map((cs, i) => {
        const media = CASE_MEDIA[cs.href];
        return (
          <Fragment key={cs.num}>
            {/* Mid-gap separators (design y=1991/2952) */}
            {i > 0 && <Separator className={styles.separatorMid} />}
            <article className={styles.row}>
              <div className={styles.rail} aria-hidden="true">
                <span className={styles.numeral}>{cs.num}</span>
              </div>
              <div className={styles.card}>
                <h3 className={styles.title}>{cs.title}</h3>
                {media ? (
                  <CaseStudyMedia
                    img={media.img}
                    alt={media.alt}
                    title={cs.title}
                    href={cs.href}
                    sprites={media.sprites}
                    priority={i === 0}
                    beam={media.beam}
                  />
                ) : null}
                <p className={styles.desc}>{cs.desc}</p>
              </div>
            </article>
          </Fragment>
        );
      })}
    </section>
  );
}
