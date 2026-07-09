/**
 * Shared decorative motifs — all presentational (aria-hidden), all pure SVG.
 * Measurements from .claude/design-spec-portfolio-redesign.md §5-6.
 */

/** 32x32 registration cross: two 4px solid strokes crossing at center. */
export function PlusMark({
  size = 32,
  color = "var(--black)",
  className,
}: {
  size?: number;
  color?: string;
  className?: string;
}) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
    >
      <path d="M16 0V32M0 16H32" stroke={color} strokeWidth="4" />
    </svg>
  );
}

/**
 * 16px folded-square chevron, fill accent, rendered rotated 45deg
 * (rotation applied by the consumer via CSS; natural bbox 22.63px when rotated).
 */
export function FoldedChevron({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M12.2426 12.2426L12 4L16 0V16H0L4 12L12.2426 12.2426Z"
        fill="var(--accent)"
      />
    </svg>
  );
}

/**
 * 52x52 arrow-out icon: box outline broken at top-left/bottom-right,
 * 45deg shaft to top-right. 8px strokes, butt caps.
 */
export function ArrowOutIcon({
  color = "var(--ink)",
  className,
}: {
  color?: string;
  className?: string;
}) {
  return (
    <svg
      className={className}
      width="52"
      height="52"
      viewBox="0 0 52 52"
      fill="none"
      aria-hidden="true"
    >
      <path d="M12 4H52" stroke={color} strokeWidth="8" />
      <path d="M48 0V40" stroke={color} strokeWidth="8" />
      <path d="M0 48H44" stroke={color} strokeWidth="8" />
      <path d="M4 8V48" stroke={color} strokeWidth="8" />
      <path d="M20.17 32.17L48.46 3.89" stroke={color} strokeWidth="8" />
    </svg>
  );
}

/**
 * Resume-header triple chevron: three shallow 45deg-mitered downward Vs at
 * 30px pitch, accent fill. Exact paths from group40-chevrons.svg (82.63x20).
 */
export function TripleChevron({ className }: { className?: string }) {
  const v = (x: number) =>
    `M${x + 11.3137} 15.3033L${x + 16.9706} 10H${x + 22.6274}L${x + 11.3137} 20L${x} 10H${x + 5.65687}L${x + 11.3137} 15.3033Z`;
  return (
    <svg
      className={className}
      width="83"
      height="20"
      viewBox="0 0 82.6274 20"
      fill="none"
      aria-hidden="true"
    >
      <path d={v(0)} fill="var(--accent)" />
      <path d={v(30)} fill="var(--accent)" />
      <path d={v(60)} fill="var(--accent)" />
    </svg>
  );
}
