export default function PhasedLaunchTimeline() {
  return (
    <svg
      viewBox="0 0 979 140"
      role="img"
      aria-label="Phased launch timeline: five undated stops on one line — staging is complete and marked today; behind SSO, certificate to field, public launch, and a custom front-end that replaces the interim widget remain ahead on a dashed future line."
      style={{ width: "100%", height: "auto", display: "block", fontFamily: "var(--font-geist-mono), ui-monospace, monospace" }}
    >
      <title>Phased launch sequence</title>

      {/* Figure header */}
      <text x={16} y={27} fontSize={10} fontWeight={300} fill="#5E5757">
        {"// LAUNCH SEQUENCE — INTENTIONALLY UNDATED"}
      </text>

      {/* Baseline: solid through TODAY, dashed into the future */}
      <line x1={16} y1={78} x2={112} y2={78} stroke="#000000" strokeWidth={2} />
      <line x1={112} y1={78} x2={963} y2={78} stroke="#000000" strokeWidth={2} strokeDasharray="6 6" />

      {/* TODAY flag — the one accent element */}
      <line x1={112} y1={61} x2={112} y2={92} stroke="#EC4E09" strokeWidth={2} />
      <text x={112} y={49} fontSize={10} fontWeight={500} fill="#EC4E09" textAnchor="middle">
        TODAY
      </text>

      {/* Stop markers: filled = shipped, hollow = future */}
      <rect x={56} y={74} width={8} height={8} fill="#000000" />
      <rect x={263} y={74} width={8} height={8} fill="#FFFFFF" stroke="#000000" strokeWidth={1} />
      <rect x={470} y={74} width={8} height={8} fill="#FFFFFF" stroke="#000000" strokeWidth={1} />
      <rect x={677} y={74} width={8} height={8} fill="#FFFFFF" stroke="#000000" strokeWidth={1} />
      <rect x={884} y={74} width={8} height={8} fill="#FFFFFF" stroke="#000000" strokeWidth={1} />

      {/* Stop labels — alternating below/above the line */}
      <text x={60} y={101} fontSize={10} fontWeight={400} fill="#231A09" textAnchor="middle">
        STAGING
      </text>
      <text x={267} y={60} fontSize={10} fontWeight={400} fill="#231A09" textAnchor="middle">
        BEHIND SSO
      </text>
      <text x={474} y={101} fontSize={10} fontWeight={400} fill="#231A09" textAnchor="middle">
        CERTIFICATE TO FIELD
      </text>
      <text x={681} y={60} fontSize={10} fontWeight={400} fill="#231A09" textAnchor="middle">
        PUBLIC LAUNCH
      </text>
      <text x={888} y={101} fontSize={10} fontWeight={400} fill="#231A09" textAnchor="middle">
        CUSTOM FRONT-END
      </text>

      {/* Sub-labels */}
      <text x={267} y={101} fontSize={8.5} fontWeight={400} fill="#5E5757" textAnchor="middle">
        INTERIM WIDGET
      </text>
      <text x={888} y={121} fontSize={8.5} fontWeight={400} fill="#5E5757" textAnchor="middle">
        REPLACES WIDGET
      </text>

      {/* Draft footnote */}
      <text x={16} y={121} fontSize={8.5} fontWeight={400} fill="#A43B0D">
        {"// TODAY MARKER = DRAFT — CONFIRM CURRENT PHASE"}
      </text>
    </svg>
  );
}
