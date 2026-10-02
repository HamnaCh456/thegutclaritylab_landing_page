import { site } from "@/content/site";
import type { Point } from "@/content/sage";

// Copy for /practitioners. Benefits are stated plainly; no invented statistics.
export const practitionerHero = {
  eyebrow: "AI-powered practice for gut health practitioners",
  headline: ["Know every client"],
  accent: "before the session starts.",
  subhead:
    "GCL gathers each client’s vision, quizzes, daily logs and gut test reports. Sage turns them into session prep, weekly summaries and guides, so your time goes to coaching.",
  primary: { label: "See pricing", href: "/pricing" },
  secondary: { label: "Book a walkthrough", href: `${site.contact}?subject=${encodeURIComponent("GCL practitioner walkthrough")}` },
  proof: ["Built on Anu Simh’s Flourish Framework", "Sage prepares, you decide", "Zoom sessions built in"],
  // Small app fragments floating over the corners of the ad.
  badges: [
    { label: "Session prep", value: "Ready for Maya · 2pm" },
    { label: "Weekly summaries", value: "6 clients, written for you" },
  ],
};

export const context = {
  eyebrow: "Full client context",
  headline: "Every client, in full context.",
  lead: "Everything your client shares flows into one record. Sage reads all of it, so nothing slips between sessions.",
  hub: "One client record",
  hubSub: "Read by you and Sage",
  vision: {
    title: "Wellness vision",
    body: "Their goal, in their own words.",
    quote: "“I want to eat out without worrying.”",
  },
  terrain: {
    title: "Terrain quizzes",
    body: "Every re-check across 12 weeks.",
    bars: [
      { label: "Wk 1", score: 14 },
      { label: "Wk 5", score: 19 },
      { label: "Wk 12", score: 25 },
    ],
  },
  logs: {
    title: "Daily logs & meals",
    body: "Check-ins, meals, sleep, symptoms.",
    rows: [
      ["Breakfast", "Flourish Smoothie"],
      ["Energy", "Steady"],
      ["Lunch", "Chickpea bowl"],
      ["Bloating", "Mild, after dinner"],
      ["Sleep", "Good · 7h 40m"],
      ["Stress", "Low"],
    ] as [string, string][],
  },
  reports: {
    title: "Gut test reports",
    body: "Tiny Health and NirvanaBiome.",
    files: ["Tiny Health.pdf", "NirvanaBiome.pdf"],
    markers: [
      { name: "Akkermansia", status: "Low", tone: "amber" },
      { name: "Butyrate producers", status: "In range", tone: "green" },
      { name: "Bifidobacterium", status: "In range", tone: "green" },
    ] as { name: string; status: string; tone: "amber" | "green" }[],
  },
  sageLabel: "Sage noticed",
  insights: [
    "Bloating follows late, large dairy meals.",
    "Energy is steadier on smoothie mornings.",
    "Sleep improves when dinner is before 7pm.",
  ],
};

export const consultSage = {
  eyebrow: "Consult Sage",
  headline: "A co-pilot that already knows your client.",
  lead: "Ask Sage about any client and get an answer grounded in everything they’ve shared, not a generic reply.",
  points: [
    { title: "Grounded in their data", body: "Sage reads their vision, terrain quizzes, logs and reports before it answers." },
    { title: "Spots what changed", body: "Patterns, flare-ups and quiet weeks surface without you digging." },
    { title: "Helps you plan", body: "Talking points, next steps and what to focus on in the next session." },
  ] satisfies Point[],
  callout: "Sage supports your judgement. You stay the practitioner.",
};

export const reports = {
  eyebrow: "Gut test reports",
  headline: "From forty pages of markers to a clear plan.",
  lead: "Upload a Tiny Health or NirvanaBiome report and Sage does the heavy reading, so you start from the interpretation, not the spreadsheet.",
  steps: [
    {
      n: "1",
      title: "Sage fills in the markers",
      body: "Every value is pulled from the PDF into Terrain Building for you. No retyping, no missed rows.",
    },
    {
      n: "2",
      title: "Compare the results",
      body: "See a Tiny Health and a NirvanaBiome report together, or a new test against the last one, and what agrees or changed.",
    },
    {
      n: "3",
      title: "Two guides, written for you",
      body: "A detailed practitioner guide for you, and a plain-language guide for your client.",
    },
  ],
  note: "Nothing reaches your client until you approve it.",
  // Rendered in gcl-app-main/gcl-report-film from the app's own screens; sample client.
  video: {
    src: "/video/practitioner-reports.mp4",
    poster: "/video/practitioner-reports-poster.jpg",
    label: "Sage reads a Tiny Health and a NirvanaBiome report, fills the markers, compares them and writes the practitioner guide",
  },
  sampleNote: "Sample client. Screens from the GCL app.",
};

export const sessions = {
  eyebrow: "Before and between sessions",
  headline: "Walk into every session prepared.",
  lead: "Each client has one session area: their terrain, their logs, Sage’s prep and the week’s summary, a click apart.",
  // Real screens from the GCL app, captured from a test client (public/app/practitioner/).
  prep: {
    title: "Session prep",
    body: "Before each session, see what is driving the client’s pattern: the domains to focus on, their strengths, the answers that set the pace, and a note on where to start.",
    image: {
      src: "/app/practitioner/terrain-pattern.png",
      w: 1600,
      h: 908,
      alt: "Terrain readiness in GCL: a practitioner note, key drivers and strengths, and each terrain domain scored and flagged as focus, low or strength",
    },
  },
  summary: {
    title: "Weekly summaries",
    body: "Every week, for every client, Sage writes the summary: what to watch, how engaged they were, journal themes and tone, their baseline, and a prompt for the week ahead.",
  },
};

export const toolkit = {
  headline: "Everything else your practice needs.",
  items: [
    {
      title: "Past logs & check-ins",
      body: "Open any week and see each day: meals, energy, Bristol, hydration and what stood out.",
      image: { src: "/app/practitioner/client-logs.png", w: 1200, h: 452, alt: "A client’s daily logs in GCL, week by week" },
    },
    {
      title: "Recipe suggestions",
      body: "Recipes filtered by phase and by marker, so you can point a client to food that fits their results.",
      image: { src: "/app/practitioner/recipes.jpg", w: 1200, h: 520, alt: "The GCL recipe library, filtered by week, phase and gut marker" },
    },
  ],
  zoom: {
    title: "1:1 Zoom sessions",
    body: "Book and join one-to-one sessions from the client’s record, with your session prep one click away.",
    // Photo: Vitaly Gariev on Unsplash (unsplash.com/photos/nSj0hdQUrW0), Unsplash License.
    image: { src: "/app/practitioner/zoom-session.jpg", w: 1200, h: 675, alt: "A practitioner waving hello to a client on a video call" },
    live: "1:1 session · Live",
    join: "Join on Zoom",
  },
  note: "Screens from the GCL app with a test client.",
};

export const why = {
  headline: "Why practitioners choose GCL.",
  reasons: [
    { title: "Less admin, more coaching", body: "Summaries, prep and report reading are done for you, so your time goes to your clients." },
    { title: "AI that prepares, you decide", body: "Sage and the guides do the groundwork. Every call about your client stays yours." },
    { title: "A proven programme to run", body: "A structured 12-week, food-first journey your clients follow between sessions." },
  ] satisfies Point[],
};

export const practitionerCta = {
  headline: "Ready to bring GCL to your practice?",
  body: "Pick the tier that fits your client load. Every tier includes Sage, the full Practitioner Corner and test interpretation.",
  primary: { label: "See pricing", href: "/pricing" },
  secondary: practitionerHero.secondary,
};
