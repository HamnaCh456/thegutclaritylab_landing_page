export type StepArt =
  | { kind: "tree" }
  | { kind: "chat" }
  | { kind: "switch"; label: string }
  | { kind: "list"; rows: string[] };

export type Step = { n: string; title: string; body: string; art: StepArt };

export const steps = {
  headline: "It’s all built for you.",
  subheadline: ["Add a client,", "and the programme runs."],
  cta: { label: "Request access", href: "#get-started" },
  items: [
    {
      n: "01",
      title: "Add a client",
      body: "Enter their name and email, choose which test they’re using, and send their access code. Private 1:1 or part of a cohort — your call.",
      art: { kind: "tree" },
    },
    {
      n: "02",
      title: "Read the test together",
      body: "Enter the red, amber and green markers from their report, or import a Tiny Health PDF. The decision tree turns red markers into prioritised, food-first next steps and generates both guides.",
      art: { kind: "chat" },
    },
    {
      n: "03",
      title: "Set Week 1",
      body: "Pick the day Week 1 begins. Warm-up days, the Terrain Readiness Quiz and meeting Sage happen before it; the weekly rhythm takes over after. Pause it any time for illness or travel.",
      art: { kind: "switch", label: "Programme on" },
    },
    {
      n: "04",
      title: "Coach with the picture in front of you",
      body: "Every check-in lands on the client’s profile. Sage writes a weekly summary and drafts your next session, so you walk into every call prepared.",
      art: { kind: "list", rows: ["Daily check-ins", "Weekly summary from Sage", "Session prep draft", "Messages hub"] },
    },
  ] satisfies Step[],
};
