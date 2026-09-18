import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement>;

const line = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

export function Leaf(p: P) {
  return (
    <svg viewBox="0 0 32 32" fill="currentColor" aria-hidden="true" {...p}>
      <circle cx="16" cy="8" r="4.5" fill="none" stroke="currentColor" strokeWidth="3" />
      <path d="M15 30C15 22 9.5 16.5 2 15.5c0 8 5 13.5 13 14.5z" />
      <path d="M17 30c0-8 5.5-13.5 13-14.5 0 8-5 13.5-13 14.5z" />
    </svg>
  );
}

const LEAVES: [number, number, number][] = [
  [34, 10, -65],
  [24, 22, -48],
  [17, 36, -28],
  [14, 51, -8],
  [16, 66, 14],
  [22, 80, 34],
  [31, 92, 52],
];

export function Laurel({ flip = false, ...p }: P & { flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 48 100"
      fill="currentColor"
      aria-hidden="true"
      style={flip ? { transform: "scaleX(-1)" } : undefined}
      {...p}
    >
      <path d="M42 4C14 22 8 60 40 98" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      {LEAVES.map(([x, y, r]) => (
        <ellipse key={`${x}-${y}`} cx={x} cy={y} rx="5" ry="10" transform={`rotate(${r} ${x} ${y})`} />
      ))}
    </svg>
  );
}

const STAR = "M10 1.6l2.5 5.4 5.9.7-4.4 4 1.2 5.8L10 14.6l-5.2 2.9 1.2-5.8-4.4-4 5.9-.7z";

export function Stars(p: P) {
  return (
    <svg viewBox="0 0 108 20" aria-hidden="true" {...p}>
      {[0, 1, 2, 3, 4].map((i) => (
        <g key={i} transform={`translate(${i * 22} 0)`}>
          <rect width="20" height="20" rx="3" className="fill-bright-sprout" />
          <path d={STAR} className="fill-paper-white" />
        </g>
      ))}
    </svg>
  );
}

export function TrustStar(p: P) {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true" {...p}>
      <path d={STAR} className="fill-bright-sprout" />
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

export function ArrowUp(p: P) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...line} strokeWidth={2.2} {...p}>
      <path d="M12 19V5M5 12l7-7 7 7" />
    </svg>
  );
}

export function Chevron(p: P) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...line} {...p}>
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

export function Play(p: P) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...p}>
      <path d="M8 5.5v13l11-6.5z" />
    </svg>
  );
}

export function Bolt(p: P) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...line} {...p}>
      <path d="M13 2L4 14h7l-1 8 9-12h-7z" />
    </svg>
  );
}

export function Gift(p: P) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...line} {...p}>
      <rect x="3" y="8" width="18" height="5" rx="1" />
      <path d="M5 13v7h14v-7M12 8v12M12 8c-2-4-6-4-6-1s4 1 6 1zm0 0c2-4 6-4 6-1s-4 1-6 1z" />
    </svg>
  );
}

/* Hero goal-chip icons */
export function Bars(p: P) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...line} {...p}>
      <path d="M6 4v16M12 4v16M18 4v16" />
    </svg>
  );
}

export function Coins(p: P) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...line} {...p}>
      <ellipse cx="12" cy="7" rx="7" ry="3" />
      <path d="M5 7v5c0 1.7 3.1 3 7 3s7-1.3 7-3V7M5 12v5c0 1.7 3.1 3 7 3s7-1.3 7-3v-5" />
    </svg>
  );
}

export function Card(p: P) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...line} {...p}>
      <rect x="3" y="6" width="18" height="12" rx="2" />
      <path d="M3 10h18" />
    </svg>
  );
}

export function Chart(p: P) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...line} {...p}>
      <path d="M4 20V10M10 20V4M16 20v-7M22 20H2" />
    </svg>
  );
}

export function Person(p: P) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...line} {...p}>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c0-4 3.6-7 8-7s8 3 8 7" />
    </svg>
  );
}
