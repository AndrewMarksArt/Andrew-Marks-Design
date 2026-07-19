export default function VuetifySpendMap() {
  return (
    <svg
      viewBox="0 0 480 322"
      role="img"
      aria-label="Wireframe of the assistant screen tinted into two classes: gray regions are stock Vuetify components covering roughly eighty percent of the interface (a draft split, final tally pending), and three orange regions mark the custom builds — the citations row, the follow-up chips row, and the escalation call to action."
      style={{
        width: "100%",
        height: "auto",
        display: "block",
        fontFamily: "var(--font-geist-mono), ui-monospace, monospace",
      }}
    >
      <title>Component spend map — stock vs custom regions</title>

      {/* Figure header */}
      <text x={16} y={28} fontSize={13} fontWeight={400} fill="#5E5757">
        {"// COMPONENT SPEND MAP"}
      </text>

      {/* Screen plate */}
      <rect x={16} y={40} width={448} height={204} fill="#FFFFFF" />

      {/* App shell (STOCK): top bar, sidebar, input bar */}
      <rect x={16} y={40} width={448} height={22} fill="#EDEDED" />
      <rect x={16} y={62} width={104} height={182} fill="#EDEDED" />
      <rect x={120} y={218} width={344} height={26} fill="#EDEDED" />

      {/* Top bar contents (STOCK) */}
      <rect x={28} y={48} width={72} height={6} fill="#D9D9D9" />
      <circle cx={450} cy={51} r={3} fill="#D9D9D9" />

      {/* Sidebar contents (STOCK): button + nav text-bars */}
      <rect x={28} y={74} width={80} height={16} fill="#D9D9D9" />
      <rect x={28} y={102} width={68} height={7} fill="#D9D9D9" />
      <rect x={28} y={118} width={56} height={7} fill="#D9D9D9" />
      <rect x={28} y={134} width={74} height={7} fill="#D9D9D9" />
      <rect x={28} y={150} width={62} height={7} fill="#D9D9D9" />

      {/* Input bar contents (STOCK): field + send button */}
      <rect
        x={132}
        y={226}
        width={272}
        height={10}
        fill="#FFFFFF"
        stroke="rgba(0,0,0,0.25)"
        strokeWidth={1}
      />
      <rect x={412} y={226} width={40} height={10} fill="#D9D9D9" />

      {/* Shell dividers (soft rules) */}
      <line x1={16} y1={62} x2={464} y2={62} stroke="rgba(0,0,0,0.25)" strokeWidth={1} />
      <line x1={120} y1={62} x2={120} y2={244} stroke="rgba(0,0,0,0.25)" strokeWidth={1} />
      <line x1={120} y1={218} x2={464} y2={218} stroke="rgba(0,0,0,0.25)" strokeWidth={1} />

      {/* Conversation (STOCK): user message + answer text-bars */}
      <rect x={308} y={70} width={140} height={14} fill="#D9D9D9" />
      <rect x={136} y={92} width={288} height={7} fill="#D9D9D9" />
      <rect x={136} y={107} width={252} height={7} fill="#D9D9D9" />
      <rect x={136} y={122} width={216} height={7} fill="#D9D9D9" />

      {/* CUSTOM region 1: citations row */}
      <rect
        x={136}
        y={137}
        width={312}
        height={20}
        fill="#EC4E09"
        fillOpacity={0.12}
        stroke="#EC4E09"
        strokeWidth={1.5}
      />
      <text x={144} y={150.5} fontSize={11} fontWeight={400} fill="#A43B0D">
        CITATIONS
      </text>
      <rect x={224} y={142} width={44} height={10} rx={2} fill="#FFFFFF" stroke="rgba(0,0,0,0.25)" strokeWidth={1} />
      <rect x={280} y={142} width={44} height={10} rx={2} fill="#FFFFFF" stroke="rgba(0,0,0,0.25)" strokeWidth={1} />
      <rect x={336} y={142} width={44} height={10} rx={2} fill="#FFFFFF" stroke="rgba(0,0,0,0.25)" strokeWidth={1} />

      {/* CUSTOM region 2: follow-up chips row */}
      <rect
        x={136}
        y={165}
        width={312}
        height={20}
        fill="#EC4E09"
        fillOpacity={0.12}
        stroke="#EC4E09"
        strokeWidth={1.5}
      />
      <text x={144} y={178.5} fontSize={11} fontWeight={400} fill="#A43B0D">
        FOLLOW-UP CHIPS
      </text>
      <rect x={260} y={170} width={52} height={10} rx={2} fill="#FFFFFF" stroke="rgba(0,0,0,0.25)" strokeWidth={1} />
      <rect x={324} y={170} width={52} height={10} rx={2} fill="#FFFFFF" stroke="rgba(0,0,0,0.25)" strokeWidth={1} />
      <rect x={388} y={170} width={52} height={10} rx={2} fill="#FFFFFF" stroke="rgba(0,0,0,0.25)" strokeWidth={1} />

      {/* CUSTOM region 3: escalation CTA */}
      <rect
        x={136}
        y={193}
        width={116}
        height={16}
        fill="#EC4E09"
        fillOpacity={0.12}
        stroke="#EC4E09"
        strokeWidth={1.5}
      />
      <text x={144} y={204.5} fontSize={11} fontWeight={400} fill="#A43B0D">
        ESCALATION CTA
      </text>

      {/* Screen frame */}
      <rect x={16} y={40} width={448} height={204} fill="none" stroke="#000000" strokeWidth={1} />

      {/* Legend */}
      <rect x={16} y={252} width={12} height={12} fill="#D9D9D9" stroke="rgba(0,0,0,0.25)" strokeWidth={1} />
      <text x={36} y={262} fontSize={13} fontWeight={400} fill="#5E5757">
        {"VUETIFY STOCK — "}
        <tspan fontWeight={500}>{"~80%"}</tspan>
        {" (DRAFT)"}
      </text>
      <rect
        x={16}
        y={273}
        width={12}
        height={12}
        fill="#EC4E09"
        fillOpacity={0.12}
        stroke="#EC4E09"
        strokeWidth={1.5}
      />
      <text x={36} y={283} fontSize={13} fontWeight={400} fill="#A43B0D">
        CUSTOM — SPENT WHERE TRUST IS WON
      </text>

      {/* Draft tag */}
      <text x={464} y={303} fontSize={11} fontWeight={400} fill="#A43B0D" textAnchor="end">
        {"// DRAFT SPLIT — FINAL TALLY PENDING"}
      </text>
    </svg>
  );
}
