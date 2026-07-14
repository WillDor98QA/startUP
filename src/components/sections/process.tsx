import { useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Check } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { PROCESS } from "@/lib/content";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

export function Process() {
  const root = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useGSAP(
    () => {
      const steps = gsap.utils.toArray<HTMLElement>("[data-step]");
      steps.forEach((step, i) => {
        ScrollTrigger.create({
          trigger: step,
          start: "top center",
          end: "bottom center",
          onToggle: (self) => self.isActive && setActive(i),
        });
      });
    },
    { scope: root },
  );

  return (
    <section id="process" className="pb-20 pt-36 md:pt-44" ref={root}>
      <div className="shell">
        <SectionHeading
          eyebrow="Our process"
          title="A method built to *remove risk*."
          intro="Great software isn't luck. It's the product of a process that surfaces every assumption — and proves value early — before it becomes a costly problem."
          className="mb-16 max-w-3xl"
        />

        <div className="grid gap-y-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-x-20">
          {/* Sticky progress */}
          <div className="lg:sticky lg:top-32 lg:h-fit lg:self-start">
            <div className="flex items-baseline gap-4">
              <span className="font-serif text-[6rem] leading-none text-forest-deep tabular-nums sm:text-[8rem]">
                {PROCESS[active].no}
              </span>
              <span className="font-mono text-sm text-muted">
                / {String(PROCESS.length).padStart(2, "0")}
              </span>
            </div>
            <h3 className="mt-2 font-serif text-3xl text-ember sm:text-4xl">
              {PROCESS[active].title}
            </h3>
            <div className="mt-10 hidden flex-col gap-3 lg:flex">
              {PROCESS.map((p, i) => (
                <div key={p.no} className="flex items-center gap-4">
                  <div className="relative h-px w-12 bg-forest/15">
                    <div
                      className={cn(
                        "absolute inset-y-0 left-0 bg-ember transition-all duration-500",
                        i === active ? "w-full" : "w-0",
                      )}
                    />
                  </div>
                  <span
                    className={cn(
                      "text-sm transition-colors",
                      i === active ? "text-forest-deep" : "text-muted/60",
                    )}
                  >
                    {p.title}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Steps */}
          <div>
            {PROCESS.map((p) => (
              <div
                key={p.no}
                data-step
                className="flex min-h-[60vh] flex-col justify-center border-t border-forest/10 py-12 first:border-t-0 lg:min-h-[68vh]"
              >
                <span className="font-mono text-xs text-ember">{p.no}</span>
                <h4 className="mt-4 font-serif text-4xl text-forest-deep sm:text-5xl">
                  {p.title}
                </h4>
                <p className="mt-6 max-w-[46ch] text-pretty text-lg leading-relaxed text-muted">
                  {p.body}
                </p>
                <ul className="mt-8 flex flex-wrap gap-3">
                  {p.deliverables.map((d) => (
                    <li
                      key={d}
                      className="flex items-center gap-2 rounded-full border border-forest/15 bg-cream-soft px-4 py-2 text-sm text-forest-deep"
                    >
                      <Check className="size-3.5 text-ember" strokeWidth={2.5} />
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
