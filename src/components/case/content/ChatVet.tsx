import {
  CaseHero,
  CaseSection,
  CenteredSection,
  StatsStrip,
  UpNext,
} from "../CaseSections";
import { AssetFigure } from "../CaseFigures";
import BrandRow from "../../site/BrandRow";
import ZoomableFigure from "../FigureLightbox";
import caseStyles from "../case.module.css";
import styles from "./ChatVet.module.css";
import CaseStallTimeline from "./cv/CaseStallTimeline";
import PainOverlap from "./cv/PainOverlap";
import TwoHourSearchTrail from "./cv/TwoHourSearchTrail";
import SameQuestionCompare from "./cv/SameQuestionCompare";
import LabInterpreterFilmstrip from "./cv/LabInterpreterFilmstrip";
import MedCalcCrop from "./cv/MedCalcCrop";
import HandoutBeforeAfter from "./cv/HandoutBeforeAfter";
import TwoHoursTenSeconds from "./cv/TwoHoursTenSeconds";

/**
 * ChatVET case-study content — rebuilt 2026-07-25 around Andrew's
 * "Where an average case stalls" diagram (Figma 6956:7164).
 *
 * What changed: the case-stall map now carries published figures and a
 * sixth phase after the client leaves, so the study's spine is the map
 * rather than a feature list. A new beat (S3) states the thesis the map
 * exposes — every stall has a second victim, and the artifact that
 * unblocks the vet is the same artifact the client needed — and the
 * scoping, trust, and tool sections all now argue from it. Section order
 * still runs Problem → Agitate → Overlap → TURN → Solution → Outcome.
 *
 * ⚠ FACTS PENDING FROM ANDREW (do not invent): walkthrough n-count (the
 * stall map renders "n = __ PENDING"), timeframe/dates, team shape +
 * "sole designer" confirmation, self-report survey n, testimonial
 * attribution, clinical-accuracy validation sentence, Merck licensing
 * status, user population ("500 monthly users" — professionals?).
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
        {"// DVM PILOT USER · VETERINARY CLINIC — name withheld pending permission"}
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
          "A veterinary appointment doesn't end when the client leaves. It ends at a keyboard, with the visit re-typed from memory — the one stall nobody has put a number on, and the one no client ever sees.",
          "We mapped one appointment and found four places it stalls: protocol search, dose math, client translation, and documentation. Every one of them has a second person standing on the other side of it — the client, who is already forgetting most of what was just said.",
          "ChatVET is an AI copilot sourced to the Merck Veterinary Manual and leading journals. It answers at each stall, and every answer it produces is one the vet can hand straight to the client.",
        ]}
        media={
          <ZoomableFigure
            label="The shipped ChatVET home"
            aspect={1440 / 953}
            naturalWidth={1440}
            unframed
          >
            <img
              src="/case-studies/chat-vet/cv-hero-home.webp"
              alt="ChatVET home for a verified veterinary user: the brand card with a clinical search bar, above VetMed Prompt Templates grouped by clinical job."
              className={styles.shotImg}
            />
          </ZoomableFigure>
        }
      />

      <StatsStrip
        items={[
          {
            label: "ROLE:",
            value: "Product Designer & UX Researcher",
          },
          { label: "TIMEFRAME:", value: "Months, not years (dates pending)" },
          { label: "TEAM:", value: "Startup Founders · Engineering · Me" },
          {
            label: "STATUS:",
            value: "Live at chatvet.ai · 500 monthly users",
          },
        ]}
      />

      <BrandRow />

      <CaseSection
        heading={
          <>
            One appointment. Four stalls. <br />
            The biggest one happens after the client leaves.
          </>
        }
        lede={[
          "I led the case mapping: across interviews and case walkthroughs with practicing DVMs and techs, we charted where an average case actually stalls — hunting protocols between patients, running dose math under time pressure, compressing clinical findings into pet-owner language, then re-entering the whole visit once the room is empty.",
          "Three findings changed the product. The deepest leak sits outside the appointment entirely, after the client has gone — and nobody has measured it: the profession's own time study clocked a median consult at 9 minutes 49 seconds and left the note-writing out of the stopwatch. The single most-requested tool was one nobody had named as a bottleneck: medication calculation. And every dose in the building traces back to one number typed at check-in, the patient's weight.",
          "The figures on the map are published studies, not our sessions, and each card carries its citation and its population. Three of the four are veterinary. The fourth — how long a clinical question takes to answer — has no veterinary equivalent, so human primary care stands in and the card says so.",
        ]}
        media={
          <AssetFigure
            label="Where an average case stalls"
            aspect={979 / 450}
            naturalWidth={979}
            caption="Four stalls across one appointment — and the deepest one sits outside it, after the room is empty. The riskiest calculation in the visit depends on a number typed at minute one."
          >
            <CaseStallTimeline />
          </AssetFigure>
        }
      />

      <CenteredSection
        heading="The client asked a simple question. The answer took two hours."
        paragraphs={[
          "A veterinarian in Alabama had a client whose dog was moving to Ireland, and one question: what does she need? Answering it took more than two hours across government sites and calls to colleagues.",
          "That is the first stall at full size. Most days it doesn't look like two hours — it looks like a question quietly deferred, one of the 64% that don't get pursued during the visit. Either way, the client goes home without the answer.",
        ]}
        emphasis="The information existed the whole time. Knowing where to find it — fast enough to still be in the room — was the problem."
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
        heading="Every stall has someone standing on the other side of it"
        lede={[
          "Mapping the vet's side made the second half obvious. The minutes a vet loses to a stall are the same minutes a client spends not being told something.",
          "The literature is blunt about it. The dose calculated under time pressure is the dose an owner measures out in a kitchen — and 47% of owners report that nobody ever showed them how. The findings compressed into two minutes at the end of a visit are the findings an owner half-loses on the drive home: clients reproduce about two-thirds of their discharge instructions, and only 29% of what they were told about side effects. The visit re-typed at 8pm is the summary the client never receives.",
          "So we stopped designing two products. Every artifact ChatVET generates is written once and read twice — once by the person who ordered it, once by the person who has to carry it out.",
          "That reframed the build. The client-facing half isn't a courtesy feature; it's how the vet's own problem finishes getting solved. Instructions that survive the drive home are the ones that don't come back as tomorrow's phone call.",
        ]}
        media={
          <AssetFigure
            label="One stall, two people"
            aspect={979 / 400}
            naturalWidth={979}
            caption="The same four stalls read from the other side of the exam table — and the single artifact that answers both readers at once."
          >
            <PainOverlap />
          </AssetFigure>
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
          "When development constraints ruled out the full build, I scoped the copilot wedge with the founders — the same wedge logic behind my Platform One assistant.",
          "The map made the cut line legible: keep the stalls where a single build serves both readers, defer everything that only moves data around.",
          "The highest-leverage minutes of a case, shipped in months instead of years, earning their way into clinics one vet at a time.",
        ]}
        media={
          /* The real design artifacts (Figma, Paw AI era): the full EHR we
             designed, beside the chat-focused revision that became the
             shipped wedge. */
          <div className={caseStyles.mediaPair}>
            <AssetFigure
              label="The Paw AI EHR we designed"
              aspect={1597 / 1269}
              naturalWidth={1597}
              caption="The full EHR from discovery: patient workspace, medical history, medications, and the assistant — then named Paw AI — in a sidebar."
            >
              <img
                src="/case-studies/chat-vet/cv-ehr-paw-ai.webp"
                alt="Paw AI EHR design: a patient dashboard for a German Shepherd with profile, medications, conditions, recent medical history, alerts, and the Paw AI assistant panel answering with suggested diagnostics."
                className={styles.shotImg}
              />
            </AssetFigure>
            <AssetFigure
              label="The chat-focused pivot"
              aspect={1597 / 1269}
              naturalWidth={1597}
              caption="The pivot that became the wedge: the assistant takes the whole screen; the EHR shrinks to context panels around it."
            >
              <img
                src="/case-studies/chat-vet/cv-chat-focus.webp"
                alt="Chat-focused Paw AI design: a new-consultation view centered on the medical assistant chat, with patient information, lab results, and imaging collapsed into side panels."
                className={styles.shotImg}
              />
            </AssetFigure>
          </div>
        }
      />

      <CaseSection
        heading="Trust is a design feature"
        lede={[
          "ChatVET answers from the Merck Veterinary Manual and leading journals, not the open web.",
          "I designed the source-first answer pattern: sources stack above the answer, and one click lands on the original passage.",
          "Provenance carries double weight here, because these answers don't stay in the building. An answer that becomes a client handout gets read by someone with no way to check it — so the citation has to be attached before it leaves, not available on request.",
          "When the literature doesn't cover a question, ChatVET says so rather than improvising — in medicine, a confident wrong answer is worse than no answer.",
        ]}
        media={
          <AssetFigure
            label="One question, three behaviors"
            aspect={979 / 360}
            naturalWidth={979}
            caption="In clinical software, the citation is what makes the answer usable, and the refusal is what makes it safe."
          >
            <SameQuestionCompare />
          </AssetFigure>
        }
      />

      <CaseSection
        heading="Vets shouldn't have to learn prompting, so the interface learned the map"
        lede={[
          "Instead of a blank chat box, ChatVET ships a tool at each stall: sourced clinical search and a template library organized by clinical job (SOAP notes, discharge instructions, differentials, client emails) for the protocol hunt, a medication calculator for the dose math, and one-click handout generation for everything that has to leave with the client.",
          "The calculator opens on species and weight — the number the map showed everything downstream depends on — and attaches the dosing table it used to the result.",
          "A drag-and-drop lab interpreter sits alongside them: drop the bloodwork, get flagged values and differentials. It wasn't one of the four stalls; it came out of the same interviews, as the thing vets wanted next.",
          "Clinics piloting the business tier get templates built for their own workflows.",
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
                caption="The most-requested tool from research, shipped. Weight first, dose second, and the table it came from attached — so the number is still checkable when it goes home with the owner."
              >
                <MedCalcCrop />
              </AssetFigure>
              <AssetFigure
                label="Chat to client handout"
                aspect={480 / 340}
                naturalWidth={480}
                caption="Aimed squarely at the 29%: one click turns the clinical exchange into what the client actually takes home — without the evening spent writing it."
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
          "On average, users self-report saving about 15 minutes per case: the research slice, the dose math, and the client write-up, together.",
          "Today the web app is live at chatvet.ai with 500 monthly users globally, multiple clinics piloting the business tier ahead of paid rollout, and growth running bottom-up as individual DVMs bring it into their practices. Everything is currently free.",
          "The half we haven't measured is the one on the other side of the exam table: whether the handouts change what happens after the client leaves. That is the study I'd run next, and the one that would prove the thesis rather than argue it.",
        ]}
        carousel={false}
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
          {/* Design-era consult view (Figma, Paw AI branding, v0.0.0 — shows
              response time, not citations). Stands in for the outcome shot; a
              live capture of the Ireland answer at chatvet.ai (URL + sources
              visible) is the intended upgrade. */}
          <AssetFigure
            label="The consultation, answered in seconds"
            aspect={1440 / 1269}
            naturalWidth={1440}
            caption="The consult view answering a real differential-diagnosis question — grouped possibilities, recommended next steps, and a response time under two seconds. The prior consultations stay one panel away."
            sub={"// design-era build, when the assistant was still named Paw AI — live chatvet.ai capture with sources visible pending"}
          >
            <img
              src="/case-studies/chat-vet/cv-consult-chat.webp"
              alt="A veterinary AI consultation answering a differential-diagnosis question about a dog's lethargy, decreased appetite, and mild fever — returning grouped possibilities (infectious, inflammatory, systemic) with recommended next steps and a 1.2-second response time, alongside previous and recent consultations."
              className={styles.shotImg}
            />
          </AssetFigure>
        </div>
      </CenteredSection>

      {/* Figma's UP NEXT block was un-updated (self-referential ChatVET
          copy); named for the actual destination so link text matches. */}
      <UpNext
        title="AI Powered Personal Knowledge OS"
        desc="A personal AI that reads 300–400 sources a week and answers with citations instead of confidence."
        href="/case-studies/knowledge-os"
      />
    </>
  );
}
