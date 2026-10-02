# Practitioner Landing Page — Plan

**Status:** auto-approved 2026-10-02 · build locally, no push until the owner approves.

**Goal:** Split the site by audience. A tab at the very top of every page switches between
**For clients** and **For practitioners**. This plan builds the practitioner side; the client side
keeps today's landing page at `/` until its own pass.

## Decisions

| Question | Decision | Why |
|---|---|---|
| Tab mechanism | Two routes: `/` (clients) and `/practitioners`; the tab is a pair of `next/link`s | Shareable URLs, server-rendered sections, no client-state flash |
| Where the tab sits | Slim strip above the main nav row, centred, visible on all widths (mobile too) | Reads as "which side are you on" before anything else; nav row keeps its links |
| Active tab | Derived from `usePathname()` in `Nav`: `/practitioners*` and `/pricing` → practitioner | `/pricing` is practitioner pricing already; no page has to pass a prop |
| Nav links / CTA | Per audience, from `content/nav.ts` | Practitioner links jump to practitioner sections; CTA goes to `/pricing` |
| "Tarot" in the brief | Means **Terrain** (Terrain Building / terrain quizzes), matching the app sidebar | Speech-to-text slip |
| Claims | No invented numbers ("save 5 hrs/week"). Qualitative benefits only | Nothing to back a statistic yet |
| App screens | New practitioner recreations in the same `AppWindow` frame, with a practitioner sidebar | Consistent with client screens; sample data, fictional client "Maya" |

## Practitioner page (`/practitioners`) — sections

1. **Hero** — "Your AI-powered practice partner." Subhead: GCL holds the whole picture of every
   client so you walk into each session prepared. CTAs: *See pricing* / *Book a walkthrough*.
   Visual: practitioner client-list dashboard.
2. **Full context** (`#context`) — "Every client, in full context." Four context sources as chips
   feeding one client record: wellness vision, terrain quizzes, daily logs & meals, Tiny Health /
   NirvanaBiome reports.
3. **Consult Sage** (`#sage`) — Sage, the practitioner's co-pilot, already knows the client. Screen:
   practitioner asking Sage about Maya's dairy reintroduction.
4. **Reports → guides** (`#reports`) — 3-step flow: upload report → Terrain Building fills in →
   practitioner guide + client guide generated. Screen: upload card with generated outputs.
5. **Before & between sessions** (`#sessions`) — two cards: *Session prep* and *Weekly summaries*,
   each with its own screen.
6. **Everything else you need** — feature grid: past check-ins & logs, recipe suggestions,
   1:1 Zoom sessions. (Messaging was dropped: it isn't in the brief, and Zoom covers communication.)
7. **Why practitioners choose GCL** — 3 reasons: less admin / more coaching; AI that prepares,
   you decide; built by a practitioner (Anu's Flourish Framework).
8. **About Anu** (reused) + **Final CTA** (practitioner copy → pricing / contact).

## Files

| File | Change |
|---|---|
| `content/nav.ts` | Add `audiences` (tab labels + hrefs), `practitionerLinks`, `practitionerCta` |
| `components/sections/Nav.tsx` | Audience strip with tabs; choose links/CTA by pathname |
| `content/practitioner.ts` | **New** — all practitioner copy |
| `content/practitionerScreens.ts` | **New** — sample data for practitioner screens |
| `components/app/AppWindow.tsx` | `sidebar` prop: `"client"` (today) or `"practitioner"` |
| `components/app/practitionerScreens.tsx` | **New** — ClientList, PractitionerSage, ReportUpload, SessionPrep, WeeklySummary, ClientLogs, RecipeSuggest, ZoomSession |
| `components/sections/Practitioner.tsx` | **New** — the page sections above |
| `components/sections/Closing.tsx` | `FinalCta` accepts optional copy so the practitioner page can reuse it |
| `app/practitioners/page.tsx` | **New** — route + metadata |

Untouched: the in-progress pricing work (`app/pricing`, `Pricing.tsx`, `content/pricing.ts`,
`icons.tsx`, `footer.ts`) except that `/pricing` now shows the practitioner tab as active.

## Verification

- `npm run check` (tsc + raw-colour guard) and `npm run lint`.
- `next dev`, then headless Chrome at 1280 and 390: `/`, `/practitioners`, `/pricing`;
  tab switches routes and shows the correct active state; no horizontal scroll at 390.

## Revision 2 (owner feedback, 2026-10-02)

- **Hero:** new headline "Know every client / *before the session starts.*" (Fraunces italic accent,
  `style: italic` added to the font loader). The client-list mock is replaced by the promo ad
  (`HeroVideo`) with two floating app badges.
- **Full client context:** rebuilt as a dark animated diagram. Four live source cards (vision quote
  underline, terrain bars growing, scrolling log ticker, report scan line) are wired by SVG connectors
  with flowing dots into a pulsing hub, and "Sage noticed" insights cycle underneath. The motion utilities
  are at the end of `globals.css`, and all of it stops under reduced motion.
- **Reports:** a new film, `public/video/practitioner-reports.mp4` (28 s loop, 1600×1000, built in
  `Downloads/gcl-app-main/gcl-report-film` with the ad's pipeline). It shows upload → Sage fills the
  markers → compare → practitioner guide → client guide, with a real practitioner-guide crop layered on
  top. Caveat: the app's Reconcile step checks markers against client context; the film shows a
  Tiny Health vs NirvanaBiome comparison on that screen.
- **Real screenshots** (test client on the live app, `public/app/practitioner/`): client session area
  (hub), session prep ("What stands out"), weekly summary (Week 2), daily logs, recipes.
- **Zoom:** Unsplash photo by Vitaly Gariev (nSj0hdQUrW0, Unsplash License) with Live / Join overlays.
- The mock practitioner screens are removed; only the Consult Sage chat mock remains.
