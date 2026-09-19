import Image from "next/image";
import { testimonials, type PortraitCard, type ReviewCard } from "@/content/testimonials";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Play, Stars } from "@/components/icons";

function Review({ card }: { card: ReviewCard }) {
  return (
    <article className="flex flex-col rounded-images bg-paper-white p-6 shadow-md">
      <div className="flex items-center gap-2">
        {card.stars && <Stars className="h-5 w-auto" />}
        <span className="text-body font-medium text-forest-floor">{card.eyebrow}</span>
      </div>
      <h3 className="mt-3 text-heading-sm font-semibold">
        {card.href ? <a href={card.href}>{card.title}</a> : card.title}
      </h3>
      <p className={`mt-4 text-body text-graphite-text ${card.href ? "line-clamp-6" : ""}`}>{card.body}</p>
      {card.href && (
        <a
          href={card.href}
          className="mt-6 inline-flex w-fit rounded-cards bg-pale-stone px-5 py-2 text-body font-medium text-ink-black"
        >
          {testimonials.readMore}
        </a>
      )}
    </article>
  );
}

function Portrait({ card }: { card: PortraitCard }) {
  return (
    <figure className="relative aspect-[3/4] overflow-hidden rounded-images bg-apricot-cream">
      <Image
        src={card.image}
        alt={card.name}
        fill
        sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
        className="object-cover object-top"
      />
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-ink-black/70 to-transparent" />
      <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5 text-paper-white">
        <div>
          <p className="text-heading-sm font-semibold leading-tight">{card.quote}</p>
          <p className="mt-3 text-body">
            {card.name} <span className="opacity-80">/ {card.role}</span>
          </p>
        </div>
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-pills bg-paper-white/90 text-ink-black">
          <Play className="h-5 w-5" />
        </span>
      </figcaption>
    </figure>
  );
}

export function Testimonials() {
  return (
    <section id="clients" aria-labelledby="love-title" className="py-section-sm md:py-section">
      <Container>
        <h2 id="love-title" className="text-heading font-medium md:text-heading-lg">
          {testimonials.headline}
        </h2>
        <div className="mt-10 grid grid-flow-dense gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {testimonials.cards.map((c) =>
            c.kind === "review" ? <Review key={c.title} card={c} /> : <Portrait key={c.name} card={c} />,
          )}
        </div>
        <div className="mt-12 text-center">
          <Button variant="ghost" href={testimonials.cta.href}>
            {testimonials.cta.label}
          </Button>
        </div>
      </Container>
    </section>
  );
}
