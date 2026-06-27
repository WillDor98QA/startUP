import { Eyebrow } from "@/components/ui/eyebrow";
import { TextReveal } from "@/components/ui/text-reveal";
import { Reveal } from "@/components/ui/reveal";

export function PageHero({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden pb-16 pt-36 md:pb-24 md:pt-44">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 right-0 size-[36rem] rounded-full bg-[radial-gradient(circle,rgba(211,97,53,0.08),transparent_70%)]"
      />
      <div className="shell relative">
        <Reveal>
          <Eyebrow>{eyebrow}</Eyebrow>
        </Reveal>
        <TextReveal
          as="h1"
          text={title}
          className="mt-6 max-w-[20ch] text-[clamp(2.6rem,6vw,5rem)] leading-[1] text-forest-deep"
        />
        {intro && (
          <Reveal>
            <p className="mt-7 max-w-2xl text-pretty text-lg leading-relaxed text-muted md:text-xl">
              {intro}
            </p>
          </Reveal>
        )}
        {children && <Reveal className="mt-9">{children}</Reveal>}
      </div>
    </section>
  );
}
