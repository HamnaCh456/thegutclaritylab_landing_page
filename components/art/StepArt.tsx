import type { StepArt as Art } from "@/content/steps";
import { CheckCircle } from "@/components/icons";

function Tree() {
  return (
    <svg viewBox="0 0 280 160" aria-hidden="true" className="h-full w-full">
      <rect x="95" y="10" width="90" height="46" rx="12" className="fill-sandstone" />
      <path
        d="M140 56v30M140 86c-30 0-60 0-70 30M140 86v30M140 86c30 0 60 0 70 30"
        fill="none"
        className="stroke-graphite-text/40"
        strokeWidth="3"
      />
      <rect x="30" y="110" width="80" height="44" rx="12" className="fill-mint-wash" />
      <rect x="100" y="110" width="80" height="44" rx="12" className="fill-vivid-leaf" />
      <rect x="170" y="110" width="80" height="44" rx="12" className="fill-apricot-cream" />
    </svg>
  );
}

function Chat() {
  return (
    <div className="flex h-full flex-col justify-center gap-3">
      <div className="w-3/5 rounded-images rounded-bl-cards bg-vivid-leaf p-4">
        <span className="block h-2 w-3/4 rounded-pills bg-paper-white/80" />
        <span className="mt-2 block h-2 w-1/2 rounded-pills bg-paper-white/80" />
      </div>
      <div className="w-3/5 self-end rounded-images rounded-br-cards bg-mint-wash p-4">
        <span className="block h-2 w-3/4 rounded-pills bg-paper-white" />
        <span className="mt-2 block h-2 w-1/2 rounded-pills bg-paper-white" />
      </div>
    </div>
  );
}

function Switch({ label }: { label: string }) {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-4">
      <span className="relative h-16 w-32 rounded-pills bg-forest-floor" aria-hidden="true">
        <span className="absolute right-1 top-1 h-14 w-14 rounded-pills bg-paper-white" />
      </span>
      <span className="text-body font-medium text-graphite-text">{label}</span>
    </div>
  );
}

function List({ rows }: { rows: string[] }) {
  return (
    <ul className="flex h-full flex-col justify-center gap-2">
      {rows.map((r) => (
        <li key={r} className="flex items-center gap-3 rounded-cards bg-pale-stone px-4 py-2 text-body">
          <CheckCircle className="h-5 w-5 text-bright-sprout" />
          {r}
        </li>
      ))}
    </ul>
  );
}

export function StepArt({ art }: { art: Art }) {
  switch (art.kind) {
    case "tree":
      return <Tree />;
    case "chat":
      return <Chat />;
    case "switch":
      return <Switch label={art.label} />;
    case "list":
      return <List rows={art.rows} />;
  }
}
