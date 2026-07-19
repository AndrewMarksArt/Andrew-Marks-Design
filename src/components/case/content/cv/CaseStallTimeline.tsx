export default function CaseStallTimeline() {
  return (
    <svg
      viewBox="0 0 979 300"
      role="img"
      aria-label="One veterinary appointment mapped as a horizontal timeline: five phases from check-in to client debrief, four stall flags marking unquantified minute leaks, and one orange badge noting medication calculation was the number-one request vets added themselves."
      style={{
        width: "100%",
        height: "auto",
        display: "block",
        fontFamily: "var(--font-geist-mono), ui-monospace, monospace",
      }}
    >
      <title>One appointment, mapped — case-stall timeline</title>

      {/* Figure header */}
      <text x={16} y={30} fontSize={13} fontWeight={400} fill="#5E5757">
        {"// ONE APPOINTMENT, MAPPED"}
      </text>

      {/* Appointment spine: x 60 → 944 at y 170 */}
      <line x1={60} y1={170} x2={944} y2={170} stroke="#000000" strokeWidth={1.5} />

      {/* Phase boundary ticks (small squares centered on the line) */}
      <rect x={57} y={167} width={6} height={6} fill="#000000" />
      <rect x={177} y={167} width={6} height={6} fill="#000000" />
      <rect x={347} y={167} width={6} height={6} fill="#000000" />
      <rect x={557} y={167} width={6} height={6} fill="#000000" />
      <rect x={757} y={167} width={6} height={6} fill="#000000" />
      <rect x={941} y={167} width={6} height={6} fill="#000000" />

      {/* Phase labels — alternating above / below the line */}
      <text x={120} y={150} fontSize={13} fontWeight={400} fill="#231A09" textAnchor="middle">
        {"CHECK-IN"}
      </text>
      <text x={265} y={196} fontSize={13} fontWeight={400} fill="#231A09" textAnchor="middle">
        {"EXAM"}
      </text>
      <text x={455} y={150} fontSize={13} fontWeight={400} fill="#231A09" textAnchor="middle">
        {"DIAGNOSIS"}
      </text>
      <text x={660} y={196} fontSize={13} fontWeight={400} fill="#231A09" textAnchor="middle">
        {"TREATMENT PLAN"}
      </text>
      <text x={852} y={150} fontSize={13} fontWeight={400} fill="#231A09" textAnchor="middle">
        {"CLIENT DEBRIEF"}
      </text>

      {/* ---- STALL FLAG 1 — PROTOCOL SEARCH (x 380, early diagnosis) ---- */}
      <text x={380} y={78} fontSize={13} fontWeight={400} fill="#A43B0D" textAnchor="middle">
        {"PROTOCOL SEARCH"}
      </text>
      <path d="M 380 88 L 394 94 L 380 100 Z" fill="#A43B0D" />
      <line x1={380} y1={88} x2={380} y2={170} stroke="#A43B0D" strokeWidth={1.5} />
      <rect x={377.5} y={167.5} width={5} height={5} fill="#A43B0D" />
      <line
        x1={380}
        y1={174}
        x2={380}
        y2={224}
        stroke="#A43B0D"
        strokeWidth={1}
        strokeDasharray="3 3"
      />
      <text x={380} y={238} fontSize={13} fontWeight={400} fill="#A43B0D" textAnchor="middle">
        {"+ MIN"}
      </text>

      {/* ---- STALL FLAG 2 — BLOODWORK SECOND-GUESSING (x 530, late diagnosis) ---- */}
      <text x={530} y={62} fontSize={13} fontWeight={400} fill="#A43B0D" textAnchor="middle">
        {"BLOODWORK"}
      </text>
      <text x={530} y={78} fontSize={13} fontWeight={400} fill="#A43B0D" textAnchor="middle">
        {"SECOND-GUESSING"}
      </text>
      <path d="M 530 88 L 544 94 L 530 100 Z" fill="#A43B0D" />
      <line x1={530} y1={88} x2={530} y2={170} stroke="#A43B0D" strokeWidth={1.5} />
      <rect x={527.5} y={167.5} width={5} height={5} fill="#A43B0D" />
      <line
        x1={530}
        y1={174}
        x2={530}
        y2={224}
        stroke="#A43B0D"
        strokeWidth={1}
        strokeDasharray="3 3"
      />
      <text x={530} y={238} fontSize={13} fontWeight={400} fill="#A43B0D" textAnchor="middle">
        {"+ MIN"}
      </text>

      {/* ---- STALL FLAG 3 — RETYPED QUESTIONS (x 740, late treatment plan) ---- */}
      <text x={740} y={62} fontSize={13} fontWeight={400} fill="#A43B0D" textAnchor="middle">
        {"RETYPED"}
      </text>
      <text x={740} y={78} fontSize={13} fontWeight={400} fill="#A43B0D" textAnchor="middle">
        {"QUESTIONS"}
      </text>
      <path d="M 740 88 L 754 94 L 740 100 Z" fill="#A43B0D" />
      <line x1={740} y1={88} x2={740} y2={170} stroke="#A43B0D" strokeWidth={1.5} />
      <rect x={737.5} y={167.5} width={5} height={5} fill="#A43B0D" />
      <line
        x1={740}
        y1={174}
        x2={740}
        y2={224}
        stroke="#A43B0D"
        strokeWidth={1}
        strokeDasharray="3 3"
      />
      <text x={740} y={238} fontSize={13} fontWeight={400} fill="#A43B0D" textAnchor="middle">
        {"+ MIN"}
      </text>

      {/* ---- STALL FLAG 4 — CLIENT TRANSLATION (x 925, client debrief) ---- */}
      <text x={933} y={78} fontSize={13} fontWeight={400} fill="#A43B0D" textAnchor="end">
        {"CLIENT TRANSLATION"}
      </text>
      <path d="M 925 88 L 939 94 L 925 100 Z" fill="#A43B0D" />
      <line x1={925} y1={88} x2={925} y2={170} stroke="#A43B0D" strokeWidth={1.5} />
      <rect x={922.5} y={167.5} width={5} height={5} fill="#A43B0D" />
      <line
        x1={925}
        y1={174}
        x2={925}
        y2={224}
        stroke="#A43B0D"
        strokeWidth={1}
        strokeDasharray="3 3"
      />
      <text x={925} y={238} fontSize={13} fontWeight={400} fill="#A43B0D" textAnchor="middle">
        {"+ MIN"}
      </text>

      {/* THE accent element — the research surprise, floating off the map */}
      <rect
        x={90}
        y={214}
        width={250}
        height={30}
        rx={2}
        fill="#EC4E09"
        fillOpacity={0.1}
        stroke="#EC4E09"
        strokeWidth={1.5}
      />
      <text x={215} y={233} fontSize={13} fontWeight={500} fill="#A43B0D" textAnchor="middle">
        {"MED CALCULATION — #1 REQUEST"}
      </text>

      {/* Footnote */}
      <text x={16} y={280} fontSize={11} fontWeight={400} fill="#A43B0D">
        {"// STALLS AS MAPPED IN CASE WALKTHROUGHS — PER-STALL MINUTE COSTS PENDING SESSION NOTES"}
      </text>
    </svg>
  );
}
