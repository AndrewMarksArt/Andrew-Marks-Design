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

/** Wireframe media unit: 480x322 image placeholder + two caption
 *  strips (full-width 25px bar, then a 434/480 bar). */
function CaptionedMedia() {
  return (
    <div className={local.mediaUnit}>
      <PlaceholderBox aspect="480 / 322" />
      <div className={local.captions}>
        <PlaceholderBox aspect="480 / 25" label="// CAPTION_PENDING" />
        <div className={local.captionShort}>
          <PlaceholderBox aspect="434 / 25" label="" />
        </div>
      </div>
    </div>
  );
}

function MediaPair() {
  return (
    <div className={styles.mediaPair}>
      <CaptionedMedia />
      <CaptionedMedia />
    </div>
  );
}

export default function PlatformOne() {
  return (
    <>
      <CaseHero
        eyebrow="U.S. Air Force - Platform One"
        title="Designing an AI assistant projected to cut support tickets by up to 40%"
        intro={[
          "Platform One is the Air Force's $500M flagship software factory, supporting more than 60 Air Force and Joint programs valued at $650 billion.",
          "But after a rushed rebrand, users couldn't find the answers they needed on its website. Sometimes they couldn't even find how to ask for help and emergency fixes piled on top of each other eventually just making things worse.",
        ]}
      />

      <StatsStrip />

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
          "So users defaulted to the only visible option, asking a human (and sometimes they couldn’t find that option)",
        ]}
        media={<MediaPair />}
      />

      <CaseSection
        heading={
          'Our "Stop the bleeding" campaigns worked. But it also flooded the wrong team.'
        }
        media={<PlaceholderBox aspect="979 / 142" label="// USER_QUOTE_PENDING" />}
      >
        <div className={styles.threeCol}>
          <p>
            {
              "A new Contact Us CTA gave stuck users a lifeline, and tickets exploded. A Customer Success team built for sales and relationships became full-time human routers: fielding password resets, forwarding emails between product teams, and working a CRM that couldn't talk to Jira."
            }
          </p>
          <p>
            {
              "Traceability broke, teams pointed fingers, and users fell through the cracks. Ticket work was consuming roughly half the workday of two staff and 15% of three more."
            }
          </p>
          <p>
            {
              "The breaking point came during a security event. A senior Air Force leader needed proof the platform already defended against the threat by design. The documentation existed; he just couldn't find it when it mattered most."
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
          "Most of those tickets should never have existed. The assistant answers at the point of confusion, surfacing sources and suggesting follow-ups.",
          "If a question isn't resolved within two turns, a soft CTA routes the user to the help desk or Customer Success based on question type.",
          "The routing burden moved from people to design.",
        ]}
        media={<MediaPair />}
      />

      <CaseSection
        heading="One assistant, two postures."
        lede={[
          "General visitors get a lightweight answer widget.",
          "Developers working in the docs can expand it into a full-screen technical assistant for debugging and deeper questions.",
          "One system, tuned to two very different jobs.",
        ]}
        media={<MediaPair />}
      />

      <CaseSection
        heading={
          "Designing to ship with one developer & unexpected security constraints."
        }
        lede={[
          "With a single primary developer, I designed to Vuetify's defaults wherever possible, spending customization only where it bought real user value.",
          "When a partner-provided chat widget was chosen as the interim launch vehicle for speed, I recommended against it, documented the UX gaps, and partnered with engineering to re-skin it to our brand while the custom experience is built.",
        ]}
        media={<MediaPair />}
      />

      <CenteredSection
        heading="Projected impact and the honest road to launch"
        paragraphs={[
          "The assistant is in staging, projected to cut support tickets by up to 40% and recover roughly half the daily help-desk time of two staff plus 15% for three more. About two full-time roles returned to the work those teams were built for.",
          "Launch is phased: behind SSO first while the public site completes its Certificate to Field, with the custom front-end replacing the interim widget on the roadmap.",
        ]}
        emphasis="If I ran this again, I'd bring security into launch planning from day one; the SSO constraint reshaped our rollout late."
      />

      <UpNext
        title="ChatVET an AI Copilot for Veterinary Medicine"
        desc="Designing an AI copilot that saves veterinarians 15 minutes per case"
        href="/case-studies/chat-vet"
      />
    </>
  );
}
