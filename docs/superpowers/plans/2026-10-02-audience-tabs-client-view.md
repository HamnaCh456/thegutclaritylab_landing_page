# Audience Tabs + Client View Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Split the landing page by audience. A "For clients / For practitioners" switch sits at the top. The client view at `/` sells every client-side feature. The practitioner view (`/for-practitioners`) is phase 2 and is not built here.

**Architecture:** The view is chosen by route, not client state, so each view has its own URL, metadata and SEO. `/` stays the client page. A small `AudienceTabs` strip renders above the sticky `Nav` on every page and reads its tabs from `content/audience.ts`. The practitioner tab has `ready: false` until phase 2: it shows a "Soon" badge and is not a link. The client page keeps the current design system. It gains two sections (`PathChoice`, `Patterns`) and sharper Sage copy. All copy lives in `content/*`, as it does everywhere else.

**Tech Stack:** Next 16 (app router), React 19, Tailwind v4 tokens from `app/globals.css`. Checks: `npm run check` (tsc + raw-colour lint), `npm run lint`, `npm run build`. There is no unit-test runner. The page is verified in the browser at desktop and 375px widths.

**Status:** Approved up front by the user ("make a plan, auto-approve, implement"). Local only: no commit or push until the user approves the result.

---

> **Change during execution:** The practitioner session (`2026-10-02-practitioner-landing.md`) already added the audience strip inside `Nav.tsx`. It picks the active tab from the pathname and links to a real `/practitioners` route. Task 1's `AudienceTabs` / `content/audience.ts` were built and then removed as duplicates, and this plan uses the Nav strip. Task 5's "tabs on /features and /pricing" is covered by that strip too.

## What the client view must convince a visitor of

From the user's brief, in page order:

1. **You choose how to do it.** Go practitioner-independent (Sage plus the programme), or pick the practitioner who suits you from the directory.
2. **Sage is there 24/7.** It knows your whole picture: wellness vision, terrain quiz, daily logs, Tiny Health / NirvanaBiome reports. So its answers are about you.
3. **Your past logs and your patterns.** Every check-in and meal is kept. GCL shows what suits you, what to go easy on, and what is worth watching.
4. Gut test → personal guide (existing `ResultsSection`).
5. Everything else (existing `Features` grid), then Calm, Anu and the final CTA.

## File map

| File | Change | Responsibility |
|---|---|---|
| `content/audience.ts` | create | Tab labels, hrefs, `ready` flag |
| `components/sections/AudienceTabs.tsx` | create | Segmented switch strip above the nav |
| `content/client.ts` | create | Copy for `PathChoice` and `Patterns` |
| `content/screens.ts` | modify | Sample data for the new `PatternsScreen` |
| `components/app/screens.tsx` | modify | Add `PatternsScreen` (past logs + what suits you) |
| `components/sections/PathChoice.tsx` | create | "Two ways to start" section, two cards |
| `components/sections/Patterns.tsx` | create | Copy column + `PatternsScreen` in an `AppWindow` |
| `content/sage.ts` | modify | 24/7 + "knows your whole picture" points |
| `app/page.tsx` | modify | Render tabs and new sections in order |
| `app/features/page.tsx`, `app/pricing/page.tsx` | modify | Render `AudienceTabs` too (client active) |

## Task 1: Audience content + tabs strip

- [ ] Create `content/audience.ts`:

```ts
export type Audience = "client" | "practitioner";
export type AudienceTab = { id: Audience; label: string; href: string; ready: boolean };

export const audience = {
  label: "Choose your view",
  soon: "Soon",
  tabs: [
    { id: "client", label: "For clients", href: "/", ready: true },
    { id: "practitioner", label: "For practitioners", href: "/for-practitioners", ready: false },
  ] satisfies AudienceTab[],
};
```

- [ ] Create `components/sections/AudienceTabs.tsx`: a server component taking `active: Audience`. It renders a full-width `bg-pale-stone` strip (it scrolls away, and the Nav stays sticky). Inside is a centred `role="tablist"`-style segmented control: `rounded-nav bg-paper-white p-1`.
  - Active tab: `bg-forest-floor text-paper-white` with `aria-current="page"`.
  - Other ready tabs: `<a>` links that hover to `bg-pale-stone`.
  - Not-ready tabs: a `<span aria-disabled="true">` with `text-graphite-text` and a `Soon` pill in `bg-mint-wash text-deep-moss`.
  - Use `<nav aria-label={audience.label}>`, not ARIA tabs: these are page links, not in-page panels.
- [ ] `npm run check` passes.

## Task 2: Client copy

- [ ] Create `content/client.ts` with `pathChoice` and `patterns`:
  - `pathChoice` has an eyebrow, a headline and a lead, plus two `paths`. Each path has an id, label, title, body, 3 points and a CTA:
    - **"On your own"**: "Go at your own pace with Sage". Sage plus the full 12-week programme, no practitioner needed. CTA "Start on your own" → `#start`.
    - **"With a practitioner"**: "Choose the practitioner who suits you". Browse the directory, pick by focus and style, and they see your logs and guide; 1:1 video sessions. CTA "Find a practitioner" → `site.practitioners`.
    - Closing note: "You can add a practitioner later, any time."
  - `patterns`: eyebrow "Your patterns", headline "See what really works for your body.", lead, 3 points (every log in one place / patterns spotted for you / know what suits you), and a note.
- [ ] Update `content/sage.ts`. The lead becomes 24/7. The points become: "There 24/7", "Knows your whole picture" (vision, terrain quiz, logs, gut reports), and "Coaches you through every week". The `callout` stays.

## Task 3: `PatternsScreen` mock

- [ ] Add `patterns` sample data to `content/screens.ts`: title "My Patterns", a range ("Last 14 days"), `suits` foods (green chips), `easy` foods (amber chips), one `insight` sentence, and `logs`: 4 past days, each with date, feel, meals and a tag.
- [ ] Add `PatternsScreen` to `components/app/screens.tsx`. Build it only from the existing `Panel` / `Label` / `Title` / `Chip` helpers and `app-*` tokens:
  - Header: title + range chip.
  - Two-column panels: "Suits you" (green chips) and "Go easy on" (amber chips).
  - The Sage insight in a green-light panel.
  - "Past check-ins": a list of rows (date · feel dot · meals · tag).

## Task 4: Sections

- [ ] `PathChoice.tsx`: a centred header (eyebrow / `Words` headline / lead), then a 2-column grid of `card-lift rounded-images` cards. The left card is `bg-pale-stone` and the right is `bg-apricot-cream`. Each card has a label, a `heading-sm` title, body, a `CheckCircle` list and a `Button` (primary on the left, ghost on the right, so there is one primary per card pair). The note goes below the grid. `id="paths"`.
- [ ] `Patterns.tsx`: mirrors `SageSection` (copy left, `AppWindow withSidebar active="today"` right) and reuses the `Points` list. `Points` gets exported from `Showcase.tsx` rather than duplicated. `id="patterns"`.

## Task 5: Wire the page

- [ ] `app/page.tsx` order: `AudienceTabs active="client"`, Nav, Hero, **PathChoice**, Journey, Sage, **Patterns**, Results, Features, Calm, Anu, FinalCta, Footer.
- [ ] Add `<AudienceTabs active="client" />` above `<Nav />` on `/features` and `/pricing`.

## Task 6: Verify

- [ ] `npm run check` → `check-tokens: OK` and no tsc errors.
- [ ] `npm run lint` → clean.
- [ ] `npm run build` → succeeds.
- [ ] Run `npm run dev` and screenshot `/` at 1440px and 375px:
  - The tabs strip is visible.
  - The Soon tab is not clickable.
  - The new sections render.
  - There is no horizontal scroll.

## Out of scope (phase 2)

The `/for-practitioners` page: client logs, Sage with full client context, recipe suggestions, report upload → terrain building + practitioner/client guides, session prep, weekly summaries, Zoom 1:1. When it ships, flip `ready: true` in `content/audience.ts`.
