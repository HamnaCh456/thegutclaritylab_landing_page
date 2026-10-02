import type { Metadata } from "next";
import { Nav } from "@/components/sections/Nav";
import {
  ConsultSageSection,
  ContextSection,
  PractitionerHero,
  ReportsSection,
  SessionsSection,
  ToolkitSection,
  WhySection,
} from "@/components/sections/Practitioner";
import { AboutAnu, FinalCta } from "@/components/sections/Closing";
import { Footer } from "@/components/sections/Footer";
import { practitionerCta } from "@/content/practitioner";

export const metadata: Metadata = {
  title: "For practitioners — Gut Clarity Lab",
  description:
    "An AI-powered practice partner: full client context, Sage as your co-pilot, report-to-guide in one upload, session prep, weekly summaries and Zoom sessions built in.",
};

export default function PractitionersPage() {
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
        <WhySection />
        <AboutAnu audience="practitioner" />
        <FinalCta copy={practitionerCta} />
      </main>
      <Footer />
    </>
  );
}
