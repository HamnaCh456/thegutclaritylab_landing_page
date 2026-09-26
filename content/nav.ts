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
    { label: "About Anu", href: "/#anu" },
  ] satisfies NavLink[],
  login: { label: "Log in", href: "#" },
  cta: { label: "Get Started", href: "/#start" },
};
