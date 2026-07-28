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
 *
 * 2026-07-25 SECOND pass — synced back from Andrew's edits in Figma
 * (node 6967:7299). Three structural changes came with the copy:
 *  - the header gained an EYEBROW ("ORG-LEVEL WORK") and the h2 is now the
 *    deck. The old title "Moving the org without owning it" is retired.
 *  - `proof` became `lede`: it OPENS the readout instead of closing it, and
 *    sits flush with the bullet markers (no 22px indent) so it reads as a
 *    framing line rather than a fifth bullet.
 *  - facets are section names in caps now, not lowercase category tags.
 *  - chunk counts vary 4–6; the WAAPI controller measures real heights, so
 *    nothing needs re-pairing.
 * Record `id`s are deliberately unchanged — they are deep-link anchors.
 *
 * 2026-07-25 first pass — replaced verbatim from Andrew's revised org-level
 * copy. It is a precision pass, and several claims come DOWN; do not restore
 * the earlier phrasings from git history:
 *  - access: "I sourced the AI providers, ran the evaluation" → he was one of
 *    five on it, sourced ONE government option, and facilitated the calls. The
 *    "unblocked higher-security environments" claim is gone entirely.
 *  - relationships: the two teams had NO SHARED PROCESS for coordinating. The
 *    old feuding-leadership framing ("wouldn't share a room", "finger-pointing",
 *    callout "rivals → allies") was an overstatement and is retired.
 *  - infrastructure: response rate is 10–15%, scoped to the two most recent
 *    initiatives — not a standing rate across all campaigns since.
 *
 * 2026-07-25 third pass — Andrew rewrote all four callout units as full
 * sentences and re-pointed two callouts: infrastructure now leads with the
 * response rate (15%) rather than fielding time, and enablement leads with the
 * time-to-findings compression as a PHRASE ("3 mo → 2 wks", isPhrase) instead
 * of the researcher count, which moved into its unit.
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
  /** bold framing line — OPENS the readout, above the bullets */
  lede: string;
  /** the readout, broken into short scannable bullets */
  chunks: string[];
};

const EYEBROW = "ORG-LEVEL WORK";

const TITLE = "Research infrastructure, tooling access, and cross-team delivery";

const SUBHEAD =
  "I help lead user research on the UX/UI team in my value stream, and support several of the org's product teams. Alongside the product work in the case studies, a significant part of my job has been building the conditions that let research happen at all. None of it came with authority to mandate anything, so all of it ran on evaluation, evidence, and working relationships.";

const BEATS: Beat[] = [
  {
    id: "rec-access",
    facet: "AI TOOLING AND ACCESS",
    callout: "2×",
    calloutUnit: "AI access and spend, held through org-wide budget cuts.",
    headline:
      "I got two teams onto AI tooling and documented the case for a higher token cap.",
    lede: "I was one of five on the provider evaluation. I sourced an option, facilitated the calls, and gave my recommendation to the PO.",
    chunks: [
      "Sourced one of the government options under review and facilitated the evaluation calls.",
      "Recommended a commercial provider over the government option I had sourced, because its models were a better fit for our work.",
      "Organized communication channels across the org to surface what other AI projects were underway, which gave the AI team a basis for sizing the initial token request.",
      "Walked two other teams through the request process and got them set up on the tooling.",
      "Documented the value the tokens were delivering and where the existing cap was blocking work. Access and spend doubled, and held through a round of org-wide cuts.",
    ],
  },
  {
    id: "rec-relationships",
    facet: "CROSS-TEAM COLLABORATION",
    callout: "5",
    calloutUnit: "Cross-team initiatives now start with a process I proposed.",
    headline:
      "I proposed the working-group process now used to start every initiative between the two teams.",
    lede: "The product team I support and the value stream I sit in had no shared process for coordinating. I was tasked with supporting the product team while sitting on the other side, which put me on both sides of the gap. After talking with PMs and POs across both, I recommended starting below the leadership level rather than at it.",
    chunks: [
      "Proposed the sequence now in use: a leadership sync to approve a small group of PMs and POs, a scoped brainstorm, then a larger working group with report-backs to leadership when the work warrants it.",
      "Roughly five cross-team initiatives have started this way since.",
      "Early results from those groups gave leadership on both sides a reason to reengage on larger work.",
      "Built the data-lake workflows behind our user sourcing, and stay hands-on with it.",
      "Lead the research validating the five-year roadmap the product team owns and takes to leadership itself.",
      "Identified and now lead the effort connecting our research outcomes to a sibling team's learning and notifications work.",
    ],
  },
  {
    id: "rec-infrastructure",
    facet: "USER SOURCING PIPELINE",
    callout: "15%",
    calloutUnit: "Response rate on user outreach, up from 1–3 percent.",
    headline: "I built the pipeline that cut fielding time from five weeks to two.",
    lede: "Using the model access and the data-lake integration, I built workflows that identify the specific users a campaign needs. I own the pipeline end to end.",
    chunks: [
      "Studies field in roughly two weeks, down from four to five.",
      "Response rates on the two most recent research initiatives run 10 to 15 percent, against 1 to 3 percent at best before the pipeline.",
      "The gain comes from targeting: users who were invisible to us before, and the most active users at the organizations whose feedback matters most.",
      "On a recent merge of two front-end applications, interviews surfaced needs the design had missed (power-user filters and collapsible sections) and the feature changed before it shipped. That work is recent, so I'm not claiming a downstream metric yet.",
    ],
  },
  {
    id: "rec-teaching",
    facet: "ENABLEMENT",
    // phrase, not a number — isPhrase drops it to the 28px tier so it fits
    // the callout column and the real stats above still pop hardest.
    // ASCII "->" on purpose: U+2192 is in NONE of the Geist subsets next/font
    // serves, so a real arrow falls back to a system glyph — unnoticeable at
    // 13px in a mono unit line, obviously wrong at 28px in Geist Bold.
    callout: "3 mo -> 2 wks",
    isPhrase: true,
    calloutUnit: "From fieldwork to findings. Six researchers work from the prompts.",
    headline: "I wrote the prompts and workflows six researchers now work from.",
    lede: "I built the research tooling so people other than me could run it, which meant the operating knowledge had to live outside my head.",
    chunks: [
      "Wrote the custom system prompts our researchers work from. Three researchers on my team use them, plus three from other teams on collaborations.",
      "Synthesis now runs in hours. Getting findings reviewed and presented takes a week or two, against the three to four months it took before. Measured across three collaborations and four campaigns.",
      "Trained the team on the prompts and on efficient use of the model access, and leveled up teammates with the org context their initiatives depend on.",
      "Documented the advanced data-lake workflows in our research repo. Sourcing still routes through me, since I hold the only researcher access.",
      "Working now to extend that access to other researchers and to PMs and POs on other teams, so they can pull sourcing for the feedback their own work needs.",
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
              <p className={styles.eyebrow}>{EYEBROW}</p>
              <h2 id="opsrec-title" className={styles.title}>
                {TITLE}
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
                      <p className={styles.lede}>{b.lede}</p>
                      <ul className={styles.chunks}>
                        {b.chunks.map((c, i) => (
                          <li key={i} className={styles.chunk}>
                            {c}
                          </li>
                        ))}
                      </ul>
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
