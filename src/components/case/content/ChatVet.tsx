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

/**
 * ChatVET case study — simplified spine, 2026-07-26 (Andrew's brief).
 *
 * Five beats, in his order:
 *   1. research → where the time sinks are
 *   2. mocked a full EHR → scaled down to fit the dev team
 *   3. pilot in a real clinic → named the three tools in demand
 *   4. vets couldn't write prompts → template library, for speed AND for
 *      consistent output
 *   5. print + discharge generator using chat context → client-facing
 *      documents at no extra post-visit cost to the staff
 *
 * Headlines carry the PAS arc; section bodies are deliberately plain —
 * short declaratives, no narrative build. Do not re-narrativise them.
 *
 * FIGURES ARE ANDREW'S IMAGES. Every figure here is an export from the
 * Figma or a product capture. Do not redraw any of them as SVG
 * components; the drawn stand-ins were deleted at ea6b220.
 *
 * TWO CAPTURES STILL MISSING (rendered as labelled placeholders so the
 * page doubles as the shot list): the generated/printed discharge
 * document — the payoff of beat 5, currently the one thing the story
 * promises and never shows — and the lab interpreter, named as one of
 * the three pilot tools but visible only as a menu item.
 *
 * ⚠ PROVENANCE — the stall diagram's figures contradict
 * .claude/research/003-chatvet-stat-provenance.md on four counts (the
 * deferred-search multiplier, "not pursued at all", "80% of medication
 * errors", the 10-min documentation figure). Andrew has been told; the
 * decision is his. Read the ledger before defending any number here.
 *
 * ⚠ PENDING FACTS (do not invent): timeframe/dates, survey n, the pilot
 * clinic's name or a concrete anonymisation, testimonial attribution,
 * and the denominator behind "the most-asked question".
 *
 * ⚠ DO NOT RE-ADD THE LIVE LINK without asking. As of 2026-07-26 the
 * engagement has wound down, the founder has shipped his own changes, and
 * the live UI no longer matches these screens. Linking would send a
 * screener to work that isn't Andrew's. The page states that the screens
 * are the version he shipped and stops there — it does NOT characterise
 * what happened to the product, and it should not start.
 */

/** Pilot-user quote. Lives in beat 3 beside the corpus figure — it is a
 *  claim about trusting the source, not about outcomes, so it does not
 *  belong in the closer. */
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
        {"// DVM PILOT USER · VETERINARY CLINIC — attribution pending permission"}
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
          "Veterinarians are out of time. Research, protocol hunting, note-writing and client communication stack up on every case.",
          "The answers exist in trusted references like the Merck Veterinary Manual. Reaching them mid-case is the problem.",
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
          {
            label: "ROLE:",
            value: "Product Designer & UX Researcher · Consulting engagement",
          },
          {
            /* "Mostly" and "at most" are ceilings on purpose — weaker claims
               than the truth, so nothing here can be caught out. "Mostly" also
               stops the capacity line reading as Andrew's own hours, since the
               cell ends in "me". */
            label: "TEAM:",
            value: "Startup founders · engineering · me · Mostly part-time, ~10 hrs/week",
          },
          { label: "TIMEFRAME:", value: "Months, not years (dates pending)" },
          {
            /* Deliberately NOT a link, and the domain is deliberately absent.
               The founder has continued building since the engagement wound
               down and the UI no longer matches these screens, so sending a
               screener to the live app would show them someone else's work.
               The shipped-ness claim survives; only the four-second
               verification is gone. Re-link if the surface ever comes back
               into line — .liveLink is still in ChatVet.module.css. */
            label: "STATUS:",
            value: "Shipped and live · 500 monthly users",
          },
        ]}
      />

      <BrandRow />

      {/* ---------- 1 · PROBLEM ---------- */}
      <CaseSection
        heading="One appointment, four stalls. The biggest one happens after the client leaves."
        lede={[
          "I led the research: interviews and case walkthroughs with practicing DVMs and techs.",
          "We mapped where an average visit actually stalls. Four places: searching protocols, calculating doses, explaining the plan to the client, and re-entering the history once the room is empty.",
          "The last one sits outside the appointment entirely. It is also the largest.",
        ]}
        media={
          <AssetFigure
            label="Average vet visit flow and where cases stall"
            aspect={2232 / 783}
            naturalWidth={2232}
            caption="Six phases of a visit, with the four stalls hung above the phase each one interrupts. Weight captured at check-in is the only input to the dose calculation downstream."
          >
            <img
              src="/case-studies/chat-vet/cv-stall-flow.webp"
              alt="Average vet visit flow and where cases stall. Six phases run left to right — check-in and intake, exam, diagnosis, treatment plan, client debrief, and a sixth phase after the client leaves. Four stall cards hang above the phases they interrupt: protocol search, 5 minutes in room and 30 plus minutes if questions get deferred, with up to 60 percent not pursued at all; dose calculation, 80 percent of medication errors are miscalculations and this was the number-one question users were asking; client communication, up to 75 percent of what the doctor says is lost immediately, and written instructions lift the correct treatment rate but are time consuming; history re-entered, 10 minutes per patient after the visit against up to 2 hours of desk work per hour of face time. A dashed line runs from check-in to the treatment plan noting that weight captured there is the only input to dose calculation, and that not capturing it causes delays."
              className={styles.shotImg}
            />
          </AssetFigure>
        }
      />

      {/* ---------- 2 · AGITATE — the constraint ---------- */}
      <CaseSection
        heading="We designed the whole record system. We could only build a slice of it."
        lede={[
          "The first plan was a full EHR replacement, mocked up on an older design system: patient workspace, medical history, medications, and an assistant.",
          /* Capacity BEFORE the limit: the reader gets the premise, so "the dev
             team could not take that on" reads as a consequence rather than a
             verdict — and the disclosure never sits after it, where it would
             read as an alibi. */
          "I was consulting on this, and most of the team was part-time — ten hours a week at most.",
          "The dev team could not take that on.",
          "So I cut the scope to the one piece that did not need a records migration to be useful — the assistant — and that is what shipped.",
          "We built it on design systems I already had, and kept every pattern as simple as it could be.",
        ]}
        media={
          <div className={caseStyles.mediaPair}>
            <AssetFigure
              label="The Paw AI EHR we designed"
              aspect={3194 / 2538}
              naturalWidth={3194}
              caption="The full EHR from discovery: patient profile and medications down the left, history and alerts across the top, and the assistant holding the main panel."
            >
              <img
                src="/case-studies/chat-vet/cv-ehr-paw-ai.webp"
                alt="Paw AI EHR design: a patient dashboard for a German Shepherd with profile, medications, conditions, recent medical history and alerts, and the Paw AI assistant in the main panel composing a case question — signalment, symptoms, tests run, and the questions to ask — above a row of previous assistant chats."
                className={styles.shotImg}
              />
            </AssetFigure>
            <AssetFigure
              label="The assistant view we kept"
              aspect={3194 / 2538}
              naturalWidth={3194}
              caption="The view built for use during an appointment, pulling past notes, lab results and uploads into the conversation. This is the slice that became the product."
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

      {/* ---------- 3 · SOLUTION — the pilot names the tools ---------- */}
      <CaseSection
        heading="A pilot in a working clinic told us which tools to build."
        lede={[
          "We ran ChatVET inside a real veterinary practice; I logged what people actually asked for.",
          "Three tools came back in demand: a medication dose calculator, a discharge generator, and a lab interpreter. Dosing was the most-asked question by a wide margin.",
          "All three open from a new chat or from the middle of one, so the case already on screen carries into them.",
          "Answers come from the Merck Veterinary Manual and leading journals, not the open web. That is what made vets willing to keep using it.",
        ]}
        media={
          <>
            <AssetFigure
              label="Three tools, one click from the chat"
              aspect={2880 / 1633}
              naturalWidth={2880}
              caption="Dose calculator, lab interpreter and discharge generator, opened from the chat so nothing has to be re-typed."
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
                caption="Species and weight first — the intake number the calculation depends on — then medication and indication."
              >
                <img
                  src="/case-studies/chat-vet/cv-dose-calculator.webp"
                  alt="The Medication Dose Calculator dialog with fields for species, breed, weight, medication, and diagnosis or indication, and a Calculate button."
                  className={styles.shotImg}
                />
              </AssetFigure>
              <PlaceholderBox
                aspect="2880 / 1622"
                label="// LAB_INTERPRETER — capture pending"
              />
            </div>
            <AssetFigure
              label="Where the answers come from"
              aspect={2880 / 1542}
              naturalWidth={2880}
              caption="The corpus named in the product, above the sourcing strip — what lets a vet audit an answer before trusting it."
            >
              <img
                src="/case-studies/chat-vet/cv-msd-partnership2.webp"
                alt="ChatVET announcement banner reading 'chatVET now Powered by MSD Veterinary Manual', above a sourcing strip captioned 'data sourced from leading veterinary journals and companies' with logos for the Journal of Veterinary Internal Medicine, VPN Plus, Cornell University, WSAVA, Plumb's, AAHA, Banfield Pet Hospital and the Merck Veterinary Manual — the first and last clipped at the edges of the capture."
                className={styles.shotImg}
              />
            </AssetFigure>
            {/* The quote belongs here, not in the closer: it is about
                trusting the source, which is the claim this section makes. */}
            <VetTestimonial />
          </>
        }
      />

      {/* ---------- 4 · SOLUTION — prompting is not the vet's job ---------- */}
      <CaseSection
        heading="Vets shouldn't have to be prompt engineers."
        lede={[
          "In the pilot we watched vets write prompts that did not work, and get different answers to the same clinical question.",
          "So I designed a template library, organised by clinical job: SOAP notes, discharge instructions, differentials, client emails.",
          "Vets replace the highlighted details and hit enter. A few fields instead of a paragraph.",
          "It saves time, and it makes the output consistent — the same question returns the same shape of answer, whoever asks it.",
        ]}
        media={
          <AssetFigure
            label="The VetMed prompt library"
            aspect={2880 / 1780}
            naturalWidth={2880}
            caption="Templates built from the questions vets were already asking, grouped by clinical job and tagged for their reader — clinician or client."
          >
            <img
              src="/case-studies/chat-vet/cv-prompt-library.webp"
              alt="The VetMed prompt library: template group filters for clinical documentation, client communication, diagnostics, practice management, and learning, above eight template cards including SOAP Note Generation, Discharge Instructions, Differential Diagnosis, and Client Email Results, each tagged Clinician or Client."
              className={styles.shotImg}
            />
          </AssetFigure>
        }
      />

      {/* ---------- 5 · SOLUTION — the payoff, for the owner ---------- */}
      <CaseSection
        heading="The pet owner leaves with instructions. The vet doesn't stay late writing them."
        lede={[
          "I designed the print output, and reworked the discharge generator around the chat context.",
          "It reads the consultation back, asks which of the medications discussed should go home, and fills the client's document from the conversation that already happened.",
          "The owner gets something they can follow. The staff spend no extra time after the visit producing it.",
        ]}
        media={
          <>
            <div className={caseStyles.mediaPair}>
              <AssetFigure
                label="Discharge generator, step one"
                aspect={2880 / 1503}
                naturalWidth={2880}
                caption="It reads the consultation back: several medications came up — which should go home with the client?"
              >
                <img
                  src="/case-studies/chat-vet/cv-discharge-step1.webp"
                  alt="The Discharge Generator dialog asking which of the medications discussed should be included in the discharge instructions, listing maropitant, capromorelin, and IV crystalloid fluids."
                  className={styles.shotImg}
                />
              </AssetFigure>
              <AssetFigure
                label="Discharge generator, step two"
                aspect={2880 / 1488}
                naturalWidth={2880}
                caption="Patient, condition, medications and the restrictions an owner has to follow — most of it already filled from the chat."
              >
                <img
                  src="/case-studies/chat-vet/cv-discharge-step2.webp"
                  alt="The Discharge Generator second step with fields for patient name, procedure or condition, medications prescribed, and diet and activity restrictions, above a Generate Instructions button."
                  className={styles.shotImg}
                />
              </AssetFigure>
            </div>
            <PlaceholderBox
              aspect="2880 / 1780"
              label="// DISCHARGE_DOCUMENT — the printed client handout, capture pending"
            />
          </>
        }
      />

      {/* CLOSER, rebuilt 2026-07-26. The old one was "From two hours to ten
          seconds", built on a 2h→10s figure Andrew has since confirmed was a
          user EXAGGERATING, not a documented case — so the headline, the
          paragraph and the TwoHoursTenSeconds graphic all went. Do not
          reinstate any of them. What is left is what can be substantiated. */}
      <CenteredSection
        heading="Vets kept using it, and brought it into their own practices."
        paragraphs={[
          "The web app went live with 500 monthly users globally, multiple clinics piloting the business tier ahead of paid rollout, and growth running bottom-up rather than through a sales motion.",
          "Users self-report saving about 15 minutes per case. That is their estimate, not a measurement.",
          /* Inoculation, not blame — and the last sentence is what stops
             "wound down" reading as a falling-out. */
          "The screens in this study are the version I designed and shipped. The product has continued to change since my engagement wound down. I still work with the founder on investor and marketing material.",
        ]}
        carousel={false}
      />

      <UpNext
        title="AI Powered Personal Knowledge OS"
        desc="A multi-agent system that reads thousands of sources, building a living corpus."
        href="/case-studies/knowledge-os"
      />
    </>
  );
}
