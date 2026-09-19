import Image from "next/image";
import type { FeatureArt as Art } from "@/content/features";
import { CheckCircle, Leaf } from "@/components/icons";

function Question({ art }: { art: Extract<Art, { kind: "question" }> }) {
  return (
    <div className="relative h-full">
      <div className="absolute left-2 top-4 w-56 -rotate-6 rounded-cards bg-paper-white p-4">
        <p className="text-body font-medium">{art.prompt}</p>
        <ul className="mt-3 space-y-2 text-caption text-graphite-text">
          {art.options.map((o, i) => (
            <li key={o} className="flex items-center gap-2">
              <span
                className={`h-3 w-3 rounded-pills border border-graphite-text ${i === art.selected ? "bg-forest-floor" : ""}`}
              />
              {o}
            </li>
          ))}
        </ul>
      </div>
      <div className="absolute bottom-0 right-2 flex h-40 w-32 items-center justify-center overflow-hidden rounded-cards bg-sandstone/40 text-warm-putty">
        {art.image ? (
          <Image src={art.image} alt="" fill sizes="128px" className="object-cover object-top" />
        ) : (
          <Leaf className="h-12 w-12" />
        )}
      </div>
    </div>
  );
}

function Flow({ art }: { art: Extract<Art, { kind: "flow" }> }) {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-4">
      <span className="flex h-14 w-14 items-center justify-center rounded-cards bg-vivid-leaf text-paper-white">
        <Leaf className="h-7 w-7" />
      </span>
      <span aria-hidden="true" className="h-6 w-px bg-graphite-text/40" />
      <ul className="grid w-full grid-cols-3 gap-2">
        {art.labels.map((l) => (
          <li key={l} className="flex flex-col items-center gap-2 rounded-cards bg-paper-white px-2 py-3 text-center">
            <CheckCircle className="h-5 w-5 text-forest-floor" />
            <span className="text-caption font-semibold uppercase tracking-wide text-graphite-text">{l}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Toggles({ art }: { art: Extract<Art, { kind: "toggles" }> }) {
  return (
    <ul className="flex h-full flex-col justify-center gap-3">
      {art.rows.map((r) => (
        <li key={r} className="flex items-center justify-between rounded-cards bg-paper-white px-4 py-3">
          <span className="text-body font-medium">{r}</span>
          <span aria-hidden="true" className="relative h-6 w-11 rounded-pills bg-forest-floor">
            <span className="absolute right-0.5 top-0.5 h-5 w-5 rounded-pills bg-paper-white" />
          </span>
        </li>
      ))}
    </ul>
  );
}

function Timeline({ art }: { art: Extract<Art, { kind: "timeline" }> }) {
  return (
    <div className="flex h-full flex-col justify-center gap-4">
      <div className="flex justify-between text-caption font-semibold uppercase tracking-wide text-graphite-text">
        {art.ticks.map((t) => (
          <span key={t}>{t}</span>
        ))}
      </div>
      <ul className="space-y-3">
        {art.bars.map((b) => (
          <li key={b.label}>
            <span className="text-caption text-graphite-text">{b.label}</span>
            <div className="mt-1 h-3 rounded-pills bg-paper-white">
              <div className="h-3 rounded-pills bg-vivid-leaf" style={{ width: `${b.pct}%` }} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function FeatureArt({ art }: { art: Art }) {
  switch (art.kind) {
    case "question":
      return <Question art={art} />;
    case "flow":
      return <Flow art={art} />;
    case "toggles":
      return <Toggles art={art} />;
    case "timeline":
      return <Timeline art={art} />;
  }
}
