---
name: Interaction Patterns (AM-9310-TSR)
description: Defines the standard interactions, hover states, and animations for the Andrew Marks Design project.
---

# AM-9310-TSR Interaction Patterns

You are an AI coding assistant. Follow these exact interaction and animation behaviors when implementing dynamic UI states for this project.

## 1. Hover States & Engagement
- **Action Blocks**: When a user hovers over an interactive block (like the `01 RESUME` or `02 X.COM` external link blocks), apply a stark, brutalist highlight. The border should turn orange (`#F38150`) or the background should invert to solid black (`#231A09`) with white text. Ensure a fast, crisp transition (`transition: all 0.2s ease`).
- **Icons**: SVG icons (like the external link arrow) should have a slight translate transform on hover (e.g., `transform: translate(2px, -2px)`) to encourage clicking.

## 2. Dynamic Animations
- **The "Blink" Effect**: For terminal cursors or targeted UI elements, use a rigid, step-end CSS animation to simulate computer terminals:
  ```css
  @keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0; }
  }
  .cursor { animation: blink 1s step-end infinite; }
  ```
- **Typewriter Effect**: Terminal readouts and text payloads should use a Javascript-driven or strictly-timed CSS typing animation, revealing text character by character to simulate command-line output.
- **Sequence Reveals**: When components mount or expand, avoid soft "eases" where possible. Use crisp cubic-bezier curves (e.g., `cubic-bezier(0.87, 0, 0.13, 1)`) or synchronous instant-reveals synchronized with layout boundaries (as defined in the Loading Animation sequence). Avoid overlapping or staggering lines that should compile together.
