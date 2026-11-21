---
name: PAHINA — Coffee & Reading Room
description: Warm editorial neighborhood book café pairing Paper White surfaces, Deep Ink Grey typography, and Powder Blue accents.
colors:
  paper-white: "#F4F1EA"
  surface-elevated: "#FAF8F3"
  deep-ink-grey: "#41474D"
  ink-muted: "#56616B"
  powder-blue: "#B9D0E0"
  powder-soft: "#DCE7EF"
  slate-grey: "#8999A6"
  soft-grey: "#E8E8E4"
typography:
  display:
    fontFamily: "Bodoni Moda, Georgia, serif"
    fontSize: "4.25rem"
    fontWeight: 400
    lineHeight: 1.03
    letterSpacing: "-0.025em"
  headline:
    fontFamily: "Bodoni Moda, Georgia, serif"
    fontSize: "2.25rem"
    fontWeight: 400
    lineHeight: 1.12
    letterSpacing: "-0.02em"
  editorial:
    fontFamily: "Instrument Serif, Georgia, serif"
    fontSize: "1.5rem"
    fontWeight: 400
    lineHeight: 1.35
  body:
    fontFamily: "Manrope, -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.625
  label:
    fontFamily: "Manrope, -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 500
    lineHeight: 1.4
rounded:
  card-thumb: "8px"
  card: "12px"
  feature: "16px"
  banner: "24px"
  pill: "9999px"
spacing:
  xs: "8px"
  sm: "16px"
  md: "24px"
  lg: "40px"
  xl: "64px"
  section: "96px"
components:
  button-primary:
    backgroundColor: "{colors.deep-ink-grey}"
    textColor: "{colors.paper-white}"
    rounded: "{rounded.pill}"
    padding: "10px 24px"
  button-powder:
    backgroundColor: "{colors.powder-blue}"
    textColor: "{colors.deep-ink-grey}"
    rounded: "{rounded.pill}"
    padding: "10px 24px"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.deep-ink-grey}"
    rounded: "{rounded.pill}"
    padding: "10px 24px"
  menu-card:
    backgroundColor: "{colors.surface-elevated}"
    textColor: "{colors.deep-ink-grey}"
    rounded: "{rounded.card}"
    padding: "20px"
---

# Design System: PAHINA — Coffee & Reading Room

## Overview

**Creative North Star: "The Quiet Corner Chapter"**

PAHINA translates an independent neighborhood book café into a calm, sunlit digital publication. Instead of commercial storefront density or dark espresso clichés, surfaces open like warm uncoated book pages (`Paper White`) framed by muted architectural blue-grey accents (`Powder Blue`) and grounded editorial ink (`Deep Ink Grey`). Every screen prioritizes breathing room, legible typography, and authentic café photography over ornamental badges or stock restaurant widgets.

**Key Characteristics:**
- Tactile uncoated paper ground paired with crisp hairline divisions rather than drop shadows.
- Intentional upright-and-italic Bodoni Moda display headlines paired with restrained Instrument Serif editorial quotes and Manrope UI text.
- Strict fidelity to confirmed facts and transparent, unhurried presentation of placeholder details.

## Colors

The palette stays strictly anchored to PAHINA's five approved colors plus contrast-safe tonal extensions within the exact same blue-grey and warm-paper family.

### Primary
- **Powder Blue** (`#B9D0E0`): Used sparingly for primary Visit CTA pills, active `Must Try` chips, subtle framed backdrops, and decorative accents (`The Restraint Rule`: always paired with dark ink text, never white text).
- **Powder Soft** (`#DCE7EF`): Soft tint of Powder Blue used for active shelf highlights, notice banners, and closing invitation surfaces.

### Neutral
- **Paper White** (`#F4F1EA`): Primary page ground across all five routes and sticky header surfaces.
- **Elevated Paper** (`#FAF8F3`): Subtle stepped paper surface for menu rows, Reading Room step cards, and secondary editorial bands.
- **Deep Ink Grey** (`#41474D`): Primary body ink, display headings, primary button fills, and active tab pills (8.28:1 contrast on Paper White).
- **Muted Ink** (`#56616B`): Accessible dark-slate ink for secondary descriptions, metadata, and price notes (>5.5:1 contrast on Paper White).
- **Slate Grey** (`#8999A6`): Reserved for dashed placeholder borders, subtle non-text rules, and scrollbar hover states.
- **Soft Grey** (`#E8E8E4`): 1px structural dividers, section rules, and card outlines.

**The Contrast-First Slate Rule.** Raw Slate Grey (`#8999A6`) is never used for readable body or caption text on Paper White; readable muted copy uses dark-shifted Slate (`#56616B`) so every text element exceeds WCAG 4.5:1 contrast.

## Typography

**Display Font:** `Bodoni Moda` (with Georgia, serif fallback)
**Editorial Quote Font:** `Instrument Serif` (with Georgia, serif fallback)
**Body & UI Font:** `Manrope` (with system sans-serif fallback)

**Character:** Classic high-contrast Didone editorial serifs establish literary authority and calm pacing, while geometric humanist Manrope handles menu price tables, navigation links, and mobile tap targets cleanly.

### Hierarchy
- **Display** (`400`, `3rem–4.25rem`, `1.03` line-height, `-0.025em` tracking): Home hero and major page statements combining upright and italic phrasing.
- **Headline** (`400`, `1.875rem–2.25rem`, `1.12` line-height, `-0.02em` tracking): Section titles across Home, Menu categories, Reading Room, and About.
- **Editorial** (`400` italic, `1.25rem–1.75rem`, `1.35` line-height): Selective pull quotes, figure captions, subcategory headings, and *"Price to be confirmed"* notices.
- **Body** (`400`, `1rem–1.125rem`, `1.625` line-height): Narrative paragraphs and reading guidelines capped around 65–75ch.
- **Label & Tabular Data** (`500`, `0.75rem–0.875rem`, `1.4` line-height): Navigation links, category pills, and `tabular-nums` drink price rows.

## Layout

Content lives inside a centered `max-w-6xl` (`1152px`) reading container with `20px` mobile and `32px` tablet/desktop horizontal gutters. Desktop navigation centers the four core routes (`Home`, `Menu`, `Reading Room`, `About`) between the left uppercase `PAHINA` wordmark and right `Visit Us` pill. Multi-column grids collapse smoothly to single-column stacks on small viewports with zero horizontal overflow.

## Elevation & Depth

PAHINA is **flat and hairline-divided by default**. Hierarchy comes from paper surface shifts (`#F4F1EA` vs `#FAF8F3` vs `#DCE7EF`) and crisp `1px` borders (`#E8E8E4` or `#B9D0E0`), avoiding drop shadows under cards so every surface reads like printed stationery.

**The Single-Boundary Rule.** Containers declare elevation once via a clean `1px` border or surface fill—never a `1px` border paired with an ambient box-shadow.

## Shapes

- **Menu Image Thumbnails:** `8px` radius (`rounded-lg`) in strict `4:5` portrait aspect (`96–104px` wide).
- **Menu Cards, Placeholder Cards & Steps:** `12px` radius (`rounded-xl`) with `1px` Soft Grey outline.
- **Feature Photographs & Interactive Panels:** `16px` radius (`rounded-2xl`).
- **Closing Callout Banners:** `24px` radius (`rounded-3xl`).
- **Interactive Buttons & Filter Pills:** Full capsule radius (`9999px`) with `min-height: 40–48px` touch targets.

## Components

### Buttons
- **Shape:** Full capsule (`9999px`) with `10px 24px` padding and tactile `scale(0.97)` active press (`150ms` `cubic-bezier(0.23, 1, 0.32, 1)`).
- **Primary:** Deep Ink Grey fill (`#41474D`) with Paper White text (`#F4F1EA`).
- **Powder Accent:** Powder Blue fill (`#B9D0E0`) with Deep Ink Grey text (`#41474D`).
- **Secondary:** Transparent fill with subtle Ink outline (`25%` opacity) transitioning to solid Ink border on hover.

### Menu Item Row
- **Style:** Flat printed-menu ledger row on Paper White (`border-b border-soft py-5`), never boxed cards with shadows.
- **Structure:** Compact `76–80px` `4:5` portrait thumbnail (`rounded-lg`) beside Bodoni Moda item title, optional `Signature` (`#DCE7EF`) or `Must Try` (`#B9D0E0`) pill, and `tabular-nums` size/price table (`SMOL 12oz Hot`, `MOYEN 16oz Iced`, `GRANDE 22oz Iced`).
- **Category Intros:** Each category opens with an editorial heading, a `MarginNote` serving note, and a staggered `DrinkShowcase` (up to 3 standout items, badged first) before the hairline ledger.

### Navigation & Footer Bookends
- Fixed transparent header (`h-18`) floating over the honed-marble hero backdrop at scroll `0` across all five routes, transitioning smoothly to a frosted Paper White bar (`bg-paper/95 backdrop-blur-md border-soft`) after `10px` of scroll.
- Centered `13px` links (`tracking-[0.04em]`) carry a left-origin `1px` hairline active underline; `Visit Us` pill anchors the right edge; full-screen mobile drawer (`cubic-bezier(0.32, 0.72, 0, 1)`) supports `Escape` close.
- Site footer mirrors the opening marble stage as a matching bookend: a Paper White editorial sheet (`rounded-[6px] border border-soft`) resting on `paper-marble.jpg`.

## Do's and Don'ts

### Do:
- **Do** keep `Paper White (#F4F1EA)` as the primary canvas and reserve `Powder Blue (#B9D0E0)` for focused accents, callouts, and interactive selections.
- **Do** pair upright and italic words intentionally in Bodoni Moda display headlines (`Every page` *`holds a story.`*).
- **Do** keep menu rows clean (`name`, `sizes/prices`, `photo`, optional `Signature`/`Must Try` pill) with `tabular-nums` price alignment.

### Don't:
- **Don't** add eyebrow kickers above section headings, middle-dot meta strings, or text arrows (`→`) inside buttons.
- **Don't** flood entire screens with blue backgrounds or introduce unrelated warm/terracotta accent colors.
- **Don't** stretch contact-sheet thumbnail assets beyond compact editorial row sizes without replacing them at high resolution.

---

## Borderless Print-Magazine Architecture (All Five Routes)

All five routes (`/`, `/menu`, `/reading-room`, `/about`, `/visit`) plus `/_not-found` share **one unbroken Paper White (`#F4F1EA`) canvas** inspired by editorial print spreads—removing boxed marble cards, alternating background stripes, and heavy horizontal section dividers.

### Shared Visual & Typographic Grammar
- **8:1 Editorial Scale Contrast:** Monumental stacked `Bodoni Moda` headlines (`clamp(3.2rem, 7.2vw, 6.35rem)`, `leading-[0.98]`, `tracking-[-0.03em]`) paired with narrow `12px–13px` micro-prose columns (`max-w-[250px–300px]`), whisper-quiet `10px` tracked uppercase margin facts (`MENU / 39 ITEMS`, `SHELVES / 6 GENRES`, `BOOKS / READ IN, RETURN BEFORE LEAVING`), and razor-thin `1px` rectangular buttons ([EditorialButton.tsx](file:///c:/Users/ezrxe/OneDrive/Documents/GitHub/PAHINA/src/components/home/EditorialButton.tsx), `rounded-[2px]`).
- **Borderless Floating Photography:** Inscribed radial edge-feather masks (`.feather-oval`, `.feather-tight`, `.feather-wide` with `<= 49%` radii) dissolve studio flat-lays and cutouts smoothly into `#F4F1EA` before reaching their box boundaries.
- **Floating Italic Navigation & Minimal Colophon Footer:** Understated `PAHINA` emblem + wordmark left with bare spaced italic `Instrument Serif` links (`Home`, `Menu`, `Reading Room`, `About`, `Visit`) carrying a gliding `1px` `layoutId` active underline, paired with a borderless single-hairline Paper White footer colophon.

### Route Compositions
- **Home (`/`):** Blank-canvas staggered entrance → angled borderless `HomeMagazineHero` → 4-corner wrap-around `HomeWrapStory` → borderless `HomeOverheadInterlude` → open-canvas asymmetric `ScatteredMenuSpread` (Caramel Macchiato, Spanish Latte, Signature Chocolate opening portaled `TastingSheetModal`) → `HomeReadingFinale`.
- **Menu (`/menu`):** Borderless printed-menu hero with 6-category jump list → minimal italic sticky filter bar docked flush at `top-18` with `House Picks` toggle → staggered borderless category mini-showcases + `EditorialBanner` kitchen interlude + hairline printed-menu ledger for all 39 items.
- **Reading Room (`/reading-room`):** Unbroken Paper White open-book spread (`ReadingRoomBookHero`) with hairline center spine and live Bookmark Preview → 6 alternating borderless shelf spreads → feathered wide banner → clickable `01–04` `ReadingRoomSteps` → hairline guidelines.
- **About (`/about`):** Centered magazine opener → *"The name PAHINA."* wrap spread → feathered interior interlude → staggered 4-up borderless principles showcase → clickable 4-swatch `MaterialSwatchInspector`.
- **Visit (`/visit`):** Razor-thin 3D `FlippableCallingCard` beside the 6-placeholder Visit Directory → Powder Blue hairline-framed concept notice → feathered *"Getting here."* spread → architectural dashed `[Map Location Placeholder]` frame → unboxed closing CTA.

### Motion & Accessibility Rules
- **Scroll Choreography:** Spring-damped Framer Motion scroll parallax (`useSpring` on `useScroll`/`useTransform`), opposing float drifts, outer-observed `MaskedHeading` line reveals with descender clearance (`pb-[0.2em]`), and opacity-only route transitions (`template.tsx`) so fixed portals/sticky bars never trap inside transform contexts.
- **Dialog Accessibility:** `TastingSheetModal` and `MobileNavigation` mount cleanly with `useDialogA11y` (initial focus, strict `Tab`/`Shift+Tab` focus trap, `Escape` close, and return focus to trigger); `TastingSheetModal` renders via `createPortal` directly into `document.body`.
- **Reduced Motion:** `useReducedMotion()` degrades parallax, scroll tilts, pointer tilts, magnetic pulls, and 3D card flips cleanly to static states.


