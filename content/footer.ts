export const footer = {
  columns: [
    { heading: "Platform", links: ["For practitioners", "For clients", "Practitioner directory", "Recipes"] },
    { heading: "Programme", links: ["The 12-week rhythm", "Three paths", "Sage", "Safety"] },
    { heading: "Company", links: ["About", "Contact", "Privacy", "Terms"] },
    { heading: "Support", links: ["Help Desk"] },
  ],
  // Leave empty to hide the illustration row; add /public line illustrations later.
  illustrations: [] as { src: string; alt: string }[],
  legal: [
    "Gut Clarity Lab is a coaching programme, not a diagnostic tool. Nothing in the app or on this page is medical advice, and no part of it replaces care from a qualified clinician.",
    "Sage is an in-app coaching companion focused on food, lifestyle and behaviour. It never gives medical advice. Safety rules for red-flag symptoms, mental-health crises and drug interactions are enforced on the server and always point a client back to their practitioner.",
    "Built on Anu Simh’s Flourish Framework. Anu Simh, NBC-HWC · 9 Arms of Wellness, La Jolla, CA.",
  ],
  copyright: "© 2026 The Gut Clarity Lab. All rights reserved.",
};
