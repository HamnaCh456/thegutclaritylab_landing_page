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

// No checkout yet, and the app is invitation-only (access codes are issued by GCL), so each tier's
// button is an access request by email that names the tier.
const start = (tier: string) => site.mail(`GCL ${tier} tier: access request`);

const all = [true, true, true] as [boolean, boolean, boolean];

export const pricingBenefits = [
  { title: "12-week journey", body: "A structured journey for your clients, from their first check-in onward.", icon: "M4 5h6a3 3 0 0 1 3 3v14a4 4 0 0 0-4-3H4zM22 5h-6a3 3 0 0 0-3 3v14a4 4 0 0 1 4-3h5z" },
  { title: "Recipes and resources", body: "The full recipe library and Practitioner Corner, ready for your practice.", icon: "M13 23v-9M13 17C3 17 3 9 3 9c7-1 10 2 10 8ZM13 14c0-8 4-11 11-10 0 8-4 11-11 10Z" },
  { title: "Sage support", body: "Client context and support for preparing your next session.", icon: "M22 12a9 9 0 0 1-9 9H4l1-5a9 9 0 1 1 17-4ZM13 7l1.5 3.5L18 12l-3.5 1.5L13 17l-1.5-3.5L8 12l3.5-1.5Z" },
  { title: "Test interpretation", body: "Microbiome test interpretation, with practitioner and client guides.", icon: "M8 3h10M10 3v8L4 21a1 1 0 0 0 1 2h16a1 1 0 0 0 1-2l-6-10V3M8 16h10" },
  { title: "Daily check-ins", body: "Goals, daily logs and progress tracking, together in one place.", icon: "M4 4v18h19M7 16l5-5 4 3 6-8" },
  { title: "Session tools", body: "Session prep, notes and messaging to keep the conversation connected.", icon: "M7 4h13a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2ZM9 2v4M18 2v4M9 11h9M9 16h7" },
];

export const pricingQuestions = [
  { question: "What is included in every tier?", answer: "Every tier includes the 12-week Gut Clarity Lab journey, full recipe library, full Practitioner Corner, Sage support, microbiome test interpretation and guides, daily check-ins, progress tracking, session prep, notes, and messaging." },
  { question: "Which tier fits my practice?", answer: "Practitioner supports up to 10 active clients. Practice is for more than 10 and adds monthly GCL practitioner calls and branded recipes. Partner adds a branded client experience, SMS messaging, branded recipe PDFs, GCL Conference access, and a monthly case check-in with Anu." },
  { question: "How do I get started?", answer: "GCL is in beta and access is by invitation. Choose “Request access” on the tier that fits your practice. This opens an email to the GCL team with your chosen tier. You can also book a walkthrough first." },
  { question: "Can I see GCL before requesting access?", answer: "Yes. Select “Book a walkthrough” to open the booking page and arrange a guided look at the platform." },
  { question: "What currency are the prices in?", answer: "The displayed prices are per month, billed in US dollars: $69 for Practitioner, $89 for Practice, and $119 for Partner." },
  { question: "Does every tier include Sage and test interpretation?", answer: "Yes. Sage support and microbiome test interpretation with practitioner and client guides are included in all three tiers." },
];

export const pricing = {
  eyebrow: "Pricing for practitioners",
  headline: "Choose the tier that fits your practice",
  lead: "Every tier includes the complete GCL experience: 12-week journey, recipes, full Practitioner Corner, Sage, and test interpretation tools.",
  priceNote: "per month, billed in USD",
  // How signing up actually works today, said once under the tiers.
  access: {
    body: "GCL is in beta and access is by invitation. Request access on any tier and we will set you up, or book a walkthrough first.",
    walkthrough: { label: "Book a walkthrough", href: site.walkthrough },
  },
  tiers: [
    {
      id: "practitioner",
      name: "Practitioner",
      price: "$69",
      blurb: "For practitioners supporting up to 10 active clients.",
      cta: { label: "Request access", href: start("Practitioner") },
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
      cta: { label: "Request access", href: start("Practice") },
      featuresLabel: "Everything in Practitioner, plus:",
      features: ["More than 10 active clients", "Monthly GCL practitioner calls", "Branded recipes"],
    },
    {
      id: "partner",
      name: "Partner",
      price: "$119",
      blurb: "For practitioners who want a branded, higher-touch partner experience.",
      cta: { label: "Request access", href: start("Partner") },
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
          { label: "Print recipes and create PDFs with your own logo", values: [false, false, true] },
          { label: "SMS text messaging", values: [false, false, true] },
        ],
      },
    ] satisfies CompareGroup[],
  },
};
