export type ScreenKey = "checkIn" | "mealPhoto" | "recipes" | "plan" | "journey" | "practitioner" | "education";

// `id`, `short` and `points` are used only on /features.
export type Feature = {
  id: string;
  short: string;
  title: string;
  body: string;
  points: string[];
  screen: ScreenKey;
  tone: "cream" | "stone";
};

export const features = {
  headline: "Everything you need in one place.",
  items: [
    {
      id: "check-ins",
      short: "Check-ins",
      title: "Daily Check-Ins",
      body: "Quickly record how you felt, what you ate, your sleep, energy, stress, movement, and anything you noticed.",
      points: [
        "Takes a minute or two a day.",
        "Sleep, energy, stress, digestion and movement in one entry.",
        "Sage and your practitioner see the patterns over time.",
      ],
      screen: "checkIn",
      tone: "cream",
    },
    {
      id: "meal-logging",
      short: "Meal logging",
      title: "Meal Logging",
      body: "Take a photo of your meal and Sage can help identify the foods.",
      points: [
        "Snap a photo instead of typing every ingredient.",
        "Check and adjust the foods Sage picks out.",
        "Meals sit next to how you felt that day.",
      ],
      screen: "mealPhoto",
      tone: "stone",
    },
    {
      id: "recipes",
      short: "Recipes",
      title: "Recipes",
      body: "Find recipes that fit your current stage, with helpful ingredient swaps.",
      points: [
        "Filtered to the stage you are in.",
        "Ingredient swaps when something doesn’t suit you.",
        "Food-first, everyday cooking.",
      ],
      screen: "recipes",
      tone: "stone",
    },
    {
      id: "plan",
      short: "Your plan",
      title: "Your Personal Plan",
      body: "See your weekly focus, goals, lessons, and next steps in one place.",
      points: [
        "One clear focus for the week.",
        "Lessons and next steps in the order you need them.",
        "Shaped by your practitioner around you.",
      ],
      screen: "plan",
      tone: "cream",
    },
    {
      id: "journey",
      short: "Gut journey",
      title: "Your Gut Journey",
      body: "Track your starting point and see how things change throughout the programme.",
      points: [
        "A clear record of where you started.",
        "Follow the four stages: Stabilize, Reintroduce, Build, Sustain.",
        "See progress week by week, not just at the end.",
      ],
      screen: "journey",
      tone: "stone",
    },
    {
      id: "practitioner",
      short: "Practitioner",
      title: "Your Practitioner",
      body: "Message your practitioner, complete forms, book sessions, and share information directly through the app.",
      points: [
        "Messages in the same place as your logs.",
        "Forms and session booking without extra emails.",
        "Your practitioner sees what you choose to share.",
      ],
      screen: "practitioner",
      tone: "cream",
    },
    {
      id: "education",
      short: "Education",
      title: "Education",
      body: "Learn through short videos and simple lessons designed around each stage of the programme.",
      points: [
        "Short videos you can watch any time.",
        "Lessons matched to each stage.",
        "Plain language, no jargon.",
      ],
      screen: "education",
      tone: "stone",
    },
  ] satisfies Feature[],
  note: "App screens shown with sample data.",
};

export const featuresPage = {
  eyebrow: "Features",
  headline: ["Everything in GCL,", "in one place."],
  lead: "Check-ins, meals, recipes, lessons and your practitioner, all inside one app, with Sage guiding you through each week.",
  jumpLabel: "Jump to",
  sage: { id: "sage", short: "Sage" },
  moreLabel: "Explore the 12-week journey",
  moreHref: "/#journey",
};
