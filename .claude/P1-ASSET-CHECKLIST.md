# Platform One Case Study — Asset Production Checklist

Status 2026-07-18: every buildable visual now EXISTS as a drafted code figure (inline-SVG React components in `src/components/case/content/p1/`, framed + captioned via `AssetFigure`). Draft figures use representative data and carry visible `// DRAFT` tags where Andrew's real numbers are pending. Remaining work = swap facts in, replace the two figures that want real screenshots, produce the one real photo-grade hero.

## Built (typographic — no image needed) ✅
- [x] **Stats strip** — Role / Timeframe / Team / Scope (real values)
- [x] **CST-lead quote strip** (S2) — ⚠ wording needs Andrew's verification against what she actually said
- [x] **Security-event vignette** (S2) — dark full-width card
- [x] **Stat tiles + audit note** (closer) — −40% · ~1 FTE · 2 turns

## Drafted as code figures ✅ (swap/refine, don't start from zero)
- [x] **HeroAssistantMock** (hero slot) — wireframe browser + widget mid-answer with citation. *Stand-in: the hero remains the one image worth a real product-marketing shot; figure carries "SWAP FOR PRODUCTION SHOT" tag.*
- [x] **IaPathDiagram** (S1 lead) — click-depth map, 5-click accent path, 2 dead ends, dashed direct path. ⚠ confirm "5 clicks · 2 dead ends" traces a real session.
- [x] **TwoTurnEscalationFlow** (S3 full-width) — question → sourced answer → turn-2 loop → resolved? → soft CTA → routed by type.
- [x] **CitedAnswerCloseup** (S3 detail) — representative exchange, citation chips, follow-ups.
- [x] **PostureWidget / PostureDevFullscreen** (S4 pair) — same question, two postures. *Optional upgrade later: real screenshots or the expand-transition clip.*
- [x] **VuetifySpendMap** (S5) — ⚠ "~80% stock" tagged DRAFT pending real tally.
- [x] **WidgetReskinBeforeAfter** (S5) — vendor-blue before / house-language after + 3-row gap table. No vendor name.
- [x] **TicketTaxonomyChart** (closer) — ⚠ counts (60/55/14/12/9 of n=150) are DRAFT placeholders pending the original audit tally; tagged in-figure.
- [x] **PhasedLaunchTimeline** (closer) — staging→SSO→CtF→public→custom front-end; ⚠ TODAY marker tagged DRAFT pending phase confirmation.

## Real images still wanted
- [ ] **HERO production shot** — replaces HeroAssistantMock when a polished product shot exists (doubles as home-card image).
- [ ] **BURIED_ANSWER_SCREENSHOT** (S1, 480/322 — the only placeholder left on the page) · p1.dso.mil is public, real screens OK.
- [ ] *(Optional)* real screenshots to replace the two posture wireframes.

## Facts needed from Andrew
- CST-lead quote exact wording · spend-map real stock/custom tally · taxonomy category counts from the audit · current launch phase (today marker) · whether the re-skinned widget is live today · confirm the 5-click/2-dead-end trace.

## How to update a figure
Each figure is one self-contained TSX file — edit numbers/labels directly, no build tooling beyond `npm run build`. Palette/type/geometry conventions: scratchpad `p1-figure-style-spec.md` (session) or infer from any figure file. Keep ids prefixed per-file; keep orange = one meaning per figure; keep DRAFT tags until numbers are real.
