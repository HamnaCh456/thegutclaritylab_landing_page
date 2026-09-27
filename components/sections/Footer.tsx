import Image from "next/image";
import { footer } from "@/content/footer";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { seq } from "@/components/ui/Words";

export function Footer() {
  return (
    <footer className="border-t border-soft-mist pt-12 pb-6 md:pt-16">
      <Container>
        <Reveal className="grid gap-12 lg:grid-cols-[1.2fr_2fr]">
          <div>
            <div className="flex items-center gap-3">
              <Image src={footer.logo} alt="" width={64} height={64} className="h-16 w-16 mix-blend-multiply" />
              <p className="text-heading-sm font-semibold">{footer.brand}</p>
            </div>
            <p className="mt-4 text-body text-graphite-text">{footer.tagline}</p>
          </div>
          <nav aria-label="Footer" className="grid grid-cols-2 gap-8 md:grid-cols-3">
            {footer.columns.map((c, i) => (
              <div key={c.heading} className="stagger-item" style={seq(i, { "--step": "120ms" })}>
                <p className="text-body font-medium">{c.heading}</p>
                <ul className="mt-3 space-y-2">
                  {c.links.map((l) => (
                    <li key={l.label}>
                      <a href={l.href} className="inline-block text-body text-graphite-text underline-offset-4 transition-[color,translate] duration-300 hover:translate-x-1 hover:text-ink-black hover:underline">
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </Reveal>

        <div className="mt-10 space-y-1 border-t border-soft-mist pt-4 text-caption text-graphite-text">
          {footer.legal.map((p) => (
            <p key={p}>{p}</p>
          ))}
          <p>{footer.copyright}</p>
        </div>
      </Container>
    </footer>
  );
}
