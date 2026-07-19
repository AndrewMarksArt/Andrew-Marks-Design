export default function GapReportDecay() {
  return (
    <svg
      viewBox="0 0 979 360"
      role="img"
      aria-label="An on-demand gap report listing three coverage findings beside a stacked bar of corpus decay states: 2,610 active, 890 aging, and 540 stale sources."
      style={{
        width: "100%",
        height: "auto",
        display: "block",
        fontFamily: "var(--font-geist-mono), ui-monospace, monospace",
      }}
    >
      <title>Gap report and decay states — the corpus admits what it lacks</title>

      {/* Figure header */}
      <text x={16} y={30} fontSize={13} fontWeight={400} fill="#5E5757">
        {"// GAP ANALYSIS — ON DEMAND"}
      </text>

      {/* ---- LEFT: gap report card (machine output) ---- */}
      <rect x={16} y={56} width={600} height={164} fill="#FFFFFF" stroke="#000000" strokeWidth={1} />

      {/* Report header bar */}
      <rect x={17} y={57} width={598} height={31} fill="#EDEDED" />
      <line x1={16} y1={88} x2={616} y2={88} stroke="#000000" strokeWidth={1} />
      <text x={32} y={77} fontSize={12} fontWeight={400} fill="#231A09">
        {"GAP REPORT — RUN ON DEMAND"}
      </text>

      {/* Row separators */}
      <line x1={17} y1={132} x2={615} y2={132} stroke="rgba(0,0,0,0.375)" strokeWidth={1} />
      <line x1={17} y1={176} x2={615} y2={176} stroke="rgba(0,0,0,0.375)" strokeWidth={1} />

      {/* THE accent: top-gap marker on finding 1 */}
      <rect x={17} y={89} width={2} height={42} fill="#EC4E09" />

      {/* Finding 1 */}
      <text x={36} y={114} fontSize={11} fontWeight={400} fill="#231A09">
        {"1. EVAL METHODS FOR AGENT UIS — NO SOURCE NEWER THAN 90 DAYS"}
      </text>
      <rect x={457} y={107} width={100} height={8} fill="#D9D9D9" />

      {/* Finding 2 */}
      <text x={36} y={158} fontSize={11} fontWeight={400} fill="#231A09">
        {"2. ON-DEVICE MODELS — 3 SOURCES, ALL AGING"}
      </text>
      <rect x={334} y={151} width={130} height={8} fill="#D9D9D9" />

      {/* Finding 3 — subject redacted */}
      <text x={36} y={202} fontSize={11} fontWeight={400} fill="#231A09">
        {"3."}
      </text>
      <rect x={62} y={195} width={150} height={8} fill="#D9D9D9" />
      <text x={224} y={202} fontSize={11} fontWeight={400} fill="#231A09">
        {"— ATTENTION SHIFTING"}
      </text>

      {/* ---- RIGHT: decay-state stacked bar ---- */}
      <text x={688} y={76} fontSize={12} fontWeight={400} fill="#5E5757">
        {"DECAY STATES"}
      </text>

      {/* Segments, proportional to counts (2,610 / 890 / 540 of 4,040) */}
      <rect x={688} y={88} width={56} height={129} fill="#5E5757" stroke="#000000" strokeWidth={1} />
      <rect x={688} y={217} width={56} height={44} fill="#D9D9D9" stroke="#000000" strokeWidth={1} />
      <rect x={688} y={261} width={56} height={27} fill="#EDEDED" stroke="#000000" strokeWidth={1} />

      {/* Leader ticks */}
      <line x1={744} y1={152.5} x2={752} y2={152.5} stroke="rgba(0,0,0,0.375)" strokeWidth={1} />
      <line x1={744} y1={239} x2={752} y2={239} stroke="rgba(0,0,0,0.375)" strokeWidth={1} />
      <line x1={744} y1={274.5} x2={752} y2={274.5} stroke="rgba(0,0,0,0.375)" strokeWidth={1} />

      {/* Labels + counts */}
      <text x={760} y={156} fontSize={11}>
        <tspan fontWeight={400} fill="#5E5757">{"ACTIVE "}</tspan>
        <tspan fontWeight={500} fill="#231A09">{"2,610"}</tspan>
      </text>
      <text x={760} y={243} fontSize={11}>
        <tspan fontWeight={400} fill="#5E5757">{"AGING "}</tspan>
        <tspan fontWeight={500} fill="#231A09">{"890"}</tspan>
      </text>
      <text x={760} y={278} fontSize={11}>
        <tspan fontWeight={400} fill="#5E5757">{"STALE "}</tspan>
        <tspan fontWeight={500} fill="#231A09">{"540"}</tspan>
      </text>

      {/* Footnote / draft tag */}
      <text x={16} y={340} fontSize={11} fontWeight={400} fill="#A43B0D">
        {"// REPRESENTATIVE REPORT + DRAFT COUNTS — THE REAL RUN IS THE CLOSER'S EVIDENCE CARD"}
      </text>
    </svg>
  );
}
