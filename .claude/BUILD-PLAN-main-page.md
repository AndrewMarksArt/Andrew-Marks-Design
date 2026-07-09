# Build Plan — Main Page (Portfolio Redesign)

Source of truth: `.claude/design-spec-portfolio-redesign.md` (measured values) + `design/full-page/home-desktop.png` (visual target). Work happens on `dev`; `main` keeps the placeholder until cutover.

## Architecture

```
src/app/layout.tsx          fonts (next/font Geist + Geist Mono; --font-nhg var), metadata
src/app/globals.css         tokens, base reset, page shell (hatch, plate, rules), utilities
src/app/page.tsx            section composition only
src/components/site/
  MetaBar.tsx + .module.css
  NameMark.tsx + .module.css
  Hero.tsx + .module.css
  CaseStudyStatus.tsx + .module.css
  CaseStudies.tsx + .module.css      (3 rows, data-driven)
  ResumeSection.tsx + .module.css
  LinksGrid.tsx + .module.css
  Footer.tsx + .module.css
  motifs.tsx                          PlusMark, FoldedChevron, TripleChevron, BarcodeBars,
                                      QrBlock, DesignMark, ColorSwatches, ArrowOutIcon (shared, inline SVG)
  motifs.module.css
public/
  hero/ux-product.svg, designer.svg, hero-mask.svg, robot.webp (+robot@2x)
  footer/andrew-marks-wordmark.svg, design-wordmark.svg
  case-studies/platform-one.png, chat-vet.png, knowledge-os.png
```

Old placeholder components (GazePortrait, Typewriter, LoadingAnimation) stay in `src/components/` unused — likely revived when interaction designs land. Old `page.module.css` (dead template CSS) is deleted.

## Conventions

- Plain CSS + CSS modules (no Tailwind — matches project). Tokens as CSS custom properties in `globals.css` `:root` per the design-system skill.
- All px values from the spec, expressed at design scale; fluid behavior via the strategy below, type via `clamp()`.
- `@keyframes` only at stylesheet top level. No hover states (interactions deferred); `:focus-visible` floor only.
- Real text in DOM for all SVG type. Single `<h1>` = "Andrew Marks — UX & Product Designer" (visually hidden, hero owns it). Sections use `<section aria-labelledby>` with real headings (h2s: Case Studies, Resume Highlights, Links/Connect, plus footer contentinfo).
- Decorations `aria-hidden`. Images via `next/image` (screenshots: width/height 1440x1080, sizes attr).
- `prefers-reduced-motion` honored for anything that moves (v1 is static anyway).
- Viewport: NO maximumScale/userScalable restrictions.

## Fonts

- `Geist` + `Geist_Mono` via `next/font/google`, CSS vars `--font-geist`, `--font-geist-mono`.
- NHG Display Pro: `--font-nhg: "neue-haas-grotesk-display", var(--font-geist), sans-serif`. TODO(Andrew): create Adobe Fonts web project with NHG Display Pro 55/65/75, provide kit URL → `<link rel="stylesheet" href="https://use.typekit.net/KIT_ID.css">` in layout. Until then Geist renders in its place (weights 400/500/700 map).
- Strelka: never loaded — flattened SVG lockups only.

## Responsive strategy (builder-designed, Andrew delegated 2026-07-09)

Design frame is 1728. The page is **fluid up to a 1728px max**, centered; hatch gutters extend beyond on ultrawide.

Breakpoints (max-width queries, desktop-first since the source design is desktop):

| Range | Shell | Sections |
|---|---|---|
| ≥1440 | 60px gutters, 64px content inset, exact design proportions (columns as % of 1604 content width) | As designed |
| 1024–1439 | gutters 40px, content inset 48px | Same structure; type scales via clamp; case screenshot scales with column |
| 640–1023 | gutters 24px, content inset 24px; interior column rules hidden | Case rows: numeral shrinks (clamp 96–140px) and moves above card; resume rows stack (title above content, full width); links grid → 2 columns (decorative cells keep their blocks); hero: text full-width, masked robot band below text at full width; name-mark drops QR + barcode segments (logo + name box keep) |
| <640 | gutters 12px, plate effectively full-bleed with hairline rules at edges | Everything single column; links grid 1 col (rules between rows); meta bar wraps to 2 lines; swatches/design-mark row wraps; footer wordmarks scale to width (SVG), legal block left-aligns below marks |

Type scale: `clamp(min, fluid vw, spec)` — e.g. hero tagline `clamp(22px, 36 / 1728 * 100vw, 36px)`, case numeral `clamp(96px, 200 / 1728 * 100vw, 200px)`, resume title `clamp(28px, 48 / 1728 * 100vw, 48px)`. Body floors: 16px.
Display SVGs scale with `width: 100%; max-width: <natural px>; height: auto` — vector, no quality loss.
Wrap, never horizontal-scroll (ux house rule). Test targets: 1728, 1280, 768, 390, 320.

## Verification loop

1. `npm run dev` → Playwright screenshots at 1728x1000 (scroll pages), 1024, 390.
2. Compare against `design/full-page/home-desktop.png` crops per section.
3. `npx tsc --noEmit` + `npm run lint` + `npm run build` clean.
4. QA checklist in chat (ship-phase ritual) when PR-ready.

## Cutover (later, Andrew's gate)

PR `dev` → `main`; Andrew merges. Placeholder assets/components cleaned up in a follow-up commit after the new site is stable in production.
