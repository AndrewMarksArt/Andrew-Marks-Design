export default function TrustRowCrop() {
  return (
    <svg
      viewBox="0 0 979 300"
      role="img"
      aria-label="One Knowledge OS source row at double size, drawn as the live app renders it: a favicon, a title bar, and a single 0-to-100 value badge; an opened hover tooltip beneath shows the score's written breakdown — priority with its reason, novelty within the link's Space, percentile rank. To the right, an orange extraction-failed chip shows the failure saved on the row, with recovery one click away."
      style={{
        width: "100%",
        height: "auto",
        display: "block",
        fontFamily: "var(--font-geist-mono), ui-monospace, monospace",
      }}
    >
      <title>Trust on the row — the badge, the reason on hover, the failure kept</title>

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

      {/* Callout annotation above the badge */}
      <text x={62} y={72} fontSize={13} fontWeight={400} fill="#5E5757">
        {"ONE 0–100 VALUE BADGE — THE WHY, ONE HOVER AWAY"}
      </text>

      {/* Leader pointing down at the badge */}
      <line
        x1={160}
        y1={82}
        x2={160}
        y2={106}
        stroke="rgba(0,0,0,0.375)"
        strokeWidth={1}
        markerEnd="url(#kostrust-arrow)"
      />

      {/* The source row, at 2x */}
      <rect
        x={16}
        y={110}
        width={947}
        height={56}
        fill="#FFFFFF"
        stroke="#000000"
        strokeWidth={1}
      />

      {/* Favicon square (abstract) */}
      <rect x={28} y={125} width={26} height={26} fill="#EDEDED" stroke="#000000" strokeWidth={1} />
      <rect x={36} y={133} width={10} height={10} fill="#D9D9D9" />

      {/* Title text-bar (abstract) */}
      <rect x={62} y={134} width={70} height={8} fill="#D9D9D9" />

      {/* The value badge — dot + composite 0–100, as the live table renders it */}
      <circle cx={152} cy={138} r={5} fill="#5E5757" />
      <text x={164} y={143} fontSize={13} fontWeight={500} fill="#231A09">
        {"78"}
      </text>

      {/* The opened hover tooltip — priority + reason, novelty, percentile */}
      <line
        x1={160}
        y1={166}
        x2={160}
        y2={186}
        stroke="rgba(0,0,0,0.375)"
        strokeWidth={1}
      />
      <rect
        x={62}
        y={188}
        width={340}
        height={76}
        fill="#FFFFFF"
        stroke="rgba(0,0,0,0.375)"
        strokeWidth={1}
      />
      <text x={76} y={210} fontSize={11} fontWeight={400} fill="#231A09">
        {"PRIORITY 74 — CITES PRIMARY DATA, SMALL N"}
      </text>
      <text x={76} y={230} fontSize={11} fontWeight={400} fill="#231A09">
        {"NOVELTY 62 — FRESH WITHIN ITS SPACE"}
      </text>
      <text x={76} y={250} fontSize={11} fontWeight={400} fill="#231A09">
        {"PERCENTILE 81 — RANK IN ITS TOPIC"}
      </text>

      {/* Chip — THE accent element: the failure, kept where you read */}
      <rect
        x={620}
        y={127}
        width={226}
        height={22}
        rx={2}
        fill="#EC4E09"
        fillOpacity={0.1}
        stroke="#EC4E09"
        strokeWidth={1.5}
      />
      <text x={627} y={142} fontSize={11} fontWeight={400} fill="#A43B0D">
        {"EXTRACTION FAILED — PDF PAYWALL"}
      </text>

      {/* Re-ingest chip */}
      <rect
        x={856}
        y={127}
        width={92}
        height={22}
        rx={2}
        fill="#FFFFFF"
        stroke="#EC4E09"
        strokeWidth={1.5}
      />
      <text x={902} y={142} fontSize={11} fontWeight={400} fill="#A43B0D" textAnchor="middle">
        {"RE-INGEST"}
      </text>

      {/* Leader + the senior annotation under the failure cluster */}
      <line
        x1={782}
        y1={196}
        x2={782}
        y2={172}
        stroke="rgba(0,0,0,0.375)"
        strokeWidth={1}
        markerEnd="url(#kostrust-arrow)"
      />
      <text x={782} y={216} fontSize={13} fontWeight={500} fill="#000000" textAnchor="middle">
        {"SAVED, NEVER DROPPED —"}
      </text>
      <text x={782} y={234} fontSize={13} fontWeight={500} fill="#000000" textAnchor="middle">
        {"RECOVERY ONE CLICK AWAY, OR /RETRY IN TELEGRAM"}
      </text>

      {/* Footnote */}
      <text x={16} y={286} fontSize={11} fontWeight={400} fill="#A43B0D">
        {"// MIRRORS THE LIVE KNOWLEDGE TABLE — 0–100 VALUE BADGE, WRITTEN REASON ON HOVER"}
      </text>
    </svg>
  );
}
