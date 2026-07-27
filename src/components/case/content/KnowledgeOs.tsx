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
import TechStackMap from "./kos/TechStackMap";
import TrustRowCrop from "./kos/TrustRowCrop";
import GapCatchCard from "./kos/GapCatchCard";
import SystemMap from "./kos/SystemMap";
import AgentFleet from "./kos/AgentFleet";
import RagArchitecture from "./kos/RagArchitecture";
import RefusalCrop from "./kos/RefusalCrop";
import BranchGraphFigure from "./kos/BranchGraphFigure";
import ScoringRecal from "./kos/ScoringRecal";
import SystemEvolution from "./kos/SystemEvolution";

/**
 * Knowledge OS case-study content — repo-audit revision (2026-07-26) +
 * the judge panel's second-tier pass (same day). Fact ledger:
 * .claude/research/004-kos-repo-audit-provenance.md — READ IT before
 * touching any number here.
 *
 * Second-tier pass (6-judge panel, mean ~6.8): effort metrics
 * (865 commits · 249 PRs) pulled from the stats strip — closer stat
 * card only; the two problem sections merged into one; per-figure
 * provenance hedges consolidated into a single methods note in S1;
 * GapCatchCard promoted from the footer into "A corpus that admits
 * what it lacks" (GapReportDecay retired — the real run replaces the
 * representative report; recoverable in git); aphorism cadence thinned
 * ("restraint is a design decision", "honest failure is the point"
 * cut; "piles rot" and "a fix you can't measure" kept); "compounding"
 * capped to the closer heading; RagArchitecture's corpus band no
 * longer repeats the 3,241 count (SystemMap owns it).
 *
 * ⚠ STILL PENDING FROM ANDREW: real product screenshots (every
 * judge's #1 fix — hero, trust row, refusal, branch pager), fresh DB
 * export (corpus total, weekly volume, signals total), one
 * deep-reading-capacity number, "in daily use" as of now.
 */
export default function KnowledgeOs() {
  return (
    <>
      <CaseHero
        eyebrow="KNOWLEDGE HUB · PERSONAL KNOWLEDGE OS"
        title="Designing a personal AI that reads hundreds of sources a week, so I don't have to."
        intro={[
          "In AI, new work outpaces anyone's reading speed. Knowledge Hub is a personal knowledge OS — built solo, deployed in its first week, grown in production ever since.",
          "A capture pipeline ingests hundreds of sources a week into a corpus measured at 3,241 by mid-June; a chat interface answers from that corpus with citations instead of confidence.",
          "I designed, researched, and built every layer — the trust decisions below are mine end to end.",
        ]}
        placeholderLabel="// hero render in progress — the system diagrams below are current"
      />

      <StatsStrip
        items={[
          { label: "ROLE:", value: "Design, research & engineering — solo" },
          {
            label: "TIMEFRAME:",
            value: "Deployed in week one · 4½ months shipping",
          },
          {
            label: "SYSTEM:",
            value: "RAG + 12 agents · every answer cited",
          },
          {
            label: "STATUS:",
            value: "Live, single-user by design (as of July 2026)",
          },
        ]}
      />

      <BrandRow />

      <CaseSection
        heading="The field moves faster than reading speed."
        lede={[
          "Hundreds of relevant sources arrive every week — the corpus grew at roughly 260 a week through spring, per its own dated snapshots. A person can deeply read a fraction of that, and skimming drops the things that matter most: connections and contradictions between sources, the topics nobody's covering yet.",
          "Capture tools don't solve it — they make piles, and piles rot: you can't see what's gone stale, what contradicts what, or what's missing entirely. For a designer whose positioning depends on staying current in AI, that's a professional risk.",
          "The system reads everything so I can deeply read the right ten.",
          "A note on method: I'm the only user, so the research is instrumentation. Every number here comes from the project's own dated records — commit history, migrations, eval reports. Figures marked representative are drawn to those records; anything only the production database can answer says so on its face.",
        ]}
        media={
          <AssetFigure
            label="One week of intake vs reading speed"
            aspect={979 / 360}
            naturalWidth={979}
            caption="Every week, hundreds of captures. Deep reading covers the flat line at the bottom."
          >
            <CaptureVolumeChart />
          </AssetFigure>
        }
      />

      <CaseSection
        heading="It started as a Telegram bot that saved links."
        lede={[
          "First commit February 23; in production on Railway by day two. Send it a URL and it's saved instantly — a background pipeline extracts, summarizes, scores, and embeds it, then messages back the graded save.",
          "Ingestion turned out to be the easy part, solved in the first week. Everything in this study — trust, agents, retrieval, branching — is what the next four months built on top of it. The capture layer is still that same bot.",
        ]}
        media={
          <AssetFigure
            label="Piles rot; capture compounds"
            aspect={979 / 360}
            naturalWidth={979}
            caption="Left: where every capture tool ends. Right: capture that compounds — the bot's real two-step reply: instant ack, then the graded save. Everything in this study happens after this message."
          >
            <CaptureBeforeAfter />
          </AssetFigure>
        }
      />

      <CaseSection
        heading="Built for a web that fights back."
        lede={[
          "Almost none of the pipeline's external tools are the ones it started with. Extraction is adversarial — platforms wall off content, public APIs grow challenge screens, managed builders quietly drop your system dependencies. Surviving that took an architecture decision: routing lives in a database table, not in code.",
          "Every platform gets a chain of extractors that ends at the same universal fallback, so a failed tool degrades a save — it never drops one. When YouTube's bot wall broke the media downloader, yt-dlp swapped in behind one registry row. When the public cobalt API added a Turnstile wall, a self-hosted instance on Fly took over. When two managed builders silently dropped yt-dlp and ffmpeg from the deploy, the build moved to a raw Dockerfile.",
          "The AI layer tiers the same way the tools do: Haiku where volume lives, Sonnet where judgment lives, Voyage for embedding and reranking, Exa as the one sanctioned search. And every tool call is logged with its duration and cost — the stack is instrumented like the corpus.",
        ]}
        media={
          <AssetFigure
            label="The full stack, and why it's swappable"
            aspect={979 / 560}
            naturalWidth={979}
            caption="Fourteen registry tools across six layers, with the swaps dated on the right. The registry is why a platform fighting back never dropped a link."
          >
            <TechStackMap />
          </AssetFigure>
        }
      />

      <CaseSection
        heading="Every conclusion shows how much to trust it."
        lede={[
          "Every source row carries one 0–100 value score — the model's priority rating blended with novelty against its own Space and rank within its topic — and the written reason sits one hover away, where you read, not in logs.",
          "A failed extraction is never dropped: the row is saved and flagged, with recovery one click away in the app — or a /retry straight from Telegram.",
        ]}
        media={
          <AssetFigure
            label="Trust, surfaced on the row"
            aspect={979 / 300}
            naturalWidth={979}
            caption="Every AI conclusion ships with its confidence, its reasoning, and its failures — surfaced where I read."
          >
            <TrustRowCrop />
          </AssetFigure>
        }
      />

      <CaseSection
        heading="A corpus that admits what it lacks."
        lede={[
          "Every source carries a decay state (active, aging, stale) — aging trips automatically as newer saves supersede old ones; stale takes a model review that docks the score.",
          "An on-demand gap-analysis agent reads the whole corpus and reports where coverage is thin against what the scoring says matters. Its first run — five weeks in, at 627 sources — caught my own blind spot: five security subtopics scored at the corpus maximum, eight saved links between them. The scoring said it mattered; my reading hadn't noticed.",
          "And when a genuine gap turns up, the one sanctioned path to the open internet is the research tool that goes and fills it — suggested topics, capped runs, every new source through the same scored pipeline, with per-run rollback.",
        ]}
        media={
          <div className={styles.narrowFigure}>
            <AssetFigure
              label="The gap the agent caught"
              aspect={640 / 300}
              naturalWidth={640}
              caption="The first gap the agents caught was mine — a real run, dated in the repo."
            >
              <GapCatchCard />
            </AssetFigure>
          </div>
        }
      />

      <CaseSection
        heading="A substrate, not a library."
        lede={[
          "The corpus isn't the product — it's food for twelve specialist agents: connection discovery, contradiction detection, gap analysis, synthesis, research, a reading-queue prioritizer that never calls a model at all.",
          "Each one is boring on its own; the interesting behavior is how they compose. Agents write signals — machine observations reviewed like proposals, never auto-applied — and by mid-April, at about 1,000 sources, they'd written ~960 of them. Roughly one per source.",
          "They all started life on weekly crons. At ~$8 a week of model spend for a single user, I turned scheduling off — every agent now runs on demand, and the only cron left is a ten-cent digest.",
        ]}
        media={
          <>
            <AssetFigure
              label="The whole machine"
              aspect={979 / 440}
              naturalWidth={979}
              caption="One URL in, grounded answers out — capture, pipeline, corpus, agents, surfaces. The orange loop is the only path to the open web."
            >
              <SystemMap />
            </AssetFigure>
            <AssetFigure
              label="The agent fleet"
              aspect={979 / 360}
              naturalWidth={979}
              caption="Twelve boring agents, one interesting system — and the cost arc that made every one of them manual."
            >
              <AgentFleet />
            </AssetFigure>
          </>
        }
      />

      <CaseSection
        heading="Chat that answers from the library, not the internet."
        lede={[
          "The daily interface is a conversation with the corpus.",
          "A question gets embedded; the system over-fetches 20 to 40 candidates from the vector store — recall is cheap, and the reranker is the better judge of relevance — then the top ten go to the model with one standing rule: ground every claim in a named saved source, and say so when the corpus doesn't cover it.",
          "That architecture wasn't day one. Chat shipped in week four as plain cosine top-k; the over-fetch and rerank came three months of daily use later, when one number doing three jobs stopped scaling.",
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
                caption="When the library is silent, the system says so. The tool that fills the shelf sits one click away in the same chat — it suggests topics from the conversation, pulls new sources, and reports back into the thread."
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
          "Plus the navigation a long chat needs: an outline rail with AI-generated topic labels, bookmarks, folders, and an auto-sort that proposes a filing plan — preview first, nothing moves until approved. And when two branches end up citing the same sources, the system notices and offers to merge them into one grounded synthesis.",
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

      <CaseSection
        heading="The trust story had to be earned twice."
        lede={[
          "In June, an audit caught a schema change that had silently broken chat retrieval — for a stretch, every question drew zero context from the corpus. The grounding rule is why nobody got lied to: the system said the corpus didn't cover it instead of improvising.",
          "The same month, measurement caught the scorer burying good design work — a study I'd call a 9 sat at 0.30, and only 5% of design links ever reached HIGH against a 20% target. The fix started with an eval harness, not a prompt edit: a 50-link gold set, then a rubric rewrite, then re-measurement.",
          "A fix you can't measure is a fix you'll quietly re-break in three months and never notice.",
        ]}
        media={
          <div className={styles.narrowFigure}>
            <AssetFigure
              label="Measure first, then fix"
              aspect={640 / 300}
              naturalWidth={640}
              caption="Recall of high-worth design work, before and after the rubric rewrite — measured on a gold set built before the fix."
            >
              <ScoringRecal />
            </AssetFigure>
          </div>
        }
      />

      {/* CLOSER — Platform One's closer layout: standard section split, copy
          left with a bolded retro line last, two drafting-grid stat cards
          right; the evolution timeline hangs below full-width. */}
      <CaseSection
        heading="In production since week one — and compounding"
        lede={[
          "Knowledge Hub is live: 865 commits and 249 merged PRs between February 23 and early July, a corpus measured at 3,241 sources in mid-June and past 4,000 on that trajectory, a cited chat on top, twelve agents on call.",
          "It's the same rule I hold every AI product to — ground it or say you can't — applied to a system where I'm the only user it can fail.",
          <strong key="retro">
            A year ago I could have designed this in Figma — getting any of it
            into production would have been a dream. Built AI-natively, it was
            live in week one, solo, and it hasn&rsquo;t slowed since.
          </strong>,
        ]}
        media={
          <StatCards>
            <StatCard label="Sources measured — Jun 16" value="3,241" />
            <StatCard label="Commits · merged PRs" value="865 · 249" />
          </StatCards>
        }
      />

      <section className={`content ${styles.closerFigures}`}>
        <AssetFigure
          label="Four and a half months, zero to compounding"
          aspect={979 / 300}
          naturalWidth={979}
          caption="Four and a half months from first commit — every solid point is dated in the repo; the dashed tail is the trajectory."
        >
          <SystemEvolution />
        </AssetFigure>
      </section>

      <UpNext
        title="Platform One AI Assistant & Chat Bot"
        desc="Designing an AI assistant projected to cut support tickets by roughly 40%"
        href="/case-studies/platform-one"
      />
    </>
  );
}
