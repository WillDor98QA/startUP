import { SectionHeading } from "@/components/ui/section-heading";
import { Accordion } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { FAQS } from "@/lib/content";

export function Faq() {
  return (
    <section className="section-y">
      <div className="shell grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        <div className="lg:sticky lg:top-32 lg:h-fit">
          <SectionHeading
            eyebrow="Questions"
            title="The things businesses *ask us first*."
          />
          <div className="mt-8 rounded-2xl border border-forest/10 bg-cream-soft p-6">
            <p className="text-sm leading-relaxed text-muted">
              Still have a question? Talk to a real person — no sales script.
            </p>
            <Button href="/contact" variant="ghost" className="mt-4 px-5 py-2.5">
              Get in touch
            </Button>
          </div>
        </div>
        <Accordion items={FAQS} />
      </div>
    </section>
  );
}
