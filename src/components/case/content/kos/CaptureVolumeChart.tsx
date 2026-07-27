export default function CaptureVolumeChart() {
  return (
    <svg
      viewBox="0 0 979 360"
      role="img"
      aria-label="Representative bar chart scaled to the repo's documented average: sixteen weekly capture bars ranging from roughly 200 to 320 items — matching the recorded ~260-a-week growth between dated snapshots — tower over a deep-reading capacity line at roughly ten items per week; the faint orange band between the line and the bars marks everything that gets skimmed or dropped."
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
        {"// WEEKLY CAPTURE VOLUME — SCALED TO THE RECORDED AVERAGE"}
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
      <rect x={72} y={180.1} width={30} height={119.9} fill="#D9D9D9" stroke="rgba(0,0,0,0.25)" strokeWidth={1} /> {/* 218 */}
      <rect x={114} y={139.4} width={30} height={160.6} fill="#D9D9D9" stroke="rgba(0,0,0,0.25)" strokeWidth={1} /> {/* 292 */}
      <rect x={156} y={164.15} width={30} height={135.85} fill="#D9D9D9" stroke="rgba(0,0,0,0.25)" strokeWidth={1} /> {/* 247 */}
      <rect x={198} y={190.55} width={30} height={109.45} fill="#D9D9D9" stroke="rgba(0,0,0,0.25)" strokeWidth={1} /> {/* 199 */}
      <rect x={240} y={149.3} width={30} height={150.7} fill="#D9D9D9" stroke="rgba(0,0,0,0.25)" strokeWidth={1} /> {/* 274 */}
      <rect x={282} y={128.95} width={30} height={171.05} fill="#D9D9D9" stroke="rgba(0,0,0,0.25)" strokeWidth={1} /> {/* 311 */}
      <rect x={324} y={170.2} width={30} height={129.8} fill="#D9D9D9" stroke="rgba(0,0,0,0.25)" strokeWidth={1} /> {/* 236 */}
      <rect x={366} y={155.9} width={30} height={144.1} fill="#D9D9D9" stroke="rgba(0,0,0,0.25)" strokeWidth={1} /> {/* 262 */}
      <rect x={408} y={134.45} width={30} height={165.55} fill="#D9D9D9" stroke="rgba(0,0,0,0.25)" strokeWidth={1} /> {/* 301 */}
      <rect x={450} y={176.8} width={30} height={123.2} fill="#D9D9D9" stroke="rgba(0,0,0,0.25)" strokeWidth={1} /> {/* 224 */}
      <rect x={492} y={158.1} width={30} height={141.9} fill="#D9D9D9" stroke="rgba(0,0,0,0.25)" strokeWidth={1} /> {/* 258 */}
      <rect x={534} y={142.15} width={30} height={157.85} fill="#D9D9D9" stroke="rgba(0,0,0,0.25)" strokeWidth={1} /> {/* 287 */}
      <rect x={576} y={122.9} width={30} height={177.1} fill="#D9D9D9" stroke="rgba(0,0,0,0.25)" strokeWidth={1} /> {/* 322 */}
      <rect x={618} y={166.35} width={30} height={133.65} fill="#D9D9D9" stroke="rgba(0,0,0,0.25)" strokeWidth={1} /> {/* 243 */}
      <rect x={660} y={152.05} width={30} height={147.95} fill="#D9D9D9" stroke="rgba(0,0,0,0.25)" strokeWidth={1} /> {/* 269 */}
      <rect x={702} y={137.2} width={30} height={162.8} fill="#D9D9D9" stroke="rgba(0,0,0,0.25)" strokeWidth={1} /> {/* 296 */}

      {/* THE accent: the gap band — from the capacity line up to the lowest bar top (199),
          the zone every single week overflows */}
      <rect x={64} y={190.55} width={680} height={103.95} fill="#EC4E09" fillOpacity={0.06} />

      {/* X-axis baseline */}
      <line x1={64} y1={300} x2={744} y2={300} stroke="#000000" strokeWidth={1} />

      {/* Deep-reading capacity line at ~10 items/week */}
      <line x1={64} y1={294.5} x2={744} y2={294.5} stroke="#000000" strokeWidth={2} />
      <text x={756} y={299} fontSize={13} fontWeight={400} fill="#000000">
        DEEP-READING CAPACITY
      </text>
      <text x={756} y={314} fontSize={11} fontWeight={400} fill="#000000">
        {"~10/WK — THE RIGHT TEN"}
      </text>

      {/* Gap band label — beside the band, centered on its vertical span */}
      <text x={756} y={236} fontSize={13} fontWeight={400} fill="#A43B0D">
        WHAT GETS SKIMMED
      </text>
      <text x={756} y={254} fontSize={13} fontWeight={400} fill="#A43B0D">
        OR DROPPED
      </text>

      {/* Provenance footnote */}
      <text x={64} y={340} fontSize={11} fontWeight={400} fill="#A43B0D">
        {"// BARS REPRESENTATIVE — SCALED TO ~260/WK (1,214 → 3,241 SOURCES, APR 23 → JUN 16)"}
      </text>
    </svg>
  );
}
