import type { PeekSprite } from "./CaseStudyMedia";

/**
 * Single source of truth for each case study's interactive card media —
 * the screenshot, the peeking-character sprites, and the border-beam tuning.
 * Consumed by the home Case Studies grid AND the case-study UP NEXT cross-link
 * so the two always match (Andrew: "the image and hover should match the home
 * page"). Sprite geometry is measured from the Figma hover frames.
 */

const GROGU: PeekSprite = {
  src: "/case-studies/grogu-peek.webp",
  width: 720,
  height: 335,
  left: "5.41%", // 58 / 1073
  top: "0%",
  spriteWidth: "48.09%", // 516 / 1073
  aspect: "516 / 240",
  rest: "translateY(-102%) rotate(-3.33deg)", // Figma 176.67° vs 180°
  inner: "rotate(180deg)", // hangs upside down
};

const CHATVET_CAT: PeekSprite = {
  src: "/case-studies/chatvet-peek-cat.webp",
  width: 840,
  height: 1115,
  left: "0.12%", // 1.33 / 1073
  top: "68.67%", // 515 / 750
  spriteWidth: "26.02%", // 279.22 / 1073
  aspect: "279.222 / 370.727",
  /* rest center Δ (−192px, +265.3px) as % of the sprite box + the 17.94°
     tilt it rolls off as it rises */
  rest: "translate(-68.76%, 71.57%) rotate(17.73deg)",
  inner: "rotate(0.21deg)",
  exit: "380ms", // travels ~327px vs Grogu's ~245px — velocity-matched to his exit
};

const CHATVET_DOG: PeekSprite = {
  src: "/case-studies/chatvet-peek-dog.webp",
  width: 1024,
  height: 1024,
  left: "78.94%", // ≈847 / 1073
  top: "51.5%", // ≈386.3 / 750
  spriteWidth: "25.45%", // 273.14 / 1073
  aspect: "273.138 / 362.65",
  /* rest Δ (+240px, +160px) — slides in diagonally from off the right edge */
  rest: "translate(87.87%, 44.12%)",
  inner: "rotate(-179.42deg) scaleY(-1)", // = horizontal mirror + 0.58° tilt
  delay: "100ms", // arrives a beat after the cat
  exit: "330ms", // travels ~288px — velocity-matched to Grogu's exit
};

/* Knowledge OS: the hero robot itself (identical asset, reused from /hero/)
   peeks from the bottom-left — mirrored + tilted 12.82°, rising up-right. */
const KNOWLEDGE_ROBOT: PeekSprite = {
  src: "/hero/robot.webp",
  width: 1200,
  height: 2101,
  left: "-3.06%", // inner box top-left -32.85 / 1073
  top: "44.25%", // 331.87 / 750
  spriteWidth: "41.65%", // 446.87 / 1073
  aspect: "446.872 / 619.312",
  rest: "translate(-48.34%, 68.46%)", // Δ(-216px, +424px) from engaged
  inner: "rotate(-167.18deg) scaleY(-1)",
  objectPosition: "top", // bottom ~26% cropped, matching the hero band
};

/** Per-case border-beam tuning: hue destination, under-glow tint, peak
    opacity cap, end-of-journey brightness lift. */
export type CaseBeam = {
  hueEnd: string;
  glowEnd: string;
  maxO?: number;
  bright?: number;
};

export type CaseMedia = {
  img: string;
  alt: string;
  sprites: PeekSprite[];
  beam: CaseBeam;
};

/** Keyed by case-study href. */
export const CASE_MEDIA: Record<string, CaseMedia> = {
  "/case-studies/platform-one": {
    img: "/case-studies/platform-one.png",
    alt: "Platform One website with the P1 Assistant chat panel open, offering answers and quick links for account questions",
    sprites: [GROGU],
    // P1 assistant mint (hue ~156); the card's own imagery is mint/dark-green,
    // so the beam gains luminosity to outshine it instead of dissolving in
    beam: { hueEnd: "138deg", glowEnd: "rgba(134, 206, 178, 0.5)", bright: 1.35 },
  },
  "/case-studies/chat-vet": {
    img: "/case-studies/chat-vet.png",
    alt: "chatVET app home screen: clinical search bar and VetMed prompt templates for veterinary professionals",
    sprites: [CHATVET_CAT, CHATVET_DOG],
    // chatVET navy/royal blue (hue ~230) — negative rotation travels orange ->
    // violet -> blue; dimmed, saturated violets pop hard against the white card
    beam: { hueEnd: "-148deg", glowEnd: "rgba(152, 172, 235, 0.5)", maxO: 0.72 },
  },
  "/case-studies/knowledge-os": {
    img: "/case-studies/knowledge-os.png",
    alt: "Arclight knowledge dashboard listing captured links with sources, categories, scores, and agent navigation",
    sprites: [KNOWLEDGE_ROBOT],
    // Arclight's palette is warm coral/amber (hue ~3) — the beam stays warm,
    // deepening orange to coral; dimmed to sit against the card's light neutrals
    beam: { hueEnd: "-15deg", glowEnd: "rgba(240, 168, 152, 0.5)", maxO: 0.72 },
  },
};
