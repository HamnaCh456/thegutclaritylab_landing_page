"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { nav } from "@/content/nav";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export function Nav() {
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
      <Container className="flex h-14 items-center justify-between gap-4">
        <a href={nav.home} aria-label={`${nav.brand} home`} className="group flex items-center gap-2 text-ink-black">
          <Image
            src={nav.logo}
            alt=""
            width={36}
            height={36}
            priority
            className="h-8 w-8 mix-blend-multiply transition-transform duration-500 ease-out group-hover:-rotate-12 group-hover:scale-110"
          />
          <span className="whitespace-nowrap text-subheading font-semibold tracking-tight">{nav.brand}</span>
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-1 rounded-nav bg-soft-mist p-1 md:flex">
          {nav.links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="inline-flex items-center gap-1 rounded-nav px-3.5 py-1 text-body font-medium text-ink-black transition-[background-color,box-shadow] duration-300 hover:bg-paper-white hover:shadow-sm"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden md:block">
            <Button variant="ghost" href={nav.login.href}>
              {nav.login.label}
            </Button>
          </div>
          <Button href={nav.cta.href}>{nav.cta.label}</Button>
        </div>
      </Container>
    </header>
  );
}
