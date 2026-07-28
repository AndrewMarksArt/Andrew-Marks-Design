export default function PostureDevFullscreen() {
  return (
    <svg
      viewBox="0 0 480 322"
      role="img"
      aria-label="Posture B: the same assistant expanded into a full-screen developer workspace: a history sidebar, the question WHERE'S THE HARDENED REGISTRY? answered with a dark docker code block, a rail of three source chips, and an EXPANDED mode tag on the top bar."
      style={{ width: "100%", height: "auto", display: "block", fontFamily: "var(--font-geist-mono), ui-monospace, monospace" }}
    >
      <title>Posture B: developer full-screen</title>

      {/* figure header */}
      <text x={16} y={27} fontSize={13} fontWeight={400} fill="#5E5757">
        {"// POSTURE B — DEVELOPER MODE"}
      </text>

      {/* ---- app plate: the entire canvas is the workspace ---- */}
      <rect x={16} y={42} width={448} height={264} fill="#FFFFFF" />

      {/* left sidebar fill */}
      <rect x={16} y={74} width={82} height={232} fill="#EDEDED" />

      {/* structure rules: top bar bottom, sidebar edge, rail edge */}
      <line x1={16} y1={74} x2={464} y2={74} stroke="rgba(0,0,0,0.375)" strokeWidth={1} />
      <line x1={98} y1={74} x2={98} y2={306} stroke="rgba(0,0,0,0.375)" strokeWidth={1} />
      <line x1={362} y1={74} x2={362} y2={306} stroke="rgba(0,0,0,0.375)" strokeWidth={1} />

      {/* top bar: same product title as posture A, plus the one accent — the mode tag */}
      <text x={28} y={62} fontSize={11} fontWeight={500} fill="#231A09">
        ASK P1
      </text>
      <rect x={384} y={50} width={72} height={16} fill="#EC4E09" fillOpacity={0.12} stroke="#EC4E09" strokeWidth={1.5} />
      <text x={420} y={62} fontSize={11} fontWeight={500} fill="#A43B0D" textAnchor="middle">
        EXPANDED
      </text>

      {/* ---- sidebar: history ---- */}
      <text x={28} y={94} fontSize={11} fontWeight={400} fill="#5E5757">
        HISTORY
      </text>
      <rect x={28} y={106} width={62} height={7} fill="#D9D9D9" />
      <rect x={28} y={122} width={48} height={7} fill="#D9D9D9" />
      <rect x={28} y={138} width={58} height={7} fill="#D9D9D9" />
      <rect x={28} y={154} width={40} height={7} fill="#D9D9D9" />
      <rect x={28} y={170} width={54} height={7} fill="#D9D9D9" />

      {/* ---- main pane: same question string as posture A ---- */}
      <text x={106} y={94} fontSize={11} fontWeight={400} fill="#231A09">
        {"WHERE'S THE HARDENED REGISTRY?"}
      </text>

      {/* answer: dark code block (pull command wraps to a continuation line) */}
      <rect x={106} y={106} width={248} height={76} fill="#231A09" />
      <text x={114} y={122} fontSize={11} fontWeight={400} fill="#FBC0A6">
        {"$ docker login registry.p1.example"}
      </text>
      <text x={114} y={138} fontSize={11} fontWeight={400} fill="#FBC0A6">
        {"$ docker pull registry.p1.example"}
      </text>
      <text x={141} y={154} fontSize={11} fontWeight={400} fill="#FBC0A6">
        {"/hardened/base"}
      </text>
      <text x={114} y={170} fontSize={11} fontWeight={400} fill="rgba(255,255,255,0.6)">
        {"# requires platform sso token"}
      </text>

      {/* answer prose as abstract text-bars */}
      <rect x={106} y={194} width={200} height={7} fill="#D9D9D9" />
      <rect x={106} y={209} width={148} height={7} fill="#D9D9D9" />

      {/* ---- right rail: sources ---- */}
      <text x={370} y={94} fontSize={11} fontWeight={400} fill="#5E5757">
        SOURCES
      </text>
      <rect x={370} y={106} width={86} height={20} rx={2} fill="#FFFFFF" stroke="#A43B0D" strokeWidth={1} />
      <text x={413} y={120} fontSize={11} fontWeight={400} fill="#A43B0D" textAnchor="middle">
        [1] DOCS
      </text>
      <rect x={370} y={134} width={86} height={20} rx={2} fill="#FFFFFF" stroke="#A43B0D" strokeWidth={1} />
      <text x={413} y={148} fontSize={11} fontWeight={400} fill="#A43B0D" textAnchor="middle">
        [2] GUIDE
      </text>
      <rect x={370} y={162} width={86} height={20} rx={2} fill="#FFFFFF" stroke="#A43B0D" strokeWidth={1} />
      <text x={413} y={176} fontSize={11} fontWeight={400} fill="#A43B0D" textAnchor="middle">
        [3] POLICY
      </text>

      {/* outer frame drawn last so the 1px stroke stays crisp over fills */}
      <rect x={16} y={42} width={448} height={264} fill="none" stroke="#000000" strokeWidth={1} />
    </svg>
  );
}
