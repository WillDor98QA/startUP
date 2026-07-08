"use client";

import { createElement, useRef, type ElementType, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type RevealProps = {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  id?: string;
  /** stagger children with this selector */
  stagger?: number;
  delay?: number;
  y?: number;
  once?: boolean;
};

/**
 * Generic scroll-triggered fade + rise. Respects reduced motion
 * (GSAP's matchMedia disables the transform branch).
 */
export function Reveal({
  children,
  className,
  as: Tag = "div",
  id,
  stagger,
  delay = 0,
  y = 24,
  once = true,
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const targets = stagger ? el.querySelectorAll<HTMLElement>(":scope > *") : [el];
        // fromTo, not from: with from(), GSAP records the element's current
        // computed style as the end state on first play — if a target carries a
        // CSS `transition-*` class, the computed values have already drifted to
        // the hidden from-state by then, and the reveal animates hidden→hidden.
        gsap.fromTo(
          targets,
          { y, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.9,
            delay,
            ease: "expo.out",
            stagger: stagger ?? 0,
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: once ? "play none none none" : "play none none reverse",
            },
          },
        );
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(stagger ? el.querySelectorAll<HTMLElement>(":scope > *") : [el], {
          autoAlpha: 1,
          y: 0,
        });
      });
    },
    { scope: ref },
  );

  return createElement(Tag, { ref, id, className: cn(className) }, children);
}
