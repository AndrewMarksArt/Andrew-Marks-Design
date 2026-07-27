export default function SystemEvolution() {
  return (
    <svg
      viewBox="0 0 979 300"
      role="img"
      aria-label="Corpus growth from the first commit on February 23 through July: dated points at 627 sources on March 30, about 1,000 sources and 960 agent signals on April 14, 1,214 on April 23, and 3,241 measured on June 16, with a dashed extrapolation to roughly 4,000 by early July. Milestone flags mark the capture bot deploying in week one, chat with RAG in March, the gap agent, agents going manual in May, and rerank retrieval plus branching in late June."
      style={{ width: "100%", height: "auto", display: "block", fontFamily: "var(--font-geist-mono), ui-monospace, monospace" }}
    >
      <title>Four and a half months, zero to compounding — dated corpus growth with milestones</title>

      {/* Figure header */}
      <text x={16} y={30} fontSize={13} fontWeight={400} fill="#5E5757">
        {"// FOUR AND A HALF MONTHS, ZERO TO COMPOUNDING"}
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

      {/* Month ticks + labels (Feb 1 at x=72, ~5.285 px/day) */}
      <line x1={72} y1={228} x2={72} y2={234} stroke="#000000" strokeWidth={1} />
      <line x1={220} y1={228} x2={220} y2={234} stroke="#000000" strokeWidth={1} />
      <line x1={384} y1={228} x2={384} y2={234} stroke="#000000" strokeWidth={1} />
      <line x1={542} y1={228} x2={542} y2={234} stroke="#000000" strokeWidth={1} />
      <line x1={706} y1={228} x2={706} y2={234} stroke="#000000" strokeWidth={1} />
      <line x1={865} y1={228} x2={865} y2={234} stroke="#000000" strokeWidth={1} />
      <text x={72} y={252} fontSize={11} fontWeight={400} fill="#5E5757" textAnchor="middle">FEB</text>
      <text x={220} y={252} fontSize={11} fontWeight={400} fill="#5E5757" textAnchor="middle">MAR</text>
      <text x={384} y={252} fontSize={11} fontWeight={400} fill="#5E5757" textAnchor="middle">APR</text>
      <text x={542} y={252} fontSize={11} fontWeight={400} fill="#5E5757" textAnchor="middle">MAY</text>
      <text x={706} y={252} fontSize={11} fontWeight={400} fill="#5E5757" textAnchor="middle">JUN</text>
      <text x={865} y={252} fontSize={11} fontWeight={400} fill="#5E5757" textAnchor="middle">JUL</text>

      {/* Growth line through dated points (solid = recorded) */}
      <path
        d="M 188 228 L 373 202.3 L 452.5 187 L 500 178.2 L 785.5 95.1"
        fill="none"
        stroke="#000000"
        strokeWidth={2}
      />
      {/* Extrapolation (dashed = not measured) */}
      <path
        d="M 785.5 95.1 L 896.5 63"
        fill="none"
        stroke="#EC4E09"
        strokeWidth={1.5}
        strokeDasharray="5 4"
      />

      {/* Dated data points */}
      <rect x={185} y={225} width={6} height={6} fill="#000000" />
      <rect x={370} y={199.3} width={6} height={6} fill="#000000" />
      <rect x={497} y={175.2} width={6} height={6} fill="#000000" />

      {/* Milestone labels — two staggered rows with hairline leaders */}
      {/* Capture bot, deployed day 2 (Feb 23) */}
      <line x1={188} y1={222} x2={188} y2={136} stroke="rgba(0,0,0,0.375)" strokeWidth={1} />
      <text x={188} y={130} fontSize={11} fontWeight={400} fill="#5E5757" textAnchor="middle">
        {"CAPTURE BOT · DEPLOYED — FEB 23"}
      </text>

      {/* Chat/RAG (Mar 17) */}
      <rect x={301.6} y={208.8} width={6} height={6} fill="#000000" />
      <line x1={304.6} y1={206} x2={304.6} y2={118} stroke="rgba(0,0,0,0.375)" strokeWidth={1} />
      <text x={304.6} y={112} fontSize={11} fontWeight={400} fill="#5E5757" textAnchor="middle">
        {"CHAT / RAG — MAR 17"}
      </text>

      {/* Gap agent (Mar 30) — the 627-source first run */}
      <line x1={373} y1={198} x2={373} y2={160} stroke="rgba(0,0,0,0.375)" strokeWidth={1} />
      <text x={373} y={154} fontSize={11} fontWeight={400} fill="#5E5757" textAnchor="middle">
        {"GAP AGENT — MAR 30 · 627"}
      </text>

      {/* Emphasized point — Apr 14: ~1,000 sources, ~960 signals */}
      <rect x={448} y={182.5} width={9} height={9} fill="#000000" />
      <line x1={452.5} y1={193} x2={452.5} y2={208} stroke="rgba(0,0,0,0.375)" strokeWidth={1} />
      <text x={452.5} y={221} fontSize={12} fontWeight={500} fill="#000000" textAnchor="middle">
        {"APR 14 — ~1,000 SOURCES · ~960 SIGNALS"}
      </text>

      {/* Agents go manual (May 7) */}
      <rect x={571} y={153.7} width={6} height={6} fill="#000000" />
      <line x1={574} y1={151} x2={574} y2={118} stroke="rgba(0,0,0,0.375)" strokeWidth={1} />
      <text x={574} y={112} fontSize={11} fontWeight={400} fill="#5E5757" textAnchor="middle">
        {"AGENTS GO MANUAL — MAY 7"}
      </text>

      {/* Emphasized measured point — Jun 16: 3,241 */}
      <rect x={781} y={90.6} width={9} height={9} fill="#000000" />
      <text x={770} y={88} fontSize={13} fontWeight={500} fill="#000000" textAnchor="end">
        {"3,241 — MEASURED JUN 16"}
      </text>

      {/* Rerank + branching (Jun 20–23) — below the curve */}
      <rect x={808} y={84.5} width={6} height={6} fill="#000000" />
      <line x1={811} y1={93} x2={811} y2={124} stroke="rgba(0,0,0,0.375)" strokeWidth={1} />
      <text x={811} y={138} fontSize={11} fontWeight={400} fill="#5E5757" textAnchor="middle">
        {"RERANK + BRANCHING — JUN 20–23"}
      </text>

      {/* Endpoint — extrapolated, hence hollow + orange */}
      <circle cx={896.5} cy={63} r={4.5} fill="#FFFFFF" stroke="#EC4E09" strokeWidth={1.5} />
      <text x={940} y={40} fontSize={13} fontWeight={500} fill="#EC4E09" textAnchor="end">
        {"≈4,000 — ON TRAJECTORY, JUL"}
      </text>

      {/* Footnote */}
      <text x={72} y={284} fontSize={11} fontWeight={400} fill="#A43B0D">
        {"// EVERY SOLID POINT DATED IN THE REPO — DASHED IS EXTRAPOLATION, PENDING A FRESH EXPORT"}
      </text>
    </svg>
  );
}
