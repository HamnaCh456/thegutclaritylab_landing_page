import { cdn } from "./cdn";

export type BadgeLogo =
  | { kind: "image"; src: string; alt: string; width: number; height: number }
  | { kind: "trustpilot"; label: string };

export type Badge = { title: string; descriptor: string; href: string; logo: BadgeLogo };

export const trust = {
  eyebrow: "Trusted by Thousands",
  badges: [
    {
      title: "Best",
      descriptor: "Planning Platform",
      href: "#",
      logo: {
        kind: "image",
        src: cdn("69cfbe6dc5232f89913e70c2/69cfbe6dc5232f89913e72d1_FinTech.jpg"),
        alt: "FinTech Breakthrough Awards",
        width: 87,
        height: 80,
      },
    },
    {
      title: "Excellent",
      descriptor: "Rated 4.8 / 5",
      href: "https://www.trustpilot.com/review/fruitful.com",
      logo: { kind: "trustpilot", label: "Trustpilot" },
    },
    {
      title: "Best",
      descriptor: "Banking Card",
      href: "#",
      logo: {
        kind: "image",
        src: cdn("69cfbe6dc5232f89913e70c2/69cfbe6dc5232f89913e72d0_tearsheet.jpg"),
        alt: "Tearsheet",
        width: 133,
        height: 82,
      },
    },
  ] satisfies Badge[],
  disclaimer:
    "Reviews don’t reflect every member’s experience or guarantee future results. Third-party awards use their own criteria and don’t guarantee outcomes.",
};
