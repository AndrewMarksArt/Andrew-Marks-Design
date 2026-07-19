export default function SameQuestionCompare() {
  return (
    <svg
      viewBox="0 0 979 360"
      role="img"
      aria-label="Three panels comparing the same question: a generic chatbot bubble with no sources, a ChatVET answer with two cited veterinary sources stacked above it, and ChatVET's explicit refusal card for questions the sources don't cover."
      style={{
        width: "100%",
        height: "auto",
        display: "block",
        fontFamily: "var(--font-geist-mono), ui-monospace, monospace",
      }}
    >
      <title>One question, three behaviors — hedged, cited, refused</title>

      {/* Figure header */}
      <text x={16} y={30} fontSize={13} fontWeight={300} fill="#5E5757">
        {"// ONE QUESTION, THREE BEHAVIORS"}
      </text>
      <line
        x1={16}
        y1={44}
        x2={963}
        y2={44}
        stroke="rgba(0,0,0,0.375)"
        strokeWidth={1}
      />

      {/* ---------- PANEL 1: GENERIC CHATBOT (x 16-266) ---------- */}
      <text x={16} y={80} fontSize={13} fontWeight={400} fill="#5E5757">
        GENERIC CHATBOT
      </text>

      {/* Rounded bubble — radius 10 is the off-brand signal here */}
      <rect
        x={16}
        y={96}
        width={250}
        height={136}
        rx={10}
        fill="#EDEDED"
        stroke="rgba(0,0,0,0.375)"
        strokeWidth={1}
      />
      {/* Abstract text-bars: hedgy, unattributed prose */}
      <rect x={40} y={128} width={202} height={8} fill="#D9D9D9" />
      <rect x={40} y={158} width={178} height={8} fill="#D9D9D9" />
      <rect x={40} y={188} width={118} height={8} fill="#D9D9D9" />

      <text x={16} y={260} fontSize={11} fontWeight={400} fill="#5E5757">
        NO SOURCES
      </text>

      {/* ---------- PANEL 2: CHATVET (x 310-680) ---------- */}
      <text x={310} y={80} fontSize={13} fontWeight={400} fill="#5E5757">
        CHATVET
      </text>

      {/* Sources stacked above the answer */}
      <rect
        x={310}
        y={96}
        width={224}
        height={28}
        rx={2}
        fill="#FFFFFF"
        stroke="#A43B0D"
        strokeWidth={1}
      />
      <text x={322} y={114} fontSize={11} fontWeight={400} fill="#A43B0D">
        [1] MERCK VET MANUAL — CH. 12
      </text>

      <rect
        x={310}
        y={134}
        width={196}
        height={28}
        rx={2}
        fill="#FFFFFF"
        stroke="#A43B0D"
        strokeWidth={1}
      />
      <text x={322} y={152} fontSize={11} fontWeight={400} fill="#A43B0D">
        [2] JOURNAL REVIEW — 2024
      </text>

      {/* Squared answer block */}
      <rect
        x={310}
        y={172}
        width={370}
        height={96}
        fill="#FFFFFF"
        stroke="#000000"
        strokeWidth={1}
      />
      <text
        x={324}
        y={198}
        fontSize={13}
        fill="#231A09"
        style={{ fontFamily: "var(--font-geist), sans-serif" }}
      >
        Dosing for this presentation follows the manual&apos;s
      </text>
      <text
        x={324}
        y={222}
        fontSize={13}
        fill="#231A09"
        style={{ fontFamily: "var(--font-geist), sans-serif" }}
      >
        <tspan>weight-banded table. </tspan>
        <tspan fill="#EC4E09" fontWeight={500}>
          [1]
        </tspan>
        <tspan> Recent guidance</tspan>
      </text>
      <text
        x={324}
        y={246}
        fontSize={13}
        fill="#231A09"
        style={{ fontFamily: "var(--font-geist), sans-serif" }}
      >
        <tspan>refines the interval. </tspan>
        <tspan fill="#EC4E09" fontWeight={500}>
          [2]
        </tspan>
      </text>

      {/* ---------- PANEL 3: THE REFUSAL (x 704-963) ---------- */}
      <text x={704} y={80} fontSize={13} fontWeight={400} fill="#5E5757">
        WHEN SOURCES DON&apos;T COVER IT
      </text>

      <rect
        x={704}
        y={96}
        width={259}
        height={112}
        fill="#FFFFFF"
        stroke="#000000"
        strokeWidth={1}
      />
      <text
        x={716}
        y={122}
        fontSize={12}
        fill="#231A09"
        style={{ fontFamily: "var(--font-geist), sans-serif" }}
      >
        The literature doesn&apos;t cover this
      </text>
      <text
        x={716}
        y={143}
        fontSize={12}
        fill="#231A09"
        style={{ fontFamily: "var(--font-geist), sans-serif" }}
      >
        combination. Here&apos;s the closest
      </text>
      <text
        x={716}
        y={164}
        fontSize={12}
        fill="#231A09"
        style={{ fontFamily: "var(--font-geist), sans-serif" }}
      >
        guidance — and the referral
      </text>
      <text
        x={716}
        y={185}
        fontSize={12}
        fill="#231A09"
        style={{ fontFamily: "var(--font-geist), sans-serif" }}
      >
        path.
      </text>

      <text x={704} y={236} fontSize={11} fontWeight={400} fill="#5E5757">
        SAYS SO, RATHER THAN IMPROVISING
      </text>

      {/* Footnote */}
      <text
        x={963}
        y={340}
        fontSize={11}
        fontWeight={400}
        fill="#A43B0D"
        textAnchor="end"
      >
        {"// REPRESENTATIVE CONVERSATION"}
      </text>
    </svg>
  );
}
