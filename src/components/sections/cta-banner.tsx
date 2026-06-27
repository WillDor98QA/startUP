import { TextReveal } from "@/components/ui/text-reveal";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";

export function CtaBanner({
  title = "Ready to leave the busywork behind?",
  sub = "Book a free 30-minute discovery session. We'll map where your business is losing time — and show you what's worth fixing first. No pitch, no obligation.",
  primaryLabel = "Book a discovery session",
  primaryHref = "/contact",
  secondaryLabel = "See our work",
  secondaryHref = "/projects",
}: {
  title?: string;
  sub?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-forest-deep py-24 text-cream md:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 size-[44rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(211,97,53,0.14),transparent_70%)]"
      />
      <div className="shell relative flex flex-col items-center text-center">
        <TextReveal
          as="h2"
          text={title}
          className="mx-auto max-w-[20ch] text-[clamp(2.2rem,5vw,4rem)] leading-[1.02] text-cream"
        />
        <Reveal>
          <p className="mx-auto mt-7 max-w-xl text-pretty text-lg leading-relaxed text-sage">
            {sub}
          </p>
        </Reveal>
        <Reveal className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Button href={primaryHref}>{primaryLabel}</Button>
          <Button href={secondaryHref} variant="ghost-dark" icon={false}>
            {secondaryLabel}
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
