export default function LabInterpreterFilmstrip() {
  return (
    <svg
      viewBox="0 0 979 260"
      role="img"
      aria-label="Three-frame filmstrip: a bloodwork PDF is dropped in with no prompting, the abnormal values ALT and GLU are flagged automatically, and three sourced differentials are returned."
      style={{
        width: "100%",
        height: "auto",
        display: "block",
        fontFamily: "var(--font-geist-mono), ui-monospace, monospace",
      }}
    >
      <title>Lab interpreter workflow: drop, flagged, differentials</title>

      <defs>
        <marker
          id="cvlab-arrow"
          viewBox="0 0 8 8"
          markerWidth={8}
          markerHeight={8}
          refX={8}
          refY={4}
          orient="auto"
          markerUnits="userSpaceOnUse"
        >
          <path d="M0 0 L8 4 L0 8 Z" fill="#000000" />
        </marker>
      </defs>

      {/* Figure header */}
      <text x={16} y={30} fontSize={13} fontWeight={400} fill="#5E5757">
        {"// DROP THE LAB WORK"}
      </text>

      {/* Frame sub-labels */}
      <text x={16} y={58} fontSize={13} fontWeight={400} fill="#5E5757">
        DROP
      </text>
      <text x={347} y={58} fontSize={13} fontWeight={400} fill="#5E5757">
        FLAGGED
      </text>
      <text x={678} y={58} fontSize={13} fontWeight={400} fill="#5E5757">
        DIFFERENTIALS
      </text>

      {/* ---- FRAME 1 : DROP ---- */}
      <rect x={16} y={70} width={285} height={146} fill="#FFFFFF" stroke="#000000" strokeWidth={1} />
      {/* dashed drop zone */}
      <rect
        x={36}
        y={90}
        width={245}
        height={106}
        fill="none"
        stroke="#5E5757"
        strokeWidth={1}
        strokeDasharray="6 5"
      />
      {/* file glyph with folded corner */}
      <path
        d="M144.5 112 L163.5 112 L172.5 121 L172.5 148 L144.5 148 Z"
        fill="#FFFFFF"
        stroke="#000000"
        strokeWidth={1}
      />
      <path d="M163.5 112 L163.5 121 L172.5 121" fill="none" stroke="#000000" strokeWidth={1} />
      <rect x={151} y={128} width={15} height={2.5} fill="#D9D9D9" />
      <rect x={151} y={135} width={15} height={2.5} fill="#D9D9D9" />
      <text x={158.5} y={170} fontSize={11} fontWeight={400} fill="#231A09" textAnchor="middle">
        BLOODWORK.PDF
      </text>

      {/* connector: frame 1 -> frame 2 */}
      <line
        x1={309}
        y1={143}
        x2={337}
        y2={143}
        stroke="#000000"
        strokeWidth={1.5}
        markerEnd="url(#cvlab-arrow)"
      />

      {/* ---- FRAME 2 : FLAGGED ---- */}
      <rect x={347} y={70} width={285} height={146} fill="#FFFFFF" stroke="#000000" strokeWidth={1} />
      {/* row separators — 27-unit row pitch so 11px text keeps 8+ clearance from rules */}
      <line x1={406} y1={116} x2={575} y2={116} stroke="rgba(0,0,0,0.25)" strokeWidth={1} />
      <line x1={406} y1={143} x2={575} y2={143} stroke="rgba(0,0,0,0.25)" strokeWidth={1} />
      <line x1={406} y1={170} x2={575} y2={170} stroke="rgba(0,0,0,0.25)" strokeWidth={1} />
      {/* row 1 — WBC, normal */}
      <text x={418} y={106.5} fontSize={11} fontWeight={400} fill="#5E5757">
        WBC
      </text>
      <text x={546} y={106.5} fontSize={11} fontWeight={400} fill="#5E5757" textAnchor="end">
        9.8
      </text>
      {/* row 2 — ALT, flagged high */}
      <text x={418} y={133.5} fontSize={11} fontWeight={400} fill="#EC4E09">
        ALT
      </text>
      <text x={546} y={133.5} fontSize={11} fontWeight={500} fill="#EC4E09" textAnchor="end">
        214
      </text>
      <path
        d="M559 134.5 L559 124.5 M555.5 128 L559 124.5 L562.5 128"
        fill="none"
        stroke="#EC4E09"
        strokeWidth={1.5}
        strokeLinecap="round"
      />
      {/* row 3 — GLU, flagged low */}
      <text x={418} y={160.5} fontSize={11} fontWeight={400} fill="#EC4E09">
        GLU
      </text>
      <text x={546} y={160.5} fontSize={11} fontWeight={500} fill="#EC4E09" textAnchor="end">
        31
      </text>
      <path
        d="M559 151.5 L559 161.5 M555.5 158 L559 161.5 L562.5 158"
        fill="none"
        stroke="#EC4E09"
        strokeWidth={1.5}
        strokeLinecap="round"
      />
      {/* row 4 — CREA, normal */}
      <text x={418} y={187.5} fontSize={11} fontWeight={400} fill="#5E5757">
        CREA
      </text>
      <text x={546} y={187.5} fontSize={11} fontWeight={400} fill="#5E5757" textAnchor="end">
        1.1
      </text>

      {/* connector: frame 2 -> frame 3 */}
      <line
        x1={640}
        y1={143}
        x2={668}
        y2={143}
        stroke="#000000"
        strokeWidth={1.5}
        markerEnd="url(#cvlab-arrow)"
      />

      {/* ---- FRAME 3 : DIFFERENTIALS ---- */}
      <rect x={678} y={70} width={285} height={146} fill="#FFFFFF" stroke="#000000" strokeWidth={1} />
      {/* differentials card */}
      <rect x={698} y={86} width={245} height={114} fill="#FFFFFF" stroke="#000000" strokeWidth={1} />
      <text x={712} y={106} fontSize={11} fontWeight={400} fill="#231A09">
        {"3 DIFFERENTIALS — SOURCED"}
      </text>
      <line x1={712} y1={114} x2={929} y2={114} stroke="rgba(0,0,0,0.25)" strokeWidth={1} />
      {/* row 1: text-bar + source chip */}
      <rect x={712} y={128.5} width={138} height={7} fill="#D9D9D9" />
      <rect x={899} y={126} width={30} height={12} rx={2} fill="#FFFFFF" stroke="#5E5757" strokeWidth={1} />
      <rect x={904} y={130} width={20} height={4} fill="#D9D9D9" />
      {/* row 2 */}
      <rect x={712} y={154.5} width={116} height={7} fill="#D9D9D9" />
      <rect x={899} y={152} width={30} height={12} rx={2} fill="#FFFFFF" stroke="#5E5757" strokeWidth={1} />
      <rect x={904} y={156} width={20} height={4} fill="#D9D9D9" />
      {/* row 3 */}
      <rect x={712} y={180.5} width={127} height={7} fill="#D9D9D9" />
      <rect x={899} y={178} width={30} height={12} rx={2} fill="#FFFFFF" stroke="#5E5757" strokeWidth={1} />
      <rect x={904} y={182} width={20} height={4} fill="#D9D9D9" />

      {/* Footnote */}
      <text x={963} y={244} fontSize={11} fontWeight={400} fill="#A43B0D" textAnchor="end">
        {"// REPRESENTATIVE VALUES — NOT CLINICAL DATA"}
      </text>
    </svg>
  );
}
