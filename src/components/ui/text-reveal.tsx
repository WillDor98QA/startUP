"use client";

import { createElement, useRef, type ElementType } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type Segment = { text: string; accent: boolean };

/** Parse `*word*` → accented (ember italic) segment. */
function parse(text: string): Segment[] {
  return text.split(/(\*[^*]+\*)/g).filter(Boolean).map((chunk) => {
    const accent = chunk.startsWith("*") && chunk.endsWith("*");
    return { text: accent ? chunk.slice(1, -1) : chunk, accent };
  });
}

type TextRevealProps = {
  text: string;
  as?: ElementType;
  className?: string;
  delay?: number;
  start?: string;
  stagger?: number;
};

/**
 * Word-by-word mask reveal. Robust across breakpoints (no line measurement),
 * fully accessible (the source string stays intact for screen readers via aria-label).
 */
export function TextReveal({
  text,
  as: Tag = "h2",
  className,
  delay = 0,
  start = "top 88%",
  stagger = 0.045,
}: TextRevealProps) {
  const ref = useRef<HTMLElement>(null);
  const segments = parse(text);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      const words = el.querySelectorAll<HTMLElement>("[data-word]");

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(words, {
          yPercent: 115,
          duration: 1,
          ease: "expo.out",
          stagger,
          delay,
          scrollTrigger: { trigger: el, start },
        });
      });
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(words, { yPercent: 0 });
      });
    },
    { scope: ref },
  );

  let key = 0;
  return createElement(
    Tag,
    { ref, className: cn(className), "aria-label": text.replace(/\*/g, "") },
    (
      <span aria-hidden="true">
        {segments.map((seg) =>
          seg.text.split(/(\s+)/).map((token) => {
            if (token.trim() === "") return <span key={key++}> </span>;
            return (
              <span
                key={key++}
                className="relative inline-flex overflow-hidden align-bottom"
                style={{ paddingBottom: "0.14em", marginBottom: "-0.14em" }}
              >
                <span
                  data-word
                  className={cn(
                    "inline-block will-change-transform",
                    seg.accent && "italic text-ember",
                  )}
                >
                  {token}
                </span>
              </span>
            );
          }),
        )}
      </span>
    ),
  );
}
