import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { MANUAL_TOOLS, PAIN_POINTS } from "@/lib/content";

export function Problem() {
  return (
    <section className="section-y">
      <div className="shell">
        <SectionHeading
          eyebrow="Why it matters"
          title="The hidden cost of running on *manual work*."
          intro="None of these tools are bad on their own. The problem is what happens when your business runs across all of them at once — and no one can see the whole picture."
          className="mb-16 max-w-3xl"
        />

        <Reveal stagger={0.07} className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-forest/10 bg-forest/10 sm:grid-cols-2 lg:grid-cols-3">
          {MANUAL_TOOLS.map((t) => (
            <div key={t.label} className="group bg-cream p-7 transition-colors hover:bg-cream-soft">
              <t.icon className="size-6 text-forest/70 transition-colors group-hover:text-ember" strokeWidth={1.5} />
              <h3 className="mt-5 font-serif text-2xl text-forest-deep">{t.label}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">{t.note}</p>
            </div>
          ))}
        </Reveal>

        <Reveal className="mt-12 rounded-2xl bg-forest-deep p-8 text-cream sm:p-10">
          <p className="font-serif text-xl text-cream sm:text-2xl">The result is always the same:</p>
          <ul className="mt-6 grid gap-x-8 gap-y-4 sm:grid-cols-2">
            {PAIN_POINTS.map((p) => (
              <li key={p} className="flex items-start gap-3 text-sage">
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-ember" />
                <span className="leading-relaxed">{p}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
