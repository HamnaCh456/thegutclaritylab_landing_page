import type { ComponentType } from "react";
import { features, type ScreenKey } from "@/content/features";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Words } from "@/components/ui/Words";
import { AppWindow } from "@/components/app/AppWindow";
import {
  CheckInScreen,
  EducationScreen,
  JourneyScreen,
  MealPhotoScreen,
  PlanScreen,
  PractitionerScreen,
  RecipesScreen,
} from "@/components/app/screens";

export const screens: Record<ScreenKey, ComponentType> = {
  checkIn: CheckInScreen,
  mealPhoto: MealPhotoScreen,
  recipes: RecipesScreen,
  plan: PlanScreen,
  journey: JourneyScreen,
  practitioner: PractitionerScreen,
  education: EducationScreen,
};

// Seven cards on a six-column grid: two wide, three narrow, two wide.
const span = ["lg:col-span-3", "lg:col-span-3", "lg:col-span-2", "lg:col-span-2", "lg:col-span-2", "lg:col-span-3", "lg:col-span-3"];
const toneClass = { cream: "bg-apricot-cream", stone: "bg-pale-stone" } as const;

function Bracket({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 800 100" aria-hidden="true" className={className}>
      <circle cx="400" cy="10" r="9" fill="currentColor" className="leaf" />
      <path
        d="M400 19v21M40 100V60q0-20 20-20h680q20 0 20 20v40"
        pathLength={1}
        className="draw"
        fill="none"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Features() {
  return (
    <section id="features" aria-labelledby="features-title" className="py-section-sm md:py-section">
      <Container>
        <Reveal>
          <h2 id="features-title" className="mx-auto max-w-2xl text-center text-heading font-medium md:text-heading-lg">
            <Words text={features.headline} />
          </h2>
          <Bracket className="mx-auto mt-8 hidden h-24 w-full max-w-3xl text-vivid-leaf md:block" />
        </Reveal>

        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-6">
          {features.items.map((f, i) => {
            const Screen = screens[f.screen];
            return (
              <Reveal key={f.title} delay={(i % 3) * 110} variant="scale" className={`flex ${span[i]}`}>
                <div className={`card-lift group flex w-full flex-col rounded-images p-5 md:p-6 ${toneClass[f.tone]}`}>
                  <AppWindow className="h-80 transition-transform duration-700 ease-out group-hover:scale-[1.025]">
                    <Screen />
                  </AppWindow>
                  <h3 className="mt-6 text-heading-sm font-semibold">{f.title}</h3>
                  <p className="mt-2 text-body text-graphite-text">{f.body}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
        <p className="mt-6 text-center text-caption text-graphite-text">{features.note}</p>
      </Container>
    </section>
  );
}
