import { promise } from "@/content/promise";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Words, seq } from "@/components/ui/Words";
import { CheckCircle } from "@/components/icons";

export function PromiseBand() {
  return (
    <section aria-labelledby="promise-title" className="bg-pale-stone py-section-sm md:py-section lg:py-section-lg">
      <Container className="grid gap-12 lg:grid-cols-2 lg:items-center">
        <Reveal variant="left">
          <h2 id="promise-title" className="text-heading font-medium md:text-heading-lg">
            <Words text={promise.headline} />
          </h2>
          <div className="mt-6 space-y-3 text-subheading text-graphite-text">
            {promise.body.map((p, i) => (
              <p key={p} className="stagger-item" style={seq(i, { "--base": "400ms" })}>
                {p}
              </p>
            ))}
          </div>
          <p className="mt-8 text-heading-sm font-semibold">
            {promise.closing.map((c, i) => (
              <span key={c} className="stagger-item block" style={seq(promise.body.length + i, { "--base": "400ms" })}>
                {c}
              </span>
            ))}
          </p>
        </Reveal>

        <Reveal delay={120} variant="scale" className="rounded-images bg-paper-white p-8 md:p-10">
          <p className="text-heading-sm font-semibold">{promise.learnLabel}</p>
          <ul className="mt-6 space-y-4">
            {promise.learn.map((l, i) => (
              <li key={l} className="stagger-item flex items-center gap-3 text-subheading" style={seq(i, { "--step": "120ms", "--base": "350ms" })}>
                <CheckCircle className="h-6 w-6 shrink-0 text-bright-sprout" />
                {l}
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
