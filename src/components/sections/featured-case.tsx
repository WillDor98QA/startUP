import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Eyebrow } from "@/components/ui/eyebrow";
import { TextReveal } from "@/components/ui/text-reveal";
import { Reveal } from "@/components/ui/reveal";
import { CASE_STUDIES } from "@/lib/content";

export function FeaturedCase() {
  const c = CASE_STUDIES[0];
  return (
    <section className="section-y">
      <div className="shell">
        <Reveal className="mb-10">
          <Eyebrow>Proof, not promises</Eyebrow>
        </Reveal>

        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div>
            <span className="text-xs uppercase tracking-wider text-muted">
              {c.client} · {c.industry}
            </span>
            <TextReveal
              as="h2"
              text={c.title}
              className="mt-4 text-[clamp(1.9rem,3.8vw,3rem)] leading-[1.05] text-forest-deep"
            />
            <Reveal>
              <p className="mt-6 max-w-[48ch] text-pretty text-lg leading-relaxed text-muted">
                {c.summary} {c.outcome}
              </p>
              <Link
                href={`/projects/${c.slug}`}
                data-cursor-hover
                className="group mt-8 inline-flex items-center gap-2.5 font-medium text-forest-deep"
              >
                Read the full story
                <ArrowRight className="size-4 text-ember transition-transform group-hover:translate-x-1" />
              </Link>
            </Reveal>
          </div>

          <Reveal
            stagger={0.1}
            className="grid grid-cols-3 gap-px overflow-hidden rounded-2xl border border-forest/10 bg-forest/10 lg:grid-cols-1"
          >
            {c.results.map((r) => (
              <div key={r.label} className="bg-forest-deep p-6 text-center lg:flex lg:items-baseline lg:gap-4 lg:text-left">
                <div className="font-serif text-4xl text-ember sm:text-5xl">{r.value}</div>
                <div className="mt-2 text-xs uppercase tracking-wider text-sage lg:mt-0">
                  {r.label}
                </div>
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
