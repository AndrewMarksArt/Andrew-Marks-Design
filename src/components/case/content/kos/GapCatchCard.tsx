export default function GapCatchCard() {
  return (
    <svg
      viewBox="0 0 640 300"
      role="img"
      aria-label="A rendered gap-report card marked priority maximum: in security, five subtopics and eight cross-links were missed by manual reading, with subtopic names redacted."
      style={{
        width: "100%",
        height: "auto",
        display: "block",
        fontFamily: "var(--font-geist-mono), ui-monospace, monospace",
      }}
    >
      <title>The gap the agents caught — rendered report card</title>

      {/* ---- Card plate ---- */}
      <rect x={110} y={24} width={420} height={252} fill="#FFFFFF" stroke="#000000" strokeWidth={1} />

      {/* Card header bar */}
      <rect x={111} y={25} width={418} height={26} fill="#EDEDED" />
      <line x1={110} y1={51} x2={530} y2={51} stroke="#000000" strokeWidth={1} />
      <text x={122} y={42} fontSize={12} fill="#231A09">
        <tspan fontWeight={400}>{"GAP REPORT — "}</tspan>
        <tspan fontWeight={500}>{"PRIORITY: MAXIMUM"}</tspan>
      </text>

      {/* Line 1 — the subtopic count */}
      <text
        x={320}
        y={74}
        fontSize={13}
        fontWeight={500}
        fill="#231A09"
        textAnchor="middle"
      >
        {"SECURITY — 5 SUBTOPICS MY READING MISSED"}
      </text>

      {/* Redaction bar — subtopic names withheld */}
      <rect x={180} y={85} width={280} height={11} fill="#D9D9D9" />

      {/* ---- Node cluster: 5 subtopics, 8 cross-links ---- */}
      {/* THE accent: the 8 links the machine surfaced (drawn under the nodes) */}
      <g stroke="#EC4E09" strokeWidth={1.5}>
        <line x1={252} y1={132} x2={330} y2={118} />
        <line x1={330} y1={118} x2={396} y2={144} />
        <line x1={396} y1={144} x2={362} y2={184} />
        <line x1={362} y1={184} x2={284} y2={178} />
        <line x1={284} y1={178} x2={252} y2={132} />
        <line x1={252} y1={132} x2={396} y2={144} />
        <line x1={330} y1={118} x2={362} y2={184} />
        <line x1={330} y1={118} x2={284} y2={178} />
      </g>

      {/* The 5 subtopic nodes */}
      <g fill="#FFFFFF" stroke="#000000" strokeWidth={1}>
        <circle cx={252} cy={132} r={7} />
        <circle cx={330} cy={118} r={7} />
        <circle cx={396} cy={144} r={7} />
        <circle cx={284} cy={178} r={7} />
        <circle cx={362} cy={184} r={7} />
      </g>

      {/* Line 2 — the cross-link count */}
      <text
        x={320}
        y={214}
        fontSize={12}
        fontWeight={400}
        fill="#231A09"
        textAnchor="middle"
      >
        {"8 CROSS-LINKS MY READING NEVER SURFACED"}
      </text>

      {/* Footnote rule + provenance line */}
      <line x1={111} y1={246} x2={529} y2={246} stroke="rgba(0,0,0,0.25)" strokeWidth={1} />
      <text x={122} y={264} fontSize={11} fontWeight={400} fill="#5E5757">
        {"// AS THE SYSTEM RENDERED IT — LIGHTLY REDACTED"}
      </text>
    </svg>
  );
}
