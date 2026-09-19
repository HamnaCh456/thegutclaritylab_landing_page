# Landing Page Polish Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refine the GCL practitioner landing page within its current look — crisp hero fragments, a stat strip instead of laurels, real hierarchy in the promise section, one card/hover rule, consistent rhythm — with no copy or structure changes.

**Architecture:** Every change is a component or `globals.css` edit; `content/*.ts` is untouched. Two new CSS utilities (`card-lift`, `--animate-float`) and one new `Reveal` prop (`delay`) carry all the motion. Verification is `npm run check` (tsc + raw-colour guard) plus headless-Chrome renders at 1280 and 390 — there is no test runner in this repo, and these are pure presentational changes.

**Tech Stack:** Next 16.3.5, React 19, Tailwind v4 (`@theme`, `@utility`), headless Chrome for renders.

Spec: `docs/superpowers/specs/2026-09-19-landing-polish-design.md`.

---

## File map

| File | Change |
|---|---|
| `app/globals.css` | `--animate-float` keyframes; `card-lift` utility; reduced-motion guard |
| `components/ui/Reveal.tsx` | `delay` prop → `transitionDelay` |
| `components/sections/Hero.tsx` | crisp floating fragments, input focus ring, chip hover, Leaf caption |
| `components/sections/TrustBadges.tsx` | laurels → stat strip |
| `components/sections/PromiseBand.tsx` | hierarchy + bordered "made for" strip |
| `components/sections/PressRow.tsx` | `py-section-sm`, chip hover |
| `components/sections/DreamMachine.tsx` | `card-lift`, stagger |
| `components/sections/Steps.tsx` | `card-lift`, stagger |
| `components/sections/Testimonials.tsx` | `card-lift`, stagger via Reveal |
| `components/sections/Products.tsx` | `card-lift`, stagger |
| `components/sections/FreeCta.tsx` | `card-lift` on bullet card |
| `components/sections/Faq.tsx` | chevron circle, summary hover |
| `components/sections/Footer.tsx` | link underline, legal block cap |
| `components/sections/Nav.tsx` | client component, hairline on scroll |
| `DESIGN.md` | "Motion & hover" note |

Verification commands used throughout (run from `C:\Users\LENOVO\Desktop\fruitful-clone`):

```bash
npm run check          # tsc --noEmit && node scripts/check-tokens.mjs → "check-tokens: OK"
```

Render (dev server is already up on :3400; `$S` = the session scratchpad dir):

```bash
"/c/Program Files/Google/Chrome/Application/chrome.exe" --headless --disable-gpu --hide-scrollbars \
  --no-first-run --force-prefers-reduced-motion --user-data-dir="$S/chrome-profile" \
  --window-size=1280,12000 --force-device-scale-factor=1 --virtual-time-budget=14000 \
  --screenshot="$S/shots/after-1280.png" "http://localhost:3400/"
```

---

### Task 0: Branch

- [ ] **Step 1:** `git checkout -b polish/landing`
- [ ] **Step 2:** `git add docs/superpowers && git commit -m "docs: landing polish spec and plan"`

### Task 1: Motion utilities

**Files:** Modify `app/globals.css`, `components/ui/Reveal.tsx`

- [ ] **Step 1:** In `app/globals.css`, inside `@theme { … }` after the `--shadow-md` line, add:

```css
  /* Hero fragments only — a slow drift, disabled under prefers-reduced-motion via motion-safe: */
  --animate-float: float 7s ease-in-out infinite;
  @keyframes float {
    0%, 100% { translate: 0 0; }
    50% { translate: 0 -8px; }
  }
```

`translate` and `rotate` are independent CSS properties, so the keyframe leaves Tailwind's `rotate-*` (which sets `rotate:`) untouched.

- [ ] **Step 2:** After the `@utility bg-mint-glow { … }` block add:

```css
/* One hover rule for every card: lift 2px and take the one elevated shadow. */
@utility card-lift {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
  }
  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
}
```

- [ ] **Step 3:** Replace `components/ui/Reveal.tsx` with:

```tsx
"use client";

import { useEffect, useRef, type ReactNode } from "react";

type Props = { children: ReactNode; className?: string; delay?: number };

// delay (ms) staggers siblings in a grid; ignored under prefers-reduced-motion (no transition).
export function Reveal({ children, className = "", delay = 0 }: Props) {
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
    <div ref={ref} className={`reveal ${className}`} style={delay ? { transitionDelay: `${delay}ms` } : undefined}>
      {children}
    </div>
  );
}
```

- [ ] **Step 4:** `npm run check` → `check-tokens: OK`, tsc silent.

### Task 2: Hero

**Files:** Modify `components/sections/Hero.tsx`

- [ ] **Step 1:** Add `Leaf` to the icons import: `import { ArrowUp, Bars, Card, Chart, Coins, Leaf, Person } from "@/components/icons";`

- [ ] **Step 2:** Replace `fragmentPos` and `Fragments` with:

```tsx
const fragmentPos = ["left-[2%] top-[22%]", "right-[2%] top-[18%]", "left-[5%] bottom-[14%]", "right-[6%] bottom-[8%]"];
const fragmentTilt = ["-rotate-3", "rotate-2", "rotate-2", "-rotate-2"];

function Fragments() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 hidden xl:block">
      {hero.fragments.map((f, i) => (
        <div
          key={f.label}
          style={{ animationDelay: `${i * 1.3}s` }}
          className={`absolute w-48 rounded-cards border border-soft-mist p-4 opacity-90 shadow-md motion-safe:animate-float ${fragmentPos[i]} ${fragmentTilt[i]} ${fragmentTone[f.tone]}`}
        >
          <p className="text-caption uppercase tracking-wide">{f.label}</p>
          <p className="mt-1 text-subheading font-semibold">{f.value}</p>
        </div>
      ))}
    </div>
  );
}
```

- [ ] **Step 3:** Input shell — change its className to:

```
mx-auto mt-12 flex max-w-4xl items-center gap-3 rounded-pills border border-soft-mist bg-paper-white p-2 pl-6 transition-colors focus-within:border-forest-floor focus-within:ring-2 focus-within:ring-forest-floor/20
```

- [ ] **Step 4:** Chip `<li>` className — append ` transition-colors hover:bg-pale-stone`.

- [ ] **Step 5:** Replace the trusted label paragraph with:

```tsx
          <p className="inline-flex items-center gap-2 text-body font-medium text-graphite-text">
            <Leaf className="h-4 w-4 text-forest-floor" />
            {hero.trustedLabel}
          </p>
```

- [ ] **Step 6:** `npm run check` → OK.

### Task 3: Trust row → stat strip

**Files:** Modify `components/sections/TrustBadges.tsx`

- [ ] **Step 1:** Change the icons import to `import { Stars, TrustStar } from "@/components/icons";` (drop `Laurel`).

- [ ] **Step 2:** Replace the `TrustBadges` function with:

```tsx
export function TrustBadges() {
  return (
    <section aria-labelledby="trust-title" className="py-section-sm md:py-section">
      <Container className="text-center">
        <p id="trust-title" className="text-subheading font-medium">
          {trust.eyebrow}
        </p>

        <div className="mx-auto mt-10 grid max-w-4xl divide-y divide-soft-mist md:grid-cols-3 md:divide-x md:divide-y-0">
          {trust.badges.map((b) => (
            <a
              key={b.descriptor}
              href={b.href}
              className="flex flex-col items-center gap-2 rounded-cards px-6 py-8 transition-colors hover:bg-pale-stone/60"
            >
              <span aria-hidden="true" className="h-2 w-2 rounded-pills bg-vivid-leaf" />
              <p className="text-heading font-medium tracking-tight md:text-heading-lg">{b.title}</p>
              <p className="text-subheading text-graphite-text">{b.descriptor}</p>
              {b.logo && (
                <div className="mt-2 flex justify-center">
                  <Logo logo={b.logo} />
                </div>
              )}
            </a>
          ))}
        </div>

        <p className="mx-auto mt-10 max-w-2xl text-legal text-graphite-text">{trust.disclaimer}</p>
      </Container>
    </section>
  );
}
```

- [ ] **Step 3:** `npm run check` → OK (unused `Laurel` export is fine; it is not imported anywhere else — confirm with `grep -rn Laurel components app`, expecting only `icons.tsx`).

### Task 4: Promise hierarchy

**Files:** Modify `components/sections/PromiseBand.tsx`

- [ ] **Step 1:** Replace everything after the `<Reveal>…</Reveal>` block inside `<Container>` with:

```tsx
        <div className="mx-auto mt-12 max-w-2xl">
          <h3 className="text-heading-sm font-semibold">{promise.subheadline}</h3>
          <p className="mt-3 text-subheading text-graphite-text">{promise.body}</p>
        </div>

        <div className="mx-auto mt-14 max-w-3xl rounded-images border border-soft-mist p-8 md:p-10">
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
```

- [ ] **Step 2:** `npm run check` → OK.

### Task 5: Rhythm & card rule

**Files:** Modify `PressRow.tsx`, `DreamMachine.tsx`, `Steps.tsx`, `Testimonials.tsx`, `Products.tsx`, `FreeCta.tsx`

- [ ] **Step 1 — PressRow:** section className `py-12` → `py-section-sm`; text-pill `<li>` className append ` transition-colors hover:bg-pale-stone`.

- [ ] **Step 2 — DreamMachine:** the `features.items.map((f) =>` becomes `features.items.map((f, i) =>` and the Reveal is:

```tsx
            <Reveal key={f.title} delay={i * 80} className={`card-lift rounded-images p-6 md:p-8 ${toneClass[f.tone]}`}>
```

- [ ] **Step 3 — Steps:** `steps.items.map((s) =>` → `steps.items.map((s, i) =>`; the Reveal is:

```tsx
              <Reveal delay={i * 80} className="card-lift rounded-images border border-soft-mist bg-paper-white p-8 md:p-10">
```

- [ ] **Step 4 — Testimonials:** import `Reveal` (`import { Reveal } from "@/components/ui/Reveal";`). `Review`'s `<article>` className → `flex h-full flex-col rounded-images bg-paper-white p-6 shadow-md card-lift`. The grid map becomes:

```tsx
          {testimonials.cards.map((c, i) => (
            <Reveal key={c.kind === "review" ? c.title : c.name} delay={i * 60}>
              {c.kind === "review" ? <Review card={c} /> : <Portrait card={c} />}
            </Reveal>
          ))}
```

- [ ] **Step 5 — Products:** the Reveal is:

```tsx
            <Reveal key={p.title} delay={i * 100} className={`card-lift rounded-images bg-paper-white p-6 shadow-md ${tilt[i]}`}>
```

Note: `card-lift`'s `transform: translateY(-2px)` on hover coexists with Tailwind's `rotate-3` because v4 `rotate-*` sets the `rotate` property, not `transform`.

- [ ] **Step 6 — FreeCta:** the bullet card `<div>` className → `card-lift mx-auto mt-10 max-w-3xl rounded-images bg-paper-white p-8 text-left md:p-10`.

- [ ] **Step 7:** `npm run check` → OK.

### Task 6: FAQ, Footer, Nav

**Files:** Modify `Faq.tsx`, `Footer.tsx`, `Nav.tsx`

- [ ] **Step 1 — Faq:** summary and chevron become:

```tsx
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-subheading font-medium transition-colors hover:text-forest-floor">
                  <span>{item.q}</span>
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-pills bg-pale-stone transition-transform group-open:rotate-180">
                    <Chevron className="h-4 w-4" />
                  </span>
                </summary>
```

- [ ] **Step 2 — Footer:** link className → `text-body text-graphite-text underline-offset-4 hover:text-ink-black hover:underline`; legal wrapper className → `mx-auto mt-16 max-w-3xl space-y-4 border-t border-soft-mist pt-8 text-legal text-graphite-text`.

- [ ] **Step 3 — Nav:** replace the file with:

```tsx
"use client";

import { useEffect, useState } from "react";
import { nav } from "@/content/nav";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Chevron, Leaf } from "@/components/icons";

export function Nav() {
  // Hairline appears once the page has scrolled, so the bar reads as a bar, not a strip of hero.
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 border-b bg-paper-white/90 backdrop-blur transition-colors ${
        scrolled ? "border-soft-mist" : "border-transparent"
      }`}
    >
      <Container className="flex h-20 items-center justify-between gap-4">
        <a href="#" aria-label={`${nav.brand} home`} className="flex items-center gap-1.5 text-ink-black">
          <Leaf className="h-7 w-7" />
          <span className="whitespace-nowrap text-subheading font-semibold tracking-tight md:text-heading-sm">{nav.brand}</span>
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-1 rounded-nav bg-soft-mist p-1 md:flex">
          {nav.links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="inline-flex items-center gap-1 rounded-nav px-4 py-2 text-body font-medium text-ink-black transition-colors hover:bg-paper-white"
            >
              {l.label}
              {l.hasMenu && <Chevron className="h-4 w-4" />}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden md:block">
            <Button variant="ghost" href={nav.login.href}>
              {nav.login.label}
            </Button>
          </div>
          <Button href={nav.cta.href}>{nav.cta.label}</Button>
        </div>
      </Container>
    </header>
  );
}
```

- [ ] **Step 4:** `npm run check` → OK.

### Task 7: DESIGN.md note

**Files:** Modify `DESIGN.md` — under `## Elevation` (line ~196) append:

```markdown
### Motion & hover (landing polish, 2026-09-19)

- `card-lift` (utility in `globals.css`): every card's hover — `translateY(-2px)` and the one
  `--shadow-md`. Cards rest on a `soft-mist` hairline (or already on `shadow-md`); there is no
  second shadow token.
- `--animate-float` (7s drift) is for the hero fragments only, always behind `motion-safe:`.
- `Reveal` takes `delay` (ms); grids stagger siblings by 60–100ms. Reduced motion disables all
  three.
```

### Task 8: Verify and commit

- [ ] **Step 1:** `npm run check` → `check-tokens: OK`.
- [ ] **Step 2:** Render 1280×12000 and a 390px iframe host (recipe in the header) — confirm: fragments crisp with shadow, no laurels, promise strip bordered, FAQ chevron circles, footer hairline; no horizontal overflow at 390.
- [ ] **Step 3:** Look at the dev-server log / browser console for hydration warnings from the `Nav` client conversion (none expected — initial `scrolled` is `false` on both server and client).
- [ ] **Step 4:** Squash to one commit on `polish/landing`:

```bash
git add app components DESIGN.md
git commit -m "polish: crisp hero fragments, stat strip, promise hierarchy, one card/hover rule

Co-Authored-By: Claude Opus 5 (1M context) <noreply@anthropic.com>"
```

- [ ] **Step 5:** `git checkout main && git merge --ff-only polish/landing` (repo has no remote; main is the working branch).

## Self-review

- Spec coverage: hero (T2), trust (T3), promise (T4), rhythm/cards/stagger/chips (T5 + T1), FAQ/footer/nav (T6), DESIGN.md (T7), guardrails (T8). Complete.
- Placeholders: none. Type consistency: `Reveal` `delay?: number` defined in T1, used as `delay={…}` in T5. `card-lift` defined in T1, used in T5.
