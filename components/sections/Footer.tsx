import Image from "next/image";
import { footer } from "@/content/footer";
import { Container } from "@/components/ui/Container";
import { Leaf } from "@/components/icons";

export function Footer() {
  return (
    <footer className="border-t border-soft-mist py-section-sm md:py-section">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1fr_auto] lg:items-end">
          <nav aria-label="Footer" className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {footer.columns.map((c) => (
              <div key={c.heading}>
                <p className="text-body font-medium">{c.heading}</p>
                <ul className="mt-3 space-y-2">
                  {c.links.map((l) => (
                    <li key={l}>
                      <a href="#" className="text-body text-graphite-text hover:text-ink-black">
                        {l}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
          <Leaf className="h-40 w-40 text-ink-black lg:justify-self-end" />
        </div>

        {footer.illustrations.length > 0 && (
          <ul className="mt-16 flex flex-wrap justify-center gap-8">
            {footer.illustrations.map((il) => (
              <li key={il.src}>
                <Image src={il.src} alt={il.alt} width={140} height={140} className="h-28 w-auto" />
              </li>
            ))}
          </ul>
        )}

        <div className="mx-auto mt-16 max-w-4xl space-y-4 text-legal text-graphite-text">
          {footer.legal.map((p) => (
            <p key={p}>{p}</p>
          ))}
          <p>{footer.copyright}</p>
        </div>
      </Container>
    </footer>
  );
}
