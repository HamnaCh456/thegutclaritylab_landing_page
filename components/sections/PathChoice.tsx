import { pathChoice } from "@/content/client";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { CheckCircle } from "@/components/icons";
import { Words, seq } from "@/components/ui/Words";

// One primary action per pair: the self-guided path leads, the practitioner path is the ghost.
const look = [
  { card: "bg-pale-stone", variant: "primary" },
  { card: "bg-apricot-cream", variant: "ghost" },
] as const;

export function PathChoice() {
  return (
    <section id="paths" aria-labelledby="paths-title" className="py-section-sm md:py-section">
      <Container>
        <Reveal className="text-center">
          <p className="text-legal font-medium text-forest-floor">{pathChoice.eyebrow}</p>
          <h2 id="paths-title" className="mx-auto mt-3 max-w-2xl text-heading font-medium md:text-heading-lg">
            <Words text={pathChoice.headline} />
          </h2>
          <p className="stagger-item mx-auto mt-4 max-w-2xl text-subheading text-graphite-text" style={seq(0, { "--base": "350ms" })}>
            {pathChoice.lead}
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {pathChoice.paths.map((p, i) => (
            <Reveal key={p.id} delay={i * 120} variant="scale" className="flex">
              <article
                aria-labelledby={`path-${p.id}`}
                className={`card-lift flex w-full flex-col rounded-images p-6 md:p-8 ${look[i].card}`}
              >
                <p className="text-caption uppercase tracking-wide text-graphite-text">{p.label}</p>
                <h3 id={`path-${p.id}`} className="mt-3 text-heading-sm font-semibold">
                  {p.title}
                </h3>
                <p className="mt-3 text-body text-graphite-text">{p.body}</p>
                <ul className="mt-6 flex-1 space-y-3">
                  {p.points.map((x, j) => (
                    <li key={x} className="stagger-item flex gap-3" style={seq(j, { "--step": "90ms", "--base": "350ms" })}>
                      <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-bright-sprout" />
                      <span className="text-body">{x}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8">
                  <Button variant={look[i].variant} href={p.cta.href} className="px-6 py-2.5">
                    {p.cta.label} →
                  </Button>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
        <p className="mt-6 text-center text-legal font-medium text-deep-moss">{pathChoice.note}</p>
      </Container>
    </section>
  );
}
