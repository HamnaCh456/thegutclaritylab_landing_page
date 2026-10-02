import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";
import { consultSage, context, practitionerHero, reports, sessions, toolkit, why } from "@/content/practitioner";
import { nav } from "@/content/nav";
import { Container } from "@/components/ui/Container";
import { HeroVideo } from "@/components/ui/HeroVideo";
import { LoopVideo } from "@/components/ui/LoopVideo";
import { FitScale } from "@/components/ui/FitScale";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Words, seq } from "@/components/ui/Words";
import { CheckCircle } from "@/components/icons";
import { AppWindow } from "@/components/app/AppWindow";
import { Points } from "@/components/sections/Showcase";
import { PractitionerSageScreen, WeeklySummaryScreen } from "@/components/app/practitionerScreens";

const accentStart = practitionerHero.headline.reduce((n, l) => n + l.split(" ").length, 0);

export function PractitionerHero() {
  const h = practitionerHero;
  return (
    <section aria-labelledby="pro-hero-title" className="bg-mint-glow relative overflow-hidden">
      <div aria-hidden="true" className="absolute inset-0">
        <div className="blob left-[-10%] top-[-10%] h-[420px] w-[520px] bg-mint-wash" />
        <div className="blob right-[-8%] top-[18%] h-[380px] w-[460px] bg-apricot-cream [animation-delay:-8s]" />
        <div className="blob left-[30%] top-[45%] h-[360px] w-[420px] bg-vivid-leaf/20 [animation-delay:-15s]" />
      </div>
      <Container className="relative pt-8 pb-section-sm text-center md:pt-10 lg:text-left">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-14">
          <div>
            <p className="load-in inline-flex items-center gap-2 rounded-pills bg-paper-white/80 px-3 py-1 text-legal font-semibold text-deep-moss shadow-sm">
              <Image src="/app/sage.svg" alt="" width={18} height={18} className="h-[18px] w-[18px]" />
              {h.eyebrow}
            </p>
            <h1 id="pro-hero-title" className="words-load mx-auto mt-5 max-w-2xl text-display-split font-medium lg:mx-0">
              {h.headline.map((line, i) => (
                <span key={line} className="block">
                  <Words text={line} start={i} />
                </span>
              ))}
              <span className="block italic text-forest-floor">
                <Words text={h.accent} start={accentStart} />
              </span>
            </h1>
            <p className="load-in mx-auto mt-6 max-w-xl text-body text-graphite-text lg:mx-0" style={{ "--d": "650ms" } as CSSProperties}>
              {h.subhead}
            </p>
            <div className="load-in mt-8 flex flex-wrap justify-center gap-3 lg:justify-start" style={{ "--d": "800ms" } as CSSProperties}>
              <Button href={h.primary.href} className="px-6 py-2.5">
                {h.primary.label}
              </Button>
              <Button variant="ghost" href={h.secondary.href} className="px-6 py-2.5">
                {h.secondary.label}
              </Button>
            </div>
            <ul
              className="load-in mt-8 flex flex-wrap justify-center gap-x-5 gap-y-2 text-legal font-medium text-graphite-text lg:justify-start"
              style={{ "--d": "950ms" } as CSSProperties}
            >
              {h.proof.map((p) => (
                <li key={p} className="flex items-center gap-1.5">
                  <CheckCircle className="h-4 w-4 text-bright-sprout" />
                  {p}
                </li>
              ))}
            </ul>
          </div>
          <div className="load-in relative mx-auto w-full max-w-lg lg:max-w-none" style={{ "--d": "450ms" } as CSSProperties}>
            <HeroVideo />
            {h.badges.map((b, i) => (
              <div
                key={b.label}
                aria-hidden="true"
                className={`absolute hidden items-center gap-2.5 rounded-cards bg-paper-white px-4 py-3 text-left shadow-md motion-safe:animate-float xl:flex ${
                  i === 0 ? "-left-10 bottom-12" : "-right-6 top-20 [animation-delay:-3.5s]"
                }`}
              >
                <CheckCircle className="h-5 w-5 shrink-0 text-bright-sprout" />
                <div>
                  <p className="text-caption uppercase tracking-wide text-graphite-text">{b.label}</p>
                  <p className="text-legal font-semibold">{b.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

// ---------- Full client context: four live sources wired into one record ----------

const statusTone = { amber: "bg-apricot-cream text-warm-putty", green: "bg-mint-wash text-deep-moss" } as const;

// Card position on the desktop diagram; below lg the cards sit in a plain grid.
const sourcePos = ["lg:left-0 lg:top-1/4", "lg:left-0 lg:top-3/4", "lg:right-0 lg:top-1/4", "lg:right-0 lg:top-3/4"];

// Connectors in a 1200×600 box, card edge → hub edge. A dot travels each one towards the hub.
const connectors = [
  "M336 150 C 450 150, 430 300, 500 300",
  "M336 450 C 450 450, 430 300, 500 300",
  "M864 150 C 750 150, 770 300, 700 300",
  "M864 450 C 750 450, 770 300, 700 300",
];

function Source({ i, title, body, children }: { i: number; title: string; body: string; children: ReactNode }) {
  return (
    <div className={`lg:absolute lg:w-[28%] lg:-translate-y-1/2 ${sourcePos[i]}`}>
      <div
        className="stagger-item card-lift rounded-images bg-paper-white p-4 text-left text-ink-black shadow-md xl:p-5"
        style={seq(i, { "--step": "140ms", "--base": "350ms" })}
      >
        <div className="flex items-center justify-between gap-2">
          <p className="text-body font-semibold">{title}</p>
          <span aria-hidden="true" className="relative flex h-2.5 w-2.5">
            <span className="ripple absolute inset-0 rounded-full bg-bright-sprout" />
            <span className="relative h-2.5 w-2.5 rounded-full bg-bright-sprout" />
          </span>
        </div>
        <p className="text-legal text-graphite-text">{body}</p>
        <div className="mt-3">{children}</div>
      </div>
    </div>
  );
}

export function ContextSection() {
  const c = context;
  const maxScore = 30;
  return (
    <section
      id="context"
      aria-labelledby="context-title"
      className="relative overflow-hidden bg-deep-moss py-section-sm text-paper-white md:py-section"
    >
      <div aria-hidden="true" className="absolute inset-0">
        <div className="blob left-[-8%] top-[20%] h-[380px] w-[480px] bg-forest-floor" />
        <div className="blob right-[-6%] bottom-[-10%] h-[360px] w-[440px] bg-forest-floor [animation-delay:-9s]" />
      </div>
      <Container className="relative">
        <Reveal className="text-center">
          <p className="text-legal font-semibold uppercase tracking-[0.14em] text-vivid-leaf">{c.eyebrow}</p>
          <h2 id="context-title" className="mx-auto mt-3 max-w-2xl text-heading font-medium md:text-heading-lg">
            <Words text={c.headline} />
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-subheading text-mint-wash/80">{c.lead}</p>
        </Reveal>

        <Reveal variant="scale" className="relative mt-12 grid gap-4 sm:grid-cols-2 lg:mt-14 lg:block lg:aspect-[2/1]">
          <svg viewBox="0 0 1200 600" aria-hidden="true" className="absolute inset-0 hidden h-full w-full text-vivid-leaf lg:block">
            {connectors.map((d, i) => (
              <g key={d}>
                <path d={d} fill="none" stroke="currentColor" strokeOpacity="0.2" strokeWidth="2" />
                <path id={`ctx-line-${i}`} d={d} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="flow-line" />
                <circle r="5" fill="currentColor" className="flow-dot">
                  <animateMotion
                    dur="2.4s"
                    begin={`${i * 0.6}s`}
                    repeatCount="indefinite"
                    keyPoints="0;1"
                    keyTimes="0;1"
                    calcMode="spline"
                    keySplines="0.4 0 0.2 1"
                  >
                    <mpath href={`#ctx-line-${i}`} />
                  </animateMotion>
                </circle>
              </g>
            ))}
          </svg>

          {/* The hub: first on small screens, centred in the diagram on desktop. */}
          <div className="relative mx-auto mb-6 aspect-square w-48 sm:col-span-2 lg:absolute lg:left-1/2 lg:top-1/2 lg:mb-0 lg:w-[17%] lg:-translate-x-1/2 lg:-translate-y-1/2">
            <span aria-hidden="true" className="ripple absolute inset-0 rounded-full border-2 border-vivid-leaf" />
            <span
              aria-hidden="true"
              className="ripple absolute inset-0 rounded-full border-2 border-vivid-leaf"
              style={{ "--d": "1800ms" } as CSSProperties}
            />
            <div className="hub-glow relative flex h-full w-full flex-col items-center justify-center rounded-full bg-forest-floor p-4 text-center ring-4 ring-vivid-leaf/30">
              <Image src={nav.logo} alt="" width={48} height={48} className="h-10 w-10 rounded-full xl:h-12 xl:w-12" />
              <p className="mt-2 font-display text-body leading-tight xl:text-subheading">{c.hub}</p>
              <p className="mt-1 text-caption text-mint-wash/80">{c.hubSub}</p>
            </div>
          </div>

          <Source i={0} title={c.vision.title} body={c.vision.body}>
            <p className="font-display text-body italic leading-snug text-forest-floor xl:text-subheading">
              <span className="underline-sweep">{c.vision.quote}</span>
            </p>
          </Source>

          <Source i={1} title={c.terrain.title} body={c.terrain.body}>
            <div className="flex h-[72px] items-end gap-3">
              {c.terrain.bars.map((b, i) => (
                <div key={b.label} className="flex flex-1 flex-col items-center gap-1">
                  <div
                    className={`bar-grow flex w-full items-start justify-center rounded-t-[6px] pt-0.5 text-caption font-bold text-paper-white ${
                      i === 0 ? "bg-sandstone" : i === 1 ? "bg-vivid-leaf" : "bg-forest-floor"
                    }`}
                    style={{ height: `${(b.score / maxScore) * 52}px`, "--d": `${i * 250}ms` } as CSSProperties}
                  >
                    {b.score}
                  </div>
                  <span className="text-caption text-graphite-text">{b.label}</span>
                </div>
              ))}
            </div>
          </Source>

          <Source i={2} title={c.logs.title} body={c.logs.body}>
            <div className="h-[72px] overflow-hidden [mask-image:linear-gradient(transparent,black_25%,black_75%,transparent)]">
              <ul className="ticker">
                {[...c.logs.rows, ...c.logs.rows].map(([k, v], i) => (
                  <li key={i} className="flex justify-between gap-2 py-0.5 text-legal">
                    <span className="text-graphite-text">{k}</span>
                    <span className="truncate font-semibold">{v}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Source>

          <Source i={3} title={c.reports.title} body={c.reports.body}>
            <div className="flex gap-1.5">
              {c.reports.files.map((f) => (
                <span key={f} className="truncate rounded-[6px] bg-pale-stone px-2 py-0.5 text-caption font-semibold text-warm-putty">
                  PDF · {f}
                </span>
              ))}
            </div>
            <ul className="relative mt-2 space-y-1">
              <span aria-hidden="true" className="scan-line absolute inset-x-0 h-0.5 rounded-full bg-vivid-leaf shadow-md" />
              {c.reports.markers.map((m) => (
                <li key={m.name} className="flex items-center justify-between gap-2 text-legal">
                  <span className="truncate">{m.name}</span>
                  <span className={`whitespace-nowrap rounded-pills px-2 text-caption font-bold ${statusTone[m.tone]}`}>{m.status}</span>
                </li>
              ))}
            </ul>
          </Source>
        </Reveal>

        <Reveal className="mt-10 flex justify-center lg:mt-8">
          <div className="flex max-w-full items-center gap-3 rounded-pills bg-paper-white/10 px-4 py-2.5 ring-1 ring-paper-white/15 backdrop-blur">
            <Image src="/app/sage.svg" alt="" width={24} height={24} className="h-6 w-6 shrink-0 rounded-full bg-paper-white" />
            <span className="shrink-0 text-legal font-semibold text-vivid-leaf">{c.sageLabel}</span>
            <span className="grid text-legal text-paper-white sm:min-w-80">
              {c.insights.map((t, i) => (
                <span key={t} className="cycle-3 [grid-area:1/1]" style={{ "--i": i } as CSSProperties}>
                  {t}
                </span>
              ))}
            </span>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

export function ConsultSageSection() {
  const s = consultSage;
  return (
    <section id="sage" aria-labelledby="pro-sage-title" className="bg-pale-stone/60 py-section-sm md:py-section">
      <Container className="grid gap-10 lg:grid-cols-[2fr_3fr] lg:items-center lg:gap-14">
        <Reveal variant="left">
          <p className="inline-flex items-center gap-2 text-legal font-medium text-forest-floor">
            <Image src="/app/sage.svg" alt="" width={24} height={24} className="h-6 w-6 motion-safe:animate-float" />
            {s.eyebrow}
          </p>
          <h2 id="pro-sage-title" className="mt-3 text-heading-sm font-medium md:text-heading">
            <Words text={s.headline} />
          </h2>
          <p className="mt-3 text-body text-graphite-text">{s.lead}</p>
          <Points items={s.points} />
          <p className="mt-6 text-legal font-medium text-deep-moss">{s.callout}</p>
        </Reveal>
        <Reveal delay={120} variant="scale">
          <AppWindow withSidebar sidebarFor="practitioner" active="consult" className="lg:h-[548px]">
            <PractitionerSageScreen />
          </AppWindow>
        </Reveal>
      </Container>
    </section>
  );
}

export function ReportsSection() {
  const r = reports;
  return (
    <section id="reports" aria-labelledby="reports-title" className="bg-apricot-cream/50 py-section-sm md:py-section">
      <Container className="grid gap-10 lg:grid-cols-[3fr_2fr] lg:items-center lg:gap-14">
        <Reveal variant="right" className="lg:order-2">
          <p className="text-legal font-medium text-warm-putty">{r.eyebrow}</p>
          <h2 id="reports-title" className="mt-3 text-heading-sm font-medium md:text-heading">
            <Words text={r.headline} />
          </h2>
          <p className="mt-3 text-body text-graphite-text">{r.lead}</p>
          <ol className="mt-6 space-y-5">
            {r.steps.map((s, i) => (
              <li key={s.n} className="stagger-item flex gap-4" style={seq(i, { "--step": "140ms", "--base": "300ms" })}>
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-forest-floor font-display text-body font-semibold text-forest-floor">
                  {s.n}
                </span>
                <div>
                  <p className="text-body font-semibold">{s.title}</p>
                  <p className="text-legal text-graphite-text">{s.body}</p>
                </div>
              </li>
            ))}
          </ol>
          <p className="mt-6 text-legal font-medium text-warm-putty">{r.note}</p>
        </Reveal>
        <Reveal delay={120} variant="scale" className="lg:order-1">
          <div className="overflow-hidden rounded-images bg-deep-moss shadow-md">
            <LoopVideo src={r.video.src} poster={r.video.poster} label={r.video.label} className="aspect-[16/10] object-cover" />
          </div>
          <p className="mt-3 text-caption text-graphite-text">{r.sampleNote}</p>
        </Reveal>
      </Container>
    </section>
  );
}

type Shot = { src: string; w: number; h: number; alt: string };

// A real app screenshot in a light browser frame.
function ShotFrame({ shot, sizes, className = "" }: { shot: Shot; sizes: string; className?: string }) {
  return (
    <div className={`overflow-hidden rounded-cards border border-app-border bg-app-bg shadow-app ${className}`}>
      <div aria-hidden="true" className="flex items-center gap-1.5 border-b border-app-border bg-app-card px-3 py-2">
        <span className="h-2 w-2 rounded-full bg-app-border" />
        <span className="h-2 w-2 rounded-full bg-app-border" />
        <span className="h-2 w-2 rounded-full bg-app-border" />
      </div>
      <Image src={shot.src} alt={shot.alt} width={shot.w} height={shot.h} sizes={sizes} className="block w-full" />
    </div>
  );
}

export function SessionsSection() {
  const s = sessions;
  return (
    <section id="sessions" aria-labelledby="sessions-title" className="py-section-sm md:py-section">
      <Container>
        <Reveal className="text-center">
          <p className="text-legal font-medium text-forest-floor">{s.eyebrow}</p>
          <h2 id="sessions-title" className="mx-auto mt-3 max-w-2xl text-heading font-medium md:text-heading-lg">
            <Words text={s.headline} />
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-subheading text-graphite-text">{s.lead}</p>
        </Reveal>

        {/* Two cards, one frame size: the real terrain view and the weekly summary. */}
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <Reveal variant="scale" className="flex">
            <SessionCard title={s.prep.title} body={s.prep.body} tone="bg-apricot-cream">
              <div className="aspect-video overflow-hidden rounded-cards border border-app-border bg-app-bg shadow-app">
                <Image
                  src={s.prep.image.src}
                  alt={s.prep.image.alt}
                  width={s.prep.image.w}
                  height={s.prep.image.h}
                  sizes="(min-width: 768px) 560px, 100vw"
                  className="h-full w-full object-cover object-top"
                />
              </div>
            </SessionCard>
          </Reveal>
          <Reveal delay={110} variant="scale" className="flex">
            <SessionCard title={s.summary.title} body={s.summary.body} tone="bg-pale-stone">
              <FitScale width={560} height={315}>
                <AppWindow className="h-full">
                  <WeeklySummaryScreen />
                </AppWindow>
              </FitScale>
            </SessionCard>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

function SessionCard({ title, body, tone, children }: { title: string; body: string; tone: string; children: ReactNode }) {
  return (
    <div className={`card-lift group flex w-full flex-col rounded-images p-5 md:p-6 ${tone}`}>
      <div className="transition-transform duration-700 ease-out group-hover:scale-[1.02]">{children}</div>
      <h3 className="mt-6 text-heading-sm font-semibold">{title}</h3>
      <p className="mt-2 text-body text-graphite-text">{body}</p>
    </div>
  );
}

export function ToolkitSection() {
  const t = toolkit;
  const z = t.zoom;
  return (
    <section aria-labelledby="toolkit-title" className="pb-section-sm md:pb-section">
      <Container>
        <Reveal>
          <h2 id="toolkit-title" className="mx-auto max-w-2xl text-center text-heading-sm font-medium md:text-heading">
            <Words text={t.headline} />
          </h2>
        </Reveal>
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* The live session photo, one card among equals. */}
          <Reveal variant="scale" className="flex">
            <div className="card-lift group flex w-full flex-col rounded-images bg-apricot-cream p-5">
              <div className="relative aspect-[2/1] overflow-hidden rounded-cards">
                <Image
                  src={z.image.src}
                  alt={z.image.alt}
                  fill
                  sizes="(min-width: 1024px) 370px, (min-width: 768px) 50vw, 100vw"
                  className="object-cover object-[30%_50%] transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />
                <span className="absolute left-3 top-3 inline-flex items-center gap-2 rounded-pills bg-paper-white/90 px-3 py-1 text-caption font-semibold text-ink-black backdrop-blur">
                  <span aria-hidden="true" className="relative flex h-2 w-2">
                    <span className="ripple absolute inset-0 rounded-full bg-sandstone" />
                    <span className="relative h-2 w-2 rounded-full bg-sandstone" />
                  </span>
                  {z.live}
                </span>
                <span className="absolute bottom-3 right-3 rounded-buttons bg-forest-floor px-3 py-1.5 text-legal font-semibold text-paper-white shadow-md">
                  {z.join}
                </span>
              </div>
              <h3 className="mt-5 text-subheading font-semibold">{z.title}</h3>
              <p className="mt-2 text-legal text-graphite-text md:text-body">{z.body}</p>
            </div>
          </Reveal>
          {t.items.map((f, i) => (
            <Reveal key={f.title} delay={(i + 1) * 110} variant="scale" className="flex">
              <div className="card-lift group w-full rounded-images bg-pale-stone p-5">
                <ShotFrame
                  shot={f.image}
                  sizes="(min-width: 1024px) 370px, (min-width: 768px) 50vw, 100vw"
                  className="transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                />
                <h3 className="mt-5 text-subheading font-semibold">{f.title}</h3>
                <p className="mt-2 text-legal text-graphite-text md:text-body">{f.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <p className="mt-6 text-center text-caption text-graphite-text">{t.note}</p>
      </Container>
    </section>
  );
}

export function WhySection() {
  const w = why;
  return (
    <section aria-labelledby="why-title" className="bg-mint-wash/50 py-section-sm md:py-section">
      <Container>
        <Reveal>
          <h2 id="why-title" className="text-center text-heading font-medium md:text-heading-lg">
            <Words text={w.headline} />
          </h2>
          <ol className="mt-12 grid gap-10 md:grid-cols-3 md:gap-8">
            {w.reasons.map((r, i) => (
              <li key={r.title} className="stagger-item border-t border-forest-floor/30 pt-5" style={seq(i, { "--step": "140ms", "--base": "350ms" })}>
                <p className="font-display text-heading font-medium text-forest-floor">{String(i + 1).padStart(2, "0")}</p>
                <p className="mt-3 text-subheading font-semibold">{r.title}</p>
                <p className="mt-2 text-body text-graphite-text">{r.body}</p>
              </li>
            ))}
          </ol>
        </Reveal>
      </Container>
    </section>
  );
}
