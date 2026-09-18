import { features } from "@/content/features";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { FeatureArt } from "@/components/art/FeatureArt";

function Bracket({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 800 100" aria-hidden="true" className={className}>
      <circle cx="400" cy="10" r="9" fill="currentColor" />
      <path
        d="M400 19v21M40 100V60q0-20 20-20h680q20 0 20 20v40"
        fill="none"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  );
}

const toneClass = { cream: "bg-apricot-cream", stone: "bg-pale-stone" } as const;

export function DreamMachine() {
  return (
    <section aria-labelledby="dream-title" className="py-section-sm md:py-section">
      <Container>
        <h2 id="dream-title" className="mx-auto max-w-2xl text-center text-heading font-medium md:text-heading-lg">
          {features.headline.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </h2>
        <Bracket className="mx-auto mt-8 hidden h-24 w-full max-w-3xl text-vivid-leaf md:block" />

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {features.items.map((f) => (
            <Reveal key={f.title} className={`rounded-images p-6 md:p-8 ${toneClass[f.tone]}`}>
              <div className="mx-auto h-60 max-w-sm">
                <FeatureArt art={f.art} />
              </div>
              <h3 className="mt-6 text-heading-sm font-semibold">{f.title}</h3>
              <p className="mt-2 text-body text-graphite-text">{f.body}</p>
              {f.footnote && <p className="mt-2 text-caption text-graphite-text">{f.footnote}</p>}
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
