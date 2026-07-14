import { Seo } from "@/components/seo";
import { Link } from "react-router";
import { ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";
import { CtaBanner } from "@/components/sections/cta-banner";
import { Reveal } from "@/components/ui/reveal";
import { CASE_STUDIES } from "@/lib/content";

export default function ProjectsPage() {
  return (
    <>
      <Seo title="Projects" description="Real transformation stories: how growing businesses replaced manual work with custom software, automation, and real-time visibility." />
      <PageHero
        eyebrow="Projects"
        title="Transformation, not just *portfolios*."
        intro="Every project here is a business case study — the manual reality before, what we built, and the measurable difference it made."
      />

      <section className="section-y pt-4">
        <Reveal stagger={0.1} className="shell grid gap-6">
          {CASE_STUDIES.map((c) => (
            <Link
              key={c.slug}
              to={`/projects/${c.slug}`}
              data-cursor-hover
              className="group grid gap-8 overflow-hidden rounded-3xl border border-forest/10 bg-cream p-8 transition-all duration-300 hover:border-forest/20 hover:shadow-[0_30px_70px_-40px_rgba(29,49,36,0.4)] md:grid-cols-[1.4fr_1fr] md:p-12"
            >
              <div className="flex flex-col">
                <span className="text-xs uppercase tracking-wider text-muted">
                  {c.client} · {c.industry}
                </span>
                <h2 className="mt-4 max-w-[18ch] font-serif text-[clamp(1.8rem,3.2vw,2.7rem)] leading-[1.06] text-forest-deep">
                  {c.title}
                </h2>
                <p className="mt-5 max-w-[52ch] text-pretty leading-relaxed text-muted">
                  {c.summary}
                </p>
                <span className="mt-auto inline-flex items-center gap-2 pt-8 font-medium text-forest-deep">
                  Read the transformation
                  <ArrowUpRight className="size-4 text-ember transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </span>
              </div>

              <div className="grid grid-cols-3 gap-px self-start overflow-hidden rounded-2xl border border-forest/10 bg-forest/10 md:grid-cols-1">
                {c.results.map((r) => (
                  <div
                    key={r.label}
                    className="bg-forest-deep p-5 text-center md:flex md:items-baseline md:gap-3 md:text-left"
                  >
                    <div className="font-serif text-3xl text-ember sm:text-4xl">{r.value}</div>
                    <div className="mt-1.5 text-[0.7rem] uppercase tracking-wider text-sage md:mt-0">
                      {r.label}
                    </div>
                  </div>
                ))}
              </div>
            </Link>
          ))}
        </Reveal>
      </section>

      <CtaBanner
        title="Your business could be the next story."
        sub="Tell us where the manual work is hurting most. We'll show you what a transformation could look like — and what it would take."
        secondaryLabel="See our solutions"
        secondaryHref="/solutions"
      />
    </>
  );
}
