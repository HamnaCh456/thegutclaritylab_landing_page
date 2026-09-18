# Fruitful Landing Page Clone Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a standalone Next.js 15 + Tailwind v4 clone of the fruitful.com landing page that follows the supplied DESIGN.md token system, with all copy/images in `content/` so the product can be swapped later.

**Architecture:** One `app/page.tsx` renders 13 section components in order. Each section is a server component that reads a typed object from `content/` and composes shared `ui/` primitives (`Container`, `Button`, `Reveal`) and inline SVG `icons`. Design tokens live only in `app/globals.css` (`@theme`); a `scripts/check-tokens.mjs` guard fails if any component contains a raw colour.

**Tech Stack:** Next.js 15 (App Router, TS), Tailwind v4, Inter via `next/font/google`, `next/image` for hotlinked CDN assets. No test framework — verification is `tsc --noEmit`, `next build`, the token guard, and headless-Chrome screenshots.

**Spec:** `docs/superpowers/specs/2026-09-18-fruitful-landing-clone-design.md`

**Testing note:** the page has no logic beyond one IntersectionObserver, so unit tests would only re-state markup. The one rule worth guarding mechanically is "no raw colours in components", which Task 1 implements as a script and proves with a deliberately failing fixture. Every later task ends with `npm run check` (= tsc + token guard) and a dev-server render.

---

### Task 1: Scaffold the project and the token guard

**Files:**
- Create: `package.json`, `tsconfig.json`, `next.config.ts`, `app/*` (via create-next-app)
- Create: `scripts/check-tokens.mjs`
- Create: `DESIGN.md` (copy of the supplied style reference)

- [ ] **Step 1: Scaffold Next.js in the existing repo folder**

Run from `C:\Users\LENOVO\Desktop\fruitful-clone`:

```powershell
npx --yes create-next-app@latest . --ts --tailwind --eslint --app --no-src-dir --import-alias "@/*" --use-npm --yes
```

Expected: finishes with "Success! Created fruitful-clone". `docs/` and `.git` are left untouched (create-next-app tolerates them). Confirm Tailwind v4 was installed:

```powershell
Get-Content package.json | Select-String tailwindcss
```

Expected: a line like `"tailwindcss": "^4"` and `"@tailwindcss/postcss": "^4"`.

- [ ] **Step 2: Configure remote images**

Replace `next.config.ts` with:

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{ protocol: "https", hostname: "cdn.prod.website-files.com" }],
  },
};

export default nextConfig;
```

- [ ] **Step 3: Write the token guard**

Create `scripts/check-tokens.mjs`:

```js
// Fails if any component uses a raw colour instead of a DESIGN.md token.
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const HEX = /#[0-9a-fA-F]{3,8}\b/;
const RGB = /\brgba?\(/;
const offenders = [];

function walk(dir) {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) walk(path);
    else if (/\.tsx?$/.test(name)) {
      readFileSync(path, "utf8").split("\n").forEach((line, i) => {
        if (HEX.test(line) || RGB.test(line)) offenders.push(`${path}:${i + 1}: ${line.trim()}`);
      });
    }
  }
}

walk(process.argv[2] ?? "components");

if (offenders.length) {
  console.error("Raw colour values found:\n" + offenders.join("\n"));
  process.exit(1);
}
console.log("check-tokens: OK");
```

- [ ] **Step 4: Prove the guard fails on a bad file**

```powershell
New-Item -ItemType Directory -Force components | Out-Null
Set-Content -Encoding utf8 components/Bad.tsx 'export const x = "#ffffff";'
node scripts/check-tokens.mjs; echo "exit=$LASTEXITCODE"
```

Expected: prints `Raw colour values found:` + `components\Bad.tsx:1: ...` and `exit=1`.

- [ ] **Step 5: Prove the guard passes on a clean tree**

```powershell
Remove-Item components/Bad.tsx
node scripts/check-tokens.mjs; echo "exit=$LASTEXITCODE"
```

Expected: `check-tokens: OK` and `exit=0`.

- [ ] **Step 6: Add the `check` script**

In `package.json` `"scripts"`, add:

```json
"check": "tsc --noEmit && node scripts/check-tokens.mjs"
```

- [ ] **Step 7: Save DESIGN.md**

Create `DESIGN.md` at the repo root containing the style reference the user supplied verbatim (the "# Fruitful — Style Reference" document, from the `> Sun-drenched kitchen herb garden…` intro through the Tailwind v4 `@theme` block).

- [ ] **Step 8: Commit**

```powershell
git add -A
git commit -m "chore: scaffold Next.js 15 + Tailwind v4, add token guard and DESIGN.md"
```

---

### Task 2: Tokens, layout, UI primitives, icons

**Files:**
- Replace: `app/globals.css`, `app/layout.tsx`, `app/page.tsx`
- Create: `components/ui/Container.tsx`, `components/ui/Button.tsx`, `components/ui/Reveal.tsx`, `components/icons.tsx`
- Delete: `public/*.svg` defaults (optional, keeps repo clean)

- [ ] **Step 1: Write globals.css with the DESIGN.md tokens**

Replace `app/globals.css`:

```css
@import "tailwindcss";

@theme {
  /* Colors — DESIGN.md */
  --color-forest-floor: #0b7443;
  --color-deep-moss: #054f31;
  --color-vivid-leaf: #61bc76;
  --color-bright-sprout: #039855;
  --color-mint-wash: #d1fadf;
  --color-warm-putty: #715039;
  --color-sandstone: #d1a883;
  --color-apricot-cream: #fee9d1;
  --color-paper-white: #ffffff;
  --color-soft-mist: #eceff4;
  --color-pale-stone: #f4f4f4;
  --color-graphite-text: #5b616b;
  --color-ink-black: #000000;

  /* Typography — Inter substitutes PP Neue Montreal */
  --font-sans: var(--font-inter), ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;

  --text-caption: 11px;
  --text-caption--line-height: 1.4;
  --text-caption--letter-spacing: -0.004em;
  --text-legal: 13px;
  --text-legal--line-height: 1.5;
  --text-body: 16px;
  --text-body--line-height: 1.5;
  --text-body--letter-spacing: -0.004em;
  --text-subheading: 20px;
  --text-subheading--line-height: 1.33;
  --text-subheading--letter-spacing: -0.004em;
  --text-heading-sm: 24px;
  --text-heading-sm--line-height: 1.32;
  --text-heading-sm--letter-spacing: -0.01em;
  --text-heading: 38px;
  --text-heading--line-height: 1.25;
  --text-heading--letter-spacing: -0.01em;
  --text-heading-lg: 48px;
  --text-heading-lg--line-height: 1.2;
  --text-heading-lg--letter-spacing: -0.01em;
  --text-display-sm: 45px;
  --text-display-sm--line-height: 1;
  --text-display-sm--letter-spacing: -0.019em;
  --text-display: 60px;
  --text-display--line-height: 1.1;
  --text-display--letter-spacing: -0.019em;
  --text-display-lg: 91px;
  --text-display-lg--line-height: 0.9;
  --text-display-lg--letter-spacing: -0.019em;

  /* Spacing & layout */
  --spacing-section: 80px;
  --spacing-section-sm: 48px;
  --spacing-section-lg: 120px;
  --container-page: 1200px;

  /* Radii */
  --radius-nav: 12px;
  --radius-cards: 12px;
  --radius-buttons: 12px;
  --radius-video: 12px;
  --radius-images: 20px;
  --radius-phone: 40px;
  --radius-pills: 80px;

  /* Elevation — the only shadow, deepest cards only */
  --shadow-md: rgba(0, 0, 0, 0.05) 0px 25px 16px 0px, rgba(0, 0, 0, 0.1) 0px 10px 10px 0px, rgba(0, 0, 0, 0.1) 0px 3px 6px 0px;
}

@layer base {
  html {
    scroll-behavior: smooth;
  }
  body {
    background: var(--color-paper-white);
    color: var(--color-ink-black);
    font-family: var(--font-sans);
    font-feature-settings: "ss01", "tnum";
    -webkit-font-smoothing: antialiased;
  }
  :focus-visible {
    outline: 2px solid var(--color-forest-floor);
    outline-offset: 2px;
  }
  summary::-webkit-details-marker {
    display: none;
  }
}

@utility bg-mint-glow {
  background: radial-gradient(120% 90% at 50% 0%, var(--color-mint-wash) 0%, var(--color-paper-white) 75%);
}

.reveal {
  opacity: 0;
  transform: translateY(16px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}
.reveal.is-visible {
  opacity: 1;
  transform: none;
}
@media (prefers-reduced-motion: reduce) {
  .reveal {
    opacity: 1;
    transform: none;
    transition: none;
  }
}
```

- [ ] **Step 2: Root layout with Inter**

Replace `app/layout.tsx`:

```tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Fruitful - Your money, finally figured out",
  description:
    "Get a personalized money system that automatically puts every dollar to work. Bills, spending, saving, investing - all handled.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}
```

- [ ] **Step 3: Container**

Create `components/ui/Container.tsx`:

```tsx
import type { ReactNode } from "react";

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-page px-4 md:px-6 ${className}`}>{children}</div>;
}
```

- [ ] **Step 4: Button**

Create `components/ui/Button.tsx`:

```tsx
import type { ReactNode } from "react";

type Variant = "primary" | "ghost" | "pill";

const variants: Record<Variant, string> = {
  primary: "bg-forest-floor text-paper-white hover:bg-deep-moss",
  ghost: "border border-ink-black text-ink-black hover:bg-pale-stone",
  pill: "text-ink-black hover:bg-pale-stone",
};

type Props = {
  children: ReactNode;
  variant?: Variant;
  href?: string;
  full?: boolean;
  className?: string;
};

export function Button({ children, variant = "primary", href, full = false, className = "" }: Props) {
  const cls = `inline-flex items-center justify-center gap-2 rounded-buttons px-6 py-3 text-body font-medium transition-colors ${
    full ? "w-full" : ""
  } ${variants[variant]} ${className}`;
  if (href) {
    return (
      <a href={href} className={cls}>
        {children}
      </a>
    );
  }
  return (
    <button type="button" className={cls}>
      {children}
    </button>
  );
}
```

- [ ] **Step 5: Reveal (the only client component)**

Create `components/ui/Reveal.tsx`:

```tsx
"use client";

import { useEffect, useRef, type ReactNode } from "react";

export function Reveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-visible");
          io.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={`reveal ${className}`}>
      {children}
    </div>
  );
}
```

- [ ] **Step 6: Icons**

Create `components/icons.tsx`:

```tsx
import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement>;

const line = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

export function Leaf(p: P) {
  return (
    <svg viewBox="0 0 32 32" fill="currentColor" aria-hidden="true" {...p}>
      <circle cx="16" cy="8" r="4.5" fill="none" stroke="currentColor" strokeWidth="3" />
      <path d="M15 30C15 22 9.5 16.5 2 15.5c0 8 5 13.5 13 14.5z" />
      <path d="M17 30c0-8 5.5-13.5 13-14.5 0 8-5 13.5-13 14.5z" />
    </svg>
  );
}

const LEAVES: [number, number, number][] = [
  [34, 10, -65],
  [24, 22, -48],
  [17, 36, -28],
  [14, 51, -8],
  [16, 66, 14],
  [22, 80, 34],
  [31, 92, 52],
];

export function Laurel({ flip = false, ...p }: P & { flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 48 100"
      fill="currentColor"
      aria-hidden="true"
      style={flip ? { transform: "scaleX(-1)" } : undefined}
      {...p}
    >
      <path d="M42 4C14 22 8 60 40 98" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      {LEAVES.map(([x, y, r]) => (
        <ellipse key={`${x}-${y}`} cx={x} cy={y} rx="5" ry="10" transform={`rotate(${r} ${x} ${y})`} />
      ))}
    </svg>
  );
}

const STAR = "M10 1.6l2.5 5.4 5.9.7-4.4 4 1.2 5.8L10 14.6l-5.2 2.9 1.2-5.8-4.4-4 5.9-.7z";

export function Stars(p: P) {
  return (
    <svg viewBox="0 0 108 20" aria-hidden="true" {...p}>
      {[0, 1, 2, 3, 4].map((i) => (
        <g key={i} transform={`translate(${i * 22} 0)`}>
          <rect width="20" height="20" rx="3" className="fill-bright-sprout" />
          <path d={STAR} className="fill-paper-white" />
        </g>
      ))}
    </svg>
  );
}

export function TrustStar(p: P) {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true" {...p}>
      <path d={STAR} className="fill-bright-sprout" />
    </svg>
  );
}

export function CheckCircle(p: P) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...p}>
      <circle cx="12" cy="12" r="12" />
      <path
        d="M7 12.5l3.2 3.2L17 9"
        fill="none"
        className="stroke-paper-white"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ArrowUp(p: P) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...line} strokeWidth={2.2} {...p}>
      <path d="M12 19V5M5 12l7-7 7 7" />
    </svg>
  );
}

export function Chevron(p: P) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...line} {...p}>
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

export function Play(p: P) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...p}>
      <path d="M8 5.5v13l11-6.5z" />
    </svg>
  );
}

export function Bolt(p: P) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...line} {...p}>
      <path d="M13 2L4 14h7l-1 8 9-12h-7z" />
    </svg>
  );
}

export function Gift(p: P) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...line} {...p}>
      <rect x="3" y="8" width="18" height="5" rx="1" />
      <path d="M5 13v7h14v-7M12 8v12M12 8c-2-4-6-4-6-1s4 1 6 1zm0 0c2-4 6-4 6-1s-4 1-6 1z" />
    </svg>
  );
}

/* Hero goal-chip icons */
export function Bars(p: P) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...line} {...p}>
      <path d="M6 4v16M12 4v16M18 4v16" />
    </svg>
  );
}

export function Coins(p: P) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...line} {...p}>
      <ellipse cx="12" cy="7" rx="7" ry="3" />
      <path d="M5 7v5c0 1.7 3.1 3 7 3s7-1.3 7-3V7M5 12v5c0 1.7 3.1 3 7 3s7-1.3 7-3v-5" />
    </svg>
  );
}

export function Card(p: P) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...line} {...p}>
      <rect x="3" y="6" width="18" height="12" rx="2" />
      <path d="M3 10h18" />
    </svg>
  );
}

export function Chart(p: P) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...line} {...p}>
      <path d="M4 20V10M10 20V4M16 20v-7M22 20H2" />
    </svg>
  );
}

export function Person(p: P) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...line} {...p}>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c0-4 3.6-7 8-7s8 3 8 7" />
    </svg>
  );
}
```

- [ ] **Step 7: Placeholder page so the app renders**

Replace `app/page.tsx`:

```tsx
export default function Home() {
  return <main />;
}
```

Delete the create-next-app sample assets: `public/next.svg`, `public/vercel.svg`, `public/file.svg`, `public/globe.svg`, `public/window.svg` (whichever exist).

- [ ] **Step 8: Check**

```powershell
npm run check
```

Expected: no tsc output, then `check-tokens: OK`.

Note: `check-tokens` scans `components/` only; `globals.css` is where the hex values are meant to live.

- [ ] **Step 9: Commit**

```powershell
git add -A
git commit -m "feat: design tokens, layout, UI primitives and icon set"
```

---

### Task 3: Content constants, Nav and Hero

**Files:**
- Create: `content/cdn.ts`, `content/nav.ts`, `content/hero.ts`
- Create: `components/sections/Nav.tsx`, `components/sections/Hero.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: CDN base**

Create `content/cdn.ts`:

```ts
// Assets are hotlinked from Fruitful's CDN for now; swap for /public files when the content changes.
export const CDN = "https://cdn.prod.website-files.com";
export const cdn = (path: string) => `${CDN}/${path}`;
```

- [ ] **Step 2: Nav content**

Create `content/nav.ts`:

```ts
export type NavLink = { label: string; href: string; hasMenu?: boolean };

export const nav = {
  brand: "fruitful",
  links: [
    { label: "Membership", href: "#", hasMenu: true },
    { label: "Guides", href: "#", hasMenu: false },
  ] satisfies NavLink[],
  login: { label: "Log in", href: "#" },
  cta: { label: "Get started", href: "#get-started" },
};
```

- [ ] **Step 3: Hero content**

Create `content/hero.ts`:

```ts
import { cdn } from "./cdn";

export type ChipIcon = "bars" | "coins" | "card" | "chart" | "person";

export const hero = {
  headline: ["Turn every paycheck", "into peace of mind."],
  subhead: [
    "Get a personalized money system that automatically puts every dollar to work.",
    "Bills, spending, saving, investing - all handled.",
  ],
  inputPlaceholder: "What’s your biggest money goal?",
  submitLabel: "Get my Money Map",
  chips: [
    { icon: "bars", label: "Get organized" },
    { icon: "coins", label: "Save more" },
    { icon: "card", label: "Pay off debt" },
    { icon: "chart", label: "Invest smarter" },
    { icon: "person", label: "End the stress" },
  ] satisfies { icon: ChipIcon; label: string }[],
  avatars: [
    cdn("69cfbe6dc5232f89913e70f6/6aaab916ef421c30b0029cea_amy--sm.jpg"),
    cdn("69cfbe6dc5232f89913e70f6/6aaab94be2c6c92881cc336f_eli--sm.jpg"),
    cdn("69cfbe6dc5232f89913e70f6/6aaab8e245b7b730d62a74da_raquel--sm.jpg"),
    cdn("69cfbe6dc5232f89913e70f6/6aaab95f009b9b4868d0a898_kath--sm.jpg"),
    cdn("69cfbe6dc5232f89913e70f6/6aaab955f8704cf2417fafb6_monica--sm.jpg"),
  ],
  trustedLabel: "Trusted by Thousands",
  // Decorative blurred Money Map fragments behind the headline
  fragments: [
    { label: "Monthly", value: "$9,000/month", tone: "cream" },
    { label: "Expenses", value: "$5,000", tone: "mint" },
    { label: "1st Goal", value: "$5,000 · OCT 2026", tone: "stone" },
    { label: "Financial Health", value: "Excellent", tone: "mint" },
  ] satisfies { label: string; value: string; tone: "cream" | "mint" | "stone" }[],
};
```

- [ ] **Step 4: Nav component**

Create `components/sections/Nav.tsx`:

```tsx
import { nav } from "@/content/nav";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Chevron, Leaf } from "@/components/icons";

export function Nav() {
  return (
    <header className="sticky top-0 z-50 bg-paper-white/90 backdrop-blur">
      <Container className="flex h-20 items-center justify-between gap-4">
        <a href="#" aria-label={`${nav.brand} home`} className="flex items-center gap-1.5 text-ink-black">
          <Leaf className="h-7 w-7" />
          <span className="text-heading-sm font-semibold tracking-tight">{nav.brand}</span>
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-1 rounded-nav bg-soft-mist p-1 md:flex">
          {nav.links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="inline-flex items-center gap-1 rounded-nav px-4 py-2 text-body font-medium text-ink-black hover:bg-paper-white"
            >
              {l.label}
              {l.hasMenu && <Chevron className="h-4 w-4" />}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Button variant="ghost" href={nav.login.href} className="hidden md:inline-flex">
            {nav.login.label}
          </Button>
          <Button href={nav.cta.href}>{nav.cta.label}</Button>
        </div>
      </Container>
    </header>
  );
}
```

- [ ] **Step 5: Hero component**

Create `components/sections/Hero.tsx`:

```tsx
import Image from "next/image";
import type { ComponentType, SVGProps } from "react";
import { hero, type ChipIcon } from "@/content/hero";
import { Container } from "@/components/ui/Container";
import { ArrowUp, Bars, Card, Chart, Coins, Person } from "@/components/icons";

const chipIcons: Record<ChipIcon, ComponentType<SVGProps<SVGSVGElement>>> = {
  bars: Bars,
  coins: Coins,
  card: Card,
  chart: Chart,
  person: Person,
};

const fragmentTone = {
  cream: "bg-apricot-cream text-warm-putty",
  mint: "bg-mint-wash text-deep-moss",
  stone: "bg-pale-stone text-graphite-text",
} as const;

const fragmentPos = ["left-[4%] top-[18%]", "right-[4%] top-[14%]", "left-[8%] bottom-[16%]", "right-[10%] bottom-[10%]"];

function Fragments() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 hidden lg:block">
      {hero.fragments.map((f, i) => (
        <div
          key={f.label}
          className={`absolute w-56 rounded-cards p-4 opacity-70 blur-[2px] ${fragmentPos[i]} ${fragmentTone[f.tone]}`}
        >
          <p className="text-caption uppercase tracking-wide">{f.label}</p>
          <p className="mt-1 text-subheading font-semibold">{f.value}</p>
        </div>
      ))}
    </div>
  );
}

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="bg-mint-glow relative overflow-hidden">
      <Fragments />
      <Container className="relative py-section-sm text-center md:py-section lg:py-section-lg">
        <h1
          id="hero-title"
          className="mx-auto max-w-5xl text-display-sm font-medium md:text-display lg:text-display-lg"
        >
          {hero.headline.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </h1>

        <p className="mx-auto mt-8 max-w-2xl text-subheading text-graphite-text">
          {hero.subhead.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </p>

        <div
          role="search"
          className="mx-auto mt-12 flex max-w-4xl items-center gap-3 rounded-pills border border-soft-mist bg-paper-white p-2 pl-6"
        >
          <input
            type="text"
            readOnly
            placeholder={hero.inputPlaceholder}
            aria-label={hero.inputPlaceholder}
            className="min-w-0 flex-1 bg-transparent text-subheading text-ink-black outline-none placeholder:text-graphite-text"
          />
          <a
            href="#get-started"
            aria-label={hero.submitLabel}
            className="flex h-14 w-14 shrink-0 items-center justify-center rounded-pills bg-forest-floor text-paper-white transition-colors hover:bg-deep-moss"
          >
            <ArrowUp className="h-6 w-6" />
          </a>
        </div>

        <ul className="mt-6 flex flex-wrap justify-center gap-3">
          {hero.chips.map((c) => {
            const Icon = chipIcons[c.icon];
            return (
              <li
                key={c.label}
                className="inline-flex items-center gap-2 rounded-pills border border-soft-mist bg-paper-white px-4 py-2 text-body text-graphite-text"
              >
                <Icon className="h-4 w-4" />
                {c.label}
              </li>
            );
          })}
        </ul>

        <div className="mt-16 flex flex-col items-center gap-3">
          <div className="flex -space-x-2">
            {hero.avatars.map((src) => (
              <Image
                key={src}
                src={src}
                alt=""
                width={36}
                height={36}
                className="h-9 w-9 rounded-pills border-2 border-paper-white object-cover"
              />
            ))}
          </div>
          <p className="text-body font-medium">{hero.trustedLabel}</p>
        </div>
      </Container>
    </section>
  );
}
```

- [ ] **Step 6: Mount in page**

Replace `app/page.tsx`:

```tsx
import { Nav } from "@/components/sections/Nav";
import { Hero } from "@/components/sections/Hero";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
      </main>
    </>
  );
}
```

- [ ] **Step 7: Check and eyeball**

```powershell
npm run check
```

Expected: `check-tokens: OK`. Then start the dev server in the background (`npm run dev`), open `http://localhost:3000`, confirm: sticky nav with wordmark / centre pill / Log in + Get started; 91px headline at ≥1024px; pill input with green arrow; five chips; avatar stack. No console errors.

- [ ] **Step 8: Commit**

```powershell
git add -A
git commit -m "feat: nav and hero sections"
```

---

### Task 4: Trust badges and Promise band

**Files:**
- Create: `content/trust.ts`, `content/promise.ts`
- Create: `components/sections/TrustBadges.tsx`, `components/sections/PromiseBand.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Trust content**

Create `content/trust.ts`:

```ts
import { cdn } from "./cdn";

export type BadgeLogo =
  | { kind: "image"; src: string; alt: string; width: number; height: number }
  | { kind: "trustpilot"; label: string };

export type Badge = { title: string; descriptor: string; href: string; logo: BadgeLogo };

export const trust = {
  eyebrow: "Trusted by Thousands",
  badges: [
    {
      title: "Best",
      descriptor: "Planning Platform",
      href: "#",
      logo: {
        kind: "image",
        src: cdn("69cfbe6dc5232f89913e70c2/69cfbe6dc5232f89913e72d1_FinTech.jpg"),
        alt: "FinTech Breakthrough Awards",
        width: 87,
        height: 80,
      },
    },
    {
      title: "Excellent",
      descriptor: "Rated 4.8 / 5",
      href: "https://www.trustpilot.com/review/fruitful.com",
      logo: { kind: "trustpilot", label: "Trustpilot" },
    },
    {
      title: "Best",
      descriptor: "Banking Card",
      href: "#",
      logo: {
        kind: "image",
        src: cdn("69cfbe6dc5232f89913e70c2/69cfbe6dc5232f89913e72d0_tearsheet.jpg"),
        alt: "Tearsheet",
        width: 133,
        height: 82,
      },
    },
  ] satisfies Badge[],
  disclaimer:
    "Reviews don’t reflect every member’s experience or guarantee future results. Third-party awards use their own criteria and don’t guarantee outcomes.",
};
```

- [ ] **Step 2: Promise content**

Create `content/promise.ts`:

```ts
export const promise = {
  headline: ["We don't just show you what to do.", "We make it happen."],
  subheadline: "Never stress again.",
  body: "Instead of wondering where your money went, know that every paycheck now has a plan. Your Money Map automatically organizes every dollar around the life you want.",
  madeFor: {
    title: "Made for your life.",
    tagline: "Real goals. Personalized Money Systems.",
    pills: ["Get organized", "Pay off debt", "Buy a Home", "Grow my Wealth"],
  },
};
```

- [ ] **Step 3: TrustBadges component**

Create `components/sections/TrustBadges.tsx`:

```tsx
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
```

- [ ] **Step 4: PromiseBand component**

Create `components/sections/PromiseBand.tsx`:

```tsx
import { promise } from "@/content/promise";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

export function PromiseBand() {
  return (
    <section aria-labelledby="promise-title" className="py-section-sm md:py-section lg:py-section-lg">
      <Container className="text-center">
        <Reveal>
          <h2 id="promise-title" className="mx-auto max-w-3xl text-heading font-medium md:text-display">
            {promise.headline.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h2>
        </Reveal>

        <div className="mx-auto mt-16 max-w-2xl">
          <h3 className="text-heading font-medium">{promise.subheadline}</h3>
          <p className="mt-4 text-subheading text-graphite-text">{promise.body}</p>
        </div>

        <div className="mt-12">
          <p className="text-heading-sm font-semibold">{promise.madeFor.title}</p>
          <p className="mt-1 text-body text-graphite-text">{promise.madeFor.tagline}</p>
          <ul className="mt-6 flex flex-wrap justify-center gap-3">
            {promise.madeFor.pills.map((pill) => (
              <li key={pill} className="rounded-pills bg-mint-wash px-5 py-2 text-body font-medium text-deep-moss">
                {pill}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
```

- [ ] **Step 5: Mount**

In `app/page.tsx`, add the imports and render after `<Hero />`:

```tsx
import { TrustBadges } from "@/components/sections/TrustBadges";
import { PromiseBand } from "@/components/sections/PromiseBand";
// …
      <main>
        <Hero />
        <TrustBadges />
        <PromiseBand />
      </main>
```

- [ ] **Step 6: Check, eyeball, commit**

```powershell
npm run check
git add -A
git commit -m "feat: trust badges and promise band"
```

Expected before commit: three laurel badges in a row at ≥768px with vivid-leaf laurels; promise headline at 60px; four mint pills.

---

### Task 5: Money Map mock, press row, dream machine

**Files:**
- Create: `content/moneyMap.ts`, `content/press.ts`, `content/features.ts`
- Create: `components/sections/MoneyMapMock.tsx`, `components/sections/PressRow.tsx`, `components/sections/DreamMachine.tsx`, `components/art/FeatureArt.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Money Map content**

Create `content/moneyMap.ts`:

```ts
export type Tone = "cream" | "sand" | "mint" | "stone";

export const moneyMap = {
  title: "Give every paycheck a plan",
  subtitle: "Your categorized monthly split",
  income: { label: "Take-home pay", amount: "$9,125" },
  split: [
    { label: "Bills", amount: "$4,375", tone: "sand" },
    { label: "Spend", amount: "$2,250", tone: "mint" },
    { label: "Goals", amount: "$2,500", tone: "stone" },
  ] satisfies { label: string; amount: string; tone: Tone }[],
  goalsHeading: "Projected goals timeline",
  goals: [
    { n: 1, label: "Vacation fund", amount: "$6,000", when: "JUL 2027" },
    { n: 2, label: "Home maintenance", amount: "$9,000", when: "JUL 2027" },
    { n: 3, label: "Retirement", amount: "$9,000", when: "OCT 2026" },
    { n: 4, label: "Annual / irregular expenses", amount: "$6,000", when: "OCT 2026" },
  ],
  footnote: "Examples shown for illustrative purposes only.",
};
```

- [ ] **Step 2: Press content**

Create `content/press.ts`:

```ts
import { cdn } from "./cdn";

export const press = {
  caption: "Talked about in:",
  logos: [
    { src: cdn("69cfbe6dc5232f89913e70c2/6a96deb69088f84fc6cd5edc_NY-times.png"), alt: "The New York Times", width: 904, height: 120 },
    { src: cdn("69cfbe6dc5232f89913e70c2/6a96deb6b18ab141ca3e6f6e_NW.png"), alt: "NerdWallet", width: 653, height: 106 },
    { src: cdn("69cfbe6dc5232f89913e70c2/6a96deb6b74eeefff0fac712_Wall%20Street.png"), alt: "The Wall Street Journal", width: 864, height: 82 },
    { src: cdn("69cfbe6dc5232f89913e70c2/6a96deb62b9ab24bb345edc3_Business%20Insider.png"), alt: "Business Insider", width: 859, height: 76 },
  ],
};
```

- [ ] **Step 3: Features content**

Create `content/features.ts`:

```ts
import { cdn } from "./cdn";

export type FeatureArt =
  | { kind: "question"; prompt: string; options: string[]; selected: number; image: string }
  | { kind: "flow"; labels: string[] }
  | { kind: "toggles"; rows: string[] }
  | { kind: "timeline"; ticks: string[]; bars: { label: string; pct: number }[] };

export type Feature = {
  title: string;
  body: string;
  footnote?: string;
  tone: "cream" | "stone";
  art: FeatureArt;
};

export const features = {
  headline: ["This is your financial", "dream machine."],
  items: [
    {
      title: "Built for you",
      body: "Tailored to your finances, goals, and timelines. Built in ~3 minutes*. Refined on a 1-on-1 chat with a Fruitful CFP Pro®.",
      footnote: "*Actual time may vary.",
      tone: "cream",
      art: {
        kind: "question",
        prompt: "What’s on your mind?",
        options: ["Get out of debt", "Create a money system", "Grow my wealth"],
        selected: 1,
        image: cdn("69cfbe6dc5232f89913e70f6/69cfbe6dc5232f89913e7373_20250317_Frutiful_Guide_Headshot_Andrea.avif"),
      },
    },
    {
      title: "Full Picture",
      body: "Covers your entire financial life, routing money to pay bills, manage spending, contribute to saving goals, and invest smartly.",
      tone: "stone",
      art: { kind: "flow", labels: ["Monthly bills", "Daily spend", "Goals"] },
    },
    {
      title: "Effortless",
      body: "Automates where your money goes every month with clarity about why. This is progress without stress.",
      tone: "stone",
      art: { kind: "toggles", rows: ["Pay bills", "Fund savings", "Invest"] },
    },
    {
      title: "Goal driven",
      body: "Know when you can expect to hit your goals if you implement this system.",
      tone: "cream",
      art: {
        kind: "timeline",
        ticks: ["TODAY", "6 MO", "1 YR"],
        bars: [
          { label: "Vacation fund", pct: 55 },
          { label: "Emergency fund", pct: 80 },
          { label: "Retirement", pct: 100 },
        ],
      },
    },
  ] satisfies Feature[],
};
```

- [ ] **Step 4: MoneyMapMock component**

Create `components/sections/MoneyMapMock.tsx`:

```tsx
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
                    <span className="block text-caption uppercase text-graphite-text">Goal {g.n}</span>
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
```

- [ ] **Step 5: PressRow component**

Create `components/sections/PressRow.tsx`:

```tsx
import Image from "next/image";
import { press } from "@/content/press";
import { Container } from "@/components/ui/Container";

export function PressRow() {
  return (
    <section aria-label="Press mentions" className="py-12">
      <Container className="text-center">
        <p className="text-body text-graphite-text">{press.caption}</p>
        <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
          {press.logos.map((l) => (
            <li key={l.alt}>
              <Image src={l.src} alt={l.alt} width={l.width} height={l.height} className="h-6 w-auto opacity-60 grayscale" />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
```

- [ ] **Step 6: FeatureArt**

Create `components/art/FeatureArt.tsx`:

```tsx
import Image from "next/image";
import type { FeatureArt as Art } from "@/content/features";
import { CheckCircle, Leaf } from "@/components/icons";

function Question({ art }: { art: Extract<Art, { kind: "question" }> }) {
  return (
    <div className="relative h-full">
      <div className="absolute left-2 top-4 w-56 -rotate-6 rounded-cards bg-paper-white p-4">
        <p className="text-body font-medium">{art.prompt}</p>
        <ul className="mt-3 space-y-2 text-caption text-graphite-text">
          {art.options.map((o, i) => (
            <li key={o} className="flex items-center gap-2">
              <span
                className={`h-3 w-3 rounded-pills border border-graphite-text ${i === art.selected ? "bg-forest-floor" : ""}`}
              />
              {o}
            </li>
          ))}
        </ul>
      </div>
      <div className="absolute bottom-0 right-2 h-40 w-32 overflow-hidden rounded-cards bg-sandstone/40">
        <Image src={art.image} alt="" fill sizes="128px" className="object-cover object-top" />
      </div>
    </div>
  );
}

function Flow({ art }: { art: Extract<Art, { kind: "flow" }> }) {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-4">
      <span className="flex h-14 w-14 items-center justify-center rounded-cards bg-vivid-leaf text-paper-white">
        <Leaf className="h-7 w-7" />
      </span>
      <span aria-hidden="true" className="h-6 w-px bg-graphite-text/40" />
      <ul className="grid w-full grid-cols-3 gap-2">
        {art.labels.map((l) => (
          <li key={l} className="flex flex-col items-center gap-2 rounded-cards bg-paper-white px-2 py-3 text-center">
            <CheckCircle className="h-5 w-5 text-forest-floor" />
            <span className="text-caption font-semibold uppercase tracking-wide text-graphite-text">{l}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Toggles({ art }: { art: Extract<Art, { kind: "toggles" }> }) {
  return (
    <ul className="flex h-full flex-col justify-center gap-3">
      {art.rows.map((r) => (
        <li key={r} className="flex items-center justify-between rounded-cards bg-paper-white px-4 py-3">
          <span className="text-body font-medium">{r}</span>
          <span aria-hidden="true" className="relative h-6 w-11 rounded-pills bg-forest-floor">
            <span className="absolute right-0.5 top-0.5 h-5 w-5 rounded-pills bg-paper-white" />
          </span>
        </li>
      ))}
    </ul>
  );
}

function Timeline({ art }: { art: Extract<Art, { kind: "timeline" }> }) {
  return (
    <div className="flex h-full flex-col justify-center gap-4">
      <div className="flex justify-between text-caption font-semibold uppercase tracking-wide text-graphite-text">
        {art.ticks.map((t) => (
          <span key={t}>{t}</span>
        ))}
      </div>
      <ul className="space-y-3">
        {art.bars.map((b) => (
          <li key={b.label}>
            <span className="text-caption text-graphite-text">{b.label}</span>
            <div className="mt-1 h-3 rounded-pills bg-paper-white">
              <div className="h-3 rounded-pills bg-vivid-leaf" style={{ width: `${b.pct}%` }} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function FeatureArt({ art }: { art: Art }) {
  switch (art.kind) {
    case "question":
      return <Question art={art} />;
    case "flow":
      return <Flow art={art} />;
    case "toggles":
      return <Toggles art={art} />;
    case "timeline":
      return <Timeline art={art} />;
  }
}
```

- [ ] **Step 7: DreamMachine component**

Create `components/sections/DreamMachine.tsx`:

```tsx
import { features } from "@/content/features";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { FeatureArt } from "@/components/art/FeatureArt";

function Bracket({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 800 100" aria-hidden="true" className={className}>
      <circle cx="400" cy="10" r="9" fill="currentColor" />
      <path
        d="M400 19v21M40 100V60q0-20 20-20h680q20 0 20 20v40"
        fill="none"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  );
}

const toneClass = { cream: "bg-apricot-cream", stone: "bg-pale-stone" } as const;

export function DreamMachine() {
  return (
    <section aria-labelledby="dream-title" className="py-section-sm md:py-section">
      <Container>
        <h2 id="dream-title" className="mx-auto max-w-2xl text-center text-heading font-medium md:text-display">
          {features.headline.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </h2>
        <Bracket className="mx-auto mt-8 hidden h-24 w-full max-w-3xl text-vivid-leaf md:block" />

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {features.items.map((f) => (
            <Reveal key={f.title} className={`rounded-images p-6 md:p-8 ${toneClass[f.tone]}`}>
              <div className="h-60">
                <FeatureArt art={f.art} />
              </div>
              <h3 className="mt-6 text-heading-sm font-semibold">{f.title}</h3>
              <p className="mt-2 text-body text-graphite-text">{f.body}</p>
              {f.footnote && <p className="mt-2 text-caption text-graphite-text">{f.footnote}</p>}
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
```

- [ ] **Step 8: Mount**

In `app/page.tsx` add imports and render, so `<main>` reads:

```tsx
import { MoneyMapMock } from "@/components/sections/MoneyMapMock";
import { PressRow } from "@/components/sections/PressRow";
import { DreamMachine } from "@/components/sections/DreamMachine";
// …
      <main>
        <Hero />
        <TrustBadges />
        <PromiseBand />
        <MoneyMapMock />
        <PressRow />
        <DreamMachine />
      </main>
```

- [ ] **Step 9: Check, eyeball, commit**

```powershell
npm run check
git add -A
git commit -m "feat: money map mock, press row and dream machine grid"
```

Expected: phone card centred on cream band; four grayscale logos; green bracket over a 2×2 tile grid whose art renders without layout overflow.

---

### Task 6: Steps and Testimonials

**Files:**
- Create: `content/steps.ts`, `content/testimonials.ts`
- Create: `components/art/StepArt.tsx`, `components/sections/Steps.tsx`, `components/sections/Testimonials.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Steps content**

Create `content/steps.ts`:

```ts
export type StepArt =
  | { kind: "tree" }
  | { kind: "chat" }
  | { kind: "switch"; label: string }
  | { kind: "list"; rows: string[] };

export type Step = { n: string; title: string; body: string; art: StepArt };

export const steps = {
  headline: "It’s all built for you.",
  subheadline: ["Just turn it on,", "and watch it work."],
  cta: { label: "Get Started", href: "#get-started" },
  items: [
    {
      n: "01",
      title: "Build It",
      body: "Answer a few simple questions. In minutes, we'll build a personalized Money Map showing exactly where every paycheck should go.",
      art: { kind: "tree" },
    },
    {
      n: "02",
      title: "Refine it",
      body: "Meet 1-on-1 with a Fruitful Guide, a CFP® professional who will answer your questions, fine-tune your plan, and activate your money system.",
      art: { kind: "chat" },
    },
    {
      n: "03",
      title: "Turn it on",
      body: "Accounts are opened, automations are set up, and everything is ready to run. No spreadsheets. No manual transfers.",
      art: { kind: "switch", label: "Money system on" },
    },
    {
      n: "04",
      title: "Watch it work",
      body: "Link your paycheck and let Fruitful do the rest. Every paycheck automatically funds your bills, spending, savings, investments, and goals.",
      art: { kind: "list", rows: ["Bills funded", "Spending funded", "Savings funded", "Investments funded"] },
    },
  ] satisfies Step[],
};
```

- [ ] **Step 2: Testimonials content**

Create `content/testimonials.ts`:

```ts
import { cdn } from "./cdn";

export type ReviewCard = { kind: "review"; name: string; title: string; body: string; href: string };
export type PortraitCard = { kind: "portrait"; name: string; role: string; quote: string; image: string };
export type TestimonialCard = ReviewCard | PortraitCard;

const portrait = (name: string, quote: string, image: string): PortraitCard => ({
  kind: "portrait",
  name,
  role: "Fruitful Member",
  quote,
  image,
});

export const testimonials = {
  headline: "People love Fruitful.",
  readMore: "Read more",
  cta: { label: "Go to Review Page", href: "https://www.trustpilot.com/review/fruitful.com" },
  cards: [
    {
      kind: "review",
      name: "Sydney D.",
      title: "I love having a fruitful membership!",
      body: "I love having a fruitful membership!! I was recommended by a friend and the expectations lived up. I love even the process of signing up and finding an advisor, the functionality of the app, feeling in control of my finances, and my advisor Naomi! Discussing finances takes a lot of vulnerability and Naomi has made me feel comfortable and confident. She breaks down my budget in a way that makes sense, hears me out on my goals and priorities, and makes budgets that are attainable. Truly enjoying my experience :)",
      href: "https://www.trustpilot.com/reviews/6907dd7c13761c148177082c",
    },
    portrait(
      "Amy",
      "“It’s given me a lot of peace and clarity around my finances.”",
      cdn("69cfbe6dc5232f89913e70f6/69cfbe6dc5232f89913e72f2_Amy%20Lima.avif"),
    ),
    {
      kind: "review",
      name: "Kevin",
      title: "Transformational personal finances",
      body: "Money has always felt like a suffocating experience. Working with our Fruitful coach has, for the first time our lives, made us feel like we were putting our money where it mattered most. The low subscription cost is well worth its weight in gold.",
      href: "https://www.trustpilot.com/reviews/67a411692ba94e5182f4cfb3",
    },
    portrait(
      "Kathleen",
      "“It has been pivotal with major life decisions.”",
      cdn("69cfbe6dc5232f89913e70f6/69cfbe6dc5232f89913e72f3_Kathleen%20Kaufmann.avif"),
    ),
    portrait(
      "Raquel",
      "“I'm excited about the milestones that I've hit.”",
      cdn("69cfbe6dc5232f89913e70f6/69cfbe6dc5232f89913e7276_Raquel%20Merilus.avif"),
    ),
    {
      kind: "review",
      name: "Christy",
      title: "Have Already Referred 4 Happy Friends!",
      body: "Fruitful was the best decision I’ve made for my finances. I thought I was managing okay — until I joined Fruitful and realized how disorganized things really were. My advisor helped me budget for an out-of-state move, buy a new car, optimize my investments, and start saving for my son’s college. It honestly feels like having a therapist for my finances — and I’ve never felt more in control.",
      href: "https://www.trustpilot.com/review/fruitful.com",
    },
    portrait(
      "Eli",
      "“I don't feel like I'm flying by the seat of my pants.”",
      cdn("65b22d2d8aafb9c10048b930/679071ed5930c29edd5e3e55_Eli%20Mann.avif"),
    ),
    {
      kind: "review",
      name: "Jen S.",
      title: "Over a year with Fruitful and thrilled!",
      body: "I have been with Fruitful for over a year now and it’s been an amazing experience! My advisor took the time to understand my challenges and my short- and long-term goals, then developed an easy to follow plan with action steps that helped me make progress quickly. I finally feel like my savings and investments are moving in the right direction and I am no longer feeling anxiety about my financial situation. So happy I took a leap and tried out Fruitful!",
      href: "https://www.trustpilot.com/review/fruitful.com",
    },
    {
      kind: "review",
      name: "Jason F.",
      title: "Fruitful has been life changing",
      body: "Fruitful has been life changing. As someone who use to work in the finance industry, I can speak to the value this app and our fruitful guide, Paige, have brought. Not only has she helped us with our budget (which has been awesome) but has also looked into our whole picture including my work benefits to ensure I’m getting the most out of them. She even let me know I had legal benefits that would allow us to set up a will at low cost, something I never even noticed. The money map has also been a game changer. Seriously stress free once you get it set up correctly. Highly recommend!",
      href: "https://www.trustpilot.com/review/fruitful.com",
    },
  ] satisfies TestimonialCard[],
};
```

- [ ] **Step 3: StepArt**

Create `components/art/StepArt.tsx`:

```tsx
import type { StepArt as Art } from "@/content/steps";
import { CheckCircle } from "@/components/icons";

function Tree() {
  return (
    <svg viewBox="0 0 280 160" aria-hidden="true" className="h-full w-full">
      <rect x="95" y="10" width="90" height="46" rx="12" className="fill-sandstone" />
      <path
        d="M140 56v30M140 86c-30 0-60 0-70 30M140 86v30M140 86c30 0 60 0 70 30"
        fill="none"
        className="stroke-graphite-text/40"
        strokeWidth="3"
      />
      <rect x="30" y="110" width="80" height="44" rx="12" className="fill-mint-wash" />
      <rect x="100" y="110" width="80" height="44" rx="12" className="fill-vivid-leaf" />
      <rect x="170" y="110" width="80" height="44" rx="12" className="fill-apricot-cream" />
    </svg>
  );
}

function Chat() {
  return (
    <div className="flex h-full flex-col justify-center gap-3">
      <div className="w-3/5 rounded-images rounded-bl-cards bg-vivid-leaf p-4">
        <span className="block h-2 w-3/4 rounded-pills bg-paper-white/80" />
        <span className="mt-2 block h-2 w-1/2 rounded-pills bg-paper-white/80" />
      </div>
      <div className="w-3/5 self-end rounded-images rounded-br-cards bg-mint-wash p-4">
        <span className="block h-2 w-3/4 rounded-pills bg-paper-white" />
        <span className="mt-2 block h-2 w-1/2 rounded-pills bg-paper-white" />
      </div>
    </div>
  );
}

function Switch({ label }: { label: string }) {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-4">
      <span className="relative h-16 w-32 rounded-pills bg-forest-floor" aria-hidden="true">
        <span className="absolute right-1 top-1 h-14 w-14 rounded-pills bg-paper-white" />
      </span>
      <span className="text-body font-medium text-graphite-text">{label}</span>
    </div>
  );
}

function List({ rows }: { rows: string[] }) {
  return (
    <ul className="flex h-full flex-col justify-center gap-2">
      {rows.map((r) => (
        <li key={r} className="flex items-center gap-3 rounded-cards bg-pale-stone px-4 py-2 text-body">
          <CheckCircle className="h-5 w-5 text-bright-sprout" />
          {r}
        </li>
      ))}
    </ul>
  );
}

export function StepArt({ art }: { art: Art }) {
  switch (art.kind) {
    case "tree":
      return <Tree />;
    case "chat":
      return <Chat />;
    case "switch":
      return <Switch label={art.label} />;
    case "list":
      return <List rows={art.rows} />;
  }
}
```

- [ ] **Step 4: Steps component**

Create `components/sections/Steps.tsx`:

```tsx
import { steps } from "@/content/steps";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { StepArt } from "@/components/art/StepArt";

export function Steps() {
  return (
    <section aria-labelledby="steps-title" className="py-section-sm md:py-section">
      <Container className="grid gap-12 lg:grid-cols-[1fr_1.2fr]">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <h2 id="steps-title" className="text-heading font-medium md:text-heading-lg">
            <span className="block">{steps.headline}</span>
            {steps.subheadline.map((line) => (
              <span key={line} className="block text-graphite-text">
                {line}
              </span>
            ))}
          </h2>
          <div className="mt-8">
            <Button href={steps.cta.href}>{steps.cta.label}</Button>
          </div>
        </div>

        <ol className="relative space-y-8 lg:pl-16">
          <span aria-hidden="true" className="absolute left-5 top-0 hidden h-full w-0.5 bg-vivid-leaf lg:block" />
          {steps.items.map((s) => (
            <li key={s.n} className="relative">
              <span className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-pills bg-vivid-leaf text-body font-medium text-paper-white lg:absolute lg:-left-16 lg:top-10 lg:mb-0">
                {s.n}
              </span>
              <Reveal className="rounded-images border border-soft-mist bg-paper-white p-8 md:p-10">
                <div className="h-44">
                  <StepArt art={s.art} />
                </div>
                <h3 className="mt-6 text-heading-sm font-semibold">{s.title}</h3>
                <p className="mt-2 text-body text-graphite-text">{s.body}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
```

- [ ] **Step 5: Testimonials component**

Create `components/sections/Testimonials.tsx`:

```tsx
import Image from "next/image";
import { testimonials, type PortraitCard, type ReviewCard } from "@/content/testimonials";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Play, Stars } from "@/components/icons";

function Review({ card }: { card: ReviewCard }) {
  return (
    <article className="flex flex-col rounded-images bg-paper-white p-6 shadow-md">
      <div className="flex items-center gap-2">
        <Stars className="h-5 w-auto" />
        <span className="text-body text-graphite-text">{card.name}</span>
      </div>
      <h3 className="mt-3 text-heading-sm font-semibold">
        <a href={card.href}>{card.title}</a>
      </h3>
      <p className="mt-4 line-clamp-6 text-body text-graphite-text">{card.body}</p>
      <a
        href={card.href}
        className="mt-6 inline-flex w-fit rounded-cards bg-pale-stone px-5 py-2 text-body font-medium text-ink-black"
      >
        {testimonials.readMore}
      </a>
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
    <section aria-labelledby="love-title" className="py-section-sm md:py-section">
      <Container>
        <h2 id="love-title" className="text-heading font-medium md:text-heading-lg">
          {testimonials.headline}
        </h2>
        <div className="mt-10 grid grid-flow-dense gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {testimonials.cards.map((c) =>
            c.kind === "review" ? <Review key={c.name} card={c} /> : <Portrait key={c.name} card={c} />,
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
```

- [ ] **Step 6: Mount**

Add to `app/page.tsx` after `<DreamMachine />`:

```tsx
import { Steps } from "@/components/sections/Steps";
import { Testimonials } from "@/components/sections/Testimonials";
// …
        <DreamMachine />
        <Steps />
        <Testimonials />
```

- [ ] **Step 7: Check, eyeball, commit**

```powershell
npm run check
git add -A
git commit -m "feat: steps timeline and testimonials grid"
```

Expected: at ≥1024px the left "It's all built for you" column sticks while four numbered cards scroll past a green line; testimonial grid shows white review cards and cream portrait cards with real photos.

---

### Task 7: Products, Free CTA, FAQ, Footer, final assembly

**Files:**
- Create: `content/products.ts`, `content/freeCta.ts`, `content/faq.ts`, `content/footer.ts`
- Create: `components/sections/Products.tsx`, `components/sections/FreeCta.tsx`, `components/sections/Faq.tsx`, `components/sections/Footer.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Products content**

Create `content/products.ts`:

```ts
import { cdn } from "./cdn";

export const products = {
  headline: ["Powered by better-for-you", "financial products."],
  items: [
    {
      title: "Spend",
      body: "Earn up to 2% cash back² on all of your spending with Fruitful Card. Never carry a balance or get charged interest.",
      image: cdn("69cfbe6dc5232f89913e70c2/6a96cd38ca88859382a3c874_h-products--01.png"),
    },
    {
      title: "Save",
      body: "Whether you plan to save or spend it, earn up to 4.00% APY¹ on all your money in Fruitful cash accounts.",
      image: cdn("69cfbe6dc5232f89913e70c2/6a96cd383c4ef645125c695f_h-products--02.png"),
    },
    {
      title: "Invest",
      body: "A smarter way to start or scale your investing. Tailored portfolios with tailored advice.",
      image: cdn("69cfbe6dc5232f89913e70c2/6a96cd37eb45c5d8ea66148c_h-products--03.png"),
    },
  ],
};
```

- [ ] **Step 2: Free CTA content**

Create `content/freeCta.ts`:

```ts
export type StatIcon = "bolt" | "gift";

export const freeCta = {
  headline: ["Build your future now.", "For free."],
  stats: [
    { icon: "bolt", label: "~3 minutes to get your Money Map" },
    { icon: "gift", label: "No payment required" },
  ] satisfies { icon: StatIcon; label: string }[],
  bullets: [
    "Know exactly where every paycheck should go",
    "Automatically fund bills, spending, savings & goals",
    "Get 1-on-1 help from a financial professional",
    "Grow your money with pro investment management",
    "Earn up to 4.00% APY¹ on all of your cash",
    "Earn up to 2% cash back on spend²",
  ],
  cta: { label: "Get my Money Map", href: "#" },
};
```

- [ ] **Step 3: FAQ content**

Create `content/faq.ts`:

```ts
export type FaqItem = { q: string; a: string[] };

export const faq = {
  headline: "Frequently asked Questions",
  items: [
    {
      q: "What is Fruitful?",
      a: [
        "Fruitful is a personal finance platform that shows you what to do with your money, then makes it happen. You get a money system built for you, 1-on-1 help from CFP® professionals, and smarter ways to spend, save, and invest, all working together to keep you organized and moving toward your goals.",
      ],
    },
    {
      q: "What is a Money Map?",
      a: [
        "Your Money Map is the personalized plan for your money. It shows you exactly where every paycheck should go, across bills, spending, saving, investing, and when you’ll hit your goals. Then Fruitful helps you put it all into action automatically.",
      ],
    },
    {
      q: "How much does Fruitful cost?",
      a: [
        "There’s no cost to get started with Fruitful. You can get fully set up, meet with your Guide, use your money system, and access Fruitful’s financial products with no membership fee. Some fees may apply depending on how you invest.",
        "When you sign up, your first 3 months of Premium are included at no cost. After that, you can keep Premium for $999/year or continue with Fruitful at $0 membership. Either way, your Money System keeps working for you.",
        "Premium gives you more ongoing access to your Guide, higher rewards, and no investment management fees.",
        "Learn more about Fruitful Premium →",
      ],
    },
    {
      q: "What is a Fruitful Guide?",
      a: [
        "Think of your Guide as a personal financial expert. They’re a CFP® professional who gets to know you, your money, and your goals, then helps you fine-tune your Money Map, make smart decisions, and put your plan into action.",
        "Every Fruitful Guide is a CERTIFIED FINANCIAL PLANNER™ professional, which means they’ve met rigorous standards for education, experience, and ethics, and are required to put your interests first. They’re also registered investment adviser representatives with Fruitful.",
      ],
    },
    {
      q: "How do I connect with my Guide?",
      a: [
        "We’ll get your money system set-up and working through 1-to-1 video sessions focused on organizing your finances, setting goals, building wealth, and making real progress. Once we’ve built a strong foundation and set up your system, we’ll help you keep growing while adapting to whatever life throws your way by providing ongoing advice and support through anytime messaging and ongoing sessions. Feel supported at every stage of your journey, wherever it leads.",
        "Learn more about what’s included in your membership here.",
      ],
    },
    {
      q: "How do I know I can trust Fruitful?",
      a: [
        "At Fruitful, your money is held with established financial institutions built to keep it safe.",
        "Fruitful Cash accounts are held at Emigrant Bank, Member FDIC, a bank founded in 1850 and one of the largest privately held banks in the country.",
        "Your investments are held and cleared by Apex Clearing Corporation, Member FINRA/SIPC, one of the largest investment custodians in the U.S. Apex holds more than $276 billion in assets.",
        "And the people helping you make financial decisions are held to high standards, too. Fruitful Advisory is an SEC-registered investment adviser, and every Fruitful Guide is a CERTIFIED FINANCIAL PLANNER™ professional and investment adviser representative.",
      ],
    },
    {
      q: "How do I contact Fruitful?",
      a: [
        "For general inquiries, email hello@fruitful.com.",
        "For member support, email support@fruitful.com.",
      ],
    },
  ] satisfies FaqItem[],
};
```

- [ ] **Step 4: Footer content**

Create `content/footer.ts`:

```ts
import { cdn } from "./cdn";

export const footer = {
  columns: [
    { heading: "Explore Fruitful", links: ["Pricing", "Save & Spend", "Guidance", "Invest"] },
    { heading: "Company", links: ["Press", "Guides", "Careers", "Legal"] },
    { heading: "Social", links: ["Instagram", "LinkedIn", "TikTok"] },
    { heading: "Support", links: ["Hospitality Desk"] },
  ],
  illustrations: [
    { src: cdn("69cfbe6dc5232f89913e70c2/69cfbe6dc5232f89913e7163_Investing%20illustration.png"), alt: "Illustration of hands with money and a sunflower" },
    { src: cdn("69cfbe6dc5232f89913e70c2/69cfbe6dc5232f89913e7164_illustration-borrow%20(1).png"), alt: "Illustration of a hand picking fruits" },
    { src: cdn("69cfbe6dc5232f89913e70c2/69cfbe6dc5232f89913e7166_Illustration%20saving.png"), alt: "Illustration of a man putting apples in a basket" },
    { src: cdn("69cfbe6dc5232f89913e70c2/69cfbe6dc5232f89913e7165_Spending.png"), alt: "Illustration of a woman with multiple plants in a shopping cart" },
  ],
  legal: [
    "Certified Financial Planner Board of Standards, Inc. (CFP Board) owns the CFP® certification mark, the CERTIFIED FINANCIAL PLANNER™ certification mark, and the CFP® certification mark (with plaque design) logo in the United States, which it authorizes use of by individuals who successfully complete CFP Board’s initial and ongoing certification requirements.",
    "Investment products and services provided by Fruitful Advisory, LLC are NOT FDIC INSURED, NOT BANK GUARANTEED, and MAY LOSE VALUE.",
    "Fruitful is a financial technology company, not a bank. Deposit accounts provided by Emigrant Bank, Member FDIC. The Fruitful Card is issued by Emigrant Bank pursuant to license by Mastercard International Incorporated.",
    "Funds in your Fruitful deposit account(s) are held at Emigrant Bank, Member FDIC and are eligible for FDIC insurance up to $250,000, inclusive of any other deposits you may already hold at the bank in the same ownership capacity. Fruitful Financial, LLC is not an FDIC-insured bank and FDIC insurance only covers the failure of Emigrant Bank. Fruitful Financial, LLC, must satisfy certain conditions for pass-through deposit insurance coverage to apply.",
    "We provide links to third-party websites for your convenience and informational purposes only. Fruitful is not responsible for the content or accuracy of these sites, and their inclusion does not represent an endorsement. Please note that some sites may require a subscription. Any mention of securities should not be considered a recommendation or indication of future performance.",
    "1 The 4.00% Annual Percentage Yield (APY) is only available to members with Solo, Joint, Essential, Plus or Premium Memberships, otherwise, 3.00% APY will apply. The APYs are effective as of September 18th, 2026, are variable and may change at any time. No minimum balance required. Must have $0.01 in deposits to earn interest. Fees may reduce earnings. See Fruitful Deposit Account Agreement for more details.",
    "2 Members are eligible for 2% cash back if they have a Premium Membership or have a Solo, Joint, Essential, or Plus Membership and receive a qualifying direct deposit into their Fruitful Cash Account. Members who do not meet these requirements earn 1% cash back. See the Fruitful Card Rewards Program Terms and Conditions for complete details.",
    "3 Fruitful relies on information from various sources believed to be reliable, including information from its Members, Clients, and other third parties, but cannot guarantee the accuracy or completeness of that information.",
  ],
  copyright:
    "© Fruitful 2026 — All rights reserved. “Fruitful” refers to Fruitful, Inc. and its wholly-owned, affiliated, and separately managed subsidiaries, Fruitful Financial, LLC and Fruitful Advisory, LLC, an SEC-registered investment adviser. To learn more about Fruitful Advisory, LLC please view its Form ADV Part 2 and Form CRS available at www.adviserinfo.sec.gov. Registration with the SEC does not imply any level of skill or training. This information is provided by Fruitful for educational and illustrative purposes only and is not considered an offer, solicitation of an offer, advice, or recommendation to buy, sell, or hold any security. All investing involves risk, including the risk of losing the money you invest and past performance does not guarantee future performance. Only members of Fruitful have access to products and services across the Fruitful affiliates and subsidiaries.",
};
```

- [ ] **Step 5: Products component**

Create `components/sections/Products.tsx`:

```tsx
import Image from "next/image";
import { products } from "@/content/products";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

const tilt = ["lg:-rotate-3", "", "lg:rotate-3"];

export function Products() {
  return (
    <section aria-labelledby="products-title" className="overflow-hidden py-section-sm md:py-section">
      <Container>
        <h2 id="products-title" className="mx-auto max-w-2xl text-center text-heading font-medium md:text-display">
          {products.headline.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </h2>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {products.items.map((p, i) => (
            <Reveal key={p.title} className={`rounded-images bg-paper-white p-6 shadow-md ${tilt[i]}`}>
              <div className="overflow-hidden rounded-cards bg-pale-stone">
                <Image src={p.image} alt="" width={720} height={568} className="h-auto w-full" />
              </div>
              <h3 className="mt-6 text-heading-sm font-semibold">{p.title}</h3>
              <p className="mt-2 text-body text-graphite-text">{p.body}</p>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
```

- [ ] **Step 6: FreeCta component**

Create `components/sections/FreeCta.tsx`:

```tsx
import type { ComponentType, SVGProps } from "react";
import { freeCta, type StatIcon } from "@/content/freeCta";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Bolt, CheckCircle, Gift } from "@/components/icons";

const statIcons: Record<StatIcon, ComponentType<SVGProps<SVGSVGElement>>> = { bolt: Bolt, gift: Gift };

export function FreeCta() {
  return (
    <section id="get-started" aria-labelledby="free-title" className="bg-mint-glow py-section-sm md:py-section lg:py-section-lg">
      <Container className="text-center">
        <h2 id="free-title" className="mx-auto max-w-2xl text-heading font-medium md:text-display">
          {freeCta.headline.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </h2>

        <ul className="mt-10 flex flex-wrap justify-center gap-8">
          {freeCta.stats.map((s) => {
            const Icon = statIcons[s.icon];
            return (
              <li key={s.label} className="flex items-center gap-3 text-left text-subheading text-graphite-text">
                <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-pills bg-paper-white text-vivid-leaf">
                  <Icon className="h-7 w-7" />
                </span>
                <span className="max-w-40">{s.label}</span>
              </li>
            );
          })}
        </ul>

        <div className="mx-auto mt-10 max-w-3xl rounded-images bg-paper-white p-8 text-left md:p-10">
          <ul className="space-y-4">
            {freeCta.bullets.map((b) => (
              <li key={b} className="flex items-center gap-3 text-subheading">
                <CheckCircle className="h-6 w-6 shrink-0 text-bright-sprout" />
                {b}
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <Button full href={freeCta.cta.href}>
              {freeCta.cta.label}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
```

- [ ] **Step 7: Faq component**

Create `components/sections/Faq.tsx`:

```tsx
import { faq } from "@/content/faq";
import { Container } from "@/components/ui/Container";
import { Chevron } from "@/components/icons";

export function Faq() {
  return (
    <section aria-labelledby="faq-title" className="py-section-sm md:py-section">
      <Container>
        <div className="mx-auto max-w-3xl">
          <h2 id="faq-title" className="text-center text-heading font-medium">
            {faq.headline}
          </h2>
          <div className="mt-10 divide-y divide-soft-mist border-y border-soft-mist">
            {faq.items.map((item, i) => (
              <details key={item.q} open={i === 0} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-subheading font-medium">
                  <span>{item.q}</span>
                  <Chevron className="h-5 w-5 shrink-0 transition-transform group-open:rotate-180" />
                </summary>
                <div className="mt-4 space-y-4 text-body text-graphite-text">
                  {item.a.map((p) => (
                    <p key={p}>{p}</p>
                  ))}
                </div>
              </details>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
```

- [ ] **Step 8: Footer component**

Create `components/sections/Footer.tsx`:

```tsx
import Image from "next/image";
import { footer } from "@/content/footer";
import { Container } from "@/components/ui/Container";
import { Leaf } from "@/components/icons";

export function Footer() {
  return (
    <footer className="border-t border-soft-mist py-section-sm md:py-section">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1fr_auto] lg:items-end">
          <nav aria-label="Footer" className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {footer.columns.map((c) => (
              <div key={c.heading}>
                <p className="text-body font-medium">{c.heading}</p>
                <ul className="mt-3 space-y-2">
                  {c.links.map((l) => (
                    <li key={l}>
                      <a href="#" className="text-body text-graphite-text hover:text-ink-black">
                        {l}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
          <Leaf className="h-40 w-40 text-ink-black lg:justify-self-end" />
        </div>

        <ul className="mt-16 flex flex-wrap justify-center gap-8">
          {footer.illustrations.map((il) => (
            <li key={il.src}>
              <Image src={il.src} alt={il.alt} width={140} height={140} className="h-28 w-auto" />
            </li>
          ))}
        </ul>

        <div className="mx-auto mt-16 max-w-4xl space-y-4 text-legal text-graphite-text">
          {footer.legal.map((p) => (
            <p key={p}>{p}</p>
          ))}
          <p>{footer.copyright}</p>
        </div>
      </Container>
    </footer>
  );
}
```

- [ ] **Step 9: Final page assembly**

Replace `app/page.tsx` entirely:

```tsx
import { Nav } from "@/components/sections/Nav";
import { Hero } from "@/components/sections/Hero";
import { TrustBadges } from "@/components/sections/TrustBadges";
import { PromiseBand } from "@/components/sections/PromiseBand";
import { MoneyMapMock } from "@/components/sections/MoneyMapMock";
import { PressRow } from "@/components/sections/PressRow";
import { DreamMachine } from "@/components/sections/DreamMachine";
import { Steps } from "@/components/sections/Steps";
import { Testimonials } from "@/components/sections/Testimonials";
import { Products } from "@/components/sections/Products";
import { FreeCta } from "@/components/sections/FreeCta";
import { Faq } from "@/components/sections/Faq";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <TrustBadges />
        <PromiseBand />
        <MoneyMapMock />
        <PressRow />
        <DreamMachine />
        <Steps />
        <Testimonials />
        <Products />
        <FreeCta />
        <Faq />
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 10: Check and commit**

```powershell
npm run check
git add -A
git commit -m "feat: products, free CTA, FAQ and footer; assemble full page"
```

---

### Task 8: Verification against the spec

**Files:** none new (screenshots go to the scratchpad directory)

- [ ] **Step 1: Production build**

```powershell
npm run build
```

Expected: "Compiled successfully", route `/` listed as static (○), zero type errors, zero warnings about images.

- [ ] **Step 2: Token guard + tsc**

```powershell
npm run check
```

Expected: `check-tokens: OK`.

- [ ] **Step 3: Desktop screenshot**

With `npm run dev` running, use headless Chrome (chrome-devtools MCP: `new_page` → `resize_page` 1440×900 → `take_screenshot fullPage`) and save to the scratchpad. Compare against `scratchpad/fruitful-full.jpeg`: same 13 sections in the same order; hero headline ~91px; laurels visible; 2×2 dream-machine grid; sticky steps header; 4-col testimonial grid; 3 product cards; mint CTA band; FAQ; footer.

- [ ] **Step 4: Mobile screenshot + no horizontal scroll**

Resize to 390×844, screenshot full page, then run:

```js
() => ({ scrollWidth: document.documentElement.scrollWidth, innerWidth: window.innerWidth })
```

Expected: `scrollWidth === innerWidth` (390). Single column everywhere, nav shows wordmark + Get started only.

- [ ] **Step 5: Fix anything found, re-run Steps 1–4, commit**

```powershell
git add -A
git commit -m "fix: responsive polish from screenshot review"
```

(Skip the commit if nothing changed.)
