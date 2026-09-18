export type StepArt =
  | { kind: "tree" }
  | { kind: "chat" }
  | { kind: "switch"; label: string }
  | { kind: "list"; rows: string[] };

export type Step = { n: string; title: string; body: string; art: StepArt };

export const steps = {
  headline: "It’s all built for you.",
  subheadline: ["Just turn it on,", "and watch it work."],
  cta: { label: "Get Started", href: "#get-started" },
  items: [
    {
      n: "01",
      title: "Build It",
      body: "Answer a few simple questions. In minutes, we'll build a personalized Money Map showing exactly where every paycheck should go.",
      art: { kind: "tree" },
    },
    {
      n: "02",
      title: "Refine it",
      body: "Meet 1-on-1 with a Fruitful Guide, a CFP® professional who will answer your questions, fine-tune your plan, and activate your money system.",
      art: { kind: "chat" },
    },
    {
      n: "03",
      title: "Turn it on",
      body: "Accounts are opened, automations are set up, and everything is ready to run. No spreadsheets. No manual transfers.",
      art: { kind: "switch", label: "Money system on" },
    },
    {
      n: "04",
      title: "Watch it work",
      body: "Link your paycheck and let Fruitful do the rest. Every paycheck automatically funds your bills, spending, savings, investments, and goals.",
      art: { kind: "list", rows: ["Bills funded", "Spending funded", "Savings funded", "Investments funded"] },
    },
  ] satisfies Step[],
};
