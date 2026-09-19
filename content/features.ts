export type FeatureArt =
  | { kind: "question"; prompt: string; options: string[]; selected: number; image?: string }
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

const items: Feature[] = [
    {
      title: "Built around the client",
      body: "Their 12-week wellness vision, the path they chose and what they want to notice this week sit at the top of the profile. You coach the person, not the report.",
      tone: "cream",
      art: {
        kind: "question",
        prompt: "What matters most right now?",
        options: ["Less bloating after meals", "Steadier energy", "Sleeping through the night"],
        selected: 0,
      },
    },
    {
      title: "Full picture",
      body: "Test markers, the Terrain Readiness Quiz and daily check-ins feed one client profile — the screen you work from in every session.",
      tone: "stone",
      art: { kind: "flow", labels: ["Test markers", "Terrain quiz", "Daily check-ins"] },
    },
    {
      title: "Effortless",
      body: "Add a client, send their access code, set the day Week 1 begins. The app generates both guides and runs the weekly rhythm from there.",
      tone: "stone",
      art: { kind: "toggles", rows: ["Access code sent", "Week 1 scheduled", "Guides generated"] },
    },
    {
      title: "Always know where they are",
      body: "Weeks 1–4 build terrain. Week 5 brings the microbiome results and reintroduction. Week 12 re-tests. Every client’s position is on the roster.",
      tone: "cream",
      art: {
        kind: "timeline",
        ticks: ["WEEK 1", "WEEK 5", "WEEK 12"],
        bars: [
          { label: "Terrain building", pct: 35 },
          { label: "Reintroduction", pct: 70 },
          { label: "Re-test", pct: 100 },
        ],
      },
    },
];

export const features = {
  headline: ["This is your practice,", "organised."],
  items,
};
