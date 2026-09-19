// The three programme paths. Each has four tiers that unlock week by week.
export type Product = { title: string; body: string; tiers: string[] };

export const products = {
  headline: ["Three paths.", "One 12-week rhythm."],
  items: [
    {
      title: "Metabolic",
      body: "For clients whose report and terrain point to blood-sugar and energy patterns. Recruit, then integrate, diversify and thrive.",
      tiers: ["Recruit", "Integrate", "Diversify", "Thrive"],
    },
    {
      title: "Restore",
      body: "For a depleted or reactive gut. Re-seed first, rebuild the terrain, expand the diet, then reclaim the foods that were off the table.",
      tiers: ["Re-seed", "Rebuild", "Expand", "Reclaim"],
    },
    {
      title: "North Star",
      body: "For clients who want structure more than a protocol. Reset the basics, add structure, explore, and build something they can sustain.",
      tiers: ["Reset", "Structure", "Explore", "Sustain"],
    },
  ] satisfies Product[],
};
