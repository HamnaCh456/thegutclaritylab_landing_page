import Image from "next/image";
import type { CSSProperties } from "react";
import { Words } from "@/components/ui/Words";
import { hero } from "@/content/hero";
import { nav } from "@/content/nav";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { HeroVideo } from "@/components/ui/HeroVideo";

// Word index where each headline line starts, so the rise runs continuously across lines.
const wordStarts = hero.headline.map((_, i) =>
  hero.headline.slice(0, i).reduce((n, l) => n + l.split(" ").length, 0),
);

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="bg-mint-glow relative overflow-hidden">
      <div aria-hidden="true" className="absolute inset-0">
        <div className="blob left-[-10%] top-[-10%] h-[420px] w-[520px] bg-mint-wash" />
        <div className="blob right-[-8%] top-[18%] h-[380px] w-[460px] bg-apricot-cream [animation-delay:-8s]" />
        <div className="blob left-[30%] top-[45%] h-[360px] w-[420px] bg-vivid-leaf/20 [animation-delay:-15s]" />
      </div>
      <Container className="relative pt-8 pb-section-sm text-center md:pt-10 lg:pt-10">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-14 lg:text-left">
          <div>
            <h1 id="hero-title" className="words-load mx-auto max-w-2xl text-display-split font-medium lg:mx-0">
              {hero.headline.map((line, i) => (
                <span key={line} className="block">
                  <Words text={line} start={wordStarts[i]} />
                </span>
              ))}
            </h1>

            <div
              className="load-in mx-auto mt-6 max-w-xl space-y-2 text-body text-graphite-text lg:mx-0"
              style={{ "--d": "550ms" } as CSSProperties}
            >
              {hero.subhead.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>

            <div
              className="load-in mt-8 flex flex-wrap justify-center gap-3 lg:justify-start"
              style={{ "--d": "700ms" } as CSSProperties}
            >
              <Button href={hero.primary.href} className="px-6 py-2.5">
                {hero.primary.label}
              </Button>
              <Button variant="ghost" href={hero.secondary.href} className="px-6 py-2.5">
                {hero.secondary.label}
              </Button>
            </div>

            <a
              href="#anu"
              className="load-in mt-6 inline-flex items-center gap-2 text-body font-medium text-graphite-text underline-offset-4 hover:text-ink-black hover:underline"
              style={{ "--d": "850ms" } as CSSProperties}
            >
              <Image src={nav.logo} alt="" width={24} height={24} className="h-6 w-6 mix-blend-multiply" />
              {hero.trustedLabel}
            </a>
          </div>

          <div className="load-in relative mx-auto w-full max-w-lg lg:max-w-none" style={{ "--d": "450ms" } as CSSProperties}>
            <HeroVideo />
          </div>
        </div>
      </Container>
    </section>
  );
}
