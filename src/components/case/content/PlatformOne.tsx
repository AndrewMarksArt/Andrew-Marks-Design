import {
  CaseHero,
  StatsStrip,
  CaseSection,
  UpNext,
} from "../CaseSections";
import { AssetFigure } from "../CaseFigures";
import BrandRow from "../../site/BrandRow";
import ZoomableFigure from "../FigureLightbox";
import styles from "../case.module.css";
import local from "./PlatformOne.module.css";
import TicketTaxonomyChart from "./p1/TicketTaxonomyChart";

/**
 * Platform One case study content (Figma "Platform One Case Study
 * Template", node 6755:4701). Copy transcribed verbatim from the
 * template; wireframe media renders as labeled placeholders per the
 * annotations (hero split-screen, role/timeframe/team strip, image
 * carousel).
 *
 * 2026-07-27 judge-panel pass (6-lens panel, mean ~7.4; synthesis in
 * .claude/research/005-portfolio-full-picture.md): hero figure label
 * reconciled to staging; answer-trust section added ("Every answer
 * shows where it came from" — claims only what the shipped captures
 * show: inline citations, did-this-help, the 2/4-turn human path) and
 * the real-product chats figure moved into it; S5 heading retitled to
 * its actual contents; closer de-circularized (the 40% is named as the
 * sample-derived ceiling, the ~1 FTE gets its routing connective) with
 * a method note under the stat cards; vignette gets a setup line.
 *
 * ANDREW'S COPY REWRITE 2026-07-29 (Figma section 7076:1963, "text
 * update"): every section's heading + ledes replaced with his wording.
 * Notable calls of his: $500M / $650B dropped from the hero; the CS
 * lead's 40–60% triage stat summarized to "close to a full role";
 * S5 reframed (no "recommended against it"; the security-timing miss
 * owns the interim-widget outcome); posture section now tells the
 * developer-disagreement story. The vignette setup lede ("one came
 * due mid-incident") kept — his rewrite didn't cover it and the
 * vignette needs its hook.
 *
 * ⚠ PENDING FROM ANDREW: (1) the one measured number the panel asked
 * for — replay the 60 "answer existed" sampled tickets through the
 * staging assistant and report the real answer rate (turns the
 * projection into a tested claim); (2) the tight citations detail crop
 * for the trust section; (3) the "two postures" capture must show the
 * developer posture doing developer work, not account-access basics.
 */

/** The CST lead's own words — the human cost of the flood, in the light
 *  quote-strip treatment (distinct from the dark vignette below it).
 *  ⚠ Typeset as attributed dialogue: the wording must match what she
 *  actually said — Andrew to verify/correct the exact phrasing. */
function CstQuote() {
  /* Figma revision 2026-07-21: grid-paper plate with accent border; wording
     updated by Andrew (source typo "hav eto" corrected to "have to"). */
  return (
    <figure className={local.quoteStrip}>
      <blockquote className={local.quoteText}>
        &ldquo;If I didn&rsquo;t have to deal with these tickets anymore, I
        would be so happy I could cry.&rdquo;
      </blockquote>
      <figcaption className={local.quoteAttribution}>
        {"// CUSTOMER SUCCESS TEAM MEMBER | PLATFORM ONE | discovery interview"}
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
        {/* Figma revision 2026-07-21 (source typos "could find" / "need"
            corrected to "couldn't find" / "needed"). */}
        A senior Air Force leader needed proof the platform already defended
        against the threat by design. The answer was in the docs, but when it
        mattered, he couldn&rsquo;t find it fast enough.
      </figcaption>
    </figure>
  );
}

/** The developer-disagreement, staged into the skim path (rescore pass
 *  2026-07-29, fix #5): the page's clearest evidence-over-opinion moment
 *  in the light quote-strip treatment — narration, not attributed
 *  dialogue. */
function DecisionCallout() {
  return (
    <figure className={local.quoteStrip}>
      <blockquote className={local.quoteText}>
        Our developer wanted a coding assistant. Instead of arguing, I went
        back to the tickets.
      </blockquote>
      <figcaption className={local.quoteAttribution}>
        {"// THE CALL: BOTH MODES WERE JUSTIFIED, SO I DESIGNED BOTH"}
      </figcaption>
    </figure>
  );
}

export default function PlatformOne() {
  return (
    <>
      <CaseHero
        eyebrow="U.S. Air Force · Platform One"
        title="Designing an AI assistant projected to cut support tickets by 40%"
        intro={[
          "Platform One is the Air Force's flagship software factory, supporting more than 60 Air Force and Joint programs.",
          "But after a rushed rebrand, users couldn't find the answers they needed on its website. Sometimes they couldn't even find how to ask for help. Emergency fixes piled on top of each other, and while they helped in some ways, in others they made things worse.",
        ]}
        media={
          <ZoomableFigure
            label="The assistant, in staging on Platform One's site"
            aspect={1408 / 932}
            naturalWidth={1408}
            unframed
          >
            <img
              src="/case-studies/platform-one/p1-hero-insitu.webp"
              alt="Platform One's homepage with the P1 Assistant widget open in the corner, answering 'I need to access Iron Bank' with steps, a Create-account button, a cited source, and a did-this-help prompt."
              className={local.shotImg}
            />
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
            value:
              "1 Designer · 2 Developers · Security approver · Project Manager",
          },
          {
            label: "SCOPE:",
            value:
              "Conversational UX flows · Component & state library · Escalation & routing logic flows · Interim widget re-skin · Full app design",
          },
        ]}
      />

      <BrandRow />

      <CaseSection
        heading="Every answer users needed was already on the site, buried in the docs."
        lede={[
          "The rebrand shipped fast. High-level marketing copy replaced much of the detail users relied on, and the answers that survived ended up in the documentation, where most visitors never thought to look.",
          "Users who gave up searching had nowhere to go, because the site had no Contact Us form.",
          "Adding one was the first fix, and it was the right call. It also stuck a team built for sales and customer relationships with basic help-desk tickets.",
        ]}
        media={
          /* Figma revision 2026-07-22 (node 6871:3238): Andrew's simplified
             two-example flow replaces the drafting-sheet trace. The design
             self-captions (terminal-prompt header + numbered questions), so
             no figcaption; framed since the plate is white-on-white. */
          <ZoomableFigure
            label="Two simplified examples of users giving up"
            aspect={1076 / 918}
            naturalWidth={1076}
          >
            <img
              src="/case-studies/platform-one/p1-simplified-flow.webp"
              alt="Flow diagram of two example questions: how much does Party Bus cost, and how does Iron Bank secure containers. From the p1.dso.mil home page users reach P1 solutions, then /party-bus (high level, no pricing or technical information) or /iron-bank (catalog and images behind SSO login), loop back, and most end up at the Contact Us form. A note marks where most answers actually live: three to four clicks deep and mostly hidden behind login, with broken links and no hierarchy on solutions pages."
              className={local.shotImg}
            />
          </ZoomableFigure>
        }
      />

      <CaseSection
        heading={'Our "stop the bleeding" fix worked. It also flooded the wrong team.'}
        lede={[
          "The Contact Us form gave stuck users a path, and ticket volume climbed immediately. A Customer Success team built for sales and relationships became full-time routers: password resets, emails forwarded between product teams, and a CRM that could not talk to Jira.",
          "The responses were full of PII, so automated analysis was off the table. I pulled random samples (about 150 responses) and coded them by hand: nearly half were simple help-desk asks or information already on the site, and most of the rest belonged to other teams entirely.",
          "Triage was consuming close to a full role's worth of capacity across the four-person team, on tickets none of them were meant to own.",
          "And not every buried answer was routine. One came due mid-incident.",
        ]}
        media={<SecurityVignette />}
      >
        {/* Right column is the evidence stack — the lead's voice, then the
            hand-coded sample the lede narrates (self-captioned SVG), then
            the security vignette. The old three-column band predates the
            section having any imagery. */}
        <CstQuote />
        <AssetFigure
          label="Ticket taxonomy: hand-coded sample"
          aspect={979 / 360}
          naturalWidth={979}
        >
          <TicketTaxonomyChart />
        </AssetFigure>
      </CaseSection>

      <CaseSection
        heading="Answer at the point of confusion. Hand off to a human by turn four."
        lede={[
          "Most of those tickets should never have existed: in the sample audit, nearly half were answers already on the site. The assistant answers at the point of confusion, surfacing sources and suggesting follow-ups.",
          "Why an assistant instead of just fixing the navigation? Deeper IA work was underway, but on a much longer timeline, and earlier band-aid fixes had made things worse. The assistant could ship in months, and it unlocked the budget and infrastructure for the platform's next AI projects.",
          "After two turns without a resolution, a soft CTA offers the help desk or Customer Success, routed by question type. After turn four the CTA becomes a hard one, so no conversation loops. The thresholds are a starting point; every did-this-help answer is data for tuning them.",
          "The routing burden moved from an overworked team to a system.",
        ]}
        media={
          /* Systems claim -> full-width diagram leads; the craft close-up
             (citations + follow-up chips) is a tight detail crop, not
             another screenshot. */
          <>
            {/* Figma revision 2026-07-22 (node 6873:3333): Andrew's escalation
                flow replaces the drawn version. Self-captioned header, so no
                figcaption; framed since the plate is white-on-white. */}
            <ZoomableFigure
              label="Escalation flow: self-service with a human path"
              aspect={1346 / 973}
              naturalWidth={1346}
            >
              <img
                src="/case-studies/platform-one/p1-escalation-flow.webp"
                alt="Flow diagram of the escalation logic. A user question gets a sourced answer with citations inline and follow-up suggestions. If the question is answered: done, self-service. If not, the user follows up, and after more than two turns a sourced answer arrives with a soft support CTA; after more than four turns a hard support CTA routes by context to the helpdesk or Customer Success. Notes: self-service by default but keeping humans in the loop; soft CTA after 2 turns, hard CTA after turn 4."
                className={local.shotImg}
              />
            </ZoomableFigure>
          </>
        }
      />

      <CaseSection
        heading="Every answer shows where it came from."
        lede={[
          "Sources appear inline with the answer, so a user or an auditor can see what a claim rests on before acting on it. On a DoD platform, an unsourced answer is a liability.",
          "The rule holds when there is nothing to cite. If the assistant has no source for a question, it says so instead of filling the gap, and the handoff path takes over.",
          "Every exchange closes by asking the user whether the answer solved their problem.",
        ]}
        media={
          /* Figma 2026-07-21: the chats plate carries its own frame —
             rendered unframed, no caption. Moved here from the escalation
             section (judge-panel pass): these are the pixels that show the
             cited source + did-this-help loop the copy now claims. The
             tight citations detail crop remains the wanted upgrade. */
          <ZoomableFigure
            label="Cited answers and the feedback loop, in the real product"
            aspect={1488 / 985}
            naturalWidth={1488}
            unframed
          >
            <img
              src="/case-studies/platform-one/p1-example-chats.webp"
              alt="Three real assistant screens in sequence: an Iron Bank answer with cited source and did-this-solve-your-issue buttons; a follow-up offering summaries, walkthrough steps, or key commands with Talk to Support; and a rate-your-experience closer."
              className={local.shotImg}
            />
          </ZoomableFigure>
        }
      />

      <CaseSection
        heading="The same assistant works two ways, depending on what you need."
        lede={[
          "General visitors get a lightweight widget on the page they are already reading, with the routing rules above intact.",
          "Developers working in the documentation can expand it to full screen. Different system prompt, code handling, and no handoff prompts, because a debugging session runs long by design and a CTA to Customer Success at turn four would interrupt work rather than unblock it.",
          "The widget was my call. Our developer wanted a coding assistant instead, and he was working without visibility into the ticket and routing problem the widget was built to solve. Rather than argue the tradeoff, I went back to the tickets: bug reports, technical questions, and deep support requests were coming in, less often than the general help asks but consistently. Both modes were justified, so I designed both.",
        ]}
        media={
          /* Figma revision 2026-07-21: the pair of stills became Andrew's
             looping GIF — the expand/collapse motion IS the story. Rendered
             bare per the design (no plate, no border). */
          <>
            <figure className={local.demoFigure}>
              <img
                src="/case-studies/platform-one/p1-assistant-demo-fast.gif"
                alt="Screen recording on a loop: the assistant launcher on Platform One's homepage opens into the compact widget, then expands to the full-view workspace and back."
                className={local.shotImg}
                loading="lazy"
              />
            </figure>
            <DecisionCallout />
          </>
        }
      />

      <CaseSection
        heading={"One developer meant designing to what he could actually build."}
        lede={[
          "With a single primary developer, I designed to Vuetify's defaults wherever they held and customized only where the default cost users something concrete.",
          "When the team chose a partner's chat widget to launch sooner, I documented the UX gaps and worked with the developer to re-skin and customize it as much as we could. The miss was ours: we brought security in too late for the custom assistant to clear review before launch.",
          "Today the assistant sits in staging. Once we clear the security hurdles, our design and assistant replace the widget.",
        ]}
        media={
          /* Figma revision 2026-07-21: the real design-system board, rendered
             bare (its dark plate is its own frame), no caption. */
          <ZoomableFigure
            label="Vuetify, overridden to the brand"
            aspect={1488 / 904}
            naturalWidth={1488}
            unframed
          >
            <img
              src="/case-studies/platform-one/p1-vuetify-overrides-2.webp"
              alt="Dark design-system board titled Vuetify Overridden: teal, grey, and copper color ramps with hex values, beside primary and secondary button variants, inputs, and skeleton loaders built on Vuetify defaults."
              className={local.shotImg}
            />
          </ZoomableFigure>
        }
      />

      {/* Figma revision 2026-07-22 (node 6878:223): the closer left its
          centered layout for the standard section split — copy left, two
          drafting-style stat cards right (pre-rendered in Figma). The
          third tile and the projections footnote left the design. */}
      <CaseSection
        heading="Projected impact, and what's left to prove"
        lede={[
          "The assistant is in staging. The 40% is the share of the hand-coded sample whose answers already lived on the site. It is a ceiling, and the assistant is built to claim as much of it as it can reach. Customer Success capacity comes back two ways: tickets answered before anyone files them, and the misrouted remainder reaching the right team through routing rather than a person forwarding email.",
          "And the next time a leader needs proof the platform is secure by design, the answer is one question away.",
          "Launch is phased. The assistant goes behind SSO first while the public site completes its Certificate to Field, the DoD security authorization, and the custom front-end replaces the interim widget on the roadmap.",
          <strong key="retro">
            If I ran this again, I would bring security into launch planning
            from day one. The SSO constraint reshaped our rollout late.
          </strong>,
        ]}
        media={
          <div>
            <div className={local.statCards}>
              <img
                src="/case-studies/platform-one/p1-stat-ticket-cut.webp"
                alt="Stat card: projected ticket cut, minus 40 percent."
                className={local.statCard}
              />
              <img
                src="/case-studies/platform-one/p1-stat-fte.webp"
                alt="Stat card: CST capacity returned, about one full-time role."
                className={local.statCard}
              />
            </div>
            <p className={local.statNote}>
              {"// PROJECTION FROM THE HAND-CODED 150-TICKET SAMPLE — NOT YET A MEASUREMENT"}
            </p>
          </div>
        }
      />

      <section className={`content ${styles.section}`}>
        {/* Figma revision 2026-07-22 (node 6881:1164): Andrew's launch
            sequence replaces the drawn timeline. Self-framed (dashed corner
            brackets in the image), so rendered unframed with no caption. */}
        <ZoomableFigure
          label="Launch sequence, intentionally undated"
          aspect={1312 / 215}
          naturalWidth={1312}
          unframed
        >
          <img
            src="/case-studies/platform-one/p1-launch-sequence.webp"
            alt="Launch sequence timeline, intentionally undated while waiting on Certificate to Field. Staging is done (solid line, filled marker); Behind SSO with the interim widget is the current stop (orange marker); Certificate to Field, Public Launch, and Custom Front-End remain ahead on a dashed line with hollow markers."
            className={local.shotImg}
          />
        </ZoomableFigure>
      </section>

      <UpNext
        title="ChatVET: an AI Copilot for Veterinary Medicine"
        desc="Designing an AI copilot vets say saves them about 15 minutes per case"
        href="/case-studies/chat-vet"
      />
    </>
  );
}
