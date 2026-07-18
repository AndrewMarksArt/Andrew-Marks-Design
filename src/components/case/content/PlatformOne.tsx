import {
  CaseHero,
  StatsStrip,
  CaseSection,
  CenteredSection,
  UpNext,
  PlaceholderBox,
} from "../CaseSections";
import BrandRow from "../../site/BrandRow";
import styles from "../case.module.css";
import local from "./PlatformOne.module.css";

/**
 * Platform One case study content (Figma "Platform One Case Study
 * Template", node 6755:4701). Copy transcribed verbatim from the
 * template; wireframe media renders as labeled placeholders per the
 * annotations (hero split-screen, role/timeframe/team strip, image
 * carousel).
 */

/** Wireframe media unit: image placeholder + two caption strips
 *  (full-width 25px bar, then a 434/480 bar). Label names the planned
 *  visual from the shot list so the page doubles as the production
 *  checklist (.claude/P1-ASSET-CHECKLIST.md). */
function CaptionedMedia({
  label = "// IMG_PENDING",
  aspect = "480 / 322",
}: {
  label?: string;
  aspect?: string;
}) {
  return (
    <div className={local.mediaUnit}>
      <PlaceholderBox aspect={aspect} label={label} />
      <div className={local.captions}>
        <PlaceholderBox aspect="480 / 25" label="// CAPTION_PENDING" />
        <div className={local.captionShort}>
          <PlaceholderBox aspect="434 / 25" label="" />
        </div>
      </div>
    </div>
  );
}

/** The CST lead's own words — the human cost of the flood, in the light
 *  quote-strip treatment (distinct from the dark vignette below it).
 *  ⚠ Typeset as attributed dialogue: the wording must match what she
 *  actually said — Andrew to verify/correct the exact phrasing. */
function CstQuote() {
  return (
    <figure className={local.quoteStrip}>
      <blockquote className={local.quoteText}>
        &ldquo;If you could fix this, I would cry tears of joy.&rdquo;
      </blockquote>
      <figcaption className={local.quoteAttribution}>
        {"// CUSTOMER SUCCESS LEAD · PLATFORM ONE — discovery interview"}
      </figcaption>
    </figure>
  );
}

/** The agitation peak, promoted from the third text column into the
 *  full-width slot (case-study analysis 003): a dark typographic
 *  vignette — narrated, not typeset as attributed dialogue. */
function SecurityVignette() {
  return (
    <figure className={local.vignette}>
      <p className={local.vignetteEyebrow}>
        {"// DURING A LIVE SECURITY EVENT"}
      </p>
      <blockquote className={local.vignetteQuote}>
        The documentation existed. He couldn&rsquo;t find it when it mattered
        most.
      </blockquote>
      <figcaption className={local.vignetteContext}>
        A senior Air Force leader needed proof the platform already defended
        against the threat — by design. The answer was on the site. The
        breaking point wasn&rsquo;t a missing page; it was findability.
      </figcaption>
    </figure>
  );
}

export default function PlatformOne() {
  return (
    <>
      <CaseHero
        eyebrow="U.S. Air Force - Platform One"
        title="Designing an AI assistant projected to cut support tickets by roughly 40%"
        intro={[
          "Platform One is the Air Force's $500M flagship software factory, supporting more than 60 Air Force and Joint programs valued at $650 billion.",
          "But after a rushed rebrand, users couldn't find the answers they needed on its website. Sometimes they couldn't even find how to ask for help. Emergency fixes piled on top of each other — and made things worse.",
        ]}
      />

      <StatsStrip
        items={[
          {
            label: "ROLE:",
            value: "Product Designer, Interface & Conversational UX",
          },
          { label: "TIMEFRAME:", value: "2025 · 6 months" },
          {
            label: "TEAM:",
            value: "1 designer · 2 developers · tech writer · security",
          },
          {
            label: "SCOPE:",
            value:
              "Conversational UX flows · Component & state library · Escalation & routing logic · Expanded developer mode · Interim widget re-skin · Full app design",
          },
        ]}
      />

      <BrandRow />

      <CaseSection
        heading={
          <>
            {"The answers existed."}
            <br />
            {"Users just couldn't find them."}
          </>
        }
        lede={[
          "The documentation, the contact paths, the product information: all of it was there.",
          "The rebrand had buried it.",
          "So users defaulted to the only visible option, asking a human (and sometimes they couldn’t find that option).",
        ]}
        media={
          /* Asymmetric per shot list: the story is findability, which a
             screenshot can't show — the path diagram leads, one evidence
             screenshot supports. */
          <div className={local.asymPair}>
            <CaptionedMedia label="// IA_PATH_DIAGRAM" aspect="16 / 10" />
            <CaptionedMedia label="// BURIED_ANSWER_SCREENSHOT" />
          </div>
        }
      />

      <CaseSection
        heading={'Our "stop the bleeding" fix worked. It also flooded the wrong team.'}
        media={<SecurityVignette />}
      >
        <CstQuote />
        <div className={styles.threeCol}>
          <p>
            {
              "A new Contact Us CTA gave stuck users a lifeline, and tickets exploded. A Customer Success team built for sales and relationships became full-time human routers: fielding password resets, forwarding emails between product teams, and working a CRM that couldn't talk to Jira."
            }
          </p>
          <p>
            {
              "The responses were full of PII, so automated analysis was off the table. I pulled random samples — about 150 responses — and coded them by hand: nearly half were simple help-desk asks or information already on the site, and most of the rest belonged to other teams entirely."
            }
          </p>
          <p>
            {
              "The Customer Success lead put 40–60% of her day into triaging the flood; her three teammates each gave another 10–20%. Roughly a full role, spent on tickets the team was never meant to own."
            }
          </p>
        </div>
      </CaseSection>

      <CaseSection
        heading={
          <>
            {"Self-service by default."}
            <br />
            {"A human path by design."}
          </>
        }
        lede={[
          "Most of those tickets should never have existed — in the sample audit, nearly half were answers already on the site. The assistant answers at the point of confusion, surfacing sources and suggesting follow-ups.",
          "Why an assistant instead of just fixing the navigation? Deeper IA work was underway — but on a much longer timeline, and earlier band-aid fixes had made things worse. The assistant was the bridge that could ship in months, and the wedge that unlocked budget and infrastructure for the platform's next AI projects.",
          "If a question isn't resolved within two turns, a soft CTA routes the user to the help desk or Customer Success based on question type.",
          "The routing burden moved from people to design.",
        ]}
        media={
          /* Systems claim -> full-width diagram leads; the craft close-up
             (citations + follow-up chips) is a tight detail crop, not
             another screenshot. */
          <>
            <CaptionedMedia
              label="// TWO_TURN_ESCALATION_FLOW"
              aspect="979 / 300"
            />
            <div className={local.singleMedia}>
              <CaptionedMedia label="// CITED_ANSWER_CLOSEUP" />
            </div>
          </>
        }
      />

      <CaseSection
        heading="One assistant, two postures."
        lede={[
          "General visitors get a lightweight answer widget.",
          "Developers working in the docs can expand it into a full-screen technical assistant for debugging and deeper questions.",
          "One system, tuned to two very different jobs.",
        ]}
        media={
          /* The page's ONE true pair — the section's story IS a
             comparison (same question, both postures). */
          <div className={styles.mediaPair}>
            <CaptionedMedia label="// POSTURE_WIDGET" />
            <CaptionedMedia label="// POSTURE_DEV_FULLSCREEN" />
          </div>
        }
      />

      <CaseSection
        heading={
          "Designing to ship with one developer & unexpected security constraints."
        }
        lede={[
          "With a single primary developer, I designed to Vuetify's defaults wherever possible, spending customization only where it bought real user value.",
          "When a partner-provided chat widget was chosen as the interim launch vehicle for speed, I recommended against it, documented the UX gaps, and partnered with engineering to re-skin it to our brand while the custom experience is built.",
        ]}
        media={
          <div className={styles.mediaPair}>
            <CaptionedMedia label="// VUETIFY_SPEND_MAP" />
            <CaptionedMedia label="// WIDGET_RESKIN_BEFORE_AFTER" />
          </div>
        }
      />

      <CenteredSection
        heading="Projected impact and the honest road to launch"
        paragraphs={[
          "The assistant is in staging, projected to cut support tickets by roughly 40% — the share of sampled tickets it answers outright — and to return a full role's worth of Customer Success capacity to the work that team was built for.",
          "And the next time a leader needs proof the platform is secure by design, the answer is one question away.",
          "Launch is phased — behind SSO first while the public site completes its Certificate to Field — with the custom front-end replacing the interim widget on the roadmap.",
        ]}
        emphasis="If I ran this again, I'd bring security into launch planning from day one; the SSO constraint reshaped our rollout late."
        carousel={false}
      >
        {/* Pinned closing evidence replaces the carousel (a carousel of
            leftovers is how endings fizzle — analysis 003): stat tiles
            restate the payoff for bottom-first skimmers, the taxonomy
            chart is the 40%'s derivation, the timeline turns the caveat
            sentences into a visible plan. */}
        <dl className={local.tiles}>
          <div className={local.tile}>
            <dt className={local.tileLabel}>PROJECTED TICKET CUT</dt>
            <dd className={local.tileValue}>&minus;40%</dd>
          </div>
          <div className={local.tile}>
            <dt className={local.tileLabel}>CS CAPACITY RETURNED</dt>
            <dd className={local.tileValue}>~1 FTE</dd>
          </div>
          <div className={local.tile}>
            <dt className={local.tileLabel}>THEN A HUMAN, BY DESIGN</dt>
            <dd className={local.tileValue}>2 turns</dd>
          </div>
        </dl>
        <p className={local.tilesNote}>
          {"// projections derived from the hand-coded ticket-sample audit"}
        </p>
        <div className={local.closerMedia}>
          <PlaceholderBox aspect="979 / 360" label="// TICKET_TAXONOMY_CHART" />
          <PlaceholderBox aspect="979 / 140" label="// PHASED_LAUNCH_TIMELINE" />
        </div>
      </CenteredSection>

      <UpNext
        title="ChatVET an AI Copilot for Veterinary Medicine"
        desc="Designing an AI copilot that saves veterinarians 15 minutes per case"
        href="/case-studies/chat-vet"
      />
    </>
  );
}
