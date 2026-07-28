# ChatVET + Knowledge OS — Asset & Facts Checklist

Status 2026-07-19: both studies rebuilt per their 4-lens audits (career-strategy 004/005): restructured narrative, stats strips filled where facts exist, drafted SVG figures with DRAFT tags where numbers are pending. Same system as P1: every figure is a self-contained TSX in `content/cv/` or `content/kos/`, framed + captioned + zoomable.

## ChatVET

### Drafted figures ✅
- [x] CaseStallTimeline (S1) — ⚠ per-stall minute costs pending session notes
- [x] TwoHourSearchTrail (S2, dark) — the agitation peak
- [x] GhostedEhrMap (turn) — THE seniority figure
- [x] SameQuestionCompare (trust, incl. refusal state)
- [x] LabInterpreterFilmstrip / MedCalcCrop / HandoutBeforeAfter (workflows)
- [x] TwoHoursTenSeconds (closer callback) — ⚠ survey n pending

### Real images — status 2026-07-27 (post 7.3 re-score)
- [x] Lab interpreter upload-confirm + analyzed results + printed discharge handout —
      LANDED (`cv-lab-upload-confirm/-lab-results/-discharge-printout.webp`), unanimous +2
- [ ] **Re-shoots wanted**: dose calc, upload-confirm, discharge steps as TIGHT dialog
      crops on a light surface — the dimmed-modal-on-blur versions read as grey
      rectangles at scroll speed (skim judge)
- [ ] **Reconcile**: the printed handout lists aluminum hydroxide that step-one's
      medication list doesn't offer — re-shoot either side so the one-case story
      survives a close read
- [ ] Stall diagram re-export vs the 003 ledger — SIX panels have flagged it; corrected
      per-card numbers sit ready in `.claude/research/003-chatvet-stat-provenance.md`
      (or strip the numbers and let the four stalls stand qualitatively)

### Facts needed from Andrew (audit-blocking, not fabricated)
1. **Timeframe** — months + year for the strip cell (currently "dates pending")
2. **Role/team confirmation** — "sole designer"? lead? exact team shape ("2 founders · eng team · me"?)
3. **Research n** — how many DVMs/techs in interviews + case walkthroughs; survey n for the 15-min self-report
4. **Clinical accuracy validation** — what actually happened pre-launch (DVM review? against source texts?) — the audit calls this the one unforgivable silence; one honest sentence needed
5. **Testimonial attribution** — name + clinic w/ permission, or concrete anonymity ("DVM, three-doctor small-animal practice, Alabama")
6. **Merck licensing status** — "powered by" vs "licensed content from" (liability check)
7. **"500 monthly users"** — population (veterinary professionals?) and source (analytics?)
8. **The wedge constraint** — 4-word honest version ("two-person eng team, no records-migration path"?)

## Knowledge OS — SHOT LIST (rewritten 2026-07-27 after the 7.5 re-score)

All five FACTS-PENDING items from the old list were answered by the repo audit
(ledger: `.claude/research/004-kos-repo-audit-provenance.md`). What remains is
captures + DB exports. Every judge's #1: real product pixels, ARGUED — each
capture gets a caption naming the design decision it demonstrates.

Naming: `public/case-studies/knowledge-os/kos-*.webp`, ≥2880px wide.
Shooting rules (learned from the ChatVET panel): tight crops, light surface,
NO dimmed-modal-on-blurred-backdrop (they read as grey rectangles at scroll
speed), no browser/localhost chrome. Pick corpus rows/chats you're happy
showing publicly.

### ⚡ TRIAGE 2026-07-27 — Andrew shot 19 captures (Figma section 7024:1851, "Personal OS captures")
Fills most of the list below. Placement plan (agreed shots → slots):
hero ← **chat with sources** (inline bold citations + Sources-23 rail + "answers are
generated from your saved links" footer) · S1 ← **stats 1** (TOTAL LINKS **4,339** ·
93% extraction · real 12-week Ingestion Pace — retires CaptureVolumeChart AND supplies
the fresh-corpus + weekly-pace exports) · trust ← **score example** (tooltip open:
"Value 69 / Priority 72 Claude's quality rating / Novelty 29 fresh vs corpus" — retires
TrustRowCrop) · corpus-admits ← **gap example** full-width (LIVE Jun 24 gap: 8+ thin
subtopics at 0.82–0.92 priority + Ask-AI/Research/Draft buttons — the Mar 30 story,
still happening; GapCatchCard stays as the dated record) · chat ← RagArchitecture kept +
**chat research suggestions** replaces RefusalCrop (it IS the shelf-filler panel the
caption describes) + **chat with bookmarks and branching** replaces BranchGraphFigure
(converge-on-3-shared-sources bar + bookmarks rail + a mid-answer "your saved links do
not cover…" gap admission). Numbers refresh: 4,339 (Jul 27) solidifies SystemEvolution's
dashed tail, SystemMap band, hero/closer copy. Bench (Figma-only for now): chat home
(folders/auto-sort/often-ask chips), chat with outline, chat with tools open, chat end
with sources (match-% cards), link details, Optimize (511-item review queue), digest,
top unread, 65-links-yesterday modal, stats 2.
STILL WANTED: a true corpus-empty refusal · the ◀ n/m ▶ version-pager close-up · the
Telegram two-step (phone) · GIFs (P1-style): 1) branch-flip via pager — whole thread
swaps, nothing lost; 2) research round-trip (Tools → suggest → run → "Topics researched"
lands back in the thread), sped up.

### A · Captures to shoot (priority order — what each replaces)

| # | Capture | Replaces | What must be visible |
|---|---|---|---|
| 1 | **kos-hero-chat.webp** — THE HERO | the hero `PlaceholderBox` | The signature move: a real question mid-answer with inline citations to named saved sources + the Resources section. Judges: this image "must carry enormous weight" — the recall hook is *the AI that cites instead of bluffing*. |
| 2 | **kos-refusal.webp** | `RefusalCrop` (drawn) | A real "your corpus doesn't cover this" reply. Bonus frame: Tools menu open showing Research — makes the one-click shelf-filler claim visible instead of asserted. |
| 3 | **kos-trust-row.webp** | `TrustRowCrop` (drawn) | The Knowledge table with the 0–100 value badge AND the hover tooltip open (priority + written reason, novelty, percentile). If possible, a failed-extraction row in frame (never-dropped evidence). |
| 4 | **kos-branch-pager.webp** | `BranchGraphFigure` (drawn) | A real thread with the ◀ n/m ▶ version pager visible on a message, outline rail on the right. If both can't be legible in one shot, pager close-up first; optional second shot `kos-outline-rail.webp`. |
| 5 | **kos-gap-signal.webp** | pairs with `GapCatchCard` | A real gap proposal in /insights — ideally THE Agent-Security signal from the Mar 30 run if it's still in agent_proposals. The drawn card stays as the dated record; the UI shot proves the surface exists. |
| 6 | **kos-telegram-reply.webp** | right panel of `CaptureBeforeAfter` | Real Telegram two-step: URL send → "Saved ✓ — processing…" → "✓ Title · Space · Topic · ⭐score". Crop tight to the exchange. |
| 7 | **kos-autosort-preview.webp** (optional) | none — new, chat section | The auto-sort preview modal mid-plan: checkboxes + proposed folders + nothing applied. Visible proof of preview-then-apply. |

### B · Keep as drawn — do NOT replace (judges: diagrams outperform screenshots here)
- **SystemMap**, **RagArchitecture**, **TechStackMap** — true architecture
- **ScoringRecal** — data chart from the repo's own eval docs
- **SystemEvolution** — dated data chart (wants an export, not a photo)
- **GapCatchCard** — the dated Mar 30 record; revisit only after #5 exists

### C · DB exports (numbers, not images — pin each in a dated tracked doc)
1. Weekly capture counts, last 12 weeks → real bars for `CaptureVolumeChart`
2. Fresh corpus total + date → solidifies `SystemEvolution`'s dashed tail, the
   SystemMap corpus band, hero copy, closer stat card (restores 4,000+ if real)
3. Agent-signals total → substrate lede (replaces/updates the ~960 @ Apr 14 anchor)
4. One deep-reading-capacity number → `CaptureVolumeChart` capacity line + S1 copy
5. (Stretch) the grounding spot-check the judges keep asking for — "30 questions,
   28 cited, 2 declined" shape; an afternoon, closes the last evidence hole

## Cross-portfolio (from 005)
- "citations instead of confidence" now lives ONLY in KOS ✓ · "wedge" owned explicitly in ChatVET as "the same wedge playbook I ran at Platform One" ✓ · P1 keeps institutional trust + funding wedge ✓
