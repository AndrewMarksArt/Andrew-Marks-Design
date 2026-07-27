export default function AgentFleet() {
  return (
    <svg
      viewBox="0 0 979 360"
      role="img"
      aria-label="The twelve corpus agents grouped four ways — corpus intelligence, content pipeline, librarian, and ops — each drawn as a chip, with the cost arc beneath: weekly crons and fire-on-every-save burned about eight dollars a week in spring; now all twelve run on demand and the only cron left is a ten-cent-a-week digest."
      style={{
        width: "100%",
        height: "auto",
        display: "block",
        fontFamily: "var(--font-geist-mono), ui-monospace, monospace",
      }}
    >
      <title>Twelve boring agents, one interesting system — the fleet and its cost arc</title>

      {/* Figure header */}
      <text x={16} y={30} fontSize={13} fontWeight={400} fill="#5E5757">
        {"// TWELVE BORING AGENTS — ONE INTERESTING SYSTEM"}
      </text>

      {/* ---- Panel A: corpus intelligence ---- */}
      <rect x={16} y={52} width={560} height={100} fill="#FFFFFF" stroke="rgba(0,0,0,0.25)" strokeWidth={1} />
      <text x={32} y={72} fontSize={11} fontWeight={400} fill="#5E5757">
        {"CORPUS INTELLIGENCE — SONNET, CONFIDENCE-THRESHOLDED"}
      </text>
      <rect x={32} y={84} width={160} height={24} rx={2} fill="#FFFFFF" stroke="rgba(0,0,0,0.375)" strokeWidth={1} />
      <text x={112} y={100} textAnchor="middle" fontSize={11} fontWeight={400} fill="#231A09">
        {"CONNECTION DISCOVERY"}
      </text>
      <rect x={204} y={84} width={172} height={24} rx={2} fill="#FFFFFF" stroke="rgba(0,0,0,0.375)" strokeWidth={1} />
      <text x={290} y={100} textAnchor="middle" fontSize={11} fontWeight={400} fill="#231A09">
        {"CONTRADICTION DETECTOR"}
      </text>
      <rect x={388} y={84} width={110} height={24} rx={2} fill="#FFFFFF" stroke="rgba(0,0,0,0.375)" strokeWidth={1} />
      <text x={443} y={100} textAnchor="middle" fontSize={11} fontWeight={400} fill="#231A09">
        {"GAP ANALYSIS"}
      </text>
      <rect x={32} y={116} width={130} height={24} rx={2} fill="#FFFFFF" stroke="rgba(0,0,0,0.375)" strokeWidth={1} />
      <text x={97} y={132} textAnchor="middle" fontSize={11} fontWeight={400} fill="#231A09">
        {"TOPIC SYNTHESIS"}
      </text>
      <rect x={174} y={116} width={168} height={24} rx={2} fill="#FFFFFF" stroke="rgba(0,0,0,0.375)" strokeWidth={1} />
      <text x={258} y={132} textAnchor="middle" fontSize={11} fontWeight={400} fill="#231A09">
        {"OPPORTUNITY DETECTION"}
      </text>
      <text x={356} y={132} fontSize={11} fontWeight={400} fill="#5E5757">
        {"→ SIGNALS, HUMAN-REVIEWED"}
      </text>

      {/* ---- Panel B: content pipeline ---- */}
      <rect x={596} y={52} width={367} height={100} fill="#FFFFFF" stroke="rgba(0,0,0,0.25)" strokeWidth={1} />
      <text x={612} y={72} fontSize={11} fontWeight={400} fill="#5E5757">
        {"CONTENT — DRAFTS PIPELINE"}
      </text>
      <rect x={612} y={84} width={120} height={24} rx={2} fill="#FFFFFF" stroke="rgba(0,0,0,0.375)" strokeWidth={1} />
      <text x={672} y={100} textAnchor="middle" fontSize={11} fontWeight={400} fill="#231A09">
        {"CONTENT WRITER"}
      </text>
      <rect x={744} y={84} width={130} height={24} rx={2} fill="#FFFFFF" stroke="rgba(0,0,0,0.375)" strokeWidth={1} />
      <text x={809} y={100} textAnchor="middle" fontSize={11} fontWeight={400} fill="#231A09">
        {"CONTENT CRITIQUE"}
      </text>
      <rect x={612} y={116} width={130} height={24} rx={2} fill="#FFFFFF" stroke="rgba(0,0,0,0.375)" strokeWidth={1} />
      <text x={677} y={132} textAnchor="middle" fontSize={11} fontWeight={400} fill="#231A09">
        {"CHANNEL ADAPTER"}
      </text>
      <rect x={754} y={116} width={140} height={24} rx={2} fill="#FFFFFF" stroke="rgba(0,0,0,0.375)" strokeWidth={1} />
      <text x={824} y={132} textAnchor="middle" fontSize={11} fontWeight={400} fill="#231A09">
        {"MULTI-CRITIQUE ×4"}
      </text>

      {/* ---- Panel C: librarian ---- */}
      <rect x={16} y={168} width={560} height={72} fill="#FFFFFF" stroke="rgba(0,0,0,0.25)" strokeWidth={1} />
      <text x={32} y={188} fontSize={11} fontWeight={400} fill="#5E5757">
        {"LIBRARIAN"}
      </text>
      <rect x={32} y={200} width={240} height={24} rx={2} fill="#FFFFFF" stroke="rgba(0,0,0,0.375)" strokeWidth={1} />
      <text x={152} y={216} textAnchor="middle" fontSize={11} fontWeight={400} fill="#231A09">
        {"RESEARCH — EXA · THE ONE WEB PATH"}
      </text>
      <rect x={288} y={200} width={220} height={24} rx={2} fill="#FFFFFF" stroke="rgba(0,0,0,0.375)" strokeWidth={1} />
      <text x={398} y={216} textAnchor="middle" fontSize={11} fontWeight={400} fill="#231A09">
        {"READING QUEUE — NO MODEL CALL"}
      </text>

      {/* ---- Panel D: ops ---- */}
      <rect x={596} y={168} width={367} height={72} fill="#FFFFFF" stroke="rgba(0,0,0,0.25)" strokeWidth={1} />
      <text x={612} y={188} fontSize={11} fontWeight={400} fill="#5E5757">
        {"OPS"}
      </text>
      <rect x={612} y={200} width={160} height={24} rx={2} fill="#FFFFFF" stroke="rgba(0,0,0,0.375)" strokeWidth={1} />
      <text x={692} y={216} textAnchor="middle" fontSize={11} fontWeight={400} fill="#231A09">
        {"TASK AGENT — HAIKU"}
      </text>

      {/* ---- THE accent: the cost arc ---- */}
      <text x={16} y={288} fontSize={13} fontWeight={500} fill="#A43B0D">
        {"SPRING: WEEKLY CRONS + FIRE-ON-EVERY-SAVE — ~$8/WK"}
      </text>
      <line x1={424} y1={284} x2={498} y2={284} stroke="#EC4E09" strokeWidth={1.5} markerEnd="url(#kosfleet-arrow-orange)" />
      <defs>
        <marker
          id="kosfleet-arrow-orange"
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
      <text x={510} y={288} fontSize={13} fontWeight={500} fill="#A43B0D">
        {"NOW: ALL TWELVE ON DEMAND"}
      </text>
      <text x={510} y={306} fontSize={11} fontWeight={400} fill="#5E5757">
        {"THE ONLY CRON LEFT IS A $0.10/WK DIGEST"}
      </text>

      {/* Footnote */}
      <text x={16} y={340} fontSize={11} fontWeight={400} fill="#A43B0D">
        {"// ROSTER + TRIGGERS VERIFIED — AGENTS.TS, MIGRATIONS 062/067"}
      </text>
    </svg>
  );
}
