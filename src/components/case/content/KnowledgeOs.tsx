import {
  CaseHero,
  StatsStrip,
  CaseSection,
  UpNext,
} from "../CaseSections";
import { AssetFigure, StatCard, StatCards } from "../CaseFigures";
import BrandRow from "../../site/BrandRow";
import ZoomableFigure from "../FigureLightbox";
import styles from "./KnowledgeOs.module.css";
import CaptureBeforeAfter from "./kos/CaptureBeforeAfter";
import TechStackMap from "./kos/TechStackMap";
import GapCatchCard from "./kos/GapCatchCard";
import SystemMap from "./kos/SystemMap";
import RagArchitecture from "./kos/RagArchitecture";
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
 * PLACEMENT PASS 2026-07-27: six real captures landed (Andrew's
 * exports, Figma section 7024:1851) — hero (cited answer + Sources
 * rail), Analytics (4,339 total · 93% extraction · real 12-week pace —
 * retires CaptureVolumeChart AND supplies the fresh corpus/volume
 * numbers), trust row with the hover reason open (retires
 * TrustRowCrop), a live Jun 24 gap signal (pairs with the dated
 * GapCatchCard), the research panel (retires RefusalCrop), and the
 * branch/converge capture with a mid-answer gap admission (retires
 * BranchGraphFigure). All numbers refreshed to 4,339 / Jul 27;
 * SystemEvolution's tail is now measured, not extrapolated. Retired
 * components deleted — recoverable in git.
 *
 * GIF LANDED 2026-07-27: kos-ask-answer-fast.gif (14s @2x, cut from
 * Andrew's recording 86s–114s) — ask → searching → grounded answer
 * with match-% cards, placed under RagArchitecture as the P1-pattern
 * demo loop. His recording's analytics frame shows 4,415/173-this-week
 * — the corpus has already outgrown the 4,339 screenshot.
 *
 * ⚠ STILL PENDING FROM ANDREW: a true corpus-empty refusal capture,
 * the ◀ n/m ▶ version-pager close-up or branch-flip GIF (5 seconds,
 * would be tiny and killer), the Telegram two-step capture
 * (CaptureBeforeAfter's right panel is the last drawn stand-in),
 * signals total, one deep-reading-capacity number, and the grounding
 * spot-check.
 */
export default function KnowledgeOs() {
  return (
    <>
      <CaseHero
        eyebrow="KNOWLEDGE HUB · PERSONAL KNOWLEDGE OS"
        title="Designing a personal AI that reads hundreds of sources a week, so I don't have to."
        intro={[
          "In AI, new work outpaces anyone's reading speed. Knowledge Hub is a personal knowledge OS: built solo, deployed in its first week, grown in production ever since.",
          "A capture pipeline ingests a hundred-plus sources a week into a corpus that stood at 4,339 in late July; a chat interface answers from that corpus with citations instead of confidence.",
          "I designed, researched, and built every layer. The trust decisions below are mine end to end.",
        ]}
        media={
          <ZoomableFigure
            label="The daily interface: a cited answer"
            aspect={3800 / 2030}
            naturalWidth={3800}
            unframed
          >
            <img
              src="/case-studies/knowledge-os/kos-hero-chat.webp"
              alt="The Knowledge Hub chat answering 'How do I manage context and memory effectively in a production agent system?' with a practical framework grounded in saved resources; source titles bolded inline, the Sources rail open listing 23 saved links, folders in the left sidebar, and a footer reading: answers are generated from your saved links; results depend on what you've saved."
              className={styles.shotImg}
            />
          </ZoomableFigure>
        }
      />

      <StatsStrip
        items={[
          { label: "ROLE:", value: "Design, research & engineering · solo" },
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
          "A hundred-plus relevant sources arrive in a quiet week; the spring peak topped five hundred. A person can deeply read a fraction of that, and skimming drops the things that matter most: connections and contradictions between sources, the topics nobody's covering yet.",
          "Capture tools don't solve it. They make piles, and piles rot: you can't see what's gone stale, what contradicts what, or what's missing entirely. For a designer whose positioning depends on staying current in AI, that's a professional risk.",
          "The system reads everything so I can deeply read the right ten.",
          "A note on method: I'm the only user, so the research is instrumentation. Every number here comes from the project's own dated records: commit history, migrations, eval reports, and the product's own analytics, shown as captured.",
        ]}
        media={
          /* Placement pass 2026-07-27: the drawn representative bars retired —
             this is the Analytics page as it stood on Jul 27, numbers and all. */
          <AssetFigure
            label="The intake, measured · Analytics, Jul 27"
            aspect={3817 / 2050}
            naturalWidth={3817}
            caption="The system's own telemetry: 4,339 sources, 93% extraction success, and twelve weeks of real intake. Deep reading covers a sliver of any of these bars."
          >
            <img
              src="/case-studies/knowledge-os/kos-analytics.webp"
              alt="The Analytics page: stat strip reading total links 4,339, extraction success 93 percent, this week 101; an Ingestion Pace bar chart of links saved per week for the last twelve weeks, peaking near five hundred in late May; Topic Coverage with Agentic Coding at 1,937 links and Design at 1,324; and a Score Distribution by priority bucket."
              className={styles.shotImg}
            />
          </AssetFigure>
        }
      />

      <CaseSection
        heading="It started as a Telegram bot that saved links."
        lede={[
          "First commit February 23; in production on Railway by day two. Send it a URL and it's saved instantly: a background pipeline extracts, summarizes, scores, and embeds it, then messages back the graded save.",
          "Ingestion turned out to be the easy part, solved in the first week. Everything in this study (trust, agents, retrieval, branching) is what the next four months built on top of it. The capture layer is still that same bot.",
        ]}
        media={
          <AssetFigure
            label="Piles rot; capture compounds"
            aspect={979 / 360}
            naturalWidth={979}
            caption="Left: where every capture tool ends. Right: capture that compounds. The bot's real two-step reply: instant ack, then the graded save. Everything in this study happens after this message."
          >
            <CaptureBeforeAfter />
          </AssetFigure>
        }
      />

      <CaseSection
        heading="Every conclusion shows how much to trust it."
        lede={[
          "Every source row carries one 0–100 value score (the model's priority rating blended with novelty against its own Space and rank within its topic), and the written reason sits one hover away, where you read, not in logs.",
          "A failed extraction is never dropped: the row is saved and flagged, with recovery one click away in the app, or a /retry straight from Telegram.",
        ]}
        media={
          /* Placement pass 2026-07-27: the drawn row retired — the real table
             with the hover breakdown open. */
          <AssetFigure
            label="Trust, surfaced on the row · live"
            aspect={3820 / 2055}
            naturalWidth={3820}
            caption="The real table, hover open: the model's written reason, the priority it set, novelty against the Space. Trust lives on the row because that's where reading happens, not a dashboard away."
          >
            <img
              src="/case-studies/knowledge-os/kos-trust-row.webp"
              alt="The Knowledge table with a row's score tooltip open, reading: solid strategic insight on design practice shift with AI, clear framing of new deliverable standards, but primarily conceptual argument rather than craft demonstration. Value score 69, priority 72 described as Claude's quality rating, novelty 29 described as fresh versus corpus. Around it, rows carry source chips, category chips, score dots, and a REVIEW badge on a flagged row."
              className={styles.shotImg}
            />
          </AssetFigure>
        }
      />

      <CaseSection
        heading="A corpus that admits what it lacks."
        lede={[
          "Every source carries a decay state (active, aging, stale): aging trips automatically as newer saves supersede old ones; stale takes a model review that docks the score.",
          "An on-demand gap-analysis agent reads the whole corpus and reports where coverage is thin against what the scoring says matters. Its first run (five weeks in, at 627 sources) caught my own blind spot: five security subtopics scored at the corpus maximum, eight saved links between them. The scoring said it mattered; my reading hadn't noticed.",
          "And when a genuine gap turns up, the one sanctioned path to the open internet is the research tool that goes and fills it: suggested topics, capped runs, every new source through the same scored pipeline, with per-run rollback.",
        ]}
        media={
          /* Placement pass 2026-07-27: the live twin joins the dated record —
             the same blind-spot pattern, still firing fifteen months of saves
             later. Then-and-now is the argument. */
          <>
            <AssetFigure
              label="A gap report, live · Jun 24"
              aspect={3822 / 2047}
              naturalWidth={3822}
              caption="Still catching them: eight thin subtopics the pipeline scored 0.82–0.92, one link each, with the three actions that close the loop: ask, research, draft."
            >
              <img
                src="/case-studies/knowledge-os/kos-gap-signal.webp"
                alt="A gap signal detail in Insights, 93 percent confidence, June 24 2026: Agentic Coding, Agent Authorization and Payment Systems. The corpus has eight-plus thin subtopics covering agent payment authorization, each with only one link but priority scores of 0.82 to 0.92. Below: why it matters, the top link in the area, two suggested searches, and buttons reading Ask AI about this gap, Research this, and Draft about this."
                className={styles.shotImg}
              />
            </AssetFigure>
            <div className={styles.narrowFigure}>
              <AssetFigure
                label="The first catch · Mar 30"
                aspect={640 / 300}
                naturalWidth={640}
                caption="The first gap the agents caught was mine: a real run, dated in the repo."
              >
                <GapCatchCard />
              </AssetFigure>
            </div>
          </>
        }
      />

      <CaseSection
        heading="A substrate, not a library."
        lede={[
          "The corpus isn't the product. It's food for twelve specialist agents: connection discovery, contradiction detection, gap analysis, synthesis, research, a reading-queue prioritizer that never calls a model at all.",
          "Each one is boring on its own; the interesting behavior is how they compose. Agents write signals (machine observations reviewed like proposals, never auto-applied), and by mid-April, at about 1,000 sources, they'd written ~960 of them. Roughly one per source.",
          "They all started life on weekly crons. At ~$8 a week of model spend for a single user, I turned scheduling off: every agent now runs on demand, and the only cron left is a ten-cent digest.",
        ]}
        media={
          /* Rescore-panel pass: AgentFleet retired (one of three sibling chip
             diagrams; SystemMap's agent band + the lede carry the roster and
             the cost arc). Recoverable in git. */
          <AssetFigure
            label="The whole machine"
            aspect={979 / 440}
            naturalWidth={979}
            caption="One URL in, grounded answers out: capture, pipeline, corpus, agents, surfaces. The orange loop is the only path to the open web."
          >
            <SystemMap />
          </AssetFigure>
        }
      />

      <CaseSection
        heading="Chat that answers only from the library."
        lede={[
          "The daily interface is a conversation with the corpus.",
          "A question gets embedded; the system over-fetches 20 to 40 candidates from the vector store (recall is cheap, and the reranker is the better judge of relevance), then the top ten go to the model with one standing rule: ground every claim in a named saved source, and say so when the corpus doesn't cover it.",
          "That architecture wasn't day one. Chat shipped in week four as plain cosine top-k; the over-fetch and rerank came three months of daily use later, when one number doing three jobs stopped scaling.",
          "And nothing is ever overwritten. The first version truncated the thread on edit (a reload could interleave stale and new messages), so a conversation graph replaced it: sibling branches, a version pager, branch-from-here on any message. The librarian layer (an outline rail with AI topic labels, bookmarks, an auto-sort that only ever proposes: preview, approve, undo) keeps hundred-message chats navigable.",
        ]}
        media={
          /* Rescore-panel pass: the standalone branching section folded in
             here — one paragraph + the branch figure; the graph earns a
             rejected-alternative beat (the truncate-on-edit bug is dated in
             the repo's own migration notes). */
          <>
            <AssetFigure
              label="The machine, drawn"
              aspect={979 / 380}
              naturalWidth={979}
              caption="Over-fetch wide, rerank hard, ground every claim in a named source, or say the corpus doesn't cover it."
            >
              <RagArchitecture />
            </AssetFigure>
            {/* Placement pass 2026-07-27: the machine above, running — the
                P1-pattern demo loop. 2x speed, cut from Andrew's recording. */}
            <AssetFigure
              label="The machine, running · 2×"
              aspect={3806 / 2034}
              naturalWidth={1000}
              caption="Ask, search the library, and a grounded answer streams in with its sources attached: the architecture above, at work."
            >
              <img
                src="/case-studies/knowledge-os/kos-ask-answer-fast.gif"
                alt="Screen recording at double speed: a question is typed into the chat home over the corpus folders, the composer sends, a Searching-your-library state appears, and a structured answer streams in: themes, bolded source names, Referenced Resources cards with match percentages, and follow-up suggestion chips."
                className={styles.shotImg}
                loading="lazy"
              />
            </AssetFigure>
            <AssetFigure
              label="The shelf-filler, one click away"
              aspect={3815 / 2037}
              naturalWidth={3815}
              caption="When the corpus can't cover a question, the same chat fixes it: the research panel suggests topics from the conversation, runs capped searches, and reports back into the thread."
            >
              <img
                src="/case-studies/knowledge-os/kos-research-panel.webp"
                alt="The Research Topics panel open over a chat: a sources toggle set to diverse, a Suggest-from-conversation button, five suggested topics about graph engineering each with its own Research button, and a Research-all-5 action, above the composer and the answers-are-generated-from-your-saved-links footer."
                className={styles.shotImg}
              />
            </AssetFigure>
            <AssetFigure
              label="A conversation, branched · live"
              aspect={3802 / 2042}
              naturalWidth={3802}
              caption="Nothing is overwritten, and when two branches converge on the same three sources, the system offers one grounded synthesis. The answer above does the honest thing too: it names what the saved links don't cover."
            >
              <img
                src="/case-studies/knowledge-os/kos-branch-converge.webp"
                alt="A real chat where the answer opens with One Critical Gap ('your saved links do not cover how to handle sellers who do not accept USDC or crypto payments'), above a Resources list and Referenced Resources cards with match percentages. At the bottom, a bar reads: two branches converge on 3 shared sources, with a Synthesize button. The outline rail on the right shows Bookmarks and section labels."
                className={styles.shotImg}
              />
            </AssetFigure>
          </>
        }
      />

      {/* Delta-panel pass (4 judges, unanimous keep-move-and-tighten): moved
          here from position 3 — pairs with "earned twice" as two
          reality-attacked-the-system beats, and restores trust rows +
          gap-catch to the front half. Lede re-led with the user-facing
          invariant; the model-tiering paragraph cut (the figure and later
          sections already carry it). */}
      <CaseSection
        heading="Built for a web that fights back."
        lede={[
          "None of the trust work above matters if capture dies, and extraction is adversarial: platforms wall off content, public APIs grow challenge screens, managed builders drop your system dependencies without warning. So the pipeline keeps one promise above all: a failed tool degrades a save. It never drops one. The design decision that keeps it: routing lives in a database table, not in code, with every platform's extractor chain ending at the same universal fallback.",
          "The receipts are dated. When YouTube's bot wall broke the media downloader, yt-dlp swapped in behind one registry row. When the public cobalt API added a Turnstile wall, a self-hosted instance on Fly took over. When two managed builders silently dropped yt-dlp and ffmpeg from the deploy, the build moved to a raw Dockerfile. Almost none of the pipeline's tools are the ones it started with, and every tool call is logged with its duration and cost.",
        ]}
        media={
          <AssetFigure
            label="The stack, told as its swaps"
            aspect={979 / 490}
            naturalWidth={979}
            caption="Four dated swaps under one invariant. The rest of the registry rides in the band."
          >
            <TechStackMap />
          </AssetFigure>
        }
      />

      <CaseSection
        heading="The trust story had to be earned twice."
        lede={[
          "In June, an audit caught a schema change that had silently broken chat retrieval: for a stretch, every question drew zero context from the corpus. The grounding rule is why nobody got lied to: the system said the corpus didn't cover it instead of improvising.",
          "The same month, measurement caught the scorer burying good design work: a study I'd call a 9 sat at 0.30, and only 5% of design links ever reached HIGH against a 20% target. The fix started with an eval harness, not a prompt edit: a 50-link gold set, then a rubric rewrite, then re-measurement.",
          "A fix you can't measure is a fix you'll re-break in three months and never notice.",
        ]}
        media={
          <div className={styles.narrowFigure}>
            <AssetFigure
              label="Measure first, then fix"
              aspect={640 / 300}
              naturalWidth={640}
              caption="Recall of high-worth design work, before and after the rubric rewrite, measured on a gold set built before the fix."
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
        heading="In production since week one, and compounding"
        lede={[
          "Knowledge Hub is live: 865 commits and 249 merged PRs between February 23 and early July, a corpus measured at 4,339 sources in late July and still growing, a cited chat on top, twelve agents on call.",
          "It's the same rule I hold every AI product to (ground it or say you can't), applied to a system where I'm the only user it can fail.",
          <strong key="retro">
            A year ago I could have designed this in Figma. Getting any of it
            into production would have been a dream. Built AI-natively, it was
            live in week one, solo, and it hasn&rsquo;t slowed since.
          </strong>,
        ]}
        media={
          /* Rescore-panel pass: the effort card (865 · 249) demoted — those
             numbers already live in the lede; the second card now carries a
             measured OUTCOME (the eval-first fix, reprised from S9 as the
             closing stat the first panel asked to promote). */
          <StatCards>
            <StatCard label="Sources measured · Jul 27" value="4,339" />
            <StatCard label="High-worth recall · eval-first fix" value="8→63%" />
          </StatCards>
        }
      />

      <section className={`content ${styles.closerFigures}`}>
        <AssetFigure
          label="Five months, zero to compounding"
          aspect={979 / 300}
          naturalWidth={979}
          caption="Five months from first commit, every point measured: repo records through June, the product's own analytics for July 27."
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
