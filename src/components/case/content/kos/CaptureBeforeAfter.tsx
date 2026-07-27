export default function CaptureBeforeAfter() {
  return (
    <svg
      viewBox="0 0 979 360"
      role="img"
      aria-label="Before and after: a graveyard of bookmarks fading as they age, versus the capture chat's real two-step reply — a shared link is acknowledged in seconds with Saved, processing, then the background pipeline reports back the graded save with its space, topic, and score."
      style={{
        width: "100%",
        height: "auto",
        display: "block",
        fontFamily: "var(--font-geist-mono), ui-monospace, monospace",
      }}
    >
      <title>Piles rot — capture compounds</title>

      {/* Figure header */}
      <text x={20} y={31} fontSize={13} fontWeight={400} fill="#5E5757">
        {"// PILES ROT — CAPTURE COMPOUNDS"}
      </text>

      {/* ============ LEFT PANEL — THE BOOKMARKS GRAVEYARD ============ */}
      <rect x={20} y={50} width={450} height={260} fill="#FFFFFF" stroke="#000000" strokeWidth={1} />
      <text x={36} y={74} fontSize={13} fontWeight={400} fill="#231A09">
        THE BOOKMARKS GRAVEYARD
      </text>
      <line x1={36} y1={84} x2={454} y2={84} stroke="rgba(0,0,0,0.25)" strokeWidth={1} />

      {/* Bookmark rows — fading with age, newest at top */}
      <g opacity={1}>
        <rect x={36} y={96} width={14} height={14} fill="#D9D9D9" />
        <rect x={58} y={99} width={180} height={8} fill="#D9D9D9" />
        <text x={454} y={107} textAnchor="end" fontSize={11} fontWeight={400} fill="#5E5757">
          SAVED 2 WEEKS AGO
        </text>
      </g>
      <g opacity={0.85}>
        <rect x={36} y={134} width={14} height={14} fill="#D9D9D9" />
        <rect x={58} y={137} width={150} height={8} fill="#D9D9D9" />
        <text x={454} y={145} textAnchor="end" fontSize={11} fontWeight={400} fill="#5E5757">
          SAVED 3 MONTHS AGO
        </text>
      </g>
      <g opacity={0.68}>
        <rect x={36} y={172} width={14} height={14} fill="#D9D9D9" />
        <rect x={58} y={175} width={200} height={8} fill="#D9D9D9" />
        <text x={454} y={183} textAnchor="end" fontSize={11} fontWeight={400} fill="#5E5757">
          SAVED 7 MONTHS AGO
        </text>
      </g>
      <g opacity={0.5}>
        <rect x={36} y={210} width={14} height={14} fill="#D9D9D9" />
        <rect x={58} y={213} width={140} height={8} fill="#D9D9D9" />
        <text x={454} y={221} textAnchor="end" fontSize={11} fontWeight={400} fill="#5E5757">
          SAVED 9 MONTHS AGO
        </text>
      </g>
      <g opacity={0.35}>
        <rect x={36} y={248} width={14} height={14} fill="#D9D9D9" />
        <rect x={58} y={251} width={165} height={8} fill="#D9D9D9" />
        <text x={454} y={259} textAnchor="end" fontSize={11} fontWeight={400} fill="#5E5757">
          SAVED 14 MONTHS AGO
        </text>
      </g>

      {/* ============ RIGHT PANEL — CAPTURE, NOW ============ */}
      <rect x={500} y={50} width={459} height={260} fill="#FFFFFF" stroke="#000000" strokeWidth={1} />
      <text x={516} y={74} fontSize={13} fontWeight={400} fill="#231A09">
        CAPTURE, NOW
      </text>
      <line x1={516} y1={84} x2={943} y2={84} stroke="rgba(0,0,0,0.25)" strokeWidth={1} />

      {/* Outgoing bubble — shared link (right-aligned) */}
      <rect x={747} y={96} width={196} height={30} rx={2} fill="#EDEDED" />
      <g transform="translate(765 111) rotate(-45)" stroke="#231A09" strokeWidth={1.3} fill="none">
        <rect x={-8.5} y={-3} width={9} height={6} rx={3} />
        <rect x={-0.5} y={-3} width={9} height={6} rx={3} />
      </g>
      <text x={783} y={115} fontSize={11} fontWeight={400} fill="#231A09">
        {"https://arxiv.org/..."}
      </text>

      {/* THE accent — timestamp delta between send and the instant ack */}
      <line x1={780} y1={134} x2={780} y2={156} stroke="#EC4E09" strokeWidth={1.5} />
      <line x1={775} y1={134} x2={785} y2={134} stroke="#EC4E09" strokeWidth={1.5} />
      <line x1={775} y1={156} x2={785} y2={156} stroke="#EC4E09" strokeWidth={1.5} />
      <text x={766} y={149} textAnchor="end" fontSize={13} fontWeight={500} fill="#EC4E09">
        IN SECONDS
      </text>

      {/* Reply bubble 1 — the instant ack */}
      <rect x={516} y={164} width={190} height={28} rx={2} fill="#FFFFFF" stroke="#000000" strokeWidth={1} />
      <text x={528} y={182} fontSize={11} fontWeight={400} fill="#231A09">
        {"Saved ✓ — processing…"}
      </text>

      {/* Between-note — the background pipeline */}
      <text x={516} y={212} fontSize={11} fontWeight={400} fill="#5E5757">
        {"MOMENTS LATER, THE PIPELINE REPORTS BACK:"}
      </text>

      {/* Reply bubble 2 — the graded save */}
      <rect x={516} y={222} width={252} height={70} rx={2} fill="#FFFFFF" stroke="#000000" strokeWidth={1} />
      <text x={528} y={243} fontSize={11} fontWeight={400} fill="#231A09">
        {"✓ AGENT EVALS — A FIELD GUIDE"}
      </text>
      <text x={528} y={261} fontSize={11} fontWeight={400} fill="#231A09">
        {"AI & AGENTS · AGENTIC CODING"}
      </text>
      <text x={528} y={279} fontSize={11} fontWeight={400} fill="#231A09">
        {"⭐ 0.8 — SUMMARIZED + EMBEDDED"}
      </text>

      {/* Footnote */}
      <text x={959} y={338} textAnchor="end" fontSize={11} fontWeight={400} fill="#A43B0D">
        {"// MIRRORS THE BOT'S REAL TWO-STEP REPLY — ACK, THEN THE GRADED SAVE"}
      </text>
    </svg>
  );
}
