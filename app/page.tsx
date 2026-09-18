import { Nav } from "@/components/sections/Nav";
import { Hero } from "@/components/sections/Hero";
import { TrustBadges } from "@/components/sections/TrustBadges";
import { PromiseBand } from "@/components/sections/PromiseBand";
import { MoneyMapMock } from "@/components/sections/MoneyMapMock";
import { PressRow } from "@/components/sections/PressRow";
import { DreamMachine } from "@/components/sections/DreamMachine";
import { Steps } from "@/components/sections/Steps";
import { Testimonials } from "@/components/sections/Testimonials";
import { Products } from "@/components/sections/Products";
import { FreeCta } from "@/components/sections/FreeCta";
import { Faq } from "@/components/sections/Faq";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <TrustBadges />
        <PromiseBand />
        <MoneyMapMock />
        <PressRow />
        <DreamMachine />
        <Steps />
        <Testimonials />
        <Products />
        <FreeCta />
        <Faq />
      </main>
      <Footer />
    </>
  );
}
