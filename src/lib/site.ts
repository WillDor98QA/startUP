/**
 * Single source of truth for brand-level copy.
 * Change BRAND.name here to rebrand the entire site.
 */
export const BRAND = {
  name: "Kova",
  legalName: "Kova Labs",
  tagline: "From manual work to momentum.",
  positioning: "The digital transformation partner for growing businesses.",
  promise:
    "We help growing businesses replace manual work with intelligent digital systems that unlock efficiency, visibility, and growth.",
  email: "hello@kova.studio",
  phone: "+1 (415) 555-0148",
  location: "Remote-first · San Francisco · Lisbon",
  social: {
    linkedin: "https://linkedin.com",
    x: "https://x.com",
    github: "https://github.com",
  },
} as const;

export const NAV_LINKS = [
  { label: "Solutions", href: "/solutions" },
  { label: "Projects", href: "/projects" },
  { label: "Industries", href: "/industries" },
  { label: "Process", href: "/process" },
  { label: "About", href: "/about" },
  { label: "Insights", href: "/insights" },
] as const;

export const CTA = { label: "Book a discovery session", href: "/contact" } as const;
