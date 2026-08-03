import {
  CaseHero,
  StatsStrip,
  CaseSection,
  UpNext,
} from "../CaseSections";
import { AssetFigure, StatCardImg, StatCards } from "../CaseFigures";
import BrandRow from "../../site/BrandRow";
import ZoomableFigure from "../FigureLightbox";
import styles from "./KnowledgeOs.module.css";
import CaptureBeforeAfter from "./kos/CaptureBeforeAfter";
import TechStackMap from "./kos/TechStackMap";
import ScoringRecal from "./kos/ScoringRecal";

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
 * ANDREW'S FIGMA REVISION 2026-07-29 (Updated Layouts page, frame
 * 7042:2694): GapCatchCard cut from the gap section; SystemMap and
 * RagArchitecture replaced by his drawn diagrams (exported as
 * kos-system-overview.webp / kos-ask-flow.webp — components deleted,
 * git-recoverable); capture-figure caption rewritten (his words);
 * closer cards now Sources added & scored 4,339 + Avg new sources per
 * week ~300, with his method note under them (cards now ship as his
 * Figma exports, kos-stat-*.webp); hero swapped to his Today's digest
 * capture (7024:1834); screenshots render unframed per his rule,
 * borders stay on charts/diagrams. His diagram band says
 * "over 4,250" and "Per-Topi" (typo) — fix in Figma + re-export.
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
          "New work in AI outpaces anyone's reading speed. Knowledge Hub is a personal knowledge OS. I built it solo, put it in production on day two, and have run it there ever since.",
          "A capture pipeline ingests 100 or more sources in a quiet week, with peaks near 500, into a corpus that stood at 4,339 in late July. A chat interface answers from that corpus and cites the saved source behind every claim.",
          "I designed, researched, and built every layer, and the trust decisions below are mine end to end.",
        ]}
        media={
          <ZoomableFigure
            label="Today's digest · Jul 27"
            aspect={2232 / 1185}
            naturalWidth={2232}
            unframed
          >
            {/* digest2 = Andrew's Figma crop (node 7042:2704): trims the
                capture's own page margins and the ragged half-row at the
                bottom so the shot sits flush in the hero plate. */}
            <img loading="lazy"
              src="/case-studies/knowledge-os/kos-hero-digest2.webp"
              alt="The Brief page for Monday, July 27: a Today's digest card counting 22 links across Agentic Coding, Business, Design, Game Design and Research, each topic with its link count, top source and score. Below it, four drafts await approval with their own scores. The sidebar lists Brief, Insights, Agents, Pipeline, Inbox, Knowledge, Gallery, Curated, Analytics, Drafts, Optimize and Ask AI."
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
            /* Guest-view pass 2026-08-03: the cell carries the live link
               (ChatVET's retired .liveLink idiom — CV unlinked because its
               live UI drifted from the shipped screens; this one is mine and
               current). "single-user" → "single-writer" to match line 126's
               claim exactly — guests can now read. The "(as of ...)" stamp
               is retired: the link is the freshness proof. */
            label: "STATUS:",
            value: (
              <>
                <span className={styles.statLine}>
                  Live, single-writer by design
                </span>
                <span className={styles.statLine}>
                  <a
                    href="https://hub.andrewmarks.design/guest"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.liveLink}
                  >
                    Browse the guest view
                  </a>
                </span>
              </>
            ),
          },
        ]}
      />

      <BrandRow />

      <CaseSection
        heading="The field moves faster than reading speed."
        lede={[
          "In a quiet week, 100 or more relevant sources arrive. The spring peak came close to 500. Nobody reads a meaningful fraction of that, and skimming loses the part that matters most: the connections and contradictions between sources, and the topics nobody has covered yet.",
          "Capture tools do not fix this. They make piles, and piles rot. You cannot see what has gone stale, what contradicts what, or what is missing. My positioning depends on staying current in AI, so a rotting pile is a professional risk.",
          "The system reads everything, so the handful I read closely is chosen rather than whatever happened to surface.",
          "A note on method. I am the only person who can write to the system, so the evidence here comes from instrumentation rather than from users. Every number comes from the project's own dated records: commit history, migrations, eval reports, and the product's analytics, shown as captured.",
        ]}
        media={
          /* Placement pass 2026-07-27: the drawn representative bars retired —
             this is the Analytics page as it stood on Jul 27, numbers and all. */
          <AssetFigure
            label="The intake, measured · Analytics, Jul 27"
            unframed
            aspect={3817 / 2050}
            naturalWidth={3817}
            caption="The system's own telemetry: 4,339 sources, 93% extraction success, and twelve weeks of real intake. Deep reading covers a sliver of any of these bars."
          >
            <img loading="lazy"
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
          "First commit on February 23, in production on Railway by day two. Send it a URL and it saves instantly, then a background pipeline extracts, summarizes, scores, and embeds the source before messaging back the graded save.",
          "Ingestion turned out to be the easy part, solved in the first week. The trust, agents, retrieval, and branching work in this study is what the next four months built on top of it. The capture layer is still that same bot.",
        ]}
        media={
          <AssetFigure
            label="Piles rot; capture compounds"
            aspect={979 / 360}
            naturalWidth={979}
            caption="Telegram is the main ingest pipeline: the bot must acknowledge the link, then return the status to the user. This lets the user see a quick score and classification and catch errors early."
          >
            <CaptureBeforeAfter />
          </AssetFigure>
        }
      />

      <CaseSection
        heading="Every source carries a priority score you can interrogate."
        lede={[
          "Each source row shows one value score from 0 to 100. It blends the model's priority rating with novelty against its own Space and the source's rank within its topic. The written reason sits one hover away, in the interface where you read rather than in a log.",
          "A failed extraction is never dropped. The row saves and flags itself, with recovery one click away in the app or a /retry from Telegram.",
        ]}
        media={
          /* Placement pass 2026-07-27: the drawn row retired — the real table
             with the hover breakdown open. */
          <AssetFigure
            label="Trust, surfaced on the row · live"
            unframed
            aspect={3820 / 2055}
            naturalWidth={3820}
            caption="The real table, hover open: the model's written reason, the priority it set, novelty against the Space. Trust lives on the row because that's where reading happens, not a dashboard away."
          >
            <img loading="lazy"
              src="/case-studies/knowledge-os/kos-trust-row.webp"
              alt="The Knowledge table with a row's score tooltip open, reading: solid strategic insight on design practice shift with AI, clear framing of new deliverable standards, but primarily conceptual argument rather than craft demonstration. Value score 69, priority 72 described as Claude's quality rating, novelty 29 described as fresh versus corpus. Around it, rows carry source chips, category chips, score dots, and a REVIEW badge on a flagged row."
              className={styles.shotImg}
            />
          </AssetFigure>
        }
      />

      <CaseSection
        heading="A gap-analysis agent reads the corpus and reports what is missing."
        lede={[
          "Every source carries a decay state of active, aging, or stale. Aging trips automatically as newer saves supersede older ones. Stale requires a model review that docks the score.",
          "The gap-analysis agent runs on demand, reading the whole corpus and reporting where coverage is thin against what the scoring says matters. Its first run, 5 weeks in at 627 sources, caught a blind spot. Five security subtopics were scoring at the corpus maximum with 8 saved links between them. The scoring had flagged the area as important and my reading had not kept up.",
          "When a gap is confirmed, the research agent is the only sanctioned path to the open internet. It proposes topics, runs capped searches, sends every new source through the same scored pipeline, and supports per-run rollback. Against that security gap it pulled 45 sources.",
        ]}
        media={
          /* Placement pass 2026-07-27: the live twin joins the dated record —
             the same blind-spot pattern, still firing fifteen months of saves
             later. Then-and-now is the argument. */
          <>
            <AssetFigure
              label="A gap report, live · Jun 24"
              unframed
              aspect={3822 / 2047}
              naturalWidth={3822}
              caption="Still catching them: eight thin subtopics the pipeline scored 0.82–0.92, one link each, with the three actions that close the loop: ask, research, draft."
            >
              <img loading="lazy"
                src="/case-studies/knowledge-os/kos-gap-signal.webp"
                alt="A gap signal detail in Insights, 93 percent confidence, June 24, 2026: Agentic Coding, Agent Authorization and Payment Systems. The corpus has eight-plus thin subtopics covering agent payment authorization, each with only one link but priority scores of 0.82 to 0.92. Below: why it matters, the top link in the area, two suggested searches, and buttons reading Ask AI about this gap, Research this, and Draft about this."
                className={styles.shotImg}
              />
            </AssetFigure>
            {/* Rescore pass 2026-07-29 (panel fix 4): moved up from the chat
                section — the research panel is this section's argument (the
                one sanctioned egress), and the move breaks the chat section's
                four-figure stack. */}
            <AssetFigure
              label="The shelf-filler, one click away"
              unframed
              aspect={3815 / 2037}
              naturalWidth={3815}
              caption="When the corpus can't cover a question, the same chat fixes it: the research panel suggests topics from the conversation, runs capped searches, and reports back into the thread."
            >
              <img loading="lazy"
                src="/case-studies/knowledge-os/kos-research-panel.webp"
                alt="The Research Topics panel open over a chat: a sources toggle set to diverse, a Suggest-from-conversation button, five suggested topics about graph engineering each with its own Research button, and a Research-all-5 action, above the composer and the answers-are-generated-from-your-saved-links footer."
                className={styles.shotImg}
              />
            </AssetFigure>
          </>
        }
      />

      <CaseSection
        heading="Twelve specialist agents compose into behavior none of them has alone."
        lede={[
          "The corpus feeds 12 specialist agents, including connection discovery, contradiction detection, gap analysis, synthesis, research, and a reading-queue prioritizer that never calls a model at all.",
          "Each one is simple in isolation. What makes them useful is composition. Agents write signals, which are machine observations reviewed like proposals and never applied automatically. By mid-April, at about 1,000 sources, they had written about 960 signals, roughly one per source.",
          "All 12 started on weekly crons. At about $8 a week in model spend for a single user, I turned scheduling off. Every agent now runs on demand, and the only cron left is a 10-cent digest.",
        ]}
        media={
          /* Andrew's Figma revision 2026-07-29: his drawn system overview
             replaces the SVG SystemMap (deleted, git-recoverable). */
          <AssetFigure
            label="The whole machine"
            aspect={2232 / 1002}
            naturalWidth={2232}
            caption="One URL in, grounded answers out: capture, pipeline, corpus, agents, surfaces. The research loop is the only path to the open web."
          >
            <img loading="lazy"
              src="/case-studies/knowledge-os/kos-system-overview.webp"
              alt="High-level view of the whole system: Telegram URLs and web or gallery adds pass a security gate into extract (a tool registry with 11-plus tools), summarize and score (Haiku plus per-topic rubrics), and embed (Voyage plus novelty); failures are saved, retried, and never dropped. Everything lands in the personal knowledge corpus, over 4,250 sources measured 7/27 and growing by about 300 per week, on Supabase and pgvector. Twelve on-demand agents (connections, contradictions, gaps, synthesis) write signals back and can trigger research runs on Exa, and it surfaces in the AI chat, every answer sourced and cited from the corpus."
              className={styles.shotImg}
            />
          </AssetFigure>
        }
      />

      <CaseSection
        heading="Chat answers only from the corpus, and says when the corpus falls short."
        lede={[
          "The daily interface is a conversation with the corpus.",
          "A question gets embedded, and the system over-fetches 20 to 40 candidates from the vector store, since recall is cheap and the reranker judges relevance better than raw distance does. The top 10 go to the model under one standing rule. Every claim cites a named saved source, and when the corpus does not cover a question, the model says so.",
          "That architecture was not there on day one. Chat shipped in week 4 as plain cosine top-k, and the over-fetch and rerank came three months later, after daily use showed a single similarity score could not carry retrieval alone.",
          "Nothing in a conversation is ever overwritten. The first version truncated the thread on edit, and a reload could interleave stale and new messages. A conversation graph replaced it, with sibling branches, a version pager, and branch-from-here on any message. An outline rail with AI topic labels, bookmarks, and an auto-sort that only proposes (preview, approve, undo) keeps 100-message chats navigable.",
        ]}
        media={
          /* Rescore-panel pass: the standalone branching section folded in
             here — one paragraph + the branch figure; the graph earns a
             rejected-alternative beat (the truncate-on-edit bug is dated in
             the repo's own migration notes). */
          <>
            <AssetFigure
              label="The machine, drawn"
              aspect={2232 / 867}
              naturalWidth={2232}
              caption="Over-fetch wide, rerank hard, ground every claim in a named source, or say the corpus doesn't cover it."
            >
              <img loading="lazy"
                src="/case-studies/knowledge-os/kos-ask-flow.webp"
                alt="Flow of how the Ask AI chat sources and answers user questions: a question is embedded, the system over-fetches 20 to 40 sources from the corpus, re-ranks them, and sends the top 10 to the model, where every claim is sourced, ending in a cited answer. The corpus band beneath notes every source embedded and scored, with gap analysis and decay review helping rank results."
                className={styles.shotImg}
              />
            </AssetFigure>
            {/* Placement pass 2026-07-27: the machine above, running — the
                P1-pattern demo loop. 2x speed, cut from Andrew's recording. */}
            <AssetFigure
              label="The machine, running · 2×"
              unframed
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
            {/* Rescore pass 2026-07-29 (panel fix 4): tight crop of the same
                capture (kos-branch-converge-crop, original kept) — the gap
                admission and the converge bar, legible at scan scale. The
                research panel moved up to the gap-analysis section. */}
            <AssetFigure
              label="A conversation, branched · live"
              unframed
              aspect={1986 / 1625}
              naturalWidth={1986}
              caption="Nothing is overwritten, and when two branches converge on the same three sources, the system offers one grounded synthesis. The answer above does the honest thing too: it names what the saved links don't cover."
            >
              <img loading="lazy"
                src="/case-studies/knowledge-os/kos-branch-converge-crop.webp"
                alt="A real answer opening with One Critical Gap ('your saved links do not cover how to handle sellers who do not accept USDC or crypto payments'), above a Resources list and six Referenced Resources cards with match percentages. At the bottom, a bar reads: two branches converge on 3 shared sources, with a Synthesize button."
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
        heading="Extractor routing lives in a database table, so tools swap without a deploy."
        lede={[
          "Extraction is adversarial. Platforms wall off content, public APIs add challenge screens, and managed builders drop system dependencies without warning. When a tool fails, the save still lands, flagged and incomplete, and every platform's extractor chain ends at the same universal fallback.",
          "That routing table is why each swap was a single row change. Over five months a YouTube bot wall, a Turnstile challenge on the public cobalt API, and two managed builders dropping yt-dlp and ffmpeg from the deploy each forced a replacement. Almost none of the pipeline's tools are the ones it started with, and every tool call is logged with its duration and cost.",
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
        heading="Two failures in June, both caught by measurement rather than by noticing."
        lede={[
          "An audit caught a schema change that had silently broken chat retrieval. For a stretch of time, every question drew zero context from the corpus. The grounding rule is why nobody got a wrong answer: with no sources to cite, the system said the corpus did not cover the question instead of improvising.",
          "The same month, measurement caught the scorer burying good design work. A study I would rate a 9 sat at 0.30 on the 0-to-1 value scale, and only 5% of design links ever reached HIGH against a 20% target. The fix started with an eval harness rather than a prompt edit. A 50-link gold set, then a rubric rewrite, then re-measurement. Design links now clear 40%, and the floor moved up with the ceiling.",
          "Both failures ran for weeks without being visible in normal use. The instrumentation is what surfaced them.",
        ]}
        media={
          /* Rescore pass 2026-07-29 (panel fix 3): the study's most senior
             artifact leaves the narrow slot for full width, and the caption
             bridges the figure's gold-set recall to the copy's HIGH-share so
             both numbers read as one fix measured two ways. */
          <AssetFigure
            label="Measure first, then fix"
            aspect={640 / 300}
            naturalWidth={640}
            caption="Recall of high-worth design work on the 50-link gold set, before and after the rubric rewrite: about 8% to about 63%. The 5% to 40% in the copy is the share of all design links reaching HIGH, the same fix measured two ways."
          >
            <ScoringRecal />
          </AssetFigure>
        }
      />

      {/* CLOSER — Platform One's closer layout: standard section split, copy
          left with a bolded retro line last, two drafting-grid stat cards
          right; the evolution timeline hangs below full-width. */}
      <CaseSection
        heading="In production since day two, still compounding five months later."
        lede={[
          "Knowledge Hub is live: 865 commits and 249 merged PRs between February 23 and early July, a corpus measured at 4,339 sources in late July and still growing, cited chat on top, and 12 agents on call.",
          "What changed for me is the part I did not build a metric for. Before, I bookmarked things and forgot them. Now I review far more than I did, I can retrieve something weeks after saving it, and the chat is where I start when I take on a new project or an unfamiliar topic. The system reads everything so the things I read closely are chosen rather than whatever surfaced that day.",
          /* Guest-view pass 2026-08-03 (audit finding #16): the paragraph
             now names what the constraint forced, and the claims are read
             straight from knowledge-hub's proxy.ts — default-guest gate,
             owner cookie, edge 403 on /api, guest tree skipping AppShell.
             Andrew-approved draft, tightened. */
          <span key="guest">
            There is a guest view, and{" "}
            <a
              href="https://hub.andrewmarks.design/guest"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.liveLink}
            >
              you can open it
            </a>
            : friends, coworkers, and anyone reading this can browse the
            corpus, today&apos;s brief, the analytics, and an example chat,
            without writing to anything or running agents. Designing a
            read-only surface for people who did not build the system was its
            own problem. The gate defaults every visitor to guest and
            recognizes me only by a cookie, so a mistake fails closed. Every
            action in the app is a POST, so a guest gets a 403 at the edge,
            not a hidden button.
          </span>,
          <strong key="rule">
            Every AI product I design follows the same rule: ground the answer
            or say you cannot. Knowledge Hub is where I hold myself to it, on a
            system where I am the only person it can fail.
          </strong>,
        ]}
        media={
          /* Andrew's Figma revision 2026-07-29: his card pair — the corpus
             total and the weekly rate — with his method note beneath. */
          <div>
            <StatCards>
              <StatCardImg
                src="/case-studies/knowledge-os/kos-stat-sources2.webp"
                alt="Stat card: sources added and scored, 4,339."
              />
              <StatCardImg
                src="/case-studies/knowledge-os/kos-stat-weekly.webp"
                alt="Stat card: average new sources per week, about 300."
              />
            </StatCards>
            <p className={styles.statNote}>
              {"// LINKS SAVED AND ADDED TO THE CORPUS AS OF 7/27 + AVG NUMBER OF NEW SOURCES PER WEEK"}
            </p>
            {/* Guest-view pass 2026-08-03 (Andrew's placement call): the live
                capture sits under his card pair, in the column beside the
                paragraph that claims it (audit #16 — the study's one
                design-craft claim finally has pixels). Brief page chosen on
                purpose: it shows no corpus total, so the capture can never
                drift against the study's dated numbers the way the 4,250
                diagram did. */}
            <div className={styles.closerGuestFig}>
              <AssetFigure
                label="The guest view · live"
                aspect={3200 / 2000}
                naturalWidth={3200}
                unframed
                caption="The guest Brief, August 3: ten links across five topics, the highest-priority unread reading beneath, and the read-only badge by the wordmark."
                sub={
                  <a
                    href="https://hub.andrewmarks.design/guest"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.liveLink}
                  >
                    Open it yourself: hub.andrewmarks.design/guest
                  </a>
                }
              >
                <img loading="lazy"
                  src="/case-studies/knowledge-os/kos-guest-brief.webp"
                  alt="The Knowledge Hub guest view, Brief page. The header carries the Knowledge Hub wordmark, a GUEST VIEW · READ ONLY badge, and nav for Brief, Knowledge, Chat, Agents and Analytics. A date stepper reads Aug 3, 2026. Today's digest lists ten links: Agentic Coding 3 links, Design 4, Business 1, Research 1 and Game Design 1, each topic with its top item and score. Below, Top unread reading ranks articles by priority with scores in the high 80s."
                  className={styles.shotImg}
                />
              </AssetFigure>
            </div>
          </div>
        }
      />

      <section className={`content ${styles.closerFigures}`}>
        {/* Andrew's Figma revision 2026-07-29: his redrawn timeline replaces
            the SVG SystemEvolution (deleted, git-recoverable). The export is
            self-captioned, so no caption prop. */}
        <AssetFigure
          label="Five months, zero to compounding"
          aspect={3936 / 1305}
          naturalWidth={3936}
        >
          <img loading="lazy"
            src="/case-studies/knowledge-os/kos-evolution-timeline.webp"
            alt="Corpus growth chart from February to late July: a curve from zero at the first commit through 627 at the gap agent's first run on March 30, about 1,000 sources and 960 signals on April 14, 3,241 on June 16, to 4,339 measured July 27, with milestone flags for the capture bot deploying February 23, chat with RAG on March 17, agents going manual May 7, and rerank plus branching June 20 to 23. A footer reads: every point measured and dated, repo docs through June, the product's own analytics for July 27."
            className={styles.shotImg}
          />
        </AssetFigure>
      </section>

      <UpNext
        title="Platform One AI Assistant & Chat Bot"
        desc="Designing an AI assistant projected to cut support tickets by 40%"
        href="/case-studies/platform-one"
      />
    </>
  );
}
