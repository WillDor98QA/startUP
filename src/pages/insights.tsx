import { Seo } from "@/components/seo";
import { Link } from "react-router";
import { ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";
import { CtaBanner } from "@/components/sections/cta-banner";
import { Reveal } from "@/components/ui/reveal";
import { INSIGHTS } from "@/lib/content";

export default function InsightsPage() {
  const [featured, ...rest] = INSIGHTS;
  return (
    <>
      <Seo title="Insights" description="Practical, jargon-free writing on digital transformation, automation, AI, and business efficiency for growing companies." />
      <PageHero
        eyebrow="Insights"
        title="Practical ideas for *growing businesses*."
        intro="No hype, no jargon. Just clear thinking on how to modernise your business — written by the people who do it every day."
      />

      <section className="pb-8">
        <Reveal className="shell">
          <Link
            to={`/insights/${featured.slug}`}
            data-cursor-hover
            className="group grid overflow-hidden rounded-3xl bg-forest-deep text-cream md:grid-cols-2"
          >
            <div className="relative min-h-[16rem] overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(43,61,46,1),rgba(20,33,25,1))]" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(211,97,53,0.28),transparent_60%)] transition-transform duration-700 group-hover:scale-110" />
              <span className="absolute left-7 top-7 rounded-full border border-cream/20 px-3 py-1 text-xs text-cream/80">
                Featured
              </span>
            </div>
            <div className="flex flex-col justify-center p-8 md:p-12">
              <span className="font-mono text-xs uppercase tracking-wider text-ember">
                {featured.category}
              </span>
              <h2 className="mt-4 font-serif text-[clamp(1.8rem,3vw,2.6rem)] leading-[1.08] text-cream">
                {featured.title}
              </h2>
              <p className="mt-4 max-w-[48ch] text-pretty leading-relaxed text-sage">
                {featured.excerpt}
              </p>
              <span className="mt-7 inline-flex items-center gap-2 text-sm text-cream">
                Read article
                <ArrowUpRight className="size-4 text-ember transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </span>
              <span className="mt-3 text-xs text-sage">
                {featured.date} · {featured.readingTime}
              </span>
            </div>
          </Link>
        </Reveal>
      </section>

      <section className="section-y pt-8">
        <Reveal stagger={0.08} className="shell grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((a) => (
            <Link
              key={a.slug}
              to={`/insights/${a.slug}`}
              data-cursor-hover
              className="group flex flex-col rounded-2xl border border-forest/10 bg-cream p-7 transition-all duration-300 hover:-translate-y-1 hover:border-forest/20 hover:shadow-[0_24px_60px_-34px_rgba(29,49,36,0.35)]"
            >
              <span className="font-mono text-xs uppercase tracking-wider text-ember">
                {a.category}
              </span>
              <h2 className="mt-4 font-serif text-2xl leading-snug text-forest-deep">
                {a.title}
              </h2>
              <p className="mt-3 text-pretty text-sm leading-relaxed text-muted">{a.excerpt}</p>
              <span className="mt-auto flex items-center justify-between pt-6 text-xs text-muted">
                {a.date} · {a.readingTime}
                <ArrowUpRight className="size-4 text-ember transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </span>
            </Link>
          ))}
        </Reveal>
      </section>

      <CtaBanner
        title="Prefer to talk it through?"
        sub="Reading only gets you so far. Book a discovery session and we'll apply these ideas directly to your business."
        secondaryLabel="See our solutions"
        secondaryHref="/solutions"
      />
    </>
  );
}
