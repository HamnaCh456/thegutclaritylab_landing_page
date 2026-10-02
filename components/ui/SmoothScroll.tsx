"use client";

import { useEffect } from "react";
import Lenis from "lenis";

// Low lerp = the page keeps gliding after the wheel stops, like a puck on ice.
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({
      autoRaf: true,
      lerp: 0.06,
      wheelMultiplier: 0.9,
      // Nav links glide too, stopping just below the sticky header (audience tabs + 56px bar).
      anchors: { offset: -112, duration: 1.8, easing: (t) => 1 - Math.pow(2, -10 * t) },
    });
    return () => lenis.destroy();
  }, []);
  return null;
}
