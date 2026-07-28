export default function SystemEvolution() {
  return (
    <svg
      viewBox="0 0 979 300"
      role="img"
      aria-label="Corpus growth from the first commit on February 23 through late July, every point measured: 627 sources on March 30, about 1,000 sources and 960 agent signals on April 14, 1,214 on April 23, 3,241 on June 16, and 4,339 read from the product's own analytics on July 27. Milestone flags mark the capture bot deploying in week one, chat with RAG in March, the gap agent, agents going manual in May, and rerank retrieval plus branching in late June."
      style={{ width: "100%", height: "auto", display: "block", fontFamily: "var(--font-geist-mono), ui-monospace, monospace" }}
    >
      <title>Five months, zero to compounding — measured corpus growth with milestones</title>

      {/* Figure header */}
      <text x={16} y={30} fontSize={13} fontWeight={400} fill="#5E5757">
        {"// FIVE MONTHS, ZERO TO COMPOUNDING"}
      </text>

      {/* Gridlines (2,000 / 4,000) */}
      <line x1={72} y1={146} x2={944} y2={146} stroke="rgba(0,0,0,0.25)" strokeWidth={1} />
      <line x1={72} y1={64} x2={944} y2={64} stroke="rgba(0,0,0,0.25)" strokeWidth={1} />

      {/* Axes */}
      <line x1={72} y1={48} x2={72} y2={228} stroke="rgba(0,0,0,0.375)" strokeWidth={1} />
      <line x1={72} y1={228} x2={944} y2={228} stroke="#000000" strokeWidth={1} />

      {/* Y-axis tick labels */}
      <text x={62} y={232} fontSize={11} fontWeight={400} fill="#5E5757" textAnchor="end">0</text>
      <text x={62} y={150} fontSize={11} fontWeight={400} fill="#5E5757" textAnchor="end">2,000</text>
      <text x={62} y={68} fontSize={11} fontWeight={400} fill="#5E5757" textAnchor="end">4,000</text>

      {/* Month ticks + labels (Feb 1 at x=72, ~4.844 px/day to Jul 31) */}
      <line x1={72} y1={228} x2={72} y2={234} stroke="#000000" strokeWidth={1} />
      <line x1={207.6} y1={228} x2={207.6} y2={234} stroke="#000000" strokeWidth={1} />
      <line x1={357.8} y1={228} x2={357.8} y2={234} stroke="#000000" strokeWidth={1} />
      <line x1={503.1} y1={228} x2={503.1} y2={234} stroke="#000000" strokeWidth={1} />
      <line x1={653.3} y1={228} x2={653.3} y2={234} stroke="#000000" strokeWidth={1} />
      <line x1={798.6} y1={228} x2={798.6} y2={234} stroke="#000000" strokeWidth={1} />
      <text x={72} y={252} fontSize={11} fontWeight={400} fill="#5E5757" textAnchor="middle">FEB</text>
      <text x={207.6} y={252} fontSize={11} fontWeight={400} fill="#5E5757" textAnchor="middle">MAR</text>
      <text x={357.8} y={252} fontSize={11} fontWeight={400} fill="#5E5757" textAnchor="middle">APR</text>
      <text x={503.1} y={252} fontSize={11} fontWeight={400} fill="#5E5757" textAnchor="middle">MAY</text>
      <text x={653.3} y={252} fontSize={11} fontWeight={400} fill="#5E5757" textAnchor="middle">JUN</text>
      <text x={798.6} y={252} fontSize={11} fontWeight={400} fill="#5E5757" textAnchor="middle">JUL</text>

      {/* Growth line through measured points — all solid now */}
      <path
        d="M 178.6 228 L 348.1 202.3 L 420.8 187 L 464.4 178.2 L 726 95.1 L 924.5 50.1"
        fill="none"
        stroke="#000000"
        strokeWidth={2}
      />

      {/* Dated data points */}
      <rect x={175.6} y={225} width={6} height={6} fill="#000000" />
      <rect x={345.1} y={199.3} width={6} height={6} fill="#000000" />
      <rect x={461.4} y={175.2} width={6} height={6} fill="#000000" />

      {/* Capture bot, deployed day 2 (Feb 23) */}
      <line x1={178.6} y1={222} x2={178.6} y2={136} stroke="rgba(0,0,0,0.375)" strokeWidth={1} />
      <text x={178.6} y={130} fontSize={11} fontWeight={400} fill="#5E5757" textAnchor="middle">
        {"CAPTURE BOT · DEPLOYED — FEB 23"}
      </text>

      {/* Chat/RAG (Mar 17) */}
      <rect x={282.1} y={208.9} width={6} height={6} fill="#000000" />
      <line x1={285.1} y1={206} x2={285.1} y2={118} stroke="rgba(0,0,0,0.375)" strokeWidth={1} />
      <text x={285.1} y={112} fontSize={11} fontWeight={400} fill="#5E5757" textAnchor="middle">
        {"CHAT / RAG — MAR 17"}
      </text>

      {/* Gap agent (Mar 30) — the 627-source first run */}
      <line x1={348.1} y1={198} x2={348.1} y2={160} stroke="rgba(0,0,0,0.375)" strokeWidth={1} />
      <text x={348.1} y={154} fontSize={11} fontWeight={400} fill="#5E5757" textAnchor="middle">
        {"GAP AGENT — MAR 30 · 627"}
      </text>

      {/* Emphasized point — Apr 14: ~1,000 sources, ~960 signals */}
      <rect x={416.3} y={182.5} width={9} height={9} fill="#000000" />
      <line x1={420.8} y1={193} x2={420.8} y2={208} stroke="rgba(0,0,0,0.375)" strokeWidth={1} />
      <text x={420.8} y={221} fontSize={12} fontWeight={500} fill="#000000" textAnchor="middle">
        {"APR 14 — ~1,000 SOURCES · ~960 SIGNALS"}
      </text>

      {/* Agents go manual (May 7) */}
      <rect x={529.2} y={153.7} width={6} height={6} fill="#000000" />
      <line x1={532.2} y1={151} x2={532.2} y2={118} stroke="rgba(0,0,0,0.375)" strokeWidth={1} />
      <text x={532.2} y={112} fontSize={11} fontWeight={400} fill="#5E5757" textAnchor="middle">
        {"AGENTS GO MANUAL — MAY 7"}
      </text>

      {/* Measured point — Jun 16: 3,241 */}
      <rect x={721.5} y={90.6} width={9} height={9} fill="#000000" />
      <text x={711} y={88} fontSize={13} fontWeight={500} fill="#000000" textAnchor="end">
        {"3,241 — JUN 16"}
      </text>

      {/* Rerank + branching (Jun 20–23) — below the curve */}
      <rect x={744} y={86.7} width={6} height={6} fill="#000000" />
      <line x1={747} y1={95} x2={747} y2={124} stroke="rgba(0,0,0,0.375)" strokeWidth={1} />
      <text x={750} y={138} fontSize={11} fontWeight={400} fill="#5E5757" textAnchor="middle">
        {"RERANK + BRANCHING — JUN 20–23"}
      </text>

      {/* Endpoint — measured in the product's own analytics */}
      <rect x={920} y={45.6} width={9} height={9} fill="#000000" />
      <text x={940} y={38} fontSize={13} fontWeight={500} fill="#000000" textAnchor="end">
        {"4,339 — MEASURED JUL 27"}
      </text>

      {/* Footnote */}
      <text x={72} y={284} fontSize={11} fontWeight={400} fill="#A43B0D">
        {"// EVERY POINT MEASURED AND DATED — REPO DOCS THROUGH JUNE, THE PRODUCT'S OWN ANALYTICS FOR JUL 27"}
      </text>
    </svg>
  );
}
