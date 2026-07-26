/**
 * Case-stall map — rebuilt 2026-07-26 to Andrew's revised Figma diagram
 * ("Average Vet visit flow and where cases stall", inside section
 * 6967:7428). Content is a straight port of that diagram; only the
 * palette is translated, because the comp's four pastel hues are
 * off-system — severity is carried here by the ratified accent family
 * instead, and the sticky-note author tags ("0xErling") are dropped.
 *
 * ⚠ PROVENANCE: this revision's figures diverge from the source ledger at
 * .claude/research/003-chatvet-stat-provenance.md, which was built from a
 * five-agent fact-check. Specifically: "30 plus mins if deferred" is the
 * construction that check REFUTED (Daei 2020's "2 to 32 min" is a range
 * ACROSS 73 studies, not an in-room-vs-deferred contrast); "aren't
 * pursued at all" is the wording Ely 1999 cannot support (it measured
 * "not immediately pursued" over two half-days); "80% of medication
 * errors" overstates Pinho 2024 (80% of the 63% that were WRONG-DOSE
 * errors, i.e. ~50% of reported errors); and "10 mins per patient" is the
 * figure the check found UNATTESTED, tracing only to AI-scribe vendor
 * marketing. Shipped as drawn at Andrew's explicit instruction to replace
 * all content with the Figma. Read the ledger before defending any number
 * here.
 */

const CARD_W = 148;
const CARD_TOP = 70;
const CARD_BOTTOM = 232;
const TITLE_Y = 100;
const NUM_Y = 136;
const BODY_TOP = 162;

type Stall = {
  /** x centre — matches the phase node the card hangs over */
  cx: number;
  title: string;
  figure: string;
  body: string[];
  /** the outlier: solid accent plate, knocked-out type */
  leak?: boolean;
};

const STALLS: Stall[] = [
  {
    cx: 402,
    title: "PROTOCOL SEARCH",
    figure: "5 min",
    body: [
      "in the room. 30+ min if the",
      "question gets deferred,",
      "and up to 60% aren't",
      "pursued at all.",
    ],
  },
  {
    cx: 558,
    title: "DOSE CALCULATION",
    figure: "80%",
    body: [
      "of medication errors are",
      "miscalculations. This was",
      "the #1 question users",
      "were asking.",
    ],
  },
  {
    cx: 714,
    title: "CLIENT COMMUNICATION",
    figure: "Up to 75%",
    body: [
      "of what the vet says is lost",
      "immediately. Written",
      "instructions lift the correct",
      "treatment rate, but they",
      "cost time.",
    ],
  },
  {
    cx: 870,
    title: "HISTORY RE-ENTERED",
    figure: "10 min",
    body: [
      "per patient after the visit,",
      "against up to 2 hours of",
      "desk work per hour of",
      "face time.",
    ],
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
const NODE_Y = 266;
const NODE_H = 58;
const SANS = { fontFamily: "var(--font-geist), sans-serif" };

export default function CaseStallTimeline() {
  return (
    <svg
      viewBox="0 0 979 470"
      role="img"
      aria-label="An average veterinary visit mapped as six phases — check-in and intake, exam, diagnosis, treatment plan, client debrief, and a sixth phase after the client leaves. Four stalls hang above the phases they interrupt. Protocol search costs 5 minutes in the room, 30 or more if the question gets deferred, and up to 60 percent are not pursued at all. Dose calculation: 80 percent of medication errors are miscalculations, and this was the number-one question users were asking. Client communication: up to 75 percent of what the vet says is lost immediately, and written instructions lift the correct treatment rate but cost time. History re-entered, the biggest leak: 10 minutes per patient after the visit, against up to 2 hours of desk work per hour of face time. A dashed line runs from check-in to the treatment plan noting that weight captured at intake is the only input to dose calculation, and that missing it there causes delays."
      style={{
        width: "100%",
        height: "auto",
        display: "block",
        fontFamily: "var(--font-geist-mono), ui-monospace, monospace",
      }}
    >
      <title>Average vet visit flow and where cases stall</title>

      {/* Figure header */}
      <text x={16} y={26} fontSize={13} fontWeight={300} fill="#5E5757">
        {"// ONE APPOINTMENT, 4 STALLS — THE BIGGEST AFTER THE CLIENT LEAVES"}
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
        const ink = s.leak ? "#FFFFFF" : "#231A09";
        const bodyInk = s.leak ? "rgba(255,255,255,0.9)" : "#5E5757";
        // long titles/figures step down a tier so nothing overflows the plate
        const titleSize = s.title.length > 18 ? 10 : 11;
        const figSize = s.figure.length > 6 ? 18 : 23;

        return (
          <g key={s.title}>
            <rect
              x={x}
              y={CARD_TOP}
              width={CARD_W}
              height={CARD_BOTTOM - CARD_TOP}
              rx={2}
              fill="#EC4E09"
              fillOpacity={s.leak ? 1 : 0.08}
              stroke="#A43B0D"
              strokeWidth={1.5}
            />

            <text x={x + 11} y={TITLE_Y} fontSize={titleSize} fontWeight={500} fill={ink}>
              {s.title}
            </text>

            <text x={x + 11} y={NUM_Y} fontSize={figSize} fontWeight={600} fill={ink}>
              {s.figure}
            </text>

            {s.body.map((line, i) => (
              <text
                key={i}
                x={x + 11}
                y={BODY_TOP + i * 13}
                fontSize={10}
                fontWeight={400}
                fill={bodyInk}
                style={SANS}
              >
                {line}
              </text>
            ))}

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
        const baselines = p.lines.length === 1 ? [cy + 4] : [cy - 3, cy + 12];

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
        d="M 90 324 L 90 380 L 150 380"
        fill="none"
        stroke="#EC4E09"
        strokeWidth={1.5}
        strokeDasharray="5 4"
      />
      <path
        d="M 498 380 L 558 380 L 558 336"
        fill="none"
        stroke="#EC4E09"
        strokeWidth={1.5}
        strokeDasharray="5 4"
      />
      <path d="M 558 324 L 552 336 L 564 336 Z" fill="#EC4E09" />

      <rect
        x={150}
        y={362}
        width={348}
        height={36}
        rx={4}
        fill="#FFFFFF"
        stroke="#A43B0D"
        strokeWidth={1}
      />
      <text x={324} y={377} fontSize={10.5} fill="#A43B0D" textAnchor="middle" style={SANS}>
        Weight captured here is the only input to dose calculation,
      </text>
      <text x={324} y={390} fontSize={10.5} fill="#A43B0D" textAnchor="middle" style={SANS}>
        and missing it at check-in causes delays
      </text>

      {/* ---------------- PROVENANCE ---------------- */}
      <text x={16} y={438} fontSize={10} fontWeight={400} fill="#A43B0D">
        {"// STALLS IDENTIFIED IN CASE WALKTHROUGHS · MINUTES COME FROM PUBLISHED BENCHMARKS, NOT MEASURED IN THIS STUDY"}
      </text>
      <text x={16} y={455} fontSize={10} fontWeight={400} fill="#5E5757">
        {"// VETERINARY SOURCES FOR DOSE ERROR AND CLIENT RECALL"}
      </text>
    </svg>
  );
}
