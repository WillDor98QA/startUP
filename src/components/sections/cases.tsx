"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Eyebrow } from "@/components/ui/eyebrow";
import { TextReveal } from "@/components/ui/text-reveal";
import { CASE_STUDIES } from "@/lib/content";

export function Cases() {
  const root = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        const el = track.current!;
        const distance = el.scrollWidth - window.innerWidth + 96;
        gsap.to(el, {
          x: -distance,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: () => `+=${distance}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });
      });
    },
    { scope: root },
  );

  return (
    <section id="cases" ref={root} className="overflow-hidden bg-cream-soft py-24 md:py-28">
      <div className="shell mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <Eyebrow className="mb-6">Selected work</Eyebrow>
          <TextReveal
            as="h2"
            text="Outcomes, not *deliverables*."
            className="text-[clamp(2rem,4.4vw,3.6rem)] leading-[1.02] text-forest-deep"
          />
        </div>
        <p className="max-w-sm text-pretty leading-relaxed text-muted">
          A selection of systems we&rsquo;ve shipped for organizations where failure
          wasn&rsquo;t an option.
        </p>
      </div>

      <div className="shell lg:px-0">
        <div
          ref={track}
          className="flex gap-6 overflow-x-auto pb-4 lg:overflow-visible lg:pb-0 lg:pl-[max(1.25rem,calc((100vw-1320px)/2+1.25rem))] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {CASE_STUDIES.map((c) => (
            <Link
              href={`/projects/${c.slug}`}
              key={c.client}
              data-cursor-hover
              className="group relative flex w-[85vw] shrink-0 flex-col justify-between overflow-hidden rounded-3xl bg-forest-deep p-8 text-cream sm:w-[26rem] sm:p-10"
            >
              <div
                aria-hidden
                className="pointer-events-none absolute -right-10 -top-10 size-48 rounded-full bg-[radial-gradient(circle,rgba(211,97,53,0.22),transparent_70%)] transition-transform duration-700 group-hover:scale-125"
              />
              <div className="relative">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-wider text-sage">{c.industry}</span>
                  <ArrowUpRight className="size-5 text-sage transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ember" />
                </div>
                <div className="mt-10 flex items-baseline gap-3">
                  <span className="font-serif text-6xl text-ember sm:text-7xl">{c.metric}</span>
                  <span className="text-sm text-sage">{c.metricLabel}</span>
                </div>
                <h3 className="mt-6 font-serif text-2xl leading-snug text-cream sm:text-3xl">
                  {c.title}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-sage">{c.summary}</p>
              </div>
              <div className="relative mt-8 flex flex-wrap gap-2">
                {c.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-cream/15 px-3 py-1 text-xs text-cream/80"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </Link>
          ))}
          <div className="hidden w-[20vw] shrink-0 lg:block" aria-hidden />
        </div>
      </div>
    </section>
  );
}
