"use client";

import { useEffect, useRef, type ReactNode } from "react";

type Variant = "up" | "scale" | "left" | "right";
type Props = { children: ReactNode; className?: string; delay?: number; variant?: Variant };

// delay (ms) staggers siblings in a grid; moot under prefers-reduced-motion (no transition).
// Children with .stagger-item / .word / .leaf / .draw animate once this turns .is-visible.
export function Reveal({ children, className = "", delay = 0, variant = "up" }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-visible");
          io.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      data-v={variant}
      className={`reveal ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
