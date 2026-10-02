import type { CSSProperties } from "react";
import { features, featuresPage, type Feature } from "@/content/features";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { CheckCircle } from "@/components/icons";
import { Words, seq } from "@/components/ui/Words";
import { AppWindow } from "@/components/app/AppWindow";
import { screens } from "@/components/sections/Features";

const wordStarts = featuresPage.headline.map((_, i) =>
  featuresPage.headline.slice(0, i).reduce((n, l) => n + l.split(" ").length, 0),
);

const jumps = [...features.items.map((f) => ({ id: f.id, short: f.short })), featuresPage.sage];

export function FeaturesHero() {
  return (
    <section aria-labelledby="features-page-title" className="bg-mint-glow relative overflow-hidden">
      <div aria-hidden="true" className="absolute inset-0">
        <div className="blob left-[-10%] top-[-20%] h-[420px] w-[520px] bg-mint-wash" />
        <div className="blob right-[-8%] top-[10%] h-[380px] w-[460px] bg-apricot-cream [animation-delay:-8s]" />
      </div>
      <Container className="relative pt-14 pb-section-sm text-center md:pt-20 md:pb-section">
        <p className="load-in text-legal font-medium text-forest-floor" style={{ "--d": "100ms" } as CSSProperties}>
          {featuresPage.eyebrow}
        </p>
        <h1 id="features-page-title" className="words-load mx-auto mt-3 max-w-3xl text-display-split font-medium">
          {featuresPage.headline.map((line, i) => (
            <span key={line} className="block">
              <Words text={line} start={wordStarts[i]} />
            </span>
          ))}
        </h1>
        <p className="load-in mx-auto mt-6 max-w-xl text-subheading text-graphite-text" style={{ "--d": "550ms" } as CSSProperties}>
          {featuresPage.lead}
        </p>
        <nav
          aria-label={featuresPage.jumpLabel}
          className="load-in mx-auto mt-10 flex max-w-4xl flex-wrap justify-center gap-2"
          style={{ "--d": "700ms" } as CSSProperties}
        >
          {jumps.map((j) => (
            <a
              key={j.id}
              href={`#${j.id}`}
              className="rounded-pills border border-soft-mist bg-paper-white/80 px-4 py-1.5 text-legal font-medium text-ink-black transition-[background-color,translate,box-shadow] duration-300 hover:-translate-y-0.5 hover:bg-paper-white hover:shadow-sm"
            >
              {j.short}
            </a>
          ))}
        </nav>
      </Container>
    </section>
  );
}

const toneClass = { cream: "bg-apricot-cream", stone: "bg-pale-stone" } as const;

function FeatureRow({ f, i }: { f: Feature; i: number }) {
  const Screen = screens[f.screen];
  const flip = i % 2 === 1;
  return (
    <section id={f.id} aria-labelledby={`${f.id}-title`} className="scroll-mt-20 py-section-sm md:py-section">
      <Container className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
        <Reveal variant={flip ? "right" : "left"} className={flip ? "lg:order-2" : ""}>
          <p className="text-heading-sm font-semibold text-vivid-leaf">{String(i + 1).padStart(2, "0")}</p>
          <h2 id={`${f.id}-title`} className="mt-2 text-heading-sm font-medium md:text-heading">
            <Words text={f.title} />
          </h2>
          <p className="mt-3 text-body text-graphite-text">{f.body}</p>
          <ul className="mt-6 space-y-3">
            {f.points.map((p, j) => (
              <li key={p} className="stagger-item flex gap-3" style={seq(j, { "--step": "110ms", "--base": "300ms" })}>
                <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-bright-sprout" />
                <p className="text-body">{p}</p>
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal delay={120} variant="scale" className={flip ? "lg:order-1" : ""}>
          <div className={`card-lift group rounded-images p-5 md:p-8 ${toneClass[f.tone]}`}>
            <AppWindow className="h-96 transition-transform duration-700 ease-out group-hover:scale-[1.02]">
              <Screen />
            </AppWindow>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

export function FeatureRows() {
  return (
    <>
      {features.items.map((f, i) => (
        <FeatureRow key={f.id} f={f} i={i} />
      ))}
    </>
  );
}

export function FeaturesNote() {
  return (
    <Container className="pb-section-sm text-center">
      <p className="text-caption text-graphite-text">{features.note}</p>
      <div className="mt-8">
        <Button variant="ghost" href={featuresPage.moreHref} className="px-6 py-2.5">
          {featuresPage.moreLabel} →
        </Button>
      </div>
    </Container>
  );
}
