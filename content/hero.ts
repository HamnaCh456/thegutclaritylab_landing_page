export type ChipIcon = "bars" | "coins" | "card" | "chart" | "person";

export const hero = {
  // U+2011 non-breaking hyphen keeps "gut-health" on one line at phone widths
  headline: ["Run your gut‑health practice", "on one platform."],
  subhead: [
    "Turn a client’s microbiome test into a 12-week, food-first programme.",
    "Check-ins, weekly summaries, session prep and Sage — on one client profile.",
  ],
  inputPlaceholder: "Your work email",
  submitLabel: "Request practitioner access",
  chips: [
    { icon: "person", label: "Onboard clients" },
    { icon: "chart", label: "Read test results" },
    { icon: "bars", label: "Track check-ins" },
    { icon: "card", label: "Prep sessions" },
    { icon: "coins", label: "Run group cohorts" },
  ] satisfies { icon: ChipIcon; label: string }[],
  // Leave empty to hide the avatar stack — add /public portraits of real practitioners later.
  avatars: [] as string[],
  trustedLabel: "Built on Anu Simh’s Flourish Framework · 9 Arms of Wellness",
  // Decorative blurred client-profile fragments behind the headline
  fragments: [
    { label: "Terrain zone", value: "Compensated", tone: "cream" },
    { label: "Week 5", value: "Reintroduction", tone: "mint" },
    { label: "Check-ins", value: "12-day streak", tone: "stone" },
    { label: "Session prep", value: "Ready", tone: "mint" },
  ] satisfies { label: string; value: string; tone: "cream" | "mint" | "stone" }[],
};
