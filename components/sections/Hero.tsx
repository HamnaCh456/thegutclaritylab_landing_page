import Image from "next/image";
import type { ComponentType, SVGProps } from "react";
import { hero, type ChipIcon } from "@/content/hero";
import { Container } from "@/components/ui/Container";
import { ArrowUp, Bars, Card, Chart, Coins, Person } from "@/components/icons";

const chipIcons: Record<ChipIcon, ComponentType<SVGProps<SVGSVGElement>>> = {
  bars: Bars,
  coins: Coins,
  card: Card,
  chart: Chart,
  person: Person,
};

const fragmentTone = {
  cream: "bg-apricot-cream text-warm-putty",
  mint: "bg-mint-wash text-deep-moss",
  stone: "bg-pale-stone text-graphite-text",
} as const;

const fragmentPos = ["left-[2%] top-[22%]", "right-[2%] top-[18%]", "left-[5%] bottom-[14%]", "right-[6%] bottom-[8%]"];

function Fragments() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 hidden xl:block">
      {hero.fragments.map((f, i) => (
        <div
          key={f.label}
          className={`absolute w-48 rounded-cards p-4 opacity-50 blur-[2px] ${fragmentPos[i]} ${fragmentTone[f.tone]}`}
        >
          <p className="text-caption uppercase tracking-wide">{f.label}</p>
          <p className="mt-1 text-subheading font-semibold">{f.value}</p>
        </div>
      ))}
    </div>
  );
}

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="bg-mint-glow relative overflow-hidden">
      <Fragments />
      <Container className="relative pt-10 pb-section-sm text-center md:pt-14 md:pb-section lg:pt-16">
        <h1 id="hero-title" className="mx-auto max-w-5xl text-display-fluid font-medium">
          {hero.headline.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </h1>

        <p className="mx-auto mt-8 max-w-3xl text-subheading text-graphite-text">
          {hero.subhead.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </p>

        <div
          role="search"
          className="mx-auto mt-12 flex max-w-4xl items-center gap-3 rounded-pills border border-soft-mist bg-paper-white p-2 pl-6"
        >
          <input
            type="text"
            readOnly
            placeholder={hero.inputPlaceholder}
            aria-label={hero.inputPlaceholder}
            className="min-w-0 flex-1 bg-transparent text-subheading text-ink-black outline-none placeholder:text-graphite-text"
          />
          <a
            href="#get-started"
            aria-label={hero.submitLabel}
            className="flex h-14 w-14 shrink-0 items-center justify-center rounded-pills bg-forest-floor text-paper-white transition-colors hover:bg-deep-moss"
          >
            <ArrowUp className="h-6 w-6" />
          </a>
        </div>

        <ul className="mt-6 flex flex-wrap justify-center gap-3">
          {hero.chips.map((c) => {
            const Icon = chipIcons[c.icon];
            return (
              <li
                key={c.label}
                className="inline-flex items-center gap-2 rounded-pills border border-soft-mist bg-paper-white px-4 py-2 text-body text-graphite-text"
              >
                <Icon className="h-4 w-4" />
                {c.label}
              </li>
            );
          })}
        </ul>

        <div className="mt-16 flex flex-col items-center gap-3">
          {hero.avatars.length > 0 && (
            <div className="flex -space-x-2">
              {hero.avatars.map((src) => (
                <Image
                  key={src}
                  src={src}
                  alt=""
                  width={36}
                  height={36}
                  className="h-9 w-9 rounded-pills border-2 border-paper-white object-cover"
                />
              ))}
            </div>
          )}
          <p className="text-body font-medium">{hero.trustedLabel}</p>
        </div>
      </Container>
    </section>
  );
}
