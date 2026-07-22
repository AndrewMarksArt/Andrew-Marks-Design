# P1 Case Study — Asset Sanitization Record

**Rule (Andrew, 2026-07-20):** the design repo goes public. Scrub/delete any real internal
specifics before any asset ships. This file is the durable record of what was removed and how.

## What counts as "internal specific" (scrub these)
- Internal/infra hostnames beyond the public marketing site: `registry1.dso.mil`, `login.dso.mil`,
  `docs-bigbang.dso.mil`, `docs-ironbank.dso.mil`, `p1docs.dso.mil`, `chat.il*.dso.mil`,
  `grafana.dev.bigbang.mil`, `forms.osi.apps.mil`, etc. → generalize ("the hardened registry",
  "the docs", "the login wall", "the intake form").
- Impact levels (IL-2/IL-4/IL-5), CAC/PIV, AppGate, OCSP, Keycloak realm names, Mattermost, Odoo,
  specific Jira/Confluence/Bitbucket tenancy → generalize or drop.
- Verbatim user/employee quotes carrying company or personal identifiers → paraphrase to a generic
  scenario; strip company names, ticket IDs, dates ("Updated 8/21"), error codes tied to their env.
- Real support-team email addresses, form URLs, internal doc slugs.

## What stays (public, not internal)
- Public P1 product names: Platform One, Iron Bank, Big Bang, Party Bus (all on the public site).
- The public p1.dso.mil marketing hero (astronaut, "Build. Secure. Deploy. }unbound.") and public nav.
- Generic placeholder commands already using `<VM_IP>`/`<ssh_user>`/`<key>` tokens.

## OPEN QUESTION for Andrew (not yet resolved)
The **IaPathDiagram** figure uses public `.mil` hostnames (registry1.dso.mil, login.dso.mil,
docs-ironbank.dso.mil/overview, forms.osi.apps.mil, p1docs.dso.mil) as load-bearing evidence —
all reached via an unauthenticated public crawl, so arguably public IA, not internal secrets.
Left AS-IS pending Andrew's call on whether the same scrub applies there. If yes, the diagram
labels generalize to "the registry / the login wall / the public docs / the intake form" (loses
some evidentiary specificity but stays honest).

## Method note
The mockups in Figma node 6838:387 are **flattened image fills** (rasterized), not editable
text layers — so sanitization here = *selecting shots that are already clean*, not scrubbing
pixels. The three shots below were chosen precisely because they carry no internal specifics.

## Asset-by-asset log (2026-07-20)

| Asset (public/case-studies/platform-one/) | Source node | Sensitive strings? | Action |
|---|---|---|---|
| `p1-hero-site.webp` | 6838:367 HERO@2x | None — public p1.dso.mil marketing hero + public nav | Used as-is → case-study hero |
| `p1-assistant-widget.webp` | 6837:354 Iron Bank answer@2x | "Iron Bank"/"P1 account"/"Platform One" = public product names; "Updated 8/21" = a doc-freshness date | Used as-is; date judged non-sensitive (FLAG for Andrew if he disagrees) → Posture A |
| `p1-assistant-fullscreen.webp` | 6837:342 How-can-I-help@2x | None — generic ("create an account", "P1 Solutions", "unlock my account") | Used as-is → Posture B |

### Shots deliberately NOT used (baked-in internal specifics, rasterized so unscrubbable here)
- 6837:360 / 6837:362 (Big Bang "working" answers) bake **`registry1`** + **`docs-bigbang`** + a
  troubleshooting decision tree into the pixels. These would be the ideal "developer doing real
  work" Posture B, but can't be scrubbed from a flattened export. Deferred. If Andrew wants a
  working full-view shot, options: (a) he re-exports a sanitized version from his editable source
  design, or (b) accept a pixel redaction (looks like a redaction — not recommended for a portfolio).
  For now Posture B uses the clean "How can I help" entry state.

### Round 2 (2026-07-21, Andrew's updated Figma — node 6825:2 revision + Images page)

| Asset | Source node | Sensitive strings? | Action |
|---|---|---|---|
| `p1-hero-insitu.webp` | 6826:8 hero composite | Same widget content as p1-assistant-widget (public product names, "Updated 8/21") | Hero swap — used as-is |
| `p1-example-chats.webp` | 6843:1777 example chats | **"Grogu AI"** in tile 3 ("Rate your experience with Grogu AI") — internal bot codename | Used as-is; FLAGGED to Andrew (rasterized; needs his re-export if it must go) |
| `p1-vuetify-overrides.webp` | 6850:1878 Vuetify board | **"Grogu is thinking"** in one input example; internal palette names (Tactical Teal, Midnight Ops, etc.) | Used as-is; palette names judged brand-flavor not secrets; Grogu FLAGGED same as above |
| `p1-assistant-demo-poster.webp` | 6850:1881 video poster frame | None (public homepage + launcher) | Poster for the S4 loop |
| `p1-assistant-demo.gif` | 6850:1883 IMAGE fill (the GIF twin of the video node) | Same product content as the mocks; loops natively (NETSCAPE ext) | RESOLVED 2026-07-21: exported the actual 4.1MB animated GIF (1146×803, ~354 frames), lazy-loaded bare `<img>` per Andrew's ask. `p1-assistant-demo-poster.webp` retained but currently unused. |

### Still pending (research beat)
The research board (request taxonomy, key-design-decisions table, job stories) is the highest-value
remaining addition but is NOT pasted as screenshots — it will be **rebuilt as sanitized house-style
figures** (generalized categories, no internal hostnames/IL levels/vendor names/verbatim quotes).
That is its own design pass (adversarial-review treatment like Operating Record). Not done this round.
