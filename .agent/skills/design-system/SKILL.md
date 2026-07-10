---
name: Design System Guidelines (Portfolio Redesign)
description: Implements the exact measured Figma values for colors, fonts, and typography.
---

# Portfolio Redesign Design System Rules

You are an AI coding assistant. Whenever you generate CSS or inline styles for this project, use ONLY the following design tokens and exact values. Do not invent new colors or fonts. The full measured spec (with per-node provenance) lives in `.claude/design-spec-portfolio-redesign.md` — consult it for anything not covered here.

## 1. Color Tokens (ratified 2026-07-09)

- **`--ink`** `#231A09` — primary ink: headlines, hero display fill, icon strokes, footer band background
- **`--ink-deep`** `#271E0C` — dark brown fills: logo square, underline bars, QR/barcode bars, swatch 4
- **`--black`** `#000000` — case/status titles, resume text, links 02-05, plus marks, image borders, button border/text
- **`--accent`** `#EC4E09` — brand orange: chevrons, `// INITIALIZING...`, hatch blocks, active dots
- **`--accent-deep`** `#A43B0D` — hero plus-mark field only (at stroke-opacity 0.83)
- **`--accent-soft`** `#FBC0A6` — peach button background
- **`--teal`** `#45857B` · **`--green-gray`** `#333E32` (swatches; green-gray also STATUS row text)
- **`--numeral-sage`** `#728370` — giant case-study numeral outline stroke
- **`--meta-gray`** `#5E5757` — meta/utility bar text
- **`--plate`** `#FFFFFF` — the page content plate (NOT #EDEDED; the gray look is gutter hatch only)
- **`--plate-resume`** `rgba(237,237,237,0.425)` — resume section plate (≈ #F7F7F7 over white)
- **`--on-dark`** `rgba(255,255,255,0.9)` — everything on the footer band (≈ #E9E8E6 rendered)
- **`--rule`** `rgba(0,0,0,0.375)` — 2px page/grid rules, dividers, case separators
- **`--rule-soft`** `rgba(0,0,0,0.25)` — 2px resume row separators (distinct recipe, keep)
- **`--dot-idle`** `rgba(0,0,0,0.33)` — dot-grid default dots
- **`--hatch`** `rgba(0,0,0,0.025)` — gutter hatch stripe color
- Body text alphas: case descriptions `rgba(0,0,0,0.9)`, link descriptions `rgba(0,0,0,0.8)`

## 2. Font Families

- **Display**: Strelka — but ONLY as the flattened/manipulated SVG lockups exported from Figma (`public/hero/*.svg`, `public/footer/*.svg`). Never set Strelka as a CSS font; keep real text for a11y/SEO in visually-hidden elements.
- **Sans**: `Geist` (next/font/google, weights 400-900) → `var(--font-geist)`
- **Mono**: `Geist Mono` (next/font/google, weights 300/400/600) → `var(--font-geist-mono)`
- **Editorial**: `Neue Haas Grotesk Display Pro` via Adobe Fonts kit (55 Roman / 65 Medium / 75 Bold) → `var(--font-nhg)`; until the kit ID lands, the variable falls back to Geist. Used ONLY in resume rows and giant case numerals.

## 3. Text Styles (re-scaled 2026-07-09: one tier smaller than the Figma frame — Andrew's ruling; ladder 40-28-24-20-18-16-14 under the locked display sizes. Tracking = em equivalents of the measured -2%/+2%.)

- **Meta bar**: Geist Mono Light 300, 18px, lh 1, tracking -2%, `--meta-gray`
- **Name mark**: Geist ExtraBold 800, 48px, lh 1.25 cap-trimmed, tracking -2%, `--ink`, UPPERCASE (drawn brand mark — LOCKED)
- **Hero tagline**: Geist Medium 500, 36px, lh 1.25, tracking -2%, `--ink` (LOCKED)
- **Hero sub-line**: Geist Regular 400, 24px, lh 1.45, tracking -2%, `--ink` (LOCKED)
- **Section title (status)**: Geist SemiBold 600, 24px, lh 1.25, tracking -2%, `--black`
- **Terminal lines**: Geist Mono Regular 400, 18px (status rows 14px), lh 1, tracking -2%; `--accent` for `// ...` lines (aria-hidden decoration), `--green-gray` for STATUS rows
- **Case numeral**: NHG 75 Bold 200px, transparent fill + 2px `--numeral-sage` stroke (LOCKED)
- **Case title**: Geist Medium 500, 28px, lh 1.25, tracking -0.5%, `--black`
- **Case description**: Geist Regular 400, 18px, lh 1.45, tracking +2%, `rgba(0,0,0,0.9)`; bold spans Geist Bold 700 same size
- **Resume label**: Geist Mono Light 300, 24px, lh 1, tracking -2%, `--ink`
- **Resume row title**: NHG 65 Medium 40px, lh 1.25, tracking +2%, `--black`
- **Resume role / date**: NHG 65 Medium 24px / 16px, lh 1.45, tracking -0.5%, `--black`
- **Resume body**: NHG 55 Roman 20px, lh 1.45, tracking -0.5%, `--black`
- **Button label**: Geist Regular 400, 18px, in a 44px-min box at all widths
- **Numbered link**: Geist SemiBold 600, 20px, lh 0.95, UPPERCASE, `--ink-deep`/`--black`
- **Link description**: Geist Medium 500, 16px, lh 1.45, tracking +2%, `rgba(0,0,0,0.8)`; bold lead-ins 700 `--black`
- **Footer legal**: Geist Mono SemiBold 600, 14px, lh 1.45, tracking -2%, `--on-dark`, UPPERCASE
- Sizes are clamp() fluid: `clamp(MIN, calc(MAX / 1728 * 100vw), MAXpx)`, MIN ≈ proportional with floors (12px mono / 14px body).
- Cap-height trim: layouts assume `text-box-trim: trim-both; text-box-edge: cap alphabetic` on display/heading text (with fallback margins where unsupported).

## 4. Layout Constants

- Design width **1728px**; page plate = white, spanning between vertical rules at **x=60 / x=1668** (60px gutters showing the hatch).
- Content column inset **64px** from the rules (content spans 124..1604 at 1728) — single alignment grid, ratified.
- Rules: **2px** stroke at `--rule`. Section furniture (16px insets inside bands/cells) = the "double margin" system: 60px gutter → 64px content inset → 16px inner pads.
- **8-POINT SPACING SYSTEM (ratified 2026-07-09)**: every padding/margin/gap/min-height is a multiple of 8 (4px allowed as a deliberate micro half-step). Round UP where padding abuts text. EXEMPT — drawn geometry is ink, not spacing: plus marks, swatches, barcode/QR/chevrons, icons, dot pitches, dash patterns, rule thicknesses/straddle offsets (-1px), cap-trim compensations, and the NameMark lockup's internal em-based boxes.
- Gutter hatch (page background, behind the plate): `repeating-linear-gradient(50.79deg, var(--hatch) 0 31.35px, transparent 31.35px 61.81px)`.

## 5. Distinctive Motifs

- **Plus-mark registration crosses**: 32x32, two 4px solid `--black` strokes crossing at center; pinned on rule intersections (divider ends, plate corners, section boundaries). Hero variant: 26.35px, 2px, `--accent-deep` @0.83, rotated -45.67°, 99-instance lattice.
- **Folded chevron**: 16px path `M12.2426 12.2426L12 4L16 0V16H0L4 12L12.2426 12.2426Z` fill `--accent`, rotated 45°; header row = 6 at 30px pitch + 1 outlier. Resume triple-chevron: three 45° mitered Vs, 30px pitch.
- **Barcode bars**: left-aligned 6px-tall `--ink-deep` bars, widths 30/21/81/66/95, 12px pitch.
- **QR/registration block**: nested squares from 8px dark bars + 12px white knockouts + 12px dark center in a 1px-bordered 77px square.
- **Hazard-slant bars**: 7 parallelograms slanting ~43.6°, fill `--ink`.
- **Dot matrix**: 6px dots `--dot-idle`, ~33px/29px pitch, active dots 8px `--accent` in 2x2 clusters.
- **Orange hatch block**: 45° ascending `--accent` 2px lines, 28px x-spacing, clipped rect.
- **Outlined giant type**: transparent fill + stroke (numerals) or outlined SVG (Strelka lockups) — the signature display language.
- **Overhanging hairline rules**: separators deliberately wider than their content frames (drafting-table register).
- **Terminal idiom**: `//` prefixes, SCREAMING_SNAKE, `[C]`, `...`-prefixed boot-log values — monospace, mandatory for metadata.
