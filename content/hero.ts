import { cdn } from "./cdn";

export type ChipIcon = "bars" | "coins" | "card" | "chart" | "person";

export const hero = {
  headline: ["Turn every paycheck", "into peace of mind."],
  subhead: [
    "Get a personalized money system that automatically puts every dollar to work.",
    "Bills, spending, saving, investing - all handled.",
  ],
  inputPlaceholder: "What’s your biggest money goal?",
  submitLabel: "Get my Money Map",
  chips: [
    { icon: "bars", label: "Get organized" },
    { icon: "coins", label: "Save more" },
    { icon: "card", label: "Pay off debt" },
    { icon: "chart", label: "Invest smarter" },
    { icon: "person", label: "End the stress" },
  ] satisfies { icon: ChipIcon; label: string }[],
  avatars: [
    cdn("69cfbe6dc5232f89913e70f6/6aaab916ef421c30b0029cea_amy--sm.jpg"),
    cdn("69cfbe6dc5232f89913e70f6/6aaab94be2c6c92881cc336f_eli--sm.jpg"),
    cdn("69cfbe6dc5232f89913e70f6/6aaab8e245b7b730d62a74da_raquel--sm.jpg"),
    cdn("69cfbe6dc5232f89913e70f6/6aaab95f009b9b4868d0a898_kath--sm.jpg"),
    cdn("69cfbe6dc5232f89913e70f6/6aaab955f8704cf2417fafb6_monica--sm.jpg"),
  ],
  trustedLabel: "Trusted by Thousands",
  // Decorative blurred Money Map fragments behind the headline
  fragments: [
    { label: "Monthly", value: "$9,000/month", tone: "cream" },
    { label: "Expenses", value: "$5,000", tone: "mint" },
    { label: "1st Goal", value: "$5,000 · OCT 2026", tone: "stone" },
    { label: "Financial Health", value: "Excellent", tone: "mint" },
  ] satisfies { label: string; value: string; tone: "cream" | "mint" | "stone" }[],
};
