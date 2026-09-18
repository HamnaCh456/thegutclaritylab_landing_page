export type NavLink = { label: string; href: string; hasMenu?: boolean };

export const nav = {
  brand: "fruitful",
  links: [
    { label: "Membership", href: "#", hasMenu: true },
    { label: "Guides", href: "#", hasMenu: false },
  ] satisfies NavLink[],
  login: { label: "Log in", href: "#" },
  cta: { label: "Get started", href: "#get-started" },
};
