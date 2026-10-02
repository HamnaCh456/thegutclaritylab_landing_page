import Image from "next/image";
import type { ReactNode } from "react";
import { sidebar } from "@/content/screens";
import { practitionerSidebar } from "@/content/practitionerScreens";

type ClientActive = "today" | "reintro" | "terrain" | "sage" | "recipes" | "education" | "messages";
// Practitioner rows, in sidebar order: top, the open client's pages, then tools.
const practitionerRows = ["clients", "sessions", "overview", "logs", "terrainBuild", "reports", "consult", "suggest", "inbox"] as const;
type PractitionerActive = (typeof practitionerRows)[number];
type Active = ClientActive | PractitionerActive;

function NavRow({ label, on = false, indent = false }: { label: string; on?: boolean; indent?: boolean }) {
  return (
    <li
      className={`truncate rounded-[8px] px-2.5 py-1.5 text-[12px] ${indent ? "pl-4" : ""} ${
        on ? "bg-app-card/15 font-bold text-app-card" : "text-app-card/75"
      }`}
    >
      {label}
    </li>
  );
}

// The client sidebar from the app, reduced to the rows a visitor needs to read it.
function Sidebar({ active }: { active?: Active }) {
  return (
    <aside className="hidden w-44 shrink-0 flex-col gap-4 bg-app-green p-3 md:flex">
      <div className="flex items-center gap-2 px-1 pt-1">
        <Image src="/app/gcl-logo.jpeg" alt="" width={28} height={28} className="h-7 w-7 rounded-full bg-app-card" />
        <div className="leading-tight">
          <p className="font-app-serif text-[12px] text-app-card">{sidebar.brand}</p>
          <p className="text-[10px] text-app-green-m">{sidebar.tagline}</p>
        </div>
      </div>
      <ul className="space-y-0.5">
        <NavRow label={sidebar.top[0]} on={active === "today"} />
        <NavRow label={sidebar.top[1]} />
      </ul>
      <div>
        <p className="px-2.5 pb-1 text-[10px] uppercase tracking-[1.4px] text-app-green-m">{sidebar.pathLabel}</p>
        <ul className="space-y-0.5">
          {sidebar.phases.map((p, i) => (
            <NavRow key={p} label={p} indent on={active === "reintro" && i === 1} />
          ))}
        </ul>
      </div>
      <ul>
        <NavRow label={sidebar.terrain} on={active === "terrain"} />
      </ul>
      <div>
        <p className="px-2.5 pb-1 text-[10px] uppercase tracking-[1.4px] text-app-green-m">{sidebar.toolsLabel}</p>
        <ul className="space-y-0.5">
          {sidebar.tools.map((t, i) => (
            <NavRow
              key={t}
              label={t}
              on={
                (active === "sage" && i === 0) ||
                (active === "recipes" && i === 1) ||
                (active === "education" && i === 2) ||
                (active === "messages" && i === 3)
              }
            />
          ))}
        </ul>
      </div>
    </aside>
  );
}

// The Practitioner Corner sidebar: client list, the client being viewed, then tools.
function PractitionerSidebar({ active }: { active?: Active }) {
  const s = practitionerSidebar;
  const on = (i: number) => active === practitionerRows[i];
  return (
    <aside className="hidden w-44 shrink-0 flex-col gap-4 bg-app-green-d p-3 md:flex">
      <div className="flex items-center gap-2 px-1 pt-1">
        <Image src="/app/gcl-logo.jpeg" alt="" width={28} height={28} className="h-7 w-7 rounded-full bg-app-card" />
        <div className="leading-tight">
          <p className="font-app-serif text-[12px] text-app-card">{s.brand}</p>
          <p className="text-[10px] text-app-green-m">{s.tagline}</p>
        </div>
      </div>
      <ul className="space-y-0.5">
        {s.top.map((t, i) => (
          <NavRow key={t} label={t} on={on(i)} />
        ))}
      </ul>
      <div>
        <p className="px-2.5 pb-1 text-[10px] uppercase tracking-[1.4px] text-app-green-m">{s.clientLabel}</p>
        <ul className="space-y-0.5">
          {s.client.map((c, i) => (
            <NavRow key={c} label={c} indent on={on(s.top.length + i)} />
          ))}
        </ul>
      </div>
      <div>
        <p className="px-2.5 pb-1 text-[10px] uppercase tracking-[1.4px] text-app-green-m">{s.toolsLabel}</p>
        <ul className="space-y-0.5">
          {s.tools.map((t, i) => (
            <NavRow key={t} label={t} on={on(s.top.length + s.client.length + i)} />
          ))}
        </ul>
      </div>
    </aside>
  );
}

type Props = {
  children: ReactNode;
  withSidebar?: boolean;
  sidebarFor?: "client" | "practitioner";
  active?: Active;
  className?: string;
};

// A browser-style frame around a recreated app screen, in the app's own fonts and colours.
export function AppWindow({ children, withSidebar = false, sidebarFor = "client", active, className = "" }: Props) {
  return (
    <div
      aria-hidden="true"
      className={`overflow-hidden rounded-cards border border-app-border bg-app-bg font-app-sans text-app-ink shadow-app ${className}`}
    >
      <div className="flex items-center gap-1.5 border-b border-app-border bg-app-card px-3 py-2">
        <span className="h-2 w-2 rounded-full bg-app-border" />
        <span className="h-2 w-2 rounded-full bg-app-border" />
        <span className="h-2 w-2 rounded-full bg-app-border" />
      </div>
      <div className="flex h-[calc(100%-25px)]">
        {withSidebar && (sidebarFor === "practitioner" ? <PractitionerSidebar active={active} /> : <Sidebar active={active} />)}
        <div className="min-w-0 flex-1 p-4 md:p-5">{children}</div>
      </div>
    </div>
  );
}
