import Image from "next/image";
import { press } from "@/content/press";
import { Container } from "@/components/ui/Container";

export function PressRow() {
  return (
    <section aria-label="Press mentions" className="py-12">
      <Container className="text-center">
        <p className="text-body text-graphite-text">{press.caption}</p>
        <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
          {press.logos.map((l) => (
            <li key={l.alt}>
              <Image src={l.src} alt={l.alt} width={l.width} height={l.height} className="h-6 w-auto opacity-60 grayscale" />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
