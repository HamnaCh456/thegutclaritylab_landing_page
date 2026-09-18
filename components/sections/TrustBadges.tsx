import Image from "next/image";
import { trust, type BadgeLogo } from "@/content/trust";
import { Container } from "@/components/ui/Container";
import { Laurel, Stars, TrustStar } from "@/components/icons";

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

        <div className="mt-10 grid gap-10 md:grid-cols-3">
          {trust.badges.map((b) => (
            <a key={b.descriptor} href={b.href} className="flex items-center justify-center gap-2">
              <Laurel className="h-40 w-auto text-vivid-leaf" />
              <div className="w-44">
                <p className="text-heading font-bold">{b.title}</p>
                <p className="mt-1 text-subheading text-graphite-text">{b.descriptor}</p>
                <div className="mt-4 flex justify-center">
                  <Logo logo={b.logo} />
                </div>
              </div>
              <Laurel flip className="h-40 w-auto text-vivid-leaf" />
            </a>
          ))}
        </div>

        <p className="mx-auto mt-12 max-w-2xl text-body text-graphite-text">{trust.disclaimer}</p>
      </Container>
    </section>
  );
}
