"use client";

import { useLayoutEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

type Props = { width: number; height: number; children: ReactNode; className?: string };

// Lays children out at a fixed design size and scales them to the box's width, so a recreated
// app screen behaves like a screenshot: same proportions at every card width.
export function FitScale({ width, height, children, className = "" }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState<number | null>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setScale(e.contentRect.width / width));
    ro.observe(el);
    return () => ro.disconnect();
  }, [width]);

  const inner: CSSProperties = {
    width,
    height,
    transform: `scale(${scale ?? 1})`,
    transformOrigin: "0 0",
    visibility: scale === null ? "hidden" : undefined,
  };

  return (
    <div ref={ref} className={`relative w-full ${className}`} style={{ aspectRatio: `${width} / ${height}` }}>
      <div className="absolute left-0 top-0" style={inner}>
        {children}
      </div>
    </div>
  );
}
