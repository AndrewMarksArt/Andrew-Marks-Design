export default function TechStackMap() {
  return (
    <svg
      viewBox="0 0 979 560"
      role="img"
      aria-label="The Knowledge OS tool stack in six layers — capture (Telegram bot, web app, Safe Browsing gate), a database-routed extraction registry (yt-dlp with Deno for YouTube, self-hosted cobalt on Fly for TikTok and X media, fxtwitter, Cosmos, LinkedIn OG, design portfolios, Supadata falling back to Deepgram, and Jina as the universal fallback every chain ends at), Claude Haiku for volume work and Sonnet for judgment, Voyage embeddings and reranking over pgvector, Supabase plus Railway and Fly for storage and shipping, and Exa, Obsidian, and Telegram at the edges. A dated column lists the swaps: public cobalt grew a Turnstile wall, YouTube's bot wall broke cobalt, two managed builders dropped system deps, and rerank was added when one number stopped scaling."
      style={{
        width: "100%",
        height: "auto",
        display: "block",
        fontFamily: "var(--font-geist-mono), ui-monospace, monospace",
      }}
    >
      <title>The stack — fourteen tools, built for swapping</title>

      {/* Figure header */}
      <text x={16} y={30} fontSize={13} fontWeight={400} fill="#5E5757">
        {"// THE STACK — A REGISTRY OF FOURTEEN TOOLS, BUILT FOR SWAPPING"}
      </text>

      {/* Divider between the stack and the swaps rail */}
      <line x1={668} y1={56} x2={668} y2={508} stroke="rgba(0,0,0,0.25)" strokeWidth={1} />

      {/* ---- L1 CAPTURE ---- */}
      <text x={16} y={62} fontSize={11} fontWeight={400} fill="#5E5757">
        {"CAPTURE"}
      </text>
      <rect x={16} y={70} width={124} height={24} rx={2} fill="#FFFFFF" stroke="rgba(0,0,0,0.375)" strokeWidth={1} />
      <text x={78} y={86} textAnchor="middle" fontSize={11} fontWeight={400} fill="#231A09">
        {"TELEGRAM BOT API"}
      </text>
      <rect x={152} y={70} width={116} height={24} rx={2} fill="#FFFFFF" stroke="rgba(0,0,0,0.375)" strokeWidth={1} />
      <text x={210} y={86} textAnchor="middle" fontSize={11} fontWeight={400} fill="#231A09">
        {"NEXT.JS WEB APP"}
      </text>
      <rect x={280} y={70} width={176} height={24} rx={2} fill="#FFFFFF" stroke="rgba(0,0,0,0.375)" strokeWidth={1} />
      <text x={368} y={86} textAnchor="middle" fontSize={11} fontWeight={400} fill="#231A09">
        {"SAFE BROWSING — URL GATE"}
      </text>

      {/* ---- L2 EXTRACT — the registry ---- */}
      <text x={16} y={120} fontSize={11} fontWeight={400} fill="#5E5757">
        {"EXTRACT — DB-ROUTED FALLBACK CHAINS"}
      </text>
      <rect x={16} y={130} width={170} height={24} rx={2} fill="#FFFFFF" stroke="rgba(0,0,0,0.375)" strokeWidth={1} />
      <text x={101} y={146} textAnchor="middle" fontSize={11} fontWeight={400} fill="#231A09">
        {"YT-DLP + DENO — YOUTUBE"}
      </text>
      <rect x={198} y={130} width={182} height={24} rx={2} fill="#FFFFFF" stroke="rgba(0,0,0,0.375)" strokeWidth={1} />
      <text x={289} y={146} textAnchor="middle" fontSize={11} fontWeight={400} fill="#231A09">
        {"COBALT @ FLY — TIKTOK · X"}
      </text>
      <rect x={392} y={130} width={102} height={24} rx={2} fill="#FFFFFF" stroke="rgba(0,0,0,0.375)" strokeWidth={1} />
      <text x={443} y={146} textAnchor="middle" fontSize={11} fontWeight={400} fill="#231A09">
        {"FXTWITTER — X"}
      </text>
      <rect x={16} y={162} width={58} height={24} rx={2} fill="#FFFFFF" stroke="rgba(0,0,0,0.375)" strokeWidth={1} />
      <text x={45} y={178} textAnchor="middle" fontSize={11} fontWeight={400} fill="#231A09">
        {"COSMOS"}
      </text>
      <rect x={86} y={162} width={90} height={24} rx={2} fill="#FFFFFF" stroke="rgba(0,0,0,0.375)" strokeWidth={1} />
      <text x={131} y={178} textAnchor="middle" fontSize={11} fontWeight={400} fill="#231A09">
        {"LINKEDIN OG"}
      </text>
      <rect x={188} y={162} width={130} height={24} rx={2} fill="#FFFFFF" stroke="rgba(0,0,0,0.375)" strokeWidth={1} />
      <text x={253} y={178} textAnchor="middle" fontSize={11} fontWeight={400} fill="#231A09">
        {"DESIGN PORTFOLIOS"}
      </text>
      <rect x={330} y={162} width={142} height={24} rx={2} fill="#FFFFFF" stroke="rgba(0,0,0,0.375)" strokeWidth={1} />
      <text x={401} y={178} textAnchor="middle" fontSize={11} fontWeight={400} fill="#231A09">
        {"SUPADATA → DEEPGRAM"}
      </text>
      {/* THE accent — the invariant that makes swapping safe */}
      <rect x={16} y={194} width={376} height={24} rx={2} fill="#EC4E09" fillOpacity={0.1} stroke="#EC4E09" strokeWidth={1.5} />
      <text x={204} y={210} textAnchor="middle" fontSize={11} fontWeight={500} fill="#A43B0D">
        {"JINA.AI — THE UNIVERSAL FALLBACK, EVERY CHAIN ENDS HERE"}
      </text>

      {/* ---- L3 UNDERSTAND ---- */}
      <text x={16} y={248} fontSize={11} fontWeight={400} fill="#5E5757">
        {"UNDERSTAND"}
      </text>
      <rect x={16} y={258} width={356} height={24} rx={2} fill="#FFFFFF" stroke="rgba(0,0,0,0.375)" strokeWidth={1} />
      <text x={194} y={274} textAnchor="middle" fontSize={11} fontWeight={400} fill="#231A09">
        {"CLAUDE HAIKU — VOLUME: SUMMARIZE · CLASSIFY · SCORE"}
      </text>
      <rect x={16} y={290} width={356} height={24} rx={2} fill="#FFFFFF" stroke="rgba(0,0,0,0.375)" strokeWidth={1} />
      <text x={194} y={306} textAnchor="middle" fontSize={11} fontWeight={400} fill="#231A09">
        {"CLAUDE SONNET — JUDGMENT: SYNTHESIS · AGENTS · CHAT"}
      </text>

      {/* ---- L4 EMBED + RETRIEVE ---- */}
      <text x={16} y={344} fontSize={11} fontWeight={400} fill="#5E5757">
        {"EMBED + RETRIEVE"}
      </text>
      <rect x={16} y={354} width={156} height={24} rx={2} fill="#FFFFFF" stroke="rgba(0,0,0,0.375)" strokeWidth={1} />
      <text x={94} y={370} textAnchor="middle" fontSize={11} fontWeight={400} fill="#231A09">
        {"VOYAGE-3 — EMBEDDINGS"}
      </text>
      <rect x={184} y={354} width={130} height={24} rx={2} fill="#FFFFFF" stroke="rgba(0,0,0,0.375)" strokeWidth={1} />
      <text x={249} y={370} textAnchor="middle" fontSize={11} fontWeight={400} fill="#231A09">
        {"VOYAGE RERANK-2.5"}
      </text>
      <rect x={326} y={354} width={130} height={24} rx={2} fill="#FFFFFF" stroke="rgba(0,0,0,0.375)" strokeWidth={1} />
      <text x={391} y={370} textAnchor="middle" fontSize={11} fontWeight={400} fill="#231A09">
        {"PGVECTOR — COSINE"}
      </text>

      {/* ---- L5 STORE + SHIP ---- */}
      <text x={16} y={408} fontSize={11} fontWeight={400} fill="#5E5757">
        {"STORE + SHIP"}
      </text>
      <rect x={16} y={418} width={256} height={24} rx={2} fill="#FFFFFF" stroke="rgba(0,0,0,0.375)" strokeWidth={1} />
      <text x={144} y={434} textAnchor="middle" fontSize={11} fontWeight={400} fill="#231A09">
        {"SUPABASE — POSTGRES · CRON · STORAGE"}
      </text>
      <rect x={284} y={418} width={176} height={24} rx={2} fill="#FFFFFF" stroke="rgba(0,0,0,0.375)" strokeWidth={1} />
      <text x={372} y={434} textAnchor="middle" fontSize={11} fontWeight={400} fill="#231A09">
        {"RAILWAY — RAW DOCKERFILE"}
      </text>
      <rect x={472} y={418} width={116} height={24} rx={2} fill="#FFFFFF" stroke="rgba(0,0,0,0.375)" strokeWidth={1} />
      <text x={530} y={434} textAnchor="middle" fontSize={11} fontWeight={400} fill="#231A09">
        {"FLY.IO — COBALT"}
      </text>

      {/* ---- L6 IN + OUT ---- */}
      <text x={16} y={472} fontSize={11} fontWeight={400} fill="#5E5757">
        {"IN + OUT"}
      </text>
      <rect x={16} y={482} width={182} height={24} rx={2} fill="#FFFFFF" stroke="rgba(0,0,0,0.375)" strokeWidth={1} />
      <text x={107} y={498} textAnchor="middle" fontSize={11} fontWeight={400} fill="#231A09">
        {"EXA — THE ONE SEARCH PATH"}
      </text>
      <rect x={210} y={482} width={142} height={24} rx={2} fill="#FFFFFF" stroke="rgba(0,0,0,0.375)" strokeWidth={1} />
      <text x={281} y={498} textAnchor="middle" fontSize={11} fontWeight={400} fill="#231A09">
        {"OBSIDIAN — SYNC OUT"}
      </text>
      <rect x={364} y={482} width={156} height={24} rx={2} fill="#FFFFFF" stroke="rgba(0,0,0,0.375)" strokeWidth={1} />
      <text x={442} y={498} textAnchor="middle" fontSize={11} fontWeight={400} fill="#231A09">
        {"TELEGRAM — DIGEST OUT"}
      </text>

      {/* ---- Right rail: the swaps, dated ---- */}
      <text x={680} y={62} fontSize={11} fontWeight={400} fill="#5E5757">
        {"THE SWAPS, DATED"}
      </text>
      <text x={680} y={134} fontSize={11}>
        <tspan fontWeight={500} fill="#A43B0D">{"APR 22 — "}</tspan>
        <tspan fontWeight={400} fill="#5E5757">{"PUBLIC COBALT GREW A"}</tspan>
      </text>
      <text x={680} y={148} fontSize={11} fontWeight={400} fill="#5E5757">
        {"TURNSTILE WALL → SELF-HOSTED ON FLY"}
      </text>
      <text x={680} y={176} fontSize={11}>
        <tspan fontWeight={500} fill="#A43B0D">{"APR 27 — "}</tspan>
        <tspan fontWeight={400} fill="#5E5757">{"YOUTUBE'S BOT WALL BROKE"}</tspan>
      </text>
      <text x={680} y={190} fontSize={11} fontWeight={400} fill="#5E5757">
        {"COBALT → YT-DLP + A DENO SOLVER"}
      </text>
      <text x={680} y={354} fontSize={11}>
        <tspan fontWeight={500} fill="#A43B0D">{"JUN 20 — "}</tspan>
        <tspan fontWeight={400} fill="#5E5757">{"RERANK-2.5 ADDED WHEN ONE"}</tspan>
      </text>
      <text x={680} y={368} fontSize={11} fontWeight={400} fill="#5E5757">
        {"NUMBER STOPPED DOING THREE JOBS"}
      </text>
      <text x={680} y={418} fontSize={11}>
        <tspan fontWeight={500} fill="#A43B0D">{"APR 27 — "}</tspan>
        <tspan fontWeight={400} fill="#5E5757">{"TWO BUILDERS DROPPED SYSTEM"}</tspan>
      </text>
      <text x={680} y={432} fontSize={11} fontWeight={400} fill="#5E5757">
        {"DEPS SILENTLY → RAW DOCKERFILE"}
      </text>

      {/* Footnote */}
      <text x={16} y={544} fontSize={11} fontWeight={400} fill="#A43B0D">
        {"// ROUTING LIVES IN A DATABASE TABLE — TOOLS SWAP BY ROW, HOT-RELOADED, NO REDEPLOY"}
      </text>
    </svg>
  );
}
