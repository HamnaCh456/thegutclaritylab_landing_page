# Landing page polish — design

Date: 2026-09-19. Scope: the Gut Clarity Lab practitioner landing page in this repo, refined
**within its current look** (Inter, white/green, Fruitful layout). No copy changes, no new
sections, no wiring into the GCL app.

## Problems (from 1280px and 390px renders of `47b9ccb`)

1. Hero "client profile" fragments are `opacity-50 blur-[2px]` — they read as a smeared render,
   not depth.
2. Trust row wraps "12 weeks / 3 paths / Food-first" in laurels — a Fruitful award motif; the tone
   brief forbids invented awards.
3. Promise section stacks three near-equal headings (48 → 38 → 24px) with 64px gaps; no hierarchy.
4. Vertical rhythm and card treatment are inconsistent: `PressRow` is `py-12`, the rest
   `py-section`; some grids use `Reveal`, some don't; white cards mix `border-soft-mist`,
   `shadow-md` and nothing.
5. Only buttons and nav links respond to hover.
6. Finish details: no focus ring on the hero input, FAQ chevron sits bare, the "Built on…" line
   floats unanchored, footer legal runs full-width.

## Design

### Hero
- Fragments: no blur, `opacity-90`, `border border-soft-mist`, `shadow-md`, alternating ±2–3°
  rotation, and a slow vertical float (`--animate-float`, 7s, `motion-safe:` only, staggered
  1.3s per card). Still `xl:` only, still `aria-hidden`.
- Input shell: `focus-within:border-forest-floor` + `focus-within:ring-2 ring-forest-floor/20`.
- "Built on Anu Simh's Flourish Framework…" becomes a caption with a small `Leaf` glyph in
  `forest-floor`, `text-graphite-text`.

### Trust row → stat strip
- Remove `Laurel` from the section (the icon stays exported in `components/icons.tsx`).
- Three blocks in a row: `text-heading-lg` number, `text-subheading text-graphite-text`
  descriptor, a 8px `vivid-leaf` dot above the number as the only ornament. Blocks are
  `divide-y` on mobile, `md:divide-x` on desktop, `hover:bg-pale-stone/60` on the whole block
  (they are anchors).
- Disclaimer drops to `text-legal`, `max-w-2xl`.
- `Logo` rendering is kept (content type unchanged), it simply renders nothing for GCL.

### Promise
- One `h2` (unchanged). `subheadline` becomes `text-heading-sm font-semibold` at `mt-12`, `body`
  directly under it at `mt-3`.
- "Made for the way you practise" becomes a bordered strip: `rounded-images border border-soft-mist
  p-8 md:p-10`, title `text-heading-sm font-semibold`, tagline, pills — one composed block.

### Rhythm & cards
- `PressRow` → `py-section-sm`.
- New utility `card-lift` in `globals.css`: `transition: transform .3s ease, box-shadow .3s ease`;
  hover `translateY(-2px)` + `box-shadow: var(--shadow-md)`; `prefers-reduced-motion`: no
  transition. Applied to: Steps cards, DreamMachine panels, Testimonials review cards, Products
  cards, FreeCta bullet card.
- `Reveal` gains `delay?: number` (ms) → `transitionDelay`. Grids stagger `i * 80`.
- Hero and Press chips: `transition-colors hover:bg-pale-stone`.

### FAQ / Footer / Nav
- FAQ: summary `hover:text-forest-floor transition-colors`; chevron sits in a 32px `pale-stone`
  circle, rotates on open.
- Footer: links `hover:underline underline-offset-4`; legal block `max-w-3xl border-t
  border-soft-mist pt-8`.
- Nav: becomes a client component; adds `border-b border-soft-mist` once `scrollY > 8`
  (`data-scrolled`), transparent otherwise.

## Guardrails
- `content/*.ts` untouched.
- Colours only via tokens; `npm run check` (tsc + token guard) stays green.
- DESIGN.md gets a short "Motion & hover" note describing `card-lift`, `--animate-float` and the
  `Reveal` stagger.
- Verified by headless-Chrome renders at 1280 and 390 (see `[[headless-chrome-render-verify]]`).
- One squashed commit on `polish/landing`, merged to `main`.
