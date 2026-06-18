# humankumal.com

Premium, cinematic personal portfolio for **Human Kumal** — founder of UKDIGIHUB, business systems builder, digital strategist.

This is **Version 1**: the foundation + full static narrative. Advanced motion (GSAP scroll scenes) and 3D are deliberately deferred to later phases.

## Stack

- **Next.js 16** (App Router) + **React 19**
- **TypeScript**
- **Tailwind CSS v4** — design tokens live in `app/globals.css` (`@theme`), no `tailwind.config.js`
- **GSAP + ScrollTrigger** — installed and registered (`lib/gsap.ts`), reserved for the Phase 3 motion layer
- **lucide-react** — icons

## Getting started

```bash
npm install
npm run dev     # http://localhost:3000
npm run lint
npm run build
```

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

## Placeholders to replace (V1 -> V2)

Search the `content/` folder for `TODO` and "to be added":

- **Education** (`content/journey.ts`) — institution names + years for BBA, MBA, MSc
- **LinkedIn URL** (`content/site.ts`) — `socials[0].href`
- **UKDIGIHUB URL** (`content/site.ts`, `content/interests.ts`) — confirm live domain
- **UKDIGIHUB stats** (`content/interests.ts`) — real figures if available
- **Projects** (`content/projects.ts`) — real titles, descriptions, links, and screenshots in `/public/images`
- **Imagery** — Nepal origin visual + hero ambient art
- **Open Graph image** — add an OG/social share image

Contact email is set to `human@ukdigihub.co.uk`.

## Accessibility

Semantic landmarks, skip link, keyboard-friendly nav (Escape closes mobile menu), visible focus rings, `prefers-reduced-motion` support, and content that renders fully without JS.
