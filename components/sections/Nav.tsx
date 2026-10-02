"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav, type Audience } from "@/content/nav";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

// Segmented tab in the nav bar that switches the whole site between the client and practitioner pages.
// Phones get the short labels so the pair always fits beside the logo.
function AudienceTabs({ active }: { active: Audience }) {
  const a = nav.audiences;
  return (
    <nav aria-label={a.label} className="flex shrink-0 gap-0.5 rounded-pills bg-soft-mist p-1">
      {(["client", "practitioner"] as const).map((key) => {
        const on = key === active;
        return (
          <Link
            key={key}
            href={a[key].href}
            aria-current={on ? "page" : undefined}
            className={`whitespace-nowrap rounded-pills px-3 py-1 text-legal font-semibold transition-colors duration-300 sm:px-4 ${
              on ? "bg-forest-floor text-paper-white shadow-sm" : "text-graphite-text hover:bg-paper-white hover:text-ink-black"
            }`}
          >
            <span className="sm:hidden">{a[key].short}</span>
            <span className="hidden sm:inline">{a[key].label}</span>
          </Link>
        );
      })}
    </nav>
  );
}

export function Nav() {
  const pathname = usePathname();
  const audience: Audience = nav.audiences.practitioner.paths.some((p) => pathname.startsWith(p)) ? "practitioner" : "client";
  const links = audience === "practitioner" ? nav.practitionerLinks : nav.links;
  const cta = audience === "practitioner" ? nav.practitionerCta : nav.cta;
  const home = audience === "practitioner" ? nav.audiences.practitioner.href : nav.home;

  // Hairline appears once the page has scrolled, so the bar reads as a bar, not a strip of hero.
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`load-drop sticky top-0 z-50 border-b bg-paper-white/90 backdrop-blur transition-colors ${
        scrolled ? "border-soft-mist" : "border-transparent"
      }`}
    >
      <Container className="flex h-16 items-center justify-between gap-3 lg:gap-4">
        <div className="flex min-w-0 items-center gap-3 lg:gap-5">
          <Link href={home} aria-label={`${nav.brand} home`} className="group flex shrink-0 items-center gap-2 text-ink-black">
            <Image
              src={nav.logo}
              alt=""
              width={36}
              height={36}
              priority
              className="h-8 w-8 mix-blend-multiply transition-transform duration-500 ease-out group-hover:-rotate-12 group-hover:scale-110"
            />
            <span className="hidden whitespace-nowrap text-subheading font-semibold tracking-tight sm:inline">{nav.brand}</span>
          </Link>
          <AudienceTabs active={audience} />
        </div>

        <nav aria-label="Primary" className="hidden items-center gap-0.5 rounded-nav bg-soft-mist p-1 xl:flex">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="inline-flex items-center whitespace-nowrap rounded-nav px-3 py-1 text-legal font-medium text-ink-black transition-[background-color,box-shadow] duration-300 hover:bg-paper-white hover:shadow-sm"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2 lg:gap-3">
          <div className="hidden md:block">
            <Button variant="ghost" href={nav.login.href}>
              {nav.login.label}
            </Button>
          </div>
          <div className="hidden sm:block">
            <Button href={cta.href}>{cta.label}</Button>
          </div>
        </div>
      </Container>
    </header>
  );
}
