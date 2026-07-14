# Kova — Digital Transformation Studio

An Awwwards-grade marketing site, built as an editorial, motion-rich,
WebGL-driven experience. Ships as a **plain React single-page app** — the
build output is static HTML/CSS/JS deployable on any web host.

> Rename the brand everywhere by editing a single constant: `BRAND.name` in
> `src/lib/site.ts`.

## Stack

- **Vite** · **React 19** · **React Router 7** · **TypeScript**
- **Tailwind CSS v4** (CSS-first `@theme` tokens, via `@tailwindcss/vite`)
- **React Three Fiber + Three.js** — hero neural graph, global-network globe, footer constellation
- **GSAP + ScrollTrigger** — split-text reveals, pinned process, horizontal case scroll, counters
- **Framer Motion** — accordions, testimonial transitions, mobile menu
- **Lenis** — smooth scroll (driven by the GSAP ticker; disabled under reduced-motion)
- **Lucide** — UI icons (brand/social marks are inline SVGs in `ui/brand-icons.tsx`)
- **Fontsource** — self-hosted Instrument Serif, Inter, Geist Mono (no external font requests)

## Design system

Tokens live in `src/styles/globals.css` (`@theme`).

| Role | Token |
| --- | --- |
| Canvas | `--color-cream` `#F3EEE3` / `--color-cream-soft` `#F9F6F0` |
| Contrast | `--color-forest` `#2B3D2E` / `--color-forest-deep` `#1D3124` |
| Accent | `--color-ember` `#C66B3D` / `--color-ember-bright` `#D36135` |
| Support | `--color-sage` `#A8B2A6` / `--color-muted` `#7D8B7F` |

**Type:** `Instrument Serif` (display) · `Inter` (UI/body) · `Geist Mono` (labels).

## Architecture

```
index.html        default <title>/OG meta, favicon, root div
src/
  main.tsx        entry — StrictMode + BrowserRouter + global CSS
  App.tsx         shell (cursor, smooth scroll, navbar/footer) + <Routes>
  pages/          one file per route (+ not-found.tsx); detail pages use useParams
  components/
    layout/       navbar, footer, logo
    sections/     one file per landing section
    three/        R3F scenes + lazy/in-view/reduced-motion wrappers
    providers/    Lenis smooth-scroll provider
    ui/           Button, Reveal, TextReveal, Counter, Marquee, Accordion, Cursor, …
    seo.tsx       per-page <title>/<meta> (React 19 hoists them to <head>)
  lib/            site config, content data, hooks, cn util
  styles/         globals.css (@theme tokens), fonts.css (Fontsource + font vars)
public/           favicon, robots.txt, sitemap.xml
```

## Key decisions

- **WebGL explains, never decorates.** The hero graph = connected infrastructure;
  the globe = global active-active reach; the footer = a calm constellation close.
- **Performance first.** Canvases are `React.lazy` + `Suspense`, capped DPR, and
  gated by an `IntersectionObserver` so off-screen scenes do no work. Mobile uses
  fewer nodes.
- **Accessibility is non-negotiable.** Skip link, visible focus rings, semantic
  headings, `aria-label`ed kinetic text, and a full **reduced-motion** path
  (native scroll, instant counters, static WebGL fallbacks, no custom cursor).
- **One source of truth.** Brand + copy in `src/lib/site.ts` and `src/lib/content.ts`.
- **Reveals use `gsap.fromTo`, never `gsap.from`.** A `.from()` tween records the
  element's computed style as its end state on first play; combined with a CSS
  `transition-*` class on the same element it captures the hidden state and the
  reveal animates hidden→hidden. If you add transitions inside a `Reveal`, prefer
  scoped ones (`transition-colors`) over `transition-all`.

## Develop

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check + production build → dist/
npm run preview  # serve the production build locally
```

## Deploy

`npm run build` emits a self-contained `dist/` folder. Because routing is
client-side, deep links (e.g. `/projects/cosy-aura`) need the host to serve
`index.html` for unknown paths:

| Host | Setup |
| --- | --- |
| **GitHub Pages** | Nothing — the build emits `dist/404.html` (a copy of `index.html`) automatically. |
| **Netlify / Cloudflare Pages** | Add `public/_redirects` with: `/* /index.html 200` |
| **Vercel (static)** | `vercel.json`: `{ "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }] }` |
| **nginx** | `try_files $uri /index.html;` |
| **Apache / cPanel** | `.htaccess` rewrite of non-file requests to `/index.html`. |

The `404.html` fallback works everywhere as a lowest common denominator (pages
load fine, but with a 404 status code); prefer a real rewrite when the host
supports one.
