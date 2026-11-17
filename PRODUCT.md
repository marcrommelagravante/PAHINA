# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Next.js App Router (TypeScript), Tailwind CSS v4, Framer Motion, Lucide React, deployed via standard Vercel Next.js build (SSG pre-rendered routes with `next/image` optimization).

## Users

- **Primary:** Students and book enthusiasts seeking a calm neighborhood café where coffee and reading belong together.
- **Secondary:** Young professionals and casual coffee drinkers looking for comfortable seating, light meals, and unhurried focus.

## Product Purpose

Introduce **PAHINA** (*Coffee & Reading Room* — "Every page holds a story."), a fictional boutique neighborhood book café portfolio concept, by clearly presenting:
1. The café's coffee-and-reading concept and warm editorial atmosphere.
2. The complete curated drink and food menu (`39` items across `6` categories).
3. How the in-café Reading Room works (without lending, accounts, or inventory management).
4. The brand story and philosophy.
5. Clear placeholder visit, location, and contact slots ready for future operational details.

## Positioning

A boutique, neighborhood-scale book café—never a crowded commercial library, generic chain, or ecommerce storefront—where comfortable seating and circulation frame a curated in-café book collection.

## Operating Context

- Customers browse curated books inside the café, bring one to their table while enjoying coffee or food, and return it to the designated collection area before leaving.
- Static-first informational website across five connected routes: `/`, `/menu`, `/reading-room`, `/about`, and `/visit`.

## Capabilities and Constraints

- **No transactional/app bloat:** No database, accounts, cart, checkout, online ordering, reservations, library lending/checkout, or unconfigured contact form.
- **Content & pricing integrity:**
  - Drink pricing, `(Hot)`/`(Iced)` size labels, and signature/`Must Try` highlights follow the supplied menu reference (`unnamed.webp`).
  - Food prices (Pasta, Pizza, Fries) are unconfirmed and displayed quietly as *"Price to be confirmed"*.
  - Zero fabricated business facts (address, hours, phone, email, social handles, map coordinates, founder biographies, book titles, collection counts, ingredients, or allergen claims).
- **Menu browsing:** Sticky category filter bar defaulting to **All** with optional category filters, displaying clean item cards (name, sizes/prices, badge if applicable, and 4:5 photo only).
- **Reading Room:** Interactive 6-category shelf index (`Fiction`, `Romance`, `Mystery`, `Philosophy`, `Poetry`, `Nonfiction`) showing quiet reading-mood pairing notes alongside the 4-step workflow and in-café-only guidelines.

## Brand Commitments

- **Name:** PAHINA (`Coffee & Reading Room`)
- **Lines:** *"Every page holds a story."*, *"A quiet place for curious minds."*, *"Brew a cup. Turn a page."*, *"Where coffee meets stories."*
- **Confirmed Palette:** Paper White `#F4F1EA`, Deep Ink Grey `#41474D`, Powder Blue `#B9D0E0`, Slate Grey `#8999A6`, Soft Grey `#E8E8E4`.
- **Confirmed Typography:** `Bodoni Moda` (display, intentional upright + italic), `Instrument Serif` (selective editorial pull quotes), `Manrope` (body & UI).
- **Photography:** High-resolution bespoke atmospheric scenes and regenerated 4:5 menu photography stored under `public/images/`.

## Evidence on Hand

- Confirmed brief: `PAHINA-Static-Website-Development-Brief.md`
- Verified menu pricing reference: `unnamed.webp` (external Downloads reference)
- Initial low-res menu crop reference set: `pahina-menu-assets/` (being replaced with high-res generated product assets in `public/images/pahina-menu-assets/`).
- Intentionally unconfirmed / placeholder fields: café address, opening hours, phone, email, social URLs, map coordinates, and food prices.

## Product Principles

1. Boutique warmth over commercial scale—generous spacing, editorial clarity, calm pacing.
2. Honest placeholders over fabricated facts—never invent operational data, titles, or recipes.
3. Photography and typography carry the brand—avoid clip-art coffee/book clichés and decorative chrome.
4. Accessible, reduced-motion-aware, keyboard-friendly navigation across all viewports.
