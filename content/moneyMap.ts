export type Tone = "cream" | "sand" | "mint" | "stone";

export const moneyMap = {
  title: "Give every paycheck a plan",
  subtitle: "Your categorized monthly split",
  income: { label: "Take-home pay", amount: "$9,125" },
  split: [
    { label: "Bills", amount: "$4,375", tone: "sand" },
    { label: "Spend", amount: "$2,250", tone: "mint" },
    { label: "Goals", amount: "$2,500", tone: "stone" },
  ] satisfies { label: string; amount: string; tone: Tone }[],
  goalsHeading: "Projected goals timeline",
  goals: [
    { n: 1, label: "Vacation fund", amount: "$6,000", when: "JUL 2027" },
    { n: 2, label: "Home maintenance", amount: "$9,000", when: "JUL 2027" },
    { n: 3, label: "Retirement", amount: "$9,000", when: "OCT 2026" },
    { n: 4, label: "Annual / irregular expenses", amount: "$6,000", when: "OCT 2026" },
  ],
  footnote: "Examples shown for illustrative purposes only.",
};
