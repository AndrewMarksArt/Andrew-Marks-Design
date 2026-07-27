# Portfolio full picture — site shell + all three case studies (2026-07-27)

**Sources:** four independent judge panels run 2026-07-26/27 — Knowledge OS (6 lenses),
Platform One (6), ChatVET (6), site shell (6 + objective quality sweep). 31 agents total,
all scored 0–10 (5 = average portfolio, 7 = good, 8 = strong, 9+ = exceptional).
Per-study detail: KOS ledger in `004-kos-repo-audit-provenance.md`; ChatVET stat ledger in
`003-chatvet-stat-provenance.md`; panel raw output was session-temp — the durable record
is this file plus the task-checkpoint entries of those dates.

## Scorecard

| Surface | Mean | Range | Verdict in one line |
|---|---|---|---|
| Site shell | **~7.4** | 7–8 | Distinctive, authored, technically excellent — pitches and never asks |
| Platform One | **~7.4** | 7–7.5 | Strongest study, should lead — sells a forecast, ducks answer-trust |
| Knowledge OS | **7.5** (re-scored 07-27) | 7.5 flat ×6 | After all fixes + stack section, placeholders assumed real — now ties/leads P1; remaining gap is design-vs-engineering balance |
| ChatVET | **~7.3** (re-scored 07-27) | 6.5–7.7 | Real captures landed (+2 unanimous — "a good study became a finished one"); ceiling remains the stall figure vs its own ledger |
| **Portfolio overall** | **~7.2** | | One focused pass away from 8+ |

## The four cross-cutting patterns (both audits found the same shapes)

1. **It pitches but never asks — the last mile is missing everywhere.** Shell: no email,
   no contact block, no availability line, no og:image (shared links unfurl as bare text),
   stock 404. Studies: P1 ends in projection with no staging measurement; KOS has no
   product pixels; ChatVET's payoff capture is pending. The middle of every surface is
   90th-percentile; the final conversion step is unshipped on all of them.
2. **Evidence discipline is the superpower — and it raises the bar on itself.** All four
   panels praised the honesty apparatus (hedges, dated numbers, provenance footnotes) as
   near-unique. Which is why the lapses read double-loud: ChatVET's stall figure printing
   four ledger-refuted numbers under "published benchmarks" (all six CV judges' #1),
   "(dates pending)" / "attribution pending permission" strings, the shell's "appendices
   in progress" plate in the prime post-hero slot.
3. **Identity drift: the words undersell what the evidence proves.** H1 "UX & Product
   Designer" (generic) vs current-role "UX Researcher" vs "Open to short-term contract
   work" vs a research-ops-flavored Operating Record — while three studies argue *senior
   AI-native product designer*. Recruiters leave one notch vaguer than the target.
4. **The through-line exists but is never named.** "Ground it or say you can't" at three
   altitudes — enterprise DoD (P1), shipped clinic product (CV), personal system (KOS).
   P1's missing answer-trust passage is the weld; the shell could name it once where the
   Case Study Status plate now sits.

## What's genuinely working (don't touch)

- The drafting/terminal visual system — "authored, not templated," Figma-node-cited
  geometry, top-percentile motion engineering (boot film, beams, reveals)
- Front-end quality (a11y judge: 8) — landmarks, reduced-motion, contrast math, CLS care
- Card order and metric-led blurbs; the Operating Record's honest-receipts pattern
- P1's 150-ticket hand-coded audit; CV's scope-cut beat; KOS's eval-first scoring story
- Mobile at real 390px is CLEAN — verified via CDP emulation (scrollWidth === 390); the
  clipped captures in this audit were a headless-window artifact, not a defect

## Prioritized roadmap

**Tier 0 — before sharing anything (hours):**
1. Contact + logistics: visible mailto in links grid + footer, one availability line;
   reconcile the "short-term contract" resume line with the senior full-time goal
2. Shareability: `src/app/opengraph-image` (1200×630, hero-plate idiom) +
   `summary_large_image`; per-page OG title/desc/url on the three case pages
3. Purge pending-speak sitewide: CV "(dates pending)" + testimonial attribution;
   replace the Case Study Status plate with a one-line credibility/through-line strip
4. Shipping hygiene: branded `not-found.tsx`, robots.ts + sitemap.ts, canonical, real
   favicon set (+apple-touch), re-gate boot film (Andrew's own layout.tsx TODO), drop
   `keywords`, exclude `/dev/*` from prod

**Tier 1 — the proof pass (days):**
5. KOS real screenshots: hero (cited chat), trust row, refusal, branch pager — every
   KOS judge's #1; moves that study ~6.8 → ~8 on its own
6. ChatVET stall figure — Andrew's call (his Figma export; replace-means-replace): the
   ledger-corrected re-export, or at minimum fix the "Minutses" typo + "0xErling"
   watermarks judges found in the export
7. P1 fixes (approved): answer-trust passage (welds the through-line), replay the 60
   answerable tickets through staging for one measured number, reconcile hero
   "live"/"staging", fix the S5 security-constraints heading mismatch, developer-posture
   capture must show developer work
8. CV hero hedge ("vets report ~15 min") + discharge-document capture shot large/light

**Tier 2 — positioning pass (a day):**
9. Hero identity line (senior + AI + current context); rewrite the About cell; flip the
   OG description so the pitch leads and the electric-sheep line trails; Metronome resume
   row leads with the design work
10. Vary the templated closer (identical retro + 2-stat-cards on all three studies)
11. Card conversion: whole card + title as link, first touch-tap navigates (peek moves to
    scroll-into-view); consider KOS into slot 2 once its screenshots land

**Tier 3 — polish:** NHG font decision (build the Adobe kit or ratify Geist for display),
mobile atlas diet (2.5MB HD sheet gated to desktop), skip-to-content link, Operating
Record skim-layer compression, the hero robot's register (visual-craft judge flagged
ESRGAN-upscaled character art as a borrowed register inside an authored system — brand
call, Andrew's).

## Objective sweep — severity list (shell)

HIGH: boot film ungated on every load (known dev state — must re-gate before merge);
no og:image/twitter:image anywhere.
MEDIUM: stock Next 404 (+ double `<title>` on it); case pages inherit root OG wholesale
(share-preview shows home); robots.txt + sitemap.xml absent.
LOW: two-tap touch cards with no affordance/aria state; `keywords` meta; `/dev/border-bakeoff`
in prod; no skip link; no canonical; 61×61 PNG-as-ico favicon, no apple-touch-icon.
