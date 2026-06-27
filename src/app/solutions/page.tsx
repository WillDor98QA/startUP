import type { Metadata } from "next";
import { PageHero } from "@/components/sections/page-hero";
import { CtaBanner } from "@/components/sections/cta-banner";
import { Reveal } from "@/components/ui/reveal";
import { SOLUTIONS } from "@/lib/content";

export const metadata: Metadata = {
  title: "Solutions",
  description:
    "Outcome-led digital solutions for growing businesses: custom software, process automation, AI, business dashboards, systems integration, and mobile apps.",
};

export default function SolutionsPage() {
  return (
    <>
      <PageHero
        eyebrow="Solutions"
        title="We build outcomes, not just *software*."
        intro="Every engagement starts with the result you're after — hours saved, errors removed, visibility gained — and works backward to the right system. Here's what we build to get you there."
      />

      <section className="pb-8">
        <div className="shell flex flex-col gap-px overflow-hidden rounded-3xl border border-forest/10 bg-forest/10">
          {SOLUTIONS.map((s, i) => (
            <Reveal
              key={s.slug}
              id={s.slug}
              className="scroll-mt-28 bg-cream p-8 md:p-12"
            >
              <div className="grid gap-8 md:grid-cols-[0.85fr_1.15fr] md:gap-14">
                <div>
                  <div className="flex items-center gap-4">
                    <span className="font-mono text-sm text-ember">{s.index}</span>
                    <span className="grid size-12 place-items-center rounded-xl bg-forest-deep/[0.06] ring-1 ring-forest/10">
                      <s.icon className="size-5 text-forest" strokeWidth={1.5} />
                    </span>
                  </div>
                  <h2 className="mt-6 font-serif text-[clamp(2rem,3.5vw,2.8rem)] leading-[1.05] text-forest-deep">
                    {s.title}
                  </h2>
                  <p className="mt-2 font-serif text-lg italic text-ember">{s.tagline}</p>
                  <ul className="mt-6 flex flex-wrap gap-2">
                    {s.features.map((f) => (
                      <li
                        key={f}
                        className="rounded-full border border-forest/15 px-3 py-1 text-xs text-forest/70"
                      >
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>

                <dl className="flex flex-col gap-6">
                  {[
                    { k: "The problem", v: s.problem },
                    { k: "What we build", v: s.solution },
                    { k: "The outcome", v: s.outcome, accent: true },
                  ].map((row) => (
                    <div
                      key={row.k}
                      className="border-l-2 border-forest/10 pl-5 data-[accent=true]:border-ember"
                      data-accent={row.accent ? "true" : undefined}
                    >
                      <dt className="font-mono text-xs uppercase tracking-wider text-muted">
                        {row.k}
                      </dt>
                      <dd
                        className={`mt-2 text-pretty leading-relaxed ${
                          row.accent ? "text-lg text-forest-deep" : "text-muted"
                        }`}
                      >
                        {row.v}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <CtaBanner
        title="Not sure which one you need?"
        sub="That's normal — and exactly what discovery is for. We'll help you find the change that pays back fastest, then build from there."
        secondaryLabel="See the process"
        secondaryHref="/process"
      />
    </>
  );
}
