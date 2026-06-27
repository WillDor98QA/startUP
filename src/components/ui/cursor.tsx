"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useIsTouch, useReducedMotion } from "@/lib/hooks";

export function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const touch = useIsTouch();
  const reduced = useReducedMotion();

  useEffect(() => {
    if (touch || reduced) return;
    document.body.dataset.cursor = "on";

    const xToDot = gsap.quickTo(dot.current, "x", { duration: 0.15, ease: "power3" });
    const yToDot = gsap.quickTo(dot.current, "y", { duration: 0.15, ease: "power3" });
    const xToRing = gsap.quickTo(ring.current, "x", { duration: 0.45, ease: "power3" });
    const yToRing = gsap.quickTo(ring.current, "y", { duration: 0.45, ease: "power3" });

    const move = (e: MouseEvent) => {
      xToDot(e.clientX);
      yToDot(e.clientY);
      xToRing(e.clientX);
      yToRing(e.clientY);
    };

    const over = (e: MouseEvent) => {
      const hov = (e.target as HTMLElement).closest("[data-cursor-hover], a, button");
      gsap.to(ring.current, {
        scale: hov ? 1.8 : 1,
        opacity: hov ? 0.9 : 0.4,
        duration: 0.3,
        ease: "power3.out",
      });
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      delete document.body.dataset.cursor;
    };
  }, [touch, reduced]);

  if (touch || reduced) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[90] hidden md:block">
      <div
        ref={ring}
        className="absolute -left-4 -top-4 size-8 rounded-full border border-forest/40 opacity-40 mix-blend-multiply"
      />
      <div
        ref={dot}
        className="absolute -left-[3px] -top-[3px] size-1.5 rounded-full bg-ember"
      />
    </div>
  );
}
