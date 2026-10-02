import { site } from "@/content/site";

export type Tier = {
  id: string;
  name: string;
  price: string;
  blurb: string;
  cta: { label: string; href: string };
  // Card list: the base tier lists the core experience; higher tiers list only what they add.
  featuresLabel: string;
  features: string[];
  featured?: boolean;
};

// true = included, false = not included, string = a value shown in the cell.
export type CompareRow = { label: string; values: [boolean | string, boolean | string, boolean | string] };
export type CompareGroup = { group: string; rows: CompareRow[] };

// No checkout yet: each "Get started" opens an email naming the tier.
const start = (tier: string) => `${site.contact}?subject=${encodeURIComponent(`GCL ${tier} tier`)}`;

const all = [true, true, true] as [boolean, boolean, boolean];

export const pricing = {
  eyebrow: "Pricing for practitioners",
  headline: "Choose the tier that fits your practice",
  lead: "Every tier includes the complete GCL experience: 12-week journey, recipes, full Practitioner Corner, Sage, and test interpretation tools.",
  priceNote: "per month, billed in USD",
  tiers: [
    {
      id: "practitioner",
      name: "Practitioner",
      price: "$69",
      blurb: "For practitioners supporting up to 10 active clients.",
      cta: { label: "Get started", href: start("Practitioner") },
      featuresLabel: "Includes:",
      features: [
        "Up to 10 active clients",
        "12-week Gut Clarity Lab journey",
        "Full recipe library",
        "Full Practitioner Corner",
        "Sage support",
        "Microbiome test interpretation + practitioner and client guides",
        "Daily check-ins and progress tracking",
        "Session prep, notes, and messaging",
      ],
    },
    {
      id: "practice",
      name: "Practice",
      price: "$89",
      blurb: "For practitioners supporting more than 10 active clients.",
      cta: { label: "Get started", href: start("Practice") },
      featuresLabel: "Everything in Practitioner, plus:",
      features: ["More than 10 active clients", "Monthly GCL practitioner calls", "Branded recipes"],
    },
    {
      id: "partner",
      name: "Partner",
      price: "$119",
      blurb: "For practitioners who want a branded, higher-touch partner experience.",
      cta: { label: "Get started", href: start("Partner") },
      featuresLabel: "Everything in Practice, plus:",
      features: [
        "SMS text messaging",
        "Branded client experience",
        "Print recipes and create PDFs with your own logo",
        "GCL Conference access",
        "Monthly case check-in with Anu",
      ],
      featured: true,
    },
  ] satisfies Tier[],
  compare: {
    title: "Compare plans",
    groups: [
      {
        group: "Clients",
        rows: [{ label: "Active clients", values: ["Up to 10", "More than 10", "More than 10"] }],
      },
      {
        group: "Core experience",
        rows: [
          { label: "12-week Gut Clarity Lab journey", values: all },
          { label: "Full recipe library", values: all },
          { label: "Full Practitioner Corner", values: all },
          { label: "Sage support", values: all },
          { label: "Microbiome test interpretation + guides", values: all },
          { label: "Daily check-ins and progress tracking", values: all },
          { label: "Session prep, notes, and messaging", values: all },
        ],
      },
      {
        group: "Support and community",
        rows: [
          { label: "Monthly GCL practitioner calls", values: [false, true, true] },
          { label: "GCL Conference access", values: [false, false, true] },
          { label: "Monthly case check-in with Anu", values: [false, false, true] },
        ],
      },
      {
        group: "Branding and communication",
        rows: [
          { label: "Branded recipes", values: [false, true, true] },
          { label: "Branded client experience", values: [false, false, true] },
          { label: "Print recipes and PDFs with your logo", values: [false, false, true] },
          { label: "SMS text messaging", values: [false, false, true] },
        ],
      },
    ] satisfies CompareGroup[],
  },
};
