import {
  CaseHero,
  CaseSection,
  CenteredSection,
  PlaceholderBox,
  StatsStrip,
  UpNext,
} from "../CaseSections";
import { AssetFigure } from "../CaseFigures";
import BrandRow from "../../site/BrandRow";
import ZoomableFigure from "../FigureLightbox";
import caseStyles from "../case.module.css";
import styles from "./ChatVet.module.css";
import TwoHoursTenSeconds from "./cv/TwoHoursTenSeconds";

/**
 * ChatVET case-study content.
 *
 * 2026-07-26 — REPLACED WHOLESALE from Andrew's Figma section 6967:7428
 * ("ChatVET Case Study — updated") at his explicit instruction. The Figma
 * is the content spec: its section list, headings, body copy, captions
 * and figure set, in its order. Do not re-merge earlier drafts into this.
 *
 * FIGURES COME FROM FIGMA AS IMAGES. The stall flow is Andrew's own
 * diagram exported from the Figma section — do NOT re-draw it as an SVG
 * component. Every drawn stand-in this study used to carry has been
 * deleted; they are in git history at commit ea6b220 if ever needed.
 * Only TwoHoursTenSeconds is still a component, because the Figma builds
 * that one from live text rather than an image.
 *
 * ⚠ PROVENANCE CONFLICT — the stall diagram's figures contradict
 * .claude/research/003-chatvet-stat-provenance.md on four counts: the
 * deferred-search multiplier (a range across 73 studies split into an
 * invented before/after), "not pursued at all" (Ely measured "not
 * immediately pursued"), "80% of medication errors" (Pinho's 80% is of
 * the 63% that were wrong-dose, ~50% of reported errors), and the 10-min
 * documentation figure (unattested). Andrew has been told; the decision
 * is his. Read the ledger before defending any number on this page.
 *
 * ⚠ FACTS PENDING FROM ANDREW (do not invent): timeframe/dates, "sole
 * designer" confirmation, self-report survey n, the S1 discovery quote
 * (renders as a placeholder), testimonial attribution, the
 * clinical-accuracy validation sentence, and the window/denominator
 * behind the "#1 question users were asking" claim.
 */

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
          { label: "TEAM:", value: "Startup founders · engineering · me" },
          { label: "TIMEFRAME:", value: "Months, not years (dates pending)" },
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
        heading="Four bottlenecks, one surprise: medication math."
        lede={[
          "I led the case mapping: across interviews and case walkthroughs with practicing DVMs and techs, we charted where an average case actually stalls — searching protocols between patients, second-guessing abnormal bloodwork, retyping the same questions, translating clinical notes into pet-owner language.",
          "And the single most common request in our research wasn't any of those. It was medication calculation.",
        ]}
        media={
          <>
            <AssetFigure
              label="Average vet visit flow and where cases stall"
              aspect={2232 / 783}
              naturalWidth={2232}
              caption="One appointment, four stalls — and the biggest one happens after the client leaves. The riskiest calculation in the visit depends on a number typed at check-in."
            >
              <img
                src="/case-studies/chat-vet/cv-stall-flow.webp"
                alt="Average vet visit flow and where cases stall. Six phases run left to right — check-in and intake, exam, diagnosis, treatment plan, client debrief, and a sixth phase after the client leaves. Four stall cards hang above the phases they interrupt: protocol search, 5 minutes in room, 30 plus minutes if questions get deferred and up to 60 percent aren't pursued at all; dose calculation, 80 percent of medication errors are miscalculations and this was the number-one question users were asking; client communication, up to 75 percent of what the doctor says is lost immediately, and written instructions lift the correct treatment rate but are time consuming; history re-entered, 10 minutes per patient after the visit against up to 2 hours of desk work per hour of face time. A dashed line runs from check-in to the treatment plan noting that weight captured there is the only input to dose calculation, and that a risk of it not being captured at check-in causes delays."
                className={styles.shotImg}
              />
            </AssetFigure>
            <PlaceholderBox
              aspect="744 / 108"
              label="// VET_QUOTE — attributed discovery quote pending"
            />
          </>
        }
      />

      <CaseSection
        heading="We started with a full EHR system and tried to tackle all stages of the flow, but with the current team this wasn't a viable path forward."
        lede={[
          "The original vision was a complete EHR replacement. And using an old design system we mocked up some dashboards and UI layouts.",
          "When development constraints ruled out the full build, I pitched a simple chat interface based on the assistant designs we mocked up.",
          "We knew we could tackle the protocol search problem while building trust with vets, and then based on feedback and usage we could build a roadmap of features users actually wanted.",
        ]}
        media={
          <div className={caseStyles.mediaPair}>
            <AssetFigure
              label="The Paw AI EHR we designed"
              aspect={3194 / 2538}
              naturalWidth={3194}
              caption="The full EHR from discovery: patient workspace, medical history, medications, and the Paw AI assistant."
            >
              <img
                src="/case-studies/chat-vet/cv-ehr-paw-ai.webp"
                alt="Paw AI EHR design: a patient dashboard for a German Shepherd with profile, medications, conditions, recent medical history and alerts, and the Paw AI assistant in the main panel composing a case question — signalment, symptoms, tests run, and the questions to ask — above a row of previous assistant chats."
                className={styles.shotImg}
              />
            </AssetFigure>
            <AssetFigure
              label="The EHR's assistant view"
              aspect={3194 / 2538}
              naturalWidth={3194}
              caption="The EHR had an assistant view for when the doctors were seeing patients — pulling past visit notes, lab results, file uploads, and more into the conversation."
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
        heading="“I tried using ChatGPT and could never trust the results. I’m very wary of answers I can’t trace directly to trusted sources.”"
        lede={[
          "ChatVET answers from the Merck Veterinary Manual and leading journals, not the open web.",
          "I designed the source-first answer pattern: sources stack above the answer, and one click lands on the original passage.",
          "When the literature doesn't cover a question, ChatVET says so rather than improvising — in medicine, a confident wrong answer is worse than no answer.",
          "In clinical software, provenance isn't polish; it's what makes an answer usable.",
        ]}
        media={
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
        }
      />

      <CaseSection
        heading="After testing with pilot users, the most common questions asked were about medications and proper dosing."
        lede={[
          "A known pain point, and a known source of medication errors.",
          "By far the most asked question — roughly 64% of all user prompts.",
          "So we built a quick tool that lets vets get the answer in seconds.",
          "This pattern also revealed the need for a lab interpreter and a discharge generator. All of them are available from a new chat, or from the middle of one where that context can be used.",
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
        heading="Vets shouldn't have to learn prompting, so based on early usage we built prebuilt templates to save them time."
        lede={[
          "Instead of a blank chat box, ChatVET ships tools where the bottlenecks are: medication calculation, a drag-and-drop lab interpreter with differentials, and a template library organized by clinical job (SOAP notes, discharge instructions, differentials, client emails).",
          "Vets fill in species, age, and symptoms; the system does the rest.",
          "One click turns any chat into a client-ready handout or email, and business-tier clinics get custom templates built for their workflows.",
        ]}
        media={
          <AssetFigure
            label="The VetMed prompt library"
            aspect={2880 / 1780}
            naturalWidth={2880}
            caption="Prebuilt prompts based on common questions, designed to get the right answers fast. Vets replace the highlighted placeholder details and hit enter — a few details instead of a long prompt, saving minutes each case."
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
          "On average, users self-report saving about 15 minutes per case: the research slice, the protocol hunt, and the client write-up, together.",
          "Today the web app is live at chatvet.ai with 500 monthly users globally, multiple clinics piloting the business tier ahead of paid rollout, and growth running bottom-up as individual DVMs bring it into their practices. Everything is currently free.",
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
