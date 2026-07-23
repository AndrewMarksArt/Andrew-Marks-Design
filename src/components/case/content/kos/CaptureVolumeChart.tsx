export default function CaptureVolumeChart() {
  return (
    <svg
      viewBox="0 0 979 360"
      role="img"
      aria-label="Representative bar chart (draft placeholder values pending a fresh log export): sixteen weekly capture bars ranging from roughly 296 to 412 items tower over a deep-reading capacity line labeled roughly fifteen to twenty items per week; the faint orange band between the line and the bars marks everything that gets skimmed or dropped."
      style={{
        width: "100%",
        height: "auto",
        display: "block",
        fontFamily: "var(--font-geist-mono), ui-monospace, monospace",
      }}
    >
      <title>Weekly capture volume vs reading speed</title>

      {/* Figure header */}
      <text x={16} y={29} fontSize={13} fontWeight={400} fill="#5E5757">
        {"// WEEKLY CAPTURE VOLUME — PIPELINE LOGS"}
      </text>

      {/* Hairline gridlines (400 / 300 / 200 / 100) — baseline scale: 0.55 units per item */}
      <line x1={64} y1={80} x2={744} y2={80} stroke="rgba(0,0,0,0.375)" strokeWidth={1} />
      <line x1={64} y1={135} x2={744} y2={135} stroke="rgba(0,0,0,0.375)" strokeWidth={1} />
      <line x1={64} y1={190} x2={744} y2={190} stroke="rgba(0,0,0,0.375)" strokeWidth={1} />
      <line x1={64} y1={245} x2={744} y2={245} stroke="rgba(0,0,0,0.375)" strokeWidth={1} />

      {/* Y-axis tick labels */}
      <text x={54} y={84} textAnchor="end" fontSize={11} fontWeight={400} fill="#5E5757">
        400
      </text>
      <text x={54} y={139} textAnchor="end" fontSize={11} fontWeight={400} fill="#5E5757">
        300
      </text>
      <text x={54} y={194} textAnchor="end" fontSize={11} fontWeight={400} fill="#5E5757">
        200
      </text>
      <text x={54} y={249} textAnchor="end" fontSize={11} fontWeight={400} fill="#5E5757">
        100
      </text>
      <text x={54} y={304} textAnchor="end" fontSize={11} fontWeight={400} fill="#5E5757">
        0
      </text>

      {/* Sixteen weekly capture bars — heights exactly value x 0.55, bottoms on y=300 */}
      <rect x={72} y={129.5} width={30} height={170.5} fill="#D9D9D9" stroke="rgba(0,0,0,0.25)" strokeWidth={1} /> {/* 310 */}
      <rect x={114} y={88.25} width={30} height={211.75} fill="#D9D9D9" stroke="rgba(0,0,0,0.25)" strokeWidth={1} /> {/* 385 */}
      <rect x={156} y={111.9} width={30} height={188.1} fill="#D9D9D9" stroke="rgba(0,0,0,0.25)" strokeWidth={1} /> {/* 342 */}
      <rect x={198} y={137.2} width={30} height={162.8} fill="#D9D9D9" stroke="rgba(0,0,0,0.25)" strokeWidth={1} /> {/* 296 */}
      <rect x={240} y={95.95} width={30} height={204.05} fill="#D9D9D9" stroke="rgba(0,0,0,0.25)" strokeWidth={1} /> {/* 371 */}
      <rect x={282} y={77.8} width={30} height={222.2} fill="#D9D9D9" stroke="rgba(0,0,0,0.25)" strokeWidth={1} /> {/* 404 */}
      <rect x={324} y={119.6} width={30} height={180.4} fill="#D9D9D9" stroke="rgba(0,0,0,0.25)" strokeWidth={1} /> {/* 328 */}
      <rect x={366} y={102.55} width={30} height={197.45} fill="#D9D9D9" stroke="rgba(0,0,0,0.25)" strokeWidth={1} /> {/* 359 */}
      <rect x={408} y={84.95} width={30} height={215.05} fill="#D9D9D9" stroke="rgba(0,0,0,0.25)" strokeWidth={1} /> {/* 391 */}
      <rect x={450} y={132.25} width={30} height={167.75} fill="#D9D9D9" stroke="rgba(0,0,0,0.25)" strokeWidth={1} /> {/* 305 */}
      <rect x={492} y={108.6} width={30} height={191.4} fill="#D9D9D9" stroke="rgba(0,0,0,0.25)" strokeWidth={1} /> {/* 348 */}
      <rect x={534} y={93.2} width={30} height={206.8} fill="#D9D9D9" stroke="rgba(0,0,0,0.25)" strokeWidth={1} /> {/* 376 */}
      <rect x={576} y={73.4} width={30} height={226.6} fill="#D9D9D9" stroke="rgba(0,0,0,0.25)" strokeWidth={1} /> {/* 412 */}
      <rect x={618} y={114.65} width={30} height={185.35} fill="#D9D9D9" stroke="rgba(0,0,0,0.25)" strokeWidth={1} /> {/* 337 */}
      <rect x={660} y={99.8} width={30} height={200.2} fill="#D9D9D9" stroke="rgba(0,0,0,0.25)" strokeWidth={1} /> {/* 364 */}
      <rect x={702} y={86.05} width={30} height={213.95} fill="#D9D9D9" stroke="rgba(0,0,0,0.25)" strokeWidth={1} /> {/* 389 */}

      {/* THE accent: the gap band — from the capacity line up to the lowest bar top (296),
          the zone every single week overflows */}
      <rect x={64} y={137.2} width={680} height={152.9} fill="#EC4E09" fillOpacity={0.06} />

      {/* X-axis baseline */}
      <line x1={64} y1={300} x2={744} y2={300} stroke="#000000" strokeWidth={1} />

      {/* Deep-reading capacity line at ~18 items/week */}
      <line x1={64} y1={290.1} x2={744} y2={290.1} stroke="#000000" strokeWidth={2} />
      <text x={756} y={294.5} fontSize={13} fontWeight={400} fill="#000000">
        DEEP-READING CAPACITY
      </text>
      <text x={756} y={310} fontSize={11} fontWeight={400} fill="#000000">
        {"~15–20/WK"}
      </text>

      {/* Gap band label — beside the band, centered on its vertical span */}
      <text x={756} y={208} fontSize={13} fontWeight={400} fill="#A43B0D">
        WHAT GETS SKIMMED
      </text>
      <text x={756} y={226} fontSize={13} fontWeight={400} fill="#A43B0D">
        OR DROPPED
      </text>

      {/* Draft footnote */}
      <text x={64} y={340} fontSize={11} fontWeight={400} fill="#A43B0D">
        {"// BAR VALUES ARE DRAFT PLACEHOLDERS — PENDING A FRESH LOG EXPORT"}
      </text>
    </svg>
  );
}
