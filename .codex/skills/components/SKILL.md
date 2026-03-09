---
name: Component Patterns (AM-9310-TSR)
description: Structural HTML/React patterns for the Andrew Marks Design project. Defines layout grids, cards, boundaries, and specific UI blocks.
---

# AM-9310-TSR Component Patterns

You are an AI coding assistant. Follow these exact structural and DOM patterns when building UI components for this project.

## 1. Structural Cards & Blocks
- **The Main `.card` Container**: All primary content sits inside a central, scalable `.card` container. It uses a thick `#271E0C` outer border.
- **Inner `.block` Sections**: Content is divided into horizontal sections (`.header-block`, `.canvas-block`, `.footer-block`, `.link-block`). They stack vertically inside the card.
- **Boundary Injections**: Between every `.block`, you MUST inject a boundary divider to maintain the technical brutalist grid. The structure is strictly:
  ```html
  <div className="boundary b-top">
    <div className="hline"></div>
    <div className="cross cross-left"></div>
    <div className="cross cross-right"></div>
  </div>
  ```

## 2. Interactive & Layout Elements
- **Navigation/Link Blocks (01, 02, 03...)**: These use a CSS Grid layout. Each block contains:
  - Top-left: A two-digit number (e.g., `01`, `02`) in Monospace font.
  - Center/Bottom-left: Descriptive text or a title.
  - Top-right: An external link arrow icon (`↗`).
  - Background (optional): Warning blocks use a diagonal hatch pattern (`repeating-linear-gradient`).
- **Status / Terminal Rows**: Used for metadata (e.g., `[ STATUS: ........ Coming Soon ]`). Built using flexbox. The middle spacer uses a dotted border-bottom (`border-bottom: 2px dotted #aaa;`) to create the leader line effect between the label and the value.
- **Data Sub-Grids**: Data visualization blocks (e.g., Github contributions) use a CSS Grid of perfectly circular `1px` or `2px` dots (`#271E0C`), with active nodes colored orange (`#F38150`).

## 3. Structural Directives
- DO NOT use padding on the main `.card` to separate sections. Use padding inside individually defined `.block` containers.
- Maintain strict alignment to the `1px` intersecting grid structure defined in the design system styles.
