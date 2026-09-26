import { Fragment, type CSSProperties } from "react";

// Splits a line into masked words that rise in sequence (inside a <Reveal>, or with .words-load on load).
export function Words({ text, start = 0 }: { text: string; start?: number }) {
  return text.split(" ").map((w, i) => (
    <Fragment key={i}>
      <span className="word-mask">
        <span className="word" style={{ "--i": start + i } as CSSProperties}>
          {w}
        </span>
      </span>{" "}
    </Fragment>
  ));
}

// Inline style helper for the stagger/delay custom properties.
export const seq = (i: number, extra?: Record<string, string>) => ({ "--i": i, ...extra }) as CSSProperties;
