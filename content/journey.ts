export type Stage = { n: string; title: string; weeks: string; body: string };

export const journey = {
  headline: "A guided 12-week journey",
  subheadline: "You don’t have to change everything at once. GCL takes you through four simple stages.",
  stageLabel: "Stage",
  stages: [
    {
      n: "1",
      title: "Stabilize",
      weeks: "Weeks 1–4",
      body: "Start by noticing. Learn your patterns, understand what may be affecting you, and make a few gentle changes.",
    },
    {
      n: "2",
      title: "Reintroduce",
      weeks: "Weeks 5–6",
      body: "Bring foods back one at a time and learn how your body responds.",
    },
    {
      n: "3",
      title: "Build",
      weeks: "Weeks 7–9",
      body: "Gradually add more variety, fiber, and plant foods to support a diverse gut.",
    },
    {
      n: "4",
      title: "Sustain",
      weeks: "Weeks 10–12",
      body: "Take what you’ve learned into everyday life, including busy weeks, restaurants, travel, and beyond the programme.",
    },
  ] satisfies Stage[],
};
