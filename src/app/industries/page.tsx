import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { TextReveal } from "@/components/ui/text-reveal";
import { Reveal } from "@/components/ui/reveal";
import { Eyebrow } from "@/components/ui/eyebrow";
import { GlobeScene } from "@/components/three/globe-scene";
import { CtaBanner } from "@/components/sections/cta-banner";
import { INDUSTRIES } from "@/lib/content";

export const metadata: Metadata = {
  title: "Industries",
  description:
    "Digital transformation tailored to your sector — retail, healthcare, insurance, education, manufacturing, construction, hospitality, NGOs, and professional services.",
};

export default function IndustriesPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-forest-deep pb-20 pt-32 text-cream md:pb-28 md:pt-40">
        <div className="shell relative grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <Eyebrow dark>Industries</Eyebrow>
            <TextReveal
              as="h1"
              text="Every industry runs on *connected work*."
              className="mt-6 max-w-[16ch] text-[clamp(2.6rem,6vw,5rem)] leading-[1] text-cream"
            />
            <Reveal>
              <p className="mt-7 max-w-xl text-pretty text-lg leading-relaxed text-sage">
                The manual workflows differ by sector — but the opportunity is the same.
                We bring sector-specific understanding to every transformation we build.
              </p>
            </Reveal>
          </div>
          <div className="relative aspect-square w-full max-w-md justify-self-center lg:max-w-none">
            <GlobeScene />
          </div>
        </div>
      </section>

      <section className="section-y">
        <Reveal stagger={0.06} className="shell grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {INDUSTRIES.map((ind) => (
            <article
              key={ind.slug}
              className="group flex flex-col rounded-2xl border border-forest/10 bg-cream p-7 transition-all duration-300 hover:-translate-y-1 hover:border-forest/20 hover:shadow-[0_24px_60px_-34px_rgba(29,49,36,0.35)]"
            >
              <span className="grid size-12 place-items-center rounded-xl bg-forest-deep/[0.06] ring-1 ring-forest/10 transition-colors group-hover:bg-ember group-hover:ring-ember">
                <ind.icon
                  className="size-5 text-forest transition-colors group-hover:text-cream"
                  strokeWidth={1.5}
                />
              </span>
              <h2 className="mt-5 font-serif text-2xl text-forest-deep">{ind.name}</h2>

              <dl className="mt-5 flex flex-col gap-4 text-sm">
                <div>
                  <dt className="font-mono text-[0.65rem] uppercase tracking-wider text-muted">
                    Challenge
                  </dt>
                  <dd className="mt-1 leading-relaxed text-muted">{ind.challenge}</dd>
                </div>
                <div>
                  <dt className="font-mono text-[0.65rem] uppercase tracking-wider text-muted">
                    Opportunity
                  </dt>
                  <dd className="mt-1 leading-relaxed text-forest-deep">{ind.opportunity}</dd>
                </div>
              </dl>

              <p className="mt-auto flex items-start gap-2 pt-6 text-sm font-medium text-forest-deep">
                <ArrowRight className="mt-1 size-3.5 shrink-0 text-ember" />
                {ind.outcome}
              </p>
            </article>
          ))}
        </Reveal>
      </section>

      <CtaBanner
        title="Let's talk about your sector."
        sub="Tell us what your business does and how your team works today. We'll show you exactly where digital systems can move the needle."
        secondaryLabel="See our solutions"
        secondaryHref="/solutions"
      />
    </>
  );
}
