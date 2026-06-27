"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Eyebrow } from "@/components/ui/eyebrow";
import { TESTIMONIALS } from "@/lib/content";

export function Testimonials() {
  const [i, setI] = useState(0);
  const [dir, setDir] = useState(1);
  const t = TESTIMONIALS[i];

  const go = (d: number) => {
    setDir(d);
    setI((prev) => (prev + d + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  return (
    <section className="bg-cream-soft section-y">
      <div className="shell max-w-4xl">
        <div className="flex items-center justify-between">
          <Eyebrow>What clients say</Eyebrow>
          <span className="font-mono text-sm text-muted">
            {String(i + 1).padStart(2, "0")} / {String(TESTIMONIALS.length).padStart(2, "0")}
          </span>
        </div>

        <div className="relative mt-10 min-h-[14rem]">
          <span
            aria-hidden
            className="pointer-events-none absolute -left-2 -top-12 font-serif text-[9rem] leading-none text-ember/20"
          >
            &ldquo;
          </span>
          <AnimatePresence mode="wait" custom={dir}>
            <motion.blockquote
              key={i}
              custom={dir}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              <p className="font-serif text-[clamp(1.6rem,3.2vw,2.6rem)] leading-[1.18] text-forest-deep">
                {t.quote}
              </p>
              <footer className="mt-8 flex items-center gap-4">
                <span className="grid size-12 place-items-center rounded-full bg-forest-deep font-serif text-cream">
                  {t.name.split(" ").map((n) => n[0]).join("")}
                </span>
                <div>
                  <div className="font-medium text-forest-deep">{t.name}</div>
                  <div className="text-sm text-muted">{t.role}</div>
                </div>
              </footer>
            </motion.blockquote>
          </AnimatePresence>
        </div>

        <div className="mt-12 flex gap-3">
          <button
            onClick={() => go(-1)}
            aria-label="Previous testimonial"
            data-cursor-hover
            className="grid size-12 place-items-center rounded-full border border-forest/20 text-forest-deep transition-colors hover:border-ember hover:text-ember"
          >
            <ArrowLeft className="size-5" />
          </button>
          <button
            onClick={() => go(1)}
            aria-label="Next testimonial"
            data-cursor-hover
            className="grid size-12 place-items-center rounded-full border border-forest/20 text-forest-deep transition-colors hover:border-ember hover:text-ember"
          >
            <ArrowRight className="size-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
