"use client";

import { useEffect, useRef, useState } from "react";

const HOLD_MS = 4500;
const MOVE_MS = 650;

// A downward-moving window: a fresh prompt enters above the current four.
export function SageQuestions({ questions }: { questions: string[] }) {
  const root = useRef<HTMLDivElement>(null);
  const [queue, setQueue] = useState({ visible: [0, 1, 2, 3], next: 4 });
  const [moving, setMoving] = useState(false);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [inView, setInView] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);
  const canRotate = questions.length > 4;

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onMotion = () => setReducedMotion(media.matches);
    const onVisibility = () => setPageVisible(!document.hidden);
    onMotion();
    onVisibility();
    media.addEventListener("change", onMotion);
    document.addEventListener("visibilitychange", onVisibility);
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.5 });
    if (root.current) observer.observe(root.current);
    return () => {
      media.removeEventListener("change", onMotion);
      document.removeEventListener("visibilitychange", onVisibility);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!canRotate || moving || paused || hovered || !inView || !pageVisible || reducedMotion) return;
    const timer = window.setTimeout(() => setMoving(true), HOLD_MS);
    return () => window.clearTimeout(timer);
  }, [canRotate, moving, paused, hovered, inView, pageVisible, reducedMotion]);

  useEffect(() => {
    if (!moving) return;
    // Let an in-flight slide settle before pausing, so no question stays clipped.
    const timer = window.setTimeout(() => {
      setQueue((current) => ({ visible: [current.next, ...current.visible.slice(0, 3)], next: (current.next + 1) % questions.length }));
      setMoving(false);
    }, reducedMotion ? 0 : MOVE_MS);
    return () => window.clearTimeout(timer);
  }, [moving, questions.length, reducedMotion]);

  const visible = canRotate ? queue.visible : questions.map((_, i) => i);
  const rows = canRotate ? [queue.next, ...visible] : visible;

  return (
    <div ref={root} className="mt-6">
      <div className="mb-2 flex items-center justify-between gap-2">
        <p className="text-caption text-mint-wash">Questions practitioners ask Sage</p>
        {canRotate && (
          <button
            type="button"
            className="sage-question-control shrink-0 rounded px-1.5 py-1 text-caption text-mint-wash transition-colors hover:bg-mint-wash hover:text-deep-moss focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mint-wash"
            aria-label={reducedMotion ? "Show next question" : paused ? "Play questions" : "Pause questions"}
            onClick={() => reducedMotion ? setMoving(true) : setPaused((value) => !value)}
          >
            {reducedMotion ? "Next" : paused ? "Play" : "Pause"}
          </button>
        )}
      </div>
      <div className="sage-question-window" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
        <ul className={`sage-question-track ${moving ? "is-moving" : ""} ${!canRotate ? "is-static" : ""}`} data-moving={moving} aria-label="Example questions for Sage" aria-live="off">
          {rows.map((index, position) => {
            const shown = !canRotate || (moving ? position < 4 : position > 0);
            return (
              <li key={index} className="sage-question" data-visible={shown} aria-hidden={!shown}>
                <span>{questions[index]}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
