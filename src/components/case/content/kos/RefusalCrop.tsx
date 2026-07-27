export default function RefusalCrop() {
  return (
    <svg
      viewBox="0 0 480 240"
      role="img"
      aria-label="Chat crop: a user asks for the consensus on agent-native IDE patterns; the system replies that the corpus doesn't cover this yet and that the research panel can go fill the shelf, with a Tools-to-Research chip and a Suggest Topics chip beneath — research is one click away, invoked by the user, never auto-run."
      style={{
        width: "100%",
        height: "auto",
        display: "block",
        fontFamily: "var(--font-geist-mono), ui-monospace, monospace",
      }}
    >
      <title>The refusal — the system admits zero coverage; the shelf-filler is one click away</title>

      {/* User bubble (right-aligned) */}
      <rect x={124} y={16} width={340} height={30} rx={2} fill="#EDEDED" />
      <text
        x={452}
        y={34}
        textAnchor="end"
        fontSize={12}
        fontWeight={400}
        fill="#231A09"
        style={{ fontFamily: "var(--font-geist), sans-serif" }}
      >
        {"What's the consensus on agent-native IDE patterns?"}
      </text>

      {/* System reply card */}
      <rect x={16} y={58} width={316} height={68} fill="#FFFFFF" stroke="#000000" strokeWidth={1} />
      <text
        x={28}
        y={80}
        fontSize={12}
        fontWeight={400}
        fill="#231A09"
        style={{ fontFamily: "var(--font-geist), sans-serif" }}
      >
        {"Your corpus doesn't cover this yet —"}
      </text>
      <text
        x={28}
        y={97}
        fontSize={12}
        fontWeight={400}
        fill="#231A09"
        style={{ fontFamily: "var(--font-geist), sans-serif" }}
      >
        {"nothing in the saved sources matches."}
      </text>
      <text
        x={28}
        y={114}
        fontSize={12}
        fontWeight={400}
        fill="#231A09"
        style={{ fontFamily: "var(--font-geist), sans-serif" }}
      >
        {"The research panel can go fill the shelf:"}
      </text>

      {/* Action chips — THE accent is the real one-click path */}
      <rect x={16} y={136} width={130} height={24} rx={2} fill="#EC4E09" fillOpacity={0.1} stroke="#EC4E09" strokeWidth={1.5} />
      <text x={81} y={152} textAnchor="middle" fontSize={11} fontWeight={500} fill="#A43B0D">
        {"TOOLS → RESEARCH"}
      </text>
      <rect x={156} y={136} width={110} height={24} rx={2} fill="#FFFFFF" stroke="#5E5757" strokeWidth={1} />
      <text x={211} y={152} textAnchor="middle" fontSize={11} fontWeight={400} fill="#5E5757">
        {"SUGGEST TOPICS"}
      </text>

      {/* Footnote */}
      <text x={464} y={220} textAnchor="end" fontSize={11} fontWeight={400} fill="#A43B0D">
        {"// REFUSAL = THE STANDING RULE · RESEARCH IS ONE CLICK AWAY"}
      </text>
    </svg>
  );
}
