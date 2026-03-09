---
name: Design System Guidelines (AM-9310-TSR)
description: Implements the exact Figma local styles and variables for colors, fonts, and typography.
---

# AM-9310-TSR Design System Rules

You are an AI coding assistant. Whenever you generate CSS, Tailwind, or inline styles for this project, you must ONLY use the following design system variables and exact values. Do not invent new colors or fonts.

## 1. Colors & Fills (Hex / RGB)
- **Page Base** (Under stripes): `#EDEDED`
- **Stripe Light** (Diagonal lines): `#E7E7E7`
- **Surface Primary** (Solid background blocks): `#FFFFFF`
- **Inverse/Dark** (Footer, dark accent blocks): `#231A09`
- **Accent** (Orange status boxes/dividers): `#F38150`
- **Text Primary** (Main body/headers): `#271E0C`
- **Text Inverse** (On dark backgrounds): `#E9E8E6`
- **Text Accent** (Orange terminal text): `#CD3F01`
- **Text Muted** (Secondary metadata): `#333E32`
- **Border Primary** (Grid lines): `#3B3B3B`
- **Swatch Teal** (Hero accent square): `#45857B`
- **Swatch Olive** (Hero accent square): `#333E32`

## 2. Font Families
- **Display Font**: `Strelka`
- **Sans-Serif Font**: `Geist`
- **Monospace Font**: `Geist Mono`

## 3. Text Styles (Size / Weight / Line-Height / Letter-Spacing)
- **Hero Display**: (Dynamic size, use best judgment based on layout)
- **H1 (Hero Description)**: `48px`, Medium, `125%` line-height, `-2%` letter-spacing
- **H2 (Lrg Section Headers)**: `32px`, Semi-bold, `125%` line-height, `-2%` letter-spacing
- **H3 (Sm Section Headers)**: `24px`, Semi-bold, `125%` line-height
- **Body Base**: `18px`, Medium, `145%` line-height, `2%` letter-spacing
- **Mono Accent** (e.g., terminal output): `20px`, Medium, `100%` line-height, `-2%` letter-spacing

## 4. Geometric Layout & Grid Structures
- **Infinite Grids**: Use `1px` high/wide `#3B3B3B` borders extending infinitely outward (`200vw`/`200vh`) to form the intersecting coordinate grid.
- **Crosshairs (`+`)**: Grid intersection points must be marked unconditionally with an `11x11px` center-aligned pure black `+` symbol on `.boundary` corners.
- **Block Containment**: The primary interior grid (01, 02, 03 layout blocks) utilizes thick `#271E0C` borders scaling dynamically to the container to divide content. Sub-elements pad tightly within these boxed bounds (`~24px-40px` padding rules based on block size).

## 5. Distinctive Motifs & Shapes
- **Chamfered Cuts**: Whenever a sci-fi "cutout" container is used (such as the top-right notch in the Hero Image container), use CSS `clip-path: polygon` to achieve the sharp diagonal angle. (e.g., `clip-path: polygon(0 0, calc(100% - 40px) 0, 100% 40px, 100% 100%, 0 100%)`).
- **Hatch Stripes**: Background stripes and warning blocks (like `03 LINKED IN`) use repeated diagonal `<line>` SVG strokes or `repeating-linear-gradient` filled with the base `#E7E7E7` or accent `#F38150` colors at a 45-degree angle.
- **Dot Matrices**: Data-viz blocks (like `04 GITHUB`) use a precisely spaced `1px` grid of dots, colored `#271E0C`, with arbitrary orange `#F38150` highlighted dots representing activated terminal nodes.
- **Bracket & Terminal Decorators**: Wrapping metadata in rigid brackets `[ LIKE THIS ]` or using double-slashes `// COMMENT` is mandatory for small subheads. Date stamps and coordinates apply monospace fonts without exception.
