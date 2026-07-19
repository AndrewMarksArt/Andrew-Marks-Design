export default function HandoutBeforeAfter() {
  return (
    <svg
      viewBox="0 0 480 340"
      role="img"
      aria-label="Before and after panels: a dense clinical chat full of shorthand on the left becomes a clean, plain-language client handout on the right with one click."
      style={{
        width: "100%",
        height: "auto",
        display: "block",
        fontFamily: "var(--font-geist-mono), ui-monospace, monospace",
      }}
    >
      <title>Chat to client handout — one click, two audiences</title>

      <defs>
        <marker
          id="cvhandout-arrow"
          viewBox="0 0 8 8"
          refX={8}
          refY={4}
          markerWidth={8}
          markerHeight={8}
          markerUnits="userSpaceOnUse"
          orient="auto"
        >
          <path d="M0,0 L8,4 L0,8 Z" fill="#EC4E09" />
        </marker>
      </defs>

      {/* Figure header */}
      <text x={16} y={30} fontSize={13} fontWeight={300} fill="#5E5757">
        {"// ONE CLICK, TWO AUDIENCES"}
      </text>
      <line
        x1={16}
        y1={44}
        x2={464}
        y2={44}
        stroke="rgba(0,0,0,0.375)"
        strokeWidth={1}
      />

      {/* ---------- LEFT PANEL: CLINICAL CHAT (x 16-202) ---------- */}
      <text x={16} y={66} fontSize={13} fontWeight={400} fill="#5E5757">
        CLINICAL CHAT
      </text>

      <rect
        x={16}
        y={78}
        width={186}
        height={194}
        fill="#EDEDED"
        stroke="#000000"
        strokeWidth={1}
      />

      {/* Clinical shorthand, cramped rows */}
      <text x={26} y={115} fontSize={11} fontWeight={400} fill="#231A09">
        SOAP:
      </text>
      <rect x={26} y={126} width={166} height={8} fill="#D9D9D9" />
      <rect x={26} y={143} width={150} height={8} fill="#D9D9D9" />
      <rect x={26} y={160} width={160} height={8} fill="#D9D9D9" />

      <text x={26} y={189} fontSize={11} fontWeight={400} fill="#231A09">
        TX PLAN:
      </text>
      <rect x={26} y={200} width={158} height={8} fill="#D9D9D9" />
      <rect x={26} y={217} width={144} height={8} fill="#D9D9D9" />
      <rect x={26} y={234} width={162} height={8} fill="#D9D9D9" />

      {/* ---------- THE CLICK (x 202-278) ---------- */}
      <text
        x={240}
        y={164}
        fontSize={13}
        fontWeight={500}
        fill="#EC4E09"
        textAnchor="middle"
      >
        1 CLICK
      </text>
      <line
        x1={214}
        y1={180}
        x2={266}
        y2={180}
        stroke="#EC4E09"
        strokeWidth={1.5}
        markerEnd="url(#cvhandout-arrow)"
      />

      {/* ---------- RIGHT PANEL: CLIENT HANDOUT (x 278-464) ---------- */}
      <text x={278} y={66} fontSize={13} fontWeight={400} fill="#5E5757">
        CLIENT HANDOUT
      </text>

      <rect
        x={278}
        y={78}
        width={186}
        height={194}
        fill="#FFFFFF"
        stroke="#000000"
        strokeWidth={1}
      />

      {/* Handout title, plain language */}
      <text
        x={292}
        y={108}
        fontSize={12}
        fontWeight={400}
        fill="#231A09"
        style={{ fontFamily: "var(--font-geist), sans-serif" }}
      >
        Caring for Bella
      </text>
      <text
        x={292}
        y={129}
        fontSize={12}
        fontWeight={400}
        fill="#231A09"
        style={{ fontFamily: "var(--font-geist), sans-serif" }}
      >
        after surgery
      </text>

      {/* Airy bullet rows */}
      <circle cx={294} cy={152} r={2.5} fill="#5E5757" />
      <rect x={305} y={148} width={124} height={8} fill="#D9D9D9" />
      <circle cx={294} cy={180} r={2.5} fill="#5E5757" />
      <rect x={305} y={176} width={110} height={8} fill="#D9D9D9" />
      <circle cx={294} cy={208} r={2.5} fill="#5E5757" />
      <rect x={305} y={204} width={118} height={8} fill="#D9D9D9" />

      {/* Footer bar */}
      <rect x={292} y={244} width={92} height={8} fill="#D9D9D9" />

      {/* Footnote */}
      <text x={16} y={312} fontSize={11} fontWeight={400} fill="#A43B0D">
        {"// REPRESENTATIVE CONTENT"}
      </text>
    </svg>
  );
}
