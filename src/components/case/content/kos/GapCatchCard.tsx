export default function GapCatchCard() {
  return (
    <svg
      viewBox="0 0 640 300"
      role="img"
      aria-label="The gap report card from the agent's first run on March 30, at 627 sources: five security subtopics (agent, API, server, data safety, safety architecture) drawn as nodes ringed in orange, all sitting at the corpus-maximum 0.85 priority, with only eight saved links of coverage between them drawn as sparse dots. The scoring said it mattered; the reading hadn't noticed."
      style={{
        width: "100%",
        height: "auto",
        display: "block",
        fontFamily: "var(--font-geist-mono), ui-monospace, monospace",
      }}
    >
      <title>The gap the agent caught first: max priority, near-zero coverage</title>

      {/* ---- Card plate ---- */}
      <rect x={110} y={24} width={420} height={252} fill="#FFFFFF" stroke="#000000" strokeWidth={1} />

      {/* Card header bar */}
      <rect x={111} y={25} width={418} height={26} fill="#EDEDED" />
      <line x1={110} y1={51} x2={530} y2={51} stroke="#000000" strokeWidth={1} />
      <text x={122} y={42} fontSize={12} fill="#231A09">
        <tspan fontWeight={400}>{"GAP REPORT — "}</tspan>
        <tspan fontWeight={500}>{"FIRST RUN · MAR 30 · 627 SOURCES"}</tspan>
      </text>

      {/* Line 1 — the finding */}
      <text x={320} y={74} fontSize={13} fontWeight={500} fill="#231A09" textAnchor="middle">
        {"SECURITY — 5 SUBTOPICS AT THE CORPUS-MAX PRIORITY"}
      </text>

      {/* The five subtopics, named — they're public in the repo's own write-up */}
      <text x={320} y={92} fontSize={11} fontWeight={400} fill="#5E5757" textAnchor="middle">
        {"AGENT · API · SERVER · DATA SAFETY · SAFETY ARCHITECTURE"}
      </text>

      {/* THE accent: the priority ring — all five at the corpus maximum */}
      <ellipse
        cx={324}
        cy={151}
        rx={112}
        ry={52}
        fill="none"
        stroke="#EC4E09"
        strokeWidth={1.5}
        strokeDasharray="5 4"
      />

      {/* The 5 subtopic nodes */}
      <g fill="#FFFFFF" stroke="#000000" strokeWidth={1}>
        <circle cx={252} cy={132} r={7} />
        <circle cx={330} cy={118} r={7} />
        <circle cx={396} cy={144} r={7} />
        <circle cx={284} cy={178} r={7} />
        <circle cx={362} cy={184} r={7} />
      </g>

      {/* The 8 saved links — sparse coverage dots, not connections */}
      <g fill="#5E5757">
        <rect x={236} y={116} width={5} height={5} />
        <rect x={264} y={114} width={5} height={5} />
        <rect x={316} y={100} width={5} height={5} />
        <rect x={342} y={102} width={5} height={5} />
        <rect x={408} y={130} width={5} height={5} />
        <rect x={410} y={150} width={5} height={5} />
        <rect x={268} y={188} width={5} height={5} />
        <rect x={374} y={194} width={5} height={5} />
      </g>

      {/* Ring label */}
      <text x={324} y={216} fontSize={11} fontWeight={500} fill="#A43B0D" textAnchor="middle">
        {"ALL FIVE AT 0.85 — THE CORPUS MAXIMUM"}
      </text>

      {/* Line 2 — the coverage count, as recorded */}
      <text x={320} y={238} fontSize={12} fontWeight={500} fill="#231A09" textAnchor="middle">
        {"ONLY 8 SAVED LINKS ACROSS ALL FIVE"}
      </text>
      <text x={320} y={256} fontSize={11} fontWeight={400} fill="#231A09" textAnchor="middle">
        {"THE SCORING SAID IT MATTERED. MY READING HADN'T NOTICED."}
      </text>

      {/* Provenance footnote */}
      <text x={110} y={294} fontSize={11} fontWeight={400} fill="#A43B0D">
        {"// REAL RUN, DATED IN THE REPO — THE HEADLINE OF 16 GAPS FOUND"}
      </text>
    </svg>
  );
}
