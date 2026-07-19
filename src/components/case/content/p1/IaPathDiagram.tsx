export default function IaPathDiagram() {
  return (
    <svg
      viewBox="0 0 960 600"
      role="img"
      aria-label="Click-depth map of the post-rebrand site: the contact page sat four clicks deep, and the traced user path took five clicks through two dead ends to reach it, while a direct one-click path should have existed."
      style={{
        width: "100%",
        height: "auto",
        display: "block",
        fontFamily: "var(--font-geist-mono), ui-monospace, monospace",
      }}
    >
      <title>Finding support, post-rebrand: click-depth node map</title>

      <defs>
        <marker
          id="iapath-ah-accent"
          viewBox="0 0 8 8"
          refX={7}
          refY={4}
          markerWidth={8}
          markerHeight={8}
          markerUnits="userSpaceOnUse"
          orient="auto"
        >
          <path d="M0 0 L8 4 L0 8 Z" fill="#EC4E09" />
        </marker>
        <marker
          id="iapath-ah-gray"
          viewBox="0 0 8 8"
          refX={7}
          refY={4}
          markerWidth={8}
          markerHeight={8}
          markerUnits="userSpaceOnUse"
          orient="auto"
        >
          <path d="M0 0 L8 4 L0 8 Z" fill="#5E5757" />
        </marker>
      </defs>

      {/* figure header */}
      <text x={20} y={30} fontSize={13} fontWeight={400} fill="#5E5757">
        {"// FINDING SUPPORT, POST-REBRAND"}
      </text>

      {/* click-depth column labels */}
      <text x={90} y={88} fontSize={13} fontWeight={300} fill="#5E5757" textAnchor="middle">
        DEPTH 0
      </text>
      <text x={280} y={88} fontSize={13} fontWeight={300} fill="#5E5757" textAnchor="middle">
        DEPTH 1
      </text>
      <text x={495} y={88} fontSize={13} fontWeight={300} fill="#5E5757" textAnchor="middle">
        DEPTH 2
      </text>
      <text x={705} y={88} fontSize={13} fontWeight={300} fill="#5E5757" textAnchor="middle">
        DEPTH 3
      </text>
      <text x={870} y={88} fontSize={13} fontWeight={300} fill="#5E5757" textAnchor="middle">
        DEPTH 4
      </text>

      {/* structural edges (site links, gray hairlines) */}
      <g stroke="rgba(0,0,0,0.375)" strokeWidth={1}>
        <line x1={132} y1={372} x2={230} y2={120} />
        <line x1={132} y1={377} x2={230} y2={185} />
        <line x1={132} y1={383} x2={230} y2={250} />
        <line x1={132} y1={388} x2={230} y2={315} />
        <line x1={330} y1={120} x2={420} y2={134} />
        <line x1={330} y1={126} x2={420} y2={224} />
        <line x1={330} y1={185} x2={420} y2={146} />
        <line x1={330} y1={315} x2={420} y2={320} />
        <line x1={570} y1={140} x2={625} y2={148} />
        <line x1={570} y1={230} x2={625} y2={258} />
        <line x1={570} y1={320} x2={625} y2={368} />
        <line x1={785} y1={372} x2={836} y2={490} />
      </g>

      {/* the path users needed: dashed straight arrow, HOME direct to CONTACT US */}
      <line
        x1={132}
        y1={392}
        x2={816}
        y2={504}
        stroke="#5E5757"
        strokeWidth={1.5}
        strokeDasharray="6 5"
        markerEnd="url(#iapath-ah-gray)"
      />
      <text
        x={474}
        y={438}
        fontSize={13}
        fontWeight={400}
        fill="#5E5757"
        textAnchor="middle"
        transform="rotate(9.3 474 438)"
      >
        THE PATH USERS NEEDED
      </text>

      {/* nodes */}
      <g fill="#FFFFFF" stroke="#000000" strokeWidth={1}>
        <rect x={48} y={362} width={84} height={36} />
        <rect x={230} y={102} width={100} height={36} />
        <rect x={230} y={167} width={100} height={36} />
        <rect x={230} y={232} width={100} height={36} />
        <rect x={230} y={297} width={100} height={36} />
        <rect x={420} y={122} width={150} height={36} />
        <rect x={420} y={212} width={150} height={36} />
        <rect x={420} y={302} width={150} height={36} />
        <rect x={625} y={132} width={160} height={36} />
        <rect x={625} y={242} width={160} height={36} />
        <rect x={625} y={352} width={160} height={36} />
        <rect x={820} y={490} width={100} height={30} />
      </g>

      {/* node labels */}
      <g fill="#231A09" fontSize={14} fontWeight={400} textAnchor="middle">
        <text x={90} y={385}>
          HOME
        </text>
        <text x={280} y={125}>
          PRODUCTS
        </text>
        <text x={280} y={190}>
          SERVICES
        </text>
        <text x={280} y={255}>
          NEWS
        </text>
        <text x={280} y={320}>
          ABOUT
        </text>
        <text x={495} y={145}>
          DOCS PORTAL
        </text>
        <text x={495} y={235}>
          GETTING STARTED
        </text>
        <text x={495} y={325}>
          TEAM PAGES
        </text>
        <text x={695} y={155}>
          LEGACY LANDING
        </text>
        <text x={695} y={265}>
          RENAMED FAQ
        </text>
        <text x={705} y={375}>
          COMPANY INFO
        </text>
        <text x={870} y={510} fontSize={13}>
          CONTACT US
        </text>
      </g>

      {/* actual user path (solid accent, 5 clicks) */}
      <g stroke="#EC4E09" strokeWidth={2}>
        <line x1={132} y1={372} x2={228} y2={124} markerEnd="url(#iapath-ah-accent)" />
        <line x1={330} y1={120} x2={416} y2={133} markerEnd="url(#iapath-ah-accent)" />
        <line x1={570} y1={140} x2={621} y2={147} markerEnd="url(#iapath-ah-accent)" />
        <line x1={655} y1={168} x2={655} y2={239} markerEnd="url(#iapath-ah-accent)" />
        <line x1={770} y1={278} x2={855} y2={487} markerEnd="url(#iapath-ah-accent)" />
      </g>

      {/* back-track hooks at each dead end (dashed accent) */}
      <g fill="none" stroke="#EC4E09" strokeWidth={1.5} strokeDasharray="4 4">
        <path d="M 768 130 C 768 108, 732 104, 697 114" markerEnd="url(#iapath-ah-accent)" />
        <path d="M 768 241 C 768 220, 734 216, 700 226" markerEnd="url(#iapath-ah-accent)" />
      </g>

      {/* dead-end x glyphs */}
      <g stroke="#A43B0D" strokeWidth={2} strokeLinecap="round">
        <line x1={764} y1={144} x2={776} y2={156} />
        <line x1={764} y1={156} x2={776} y2={144} />
        <line x1={764} y1={254} x2={776} y2={266} />
        <line x1={764} y1={266} x2={776} y2={254} />
      </g>

      {/* numbered click badges */}
      <g>
        <circle cx={188} cy={227} r={9} fill="#EC4E09" />
        <circle cx={373} cy={127} r={9} fill="#EC4E09" />
        <circle cx={596} cy={144} r={9} fill="#EC4E09" />
        <circle cx={655} cy={203} r={9} fill="#EC4E09" />
        <circle cx={812} cy={382} r={9} fill="#EC4E09" />
      </g>
      <g fill="#FFFFFF" fontSize={11} fontWeight={500} textAnchor="middle">
        <text x={188} y={231}>
          1
        </text>
        <text x={373} y={131}>
          2
        </text>
        <text x={596} y={148}>
          3
        </text>
        <text x={655} y={207}>
          4
        </text>
        <text x={812} y={386}>
          5
        </text>
      </g>

      {/* annotation near path end */}
      <text x={918} y={548} fontSize={13} fontWeight={500} fill="#000000" textAnchor="end">
        5 CLICKS - 2 DEAD ENDS
      </text>

      {/* legend */}
      <line x1={24} y1={532} x2={52} y2={532} stroke="#EC4E09" strokeWidth={2} />
      <text x={62} y={536} fontSize={13} fontWeight={300} fill="#5E5757">
        ACTUAL USER PATH
      </text>
      <g stroke="#A43B0D" strokeWidth={2} strokeLinecap="round">
        <line x1={32} y1={548} x2={44} y2={560} />
        <line x1={32} y1={560} x2={44} y2={548} />
      </g>
      <text x={62} y={558} fontSize={13} fontWeight={300} fill="#5E5757">
        DEAD END
      </text>
      <line
        x1={24}
        y1={576}
        x2={52}
        y2={576}
        stroke="#5E5757"
        strokeWidth={1.5}
        strokeDasharray="6 5"
      />
      <text x={62} y={580} fontSize={13} fontWeight={300} fill="#5E5757">
        DIRECT PATH THAT SHOULD EXIST
      </text>
    </svg>
  );
}
