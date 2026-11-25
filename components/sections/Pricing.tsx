"use client";

import { useState, type CSSProperties } from "react";
import { pricing, pricingBenefits, pricingQuestions, type Tier } from "@/content/pricing";
import { site } from "@/content/site";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { Words, seq } from "@/components/ui/Words";
import { Check } from "@/components/icons";
import { PricingCounter } from "./PricingCounter";
import "./Pricing.css";

function TierCard({ t, i, selected, onSelect }: {
  t: Tier; i: number; selected: boolean; onSelect: () => void;
}) {
  return (
    <Reveal delay={i * 120} variant="scale" className="flex">
      <article aria-labelledby={`${t.id}-name`}
        className={`plan-card flex w-full flex-col ${selected ? "chosen" : ""}`}
        onClick={(event) => { if (!(event.target as HTMLElement).closest("a")) onSelect(); }}>
        <h2 id={`${t.id}-name`} className="text-heading-sm font-semibold">
          <button className="plan-choice" type="button" aria-pressed={selected}
            aria-label={`Select ${t.name} for comparison`} onClick={onSelect}>
            <span>{t.name}</span>
          </button>
        </h2>
        <p className="mt-2 text-body text-graphite-text">{t.blurb}</p>
        <p className="animated-price mt-6 font-display font-medium">
          <span className="sr-only">{t.price.slice(1)} US dollars per month</span>
          <span aria-hidden="true">$</span><PricingCounter value={Number(t.price.slice(1))} />
        </p>
        <p className="text-legal text-graphite-text">{pricing.priceNote}</p>
        <a href={t.cta.href} aria-label={`Request ${t.name} access`}
          className={`mt-6 inline-flex w-full items-center justify-center rounded-buttons px-6 py-2.5 text-body font-medium ${t.featured ? "bg-forest-floor text-paper-white" : "border text-ink-black"}`}>
          {t.cta.label}
        </a>
        <div className="flex-1 border-t">
          <p className="text-legal font-semibold">{t.featuresLabel}</p>
          <ul className="mt-4 space-y-3">
            {t.features.map((feature, j) => (
              <li key={feature} className="stagger-item flex gap-3" style={seq(j)}>
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-forest-floor" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </article>
    </Reveal>
  );
}

function IncludedFeatures() {
  return (
    <Reveal>
      <section className="signature" aria-labelledby="signature-title">
        <h2 id="signature-title" className="eyebrow">On every plan</h2>
        <div className="benefits" role="region" aria-label="Features included on every plan" tabIndex={0} data-lenis-prevent>
          {pricingBenefits.map((benefit, i) => (
            <div key={benefit.title} className="benefit">
              <span className="benefit-icon">
                <svg viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d={benefit.icon} />
                </svg>
              </span>
              <div className="benefit-copy">
                <h3>{i === 0 ? <><span className="sr-only">12</span><PricingCounter value={12} />-week journey</> : benefit.title}</h3>
                <p>{benefit.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </Reveal>
  );
}

function Cell({ value }: { value: boolean | string }) {
  if (typeof value === "string") return value;
  return <span className={value ? "yes" : "no"}>
    <span aria-hidden="true">{value ? "✓" : "—"}</span>
    <span className="sr-only">{value ? "Included" : "Not included"}</span>
  </span>;
}

function ComparePlans({ active, onSelect }: { active: number; onSelect: (index: number) => void }) {
  const [filter, setFilter] = useState("All features");
  const { tiers, compare } = pricing;
  const tier = tiers[active];
  return (
    <Reveal className="compare-section">
      <section id="compare" aria-labelledby="compare-title">
        <div className="compare-intro">
          <p className="eyebrow">Find your fit</p>
          <h2 id="compare-title">A closer look<br /><em>at each tier.</em></h2>
        </div>
        <div className="comparison" data-active-plan={active}>
          <div className="comparison-head" role="group" aria-label="Plan to compare">
            <div className="compare-caption">The details, side by side.</div>
            {tiers.map((plan, i) => (
              <button key={plan.id} type="button" className="compare-plan" aria-pressed={i === active} onClick={() => onSelect(i)}>
                <span>{plan.name}</span><strong>{plan.price}<small> / month</small></strong>
                <span className="compare-select">{i === active ? "Viewing this tier" : "View this tier"} <span aria-hidden="true">↗</span></span>
              </button>
            ))}
          </div>
          <div className="compare-filters" role="group" aria-label="Features to compare">
            {["All features", ...compare.groups.map(group => group.group)].map(name => (
              <button key={name} type="button" data-group={name} aria-pressed={filter === name} onClick={() => setFilter(name)}>{name}</button>
            ))}
          </div>
          <table className="comparison-body" aria-label="Plan features">
            <thead className="sr-only"><tr><th scope="col">Feature</th>{tiers.map((plan, i) => <th key={plan.id} scope="col" data-col={i}>{plan.name}</th>)}</tr></thead>
            {compare.groups.map(group => (
              <tbody key={group.group} className="compare-group" hidden={filter !== "All features" && filter !== group.group}>
                <tr><th className="compare-group-title" scope="colgroup" colSpan={4}>{group.group}</th></tr>
                {group.rows.map(row => (
                  <tr key={row.label} className="comparison-row">
                    <th scope="row" className="feature-label">{row.label}</th>
                    {row.values.map((value, i) => <td key={tiers[i].id} className="feature-value" data-col={i}><Cell value={value} /></td>)}
                  </tr>
                ))}
              </tbody>
            ))}
          </table>
          <div className="comparison-bottom">
            <span>All prices per month, billed in USD.</span>
            <a className="comparison-request" href={tier.cta.href}>Request {tier.name} access <span aria-hidden="true">↗</span></a>
          </div>
        </div>
      </section>
    </Reveal>
  );
}

function FaqItem({ item, index }: { item: typeof pricingQuestions[number]; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="faq-item">
      <h3><button className="faq-question" type="button" id={`q${index}`} aria-expanded={open} aria-controls={`a${index}`} onClick={() => setOpen(!open)}>
        {item.question}<span className="faq-plus" aria-hidden="true" />
      </button></h3>
      <div className="faq-answer" role="region" id={`a${index}`} aria-labelledby={`q${index}`} aria-hidden={!open} inert={!open} data-open={open}>
        <div><p>{item.answer}</p></div>
      </div>
    </div>
  );
}

export function PricingSection() {
  // No card is selected until requested; the comparison initially shows Practitioner.
  const [selected, setSelected] = useState<number | null>(null);
  return (
    <section aria-labelledby="pricing-title" className="pricing-page bg-mint-glow relative overflow-hidden">
      <div aria-hidden="true" className="absolute inset-0">
        <div className="blob left-[-10%] top-[-20%] h-[420px] w-[520px] bg-mint-wash" />
        <div className="blob right-[-8%] top-[10%] h-[380px] w-[460px] bg-apricot-cream" />
      </div>
      <Container className="pricing-content relative pb-section-sm text-center md:pb-section lg:pb-section-lg">
        <p className="load-in text-legal font-medium text-forest-floor" style={{ "--d": "100ms" } as CSSProperties}>{pricing.eyebrow}</p>
        <h1 id="pricing-title" className="words-load mx-auto mt-3 max-w-3xl text-display-split font-medium"><Words text={pricing.headline} /></h1>
        <p className="load-in mx-auto mt-6 max-w-2xl text-subheading text-graphite-text" style={{ "--d": "550ms" } as CSSProperties}>{pricing.lead}</p>
        <div className="plan-grid grid text-left md:grid-cols-2 lg:grid-cols-3">
          {pricing.tiers.map((tier, i) => <TierCard key={tier.id} t={tier} i={i} selected={selected === i} onSelect={() => setSelected(i)} />)}
        </div>
        <Reveal className="mx-auto mt-10 flex max-w-2xl flex-col items-center gap-4">
          <p className="text-body text-graphite-text">{pricing.access.body}</p>
          <Button variant="ghost" href={pricing.access.walkthrough.href} className="px-6 py-2.5">{pricing.access.walkthrough.label}</Button>
        </Reveal>
        <IncludedFeatures />
        <ComparePlans active={selected ?? 0} onSelect={setSelected} />
        <Reveal>
          <section id="faq" className="faq-section" aria-labelledby="faq-title">
            <div className="faq-heading">
              <p className="eyebrow">A little more clarity</p>
              <h2 id="faq-title">Your questions,<br />answered.</h2>
              <p>The details that help you choose the right fit for your practice.</p>
              <a href={site.mail("GCL pricing question")}>Ask us a question ↗</a>
            </div>
            <div className="faq-list">{pricingQuestions.map((item, i) => <FaqItem key={item.question} item={item} index={i} />)}</div>
          </section>
        </Reveal>
        <Reveal>
          <section className="closing" aria-labelledby="closing-title">
            <h2 id="closing-title">See how it fits<br /><em>your practice.</em></h2>
            <p>Take a walkthrough before choosing your tier.</p>
            <a href={site.walkthrough}>Book a walkthrough ↗</a>
          </section>
        </Reveal>
      </Container>
    </section>
  );
}
