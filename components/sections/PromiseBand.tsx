import { promise } from "@/content/promise";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

export function PromiseBand() {
  return (
    <section aria-labelledby="promise-title" className="py-section-sm md:py-section lg:py-section-lg">
      <Container className="text-center">
        <Reveal>
          <h2 id="promise-title" className="mx-auto max-w-3xl text-heading font-medium md:text-heading-lg">
            {promise.headline.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h2>
        </Reveal>

        <div className="mx-auto mt-12 max-w-2xl">
          <h3 className="text-heading-sm font-semibold">{promise.subheadline}</h3>
          <p className="mt-3 text-subheading text-graphite-text">{promise.body}</p>
        </div>

        <div className="mx-auto mt-14 max-w-3xl rounded-images border border-soft-mist p-8 md:p-10">
          <p className="text-heading-sm font-semibold">{promise.madeFor.title}</p>
          <p className="mt-1 text-body text-graphite-text">{promise.madeFor.tagline}</p>
          <ul className="mt-6 flex flex-wrap justify-center gap-3">
            {promise.madeFor.pills.map((pill) => (
              <li key={pill} className="rounded-pills bg-mint-wash px-5 py-2 text-body font-medium text-deep-moss">
                {pill}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
