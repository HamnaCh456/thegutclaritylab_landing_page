// This section reuses the Fruitful testimonial grid to list what a CLIENT gets.
// `review` cards are text cards (stars only when `stars: true`); `portrait` cards need a real photo.
export type ReviewCard = {
  kind: "review";
  eyebrow: string;
  title: string;
  body: string;
  href?: string;
  stars?: boolean;
};
export type PortraitCard = { kind: "portrait"; name: string; role: string; quote: string; image: string };
export type TestimonialCard = ReviewCard | PortraitCard;

const cards: TestimonialCard[] = [
    {
      kind: "review",
      eyebrow: "Every day",
      title: "A two-minute daily check-in",
      body: "Digestion, energy, sleep, stress, water and meals — with a photo if they like. Sage notices patterns and says so, gently.",
    },
    {
      kind: "review",
      eyebrow: "Every week",
      title: "A weekly dashboard with one focus",
      body: "One goal to choose, a stress or sleep toolkit, the RESTORE and Wind-Down practices, and a heads-up before the week changes.",
    },
    {
      kind: "review",
      eyebrow: "Any time",
      title: "Sage, between sessions",
      body: "A food-, lifestyle- and behaviour-focused companion grounded in Motivational Interviewing. It never gives medical advice and sends red flags back to you.",
    },
    {
      kind: "review",
      eyebrow: "From Week 5",
      title: "Reintroduction, done properly",
      body: "Three exposures and an observation day per trigger food, with the verdict recorded on their profile where you can see it.",
    },
    {
      kind: "review",
      eyebrow: "From you",
      title: "Forms, documents and food suggestions",
      body: "Send a form or a document to one client or a whole cohort. Suggest a specific food from the Food + Fiber library with a note on why.",
    },
    {
      kind: "review",
      eyebrow: "On their own",
      title: "Recipes and simple swaps",
      body: "The Flourish Smoothie and Lunch, a recipe library, and straightforward swaps for the foods they’re avoiding.",
    },
    {
      kind: "review",
      eyebrow: "Before Week 1",
      title: "A gentle start",
      body: "Warm-up days, the Terrain Readiness Quiz, meeting Sage and a few optional things to explore — so Week 1 doesn’t arrive cold.",
    },
    {
      kind: "review",
      eyebrow: "Always",
      title: "You, one message away",
      body: "Booking time, “I need guidance”, and a messages hub for the client and their group.",
    },
];

export const testimonials = {
  headline: "What your clients get.",
  readMore: "Read more",
  cta: { label: "See how it works", href: "#how-it-works" },
  cards,
};
