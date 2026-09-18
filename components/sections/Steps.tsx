import { steps } from "@/content/steps";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { StepArt } from "@/components/art/StepArt";

export function Steps() {
  return (
    <section aria-labelledby="steps-title" className="py-section-sm md:py-section">
      <Container className="grid gap-12 lg:grid-cols-[1fr_1.2fr]">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <h2 id="steps-title" className="text-heading font-medium md:text-heading-lg">
            <span className="block">{steps.headline}</span>
            {steps.subheadline.map((line) => (
              <span key={line} className="block text-graphite-text">
                {line}
              </span>
            ))}
          </h2>
          <div className="mt-8">
            <Button href={steps.cta.href}>{steps.cta.label}</Button>
          </div>
        </div>

        <ol className="relative space-y-8 lg:pl-16">
          <span aria-hidden="true" className="absolute left-5 top-0 hidden h-full w-0.5 bg-vivid-leaf lg:block" />
          {steps.items.map((s) => (
            <li key={s.n} className="relative">
              <span className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-pills bg-vivid-leaf text-body font-medium text-paper-white lg:absolute lg:-left-16 lg:top-10 lg:mb-0">
                {s.n}
              </span>
              <Reveal className="rounded-images border border-soft-mist bg-paper-white p-8 md:p-10">
                <div className="mx-auto h-44 max-w-xs">
                  <StepArt art={s.art} />
                </div>
                <h3 className="mt-6 text-heading-sm font-semibold">{s.title}</h3>
                <p className="mt-2 text-body text-graphite-text">{s.body}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
