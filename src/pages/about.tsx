import { Seo } from "@/components/seo";
import { PageHero } from "@/components/sections/page-hero";
import { Team } from "@/components/sections/team";
import { Stats } from "@/components/sections/stats";
import { CtaBanner } from "@/components/sections/cta-banner";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { VALUES } from "@/lib/content";

const STORY = [
  {
    year: "The gap",
    body: "We kept meeting brilliant businesses held back by the same thing: the tools that got them started couldn't carry them forward. Enterprise software could fix it — but it was built for budgets they didn't have.",
  },
  {
    year: "The idea",
    body: "So we set out to close that gap. To bring the kind of custom systems big companies rely on within reach of the businesses that drive the economy.",
  },
  {
    year: "Today",
    body: "We're a small, senior team that has modernised over a hundred growing businesses — replacing busywork with systems their teams actually love to use.",
  },
];

export default function AboutPage() {
  return (
    <>
      <Seo title="About" description="Kova exists to make digital transformation accessible to every growing business. Meet the team closing the gap between SMEs and enterprise-grade software." />
      <PageHero
        eyebrow="About"
        title="We make transformation *accessible*."
        intro="Big companies have always had the software advantage. We exist to put that same advantage within reach of every growing business."
      />

      {/* Mission & Vision */}
      <section className="section-y pt-4">
        <div className="shell grid gap-px overflow-hidden rounded-3xl border border-forest/10 bg-forest/10 md:grid-cols-2">
          {[
            {
              k: "Our mission",
              v: "To make digital transformation accessible to every growing business — replacing manual work with intelligent systems that unlock efficiency, visibility, and growth.",
            },
            {
              k: "Our vision",
              v: "A world where the size of your business never limits the quality of your tools — where any company can run on software as capable as the giants'.",
            },
          ].map((b) => (
            <Reveal key={b.k} className="bg-cream p-8 md:p-12">
              <h2 className="font-mono text-xs uppercase tracking-wider text-ember">{b.k}</h2>
              <p className="mt-5 text-pretty font-serif text-[clamp(1.4rem,2.4vw,2rem)] leading-snug text-forest-deep">
                {b.v}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Philosophy */}
      <section className="bg-cream-soft py-24 md:py-28">
        <div className="shell">
          <SectionHeading
            eyebrow="Our philosophy"
            title="Technology should *serve* the business — never the other way around."
            intro="We're not here to sell you the most software. We're here to find the smallest change that makes the biggest difference, prove it works, then build from there. That discipline is why our systems get adopted — and why our clients stay."
            className="max-w-3xl"
          />
        </div>
      </section>

      {/* Story */}
      <section className="section-y">
        <div className="shell">
          <SectionHeading eyebrow="Our story" title="Why we exist." className="mb-14 max-w-2xl" />
          <Reveal stagger={0.12} className="grid gap-px overflow-hidden rounded-3xl border border-forest/10 bg-forest/10 md:grid-cols-3">
            {STORY.map((s) => (
              <div key={s.year} className="bg-cream p-8">
                <span className="font-mono text-xs uppercase tracking-wider text-ember">
                  {s.year}
                </span>
                <p className="mt-4 text-pretty leading-relaxed text-muted">{s.body}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Values */}
      <section className="bg-cream-soft py-24 md:py-28">
        <div className="shell">
          <SectionHeading
            eyebrow="Our values"
            title="What we stand for."
            className="mb-14 max-w-2xl"
          />
          <Reveal stagger={0.08} className="grid gap-5 sm:grid-cols-2">
            {VALUES.map((v) => (
              <div
                key={v.title}
                className="rounded-2xl border border-forest/10 bg-cream p-7"
              >
                <h3 className="font-serif text-2xl text-forest-deep">{v.title}</h3>
                <p className="mt-3 leading-relaxed text-muted">{v.body}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <Stats />
      <Team />

      <CtaBanner
        title="Let's build something worth owning."
        sub="If that sounds like the kind of partner you want, we'd love to hear what you're working on."
        secondaryLabel="See our work"
        secondaryHref="/projects"
      />
    </>
  );
}
