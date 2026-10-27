import type { Metadata } from "next";
import { Nav } from "@/components/sections/Nav";
import {
  ClientExperienceIntro,
  ConsultSageSection,
  ContextSection,
  PractitionerHero,
  PrivacySection,
  ReportsSection,
  SessionsSection,
  ToolkitSection,
} from "@/components/sections/Practitioner";
import { Journey } from "@/components/sections/Journey";
import { SageSection } from "@/components/sections/Showcase";
import { Features } from "@/components/sections/Features";
import { AboutAnu, FinalCta } from "@/components/sections/Closing";
import { Footer } from "@/components/sections/Footer";
import { practitionerCta } from "@/content/practitioner";

export const metadata: Metadata = {
  title: "Gut Clarity Lab — for gut-health practitioners",
  description:
    "Gut Clarity Lab brings client goals, daily logs, check-ins and microbiome test reports into one place, with Sage to help organize information and prepare for sessions.",
};

// The practitioner page is the home page. The client view is hidden at /clients (see `clientsLive`).
export default function Home() {
  return (
    <>
      <div aria-hidden="true" className="scroll-progress" />
      <Nav />
      <main>
        <PractitionerHero />
        <ContextSection />
        <ConsultSageSection />
        <ReportsSection />
        <SessionsSection />
        <ToolkitSection />
        {/* What the client sees between sessions: the client page's own sections. */}
        <div className="bg-mint-wash/40">
          <ClientExperienceIntro />
          <Journey />
          <SageSection id="client-sage" />
          <Features />
        </div>
        <PrivacySection />
        <AboutAnu audience="practitioner" />
        <FinalCta copy={practitionerCta} />
      </main>
      <Footer />
    </>
  );
}
