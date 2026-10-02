import type { CSSProperties } from "react";
import { pricing, type Tier } from "@/content/pricing";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { Words, seq } from "@/components/ui/Words";
import { Check, Minus } from "@/components/icons";

function TierCard({ t, i }: { t: Tier; i: number }) {
  return (
    <Reveal delay={i * 120} variant="scale" className="flex">
      <article
        aria-labelledby={`${t.id}-name`}
        className={`card-lift flex w-full flex-col rounded-images bg-paper-white p-6 md:p-8 ${
          t.featured ? "border-2 border-forest-floor shadow-lg" : "border border-soft-mist"
        }`}
      >
        <h2 id={`${t.id}-name`} className="text-heading-sm font-semibold">
          {t.name}
        </h2>
        <p className="mt-2 text-body text-graphite-text md:min-h-[2lh]">{t.blurb}</p>

        <p className="mt-6 font-display text-display font-medium">{t.price}</p>
        <p className="text-legal text-graphite-text">{pricing.priceNote}</p>

        <Button href={t.cta.href} full variant={t.featured ? "primary" : "ghost"} className="mt-6 px-6 py-2.5">
          {t.cta.label}
        </Button>

        <div className="mt-8 flex-1 border-t border-soft-mist pt-6">
          <p className="text-legal font-semibold">{t.featuresLabel}</p>
          <ul className="mt-4 space-y-3">
            {t.features.map((x, j) => (
              <li key={x} className="stagger-item flex gap-3" style={seq(j, { "--step": "70ms", "--base": "350ms" })}>
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-forest-floor" />
                <span className="text-body">{x}</span>
              </li>
            ))}
          </ul>
        </div>
      </article>
    </Reveal>
  );
}

function Cell({ v }: { v: boolean | string }) {
  if (typeof v === "string") return <span className="text-legal font-medium">{v}</span>;
  return v ? (
    <>
      <Check className="mx-auto h-5 w-5 text-forest-floor" />
      <span className="sr-only">Included</span>
    </>
  ) : (
    <>
      <Minus className="mx-auto h-5 w-5 text-soft-mist" />
      <span className="sr-only">Not included</span>
    </>
  );
}

function CompareTable() {
  const { compare, tiers } = pricing;
  return (
    <Reveal className="mt-20 text-left md:mt-28">
      <h2 id="compare-title" className="text-center text-heading font-medium">
        {compare.title}
      </h2>
      <div className="mt-10 overflow-x-auto rounded-images border border-soft-mist bg-paper-white">
        <table aria-labelledby="compare-title" className="w-full min-w-[560px] border-collapse">
          <thead>
            <tr className="border-b border-soft-mist">
              <th scope="col" className="w-2/5 p-4 text-left md:p-5">
                <span className="sr-only">Feature</span>
              </th>
              {tiers.map((t) => (
                <th key={t.id} scope="col" className="p-4 text-center align-bottom md:p-5">
                  <span className="block text-body font-semibold">{t.name}</span>
                  <span className="block text-legal font-normal text-graphite-text">{t.price}/mo</span>
                </th>
              ))}
            </tr>
          </thead>
          {compare.groups.map((g) => (
            <tbody key={g.group}>
              <tr>
                <th colSpan={4} scope="colgroup" className="bg-pale-stone px-4 py-3 text-left text-legal font-semibold md:px-5">
                  {g.group}
                </th>
              </tr>
              {g.rows.map((r) => (
                <tr key={r.label} className="border-t border-soft-mist">
                  <th scope="row" className="p-4 text-left text-legal font-normal text-ink-black md:px-5 md:text-body">
                    {r.label}
                  </th>
                  {r.values.map((v, k) => (
                    <td key={tiers[k].id} className="p-4 text-center md:px-5">
                      <Cell v={v} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          ))}
        </table>
      </div>
    </Reveal>
  );
}

export function PricingSection() {
  return (
    <section aria-labelledby="pricing-title" className="bg-mint-glow relative overflow-hidden">
      <div aria-hidden="true" className="absolute inset-0">
        <div className="blob left-[-10%] top-[-20%] h-[420px] w-[520px] bg-mint-wash" />
        <div className="blob right-[-8%] top-[10%] h-[380px] w-[460px] bg-apricot-cream [animation-delay:-8s]" />
      </div>
      <Container className="relative pt-14 pb-section-sm text-center md:pt-20 md:pb-section lg:pb-section-lg">
        <p className="load-in text-legal font-medium text-forest-floor" style={{ "--d": "100ms" } as CSSProperties}>
          {pricing.eyebrow}
        </p>
        <h1 id="pricing-title" className="words-load mx-auto mt-3 max-w-3xl text-display-split font-medium">
          <Words text={pricing.headline} />
        </h1>
        <p className="load-in mx-auto mt-6 max-w-2xl text-subheading text-graphite-text" style={{ "--d": "550ms" } as CSSProperties}>
          {pricing.lead}
        </p>

        <div className="mt-12 grid gap-6 text-left md:mt-16 md:grid-cols-2 lg:grid-cols-3">
          {pricing.tiers.map((t, i) => (
            <TierCard key={t.id} t={t} i={i} />
          ))}
        </div>

        <CompareTable />
      </Container>
    </section>
  );
}
