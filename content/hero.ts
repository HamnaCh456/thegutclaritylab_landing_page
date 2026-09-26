import { site } from "@/content/site";

export const hero = {
  headline: ["Feel better about your gut,", "one step at a time."],
  subhead: [
    "A science-backed, food-first 12-week programme that helps you understand your body, build better habits, and create a healthier relationship with food.",  ],
  primary: { label: "Get Started", href: "#start" },
  secondary: { label: "Find a Practitioner", href: site.practitioners },
  trustedLabel: "Built on Anu Simh’s Flourish Framework · 9 Arms of Wellness",
  // Tilted app fragments floating beside the headline (xl screens only)
  fragments: [
    { label: "Sage noticed", value: "Steadier energy", tone: "mint" },
    { label: "Week 5", value: "Reintroduce", tone: "cream" },
    { label: "Terrain zone", value: "Compensated", tone: "stone" },
    { label: "Today", value: "Check-in saved", tone: "mint" },
  ] satisfies { label: string; value: string; tone: "cream" | "mint" | "stone" }[],
  screenNote: "The client dashboard in the app. Sample data.",
  // Square ad beside the headline (web copy of gcl-ad-loop/deliverables/gcl-ad-v2-1440.mp4)
  video: {
    src: "/video/gcl-ad.mp4",
    poster: "/video/gcl-ad-poster.jpg",
    label: "Gut Clarity Lab in 35 seconds",
    soundOn: "Sound on",
    soundOff: "Mute",
  },
};
