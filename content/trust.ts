export type BadgeLogo =
  | { kind: "image"; src: string; alt: string; width: number; height: number }
  | { kind: "trustpilot"; label: string };

export type Badge = { title: string; descriptor: string; href: string; logo?: BadgeLogo };

const badges: Badge[] = [
  { title: "12 weeks", descriptor: "One guided programme", href: "#how-it-works" },
  { title: "3 paths", descriptor: "Metabolic · Restore · North Star", href: "#paths" },
  { title: "Food-first", descriptor: "Never a diagnosis", href: "#faq" },
];

export const trust = {
  eyebrow: "One programme, three paths, food first",
  badges,
  disclaimer:
    "Gut Clarity Lab is not a diagnostic tool and Sage never gives medical advice. It is a coaching programme grounded in food, lifestyle and behaviour, with safety rules that always point a client back to you.",
};
