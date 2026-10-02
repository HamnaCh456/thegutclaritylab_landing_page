import Image from "next/image";
import type { CSSProperties } from "react";
import { Chip, Label, Panel, Title } from "@/components/app/screens";
import { practitionerSage, weeklySummary } from "@/content/practitionerScreens";

export function PractitionerSageScreen() {
  const s = practitionerSage;
  return (
    <div className="flex h-full flex-col gap-3">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Image src={s.avatar} alt="" width={32} height={32} className="h-8 w-8" />
          <Title>{s.title}</Title>
        </div>
        <Chip on>{s.client}</Chip>
      </div>
      <div className="flex flex-wrap items-center gap-1.5">
        <Label>Sage is reading</Label>
        {s.sources.map((src) => (
          <span key={src} className="rounded-full border border-app-border bg-app-card px-2 py-0.5 text-[10px] text-app-ink2">
            {src}
          </span>
        ))}
      </div>
      <div className="flex-1 space-y-2">
        {s.thread.map((m, i) => (
          <div
            key={i}
            style={{ "--i": i, "--step": "650ms", "--base": "500ms" } as CSSProperties}
            className={`stagger-item flex ${m.from === "me" ? "justify-end" : "gap-2"}`}
          >
            {m.from === "sage" && <Image src={s.avatar} alt="" width={20} height={20} className="mt-1 h-5 w-5 shrink-0" />}
            <p
              className={`max-w-[82%] rounded-[12px] px-3 py-2 text-[12px] leading-snug ${
                m.from === "me" ? "bg-app-green text-app-card" : "border border-app-border bg-app-card text-app-ink"
              }`}
            >
              {m.text}
            </p>
          </div>
        ))}
      </div>
      <div className="rounded-[10px] border border-app-border bg-app-card px-3 py-2 text-[12px] text-app-ink3">{s.input}</div>
    </div>
  );
}

// The weekly summary, laid out to fill a 16:9 frame: engagement across the top, themes and
// baseline (with what to watch) below, Sage's prompt for the week at the foot.
export function WeeklySummaryScreen() {
  const w = weeklySummary;
  return (
    <div className="flex h-full flex-col gap-2">
      <div className="flex items-start justify-between gap-2">
        <div>
          <Title className="text-[17px]">{w.title}</Title>
          <p className="text-[10px] text-app-ink3">
            {w.client} · {w.generated}
          </p>
        </div>
        <Chip on>Week 5</Chip>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {w.engagement.map((e, i) => (
          <div key={e.label} className="rounded-[10px] border border-app-border bg-app-card px-2 py-1.5">
            <div className="flex items-baseline justify-between gap-1">
              <Label className="truncate">{e.label}</Label>
              <p className="font-app-serif text-[15px] leading-none text-app-green">{e.value}</p>
            </div>
            <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-app-border2">
              <div className="fill-x h-full rounded-full bg-app-green" style={{ width: `${e.pct}%`, "--d": `${i * 200}ms` } as CSSProperties} />
            </div>
          </div>
        ))}
      </div>
      <div className="grid min-h-0 flex-1 grid-cols-[1.1fr_1fr] gap-2">
        <Panel className="overflow-hidden p-2">
          <div className="flex items-center justify-between gap-1">
            <Label>Journal themes</Label>
            <span className="text-[10px] font-bold text-app-green">{w.tone}</span>
          </div>
          <div className="mt-1 flex flex-wrap gap-1">
            {w.themes.map((t) => (
              <span key={t} className="rounded-full bg-app-amber-l px-1.5 py-px text-[10px] font-medium text-app-amber-d">
                {t}
              </span>
            ))}
          </div>
          <p className="mt-1.5 border-l-2 border-app-amber pl-1.5 text-[10px] italic leading-snug text-app-ink2">{w.quote}</p>
        </Panel>
        <Panel className="overflow-hidden p-2">
          <Label>Baseline</Label>
          <ul className="mt-0.5">
            {w.baseline.map((b) => (
              <li key={b.label} className="flex items-center justify-between text-[10px] leading-[1.6]">
                <span className="text-app-ink3">{b.label}</span>
                <span className={`font-bold ${b.watch ? "text-app-amber-d" : ""}`}>
                  {b.value} {b.up && <span className="text-app-green">↑</span>}
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-0.5 text-[9px] leading-snug text-app-amber-d">{w.watch}</p>
        </Panel>
      </div>
      <div className="flex items-center gap-2 rounded-[10px] border-l-[3px] border-app-green bg-app-green-l px-2.5 py-1.5">
        <Image src={practitionerSage.avatar} alt="" width={16} height={16} className="h-4 w-4 shrink-0" />
        <p className="truncate text-[11px] text-app-green-d">{w.prompt}</p>
      </div>
    </div>
  );
}
