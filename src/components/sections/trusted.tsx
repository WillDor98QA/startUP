import { Marquee } from "@/components/ui/marquee";
import { Reveal } from "@/components/ui/reveal";
import { CLIENTS } from "@/lib/content";

export function Trusted() {
  return (
    <section className="border-y border-forest/10 bg-cream-soft py-12">
      <Reveal className="shell">
        <p className="eyebrow mb-8 text-center text-muted">
          Trusted by growing businesses across industries
        </p>
      </Reveal>
      <Marquee
        speed={44}
        className="[mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]"
      >
        {CLIENTS.map((c) => (
          <span
            key={c}
            className="mx-9 whitespace-nowrap font-serif text-2xl text-forest-deep/40 transition-colors duration-300 hover:text-forest-deep sm:text-[1.7rem]"
          >
            {c}
          </span>
        ))}
      </Marquee>
    </section>
  );
}
