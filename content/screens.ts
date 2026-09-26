// Sample data for the recreated app screens. Labels mirror the GCL app; the person is fictional.
export const sidebar = {
  brand: "The Gut Clarity Lab",
  tagline: "Flourish Framework",
  top: ["Today", "Past check-ins"],
  pathLabel: "Restore Path",
  phases: ["Phase 1 — Stabilize", "Reintroduction", "Phase 2 — Build", "Phase 3 — Sustain"],
  terrain: "My Terrain Building",
  toolsLabel: "My Tools",
  tools: ["Work with Sage", "Recipes", "Education Hub", "Messages"],
};

export const dashboard = {
  greeting: "Good morning, Maya",
  date: "Tuesday",
  week: { eyebrow: "This week", title: "Week 5 · Reintroduce", phase: "Reintroduction", days: 7, done: 4, cta: "Go to Week 5" },
  checkIn: { label: "Today's check-in", status: "Saved", note: "Sage noticed: your energy has been steadier on the days you had the Flourish Smoothie." },
  terrain: { label: "My terrain result", value: "Compensated", sub: "19 / 30 · Week 5 re-check" },
  tiles: [
    { label: "Ask Sage", sub: "Your guide between sessions" },
    { label: "Education Hub", sub: "Your lessons are waiting" },
    { label: "Message your practitioner", sub: "1 new reply" },
  ],
  recipe: { label: "Recipe of the week", title: "Warm Oat Porridge with Apple & Blueberry", image: "/app/recipes/05.jpg" },
};

export const checkIn = {
  title: "Daily Check-In",
  day: "Today",
  feel: { label: "How did today feel?", value: 72, left: "Rough", right: "Great" },
  meals: [
    { label: "Breakfast", value: "The Flourish Smoothie", done: true },
    { label: "Lunch", value: "Chickpea & spinach bowl", done: true },
    { label: "Dinner", value: "Add dinner", done: false },
  ],
  water: { label: "Water", filled: 6, total: 8 },
  stoodOut: { label: "What stood out today?", chips: [["Calm digestion", true], ["More energy", true], ["Bloating", false], ["Good sleep", false]] as [string, boolean][] },
  rhythms: [
    { label: "Sleep", value: "Good" },
    { label: "Energy", value: "Steady" },
    { label: "Stress", value: "Low" },
  ],
  save: "Save check-in",
};

export const mealPhoto = {
  title: "Log a meal",
  meal: "Lunch",
  image: "/app/recipes/10.jpg",
  seen: "Sage can see",
  foods: ["Chickpeas", "Spinach", "Brown rice", "Lemon", "Olive oil"],
  cta: "Add to lunch",
};

export const recipes = {
  title: "Recipes",
  filters: ["All", "Breakfast", "Lunch", "Dinner"],
  badge: "Fits your stage",
  items: [
    { title: "Stewed Apple & Cinnamon Bowl", meal: "Breakfast", image: "/app/recipes/01.jpg" },
    { title: "Carrot Ginger Coconut Soup", meal: "Dinner", image: "/app/recipes/30.jpg" },
  ],
  swap: "Swap an ingredient",
};

export const plan = {
  eyebrow: "Week 5 · Reintroduction",
  title: "Reintroduce",
  days: ["M", "T", "W", "T", "F", "S", "S"],
  today: 1,
  cards: [
    { label: "Reintroducing", value: "Dairy — Day 2 of 4", tone: "amber" },
    { label: "Weekly goal", value: "Cooked greens · 3 of 5 days", tone: "green" },
    { label: "My focus", value: "Digestion · Sleep", tone: "plain" },
    { label: "Lesson", value: "Foods back, one at a time", tone: "plain" },
  ] as { label: string; value: string; tone: "amber" | "green" | "plain" }[],
};

export const journey = {
  title: "Your Terrain Journey",
  sub: "Terrain Readiness · score out of 30",
  points: [
    { week: "Week 1", score: 14, band: "Reactive" },
    { week: "Week 5", score: 19, band: "Compensated" },
    { week: "Week 12", score: 25, band: "Organized" },
  ],
  note: "The band sets your pace, never your goal.",
};

export const practitioner = {
  title: "Messages",
  name: "Your practitioner",
  thread: [
    { from: "them", text: "How did the first day of dairy go?" },
    { from: "me", text: "A little bloated after dinner, fine this morning." },
    { from: "them", text: "Useful to know. Keep the portion small tomorrow and we'll talk Thursday." },
  ] as { from: "me" | "them"; text: string }[],
  form: "Form to complete · Weekly reflection",
  book: "Book a session",
};

// The first real lesson in the app's Education Hub, with its actual thumbnail.
export const education = {
  title: "Education Hub",
  module: "Pre-Phase — Orientation",
  video: { image: "/app/meet-your-microbes.jpg", title: "Meet Your Microbes", tag: "Educational", length: "3:10" },
  next: "Up next · The Microbiome Story",
};

export const sageChat = {
  title: "Work with Sage",
  avatar: "/app/sage.svg",
  thread: [
    { from: "me", text: "I feel a bit bloated after dairy. Is that bad?" },
    { from: "sage", text: "Not bad, just useful to notice. Was the portion bigger than usual?" },
    { from: "me", text: "Yes, and a late dinner." },
    { from: "sage", text: "Try a smaller portion tomorrow and see how you feel." },
  ] as { from: "me" | "sage"; text: string }[],
  prompts: ["Reflect on today", "What should I focus on next?"],
  input: "Ask Sage anything…",
};
