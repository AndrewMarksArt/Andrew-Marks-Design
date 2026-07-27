export default function ScoringRecal() {
  return (
    <svg
      viewBox="0 0 640 300"
      role="img"
      aria-label="Before-and-after bars from the June scoring recalibration: with the original global rubric only about eight percent of high-worth design saves were scored HIGH; after the craft-aware rubric rewrite, about sixty-three percent — measured on a fifty-link gold set built before the fix."
      style={{
        width: "100%",
        height: "auto",
        display: "block",
        fontFamily: "var(--font-geist-mono), ui-monospace, monospace",
      }}
    >
      <title>Measure first, then fix — the scoring recalibration</title>

      {/* Figure header */}
      <text x={16} y={30} fontSize={13} fontWeight={400} fill="#5E5757">
        {"// MEASURE FIRST, THEN FIX"}
      </text>

      {/* What the bars measure */}
      <text x={16} y={64} fontSize={13} fontWeight={400} fill="#231A09">
        {"HIGH-WORTH DESIGN SAVES ACTUALLY SCORED ‘HIGH’"}
      </text>
      <text x={16} y={82} fontSize={11} fontWeight={400} fill="#5E5757">
        {"GOLD SET N=50, INDEPENDENT LABELER — BUILT BEFORE THE FIX"}
      </text>

      {/* Before bar */}
      <text x={16} y={116} fontSize={11} fontWeight={400} fill="#5E5757">
        {"BEFORE — ONE GLOBAL RUBRIC"}
      </text>
      <rect x={16} y={124} width={45} height={26} fill="#D9D9D9" stroke="rgba(0,0,0,0.25)" strokeWidth={1} />
      <text x={69} y={141.5} fontSize={13} fontWeight={400} fill="#231A09">
        {"~8%"}
      </text>

      {/* After bar — THE accent */}
      <text x={16} y={180} fontSize={11} fontWeight={400} fill="#5E5757">
        {"AFTER — CRAFT-AWARE RUBRIC (MIGRATION 068)"}
      </text>
      <rect
        x={16}
        y={188}
        width={353}
        height={26}
        fill="#EC4E09"
        fillOpacity={0.1}
        stroke="#EC4E09"
        strokeWidth={1.5}
      />
      <text x={377} y={205.5} fontSize={13} fontWeight={500} fill="#A43B0D">
        {"~63%"}
      </text>

      {/* Baseline context */}
      <text x={16} y={246} fontSize={11} fontWeight={400} fill="#231A09">
        {"BASELINE, 987 DESIGN LINKS: 5.0% REACHED HIGH VS A 20% TARGET — 95% CAPPED ≤0.74"}
      </text>

      {/* Footnote */}
      <text x={16} y={282} fontSize={11} fontWeight={400} fill="#A43B0D">
        {"// FROM THE REPO'S OWN EVAL DOCS — JUN 17–18, 2026"}
      </text>
    </svg>
  );
}
