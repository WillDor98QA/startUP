"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { STORY_BEATS } from "@/lib/content";
import { useReducedMotion } from "@/lib/hooks";
import { InView } from "@/components/three/in-view";

const StoryField = dynamic(() => import("@/components/three/story-field"), { ssr: false });

const HERO_END = 0.13;

export function Story() {
  const wrap = useRef<HTMLDivElement>(null);
  const progress = useRef(0);
  const [active, setActive] = useState(0);
  const [heroVisible, setHeroVisible] = useState(true);
  const [mounted, setMounted] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (reduced) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const el = wrap.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const total = rect.height - window.innerHeight;
        const p = Math.min(1, Math.max(0, -rect.top / total));
        progress.current = p;
        setHeroVisible(p < HERO_END);
        const beatP = Math.max(0, (p - HERO_END) / (1 - HERO_END));
        const idx = Math.min(STORY_BEATS.length - 1, Math.floor(beatP * STORY_BEATS.length));
        setActive(idx);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [reduced]);

  // Reduced-motion: a calm, fully static narrative.
  if (reduced) {
    return (
      <section className="relative overflow-hidden bg-forest-deep py-28 text-cream">
        <div className="shell">
          <p className="eyebrow mb-6 text-ember">The transformation</p>
          <h1 className="max-w-[16ch] font-serif text-[clamp(2.6rem,6vw,5rem)] leading-[1] text-cream">
            Your business has outgrown <span className="italic text-ember">manual work</span>.
          </h1>
          <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-cream/10 sm:grid-cols-5">
            {STORY_BEATS.map((b) => (
              <div key={b.title} className="bg-cream/[0.04] p-6">
                <span className="font-mono text-xs uppercase tracking-wider text-ember">{b.phase}</span>
                <h3 className="mt-3 font-serif text-2xl text-cream">{b.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-sage">{b.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section ref={wrap} className="relative bg-forest-deep" style={{ height: "460vh" }}>
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        {/* WebGL layer */}
        <div className="pointer-events-none absolute inset-0">
          <div
            aria-hidden
            className="absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(43,61,46,0.35),rgba(20,33,25,0.96))]"
          />
          {mounted && (
            <InView className="absolute inset-0" rootMargin="300px">
              <StoryField progress={progress} />
            </InView>
          )}
          <div
            aria-hidden
            className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-forest-deep to-transparent"
          />
        </div>

        {/* Hero overlay */}
        <AnimatePresence>
          {heroVisible && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="shell relative z-10"
            >
              <p className="eyebrow mb-7 flex items-center gap-3 text-ember">
                <span className="h-px w-8 bg-ember/50" />
                Digital transformation, made accessible
              </p>
              <h1 className="max-w-[18ch] font-serif text-[clamp(2.6rem,6.6vw,5.6rem)] leading-[0.98] text-cream">
                Your business has outgrown{" "}
                <span className="italic text-ember">manual work</span>.
              </h1>
              <p className="mt-7 max-w-xl text-pretty text-lg leading-relaxed text-sage">
                Kova helps growing businesses replace spreadsheets, paper, and busywork
                with intelligent digital systems — for less than you think.
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-4">
                <Button href="/contact">Book a discovery session</Button>
                <Button href="/solutions" variant="ghost-dark" icon={false}>
                  Explore solutions
                </Button>
              </div>
              <div className="mt-16 flex items-center gap-2 text-sm text-sage">
                <ChevronDown className="size-4 animate-bounce" />
                Scroll to see the shift
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Beat overlay */}
        {!heroVisible && (
          <div className="shell relative z-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -24 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="max-w-2xl"
              >
                <span className="font-mono text-xs uppercase tracking-[0.28em] text-ember">
                  {STORY_BEATS[active].phase}
                </span>
                <h2 className="mt-5 font-serif text-[clamp(2.6rem,6vw,5rem)] leading-[0.98] text-cream">
                  {STORY_BEATS[active].title}
                </h2>
                <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-sage">
                  {STORY_BEATS[active].body}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        )}

        {/* Progress rail */}
        <div className="absolute bottom-10 left-1/2 z-10 flex -translate-x-1/2 gap-2.5">
          {STORY_BEATS.map((b, i) => (
            <span
              key={b.title}
              className={`h-1 rounded-full transition-all duration-500 ${
                !heroVisible && i === active ? "w-9 bg-ember" : "w-4 bg-cream/25"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
