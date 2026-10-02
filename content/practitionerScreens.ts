// Sample data for the recreated practitioner screens. The clients are fictional; Maya matches the client screens.
export const practitionerSidebar = {
  brand: "The Gut Clarity Lab",
  tagline: "Practitioner Corner",
  top: ["My clients", "Today’s sessions"],
  clientLabel: "Maya R.",
  client: ["Overview", "Logs & check-ins", "Terrain Building", "Reports & guides"],
  toolsLabel: "Tools",
  tools: ["Consult Sage", "Recipes", "Messages"],
};

export const practitionerSage = {
  title: "Consult Sage",
  client: "About Maya R.",
  avatar: "/app/sage.svg",
  thread: [
    { from: "me", text: "How is Maya handling the dairy reintroduction?" },
    {
      from: "sage",
      text: "Mild bloating on day 1 after a large evening portion; settled by morning. Energy has been steadier on smoothie days. Her vision is “eat out without worrying”.",
    },
    { from: "me", text: "What should I focus on Thursday?" },
    { from: "sage", text: "Portion size and timing, then whether she’s ready to try dairy at a restaurant meal." },
  ] as { from: "me" | "sage"; text: string }[],
  sources: ["Wellness vision", "Terrain quiz", "14 check-ins", "Tiny Health report"],
  input: "Ask about Maya…",
};

// Mirrors the app's Sage weekly summary (alerts, engagement, journal themes, baseline, prompt).
export const weeklySummary = {
  title: "Week 5 · Reintroduce",
  client: "Maya R.",
  generated: "Generated Sunday by Sage",
  engagement: [
    { label: "Check-ins", value: "6/7", pct: 86 },
    { label: "Meals logged", value: "17", pct: 81 },
    { label: "Sage chats", value: "9", pct: 64 },
  ],
  themes: ["Energy steadier", "Eating out", "Progress & wins"],
  tone: "Encouraged",
  quote: "“First week I didn’t think about my stomach at lunch.”",
  baseline: [
    { label: "Energy", value: "Steady", up: true },
    { label: "Sleep", value: "Better", up: true },
    { label: "Digestion", value: "2 flares", up: false, watch: true },
    { label: "Mood", value: "Stable", up: false },
  ] as { label: string; value: string; up: boolean; watch?: boolean }[],
  watch: "Both flares followed a late dinner with dairy.",
  prompt: "Which meals felt easiest this week, and what made them easy?",
};
