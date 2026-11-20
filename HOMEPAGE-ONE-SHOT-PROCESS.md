# PAHINA Homepage (`/`) — One-Shot Process & Improvement Guide

> **Scope:** **Homepage (`/`) only** for now — [`src/app/page.tsx`](./src/app/page.tsx), the homepage sections, the shared layout shell wrapping `/`, and the homepage tokens/assets. Other routes (`/menu`, `/reading-room`, `/about`, `/visit`) are out of scope unless a shared component edit affects them.  
> **Companion Specs:** [`DESIGN.md`](./DESIGN.md), [`PRODUCT.md`](./PRODUCT.md), [`.impeccable/design.json`](./.impeccable/design.json), [`PAHINA-Static-Website-Development-Brief.md`](./PAHINA-Static-Website-Development-Brief.md), and [`AGENTS.md`](./AGENTS.md).

---

## 1. Homepage Scope & File Map

Everything that builds and renders the PAHINA homepage (`/`) lives in these files:

| Role | File | Responsibility on `/` |
| --- | --- | --- |
| App Config | [`next.config.ts`](./next.config.ts) | `cacheComponents: true`, `partialPrefetching: true`, `@tailwindcss/turbopack` CSS rule |
| Root Shell & Fonts | [`src/app/layout.tsx`](./src/app/layout.tsx) | Loads `Bodoni_Moda`, `Instrument_Serif`, `Manrope`; sets metadata; renders skip link, `Navbar`, `<main id="main-content">`, `Footer` |
| Design Tokens & Base CSS | [`src/app/globals.css`](./src/app/globals.css) | Color/font/easing tokens (`@theme inline`), `.font-display`, `.font-editorial`, `.tabular-nums`, `.hover-image-zoom`, reduced-motion rules |
| Homepage Entry | [`src/app/page.tsx`](./src/app/page.tsx) | Server Component assembling the 6 homepage bands + homepage `metadata` |
| Homepage Sections | [`src/components/sections/HomeHero.tsx`](./src/components/sections/HomeHero.tsx) | Band 1: Asymmetric split hero (`<h1>` + CTAs + 3:4 photo) |
| | [`src/components/sections/AtmosphereGallery.tsx`](./src/components/sections/AtmosphereGallery.tsx) | Band 5: Asymmetric 12-col photo collage + Powder Soft quote card |
| | [`src/components/sections/VisitBanner.tsx`](./src/components/sections/VisitBanner.tsx) | Band 6: Rounded closing callout banner |
| Shared Chrome on `/` | [`src/components/layout/Navbar.tsx`](./src/components/layout/Navbar.tsx) | Sticky header (`PAHINA` wordmark, desktop nav, `Visit Us` pill, mobile trigger) |
| | [`src/components/layout/MobileNavigation.tsx`](./src/components/layout/MobileNavigation.tsx) | Full-screen `md:hidden` drawer animated via Framer Motion |
| | [`src/components/layout/Footer.tsx`](./src/components/layout/Footer.tsx) | 3-column editorial footer + placeholder visit details + concept notice |
| UI Primitives on `/` | [`src/components/ui/PrimaryButton.tsx`](./src/components/ui/PrimaryButton.tsx) | Capsule `Link` CTA (`primary`, `secondary`, `powder`) |
| | [`src/components/ui/SectionHeading.tsx`](./src/components/ui/SectionHeading.tsx) | `Bodoni Moda` `<h2>` + `Manrope` description |
| | [`src/components/ui/ImageFeature.tsx`](./src/components/ui/ImageFeature.tsx) | `rounded-2xl border-soft` `next/image` wrapper (`portrait`, `landscape`, `square`) + caption |
| | [`src/components/ui/MenuItem.tsx`](./src/components/ui/MenuItem.tsx) | Horizontal `4:5` menu row card with `Signature`/`Must Try` badge + `tabular-nums` prices |
| | [`src/components/ui/Reveal.tsx`](./src/components/ui/Reveal.tsx) | `"use client"` `whileInView` motion wrapper (`useReducedMotion()` aware) |
| | [`src/lib/utils.ts`](./src/lib/utils.ts) | `cn()` class merger |
| Homepage Data Slices | [`src/data/site.ts`](./src/data/site.ts) | `SITE_INFO`, `NAV_ITEMS`, `VISIT_CTA_LINK`, `ATMOSPHERE_GALLERY_IMAGES` |
| | [`src/data/menu.ts`](./src/data/menu.ts) | `getFeaturedMenuItems()` (4 `featured: true` items out of 39 `MENU_ITEMS`) |

### Tech Snapshot (`package.json`)
- Next.js `16.4.6` (App Router), React `19.3.0`, TypeScript `^5` (`strict: true`), Tailwind CSS `4.3.3`, `@tailwindcss/turbopack` `4.3.3`, Framer Motion `14.14.0`, Lucide React `^1.74.0`.
- Before changing Next.js caching, metadata, or routing APIs, check `node_modules/next/dist/docs/` (per [`AGENTS.md`](./AGENTS.md)).
- On Windows PowerShell, run `npm.cmd` and `npx.cmd` if `npm.ps1` is blocked by execution policy.
- Local repo skills available under `.agents/skills/`: `impeccable`, `frontend-design`, `tailwind-design-system`, `animate`, `review-animations`, `framer-motion-animator`, `nextjs-app-router-patterns`, `seo`, `web-design-guidelines`, `web-quality-audit`.

---

## 2. Homepage Rules & Brand Guardrails

Every edit to the homepage must respect these constraints:

1. **Concept & Restraint:** PAHINA is a fictional, quiet boutique neighborhood book café (*"The Quiet Corner Chapter"*). Never turn `/` into a commercial bookstore, generic café chain, or ecommerce storefront (no cart, checkout, ordering, reservations, accounts, or unconfigured forms).
2. **Zero Fact Fabrication:** Keep footer visit slots as placeholders (`[Café address]`, `[Opening hours]`, `[Phone number]`, `[Social media URL]`), keep the concept disclaimer, and never invent book titles, collection counts, founder bios, ingredients, allergens, or unconfirmed food prices.
3. **Color System (`src/app/globals.css`):**
   - Primary Canvas: `Paper White` (`#F4F1EA` / `--color-paper`)
   - Stepped Surface: `Elevated Paper` (`#FAF8F3` / `--color-surface-elevated`)
   - Primary Ink: `Deep Ink Grey` (`#41474D` / `--color-ink`)
   - Secondary Copy: `Muted Ink` (`#56616B` / `--color-ink-muted`) — **Contrast-First Slate Rule:** never use raw `#8999A6` for readable text.
   - Focused Accents: `Powder Blue` (`#B9D0E0` / `--color-powder`) and `Powder Soft` (`#DCE7EF` / `--color-powder-soft`) — always paired with dark `#41474D` text, never white text, never full-page blue floods.
   - Hairline Borders: `Soft Grey` (`#E8E8E4` / `--color-soft`) — **Single-Boundary Rule:** `1px` borders or flat tonal fills only; zero drop shadows on cards.
4. **Typography (`src/app/layout.tsx` + `src/app/globals.css`):**
   - `Bodoni Moda` (`--font-display`): hero `<h1>`, section `<h2>` headings with intentional upright + `<em className="font-normal italic">` phrasing, card titles, uppercase `PAHINA` wordmark (`tracking-[0.22em]`).
   - `Instrument Serif` (`--font-editorial`): selective italic pull quotes, photo captions, and descriptor lines.
   - `Manrope` (`--font-sans`): nav, body prose, CTA labels, and `tabular-nums` drink pricing.
5. **Anti-Cliché Rules (`DESIGN.md`):** No eyebrow kickers above section headings, no middle-dot (`·`) metadata strings, no floating book/coffee clip-art icons, no paper-grain textures, and no text arrows (`→`) inside buttons.

---

## 3. One-Shot Process: How the Homepage (`/`) Works

The homepage is structured as a sticky header + **6 alternating editorial bands** + footer inside centered `max-w-6xl px-5 sm:px-8` containers:

### Step 1 — Foundation (`globals.css` & `layout.tsx`)
- Define color, font, and easing tokens (`--ease-out`, `--ease-in-out`, `--ease-drawer`) in `globals.css`.
- Load the 3 Google fonts as CSS variables on `<html>`, style `<body>` with `bg-paper text-ink antialiased` and `overflow-x: clip`, add the accessible `Skip to main content` link, and wrap `{children}` with `<Navbar />` and `<Footer />`.

### Step 2 — Homepage Chrome (`Navbar`, `MobileNavigation`, `Footer`)
- **`Navbar`:** Sticky `h-18` Paper White header (`bg-paper/92 backdrop-blur-md` when `scrollY > 10`), uppercase `PAHINA` logo on left, 4 links (`Home`, `Menu`, `Reading Room`, `About`) in center with left-origin `2px` underline on active route, `Visit Us` Powder Blue capsule on right, and `md:hidden` hamburger trigger.
- **`MobileNavigation`:** Full-screen `role="dialog" aria-modal="true"` drawer with `AnimatePresence`, `Escape` handler, body scroll lock, and `useReducedMotion()`.
- **`Footer`:** `bg-soft/45` 12-column grid (`5` brand identity + tagline, `3` Explore links, `4` Visit Details placeholders) + bottom concept notice strip.

### Step 3 — Homepage Band Sequence (`src/app/page.tsx`)

| Band | Component / Section | Background | Grid Structure | Content & Media |
| --- | --- | --- | --- | --- |
| **1. Hero** | `HomeHero` | `bg-paper` (`border-b border-soft`) | `12`-col (`6` text / `6` photo); **no `Reveal` wrapper** so LCP paints immediately | `<h1>` *"Every page / holds a story."* (`text-5xl sm:text-6xl lg:text-[4.25rem]`), *"A quiet place for coffee, books, and curious minds."*, `Discover PAHINA.` (`/about`) + `Explore Our Menu.` (`/menu`), bottom hairline italic quote *"Coffee & Reading Room — Brew a cup. Turn a page."*; right `aspect-[3/4]` `/images/atmospheric/hero-cafe.jpg` (`priority`) over an offset `bg-powder-soft` backdrop (`hidden sm:block`) |
| **2. Brand Intro** | Inline `<section>` in `page.tsx` | `bg-surface-elevated` (`border-b border-soft`) | `Reveal` → `12`-col (`5` heading / `7` prose) | `<h2>` *"A place between pages."*, 2 paragraphs on coffee + slow reading at neighborhood scale, `font-editorial text-2xl italic` pull quote *"“Where coffee meets stories.”"* |
| **3. Featured Menu** | Inline `<section>` in `page.tsx` | `bg-paper` (`border-b border-soft`) | Header row (`SectionHeading` + `View Full Menu`) → `Reveal` → `grid-cols-1 lg:grid-cols-2` | `<h2>` *"Something good is brewing."*, 4 `MenuItem` cards from `getFeaturedMenuItems()` (`Café Latte`, `Biscoff Latte`, `White Chocolate Mocha`, `Salted Caramel Oreo Frappe`), plus bottom note mentioning Aglio Olio, pizza, fries, and all 39 items linking to `/menu` |
| **4. Reading Room Feature** | Inline `<section>` in `page.tsx` | `bg-surface-elevated` (`border-b border-soft`) | `Reveal` → `12`-col `items-center` (`5` portrait image / `7` editorial copy) | `ImageFeature` (`/images/atmospheric/reading-room-nook.jpg`, `aspect="portrait"`), `<h2>` *"Find a story worth staying for."*, 2 paragraphs explaining curated genres and in-café-only reading (no cards/checkouts), `Explore the Reading Room` (`powder` CTA → `/reading-room`) |
| **5. Atmosphere Gallery** | `AtmosphereGallery` | `bg-paper` (`border-b border-soft`) | `SectionHeading` → asymmetric `12`-col grid with per-block `Reveal` (`delay: 0`, `0.05`, `0.05`, `0.1`) | `<h2>` *"Quiet corners and unhurried hours."*; Row 1: `md:col-span-7` landscape `reading-room-hero.jpg` + `md:col-span-5` portrait `cafe-latte.jpg`; Row 2: `md:col-span-5` portrait `reading-room-nook.jpg` + `md:col-span-7` nested `7/5` subgrid (`biscoff-latte.jpg` + `bg-powder-soft` quote block *"“Brew a cup. Turn a page.”"*) |
| **6. Closing CTA** | `VisitBanner` | `bg-paper` | `Reveal` → centered `rounded-3xl border-powder bg-powder-soft/75` card | `<h2>` *"We saved you a seat."*, supporting sentence, `Visit Us` (`primary` → `/visit`) + `Explore Our Menu` (`secondary` → `/menu`) |

### Homepage Image Inventory (Currently Rendered on `/`)
All 7 images currently displayed on `/` are already high-resolution:
- `/images/atmospheric/hero-cafe.jpg` — `896x1200` (803,577 bytes)
- `/images/atmospheric/reading-room-hero.jpg` — `1264x848` (836,153 bytes)
- `/images/atmospheric/reading-room-nook.jpg` — `896x1200` (716,553 bytes)
- `/images/pahina-menu-assets/coffee/cafe-latte.jpg` — `896x1200` (661,478 bytes)
- `/images/pahina-menu-assets/coffee/biscoff-latte.jpg` — `896x1200` (628,754 bytes)
- `/images/pahina-menu-assets/coffee/white-chocolate-mocha.jpg` — `896x1200` (653,066 bytes)
- `/images/pahina-menu-assets/frappuccino/espresso-based/salted-caramel-oreo-frappe.jpg` — `896x1200` (710,381 bytes)

---

## 4. Homepage-Only Improvement Backlog (Prioritized for the Next AI Agent)

### P0 — Content & Visual Freshness on `/`
1. **Eliminate Repeated Photos Across `/` Sections:**
   - `reading-room-nook.jpg` renders in Band 4 (Reading Room Feature) and immediately again in Band 5 (`AtmosphereGallery` `open-pages`).
   - `cafe-latte.jpg` and `biscoff-latte.jpg` render in Band 3 (Featured Menu) and immediately again in Band 5 (`AtmosphereGallery`).
   - **Action:** Replace repeated gallery slots in `ATMOSPHERE_GALLERY_IMAGES` (`src/data/site.ts`) with distinct café/reading/food photography so every frame on `/` feels fresh.
2. **Represent Food in Featured Menu (`Band 3`):**
   - The Featured Menu heading description highlights *"comforting plates like Aglio Olio and warm pizza"*, yet all 4 featured items on `/` are drinks (`Café Latte`, `Biscoff Latte`, `White Chocolate Mocha`, `Salted Caramel Oreo Frappe`).
   - **Blocker to handle first:** All food photos (`pasta/*`, `pizza/*`, `fries/*`) in `public/images/pahina-menu-assets/` are still `83x103`–`112x140` (~5.5–8.4 KB) contact-sheet thumbnails (e.g., `pasta/aglio-olio.jpg` is `112x140`). Generate a high-res photo (`>= 800px` wide at `4:5`) for any food item before marking it `featured: true` in `src/data/menu.ts`.

### P1 — Homepage Layout, Proportions & Consistency
3. **Fix Vertical Asymmetry in `AtmosphereGallery.tsx` (Band 5):**
   - Row 1 puts a `md:col-span-7` `aspect-[3/2]` landscape image beside a `md:col-span-5` `aspect-[3/4]` portrait image. At `1152px`, the `3:2` image is noticeably shorter vertically than the `3:4` portrait beside it, leaving empty space below `reading-room-hero.jpg`.
   - **Action:** Rebalance Row 1/Row 2 proportions (for example, pairing a second element/caption block below the landscape card or tuning column spans/aspect ratios across `md` and `lg`) so the masonry grid feels intentional at every breakpoint.
4. **Keep `HomeHero.tsx` Balanced Above the Fold on Laptop Screens:**
   - The right `aspect-[3/4]` hero image at `lg:col-span-6` grows to ~700px+ tall, which can push the bottom edge of the framed photograph past `1280x720` / `1366x768` viewports.
   - **Action:** Refine hero vertical padding (`lg:py-14`–`lg:py-16`), image aspect/max-height (`aspect-[4/5]` or height cap), and visual alignment with the left copy block.
5. **Center Desktop Nav Geometrically & Unify Token/CTA Details:**
   - [`Navbar.tsx`](./src/components/layout/Navbar.tsx#L39): Replace `flex items-center justify-between` with `md:grid md:grid-cols-[1fr_auto_1fr]` so the 4 center nav links sit dead-center regardless of wordmark vs. `Visit Us` button width.
   - [`HomeHero.tsx`](./src/components/sections/HomeHero.tsx#L23-L27) vs [`VisitBanner.tsx`](./src/components/sections/VisitBanner.tsx#L22-L25): Hero CTAs have trailing periods (`"Discover PAHINA."`, `"Explore Our Menu."`) while other buttons omit them (`"View Full Menu"`, `"Explore the Reading Room"`, `"Visit Us"`). Make punctuation consistent.
   - [`PrimaryButton.tsx`](./src/components/ui/PrimaryButton.tsx#L20-L22), [`Navbar.tsx`](./src/components/layout/Navbar.tsx#L92), [`MobileNavigation.tsx`](./src/components/layout/MobileNavigation.tsx#L116): Replace inline `hover:bg-[#2F353A]` and `hover:bg-[#A6C2D6]` hex strings with CSS variables in `globals.css`.
   - [`src/app/page.tsx`](./src/app/page.tsx#L96): Replace hardcoded `"all 39 items"` with `{MENU_ITEMS.length}`.

### P2 — Accessibility, Semantics & Motion on `/`
6. **Complete Dialog Accessibility in `MobileNavigation.tsx`:**
   - Currently focuses the close button and handles `Escape`, but lacks a `Tab`/`Shift+Tab` focus trap, does not return focus to the hamburger button when closed, and keeps `document.body.style.overflow = "hidden"` active if resized past `768px` (`md`) while open.
7. **Bind `aria-labelledby` Directly to `<h2>` Elements:**
   - In [`src/app/page.tsx`](./src/app/page.tsx#L34) and [`AtmosphereGallery.tsx`](./src/components/sections/AtmosphereGallery.tsx#L16), `id="...-heading"` is placed on wrapper `<div>`s rather than on the `<h2>` itself. Add an optional `id?: string` prop to [`SectionHeading.tsx`](./src/components/ui/SectionHeading.tsx) and pass it straight to `<h2>`.
8. **Review `Reveal.tsx` & Hero Motion:**
   - [`Reveal.tsx`](./src/components/ui/Reveal.tsx) hydrates Framer Motion for a mild `opacity: 0.9 -> 1`, `y: 12 -> 0` transition, while Featured Menu items animate all together as one block. Audit with `.agents/skills/review-animations/SKILL.md` to decide between lightweight CSS scroll reveal vs. subtle card stagger and gentle hero image settle (without delaying `<h1>` / LCP).

### P3 — Social Metadata & Link Previews for `/`
9. **Add Open Graph / Twitter Preview Image:**
   - [`src/app/layout.tsx`](./src/app/layout.tsx#L51-L55) sets `twitter: { card: "summary_large_image" }`, but no `opengraph-image` / `twitter-image` route or image URL is provided yet. Add `src/app/opengraph-image.tsx` or a static `1200x630` card.

---

## 5. Verification Checklist After Homepage Edits

Run these after any changes to `/` or its shared components:

1. `npm.cmd run lint`
2. `npx.cmd tsc --noEmit`
3. `npm.cmd run build`
4. Inspect `/` across `375px` (mobile), `768px` (tablet), and `1280px–1440px` (desktop):
   - Zero horizontal overflow (`scrollWidth <= clientWidth`).
   - Above-the-fold readability and balanced proportions in `HomeHero` and `AtmosphereGallery`.
   - Keyboard-only check: skip link, desktop nav focus rings, mobile drawer open/Tab/Escape/focus restore.
   - `prefers-reduced-motion: reduce` disables reveal movement and hover image zoom.
