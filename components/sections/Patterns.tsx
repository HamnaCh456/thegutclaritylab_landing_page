import { patterns } from "@/content/client";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Words } from "@/components/ui/Words";
import { AppWindow } from "@/components/app/AppWindow";
import { PatternsScreen } from "@/components/app/screens";
import { Points } from "@/components/sections/Showcase";

export function Patterns() {
  return (
    <section id="patterns" aria-labelledby="patterns-title" className="py-section-sm md:py-section">
      <Container className="grid gap-10 lg:grid-cols-[2fr_3fr] lg:items-center lg:gap-14">
        <Reveal variant="left">
          <p className="text-legal font-medium text-forest-floor">{patterns.eyebrow}</p>
          <h2 id="patterns-title" className="mt-3 text-heading-sm font-medium md:text-heading">
            <Words text={patterns.headline} />
          </h2>
          <p className="mt-3 text-body text-graphite-text">{patterns.lead}</p>
          <Points items={patterns.points} />
          <p className="mt-6 text-legal font-medium text-deep-moss">{patterns.note}</p>
        </Reveal>
        <Reveal delay={120} variant="scale">
          <AppWindow withSidebar active="today">
            <PatternsScreen />
          </AppWindow>
        </Reveal>
      </Container>
    </section>
  );
}
