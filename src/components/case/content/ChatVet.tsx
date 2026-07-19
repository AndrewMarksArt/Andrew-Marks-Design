import {
  CaseHero,
  CaseSection,
  CenteredSection,
  StatsStrip,
  UpNext,
} from "../CaseSections";
import { AssetFigure, CaptionedMedia } from "../CaseFigures";
import BrandRow from "../../site/BrandRow";
import caseStyles from "../case.module.css";
import styles from "./ChatVet.module.css";
import CaseStallTimeline from "./cv/CaseStallTimeline";
import TwoHourSearchTrail from "./cv/TwoHourSearchTrail";
import GhostedEhrMap from "./cv/GhostedEhrMap";
import SameQuestionCompare from "./cv/SameQuestionCompare";
import LabInterpreterFilmstrip from "./cv/LabInterpreterFilmstrip";
import MedCalcCrop from "./cv/MedCalcCrop";
import HandoutBeforeAfter from "./cv/HandoutBeforeAfter";
import TwoHoursTenSeconds from "./cv/TwoHoursTenSeconds";

/**
 * ChatVET case-study content — audit-driven revision (career-strategy
 * 004): section order now runs Problem → Agitate → TURN (EHR→copilot,
 * moved up) → Solution (trust, workflows) → Outcome; S1 reframed as the
 * research beat; number-provenance clauses added where facts exist.
 *
 * ⚠ FACTS PENDING FROM ANDREW (do not invent): timeframe/dates, team
 * shape + "sole designer" confirmation, interview/walkthrough n-counts,
 * self-report survey n, testimonial attribution (name/clinic or concrete
 * anonymity), clinical-accuracy validation sentence (what actually
 * happened pre-launch), Merck licensing status, user population
 * ("500 monthly users" — professionals?).
 */

/** Pilot-user testimonial as a proper pull-quote (was a TESTIMONIAL:-
 *  prefixed emphasis line — template scaffolding, per the audit). */
function VetTestimonial() {
  return (
    <figure className={styles.quoteStrip}>
      <blockquote className={styles.quoteText}>
        &ldquo;ChatVET gives us instant answers. It helps us find the right
        veterinary data in seconds, eliminating time-consuming research. Unlike
        ChatGPT or Copilot, it&rsquo;s actually built for the way vets
        think.&rdquo;
      </blockquote>
      <figcaption className={styles.quoteAttribution}>
        {"// DVM PILOT USER · VETERINARY CLINIC — attribution upgrade pending permission"}
      </figcaption>
    </figure>
  );
}

export default function ChatVet() {
  return (
    <>
      <CaseHero
        eyebrow="CHATVET · AI COPILOT FOR VETERINARY MEDICINE"
        title="Shipping an AI copilot that saves veterinarians about 15 minutes per case"
        intro={[
          "Veterinarians are out of time. Lab analysis and case research alone add 5 to 10 minutes per patient — before protocol hunting, note-writing, and client communication stack on top.",
          "The answers exist in trusted references like the Merck Veterinary Manual; reaching them mid-case is the problem.",
          "ChatVET is an AI copilot, powered by the Merck Veterinary Manual and leading journals, that puts those answers seconds away.",
        ]}
      />

      <StatsStrip
        items={[
          {
            label: "ROLE:",
            value: "Product Designer & UX Researcher",
          },
          { label: "TEAM:", value: "Startup founders · engineering · me" },
          { label: "TIMEFRAME:", value: "Months, not years (dates pending)" },
          {
            label: "STATUS:",
            value: "Live at chatvet.ai · 500 monthly users",
          },
        ]}
      />

      <BrandRow />

      <CaseSection
        heading="Four bottlenecks, one surprise: medication math."
        lede={[
          "I led the case mapping: across interviews and case walkthroughs with practicing DVMs and techs, we charted where an average case actually stalls — searching protocols between patients, second-guessing abnormal bloodwork, retyping the same questions, translating clinical notes into pet-owner language.",
          "And the single most common request in our research wasn't any of those. It was medication calculation.",
        ]}
        media={
          <>
            <AssetFigure
              label="Where an average case stalls"
              aspect={979 / 300}
              naturalWidth={979}
              caption="Mapped where the minutes leak: four recurring stalls across one appointment — and the most-requested tool wasn't on the map until vets put it there."
              sub={"// stall points from case walkthroughs — per-stall minute costs pending the session notes"}
            >
              <CaseStallTimeline />
            </AssetFigure>
            <CaptionedMedia
              label="// VET_QUOTE — attributed discovery quote pending"
              aspect="979 / 142"
            />
          </>
        }
      />

      <CenteredSection
        heading="Every question competes with the next patient"
        paragraphs={[
          "The cost shows up everywhere: appointment time burned on research, clinical confidence eroded by second-guessing, evenings spent rewriting notes for pet owners.",
          "In one real case, a veterinarian in Alabama spent more than two hours searching government sites and asking colleagues for international travel protocols for a single canine patient headed to Ireland.",
        ]}
        emphasis="The information existed the whole time, but knowing where and how to find it was the challenge."
        carousel={false}
      >
        <div className={styles.narrowFigure}>
          <AssetFigure
            label="The two-hour search"
            aspect={640 / 400}
            naturalWidth={640}
            caption="One question, one patient, one afternoon."
          >
            <TwoHourSearchTrail />
          </AssetFigure>
        </div>
      </CenteredSection>

      <CaseSection
        heading={
          <>
            We designed a full EHR. <br />
            We shipped a copilot instead.
          </>
        }
        lede={[
          "The original vision was a complete EHR replacement.",
          "When development constraints ruled out the full build, I scoped the copilot wedge with the founders — the same wedge playbook I ran at Platform One.",
          "The highest-leverage minutes of a case, shipped in months instead of years, earning its way into clinics one vet at a time.",
        ]}
        media={
          <AssetFigure
            label="The EHR we mapped, the wedge we shipped"
            aspect={979 / 420}
            naturalWidth={979}
            caption="The EHR we mapped in discovery (gray) and the copilot slice we shipped (highlighted). The rest earns its way in one clinic at a time."
          >
            <GhostedEhrMap />
          </AssetFigure>
        }
      />

      <CaseSection
        heading="Trust is a design feature"
        lede={[
          "ChatVET answers from the Merck Veterinary Manual and leading journals, not the open web.",
          "I designed the source-first answer pattern: sources stack above the answer, and one click lands on the original passage.",
          "When the literature doesn't cover a question, ChatVET says so rather than improvising — in medicine, a confident wrong answer is worse than no answer.",
          "In clinical software, provenance isn't polish; it's what makes an answer usable.",
        ]}
        media={
          <AssetFigure
            label="Same question, two answers"
            aspect={979 / 360}
            naturalWidth={979}
            caption="Same question, two answers. In clinical software, the citation is what makes the answer usable — and the refusal is what makes it safe."
          >
            <SameQuestionCompare />
          </AssetFigure>
        }
      />

      <CaseSection
        heading="Vets shouldn't have to learn prompting, so the interface learned their workflows"
        lede={[
          "Instead of a blank chat box, ChatVET ships tools where the bottlenecks are: medication calculation, a drag-and-drop lab interpreter with differentials, and a template library organized by clinical job (SOAP notes, discharge instructions, differentials, client emails).",
          "Vets fill in species, age, and symptoms; the system does the rest.",
          "One click turns any chat into a client-ready handout or email, and business-tier clinics get custom templates built for their workflows.",
        ]}
        media={
          <>
            <AssetFigure
              label="Lab interpreter, three frames"
              aspect={979 / 260}
              naturalWidth={979}
              caption="No prompt engineering: drop the lab work, get flagged values and differentials."
            >
              <LabInterpreterFilmstrip />
            </AssetFigure>
            <div className={caseStyles.mediaPair}>
              <AssetFigure
                label="Medication calculator"
                aspect={480 / 340}
                naturalWidth={480}
                caption="The most-requested tool from research, shipped: dose math with the source attached."
              >
                <MedCalcCrop />
              </AssetFigure>
              <AssetFigure
                label="Chat to client handout"
                aspect={480 / 340}
                naturalWidth={480}
                caption="From clinical shorthand to pet-owner language in one click — the evenings-of-rewriting problem, deleted."
              >
                <HandoutBeforeAfter />
              </AssetFigure>
            </div>
          </>
        }
      />

      <CenteredSection
        heading="From two hours to ten seconds"
        paragraphs={[
          "That Alabama vet tried ChatVET on the same question and had the answer — sourced to the governing protocol — in ten seconds.",
          "On average, users self-report saving about 15 minutes per case: the research slice, the protocol hunt, and the client write-up, together.",
          "Today the web app is live at chatvet.ai with 500 monthly users globally, multiple clinics piloting the business tier ahead of paid rollout, and growth running bottom-up as individual DVMs bring it into their practices. Everything is currently free.",
        ]}
      >
        <div className={styles.closerStack}>
          <AssetFigure
            label="Two hours to ten seconds"
            aspect={979 / 240}
            naturalWidth={979}
            caption="Same vet, same question, ten seconds — one documented case, not a benchmark."
          >
            <TwoHoursTenSeconds />
          </AssetFigure>
          <VetTestimonial />
          <CaptionedMedia
            label="// LIVE_ANSWER_SHOT — the Ireland protocol answer at chatvet.ai, URL visible"
            aspect="979 / 420"
          />
        </div>
      </CenteredSection>

      {/* Figma's UP NEXT block was un-updated (self-referential ChatVET
          copy); named for the actual destination so link text matches. */}
      <UpNext
        title="AI Powered Personal Knowledge OS"
        desc="A multi-agent system that reads thousands of sources, building a living corpus"
        href="/case-studies/knowledge-os"
      />
    </>
  );
}
