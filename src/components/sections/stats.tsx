import { Check } from "lucide-react";
import { Counter } from "@/components/ui/counter";
import { Eyebrow } from "@/components/ui/eyebrow";
import { TextReveal } from "@/components/ui/text-reveal";
import { Reveal } from "@/components/ui/reveal";
import { STATS } from "@/lib/content";

const PROMISES = [
  "A senior team, not juniors",
  "Working software every week",
  "Systems you fully own",
  "Support that answers the phone",
];

export function Stats() {
  return (
    <section className="bg-forest-deep py-24 text-cream md:py-28">
      <div className="shell">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <div>
            <Eyebrow dark className="mb-6">
              By the numbers
            </Eyebrow>
            <TextReveal
              as="h2"
              text="A technology partner for the *long term*."
              className="text-[clamp(2rem,4.2vw,3.4rem)] leading-[1.04] text-cream"
            />
            <Reveal className="mt-8">
              <ul className="grid grid-cols-2 gap-x-6 gap-y-3">
                {PROMISES.map((p) => (
                  <li key={p} className="flex items-center gap-3 text-sm text-sage">
                    <span className="grid size-5 shrink-0 place-items-center rounded-full bg-ember/20">
                      <Check className="size-3 text-ember" strokeWidth={3} />
                    </span>
                    {p}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <dl className="grid grid-cols-2 gap-x-8 gap-y-10">
            {STATS.map((s) => (
              <div key={s.label} className="border-t border-cream/15 pt-5">
                <dt className="font-serif text-[clamp(2.8rem,5vw,4.2rem)] leading-none text-cream">
                  <Counter
                    value={s.value}
                    suffix={s.suffix}
                    decimals={s.decimals ?? 0}
                  />
                </dt>
                <dd className="mt-3 text-sm leading-snug text-sage">{s.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
