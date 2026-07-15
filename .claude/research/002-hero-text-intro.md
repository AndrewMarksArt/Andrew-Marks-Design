# Andrew-Marks-Design — Hero Text Intro Animation: Research Synthesis

**Date:** 2026-07-15 · **Scope:** Load sequence — robot quick-fade → "UX & PRODUCT DESIGNER" (flattened SVG lockups) → subhead → typed terminal line — at Apple/Awwwards quality in Next.js 16 / React 19 / CSS modules. Five investigators + adversarial critic; Apple findings verified against apple.com's actual shipped CSS/JS, not teardowns.

## 1. What the research established (post-critique)

**The Apple surprise (verified against live pages + downloaded built CSS/JS):** Apple *never* hides or animates hero text on load — `.marquee-header` etc. are opacity:1 from first paint on macbook-pro, vision-pro, iphone-17-pro, and the homepage. Their entrance system ("StaggeredFadeIn") is scroll-triggered below the fold: whole **blocks** (never chars/words) fade 0→1 over 0.9s while rising 30px→0 over 0.7s — the transform lands 200ms before the fade finishes (their signature softness) — items staggered 0.15s, ease `cubic-bezier(0.455, 0.03, 0.515, 0.955)`. Exemplary hygiene: `will-change` only during animation then reverted; triple-layered reduced-motion; `html.no-js` forces content visible. The famous "Vision Pro text blur" was NOT found on any current Apple page (unverified as ever shipping).

**The Awwwards signature:** the **masked line reveal** — text rises from behind a static overflow-clip into place (translateY(110%)→0), lines staggered 0.075–0.1s, hard-decelerating ease, total cascade kept under ~1s. Canonical numbers (Osmo/Snellenberg, Codrops-verified): lines 0.8s/0.08 stagger; words 0.6/0.06; chars 0.4/0.008. GSAP SplitText (now verified 100% free) productizes this with `mask:"lines"` + `autoSplit` for fluid text.

**The LCP truth (architecture-deciding, all primary-sourced):** opacity:0 content is NOT an LCP candidate; hiding hero text at load *moves the LCP timestamp to the reveal moment* (Chrome 86+ counts reveal time; Chrome 130 closed the transparent-text loophole — do not build on invisible-paint hacks). The robot `<canvas>` and inline lattice `<svg>` can never be LCP (not candidate types) — **the robot's fade and the 1.6MB atlas are LCP-irrelevant**. LCP will be the lockup `<img>`s or the ~3-line tagline block; whichever reveals last, revealed late, sets LCP. The 14px typed line is too small to ever be LCP — type it as slowly as taste wants. Consequence: **keep display+subhead fully revealed within ~1.0–1.2s of first paint**; measure the LCP element on the deployed preview as the acceptance gate.

**The architecture verdict:** hybrid "CSS reveals, JS enhances." All text reveals = pure CSS animation-delay chain (`animation-fill-mode: both`) authored **inside `@media (prefers-reduced-motion: no-preference)`** — so no-JS, reduced-motion, and old browsers get instantly-visible content *by construction* (critic: do NOT add a JS-stamped hiding gate; that reintroduces the stuck-hidden failure). JS exists in exactly two places: HeroGaze flips a readiness attribute after `atlas.decode()` + first draw (robot fade), and the typewriter island. No animation library needed for a one-shot 4-step sequence.

**Mandatory bug fix found:** the global reduced-motion kill-switch (globals.css:186) zeroes durations but NOT `animation-delay` — a delay-chained hero would hold content invisible for the full delay under reduced motion. Fixed automatically by authoring the sequence opt-in inside the no-preference media query.

**Easing canon conflict (needs Andrew's ruling):** the interactions skill mandates crisp `cubic-bezier(0.87, 0, 0.13, 1)` / step reveals and says avoid soft eases; Apple's system is soft (`easeInOutQuad`), Awwwards leans hard-deceleration (`expo.out`-family like `cubic-bezier(0.19, 1, 0.22, 1)`). Recommendation: hard-deceleration for the rises (reads technical AND high-craft); flagged rather than silently shipped.

**Typewriter recipe (grounded in the repo's own liked prior art):** reuse the rAF engine from `main:src/components/Typewriter.tsx` but one-shot (no delete/loop). The sentence is exactly **53 typed chars** (the `// ` prefix is already a separate static span — don't type it). Cadence: jittered human feel — base ~30ms/char, uniform [0.5×,1.5×] jitter (TypeIt's verified formula), +~75ms after spaces, brief pause at punctuation → ≈1.8–2.2s total. Caret: the site's step-end blinking underscore in accent orange, ~530ms phases (OS convention), **stops after 2–3 blinks post-completion** (WCAG 2.2.2-conservative). A11y (critic-verified against ARIA 1.2): `aria-label` on a `<p>` is spec-PROHIBITED — use visually-hidden static full sentence + `aria-hidden` typed copy; never `aria-live` per keystroke (screen-reader spam; that bug shipped once on this site). Server-render the full sentence for no-JS.

## 2. The recommended sequence (Option A — zero dependencies)

| t | Element | Move |
|---|---|---|
| 0ms | robot band | opacity fade ~400ms, gated on `atlas.decode()` readiness attr; CSS fallback reveals by ~1.4s regardless |
| ~150ms | "UX & PRODUCT" lockup | masked rise: static overflow-clip wrapper, inner `translateY(110%)→0` ~550ms |
| ~270ms | "DESIGNER" lockup | same, +120ms stagger |
| ~500ms | subhead | whole-block rise+fade (translateY ~20px + opacity, ~500ms) |
| ~950ms | terminal line | `// ` sits static; sentence types ~2s; caret blinks 2–3× then stops |

Visible text complete ≈1.05s (LCP-safe); full settle ≈3s; nothing below the hero is gated. Percentage translates are compositor-safe (critic verified: Chromium 89+ composites percentage transforms — the 2020 "coming soon" caution is outdated). Everything transform/opacity.

**Option B (+GSAP, ~27KB):** same skeleton, but the subhead gets a per-LINE masked reveal via SplitText `mask:"lines"` + `autoSplit` (3 lines rising staggered 0.08s — the full Awwwards flourish on the one element that can take it). Worth it only for that flourish.

**Option C (Apple-soft):** same skeleton with Apple's exact values (30px rise, 0.9s/0.7s dual-duration, easeInOutQuad, 0.15s staggers) — gentler, more "marketing", conflicts with the house crisp-ease canon.

## 3. Known traps
- Don't animate the band's existing static mask-image, clip-path, or mask properties (not composited; static masks fine).
- Don't remove `priority`/`preload` from the lockups/atlas — the choreography assumes assets beat the reveal.
- Reserve the typed line's height (min-height on ≤639px where it wraps) — zero CLS.
- Fonts: `next/font` defaults (swap + size-adjusted fallback) mean text reveals don't need font-load gating; the lockups are SVG (font-immune).
- Sequence must not re-run on client navigation back to home (run once per load; App Router remounts are fine — it's a fresh load each hard navigation; SPA back-nav will re-run → acceptable, or gate with sessionStorage if it annoys).
- UNVERIFIED items + settling tests logged in the critique record; the two that matter: which element actually wins LCP (measure on deployed preview — the acceptance gate) and the masked-rise-vs-LCP equivalence (assume conservative; same measurement settles it).

## 4. How this works (plain English)
The page ships with all hero text present in the HTML (search engines and no-JS visitors see everything instantly). A few lines of CSS say: "for people who haven't asked for reduced motion, start these elements invisible and play a short one-time entrance — each element a beat after the previous." The display words rise up from behind an invisible clipping line, like print emerging from a slot. The robot fades in as soon as its sprite sheet is decoded. The last line types itself out character by character with a blinking terminal cursor that stops blinking once it's done, exactly like the old placeholder's boot line — that typewriter code is reused, taught to type once and stop. If anything goes wrong (JS fails, slow network), the CSS itself un-hides everything — nothing can stay invisible.

## 5. Proposed next step (Andrew picks — nothing built)
1. **Option A** — CSS-first crisp sequence, zero dependencies (recommended)
2. **Option B** — A + GSAP SplitText per-line subhead reveal (+27KB for one flourish)
3. **Option C** — Apple-soft variant (their exact numbers/easing)
Plus one ruling: crisp house ease vs hard-deceleration (`expo.out`) vs Apple-soft for the rises.
Build gate whichever wins: LCP measurement on the deployed preview before/after.

## Sources (critic-verified highlights)
apple.com/macbook-pro built CSS+JS (StaggeredFadeIn tokens verbatim) · web.dev/articles/lcp + Chrome 86/130 changelogs (opacity-0 exclusion, reveal-time counting, transparent-text closure) · developer.chrome.com/blog/hardware-accelerated-animations (percentage transforms composited since Chromium 89) · gsap.com/blog/3-13 (SplitText free) + SplitText docs (mask, autoSplit, aria) · Codrops Osmo demo values · Olivier Larose text-mask tutorial · WAI-ARIA 1.2 §5.2.8.6 (name-prohibited roles) · WCAG 2.2.2 · main:src/components/Typewriter.tsx + main:src/app/page.tsx (repo prior art, exact timings) · TypeIt source (jitter formula)
