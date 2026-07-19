export default function RefusalCrop() {
  return (
    <svg
      viewBox="0 0 480 240"
      role="img"
      aria-label="Chat crop: a user asks for the consensus on agent-native IDE patterns; the system replies that 0 of 4,000 sources match and offers to run the research tool, with Run Research and Skip chips."
      style={{
        width: "100%",
        height: "auto",
        display: "block",
        fontFamily: "var(--font-geist-mono), ui-monospace, monospace",
      }}
    >
      <title>The refusal — the system admits zero coverage and offers to fill the shelf</title>

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
      <text x={28} y={97} fontSize={12} fontWeight={500} fill="#EC4E09">
        {"0 of 4,000"}
      </text>
      <text
        x={109}
        y={97}
        fontSize={12}
        fontWeight={400}
        fill="#231A09"
        style={{ fontFamily: "var(--font-geist), sans-serif" }}
      >
        {"sources match. Want me to run the"}
      </text>
      <text
        x={28}
        y={114}
        fontSize={12}
        fontWeight={400}
        fill="#231A09"
        style={{ fontFamily: "var(--font-geist), sans-serif" }}
      >
        {"research tool and fill the shelf?"}
      </text>

      {/* Action chips */}
      <rect x={16} y={136} width={100} height={24} rx={2} fill="#FFFFFF" stroke="#5E5757" strokeWidth={1} />
      <text x={66} y={152} textAnchor="middle" fontSize={11} fontWeight={400} fill="#5E5757">
        {"RUN RESEARCH"}
      </text>
      <rect x={126} y={136} width={44} height={24} rx={2} fill="#FFFFFF" stroke="#5E5757" strokeWidth={1} />
      <text x={148} y={152} textAnchor="middle" fontSize={11} fontWeight={400} fill="#5E5757">
        {"SKIP"}
      </text>

      {/* Footnote */}
      <text x={464} y={220} textAnchor="end" fontSize={11} fontWeight={400} fill="#A43B0D">
        {"// REPRESENTATIVE — THE BEHAVIOR IS THE STANDING RULE"}
      </text>
    </svg>
  );
}
