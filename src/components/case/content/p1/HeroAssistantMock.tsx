export default function HeroAssistantMock() {
  return (
    <svg
      viewBox="0 0 720 500"
      role="img"
      aria-label="Wireframe browser window with the Platform One assistant widget open over the page, answering a supply-chain security question with a cited source chip and two follow-up options."
      style={{ width: "100%", height: "auto", display: "block", fontFamily: "var(--font-geist-mono), ui-monospace, monospace" }}
    >
      <title>The assistant in situ</title>

      {/* Figure header */}
      <text x={16} y={28} fontSize={13} fontWeight={300} fill="#5E5757">
        {"// THE ASSISTANT, IN SITU"}
      </text>

      {/* Browser window frame */}
      <rect x={16} y={40} width={688} height={424} fill="#FFFFFF" stroke="#000000" strokeWidth={1} />

      {/* Browser chrome strip: three dots + abstract address bar */}
      <circle cx={34} cy={55} r={2.5} fill="#D9D9D9" />
      <circle cx={47} cy={55} r={2.5} fill="#D9D9D9" />
      <circle cx={60} cy={55} r={2.5} fill="#D9D9D9" />
      <rect x={72} y={48} width={380} height={14} rx={2} fill="#EDEDED" />
      <line x1={16} y1={70} x2={704} y2={70} stroke="rgba(0,0,0,0.375)" strokeWidth={1} />

      {/* Wireframe page — abstract grays at reduced presence */}
      <g fillOpacity={0.55}>
        {/* Page header bar: logo block + nav text-bars */}
        <rect x={36} y={80} width={648} height={30} fill="#EDEDED" />
        <rect x={44} y={88} width={64} height={14} fill="#D9D9D9" />
        <rect x={496} y={91} width={36} height={8} fill="#D9D9D9" />
        <rect x={544} y={91} width={36} height={8} fill="#D9D9D9" />
        <rect x={592} y={91} width={36} height={8} fill="#D9D9D9" />
        <rect x={640} y={91} width={36} height={8} fill="#D9D9D9" />

        {/* Hero block */}
        <rect x={36} y={128} width={648} height={110} fill="#EDEDED" />
        <rect x={56} y={150} width={300} height={14} fill="#D9D9D9" />
        <rect x={56} y={174} width={240} height={8} fill="#D9D9D9" />
        <rect x={56} y={190} width={200} height={8} fill="#D9D9D9" />
        <rect x={56} y={206} width={96} height={20} fill="#D9D9D9" />

        {/* Card row (3 cards) */}
        <rect x={36} y={254} width={205} height={150} fill="#EDEDED" />
        <rect x={48} y={266} width={181} height={64} fill="#D9D9D9" />
        <rect x={48} y={344} width={140} height={8} fill="#D9D9D9" />
        <rect x={48} y={360} width={110} height={8} fill="#D9D9D9" />

        <rect x={257} y={254} width={205} height={150} fill="#EDEDED" />
        <rect x={269} y={266} width={181} height={64} fill="#D9D9D9" />
        <rect x={269} y={344} width={140} height={8} fill="#D9D9D9" />
        <rect x={269} y={360} width={110} height={8} fill="#D9D9D9" />

        <rect x={478} y={254} width={205} height={150} fill="#EDEDED" />
        <rect x={490} y={266} width={181} height={64} fill="#D9D9D9" />
        <rect x={490} y={344} width={140} height={8} fill="#D9D9D9" />
        <rect x={490} y={360} width={110} height={8} fill="#D9D9D9" />
      </g>

      {/* Assistant widget panel — full contrast, over the page */}
      <rect x={356} y={142} width={332} height={308} fill="#FFFFFF" stroke="#000000" strokeWidth={1} />

      {/* Widget header bar */}
      <line x1={356} y1={174} x2={688} y2={174} stroke="#000000" strokeWidth={1} />
      <text x={370} y={163} fontSize={12} fontWeight={400} fill="#000000">
        ASK PLATFORM ONE
      </text>
      <line x1={665} y1={153} x2={675} y2={163} stroke="#000000" strokeWidth={1.2} />
      <line x1={665} y1={163} x2={675} y2={153} stroke="#000000" strokeWidth={1.2} />

      {/* User bubble — right-aligned */}
      <rect x={450} y={196} width={224} height={52} rx={2} fill="#EDEDED" />
      <text x={460} y={217} fontSize={13} fontWeight={400} fill="#231A09" style={{ fontFamily: "var(--font-geist), sans-serif" }}>
        How does the platform defend
      </text>
      <text x={460} y={237} fontSize={13} fontWeight={400} fill="#231A09" style={{ fontFamily: "var(--font-geist), sans-serif" }}>
        against supply-chain attacks?
      </text>

      {/* Assistant answer — citation marker is the one orange element */}
      <text x={370} y={280} fontSize={13} fontWeight={400} fill="#231A09" style={{ fontFamily: "var(--font-geist), sans-serif" }}>
        Every container is hardened and
      </text>
      <text x={370} y={300} fontSize={13} fontWeight={400} fill="#231A09" style={{ fontFamily: "var(--font-geist), sans-serif" }}>
        continuously scanned before it
      </text>
      <text x={370} y={320} fontSize={13} fontWeight={400} fill="#231A09" style={{ fontFamily: "var(--font-geist), sans-serif" }}>
        reaches the platform.
        <tspan fill="#EC4E09" fontWeight={500}>
          {" [1]"}
        </tspan>
      </text>

      {/* Source chip */}
      <rect x={370} y={340} width={230} height={24} rx={2} fill="#FFFFFF" stroke="#A43B0D" strokeWidth={1} />
      <text x={380} y={356} fontSize={11} fontWeight={400} fill="#A43B0D">
        [1] DOCS - CONTINUOUS HARDENING
      </text>

      {/* Follow-up chips */}
      <rect x={370} y={388} width={120} height={24} rx={2} fill="#FFFFFF" stroke="#5E5757" strokeWidth={1} />
      <text x={379} y={404} fontSize={11} fontWeight={400} fill="#5E5757">
        WHAT SCANS RUN?
      </text>
      <rect x={502} y={388} width={120} height={24} rx={2} fill="#FFFFFF" stroke="#5E5757" strokeWidth={1} />
      <text x={511} y={404} fontSize={11} fontWeight={400} fill="#5E5757">
        TALK TO A HUMAN
      </text>

      {/* Footnote */}
      <text x={16} y={481} fontSize={11} fontWeight={300} fill="#A43B0D">
        {"// REPRESENTATIVE MOCK — SWAP FOR PRODUCTION SHOT"}
      </text>
    </svg>
  );
}
