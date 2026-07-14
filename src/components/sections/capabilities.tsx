import { Link } from "react-router";
import { ArrowUpRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { SOLUTIONS } from "@/lib/content";

export function Capabilities() {
  return (
    <section className="section-y bg-cream-soft">
      <div className="shell">
        <div className="mb-16 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="How we help"
            title="One partner for the whole *transformation*."
            className="max-w-2xl"
          />
          <Button href="/solutions" variant="ghost" className="shrink-0">
            See all solutions
          </Button>
        </div>

        <Reveal
          stagger={0.08}
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {SOLUTIONS.map((s) => (
            <Link
              key={s.slug}
              to={`/solutions#${s.slug}`}
              data-cursor-hover
              className="group flex flex-col rounded-2xl border border-forest/10 bg-cream p-7 transition-all duration-300 hover:-translate-y-1 hover:border-forest/20 hover:shadow-[0_24px_60px_-30px_rgba(29,49,36,0.35)]"
            >
              <div className="flex items-start justify-between">
                <span className="grid size-12 place-items-center rounded-xl bg-forest-deep/[0.06] ring-1 ring-forest/10 transition-colors group-hover:bg-ember group-hover:ring-ember">
                  <s.icon
                    className="size-5 text-forest transition-colors group-hover:text-cream"
                    strokeWidth={1.5}
                  />
                </span>
                <ArrowUpRight className="size-5 text-muted/50 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ember" />
              </div>
              <h3 className="mt-6 font-serif text-2xl text-forest-deep">{s.title}</h3>
              <p className="mt-1.5 font-serif text-base italic text-ember">{s.tagline}</p>
              <p className="mt-4 text-sm leading-relaxed text-muted">{s.outcome}</p>
            </Link>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
