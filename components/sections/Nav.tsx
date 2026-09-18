import { nav } from "@/content/nav";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Chevron, Leaf } from "@/components/icons";

export function Nav() {
  return (
    <header className="sticky top-0 z-50 bg-paper-white/90 backdrop-blur">
      <Container className="flex h-20 items-center justify-between gap-4">
        <a href="#" aria-label={`${nav.brand} home`} className="flex items-center gap-1.5 text-ink-black">
          <Leaf className="h-7 w-7" />
          <span className="text-heading-sm font-semibold tracking-tight">{nav.brand}</span>
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-1 rounded-nav bg-soft-mist p-1 md:flex">
          {nav.links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="inline-flex items-center gap-1 rounded-nav px-4 py-2 text-body font-medium text-ink-black hover:bg-paper-white"
            >
              {l.label}
              {l.hasMenu && <Chevron className="h-4 w-4" />}
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
