# Portfolio Redesign Design Spec — extracted 2026-07-09
Sources: Figma file CwHbrO2k4Euk4s3MDviQMy frame 6727:3413 (rung 1: exact/MEASURED via MCP) · full-res export design/full-page/home-desktop.png · all values MEASURED unless marked (est.)

Canon rulings applied from the completeness audit: the page plate is **white Rectangle 87** (6727:3547, 1608x6046 at x=60) — NOT #EDEDED (render artifact; #EDEDED-ish gray shows only in the 60px gutters where the hatch renders over the transparent root frame). Resume plate = Rectangle 119 (6727:4156) rgba(237,237,237,0.85) at layer opacity 0.5 = effective rgba(237,237,237,0.425). Two distinct separator recipes exist and both are correct: plain stroke-opacity 0.25 (resume) vs 0.5×0.75=0.375 (page/grid rules, dividers, case separators).

## 1. Colors & roles

Near-duplicates are grouped adjacently but every measured value is kept — do NOT silently merge.

| Value | Role | Where observed |
|---|---|---|
| **Ink family (near-black warm browns + pure black)** | | |
| #231A09 | Primary ink: ANDREW MARKS headline, lockup box 1px borders, swatch 2px borders; resume section label; arrow-out icon stroke cells 02/03/04; footer band background | Name Mark, 6727:4251, Group 3, Rectangle 39 (6727:3878) |
| #271E0C | Dark brown fill: logo square, underline bars, QR bars, barcode bars, 4th swatch; links-grid "01 RESUME" text | Name Mark children, 6727:3932 |
| #241B09 | Design-mark slanted bar fill; hero display words, tagline, sub-line ink | design mark SVG, 6727:3860-3863 |
| #281E0A | Arrow-out icon stroke, cell 01 variant | Group 2, 6727:4111 |
| #000000 | Case/status titles, case-1 image border, resume row text + button border/text, links 02-05, plus marks, coil strokes, R badge | throughout |
| rgba(0,0,0,0.9) | Case-study description body, rows 1-2 (row 3 uses #000) | 6727:4233, 6727:4240 |
| rgba(0,0,0,0.8) | Links-grid description body | 6727:3937-3941 |
| **Orange family** | | |
| #EC4E09 | Accent orange: header folded chevrons, "// INITIALIZING..." line, resume triple chevrons, orange hatch line-boxes (resume hidden + links-grid visible) | Rectangle 64-70, 6727:4220, Group 40, 6727:3942 |
| #ED5613 | Dot-grid active dot (fill AND 1px stroke) | Ellipse 3, links-grid |
| #A43B0D | Hero plus-mark stroke, at stroke-opacity 0.83 | hero Mask group plus marks |
| #FBC0A6 | See Full Resume button background (peach) | 6727:4256 |
| rgba(236,78,9,0.25) | Orange 25% — only on a hidden line-break span in resume row 1 role paragraph | 6727:4262 |
| **Secondary hues** | | |
| #45857B | Color swatch 2 fill (teal) | 6727:3874 |
| #333E32 | Color swatch 3 fill (dark green); STATUS row text (green-gray) | 6727:3875, 6727:4221/4225 |
| #728370 | Giant case-study numeral outline stroke (2px, transparent fill; pixel-sampled, solid alpha 255) | 6727:4229 |
| #5E5757 | Meta/utility line text (IDENTITY_AUTH bar) | 6727:3904 |
| **Whites / plates / grays** | | |
| #FFFFFF | Page plate Rectangle 87 (1608x6046 at x=60,y=0) — canonical page background; logo crosshair strokes, QR knockout bars; Frame 56 gradient start | 6727:3547, Ellipse 21, Rect 78-79 |
| rgba(255,255,255,0.9) | Footer wordmark fills, flag-mark rects, globe strokes, legal text — effective ≈ #E9E8E6 over #231A09 band | footer children |
| rgba(237,237,237,0.85) @ layer 0.5 = rgba(237,237,237,0.425) | Resume plate Rectangle 119 (1480x1043 at 124,3978) — ≈ #F7F7F7 over white | 6727:4156 |
| #EDEDED | RENDER ARTIFACT only — Figma canvas gray behind the transparent root frame; visible in isolated renders and in the 60px gutters. NOT a designed fill | gutters / isolated renders |
| #E7E7E7 | Rendered hatch stripe over #EDEDED-reading gutter (237 × 0.975; pixel-sampled from full-page export) | hatch stripes |
| #E1E1E1 | Double-hatch zone where Groups 36/37 overlap (left gutter y≈2194-2583) — likely unintended tiling seam | G36/G37 overlap |
| #D9D9D9 | Frame 56 wireframe placeholder fills + gradient end; hero mask shape fill (non-visual, alpha mask only) | 6727:4200 children, Rectangle 26 |
| **Black-alpha stroke/fill recipes (keep exact)** | | |
| rgba(0,0,0,0.375) | 2px rules: path opacity 0.5 × stroke-opacity 0.75 = 0.375 — page verticals x=60/1668, interior columns, case separators, divider, links-grid rules | Vectors 3/4/15/16/17, 3900-3903, Vector 13, Vectors 6-10 |
| rgba(0,0,0,0.25) | Resume row separators: stroke-opacity 0.25, NO layer opacity (distinct recipe, deliberate-or-not, keep both) | Vectors 23-26 (6727:4664-4667) |
| rgba(0,0,0,0.33) | Dot-grid default dot (black at fill-opacity 0.33) | Ellipse 1, links-grid |
| rgba(0,0,0,0.025) | Gutter hatch lines: stroke-opacity 0.05 × group opacity 0.5 | Lines 81-115, Groups 14/36/37/38 |

### Tokens — RATIFIED 2026-07-09 (Andrew's rulings + agreed recommendations, see ledger)
- `ink` #231A09 (absorbs #241B09/#281E0A — 1-2 value diffs, authoring noise) · `ink-deep` #271E0C
- `black` #000000 (kept separate from ink family)
- `accent` #EC4E09 (absorbs #ED5613) · `accent-deep` #A43B0D (hero plus field; deliberate) · `accent-soft` #FBC0A6
- `teal` #45857B · `green-gray` #333E32 · `numeral-sage` #728370 · `meta-gray` #5E5757
- `plate-white` #FFFFFF · `plate-resume` rgba(237,237,237,0.425) · `footer-bg` #231A09
- `gutter-hatch` rgba(0,0,0,0.025) on the page backdrop · `rule` rgba(0,0,0,0.375) · `rule-soft` rgba(0,0,0,0.25) · `dot-idle` rgba(0,0,0,0.33) · `on-dark` rgba(255,255,255,0.9)

## 2. Font families

| Family | Weights used | Where |
|---|---|---|
| Geist | Regular 400, Medium 500, SemiBold 600, Bold 700, ExtraBold 800, Black 900 | headline, hero tagline/sub-line, case titles/descriptions, buttons, links, R badge |
| Geist Mono | Light 300, Regular 400, SemiBold 600 | meta bar, INITIALIZING/STATUS lines, resume label, footer legal |
| Neue Haas Grotesk Display Pro | 55 Roman, 65 Medium, 75 Bold | resume rows, giant case-study numerals. COMMERCIAL — webfont licensing unconfirmed |
| UNKNOWN display face | n/a (outlined vectors) | hero "UX & Product"/"Designer", footer wordmarks. Blocky octagonal face. Use saved SVGs; do NOT guess the family |

## 3. Text styles

All MEASURED. Tracking values are literal px from Figma (percent equivalent in parens).

| Role | Family | Size | Weight | Line-height | Tracking | Color | Casing |
|---|---|---|---|---|---|---|---|
| Meta/utility bar | Geist Mono | 20px | Light 300 | 1 (20px box) | -0.4px (-2%) | #5E5757 | uppercase labels as typed |
| Name mark headline | Geist | 48px | ExtraBold 800 | 1.25 (60px), cap-trimmed to 34px glyph box | -0.96px (-2%) | #231A09 | UPPERCASE |
| Hero display words | UNKNOWN (outlined) | 76.8px bbox cap height | n/a (paths) | 102.4px step (76.8 + 25.6 gap) | n/a | #241B09 | Title Case as drawn |
| Hero tagline | Geist | 36px | Medium 500 | 1.25 (45px; 2 lines = 90px) | -0.72px (-2%) | #241B09 | Sentence case |
| Hero sub-line | Geist | 24px | Regular 400 | 1.45 (34.8px; 2 lines = 70px) | -0.48px (-2%) | #241B09 | Sentence case |
| Status section title | Geist | 32px | SemiBold 600 | 1.25 (40px; frame clamps 36px) | -0.64px (-2%) | #000000 | Title case as typed |
| Status "//" span | Geist Mono | 20px | Regular 400 | 1 | -6.8px (-34%) | #EC4E09 | as typed |
| Status " INITIALIZING..." span | Geist Mono | 20px | Regular 400 | 1 | -0.4px (-2%) | #EC4E09 | ALL CAPS |
| Status rows | Geist Mono | 16px | Regular 400 | 1 | -0.32px (-2%) | #333E32 | label CAPS, values sentence w/ "..." prefix |
| Case numeral | NHG Display Pro | 200px | 75 Bold | 125% (cap-trimmed to 143.05px) | 0 | transparent fill + 2px #728370 stroke | numerals 1/2/3 |
| Case title | Geist | 32px | Medium 500 | 125% | -0.16px (-0.5%) | #000000 | Title Case |
| Case description | Geist | 20px | Regular 400 | 145% | +0.4px (+2%) | rgba(0,0,0,0.9) rows 1-2, #000 row 3 | Sentence case |
| Case bold emphasis span | Geist | 21px (1px larger than body — measured, all 3 rows) | Bold 700 | 145% | +0.4px | inherits | inline |
| Resume section label | Geist Mono | 28px | Light 300 | 1.0 | -0.56px (-2%) | #231A09 | Title Case |
| Resume button label | Geist | 20px | Regular 400 | 1.2 | -0.4px (-2%) | #000000 | Title Case; arrow = U+2192 glyph |
| Resume row title | NHG Display Pro | 48px | 65 Medium | 1.25 (60px) | +0.96px (+2%) | #000000 | as typed |
| Resume role line | NHG Display Pro | 36px | 65 Medium | 1.45 (52.2px) | -0.18px (-0.5%) | #000000 | as typed |
| Resume date line | NHG Display Pro | 24px | 65 Medium | 1.45 (34.8px) | -0.18px (inherited) | #000000 | as typed |
| Resume body | NHG Display Pro | 24px | 55 Roman | 1.45 (34.8px) | -0.12px (-0.5%) | #000000 | Sentence case |
| Numbered link (01-05) | Geist | 24px | SemiBold 600 | 0.95 | 0 | #271E0C (01) / #000 (02-05) | UPPERCASE |
| Link description | Geist | 18px | Medium 500 | 1.45 | +0.36px (+2%) | rgba(0,0,0,0.8) | Sentence case |
| Link description bold span | Geist | 18px | Bold 700 | 1.45 (1.55 in About) | inherits | #000000 | inline lead-in |
| About wide paragraph | Geist | 18px | Medium 500 | 1.55 | 0 | rgba(0,0,0,0.8) | justified, 764x84px |
| R badge glyph | Geist | 16px | Black 900 | 0.95 | +0.32px (+2%) | #000000 | uppercase "R" |
| Footer legal | Geist Mono | 16px | SemiBold 600 | 1.45 (23.2px) | -0.32px (-2%) | rgba(255,255,255,0.9) | uppercase as typed |

Exact literal copy strings (preserve spacing/characters):
- Meta bar: `IDENTITY_AUTH  // UID: Andrew Marks  // SEC_LEVEL: TOP_SECRET  // LOC: 36.5298° N, 87.3595° W  // VER: 0.9.2-BETA` (double spaces around //)
- Tagline: `Research & design for users wrangling electric sheep.`
- Sub-line: `Building agentic workflows & complex AI systems for humans, ` U+2028 `agents, & everything in between.`
- Status: `Case Study Status: ` (trailing space) · `// INITIALIZING...` · `STATUS: ` + `...High level complete` · `...Deeper dive pending`
- Case bold spans: "cut support tickets up to 40%", "saves veterinarians 15 minutes per case", "multi-agent system that reads 1,000's of sources"
- Resume dates (en dash U+2013, right quote U+2019): `12/'24 – Present` · `09/'23 – Present` · `07/'21 – 8/'23` (single-digit 8) · row 4 second line `Claremont Graduate University`
- Footer legal, 3 right-aligned lines: `// [C] 2026` / `// USER: ANDREW MARKS` / `// ALL_RIGHTS_RESERVED_INIT`

Full copy set (MEASURED from Figma text nodes via metadata dump; node text is as-typed — casing per §3 styles):
- Link labels (node text; renders uppercase): `01 resume` · `02 X.com` · `03 Linked in` · `04 GitHub` · `05 About`
- Link descriptions: 01 `Product Designer engineering intuitive UX solutions for complex DoD, GovTech, and AI ecosystems.` · 02 `Follow @andrwemarksart for design, vibe coding, the latest AI news, and things I think are cool or interesting.` · 04 `View my public work on GitHub. DM for access to select private AI and UX repositories.` · 03 (from 1:1 render) `Connect with me on LinkedIn /in/andrwemarksart/ as I build-in-public projects on AI agents & the future of UX.` · 05 `Focused on the architecture of human-AI collaboration, from secure DoD systems to rapid AI prototyping, I use my background to simplify complex data into high-performance UX research and designs allowing AI systems to scale.`
- Case titles: `Platform One AI Assistant & Chat Bot` · `Chat VET an AI Suite for Veterinary Medicine` · `AI Powered Personal Knowledge OS`
- Case descriptions: 1 `An AI assistant projected to cut support tickets up to 40% inside the Air Force's flagship software factory.` · 2 `An AI copilot that saves veterinarians 15 minutes per case, answering from Merck Veterinary Manual instead of the open web.` · 3 `A multi-agent system that reads 1,000's of sources building a living corpus I can leverage to build and explore with.`
- Resume roles (line 1 of role paragraph, from 1:1 render): `UX Researcher` · `UX Research & Product Design` · `UI/UX Engineer, Payload & Ground Systems` · `Information Systems Technology`
- Resume bodies: Metronome `I led a behavioral analytics tool that unified 56,854 user identities across six data sources, and designed the conversational UX for Platform One's AI Assistant, projected to cut support tickets up to 40%.` · Freelance `I lead product and UX design for early-stage AI teams, from conversational interfaces and user flows to shipped redesigns. Open to short-term contract work.` · Northrop Grumman `UI development for payload and ground systems, integrating real-time telemetry and mission-critical data, and built an onboarding site that cut new-hire ramp from 10 to 7 days.` · Masters Degree `M.S. in Information Systems Technology with an emphasis in data science, plus an MA in Art Business adding a creative and business dimension.`

## 4. Geometry & layout

**Page shell.** Root frame 6727:3413 "MacBook Pro 16 - 3", 1728x6062, NO fill (transparent). Child 5 = Rectangle 87 (6727:3547) white plate 1608x6046 at (60, 0) — spans exactly between the vertical rules; ends at y=6046 (footer covers 6046-6062). Behind it (children 1-4): four diagonal-hatch Groups 14/36/37/38 (~4084x1773 each, spanning y −545 to 5332). The hatch reads mainly in the 60px gutters.

**Vertical rules.** Vector 3 x=60, Vector 4 x=1668: y=0 to h=5933 (NOT full 6062 — they end above page bottom and render ABOVE the footer band, overlapping its top 276px). 2px, rgba(0,0,0,0.375). Interior column rules, same recipe: Vector 15 x=121 y=866 h=3063; Vector 16 x=1619 y=866 h=3063; Vector 17 x=483 y=902 h=3027.

**Root horizontal rules** (same 0.375 recipe, 1728 wide): Vector 5 y=60, Vector 12 y=791, Vector 11 y=866. Case-study separators are root-frame children (metadata x=1668, right-anchored, extending left 1608px): Vectors 6727:3903/3901/3902/3900 at y=902 / 1062 / 1991 / 2952.

**Root plus marks.** 14 extra 32x32 plus marks at (44/1652, y=44, 775, 850) and (105/1603, y=886, 1046, 1975, 2936) flanking the header and case-study columns — in addition to the links-grid corners, divider pair, and resume-plate corner frames.

**Vertical section map (page y):**

| y | Element |
|---|---|
| 24 | Meta bar text (125, 24), 1575x20 |
| 60 | Horizontal rule Vector 5 |
| 81.5-791 | Hero band Mask group (6727:3548) 1592x709.5 at (76, 81.5) |
| 96 | Name Mark frame (125, 96), 783x92.63 |
| 292 / 394.4 | "UX & Product" / "Designer" at x=125.5 |
| 520 / 626 | Tagline / sub-line at x=125.5 (gaps: 48.8px below Designer, 16px below tagline) |
| 791 / 866 | Horizontal rules Vector 12 / Vector 11 |
| 810-811 | Design mark (1372, 810) 279.75x36.55; color swatches y=811, x=76+ |
| 902 / 1062 / 1991 / 2952 | Case-study separators (1608 wide) |
| 1098 | Case Studies frame 6727:4226 (127, 1098), 1477x2741.05; rows at frame-y 0 / 945.68 / 1891.36 (96px gaps) |
| 3913 | Divider 6727:3917, 1728x32; rule at y=3929 |
| 3978 | Resume plate Rectangle 119 (124, 3978) 1480x1043; corner-mark Frame 70 (119, 3974) 1489x32 + Frame 71 (120, 5000) 1488x24 |
| 3996 | Resume section frame 6727:4248, 1444x1002.66 at (140, 3996) (separators at page x=123, section-relative y 64/308/548/791) |
| 5053-5673 | Links section 6727:3931, 1728x620; rules y=5069 (full-bleed) / 5363 (inset x60-1668) / 5657 (full-bleed); verticals x=462, x=864 |
| 5657-6062 | Footer band Rectangle 39, 1608x405 at (60, 5657) — 60px inset both sides, NOT full-bleed |

**Left-edge alignment drift (measured, hand-placed):** 123 (resume rules) · 124 (resume plate) · 125 (header/meta) · 125.5 (hero text) · 127 (case studies) · 140 (resume section frame). Pick one grid when building.

**Links grid.** 3 columns x 2 rows; column boundaries x=0/462/864/1728 (widths 462/402/864); rows 294px each. Cell text pad-left 16px from interior rules (x=76 leftmost = 60 gutter + 16). Link baseline top = rule + 42px; description top = rule + 174px (About exception: rule + 168px). Icon boxes 52x52 right-aligned 16-17px before cell rule (cell 03 exception: x=1198, after text). Plus marks 32x32 at (44,5053), (1652,5053), (44,5640), (1652,5641) centered on rule intersections.

**Footer.** Band inner inset 16px (content x=76 to 1652). "Andrew Marks" wordmark 1576x160 at (76, 5687), 30px below band top; "Design" 820x160 at (76, 5871), 24px gap. Flag 139x80 at (977, 5951); globe 105x60 at (1547, 5871); legal 251x57 at (1401, 5974). Design wordmark, flag, and legal all bottom-align at y=6031 (31px above band bottom).

**Cap-height trim convention.** Text nodes throughout use Figma vertical trim = CSS `text-box-trim: trim-both; text-box-edge: cap alphabetic` (200px numeral measures 143.05px; 32px title 23.34px; 48px headline 34px). Layout offsets assume trimmed boxes.

## 5. Components & states

The file contains ZERO hover/pressed/focus/interaction states for ANY element. Every component below: **States: none in file.**

**Name-mark lockup** — 783x92.63 at (125, 96). Horizontal chain: [77px solid #271E0C logo square with white crosshair: 48.8px-dia circle at (14.1,14.1), 1.2px white stroke, + full 48.8px vertical/horizontal 1.2px white lines crossing at (38.9,38.9)] + [Rect 62 name box 444x77 at x=77, 1px solid #231A09, no fill; 48px text at 24px left pad; underline bar 396x8 #271E0C at (101,57)] + [Rect 71 spacer 24x77 at x=520, 1px border] + [Rect 72 QR square 77x77 at x=543, 1px border; inside a hollow 53x53 square of 8px #271E0C bars, knocked out by white 12px bars with a 12x12 dark center restored — registration-mark look] + [barcode: five #271E0C bars at x=644, 6px tall, 12px pitch, widths 30/21/81/66/95] + bottom row of 7 orange #EC4E09 folded chevrons (16px path rotated 45°, bbox 22.627px) at y=70, six at x=101..251 (30px pitch), seventh at x=474.

**Meta bar** — single Geist Mono Light 20px text node at (125, 24), width 1575, #5E5757; segments separated by double-space + `//`.

**Color swatch row** — four 36x36 squares, 2px #231A09 border, 45px pitch (9px gaps), at page (76, 811); fills: transparent / #45857B / #333E32 / #271E0C.

**Design mark** — 279.75x36.55 frame at (1372, 810): 7 slanted parallelogram bars #241B09, each 27.2px wide slanting 34.85px right over 36.55px height (~43.6°); x-offsets 0/37/74/111/148/182/217.7.

**Hero band** — Mask group 1592x709.5 at (76, 81.5). Alpha mask Rectangle 26 (fill #D9D9D9, non-visual): top edge inset to y=145.5 with a raised tab to y=0 between x=194.5-397.7 and a long diagonal shoulder returning to (596.56, 145.5). Contents (masked): plus-mark field behind, robot avatar in front. Avatar container 569x789 at page (1124, 162), inner image width 100.01% / height 126.32%, top-left anchored (bottom-cropped); source PNG 2340x4096 RGBA. Plus-mark field Group 27: 99 marks (11 rows x 9), each 26.353px "+" of two 2px strokes #A43B0D @ stroke-opacity 0.83, rotated -45.67° (renders as "x", bbox 37.266px); rectangular lattice cell 65.90 x 59.29px rotated -45.67° (in-row step +47.128,+46.037; row offset +41.43,-42.41). Hero words: outlined SVGs, 734.152x76.8 and 530.221x76.8, fill #241B09.

**Case Study Status block** — root 6727:4215, transparent, column, p-16px. Title `Case Study Status: ` then Descriptions block indented 16px, 12px row gap: InitializingLine (20px tall, 331.543px wide; two spans — `//` at -6.8px tracking, ` INITIALIZING...` at -0.4px) + two StatusRows (flex, 300px wide, max-w 400px; nowrap left label, flex-1 right-aligned value; row 2 value-only, column-aligns with row 1). No leader dots — alignment is pure flex. Page position (125, 902), 1478x160.

**Case-study row** — Frame 61 pattern, 1477x~849.7: horizontal flex, px-16, gap 20. Numeral rail 352px fixed, bottom-aligned outlined numeral (200px NHG 75 Bold, transparent fill, 2px #728370 stroke — `-webkit-text-stroke: 2px #728370; color: transparent`), 32px left inset (pl-32 row 1, px-32 rows 2-3). Card 1073px: vertical flex gap 16: title (max-w ~726px) → image 1073x750, radius 0, no shadow, object-fit cover (sources 1440x1080; 1px solid #000 border on row 1 ONLY) → description (width 713.47 row 1 / 725.6 rows 2-3, 2 lines). Rows stack on 96px gaps. States: none in file.

**Case row separator** — 1608px wide 2px rule at rgba(0,0,0,0.375), root-frame child, hand-placed roughly mid-gap (y=902/1062/1991/2952; spacings 929/961px vs 945.68px row pitch — non-uniform).

**Resume section** — frame 6727:4248, 1444x1002.66, NO fill/border/radius (sits on Rectangle 119 plate); column, gap 54px, px-16 (content 1412), items-end. Header Frame 64: full-width flex justify-between items-end, h=44: left = "Resume Highlights" + 16px gap + triple-chevron SVG (82.63x20, at y=4, pb-4); right = button.

**See Full Resume button** — 203x44, px-16 / py-8, bg #FBC0A6, 2px solid #000000, radius 0; label `See Full Resume →` Geist Regular 20px. States: none in file.

**Resume row** — full-width flex justify-between, py-1; heights 182.68 / 186.66 x3. Left title column 355px fixed (rows 1-2) or hug (Northrop Grumman 424.02, Masters Degree 344.02). Right column 729px at x=683 (≈328px empty gutter between columns); pl-16 row 1, px-16 rows 2-4. Inside: role+date as ONE paragraph with line break (36px + 24px lines), 36px gap, then 3-line body. Four rows: Metronome / Freelance / Northrop Grumman / Masters Degree.

**Resume separator** — 2px, rgba(0,0,0,0.25) (plain stroke-opacity, NO layer opacity), 1482px wide at page x=123 — overhangs section frame 17px left / 21px right. Section-relative y: 64, 308, 548, 791 (20px below header; then centered in each 54px gap; none after last row).

**Resume plate + corner marks** — Rectangle 119 (124, 3978) 1480x1043, rgba(237,237,237,0.85) at layer opacity 0.5. Frame 70 (119, 3974) 1489x32 and Frame 71 (120, 5000) 1488x24: mirrored pairs of the 32px crosshair plus mark (edge-clipped to 28px) pinning top/bottom plate corners; shape identical to links-grid plus-mark.svg.

**Links-grid cell** — numbered link top-left (pad 16, rule+42px); 52x52 arrow-out icon top-aligned with link, right-aligned 16-17px before the cell's right rule; description (width 369px) at rule+174px. Cells: 01 RESUME, 02-05 (row 2 leftmost cell = dot grid, no link). States: none in file (all five links).

**Arrow-out icon box** — 52x52 viewBox, stroke-width 8, square butt caps, no fill: top bar y=4 x=12→52; right bar x=48 y=0→40; bottom bar y=48 x=0→44; left bar x=4 y=8→48; diagonal shaft (20.17,32.17)→(48.46,3.89). Box outline broken at top-left/bottom-right with 45° arrow shaft to top-right. Stroke #281E0A (cell 01) or #231A09 (02/03/04).

**Dot grid** — 368x210 at (76, 5405), clipped: 12 cols x 8 rows of 6px circles; x-pitch (368-6)/11 = 32.9px, y-pitch (210-6)/7 = 29.1px (justify-between both axes). Default: 6px, black fill-opacity 0.33. Active: 8px rendered (r=3.5 + 1px stroke), fill+stroke #ED5613. Active pattern (1-indexed): rows 2-3 cols 3-4 and 9-10; rows 4-5 cols 6-7; rows 6-7 cols 3-4 and 9-10 = five 2x2 clusters; rows 1 and 8 all default.

**Orange hatch block (links-grid)** — 362x211 at (1290, 5110), clipped, no border: 58 diagonal lines, #EC4E09 2px stroke, 45° ascending left-to-right, 28px x-spacing (19.8px perpendicular).

**Coil + R badge (About cell)** — Frame 7: 159x23 clipped, 1px black line full width at y=11.72, overlaid by 5 circles r=11, 1px black stroke, cx=49.5/64.5/79.5/94.5/109.5 (15px pitch, overlapping coil). R badge: separate 24x24 frame, 1px solid black border, radius 12px (circle), px-6/py-5, "R" Geist Black 16px.

**Footer band** — solid #231A09 rect 1608x405 at (60, 5657), radius 0, no stroke/shadow. Contents at 16px side insets: two outlined wordmarks (white fill-opacity 0.9), flag mark (36x36 canton square + two 95x14 bars at 8px gaps + two 139x14 full bars; rows at rel-y 0/22/44/66, all rgba(255,255,255,0.9)), globe mark (three 60x60 circles cx=30 r=29.25 at x 0/22.5/45, stroke white 0.9 width 1.5; middle circle DASHED — only available as raster), 3-line legal block right-aligned at x-right 1652.

**Divider** — 6727:3917, 1728x32 at (0, 3913): full-width 2px center rule rgba(0,0,0,0.375) at local y=16, bookended by two solid-black 32x32 plus marks at local x=44 and x=1652 (centers exactly on x=60/1668 gutter rules).

**Plus mark (registration cross)** — reusable 32x32: two 4px solid #000 strokes (M16 32V0 + M32 16H0) crossing at center. Recurs at divider, links-grid corners, resume plate corners, and 14 root-level positions. (Hero variant is separate: 26.353px, 2px, #A43B0D @0.83, rotated.)

## 6. Motifs & signature elements

- **Gutter diagonal hatch** (page-wide, behind plate): CSS one-liner replaces all four Figma groups exactly — `background-image: repeating-linear-gradient(50.79deg, rgba(0,0,0,0.025) 0 31.35px, transparent 31.35px 61.81px)`. Measured: angle 50.788° descending left-to-right ("\"), nominal 32px stroke rendering 31.35px perpendicular (slight skew in the transform), horizontal line step 79.764px → perpendicular period 61.81px. Line nodes: bbox 1443.9806x1769.9999, stroke length 2284.29px, stroke-width 32, black @5% stroke-opacity inside groups at opacity 0.5. Rounding to rgba(0,0,0,0.025) / 31.4px / 61.8px / 50.8deg is faithful. The single-gradient version will NOT reproduce the #E1E1E1 double-stripe seam where G36/G37 overlap — almost certainly unintended in the source.
- **Plus-mark registration crosses**: 32px/4px solid black (page furniture, pinned on rule intersections) and 26.353px/2px #A43B0D @0.83 rotated -45.67° (hero field, 99 instances on a 65.90x59.29px lattice rotated -45.67°).
- **Folded-chevron marker** (header): 16px path `M12.2426 12.2426L12 4L16 0V16H0L4 12L12.2426 12.2426Z` fill #EC4E09, rotated 45°; 6x at 30px pitch + 1 outlier.
- **Triple chevron** (resume): three downward chevrons #EC4E09, viewBox 82.6274x20; each 22.63x10, band thickness ~5.66px (4√2, 45° mitered V), repeating at x=0/30/60.
- **Barcode data bars**: left-aligned 6px-tall bars, widths 30/21/81/66/95, 12px pitch — redacted-data texture.
- **QR/registration block**: nested-square pixel pattern from 8px dark bars + 12px white knockouts + 12px dark center, inside a 1px-bordered 77px square.
- **Hazard-slant bars** (design mark): 7 parallelograms slanting ~43.6°, fill #241B09.
- **Notched hero silhouette**: alpha-mask polygon — flat top inset 145.5px with raised tab (x 194.5-397.7 of 1592) and diagonal shoulder returning at x=596.56; applied to avatar + plus field together (field behind, portrait in front).
- **Dot matrix**: 33%-black 6px dots, 32.9/29.1px pitches, #ED5613 8px active dots in 2x2 clusters — data/status readout idiom.
- **Line boxes** (hidden in file): clipped rects of parallel 45° #EC4E09 2px lines, 12px x-spacing (~8.49px perpendicular), group opacity 0.5; sizes 228x54 and 58x54 (x5). ALL hidden=true. CSS `repeating-linear-gradient(45deg, ...)` if revived. Visible cousin: links-grid hatch block (28px spacing, full opacity).
- **Outlined giant type**: transparent-fill + stroke treatment (numerals: 2px #728370) and outlined-SVG wordmarks/hero words — signature display language.
- **Full-bleed hairline rules with overhang**: separators deliberately wider than their content frames (case: 1608 vs 1477; resume: 1482 vs 1444) — drafting-table/blueprint register.
- **Terminal/console idiom**: `//` prefixes, SCREAMING_SNAKE, `[C]`, ellipsis-prefixed boot-log values, monospace + negative tracking.
- **Coil + circled R**: overlapping-circle coil on a rule ending in a circled R (registered-mark joke).
- **Flag + globe glyphs** (footer): abstract US-flag from rects; triple-overlap venn circles, middle dashed.
- **Double-margin system**: 60px page gutter, then 16px content insets inside bands/cells.
- **Cap-height trim everywhere**: `text-box-trim: trim-both; text-box-edge: cap alphabetic` — measured box heights assume it.

## 7. Ledger — contradictions & open questions

**Rulings from Andrew, 2026-07-09:** display font = Strelka (Adobe Fonts), flattened/manipulated in the design → use the exported SVGs for hero words + footer wordmarks (exact fidelity), with real text equivalents kept in the DOM for SEO/a11y. NHG Display Pro license: Andrew has it (Adobe Fonts) — needs a kit/embed for the build. Interactions: designs exist but are deferred — build static layout first, do NOT invent hover states. Responsiveness: designed by the builder (Claude) — no Figma mobile frames coming for v1. Inconsistencies: fix them; builder recommends, records choices here.

**Post-design rulings from Andrew's QA, 2026-07-09 (deviations from the Figma frame, deliberate):** (1) The resume plate gets a **2px dashed `--rule-soft` border** — no stroke exists in the Figma frame; added at Andrew's direction. (2) **Full-bleed rules span the full viewport** on screens wider than 1728 (the frame can't express this; `.fullBleed` uses `margin-inline: calc(50% - 50vw)`, plate-pinned marks/insets offset by `--vp-edge`). (3) Status terminal text scales down per breakpoint band (1650/1450/1250) so it stays inside the 24.324% status cell. (4) 48px gap between the resume plate and the links band (32px <640).

1. ~~Display font unidentified~~ **RESOLVED**: Strelka (Adobe Fonts), flattened/manipulated per art direction. Build from saved SVGs; do not substitute live Strelka for the manipulated lockups.
2. ~~Ink variance~~ **RESOLVED**: tokenize to `ink` #231A09 (absorbs #241B09, #281E0A) + `ink-deep` #271E0C + `black` #000000.
3. ~~Orange variance~~ **RESOLVED**: `accent` #EC4E09 (absorbs #ED5613); `accent-deep` #A43B0D stays separate (hero plus field).
4. ~~Case-study row inconsistencies~~ **RESOLVED** (builder recommendation, approved "fix + recommend"): 1px solid #000 image border on ALL three rows (matches the 1px-rule drafting language and keeps light screenshots from bleeding into the white plate); description color rgba(0,0,0,0.9), max-width 726px, rail padding uniform 32px both sides; bold spans same 20px size as body (the 21px measurement treated as authoring quirk).
5. **Interaction states deferred** — Andrew has interaction designs; basic layout ships static. Do not invent hover states beyond cursor:pointer + focus-visible outlines (a11y floor).
6. ~~Gutter treatment~~ **RESOLVED** (recommendation): gutters render the hatch over the page base color; plate is white. Page base = #EDEDED-equivalent achieved via white + hatch gradient (visually identical to the Figma render).
7. ~~Left-edge alignment drift~~ **RESOLVED** (recommendation): single alignment grid — content column inset 64px from the x=60/1668 rules (content spans x=124..1604 at 1728). The 123/125/125.5/127/140 drift values are normalized to this grid.
8. **Z-order quirks** — vertical rules end at y=5933 (not 6062) and render ABOVE the footer band, overlapping its top 276px; white plate stops at y=6046 vs page 6062 (footer covers the difference). Cosmetically irrelevant; build rules ending at the footer top.
9. ~~NHG licensing~~ **RESOLVED**: Andrew holds the license via Adobe Fonts. BUILD TODO: Andrew creates an Adobe Fonts web project (kit) containing Neue Haas Grotesk Display Pro (55 Roman, 65 Medium, 75 Bold) and provides the kit ID/embed URL. Until then the build uses a fallback stack behind `--font-nhg`.
10. **Responsive design is builder-designed** (Andrew delegated): fluid ≤1728 with breakpoints — see BUILD-PLAN in .claude/ for the concrete strategy.
11. **Frame 56 (6727:4200) is a leftover WIREFRAME** — hidden=true, all-#D9D9D9 skeleton (heading bars, 728x626 carousel slot, caption bars, white→#D9D9D9 side-fade peek panels). Do NOT build unless Andrew says otherwise; at most it hints a center-stage carousel was once planned.
12. ~~Case Study Status block position unmeasured~~ **RESOLVED**: 6727:4215 "Case Study Section" is a root-frame child at page (125, 902), 1478x160 (MEASURED from root metadata dump).
13. **Numeral stroke alignment unconfirmed** — 2px #728370 was pixel-sampled (get_design_context returned only text-[transparent]); center-stroke most consistent with measurements.
14. **Resume line boxes hidden** — all six #EC4E09 hatch frames are hidden=true; intent (hover/scroll decoration vs abandoned) undocumented.
15. **Hero plus-field animation intent unknown** — file expresses nothing; repo crosshair animates elsewhere.
16. **Globe middle-circle dash pattern unmeasured** — Figma rasterized it; only globe-ellipse-14.png exists (dash/gap lengths not in vector form).
17. **Footer flush-bottom inferred, not directly measured** — page-level metadata excluded the 6727 subtree; evidence from duplicate homepage frame 1:8 (identical footer, 0px bottom margin) supports flush.
18. **Case separator SVG had transposed viewBox** (2x1608 vertical path) vs node metadata (1608-wide horizontal); stroke-width 2 taken from SVG.
19. **INITIALIZING node carries Figma mixed-style artifacts** (node-level font-size 0 / Geist Mono Medium) fully overridden by its two Regular 20px spans — Medium never renders.
20. **Frame 56 gradient stops** are generated-code defaults (0%/100%); Figma-exact offsets not separately reported.
21. **Rotation metadata offset** — for 45°/90°-rotated children, Figma metadata x differs from rendered CSS left (e.g. chevron 1: metadata 112.31 vs rendered 101); rendered-code coordinates used throughout this spec.
22. **G36/G37 double-hatch seam** (#E1E1E1, left gutter y≈2194-2583) — reads as an unintended tiling artifact; CSS gradient normalizes it away.
23. **Status title box 36px vs computed 40px line box** — Figma fixed-height frame clamp; negligible visual crop, worth knowing in CSS conversion.
24. **Asset count discrepancy** — audit claims 13 links-grid exports; disk has 12 (see §Assets). No missing named asset identified; likely a count error in the audit.
25. **No Figma variables bound anywhere sampled** (get_variable_defs returned {} for hatch + divider) — all values raw.
26. ~~Literal copy gaps~~ **RESOLVED**: full copy set added to §3 (measured from Figma text-node metadata; link 03 description and resume role lines cross-read from the 1:1 render — verify those two against the file if exactness matters).
27. ~~Resume section frame page-y unrecorded~~ **RESOLVED**: 6727:4248 "Resume Section" is at page (140, 3996), 1444x1003 (MEASURED from root metadata dump).

## Assets

All under `C:/Users/Ragnar/code/Andrew-Marks-Design/design/` — verified on disk 2026-07-09.

| Asset | Path (relative to design/assets/figma-exports/) | What it is |
|---|---|---|
| home-desktop.png | ../../full-page/home-desktop.png | Full-page 1:1 export of frame 6727:3413 (3.3MB) |
| divider-6727-3917.svg | background-motifs/ | Divider 1728x32: 2px rule @0.5×0.75 + two 4px plus marks |
| group14-hatch.svg | background-motifs/ | Full Group 14 hatch export (35 lines, opacity 0.5) — source of truth for angle/stroke |
| line-81.svg | background-motifs/ | Single hatch line: black stroke-opacity 0.05, width 32, length 2284.29 |
| case-study-1-platform-one.png | case-study-card/ | 1440x1080 Platform One AI Assistant screenshot |
| case-study-2-chat-vet.png | case-study-card/ | 1440x1080 Chat VET screenshot |
| case-study-3-knowledge-os.png | case-study-card/ | 1440x1080 Knowledge OS screenshot |
| andrew-marks-wordmark.svg | footer/ | Outlined wordmark 1576x160, white fill-opacity 0.9 |
| design-wordmark.svg | footer/ | Outlined wordmark 820x160, white fill-opacity 0.9 |
| globe-ellipse-13.svg | footer/ | Left globe circle r=29.25, white 0.9 stroke 1.5px |
| globe-ellipse-14.png | footer/ | Middle globe circle, dashed — rasterized by Figma (120x120 @2x) |
| globe-ellipse-15.svg | footer/ | Right globe circle (identical to 13) |
| globe-mark-screenshot.png | footer/ | 105x60 reference render of assembled globe mark |
| (empty directory) | frame56-mystery-section/ | Intentionally empty — hidden wireframe references no assets |
| design-mark.svg | header-and-namemark/ | 7 slanted bars #241B09, 279.75x36.55 |
| ellipse-21.svg | header-and-namemark/ | Logo circle, 48.8 viewBox, white 1.2px stroke |
| interior-rule-vector15.svg | header-and-namemark/ | 2x3063 interior column rule, 0.5×0.75 recipe |
| line-71.svg / line-72.svg | header-and-namemark/ | Crosshair lines, 48.8px, white 1.2px (identical pair) |
| namemark-screenshot.png | header-and-namemark/ | 783x93 visual reference of the lockup |
| rectangle-64.svg | header-and-namemark/ | #EC4E09 folded-square chevron, 16px |
| vertical-rule-vector3.svg / vector4.svg | header-and-namemark/ | 2x5933 page rules, 0.5×0.75 recipe (identical pair) |
| designer.svg | hero/ | Outlined "Designer", viewBox 530.221x76.8, 8 paths, #241B09 |
| hero-mask.svg | hero/ | Hero band alpha-mask polygon, viewBox 1592x709.5, single path |
| plus-mark-1.svg / plus-mark-2.svg | hero/ | Hero plus mark reference (all 99 identical to rounding) |
| robot-avatar.png | hero/ | 2340x4096 RGBA portrait, 4.7MB (displayed 569px wide, bottom ~21% cropped) |
| ux-product.svg | hero/ | Outlined "UX & Product", viewBox 734.152x76.8, 10 paths, #241B09 |
| dot-active.svg | links-grid/ | 8px viewBox, r=3.5 fill+stroke #ED5613 |
| dot-default.svg | links-grid/ | 6px circle, black fill-opacity 0.33 |
| frame7-registered.svg | links-grid/ | Coil motif: 5 overlapping circles + line, 1px black |
| icon-box-group2.svg | links-grid/ | Arrow-out icon, cell 01 variant, stroke #281E0A width 8 |
| icon-box-group3.svg | links-grid/ | Arrow-out icon, cells 02-04 variant, stroke #231A09 width 8 |
| line-box.svg | links-grid/ | Orange hatch block 362x211, 58 lines #EC4E09 2px |
| plus-mark.svg | links-grid/ | 32x32 crosshair, 4px black strokes |
| rule-vector6/7/8/9/10.svg | links-grid/ | Links-grid rules, all 2px black 0.5×0.75 recipe (5 files) |
| group40-chevrons.svg | resume-section/ | Triple chevron, #EC4E09, viewBox 82.6274x20 |
| linebox-6727-4265.svg | resume-section/ | Hidden hatch box 228x54, #EC4E09 2px @ group opacity 0.5 |
| separator-6727-4664.svg | resume-section/ | Resume separator: 2px black stroke-opacity 0.25, length 1482 |
