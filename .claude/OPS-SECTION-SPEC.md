# "Operating Record" — Section Spec (design-panel synthesis, 2026-07-19)

Home-page section between CaseStudies and ResumeSection for the non-visual, measured achievements (research ops, sourcing, cross-team OKR alignment, startup hiring). Chosen approach: **in-place expanding ledger** (native `details/summary`), grafted with the ledger approach's at-rest completeness and the modal approach's readout treatment. (Full design-panel record archived off-repo.)

## Shape
- `src/components/site/OperatingRecord.tsx` (server component, `RECORDS` data array) + module CSS + ~40-line enhancement-only client child. Insert in `page.tsx` between CaseStudies and ResumeSection; section owns `padding-bottom: 72px`; brings its own full-bleed divider (ResumeSection recipe) — CaseStudies' vrule overshoot terminates on it with zero upstream edits.
- Header: visually-hidden h2; visible mono kicker `OPERATING_RECORD` + `// 04 RECORDS ON FILE`. Intro in .desc voice: "Systems I built so teams could move — research operations, hiring, and alignment machinery. The operating layer AI teams run on." Never print "multiplication through others" (rubric jargon).
- `<ol>` of `<details name="operating-record">` (exclusive open), summary = whole row. **Hard cap 4 records (5 max).** Row separators content-width 1px soft-rule (no overhang — subordination to case studies is structural). Interior vrules continue through the band.

## Row anatomy at rest (everything a non-clicker gets)
index · **VALUE** (P1 .tileValue recipe, deliberately smaller than case numerals) + unit · LABEL (SCREAMING_SNAKE mono, not a heading) · CLAIM (≤160 chars, survives alone as a resume-grade bullet) · SCOPE (mono caps, ≤3 //-joined segments: studies/teams/years — the breadth evidence, never click-gated) · BRIDGE ("→ In AI terms:" mono prefix, accent-deep arrow, plain-English sentence) · `// src:` provenance tag (**required field — no defensible source, no ship**) · `[+] RECORD` bordered chip (matches ENLARGE grammar).

## Readout (expanded, 120–160 words hard cap)
SITUATION → EXECUTION (must name the through-others mechanism: who was enabled, what they could do afterward) → MEASURED RESULT → "→ FOR AI TEAMS" block (2px accent left border — the section's only orange besides focus) → real-text provenance sentence ("figures are counts, not estimates"). Optional `SEE ALSO →` slot for a v2 `/operating-record` route (per-story URLs, roadmap only).

## Interaction / a11y
Native details/summary; JS enhancement-only (fully functional without it). Exclusive open via `name`; Esc closes + refocuses (unadvertised); scroll compensation when an above record closes (`scrollBy` same-frame — test vs scroll anchoring); deep-link ids (`rec-user-sourcing`…) opened on hash; find-in-page auto-expands (Chromium); `beforeprint` opens all. Focus-visible ring on full row; `//`-lines and chips aria-hidden; summary accname reads value→label→claim→scope→bridge. Motion: instant base; `::details-content` block-size 280ms crisp curve ONLY under `@supports (interpolate-size: allow-keywords)` + no-preference (Safari/FF instant — canon-compatible).

## Mobile (<640)
Restack: index+LABEL / value / claim 16px / scope / bridge / src; readout single column; whole row = tap target; vrules hidden.

## Copy QA bar (per record)
Claim survives alone; number has a source Andrew could produce in a phone screen; scope states measurable breadth; bridge is plain English; **every number matches the resume PDF exactly** (three numeric surfaces — summary, readout, PDF — must never drift).

## Blocking inputs from Andrew
The 3–5 real records with values + producible sources; the through-others mechanisms; provenance publishability (NDA check) + fallback wording; which record gets cut; bridge-at-rest vs readout-only (~800px vs ~680px band); kicker register (`OPERATING_RECORD` vs `OPS_RECORD`) + intro sentence sign-off; modal formally dropped or held as fallback; motion inconsistency tolerance.

## Key risks (from the panel)
Copy is the ceiling (most visitors never open anything); affordance discoverability on home (grammar pre-taught only on case pages); scroll-compensation fragility; honesty-idiom drift across three numeric surfaces; accordion degradation if records/copy grow; KPI-strip misreading by skeptics who don't open readouts.
