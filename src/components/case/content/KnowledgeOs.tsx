import {
  CaseHero,
  StatsStrip,
  CaseSection,
  UpNext,
} from "../CaseSections";
import { AssetFigure, StatCard, StatCards } from "../CaseFigures";
import BrandRow from "../../site/BrandRow";
import styles from "./KnowledgeOs.module.css";
import CaptureVolumeChart from "./kos/CaptureVolumeChart";
import CaptureBeforeAfter from "./kos/CaptureBeforeAfter";
import TrustRowCrop from "./kos/TrustRowCrop";
import GapReportDecay from "./kos/GapReportDecay";
import RagArchitecture from "./kos/RagArchitecture";
import RefusalCrop from "./kos/RefusalCrop";
import BranchGraphFigure from "./kos/BranchGraphFigure";
import GrowthTimeline from "./kos/GrowthTimeline";
import GapCatchCard from "./kos/GapCatchCard";

/**
 * Knowledge OS case-study content — audit-driven revision (career-
 * strategy 005): stats strip filled with dated telemetry, numbers
 * reconciled (mid-May anchor, "signal" defined, agents introduced in
 * S4), the Solution turn extracted from S2 into its own beat, S6 trimmed
 * from feature dump to branching + librarian clause, internet-research
 * tool moved to S4 as the sanctioned exception, instrumentation-method
 * sentence added, mic-drop grammar fixed.
 *
 * ⚠ FACTS PENDING FROM ANDREW (do not invent): capture-volume mechanism
 * (feeds/newsletters vs hand-picked), grounding eval (spot-check n if
 * one happened), score-calibration story, whether the security-gap
 * priorities predated the agent run, the one judgment beat (what the
 * first post-capture version got wrong / what branching cost).
 */
export default function KnowledgeOs() {
  return (
    <>
      <CaseHero
        eyebrow="KNOWLEDGE HUB · PERSONAL KNOWLEDGE OS"
        title="Designing a personal AI that reads 300–400 sources a week, so I don't have to."
        intro={[
          "In AI, new work outpaces anyone's reading speed. Knowledge Hub is a personal knowledge OS, built solo and still shipping weekly.",
          "A capture pipeline ingests 300–400 sources a week into a corpus past 4,000 sources; a chat interface answers from that corpus with citations instead of confidence.",
          "I designed, researched, and built every layer — the trust decisions below are mine end to end.",
        ]}
        placeholderLabel="// hero render in progress — the system diagrams below are current"
      />

      <StatsStrip
        items={[
          { label: "ROLE:", value: "Design, research & engineering — solo" },
          {
            label: "TIMEFRAME:",
            value: "4 months to production · shipping weekly",
          },
          {
            label: "SYSTEM:",
            value: "RAG + agents · corpus 4,000+ · 300–400 sources/wk",
          },
          {
            label: "STATUS:",
            value: "Live, in daily use — n=1 by design (as of July 2026)",
          },
        ]}
      />

      <BrandRow />

      <CaseSection
        heading="The field moves faster than reading speed."
        lede={[
          "Roughly 300–400 relevant sources arrive every week, per the pipeline's own capture logs. A person can deeply read a fraction of that, and skimming drops the things that matter most: connections and contradictions between sources, the topics nobody's covering yet.",
          "The system reads everything so I can deeply read the right ten.",
          "And because I'm the only user, the research method is instrumentation — the numbers here come from the system's own logs, not my recollection; the figures still awaiting a fresh export say so on their face.",
        ]}
        media={
          <AssetFigure
            label="One week of intake vs reading speed"
            aspect={979 / 360}
            naturalWidth={979}
            caption="Every week, 300–400 relevant sources. Deep reading covers the flat line at the bottom."
            sub={"// from the pipeline's capture logs — draft render pending a fresh export"}
          >
            <CaptureVolumeChart />
          </AssetFigure>
        }
      />

      <CaseSection
        heading="Saving & bookmarking links isn't the same as knowing things."
        lede={[
          "Capture tools make piles, and piles rot: you can't see what's gone stale, what contradicts what, or what's missing entirely.",
          "For a designer whose positioning depends on staying current in AI, working from stale knowledge is a professional risk.",
        ]}
      />

      <CaseSection
        heading="Send it a URL. Seconds later, it's knowledge."
        lede={[
          "The capture layer is still the same Telegram bot the project started with: send it a URL, and seconds later the source is summarized, scored, and embedded.",
          "What changed over the four months since is everything after capture.",
        ]}
        media={
          <AssetFigure
            label="Piles rot; capture compounds"
            aspect={979 / 360}
            naturalWidth={979}
            caption="Left: where every capture tool ends. Right: capture that compounds — summarized, scored, embedded in seconds. Everything in this study happens after this message."
          >
            <CaptureBeforeAfter />
          </AssetFigure>
        }
      />

      <CaseSection
        heading="Every conclusion shows how much to trust it."
        lede={[
          "Every extraction carries a score with an inline reason and a novelty score against everything already saved — surfaced where you read, not in logs.",
          "A failed extraction shows up on the row it failed on, with a retry next to it.",
        ]}
        media={
          <AssetFigure
            label="Trust, surfaced on the row"
            aspect={979 / 300}
            naturalWidth={979}
            caption="Every AI conclusion ships with its confidence, its reasoning, and its failures — on the row, not in a log."
          >
            <TrustRowCrop />
          </AssetFigure>
        }
      />

      <CaseSection
        heading="A corpus that admits what it lacks."
        lede={[
          "Every source carries a decay state (active, aging, stale), and an on-demand gap-analysis agent reports what the corpus is missing and where attention is shifting.",
          "The system doesn't just describe what it knows; it flags what it doesn't.",
          "And when a genuine gap turns up, the one sanctioned path to the open internet is the research tool that goes and fills it — AI-suggested topics, new sources, back into the corpus.",
        ]}
        media={
          <AssetFigure
            label="The corpus reports its blind spots"
            aspect={979 / 360}
            naturalWidth={979}
            caption="On demand, the corpus reports its own blind spots and where attention is shifting."
            sub={"// report contents representative — a real gap-analysis run appears in the closing section"}
          >
            <GapReportDecay />
          </AssetFigure>
        }
      />

      <CaseSection
        heading="Chat that answers from the library, not the internet."
        lede={[
          "The daily interface is a conversation with the corpus.",
          "A question gets embedded; the system over-fetches 20 to 40 candidates from the vector store — recall is cheap, and the reranker is the better judge of relevance — then the top ten go to the model with one standing rule: ground every claim in a named saved source, and say so when the corpus doesn't cover it.",
        ]}
        media={
          <>
            <AssetFigure
              label="The machine, drawn"
              aspect={979 / 380}
              naturalWidth={979}
              caption="Over-fetch wide, rerank hard, ground every claim in a named source — or say the corpus doesn't cover it."
            >
              <RagArchitecture />
            </AssetFigure>
            <div className={styles.narrowFigure}>
              <AssetFigure
                label="The refusal"
                aspect={480 / 240}
                naturalWidth={480}
                caption="When the library is silent, the system says so — then offers to go fill the shelf."
              >
                <RefusalCrop />
              </AssetFigure>
            </div>
          </>
        }
      />

      <CaseSection
        heading="Conversations are a graph, not a scroll."
        lede={[
          "Editing a question or regenerating an answer never overwrites anything: a sibling branch appears, with a version pager to walk the alternatives and branch-from-here on any message.",
          "Plus the navigation a 200-message chat needs: an outline rail with AI-generated topic labels, bookmarks, folders, and an auto-sort that proposes a filing plan from your own question history.",
        ]}
        media={
          <AssetFigure
            label="A conversation, branched"
            aspect={979 / 360}
            naturalWidth={979}
            caption="Edit or regenerate and nothing is lost — a sibling branch appears. The librarian layer keeps hundred-message chats navigable."
          >
            <BranchGraphFigure />
          </AssetFigure>
        }
      />

      {/* CLOSER — Platform One's closer layout (PlatformOne.tsx:243-303):
          standard section split, copy left with a bolded retro line last, two
          drafting-grid stat cards right. Was a CenteredSection with a stacked
          growth timeline + gap card; those two figures move below, so the
          closer reads at the same altitude as P1's and ChatVET's. */}
      <CaseSection
        heading="Production-deployed and compounding"
        lede={[
          "Knowledge Hub is live and in daily use: a corpus past 4,000 sources, growing 300–400 a week, with a chat interface grounded in it and agents that run on demand.",
          "By mid-May — when the corpus stood at 1,900 sources — the agents had generated 3,400+ signals: machine-written observations (contradictions, cross-links, emerging gaps), nearly two per source. The first gap they caught was one my own reading had missed entirely: five security subtopics I'd rated maximum priority, with eight links between them my reading never surfaced.",
          "It's the same rule I hold every AI product to — ground it or say you can't — applied to a system where I'm the only user it can fail.",
          <strong key="retro">
            A year ago I could have designed this in Figma — getting any of it
            into production would have been a dream. Built AI-natively, it
            shipped in four months, solo, and it&rsquo;s still shipping.
          </strong>,
        ]}
        media={
          <StatCards>
            <StatCard label="Sources in the corpus" value="4,000+" />
            <StatCard label="Agent signals generated" value="3,400+" />
          </StatCards>
        }
      />

      <section className={`content ${styles.closerFigures}`}>
        <AssetFigure
          label="Four months, zero to compounding"
          aspect={979 / 300}
          naturalWidth={979}
          caption="Four months from first Telegram message to a compounding system. The slope hasn't flattened."
        >
          <GrowthTimeline />
        </AssetFigure>
        <div className={styles.narrowFigure}>
          <AssetFigure
            label="The gap the agents caught"
            aspect={640 / 300}
            naturalWidth={640}
            caption="The first gap the agents caught was mine."
          >
            <GapCatchCard />
          </AssetFigure>
        </div>
      </section>

      {/* Figma's UP NEXT block was un-updated (stale ChatVET copy); named
          for the actual destination so link text matches. */}
      <UpNext
        title="Platform One AI Assistant & Chat Bot"
        desc="Designing an AI assistant projected to cut support tickets by roughly 40%"
        href="/case-studies/platform-one"
      />
    </>
  );
}
