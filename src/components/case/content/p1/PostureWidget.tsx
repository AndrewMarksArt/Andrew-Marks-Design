export default function PostureWidget() {
  return (
    <svg
      viewBox="0 0 480 322"
      role="img"
      aria-label="Posture A: a quiet wireframe web page with a compact Ask P1 answer widget open in its bottom-right corner, showing the question WHERE'S THE HARDENED REGISTRY? with an abstract answer, a docs source chip, and a follow-up chip."
      style={{ width: "100%", height: "auto", display: "block", fontFamily: "var(--font-geist-mono), ui-monospace, monospace" }}
    >
      <title>Posture A: general visitor widget</title>

      {/* figure header */}
      <text x={16} y={27} fontSize={13} fontWeight={400} fill="#5E5757">
        {"// POSTURE A — GENERAL VISITOR"}
      </text>

      {/* ---- wireframe page (quiet) ---- */}
      <rect x={16} y={42} width={448} height={264} fill="#EDEDED" stroke="rgba(0,0,0,0.25)" strokeWidth={1} />

      {/* header bar */}
      <rect x={16} y={42} width={448} height={26} fill="#D9D9D9" />
      {/* site-mark + nav text-bars, knocked out of the header bar */}
      <rect x={30} y={51} width={56} height={8} fill="#EDEDED" />
      <rect x={344} y={52} width={30} height={6} fill="#EDEDED" />
      <rect x={382} y={52} width={30} height={6} fill="#EDEDED" />
      <rect x={420} y={52} width={30} height={6} fill="#EDEDED" />

      {/* hero block */}
      <rect x={30} y={80} width={420} height={42} fill="#D9D9D9" />

      {/* two content blocks */}
      <rect x={30} y={134} width={200} height={56} fill="#D9D9D9" />
      <rect x={30} y={202} width={200} height={60} fill="#D9D9D9" />

      {/* ---- widget panel (the story: full contrast) ---- */}
      <rect x={252} y={130} width={200} height={164} fill="#FFFFFF" stroke="#000000" strokeWidth={1} />

      {/* widget header: OPEN dot (the one accent), title, close */}
      <circle cx={266} cy={142} r={3} fill="#EC4E09" />
      <text x={277} y={146} fontSize={11} fontWeight={500} fill="#231A09">
        ASK P1
      </text>
      <line x1={434} y1={138} x2={442} y2={146} stroke="#5E5757" strokeWidth={1.25} />
      <line x1={442} y1={138} x2={434} y2={146} stroke="#5E5757" strokeWidth={1.25} />
      <line x1={252} y1={154} x2={452} y2={154} stroke="rgba(0,0,0,0.375)" strokeWidth={1} />

      {/* user question (shared string with posture B) */}
      <text x={262} y={171} fontSize={11} fontWeight={400} fill="#231A09">
        {"WHERE'S THE HARDENED"}
      </text>
      <text x={262} y={186} fontSize={11} fontWeight={400} fill="#231A09">
        {"REGISTRY?"}
      </text>

      {/* answer as abstract text-bars */}
      <rect x={262} y={200} width={176} height={7} fill="#D9D9D9" />
      <rect x={262} y={215} width={164} height={7} fill="#D9D9D9" />
      <rect x={262} y={230} width={104} height={7} fill="#D9D9D9" />

      {/* source chip */}
      <rect x={262} y={254} width={72} height={20} rx={2} fill="#FFFFFF" stroke="#A43B0D" strokeWidth={1} />
      <text x={298} y={268} fontSize={11} fontWeight={400} fill="#A43B0D" textAnchor="middle">
        [1] DOCS
      </text>

      {/* follow-up chip */}
      <rect x={342} y={254} width={78} height={20} rx={2} fill="#FFFFFF" stroke="#5E5757" strokeWidth={1} />
      <text x={381} y={268} fontSize={11} fontWeight={400} fill="#5E5757" textAnchor="middle">
        FOLLOW-UP
      </text>
    </svg>
  );
}
