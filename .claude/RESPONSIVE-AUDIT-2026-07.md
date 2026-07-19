# Responsive Audit — 2026-07-19

Method: production build served locally; 4 pages (home, P1, ChatVET, KOS) × 15 widths (320–1920) full-page captures + DOM overflow scan (element rects vs viewport, catching what `html{overflow-x:clip}` hides); 16 vision reviews (page × width-band) + synthesis; lightbox smoke at 390/834/1440.

## Verdict
Structurally responsive-sound across 320–1920: zero out-of-viewport elements on all case-study pages at every width; no overlap, clipping, or stacking failures in the layout system. Breakpoints (1439/1023/639), grids, nav wrapping, plate/gutter system all behave.

## Findings → resolutions
- **"Blank Knowledge-OS card" (flagged P1)** — FALSE ALARM: harness artifact. Full-page capture doesn't trigger native lazy-load; with real scrolling the image loads (`naturalWidth 793`). Site unchanged; sweep harness now scrolls through before capture.
- **Lightbox pan affordance (P2)** — FIXED: when the open figure overflows its region (phones/tablets — figures render at natural width by design), the dialog gets `data-pan` and shows a mono "← DRAG TO PAN — FIGURE SHOWN AT FULL SIZE" strip + thin styled scrollbar. Desktop never shows it.
- **`[+] ENLARGE` badge strike-through at 320 (P2)** — FIXED: opaque plate background + 1px/4px padding on the badge.
- **Case-hero H1 widow ("have / to.", KOS at 1024/1152/1440) (P3)** — FIXED: `text-wrap: balance` on `.title` (all case heroes).
- **MetaBar dangling pipe at phone widths (P3)** — LEFT AS-IS, Andrew's call: current trailing-pipe glue is the navbar round's ratified wrap contract ("never strand a `|` at line start"); the audit prefers pipe-before-link (never end a line with `|`). One edge always dangles; flipping it is a one-line change either way.
- **KOS 4-up placeholder labels cramped at 1024 (P3)** — DEFERRED: placeholder-era content; re-check when real images land.

## Intentional, confirmed checked (don't re-flag)
Registration-mark overhangs; full-bleed rows + barcode/swatch strips; hatch gutters; plate max-width 1728 with wider gutters beyond; labeled gray placeholder boxes; dense-figure small text on phones (lightbox is the reading path); case-card beam segments + ChatVET peek sprites (clipped inside cards — DOM-scan flags only); ~3px robot canvas rect overhang at 320 (art stays inside the plate hairline).
