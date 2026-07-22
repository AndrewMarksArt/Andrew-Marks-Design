/* Diagram grammar: unboxed 15px text = user intent; white 1px-ink-stroke box =
   page; solid accent arrow = traced click (CTA label rides the edge); hatched
   box = auth wall (terminus); arrowless sage dash = public answer off the
   traced path — BROKEN tether = no link exists, CONTINUOUS tether = link
   exists but mislabeled. Every string traces to .claude/P1-SITE-FLOW-MAP.md;
   the six-CTAs-one-form count is URL-verified (the 7th, IB Onboarding, is a
   second form on the same platform). */
export default function IaPathDiagram() {
  return (
    <svg
      viewBox="0 0 960 600"
      role="img"
      aria-label="Two questions traced on the live site. Getting on Party Bus: the page claims it cuts costs by up to 80 percent yet shows no pricing numbers, leaving Request a Quote. Iron Bank security: the repository link hits a login wall, leaving Talk to an Expert. Both paths end at the same intake form — six differently labeled links site-wide, one destination. The public answers, a Party Bus onboarding guide never linked from its product page and an Iron Bank overview that itself says publicly accessible, sit just off-path."
      style={{
        width: "100%",
        height: "auto",
        display: "block",
        fontFamily: "var(--font-geist-mono), ui-monospace, monospace",
      }}
    >
      <title>
        Two questions, traced on the live site — both end at the same intake
        form
      </title>

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
        <pattern
          id="iapath-hatch"
          patternUnits="userSpaceOnUse"
          width={6}
          height={6}
          patternTransform="rotate(45)"
        >
          <rect width={6} height={6} fill="#FFFFFF" />
          <line x1={0} y1={0} x2={0} y2={6} stroke="#A43B0D" strokeWidth={1} />
        </pattern>
      </defs>

      {/* header + provenance */}
      <text x={20} y={30} fontSize={17.5} fontWeight={400} fill="#5E5757">
        {"// TWO QUESTIONS, TRACED ON THE LIVE SITE"}
      </text>
      <text
        x={940}
        y={30}
        fontSize={17.5}
        fontWeight={400}
        fill="#5E5757"
        textAnchor="end"
      >
        {"// traced 2026-07 - live-site journey audit"}
      </text>

      {/* ---- lane 1: Party Bus ---- */}
      <g fill="#231A09" fontSize={20} fontWeight={500} textAnchor="end">
        <text x={170} y={98}>
          HOW DO WE GET
        </text>
        <text x={170} y={116}>
          ON PARTY BUS?
        </text>
      </g>

      <rect
        x={195}
        y={86}
        width={100}
        height={36}
        fill="#FFFFFF"
        stroke="#231A09"
        strokeWidth={1}
      />
      <text
        x={245}
        y={108}
        fontSize={17.5}
        fill="#231A09"
        textAnchor="middle"
      >
        /PARTY-BUS
      </text>

      {/* on-page claim, verbatim, then audit verdict */}
      <text x={315} y={92} fontSize={17.5} fill="#231A09">
        {'"CUTS COSTS BY UP TO 80%"'}
      </text>
      <text x={315} y={109} fontSize={17.5} fill="#A43B0D">
        ZERO PRICING NUMBERS ON THE SITE
      </text>
      <g stroke="#A43B0D" strokeWidth={2} strokeLinecap="round">
        <line x1={658} y1={100} x2={668} y2={110} />
        <line x1={658} y1={110} x2={668} y2={100} />
      </g>

      {/* traced click: Request a Quote -> the form */}
      <polyline
        points="270,122 540,142 760,228"
        fill="none"
        stroke="#EC4E09"
        strokeWidth={2}
        markerEnd="url(#iapath-ah-accent)"
      />
      <text
        x={640}
        y={140}
        fontSize={17.5}
        fill="#231A09"
        textAnchor="middle"
      >
        REQUEST A QUOTE
      </text>

      {/* ghost 1: the public answer with NO link from the product page —
          tether broken mid-span because the path does not exist */}
      <g stroke="#728370" strokeWidth={1.5} strokeDasharray="6 5">
        <line x1={245} y1={122} x2={245} y2={147} />
        <line x1={245} y1={157} x2={245} y2={182} />
      </g>
      <g stroke="#728370" strokeWidth={1.5} strokeLinecap="round">
        <line x1={241} y1={148} x2={249} y2={156} />
        <line x1={241} y1={156} x2={249} y2={148} />
      </g>
      <rect
        x={195}
        y={182}
        width={250}
        height={44}
        fill="#FFFFFF"
        stroke="#728370"
        strokeWidth={1.5}
        strokeDasharray="6 5"
      />
      <g fill="#52704B" fontSize={17.5} fontWeight={500} textAnchor="middle">
        <text x={320} y={200}>
          PREREQUISITES:
        </text>
        <text x={320} y={217}>
          HOW TO JOIN PARTY BUS
        </text>
      </g>
      <text x={195} y={246} fontSize={17.5} fill="#52704B">
        P1DOCS.DSO.MIL - NEVER LINKED FROM /PARTY-BUS
      </text>

      {/* ---- lane 2: Iron Bank ---- */}
      <g fill="#231A09" fontSize={20} fontWeight={500} textAnchor="end">
        <text x={170} y={316}>
          HOW IS IRON
        </text>
        <text x={170} y={334}>
          BANK SECURED?
        </text>
      </g>

      <rect
        x={195}
        y={304}
        width={100}
        height={36}
        fill="#FFFFFF"
        stroke="#231A09"
        strokeWidth={1}
      />
      <text
        x={245}
        y={326}
        fontSize={17.5}
        fill="#231A09"
        textAnchor="middle"
      >
        /IRON-BANK
      </text>

      {/* traced click: the page's primary CTA, straight into the wall */}
      <g fill="#231A09" fontSize={17.5} textAnchor="middle">
        <text x={427} y={290}>
          ACCESS THE IRON BANK REPOSITORY
        </text>
        <text x={427} y={307}>
          302 REDIRECT
        </text>
      </g>
      <line
        x1={295}
        y1={322}
        x2={560}
        y2={322}
        stroke="#EC4E09"
        strokeWidth={2}
        markerEnd="url(#iapath-ah-accent)"
      />

      {/* the wall — a terminus, nothing leaves it */}
      <rect
        x={560}
        y={300}
        width={140}
        height={44}
        fill="url(#iapath-hatch)"
        stroke="#A43B0D"
        strokeWidth={1.5}
      />
      <rect x={577} y={305} width={106} height={35} fill="#FFFFFF" />
      <g fill="#231A09" fontSize={17.5} textAnchor="middle">
        <text x={630} y={318}>
          LOGIN.DSO.MIL
        </text>
        <text x={630} y={335}>
          {"T&C WALL"}
        </text>
      </g>
      <g fill="#A43B0D" fontSize={17.5}>
        <text x={560} y={366}>
          WALLED BEFORE ONE
        </text>
        <text x={560} y={382}>
          CONTAINER IS SEEN
        </text>
      </g>

      {/* traced click: the fallback CTA on /iron-bank -> the same form */}
      <polyline
        points="270,340 350,398 700,398 760,248"
        fill="none"
        stroke="#EC4E09"
        strokeWidth={2}
        markerEnd="url(#iapath-ah-accent)"
      />
      <text
        x={470}
        y={383}
        fontSize={17.5}
        fill="#231A09"
        textAnchor="middle"
      >
        TALK TO AN EXPERT
      </text>

      {/* ghost 2: the public answer behind a dev-scented label — tether
          continuous because the link exists, mis-scented */}
      <line
        x1={245}
        y1={340}
        x2={245}
        y2={438}
        stroke="#728370"
        strokeWidth={1.5}
        strokeDasharray="6 5"
      />
      <rect
        x={195}
        y={438}
        width={260}
        height={44}
        fill="#FFFFFF"
        stroke="#728370"
        strokeWidth={1.5}
        strokeDasharray="6 5"
      />
      <text
        x={325}
        y={464}
        fontSize={17.5}
        fontWeight={500}
        fill="#52704B"
        textAnchor="middle"
      >
        DOCS-IRONBANK.DSO.MIL/OVERVIEW
      </text>
      <text x={195} y={502} fontSize={17.5} fill="#52704B">
        {'LINKED - BUT AS "TECHNICAL DOCS"'}
      </text>
      <text x={195} y={519} fontSize={17.5} fill="#52704B">
        {'SAYS: "PUBLICLY ACCESSIBLE"'}
      </text>

      {/* ---- convergence ---- */}
      <rect
        x={760}
        y={213}
        width={180}
        height={54}
        fill="#FFFFFF"
        stroke="#EC4E09"
        strokeWidth={3}
      />
      <text
        x={850}
        y={234}
        fontSize={17.5}
        fontWeight={500}
        fill="#231A09"
        textAnchor="middle"
      >
        THE SAME INTAKE FORM
      </text>
      <text
        x={850}
        y={253}
        fontSize={17.5}
        fill="#5E5757"
        textAnchor="middle"
      >
        forms.osi.apps.mil
      </text>
      <g fill="#231A09" fontSize={17.5} fontWeight={500} textAnchor="end">
        <text x={940} y={289}>
          6 CTA LABELS SITE-WIDE
        </text>
        <text x={940} y={305}>
          ONE DESTINATION
        </text>
      </g>

      {/* legend */}
      <line
        x1={24}
        y1={536}
        x2={52}
        y2={536}
        stroke="#EC4E09"
        strokeWidth={2}
      />
      <text x={62} y={540} fontSize={17.5} fontWeight={300} fill="#5E5757">
        ACTUAL USER PATH
      </text>
      <line
        x1={24}
        y1={558}
        x2={52}
        y2={558}
        stroke="#728370"
        strokeWidth={1.5}
        strokeDasharray="6 5"
      />
      <text x={62} y={562} fontSize={17.5} fontWeight={300} fill="#5E5757">
        PUBLIC ANSWER - OFF EVERY TRACED PATH
      </text>
    </svg>
  );
}
