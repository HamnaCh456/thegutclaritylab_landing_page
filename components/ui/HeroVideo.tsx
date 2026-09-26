"use client";

import { useEffect, useRef, useState } from "react";
import { hero } from "@/content/hero";

// Muted autoplay loop (browsers only allow muted autoplay); the pill turns sound on.
// Pauses off-screen and stays on the poster under prefers-reduced-motion.
export function HeroVideo() {
  const ref = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const v = hero.video;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? el.play().catch(() => {}) : el.pause()), {
      threshold: 0.25,
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const toggle = () => {
    const el = ref.current;
    if (!el) return;
    el.muted = !muted;
    if (el.paused) el.play().catch(() => {});
    setMuted(!muted);
  };

  return (
    <div className="group relative aspect-square overflow-hidden rounded-images bg-deep-moss shadow-md">
      <video
        ref={ref}
        src={v.src}
        poster={v.poster}
        muted
        loop
        playsInline
        preload="metadata"
        aria-label={v.label}
        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
      />
      <button
        type="button"
        onClick={toggle}
        aria-pressed={!muted}
        className="absolute bottom-4 right-4 inline-flex items-center gap-2 rounded-pills bg-paper-white/90 px-4 py-2 text-legal font-medium text-ink-black shadow-md backdrop-blur transition-[scale,background-color] duration-300 hover:scale-105 hover:bg-paper-white active:scale-95"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M11 5 6 9H3v6h3l5 4V5z" fill="currentColor" />
          {muted ? <path d="m22 9-6 6m0-6 6 6" /> : <path d="M15.5 8.5a5 5 0 0 1 0 7M18.5 5.5a9 9 0 0 1 0 13" />}
        </svg>
        {muted ? v.soundOn : v.soundOff}
      </button>
    </div>
  );
}
