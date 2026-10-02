export type Point = { title: string; body: string };

export const sage = {
  eyebrow: "Sage",
  headline: "Meet Sage, your guide along the way.",
  lead: "Your AI coach inside GCL, there 24/7 from your first check-in to Week 12.",
  points: [
    { title: "There 24/7", body: "Ask about meals, sleep, stress, digestion or your programme, day or night." },
    { title: "Knows your whole picture", body: "Your wellness vision, terrain quiz, daily logs and gut reports, so every answer is about you." },
    { title: "Coaches you through every week", body: "Knows where you are in the programme and helps you decide what to focus on next." },
  ] satisfies Point[],
  callout: "Sage works alongside your practitioner. It never replaces them.",
};

export const results = {
  eyebrow: "Your gut test",
  headline: "Turn your gut test into a personal guide.",
  intro: "Bring your Tiny Health or NirvanaBiome report. GCL turns it into a simple plan written for you, with no jargon and no long marker lists.",
  points: [
    { title: "Where you’re starting from", body: "What your results mean, in plain words, and what has already shifted." },
    { title: "Your foods right now", body: "The foods your results point to, and how to build your meals." },
    { title: "What to notice next", body: "The small changes to watch for, so you know it’s working." },
  ] satisfies Point[],
  note: "Download it any time, and go through it with your practitioner if you have one.",
  // The two key parts of the real client guide in the app (sample report), 1600px wide.
  guideTitle: "Your gut terrain guide",
  guideImages: [
    { src: "/app/client-guide/shifted-start.png", w: 1600, h: 546 },
    { src: "/app/client-guide/foods.png", w: 1600, h: 353 },
  ],
  guideNote: "Your guide in the app, from a sample report.",
};
