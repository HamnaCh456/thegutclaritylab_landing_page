import type { Metadata } from "next";
import { Nav } from "@/components/sections/Nav";
import { FeatureRows, FeaturesHero, FeaturesNote } from "@/components/sections/FeaturesPage";
import { ResultsSection, SageSection } from "@/components/sections/Showcase";
import { FinalCta } from "@/components/sections/Closing";
import { Footer } from "@/components/sections/Footer";

export const metadata: Metadata = {
  title: "Features — Gut Clarity Lab",
  description:
    "Daily check-ins, meal logging, recipes, your personal plan, lessons and your practitioner, all in one app, with Sage guiding you each week.",
};

export default function FeaturesPage() {
  return (
    <>
      <div aria-hidden="true" className="scroll-progress" />
      <Nav />
      <main>
        <FeaturesHero />
        <FeatureRows />
        <div className="bg-pale-stone/60">
          <SageSection />
        </div>
        <ResultsSection />
        <FeaturesNote />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
