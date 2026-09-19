import { moneyMap, type Tone } from "@/content/moneyMap";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Leaf } from "@/components/icons";

const tone: Record<Tone, string> = {
  cream: "bg-apricot-cream text-warm-putty",
  sand: "bg-sandstone/40 text-warm-putty",
  mint: "bg-mint-wash text-deep-moss",
  stone: "border border-sandstone bg-paper-white text-ink-black",
};

export function MoneyMapMock() {
  return (
    <section aria-labelledby="map-title" className="bg-apricot-cream py-section-sm md:py-section">
      <Container>
        <Reveal className="mx-auto max-w-sm">
          <div className="rounded-phone border-4 border-ink-black bg-pale-stone p-6 text-center">
            <Leaf className="mx-auto h-5 w-5 text-forest-floor" />
            <h2 id="map-title" className="mt-3 text-heading-sm font-semibold">
              {moneyMap.title}
            </h2>
            <p className="mt-1 text-caption uppercase tracking-wide text-graphite-text">{moneyMap.subtitle}</p>

            <div className={`mx-auto mt-5 inline-block rounded-cards px-4 py-2 ${tone.cream}`}>
              <p className="text-caption">{moneyMap.income.label}</p>
              <p className="text-body font-semibold">{moneyMap.income.amount}</p>
            </div>
            <div aria-hidden="true" className="mx-auto h-5 w-px bg-sandstone" />

            <div className="grid grid-cols-3 gap-2">
              {moneyMap.split.map((s) => (
                <div key={s.label} className={`rounded-cards px-2 py-2 ${tone[s.tone]}`}>
                  <p className="text-caption">{s.label}</p>
                  <p className="text-body font-semibold">{s.amount}</p>
                </div>
              ))}
            </div>

            <p className="mt-6 text-caption uppercase tracking-wide text-graphite-text">{moneyMap.goalsHeading}</p>
            <ul className="mt-2 space-y-2 text-left">
              {moneyMap.goals.map((g) => (
                <li key={g.n} className="flex items-center justify-between gap-3 rounded-cards bg-paper-white px-3 py-2">
                  <span>
                    <span className="block text-caption uppercase text-graphite-text">{g.tag}</span>
                    <span className="text-body font-medium">{g.label}</span>
                  </span>
                  <span className="text-right">
                    <span className="block text-body font-semibold">{g.amount}</span>
                    <span className="text-caption uppercase text-graphite-text">{g.when}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <p className="mt-6 text-center text-body text-graphite-text">{moneyMap.footnote}</p>
        </Reveal>
      </Container>
    </section>
  );
}
