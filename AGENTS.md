# Project notes for agents

This is a **Vite + React 19 + React Router 7 single-page app** (it was migrated
from Next.js 16 — do not reintroduce `next/*` imports, `"use client"`
directives, or file-convention routing).

- Routes are declared in `src/App.tsx`; page components live in `src/pages/`.
- Per-page `<title>`/`<meta>` via `src/components/seo.tsx` (React 19 hoists
  head tags — no helmet library).
- Tailwind CSS v4: tokens in `src/styles/globals.css` via `@theme`; there is no
  tailwind.config file. Fonts are self-hosted via Fontsource in
  `src/styles/fonts.css`.
- Scroll reveals must use `gsap.fromTo` (never `gsap.from`) — see the note in
  `src/components/ui/reveal.tsx`. Avoid `transition-all` on elements animated
  by GSAP.
- Build with `npm run build` (runs `tsc -b` first); output is static `dist/`.
