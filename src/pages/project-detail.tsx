import { Link, useParams } from "react-router";
import { ArrowLeft, Check } from "lucide-react";
import { Seo } from "@/components/seo";
import { Reveal } from "@/components/ui/reveal";
import { TextReveal } from "@/components/ui/text-reveal";
import { CtaBanner } from "@/components/sections/cta-banner";
import { CASE_STUDIES, TESTIMONIALS } from "@/lib/content";
import NotFound from "@/pages/not-found";

function Block({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <Reveal className="grid gap-3 border-t border-forest/10 py-10 md:grid-cols-[0.5fr_1.5fr] md:gap-10">
      <h2 className="font-mono text-xs uppercase tracking-wider text-ember md:pt-1">{label}</h2>
      <div className="max-w-[60ch]">{children}</div>
    </Reveal>
  );
}

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const c = CASE_STUDIES.find((x) => x.slug === slug);
  if (!c) return <NotFound />;

  const quote = TESTIMONIALS.find((t) => t.role.includes(c.client.split(" ")[0]));

  return (
    <>
      <Seo title={`${c.client} — Case Study`} description={c.summary} />
      <section className="relative overflow-hidden pb-12 pt-32 md:pt-40">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-24 right-0 size-[34rem] rounded-full bg-[radial-gradient(circle,rgba(211,97,53,0.09),transparent_70%)]"
        />
        <div className="shell relative">
          <Link
            to="/projects"
            data-cursor-hover
            className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-forest-deep"
          >
            <ArrowLeft className="size-4" />
            All projects
          </Link>
          <p className="mt-8 text-xs uppercase tracking-wider text-muted">
            {c.client} · {c.industry}
          </p>
          <TextReveal
            as="h1"
            text={c.title}
            className="mt-4 max-w-[20ch] text-[clamp(2.2rem,5vw,4rem)] leading-[1.02] text-forest-deep"
          />
          <Reveal>
            <p className="mt-7 max-w-2xl text-pretty text-lg leading-relaxed text-muted md:text-xl">
              {c.summary}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Headline results */}
      <section className="shell">
        <Reveal
          stagger={0.1}
          className="grid grid-cols-1 gap-px overflow-hidden rounded-3xl border border-forest/10 bg-forest/10 sm:grid-cols-3"
        >
          {c.results.map((r) => (
            <div key={r.label} className="bg-forest-deep p-8 text-center">
              <div className="font-serif text-5xl text-ember">{r.value}</div>
              <div className="mt-2 text-xs uppercase tracking-wider text-sage">{r.label}</div>
            </div>
          ))}
        </Reveal>
      </section>

      {/* Story */}
      <section className="section-y">
        <div className="shell">
          <Block label="The challenge">
            <p className="text-pretty text-lg leading-relaxed text-forest-deep">{c.summary}</p>
          </Block>

          <Block label="The manual reality">
            <p className="text-pretty leading-relaxed text-muted">{c.before}</p>
          </Block>

          <Block label="Pain points">
            <ul className="grid gap-3">
              {c.pains.map((p) => (
                <li key={p} className="flex items-start gap-3 text-muted">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-ember" />
                  {p}
                </li>
              ))}
            </ul>
          </Block>

          <Block label="The digital solution">
            <p className="text-pretty text-lg leading-relaxed text-forest-deep">{c.solution}</p>
          </Block>

          <Block label="How it connects">
            <div className="grid items-stretch gap-3 sm:grid-cols-[1fr_auto_1fr_auto_1fr]">
              {[
                { t: "Data sources", s: "Stores, field teams, customers" },
                { t: `${c.client} platform`, s: "One connected system", accent: true },
                { t: "Live outcomes", s: "Dashboards, alerts, reports" },
              ].map((node, i) => (
                <div key={node.t} className="contents">
                  <div
                    className={`rounded-2xl border p-5 ${
                      node.accent
                        ? "border-ember/40 bg-forest-deep text-cream"
                        : "border-forest/15 bg-cream-soft"
                    }`}
                  >
                    <p className={`font-serif text-lg ${node.accent ? "text-cream" : "text-forest-deep"}`}>
                      {node.t}
                    </p>
                    <p className={`mt-1 text-sm ${node.accent ? "text-sage" : "text-muted"}`}>
                      {node.s}
                    </p>
                  </div>
                  {i < 2 && (
                    <div className="grid place-items-center text-ember" aria-hidden>
                      <span className="hidden sm:block">→</span>
                      <span className="sm:hidden">↓</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Block>

          <Block label="Technology used">
            <ul className="flex flex-wrap gap-2">
              {c.tech.map((t) => (
                <li
                  key={t}
                  className="flex items-center gap-2 rounded-full border border-forest/15 bg-cream-soft px-4 py-2 text-sm text-forest-deep"
                >
                  <Check className="size-3.5 text-ember" strokeWidth={2.5} />
                  {t}
                </li>
              ))}
            </ul>
          </Block>

          <Block label="The outcome">
            <p className="text-pretty text-lg leading-relaxed text-forest-deep">{c.outcome}</p>
          </Block>

          {quote && (
            <Reveal className="mt-6 rounded-3xl bg-forest-deep p-10 text-cream md:p-14">
              <p className="font-serif text-2xl leading-snug text-cream md:text-3xl">
                &ldquo;{quote.quote}&rdquo;
              </p>
              <p className="mt-6 text-sm text-sage">
                {quote.name} — {quote.role}
              </p>
            </Reveal>
          )}
        </div>
      </section>

      <CtaBanner
        title="Want results like these?"
        sub="Book a discovery session and we'll map the fastest path from your manual reality to measurable results."
        secondaryLabel="See more projects"
        secondaryHref="/projects"
      />
    </>
  );
}
