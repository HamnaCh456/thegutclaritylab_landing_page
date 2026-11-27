// The live GCL app; public pages there that this site links out to.
const app = "https://thegutclaritylab.com";

const contact = "mailto:hello@thegutclaritylab.com";
const mail = (subject: string) => `${contact}?subject=${encodeURIComponent(subject)}`;

export const site = {
  // The app's own front door: signs a practitioner in, or takes a signed-in one to their dashboard.
  login: app,
  practitioners: `${app}/practitioners`,
  privacy: `${app}/privacy`,
  terms: `${app}/terms`,
  support: `${app}/support`,
  contact,
  // Shared booking destination for every "Book a walkthrough" button on the site.
  walkthrough: "https://www.9armsofwellness.com/gcl-app",
  mail,
};
