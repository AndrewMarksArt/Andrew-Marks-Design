/**
 * The overlap map (new, 2026-07-25) — the companion to CaseStallTimeline.
 *
 * The stall map answers "where does the case stall?". This one answers
 * "who else is standing there?": each of the four stalls has a second
 * victim on the other side of the exam table, and in every case the
 * artifact that unblocks the vet is the same artifact the client needed
 * to leave with. Same four columns as the stall map, deliberately — the
 * reader should recognise the geometry.
 *
 * Honesty flag rendered in the footnote: the client-side row is the
 * vets' account of their clients plus published recall data. No pet
 * owners were interviewed, and the figure must not imply otherwise.
 */

const COL_W = 188;
const COL_X = [166, 366, 566, 766];
const SANS = { fontFamily: "var(--font-geist), sans-serif" };

/* Row bands */
const VET_Y = 56;
const VET_H = 66;
const STALL_Y = 138;
const STALL_H = 42;
const CLIENT_Y = 196;
const CLIENT_H = 66;
const SHIP_Y = 302;
const SHIP_H = 48;

type Column = {
  stall: string;
  vet: string[];
  client: string[];
  ships: string[];
};

const COLUMNS: Column[] = [
  {
    stall: "PROTOCOL SEARCH",
    // digits deliberately absent: the exact 64% lives ONLY on the stall-map
    // card that cites Ely 1999 and labels it a human proxy, so it cannot be
    // confused with ChatVET's own ~64% prompt-mix analytics elsewhere on the page
    vet: ["The question competes with", "the next patient. Most aren't", "pursued during the visit."],
    client: ["Asks the question, gets “let me", "look into that” — and often", "no answer."],
    ships: ["Sourced answer,", "in the room"],
  },
  {
    stall: "DOSE CALCULATION",
    vet: ["Math at the point of highest", "consequence, under time", "pressure."],
    client: ["Gives the dose at home —", "47% say nobody showed", "them how."],
    ships: ["Dose + at-home", "instructions"],
  },
  {
    stall: "CLIENT TRANSLATION",
    vet: ["Says it three times, still gets", "the call back tomorrow."],
    client: ["Recalls 29% of what they", "were told about the", "medication's side effects."],
    ships: ["Plain-language", "handout"],
  },
  {
    stall: "HISTORY RE-ENTERED",
    vet: ["Re-types the visit from", "memory, after hours."],
    client: ["Leaves with nothing written", "down to act on or pass on."],
    ships: ["Visit summary —", "filed and handed over"],
  },
];

/** Left gutter row labels, pinned to each band. */
const ROW_LABELS: { y: number; text: string; fill: string }[] = [
  { y: VET_Y + 22, text: "COSTS THE VET", fill: "#5E5757" },
  { y: STALL_Y + 26, text: "THE STALL", fill: "#A43B0D" },
  { y: CLIENT_Y + 22, text: "COSTS THE CLIENT", fill: "#5E5757" },
  { y: SHIP_Y + 29, text: "CHATVET SHIPS", fill: "#000000" },
];

export default function PainOverlap() {
  return (
    <svg
      viewBox="0 0 979 400"
      role="img"
      aria-label="An overlap map with four columns, one per stall. For each stall the figure states what it costs the veterinarian, names the stall, states what the same stall costs the client, and names the single artifact ChatVET produces that answers both. Protocol search: the question competes with the next patient and most are not pursued during the visit, while the client asks and often never receives an answer — ChatVET ships a sourced answer in the room. Dose calculation: math at the point of highest consequence for the vet, while the client gives the dose at home and 47 percent say nobody showed them how — ChatVET ships the dose with at-home instructions. Client translation: the vet repeats it three times and still gets the callback, while the client recalls only 29 percent of what they were told about the medication's side effects — ChatVET ships a plain-language handout. History re-entry: the vet re-types the visit from memory after hours, while the client leaves with nothing written down — ChatVET ships a visit summary that is both filed and handed over."
      style={{
        width: "100%",
        height: "auto",
        display: "block",
        fontFamily: "var(--font-geist-mono), ui-monospace, monospace",
      }}
    >
      <title>One stall, two people — the vet/client overlap</title>

      {/* Figure header */}
      <text x={16} y={26} fontSize={13} fontWeight={300} fill="#5E5757">
        {"// ONE STALL, TWO PEOPLE"}
      </text>
      <line
        x1={16}
        y1={40}
        x2={963}
        y2={40}
        stroke="rgba(0,0,0,0.375)"
        strokeWidth={1}
      />

      {/* Left gutter row labels */}
      {ROW_LABELS.map((r) => (
        <text key={r.text} x={16} y={r.y} fontSize={11} fontWeight={400} fill={r.fill}>
          {r.text}
        </text>
      ))}

      {COLUMNS.map((c, i) => {
        const x = COL_X[i];
        const cx = x + COL_W / 2;

        return (
          <g key={c.stall}>
            {/* ---- what it costs the vet ---- */}
            <rect
              x={x}
              y={VET_Y}
              width={COL_W}
              height={VET_H}
              fill="#FFFFFF"
              stroke="rgba(0,0,0,0.25)"
              strokeWidth={1}
            />
            {c.vet.map((line, li) => (
              <text
                key={li}
                x={x + 10}
                y={VET_Y + 22 + li * 14}
                fontSize={10.5}
                fontWeight={400}
                fill="#231A09"
                style={SANS}
              >
                {line}
              </text>
            ))}

            {/* ---- the stall itself: the shared root ---- */}
            <rect
              x={x}
              y={STALL_Y}
              width={COL_W}
              height={STALL_H}
              rx={2}
              fill="#EC4E09"
              fillOpacity={0.08}
              stroke="#A43B0D"
              strokeWidth={1.5}
            />
            <text
              x={cx}
              y={STALL_Y + 26}
              fontSize={12}
              fontWeight={500}
              fill="#A43B0D"
              textAnchor="middle"
            >
              {c.stall}
            </text>

            {/* ---- what the same stall costs the client ---- */}
            <rect
              x={x}
              y={CLIENT_Y}
              width={COL_W}
              height={CLIENT_H}
              fill="#FFFFFF"
              stroke="rgba(0,0,0,0.25)"
              strokeWidth={1}
            />
            {c.client.map((line, li) => (
              <text
                key={li}
                x={x + 10}
                y={CLIENT_Y + 22 + li * 14}
                fontSize={10.5}
                fontWeight={400}
                fill="#231A09"
                style={SANS}
              >
                {line}
              </text>
            ))}

            {/* Same column, same root — stitch the three bands together */}
            <line
              x1={cx}
              y1={VET_Y + VET_H}
              x2={cx}
              y2={STALL_Y}
              stroke="rgba(0,0,0,0.375)"
              strokeWidth={1}
              strokeDasharray="3 3"
            />
            <line
              x1={cx}
              y1={STALL_Y + STALL_H}
              x2={cx}
              y2={CLIENT_Y}
              stroke="rgba(0,0,0,0.375)"
              strokeWidth={1}
              strokeDasharray="3 3"
            />

            {/* ---- the one artifact that answers both ---- */}
            <line
              x1={cx}
              y1={SHIP_Y}
              x2={cx}
              y2={CLIENT_Y + CLIENT_H + 10}
              stroke="#EC4E09"
              strokeWidth={1.5}
            />
            <path
              d={`M ${cx} ${CLIENT_Y + CLIENT_H + 2} L ${cx - 5} ${CLIENT_Y + CLIENT_H + 12} L ${cx + 5} ${CLIENT_Y + CLIENT_H + 12} Z`}
              fill="#EC4E09"
            />
            <rect
              x={x}
              y={SHIP_Y}
              width={COL_W}
              height={SHIP_H}
              rx={2}
              fill="#231A09"
            />
            {c.ships.map((line, li) => (
              <text
                key={li}
                x={x + 12}
                y={SHIP_Y + 20 + li * 15}
                fontSize={11.5}
                fontWeight={500}
                fill="#FFFFFF"
                style={SANS}
              >
                {line}
              </text>
            ))}
          </g>
        );
      })}

      {/* Divider between the problem bands and the shipped answer */}
      <text x={16} y={282} fontSize={11} fontWeight={400} fill="#EC4E09">
        {"// ONE GENERATION, TWO READERS"}
      </text>
      <line x1={16} y1={290} x2={963} y2={290} stroke="#EC4E09" strokeWidth={2} />

      {/* ---------------- PROVENANCE ---------------- */}
      <text x={16} y={378} fontSize={10} fontWeight={400} fill="#A43B0D">
        {"// CLIENT-SIDE COSTS: THE VETS' ACCOUNT OF THEIR CLIENTS + PUBLISHED VET DATA (ODOM 2024, FLEGEL 2024) — NO PET OWNERS INTERVIEWED"}
      </text>
    </svg>
  );
}
