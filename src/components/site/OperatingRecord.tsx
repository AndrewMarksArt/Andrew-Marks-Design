import { PlusMark } from "./motifs";
import OperatingRecordEnhance from "./OperatingRecordEnhance";
import styles from "./OperatingRecord.module.css";

/**
 * Operating Record — through-others achievements as a skimmable ledger
 * (2026-07-23 reframe, revised to restore the column layout + stat callouts).
 * Each row: a bold callout (a real number where one exists, a short outcome
 * phrase where it doesn't) + a one-line unit, beside a facet tag + headline.
 * On expand the readout is a few short bullets, not a wall of prose. The
 * expand/collapse (native details + OperatingRecordEnhance's WAAPI
 * controller) and its geometry are unchanged.
 *
 * OPSEC: every provider, platform, and org-name is generalized on purpose
 * (Andrew's call, 2026-07-23). Do not re-specify. Every number here is real
 * and must match the resume PDF; nothing is a placeholder.
 */

type Beat = {
  /** stable deep-link id — MUST start with "rec-" (the Enhance controller
   *  only opens rec-* on hashchange); changing it breaks shared links */
  id: `rec-${string}`;
  /** small lowercase mono category tag */
  facet: string;
  /** the bold callout: a real number, or a short outcome phrase */
  callout: string;
  /** true → callout is a phrase, styled smaller than a numeric callout */
  isPhrase?: boolean;
  /** one-line context under the callout (rendered uppercase) */
  calloutUnit: string;
  /** the at-rest headline sentence */
  headline: string;
  /** the readout, broken into short scannable bullets */
  chunks: string[];
  /** optional emphasized closing stat/line */
  proof?: string;
};

const SUBHEAD =
  "I run user research for a large federal software platform. The work I'm proudest of wasn't a screen. It was a handful of judgment calls — about what AI tools the org could get its hands on, how research data actually moves, and getting two teams that wouldn't work together to build together — all made from a seat with no authority to mandate any of it. Systems I built so teams could move.";

const BEATS: Beat[] = [
  {
    id: "rec-access",
    facet: "access",
    callout: "2×",
    calloutUnit: "AI access & spend — held through budget cuts",
    headline:
      "I recommended against the AI tool I brought in myself — the better model won.",
    chunks: [
      "I sourced the AI providers, ran the evaluation, sat on the recommending committee, and sized what we'd need.",
      "I'd personally brought in one of the government options — and still recommended a commercial provider over it, because its models were the better fit for the work.",
      "Then I opened the door for everyone else: coding assistants and LLMs in higher-security environments that had been blocked, my own team unblocked for synthesis, two other teams walked through the request.",
    ],
    proof:
      "The org doubled our access and spend on it — even through org-wide budget cuts.",
  },
  {
    id: "rec-relationships",
    facet: "relationships",
    callout: "rivals → allies",
    isPhrase: true,
    calloutUnit: "one 5-year roadmap validated",
    headline: "Two teams whose leaders wouldn't share a room now build together.",
    chunks: [
      "Two teams whose leadership genuinely didn't get along — scrum masters wouldn't coordinate, and every problem turned into finger-pointing. I was tasked with helping the other team.",
      "Instead of forcing the leaders into a room, I built trust at the PM and PO level first — narrow-scope working groups with report-backs, deliberately routed around the friction.",
      "That credibility reconnected the leaderships on bigger work — and produced the data-lake integration behind real user sourcing, a validated five-year roadmap the other team now defends to leadership, and an org-wide initiative the two teams build together now.",
    ],
  },
  {
    id: "rec-infrastructure",
    facet: "infrastructure",
    callout: "2 wks",
    calloutUnit: "recruit time, was 4–5 wks · 10% response (was 1–3%)",
    headline: "I built the pipeline that finds the right users in two weeks, not five.",
    chunks: [
      "With that model access and the data-lake integration, I built user-sourcing workflows that target the exact users a campaign needs — and I own the pipeline end to end.",
      "It reset the baseline: studies fielded in about two weeks instead of four to five, and response rates around 10 percent — up from a historical 1 to 3 — held across the campaigns since.",
      "On a recent merge of two front-ends into one, the interviews caught what the design had missed — power-user filters and collapsible sections — and reshaped the feature before it shipped. Those changes are recent, so I'm not claiming a downstream number yet.",
    ],
  },
  {
    id: "rec-teaching",
    facet: "teaching",
    callout: "runs without me",
    isPhrase: true,
    calloutUnit: "prompts + pipeline others use",
    headline: "I built it so it wouldn't need me — other researchers run it now.",
    chunks: [
      "Owning the pipeline was never the point — other people running it was.",
      "I wrote the custom system prompts our researchers work from, taught the team to use them and to use the access efficiently, and onboarded and leveled up teammates with the org knowledge that makes their initiatives land.",
      "The through-line: not that I can run the research function, but that the systems can — and the people around me run them without me in the loop.",
    ],
  },
];

export default function OperatingRecord() {
  return (
    <section
      id="operating-record-section"
      className={styles.section}
      aria-labelledby="opsrec-title"
    >
      {/* divider first child, zero top margin — CaseStudies' vrule overshoot
          terminates on this rule (ResumeSection divider recipe, verbatim) */}
      <div className={`fullBleed ${styles.divider}`} aria-hidden="true">
        <PlusMark className={`${styles.dividerMark} ${styles.dividerMarkLeft}`} />
        <PlusMark
          className={`${styles.dividerMark} ${styles.dividerMarkRight}`}
        />
      </div>

      <div className="content">
        <div className={styles.band}>
          <div className={styles.box}>
            <div className={styles.boxHeader}>
              <h2 id="opsrec-title" className={styles.title}>
                Moving the org without owning it
              </h2>
              <div className={styles.introRow}>
                <p className={styles.intro}>{SUBHEAD}</p>
                <span className={styles.hatch} aria-hidden="true" />
              </div>
            </div>

            <ol role="list" className={styles.list}>
              {BEATS.map((b) => (
                <li key={b.id} className={styles.item}>
                  {/* exclusivity lives in the Enhance controller (so the
                      sibling's collapse can ANIMATE); no-JS degrades to
                      multi-open, which is harmless */}
                  <details id={b.id} className={styles.record}>
                    <summary className={styles.summary}>
                      <span className={styles.summaryRow}>
                        <span className={styles.callout}>
                          <span
                            className={`${styles.calloutValue} ${
                              b.isPhrase ? styles.calloutPhrase : ""
                            }`}
                          >
                            {b.callout}
                          </span>
                          <span className={styles.calloutUnit}>
                            {b.calloutUnit}
                          </span>
                        </span>
                        <span className={styles.main}>
                          <span className={styles.facet}>{b.facet}</span>
                          <span className={styles.headlineRow}>
                            <span className={styles.headline}>{b.headline}</span>
                            {/* Andrew's chevron asset (Figma 6814:136); open
                                state is its exact vertical mirror */}
                            <svg
                              className={styles.chevron}
                              aria-hidden="true"
                              focusable="false"
                              viewBox="0 0 23 10"
                              width="23"
                              height="10"
                            >
                              <path
                                d="M11.3135 5.30331L16.9703 0L22.6272 0L11.3135 10L0 0L5.65662 0L11.3135 5.30331Z"
                                fill="currentColor"
                              />
                            </svg>
                          </span>
                        </span>
                      </span>
                    </summary>
                    <div className={styles.readout}>
                      <ul className={styles.chunks}>
                        {b.chunks.map((c, i) => (
                          <li key={i} className={styles.chunk}>
                            {c}
                          </li>
                        ))}
                      </ul>
                      {b.proof && <p className={styles.proof}>{b.proof}</p>}
                    </div>
                  </details>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
      <OperatingRecordEnhance />
    </section>
  );
}
