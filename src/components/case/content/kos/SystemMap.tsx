export default function SystemMap() {
  return (
    <svg
      viewBox="0 0 979 440"
      role="img"
      aria-label="Full-system map of Knowledge OS: URLs enter from Telegram, the web app, or research runs; pass a security gate, an eleven-tool extraction registry, Haiku summarize-and-score, and Voyage embedding into the corpus; twelve manual agents read the corpus (4,339 sources measured July 27) and write signals back; surfaces include cited chat, the brief, gallery, Obsidian, and a read-only guest view. An orange loop marks the research agent as the only path to the open web."
      style={{
        width: "100%",
        height: "auto",
        display: "block",
        fontFamily: "var(--font-geist-mono), ui-monospace, monospace",
      }}
    >
      <title>The whole machine: capture, pipeline, corpus, agents, surfaces</title>

      <defs>
        <marker
          id="kosmap-arrow"
          viewBox="0 0 8 8"
          markerWidth={8}
          markerHeight={8}
          markerUnits="userSpaceOnUse"
          refX={7}
          refY={4}
          orient="auto"
        >
          <path d="M0,0 L7,4 L0,8 Z" fill="#000000" />
        </marker>
        <marker
          id="kosmap-arrow-gray"
          viewBox="0 0 8 8"
          markerWidth={8}
          markerHeight={8}
          markerUnits="userSpaceOnUse"
          refX={7}
          refY={4}
          orient="auto"
        >
          <path d="M0,0 L7,4 L0,8 Z" fill="#5E5757" />
        </marker>
        <marker
          id="kosmap-arrow-orange"
          viewBox="0 0 8 8"
          markerWidth={8}
          markerHeight={8}
          markerUnits="userSpaceOnUse"
          refX={7}
          refY={4}
          orient="auto"
        >
          <path d="M0,0 L7,4 L0,8 Z" fill="#EC4E09" />
        </marker>
      </defs>

      {/* Figure header */}
      <text x={16} y={30} fontSize={13} fontWeight={400} fill="#5E5757">
        {"// THE WHOLE MACHINE — ONE URL IN, GROUNDED ANSWERS OUT"}
      </text>

      {/* ---- Entry column ---- */}
      <rect x={16} y={64} width={170} height={32} fill="#FFFFFF" stroke="#000000" strokeWidth={1} />
      <text x={101} y={84} textAnchor="middle" fontSize={13} fontWeight={400} fill="#231A09">
        {"TELEGRAM URL"}
      </text>

      <rect x={16} y={106} width={170} height={32} fill="#FFFFFF" stroke="#000000" strokeWidth={1} />
      <text x={101} y={126} textAnchor="middle" fontSize={13} fontWeight={400} fill="#231A09">
        {"WEB + GALLERY ADD"}
      </text>

      {/* Research entry — machine-expanded, hence dashed */}
      <rect
        x={16}
        y={148}
        width={170}
        height={32}
        fill="#FFFFFF"
        stroke="#000000"
        strokeWidth={1}
        strokeDasharray="4 3"
      />
      <text x={101} y={168} textAnchor="middle" fontSize={13} fontWeight={400} fill="#231A09">
        {"RESEARCH RUNS — EXA"}
      </text>

      {/* Entry → pipeline collectors */}
      <line x1={186} y1={80} x2={198} y2={105} stroke="#000000" strokeWidth={1} markerEnd="url(#kosmap-arrow)" />
      <line x1={186} y1={122} x2={198} y2={110} stroke="#000000" strokeWidth={1} markerEnd="url(#kosmap-arrow)" />
      <line x1={186} y1={164} x2={198} y2={115} stroke="#000000" strokeWidth={1} markerEnd="url(#kosmap-arrow)" />

      {/* ---- Pipeline row ---- */}
      <rect x={200} y={88} width={110} height={44} fill="#FFFFFF" stroke="#000000" strokeWidth={1} />
      <text x={255} y={114.5} textAnchor="middle" fontSize={13} fontWeight={400} fill="#231A09">
        {"SECURITY GATE"}
      </text>

      <line x1={310} y1={110} x2={333} y2={110} stroke="#000000" strokeWidth={1} markerEnd="url(#kosmap-arrow)" />

      <rect x={334} y={88} width={150} height={44} fill="#FFFFFF" stroke="#000000" strokeWidth={1} />
      <text x={409} y={106} textAnchor="middle" fontSize={13} fontWeight={400} fill="#231A09">
        {"EXTRACT"}
      </text>
      <text x={409} y={122} textAnchor="middle" fontSize={11} fontWeight={400} fill="#5E5757">
        {"TOOL REGISTRY ×11"}
      </text>

      <line x1={484} y1={110} x2={507} y2={110} stroke="#000000" strokeWidth={1} markerEnd="url(#kosmap-arrow)" />

      <rect x={508} y={88} width={186} height={44} fill="#FFFFFF" stroke="#000000" strokeWidth={1} />
      <text x={601} y={106} textAnchor="middle" fontSize={13} fontWeight={400} fill="#231A09">
        {"SUMMARIZE + SCORE"}
      </text>
      <text x={601} y={122} textAnchor="middle" fontSize={11} fontWeight={400} fill="#5E5757">
        {"HAIKU · PER-TOPIC RUBRICS"}
      </text>

      <line x1={694} y1={110} x2={717} y2={110} stroke="#000000" strokeWidth={1} markerEnd="url(#kosmap-arrow)" />

      <rect x={718} y={88} width={130} height={44} fill="#FFFFFF" stroke="#000000" strokeWidth={1} />
      <text x={783} y={106} textAnchor="middle" fontSize={13} fontWeight={400} fill="#231A09">
        {"EMBED"}
      </text>
      <text x={783} y={122} textAnchor="middle" fontSize={11} fontWeight={400} fill="#5E5757">
        {"VOYAGE + NOVELTY"}
      </text>

      {/* Fail-safe note under the extraction stage */}
      <text x={470} y={152} textAnchor="middle" fontSize={11} fontWeight={400} fill="#5E5757">
        {"FAILURES SAVED — NEVER DROPPED, RETRYABLE"}
      </text>

      {/* Pipeline → corpus */}
      <line x1={783} y1={132} x2={783} y2={195} stroke="#000000" strokeWidth={1} markerEnd="url(#kosmap-arrow)" />

      {/* ---- Corpus band ---- */}
      <rect
        x={200}
        y={196}
        width={640}
        height={56}
        fill="#EDEDED"
        stroke="rgba(0,0,0,0.25)"
        strokeWidth={1}
      />
      <text x={520} y={220} textAnchor="middle" fontSize={13} fontWeight={400} fill="#231A09">
        {"THE CORPUS — 4,339 SOURCES MEASURED JUL 27 · STILL GROWING"}
      </text>
      <text x={520} y={238} textAnchor="middle" fontSize={11} fontWeight={400} fill="#5E5757">
        {"SUPABASE + PGVECTOR · EVERY SAVE EMBEDDED · SPACE-SCOPED NOVELTY"}
      </text>

      {/* Corpus ↔ agents (dashed, gray) */}
      <line
        x1={320}
        y1={253}
        x2={320}
        y2={311}
        stroke="#5E5757"
        strokeWidth={1.25}
        strokeDasharray="5 4"
        markerEnd="url(#kosmap-arrow-gray)"
      />
      <line
        x1={470}
        y1={311}
        x2={470}
        y2={253}
        stroke="#5E5757"
        strokeWidth={1.25}
        strokeDasharray="5 4"
        markerEnd="url(#kosmap-arrow-gray)"
      />
      <text x={480} y={286} fontSize={11} fontWeight={400} fill="#5E5757">
        {"SIGNALS BACK"}
      </text>

      {/* Corpus → surfaces */}
      <line x1={720} y1={253} x2={720} y2={311} stroke="#000000" strokeWidth={1} markerEnd="url(#kosmap-arrow)" />

      {/* ---- Agents band ---- */}
      <rect x={200} y={312} width={380} height={92} fill="#FFFFFF" stroke="#000000" strokeWidth={1} />
      <text x={216} y={336} fontSize={13} fontWeight={400} fill="#231A09">
        {"12 AGENTS — MANUAL, ON DEMAND"}
      </text>
      <text x={216} y={356} fontSize={11} fontWeight={400} fill="#5E5757">
        {"CONNECTIONS · CONTRADICTIONS · GAPS"}
      </text>
      <text x={216} y={372} fontSize={11} fontWeight={400} fill="#5E5757">
        {"SYNTHESIS · OPPORTUNITIES · RESEARCH"}
      </text>
      <text x={216} y={388} fontSize={11} fontWeight={400} fill="#5E5757">
        {"WRITER · CRITIQUES · QUEUE · TASKS"}
      </text>

      {/* THE accent: the research loop — the only path to the open web */}
      <path
        d="M 200 372 Q 85 372 85 182"
        fill="none"
        stroke="#EC4E09"
        strokeWidth={1.5}
        strokeDasharray="5 4"
        markerEnd="url(#kosmap-arrow-orange)"
      />
      <text x={98} y={240} fontSize={11} fontWeight={500} fill="#A43B0D">
        {"THE ONE PATH"}
      </text>
      <text x={98} y={256} fontSize={11} fontWeight={500} fill="#A43B0D">
        {"TO THE OPEN WEB"}
      </text>

      {/* ---- Surfaces band ---- */}
      <rect x={620} y={312} width={343} height={92} fill="#FFFFFF" stroke="#000000" strokeWidth={1} />
      <text x={636} y={336} fontSize={13} fontWeight={400} fill="#231A09">
        {"WHERE IT SURFACES"}
      </text>
      <text x={636} y={356} fontSize={11} fontWeight={400} fill="#5E5757">
        {"CHAT — EVERY ANSWER CITED"}
      </text>
      <text x={636} y={372} fontSize={11} fontWeight={400} fill="#5E5757">
        {"BRIEF · GALLERY · ANALYTICS · OBSIDIAN"}
      </text>
      <text x={636} y={388} fontSize={11} fontWeight={400} fill="#5E5757">
        {"GUEST VIEW — READ-ONLY, SPEND-PROOF"}
      </text>

      {/* Footnote */}
      <text x={16} y={428} fontSize={11} fontWeight={400} fill="#A43B0D">
        {"// EVERY BOX VERIFIED IN CODE — REPO AUDIT, JUL 2026"}
      </text>
    </svg>
  );
}
