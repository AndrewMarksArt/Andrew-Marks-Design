export default function GrowthTimeline() {
  return (
    <svg
      viewBox="0 0 979 300"
      role="img"
      aria-label="Corpus growth curve rising from zero in April to over 4,000 in July, accelerating slightly, with five release milestones marked along the curve — capture bot, scoring, gap agent, chat, branching — and the live endpoint labeled 4,000-plus, still shipping."
      style={{ width: "100%", height: "auto", display: "block", fontFamily: "var(--font-geist-mono), ui-monospace, monospace" }}
    >
      <title>Four months, zero to compounding — corpus growth with release milestones</title>

      {/* Figure header */}
      <text x={16} y={30} fontSize={13} fontWeight={400} fill="#5E5757">
        {"// FOUR MONTHS, ZERO TO COMPOUNDING"}
      </text>

      {/* Gridlines (2,000 / 4,000) */}
      <line x1={72} y1={146} x2={944} y2={146} stroke="rgba(0,0,0,0.25)" strokeWidth={1} />
      <line x1={72} y1={64} x2={944} y2={64} stroke="rgba(0,0,0,0.25)" strokeWidth={1} />

      {/* Axes */}
      <line x1={72} y1={56} x2={72} y2={228} stroke="rgba(0,0,0,0.375)" strokeWidth={1} />
      <line x1={72} y1={228} x2={944} y2={228} stroke="#000000" strokeWidth={1} />

      {/* Y-axis tick labels */}
      <text x={62} y={232} fontSize={11} fontWeight={400} fill="#5E5757" textAnchor="end">0</text>
      <text x={62} y={150} fontSize={11} fontWeight={400} fill="#5E5757" textAnchor="end">2,000</text>
      <text x={62} y={68} fontSize={11} fontWeight={400} fill="#5E5757" textAnchor="end">4,000</text>

      {/* Month ticks + labels */}
      <line x1={72} y1={228} x2={72} y2={234} stroke="#000000" strokeWidth={1} />
      <line x1={283} y1={228} x2={283} y2={234} stroke="#000000" strokeWidth={1} />
      <line x1={494} y1={228} x2={494} y2={234} stroke="#000000" strokeWidth={1} />
      <line x1={705} y1={228} x2={705} y2={234} stroke="#000000" strokeWidth={1} />
      <text x={72} y={252} fontSize={11} fontWeight={400} fill="#5E5757" textAnchor="middle">APR</text>
      <text x={283} y={252} fontSize={11} fontWeight={400} fill="#5E5757" textAnchor="middle">MAY</text>
      <text x={494} y={252} fontSize={11} fontWeight={400} fill="#5E5757" textAnchor="middle">JUN</text>
      <text x={705} y={252} fontSize={11} fontWeight={400} fill="#5E5757" textAnchor="middle">JUL</text>

      {/* Growth curve — quadratic, slightly convex (accelerating) */}
      <path d="M 72 228 Q 493.5 146.35 915 51.7" fill="none" stroke="#000000" strokeWidth={2} />

      {/* Milestone 1 — CAPTURE BOT (above) */}
      <rect x={147} y={209.8} width={6} height={6} fill="#000000" />
      <line x1={150} y1={208} x2={150} y2={198} stroke="rgba(0,0,0,0.375)" strokeWidth={1} />
      <text x={150} y={194} fontSize={11} fontWeight={400} fill="#5E5757" textAnchor="middle">CAPTURE BOT</text>

      {/* Milestone 2 — SCORING (below) */}
      <rect x={297} y={179.9} width={6} height={6} fill="#000000" />
      <line x1={300} y1={188} x2={300} y2={198} stroke="rgba(0,0,0,0.375)" strokeWidth={1} />
      <text x={300} y={210} fontSize={11} fontWeight={400} fill="#5E5757" textAnchor="middle">SCORING</text>

      {/* Milestone 3 — GAP AGENT (above) */}
      <rect x={557} y={126.1} width={6} height={6} fill="#000000" />
      <line x1={560} y1={124} x2={560} y2={114} stroke="rgba(0,0,0,0.375)" strokeWidth={1} />
      <text x={560} y={110} fontSize={11} fontWeight={400} fill="#5E5757" textAnchor="middle">GAP AGENT</text>

      {/* Milestone 4 — CHAT (below) */}
      <rect x={687} y={98.3} width={6} height={6} fill="#000000" />
      <line x1={690} y1={106} x2={690} y2={115} stroke="rgba(0,0,0,0.375)" strokeWidth={1} />
      <text x={690} y={127} fontSize={11} fontWeight={400} fill="#5E5757" textAnchor="middle">CHAT</text>

      {/* Milestone 5 — BRANCHING (above) */}
      <rect x={807} y={72.1} width={6} height={6} fill="#000000" />
      <line x1={810} y1={70} x2={810} y2={59} stroke="rgba(0,0,0,0.375)" strokeWidth={1} />
      <text x={810} y={53} fontSize={11} fontWeight={400} fill="#5E5757" textAnchor="middle">BRANCHING</text>

      {/* Emphasized point — mid-May (x = MAY tick + half a month; y on the curve) */}
      <rect x={383.5} y={160.5} width={9} height={9} fill="#000000" />
      <line x1={388} y1={159} x2={388} y2={133} stroke="rgba(0,0,0,0.375)" strokeWidth={1} />
      <text x={388} y={125} fontSize={12} fontWeight={500} fill="#000000" textAnchor="middle">
        {"1,900 SOURCES · 3,400+ SIGNALS"}
      </text>

      {/* Endpoint — THE accent */}
      <circle cx={915} cy={51.7} r={4.5} fill="#EC4E09" />
      <line x1={915} y1={44} x2={915} y2={40} stroke="#EC4E09" strokeWidth={1.5} />
      <text x={921} y={32} fontSize={13} fontWeight={500} fill="#EC4E09" textAnchor="end">
        {"4,000+ · STILL SHIPPING"}
      </text>

      {/* Footnote — draft placement */}
      <text x={963} y={281} fontSize={11} fontWeight={400} fill="#A43B0D" textAnchor="end">
        {"// MILESTONE PLACEMENT APPROXIMATE — PENDING COMMIT-HISTORY RENDER"}
      </text>
    </svg>
  );
}
