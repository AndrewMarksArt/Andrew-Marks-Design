---
name: Interaction Patterns (Portfolio Redesign)
description: Defines the standard interactions, hover states, and animations for the Andrew Marks Design project.
---

# Portfolio Redesign Interaction Patterns

You are an AI coding assistant. Follow these rules when implementing dynamic UI states for this project.

## 1. Current Status: Interactions ship via Andrew's review process (updated 2026-07-19)

The 2026-07-09 blanket deferral is superseded — the site now ships Andrew-approved interactions (navbar hover/active grammar, case-card beams and peek sprites, the figure lightbox, the boot film, the Operating Record expanding ledger). The standing rule instead:

- **New interactive states go through Andrew's process**: initial plan → adversarial UX review → build → closing audit. Never invent hover/pressed/expanded states ad hoc — propose them through that pipeline, and treat Andrew's ratified patterns (draw-in underlines, `[+]`-chip affordances, Apple-curve motion, instant-close overlays) as the vocabulary to extend.
- `cursor: pointer`/`zoom-in` on real controls, `:focus-visible` outline (2px solid `var(--accent)`, offset 2px), and default browser active states remain the non-negotiable floor everywhere.

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
