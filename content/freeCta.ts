export type StatIcon = "bolt" | "gift";

export const freeCta = {
  headline: ["Build your future now.", "For free."],
  stats: [
    { icon: "bolt", label: "~3 minutes to get your Money Map" },
    { icon: "gift", label: "No payment required" },
  ] satisfies { icon: StatIcon; label: string }[],
  bullets: [
    "Know exactly where every paycheck should go",
    "Automatically fund bills, spending, savings & goals",
    "Get 1-on-1 help from a financial professional",
    "Grow your money with pro investment management",
    "Earn up to 4.00% APY¹ on all of your cash",
    "Earn up to 2% cash back on spend²",
  ],
  cta: { label: "Get my Money Map", href: "#" },
};
