export default function TwoHoursTenSeconds() {
  return (
    <svg
      viewBox="0 0 979 240"
      role="img"
      aria-label="Outcome callback: the two-hour manual verification is struck through, with an arrow pointing to ten seconds; users self-report about fifteen minutes saved per case, noted as self-reported with survey pending."
      style={{
        width: "100%",
        height: "auto",
        display: "block",
        fontFamily: "var(--font-geist-mono), ui-monospace, monospace",
      }}
    >
      <title>Two hours to ten seconds</title>

      <defs>
        <marker
          id="cvoutcome-arrow"
          markerWidth="8"
          markerHeight="8"
          refX="8"
          refY="4"
          orient="auto"
          markerUnits="userSpaceOnUse"
        >
          <path d="M0,0 L8,4 L0,8 Z" fill="#EC4E09" />
        </marker>
      </defs>

      {/* Figure header */}
      <text x={16} y={32} fontSize={13} fontWeight={300} fill="#5E5757">
        {"// THE CALLBACK"}
      </text>

      {/* Before: 2 HOURS (struck through) */}
      <text x={24} y={128} fontSize={60} fontWeight={300} fill="#5E5757">
        2 HOURS
      </text>
      <line
        x1={16}
        y1={107}
        x2={292}
        y2={107}
        stroke="rgba(0,0,0,0.25)"
        strokeWidth={2}
      />

      {/* The accent: one long arrow */}
      <line
        x1={312}
        y1={107}
        x2={555}
        y2={107}
        stroke="#EC4E09"
        strokeWidth={2}
        markerEnd="url(#cvoutcome-arrow)"
      />

      {/* After: 10 SECONDS */}
      <text
        x={955}
        y={128}
        fontSize={60}
        fontWeight={500}
        fill="#000000"
        textAnchor="end"
      >
        10 SECONDS
      </text>

      {/* Supporting line */}
      <text
        x={489.5}
        y={175}
        fontSize={13}
        fontWeight={400}
        fill="#5E5757"
        textAnchor="middle"
      >
        USERS SELF-REPORT ~15 MIN SAVED PER CASE
      </text>

      {/* Honesty footnote */}
      <text
        x={489.5}
        y={205}
        fontSize={11}
        fontWeight={400}
        fill="#A43B0D"
        textAnchor="middle"
      >
        {"// SELF-REPORTED — SURVEY N PENDING · ONE DOCUMENTED CASE, NOT A BENCHMARK"}
      </text>
    </svg>
  );
}
