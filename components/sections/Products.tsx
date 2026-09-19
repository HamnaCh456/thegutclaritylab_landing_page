import { products } from "@/content/products";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Chevron } from "@/components/icons";

const tilt = ["lg:-rotate-3", "", "lg:rotate-3"];
const tierTone = ["bg-mint-wash text-deep-moss", "bg-apricot-cream text-warm-putty", "bg-sandstone/40 text-warm-putty", "bg-forest-floor text-paper-white"];

function Tiers({ tiers }: { tiers: string[] }) {
  return (
    <ol className="flex h-full flex-col justify-center gap-2">
      {tiers.map((t, i) => (
        <li key={t} className="flex items-center gap-2">
          {i > 0 && <Chevron className="ml-3 h-4 w-4 shrink-0 -rotate-90 text-graphite-text" />}
          <span className={`flex-1 rounded-cards px-4 py-2 text-body font-medium ${tierTone[i] ?? tierTone[0]}`}>
            <span className="mr-2 text-caption opacity-70">{String(i + 1).padStart(2, "0")}</span>
            {t}
          </span>
        </li>
      ))}
    </ol>
  );
}

export function Products() {
  return (
    <section id="paths" aria-labelledby="products-title" className="overflow-hidden py-section-sm md:py-section">
      <Container>
        <h2 id="products-title" className="mx-auto max-w-2xl text-center text-heading font-medium md:text-heading-lg">
          {products.headline.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </h2>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {products.items.map((p, i) => (
            <Reveal key={p.title} delay={i * 100} className={`card-lift rounded-images bg-paper-white p-6 shadow-md ${tilt[i]}`}>
              <div className="h-56 rounded-cards bg-pale-stone p-5">
                <Tiers tiers={p.tiers} />
              </div>
              <h3 className="mt-6 text-heading-sm font-semibold">{p.title}</h3>
              <p className="mt-2 text-body text-graphite-text">{p.body}</p>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
