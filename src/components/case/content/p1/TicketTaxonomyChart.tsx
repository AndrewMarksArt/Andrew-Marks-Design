export default function TicketTaxonomyChart() {
  return (
    <svg
      viewBox="0 0 979 360"
      role="img"
      aria-label="Horizontal bar chart of 150 hand-coded contact-us tickets: 40 percent had an answer on the site or in the docs, 37 percent belonged to another team, 9 percent were true customer-success work, 8 percent were simple help-desk resets, and 6 percent were unclear or other."
      style={{ width: "100%", height: "auto", display: "block", fontFamily: "var(--font-geist-mono), ui-monospace, monospace" }}
    >
      <title>Ticket taxonomy: hand-coded contact-us sample</title>

      {/* Figure header (Figma revision 2026-07-21: terminal-prompt idiom) */}
      <text x={16} y={30} fontSize={16.5} fontWeight={400} fill="#5E5E5E">{">_ Random sample of 150 contact us responses analyzed"}
      </text>

      {/* Count grid: axis at 0, faint guides at 25 and 50 (10.4 units per ticket) */}
      <line x1={240} y1={56} x2={240} y2={274} stroke="rgba(0,0,0,0.375)" strokeWidth={1} />
      <line x1={500} y1={56} x2={500} y2={274} stroke="rgba(0,0,0,0.25)" strokeWidth={1} />
      <line x1={760} y1={56} x2={760} y2={274} stroke="rgba(0,0,0,0.25)" strokeWidth={1} />
      <text x={240} y={292} fontSize={15} fontWeight={400} fill="#5E5757" textAnchor="middle">0</text>
      <text x={500} y={292} fontSize={15} fontWeight={400} fill="#5E5757" textAnchor="middle">25</text>
      <text x={760} y={292} fontSize={15} fontWeight={400} fill="#5E5757" textAnchor="middle">50</text>

      {/* Row 1 — ANSWER ALREADY ON THE SITE (the headline number: accent) */}
      <text x={16} y={81.5} fontSize={14} fontWeight={400} fill="#231A09">Answer on site or in docs</text>
      <rect x={240} y={64} width={624} height={26} fill="#EC4E09" />
      <text x={872} y={81.5} fontSize={16.5} fill="#231A09">
        <tspan fontWeight={500}>60</tspan>
        <tspan fontWeight={400} fill="#5E5757">{" (40%)"}</tspan>
      </text>

      {/* Row 2 — BELONGED TO ANOTHER TEAM */}
      <text x={16} y={125.5} fontSize={14} fontWeight={400} fill="#231A09">Belonged to another team</text>
      <rect x={240} y={108} width={572} height={26} fill="#D9D9D9" stroke="rgba(0,0,0,0.25)" strokeWidth={1} />
      <text x={820} y={125.5} fontSize={16.5} fill="#231A09">
        <tspan fontWeight={500}>55</tspan>
        <tspan fontWeight={400} fill="#5E5757">{" (37%)"}</tspan>
      </text>

      {/* Row 3 — TRUE CUSTOMER-SUCCESS WORK */}
      <text x={16} y={169.5} fontSize={14} fontWeight={400} fill="#231A09">True customer-success work</text>
      <rect x={240} y={152} width={145.6} height={26} fill="#D9D9D9" stroke="rgba(0,0,0,0.25)" strokeWidth={1} />
      <text x={393.6} y={169.5} fontSize={16.5} fill="#231A09">
        <tspan fontWeight={500}>14</tspan>
        <tspan fontWeight={400} fill="#5E5757">{" (9%)"}</tspan>
      </text>

      {/* Row 4 — SIMPLE HELP-DESK RESETS */}
      <text x={16} y={213.5} fontSize={14} fontWeight={400} fill="#231A09">Simple help-desk resets</text>
      <rect x={240} y={196} width={124.8} height={26} fill="#D9D9D9" stroke="rgba(0,0,0,0.25)" strokeWidth={1} />
      <text x={372.8} y={213.5} fontSize={16.5} fill="#231A09">
        <tspan fontWeight={500}>12</tspan>
        <tspan fontWeight={400} fill="#5E5757">{" (8%)"}</tspan>
      </text>

      {/* Row 5 — UNCLEAR / OTHER */}
      <text x={16} y={257.5} fontSize={14} fontWeight={400} fill="#231A09">Unclear / other</text>
      <rect x={240} y={240} width={93.6} height={26} fill="#D9D9D9" stroke="rgba(0,0,0,0.25)" strokeWidth={1} />
      <text x={341.6} y={257.5} fontSize={16.5} fill="#231A09">
        <tspan fontWeight={500}>9</tspan>
        <tspan fontWeight={400} fill="#5E5757">{" (6%)"}</tspan>
      </text>

      {/* Footnote (draft-placeholder line removed per Andrew's Figma revision
          2026-07-21 — counts ratified) */}
      <text x={16} y={330} fontSize={18} fontWeight={400} fill="#5E5757">{"// PII RULED OUT AUTOMATED ANALYSIS, EVERY SAMPLED TICKET READ AND CODED BY HAND"}
      </text>
    </svg>
  );
}
