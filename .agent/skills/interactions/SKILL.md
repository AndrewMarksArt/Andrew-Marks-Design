---
name: Interaction Patterns (Portfolio Redesign)
description: Defines the standard interactions, hover states, and animations for the Andrew Marks Design project.
---

# Portfolio Redesign Interaction Patterns

You are an AI coding assistant. Follow these rules when implementing dynamic UI states for this project.

## 1. Current Status: Interactions are DEFERRED (2026-07-09)

Andrew has interaction designs for the redesign but they are not yet shared. **Do not invent hover/pressed/expanded states.** The v1 build ships static. Until his designs land, the only permitted interactive affordances are:

- `cursor: pointer` on real links/buttons
- `:focus-visible` outline (2px solid `var(--accent)`, offset 2px) — accessibility floor, non-negotiable
- Default browser active states (do not suppress)

When his interaction designs arrive, they replace this section.

## 2. Animation Conventions (carried forward — still canon)

- **The "Blink" Effect**: terminal cursors use rigid step-end timing:
  ```css
  @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
  .cursor { animation: blink 1s step-end infinite; }
  ```
  ⚠ Declare `@keyframes` at stylesheet top level — NEVER nested inside a style rule (CSS nesting drops them silently; this bug shipped once).
- **Typewriter**: JS-driven character-by-character reveal for terminal readouts. If the text sits in an `aria-live` region, announce ONLY the final string once — never per-keystroke, and never in an infinite loop (screen-reader spam; this bug shipped once).
- **Sequence reveals**: crisp `cubic-bezier(0.87, 0, 0.13, 1)` or instant step reveals synchronized with layout boundaries. Avoid soft eases. Make sure every phase lives at least as long as the animations it triggers (a reveal cut short snaps visibly; this bug shipped once).

## 3. Accessibility Requirements (apply to ALL future interactions)

- Honor `prefers-reduced-motion: reduce` — gate every non-essential animation behind the media query; provide instant-state equivalents.
- Never disable zoom (`user-scalable`/`maximumScale` stay untouched) and never let JS scaling defeat browser text zoom.
- Flashing elements stay under 3 flashes/second.
- Anything animated that conveys state needs a static text equivalent.
