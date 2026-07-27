export default function TechStackMap() {
  return (
    <svg
      viewBox="0 0 979 490"
      role="img"
      aria-label="The stack, told as four dated swaps under one invariant. The invariant plate reads: a failed tool degrades a save — it never drops one; routing lives in a database table and every chain ends at Jina. Four swap rows show a struck-through old tool, a dated arrow, and its replacement: the public cobalt API grew a Turnstile wall so a self-hosted instance on Fly took over on April 22; YouTube's bot wall closed on cloud IPs so yt-dlp with a Deno solver replaced cobalt's YouTube path on April 27; managed builders silently dropped yt-dlp and ffmpeg so a raw Dockerfile replaced Nixpacks and Railpack on April 27; and plain cosine top-k gave way to Voyage rerank-2.5 on June 20 when one number was doing three jobs. A band beneath lists the rest of the registry."
      style={{
        width: "100%",
        height: "auto",
        display: "block",
        fontFamily: "var(--font-geist-mono), ui-monospace, monospace",
      }}
    >
      <title>The stack — four dated swaps, one invariant</title>

      <defs>
        <marker
          id="kosstack-arrow"
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
      </defs>

      {/* Figure header */}
      <text x={16} y={30} fontSize={13} fontWeight={400} fill="#5E5757">
        {"// THE STACK — BUILT FOR SWAPPING"}
      </text>

      {/* THE accent: the invariant plate */}
      <rect x={16} y={48} width={640} height={50} fill="#EC4E09" fillOpacity={0.1} stroke="#EC4E09" strokeWidth={1.5} />
      <text x={336} y={68} textAnchor="middle" fontSize={12} fontWeight={500} fill="#A43B0D">
        {"A FAILED TOOL DEGRADES A SAVE — IT NEVER DROPS ONE"}
      </text>
      <text x={336} y={86} textAnchor="middle" fontSize={11} fontWeight={400} fill="#A43B0D">
        {"ROUTING LIVES IN A DATABASE TABLE · EVERY CHAIN ENDS AT JINA.AI"}
      </text>

      {/* ---- Swap row 1: cobalt goes self-hosted ---- */}
      <rect x={16} y={140} width={180} height={26} rx={2} fill="#EDEDED" stroke="rgba(0,0,0,0.25)" strokeWidth={1} />
      <text x={106} y={157} textAnchor="middle" fontSize={11} fontWeight={400} fill="#5E5757">
        {"PUBLIC COBALT API"}
      </text>
      <line x1={16} y1={153} x2={196} y2={153} stroke="#EC4E09" strokeWidth={1.5} />
      <text x={252} y={145} textAnchor="middle" fontSize={11} fontWeight={500} fill="#A43B0D">
        {"APR 22"}
      </text>
      <line x1={204} y1={153} x2={300} y2={153} stroke="#000000" strokeWidth={1} markerEnd="url(#kosstack-arrow)" />
      <rect x={306} y={140} width={200} height={26} rx={2} fill="#FFFFFF" stroke="#000000" strokeWidth={1} />
      <text x={406} y={157} textAnchor="middle" fontSize={11} fontWeight={400} fill="#231A09">
        {"SELF-HOSTED @ FLY.IO"}
      </text>
      <text x={530} y={157} fontSize={11} fontWeight={400} fill="#5E5757">
        {"THE PUBLIC API GREW A TURNSTILE WALL"}
      </text>

      {/* ---- Swap row 2: YouTube leaves cobalt ---- */}
      <rect x={16} y={202} width={180} height={26} rx={2} fill="#EDEDED" stroke="rgba(0,0,0,0.25)" strokeWidth={1} />
      <text x={106} y={219} textAnchor="middle" fontSize={11} fontWeight={400} fill="#5E5757">
        {"COBALT — YOUTUBE PATH"}
      </text>
      <line x1={16} y1={215} x2={196} y2={215} stroke="#EC4E09" strokeWidth={1.5} />
      <text x={252} y={207} textAnchor="middle" fontSize={11} fontWeight={500} fill="#A43B0D">
        {"APR 27"}
      </text>
      <line x1={204} y1={215} x2={300} y2={215} stroke="#000000" strokeWidth={1} markerEnd="url(#kosstack-arrow)" />
      <rect x={306} y={202} width={200} height={26} rx={2} fill="#FFFFFF" stroke="#000000" strokeWidth={1} />
      <text x={406} y={219} textAnchor="middle" fontSize={11} fontWeight={400} fill="#231A09">
        {"YT-DLP + DENO SOLVER"}
      </text>
      <text x={530} y={219} fontSize={11} fontWeight={400} fill="#5E5757">
        {"YOUTUBE'S BOT WALL CLOSED ON CLOUD IPS"}
      </text>

      {/* ---- Swap row 3: builders drop deps ---- */}
      <rect x={16} y={264} width={180} height={26} rx={2} fill="#EDEDED" stroke="rgba(0,0,0,0.25)" strokeWidth={1} />
      <text x={106} y={281} textAnchor="middle" fontSize={11} fontWeight={400} fill="#5E5757">
        {"NIXPACKS / RAILPACK"}
      </text>
      <line x1={16} y1={277} x2={196} y2={277} stroke="#EC4E09" strokeWidth={1.5} />
      <text x={252} y={269} textAnchor="middle" fontSize={11} fontWeight={500} fill="#A43B0D">
        {"APR 27"}
      </text>
      <line x1={204} y1={277} x2={300} y2={277} stroke="#000000" strokeWidth={1} markerEnd="url(#kosstack-arrow)" />
      <rect x={306} y={264} width={200} height={26} rx={2} fill="#FFFFFF" stroke="#000000" strokeWidth={1} />
      <text x={406} y={281} textAnchor="middle" fontSize={11} fontWeight={400} fill="#231A09">
        {"RAW DOCKERFILE"}
      </text>
      <text x={530} y={281} fontSize={11} fontWeight={400} fill="#5E5757">
        {"BUILDERS DROPPED YT-DLP + FFMPEG, SILENTLY"}
      </text>

      {/* ---- Swap row 4: retrieval grows a reranker ---- */}
      <rect x={16} y={326} width={180} height={26} rx={2} fill="#EDEDED" stroke="rgba(0,0,0,0.25)" strokeWidth={1} />
      <text x={106} y={343} textAnchor="middle" fontSize={11} fontWeight={400} fill="#5E5757">
        {"PLAIN COSINE TOP-K"}
      </text>
      <line x1={16} y1={339} x2={196} y2={339} stroke="#EC4E09" strokeWidth={1.5} />
      <text x={252} y={331} textAnchor="middle" fontSize={11} fontWeight={500} fill="#A43B0D">
        {"JUN 20"}
      </text>
      <line x1={204} y1={339} x2={300} y2={339} stroke="#000000" strokeWidth={1} markerEnd="url(#kosstack-arrow)" />
      <rect x={306} y={326} width={200} height={26} rx={2} fill="#FFFFFF" stroke="#000000" strokeWidth={1} />
      <text x={406} y={343} textAnchor="middle" fontSize={11} fontWeight={400} fill="#231A09">
        {"VOYAGE RERANK-2.5"}
      </text>
      <text x={530} y={343} fontSize={11} fontWeight={400} fill="#5E5757">
        {"ONE NUMBER WAS DOING THREE JOBS"}
      </text>

      {/* ---- The rest of the registry, demoted to a band ---- */}
      <rect x={16} y={388} width={947} height={48} fill="#EDEDED" stroke="rgba(0,0,0,0.25)" strokeWidth={1} />
      <text x={32} y={408} fontSize={11} fontWeight={400} fill="#5E5757">
        {"THE REST OF THE REGISTRY — TELEGRAM · SAFE BROWSING · FXTWITTER · COSMOS · LINKEDIN OG"}
      </text>
      <text x={32} y={426} fontSize={11} fontWeight={400} fill="#5E5757">
        {"DESIGN PORTFOLIOS · SUPADATA → DEEPGRAM · HAIKU + SONNET · VOYAGE · PGVECTOR · SUPABASE · RAILWAY · EXA · OBSIDIAN"}
      </text>

      {/* Footnote */}
      <text x={16} y={470} fontSize={11} fontWeight={400} fill="#A43B0D">
        {"// TOOLS SWAP BY DATABASE ROW — HOT-RELOADED, NO REDEPLOY"}
      </text>
    </svg>
  );
}
