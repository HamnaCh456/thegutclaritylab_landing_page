import type { ComponentType, SVGProps } from "react";
import { freeCta, type StatIcon } from "@/content/freeCta";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Bolt, CheckCircle, Gift } from "@/components/icons";

const statIcons: Record<StatIcon, ComponentType<SVGProps<SVGSVGElement>>> = { bolt: Bolt, gift: Gift };

export function FreeCta() {
  return (
    <section
      id="get-started"
      aria-labelledby="free-title"
      className="bg-mint-glow py-section-sm md:py-section lg:py-section-lg"
    >
      <Container className="text-center">
        <h2 id="free-title" className="mx-auto max-w-2xl text-heading font-medium md:text-heading-lg">
          {freeCta.headline.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </h2>

        <ul className="mt-10 flex flex-wrap justify-center gap-8">
          {freeCta.stats.map((s) => {
            const Icon = statIcons[s.icon];
            return (
              <li key={s.label} className="flex items-center gap-3 text-left text-subheading text-graphite-text">
                <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-pills bg-paper-white text-vivid-leaf">
                  <Icon className="h-7 w-7" />
                </span>
                <span className="max-w-48">{s.label}</span>
              </li>
            );
          })}
        </ul>

        <div className="card-lift mx-auto mt-10 max-w-3xl rounded-images bg-paper-white p-8 text-left md:p-10">
          <ul className="space-y-4">
            {freeCta.bullets.map((b) => (
              <li key={b} className="flex items-center gap-3 text-subheading">
                <CheckCircle className="h-6 w-6 shrink-0 text-bright-sprout" />
                {b}
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <Button full href={freeCta.cta.href}>
              {freeCta.cta.label}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
