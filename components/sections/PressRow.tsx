import Image from "next/image";
import { press } from "@/content/press";
import { Container } from "@/components/ui/Container";

export function PressRow() {
  return (
    <section aria-label="Integrations" className="py-12">
      <Container className="text-center">
        <p className="text-body text-graphite-text">{press.caption}</p>
        <ul className="mt-6 flex flex-wrap items-center justify-center gap-3 md:gap-x-6">
          {press.items.map((it) =>
            it.src ? (
              <li key={it.label}>
                <Image
                  src={it.src}
                  alt={it.label}
                  width={it.width ?? 200}
                  height={it.height ?? 40}
                  className="h-6 w-auto opacity-60 grayscale"
                />
              </li>
            ) : (
              <li
                key={it.label}
                className="rounded-pills border border-soft-mist bg-paper-white px-4 py-2 text-body text-graphite-text"
              >
                {it.label}
              </li>
            ),
          )}
        </ul>
      </Container>
    </section>
  );
}
