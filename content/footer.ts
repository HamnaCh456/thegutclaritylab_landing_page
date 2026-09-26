import type { NavLink } from "@/content/nav";
import { site } from "@/content/site";

export const footer = {
  brand: "Gut Clarity Lab",
  logo: "/app/gcl-logo.jpeg",
  tagline: "Science-backed. Food-first. Guided by Sage.",
  columns: [
    {
      heading: "Programme",
      links: [
        { label: "The 12-week journey", href: "/#journey" },
        { label: "Sage", href: "/#sage" },
        { label: "Features", href: "/features" },
      ],
    },
    {
      heading: "Company",
      links: [
        { label: "About", href: "/#anu" },
        { label: "Find a Practitioner", href: site.practitioners },
        { label: "Contact", href: site.contact },
        { label: "Help Desk", href: site.support },
      ],
    },
    {
      heading: "Legal",
      links: [
        { label: "Privacy", href: site.privacy },
        { label: "Terms", href: site.terms },
      ],
    },
  ] satisfies { heading: string; links: NavLink[] }[],
  legal: [
    "GCL provides education and coaching support. It is not medical care and does not diagnose, treat, prescribe, or dose.",
    "Built on Anu Simh’s Flourish Framework. Anu Simh, NBC-HWC · 9 Arms of Wellness, La Jolla, CA.",
  ],
  copyright: "© 2026 The Gut Clarity Lab. All rights reserved.",
};
