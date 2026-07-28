export default function CitedAnswerCloseup() {
  return (
    <svg
      viewBox="0 0 480 340"
      role="img"
      aria-label="Close-up of one chat exchange: a user asks how to get a container approved, and the assistant's answer carries two numbered documentation citations plus follow-up chips, including a path to a human."
      style={{ width: "100%", height: "auto", display: "block", fontFamily: "var(--font-geist-mono), ui-monospace, monospace" }}
    >
      <title>Cited answer close-up</title>

      {/* User bubble — right-aligned */}
      <rect x={216} y={20} width={248} height={54} rx={2} fill="#EDEDED" />
      <text x={228} y={41} fontSize={13} fontWeight={400} fill="#231A09" style={{ fontFamily: "var(--font-geist), sans-serif" }}>
        How do I get a container approved
      </text>
      <text x={228} y={60} fontSize={13} fontWeight={400} fill="#231A09" style={{ fontFamily: "var(--font-geist), sans-serif" }}>
        for the platform?
      </text>

      {/* Assistant answer block — left, with cited sources */}
      <rect x={16} y={100} width={368} height={80} fill="#FFFFFF" stroke="#000000" strokeWidth={1} />
      <text x={28} y={124} fontSize={13} fontWeight={400} fill="#231A09" style={{ fontFamily: "var(--font-geist), sans-serif" }}>
        Containers go through the hardening pipeline:
      </text>
      <text x={28} y={143} fontSize={13} fontWeight={400} fill="#231A09" style={{ fontFamily: "var(--font-geist), sans-serif" }}>
        scan, remediate, approve. Each step is documented,
      </text>
      <text x={28} y={162} fontSize={13} fontWeight={400} fill="#231A09" style={{ fontFamily: "var(--font-geist), sans-serif" }}>
        and your answer links to the exact page.{" "}
        <tspan fill="#EC4E09">[1][2]</tspan>
      </text>

      {/* SOURCES row — attached below the answer */}
      <rect x={16} y={188} width={222} height={24} rx={2} fill="#FFFFFF" stroke="#A43B0D" strokeWidth={1} />
      <text x={127} y={204} fontSize={11} fontWeight={400} fill="#A43B0D" textAnchor="middle">
        [1] DOCS - CONTAINER HARDENING
      </text>
      <rect x={246} y={188} width={202} height={24} rx={2} fill="#FFFFFF" stroke="#A43B0D" strokeWidth={1} />
      <text x={347} y={204} fontSize={11} fontWeight={400} fill="#A43B0D" textAnchor="middle">
        [2] DOCS - ONBOARDING GUIDE
      </text>

      {/* Follow-up chips */}
      <rect x={16} y={230} width={180} height={24} rx={2} fill="#FFFFFF" stroke="#5E5757" strokeWidth={1} />
      <text x={106} y={246} fontSize={11} fontWeight={400} fill="#5E5757" textAnchor="middle">
        WHAT SCANS ARE REQUIRED?
      </text>
      <rect x={204} y={230} width={174} height={24} rx={2} fill="#FFFFFF" stroke="#5E5757" strokeWidth={1} />
      <text x={291} y={246} fontSize={11} fontWeight={400} fill="#5E5757" textAnchor="middle">
        CONNECT ME WITH A HUMAN
      </text>

      {/* Footnote */}
      <text x={464} y={316} fontSize={11} fontWeight={400} fill="#A43B0D" textAnchor="end">
        {"// REPRESENTATIVE CONVERSATION"}
      </text>
    </svg>
  );
}
