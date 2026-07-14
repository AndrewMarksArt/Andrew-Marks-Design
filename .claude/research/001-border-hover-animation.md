# Andrew-Marks-Design — Case-Study Border Hover Animation: Research Synthesis

**Date:** 2026-07-14 · **Scope:** Which border hover animation for the case-study cards looks premium, fits the technical/dieline design language (white page, sharp corners, orange #EC4E09), and stays jank-free next to the zoom + character animations. Hard requirement after two janky attempts: compositor-only animated properties, or provably cheap with a paint profile. Five investigators + one adversarial critic, all load-bearing claims traced to primary sources.

## 1. Comparison Table (scores 1–10, POST-critique)

| Option | Visual fit | Performance | Ease | Reference quality |
|---|---|---|---|---|
| **A: GSAP SVG stroke draw** (border draws itself / dash orbits, DrawSVG-style) | 9 | 6 | 8 | 8 |
| **B: Aceternity Moving Border** (glow head rides an SVG rect via JS) | 4 | 8 | 8 | 8 (was 9)¹ |
| **C: MagicUI Border Beam recipe** (beam recolors the ring from inside; our current tech) | 7 | 8 | 9 | 9 |
| **D: Rotating conic glow border** (@property spin) | 4 | 6 | 8 | 8 |
| **E: Design-native animated dieline** (marching dashes / draw-on / bracket slide) | 9 | 6 (was 7)² | 8 | 7 (was 8)³ |

¹ Critic: B's "zero-dependency vanilla port exists" reference actually depends on svelte-motion — the vanilla port is feasible (~40 lines) but unpublished.
² Critic: E's compositor-only claim is documented for Chromium/Firefox only; Safari compositing of SVG-child transforms is unestablished.
³ Critic: E's best look (continuous march) and its verified compositor-only reference (Codrops one-shot slide) are different variants; the continuous transform-strips variant has no published demo.

**Verified facts that shape everything:**
- Only `transform` and `opacity` (plus accelerated `filter`) are composited — everything else repaints (MDN Animation performance guide; web.dev animations-guide; Chrome dev blog hardware-accelerated-animations). SVG element animations are accelerated by default only since Chromium 89, Safari undocumented.
- Animated registered `@property` custom properties invalidate style and rasterize EVERY frame (bram.us gotcha article, Chromium issue 1411864 open) — this is precisely what janked attempt #1. web.dev's own border-animations tutorial teaches the janky mechanism with zero perf discussion.
- `offset-distance` animation is layout/paint-free but NOT proven composited (Chrome's accelerated list excludes it) — it is the mechanism our current comets use, measured jank-free at locked 60fps. "Provably cheap" ✓, "compositor" unverified.
- GSAP is now genuinely **100% free including all bonus plugins** (DrawSVG etc.) after the Webflow acquisition — verified at gsap.com/pricing and the standard-license page. Proprietary license, not OSI; only prohibition is building Webflow-competing animation tools. gsap core ≈ 26.6KB gzip + DrawSVG 2.2KB.
- MagicUI's pre-Feb-2025 border-beam is a **zero-dependency CSS-only** component (MIT, permalink verified) — the current npm version needlessly adds the 41KB `motion` library.

## 2. Ranked Recommendation

**The genre finding first:** the neon-glow beam genre (B stock, D canonical) fundamentally needs darkness — on a white page nothing can be brighter than the background, so glows read as smudges (D's investigator: "converges on #FBC0A6 mist… reads as a print misregistration"). Both scored 4 on visual fit. The two strong options both treat the border as **ink being drawn**, not light being emitted — which is this site's native language.

**Top pick — E: the animated dieline**, in one of two choreographies (Andrew's pick):
- **E1 "Marching dieline"**: at rest the card keeps its solid 1px black border. On hover, an orange dashed dieline activates and crawls slowly around the perimeter — the die-cut path being traced. The premium recipe is published (williammartinsson.com add-to-cart essay): static at rest, ~1.5s cycle on hover (NOT the default 0.2s selection-ants speed), ~4:3 dash ratio, hairline weight, linear easing.
- **E2 "Draw-on dieline"**: on hover the border draws itself around the frame from a corner (~0.6s one-shot), like a plotter tracing the cutline, and retracts on exit. Copyable references: GSAP mikeK pen (strokeDashoffset draw with hover play/reverse), Codrops 2014 border-animation (transform-slide variant, compositor-eligible).

Implementation path honesty (the critic's main gift): the classic one-liner for both (SVG `stroke-dashoffset` animation) is a **paint** animation — almost certainly cheap (a 1px `fill:none` outline is a few thousand pixels, vs. the card-sized textures that janked attempts 1–2) but it MUST pass a 30-minute DevTools paint-profile gate on the real cards before acceptance. If it fails, the guaranteed-cheap fallback is the transform-strips build (four overflow-hidden hairline strips with translated dash textures — no published demo, ~1–2h extra work). GSAP is optional for E1 (CSS keyframes suffice) and genuinely helpful for E2 (draw/reverse choreography, hover timeline control via the free DrawSVG plugin + useGSAP hook).

**Runner-up — C: the MagicUI in-ring beam.** Same animated property our current smooth-but-disliked comets use, but the visual grammar fixed: the beam lives INSIDE the 1px border ring (a double-mask trick recolors the hairline itself), with a long transparent-fading gradient — reads as current flowing through the dieline rather than objects orbiting the card. Vendor the CSS-only permalink version (zero deps, MIT). Prefer this if Andrew wants continuous ambient motion rather than E's drafting choreography; it is also the lowest-effort option (~1 evening incl. tuning).

**When to reconsider:** if the site ever gains a dark section (footer band is `--ink`!), the glow genre (D's one-shot Kevin Powell sweep) becomes viable there; if Safari <18 share matters (offset-path rect needs Safari 18+), E's SVG/strips paths win over C automatically.

## 3. Known traps
- The `@property --angle` conic tutorial (web.dev included) is the janky mechanism from attempt #1 — never reintroduce it on these cards.
- `backdrop-blur` under a translucent card face (Aceternity's signature inner glow) is the attempt-#2 failure mode at card size. Off the table.
- DrawSVG official docs: iOS Safari mis-renders `<rect>` strokes (use a `<path>`); Firefox miscalculates path length (use 102%).
- Marching ants at default speed/ratio reads as a selection rectangle (cheap); the Martinsson speed/ratio/static-rest recipe is what makes it premium.
- Corner seam: an infinite dash march only loops cleanly if perimeter ÷ dash period is an integer — normalize with `pathLength="100"` (UNVERIFIED in FF/Safari on `<rect>` — test, or hide the seam under the corner plus-marks, or measure perimeter with one ResizeObserver).
- UNVERIFIED items and their settling tests are listed in the critique record (paint cost of dashoffset on real cards → DevTools profile; Safari SVG-transform compositing → Safari timeline profile; pathLength support → 2-browser render test).

## 4. How this works (plain English)
An SVG is a drawing layer we place exactly on top of the card's border — invisible until hover. Its one shape is a rectangle outline whose stroke can be dashed, and browsers let us slide the dash pattern along the outline (that's the "marching" effect) or reveal the stroke progressively from one end (that's the "drawing itself on" effect). Neither changes the card's layout; the browser just redraws a 1-pixel-wide frame. The two failed attempts redrew the ENTIRE card area with blurry gradients sixty times a second — this redraws a hairline, which is thousands of times fewer pixels, and we'll verify that with Chrome's built-in performance recorder before calling it done. GSAP, if we use it, is just a free animation remote-control library: it plays/reverses/eases these strokes with less code than hand-written CSS for the draw-on choreography.

## 5. Proposed next step (Andrew picks — nothing built yet)
1. **E1** marching dieline (CSS-first, GSAP optional) — continuous crawl while hovered
2. **E2** draw-on dieline (GSAP DrawSVG) — one-shot plotter trace on hover
3. **C** MagicUI in-ring beam (vendored CSS-only, zero deps) — ambient current in the hairline
4. Mock 2–3 of them side by side on a scratch page for a visual bake-off before committing (half a day)

Whichever wins, step one of the build is the paint-profile gate on a single real card.

## Sources (verified by the adversarial critic)
GSAP pricing/license: gsap.com/pricing · gsap.com/community/standard-license · DrawSVG docs: gsap.com/docs/v3/Plugins/DrawSVGPlugin
Compositing truth: developer.mozilla.org …/Animation_performance_and_frame_rate · web.dev/articles/animations-guide · developer.chrome.com/blog/hardware-accelerated-animations · bram.us/2023/02/01/the-gotcha-with-animating-custom-properties · motion.dev/docs/performance
Copy targets: codepen.io/mikeK/pen/eYYWNLV (draw on hover) · tympanus.net/codrops/2014/02/26 (transform border slide) · css-tricks.com/svg-marching-ants + codepen.io/round/pen/Wageyj · williammartinsson.com/writings/add-to-cart (premium marching recipe) · github.com/magicuidesign/magicui @dea9b82 border-beam.tsx (CSS-only permalink, MIT) · ui.aceternity.com/registry/moving-border.json · dev.to/chokcoco/fantastic-css-border-animation-5166
