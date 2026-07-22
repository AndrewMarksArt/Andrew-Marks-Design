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
- [x] ~~PostureWidget / PostureDevFullscreen~~ — REPLACED 2026-07-20 with real product mockups: Posture A = `p1-assistant-widget.webp` (Iron Bank answer), Posture B = `p1-assistant-fullscreen.webp` (How-can-I-help). Drawn components now unused (files kept in git history).
- [x] **VuetifySpendMap** (S5) — ⚠ "~80% stock" tagged DRAFT pending real tally.
- [x] **WidgetReskinBeforeAfter** (S5) — vendor-blue before / house-language after + 3-row gap table. No vendor name.
- [x] **TicketTaxonomyChart** (closer) — ⚠ counts (60/55/14/12/9 of n=150) are DRAFT placeholders pending the original audit tally; tagged in-figure.
- [x] **PhasedLaunchTimeline** (closer) — staging→SSO→CtF→public→custom front-end; ⚠ TODAY marker tagged DRAFT pending phase confirmation.

## Real images still wanted
- [x] ~~HERO production shot~~ — RESOLVED 2026-07-20: hero is now `p1-hero-site.webp`, the real p1.dso.mil site the assistant lives on (from Andrew's asset drop). HeroAssistantMock retired. NOTE: home-card image (public/case-studies/platform-one.png) NOT yet updated — still the old card; swap if desired.
- [x] ~~BURIED_ANSWER_SCREENSHOT~~ — DROPPED 2026-07-20 (Andrew's call): S1 media is now the traced-flow IaPathDiagram alone; its sage ghost nodes carry the buried-answer beat. Zero placeholders left on the page.
- [x] ~~posture wireframes~~ — REPLACED 2026-07-20 with real mockups (see above).
- [ ] *(Optional)* CitedAnswerCloseup (S3 detail) is still the drawn "// REPRESENTATIVE CONVERSATION" — could swap for a real cited-answer crop later; kept drawn this round.
- [ ] *(Optional)* a real "developer doing technical work" full-view shot — the Big Bang working shots bake `registry1` into pixels (see P1-ASSET-SANITIZATION.md); needs a sanitized re-export from Andrew's source if wanted.

## Facts needed from Andrew
- CST-lead quote exact wording · spend-map real stock/custom tally · taxonomy category counts from the audit · current launch phase (today marker) · whether the re-skinned widget is live today. ~~5-click trace confirmation~~ obsolete: S1 diagram rebuilt 2026-07-20 from the verified live-site journey audit (see P1-SITE-FLOW-MAP.md §6 for its remaining open questions — start-state deltas Q1-Q3, security-event page Q4).

## How to update a figure
Each figure is one self-contained TSX file — edit numbers/labels directly, no build tooling beyond `npm run build`. Palette/type/geometry conventions: scratchpad `p1-figure-style-spec.md` (session) or infer from any figure file. Keep ids prefixed per-file; keep orange = one meaning per figure; keep DRAFT tags until numbers are real.
