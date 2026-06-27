# Axiom — Enterprise Technology Studio

An Awwwards-grade marketing site for a fictional enterprise technology company
(**Axiom**), positioned as *"the Apple of enterprise technology."* Built as an
editorial, motion-rich, WebGL-driven experience.

> Rename the brand everywhere by editing a single constant: `BRAND.name` in
> `src/lib/site.ts`.

## Stack

- **Next.js 16** (App Router) · **React 19** · **TypeScript**
- **Tailwind CSS v4** (CSS-first `@theme` tokens)
- **React Three Fiber + Three.js** — hero neural graph, global-network globe, footer constellation
- **GSAP + ScrollTrigger** — split-text reveals, pinned process, horizontal case scroll, counters
- **Framer Motion** — accordions, testimonial transitions, mobile menu
- **Lenis** — smooth scroll (driven by the GSAP ticker; disabled under reduced-motion)
- **Lucide** — UI icons (brand/social marks are inline SVGs in `ui/brand-icons.tsx`)

## Design system

Tokens live in `src/app/globals.css` (`@theme`).

| Role | Token |
| --- | --- |
| Canvas | `--color-cream` `#F3EEE3` / `--color-cream-soft` `#F9F6F0` |
| Contrast | `--color-forest` `#2B3D2E` / `--color-forest-deep` `#1D3124` |
| Accent | `--color-ember` `#C66B3D` / `--color-ember-bright` `#D36135` |
| Support | `--color-sage` `#A8B2A6` / `--color-muted` `#7D8B7F` |

**Type:** `Instrument Serif` (display) · `Inter` (UI/body) · `Geist Mono` (labels).

## Architecture

```
src/
  app/            layout (fonts, SEO, providers), page (section composition), robots, sitemap
  components/
    layout/       navbar, footer, logo
    sections/     one file per landing section
    three/        R3F scenes + lazy/in-view/reduced-motion wrappers
    providers/    Lenis smooth-scroll provider
    ui/           Button, Reveal, TextReveal, Counter, Marquee, Accordion, Cursor, …
  lib/            site config, content data, hooks, cn util
```

## Key decisions

- **WebGL explains, never decorates.** The hero graph = connected infrastructure;
  the globe = global active-active reach; the footer = a calm constellation close.
- **Performance first.** Canvases are `next/dynamic` (`ssr:false`), capped DPR, and
  gated by an `IntersectionObserver` so off-screen scenes do no work. Mobile uses
  fewer nodes.
- **Accessibility is non-negotiable.** Skip link, visible focus rings, semantic
  headings, `aria-label`ed kinetic text, and a full **reduced-motion** path
  (native scroll, instant counters, static WebGL fallbacks, no custom cursor).
- **One source of truth.** Brand + copy in `src/lib/site.ts` and `src/lib/content.ts`.

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build (fully static)
```
