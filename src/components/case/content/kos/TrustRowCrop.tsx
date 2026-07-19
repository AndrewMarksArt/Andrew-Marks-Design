export default function TrustRowCrop() {
  return (
    <svg
      viewBox="0 0 979 300"
      role="img"
      aria-label="One Knowledge OS source row shown at double size: a favicon, title bar, confidence and novelty score chips with their reasons, and an orange extraction-failed chip with an inline retry button, annotated with leader lines."
      style={{
        width: "100%",
        height: "auto",
        display: "block",
        fontFamily: "var(--font-geist-mono), ui-monospace, monospace",
      }}
    >
      <title>Trust on the row</title>

      <defs>
        <marker
          id="kostrust-arrow"
          viewBox="0 0 6 6"
          markerWidth={6}
          markerHeight={6}
          refX={5}
          refY={3}
          orient="auto"
        >
          <path d="M0,0 L6,3 L0,6 Z" fill="rgba(0,0,0,0.375)" />
        </marker>
      </defs>

      {/* Figure header */}
      <text x={16} y={30} fontSize={13} fontWeight={400} fill="#5E5757">
        {"// ON THE ROW, NOT IN A LOG"}
      </text>
      <text
        x={963}
        y={30}
        fontSize={13}
        fontWeight={400}
        fill="#5E5757"
        textAnchor="end"
      >
        {"SOURCE ROW — 2X"}
      </text>

      {/* Callout annotations above the row */}
      <text x={110} y={78} fontSize={13} fontWeight={400} fill="#5E5757">
        {"CONFIDENCE, WITH ITS REASON"}
      </text>
      <text x={420} y={78} fontSize={13} fontWeight={400} fill="#5E5757">
        {"NOVELTY VS EVERYTHING SAVED"}
      </text>

      {/* Leader lines pointing down at chip 1 and chip 2 */}
      <line
        x1={270}
        y1={89}
        x2={270}
        y2={114}
        stroke="rgba(0,0,0,0.375)"
        strokeWidth={1}
        markerEnd="url(#kostrust-arrow)"
      />
      <line
        x1={539}
        y1={89}
        x2={539}
        y2={114}
        stroke="rgba(0,0,0,0.375)"
        strokeWidth={1}
        markerEnd="url(#kostrust-arrow)"
      />

      {/* The source row, at 2x */}
      <rect
        x={16}
        y={118}
        width={947}
        height={64}
        fill="#FFFFFF"
        stroke="#000000"
        strokeWidth={1}
      />

      {/* Favicon square (abstract) */}
      <rect
        x={28}
        y={137}
        width={26}
        height={26}
        fill="#EDEDED"
        stroke="#000000"
        strokeWidth={1}
      />
      <rect x={36} y={145} width={10} height={10} fill="#D9D9D9" />

      {/* Title text-bar (abstract) */}
      <rect x={62} y={146} width={58} height={8} fill="#D9D9D9" />

      {/* Chip 1 — confidence score */}
      <rect
        x={130}
        y={139}
        width={280}
        height={22}
        rx={2}
        fill="#FFFFFF"
        stroke="rgba(0,0,0,0.25)"
        strokeWidth={1}
      />
      <text x={137} y={154} fontSize={11} fontWeight={400} fill="#231A09">
        {"SCORE 7.8 — CITES PRIMARY DATA, SMALL N"}
      </text>

      {/* Chip 2 — novelty score */}
      <rect
        x={420}
        y={139}
        width={239}
        height={22}
        rx={2}
        fill="#FFFFFF"
        stroke="rgba(0,0,0,0.25)"
        strokeWidth={1}
      />
      <text x={427} y={154} fontSize={11} fontWeight={400} fill="#231A09">
        {"NOVELTY 9.1 — FIRST ON THIS TOPIC"}
      </text>

      {/* Chip 3 — THE accent element: the failure, shown where you read */}
      <rect
        x={669}
        y={139}
        width={226}
        height={22}
        rx={2}
        fill="#EC4E09"
        fillOpacity={0.1}
        stroke="#EC4E09"
        strokeWidth={1.5}
      />
      <text x={676} y={154} fontSize={11} fontWeight={400} fill="#A43B0D">
        {"EXTRACTION FAILED — PDF PAYWALL"}
      </text>

      {/* Retry button chip, part of the failure/recovery cluster */}
      <rect
        x={903}
        y={139}
        width={48}
        height={22}
        rx={2}
        fill="#FFFFFF"
        stroke="#EC4E09"
        strokeWidth={1.5}
      />
      <text
        x={927}
        y={154}
        fontSize={11}
        fontWeight={400}
        fill="#A43B0D"
        textAnchor="middle"
      >
        {"RETRY"}
      </text>

      {/* Leader line pointing up at the failed chip */}
      <line
        x1={782}
        y1={212}
        x2={782}
        y2={186}
        stroke="rgba(0,0,0,0.375)"
        strokeWidth={1}
        markerEnd="url(#kostrust-arrow)"
      />

      {/* Largest annotation — the senior detail */}
      <text
        x={782}
        y={232}
        fontSize={13}
        fontWeight={500}
        fill="#000000"
        textAnchor="middle"
      >
        {"FAILURE + RECOVERY, IN PLACE"}
      </text>

      {/* Footnote */}
      <text x={16} y={280} fontSize={11} fontWeight={400} fill="#A43B0D">
        {"// REPRESENTATIVE ROW — SCORES AS THE SYSTEM RENDERS THEM"}
      </text>
    </svg>
  );
}
