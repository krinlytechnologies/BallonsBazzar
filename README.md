# BalloonBazaar.in

Marketing site for BalloonBazaar — birthday party, balloon decoration and celebration services.

## Stack

- [Next.js](https://nextjs.org) (App Router) + TypeScript
- Tailwind CSS v4 (CSS-first config, tokens in `src/app/globals.css`)
- ESLint (`eslint-config-next`)

## Getting started

```bash
npm install
cp .env.example .env.local   # fill in real values
npm run dev
```

The app runs at http://localhost:3000.

## Scripts

| Script            | Purpose                        |
| ------------------ | ------------------------------- |
| `npm run dev`       | Start the dev server            |
| `npm run build`     | Production build                |
| `npm run start`     | Serve the production build      |
| `npm run lint`      | ESLint                          |
| `npm run typecheck` | TypeScript, no emit             |

## Project structure

```
src/
  app/              App Router routes (home, celebrations, gallery, about, contact)
  components/
    ui/             Generic, brand-agnostic primitives (Container, etc.)
    brand/          BalloonBazaar-specific components (Logo, etc.)
  data/             Static site data (nav links, site config)
  lib/              Shared utilities
  types/            Shared TypeScript types
public/
  images/brand/     Logos, brand marks
  images/gallery/   Portfolio / gallery photography
  icons/            Standalone icon assets
```

## Design tokens

Brand colors, fonts and radii are defined as CSS custom properties in
`src/app/globals.css` under the Tailwind v4 `@theme` block (`fiesta`,
`lagoon`, `marigold`, `ink`, `cream` scales, plus semantic aliases like
`brand`, `accent`, `support`, `surface`, `foreground`). Fonts are loaded via
`next/font/google` in `src/app/layout.tsx` (Fraunces for display, Plus
Jakarta Sans for body copy).

## Status

Foundation only: routing, structure, tokens, metadata and tooling are in
place. Page layouts, animations, booking flows and backend services are not
yet implemented.
