import { journey } from "@/content/journey";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Words, seq } from "@/components/ui/Words";
import { Laurel } from "@/components/icons";

export function Journey() {
  return (
    <section id="journey" aria-labelledby="journey-title" className="py-section-sm md:py-section">
      <Container className="text-center">
        <Reveal>
          <h2 id="journey-title" className="text-heading font-medium md:text-heading-lg">
            <Words text={journey.headline} />
          </h2>
          <p className="stagger-item mx-auto mt-4 max-w-2xl text-subheading text-graphite-text" style={seq(0, { "--base": "350ms" })}>
            {journey.subheadline}
          </p>
        </Reveal>

        <ol className="mt-14 grid gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {journey.stages.map((s, i) => (
            <li key={s.title}>
              <Reveal delay={i * 140} className="group flex flex-col items-center">
                <div className="flex items-center justify-center gap-1 transition-transform duration-500 ease-out group-hover:-translate-y-1">
                  <Laurel grow className="sway h-28 w-auto shrink-0 text-vivid-leaf" />
                  <div className="w-40">
                    <p className="text-caption uppercase tracking-wide text-graphite-text">
                      {journey.stageLabel} {s.n}
                    </p>
                    <p className="mt-1 text-heading-sm font-bold">{s.title}</p>
                    <p className="mt-1 text-body font-medium text-forest-floor">{s.weeks}</p>
                  </div>
                  <Laurel grow flip className="sway h-28 w-auto shrink-0 text-vivid-leaf [animation-delay:-3s]" />
                </div>
                <p className="mt-4 max-w-64 text-legal text-graphite-text">{s.body}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
