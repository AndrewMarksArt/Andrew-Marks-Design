export default function WidgetReskinBeforeAfter() {
  return (
    <svg
      viewBox="0 0 480 360"
      role="img"
      aria-label="Two chat-widget mockups compare the vendor's as-delivered styling with the on-brand re-skin, above a gap-audit excerpt listing no citations, no escalation path, and off-brand UI alongside their mitigations."
      style={{ width: "100%", height: "auto", display: "block", fontFamily: "var(--font-geist-mono), ui-monospace, monospace" }}
    >
      <title>Interim widget — gap audit and re-skin</title>

      {/* figure header */}
      <text x={16} y={27} fontSize={13} fontWeight={400} fill="#5E5757">
        {"// INTERIM WIDGET — GAP AUDIT + RE-SKIN"}
      </text>

      {/* panel labels */}
      <text x={16} y={50} fontSize={13} fontWeight={400} fill="#5E5757">
        AS DELIVERED
      </text>
      <text x={259} y={50} fontSize={13} fontWeight={400} fill="#5E5757">
        RE-SKINNED
      </text>

      {/* ---- LEFT: AS DELIVERED (sanctioned off-brand vendor styling) ---- */}
      <rect x={16} y={62} width={205} height={152} rx={12} fill="#FFFFFF" stroke="#7A8CA3" strokeWidth={1} />

      {/* vendor header bar: rounded top, squared bottom */}
      <rect x={16} y={62} width={205} height={28} rx={12} fill="#7A8CA3" />
      <rect x={16} y={76} width={205} height={14} fill="#7A8CA3" />
      <circle cx={32} cy={76} r={6} fill="#FFFFFF" fillOpacity={0.9} />
      <rect x={44} y={73} width={64} height={6} rx={3} fill="#FFFFFF" fillOpacity={0.85} />

      {/* bot bubble, heavy radius, abstract text-bars, no citation */}
      <rect x={28} y={100} width={112} height={34} rx={12} fill="#7A8CA3" fillOpacity={0.16} />
      <rect x={38} y={108} width={88} height={6} rx={3} fill="#7A8CA3" fillOpacity={0.5} />
      <rect x={38} y={118} width={64} height={6} rx={3} fill="#7A8CA3" fillOpacity={0.5} />

      {/* user bubble, solid vendor blue-gray */}
      <rect x={125} y={142} width={84} height={22} rx={11} fill="#7A8CA3" />
      <rect x={135} y={150} width={64} height={6} rx={3} fill="#FFFFFF" fillOpacity={0.85} />

      {/* pill buttons */}
      <rect x={28} y={174} width={64} height={18} rx={9} fill="#FFFFFF" stroke="#7A8CA3" strokeWidth={1} />
      <rect x={40} y={180} width={40} height={6} rx={3} fill="#7A8CA3" fillOpacity={0.45} />
      <rect x={100} y={174} width={64} height={18} rx={9} fill="#FFFFFF" stroke="#7A8CA3" strokeWidth={1} />
      <rect x={112} y={180} width={40} height={6} rx={3} fill="#7A8CA3" fillOpacity={0.45} />

      {/* ---- RIGHT: RE-SKINNED (house language) ---- */}
      <rect x={259} y={62} width={205} height={152} fill="#FFFFFF" stroke="#000000" strokeWidth={1} />

      {/* house header: mono label + hairline rule */}
      <text x={271} y={78} fontSize={11} fontWeight={400} fill="#231A09">
        {"P1 ASSIST — INTERIM"}
      </text>
      <line x1={259} y1={86} x2={464} y2={86} stroke="rgba(0,0,0,0.375)" strokeWidth={1} />

      {/* bot message: squared, 1px black stroke, abstract text-bars */}
      <rect x={271} y={94} width={112} height={32} fill="#FFFFFF" stroke="#000000" strokeWidth={1} />
      <rect x={279} y={102} width={88} height={6} fill="#D9D9D9" />
      <rect x={279} y={112} width={64} height={6} fill="#D9D9D9" />

      {/* interim source chip (the citation the vendor build lacked) */}
      <rect x={271} y={134} width={105} height={16} rx={2} fill="#FFFFFF" stroke="#A43B0D" strokeWidth={1} />
      <text x={323.5} y={146} fontSize={11} fontWeight={400} fill="#A43B0D" textAnchor="middle">
        {"SOURCE: KB-12"}
      </text>

      {/* user message: squared */}
      <rect x={380} y={158} width={72} height={20} fill="#FFFFFF" stroke="#000000" strokeWidth={1} />
      <rect x={388} y={165} width={56} height={6} fill="#D9D9D9" />

      {/* escalation CTA — the one accent element */}
      <rect x={271} y={186} width={181} height={20} fill="#EC4E09" fillOpacity={0.1} stroke="#EC4E09" strokeWidth={1.5} />
      <text x={361.5} y={200} fontSize={11} fontWeight={400} fill="#A43B0D" textAnchor="middle">
        ESCALATE TO A HUMAN
      </text>

      {/* ---- BOTTOM: gap-audit excerpt ---- */}
      <text x={16} y={234} fontSize={12} fontWeight={400} fill="#5E5757">
        {"// GAP AUDIT — EXCERPT"}
      </text>

      {/* column heads */}
      <text x={16} y={252} fontSize={11} fontWeight={400} fill="#5E5757">
        GAP
      </text>
      <text x={150} y={252} fontSize={11} fontWeight={400} fill="#5E5757">
        IMPACT
      </text>
      <text x={298} y={252} fontSize={11} fontWeight={400} fill="#5E5757">
        MITIGATION
      </text>
      <line x1={16} y1={260} x2={464} y2={260} stroke="rgba(0,0,0,0.375)" strokeWidth={1} />

      {/* row 1 */}
      <text x={16} y={276} fontSize={11} fontWeight={400} fill="#231A09">
        NO CITATIONS
      </text>
      <text x={150} y={276} fontSize={11} fontWeight={400} fill="#231A09">
        {"CAN'T VERIFY ANSWERS"}
      </text>
      <text x={298} y={276} fontSize={11} fontWeight={400} fill="#231A09">
        INTERIM SOURCE LINKS
      </text>
      <line x1={16} y1={284} x2={464} y2={284} stroke="rgba(0,0,0,0.375)" strokeWidth={1} />

      {/* row 2 */}
      <text x={16} y={300} fontSize={11} fontWeight={400} fill="#231A09">
        NO ESCALATION PATH
      </text>
      <text x={150} y={300} fontSize={11} fontWeight={400} fill="#231A09">
        STUCK USERS DEAD-END
      </text>
      <text x={298} y={300} fontSize={11} fontWeight={400} fill="#231A09">
        2-TURN SOFT CTA
      </text>
      <line x1={16} y1={308} x2={464} y2={308} stroke="rgba(0,0,0,0.375)" strokeWidth={1} />

      {/* row 3 */}
      <text x={16} y={324} fontSize={11} fontWeight={400} fill="#231A09">
        OFF-BRAND UI
      </text>
      <text x={150} y={324} fontSize={11} fontWeight={400} fill="#231A09">
        TRUST PENALTY
      </text>
      <text x={298} y={324} fontSize={11} fontWeight={400} fill="#231A09">
        FULL RE-SKIN
      </text>
      <line x1={16} y1={332} x2={464} y2={332} stroke="rgba(0,0,0,0.375)" strokeWidth={1} />
    </svg>
  );
}
