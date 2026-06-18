# humankumal.com

Premium, cinematic personal portfolio for **Human Kumal** — founder of UKDIGIHUB, business systems builder, digital strategist.

This is **Version 1**: the foundation + full static narrative. Advanced motion (GSAP scroll scenes) and 3D are deliberately deferred to later phases.

## Stack

- **Next.js 16** (App Router) + **React 19**
- **TypeScript**
- **Tailwind CSS v4** — design tokens live in `app/globals.css` (`@theme`), no `tailwind.config.js`
- **GSAP + ScrollTrigger** — installed and registered (`lib/gsap.ts`), reserved for the Phase 3 motion layer
- **lucide-react** — icons

## Local development

```bash
npm install
npm run dev     # http://localhost:3000
npm run lint    # eslint
npm run build   # production build (fully static)
```

## Deploying on Vercel

The project is a standard Next.js App Router app with **no backend, database, or
environment variables** — it deploys to Vercel with zero configuration.

1. Push the branch to GitHub (already done for the feature branch).
2. In Vercel: **Add New → Project → Import** the `humankumal/humankumal` repo.
3. Vercel auto-detects Next.js. Confirm the defaults:

   | Setting          | Value                          |
   | ---------------- | ------------------------------ |
   | Framework Preset | Next.js                        |
   | Build Command    | `next build` (default)         |
   | Install Command  | `npm install` (default)        |
   | Output Directory | `.next` (default — leave blank)|
   | Environment vars | none                           |

4. Choose the branch to deploy (see below) and deploy.

Open Graph / Twitter share images are generated automatically at build time
from `app/opengraph-image.tsx` (no static asset needed). Once a custom domain
is connected, set it to `https://humankumal.com` so `metadataBase` matches.

## Structure

```
app/                  # layout, page (assembles the 11 sections), globals.css (design tokens)
components/
  layout/             # Navbar, Footer, Preloader, ScrollProgress
  sections/           # the 11 narrative sections (Hero -> Contact)
  ui/                 # Section, SectionHeading, Button, Tag, Card, ProjectCard, ...
  motion/             # Reveal (progressive scroll-reveal; GSAP comes later)
  visual/             # GrainOverlay, AmbientGlow
content/              # ALL copy & data (typed) — edit here, not in components
lib/                  # cn() helper, gsap setup
public/images/        # project screenshots / imagery (to be added)
```

## Design tokens

| Token        | Value     | Utility examples         |
| ------------ | --------- | ------------------------ |
| base         | `#0A0E1A` | `bg-base`                |
| elevated     | `#111726` | `bg-elevated`            |
| amber        | `#F5A623` | `bg-amber`, `text-amber` |
| amber-bright | `#FFB84D` | `text-amber-bright`      |
| teal         | `#2DD4BF` | `text-teal`, `to-teal`   |
| ink          | `#F5F3EF` | `text-ink` (soft white)  |
| muted        | `#8A92A6` | `text-muted`             |

> Note: use `text-[var(--color-base)]` for navy-on-amber text — `text-base` is a built-in Tailwind font-size utility.

## Placeholders to replace before public launch

Search the `content/` folder for `TODO` and "to be added":

- **Education** (`content/journey.ts`) — institution names + years for BBA, MBA, MSc
- **LinkedIn URL** (`content/site.ts`) — `socials[0].href` (currently `#`)
- **UKDIGIHUB stats** (`content/interests.ts`) — real figures if available
- **Projects** (`content/projects.ts`) — real titles, descriptions, links, and screenshots in `/public/images` (cards currently link to `#`)
- **Imagery** — Nepal origin visual (currently an SVG placeholder)

Confirmed / done:

- Contact email — `human@ukdigihub.co.uk` (opens via `mailto:`, no backend)
- UKDIGIHUB URL — `https://ukdigihub.co.uk`
- Site domain — `https://humankumal.com`
- Open Graph / Twitter image — auto-generated, on-brand placeholder

> The contact form has **no backend** by design — it composes a pre-filled
> email via the visitor's mail client. A real form handler can be added later
> without changing the markup.

## Accessibility

Semantic landmarks, skip link, keyboard-friendly nav (Escape closes mobile menu), visible focus rings, `prefers-reduced-motion` support, and content that renders fully without JS.
