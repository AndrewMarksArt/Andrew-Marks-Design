export default function GhostedEhrMap() {
  return (
    <svg
      viewBox="0 0 979 420"
      role="img"
      aria-label="System map of the veterinary EHR scoped in discovery: seven ghosted regions — scheduling, patient records, billing, inventory, imaging, lab orders, and client comms — joined by hairline integration seams, with one orange-outlined region, the copilot wedge, holding the four features actually shipped: chat with citations, med calculator, lab interpreter, and templates. Dashed ties link the shipped tools back to the mapped regions they carve from."
      style={{
        width: "100%",
        height: "auto",
        display: "block",
        fontFamily: "var(--font-geist-mono), ui-monospace, monospace",
      }}
    >
      <title>The EHR we mapped — the wedge we shipped</title>

      {/* Figure header */}
      <text x={16} y={30} fontSize={13} fontWeight={400} fill="#5E5757">
        {"// THE EHR WE MAPPED — THE WEDGE WE SHIPPED"}
      </text>

      {/* Integration seams (hairline connectors) */}
      {/* SCHEDULING → PATIENT RECORDS */}
      <line
        x1={176}
        y1={116}
        x2={216}
        y2={116}
        stroke="rgba(0,0,0,0.375)"
        strokeWidth={1}
      />
      {/* CLIENT COMMS → PATIENT RECORDS */}
      <line
        x1={176}
        y1={216}
        x2={216}
        y2={216}
        stroke="rgba(0,0,0,0.375)"
        strokeWidth={1}
      />
      {/* PATIENT RECORDS → BILLING */}
      <line
        x1={466}
        y1={116}
        x2={506}
        y2={116}
        stroke="rgba(0,0,0,0.375)"
        strokeWidth={1}
      />
      {/* PATIENT RECORDS → LAB ORDERS */}
      <line
        x1={466}
        y1={216}
        x2={506}
        y2={216}
        stroke="rgba(0,0,0,0.375)"
        strokeWidth={1}
      />
      {/* PATIENT RECORDS → INVENTORY */}
      <line
        x1={266}
        y1={256}
        x2={266}
        y2={290}
        stroke="rgba(0,0,0,0.375)"
        strokeWidth={1}
      />
      {/* PATIENT RECORDS → IMAGING */}
      <line
        x1={436}
        y1={256}
        x2={436}
        y2={290}
        stroke="rgba(0,0,0,0.375)"
        strokeWidth={1}
      />
      {/* LAB ORDERS → IMAGING (elbow seam) */}
      <polyline
        points="581,256 581,325 526,325"
        fill="none"
        stroke="rgba(0,0,0,0.375)"
        strokeWidth={1}
      />
      {/* BILLING → COPILOT WEDGE */}
      <line
        x1={656}
        y1={116}
        x2={770}
        y2={116}
        stroke="rgba(0,0,0,0.375)"
        strokeWidth={1}
      />
      {/* LAB ORDERS → COPILOT WEDGE */}
      <line
        x1={656}
        y1={216}
        x2={770}
        y2={216}
        stroke="rgba(0,0,0,0.375)"
        strokeWidth={1}
      />

      {/* Carve-out ties — dashed relationship lines from shipped wedge tools
          back to the ghosted regions they carve from (no flow direction) */}
      {/* LAB INTERPRETER → LAB ORDERS */}
      <line
        x1={790}
        y1={188}
        x2={656}
        y2={188}
        stroke="rgba(0,0,0,0.25)"
        strokeWidth={1}
        strokeDasharray="3 3"
      />
      {/* CHAT + CITATIONS → PATIENT RECORDS */}
      <polyline
        points="790,128 690,128 690,166 466,166"
        fill="none"
        stroke="rgba(0,0,0,0.25)"
        strokeWidth={1}
        strokeDasharray="3 3"
      />
      {/* TEMPLATES → CLIENT COMMS */}
      <polyline
        points="790,226 680,226 680,380 96,380 96,256"
        fill="none"
        stroke="rgba(0,0,0,0.25)"
        strokeWidth={1}
        strokeDasharray="3 3"
      />

      {/* Ghosted regions — mapped in discovery */}
      {/* SCHEDULING */}
      <rect
        x={16}
        y={76}
        width={160}
        height={80}
        fill="#EDEDED"
        fillOpacity={0.6}
        stroke="rgba(0,0,0,0.25)"
        strokeWidth={1}
      />
      <text x={28} y={98} fontSize={13} fontWeight={400} fill="#5E5757">
        SCHEDULING
      </text>

      {/* CLIENT COMMS */}
      <rect
        x={16}
        y={176}
        width={160}
        height={80}
        fill="#EDEDED"
        fillOpacity={0.6}
        stroke="rgba(0,0,0,0.25)"
        strokeWidth={1}
      />
      <text x={28} y={198} fontSize={13} fontWeight={400} fill="#5E5757">
        CLIENT COMMS
      </text>

      {/* PATIENT RECORDS — central hub */}
      <rect
        x={216}
        y={76}
        width={250}
        height={180}
        fill="#EDEDED"
        fillOpacity={0.6}
        stroke="rgba(0,0,0,0.25)"
        strokeWidth={1}
      />
      <text x={228} y={98} fontSize={13} fontWeight={400} fill="#5E5757">
        PATIENT RECORDS
      </text>

      {/* BILLING */}
      <rect
        x={506}
        y={76}
        width={150}
        height={80}
        fill="#EDEDED"
        fillOpacity={0.6}
        stroke="rgba(0,0,0,0.25)"
        strokeWidth={1}
      />
      <text x={518} y={98} fontSize={13} fontWeight={400} fill="#5E5757">
        BILLING
      </text>

      {/* LAB ORDERS */}
      <rect
        x={506}
        y={176}
        width={150}
        height={80}
        fill="#EDEDED"
        fillOpacity={0.6}
        stroke="rgba(0,0,0,0.25)"
        strokeWidth={1}
      />
      <text x={518} y={198} fontSize={13} fontWeight={400} fill="#5E5757">
        LAB ORDERS
      </text>

      {/* INVENTORY */}
      <rect
        x={216}
        y={290}
        width={140}
        height={70}
        fill="#EDEDED"
        fillOpacity={0.6}
        stroke="rgba(0,0,0,0.25)"
        strokeWidth={1}
      />
      <text x={228} y={312} fontSize={13} fontWeight={400} fill="#5E5757">
        INVENTORY
      </text>

      {/* IMAGING */}
      <rect
        x={396}
        y={290}
        width={130}
        height={70}
        fill="#EDEDED"
        fillOpacity={0.6}
        stroke="rgba(0,0,0,0.25)"
        strokeWidth={1}
      />
      <text x={408} y={312} fontSize={13} fontWeight={400} fill="#5E5757">
        IMAGING
      </text>

      {/* THE COPILOT WEDGE — the one shipped region */}
      <rect
        x={770}
        y={76}
        width={180}
        height={168}
        fill="#EC4E09"
        fillOpacity={0.12}
        stroke="#EC4E09"
        strokeWidth={1.5}
      />
      <text
        x={860}
        y={98}
        fontSize={13}
        fontWeight={500}
        fill="#A43B0D"
        textAnchor="middle"
      >
        THE COPILOT WEDGE
      </text>

      {/* Wedge nodes — what shipped */}
      <rect
        x={790}
        y={112}
        width={140}
        height={24}
        fill="#FFFFFF"
        stroke="#000000"
        strokeWidth={1}
      />
      <text
        x={860}
        y={128}
        fontSize={11}
        fontWeight={400}
        fill="#231A09"
        textAnchor="middle"
      >
        CHAT + CITATIONS
      </text>

      <rect
        x={790}
        y={144}
        width={140}
        height={24}
        fill="#FFFFFF"
        stroke="#000000"
        strokeWidth={1}
      />
      <text
        x={860}
        y={160}
        fontSize={11}
        fontWeight={400}
        fill="#231A09"
        textAnchor="middle"
      >
        MED CALCULATOR
      </text>

      <rect
        x={790}
        y={176}
        width={140}
        height={24}
        fill="#FFFFFF"
        stroke="#000000"
        strokeWidth={1}
      />
      <text
        x={860}
        y={192}
        fontSize={11}
        fontWeight={400}
        fill="#231A09"
        textAnchor="middle"
      >
        LAB INTERPRETER
      </text>

      <rect
        x={790}
        y={208}
        width={140}
        height={24}
        fill="#FFFFFF"
        stroke="#000000"
        strokeWidth={1}
      />
      <text
        x={860}
        y={224}
        fontSize={11}
        fontWeight={400}
        fill="#231A09"
        textAnchor="middle"
      >
        TEMPLATES
      </text>

      {/* Annotation */}
      <text
        x={950}
        y={272}
        fontSize={13}
        fontWeight={500}
        fill="#000000"
        textAnchor="end"
      >
        SHIPPED IN MONTHS, NOT YEARS
      </text>

      {/* Legend */}
      <rect
        x={16}
        y={390}
        width={12}
        height={12}
        fill="#EDEDED"
        fillOpacity={0.6}
        stroke="rgba(0,0,0,0.25)"
        strokeWidth={1}
      />
      <text x={36} y={400} fontSize={13} fontWeight={400} fill="#5E5757">
        MAPPED IN DISCOVERY
      </text>
      <rect
        x={217}
        y={390}
        width={12}
        height={12}
        fill="#EC4E09"
        fillOpacity={0.12}
        stroke="#EC4E09"
        strokeWidth={1.5}
      />
      <text x={237} y={400} fontSize={13} fontWeight={400} fill="#5E5757">
        SHIPPED
      </text>
    </svg>
  );
}
