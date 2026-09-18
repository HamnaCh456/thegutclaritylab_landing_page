import { faq } from "@/content/faq";
import { Container } from "@/components/ui/Container";
import { Chevron } from "@/components/icons";

export function Faq() {
  return (
    <section aria-labelledby="faq-title" className="py-section-sm md:py-section">
      <Container>
        <div className="mx-auto max-w-3xl">
          <h2 id="faq-title" className="text-center text-heading font-medium">
            {faq.headline}
          </h2>
          <div className="mt-10 divide-y divide-soft-mist border-y border-soft-mist">
            {faq.items.map((item, i) => (
              <details key={item.q} open={i === 0} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-subheading font-medium">
                  <span>{item.q}</span>
                  <Chevron className="h-5 w-5 shrink-0 transition-transform group-open:rotate-180" />
                </summary>
                <div className="mt-4 space-y-4 text-body text-graphite-text">
                  {item.a.map((p) => (
                    <p key={p}>{p}</p>
                  ))}
                </div>
              </details>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
