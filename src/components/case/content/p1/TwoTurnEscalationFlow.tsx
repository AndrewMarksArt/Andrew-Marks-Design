export default function TwoTurnEscalationFlow() {
  return (
    <svg
      viewBox="0 0 979 300"
      role="img"
      aria-label="Flow diagram of the escalation rule: a user question gets a sourced answer with inline citations, then a resolved check that either ends in self-service or, after two turns, opens a soft call to action to the help desk or customer success — with a hard cap by turn six so no conversation loops."
      style={{ width: "100%", height: "auto", display: "block", fontFamily: "var(--font-geist-mono), ui-monospace, monospace" }}
    >
      <title>Two-turn escalation flow</title>

      <defs>
        <marker
          id="flow-arrow"
          viewBox="0 0 8 8"
          refX={8}
          refY={4}
          markerWidth={8}
          markerHeight={8}
          markerUnits="userSpaceOnUse"
          orient="auto"
        >
          <path d="M 0 0 L 8 4 L 0 8 Z" fill="#000000" />
        </marker>
        <marker
          id="flow-arrow-muted"
          viewBox="0 0 8 8"
          refX={8}
          refY={4}
          markerWidth={8}
          markerHeight={8}
          markerUnits="userSpaceOnUse"
          orient="auto"
        >
          <path d="M 0 0 L 8 4 L 0 8 Z" fill="rgba(0,0,0,0.375)" />
        </marker>
      </defs>

      {/* Figure header */}
      <text x={16} y={27} fontSize={18} fontWeight={300} fill="#5E5757">
        {"// ESCALATION LOGIC — SELF-SERVICE BY DEFAULT, A HUMAN BY DESIGN"}
      </text>

      {/* Node: USER QUESTION */}
      <rect x={24} y={130} width={122} height={40} fill="#FFFFFF" stroke="#000000" strokeWidth={1} />
      <text x={85} y={154.5} fontSize={18} fontWeight={400} fill="#231A09" textAnchor="middle">
        USER QUESTION
      </text>

      {/* Edge: USER QUESTION -> SOURCED ANSWER */}
      <line x1={146} y1={150} x2={208} y2={150} stroke="#000000" strokeWidth={1.25} markerEnd="url(#flow-arrow)" />

      {/* Node: SOURCED ANSWER (with sub-label) */}
      <rect x={208} y={124} width={132} height={52} fill="#FFFFFF" stroke="#000000" strokeWidth={1} />
      <text x={274} y={146} fontSize={18} fontWeight={400} fill="#231A09" textAnchor="middle">
        SOURCED ANSWER
      </text>
      <text x={274} y={164} fontSize={15} fontWeight={400} fill="#5E5757" textAnchor="middle">
        CITATIONS INLINE
      </text>

      {/* Return loop: turn 2 folds back into the sourced answer */}
      <path
        d="M 300 124 C 300 92 248 92 248 123"
        fill="none"
        stroke="#000000"
        strokeWidth={1.25}
        markerEnd="url(#flow-arrow)"
      />
      <text x={274} y={78} fontSize={18} fontWeight={400} fill="#231A09" textAnchor="middle">
        TURN 2 - FOLLOW-UP
      </text>

      {/* Edge: SOURCED ANSWER -> RESOLVED? */}
      <line x1={340} y1={150} x2={402} y2={150} stroke="#000000" strokeWidth={1.25} markerEnd="url(#flow-arrow)" />

      {/* Decision diamond: RESOLVED? */}
      <polygon
        points="466,120 530,150 466,180 402,150"
        fill="#FFFFFF"
        stroke="#000000"
        strokeWidth={1}
      />
      <text x={466} y={154.5} fontSize={18} fontWeight={400} fill="#231A09" textAnchor="middle">
        RESOLVED?
      </text>

      {/* Annotation: the two-turn rule, with a dimension bracket over the diamond */}
      <text x={466} y={96} fontSize={18} fontWeight={500} fill="#000000" textAnchor="middle">
        HUMAN PATH AT TURN 2 - HARD CAP BY TURN 6
      </text>
      <line x1={402} y1={104} x2={530} y2={104} stroke="rgba(0,0,0,0.375)" strokeWidth={1} />
      <line x1={402} y1={104} x2={402} y2={110} stroke="rgba(0,0,0,0.375)" strokeWidth={1} />
      <line x1={530} y1={104} x2={530} y2={110} stroke="rgba(0,0,0,0.375)" strokeWidth={1} />
      <line x1={466} y1={104} x2={466} y2={112} stroke="rgba(0,0,0,0.375)" strokeWidth={1} />

      {/* YES branch: hairline drop to self-service */}
      <line
        x1={466}
        y1={180}
        x2={466}
        y2={215}
        stroke="rgba(0,0,0,0.375)"
        strokeWidth={1}
        markerEnd="url(#flow-arrow-muted)"
      />
      <text x={476} y={200} fontSize={18} fontWeight={400} fill="#5E5757">
        YES
      </text>

      {/* Node: DONE - SELF-SERVICE */}
      <rect x={381} y={216} width={170} height={36} fill="#FFFFFF" stroke="#000000" strokeWidth={1} />
      <text x={466} y={238.5} fontSize={18} fontWeight={400} fill="#231A09" textAnchor="middle">
        DONE - SELF-SERVICE
      </text>

      {/* NO branch: continues right to the designed human path */}
      <line x1={530} y1={150} x2={610} y2={150} stroke="#000000" strokeWidth={1.25} markerEnd="url(#flow-arrow)" />
      <text x={570} y={142} fontSize={18} fontWeight={400} fill="#5E5757" textAnchor="middle">
        NO
      </text>

      {/* Node: SOFT CTA — the one accent element */}
      <rect
        x={610}
        y={130}
        width={96}
        height={40}
        fill="#EC4E09"
        fillOpacity={0.1}
        stroke="#EC4E09"
        strokeWidth={1.5}
      />
      <text x={658} y={154.5} fontSize={18} fontWeight={400} fill="#231A09" textAnchor="middle">
        SOFT CTA
      </text>

      {/* Routed edges: SOFT CTA -> HELP DESK / CUSTOMER SUCCESS */}
      <path
        d="M 706 142 H 762 V 120 H 817"
        fill="none"
        stroke="#000000"
        strokeWidth={1.25}
        markerEnd="url(#flow-arrow)"
      />
      <path
        d="M 706 158 H 762 V 180 H 817"
        fill="none"
        stroke="#000000"
        strokeWidth={1.25}
        markerEnd="url(#flow-arrow)"
      />
      <text x={762} y={222} fontSize={18} fontWeight={400} fill="#5E5757" textAnchor="middle">
        ROUTED BY QUESTION TYPE
      </text>

      {/* Terminal node: HELP DESK */}
      <rect x={817} y={102} width={90} height={36} fill="#FFFFFF" stroke="#000000" strokeWidth={1} />
      <text x={862} y={124.5} fontSize={18} fontWeight={400} fill="#231A09" textAnchor="middle">
        HELP DESK
      </text>

      {/* Terminal node: CUSTOMER SUCCESS */}
      <rect x={817} y={162} width={146} height={36} fill="#FFFFFF" stroke="#000000" strokeWidth={1} />
      <text x={890} y={184.5} fontSize={18} fontWeight={400} fill="#231A09" textAnchor="middle">
        CUSTOMER SUCCESS
      </text>
    </svg>
  );
}
