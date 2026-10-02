import { site } from "@/content/site";
import type { Point } from "@/content/sage";

export type Path = {
  id: string;
  label: string;
  title: string;
  body: string;
  points: string[];
  cta: { label: string; href: string };
};

export const pathChoice = {
  eyebrow: "Your way",
  headline: "Two ways to start. Both are yours to choose.",
  lead: "Work through the programme on your own with Sage, or bring in a practitioner who fits you.",
  paths: [
    {
      id: "own",
      label: "On your own",
      title: "Go at your own pace with Sage",
      body: "The full 12-week programme, with Sage guiding you day to day. No practitioner needed.",
      points: [
        "Every stage, lesson and recipe included.",
        "Sage answers your questions any time.",
        "Your logs and patterns, always in one place.",
      ],
      cta: { label: "Start on your own", href: "#start" },
    },
    {
      id: "practitioner",
      label: "With a practitioner",
      title: "Choose the practitioner who suits you",
      body: "Browse our practitioners and pick the one whose focus and style feel right for you.",
      points: [
        "1:1 video sessions inside the app.",
        "They see your logs and reports, so sessions start where you are.",
        "Recipes and next steps picked for you.",
      ],
      cta: { label: "Find a practitioner", href: site.practitioners },
    },
  ] satisfies Path[],
  note: "Start on your own and add a practitioner later, any time.",
};

export const patterns = {
  eyebrow: "Your patterns",
  headline: "See what really works for your body.",
  lead: "Every check-in and meal you log builds a clearer picture of you.",
  points: [
    { title: "Every log in one place", body: "Look back at any day: what you ate, how you slept, how you felt." },
    { title: "Patterns, spotted for you", body: "GCL connects your meals with how you felt, so you don’t have to." },
    { title: "Know what suits you", body: "See the foods that agree with you, and the ones to go easy on for now." },
  ] satisfies Point[],
  note: "The more you log, the clearer it gets.",
};
