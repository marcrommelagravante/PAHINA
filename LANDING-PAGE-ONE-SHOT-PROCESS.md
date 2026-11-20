# PAHINA Landing Page — One-Shot Process & Improvement Guide

> **Audience:** AI coding agents and developers improving the **PAHINA — Coffee & Reading Room** website, with primary focus on the landing page (`/`) and its shared design/layout system.  
> **Companion Specs:** Read alongside [`PAHINA-Static-Website-Development-Brief.md`](./PAHINA-Static-Website-Development-Brief.md), [`DESIGN.md`](./DESIGN.md), [`PRODUCT.md`](./PRODUCT.md), [`.impeccable/design.json`](./.impeccable/design.json), and [`AGENTS.md`](./AGENTS.md).

---

## 1. Purpose of This Document

This file documents the **end-to-end one-shot process** used to design, architect, and assemble the PAHINA landing page (`/`), maps every file and token currently powering it, and provides a **verified improvement backlog and execution protocol** so another AI agent can step in immediately without breaking brand integrity, Next.js 16 conventions, or visual restraint.

---

## 2. Tech Stack & Environment Snapshot

Verified from [`package.json`](./package.json), [`next.config.ts`](./next.config.ts), [`tsconfig.json`](./tsconfig.json), and [`eslint.config.mjs`](./eslint.config.mjs):

| Layer | Choice / Configuration | Notes |
| --- | --- | --- |
| Framework | Next.js `16.4.6` (App Router) | Uses `cacheComponents: true` & `partialPrefetching: true` in `next.config.ts` |
| Bundler | Turbopack (`@tailwindcss/turbopack` `4.3.3`) | `*.css` mapped via Turbopack loader rules |
| UI / Language | React `19.3.0`, TypeScript `^5` (`strict: true`) | Path alias `@/*` → `./src/*` |
| Styling | Tailwind CSS `4.3.3` | Tokenized via CSS vars + `@theme inline` in `src/app/globals.css` |
| Animation | Framer Motion `14.14.0` | Used sparingly in `Reveal` and `MobileNavigation` |
| Icons | Lucide React `^1.74.0` | Used in `Navbar`, `MobileNavigation`, `ReadingRoomShelfIndex`, `VisitInformation` |
| Fonts | `Bodoni_Moda`, `Instrument_Serif`, `Manrope` | Loaded via `next/font/google` in `src/app/layout.tsx` |
| Linting | ESLint `^9` (`eslint-config-next` `16.4.6`) | Ignores `.next/**`, `out/**`, `build/**`, `.agents/**`, `next-env.d.ts` |

### Critical Environment & Next.js Notes
- **Next.js 16.4.6 Docs Rule (`AGENTS.md`):** Before modifying caching, routing, prefetching, or Next.js config, read the local docs inside `node_modules/next/dist/docs/` (especially `01-app/02-guides/adopting-partial-prefetching.md` and `01-app/03-api-reference/04-functions/generate-metadata.md`).
- **Windows PowerShell Note:** If `npm` / `npx` scripts fail with a PowerShell `ExecutionPolicy` error on `npm.ps1`, invoke `npm.cmd` and `npx.cmd` instead.
- **Installed Repo Skills (`.agents/skills/`):** Available locally for any agent to read and follow:
  - Design & UI: `impeccable`, `frontend-design`, `tailwind-design-system`, `web-design-guidelines`
  - Motion: `animate`, `review-animations`, `framer-motion-animator`
  - Architecture & Quality: `nextjs-app-router-patterns`, `seo`, `web-quality-audit`

---

## 3. Non-Negotiable Rules & Guardrails

Before changing a single line of copy, layout, or UI, preserve every constraint below:

1. **Static-First Portfolio Scope:** PAHINA is a **fictional boutique neighborhood book café** portfolio site. Do **not** add a database, auth, cart, checkout, online ordering, table reservations, book lending/inventory checkout, or an unconfigured contact form.
2. **Zero Fact Fabrication:**
   - Keep operational details as explicit placeholders (`[Café address]`, `[Opening hours]`, `[Phone number]`, `[Email address]`, `[Social media URL]`, `[Directions or nearby landmark]`, `[Map Location Placeholder]`, `[Exterior Storefront Photo Placeholder]`).
   - Keep food prices (Pasta, Pizza, Fries) as *"Price to be confirmed"*.
   - Never invent book titles, collection counts, founder biographies, recipes, ingredients, allergens, or customer reviews.
3. **Design System Laws (`DESIGN.md` & `.impeccable/design.json`):**
   - **Creative North Star:** *"The Quiet Corner Chapter"* — calm sunlit editorial publication, never a crowded bookstore, dark espresso cliché, or generic restaurant template.
   - **Contrast-First Slate Rule:** Never use raw Slate Grey (`#8999A6`) for readable body/caption copy on Paper White (`#F4F1EA`). Use Muted Ink (`#56616B`) or Deep Ink Grey (`#41474D`).
   - **Single-Boundary Rule:** Surfaces separate through flat fills (`#F4F1EA`, `#FAF8F3`, `#DCE7EF`) and crisp `1px` borders (`#E8E8E4` or `#B9D0E0`)—**no ambient drop shadows** on cards.
   - **Powder Blue Restraint Rule:** Use `#B9D0E0` / `#DCE7EF` sparingly for focused accents, paired only with dark ink (`#41474D`), never white text, and never flood entire screens in blue.
   - **Anti-Cliché Restraint:** Do not add eyebrow kickers above section headings, middle-dot (`·`) metadata strings, floating book/coffee clip-art icons, paper grain overlays, or text arrows (`→`) inside buttons.

---

## 4. The One-Shot Process: How the Landing Page Was Built

The current landing page (`src/app/page.tsx`) and site shell were produced in a structured **6-phase one-shot pipeline** (captured in commits `bd4d122` and `10b1fac`):

```text
[1. Brand Brief & Assets]
        │
        ▼
[2. Design Tokens & Theme] ──► globals.css + DESIGN.md + .impeccable/design.json
        │
        ▼
[3. Typed Static Data]     ──► src/data/site.ts, menu.ts, books.ts
        │
        ▼
[4. Global Shell & UI]     ──► layout.tsx, Navbar, MobileNavigation, Footer, UI primitives
        │
        ▼
[5. 6-Band Landing Page]   ──► src/app/page.tsx + HomeHero + AtmosphereGallery + VisitBanner
        │
        ▼
[6. Connected Subpages]    ──► /menu, /reading-room, /about, /visit, not-found, robots, sitemap
```

### Phase 1 — Brief & Static Asset Pipeline
- Defined brand voice, 5-route sitemap, 39 menu items across 6 categories, and confirmed copy lines in `PAHINA-Static-Website-Development-Brief.md`.
- Placed bespoke interior photography under `public/images/atmospheric/`:
  - `hero-cafe.jpg` (`896x1200`, ~804 KB)
  - `reading-room-hero.jpg` (`1264x848`, ~836 KB)
  - `reading-room-nook.jpg` (`896x1200`, ~717 KB)
- Placed 39 menu photos under `public/images/pahina-menu-assets/` (12 high-resolution `896x1200` replacements + 27 initial contact-sheet crops; see Section 6 for the exact inventory).

### Phase 2 — Design Tokens & Typography (`src/app/globals.css`, `src/app/layout.tsx`)
- **Color Tokens (`:root` + `@theme inline`):**
  - `--color-paper`: `#F4F1EA` (primary page ground & sticky header)
  - `--color-surface-elevated`: `#FAF8F3` (alternating editorial bands & menu cards)
  - `--color-ink`: `#41474D` (headlines, primary text, primary button fill)
  - `--color-ink-muted`: `#56616B` (accessible secondary copy)
  - `--color-powder`: `#B9D0E0` (Visit Us CTA, Reading Room CTA, `Must Try` badge, hover borders)
  - `--color-powder-soft`: `#DCE7EF` (hero offset frame, quote callout, `Signature` badge, banners)
  - `--color-slate`: `#8999A6` (dashed placeholder borders, scrollbar hover)
  - `--color-soft`: `#E8E8E4` (`1px` structural borders & section dividers)
- **Motion Tokens (`globals.css`):**
  - `--ease-out`: `cubic-bezier(0.23, 1, 0.32, 1)`
  - `--ease-in-out`: `cubic-bezier(0.77, 0, 0.175, 1)`
  - `--ease-drawer`: `cubic-bezier(0.32, 0.72, 0, 1)`
- **Typography (`layout.tsx` + `globals.css`):**
  - `--font-display`: `Bodoni Moda` (`400`, `500`, `600`; normal & italic) — hero headline, section titles, card titles, uppercase `PAHINA` wordmark.
  - `--font-editorial`: `Instrument Serif` (`400`; normal & italic) — pull quotes, captions, subcategory titles, price-unconfirmed notes.
  - `--font-sans`: `Manrope` (`400`, `500`, `600`, `700`) — navigation, body prose, pills, `tabular-nums` pricing.
- **Global Accessibility & Hover Guards (`globals.css`, `layout.tsx`):**
  - Skip link (`Skip to main content` → `#main-content`).
  - `:focus-visible` (`2px solid var(--color-ink)`, `outline-offset: 3px`).
  - `.hover-image-zoom` scoped strictly inside `@media (hover: hover) and (pointer: fine)` and disabled under `@media (prefers-reduced-motion: reduce)`.

### Phase 3 — Typed Data Layer (`src/data/`)
- [`src/data/site.ts`](./src/data/site.ts): Exports `SITE_INFO`, `NAV_ITEMS` (`Home`, `Menu`, `Reading Room`, `About`), `VISIT_CTA_LINK` (`Visit Us` → `/visit`), `VISIT_PLACEHOLDERS` (6 structured items), and `ATMOSPHERE_GALLERY_IMAGES` (4 gallery entries).
- [`src/data/menu.ts`](./src/data/menu.ts): Exports `MENU_CATEGORIES` (6 categories) and `MENU_ITEMS` (39 items), plus `getFeaturedMenuItems()` filtering `item.featured === true`. Currently 4 items are featured on `/`:
  1. `Café Latte` (`SMOL` ₱145 / `MOYEN` ₱160 / `GRANDE` ₱175)
  2. `Biscoff Latte` (`SMOL` ₱145 / `MOYEN` ₱160 / `GRANDE` ₱175)
  3. `White Chocolate Mocha` (`SMOL` ₱145 / `MOYEN` ₱160 / `GRANDE` ₱175)
  4. `Salted Caramel Oreo Frappe` (`16oz` ₱200 / `22oz` ₱215, `Must Try` badge)
- [`src/data/books.ts`](./src/data/books.ts): Exports `BOOK_GENRES` (6 genres), `READING_ROOM_STEPS` (4 steps), and `READING_ROOM_GUIDELINES` (5 rules) used on `/reading-room`.

### Phase 4 — Shared Chrome & UI Primitives
- **Chrome (`src/components/layout/`):**
  - [`Navbar.tsx`](./src/components/layout/Navbar.tsx): Sticky `h-18` Paper White header transitioning to `bg-paper/92 backdrop-blur-md` on scroll (`scrollY > 10`), uppercase `PAHINA` wordmark (`tracking-[0.22em]`), centered desktop links with left-origin `2px` active underline, right `Visit Us` capsule CTA (`bg-powder` inactive, `bg-ink` when on `/visit`), and mobile hamburger button. Drawer state uses `openForPathname === pathname` so navigation closes it cleanly without effect-syncing state.
  - [`MobileNavigation.tsx`](./src/components/layout/MobileNavigation.tsx): Full-screen `md:hidden` modal drawer animated via Framer Motion `AnimatePresence` (`ease: [0.32, 0.72, 0, 1]`), supporting `Escape`, body scroll lock, and `useReducedMotion()`.
  - [`Footer.tsx`](./src/components/layout/Footer.tsx): `bg-soft/45` 12-col footer (`5` brand story/tagline, `3` Explore links, `4` Visit Details placeholders) plus bottom concept notice bar.
- **UI Primitives (`src/components/ui/`):**
  - [`PrimaryButton.tsx`](./src/components/ui/PrimaryButton.tsx): Capsule `Link` button (`min-h-[44px]`) in `primary`, `secondary`, and `powder` variants with `active:scale-[0.97]`.
  - [`SectionHeading.tsx`](./src/components/ui/SectionHeading.tsx): Standardized `max-w-2xl` `<h2>` (`Bodoni Moda`) + optional lead paragraph (`Manrope`).
  - [`ImageFeature.tsx`](./src/components/ui/ImageFeature.tsx): Framed `rounded-2xl border-soft` responsive `next/image` wrapper (`portrait` `3/4`, `landscape` `3/2`, `square`) with optional italic `Instrument Serif` `<figcaption>` and `.hover-image-zoom`.
  - [`MenuItem.tsx`](./src/components/ui/MenuItem.tsx): Horizontal editorial card (`rounded-xl border-soft bg-surface-elevated`) with fixed `4:5` thumbnail (`w-24 sm:w-[104px]`), `Bodoni Moda` title, optional `Signature`/`Must Try` pill, and `tabular-nums` price table or italic *"Price to be confirmed"* footer.
  - [`Reveal.tsx`](./src/components/ui/Reveal.tsx): Client wrapper (`"use client"`) using Framer Motion `whileInView` (`initial={{ opacity: 0.9, y: 12 }}` → `y: 0`, `once: true`, `amount: 0.12`, `0.48s` `--ease-out`) with `useReducedMotion()` fallback to a plain `<div>`.

### Phase 5 — Landing Page (`/`) Band-by-Band Blueprint (`src/app/page.tsx`)

All content sits inside centered `max-w-6xl px-5 sm:px-8` containers, alternating `bg-paper` and `bg-surface-elevated` separated by `border-b border-soft`:

| # | Section / Component | Surface | Layout & Grid | Key Elements & Copy | Media Used |
| --- | --- | --- | --- | --- | --- |
| 1 | `HomeHero` (`src/components/sections/HomeHero.tsx`) | `bg-paper` | `12`-col (`6` text / `6` photo), no scroll-reveal wrapper so LCP renders immediately | `<h1>` *"Every page / holds a story."* (`4.25rem` lg, upright + italic), *"A quiet place for coffee, books, and curious minds."*, `Discover PAHINA.` (`/about`) + `Explore Our Menu.` (`/menu`), bottom hairline descriptor line | `/images/atmospheric/hero-cafe.jpg` (`aspect-[3/4]`, `priority`) + `hidden sm:block` offset `bg-powder-soft` backdrop |
| 2 | Brand Introduction (`src/app/page.tsx`) | `bg-surface-elevated` | `Reveal` wrapping `12`-col (`5` heading / `7` prose) | `<h2>` *"A place between pages."*, 2 narrative paragraphs, italic pull quote *"Where coffee meets stories."* | None |
| 3 | Featured Menu (`src/app/page.tsx`) | `bg-paper` | Header flex row (`SectionHeading` + `View Full Menu`), `Reveal` wrapping `grid-cols-1 lg:grid-cols-2` | `<h2>` *"Something good is brewing."*, 4 `MenuItem` cards (`getFeaturedMenuItems()`), kitchen note linking to `/menu` | `cafe-latte.jpg`, `biscoff-latte.jpg`, `white-chocolate-mocha.jpg`, `salted-caramel-oreo-frappe.jpg` (all `896x1200`) |
| 4 | Reading Room Feature (`src/app/page.tsx`) | `bg-surface-elevated` | `Reveal` wrapping `12`-col (`5` photo / `7` prose) | Portrait `ImageFeature`, `<h2>` *"Find a story worth staying for."*, 2 paragraphs on in-café reading rules (no cards/checkouts), `Explore the Reading Room` (`powder` CTA → `/reading-room`) | `/images/atmospheric/reading-room-nook.jpg` (`896x1200`) |
| 5 | `AtmosphereGallery` (`src/components/sections/AtmosphereGallery.tsx`) | `bg-paper` | `SectionHeading` + asymmetric `12`-col grid with per-tile `Reveal` (`delay: 0.05` / `0.1`) | `<h2>` *"Quiet corners and unhurried hours."*; Row 1: `7` landscape + `5` portrait; Row 2: `5` portrait + `7` nested `7/5` subgrid (`ImageFeature` + `bg-powder-soft` quote card *"Brew a cup. Turn a page."*) | `reading-room-hero.jpg`, `cafe-latte.jpg`, `reading-room-nook.jpg`, `biscoff-latte.jpg` |
| 6 | `VisitBanner` (`src/components/sections/VisitBanner.tsx`) | `bg-paper` | `Reveal` wrapping centered `rounded-3xl border-powder bg-powder-soft/75` card | `<h2>` *"We saved you a seat."*, description, `Visit Us` (`primary` → `/visit`) + `Explore Our Menu` (`secondary` → `/menu`) | None |

---

## 5. One-Shot Blueprint Spec (For Recreating or Refactoring `/`)

If an AI agent needs to rebuild, restyle, or cleanly refactor `/` in one shot while preserving architecture:

1. **Keep `src/app/page.tsx` a React Server Component.** Only interactive islands or motion wrappers (`Navbar`, `MobileNavigation`, `Reveal`) use `"use client"`.
2. **Maintain strict 3-layer separation:**
   - Content/data in `src/data/*` (never duplicate menu or brand strings inline).
   - Reusable visual atoms in `src/components/ui/*`.
   - Page-band sections in `src/components/sections/*`.
3. **Preserve typographic rhythm:** Every major heading combines upright `Bodoni Moda` with selective `<em className="font-normal italic">` emphasis on the emotional turn of phrase (`holds a story.`, `between pages.`, `is brewing.`, `worth staying for.`, `unhurried hours.`, `a seat.`).
4. **Preserve surface alternation:** Alternate `bg-paper` (`#F4F1EA`) and `bg-surface-elevated` (`#FAF8F3`) across full-bleed `border-b border-soft` sections, reserving `bg-powder-soft` (`#DCE7EF`) for high-value focal cards (hero backdrop, atmosphere pull-quote card, closing `VisitBanner`).
5. **Respect `cacheComponents` & `partialPrefetching`:** Because `next.config.ts` enables both, any future dynamic data (`params`, `searchParams`, runtime reads) must stay inside `<Suspense>` or `'use cache'` boundaries per `node_modules/next/dist/docs/01-app/02-guides/adopting-partial-prefetching.md`.

---

## 6. Verified Codebase Audit & Improvement Backlog

Every item below was directly observed in the current repository and prioritized for the next AI agent.

### Priority 0 — Visual Asset Gaps (High Impact on `/` and `/menu`)

1. **27 of 39 Menu Assets Are Still Low-Res Contact-Sheet Thumbnails**
   - **Current state in `public/images/pahina-menu-assets/`:**
     - **12 high-resolution (`896x1200`, 629–735 KB):** `coffee/` (`biscoff-latte`, `cafe-americano`, `cafe-latte`, `cafe-mocha`, `cappuccino`, `vanilla-latte`, `white-chocolate-mocha`) and `frappuccino/espresso-based/` (`caramel-frappe`, `hazelnut-frappe`, `java-chip-frappe`, `mocha-frappe`, `salted-caramel-oreo-frappe`).
     - **27 low-resolution (`83x103` to `149x186`, 4.8–10.8 KB):** `coffee/` (`affogato`, `caramel-espresso-con-panna`, `caramel-macchiato`, `hazelnut-latte`, `oreo-dalgona`, `spanish-latte`), `non-coffee/` (`signature-chocolate`, `strawberry-milk-latte`), `frappuccino/espresso-based/lotus-biscoff-frappe.jpg`, all 5 `frappuccino/cream-based/*`, all 5 `pasta/*`, all 4 `pizza/*`, and all 4 `fries/*`.
   - **Impact on `/`:** The Featured Menu on `/` only displays 4 drinks right now, even though its copy highlights *"comforting plates like Aglio Olio and warm pizza"* and `PAHINA-Static-Website-Development-Brief.md` (`6.1.4`) requests **both drinks and food**. Food items cannot safely be featured until their `84–112px` thumbnails are replaced with crisp high-res photography (`>= 800px` wide at `4:5` or `3:4`).
2. **Image Repetition on the Landing Page (`/`)**
   - **Observation:** `reading-room-nook.jpg` appears in Section 4 (Reading Room Feature) and immediately again in Section 5 (`AtmosphereGallery` `open-pages`). `cafe-latte.jpg` and `biscoff-latte.jpg` appear in Section 3 (Featured Menu) and immediately again in Section 5 (`AtmosphereGallery`).
   - **Improvement:** Generate 2–3 distinct bespoke café lifestyle scenes (e.g., an Aglio Olio / pasta reading-table scene and a pastry/espresso-on-oak scene) for `AtmosphereGallery` and swap at least one featured item in `src/data/menu.ts` to a savory plate (e.g., `aglio-olio`) once high-res food photos are ready.
3. **Repository Asset Hygiene**
   - **Observation:** Root [`pahina-menu-assets/`](./pahina-menu-assets/) duplicates the original low-res set alongside `public/images/pahina-menu-assets/`, and `public/images/pahina-menu-assets/README.txt` is publicly served as a static asset.
   - **Improvement:** Remove or archive the redundant root folder and move `README.txt` out of `public/`.

### Priority 1 — Landing Page Layout, Proportions & UI Polish

4. **Asymmetric Row Imbalance in `AtmosphereGallery.tsx`**
   - **Observation:** In [`src/components/sections/AtmosphereGallery.tsx`](./src/components/sections/AtmosphereGallery.tsx#L28-L82), Row 1 pairs a `md:col-span-7` `aspect-[3/2]` image beside a `md:col-span-5` `aspect-[3/4]` image. At `1152px` width, the `7`-col landscape image is significantly shorter vertically than the `5`-col portrait image, creating an awkward blank space beneath `reading-room-hero.jpg`.
   - **Improvement:** Either align Row 1 heights deliberately (e.g., `aspect-[4/3]` + caption or a companion editorial note/pair in the left column, or `md:items-stretch` with matched aspect ratios across the masonry columns) and verify visually across `768px`, `1024px`, and `1440px`.
5. **Hero Vertical Proportions on Standard Laptop Viewports (`HomeHero.tsx`)**
   - **Observation:** In [`src/components/sections/HomeHero.tsx`](./src/components/sections/HomeHero.tsx#L43), the `lg:col-span-6` image container uses `aspect-[3/4]` without a `max-h` cap, making the photo ~700px+ tall on desktop, which can clip the bottom frame edge on `1280x720` or `1366x768` screens.
   - **Improvement:** Constrain or balance hero spacing/aspect (e.g., `lg:py-14` / `aspect-[4/5]` or `max-h-[76vh]`) so the headline, CTAs, descriptor line, and full framed photograph sit comfortably above the fold.
6. **Header Centering, Sticky Offset Coupling & Button Copy Consistency**
   - **Observation (`Navbar.tsx`):** [`src/components/layout/Navbar.tsx`](./src/components/layout/Navbar.tsx#L39) uses `flex items-center justify-between`, so `<nav>` shifts slightly because `PAHINA` wordmark width differs from the `Visit Us` pill width. Changing the desktop bar to `md:grid md:grid-cols-[1fr_auto_1fr]` centers the 4 links geometrically.
   - **Observation (`MenuExplorer.tsx`):** [`src/components/sections/MenuExplorer.tsx`](./src/components/sections/MenuExplorer.tsx#L29) hardcodes `top-[73px]` to clear the `h-18` + `1px` border header. Replace with a shared CSS variable (e.g. `--header-height: 4.5rem`).
   - **Observation (`HomeHero.tsx` vs `VisitBanner.tsx`):** Hero buttons include trailing periods (`"Discover PAHINA."`, `"Explore Our Menu."`), whereas all other CTAs omit them (`"View Full Menu"`, `"Explore the Reading Room"`, `"Visit Us"`). Standardize per brand preference.
7. **Eliminate Remaining Hardcoded Hex Colors & Hardcoded Menu Count**
   - **Observation:** `hover:bg-[#2F353A]` ([`PrimaryButton.tsx`](./src/components/ui/PrimaryButton.tsx#L20), [`MobileNavigation.tsx`](./src/components/layout/MobileNavigation.tsx#L116)) and `hover:bg-[#A6C2D6]` ([`Navbar.tsx`](./src/components/layout/Navbar.tsx#L92), [`PrimaryButton.tsx`](./src/components/ui/PrimaryButton.tsx#L22)) live inline rather than as `--color-ink-hover` / `--color-powder-hover` tokens in `globals.css`.
   - **Observation:** [`src/app/page.tsx`](./src/app/page.tsx#L96) hardcodes `"all 39 items"` instead of `{MENU_ITEMS.length}`.

### Priority 2 — Accessibility, Semantics & Motion Refinement

8. **Focus Trap & Focus Restoration in `MobileNavigation.tsx`**
   - **Observation:** [`src/components/layout/MobileNavigation.tsx`](./src/components/layout/MobileNavigation.tsx#L24-L43) moves focus to the close button and listens for `Escape`, **but** does not trap `Tab`/`Shift+Tab` inside the `aria-modal="true"` dialog, does not restore focus back to the navbar trigger button upon close, and leaves `document.body.style.overflow = "hidden"` active if a user resizes past `md` (`768px`) while open.
   - **Improvement:** Implement a clean focus trap, return focus to the opener ref on close, and auto-close or clear `overflow` above `768px`.
9. **Attach `aria-labelledby` IDs Directly to `<h2>` Headings**
   - **Observation:** In [`src/app/page.tsx`](./src/app/page.tsx#L34), [`AtmosphereGallery.tsx`](./src/components/sections/AtmosphereGallery.tsx#L16), [`reading-room/page.tsx`](./src/app/reading-room/page.tsx#L49), and [`MenuCategory.tsx`](./src/components/ui/MenuCategory.tsx#L22), `id="...-heading"` sits on a wrapper `<div>` around `<SectionHeading />`.
   - **Improvement:** Add an optional `id?: string` prop to [`SectionHeading.tsx`](./src/components/ui/SectionHeading.tsx) and assign it directly to the `<h2>`.
10. **Audit Framer Motion Footprint & Reveal Choreography (`Reveal.tsx`)**
    - **Observation:** [`Reveal.tsx`](./src/components/ui/Reveal.tsx) hydrates `framer-motion` solely for a subtle `opacity: 0.9 -> 1`, `y: 12 -> 0` entrance. Meanwhile, `HomeHero` has zero motion and `Featured Menu` animates as a single block rather than refined, subtle card rhythm.
    - **Improvement:** Run `.agents/skills/review-animations/SKILL.md` to decide whether to either (a) add a lightweight CSS-only reveal / `MotionConfig reducedMotion="user"` to trim client JS on static pages, or (b) add subtle staggered item motion in Featured Menu and a crisp hero media reveal that preserves instant `<h1>` LCP.

### Priority 3 — SEO, Social Sharing & Shared Utilities

11. **Missing Open Graph / Twitter Card Image**
    - **Observation:** [`src/app/layout.tsx`](./src/app/layout.tsx#L51-L55) specifies `twitter: { card: "summary_large_image" }`, but no `opengraph-image` / `twitter-image` file or `openGraph.images` is configured, so link shares show no preview photo.
    - **Improvement:** Add `src/app/opengraph-image.tsx` (or a static curated `1200x630` editorial card referencing `hero-cafe.jpg` / PAHINA wordmark) and verify rendered metadata.
12. **Deduplicate `getSiteUrl()` Helper**
    - **Observation:** URL environment resolution (`NEXT_PUBLIC_SITE_URL` / `VERCEL_PROJECT_PRODUCTION_URL` / `http://localhost:3000`) is duplicated across [`layout.tsx`](./src/app/layout.tsx#L31-L35), [`robots.ts`](./src/app/robots.ts#L3-L11), and [`sitemap.ts`](./src/app/sitemap.ts#L3-L11). Consolidate into `src/lib/site-url.ts`.

---

## 7. Recommended Workflow for the Next AI Agent

When tasked with improving the PAHINA landing page:

1. **Read context first:** Read this document, `DESIGN.md`, `PRODUCT.md`, and relevant `.agents/skills/*/SKILL.md` (`frontend-design`, `impeccable`, `review-animations`, `web-quality-audit`, `seo`).
2. **Plan scoped edits:** Avoid breaking `/menu`, `/reading-room`, `/about`, or `/visit` when modifying shared tokens or primitives (`SectionHeading`, `PrimaryButton`, `ImageFeature`, `Reveal`, `Navbar`, `Footer`).
3. **Verify strictly after edits:**
   - Lint: `npm.cmd run lint`
   - Typecheck: `npx.cmd tsc --noEmit`
   - Production build: `npm.cmd run build`
   - Runtime check: Inspect `/` at `375px` (mobile), `768px` (tablet), and `1280px–1440px` (desktop), verifying zero horizontal overflow, keyboard navigation (`Tab`, `Shift+Tab`, `Escape`), focus indicators, `prefers-reduced-motion: reduce`, and image crispness (`naturalWidth >= renderedWidth * DPR`).
4. **Update documentation if architecture shifts:** Keep `DESIGN.md`, `.impeccable/design.json`, and this file aligned whenever tokens, featured items, or landing page sections change.
