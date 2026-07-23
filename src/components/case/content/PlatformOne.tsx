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
        against the threat by design. The answer was in the docs — but when it
        mattered, he couldn&rsquo;t find it fast enough.
      </figcaption>
    </figure>
  );
}

export default function PlatformOne() {
  return (
    <>
      <CaseHero
        eyebrow="U.S. Air Force — Platform One"
        title="Designing an AI assistant projected to cut support tickets by roughly 40%"
        intro={[
          "Platform One is the Air Force's $500M flagship software factory, supporting more than 60 Air Force and Joint programs valued at $650 billion.",
          "But after a rushed rebrand, users couldn't find the answers they needed on its website. Sometimes they couldn't even find how to ask for help. Emergency fixes piled on top of each other — and while they helped in some ways, in others they made things worse.",
        ]}
        media={
          <ZoomableFigure
            label="The assistant, live on Platform One's site"
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
        heading={
          <>
            {"The answers existed."}
            <br />
            {"Users just couldn't find them."}
          </>
        }
        lede={[
          "The documentation, the product information, the answers: all of it was there.",
          "The rebrand had buried it.",
          "And when users gave up searching, there was nowhere to turn. The site didn’t even have a Contact Us form.",
          "Adding one was the first fix, and users needed it. But it crushed the Customer Success team, taking their time away from where it was needed most.",
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
              alt="Flow diagram of two example questions — how much does Party Bus cost, and how does Iron Bank secure containers. From the p1.dso.mil home page users reach P1 solutions, then /party-bus (high level, no pricing or technical information) or /iron-bank (catalog and images behind SSO login), loop back, and most end up at the Contact Us form. A note marks where most answers actually live: three to four clicks deep and mostly hidden behind login, with broken links and no hierarchy on solutions pages."
              className={local.shotImg}
            />
          </ZoomableFigure>
        }
      />

      <CaseSection
        heading={'Our "stop the bleeding" fix worked. It also flooded the wrong team.'}
        lede={[
          "A new Contact Us CTA gave stuck users a lifeline, and tickets exploded. A Customer Success team built for sales and relationships became full-time human routers: fielding password resets, forwarding emails between product teams, and working a CRM that couldn't talk to Jira.",
          "The responses were full of PII, so automated analysis was off the table. I pulled random samples — about 150 responses — and coded them by hand: nearly half were simple help-desk asks or information already on the site, and most of the rest belonged to other teams entirely.",
          "The Customer Success lead put 40–60% of her day into triaging the flood; her three teammates each gave another 10–20%. Roughly a full role, spent on tickets the team was never meant to own.",
        ]}
        media={<SecurityVignette />}
      >
        {/* Right column is the evidence stack — the lead's voice, then the
            hand-coded sample the lede narrates (self-captioned SVG), then
            the security vignette. The old three-column band predates the
            section having any imagery. */}
        <CstQuote />
        <AssetFigure
          label="Ticket taxonomy — hand-coded sample"
          aspect={979 / 360}
          naturalWidth={979}
        >
          <TicketTaxonomyChart />
        </AssetFigure>
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
          "After two turns without a resolution, a soft CTA offers the help desk or Customer Success, routed by question type. After turn four the CTA becomes a hard one, so no conversation loops.",
          "The routing burden moved from people to design.",
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
              label="Escalation flow — self-service with a human path"
              aspect={1346 / 973}
              naturalWidth={1346}
            >
              <img
                src="/case-studies/platform-one/p1-escalation-flow.webp"
                alt="Flow diagram of the escalation logic. A user question gets a sourced answer with citations inline and follow-up suggestions. If the question is answered: done, self-service. If not, the user follows up, and after more than two turns a sourced answer arrives with a soft support CTA; after more than four turns a hard support CTA routes by context to the helpdesk or Customer Success. Notes: self-service by default but keeping humans in the loop; soft CTA after 2 turns, hard CTA after turn 4."
                className={local.shotImg}
              />
            </ZoomableFigure>
            {/* Figma 2026-07-21: the chats plate carries its own frame —
                rendered unframed, no caption */}
            <ZoomableFigure
              label="The escalation path, in the real product"
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
          /* Figma revision 2026-07-21: the pair of stills became Andrew's
             looping GIF — the expand/collapse motion IS the story. Rendered
             bare per the design (no plate, no border). */
          <figure className={local.demoFigure}>
            <img
              src="/case-studies/platform-one/p1-assistant-demo-fast.gif"
              alt="Screen recording on a loop: the assistant launcher on Platform One's homepage opens into the compact widget, then expands to the full-view workspace and back."
              className={local.shotImg}
              loading="lazy"
            />
          </figure>
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
        heading="Projected impact and the honest road to launch"
        lede={[
          "The assistant is in staging, projected to cut support tickets by roughly 40% — the share of sampled tickets it answers outright — and to return a full role's worth of Customer Success capacity to the work that team was built for.",
          "And the next time a leader needs proof the platform is secure by design, the answer is one question away.",
          "Launch is phased — behind SSO first while the public site completes its Certificate to Field (DoD security authorization) — with the custom front-end replacing the interim widget on the roadmap.",
          <strong key="retro">
            If I ran this again, I&rsquo;d bring security into launch planning
            from day one; the SSO constraint reshaped our rollout late.
          </strong>,
        ]}
        media={
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
        title="ChatVET — an AI Copilot for Veterinary Medicine"
        desc="Designing an AI copilot that saves veterinarians about 15 minutes per case (self-reported)"
        href="/case-studies/chat-vet"
      />
    </>
  );
}
