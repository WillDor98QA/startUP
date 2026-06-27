import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { TextReveal } from "@/components/ui/text-reveal";
import { CtaBanner } from "@/components/sections/cta-banner";
import { INSIGHTS } from "@/lib/content";

const BODIES: Record<string, string[]> = {
  "spreadsheets-to-systems": [
    "Spreadsheets are where almost every business starts — and for good reason. They're free, flexible, and everyone can use them. The trouble begins quietly: a second tab, a third version emailed around, a formula only one person understands.",
    "The clearest signal you've outgrown them isn't the file size — it's the human cost. When people spend more time reconciling spreadsheets than acting on what they say, when a single typo can cost a customer, or when no one can answer 'what's happening right now' without an hour of work, the spreadsheet has become the bottleneck.",
    "The fix isn't to abandon everything overnight. It's to move the one process that hurts most into a proper system, prove the time saved, and let that win fund the next. Start where the pain is sharpest, not where it's easiest.",
  ],
  "automation-roi": [
    "Not every manual task is worth automating. The ones that are share three traits: they happen often, they follow predictable rules, and they're currently done by a person who'd rather be doing something else.",
    "A simple way to find them: for one week, ask your team to note any task they repeat that feels mechanical. Multiply the minutes by how often it happens, then by your team's hourly cost. The tasks at the top of that list are your automation roadmap — in priority order.",
    "Resist the urge to automate the exciting thing. Automate the boring, frequent, rules-based thing first. That's where the payback is fastest and the risk is lowest.",
  ],
  "practical-ai-for-sme": [
    "Most AI coverage is written for companies with research budgets. For a growing business, the useful question is narrower: where can AI quietly remove friction without becoming a project in itself?",
    "The reliable wins today are unglamorous — drafting routine documents, answering common customer questions, sorting and tagging incoming information, and surfacing patterns in data you already have. Each saves time on work your team finds tedious, with a human still in the loop.",
    "Treat AI like any other tool: point it at a specific, repetitive problem, measure whether it actually helps, and keep what works. Skip anything that needs you to change your business to fit the technology.",
  ],
  "real-time-visibility": [
    "There's a meaningful difference between last month's report and knowing what's happening right now. One tells you where you've been; the other lets you act before a problem becomes expensive.",
    "Real-time visibility doesn't mean more dashboards. It means the few numbers that actually drive decisions, updated automatically, in a place your team already looks. Everything else is noise.",
    "When the people running the business can see reality as it unfolds, decisions get faster and calmer. You stop reacting to surprises and start steering.",
  ],
  "buy-vs-build": [
    "Off-the-shelf software is the right answer more often than vendors selling custom builds will admit — and the wrong answer more often than businesses drowning in workarounds realise. The skill is knowing which is which.",
    "Buy when the process is standard and a mature product fits it well. Build when the process is core to how you compete, or when the workarounds your team has invented are themselves a sign the market hasn't solved your problem.",
    "Most growing businesses end up with both: bought tools for the commodity work, and a custom layer that connects them and handles the parts that make the business yours.",
  ],
  "change-management": [
    "The hard part of new software is rarely the software. It's getting busy people to change habits they've relied on for years. Most rollouts fail here, not in the code.",
    "Adoption follows trust. Involve the people who'll use the system while it's being designed, make the first version genuinely easier than the old way, and never force a switch before the new path is clearly better.",
    "A system nobody uses is worse than no system at all. We design for adoption from day one — because the value only shows up when the team actually makes the switch.",
  ],
};

export function generateStaticParams() {
  return INSIGHTS.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const a = INSIGHTS.find((x) => x.slug === slug);
  if (!a) return { title: "Article not found" };
  return { title: a.title, description: a.excerpt };
}

export default async function InsightDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const a = INSIGHTS.find((x) => x.slug === slug);
  if (!a) notFound();
  const body = BODIES[a.slug] ?? [a.excerpt];
  const more = INSIGHTS.filter((x) => x.slug !== a.slug).slice(0, 3);

  return (
    <>
      <article className="relative overflow-hidden pb-12 pt-32 md:pt-40">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-24 right-0 size-[34rem] rounded-full bg-[radial-gradient(circle,rgba(211,97,53,0.08),transparent_70%)]"
        />
        <div className="shell relative max-w-3xl">
          <Link
            href="/insights"
            data-cursor-hover
            className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-forest-deep"
          >
            <ArrowLeft className="size-4" />
            All insights
          </Link>
          <p className="mt-8 font-mono text-xs uppercase tracking-wider text-ember">
            {a.category}
          </p>
          <TextReveal
            as="h1"
            text={a.title}
            className="mt-4 text-[clamp(2.2rem,4.6vw,3.6rem)] leading-[1.04] text-forest-deep"
          />
          <p className="mt-5 text-sm text-muted">
            {a.date} · {a.readingTime}
          </p>

          <Reveal className="mt-10 flex flex-col gap-6">
            <p className="text-pretty font-serif text-xl leading-relaxed text-forest-deep md:text-2xl">
              {a.excerpt}
            </p>
            {body.map((p, i) => (
              <p key={i} className="text-pretty text-lg leading-relaxed text-muted">
                {p}
              </p>
            ))}
          </Reveal>
        </div>
      </article>

      <section className="section-y">
        <div className="shell">
          <h2 className="mb-8 font-serif text-2xl text-forest-deep">More insights</h2>
          <div className="grid gap-6 sm:grid-cols-3">
            {more.map((m) => (
              <Link
                key={m.slug}
                href={`/insights/${m.slug}`}
                data-cursor-hover
                className="group flex flex-col rounded-2xl border border-forest/10 bg-cream p-6 transition-all duration-300 hover:-translate-y-1 hover:border-forest/20"
              >
                <span className="font-mono text-[0.7rem] uppercase tracking-wider text-ember">
                  {m.category}
                </span>
                <h3 className="mt-3 font-serif text-lg leading-snug text-forest-deep">
                  {m.title}
                </h3>
                <ArrowUpRight className="mt-4 size-4 text-ember transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner
        title="Put these ideas to work."
        sub="Book a discovery session and we'll help you apply them directly to your business."
        secondaryLabel="Read more insights"
        secondaryHref="/insights"
      />
    </>
  );
}
