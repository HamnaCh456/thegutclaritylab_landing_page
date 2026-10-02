import type { Metadata } from "next";
import { Nav } from "@/components/sections/Nav";
import { PricingSection } from "@/components/sections/Pricing";
import { Footer } from "@/components/sections/Footer";

export const metadata: Metadata = {
  title: "Pricing — Gut Clarity Lab",
  description:
    "Three tiers for practitioners. Every tier includes the 12-week journey, recipes, the full Practitioner Corner, Sage, and test interpretation tools.",
};

export default function PricingPage() {
  return (
    <>
      <div aria-hidden="true" className="scroll-progress" />
      <Nav />
      <main>
        <PricingSection />
      </main>
      <Footer />
    </>
  );
}
