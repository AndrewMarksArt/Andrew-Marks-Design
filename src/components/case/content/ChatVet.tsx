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
import TwoHoursTenSeconds from "./cv/TwoHoursTenSeconds";

/**
 * ChatVET case-study content.
 *
 * 2026-07-25 (v2) — folded in Andrew's Figma section 6967:7428 ("ChatVET
 * Case Study — updated"). The headline change is EVIDENCE: six real
 * product captures replace the drawn placeholder SVGs, which closes the
 * standing audit P1 ("zero authentic pixels behind the portfolio's only
 * live product"). MedCalcCrop, HandoutBeforeAfter and
 * LabInterpreterFilmstrip are retired — superseded by real screens.
 * SameQuestionCompare survives because no capture proves the refusal
 * behaviour yet.
 *
 * Also from the Figma: the corpus question is finally settled on-page —
 * the product ships an announced MSD Veterinary Manual partnership (MSD
 * is Merck's name outside North America), so the licensing hedge the
 * earlier audit flagged can go. And the "#1 request" claim upgrades from
 * interview recall to product analytics: ~64% of all user prompts.
 *
 * ⚠ TWO DIFFERENT 64%s, RESOLVED BY ASYMMETRY — do not undo this. Ely
 * 1999 (clinical questions not pursued during a visit, human primary
 * care) and ChatVET's own prompt mix are unrelated numbers that happen
 * to share two digits. The DIGITS now appear in exactly two places: the
 * stall-map card that cites Ely and labels it a human proxy, and the
 * measured analytics sentence below. Everywhere else the borrowed figure
 * is prose — "nearly two-thirds", "most aren't pursued". Do not
 * reintroduce "64%" into body copy or into PainOverlap.
 *
 * ⚠ FACTS PENDING FROM ANDREW (do not invent): walkthrough n-count (the
 * stall map renders "n = __ PENDING"), timeframe/dates, "sole designer"
 * confirmation, self-report survey n, attribution for BOTH pull-quotes,
 * clinical-accuracy validation sentence, user population ("500 monthly
 * users" — professionals?), and the date/denominator behind the ~64%.
 */

/** Discovery quote — why vets distrust general-purpose AI. Motivates the
 *  whole trust section, so it sits at the top of its media column. */
function TrustQuote() {
  return (
    <figure className={styles.quoteStrip}>
      <blockquote className={styles.quoteText}>
        &ldquo;I tried using ChatGPT and could never trust the results. I&rsquo;m
        very wary of answers I can&rsquo;t trace directly to trusted
        sources.&rdquo;
      </blockquote>
      <figcaption className={styles.quoteAttribution}>
        {"// DVM PILOT USER — attribution pending permission"}
      </figcaption>
    </figure>
  );
}

/** Pilot-user testimonial, the closer's social proof. */
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
          "We mapped one appointment and found four places it stalls: protocol search, dose math, client translation, and documentation. Every one of them has a second person standing on the other side of it — the client, who will lose about a third of the instructions they were given, and most of what they were told about side effects.",
          "ChatVET is an AI copilot sourced to the MSD Veterinary Manual and leading journals. It answers at each stall, and every answer it produces is one the vet can hand straight to the client.",
        ]}
        media={
          <ZoomableFigure
            label="The shipped ChatVET home"
            aspect={2880 / 1906}
            naturalWidth={2880}
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
          { label: "ROLE:", value: "Product Designer & UX Researcher" },
          { label: "TIMEFRAME:", value: "Months, not years (dates pending)" },
          { label: "TEAM:", value: "Startup Founders · Engineering · Me" },
          {
            label: "STATUS:",
            /* The only claim in the portfolio a reader can verify in four
               seconds — so it has to be clickable, not retypeable. */
            value: (
              <>
                <span className={caseStyles.statLine}>
                  <a
                    href="https://www.chatvet.ai"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.liveLink}
                  >
                    Live at chatvet.ai
                  </a>
                </span>
                <span className={caseStyles.statLine}>500 monthly users</span>
              </>
            ),
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
          "That is the first stall at full size. Most days it doesn't look like two hours — it looks like a question quietly deferred, and in human primary care nearly two-thirds of those aren't pursued during the visit. Either way, the client goes home without the answer.",
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
          "We started with a full EHR and tried to take on every stage of the flow. With the team we had, that was not a viable path.",
          "The original vision was a complete records replacement, and on an older design system we mocked up the dashboards and workspace layouts to prove it out.",
          "When development constraints ruled out the full build, I pitched a simple chat interface built from the assistant designs we had already drawn — the one piece of the EHR that didn't need the records migration to be useful.",
          "We could take on the protocol-search problem while earning trust with vets, then let feedback and usage decide the roadmap instead of guessing at it.",
        ]}
        media={
          <div className={caseStyles.mediaPair}>
            <AssetFigure
              label="The Paw AI EHR we designed"
              aspect={3194 / 2538}
              naturalWidth={3194}
              caption="The full EHR from discovery: patient profile and medications down the left rail, recent history and alerts across the top, and the Paw AI assistant holding the main panel."
            >
              <img
                src="/case-studies/chat-vet/cv-ehr-paw-ai.webp"
                alt="Paw AI EHR design: a patient dashboard for a German Shepherd with profile, medications, conditions, recent medical history and alerts, and the Paw AI assistant in the main panel composing a case question — signalment, symptoms, tests run, and the questions to ask — above a row of previous assistant chats."
                className={styles.shotImg}
              />
            </AssetFigure>
            <AssetFigure
              label="The assistant view inside the EHR"
              aspect={3194 / 2538}
              naturalWidth={3194}
              caption="The view built for use during an appointment — pulling past visit notes, lab results, and file uploads into the conversation. This panel is what we cut loose and shipped on its own."
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
          "ChatVET answers from the MSD Veterinary Manual — announced as a partnership, not scraped — and from leading veterinary journals. Not the open web.",
          "I designed the source-first answer pattern: sources stack above the answer, and one click lands on the original passage.",
          "Provenance carries double weight here, because these answers don't stay in the building. An answer that becomes a client handout gets read by someone with no way to check it — so the citation has to be attached before it leaves, not available on request.",
          "When the literature doesn't cover a question, ChatVET says so rather than improvising — in medicine, a confident wrong answer is worse than no answer.",
        ]}
        media={
          <div className={styles.closerStack}>
            <TrustQuote />
            <AssetFigure
              label="The corpus, named on the product"
              aspect={2880 / 1542}
              naturalWidth={2880}
              caption="The partnership announcement in the product, above the sourcing strip. Naming the corpus is the claim; the logo row is what lets a vet audit it before they trust an answer."
            >
              <img
                src="/case-studies/chat-vet/cv-msd-partnership2.webp"
                alt="ChatVET announcement banner reading 'chatVET now Powered by MSD Veterinary Manual', above a sourcing strip captioned 'data sourced from leading veterinary journals and companies' with logos for the Journal of Veterinary Internal Medicine, VPN Plus, Cornell University, WSAVA, Plumb's, AAHA, Banfield Pet Hospital and the Merck Veterinary Manual — the first and last clipped at the edges of the capture."
                className={styles.shotImg}
              />
            </AssetFigure>
            <AssetFigure
              label="One question, three behaviors"
              aspect={979 / 360}
              naturalWidth={979}
              caption="In clinical software, the citation is what makes the answer usable, and the refusal is what makes it safe."
              sub={"// drawn — no capture of the answer or refusal states yet"}
            >
              <SameQuestionCompare />
            </AssetFigure>
          </div>
        }
      />

      <CaseSection
        heading="Then usage answered a question research had only guessed at"
        lede={[
          "Medication error is a known pain point in practice, and dose math had already surfaced in the walkthroughs as the tool vets most wanted. Once ChatVET was in their hands, the prompt log settled it: medication and dosing questions were roughly 64% of all prompts logged.",
          "So we built the tool that answers it in seconds — reachable from a new chat or from the middle of one, so the case context already on screen carries into it.",
          "The same pattern surfaced two more: a lab interpreter, and a discharge generator that turns the consultation into the instructions the client takes home. That last one is the overlap made literal — one pass over the conversation, two documents out of it.",
        ]}
        media={
          <>
            <AssetFigure
              label="Three tools, one click from the chat"
              aspect={2880 / 1633}
              naturalWidth={2880}
              caption="Dose calculator, lab interpreter, discharge generator — opened from a new chat or mid-conversation, so nothing has to be re-typed to use them."
            >
              <img
                src="/case-studies/chat-vet/cv-tools-menu.webp"
                alt="The ChatVET home for a verified veterinary user with the Tools menu open, listing Medication Dose Calc, Lab Interpreter, and Discharge Generator above the VetMed Prompt Templates panel."
                className={styles.shotImg}
              />
            </AssetFigure>
            <div className={caseStyles.mediaPair}>
              <AssetFigure
                label="Medication dose calculator"
                aspect={2880 / 1622}
                naturalWidth={2880}
                caption="Species and weight first — the intake number the whole calculation hangs on — then medication and indication."
              >
                <img
                  src="/case-studies/chat-vet/cv-dose-calculator.webp"
                  alt="The Medication Dose Calculator dialog with fields for species, breed, weight, medication, and diagnosis or indication, and a Calculate button."
                  className={styles.shotImg}
                />
              </AssetFigure>
              <AssetFigure
                label="Discharge generator, step one"
                aspect={2880 / 1503}
                naturalWidth={2880}
                caption="It reads the consultation back to the vet: several medications came up — which of them should go home with the client?"
              >
                <img
                  src="/case-studies/chat-vet/cv-discharge-step1.webp"
                  alt="The Discharge Generator dialog asking which of the medications discussed should be included in the discharge instructions, listing maropitant, capromorelin, and IV crystalloid fluids."
                  className={styles.shotImg}
                />
              </AssetFigure>
            </div>
            <AssetFigure
              label="Discharge generator, step two"
              aspect={2880 / 1488}
              naturalWidth={2880}
              caption="The second step is the client's document, not the vet's: patient, condition, prescribed medications, and the restrictions an owner actually has to follow at home."
            >
              <img
                src="/case-studies/chat-vet/cv-discharge-step2.webp"
                alt="The Discharge Generator second step with fields for patient name, procedure or condition, medications prescribed, and diet and activity restrictions, above a Generate Instructions button."
                className={styles.shotImg}
              />
            </AssetFigure>
          </>
        }
      />

      <CaseSection
        heading="Vets shouldn't have to learn prompting, so the templates learned the questions"
        lede={[
          "Early usage showed us the shape of what vets were asking, so instead of a blank chat box ChatVET ships a prompt library organized by clinical job: SOAP notes, discharge instructions, differentials, client emails.",
          "Vets replace the highlighted placeholders with species, age, and symptoms, then hit enter — a few details instead of a paragraph of prompt engineering.",
          "The library is tagged by who the output is for, which is the overlap thesis turned into information architecture. Clinician templates stay in the record. Client templates — discharge instructions, results emails, prevention handouts — are the ones that leave with the owner.",
          "Clinics piloting the business tier get templates built for their own workflows.",
        ]}
        media={
          <AssetFigure
            label="The VetMed prompt library"
            aspect={2880 / 1780}
            naturalWidth={2880}
            caption="Templates built from the questions vets actually asked, grouped by clinical job and tagged for their reader — Clinician or Client. Fill the highlighted placeholders, hit enter."
          >
            <img
              src="/case-studies/chat-vet/cv-prompt-library.webp"
              alt="The VetMed prompt library: template group filters for clinical documentation, client communication, diagnostics, practice management, and learning, above eight template cards including SOAP Note Generation, Discharge Instructions, Differential Diagnosis, and Client Email Results, each tagged Clinician or Client."
              className={styles.shotImg}
            />
          </AssetFigure>
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
        </div>
      </CenteredSection>

      <UpNext
        title="AI Powered Personal Knowledge OS"
        desc="A multi-agent system that reads thousands of sources, building a living corpus."
        href="/case-studies/knowledge-os"
      />
    </>
  );
}
