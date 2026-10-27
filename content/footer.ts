import type { NavLink } from "@/content/nav";
import { site } from "@/content/site";

export const footer = {
  brand: "Gut Clarity Lab",
  logo: "/app/gcl-logo.jpeg",
  tagline: "Built for gut-health practitioners. Science-backed and food-first.",
  columns: [
    {
      heading: "Product",
      links: [
        { label: "How it works", href: "/#context" },
        { label: "Sage", href: "/#sage" },
        { label: "Test reports", href: "/#reports" },
        { label: "Client experience", href: "/#client-experience" },
        { label: "Pricing", href: "/pricing" },
      ],
    },
    {
      heading: "Company",
      links: [
        { label: "About", href: "/#anu" },
        { label: "Book a walkthrough", href: site.walkthrough },
        { label: "Contact", href: site.contact },
        { label: "Help Desk", href: site.support },
      ],
    },
    {
      heading: "Legal",
      links: [
        { label: "Privacy and data", href: "/#privacy" },
        { label: "Privacy Policy", href: site.privacy },
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
