# PROJECT INTELLIGENCE AUDIT — humankumal.com

**Audit date:** 2026-09-17
**Audited commit:** `91f21dd` ("Group live projects first; make journey-path dots clickable chapter nodes")
**Repository:** `humankumal/humankumal` (GitHub, **public**)
**Live production URL:** https://humankumal.com
**Mode:** Read-only. No application code, dependencies, infrastructure, or configuration was modified.

**Evidence legend**
- **[V]** VERIFIED — directly observed in source, live HTML, or the Vercel API during this audit.
- **[I]** INFERENCE — strongly supported by evidence but not directly confirmed.
- **[U]** UNVERIFIED — could not be confirmed in this environment; listed so you can check.

> **Audit constraint:** `node_modules` was absent and installing dependencies was out of scope, so no fresh `next build` was run. Build-shape claims rely on (a) live production HTML fetched via the Vercel API and (b) build output captured earlier in the project's own history. Anything I could not confirm is marked **[U]** and collected in the final section.

---

## 1. Executive summary

humankumal.com is a **single-page, content-driven personal portfolio and founder-story site**. It is well-structured for its size: one route, a cleanly separated typed content layer, a consistent design-token system, sensible semantics, and a real accessibility effort. For a site built with AI assistance, the architecture is unusually disciplined — there is no dead framework sprawl, no abandoned half-features, and no secrets anywhere.

It is also **smaller and lower-risk than it looks**: no database, no authentication, no payments, no webhooks, no background jobs, no AI/LLM calls at runtime, no user data storage, and no environment variables. The entire attack surface is "a public brochure with a `mailto:` link."

That said, the audit surfaced **six findings that materially matter**, and they are mostly *operational and commercial* rather than code-quality issues:

1. **Vercel is deploying production from the feature branch, not `main`.** Pushes to `main` currently produce previews only. **[V]**
2. **The account is on Vercel's Hobby (free) plan while the site actively solicits commercial business.** That is a plan/ToS mismatch with site-down consequences. **[V]**
3. **The contact form — the only conversion path on the site — has multiple silent failure modes** and no success/error feedback. **[V]**
4. **The site is no longer "fully static."** Adding the portrait via `next/image` introduced Vercel Image Optimization, a metered/billed resource. **[V]**
5. **The footer copyright year is frozen at build time** (currently `2026`, hardcoded into the HTML). **[V]**
6. **The portfolio significantly under-sells the owner.** At least three projects shown as "Case study coming soon" are already deployed and live, and roughly 18 other deployed applications are absent from the portfolio entirely. **[V]**

Nothing here is an emergency. Items 1–3 are the ones worth acting on before relying on this site for lead generation.

---

## 2. Project purpose

**In plain English:** a premium, cinematic one-page website that tells Human Kumal's story (Nepal → UK), presents his work, promotes his agency UKDIGIHUB, and invites business enquiries by email.

**Technically:** a Next.js App Router application with exactly one page route (`/`). All copy and data live in a typed `content/` layer. Presentation is Tailwind CSS v4 with design tokens declared in CSS. Scroll motion is GSAP + ScrollTrigger. There is no backend of any kind.

**Commercial intent is explicit in the content** — relevant to §10:
- `components/sections/Contact.tsx:44-48` — "I work with a small number of businesses ready to build systems that actually move the needle…"
- `content/interests.ts:18-19` — "Visit UKDIGIHUB" CTA → `https://ukdigihub.co.uk`
- `content/site.ts:21` — role: "Founder & Business Systems Builder"

---

## 3. Architecture map

```
                         ┌──────────────────────────────┐
  Visitor ──HTTPS──────► │ Vercel Edge (humankumal.com) │
                         └──────────────┬───────────────┘
                                        │
             ┌──────────────────────────┼───────────────────────────┐
             │                          │                           │
     Prerendered HTML +        /_next/image (function)      /opengraph-image
     RSC flight payload        Image Optimization           /twitter-image
     (static)                  [METERED]                    (build-time PNG)
             │
             ▼
   ┌─────────────────────────────────────────────────────────────┐
   │ app/layout.tsx  → fonts (next/font/google), metadata        │
   │ app/page.tsx    → assembles 11 sections + 5 chrome widgets  │
   └───────────────────────────┬─────────────────────────────────┘
                               │ imports (build time only)
                               ▼
   ┌─────────────────────────────────────────────────────────────┐
   │ content/  (typed, static — the de-facto CMS)                │
   │   site.ts · journey.ts · work.ts · interests.ts · projects.ts│
   └─────────────────────────────────────────────────────────────┘
                               │
                               ▼
   ┌─────────────────────────────────────────────────────────────┐
   │ Server Components: sections, ui/*, visual/*, Footer         │
   │ Client Components ("use client"):                           │
   │   Navbar · Preloader · ScrollProgress · Contact             │
   │   motion/Reveal (×61 at runtime) · JourneyPath              │
   │   motion/ScrollAnimations (renders null; drives DOM by       │
   │                            data-attribute)                  │
   └─────────────────────────────────────────────────────────────┘

  Outbound, user-initiated only:
    mailto:human@ukdigihub.co.uk   (visitor's own mail client)
    4 external project links + UKDIGIHUB (target=_blank, rel=noopener noreferrer)
```

**Routes [V]** (from build output in project history, corroborated by live meta tags):
`/` · `/_not-found` · `/opengraph-image` · `/twitter-image` — all prerendered.

---

## 4. Technology / integration inventory

### Runtime dependencies **[V]** (resolved from `package-lock.json`, lockfileVersion 3, 437 packages)

| Package | Version | Role | Notes |
|---|---|---|---|
| `next` | 16.2.9 | Framework (App Router) | Turbopack bundler **[V]** |
| `react` / `react-dom` | 19.2.4 | UI runtime | |
| `gsap` | 3.15.0 | Scroll motion + ScrollTrigger | See licence note below |
| `lucide-react` | 1.21.0 | Icons | 20 distinct icons imported |
| `tailwindcss` | 4.3.1 | Styling | v4 — **no `tailwind.config.js`**; tokens in `app/globals.css` `@theme` |
| `typescript` | 5.9.3 | Types | `strict: true` |
| `eslint` | 9.39.4 | Lint | flat config, `eslint-config-next` |
| `sharp` | 0.34.5 | *optional* dep **of `next`** | Powers image optimization **[V]** |

**GSAP licence [I]:** ScrollTrigger has always been free, and since GSAP 3.13 (2025) the full toolset is free for commercial use. At 3.15.0 there is **no Club GreenSock subscription cost**. Verify before adopting any future paid-tier plugin.

### Supply-chain surface **[V]**
- 437 packages in the lock tree; **2 with install scripts** (`sharp`, `unrs-resolver`); 59 platform-specific binaries.
- **No `.github/` directory** → no CI, no Dependabot, no CodeQL, no automated dependency updates.

### Integrations — a deliberately short list
| Category | Status |
|---|---|
| Database / ORM | **None** |
| Auth / sessions / RLS | **None** |
| Payments | **None** |
| Webhooks | **None** |
| n8n / automation | **None in this repo** (n8n appears only as portfolio *copy*, `content/projects.ts:141`) |
| AI / LLM API calls | **None at runtime** |
| Email / SMS service | **None** — `mailto:` only |
| Storage / uploads | **None** — one committed PNG |
| Analytics / monitoring | **None** — no Vercel Analytics, Speed Insights, GA, or error tracking **[V]** |
| Environment variables | **None** — no `.env*` files exist **[V]** |
| Secrets in repo | **None found** **[V]** |

### Hosting **[V]** (Vercel API)
- Team `humankumal's projects` (`team_hTivnJOtzLgEHvT1kTGDVZHQ`), plan **`hobby`**
- Project `humankumal` (`prj_3WITFYVgWgCDWKz87VS617AqK0j1`), framework `nextjs`, Node `24.x`
- Domains attached: `humankumal.com`, `www.humankumal.com`, `humankumal.vercel.app`, `humankumal-humankumals-projects.vercel.app`, `humankumal-git-claude-humankumal-po-b3bb48-humankumals-projects.vercel.app`
- `lambdaRuntimeStats: {"nodejs": 2}` on recent deployments (was `1` before the portrait commit)

---

## 5. Data-flow explanation

There is **no dynamic data flow**. This is the single most important thing to understand about the system.

**Build time**
1. `content/*.ts` modules are imported directly by Server Components.
2. Next renders the page to static HTML + an RSC flight payload.
3. `app/opengraph-image.tsx` executes once, producing a 1200×630 PNG.
4. Fonts are fetched from Google Fonts by `next/font` and **self-hosted** in the build output (no runtime Google request) **[V]** — two `.woff2` files are preloaded from `/_next/static/media/`.

**Request time**
1. Visitor gets prerendered HTML from Vercel's edge/CDN.
2. `/_next/image` is called to serve the portrait at a device-appropriate width **[V]**:
   `/_next/image?url=%2Fimages%2Fhuman-kumal-portrait.png&w=256|640|828…&q=75`
3. Client components hydrate; GSAP/IntersectionObserver wire up scroll behaviour.

**User-initiated outbound**
- Contact form: `Contact.tsx:20-27` builds a `mailto:` URL and assigns `window.location.href`. **Nothing is transmitted to any server the owner controls.** The on-page claim "No data is stored" (`Contact.tsx:152`) is **accurate**.

**Document weight [V]** — measured on live production HTML:

| Portion | Bytes | Share |
|---|---|---|
| HTML | 90,401 | 44% |
| RSC flight payload (`self.__next_f`) | 114,523 | 56% |
| **Total** | **204,924** | |

Page content appears **twice** (e.g. "Case study coming soon": 6× in HTML, 6× in RSC). See §8 for why.

---

## 6. Feature / capability inventory

**Narrative (11 sections, `app/page.tsx:34-58`)**
Hero (`#top`) · Origins (`#origins`) · Education (`#education`) · The Move (`#the-move`) · MSc (`#msc`) · Work (`#work`) · Projects (`#projects`) · UKDIGIHUB (`#ukdigihub`) · Philosophy (`#philosophy`) · Future (`#future`) · Contact (`#contact`)

**Chrome & motion**
- `Navbar` — scroll-aware hide/reveal, blur-on-scroll, mobile panel, Escape-to-close
- `Preloader` — 700 ms hold + 500 ms fade, plus a deep-link hash re-scroll fix
- `ScrollProgress` — top gradient bar driven by `scaleX`
- `JourneyPath` — fixed left rail, **xl-only (≥1280px)**; amber→teal fill scrubs with page scroll; **5 clickable chapter nodes** with hover labels and IntersectionObserver scroll-spy
- `ScrollAnimations` — renders `null`; desktop pins `#the-move` for `+=55%` viewport height while the Nepal→UK trajectory scrubs in; AmbientGlow parallax (desktop only)
- `Reveal` — GSAP fade/rise/scale, **61 runtime instances [V]**
- `GrainOverlay` / `AmbientGlow` — decorative texture and light bloom

**Projects [V]** — 10 entries: **4 live/clickable** (UKDIGIHUB, LaundryOS, FishOS, LuxeFloor) and **6 "Case study coming soon"** (exactly 6 badge instances in HTML). Cards without a screenshot render a per-project **branded cover** — an industry-relevant Lucide icon over a gradient + blueprint grid (`ProjectCard.tsx:31-91`).

**Accessibility features genuinely present [V]**
Skip link · semantic `<section>` landmarks with `aria-label` · correct heading hierarchy (**1× h1, 10× h2, 17× h3**) · `:focus-visible` ring · `prefers-reduced-motion` honoured in both CSS *and* every JS motion path · `aria-expanded`/`aria-controls` on the menu toggle · 79 `aria-hidden` on decorative nodes · **7/7 external links carry `rel="noopener noreferrer"`** · content renders without JS (`<noscript>` fallback, `layout.tsx:66-68`)

---

## 7. Hidden / overlooked discoveries

### 7.1 Production is served from the feature branch, not `main` — **[V]**
Across all 15 deployments the pattern is perfectly consistent:

| Commit | Branch | Vercel `target` |
|---|---|---|
| `91f21dd` | `claude/humankumal-portfolio-strategy-j3v9p8` | **production** |
| `91f21dd` | `main` | `null` (preview) |
| `0fdb820` | claude branch | **production** |
| `2e31781` | claude branch | **production** |
| `2e31781` | `main` | `null` (preview) |
| `2a798fd` | claude branch | **production** |
| `2a798fd` | `main` | `null` (preview) |

Every claude-branch deployment is production; every `main` deployment is a preview. **The Vercel "Production Branch" setting is the feature branch.** The site currently looks correct only because both branches happen to point at the same commit.

**Consequences:** pushes to `main` will not update the live site; deleting the feature branch (normal post-merge hygiene) removes the branch production deploys from; and the current mental model ("merge to main → deploys") is wrong for this project.
*Check: Vercel → project `humankumal` → Settings → Git → Production Branch.*

### 7.2 The site is not static any more — **[V]**
The README says "fully static" and "no backend". Since commit `253dc09` (portrait via `next/image`), production HTML contains `/_next/image?...` srcset entries and `lambdaRuntimeStats` rose from `{"nodejs":1}` to `{"nodejs":2}`. Image Optimization is a **metered Vercel resource**.

### 7.3 Three "coming soon" projects are already live — **[V]**
| Portfolio card | Status shown | Actual Vercel project | Live URL | State |
|---|---|---|---|---|
| PharmacyOS | Case study coming soon | `pharmacy-os` | `pharmacy-os-blond.vercel.app` | READY / production |
| HotelOS | Case study coming soon | `hotel-os` | `hotel-os-psi.vercel.app` | READY / production |
| PropertyOS | Case study coming soon | `property-os` | `property-os-five.vercel.app` | READY / production |
| DentalOS | Case study coming soon | `novasmile-dental-clinic`? | `novasmile-dental-clinic.vercel.app` | READY — **name mismatch, owner to confirm [U]** |

No `lanternfall` project exists on the account **[V]**; n8n is expected to live outside Vercel.

### 7.4 ~18 deployed applications are missing from the portfolio — **[V]**
The account holds **30 Vercel projects**. Absent from the portfolio: `ledger-one`, `visa-bridge-law`, `lumia-skin-clinic`, `novasmile-dental-clinic`, `digital-marketing-universe`, `recruit-os`, `business-command`, `financial-gravity-os`, `the-ember-room`, `ocean-depths`, `future-ai-2050`, `human-journey`, `luna-beauty-lounge`, `transform365`, `beauty-os`, `travel-webapp`, `fit-hero`, `ukdigihub-command`.

### 7.5 Three duplicate Vercel projects double your builds — **[V]**
- `laundry-os` **and** `laundry-os-wa6u` ← both from repo `laundry-os`
- `luna-beauty-lounge` **and** `luna-beauty-lounge-acj2` ← both from repo `luna-beauty-lounge`
- `ukdigihub-flagship-nextjs` **and** `ukdigihub-next` ← both from repo `ukdigihub-flagship-nextjs`

Every push to those repos triggers two builds.

### 7.6 The `Reveal` pattern doubles your document size — **[V]**
`Reveal` is a Client Component wrapping nearly every piece of content (61 instances). Content passed as `children` from a Server Component into a Client Component **must be serialized into the RSC flight payload** — so the whole page ships twice (§5). This is the direct architectural cause of the 205 KB document.

### 7.7 The footer year is frozen in the build — **[V]**
`Footer.tsx:4` calls `new Date().getFullYear()` in a **Server Component on a prerendered page**. Live HTML contains the literal:
`© <!-- -->2026<!-- --> <!-- -->Human Kumal<!-- -->. All rights reserved`
Correct today; it will read "© 2026" indefinitely until the site is rebuilt.

### 7.8 `disciplines` is structured metadata you aren't using — **[V]**
`content/projects.ts` types every project with `disciplines: ProjectDiscipline[]` (5 categories). Its **only** consumer is `ProjectCard.tsx:54`, an `aria-label` on a plain `<div>` — which assistive tech ignores (§9). Effectively unused; a ready-made filtering/categorisation axis.

### 7.9 Dead code confirmed by zero usage — **[V]**
| Item | Location | Evidence |
|---|---|---|
| `.reveal-active.is-visible` | `globals.css:103-106` | `is-visible` appears nowhere in TS/TSX; leftover from the pre-GSAP IntersectionObserver implementation |
| `.glow-amber` | `globals.css:136-140` | 0 usages |
| `.hairline` | `globals.css:142-144` | 0 usages |
| `--ease-out-soft` | `globals.css:28` | Only used by `.reveal-active`'s transition, which `Reveal.tsx:38` disables via `el.style.transition = "none"` |
| `<img>` screenshot branch | `ProjectCard.tsx:113-119` | All 10 `image` fields are `""` → never executes |
| `SectionHeading as="h1"` | `SectionHeading.tsx:9` | Hero renders its own `<h1>`; prop never passed |

### 7.10 Documentation is materially misleading — **[V]**
`README.md` describes a **pre-Phase-3** project:
- "Advanced motion (GSAP scroll scenes) … deliberately deferred to later phases" — GSAP is fully implemented.
- "GSAP + ScrollTrigger — installed and registered … **reserved for** the Phase 3 motion layer" — in active use.
- Design-token table lists `muted | #8A92A6` — actual value is **`#9BA4B8`** (`globals.css:21`).
- Lists as outstanding: the Nepal imagery (now a real portrait) and project links (4 now live).

`lib/gsap.ts:5-8` likewise states "nothing in the static narrative depends on GSAP yet." Stale comments also at `content/journey.ts:13` (badge removed) and `content/projects.ts:25` ("gradient placeholder" → now `BrandedCover`).

### 7.11 Clever things already present, worth keeping
- `app/twitter-image.tsx` re-exports `opengraph-image` — one source, two cards, zero duplication.
- `next/font` self-hosts Google Fonts — no third-party runtime request, no CLS from font loading.
- `Preloader.tsx:21-30` deep-link fix — re-applies `window.location.hash` after the overlay fades, so `/#projects` works despite the preloader.
- `ScrollAnimations` early-guard (`:52-54`) degrades **gracefully**: if the `#the-move` markup changes, labels simply stay visible rather than vanishing.
- `Contact.tsx:22-25` correctly `encodeURIComponent`s subject and body, preventing `mailto:` header injection.
- The repo contains **no secrets and no `.env` files** — nothing to leak.

---

## 8. Production risks

Scoped honestly to what this system actually is. There is no database, auth, payment, or PII store, so entire risk categories are genuinely **not applicable** — those are listed as such rather than padded.

### 8.1 Commercial-use vs Hobby plan — **HIGH [V] plan, [I] policy exposure**
The account plan is `hobby`. Vercel's Hobby tier is for **non-commercial/personal** use. This site solicits client work, promotes a commercial agency, and provides a business enquiry form. Vercel has historically asked such projects to upgrade, and can suspend or throttle. **Failure mode: the site (and possibly the other 29 projects) goes offline, taking your lead channel with it.** Hobby also carries ~100 GB/month bandwidth and image-optimization limits, and **no SLA**.

### 8.2 Contact form silent failures — **HIGH [V]**
This is the only conversion path. `Contact.tsx:20-27`:
- **`mailto:` length limits.** Subject + body are URL-encoded into one URL. Many mail clients/OS handlers cap `mailto:` around ~2,000 characters; there is **no `maxLength`** on the textarea. A long enquiry can be silently truncated or fail to open at all.
- **No mail-client fallback.** If the visitor has no registered `mailto:` handler (common on desktop Linux, some Windows setups, webmail-only users), `window.location.href = "mailto:…"` does **nothing**. The button appears broken.
- **No feedback of any kind.** No pending/success/error state; form values are not cleared. The visitor cannot tell whether anything happened.
- *Mitigation already present:* the plain email address is displayed directly above (`Contact.tsx:52-58`), so a determined visitor can still reach you.

### 8.3 Deployment-model risk — **HIGH [V]** — see §7.1.

### 8.4 SEO duplicate content — **MEDIUM [V]**
Five hostnames serve byte-identical content, and the live HTML contains **no `rel="canonical"`** and **no `robots` meta**. There is no `app/robots.ts` and no `app/sitemap.ts`. `humankumal.vercel.app` is a *production* alias (not a preview), so it is indexable and competes with `humankumal.com`.

### 8.5 Motion/scroll fragility — **MEDIUM**
- **`scroll-behavior: smooth` + ScrollTrigger `pin`/`scrub`** — `globals.css:35` sets smooth scrolling globally while `ScrollAnimations.tsx:92-108` pins with scrub. GSAP documents this combination as conflict-prone (jump/fight during scrub). Most likely to show when a JourneyPath chapter link scrolls near `#the-move`. **[I]**
- **Breakpoint decisions freeze at mount.** `Reveal.tsx:40` reads `window.innerWidth < 768`; `ScrollAnimations.tsx:23` reads `< 1024`; `JourneyPath` uses CSS `xl` (1280). None re-evaluate on resize or device rotation, so a phone rotated to landscape (or a resized desktop window) keeps the strategy chosen at load. ScrollTrigger refreshes *positions* on resize automatically, but the mobile/desktop **branch** does not change. **[I]**
- **Three different "mobile" definitions** (768 / 1024 / 1280) as magic numbers not derived from the Tailwind theme — they can silently drift from the CSS breakpoints.
- **`prefers-reduced-motion` is read once** at mount; toggling the OS setting mid-session has no effect.

### 8.6 Chapter indicator can show the wrong section — **MEDIUM [V]**
`JourneyPath.tsx:71-78` only ever *sets* `activeId` on intersection and never clears it. Only 5 of 11 sections have nodes, so while scrolling through `education`, `the-move`, `msc`, `philosophy`, or `future`, the rail keeps highlighting the last matched chapter — actively misleading for 6 sections.

### 8.7 Unhandled exception on malformed URL fragments — **MEDIUM [V]**
`Preloader.tsx:26` passes the raw fragment into `document.querySelector(hash)`. Fragments that aren't valid CSS selectors (e.g. `humankumal.com/#1abc`, `#!promo`) make `querySelector` **throw `SyntaxError`**, uncaught, inside the effect. Any shared link or crawler with an odd hash triggers it. Not exploitable — `querySelector` executes no code — purely a robustness defect.

### 8.8 Data-model fragility — **MEDIUM [V]**
`EducationArc.tsx:7` selects entries with `education.filter(e => e.place === "Nepal")` while the section heading is **hardcoded** "The foundation: BBA & MBA in Finance." (`:14`). A whitespace change, "NP", or a third Nepal degree silently empties or misdescribes the section. The MSc is split out by the same string in `MscUK.tsx:8` (`find(e => e.id === "msc")`).

### 8.9 Performance / Core Web Vitals — **MEDIUM**
- **61 elements carry `will-change: opacity, transform` on first paint [V]** (`globals.css:101` applied via `.reveal-active`). Broad `will-change` forces many composited layers at once — a recognised anti-pattern that costs memory on low-end mobile. It *is* transient (the class is removed on reveal completion, `Reveal.tsx:62-63`), but the cost lands exactly at load.
- **The preloader covers the viewport for ~1.2 s** (`Preloader.tsx:13-14`, `:36`). A full-screen overlay during initial render can delay or mis-attribute **LCP**. Before `done` the overlay also has default `pointer-events`, blocking clicks for ~700 ms. **[I]**
- **205 KB document** with 56% redundant RSC payload (§5, §7.6).
- **A ~1.95 MB source PNG** (`public/images/human-kumal-portrait.png` = 2,040,548 bytes **[V]**). Optimization saves the visitor, but every distinct width/quality is a billed transformation.
- `ScrollProgress.tsx:17` drives a React state update per animation frame while scrolling (~60 re-renders/s). Tiny component, so low impact, but avoidable.

### 8.10 Security posture — **LOW, and genuinely low**
- **No security headers.** `next.config.ts` is empty — no CSP, `X-Frame-Options`, `Referrer-Policy`, or `Permissions-Policy`. Vercel supplies HSTS on custom domains. For a static brochure with no auth, cookies, or forms-that-post, clickjacking/framing impact is **negligible**. Listed for completeness, not alarm. **[V]** config, **[U]** actual response headers.
- **Email address exposed twice in plain HTML [V]** (Contact + Footer) → will be harvested by scrapers. An accepted trade-off for a contact page; expect spam.
- **Repository is public [V]** (`githubRepoVisibility: "public"`). No secrets, so low risk — but be aware all source, content, and commit history (which openly records AI co-authorship) is world-readable.
- **No dependency scanning.** 437 packages, 2 with install scripts, no Dependabot/CI. A vulnerable transitive dependency would go unnoticed indefinitely.

### 8.11 Not applicable (no padding)
Authentication/authorization · database permissions/RLS · PII storage & GDPR data-subject handling · payment failures · webhook delivery · background-job failures · concurrency/race conditions on shared state · API rate limits · backup/recovery of application data — **none of these exist in this system.** The only "backup" that matters is the Git repository plus the source PNG.

---

## 9. Security & accessibility findings

### 9.1 Live project cards have no visible focus indicator — **HIGH (accessibility) [V]**
`ProjectCard.tsx:154` — `className="group block focus-visible:outline-none"`.
`focus-visible:outline-none` appears **4 times in production HTML**, matching the 4 live cards. The generated selector (`.focus-visible\:outline-none:focus-visible`, class + pseudo-class) outranks the global `:focus-visible` ring in `globals.css:67-71`, and **nothing replaces it** — `Card`'s `interactive` styles are `hover:` only. Keyboard and switch users get no indication of focus on four primary links. Fails **WCAG 2.1 SC 2.4.7 (Focus Visible)**.

### 9.2 Collapsed mobile menu stays in the tab order — **MEDIUM (accessibility) [V]**
`Navbar.tsx:98-118` collapses the panel with `max-h-0` + `overflow-hidden`. Verified in live HTML: `max-h-0` present, **no `inert`, no `visibility:hidden`, no `tabIndex={-1}`**. Clipped content remains focusable, so keyboard users at mobile widths tab through 5 invisible links. (`aria-expanded`/`aria-controls` are correctly implemented — the wiring is right, the focus containment is missing.)

### 9.3 Weak focus affordance on form fields — **MEDIUM (accessibility) [V]**
`Contact.tsx:30` — `focus:outline-none` with only `focus:border-amber` as replacement. Uses `:focus` (not `:focus-visible`), so it strips the global ring for keyboard users too, leaving a 1 px border-colour change as the sole indicator. Borderline against WCAG 2.4.7 / 1.4.11.

### 9.4 `aria-label` on non-semantic `<div>`s is ignored — **LOW [V]**
`ProjectCard.tsx:166` and `ProjectCard.tsx:54` (`BrandedCover`) place `aria-label` on plain `<div>`s with no `role`. ARIA does not apply `aria-label` to generic elements, so these labels reach no assistive technology. Harmless but ineffective — and the non-live card therefore exposes no accessible name at all.

### 9.5 Latent type hole on `disciplines[0]` — **LOW [V]**
`ProjectCard.tsx:54` indexes `project.disciplines[0]`. `tsconfig.json` enables `strict` but **not `noUncheckedIndexedAccess`**, so the type is `ProjectDiscipline` rather than `| undefined`. An empty `disciplines` array would silently render "… — undefined project".

### 9.6 Interest tiles advertise interactivity they don't have — **LOW [V]**
`InterestTile.tsx:7` is a `<span>` with `hover:border-amber hover:text-amber-bright` but no link, button, or handler. It also isn't a list (`Philosophy.tsx:34-38` uses a `div` of spans) despite being a 10-item collection.

### 9.7 Security controls that are correctly implemented — positive **[V]**
- **7/7** `target="_blank"` links carry `rel="noopener noreferrer"` — no reverse-tabnabbing.
- `encodeURIComponent` on both `mailto:` subject and body — header injection prevented.
- No `dangerouslySetInnerHTML` anywhere; no `eval`; no user input reaches any sink.
- No secrets, tokens, keys, or `.env` files in the repository.
- `prefers-reduced-motion` respected in CSS **and** in every one of the three JS motion modules.

---

## 10. Cost / billing exposure

No prices are asserted — none are documented in this project. **Cost *drivers*** only.

| Driver | Status | Notes |
|---|---|---|
| **Vercel plan** | `hobby` (free) **[V]** | Free today. §8.1 is the real exposure: commercial use on Hobby can force a Pro upgrade or suspension. |
| **Vercel Image Optimization** | **ACTIVE & metered [V]** | `/_next/image` serves the 1.95 MB portrait at multiple widths (`w=256/640/828/…`, `q=75`). Each unique width/quality/format is a transformation. Hobby has a monthly transformation allowance. |
| **Vercel Functions** | 2 Node functions per deploy **[V]** | Rose from 1→2 at the `next/image` commit **[I]**. Invocation-metered. |
| **Bandwidth** | 205 KB/page-view document + fonts + optimized image **[V]** | 56% of the document is redundant RSC payload. |
| **Build minutes** | 30 projects, **3 duplicated** **[V]** | Duplicate projects double builds for `laundry-os`, `luna-beauty-lounge`, `ukdigihub-flagship-nextjs`. Pure waste. |
| **Domain** | `humankumal.com` at Kailash Cloud (Nepal) **[I]** | Annual renewal. DNS delegated to Vercel nameservers (`ns1/ns2.vercel-dns.com`) — verified live earlier in project history. |
| **GSAP** | **£0** | Free at 3.15.0 (§4). |
| **Fonts** | £0 | Self-hosted at build; no runtime Google request **[V]**. |
| **OG images** | £0 at runtime | Generated at build time, served as static PNG. |
| **AI / LLM** | **£0 at runtime** | No model calls in the application. |
| **Database / storage / email service** | **£0** | None exist. |

**Avoidable spend, ranked**
1. Delete the 3 duplicate Vercel projects → immediately halves builds for those repos.
2. Pre-compress the portrait (a ~200–400 KB WebP/AVIF at ~1200 px would be visually identical) → fewer/cheaper transformations and a smaller repo.
3. The 56% RSC duplication is reducible by narrowing `Reveal` (§13) → less bandwidth per view.

**No mechanism in this codebase can produce runaway cost.** There are no loops over paid APIs, no retries, no cron jobs, no queues.

---

## 11. Incomplete / fragile areas

**Explicit `TODO`s [V]** — both in `content/site.ts`:
- `:48` — LinkedIn URL still `"#"` (filtered out of the UI, so it degrades cleanly)
- `:54` — "confirm live UKDIGIHUB URL"

**Placeholder content still outstanding**
- `content/journey.ts:34-35, 44-45, 56-57` — all three education entries have `institutionKnown: false`, so `institution` and `year` ("Institution to be confirmed" / "Year to be confirmed") are **never rendered**. Verified absent from live HTML — the degradation is clean, but the data is dead until filled.
- `content/interests.ts:12-17` — UKDIGIHUB "stats" are qualitative strings ("Small business", "Systems-first", "UK-based") under a `// TODO: replace with real figures` comment. They read as intentional design, not as placeholders — a good save.
- All 10 `image` fields are `""` **[V]** — every card shows a branded cover; no real screenshots exist.

**Looks finished but isn't**
- **The screenshot path has never executed.** `ProjectCard.tsx:113-119` renders a bare `<img>` with no `width`/`height`, no `loading`, and no `next/image` optimization. The first screenshot you add will arrive unoptimized, eager-loaded, and layout-shifting — inconsistent with the correct `next/image` usage in `OriginNepal.tsx:33-39`. **Two different image strategies coexist; only one is exercised.**
- **Two overlapping taxonomies.** `disciplines` (unused, typed, 5 categories) and `tech` (rendered as `Tag`s) overlap heavily — and `tech` is semantically misnamed: it carries "Business System", "Strategy", "Conversion", "Design", "Dashboard", which are not technologies.
- **`gap-3` on a centred eyebrow** (`SectionHeading.tsx:31`) has no second child to space — vestigial from a removed decorative rule.
- **`-z-0`** (`AmbientGlow.tsx:20`) computes to `z-index: 0`; `-z-10` was almost certainly intended. It works only because the glow precedes content in DOM order.
- **`void ScrollTrigger;`** (`Reveal.tsx:77`, `JourneyPath.tsx:62`) — a lint-satisfying no-op for a side-effect import, re-evaluated on every render.
- **`el.style.transition = "none"`** (`Reveal.tsx:38`) is *not* cleared by `clearProps: "all"` (`:63`), so it persists on all 61 wrappers. **Verified harmless** — `transition` is not an inherited CSS property and the wrappers have no transitions of their own — but it is a latent trap for anyone later adding CSS transitions to a `Reveal` wrapper.

**Testing & quality gates — the biggest structural gap [V]**
- **Zero automated tests.** No jest/vitest/playwright/cypress config or dependency.
- **No CI.** No `.github/` at all.
- **No pre-commit hooks, no Prettier config.**
- The **only** gate is Vercel's build, which runs TypeScript type-checking (confirmed in build output). **ESLint is a separate manual `npm run lint`** and is *not* enforced on deploy — so a lint-only regression (including the `jsx-a11y` rules that would flag §9) ships silently.

---

## 12. Testing gaps — highest-value tests for *this* system

Ranked by consequence, not by coverage metrics.

1. **Contact form across real mail environments.** The single conversion path. Test: (a) a 3,000-character message — does it truncate or fail? (b) a machine with **no** default mail handler; (c) iOS Safari, Android Chrome, Gmail-as-handler, Outlook desktop. Then confirm what the visitor *sees* when it fails.
2. **Deploy-path test.** Push a trivial, visible change to `main` and confirm whether `humankumal.com` updates. This directly validates or refutes §7.1 — do this first.
3. **Keyboard-only traversal.** Tab the whole page: confirm focus is visible on all 4 live project cards (§9.1) and that the collapsed mobile menu does not trap 5 invisible links at <768 px (§9.2).
4. **The four live external links.** UKDIGIHUB, LaundryOS, FishOS, LuxeFloor — confirm each resolves and is a page you're happy to be judged on. (Owner confirmed these open correctly during the build session; re-verify periodically since they are separate deployments that can rot.)
5. **Desktop pin behaviour with smooth scrolling.** Click each JourneyPath chapter node, especially while `#the-move` is pinned, and watch for scroll fighting (§8.5).
6. **Orientation change mid-session.** Load on a phone in portrait, rotate to landscape, scroll through `#the-move` — confirms the frozen-breakpoint behaviour.
7. **Reduced-motion pass.** Enable OS "reduce motion", reload, and confirm all content is visible and no pin occurs.
8. **Deep links.** `/#projects`, `/#ukdigihub`, `/#contact` from a cold load (preloader interaction), plus a deliberately malformed `/#1abc` to observe §8.7.
9. **Social share preview.** Run `humankumal.com` through a link-preview validator to confirm the OG PNG renders (**[U]** — not verifiable here).
10. **Lighthouse on mobile.** Specifically LCP, given the 1.2 s preloader and 61 `will-change` layers.

---

## 13. Owner knowledge guide

Written for a technically capable founder, not a career engineer.

### How the system actually works
Your site is **a folder of pre-built files on a CDN**. When someone visits, Vercel hands them finished HTML — no server thinks, no database is queried. The only server work per visit is resizing your portrait.

The practical consequence: **anything your site "says" was decided when it was last built, not when someone visits.** That is why the copyright year is stuck at 2026 (§7.7). Rebuild = republish reality.

### Where important data lives
- **All your words and project data:** `content/` — five TypeScript files. This is your CMS. Editing these is the safest change you can make.
- **All your colours, fonts, spacing:** `app/globals.css` (the `@theme` block, lines 8-29).
- **Your portrait:** `public/images/human-kumal-portrait.png`.
- **The only copy that truly matters:** the **Git repository**. Your site is reproducible from it. Vercel is disposable; GitHub is not.

### What it depends on externally
| Dependency | If it fails |
|---|---|
| **Vercel** | Site offline. No fallback host configured. |
| **GitHub** | Can't deploy changes; live site keeps serving. |
| **Kailash Cloud** (registrar) | Domain lapses → `humankumal.com` stops resolving. **Keep auto-renew on.** |
| **Vercel DNS** (nameservers) | All DNS for the domain fails. |
| **4 external project sites** | Portfolio links break — and you won't be told. |
| **`ukdigihub.co.uk`** | Two CTAs dead-end. |

Note what's *absent*: no database to corrupt, no API key to expire, no third-party script to break your page. That's a genuine strength.

### What to monitor
You currently monitor **nothing** — there is no analytics and no error tracking **[V]**. Minimum worth having:
1. **Uptime check** on `https://humankumal.com` (any free monitor).
2. **Domain expiry** reminder, independent of the registrar's own email.
3. **Vercel usage** page monthly — bandwidth, image transformations, and any plan warnings.
4. **The 4 live project links**, quarterly — they rot silently.
5. Optionally **Vercel Analytics / Speed Insights** (one toggle) for real traffic and Core Web Vitals.

### What you must never change casually
1. **The Vercel Production Branch setting** — until §7.1 is resolved, this is the most load-bearing setting you have.
2. **`content/site.ts` → `url`** — it feeds `metadataBase`, every canonical/OG URL. Wrong value breaks all social previews.
3. **Section `id`s** (`#origins`, `#work`, `#projects`, `#ukdigihub`, `#contact`) — the navbar, the JourneyPath chapter nodes, *and* any link you've ever shared all depend on them. Renaming one silently breaks navigation.
4. **The `data-move-from` / `data-move-arrow` / `data-move-to` attributes and `#the-move`** in `TheMove.tsx` — `ScrollAnimations.tsx` finds them by these exact strings. Rename one and the Nepal→UK sequence stops working with no error.
5. **`education[].place`** — the string `"Nepal"` is what splits content between two sections (§8.8).
6. **`prefers-reduced-motion` guards** in the three motion files — removing them would make the site unusable for motion-sensitive visitors.

### How to diagnose the most likely failures
| Symptom | Most likely cause | First check |
|---|---|---|
| "I pushed a change and the site didn't update" | **§7.1 — production branch is the feature branch** | Vercel → Settings → Git → Production Branch |
| A visitor says the contact form "does nothing" | No mail handler, or message too long (§8.2) | Ask what they clicked and how long the message was; ask them to email you directly |
| Site offline entirely | Vercel plan action, or domain/DNS | Vercel dashboard first, then domain expiry at Kailash |
| Google shows `humankumal.vercel.app` instead of your domain | No canonical tag (§8.4) | `view-source:` and search for `canonical` |
| Nepal→UK animation stopped | A renamed id/attribute in `TheMove.tsx` | Browser console; then compare against the data attributes above |
| Journey rail highlights the wrong chapter | Known behaviour (§8.6) | Not a fault — by design limitation |
| Footer shows the wrong year | Build-time freeze (§7.7) | Redeploy |

### The honest bottom line on AI dependence
You do **not** need a developer to change words, project entries, colours, or the order of projects — those are single-file edits in `content/` and `globals.css`. You **do** need care around the motion layer (`components/motion/`), which is the only genuinely intricate code here: it manipulates the DOM by string selectors, freezes decisions at mount, and interacts with browser scrolling in non-obvious ways.

---

## 14. Reusable / productisation opportunities

Evidence-based, existing assets only — nothing proposed to be built here.

1. **The typed content layer as a portable micro-CMS.** `content/*.ts` with exported interfaces (`Project`, `EducationEntry`, `WorkCategory`, `FutureGoal`, `SocialLink`, `NavItem`) cleanly separates copy from presentation, with zero runtime cost. Directly transplantable to your ~29 other Vercel projects.
2. **The design-token system.** `globals.css:8-29` — a complete Tailwind v4 `@theme` palette + font + easing set, with no `tailwind.config.js`. A ready house style.
3. **The UI kit.** `Section`, `SectionHeading`, `Card`, `Tag`, `Button`, `YearStamp`, `InterestTile`, `AmbientGlow`, `GrainOverlay` — small, prop-driven, dependency-light (only `cn`).
4. **`BrandedCover` (`ProjectCard.tsx:31-91`) is the most productisable single component here.** It solves "I have no screenshot yet" generically: map an id → icon + accent and get a gradient/blueprint-grid cover. Given ~18 unshowcased projects (§7.4), this is immediately reusable.
5. **The build-time OG image generator.** `app/opengraph-image.tsx` + the `twitter-image.tsx` re-export trick — brand-consistent social cards with no design work and no runtime cost. Every one of your projects could use this.
6. **The motion layer as a reusable package.** `Reveal` (reduced-motion-safe, mobile-tuned), `JourneyPath` (scroll-spy chapter rail), `ScrollProgress`, `Preloader` (with the hash-deep-link fix). Note the §7.6 caveat — a reusable version should accept a `className` and wrap *groups*, not every node.
7. **`disciplines` is a filter feature already 80% built** (§7.8) — typed, populated across all 10 projects, just never surfaced.
8. **The strongest strategic opportunity isn't code.** You have **30 deployed applications** and a portfolio that links to **four**. Three "coming soon" cards are already live (§7.3). The `status: "live" | "demo"` mechanism to fix this **already exists** — flipping `status` and setting `href` is a one-line change per project. This is the highest-leverage, lowest-effort change available.

---

## 15. Technical debt — classified

### CRITICAL
*None.* No data loss, security compromise, or systemic failure path exists in this codebase.

### HIGH
| # | Finding | Evidence | Why it matters |
|---|---|---|---|
| H1 | Production deploys from the feature branch, not `main` | §7.1, 15 deployments | Pushes to `main` don't go live; deleting the branch jeopardises production |
| H2 | Commercial site on Vercel Hobby plan | §8.1, `plan: "hobby"` | Possible upgrade demand or suspension → site + lead channel offline |
| H3 | Contact form silent-failure modes | `Contact.tsx:20-27` | Only conversion path; lost leads are invisible to you |
| H4 | 4 live project cards have no focus indicator | `ProjectCard.tsx:154`, 4× in HTML | WCAG 2.4.7 failure on primary links |
| H5 | "Fully static" is no longer true | `/_next/image` in HTML; lambdas 1→2 | Unbudgeted metered resource; wrong mental model |

### MEDIUM
| # | Finding | Evidence |
|---|---|---|
| M1 | No canonical/robots/sitemap across 5 hostnames | §8.4 |
| M2 | Zero tests, no CI; ESLint not enforced on deploy | §11 |
| M3 | README + `lib/gsap.ts` + 2 content comments materially stale | §7.10 |
| M4 | Footer year frozen at build time | `Footer.tsx:4`; literal `2026` in HTML |
| M5 | Collapsed mobile menu keeps 5 links tabbable | `Navbar.tsx:98-118` |
| M6 | `scroll-behavior: smooth` + ScrollTrigger pin/scrub conflict | `globals.css:35` + `ScrollAnimations.tsx:92-108` |
| M7 | Breakpoints frozen at mount; 3 inconsistent definitions | `Reveal.tsx:40`, `ScrollAnimations.tsx:23`, `xl` |
| M8 | Scroll-spy never clears → wrong chapter for 6/11 sections | `JourneyPath.tsx:71-78` |
| M9 | `querySelector(hash)` can throw on malformed fragments | `Preloader.tsx:26` |
| M10 | Education split by `place === "Nepal"` + hardcoded heading | `EducationArc.tsx:7,14` |
| M11 | 61 `will-change` layers at first paint | `globals.css:101` |
| M12 | 3 duplicate Vercel projects doubling builds | §7.5 |
| M13 | Untested `<img>` screenshot path; two image strategies | `ProjectCard.tsx:113-119` vs `OriginNepal.tsx:33-39` |
| M14 | Form fields strip focus ring via `:focus` | `Contact.tsx:30` |
| M15 | ~1.95 MB source PNG committed | `public/images/` |

### LOW
| # | Finding | Evidence |
|---|---|---|
| L1 | Dead CSS: `.is-visible`, `.glow-amber`, `.hairline`, `--ease-out-soft` | §7.9, 0 usages |
| L2 | `disciplines` effectively unused | §7.8 |
| L3 | `aria-label` on plain `<div>`s is ignored | `ProjectCard.tsx:54,166` |
| L4 | `noUncheckedIndexedAccess` off; `disciplines[0]` unguarded | `tsconfig.json` |
| L5 | Email exposed twice in plain HTML | 2× `mailto:` |
| L6 | No security headers configured | `next.config.ts` empty |
| L7 | `InterestTile` hover affordance without interactivity; not a list | `InterestTile.tsx:7` |
| L8 | `-z-0` likely intended `-z-10` | `AmbientGlow.tsx:20` |
| L9 | `tech` overlaps `disciplines` and is semantically misnamed | `content/projects.ts` |
| L10 | `void ScrollTrigger;` no-op on every render | `Reveal.tsx:77`, `JourneyPath.tsx:62` |
| L11 | `transition:none` persists after `clearProps` (currently harmless) | `Reveal.tsx:38,63` |
| L12 | `ScrollProgress` re-renders ~60×/s while scrolling | `ScrollProgress.tsx:17` |
| L13 | `SectionHeading as="h1"` never used; `gap-3` vestigial | `SectionHeading.tsx:9,31` |
| L14 | No custom 404; `/_not-found` is the framework default | Build output |

### INFORMATIONAL
- Public repository; commit history openly records AI co-authorship.
- `AGENTS.md`/`CLAUDE.md` instruct reading `node_modules/next/dist/docs/` — valid only when dependencies are installed (that directory ships with Next 16.2.9 but was absent in this fresh container).
- No `manifest.json` / PWA affordances; no `theme-color`; no `apple-touch-icon`.
- Vercel retains 15 deployments for this project — trivially cheap, useful for instant rollback.
- The OG image uses `fontFamily: "sans-serif"` (`opengraph-image.tsx:23`), **not** the brand fonts, and hardcodes a tagline (`:69-70`) plus the superseded muted colour `#8A92A6` (`:65`) — so the social card will drift from the site's own design tokens.

---

## 16. Project maturity assessment

**Genuinely production-ready**
- Content architecture (`content/` + typed interfaces) — clean, well-organised, safe to edit.
- Design-token system and UI primitives — consistent and coherent.
- Semantic HTML and heading structure — verified correct (1 h1 / 10 h2 / 17 h3).
- External-link hygiene — 7/7 with `rel="noopener noreferrer"`.
- Secrets hygiene — nothing to leak.
- Reduced-motion support — implemented in CSS *and* all three JS motion paths, which is more rigorous than most production sites.
- No-JS resilience — real, with a deliberate `<noscript>` fallback.
- The site is live, on a custom domain, with valid HTTPS, serving correct content.

**Beta-quality**
- **Motion layer.** Functional and verified working, but DOM-coupled by string selectors, frozen at mount, and in documented tension with global smooth scrolling. One bug in this layer (the invisible journey-path fill) already shipped to production and needed a fix.
- **Projects section.** Correct today, but half the cards are placeholders while the underlying deployments exist (§7.3); the taxonomy is redundant; the screenshot path has never run.
- **Accessibility.** Strong intent with three concrete, verified defects (§9.1-9.3).
- **Contact flow.** Works in the happy path; unhandled edge cases on the only conversion path.

**Experimental / vestigial**
- Dead CSS utilities and the `is-visible` remnant of a replaced implementation.
- The unused `disciplines` axis and the unused `SectionHeading as="h1"` prop.
- Qualitative UKDIGIHUB "stats" standing in for real figures.

**Unverified (see §17)**
- Actual social-scraper rendering of the OG image.
- HTTP response headers as served.
- `www` → apex redirect behaviour.
- Real-device motion smoothness and Core Web Vitals under load.

**Overall characterisation.** This is a **well-built small site with a mature content architecture, an ambitious beta-quality motion layer, and an operations/deployment configuration that has not caught up with the code.** The code risk is low and mostly cosmetic; the *operational* risk (deploy branch, hosting plan, unmonitored conversion path) is where real exposure sits. Unusually for AI-assisted work, there is almost no abandoned scaffolding — the debt here is drift and polish, not structural mess.

---

## 17. Prioritised findings

**Do first — verify or resolve within days**
1. **H1** Confirm Vercel's Production Branch; decide whether `main` or the feature branch is your release branch, and align it. Until then, do not delete the `claude/…` branch. *(§7.1)*
2. **H2** Review Vercel's Hobby terms against your commercial use; decide to upgrade or to accept the risk consciously. *(§8.1)*
3. **H3** Harden the contact path: a `maxLength` on the message, visible confirmation/fallback text, and a prominent plain email address. *(§8.2)*

**Do soon — weeks**
4. **H4 / M5 / M14** The three verified accessibility defects. *(§9.1-9.3)*
5. **Strategic (§14.8)** Flip PharmacyOS, HotelOS, PropertyOS to `status: "live"` with their real URLs — the mechanism already exists, and it is the single highest-leverage change available.
6. **M1** Add a canonical URL (and optionally `robots.ts` / `sitemap.ts`). *(§8.4)*
7. **M12 / §10** Delete the 3 duplicate Vercel projects; compress the portrait.
8. **M3** Correct the README and `lib/gsap.ts` — they actively mislead anyone taking over.

**Do when convenient**
9. **M4** Footer year (either accept build-time freeze or make it dynamic).
10. **M2** A minimal CI that runs `npm run lint` and `tsc` on push — the cheapest durable quality win.
11. **M6-M11, M13, M15** Motion robustness, data-model coupling, performance polish.
12. **Monitoring** Uptime check, domain-expiry reminder, Vercel Analytics toggle.

**Optional / cosmetic**
13. All **LOW** items — dead CSS, taxonomy cleanup, `-z-0`, `void ScrollTrigger`, OG-image font/token drift.

---

## 18. Unknown / unverified items

Stated plainly so they are not mistaken for conclusions.

1. **No fresh build was run.** `node_modules` was absent and installing was out of scope. Build-shape claims come from live production HTML and from build output recorded in the project's history. A current `next build` could differ. **[U]**
2. **HTTP response headers as served** — could not capture. Security-header absence is inferred from an empty `next.config.ts` (verified) plus Vercel defaults (not verified). **[U]**
3. **`www` → apex redirect behaviour** — both hostnames are attached; which redirects to which is unverified. **[U]**
4. **OG image rendering in real scrapers** (LinkedIn/X/WhatsApp/Slack) — the route prerenders and meta tags are correct, but no scraper was run. **[U]**
5. **The `"live": false` field** returned by the Vercel project API — meaning not established; I deliberately did not interpret it. **[U]**
6. **Whether `novasmile-dental-clinic` is the portfolio's "DentalOS."** Names and descriptions diverge (a clinic site vs a practice-management system). No `dental-os` project exists on the account. **Owner confirmation needed.** **[U]**
7. **The 4 live external project links** were confirmed working by the owner during the build session, not re-fetched during this audit (egress to non-Vercel hosts is blocked here). **[U]**
8. **The lambda 1→2 attribution to `next/image`** is a strong inference from commit timing, not a direct reading of the function manifest. **[U]**
9. **Real-device performance** — LCP impact of the preloader, and the cost of 61 `will-change` layers on low-end mobile, are reasoned from verified counts, not measured. No Lighthouse run. **[U]**
10. **Actual Vercel usage figures** (bandwidth, transformations, build minutes) — not queried. Cost *drivers* are verified; consumption is not. **[U]**
11. **GSAP licence terms** — stated from general knowledge of the post-3.13 change, not from a licence file in this repo. **[U]**
12. **Whether the ~18 unshowcased projects are portfolio-worthy** — their existence and READY state are verified; their quality and readiness are a judgement only the owner can make. **[U]**

---

## Appendix — self-challenge

*"What important thing could I have missed because I initially misunderstood this project?"*

My initial framing was "a small static portfolio — low risk, little to find." Re-inspecting against that assumption changed five conclusions:

1. **"Static" was wrong.** I had accepted the README's "fully static, no backend." Checking the live HTML revealed `/_next/image` and a second Node function. The site has metered server-side work — which reframed the entire cost section.
2. **I was auditing the code when the real risk was the configuration.** Reading source would never have surfaced that production deploys from the feature branch. That required the Vercel API, and it is now the single highest-priority finding.
3. **I nearly missed the plan/ToS mismatch.** "Hobby plan" reads as a cost *saving*; cross-referencing it against the site's own commercial copy turned it into a business-continuity risk.
4. **I initially treated `Reveal` as a harmless convenience wrapper.** Splitting the document into HTML vs RSC payload showed the client-wrapper pattern is responsible for duplicating the entire page — a 205 KB document for a one-page site. That is an architectural consequence, not a styling detail.
5. **I read the portfolio's own claims as fact.** Six cards say "Case study coming soon." Querying the account showed at least three are already deployed and live, and ~18 further applications exist. The most valuable finding was not a defect at all — it was that **the project under-represents its owner by roughly 7×**.

One correction to my own earlier working assumption: I had noted `sharp` as absent. It is in fact an **optional dependency of `next`** and present in the lockfile — which is precisely what makes local and hosted image optimization work. Corrected in §4.

