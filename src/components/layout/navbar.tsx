"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { NAV_LINKS, CTA } from "@/lib/site";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/layout/logo";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // These routes open on a dark hero → use light nav until the user scrolls.
  const DARK_HERO_ROUTES = ["/", "/contact", "/industries"];
  const overDark = DARK_HERO_ROUTES.includes(pathname) && !scrolled;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className="fixed inset-x-0 top-0 z-[80]">
      <div
        className={cn(
          "transition-all duration-500",
          scrolled
            ? "border-b border-forest/10 bg-cream/80 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent",
        )}
      >
        <nav className="shell flex h-16 items-center justify-between md:h-20">
          <Link href="/" aria-label={`Home`} className="relative z-10" data-cursor-hover>
            <Logo dark={overDark} />
          </Link>

          <ul className="hidden items-center gap-7 lg:flex">
            {NAV_LINKS.map((l) => {
              const activeLink = pathname === l.href;
              return (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    data-cursor-hover
                    className={cn(
                      "group relative text-sm tracking-tight transition-colors",
                      overDark
                        ? "text-cream/80 hover:text-cream"
                        : "text-forest-deep/75 hover:text-forest-deep",
                    )}
                  >
                    {l.label}
                    <span
                      className={cn(
                        "absolute -bottom-1 left-0 h-px bg-ember transition-all duration-300",
                        activeLink ? "w-full" : "w-0 group-hover:w-full",
                      )}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="hidden lg:block">
            <Button
              href={CTA.href}
              variant={overDark ? "ghost-dark" : "primary"}
              className="px-6 py-2.5"
              icon={false}
            >
              {CTA.label}
            </Button>
          </div>

          <button
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className={cn(
              "relative z-10 grid size-10 place-items-center rounded-full lg:hidden",
              overDark && !open ? "text-cream" : "text-forest-deep",
            )}
          >
            {open ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </nav>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-0 flex flex-col bg-cream px-6 pb-10 pt-24 lg:hidden"
          >
            <ul className="flex flex-col">
              {NAV_LINKS.map((l, i) => (
                <motion.li
                  key={l.href}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.06 + i * 0.05 }}
                >
                  <Link
                    href={l.href}
                    className="block border-b border-forest/10 py-4 font-serif text-3xl text-forest-deep"
                  >
                    {l.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
            <div className="mt-8">
              <Button href={CTA.href} className="w-full">
                {CTA.label}
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
