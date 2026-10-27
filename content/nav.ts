import { site } from "@/content/site";

export type NavLink = { label: string; href: string };

// The practitioner page is the home page. The client view (/clients, /features) is kept in the
// code but hidden until the client offering and its pricing are final: nothing links to it and
// it is not indexed. Flip `clientsLive` to bring back the "For clients" tab and index those pages.
export const clientsLive = false;

// Root-relative so the same links work from /pricing.
export const nav = {
  brand: "Gut Clarity Lab",
  logo: "/app/gcl-logo.jpeg",
  login: { label: "Log in", href: site.login },
  // The audience tabs in the nav bar, shown only while `clientsLive` is on.
  audiences: {
    label: "Who is GCL for?",
    client: { label: "For clients", short: "Clients", href: "/clients", paths: ["/clients", "/features"] },
    practitioner: { label: "For practitioners", short: "Practitioners", href: "/" },
  },
  practitioner: {
    home: "/",
    links: [
      { label: "How it works", href: "/#context" },
      { label: "Sage", href: "/#sage" },
      { label: "Test reports", href: "/#reports" },
      { label: "Client experience", href: "/#client-experience" },
      { label: "Privacy", href: "/#privacy" },
      { label: "Pricing", href: "/pricing" },
      { label: "About", href: "/#anu" },
    ] satisfies NavLink[],
    cta: { label: "Book a walkthrough", href: site.walkthrough },
  },
  client: {
    home: "/clients",
    links: [
      { label: "The journey", href: "/clients#journey" },
      { label: "Sage", href: "/clients#sage" },
      { label: "Features", href: "/features" },
      { label: "About Anu", href: "/clients#anu" },
    ] satisfies NavLink[],
    cta: { label: "Get Started", href: "/clients#start" },
  },
};

export type Audience = "client" | "practitioner";
