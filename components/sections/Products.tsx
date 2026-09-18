import Image from "next/image";
import { products } from "@/content/products";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

const tilt = ["lg:-rotate-3", "", "lg:rotate-3"];

export function Products() {
  return (
    <section aria-labelledby="products-title" className="overflow-hidden py-section-sm md:py-section">
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
            <Reveal key={p.title} className={`rounded-images bg-paper-white p-6 shadow-md ${tilt[i]}`}>
              <div className="overflow-hidden rounded-cards bg-pale-stone">
                <Image src={p.image} alt="" width={720} height={568} className="h-auto w-full" />
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
