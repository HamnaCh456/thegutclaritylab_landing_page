import { Nav } from "@/components/sections/Nav";
import { Hero } from "@/components/sections/Hero";
import { TrustBadges } from "@/components/sections/TrustBadges";
import { PromiseBand } from "@/components/sections/PromiseBand";
import { MoneyMapMock } from "@/components/sections/MoneyMapMock";
import { PressRow } from "@/components/sections/PressRow";
import { DreamMachine } from "@/components/sections/DreamMachine";

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
      </main>
    </>
  );
}
