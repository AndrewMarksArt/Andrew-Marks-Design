import {
  CaseHero,
  CaseSection,
  CenteredSection,
  PlaceholderBox,
  StatsStrip,
  UpNext,
} from "../CaseSections";
import BrandRow from "../../site/BrandRow";
import caseStyles from "../case.module.css";
import styles from "./ChatVet.module.css";

/**
 * ChatVET case-study content (Figma "ChatVET case Study template",
 * node 6755:5238). Copy transcribed verbatim from the template; all
 * media areas render as labeled wireframe placeholders per the Figma
 * annotations (hero split screen, dashed role/timeframe/team strip,
 * user-quote strip, captioned figure pairs, closing image carousel).
 */

/** Wireframe figure: image placeholder + two gray caption bars
 *  (Figma 480x322 media over 25px caption bars). */
function CaptionedFigure() {
  return (
    <div className={styles.figure} aria-hidden="true">
      <PlaceholderBox aspect="480 / 322" />
      <div className={styles.figCaption}>
        <span />
        <span />
      </div>
    </div>
  );
}

export default function ChatVet() {
  return (
    <>
      <CaseHero
        eyebrow="CHATVET · AI COPILOT FOR VETERINARY MEDICINE"
        title="Designing an AI copilot that saves veterinarians 15 minutes per case"
        intro={[
          "Veterinarians are out of time. Lab analysis and case research alone add 5 to 10 minutes per patient, before counting protocol hunting and client communication.",
          "The answers exist in trusted references like the Merck Veterinary Manual; reaching them mid-case is the problem.",
          "ChatVET is an AI copilot, powered by Merck Veterinary Manual and leading journals, that puts those answers seconds away.",
        ]}
      />

      <StatsStrip />

      <BrandRow />

      <CaseSection
        heading="The answers exist in the literature. Reaching them mid-case is the problem."
        media={
          <PlaceholderBox aspect="979 / 142" label="// USER_QUOTE_PENDING" />
        }
      >
        <div className={caseStyles.mediaPair}>
          <p className={caseStyles.sectionBody}>
            We mapped what an average case actually looks like and where it
            stalls: searching protocols and publications between patients,
            second-guessing abnormal bloodwork, retyping the same questions,
            translating clinical notes into pet-owner language.
          </p>
          <p className={caseStyles.sectionBody}>
            And along with needing trusted fast answers, medication calculation
            surfaced as the single most common request.
          </p>
        </div>
      </CaseSection>

      <CenteredSection
        heading="Every question competes with the next patient"
        paragraphs={[
          "The cost shows up everywhere: appointment time burned on research, clinical confidence eroded by second-guessing, evenings spent rewriting notes for pet owners.",
          "In one real case, a veterinarian in Alabama spent more than two hours searching government sites and asking colleagues for international travel protocols for a single canine patient headed to Ireland.",
        ]}
        emphasis="The information existed the whole time, but knowing where and how to find it was the challenge"
        carousel={false}
      />

      <CaseSection
        heading="Trust is a design feature"
        lede={[
          "ChatVET answers from Merck Veterinary Manual and leading journals, not the open web.",
          "Every response shows its sources upfront, and one click takes the vet to the original reference.",
          "In clinical software, provenance isn't polish; it's what makes an answer usable.",
        ]}
        media={
          <div className={caseStyles.mediaPair}>
            <CaptionedFigure />
            <CaptionedFigure />
          </div>
        }
      />

      <CaseSection
        heading="Vets shouldn't have to learn prompting, so the interface learned their workflows"
        lede={[
          "Instead of a blank chat box, ChatVET ships tools where the bottlenecks are: medication calculation, a drag-and-drop lab interpreter with differentials, and a template library organized by clinical job (SOAP notes, discharge instructions, differentials, client emails).",
          "Vets fill in species, age, and symptoms; the system does the rest.",
          "One click turns any chat into a client-ready handout or email, and business tiers get custom templates built for their unique workflows.",
        ]}
        media={
          <>
            <div className={caseStyles.mediaPair}>
              <CaptionedFigure />
              <CaptionedFigure />
            </div>
            <div className={caseStyles.mediaPair}>
              <CaptionedFigure />
              <CaptionedFigure />
            </div>
          </>
        }
      />

      <CaseSection
        heading={
          <>
            We designed a full EHR. <br />
            We shipped a copilot instead.
          </>
        }
        lede={[
          "The original vision was a complete EHR replacement.",
          "When development constraints ruled out the full build,  I scoped the copilot wedge with the founders.",
          "The highest-leverage minutes of a case, shipped in months instead of years, earning its way into clinics one vet at a time.",
        ]}
        media={
          <div className={caseStyles.mediaPair}>
            <CaptionedFigure />
            <CaptionedFigure />
          </div>
        }
      />

      <CenteredSection
        heading="From two hours to ten seconds"
        paragraphs={[
          "That Alabama vet tried ChatVET on the same question and had the answer in ten seconds. On average, users report saving about 15 minutes per case.",
          "Today the web app is live at chatvet.ai with 500 monthly users globally and multiple clinics onboarded at the business level, with growth running bottom-up as individual DVMs bring it into their practices. Everything is currently free, with priced tiers rolling out soon.",
        ]}
        emphasis={
          'TESTIMONIAL: "ChatVET gives us instant answers. It helps us find the right veterinary data in seconds, eliminating time-consuming research. Unlike ChatGPT or Copilot, it\'s actually built for the way vets think." DVM Pilot User, veterinary clinic'
        }
      />

      {/* Figma's UP NEXT block was un-updated (self-referential ChatVET
          copy); named for the actual destination so link text matches. */}
      <UpNext
        title="AI Powered Personal Knowledge OS"
        desc="A multi-agent system that reads 1,000's of sources building a living corpus"
        href="/case-studies/knowledge-os"
      />
    </>
  );
}
