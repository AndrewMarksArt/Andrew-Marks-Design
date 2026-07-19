export default function MedCalcCrop() {
  return (
    <svg
      viewBox="0 0 480 340"
      role="img"
      aria-label="Detail crop of the medication calculator: species, weight, and drug fields produce an emphasized dose result with a citation chip linking it to published dosing tables, plus safety microcopy telling users to verify against patient history."
      style={{
        width: "100%",
        height: "auto",
        display: "block",
        fontFamily: "var(--font-geist-mono), ui-monospace, monospace",
      }}
    >
      <title>Medication calculator — dose result detail</title>

      {/* Form card */}
      <rect
        x={24}
        y={24}
        width={432}
        height={260}
        fill="#FFFFFF"
        stroke="#000000"
        strokeWidth={1}
      />

      {/* Field row 1 — SPECIES */}
      <text x={44} y={63} fontSize={11} fontWeight={400} fill="#5E5757">
        SPECIES
      </text>
      <rect
        x={140}
        y={46}
        width={296}
        height={26}
        fill="#FFFFFF"
        stroke="rgba(0,0,0,0.25)"
        strokeWidth={1}
      />
      <text x={150} y={63} fontSize={12} fontWeight={400} fill="#231A09">
        CANINE
      </text>

      {/* Field row 2 — WEIGHT */}
      <text x={44} y={103} fontSize={11} fontWeight={400} fill="#5E5757">
        WEIGHT
      </text>
      <rect
        x={140}
        y={86}
        width={296}
        height={26}
        fill="#FFFFFF"
        stroke="rgba(0,0,0,0.25)"
        strokeWidth={1}
      />
      <text x={150} y={103} fontSize={12} fontWeight={400} fill="#231A09">
        24 KG
      </text>

      {/* Field row 3 — DRUG (abstract text-bar, no real drug name) */}
      <text x={44} y={143} fontSize={11} fontWeight={400} fill="#5E5757">
        DRUG
      </text>
      <rect
        x={140}
        y={126}
        width={296}
        height={26}
        fill="#FFFFFF"
        stroke="rgba(0,0,0,0.25)"
        strokeWidth={1}
      />
      <rect x={150} y={135.5} width={132} height={7} fill="#D9D9D9" />

      {/* Separator above result */}
      <line
        x1={44}
        y1={172}
        x2={436}
        y2={172}
        stroke="rgba(0,0,0,0.375)"
        strokeWidth={1}
      />

      {/* Computed result row — the one orange element underlines it */}
      <text x={44} y={200} fontSize={14} fontWeight={500} fill="#000000">
        DOSE: 12 MG · Q12H
      </text>
      <line x1={44} y1={207} x2={201} y2={207} stroke="#EC4E09" strokeWidth={2} />

      {/* Source chip — the receipt */}
      <rect
        x={44}
        y={222}
        width={188}
        height={20}
        rx={2}
        fill="#FFFFFF"
        stroke="#A43B0D"
        strokeWidth={1}
      />
      <text x={53} y={236} fontSize={11} fontWeight={400} fill="#A43B0D">
        [1] MERCK — DOSING TABLES
      </text>

      {/* Safety microcopy */}
      <text
        x={44}
        y={262}
        fontSize={11}
        fontWeight={400}
        fill="#5E5757"
        style={{ fontFamily: "var(--font-geist), sans-serif" }}
      >
        Calculations cite their table. Verify against patient history.
      </text>

      {/* Footnote */}
      <text x={24} y={317} fontSize={11} fontWeight={400} fill="#A43B0D">
        {"// REPRESENTATIVE VALUES — NOT CLINICAL GUIDANCE"}
      </text>
    </svg>
  );
}
