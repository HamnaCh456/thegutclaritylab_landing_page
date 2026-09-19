export type FaqItem = { q: string; a: string[] };

export const faq = {
  headline: "Frequently asked questions",
  items: [
    {
      q: "What is Gut Clarity Lab?",
      a: [
        "A guided 12-week gut-health coaching platform for practitioners. It encodes Anu Simh’s Flourish Framework decision tree — turning a noisy microbiome stool-test report into a small set of prioritised, food-first next steps — and wraps it in a coached, week-by-week client journey with daily check-ins, weekly summaries and an in-app coach called Sage.",
      ],
    },
    {
      q: "Is it a diagnostic tool?",
      a: [
        "No. Gut Clarity Lab is not a diagnostic tool and Sage never gives medical advice. Everything is food-, lifestyle- and behaviour-focused.",
        "Safety rules for red-flag symptoms, mental-health crises and drug interactions are enforced on the server and always override everything else. When one fires, the client is pointed back to you.",
      ],
    },
    {
      q: "How does the 12-week programme work?",
      a: [
        "Before Week 1 there is a short Getting Started period: warm-up days, the Terrain Readiness Quiz and meeting Sage. You choose the day Week 1 begins.",
        "Weeks 1–4 are driven by the terrain quiz, which scores the gut into a zone — Reactive, Compensated or Organised. In Week 5 the quiz regenerates, the microbiome results arrive on the client’s profile and trigger-food reintroduction begins. Week 12 is the final re-test.",
        "You can pause a client’s programme for illness or travel, and restart it cleanly if they start over.",
      ],
    },
    {
      q: "Which tests does it work with?",
      a: [
        "You choose the test per client when you add them, and can change it later. Markers are entered as traffic lights — red, amber, green — straight from the report. Tiny Health PDF reports can be imported directly.",
        "If a client has no test yet, the programme falls back to their terrain zone, so they can start anyway.",
      ],
    },
    {
      q: "What is Sage?",
      a: [
        "Sage is the in-app coach. For clients, it is a food-, lifestyle- and behaviour-focused companion grounded in Motivational Interviewing — available between sessions, never as a substitute for you.",
        "For you, Sage writes a weekly summary of each client, drafts session prep before your next call, and answers questions about a client using only what is on their profile. It tells you what it can and cannot see.",
      ],
    },
    {
      q: "Can I run group programmes?",
      a: [
        "Yes. A cohort has its own code and join link, a member list, sessions with Zoom, and forms and resources you send to everyone at once. Private 1:1 clients live alongside cohorts on the same roster.",
      ],
    },
    {
      q: "How do I get access?",
      a: [
        "Practitioner accounts are set up by the Gut Clarity Lab team. Request access with the button above and we will be in touch to get you started.",
      ],
    },
  ] satisfies FaqItem[],
};
