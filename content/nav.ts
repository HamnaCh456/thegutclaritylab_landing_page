export type NavLink = { label: string; href: string };

// Root-relative so the same links work from /features.
export const nav = {
  brand: "Gut Clarity Lab",
  logo: "/app/gcl-logo.jpeg",
  home: "/",
  links: [
    { label: "The journey", href: "/#journey" },
    { label: "Sage", href: "/#sage" },
    { label: "Features", href: "/features" },
    { label: "Pricing", href: "/pricing" },
    { label: "About Anu", href: "/#anu" },
  ] satisfies NavLink[],
  login: { label: "Log in", href: "#" },
  cta: { label: "Get Started", href: "/#start" },
  // The tab strip above the nav. `/pricing` is practitioner pricing, so it counts as that side.
  audiences: {
    label: "Who is GCL for?",
    client: { label: "For clients", href: "/" },
    practitioner: { label: "For practitioners", href: "/practitioners", paths: ["/practitioners", "/pricing"] },
  },
  practitionerLinks: [
    { label: "Client context", href: "/practitioners#context" },
    { label: "Sage", href: "/practitioners#sage" },
    { label: "Reports", href: "/practitioners#reports" },
    { label: "Sessions", href: "/practitioners#sessions" },
    { label: "Pricing", href: "/pricing" },
  ] satisfies NavLink[],
  practitionerCta: { label: "See pricing", href: "/pricing" },
};

export type Audience = "client" | "practitioner";
