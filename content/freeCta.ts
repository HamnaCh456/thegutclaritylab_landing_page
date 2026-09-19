export type StatIcon = "bolt" | "gift";

export const freeCta = {
  headline: ["Bring your first client in", "this week."],
  stats: [
    { icon: "bolt", label: "Under 10 minutes to add a client and send their code" },
    { icon: "gift", label: "Practitioner directory listing included" },
  ] satisfies { icon: StatIcon; label: string }[],
  bullets: [
    "Add private clients or run group cohorts",
    "Enter test markers and generate both guides",
    "Daily check-ins and weekly summaries on one profile",
    "Session prep drafted by Sage before every call",
    "Forms, documents and Food + Fiber suggestions",
    "Your own logo and name in the client’s sidebar",
  ],
  cta: { label: "Request practitioner access", href: "#" },
};
