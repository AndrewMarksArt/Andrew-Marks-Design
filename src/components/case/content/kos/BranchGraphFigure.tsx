export default function BranchGraphFigure() {
  return (
    <svg
      viewBox="0 0 979 360"
      role="img"
      aria-label="A chat thread drawn as a graph: five alternating user and assistant messages hang off a vertical spine of node dots; one assistant message carries a version pager reading 2 of 3, and from its join an orange fork diverges to a faded sibling version beside the main thread, while an outline rail on the right lists the conversation's topics."
      style={{
        width: "100%",
        height: "auto",
        display: "block",
        fontFamily: "var(--font-geist-mono), ui-monospace, monospace",
      }}
    >
      <title>A conversation, branched — chat as a graph</title>

      {/* Figure header */}
      <text x={16} y={30} fontSize={13} fontWeight={400} fill="#5E5757">
        {"// A CONVERSATION, BRANCHED"}
      </text>

      {/* ---- Tree overlay: spine + leaders (under everything) ---- */}
      {/* Spine, black 1.5px — above and below the fork span */}
      <line x1={56} y1={75} x2={56} y2={104} stroke="#000000" strokeWidth={1.5} />
      <line x1={56} y1={144} x2={56} y2={305} stroke="#000000" strokeWidth={1.5} />

      {/* Hairline leaders from each join to its message edge */}
      <line x1={56} y1={75} x2={380} y2={75} stroke="rgba(0,0,0,0.375)" strokeWidth={1} />
      <line x1={56} y1={144} x2={78} y2={144} stroke="rgba(0,0,0,0.375)" strokeWidth={1} />
      <line x1={56} y1={202} x2={384} y2={202} stroke="rgba(0,0,0,0.375)" strokeWidth={1} />
      <line x1={56} y1={256} x2={78} y2={256} stroke="rgba(0,0,0,0.375)" strokeWidth={1} />
      <line x1={56} y1={305} x2={428} y2={305} stroke="rgba(0,0,0,0.375)" strokeWidth={1} />

      {/* THE accent: fork point + its two diverging segments (only orange in figure) */}
      <line x1={56} y1={104} x2={56} y2={144} stroke="#EC4E09" strokeWidth={1.5} />
      <line x1={56} y1={104} x2={394} y2={109} stroke="#EC4E09" strokeWidth={1.5} />

      {/* ---- Chat column (~60%): 5 rows, user right / assistant left ---- */}

      {/* Row 1 — user bubble */}
      <rect x={380} y={58} width={204} height={34} rx={2} fill="#EDEDED" />
      <rect x={392} y={66} width={180} height={7} fill="#D9D9D9" />
      <rect x={392} y={78} width={116} height={7} fill="#D9D9D9" />

      {/* Row 2 — assistant, the versioned message (showing 2 of 3) */}
      <rect
        x={78}
        y={116}
        width={126}
        height={56}
        fill="#FFFFFF"
        stroke="#000000"
        strokeWidth={1}
      />
      <rect x={90} y={126} width={102} height={7} fill="#D9D9D9" />
      <rect x={90} y={139} width={78} height={7} fill="#D9D9D9" />
      <text x={90} y={162} fontSize={11} fontWeight={400} fill="#231A09">
        {"◀ 2 / 3 ▶"}
      </text>

      {/* Ghost sibling — the alternative version, kept in the graph */}
      <g opacity={0.45}>
        <rect
          x={382}
          y={109}
          width={152}
          height={44}
          fill="#FFFFFF"
          stroke="#000000"
          strokeWidth={1}
        />
        <rect x={394} y={120} width={128} height={7} fill="#D9D9D9" />
        <rect x={394} y={133} width={94} height={7} fill="#D9D9D9" />
      </g>

      {/* Row 3 — user bubble */}
      <rect x={384} y={184} width={200} height={36} rx={2} fill="#EDEDED" />
      <rect x={396} y={192} width={176} height={7} fill="#D9D9D9" />
      <rect x={396} y={205} width={104} height={7} fill="#D9D9D9" />

      {/* Row 4 — assistant */}
      <rect
        x={78}
        y={232}
        width={252}
        height={48}
        fill="#FFFFFF"
        stroke="#000000"
        strokeWidth={1}
      />
      <rect x={90} y={241} width={228} height={7} fill="#D9D9D9" />
      <rect x={90} y={254} width={210} height={7} fill="#D9D9D9" />
      <rect x={90} y={267} width={180} height={7} fill="#D9D9D9" />

      {/* Row 5 — user bubble */}
      <rect x={428} y={292} width={156} height={26} rx={2} fill="#EDEDED" />
      <rect x={440} y={302} width={132} height={7} fill="#D9D9D9" />

      {/* ---- Node dots at each message join (over the lines) ---- */}
      <circle cx={56} cy={75} r={3} fill="#000000" />
      <circle cx={56} cy={144} r={3} fill="#000000" />
      <circle cx={56} cy={202} r={3} fill="#000000" />
      <circle cx={56} cy={256} r={3} fill="#000000" />
      <circle cx={56} cy={305} r={3} fill="#000000" />
      <circle cx={394} cy={109} r={3} fill="#000000" />
      {/* Fork point dot — accent */}
      <circle cx={56} cy={104} r={4} fill="#EC4E09" />

      {/* ---- Outline rail (~25%): the librarian's index of the thread ---- */}
      <rect
        x={718}
        y={60}
        width={245}
        height={258}
        fill="#FFFFFF"
        stroke="rgba(0,0,0,0.25)"
        strokeWidth={1}
      />
      <text x={734} y={82} fontSize={11} fontWeight={400} fill="#5E5757">
        OUTLINE
      </text>
      <line x1={734} y1={94} x2={947} y2={94} stroke="rgba(0,0,0,0.25)" strokeWidth={1} />

      {/* Topic ticks — abstract text-bars */}
      <rect x={734} y={108.5} width={6} height={2} fill="#5E5757" />
      <rect x={748} y={106} width={150} height={7} fill="#D9D9D9" />
      <rect x={734} y={146.5} width={6} height={2} fill="#5E5757" />
      <rect x={748} y={144} width={118} height={7} fill="#D9D9D9" />
      <rect x={734} y={184.5} width={6} height={2} fill="#5E5757" />
      <rect x={748} y={182} width={168} height={7} fill="#D9D9D9" />
      <rect x={734} y={222.5} width={6} height={2} fill="#5E5757" />
      <rect x={748} y={220} width={96} height={7} fill="#D9D9D9" />
      <rect x={734} y={260.5} width={6} height={2} fill="#5E5757" />
      <rect x={748} y={258} width={140} height={7} fill="#D9D9D9" />
      <rect x={734} y={298.5} width={6} height={2} fill="#5E5757" />
      <rect x={748} y={296} width={124} height={7} fill="#D9D9D9" />

      {/* Footnote */}
      <text x={16} y={341} fontSize={11} fontWeight={400} fill="#A43B0D">
        {"// REPRESENTATIVE THREAD — REAL BRANCHING UI SHIPS IN THE PRODUCT"}
      </text>
    </svg>
  );
}
