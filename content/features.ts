import { cdn } from "./cdn";

export type FeatureArt =
  | { kind: "question"; prompt: string; options: string[]; selected: number; image: string }
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

export const features = {
  headline: ["This is your financial", "dream machine."],
  items: [
    {
      title: "Built for you",
      body: "Tailored to your finances, goals, and timelines. Built in ~3 minutes*. Refined on a 1-on-1 chat with a Fruitful CFP Pro®.",
      footnote: "*Actual time may vary.",
      tone: "cream",
      art: {
        kind: "question",
        prompt: "What’s on your mind?",
        options: ["Get out of debt", "Create a money system", "Grow my wealth"],
        selected: 1,
        image: cdn("69cfbe6dc5232f89913e70f6/69cfbe6dc5232f89913e7373_20250317_Frutiful_Guide_Headshot_Andrea.avif"),
      },
    },
    {
      title: "Full Picture",
      body: "Covers your entire financial life, routing money to pay bills, manage spending, contribute to saving goals, and invest smartly.",
      tone: "stone",
      art: { kind: "flow", labels: ["Monthly bills", "Daily spend", "Goals"] },
    },
    {
      title: "Effortless",
      body: "Automates where your money goes every month with clarity about why. This is progress without stress.",
      tone: "stone",
      art: { kind: "toggles", rows: ["Pay bills", "Fund savings", "Invest"] },
    },
    {
      title: "Goal driven",
      body: "Know when you can expect to hit your goals if you implement this system.",
      tone: "cream",
      art: {
        kind: "timeline",
        ticks: ["TODAY", "6 MO", "1 YR"],
        bars: [
          { label: "Vacation fund", pct: 55 },
          { label: "Emergency fund", pct: 80 },
          { label: "Retirement", pct: 100 },
        ],
      },
    },
  ] satisfies Feature[],
};
