import Image from "next/image";
import { trust, type BadgeLogo } from "@/content/trust";
import { Container } from "@/components/ui/Container";
import { Stars, TrustStar } from "@/components/icons";

function Logo({ logo }: { logo: BadgeLogo }) {
  if (logo.kind === "trustpilot") {
    return (
      <div className="flex flex-col items-center gap-1">
        <Stars className="h-5 w-auto" />
        <span className="inline-flex items-center gap-1 text-body font-semibold">
          <TrustStar className="h-4 w-4" />
          {logo.label}
        </span>
      </div>
    );
  }
  return <Image src={logo.src} alt={logo.alt} width={logo.width} height={logo.height} className="h-12 w-auto" />;
}

export function TrustBadges() {
  return (
    <section aria-labelledby="trust-title" className="py-section-sm md:py-section">
      <Container className="text-center">
        <p id="trust-title" className="text-subheading font-medium">
          {trust.eyebrow}
        </p>

        <div className="mx-auto mt-10 grid max-w-4xl divide-y divide-soft-mist md:grid-cols-3 md:divide-x md:divide-y-0">
          {trust.badges.map((b) => (
            <a
              key={b.descriptor}
              href={b.href}
              className="flex flex-col items-center gap-2 rounded-cards px-6 py-8 transition-colors hover:bg-pale-stone/60"
            >
              <span aria-hidden="true" className="h-2 w-2 rounded-pills bg-vivid-leaf" />
              <p className="text-heading font-medium tracking-tight md:text-heading-lg">{b.title}</p>
              <p className="text-subheading text-graphite-text">{b.descriptor}</p>
              {b.logo && (
                <div className="mt-2 flex justify-center">
                  <Logo logo={b.logo} />
                </div>
              )}
            </a>
          ))}
        </div>

        <p className="mx-auto mt-10 max-w-2xl text-legal text-graphite-text">{trust.disclaimer}</p>
      </Container>
    </section>
  );
}
