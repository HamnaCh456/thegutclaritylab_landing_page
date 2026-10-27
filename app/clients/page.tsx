import type { Metadata } from "next";
import { Nav } from "@/components/sections/Nav";
import { clientsLive } from "@/content/nav";
import { Hero } from "@/components/sections/Hero";
import { PathChoice } from "@/components/sections/PathChoice";
import { Journey } from "@/components/sections/Journey";
import { ResultsSection, SageSection } from "@/components/sections/Showcase";
import { Patterns } from "@/components/sections/Patterns";
import { Features } from "@/components/sections/Features";
import { AboutAnu, Calm, FinalCta } from "@/components/sections/Closing";
import { Footer } from "@/components/sections/Footer";

// The client view, hidden until the client offering and pricing are final: nothing links here
// and it is not indexed. Flip `clientsLive` in content/nav.ts to bring it back.
export const metadata: Metadata = {
  title: "Gut Clarity Lab — Feel better about your gut, one step at a time",
  description:
    "A science-backed, food-first 12-week program that helps you understand your body, build better habits and create a healthier relationship with food. Guided by your practitioner and Sage.",
  robots: clientsLive ? undefined : { index: false, follow: false },
};

export default function ClientsPage() {
  return (
    <>
      <div aria-hidden="true" className="scroll-progress" />
      <Nav />
      <main>
        <Hero />
        <PathChoice />
        <Journey />
        <SageSection />
        <Patterns />
        <ResultsSection />
        <Features />
        <Calm />
        <AboutAnu />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
