import { useEffect, useRef } from "react";
import { useLocation } from "react-router";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const { pathname } = useLocation();

  // Reset scroll on route change (honouring #hash deep-links) and recalc triggers.
  useEffect(() => {
    const hash = window.location.hash;
    const scrollToTarget = () => {
      let el: Element | null = null;
      // querySelector throws on malformed selectors (e.g. "#"); never let that
      // bubble up and break the router.
      if (hash && hash.length > 1) {
        try {
          el = document.querySelector(hash);
        } catch {
          el = null;
        }
      }
      try {
        if (el && lenisRef.current) {
          lenisRef.current.scrollTo(el as HTMLElement, { offset: -90, immediate: true });
        } else if (el) {
          (el as HTMLElement).scrollIntoView();
        } else if (lenisRef.current) {
          lenisRef.current.scrollTo(0, { immediate: true });
        } else {
          window.scrollTo(0, 0);
        }
        ScrollTrigger.refresh();
      } catch {
        window.scrollTo(0, 0);
      }
    };
    // Defer so the new route has painted before measuring anchor offsets.
    const t = setTimeout(scrollToTarget, 80);
    return () => clearTimeout(t);
  }, [pathname]);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return; // native scroll for reduced-motion users

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.6,
    });
    lenisRef.current = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    const onRaf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(onRaf);
    gsap.ticker.lagSmoothing(0);

    // Anchor links route through Lenis for buttery in-page nav
    const onClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a[href^="#"]');
      if (!target) return;
      const id = target.getAttribute("href");
      if (!id || id.length < 2) return;
      let el: Element | null = null;
      try {
        el = document.querySelector(id);
      } catch {
        return;
      }
      if (!el) return;
      e.preventDefault();
      lenis.scrollTo(el as HTMLElement, { offset: -80 });
    };
    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
      gsap.ticker.remove(onRaf);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return <>{children}</>;
}
