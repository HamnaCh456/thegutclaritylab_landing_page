import { Nav } from "@/components/sections/Nav";
import { Hero } from "@/components/sections/Hero";
import { Journey } from "@/components/sections/Journey";
import { ResultsSection, SageSection } from "@/components/sections/Showcase";
import { Features } from "@/components/sections/Features";
import { AboutAnu, Calm, FinalCta } from "@/components/sections/Closing";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <div aria-hidden="true" className="scroll-progress" />
      <Nav />
      <main>
        <Hero />
        <Journey />
        <SageSection />
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
