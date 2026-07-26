/**
 * Case-stall map — rebuilt 2026-07-25 from Andrew's Figma diagram
 * ("problem we are trying to solve", node 6956:7164).
 *
 * Changes from the first version: the appointment now runs six phases,
 * not five — the sixth ("after the client leaves") is where the biggest
 * leak lives, which is the whole point of the figure. The four stalls
 * carry published figures instead of "+ MIN" placeholders, and the
 * weight→dose dependency is drawn because it is the one input the
 * riskiest calculation in the visit depends on.
 *
 * Palette note: the Figma comp codes stall severity with four pastel
 * hues (blue/yellow/purple/red). Those are off-system, so severity is
 * carried here by the ratified accent family instead — tinted plates for
 * the three ordinary stalls, solid --accent for the biggest leak — which
 * preserves the comp's information design (three peers + one outlier,
 * two badges) inside the project's colour tokens.
 */

/** Stall card geometry: titles and numerals share a baseline across all
 *  four cards; badged cards are taller and all four bottom-align. */
const CARD_W = 148;
const CARD_BOTTOM = 228;
const TITLE_Y = 106;
const NUM_Y = 140;
const SOURCE_Y = 220;

type Stall = {
  /** x centre — matches the phase node the card hangs over */
  cx: number;
  badge?: string;
  title: string;
  figure: string;
  body: string[];
  /** citation + population, rendered on the card — the study's own
   *  thesis applied to its own evidence */
  source: string;
  /** the outlier: solid accent plate, knocked-out type */
  leak?: boolean;
};

const STALLS: Stall[] = [
  {
    cx: 402,
    title: "PROTOCOL SEARCH",
    figure: "2 min",
    body: [
      "to answer a clinical",
      "question in the room. 64%",
      "aren't pursued during",
      "the visit.",
    ],
    source: "ELY 1999 · HUMAN PROXY",
  },
  {
    cx: 558,
    badge: "#1 REQUEST",
    title: "DOSE CALCULATION",
    figure: "63%",
    body: [
      "of perianesthetic med",
      "errors are wrong dose.",
      "80% of those are",
      "calculation errors.",
    ],
    source: "PINHO 2024 · VET",
  },
  {
    cx: 714,
    title: "CLIENT TRANSLATION",
    figure: "29%",
    body: [
      "of clients correctly recall",
      "what they were told about",
      "medication side effects.",
      "68.9% overall.",
    ],
    source: "FLEGEL 2024 · VET",
  },
  {
    cx: 870,
    badge: "UNMEASURED",
    title: "HISTORY RE-ENTERED",
    figure: "9m 49s",
    body: [
      "is the median consult.",
      "The study that measured",
      "it left the note-writing",
      "out entirely.",
    ],
    source: "ROBINSON 2014 · VET",
    leak: true,
  },
];

/** Six phase nodes on a 156px pitch; the last one is off the clock. */
const PHASES: { x: number; lines: string[]; after?: boolean }[] = [
  { x: 24, lines: ["CHECK-IN", "AND INTAKE"] },
  { x: 180, lines: ["EXAM"] },
  { x: 336, lines: ["DIAGNOSIS"] },
  { x: 492, lines: ["TREATMENT PLAN"] },
  { x: 648, lines: ["CLIENT DEBRIEF"] },
  { x: 804, lines: ["AFTER THE", "CLIENT LEAVES"], after: true },
];

const NODE_W = 132;
const NODE_Y = 262;
const NODE_H = 58;
const SANS = { fontFamily: "var(--font-geist), sans-serif" };

export default function CaseStallTimeline() {
  return (
    <svg
      viewBox="0 0 979 450"
      role="img"
      aria-label="One veterinary appointment mapped as six phases — check-in and intake, exam, diagnosis, treatment plan, client debrief, and a sixth phase after the client leaves. Four stalls hang above the phases they interrupt, each tagged with its source and study population. Protocol search: 2 minutes to answer a clinical question in the room, and 64 percent are not pursued during the visit (Ely 1999, a human primary-care proxy). Dose calculation, flagged the number-one request: 63 percent of reported perianesthetic medication errors are wrong dose, and 80 percent of those are calculation errors (Pinho 2024, veterinary). Client translation: 29 percent of clients correctly recall what they were told about medication side effects, and 68.9 percent of discharge instructions overall (Flegel 2024, veterinary). History re-entered, marked unmeasured: the median small-animal consult is 9 minutes 49 seconds, and the study that measured it left note-writing out entirely (Robinson 2014, veterinary). A dashed line runs from check-in to the treatment plan noting that weight captured at intake is the only input to dose calculation."
      style={{
        width: "100%",
        height: "auto",
        display: "block",
        fontFamily: "var(--font-geist-mono), ui-monospace, monospace",
      }}
    >
      <title>Where an average case stalls — one appointment, mapped</title>

      {/* Figure header */}
      <text x={16} y={26} fontSize={13} fontWeight={300} fill="#5E5757">
        {"// ONE APPOINTMENT, MAPPED"}
      </text>
      <line
        x1={16}
        y1={40}
        x2={963}
        y2={40}
        stroke="rgba(0,0,0,0.375)"
        strokeWidth={1}
      />

      {/* ---------------- STALL CARDS ---------------- */}
      {STALLS.map((s) => {
        const x = s.cx - CARD_W / 2;
        const top = s.badge ? 62 : 76;
        const bodyTop = s.badge ? 164 : 166;
        const ink = s.leak ? "#FFFFFF" : "#231A09";
        const bodyInk = s.leak ? "rgba(255,255,255,0.9)" : "#5E5757";

        return (
          <g key={s.title}>
            <rect
              x={x}
              y={top}
              width={CARD_W}
              height={CARD_BOTTOM - top}
              rx={2}
              fill={s.leak ? "#EC4E09" : "#EC4E09"}
              fillOpacity={s.leak ? 1 : 0.08}
              stroke={s.leak ? "#A43B0D" : "#A43B0D"}
              strokeWidth={1.5}
            />

            {/* Badge pill — only the #1 request and the biggest leak */}
            {s.badge && (
              <>
                <rect
                  x={x + 11}
                  y={top + 10}
                  width={s.badge.length * 6.1 + 16}
                  height={16}
                  rx={8}
                  fill={s.leak ? "#FFFFFF" : "#EC4E09"}
                />
                <text
                  x={x + 19}
                  y={top + 21}
                  fontSize={9}
                  fontWeight={600}
                  fill={s.leak ? "#A43B0D" : "#FFFFFF"}
                >
                  {s.badge}
                </text>
              </>
            )}

            <text x={x + 11} y={TITLE_Y} fontSize={11} fontWeight={500} fill={ink}>
              {s.title}
            </text>

            <text x={x + 11} y={NUM_Y} fontSize={23} fontWeight={600} fill={ink}>
              {s.figure}
            </text>

            {s.body.map((line, i) => (
              <text
                key={i}
                x={x + 11}
                y={bodyTop + i * 13}
                fontSize={10}
                fontWeight={400}
                fill={bodyInk}
                style={SANS}
              >
                {line}
              </text>
            ))}

            {/* Citation + population, on the card itself */}
            <text
              x={x + 11}
              y={SOURCE_Y}
              fontSize={8.5}
              fontWeight={400}
              fill={s.leak ? "rgba(255,255,255,0.75)" : "#A43B0D"}
            >
              {s.source}
            </text>

            {/* Dashed drop to the phase this stall interrupts */}
            <line
              x1={s.cx}
              y1={CARD_BOTTOM}
              x2={s.cx}
              y2={NODE_Y}
              stroke={s.leak ? "#EC4E09" : "rgba(0,0,0,0.375)"}
              strokeWidth={1}
              strokeDasharray="3 3"
            />
          </g>
        );
      })}

      {/* ---------------- PHASE NODES ---------------- */}
      {PHASES.map((p, i) => {
        const cx = p.x + NODE_W / 2;
        const cy = NODE_Y + NODE_H / 2;
        const baselines =
          p.lines.length === 1 ? [cy + 4] : [cy - 3, cy + 12];

        return (
          <g key={p.lines.join(" ")}>
            <rect
              x={p.x}
              y={NODE_Y}
              width={NODE_W}
              height={NODE_H}
              rx={2}
              fill={p.after ? "#EC4E09" : "#FFFFFF"}
              fillOpacity={p.after ? 0.05 : 1}
              stroke={p.after ? "#EC4E09" : "#000000"}
              strokeWidth={1.5}
              strokeDasharray={p.after ? "4 3" : undefined}
            />
            {p.lines.map((line, li) => (
              <text
                key={line}
                x={cx}
                y={baselines[li]}
                fontSize={11}
                fontWeight={400}
                fill={p.after ? "#A43B0D" : "#231A09"}
                textAnchor="middle"
              >
                {line}
              </text>
            ))}

            {/* Connector into the next phase */}
            {i < PHASES.length - 1 && (
              <>
                <line
                  x1={p.x + NODE_W + 3}
                  y1={cy}
                  x2={p.x + NODE_W + 14}
                  y2={cy}
                  stroke={i === 4 ? "#EC4E09" : "#000000"}
                  strokeWidth={1.5}
                />
                <path
                  d={`M ${p.x + NODE_W + 14} ${cy - 5} L ${p.x + NODE_W + 22} ${cy} L ${p.x + NODE_W + 14} ${cy + 5} Z`}
                  fill={i === 4 ? "#EC4E09" : "#000000"}
                />
              </>
            )}
          </g>
        );
      })}

      {/* ------- THE DEPENDENCY: intake weight → dose calculation ------- */}
      <path
        d="M 90 320 L 90 372 L 162 372"
        fill="none"
        stroke="#EC4E09"
        strokeWidth={1.5}
        strokeDasharray="5 4"
      />
      <path
        d="M 486 372 L 558 372 L 558 332"
        fill="none"
        stroke="#EC4E09"
        strokeWidth={1.5}
        strokeDasharray="5 4"
      />
      <path d="M 558 320 L 552 332 L 564 332 Z" fill="#EC4E09" />

      <rect
        x={162}
        y={361}
        width={324}
        height={22}
        rx={11}
        fill="#FFFFFF"
        stroke="#A43B0D"
        strokeWidth={1}
      />
      <text
        x={324}
        y={376}
        fontSize={10.5}
        fontWeight={400}
        fill="#A43B0D"
        textAnchor="middle"
        style={SANS}
      >
        Weight captured here is the only input to dose calculation
      </text>

      {/* ---------------- PROVENANCE ---------------- */}
      <text x={16} y={420} fontSize={10} fontWeight={400} fill="#A43B0D">
        {"// STALLS IDENTIFIED IN CASE WALKTHROUGHS (n = __ PENDING) — EVERY FIGURE IS A PUBLISHED STUDY, NOT MEASURED IN THIS ONE"}
      </text>
      <text x={16} y={437} fontSize={10} fontWeight={400} fill="#5E5757">
        {"// PINHO n=48 REPORTS · FLEGEL n=151 CLIENTS · ROBINSON n=182 CONSULTS · ELY n=1101 QUESTIONS, THE ONE HUMAN-MEDICINE PROXY"}
      </text>
    </svg>
  );
}
