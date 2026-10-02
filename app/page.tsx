import { Nav } from "@/components/sections/Nav";
import { Hero } from "@/components/sections/Hero";
import { PathChoice } from "@/components/sections/PathChoice";
import { Journey } from "@/components/sections/Journey";
import { ResultsSection, SageSection } from "@/components/sections/Showcase";
import { Patterns } from "@/components/sections/Patterns";
import { Features } from "@/components/sections/Features";
import { AboutAnu, Calm, FinalCta } from "@/components/sections/Closing";
import { Footer } from "@/components/sections/Footer";

// The client view. The practitioner view lives at /practitioners.
export default function Home() {
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
