import Image from "next/image";
import { anu } from "@/content/anu";
import { calm, finalCta } from "@/content/cta";
import { nav, type Audience } from "@/content/nav";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Laurel } from "@/components/icons";
import { Words, seq } from "@/components/ui/Words";

export function Calm() {
  return (
    <section aria-labelledby="calm-title" className="py-section-sm md:py-section lg:py-section-lg">
      <Container className="text-center">
        <Reveal>
          <h2 id="calm-title" className="mx-auto max-w-3xl text-heading font-medium md:text-heading-lg">
            <Words text={calm.headline} />
          </h2>
          <p className="stagger-item mt-6 text-subheading text-graphite-text" style={seq(0, { "--base": "400ms" })}>
            {calm.lead}
          </p>
          <div className="mt-8 flex items-center justify-center gap-4">
            <Laurel grow className="sway hidden h-44 w-auto text-vivid-leaf sm:block" />
            <p className="text-heading font-semibold text-forest-floor md:text-heading-lg">
              {calm.principle.map((p, i) => (
                <span key={p} className="stagger-item block" style={seq(i, { "--step": "160ms", "--base": "600ms" })}>
                  {p}
                </span>
              ))}
            </p>
            <Laurel grow flip className="sway hidden h-44 w-auto text-vivid-leaf sm:block [animation-delay:-3s]" />
          </div>
          <div className="mx-auto mt-8 max-w-2xl space-y-3 text-subheading text-graphite-text">
            {calm.body.map((p, i) => (
              <p key={p} className="stagger-item" style={seq(i, { "--step": "120ms", "--base": "900ms" })}>
                {p}
              </p>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

export function AboutAnu({ audience = "client" }: { audience?: Audience }) {
  const copy = anu.copy[audience];
  return (
    <section id="anu" aria-labelledby="anu-title" className="bg-pale-stone py-section-sm md:py-section">
      <Container>
        <Reveal variant="scale" className="mx-auto grid max-w-3xl gap-6 rounded-images bg-paper-white p-6 md:p-8 sm:grid-cols-[auto_1fr] sm:items-center sm:gap-8">
          <div className="flex flex-col items-center text-center">
            <div className="flex items-center gap-1">
              <Laurel grow className="sway h-20 w-auto text-vivid-leaf" />
              <Image
                src={anu.photo}
                alt={anu.name}
                width={64}
                height={64}
                className="stagger-item h-16 w-16 rounded-full object-cover transition-transform duration-500 hover:scale-105"
                style={seq(0, { "--base": "250ms" })}
              />
              <Laurel grow flip className="sway h-20 w-auto text-vivid-leaf [animation-delay:-3s]" />
            </div>
            <a
              href={anu.href}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 text-body font-semibold text-forest-floor underline decoration-vivid-leaf underline-offset-4 transition-colors hover:text-deep-moss"
            >
              {anu.name} ↗
            </a>
            <p className="mt-1 max-w-52 text-legal text-graphite-text">{anu.role}</p>
          </div>
          <div>
            <p className="text-legal font-medium text-forest-floor">{copy.eyebrow}</p>
            <h2 id="anu-title" className="mt-2 text-subheading font-medium md:text-heading-sm">
              <Words text={copy.headline} />
            </h2>
            <div className="mt-3 space-y-2 text-legal text-graphite-text md:text-body">
              {anu.bio.map((p, i) => (
                <p key={p} className="stagger-item" style={seq(i, { "--step": "110ms", "--base": "450ms" })}>
                  {p}
                </p>
              ))}
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

type CtaCopy = { headline: string; body: string; primary: { label: string; href: string }; secondary: { label: string; href: string } };

export function FinalCta({ copy = finalCta }: { copy?: CtaCopy }) {
  return (
    <section
      id="start"
      aria-labelledby="start-title"
      className="bg-mint-glow relative overflow-hidden py-section-sm md:py-section lg:py-section-lg"
    >
      <div aria-hidden="true" className="absolute inset-0">
        <div className="blob left-[5%] top-[10%] h-[320px] w-[420px] bg-mint-wash" />
        <div className="blob right-[5%] bottom-0 h-[300px] w-[380px] bg-apricot-cream [animation-delay:-11s]" />
      </div>
      <Container className="relative text-center">
        <Reveal>
          <Image src={nav.logo} alt="" width={72} height={72} className="mx-auto h-18 w-18 mix-blend-multiply motion-safe:animate-float" />
          <h2 id="start-title" className="mx-auto mt-6 max-w-2xl text-heading font-medium md:text-heading-lg">
            <Words text={copy.headline} />
          </h2>
          <p className="stagger-item mx-auto mt-4 max-w-xl text-subheading text-graphite-text" style={seq(0, { "--base": "400ms" })}>
            {copy.body}
          </p>
          <div className="stagger-item mt-10 flex flex-wrap justify-center gap-3" style={seq(1, { "--base": "400ms" })}>
          <Button href={copy.primary.href} className="px-6 py-2.5">
            {copy.primary.label}
          </Button>
          <Button variant="ghost" href={copy.secondary.href} className="px-6 py-2.5">
            {copy.secondary.label}
          </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
