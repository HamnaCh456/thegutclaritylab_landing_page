export type NavLink = { label: string; href: string; hasMenu?: boolean };

export const nav = {
  brand: "Gut Clarity Lab",
  links: [
    { label: "How it works", href: "#how-it-works", hasMenu: false },
    { label: "What clients get", href: "#clients" },
    { label: "FAQ", href: "#faq" },
  ] satisfies NavLink[],
  login: { label: "Log in", href: "#" },
  cta: { label: "Request access", href: "#get-started" },
};
