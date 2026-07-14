import { lazy, Suspense, useEffect, useState } from "react";
import { Link } from "react-router";
import { ArrowUpRight } from "lucide-react";
import { BRAND } from "@/lib/site";
import { LinkedInIcon, XIcon, GitHubIcon } from "@/components/ui/brand-icons";
import { Logo } from "@/components/layout/logo";
import { InView } from "@/components/three/in-view";
import { useReducedMotion } from "@/lib/hooks";

const ConstellationField = lazy(() => import("@/components/three/constellation-field"));

const COLUMNS = [
  {
    title: "Solutions",
    links: [
      { label: "Custom Software", href: "/solutions#custom-saas" },
      { label: "Process Automation", href: "/solutions#process-automation" },
      { label: "AI Solutions", href: "/solutions#ai-solutions" },
      { label: "Business Dashboards", href: "/solutions#business-dashboards" },
      { label: "Mobile Applications", href: "/solutions#mobile-applications" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Projects", href: "/projects" },
      { label: "Process", href: "/process" },
      { label: "Industries", href: "/industries" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Insights", href: "/insights" },
      { label: "Discovery session", href: "/contact" },
      { label: "Privacy", href: "/insights" },
      { label: "Terms", href: "/insights" },
    ],
  },
];

export function Footer() {
  const reduced = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <footer className="relative overflow-hidden bg-forest-deep text-cream">
      {mounted && !reduced && (
        <InView className="pointer-events-none absolute inset-0 opacity-70">
          <Suspense fallback={null}>
            <ConstellationField />
          </Suspense>
        </InView>
      )}

      <div className="relative">
        {/* Newsletter band */}
        <div className="shell flex flex-col gap-8 border-b border-cream/10 py-16 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="max-w-[16ch] font-serif text-[clamp(2rem,4vw,3rem)] leading-[1.05] text-cream">
              From manual work to momentum.
            </h2>
          </div>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex w-full max-w-sm items-center gap-2 border-b border-cream/25 pb-2"
          >
            <input
              type="email"
              required
              aria-label="Email address"
              placeholder="Get practical transformation notes"
              className="w-full bg-transparent text-cream placeholder:text-sage/60 focus:outline-none"
            />
            <button
              type="submit"
              aria-label="Subscribe"
              data-cursor-hover
              className="grid size-9 shrink-0 place-items-center rounded-full bg-ember text-cream transition-colors hover:bg-ember-bright"
            >
              <ArrowUpRight className="size-4" />
            </button>
          </form>
        </div>

        {/* Links */}
        <div className="shell grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Logo dark />
            <p className="mt-5 max-w-xs text-pretty text-sm leading-relaxed text-sage">
              {BRAND.positioning}
            </p>
            <div className="mt-6 flex gap-3">
              {[
                { Icon: LinkedInIcon, href: BRAND.social.linkedin, label: "LinkedIn" },
                { Icon: XIcon, href: BRAND.social.x, label: "X" },
                { Icon: GitHubIcon, href: BRAND.social.github, label: "GitHub" },
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  data-cursor-hover
                  className="grid size-10 place-items-center rounded-full border border-cream/15 text-cream/80 transition-colors hover:border-ember hover:text-ember"
                >
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h3 className="font-mono text-xs uppercase tracking-wider text-sage">
                {col.title}
              </h3>
              <ul className="mt-5 flex flex-col gap-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      to={l.href}
                      className="text-sm text-cream/80 transition-colors hover:text-ember"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Legal */}
        <div className="shell flex flex-col gap-3 border-t border-cream/10 py-7 text-xs text-sage sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {BRAND.legalName}. All rights reserved.
          </p>
          <p>Designed &amp; engineered with precision.</p>
        </div>
      </div>
    </footer>
  );
}
