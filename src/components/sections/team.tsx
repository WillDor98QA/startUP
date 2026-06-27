import { LinkedInIcon } from "@/components/ui/brand-icons";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { TEAM } from "@/lib/content";

export function Team() {
  return (
    <section id="team" className="section-y">
      <div className="shell">
        <SectionHeading
          eyebrow="The people"
          title="Senior people who *care* about your business."
          intro="No layers, no handoffs to junior teams. You work directly with the people designing and building your system — who take the time to understand how you actually work."
          className="mb-16 max-w-3xl"
        />

        <Reveal stagger={0.1} className="grid grid-cols-2 gap-5 lg:grid-cols-4">
          {TEAM.map((m) => (
            <figure key={m.name} className="group">
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-forest-deep">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(43,61,46,1),rgba(20,33,25,1))]" />
                <div className="absolute inset-0 grid place-items-center">
                  <span className="font-serif text-5xl text-cream/25 transition-all duration-500 group-hover:scale-110 group-hover:text-ember/60">
                    {m.initials}
                  </span>
                </div>
                <div className="absolute inset-x-0 bottom-0 flex translate-y-2 items-center justify-between p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  <span className="text-xs text-sage">Connect</span>
                  <LinkedInIcon className="size-4 text-cream" />
                </div>
              </div>
              <figcaption className="mt-4">
                <div className="font-serif text-xl text-forest-deep">{m.name}</div>
                <div className="mt-0.5 text-sm text-muted">{m.role}</div>
              </figcaption>
            </figure>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
