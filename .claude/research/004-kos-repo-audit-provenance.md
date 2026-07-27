# Knowledge OS — repo-audit fact ledger (knowledge-hub @ main `ae8cb54`, 2026-07-07)

**Read before touching any Knowledge OS number or figure.** Produced 2026-07-26 by an
11-agent audit of the freshly cloned `knowledge-hub` repo (7 miners over git history /
docs / pipeline / agents / chat / surfaces, 3 claim verifiers, 1 completeness critic;
~1.3M tokens, 495 tool calls). Every claim in the case study was checked against code on
main, dated docs, and 865 commits. Raw per-agent output lived in session temp (gone after
this session); this ledger is the durable record.

## The ground truth in one paragraph

First commit **2026-02-23**; deployed to Railway **day 2** (`railway.json`, baa7d59
2026-02-24). 865 commits, 249 PRs, 73 migrations on main, last merge **2026-07-07**.
Solo — every commit is Andrew (+10 by Claude on early cloud branches). ~56k LoC
TS/TSX, 141 API routes, 30 pages, 12 registered corpus agents (+2 image agents).
The system was **in production from week one**; "4 months to production" inverts the
real story.

## Numbers ledger

| Case-study claim | Verdict | What the repo supports |
|---|---|---|
| "300–400 sources a week" (hero, strip, S1) | **UNSUPPORTED** | No repo record. Dated docs: "a dozen links a week from my own Telegram submissions" + research agent "100+ links a week" (content/023, 2026-04-05); "I save 30+ links a week, I read maybe 5" (content/041, 2026-04-16). Derived average **~263/wk** between dated snapshots 1,214 (Apr 23) → 3,241 (Jun 16). Portfolio's own CV-KOS-ASSET-CHECKLIST already flagged the number as "strains belief unexplained." Use "hundreds a week" / ~260 avg unless Andrew exports fresh logs. |
| "corpus past 4,000" (hero, strip, closer, RagArchitecture band) | **PLAUSIBLE, DB-ONLY** | Largest dated count: **3,241 links measured 2026-06-16** (`.claude/PRD-classification-multimodel.md:83`). At the recorded ~263/wk it crosses 4,000 ~Jul 5. Say "3,200+ measured mid-June, past 4,000 on that trajectory" or get a fresh export. |
| "mid-May, 1,900 sources" | PLAUSIBLE, DB-ONLY | Interpolation 1,214 (Apr 23) → 3,241 (Jun 16) passes ~1,900–2,000 mid-May. No record. |
| "3,400+ signals … nearly two per source" | **CONFLICTS** | Only recorded ratio: **~960 signals at ~1,000 links ≈ 1 per source** (~900 connections ≥0.60 + ~60 contradictions ≥0.65, content/039, 2026-04-14). "Nearly two per source" would need the ratio to double with no record. Use the Apr 14 anchor. |
| Gap-catch: "five security subtopics **I'd rated** maximum priority, with **eight links between them my reading never surfaced**" | **INVERTED, TWICE** | Source (content/003, 2026-03-30 + content/040, 2026-04-16): first gap run, corpus at **627 links**, found **16 gaps**; headline: five security subtopics (Agent Security, API Security, Server Security, Data Safety, Agent Safety Architecture) all at the **corpus-max 0.85 priority** with **only 8 saved links TOTAL between them** — 8 = thin existing coverage, not discovered cross-links. And the 0.85s were **machine-assigned at ingest** (Haiku), predating the run — which *upgrades* the anecdote: the system's own scoring said "this matters" while coverage was nearly empty, and nobody had noticed. Names are public in the repo; no need to redact. |
| "4 months to production · shipping weekly" | **INVERTED / STALE** | Production from day 2. Span Feb 23 → Jul 7 ≈ 4.5 months. Cadence: weekly through May 7 (one zero week, Mar 9–15), then ~10-day silences + bursts (zero weeks May 18–24, Jun 8–14, Jun 29–Jul 5); **silent since Jul 7** (the Jul 16 wipe intervened). Truthful shape: "deployed in week one, then four-plus months of compounding — 865 commits, 249 PRs." |
| "over-fetches 20 to 40 … top ten go to the model" | **SUPPORTED** | `chat/route.ts:193-194`: retrieve 20 normal / 40 deep-dive, feed 10 / 15, display 6. Reranker = **Voyage rerank-2.5**; embeddings voyage-3 1024-dim; landed **2026-06-20** (PR #232) — chat existed from **2026-03-17** as plain cosine top-k. |
| Grounding rule | **SUPPORTED** | `chat/route.ts:52-53`: "Ground every claim in a specific saved link… If the saved links don't cover the user's question, say so honestly." Mandatory `## Resources` section. |
| Refusal "offers to go fill the shelf" | **NOT ON MAIN** | No auto-offer, no Run Research/Skip chips on refusal (grep zero). Research is user-invoked: composer **Tools menu → Research panel** (suggest-from-conversation via Haiku, per-topic Exa runs, summary injected back into the thread as an assistant turn). Honest line: the shelf-filling tool sits one click away in the same chat. |
| Branching claims (sibling branches, version pager, branch-from-here) | **SUPPORTED** | Migration 072 tree (parent_message_id), get_chat_path, active-leaf CAS; pager both roles; branch-from-here on any message. Landed 2026-06-22/23 (PRs #239/#240). Bonus not in study: **converge-by-citation** (PR #242) — detects branch pairs citing ≥2 shared sources, offers a grounded synthesis turn. |
| Outline rail / AI labels / bookmarks / folders / auto-sort | **SUPPORTED** | Migrations 070/071/012; auto-sort is **plan-only preview → apply → undo** (Haiku over title + first question), merged PR #247 **2026-07-07** — the last feature ever merged. |
| "agents that run on demand" | **SUPPORTED (current), WAS CRONS** | Weekly Sonnet crons Mar 30 → cost ~$8/wk → made manual May 7 (PR #179) — but migration 062 used **wrong cron job names and silently did nothing**; migration 067 (2026-06-16) actually unscheduled them. Sole surviving cron: daily/weekly Haiku digest ~$0.10/wk. |
| "decay state (active, aging, stale)" | **SUPPORTED** (data layer) | Migration 015. `aging` auto at ingest (≥5 newer saves in topic+space); `stale` only via manual Sonnet decay review (Settings). Caveat: the modal decay badge is gated behind a flag no caller enables — barely user-visible. Not time-based; time freshness is a separate read-time multiplier (reading_score = priority × freshness × novelty, PR #180). |
| "novelty score against everything already saved" | **PARTIAL** | Novelty = 1 − max cosine sim **within the same Space**, frozen at ingest; images skip embedding (null novelty). Connections are corpus-wide; novelty is not. |
| "failed extraction shows on the row … retry next to it" | **PARTIAL** | Never dropped (`extraction_status='failed'` rows persist). Real retry surfaces: Telegram `/retry N` / re-send URL; **Re-ingest button inside the row's detail modal**; transitive-ingest rows have true inline Retry; Settings batch retry. The main table row itself shows no inline retry chip. |
| "score with an inline reason" | **PARTIAL** | Row shows composite **value badge 0–100** (priority + 0.15·(novelty−0.5) + 0.05·(percentile−0.5)); the reason is on **hover** (tooltip) and in full in the modal + Telegram. No 7.8/9.1-style two-chip render exists (TrustRowCrop's scales were wrong). |
| "attention shifting" as gap-report output | **WRONG SUBSYSTEM** | Gap agent emits gap_description/significance/suggested_queries. Attention signals (rabbit_hole/blind_spot topics) are a separate `/api/admin/corpus-signals` endpoint with no UI consumer. |
| "per the pipeline's own capture logs" | **NO SUCH ARTIFACT** | No capture-log table. Weekly volume = links.created_at bucketed by ISO week (Analytics "Ingestion Pace," last 12 weeks). `tool_runs` logs every extractor attempt with duration_ms — a real latency/volume export is derivable. |
| "seconds later … summarized, scored, embedded" | **PARTIAL** | Async pipeline live since 2026-04-04: instant "Saved ✓ — processing…" ack, background completion message ("✓ Title · Space · Topic · ⭐0.8"). April docs claim "six seconds end to end"; no current measurement. |
| "~12 corpus agents" | **SUPPORTED** | Exactly 12 registered (3 independent in-code lists) + 2 image agents outside the roster. |
| "built solo" | **SUPPORTED** | git shortlog: one human. |

## FACTS-PENDING (case-study header) — now answered

1. **Capture mechanism**: hand-picked + machine-expanded. No RSS/feeds/newsletters
   anywhere. Entry points: Telegram sends, web AddLinkModal, gallery add/paste,
   opt-in transitive ingest of referenced links (migration 047), research-agent Exa runs
   (capped 10 URLs/run, ~80% auto-promote quality gate). Every capture is human-initiated.
2. **Grounding eval**: none exists — do NOT claim one. Evals that do exist: classification
   (n=20, PR #219/#221) and scoring (n=50 gold set, PR #226).
3. **Score-calibration story**: fully documented, the study's best instrumentation proof.
   Baseline on 987 Design links: **5.0% reached HIGH vs 20% target, 95% capped ≤0.74**;
   built the eval harness FIRST, independent-labeler gold set n=50, rewrote the Design
   rubric (migration 068) + exempted visual topics from the novelty dock →
   **HIGH-worthy recall ~8% → ~63%**, junk over-reward 0% → 0%, known leak ~10%
   (2 inspiration boards). "A polished case study I'd have called a 9 was sitting at 0.30"
   (content/042). Quote: "A fix you can't measure is a fix you'll quietly re-break in
   three months and never notice."
4. **Security-gap priorities predated the run**: yes — assigned at ingest, machine-rated
   (see numbers ledger).
5. **Judgment beat**: best documented candidate — **migration 045 dropped `links.author`
   and silently broke `search_links_for_chat`: every chat question retrieved zero context
   until the June 16 audit caught it (fix: migration 064)**. The grounding rule made the
   failure honest — the system said "the corpus doesn't cover this" instead of making
   things up. Alternates: retrieve=feed=display all pinned to 10 pre-rerank (content/043);
   cron unschedule that silently no-op'd for 6 weeks (062→067); v1 "the corpus only grew
   when I was actively feeding it" (content/015).

## Corrected milestone timeline (for any evolution figure)

| Date | Milestone |
|---|---|
| 2026-02-23/24 | Telegram bot + ingest + digest; **deployed to Railway day 2** |
| 2026-03-02 | pgvector embeddings + synthesis + connection detection |
| 2026-03-17 | **Chat with RAG** (plain cosine top-k) |
| 2026-03-23 | Agent substrate M3–M10: novelty, decay, Obsidian sync, correction UI |
| 2026-03-29–31 | Connection/contradiction/gap/topic-synthesis agents (weekly crons); first gap run Mar 30: 627 links, 16 gaps, the security catch |
| 2026-04-08 | 12th agent (multi-critique); brand redesign |
| 2026-04-24–28 | Tool registry (11 tools, fallback chains); media platform; gallery; **yt-dlp/Dockerfile fight — 16 PRs in 2 days**; builder Nixpacks→Railpack→Nixpacks→**Dockerfile** |
| 2026-05-06/07 | Cost reversal: billing alerts, agents made manual (~$8/wk → $0), reading_score; R2 branch built (never merged) |
| 2026-05-26 | Research from chat (panel, suggestions, summary-back-into-thread) |
| 2026-06-04 | Guest view: fail-secure read-only share (all /api 403 for guests) |
| 2026-06-16 | Governance day: audit, migration recovery, dead-code purge (−1,225 lines), cron fix 067 |
| 2026-06-17/18 | **Scoring recalibration** (eval-first, 8%→63%); classification evals; chat cost cut (caching + tiered Haiku/Sonnet) |
| 2026-06-20 | Over-fetch + rerank retrieval (Voyage rerank-2.5) |
| 2026-06-22/23 | Conversation graph: branching, pager, outline rail + AI labels, bookmarks, export, **converge-by-citation** |
| 2026-07-06/07 | Chat organization: folders, preview-then-apply auto-sort — last merge (PR #249 Jul 7) |

Corpus anchors: 627 (Mar 30) → ~1,000 + ~960 signals (Apr 14) → 1,214 (Apr 23) →
**3,241 measured (Jun 16)** → 4,000+ extrapolated ~Jul 5 (DB-only).

## Still needs Andrew (or a fresh DB export, pinned in a dated tracked doc)

- Fresh corpus total + weekly-volume export (restores 300–400/4,000+ style claims if real)
- Signals total (the 3,400+ / per-source ratio)
- One deep-reading-capacity number (figure said 15–20/wk; body says "the right ten"; April doc says "maybe 5")
- "In daily use" as of now — no evidence after Jul 7 (wipe intervened Jul 16)
- Whether to mention the unmerged R2 storage branch (Supabase 8GB pressure)
