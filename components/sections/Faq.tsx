import { faq } from "@/content/faq";
import { Container } from "@/components/ui/Container";
import { Chevron } from "@/components/icons";

export function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="py-section-sm md:py-section">
      <Container>
        <div className="mx-auto max-w-3xl">
          <h2 id="faq-title" className="text-center text-heading font-medium">
            {faq.headline}
          </h2>
          <div className="mt-10 divide-y divide-soft-mist border-y border-soft-mist">
            {faq.items.map((item, i) => (
              <details key={item.q} open={i === 0} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-subheading font-medium transition-colors hover:text-forest-floor">
                  <span>{item.q}</span>
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-pills bg-pale-stone transition-transform group-open:rotate-180">
                    <Chevron className="h-4 w-4" />
                  </span>
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
