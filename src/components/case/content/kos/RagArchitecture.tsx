export default function RagArchitecture() {
  return (
    <svg
      viewBox="0 0 979 380"
      role="img"
      aria-label="One-page architecture of Knowledge OS: a question is embedded, over-fetched from the corpus, reranked to the top ten sources, and passed to a model stamped with the rule to ground every claim in a named source or say the corpus doesn't cover it; the gap-analysis agent and a decay review loop over the corpus, where every source is embedded and scored."
      style={{
        width: "100%",
        height: "auto",
        display: "block",
        fontFamily: "var(--font-geist-mono), ui-monospace, monospace",
      }}
    >
      <title>The machine, drawn — Knowledge OS one-page architecture</title>

      <defs>
        <marker
          id="kosrag-arrow"
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
          id="kosrag-arrow-gray"
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
          id="kosrag-arrow-hair"
          viewBox="0 0 8 8"
          markerWidth={8}
          markerHeight={8}
          markerUnits="userSpaceOnUse"
          refX={7}
          refY={4}
          orient="auto"
        >
          <path d="M0,0 L7,4 L0,8 Z" fill="rgba(0,0,0,0.375)" />
        </marker>
      </defs>

      {/* Figure header */}
      <text x={16} y={32} fontSize={13} fontWeight={400} fill="#5E5757">
        {"// THE MACHINE, DRAWN — BUILT SOLO, IN PRODUCTION FROM WEEK ONE"}
      </text>

      {/* The grounding-rule stamp (THE accent element), bound to MODEL */}
      <rect
        x={629}
        y={50}
        width={262}
        height={48}
        fill="#EC4E09"
        fillOpacity={0.1}
        stroke="#EC4E09"
        strokeWidth={1.5}
      />
      <text x={760} y={70} textAnchor="middle" fontSize={11} fontWeight={500} fill="#A43B0D">
        {"GROUND EVERY CLAIM IN A NAMED SOURCE"}
      </text>
      <text x={760} y={87} textAnchor="middle" fontSize={11} fontWeight={500} fill="#A43B0D">
        {"— OR SAY THE CORPUS DOESN'T COVER IT"}
      </text>
      <line x1={760} y1={98} x2={760} y2={118.5} stroke="#EC4E09" strokeWidth={1.5} />

      {/* Main spine — seven nodes, left to right */}
      <rect x={16} y={120} width={82} height={40} fill="#FFFFFF" stroke="#000000" strokeWidth={1} />
      <text x={57} y={144.5} textAnchor="middle" fontSize={13} fontWeight={400} fill="#231A09">
        {"QUESTION"}
      </text>

      <rect x={157} y={120} width={58} height={40} fill="#FFFFFF" stroke="#000000" strokeWidth={1} />
      <text x={186} y={144.5} textAnchor="middle" fontSize={13} fontWeight={400} fill="#231A09">
        {"EMBED"}
      </text>

      <rect x={275} y={120} width={146} height={40} fill="#FFFFFF" stroke="#000000" strokeWidth={1} />
      <text x={348} y={144.5} textAnchor="middle" fontSize={13} fontWeight={400} fill="#231A09">
        {"OVER-FETCH 20–40"}
      </text>

      <rect x={480} y={120} width={66} height={40} fill="#FFFFFF" stroke="#000000" strokeWidth={1} />
      <text x={513} y={144.5} textAnchor="middle" fontSize={13} fontWeight={400} fill="#231A09">
        {"RERANK"}
      </text>

      <rect x={606} y={120} width={66} height={40} fill="#FFFFFF" stroke="#000000" strokeWidth={1} />
      <text x={639} y={144.5} textAnchor="middle" fontSize={13} fontWeight={400} fill="#231A09">
        {"TOP 10"}
      </text>

      <rect x={731} y={120} width={58} height={40} fill="#FFFFFF" stroke="#000000" strokeWidth={1} />
      <text x={760} y={144.5} textAnchor="middle" fontSize={13} fontWeight={400} fill="#231A09">
        {"MODEL"}
      </text>

      <rect x={849} y={120} width={114} height={40} fill="#FFFFFF" stroke="#000000" strokeWidth={1} />
      <text x={906} y={144.5} textAnchor="middle" fontSize={13} fontWeight={400} fill="#231A09">
        {"CITED ANSWER"}
      </text>

      {/* Spine arrows */}
      <line x1={98} y1={140} x2={156} y2={140} stroke="#000000" strokeWidth={1} markerEnd="url(#kosrag-arrow)" />
      <line x1={215} y1={140} x2={274} y2={140} stroke="#000000" strokeWidth={1} markerEnd="url(#kosrag-arrow)" />
      <line x1={421} y1={140} x2={479} y2={140} stroke="#000000" strokeWidth={1} markerEnd="url(#kosrag-arrow)" />
      <line x1={546} y1={140} x2={605} y2={140} stroke="#000000" strokeWidth={1} markerEnd="url(#kosrag-arrow)" />
      <line x1={672} y1={140} x2={730} y2={140} stroke="#000000" strokeWidth={1} markerEnd="url(#kosrag-arrow)" />
      <line x1={789} y1={140} x2={848} y2={140} stroke="#000000" strokeWidth={1} markerEnd="url(#kosrag-arrow)" />

      {/* Corpus band */}
      <rect
        x={100}
        y={280}
        width={780}
        height={60}
        fill="#EDEDED"
        stroke="rgba(0,0,0,0.25)"
        strokeWidth={1}
      />
      <text x={490} y={314.5} textAnchor="middle" fontSize={13} fontWeight={400} fill="#231A09">
        {"THE CORPUS — EVERY SOURCE EMBEDDED + SCORED"}
      </text>

      {/* Corpus feeds the over-fetch */}
      <line
        x1={348}
        y1={280}
        x2={348}
        y2={162}
        stroke="rgba(0,0,0,0.375)"
        strokeWidth={1}
        markerEnd="url(#kosrag-arrow-hair)"
      />

      {/* Agent loops over the corpus */}
      <path
        d="M 430 279 Q 525 190 620 277"
        fill="none"
        stroke="#5E5757"
        strokeWidth={1.25}
        strokeDasharray="5 4"
        markerEnd="url(#kosrag-arrow-gray)"
      />
      <text x={525} y={220} textAnchor="middle" fontSize={11} fontWeight={400} fill="#5E5757">
        {"GAP-ANALYSIS AGENT"}
      </text>

      <path
        d="M 670 279 Q 760 190 850 277"
        fill="none"
        stroke="#5E5757"
        strokeWidth={1.25}
        strokeDasharray="5 4"
        markerEnd="url(#kosrag-arrow-gray)"
      />
      <text x={760} y={220} textAnchor="middle" fontSize={11} fontWeight={400} fill="#5E5757">
        {"DECAY REVIEW"}
      </text>
    </svg>
  );
}
