import Image from "next/image";
import { results, sage, type Point } from "@/content/sage";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { CheckCircle } from "@/components/icons";
import { Words, seq } from "@/components/ui/Words";
import { AppWindow } from "@/components/app/AppWindow";
import { SageChatScreen } from "@/components/app/screens";

// Compact list shared by both sections: icon, short title, one plain line.
function Points({ items }: { items: Point[] }) {
  return (
    <ul className="mt-6 space-y-4">
      {items.map((pt, i) => (
        <li key={pt.title} className="stagger-item flex gap-3" style={seq(i, { "--step": "110ms", "--base": "300ms" })}>
          <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-bright-sprout" />
          <div>
            <p className="text-body font-semibold">{pt.title}</p>
            <p className="text-legal text-graphite-text">{pt.body}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}

export function SageSection() {
  return (
    <section id="sage" aria-labelledby="sage-title" className="py-section-sm md:py-section">
      <Container className="grid gap-10 lg:grid-cols-[2fr_3fr] lg:items-center lg:gap-14">
        <Reveal variant="left">
          <p className="inline-flex items-center gap-2 text-legal font-medium text-forest-floor">
            <Image src="/app/sage.svg" alt="" width={24} height={24} className="h-6 w-6 motion-safe:animate-float" />
            {sage.eyebrow}
          </p>
          <h2 id="sage-title" className="mt-3 text-heading-sm font-medium md:text-heading">
            <Words text={sage.headline} />
          </h2>
          <p className="mt-3 text-body text-graphite-text">{sage.lead}</p>
          <Points items={sage.points} />
          <p className="mt-6 text-legal font-medium text-deep-moss">{sage.callout}</p>
        </Reveal>
        <Reveal delay={120} variant="scale">
          <AppWindow withSidebar active="sage" className="lg:h-[548px]">
            <SageChatScreen />
          </AppWindow>
        </Reveal>
      </Container>
    </section>
  );
}

export function ResultsSection() {
  return (
    <section aria-labelledby="results-title" className="bg-apricot-cream/50 py-section-sm md:py-section">
      <Container className="grid gap-10 lg:grid-cols-[3fr_2fr] lg:items-center lg:gap-14">
        <Reveal variant="right" className="lg:order-2">
          <p className="text-legal font-medium text-warm-putty">{results.eyebrow}</p>
          <h2 id="results-title" className="mt-3 text-heading-sm font-medium md:text-heading">
            <Words text={results.headline} />
          </h2>
          <p className="mt-3 text-body text-graphite-text">{results.intro}</p>
          <Points items={results.points} />
          <p className="mt-6 text-legal font-medium text-warm-putty">{results.note}</p>
        </Reveal>
        <Reveal delay={120} variant="scale" className="lg:order-1">
          <AppWindow>
            <p className="font-app-serif text-[20px] leading-tight">{results.guideTitle}</p>
            <div className="mt-3 space-y-2">
              {results.guideImages.map((img, i) => (
                <Image
                  style={seq(i, { "--step": "180ms", "--base": "450ms" })}
                  key={img.src}
                  src={img.src}
                  alt=""
                  width={img.w}
                  height={img.h}
                  sizes="(min-width: 1024px) 680px, 100vw"
                  className="stagger-item w-full rounded-[10px] border border-app-border2"
                />
              ))}
            </div>
          </AppWindow>
          <p className="mt-3 text-center text-caption text-graphite-text">{results.guideNote}</p>
        </Reveal>
      </Container>
    </section>
  );
}
