export type Point = { title: string; body: string };

export const sage = {
  eyebrow: "Sage",
  headline: "Meet Sage, your guide along the way.",
  lead: "Your AI coach inside GCL, with you from your first check-in to Week 12.",
  points: [
    { title: "Coaches you through every week", body: "Knows where you are in the programme and helps you decide what to focus on next." },
    { title: "Personal to you", body: "Support based on your own check-ins, progress and goals, not generic advice." },
    { title: "There whenever you have a question", body: "Ask about meals, sleep, stress, digestion or your programme, any time." },
  ] satisfies Point[],
  callout: "Sage works alongside your practitioner. It never replaces them.",
};

export const results = {
  eyebrow: "Your gut test",
  headline: "Turn your gut test into a personal guide.",
  intro: "Bring your Tiny Health or NirvanaBiome report. GCL turns it into a simple guide written for you.",
  points: [
    { title: "What needs attention", body: "The few things worth working on first." },
    { title: "What’s already working", body: "The good news in your results." },
    { title: "Which foods to start with", body: "Clear food steps, in the order that suits you." },
  ] satisfies Point[],
  note: "Your practitioner reviews your guide with you.",
  // Crops of the real guide in the app, top to bottom (1425px wide originals).
  guideTitle: "Your guide",
  guideImages: [
    { src: "/app/guide/attention.png", w: 1425, h: 560 },
    { src: "/app/guide/working-well.png", w: 1425, h: 250 },
    { src: "/app/guide/priorities.png", w: 1425, h: 425 },
  ],
  guideNote: "The guide in the app, from a sample report.",
};
