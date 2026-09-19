export type Tone = "cream" | "sand" | "mint" | "stone";

// The phone mock: a client's week as the practitioner sees it on their profile.
export const moneyMap = {
  title: "Week 5 · Reintroduction",
  subtitle: "A client’s week at a glance",
  income: { label: "Terrain zone", amount: "Compensated" },
  split: [
    { label: "Check-ins", amount: "6 / 7", tone: "sand" },
    { label: "Water", amount: "8 glasses", tone: "mint" },
    { label: "Sleep", amount: "7.2 h", tone: "stone" },
  ] satisfies { label: string; amount: string; tone: Tone }[],
  goalsHeading: "This week’s priorities",
  goals: [
    { n: 1, tag: "Reintroduction", label: "Dairy — exposure 2 of 3", amount: "Observe", when: "DAY 4" },
    { n: 2, tag: "Food + Fiber", label: "Cooked greens daily", amount: "Suggested", when: "BY YOU" },
    { n: 3, tag: "Stress toolkit", label: "RESTORE practice", amount: "3 of 5", when: "THIS WEEK" },
    { n: 4, tag: "Weekly check-in", label: "Energy, digestion, sleep", amount: "Due", when: "SUNDAY" },
  ],
  footnote: "Example client data, for illustration only.",
};
