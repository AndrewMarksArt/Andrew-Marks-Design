---
name: Component Patterns (Portfolio Redesign)
description: Structural HTML/React patterns for the Andrew Marks Design project. Defines the page shell, section anatomy, and specific UI blocks.
---

# Portfolio Redesign Component Patterns

You are an AI coding assistant. Follow these structural and DOM patterns when building UI for this project. Exact measurements live in `.claude/design-spec-portfolio-redesign.md`; responsive behavior in `.claude/BUILD-PLAN-main-page.md`.

## 1. Page Shell

- `<body>` carries the gutter hatch background; a centered **plate** (`max-width: 1728px` page, white plate between the two vertical rules) holds all content.
- **Vertical rules** at the plate edges (x=60/1668 at design width): 2px `var(--rule)`, full content height, ending at the footer band top.
- **Full-width horizontal rules** mark section boundaries; case-study separators overhang their content column (1608px wide vs 1477px content).
- **Plus marks** (32px, 4px black strokes) pin rule intersections: divider ends, resume plate corners, links-grid corners, section boundaries. Component: `<PlusMark />` shared motif.
- Sections stack in this order: MetaBar → NameMark → Hero → rules row (swatches + design mark) → CaseStudyStatus → CaseStudies (3 rows) → Divider → ResumeSection → LinksGrid → Footer.

## 2. Section Anatomy

- **MetaBar**: single Geist Mono line at top (`IDENTITY_AUTH  // UID: ...`); segments joined by double-space + `//`. On small screens it wraps — never truncate or h-scroll.
- **NameMark lockup**: horizontal chain of boxes — solid logo square (white circle crosshair) + 1px-bordered name box (48px UPPERCASE + 8px underline bar) + bordered spacer + QR block + barcode bars; orange folded-chevron row hanging below.
- **Hero**: masked band (notched-silhouette clip) containing the rotated plus-mark lattice behind the robot portrait; left column = Strelka SVG display words (real text in `.visually-hidden` h1), 36px tagline, 24px sub-line.
- **CaseStudyStatus**: bordered-free status block — 32px title, `// INITIALIZING...` terminal line, flex STATUS rows (nowrap label, right-aligned value; NO dotted leaders in this design — alignment is pure flex).
- **CaseStudyRow** (x3): numeral rail (352px, bottom-aligned 200px outlined numeral) + card column (32px title → 1073x750 screenshot with 1px solid black border → 20px description with bold spans, max-width 726px). Rows separated by overhanging rules, 96px gaps.
- **ResumeSection**: sits on `--plate-resume` plate with corner plus marks; header row (mono label + triple chevron ←→ peach button); 4 rows of [NHG 48px title | role+date paragraph + 3-line body at right column]; 2px `--rule-soft` separators between rows.
- **LinksGrid**: 3x2 CSS grid bounded by rules (full-bleed top/bottom, inset middle rule); each link cell = numbered UPPERCASE link (top-left) + 52px arrow-out icon (top-right) + 18px description (below). Non-link cells: dot-matrix block, orange hatch block, coil+R mark.
- **Footer**: solid `--ink` band inset 60px from page edges (NOT full-bleed), 405px tall at design width; Strelka wordmark SVGs (real text equivalents hidden), flag mark, globe mark, 3-line right-aligned mono legal block. Bottom-flush with the page.

## 3. Structural Directives

- Each section is its own component in `src/components/site/` with a co-located CSS module. Shared motifs (PlusMark, Chevron, rules) live in `src/components/site/motifs.tsx`.
- Real text ALWAYS exists in the DOM for anything rendered as SVG type (hero words, footer wordmarks) — `.visually-hidden` pattern, correct heading hierarchy (single `<h1>`: "Andrew Marks — UX & Product Designer").
- Screenshots/portraits use `next/image` with explicit width/height (no layout shift).
- Never add hover/interaction states — interaction designs are Andrew's, pending. Only `cursor: pointer` and `:focus-visible` outlines (a11y floor) until they land.
- No border-radius anywhere except the circular R badge (12px = circle). No shadows anywhere.
- All decorative elements (`aria-hidden="true"`) — hatches, dots, plus marks, chevrons, barcode, QR block.
