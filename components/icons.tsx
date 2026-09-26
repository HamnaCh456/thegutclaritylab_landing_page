import type { CSSProperties, SVGProps } from "react";

type P = SVGProps<SVGSVGElement>;

const LEAVES: [number, number, number][] = [
  [34, 10, -65],
  [24, 22, -48],
  [17, 36, -28],
  [14, 51, -8],
  [16, 66, 14],
  [22, 80, 34],
  [31, 92, 52],
];

// grow: stem draws and leaves pop in once an ancestor <Reveal> is visible (bottom leaf first).
export function Laurel({ flip = false, grow = false, ...p }: P & { flip?: boolean; grow?: boolean }) {
  return (
    <svg
      viewBox="0 0 48 100"
      fill="currentColor"
      aria-hidden="true"
      style={flip ? { transform: "scaleX(-1)" } : undefined}
      {...p}
    >
      <path
        d="M42 4C14 22 8 60 40 98"
        pathLength={1}
        className={grow ? "draw" : undefined}
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      {/* The <g> carries the pop so it never disturbs the ellipse's own rotate(). */}
      {LEAVES.map(([x, y, r], i) => (
        <g
          key={`${x}-${y}`}
          className={grow ? "leaf" : undefined}
          style={grow ? ({ "--i": LEAVES.length - 1 - i } as CSSProperties) : undefined}
        >
          <ellipse cx={x} cy={y} rx="4" ry="9" transform={`rotate(${r} ${x} ${y})`} />
        </g>
      ))}
    </svg>
  );
}

export function CheckCircle(p: P) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...p}>
      <circle cx="12" cy="12" r="12" />
      <path
        d="M7 12.5l3.2 3.2L17 9"
        fill="none"
        className="stroke-paper-white"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
