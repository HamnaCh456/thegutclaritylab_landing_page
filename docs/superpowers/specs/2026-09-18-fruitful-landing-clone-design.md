# Fruitful landing page clone — design spec

**Date:** 2026-09-18
**Status:** approved (verbal, in-session)
**Project root:** `C:\Users\LENOVO\Desktop\fruitful-clone\`

## Goal

Rebuild the fruitful.com landing page as a standalone Next.js site that
follows the supplied `DESIGN.md` token system exactly. The page is a 1:1
layout study with Fruitful's copy and structure; the copy will be swapped
for another product later, so **all text, images and lists live in
`content/` data files**, not inside components. Heavy scroll animation
(letter-by-letter reveals, scroll-jacked phone mock, parallax) is out of
scope — it would be thrown away with the content.

## Stack

| Piece | Choice |
|-------|--------|
| Framework | Next.js 15, App Router, TypeScript, `src/`-less layout |
| Styling | Tailwind v4 (`@import "tailwindcss"` + `@theme` block from DESIGN.md) |
| Font | Inter via `next/font/google` (DESIGN.md names it as the PP Neue Montreal substitute). Weights 400/500/600/700. Exposed as `--font-sans`. |
| Images | `next/image` with `remotePatterns` for `cdn.prod.website-files.com`. Portraits, press logos, product art and footer illustrations are hotlinked from Fruitful's CDN; the URLs sit in `content/` so they are trivially replaced with `/public` files. |
| Icons / marks | Inline SVG components (wordmark leaf, laurel wreath, Trustpilot stars, check circle, arrow, bolt, gift, play). No icon library. |
| Motion | One `Reveal` client component (IntersectionObserver → `is-visible` class → CSS fade-up). Respects `prefers-reduced-motion`. Nothing else animates. |
| Node | whatever is installed (Node ≥ 18.18 required by Next 15). |

No backend, no forms that submit, no analytics.

## Token rules (from DESIGN.md — binding)

- Colors, spacing, radii, shadow and type scale are declared once in
  `app/globals.css` under `@theme` using the exact names from DESIGN.md
  (`--color-forest-floor`, `--radius-pills`, `--shadow-md`, …).
- Components use Tailwind utilities generated from those tokens
  (`bg-forest-floor`, `rounded-[var(--radius-pills)]`, `text-graphite-text`).
  **No raw hex, px or rgba values in components.** The single exception is
  the decorative blurred hero fragments, which use token colors at reduced
  opacity via `opacity-*` utilities.
- `#0b7443` (forest-floor) is the only filled-button colour. Every primary
  button is paired with a ghost button (1px ink-black border) where the live
  site has a pair (nav only; the section CTAs on the live site are single).
- Vivid greens (`vivid-leaf`, `bright-sprout`) are only used for laurels,
  check icons and small decorative strokes — never text or buttons.
- `soft-mist` is never placed in the same section as `apricot-cream`.
- Body text stays 16–20px. Display sizes use the DESIGN.md tracking
  (`-0.019em` at 60/91px, `-0.01em` at 38/48px).
- Nothing has 0px radius. Shadows only on the deepest cards (`shadow-md`
  token on testimonial review cards and product cards).

### Reconciliation with the live site

The live page today uses a pale mint→white gradient hero, not the cream
video hero DESIGN.md describes. Resolution: keep the **live structure**,
apply the **DESIGN.md palette**:

- Hero and "Build your future" band: radial `mint-wash` gradient fading to
  `paper-white`.
- Testimonial portrait cards, Money Map mock backdrop, and warm feature
  tiles: `apricot-cream`.
- Everything else: `paper-white` canvas with `pale-stone` / `soft-mist`
  cards.

## Page structure

Rendered top to bottom by `app/page.tsx`. Each section is one component in
`components/sections/`, receives its data from `content/`, and is wrapped in
`<Reveal>` where the live site fades content in.

| # | Section | Component | Content file | Notes |
|---|---------|-----------|--------------|-------|
| 1 | Nav | `Nav` | `content/nav.ts` | Sticky, `paper-white` bg. Left wordmark (leaf SVG + "fruitful"). Centre: `soft-mist` pill containing "Membership ▾" and "Guides" links (dropdown is a non-functional caret). Right: ghost "Log in" + primary "Get started". Under 768px: wordmark + "Get started" only. |
| 2 | Hero | `Hero` | `content/hero.ts` | `display-lg` (91px → 60px → 45px responsive) headline, two-line subhead in `graphite-text`, pill input (decorative, `readOnly`, placeholder "What's your biggest money goal?") with circular `forest-floor` arrow button, row of 5 goal chips (icon + label, `paper-white` pill, 1px `soft-mist` border), then 5-avatar stack + "Trusted by Thousands". Behind: 4 absolutely-positioned blurred Money Map fragments (CSS only, `blur-md opacity-60`, hidden under 1024px). |
| 3 | Trust badges | `TrustBadges` | `content/trust.ts` | Eyebrow "Trusted by Thousands". 3-column centred grid; each badge = laurel SVG pair (`vivid-leaf`), title 38px/700, descriptor 20px `graphite-text`, then a small logo (FinTech Breakthrough / Trustpilot stars + wordmark / Tearsheet). Disclaimer paragraph 16px `graphite-text` below. Stacks to 1 col under 768px. |
| 4 | Promise band | `PromiseBand` | `content/promise.ts` | Centred `display` (60px) two-line headline "We don't just show you what to do. We make it happen." Below, `heading` 38px "Never stress again." + paragraph + "Made for your life." subhead + 4 goal pills (Get organized / Pay off debt / Buy a Home / Grow my Wealth). |
| 5 | Money Map mock | `MoneyMapMock` | `content/moneyMap.ts` | Static phone-shaped card (`pale-stone` body, 40px radius, 4px `ink-black` frame) showing "Give every paycheck a plan": Take-home pay chip → Bills / Spend / Goals split (three toned chips) → 4 goal rows with amount + month. Centred, max 384px wide. Sits on a full-width `apricot-cream` band. |
| 6 | Press logos | `PressRow` | `content/press.ts` | "Talked about in:" caption + 4 grayscale logos (NYT, NerdWallet, WSJ, Business Insider) in a row, `opacity-60`. |
| 7 | Dream machine | `DreamMachine` | `content/features.ts` | Centred `display` headline "This is your financial dream machine." Green bracket connector SVG (`vivid-leaf`, 3px stroke, dot on top) spanning the two columns. 2×2 grid of feature tiles: title `heading-sm` 24px/600, body 16px `graphite-text`. Tile illustration area (240px tall) is a simple CSS composition per tile (question card + portrait; icon → three labelled chips; toggle rows; timeline bars). Tiles alternate `apricot-cream` and `pale-stone`. |
| 8 | Steps | `Steps` | `content/steps.ts` | 2-col: left column sticky (`top-32`) with `heading-lg` 48px "It's all built for you." in `ink-black` then "Just turn it on, and watch it work." in `graphite-text`, primary "Get Started". Right column: vertical `vivid-leaf` 3px line with 4 numbered dots (`01`–`04`, 40px circles, `vivid-leaf` fill, white text) and a card per step (white, 1px `soft-mist` border, 20px radius, 40px padding, simple CSS illustration, title 24px/600, body 16px). Under 900px: single column, line hidden, numbers inline. |
| 9 | Testimonials | `Testimonials` | `content/testimonials.ts` | `heading-lg` "People love Fruitful." then a 4-column CSS grid (`grid-auto-flow: dense`) mixing two card kinds: **review** (white, `shadow-md`, Trustpilot stars + name, title 24px/600, body 16px clamped to 7 lines, "Read more" ghost pill) and **portrait** (`apricot-cream`, 20px radius, 3:4 image via `next/image`, bottom gradient overlay `ink-black/60 → transparent`, quote 24px/600 `paper-white`, "Name / Fruitful Member" caption, circular play button). Order and card kinds are data-driven. 2 cols under 1024px, 1 under 640px. "Go to Review Page" ghost CTA centred below. |
| 10 | Products | `Products` | `content/products.ts` | Centred `display` "Powered by better-for-you financial products." 3 cards (white, `shadow-md`, 20px radius): product art image (hotlinked PNG) then title 24px/600 + body 16px. Outer cards rotate ±3° at ≥1024px. |
| 11 | Free CTA | `FreeCta` | `content/freeCta.ts` | Full-width `mint-wash` radial band. `display` "Build your future now. For free." 2 stat chips (white circle icon + 2-line label). White card (max 780px, 20px radius) with 6 check-bullets (`bright-sprout` filled circle + white tick) and a full-width primary button "Get my Money Map". Superscript footnote markers kept. |
| 12 | FAQ | `Faq` | `content/faq.ts` | `heading` 38px "Frequently asked Questions". 7 `<details>` items, 1px `soft-mist` divider, summary 20px/500 with a rotating chevron, body 16px `graphite-text`, paragraphs preserved. First item open by default. |
| 13 | Footer | `Footer` | `content/footer.ts` | `paper-white`. Row 1: 4 link columns (Explore Fruitful / Company / Social / Support; heading 16px `ink-black`, links 16px `graphite-text`) with the large leaf mark (SVG, 320px) right-aligned on desktop. Row 2: 4 illustrations in a row (hotlinked PNG, 140px). Row 3: legal paragraphs and footnotes 13px `graphite-text`, max 1000px, plus © line. |

Vertical rhythm: sections separated by `section-gap` (80px), 120px on the
display-headline sections, 48px under 768px.

## Files

```
fruitful-clone/
  app/
    layout.tsx          Inter font, <html lang="en">, metadata, body bg paper-white
    page.tsx            imports and orders the 13 sections
    globals.css         @import tailwindcss; @theme {...DESIGN.md tokens...}; base rules; .reveal
  components/
    ui/Button.tsx       variant "primary" | "ghost" | "pill" (nav-style), size default
    ui/Container.tsx    max-w 1200px, 16px gutters
    ui/Reveal.tsx       client; IntersectionObserver fade-up
    icons.tsx           Leaf, Laurel, Stars, CheckCircle, ArrowUp, Bolt, Gift, Play, Chevron, chip icons
    art/FeatureArt.tsx  CSS illustrations for the dream-machine tiles (keyed by content)
    art/StepArt.tsx     CSS illustrations for the step cards (keyed by content)
    sections/*.tsx      one file per section listed above
  scripts/check-tokens.mjs  fails if any component contains a raw hex / rgb() colour
  content/*.ts          typed data for each section (all strings/URLs live here)
  docs/superpowers/specs/  this file
  docs/superpowers/plans/  implementation plan
  next.config.ts        images.remotePatterns for cdn.prod.website-files.com
  DESIGN.md             copy of the supplied style reference
```

Each `content/*.ts` exports a plain object/array with an exported TS type,
so replacing the product later is: edit `content/`, drop new files in
`/public`, change nothing in `components/`.

## Responsive breakpoints

- ≥1200px: designed layout.
- 1024–1199px: same layout, hero blur fragments hidden, product tilt kept.
- 768–1023px: 2-col grids, steps go single column, nav centre pill hidden.
- <768px: single column everywhere, `display-lg` → 45px, `display` → 38px,
  `heading-lg` → 32px, section gap 48px, 16px side gutter, no horizontal
  scroll.

## Accessibility

- Semantic landmarks: `header`, `main`, `section` with `aria-labelledby`,
  `footer`.
- Decorative images `alt=""`; portraits use the member's name.
- Buttons/links are real `<a>`/`<button>` with visible focus ring
  (`outline 2px forest-floor, offset 2px`).
- Contrast: body text `graphite-text` on `paper-white` / `apricot-cream` /
  `mint-wash` is ≥4.5:1 (checked: 5.9 / 5.2 / 5.6).
- `prefers-reduced-motion: reduce` disables the reveal transition.

## Verification

1. `npm run build` completes with zero errors and zero type errors.
2. `npx tsc --noEmit` clean.
3. Headless Chrome screenshots at 1440×900 and 390×844 of `/` (full page)
   — visually compared against the live-site captures taken 2026-09-18
   (`scratchpad/fruitful-full.jpeg` + viewport captures). Sections must
   appear in the same order with comparable proportions.
4. `document.documentElement.scrollWidth === window.innerWidth` at 390px
   (no horizontal scroll).
5. Grep `components/` for `#[0-9a-f]{3,6}` and `rgba(` — zero hits.

## Out of scope

- Letter-by-letter and scroll-driven animations; the phone mock scroll story.
- Working email capture, Membership dropdown contents, video playback.
- Any additional pages (pricing, guides, legal).
- Self-hosting Fruitful's images (deliberately hotlinked; swap when content
  changes).
