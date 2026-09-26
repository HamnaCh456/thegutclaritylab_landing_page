import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";
import {
  checkIn,
  dashboard,
  education,
  journey,
  mealPhoto,
  plan,
  practitioner,
  recipes,
  sageChat,
} from "@/content/screens";

// Small building blocks in the app's vocabulary (card, overline label, serif title).
function Panel({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`rounded-[14px] border border-app-border bg-app-card p-3 ${className}`}>{children}</div>;
}
function Label({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <p className={`text-[10px] uppercase tracking-[1.4px] text-app-ink3 ${className}`}>{children}</p>;
}
function Title({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <p className={`font-app-serif text-[20px] leading-tight text-app-ink ${className}`}>{children}</p>;
}
function Chip({ children, on = false }: { children: ReactNode; on?: boolean }) {
  const t = on ? "border-app-green-l bg-app-green-l text-app-green-d" : "border-app-border bg-app-card text-app-ink2";
  return <span className={`inline-flex rounded-full border px-2.5 py-1 text-[11px] font-medium ${t}`}>{children}</span>;
}

export function DashboardScreen() {
  const d = dashboard;
  return (
    <div className="space-y-3">
      <div>
        <Label>{d.date}</Label>
        <Title className="text-[24px]">{d.greeting}</Title>
      </div>
      <div className="rounded-[14px] bg-app-green p-4 text-app-card">
        <p className="text-[10px] uppercase tracking-[1.4px] text-app-green-m">{d.week.eyebrow}</p>
        <div className="mt-1 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="font-app-serif text-[22px] leading-tight">{d.week.title}</p>
            <p className="text-[12px] text-app-card/75">{d.week.phase}</p>
          </div>
          <span className="rounded-[10px] bg-app-card px-3 py-1.5 text-[12px] font-bold text-app-green">{d.week.cta} →</span>
        </div>
        <div className="mt-3 flex gap-1.5">
          {Array.from({ length: d.week.days }, (_, i) => (
            <span
              key={i}
              style={{ "--d": `${1500 + i * 110}ms` } as CSSProperties}
              className={`load-pop h-2.5 w-2.5 rounded-full ${i < d.week.done ? "bg-app-amber" : "bg-app-card/25"}`}
            />
          ))}
        </div>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <Panel>
          <div className="flex items-center justify-between">
            <Label>{d.checkIn.label}</Label>
            <Chip on>{d.checkIn.status}</Chip>
          </div>
          <p className="mt-2 text-[12px] leading-snug text-app-ink2">{d.checkIn.note}</p>
        </Panel>
        <Panel>
          <Label>{d.terrain.label}</Label>
          <p className="mt-1 font-app-serif text-[18px] text-app-amber-d">{d.terrain.value}</p>
          <p className="text-[11px] text-app-ink3">{d.terrain.sub}</p>
        </Panel>
      </div>
      <div className="grid gap-3 sm:grid-cols-[1.2fr_1fr]">
        <Panel className="flex gap-3 p-2">
          <Image src={d.recipe.image} alt="" width={96} height={96} className="h-20 w-20 rounded-[10px] object-cover" />
          <div className="py-1">
            <Label>{d.recipe.label}</Label>
            <p className="mt-1 text-[12px] font-bold leading-snug">{d.recipe.title}</p>
          </div>
        </Panel>
        <div className="space-y-2">
          {d.tiles.map((t) => (
            <Panel key={t.label} className="flex items-center justify-between py-2">
              <div>
                <p className="text-[12px] font-bold">{t.label}</p>
                <p className="text-[11px] text-app-ink3">{t.sub}</p>
              </div>
              <span className="text-app-green-m">›</span>
            </Panel>
          ))}
        </div>
      </div>
    </div>
  );
}

export function CheckInScreen() {
  const c = checkIn;
  return (
    <div className="space-y-3">
      <div className="flex items-baseline justify-between">
        <Title>{c.title}</Title>
        <Label>{c.day}</Label>
      </div>
      <Panel>
        <p className="text-[12px] font-bold">{c.feel.label}</p>
        <div className="relative mt-3 h-1.5 rounded-full bg-app-border2">
          <div className="h-full rounded-full bg-app-green" style={{ width: `${c.feel.value}%` }} />
          <span
            className="absolute top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-app-card bg-app-green shadow-app"
            style={{ left: `${c.feel.value}%` }}
          />
        </div>
        <div className="mt-2 flex justify-between text-[10px] text-app-ink3">
          <span>{c.feel.left}</span>
          <span>{c.feel.right}</span>
        </div>
      </Panel>
      <Panel className="space-y-2">
        {c.meals.map((m) => (
          <div key={m.label} className="flex items-center justify-between text-[12px]">
            <span className="text-app-ink3">{m.label}</span>
            <span className={m.done ? "font-bold" : "text-app-green"}>{m.done ? `✓ ${m.value}` : `+ ${m.value}`}</span>
          </div>
        ))}
      </Panel>
      <Panel>
        <p className="text-[12px] font-bold">{c.stoodOut.label}</p>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {c.stoodOut.chips.map(([label, on]) => (
            <Chip key={label} on={on}>
              {label}
            </Chip>
          ))}
        </div>
      </Panel>
      <div className="grid grid-cols-4 gap-2">
        <Panel className="p-2">
          <Label>{c.water.label}</Label>
          <div className="mt-1.5 flex flex-wrap gap-1">
            {Array.from({ length: c.water.total }, (_, i) => (
              <span key={i} className={`h-2.5 w-2.5 rounded-full border ${i < c.water.filled ? "border-app-green bg-app-green-m" : "border-app-border"}`} />
            ))}
          </div>
        </Panel>
        {c.rhythms.map((r) => (
          <Panel key={r.label} className="p-2">
            <Label>{r.label}</Label>
            <p className="mt-1 text-[12px] font-bold text-app-green">{r.value}</p>
          </Panel>
        ))}
      </div>
      <div className="rounded-[10px] bg-app-green py-2 text-center text-[12px] font-bold text-app-card">{c.save}</div>
    </div>
  );
}

export function MealPhotoScreen() {
  const m = mealPhoto;
  return (
    <div className="space-y-3">
      <div className="flex items-baseline justify-between">
        <Title>{m.title}</Title>
        <Label>{m.meal}</Label>
      </div>
      <div className="relative">
        <Image src={m.image} alt="" width={520} height={300} className="h-40 w-full rounded-[14px] object-cover" />
        <span className="absolute left-2 top-2 rounded-full bg-app-card px-2.5 py-1 text-[11px] font-bold">📷 {m.meal}</span>
      </div>
      <Panel>
        <div className="flex items-center gap-2">
          <Image src={sageChat.avatar} alt="" width={20} height={20} className="h-5 w-5" />
          <p className="text-[12px] font-bold">{m.seen}</p>
        </div>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {m.foods.map((f) => (
            <Chip key={f} on>
              ✓ {f}
            </Chip>
          ))}
        </div>
      </Panel>
      <div className="rounded-[10px] bg-app-green py-2 text-center text-[12px] font-bold text-app-card">{m.cta}</div>
    </div>
  );
}

export function RecipesScreen() {
  const r = recipes;
  return (
    <div className="space-y-3">
      <Title>{r.title}</Title>
      <div className="flex flex-wrap gap-1.5">
        {r.filters.map((f, i) => (
          <Chip key={f} on={i === 0}>
            {f}
          </Chip>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-2">
        {r.items.map((it) => (
          <div key={it.title} className="overflow-hidden rounded-[14px] border border-app-border bg-app-card">
            <Image src={it.image} alt="" width={320} height={200} className="h-28 w-full object-cover" />
            <div className="space-y-1 p-2">
              <Label>{it.meal}</Label>
              <p className="line-clamp-2 text-[11px] font-bold leading-snug">{it.title}</p>
              <span className="inline-flex rounded-full bg-app-green-l px-2 py-0.5 text-[10px] text-app-green-d">{r.badge}</span>
            </div>
          </div>
        ))}
      </div>
      <p className="text-[11px] text-app-green">⇄ {r.swap}</p>
    </div>
  );
}

const toneCard = {
  amber: "border-app-amber-l bg-app-amber-l",
  green: "border-app-green-l bg-app-green-l",
  plain: "border-app-border bg-app-card",
} as const;

export function PlanScreen() {
  const p = plan;
  return (
    <div className="space-y-3">
      <div>
        <Label>{p.eyebrow}</Label>
        <Title>{p.title}</Title>
      </div>
      <div className="flex gap-1.5">
        {p.days.map((d, i) => (
          <span
            key={i}
            className={`flex h-7 flex-1 items-center justify-center rounded-[8px] text-[11px] font-bold ${
              i < p.today ? "bg-app-green-l text-app-green-d" : i === p.today ? "bg-app-green text-app-card" : "bg-app-card text-app-ink3"
            }`}
          >
            {d}
          </span>
        ))}
      </div>
      <div className="grid gap-2 sm:grid-cols-2">
        {p.cards.map((c) => (
          <div key={c.label} className={`rounded-[14px] border p-3 ${toneCard[c.tone]}`}>
            <Label>{c.label}</Label>
            <p className="mt-1 text-[12px] font-bold leading-snug">{c.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function JourneyScreen() {
  const j = journey;
  return (
    <div className="space-y-3">
      <div>
        <Title>{j.title}</Title>
        <p className="text-[11px] text-app-ink3">{j.sub}</p>
      </div>
      <Panel className="flex h-40 items-end justify-around gap-4 px-5 pb-3">
        {j.points.map((pt, i) => (
          <div key={pt.week} className="flex flex-1 flex-col items-center gap-1">
            <p className="text-[12px] font-bold">{pt.score}</p>
            <div
              className={`w-full rounded-t-[8px] ${i === 0 ? "bg-app-amber-l" : i === 1 ? "bg-app-amber" : "bg-app-green"}`}
              style={{ height: `${(pt.score / 30) * 100}px` }}
            />
          </div>
        ))}
      </Panel>
      <div className="grid grid-cols-3 gap-2 text-center">
        {j.points.map((pt) => (
          <div key={pt.week}>
            <Label>{pt.week}</Label>
            <p className="text-[12px] font-bold">{pt.band}</p>
          </div>
        ))}
      </div>
      <p className="text-[11px] italic text-app-ink3">{j.note}</p>
    </div>
  );
}

export function PractitionerScreen() {
  const p = practitioner;
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <Title>{p.title}</Title>
        <span className="rounded-[10px] bg-app-green px-3 py-1.5 text-[11px] font-bold text-app-card">{p.book}</span>
      </div>
      <Panel className="space-y-2">
        <p className="text-[11px] font-bold text-app-ink3">{p.name}</p>
        {p.thread.map((m, i) => (
          <div key={i} className={`flex ${m.from === "me" ? "justify-end" : ""}`}>
            <p
              className={`max-w-[80%] rounded-[12px] px-3 py-2 text-[12px] leading-snug ${
                m.from === "me" ? "bg-app-green text-app-card" : "bg-app-border2 text-app-ink"
              }`}
            >
              {m.text}
            </p>
          </div>
        ))}
      </Panel>
      <div className="rounded-[10px] border border-app-amber-l bg-app-amber-l px-3 py-2 text-[11px] font-bold text-app-amber-d">{p.form}</div>
    </div>
  );
}

export function EducationScreen() {
  const e = education;
  return (
    <div className="space-y-2.5">
      <div className="flex items-baseline justify-between gap-2">
        <Title className="text-[18px]">{e.title}</Title>
        <Label>{e.module}</Label>
      </div>
      <div className="relative overflow-hidden rounded-[12px]">
        <Image src={e.video.image} alt="" width={928} height={428} className="h-48 w-full object-cover object-top" />
        <span className="absolute bottom-2 left-2 flex h-9 w-9 items-center justify-center rounded-full bg-app-green/90 pl-0.5 text-[14px] text-app-card shadow-app">
          ▶
        </span>
        <span className="absolute bottom-2 right-2 rounded-[6px] bg-app-ink/70 px-1.5 py-0.5 text-[10px] font-bold text-app-card">
          {e.video.length}
        </span>
      </div>
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <p className="text-[13px] font-bold">{e.video.title}</p>
          <Chip on>{e.video.tag}</Chip>
        </div>
        <p className="truncate text-[11px] text-app-ink3">{e.next}</p>
      </div>
    </div>
  );
}

export function SageChatScreen() {
  const s = sageChat;
  const thread = s.thread;
  return (
    <div className="flex h-full flex-col gap-3">
      <div className="flex items-center gap-2">
        <Image src={s.avatar} alt="" width={32} height={32} className="h-8 w-8" />
        <Title>{s.title}</Title>
      </div>
      <div className="flex-1 space-y-2">
        {thread.map((m, i) => (
          <div
            key={i}
            style={{ "--i": i, "--step": "650ms", "--base": "500ms" } as CSSProperties}
            className={`stagger-item flex ${m.from === "me" ? "justify-end" : "gap-2"}`}
          >
            {m.from === "sage" && <Image src={s.avatar} alt="" width={20} height={20} className="mt-1 h-5 w-5 shrink-0" />}
            <p
              className={`max-w-[80%] rounded-[12px] px-3 py-2 text-[12px] leading-snug ${
                m.from === "me" ? "bg-app-green text-app-card" : "border border-app-border bg-app-card text-app-ink"
              }`}
            >
              {m.text}
            </p>
          </div>
        ))}
      </div>
      <div className="flex flex-wrap gap-1.5">
        {s.prompts.map((p, i) => (
          <span
            key={p}
            className="stagger-item"
            style={{ "--i": thread.length + i, "--step": "650ms", "--base": "300ms" } as CSSProperties}
          >
            <Chip>{p}</Chip>
          </span>
        ))}
      </div>
      <div className="rounded-[10px] border border-app-border bg-app-card px-3 py-2 text-[12px] text-app-ink3">{s.input}</div>
    </div>
  );
}
