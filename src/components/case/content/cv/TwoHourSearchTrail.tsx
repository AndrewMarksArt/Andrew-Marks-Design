export default function TwoHourSearchTrail() {
  return (
    <svg
      viewBox="0 0 640 400"
      role="img"
      aria-label="A dotted trail winds through five dead ends — three government sites, a colleague call, and another government page, each marked with an x — ending at a readout of more than two hours for one answer."
      style={{ width: "100%", height: "auto", display: "block", fontFamily: "var(--font-geist-mono), ui-monospace, monospace" }}
    >
      <title>The two-hour search</title>

      {/* Full-canvas dark panel (sanctioned inversion) */}
      <rect x={0} y={0} width={640} height={400} fill="#231A09" />

      {/* Header */}
      <text x={20} y={32} fontSize={13} fontWeight={400} fill="#FBC0A6">
        {"// ONE QUESTION, ONE PATIENT"}
      </text>

      {/* Meandering dotted search path (drawn first; station boxes occlude it) */}
      <path
        d="M 62 50 C 80 56, 94 64, 108 73 C 170 96, 240 110, 314 123 C 382 152, 236 150, 148 178 C 66 204, 306 192, 404 228 C 480 258, 268 256, 188 283 C 124 308, 228 330, 312 338"
        fill="none"
        stroke="rgba(255,255,255,0.4)"
        strokeWidth={1.5}
        strokeDasharray="1.5 6"
        strokeLinecap="round"
      />

      {/* Station 1 — GOV SITE ONE (dead end) */}
      <rect x={40} y={58} width={136} height={30} fill="#231A09" stroke="rgba(255,255,255,0.4)" strokeWidth={1} />
      <text x={50} y={77} fontSize={13} fontWeight={400} fill="rgba(255,255,255,0.85)">
        GOV SITE ONE
      </text>
      <path d="M 158.5 69.5 L 165.5 76.5 M 165.5 69.5 L 158.5 76.5" stroke="#FBC0A6" strokeWidth={1.5} strokeLinecap="round" />

      {/* Station 2 — GOV SITE TWO (dead end) */}
      <rect x={250} y={108} width={136} height={30} fill="#231A09" stroke="rgba(255,255,255,0.4)" strokeWidth={1} />
      <text x={260} y={127} fontSize={13} fontWeight={400} fill="rgba(255,255,255,0.85)">
        GOV SITE TWO
      </text>
      <path d="M 368.5 119.5 L 375.5 126.5 M 375.5 119.5 L 368.5 126.5" stroke="#FBC0A6" strokeWidth={1.5} strokeLinecap="round" />

      {/* Station 3 — GOV SITE THREE (dead end) */}
      <rect x={80} y={163} width={152} height={30} fill="#231A09" stroke="rgba(255,255,255,0.4)" strokeWidth={1} />
      <text x={90} y={182} fontSize={13} fontWeight={400} fill="rgba(255,255,255,0.85)">
        GOV SITE THREE
      </text>
      <path d="M 214.5 174.5 L 221.5 181.5 M 221.5 174.5 L 214.5 181.5" stroke="#FBC0A6" strokeWidth={1.5} strokeLinecap="round" />

      {/* Station 4 — CALLED A COLLEAGUE (dead end) */}
      <rect x={320} y={213} width={184} height={30} fill="#231A09" stroke="rgba(255,255,255,0.4)" strokeWidth={1} />
      <text x={330} y={232} fontSize={13} fontWeight={400} fill="rgba(255,255,255,0.85)">
        CALLED A COLLEAGUE
      </text>
      <path d="M 486.5 224.5 L 493.5 231.5 M 493.5 224.5 L 486.5 231.5" stroke="#FBC0A6" strokeWidth={1.5} strokeLinecap="round" />

      {/* Station 5 — ANOTHER GOV PAGE (dead end) */}
      <rect x={120} y={268} width={168} height={30} fill="#231A09" stroke="rgba(255,255,255,0.4)" strokeWidth={1} />
      <text x={130} y={287} fontSize={13} fontWeight={400} fill="rgba(255,255,255,0.85)">
        ANOTHER GOV PAGE
      </text>
      <path d="M 270.5 279.5 L 277.5 286.5 M 277.5 279.5 L 270.5 286.5" stroke="#FBC0A6" strokeWidth={1.5} strokeLinecap="round" />

      {/* Terminal readout — the one accent element */}
      <text x={330} y={345} fontSize={24} fontWeight={500} fill="#EC4E09">
        {"2H+ — ONE ANSWER"}
      </text>

      {/* Footnote */}
      <text x={20} y={368} fontSize={11} fontWeight={400} fill="#FBC0A6">
        {"// RECONSTRUCTED FROM THE VET'S ACCOUNT — GOV SITES + COLLEAGUE CALLS,"}
      </text>
      <text x={20} y={384} fontSize={11} fontWeight={400} fill="#FBC0A6">
        {"// SEQUENCE REPRESENTATIVE"}
      </text>
    </svg>
  );
}
