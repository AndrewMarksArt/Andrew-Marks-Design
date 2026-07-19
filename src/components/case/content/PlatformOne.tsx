import type { ReactNode } from "react";
import {
  CaseHero,
  StatsStrip,
  CaseSection,
  CenteredSection,
  UpNext,
  PlaceholderBox,
} from "../CaseSections";
import BrandRow from "../../site/BrandRow";
import ZoomableFigure from "../FigureLightbox";
import styles from "../case.module.css";
import local from "./PlatformOne.module.css";
import HeroAssistantMock from "./p1/HeroAssistantMock";
import IaPathDiagram from "./p1/IaPathDiagram";
import TwoTurnEscalationFlow from "./p1/TwoTurnEscalationFlow";
import CitedAnswerCloseup from "./p1/CitedAnswerCloseup";
import PostureWidget from "./p1/PostureWidget";
import PostureDevFullscreen from "./p1/PostureDevFullscreen";
import VuetifySpendMap from "./p1/VuetifySpendMap";
import WidgetReskinBeforeAfter from "./p1/WidgetReskinBeforeAfter";
import TicketTaxonomyChart from "./p1/TicketTaxonomyChart";
import PhasedLaunchTimeline from "./p1/PhasedLaunchTimeline";

/**
 * Platform One case study content (Figma "Platform One Case Study
 * Template", node 6755:4701). Copy transcribed verbatim from the
 * template; wireframe media renders as labeled placeholders per the
 * annotations (hero split-screen, role/timeframe/team strip, image
 * carousel).
 */

/** Drafted-figure wrapper: framed, click-to-enlarge inline-SVG asset +
 *  real caption text (the two pending caption bars, made real). Figures
 *  with internal footnotes (closer charts) omit the caption; label/aspect/
 *  naturalWidth feed the lightbox (see FigureLightbox.tsx). */
function AssetFigure({
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
    <figure className={local.figure}>
      <ZoomableFigure
        label={label}
        aspect={aspect}
        naturalWidth={naturalWidth}
        caption={caption}
      >
        {children}
      </ZoomableFigure>
      {caption && (
        <figcaption className={local.figureCaption}>
          {caption}
          {sub && <span className={local.figureSub}>{sub}</span>}
        </figcaption>
      )}
    </figure>
  );
}

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
        media={
          <ZoomableFigure
            label="The assistant in situ"
            aspect={720 / 500}
            naturalWidth={720}
            unframed
          >
            <HeroAssistantMock />
          </ZoomableFigure>
        }
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
            <AssetFigure
              label="Finding support, post-rebrand"
              aspect={960 / 600}
              naturalWidth={960}
              caption="Mapped the post-rebrand path to support: five clicks and two dead ends to reach a lifeline."
              sub={"// every one of these pages existed — reaching them was the failure"}
            >
              <IaPathDiagram />
            </AssetFigure>
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
            <AssetFigure
              label="Two-turn escalation flow"
              aspect={979 / 300}
              naturalWidth={979}
              caption="Designed the escalation logic: two turns, then a human — routed by question type, not by whoever answered the phone."
            >
              <TwoTurnEscalationFlow />
            </AssetFigure>
            <div className={local.singleMedia}>
              <AssetFigure
                label="Cited answer close-up"
                aspect={480 / 340}
                naturalWidth={480}
                caption="Every answer carries its receipts: inline citations, real sources, and a human path that never disappears."
              >
                <CitedAnswerCloseup />
              </AssetFigure>
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
            <AssetFigure
              label="Posture A — general visitor widget"
              aspect={480 / 322}
              naturalWidth={480}
              caption="The widget posture — quick answers at the point of confusion, sized for passers-by."
            >
              <PostureWidget />
            </AssetFigure>
            <AssetFigure
              label="Posture B — developer mode"
              aspect={480 / 322}
              naturalWidth={480}
              caption="The developer posture — the same question, expanded into a full-screen workspace with sources and code."
            >
              <PostureDevFullscreen />
            </AssetFigure>
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
            <AssetFigure
              label="Component spend map"
              aspect={480 / 322}
              naturalWidth={480}
              caption="Audited every surface: stock components where they're free, custom spend concentrated where trust is won."
            >
              <VuetifySpendMap />
            </AssetFigure>
            <AssetFigure
              label="Interim widget — gap audit and re-skin"
              aspect={480 / 360}
              naturalWidth={480}
              caption="Documented the interim widget's gaps, then re-skinned it to the platform's language while the custom build ships."
            >
              <WidgetReskinBeforeAfter />
            </AssetFigure>
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
          {/* self-captioned figures — their footnotes live inside the SVGs */}
          <AssetFigure
            label="Ticket taxonomy — hand-coded sample"
            aspect={979 / 360}
            naturalWidth={979}
          >
            <TicketTaxonomyChart />
          </AssetFigure>
          <AssetFigure
            label="Phased launch sequence"
            aspect={979 / 140}
            naturalWidth={979}
          >
            <PhasedLaunchTimeline />
          </AssetFigure>
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
