import { Fragment, type ReactNode } from "react";
import { PlusMark } from "./motifs";
import OperatingRecordEnhance from "./OperatingRecordEnhance";
import styles from "./OperatingRecord.module.css";

/**
 * Operating Record — the non-visual, measured achievements as an
 * expanding ledger (native details/summary, exclusive-open). Visual
 * system per the redesign panel ("Drafting Sheet" direction, synthesized
 * spec in session record): outline-stroke display values in the case
 * numerals' voice, case-band 98px row meter, mid vrule born at the
 * ledger's opening separator (T-junction precedent), accent hatch as the
 * single rest-state orange. At rest each row = value/LABEL/claim/src;
 * scope + AI bridge live in the readout (skim defense: the claims carry
 * breadth; src stays at rest as the honesty non-negotiable).
 *
 * ANDREW — HOW TO FILL THIS IN (the intake contract, per field):
 *   value    display digits only ("56,854", "10 → 7") — never brackets;
 *            a best-guess value MUST keep draft: true until it's real.
 *   claim    <=160 chars, survives alone as a resume-grade bullet.
 *   scope    1-3 CAPS segments proving BREADTH (studies / teams / years)
 *            — this is the multiplication evidence, keep it honest.
 *   bridge   one plain-English sentence a generalist recruiter gets.
 *   src      the artifact you could produce in a phone screen
 *            (CRM export, study logs, hiring tracker, resume PDF).
 *   readout.execution MUST name the through-others mechanism: who you
 *            enabled and what they could do without you afterward.
 *   Every number here must match the resume PDF exactly — three
 *   surfaces (row, readout, PDF) are never allowed to drift.
 */

type OpRecord = {
  /** stable deep-link id — changing it breaks shared links */
  id: `rec-${string}`;
  value: string;
  unit?: string;
  /** SCREAMING_SNAKE, cap ~24 chars */
  label: string;
  claim: string;
  scope: string[];
  bridge: string;
  src: string;
  readout: {
    situation: string;
    execution: string;
    result: string;
    forAiTeams: string;
    /** real-text closing sentence — exposed to screen readers */
    provenance: string;
  };
  /** renders a visible DRAFT tag; remove only when the number is real */
  draft?: true;
};

const RECORDS: OpRecord[] = [
  {
    id: "rec-user-sourcing",
    // TODO(andrew): real totals — participants sourced, studies served,
    // teams drawing from the pool, years; src = panel CRM / study logs.
    value: "500+",
    unit: "PARTICIPANTS SOURCED",
    label: "USER_SOURCING",
    claim:
      "Built the participant-sourcing pipeline that kept every study staffed — screened, consented, and on tap instead of scrambled for.",
    scope: ["20+ STUDIES SERVED", "4 TEAMS DRAWING FROM IT", "2023–2025"],
    bridge:
      "a standing pool of consented, screened humans — the raw material of evals and human-feedback loops.",
    src: "DRAFT — replace with panel CRM export / study-log counts",
    readout: {
      situation:
        "Every study opened with a two-week scramble for participants; recruiting rate-limited the whole research program.",
      execution:
        "I built the pipeline — screeners, consent flows, a panel CRM — and trained PMs and designers to self-serve recruits from it, so studies stopped waiting on me.",
      result:
        "Time-to-first-session fell from weeks to days; twenty-plus studies ran on the pool without a recruiting scramble.",
      forAiTeams:
        "Evals and human-feedback loops die without exactly this machinery — consented, screened humans reachable this week. I build that pipeline as a design deliverable.",
      provenance:
        "Draft figures — best-guess placeholders until the panel CRM export lands; treat as shape, not fact.",
    },
    draft: true,
  },
  {
    id: "rec-okr-alignment",
    // TODO(andrew): real team + quarter counts; src = planning docs?
    value: "6",
    unit: "TEAMS ALIGNED",
    label: "OKR_ALIGNMENT",
    claim:
      "Ran the shared evidence base that aligned six product teams' quarterly OKRs — one research-backed picture instead of six competing opinions.",
    scope: ["ORG-WIDE PLANNING CYCLE", "MULTIPLE QUARTERS", "LEADERSHIP + ICS"],
    bridge:
      "the alignment machinery that keeps product, research, and model teams pointed at one target.",
    src: "DRAFT — replace with planning-doc references + real counts",
    readout: {
      situation:
        "Quarterly planning ran on the loudest voice in the room; teams optimized locally and collided quarterly.",
      execution:
        "I brought research into the planning cycle — synthesized findings into a shared evidence base and worked with team leads until they could cite it in planning without me in the room.",
      result:
        "Six teams' OKRs traced to shared evidence across consecutive planning cycles.",
      forAiTeams:
        "AI roadmaps drift fastest; alignment machinery is how model work stays pointed at user problems.",
      provenance:
        "Draft figures — best-guess placeholders until the planning-cycle records are pulled; treat as shape, not fact.",
    },
    draft: true,
  },
  {
    id: "rec-startup-hiring",
    // TODO(andrew): real candidate/hire counts + roles; src = hiring tracker.
    value: "3",
    unit: "HIRES SHIPPED",
    label: "STARTUP_HIRING",
    claim:
      "Designed the hiring loop for an early-stage team — screens, work samples, structured debriefs — and helped make the hires who shipped.",
    scope: ["40+ CANDIDATES SCREENED", "EARLY-STAGE AI STARTUP"],
    bridge:
      "team-building judgment — the filter that decides who ships your product.",
    src: "DRAFT — replace with hiring-tracker counts + roles",
    readout: {
      situation:
        "An early-stage team hiring on founder gut, with no repeatable way to compare candidates.",
      execution:
        "I designed the loop — role definitions, screens, work-sample exercises, structured debriefs — and ran interviews alongside the founders until the loop ran without me.",
      result:
        "Hires made through the loop shipped; screening scaled past founder bandwidth.",
      forAiTeams:
        "Small AI teams live or die on the third hire — process beats gut at exactly that moment.",
      provenance:
        "Draft figures — best-guess placeholders until the hiring tracker is pulled; treat as shape, not fact.",
    },
    draft: true,
  },
  {
    id: "rec-onboarding-ramp",
    // REAL numbers — from the resume (Northrop onboarding site, 10 -> 7 days).
    value: "10 → 7",
    unit: "DAYS TO RAMP",
    label: "ONBOARDING_RAMP",
    claim:
      "Built the onboarding system for payload & ground-systems engineers that cut new-hire ramp from ten days to seven.",
    scope: ["NORTHROP GRUMMAN", "PAYLOAD & GROUND SYSTEMS", "2021–2023"],
    bridge:
      "tribal knowledge turned into a system people ramp on — the same discipline behind my Knowledge OS.",
    src: "measured ramp delta — matches the resume PDF",
    readout: {
      situation:
        "New engineers ramped by shoulder-tap — ten days to productive, longer when the right shoulder was busy.",
      execution:
        "I built the onboarding site around the workflows and first-week paths engineers actually needed, structured so leads could keep it current without me.",
      result:
        "Ramp fell from ten days to seven — a thirty percent cut across incoming cohorts.",
      forAiTeams:
        "The same capture-and-structure discipline that powers a RAG corpus — knowledge nobody has to re-ask for.",
      provenance:
        "Source: measured ramp delta across incoming cohorts; matches the resume PDF. Figures are counts, not estimates.",
    },
  },
  // ALTERNATE (real numbers, swap in if one of the drafts gets cut):
  // {
  //   id: "rec-identity-unification",
  //   value: "56,854", unit: "IDENTITIES UNIFIED", label: "IDENTITY_UNIFICATION",
  //   claim: "Led the behavioral-analytics build that unified 56,854 user identities across six data sources into one coherent picture of the user.",
  //   scope: ["METRONOME", "6 DATA SOURCES", "2024–PRESENT"],
  //   bridge: "the ground-truth user data personalization and eval sets are built from.",
  //   src: "matches the resume PDF",
  //   readout: { ... },
  // },
];

if (process.env.NODE_ENV !== "production") {
  for (const r of RECORDS) {
    if (r.draft)
      console.warn(
        `[OperatingRecord] "${r.label}" carries DRAFT values — replace before launch.`,
      );
    if (!r.src)
      console.warn(
        `[OperatingRecord] "${r.label}" has no src — provenance is a required field; the record must not ship.`,
      );
  }
}

/** Presentation-only split of arrow values ("10 → 7") so the glyph can
 *  carry its own optical size; AT still reads the full data string. */
function renderValue(v: string): ReactNode {
  if (!v.includes("→")) return v;
  const [before, after] = v.split(/\s*→\s*/);
  return (
    <>
      {before}
      <span className={styles.valueArrow}>→</span>
      {after}
    </>
  );
}

/** mono readout block: label + body */
function ReadoutBlock({ label, text }: { label: string; text: string }) {
  return (
    <div className={styles.block}>
      <p className={styles.blockLabel}>{label}</p>
      <p className={styles.blockBody}>{text}</p>
    </div>
  );
}

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

      {/* band nests INSIDE .content; Andrew's 6815:336 revision — the
          ledger is a bordered box that CONTAINS the header; separators
          are interior rules; the expand affordance is the accent arrow */}
      <div className="content">
        <div className={styles.band}>
          <h2 id="opsrec-title" className="visually-hidden">
            Operating record — org-scale research operations
          </h2>

          <div className={styles.box}>
            <div className={styles.boxHeader}>
              <p className={styles.kicker} aria-hidden="true">
                <span className={styles.kickerLabel}>OPERATING_RECORD</span>
                <span className={styles.kickerMeta}>
                  {`// ${String(RECORDS.length).padStart(2, "0")} RECORDS ON FILE`}
                </span>
              </p>
              <div className={styles.introRow}>
                <p className={styles.intro}>
                  Systems I built so teams could move — research operations,
                  hiring, and alignment machinery. The operating layer AI teams
                  run on.
                </p>
                <span className={styles.hatch} aria-hidden="true" />
              </div>
            </div>

            <ol role="list" className={styles.list}>
              {RECORDS.map((r) => (
                <li key={r.id} className={styles.item}>
                  <details
                    id={r.id}
                    name="operating-record"
                    className={styles.record}
                  >
                    <summary className={styles.summary}>
                      <span className={styles.summaryGrid}>
                        <span className={styles.value}>
                          {renderValue(r.value)}
                        </span>
                        {r.unit && <span className={styles.unit}>{r.unit}</span>}
                        <span className={styles.main}>
                          <span className={styles.labelRow}>
                            <span className={styles.label}>{r.label}</span>
                            <span className={styles.arrow} aria-hidden="true">
                              →
                            </span>
                          </span>
                          <span className={styles.claim}>{r.claim}</span>
                        </span>
                      </span>
                    </summary>
                    <div className={styles.readout}>
                      {/* readout line 1: the demoted breadth evidence */}
                      <p className={styles.scope}>
                        <span aria-hidden="true">{"SCOPE: "}</span>
                        <span className="visually-hidden">Scope: </span>
                        {r.scope.map((seg, j) => (
                          <Fragment key={j}>
                            {j > 0 && (
                              <>
                                <span aria-hidden="true">{" // "}</span>
                                <span className="visually-hidden">, </span>
                              </>
                            )}
                            <span>{seg}</span>
                          </Fragment>
                        ))}
                      </p>
                      <ReadoutBlock
                        label="SITUATION"
                        text={r.readout.situation}
                      />
                      <ReadoutBlock
                        label="EXECUTION"
                        text={r.readout.execution}
                      />
                      <ReadoutBlock
                        label="MEASURED RESULT"
                        text={r.readout.result}
                      />
                      {/* translation zone: bridge + FOR AI TEAMS read as one */}
                      <p className={styles.bridge}>
                        <span className={styles.bridgeArrow} aria-hidden="true">
                          {"→ "}
                        </span>
                        <span className={styles.bridgePrefix}>
                          IN AI TERMS:
                        </span>{" "}
                        {r.bridge}
                      </p>
                      <div className={styles.forAi}>
                        <p className={styles.forAiLabel}>
                          <span aria-hidden="true">{"→ "}</span>FOR AI TEAMS
                        </p>
                        <p className={styles.forAiBody}>{r.readout.forAiTeams}</p>
                      </div>
                      <p className={styles.readoutProvenance}>
                        {r.readout.provenance}
                      </p>
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
