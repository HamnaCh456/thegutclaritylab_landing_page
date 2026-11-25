"use client";

import { useEffect, useRef, useState } from "react";

// Keep the real value in the server HTML; animate only once it enters view.
export function PricingCounter({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    const element = ref.current;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!element || motion.matches) return;
    let frame = 0;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      const start = performance.now();
      const tick = (now: number) => {
        const progress = Math.min((now - start) / 1450, 1);
        setDisplay(Math.round(value * (1 - Math.pow(1 - progress, 3))));
        if (progress < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    }, { threshold: 0.12 });
    const stop = () => {
      if (!motion.matches) return;
      observer.disconnect();
      cancelAnimationFrame(frame);
      setDisplay(value);
    };
    motion.addEventListener("change", stop);
    observer.observe(element);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      motion.removeEventListener("change", stop);
    };
  }, [value]);

  return <span ref={ref} className="count" aria-hidden="true">{display}</span>;
}
