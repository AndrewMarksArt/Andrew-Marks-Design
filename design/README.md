# Design References

Drop design exports here to drive the full-site build. All work happens on the
`dev` branch — `main` keeps serving the placeholder until the new site is
approved and merged.

## Folder layout

| Folder       | What goes here                                                              |
| ------------ | --------------------------------------------------------------------------- |
| `full-page/` | Whole-page exports — e.g. `home-desktop.png`, `home-mobile.png`. One per page/breakpoint. |
| `sections/`  | Per-section crops when detail matters — `hero.png`, `work-grid.png`, `footer.png`, hover/active states. |
| `assets/`    | Final production assets the site will actually use — photos, logos, icons, sprite sheets. |
| `reference/` | Inspiration, interaction references, motion notes, anything "like this but…". |

## Conventions

- PNG at 1x for layout reference; include a mobile export for any page whose
  mobile layout isn't just "the desktop stacked".
- Name files by page/section, not by date: `home-desktop.png`, not `final-v3.png`.
- If the design lives in Figma, a link to the file beats any export — exact
  colors, type, and spacing get pulled via MCP instead of estimated from pixels.
  Paste links in this README under "Figma" below.

## Figma

- **Main page (final design)**: https://www.figma.com/design/CwHbrO2k4Euk4s3MDviQMy/Portfolio-redesign?node-id=6727-3413
  - File key `CwHbrO2k4Euk4s3MDviQMy`, frame `6727:3413` ("MacBook Pro 16 - 3", 1728x6062)
  - Full-res export: `full-page/home-desktop.png`
  - Measured spec: `../.claude/design-spec-portfolio-redesign.md`
