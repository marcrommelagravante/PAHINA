# PAHINA --- Static Website Development Brief

**Project type:** Fictional café business website / portfolio
demonstration\
**Brand:** PAHINA\
**Descriptor:** Coffee & Reading Room\
**Tagline:** Every page holds a story.\
**Document purpose:** Build-ready brief for AI coding agents and
developers\
**Status:** Brand and visual direction established; some operational
details remain placeholders

------------------------------------------------------------------------

## 1. Project Overview

Build a polished, responsive, static-first website for **PAHINA**, a
boutique neighborhood book café. PAHINA combines a welcoming coffee shop
with a curated in-café reading room where customers can browse books,
enjoy drinks and food, and spend time reading.

The website should communicate the atmosphere of a small, elegant,
modern-classic café. It should not look like a large commercial library,
a generic restaurant template, or an ecommerce storefront.

This is a **fictional portfolio concept**, not a verified operating
business. Do not invent a real address, phone number, opening hours,
social account, customer reviews, awards, or other factual business
claims. Use clearly marked placeholders where real business information
would be needed.

### Primary goals

1.  Introduce PAHINA and its coffee-and-reading concept.
2.  Present the complete menu clearly and attractively.
3.  Explain how the Reading Room works.
4.  Communicate the brand story and atmosphere.
5.  Give visitors a clear way to find or contact the café once real
    details are supplied.
6.  Demonstrate strong frontend craft, responsive design, accessibility,
    and performance for a developer portfolio.

### Target audience

-   **Primary:** Students and book enthusiasts.
-   **Secondary:** Young professionals and casual coffee drinkers.
-   People looking for a calm, comfortable place to enjoy coffee, read,
    or have a light meal.

------------------------------------------------------------------------

## 2. Business Concept and Experience

### Positioning

A neighborhood book café for people who appreciate coffee, literature,
and comfortable spaces. PAHINA combines a contemporary café experience
with a curated collection of books customers can read inside the café.

### Reading Room rules

-   Customers may browse the curated book collection.
-   Customers may bring a selected book to their table and read while in
    the café.
-   Books must remain inside the premises.
-   Customers return books to the designated collection area before
    leaving.
-   Staff may assist customers with the collection.
-   Do not build take-home lending, memberships, reservations, book
    checkout, or library-management functionality into the initial
    website.

### Atmosphere

-   Modern-classic.
-   Calm, cozy, welcoming, thoughtful, literary.
-   Elegant without feeling intimidating.
-   Comfortable for longer reading sessions.
-   Boutique neighborhood scale rather than a large hall or commercial
    library.

------------------------------------------------------------------------

## 3. Brand Identity

### Brand basics

-   **Name:** PAHINA
-   **Descriptor:** Coffee & Reading Room
-   **Primary tagline:** "Every page holds a story."
-   Supporting line: "A quiet place for curious minds."
-   Experience line: "Brew a cup. Turn a page."
-   Supporting phrase: "Where coffee meets stories."

Use a warm, thoughtful, simple, inviting voice. Avoid overly promotional
copy, forced literary puns, and excessive clichés.

### Confirmed color palette

Use these colors consistently. Do not introduce unrelated accent colors.

  Color           Hex         Intended use
  --------------- ----------- -------------------------------------------
  Powder Blue     `#B9D0E0`   Main brand accent and selected UI details
  Slate Grey      `#8999A6`   Secondary text and restrained accents
  Soft Grey       `#E8E8E4`   Subtle section backgrounds and dividers
  Paper White     `#F4F1EA`   Main background and warm paper surfaces
  Deep Ink Grey   `#41474D`   Main text, headings, and dark details

Suggested balance: - Paper White as the primary page background. - Deep
Ink Grey for readable text. - Powder Blue for selected accents, links,
and small UI details. - Slate Grey for secondary information. - Soft
Grey for borders and subtle surface changes.

Do not make the whole site blue. The blue should complement warm paper
and neutral tones.

### Confirmed typography direction

-   **Primary display:** Bodoni Moda.
-   **Secondary editorial display:** Instrument Serif, used selectively.
-   **Body and UI:** Manrope.
-   **Headline expression:** Mixed upright and italic serif typography.

Typography rules: - Use Bodoni Moda for hero headlines, major section
headings, and brand storytelling. - Use upright and italic words
intentionally in selected headlines. - Use Instrument Serif sparingly
for supporting editorial statements or pull quotes. - Use Manrope for
body copy, navigation, menu descriptions, buttons, labels, and
metadata. - Use deliberate line breaks and generous whitespace. - Do not
italicize entire paragraphs. - Keep text readable and responsive on
mobile.

Example headline treatment:

> Every page\
> *holds a story.*

### Wordmark direction

Recommended working direction: a typographic PAHINA wordmark using
elegant uppercase serif lettering inspired by Bodoni. Keep it simple and
legible. Do not invent a complex icon or emblem unless separately
requested.

------------------------------------------------------------------------

## 4. Interior and Exterior Direction

### Interior --- confirmed direction

The café is **small and boutique**, not a large commercial space.

Required visual qualities: - Pastel blue or blue-grey walls. -
Modern-classic architectural details. - Warm wood and soft neutral
upholstery. - Bookshelves integrated along selected walls rather than
filling every available surface. - A compact coffee counter. - A few
comfortable lounge seats. - Small tables for individuals and pairs. -
Enough open floor space and wide walkways for comfortable movement. -
Natural light where possible. - Customers should have enough personal
space to read and enjoy coffee without feeling cramped.

Important layout principle: seating comfort and usable circulation take
priority over displaying as many bookshelves as possible.

### Exterior --- confirmed direction

A small, elegant, recognizable, welcoming boutique café storefront.

Required visual qualities: - Muted pastel blue or blue-grey facade. -
Refined architectural trim. - Large glass windows, preferably with
subtle arched forms. - A clear PAHINA wordmark sign. - Welcoming glass
entrance. - Warm wall lighting. - A small number of potted plants. -
Optional understated sidewalk chalkboard sign.

Do not portray the business as a large luxury establishment.

------------------------------------------------------------------------

## 5. Website Structure

Build these five pages:

  -----------------------------------------------------------------------
  Page                    Route                   Purpose
  ----------------------- ----------------------- -----------------------
  Home                    `/`                     Introduce PAHINA and
                                                  guide visitors through
                                                  the experience

  Menu                    `/menu`                 Present drinks and food

  Reading Room            `/reading-room`         Explain the book
                                                  collection and in-café
                                                  reading experience

  About                   `/about`                Tell the brand story
                                                  and philosophy

  Visit Us                `/visit`                Show location, hours,
                                                  contact, and directions
                                                  placeholders
  -----------------------------------------------------------------------

### Navigation

Desktop: - Left: PAHINA wordmark. - Center: Home, Menu, Reading Room,
About. - Right: Visit Us call-to-action. - Centered navigation is the
confirmed direction. - Use subtle sticky behavior, an understated
background transition, a bottom divider, and a clear active-page state.

Mobile: - Wordmark on the left. - Accessible menu trigger on the
right. - Use a clean dropdown or full-screen navigation. - Ensure
keyboard access and clear focus states.

------------------------------------------------------------------------

## 6. Page-by-Page Requirements

### 6.1 Home page

The homepage should introduce the brand emotionally and visually, then
guide visitors toward the menu, Reading Room, and visit information.

Recommended section order:

1.  **Navigation**
    -   Centered desktop navigation.
    -   Clear Visit Us CTA.
2.  **Photographic hero**
    -   Large, atmospheric café photograph.
    -   Headline: "Every page holds a story."
    -   Supporting copy: "A quiet place for coffee, books, and curious
        minds."
    -   Primary CTA: "Discover PAHINA."
    -   Secondary CTA: "Explore Our Menu."
    -   Keep the text readable. Prefer a separate text area or
        restrained overlay rather than covering the photograph with
        excessive text.
3.  **Brand introduction**
    -   Heading: "A place between pages."
    -   Explain the combination of coffee, books, and a comfortable
        neighborhood café.
4.  **Featured menu**
    -   Heading: "Something good is brewing."
    -   Show a small selection of drinks and food with links to the full
        menu.
5.  **Reading Room feature**
    -   Heading: "Find a story worth staying for."
    -   Explain that books can be read inside the café and must be
        returned before leaving.
    -   Link to the Reading Room page.
6.  **Atmosphere gallery**
    -   Editorial, asymmetric image arrangement.
    -   Show the interior, books, coffee, food, and reading moments.
    -   Avoid a generic stock-photo grid.
7.  **Visit call-to-action**
    -   Heading: "We saved you a seat."
    -   Link to Visit Us.
8.  **Footer**
    -   Prominent PAHINA wordmark.
    -   Tagline.
    -   Organized page links and placeholder contact/social details.

### 6.2 Menu page

Purpose: make the menu easy to browse and visually appealing, not to
create an ecommerce catalog.

Requirements: - Editorial page heading and short introduction. - Clearly
separated categories. - Every menu item should have its own image asset
where available. - Use consistent image aspect ratios and image
treatment. - Show prices only where supplied/confirmed. - Clearly mark
food prices as "To be confirmed" during the concept stage, or omit them
until approved. - Do not add cart, checkout, payment, or online ordering
functionality. - Do not invent ingredients, allergens, dietary claims,
or exact recipes.

#### Menu categories and items

**A. Coffee --- espresso-based and specialty coffee**

Core coffee: 1. Café Americano 2. Café Latte 3. Cappuccino 4. Café Mocha
5. Hazelnut Latte 6. Caramel Macchiato 7. Spanish Latte 8. Biscoff Latte
9. Vanilla Latte 10. White Chocolate Mocha

Special coffee: 11. Caramel Espresso Con Panna 12. Affogato 13. Oreo
Dalgona

**Reference pricing for core coffee**\
These figures were taken from the user's supplied menu reference and
should be checked against the final approved menu before publishing.

  Drink                     SMOL 12oz   MOYEN 16oz   GRANDE 22oz
  ----------------------- ----------- ------------ -------------
  Café Americano                 ₱125         ₱140          ₱155
  Café Latte                     ₱145         ₱160          ₱175
  Cappuccino                     ₱145         ₱160          ₱175
  Café Mocha                     ₱145         ₱160          ₱175
  Hazelnut Latte                 ₱145         ₱160          ₱175
  Caramel Macchiato              ₱145         ₱160          ₱175
  Spanish Latte                  ₱145         ₱160          ₱175
  Biscoff Latte                  ₱145         ₱160          ₱175
  Vanilla Latte                  ₱145         ₱160          ₱175
  White Chocolate Mocha          ₱145         ₱160          ₱175

Special coffee prices were shown in the earlier working menu as: -
Caramel Espresso Con Panna --- ₱125 - Affogato --- ₱140 - Oreo Dalgona
--- ₱140

Treat these as reference figures pending final confirmation.

**B. Non-coffee**

1.  Signature Chocolate
2.  Strawberry Milk Latte

Reference sizes/prices: - SMOL 12oz --- ₱145 - MOYEN 16oz --- ₱160 -
GRANDE 22oz --- ₱175

Confirm whether both drinks use the same size pricing before publishing.

**C. Frappuccino**

Espresso-based: 1. Java Chip Frappe 2. Caramel Frappe 3. Mocha Frappe 4.
Hazelnut Frappe 5. Salted Caramel Oreo Frappe 6. Lotus Biscoff Frappe

Cream-based: 1. Oreo Frappe 2. Peanut Butter Cookie Frappe 3. Ube Frappe
4. Strawberry Frappe 5. Matcha Frappe

Reference sizes/prices from the working menu: - 16oz --- ₱180 - 22oz ---
₱195

Verify against the original menu reference before treating as final.

**D. Pasta**

Proposed menu selection: 1. Creamy Carbonara 2. Spaghetti Bolognese 3.
Creamy Pesto 4. Chicken Alfredo 5. Aglio Olio

Aglio Olio is explicitly requested and must be included.

**E. Pizza**

Proposed menu selection: 1. Classic Cheese 2. Pepperoni 3. Hawaiian 4.
Four Cheese

**F. Fries**

Proposed menu selection: 1. Classic Fries 2. Cheese Fries 3. Sour Cream
Fries 4. Truffle Parmesan Fries

Food prices have not been confirmed. Do not invent them.

### 6.3 Reading Room page

Purpose: make the reading-room experience a clear differentiator.

Recommended sections: 1. Atmospheric photographic hero. 2. Introduction
to the curated collection. 3. Book categories such as Fiction, Romance,
Mystery, Philosophy, Poetry, and Nonfiction. 4. "How it works" steps: -
Browse the shelves. - Choose a book. - Read comfortably at your table. -
Return the book to the designated collection area before leaving. 5.
Simple reading-room guidelines. 6. Visit CTA.

Do not promise specific book titles, collection size, or availability
unless supplied.

### 6.4 About page

Recommended sections: - Brand introduction. - Inspiration behind
PAHINA. - Philosophy: coffee, books, and taking time for yourself. -
What makes the café different. - Interior atmosphere. - Visit CTA.

Use warm editorial storytelling rather than generic corporate copy. Do
not invent founder biographies or real business history.

### 6.5 Visit Us page

Recommended sections: - Welcome heading. - Location and map area. -
Opening hours. - Contact information. - Social links. - Directions or
transport information if later supplied.

Use obvious placeholders such as `[Café address]`, `[Opening hours]`,
`[Phone number]`, and `[Social media URL]`. Do not fabricate operational
details or embed a fake map location.

------------------------------------------------------------------------

## 7. Photography and Image Assets

### Photography direction

The user wants menu images that look as if they were captured by a
professional food photographer.

Visual direction: - Photorealistic food and beverage product
photography. - Professional commercial café photography. - Soft
directional light and natural-looking highlights. - Thoughtful
composition and clean styling. - Shallow depth of field where
appropriate. - Neutral cream, warm wood, stone, and restrained blue-grey
surroundings. - Appetizing, realistic food textures. - Consistent camera
perspective and image quality across the menu. - No text, watermarks,
logos, or menu labels baked into product photographs.

Avoid: - Cartoon or illustrated food. - Obvious AI artifacts. - Overly
saturated colors. - Cluttered props. - Inconsistent image styles. -
Images that misrepresent the named item.

### Current menu asset package

A first set of **39 individually cropped JPG images** has been prepared
in `pahina-menu-assets.zip`.

Folder structure:

``` text
pahina-menu-assets/
├── README.txt
├── coffee/
├── non-coffee/
├── frappuccino/
│   ├── espresso-based/
│   └── cream-based/
├── pasta/
├── pizza/
└── fries/
```

The current images were cropped from generated contact sheets. They are
initial visual assets/placeholders, not individually commissioned
product photographs. Review each crop for quality and accuracy before
publication. Replace any weak, duplicated, or inaccurate image with a
separately generated photograph of that exact menu item.

Suggested placement in a Next.js project:

``` text
public/
└── images/
    └── pahina-menu-assets/
        ├── coffee/
        ├── non-coffee/
        ├── frappuccino/
        ├── pasta/
        ├── pizza/
        └── fries/
```

Example image path:

``` text
/images/pahina-menu-assets/coffee/cafe-americano.jpg
```

Use descriptive filenames and meaningful alt text. Do not put item names
or prices inside the image itself; render those as HTML text so the menu
remains accessible, searchable, and editable.

------------------------------------------------------------------------

## 8. Visual and Interaction Direction

### Overall UI style

-   Editorial literary aesthetic.
-   Independent book publication meets modern-classic neighborhood café.
-   Large serif headlines.
-   Generous whitespace.
-   Restrained labels and clean information hierarchy.
-   Warm paper-like surfaces.
-   Pastel blue-grey accents.
-   Authentic atmospheric photography.

Do not use a generic restaurant template. Do not overdecorate the site
with book icons, floating coffee graphics, paper textures, or
unnecessary ornaments.

### Animation

Use restrained, purposeful motion: - Gentle initial fade and image
reveal. - Soft editorial page transitions. - Subtle scroll reveals. -
Gentle image scale on hover. - Underline or opacity navigation
transitions. - Subtle CTA hover and press states. - Smooth mobile menu
transitions.

Avoid aggressive parallax, bouncing elements, excessive motion, or
distracting effects. Respect `prefers-reduced-motion`.

### Responsive behavior

Desktop: - Centered navigation. - Spacious editorial hero. -
Multi-column menu layout. - Asymmetric photography gallery.

Mobile: - Collapsed navigation. - Stacked hero. - Single-column or
carefully grouped menu layout. - Simplified gallery. - Stacked footer. -
Comfortable touch targets and readable type.

Ensure no horizontal overflow at any viewport size.

------------------------------------------------------------------------

## 9. Technical Requirements

### Preferred stack

-   Next.js with App Router.
-   TypeScript.
-   Tailwind CSS.
-   Framer Motion for restrained animation.
-   Lucide icons where icons are genuinely useful.
-   Vercel deployment.

Use the current stable versions compatible with the project environment.
Do not upgrade or replace existing dependencies unnecessarily if
integrating into an existing repository.

### Static-first scope

The initial website is an informational marketing site.

Do not add: - Database. - Authentication or user accounts. - Online
ordering. - Cart or checkout. - Payment processing. - Reservation
system. - Book lending or inventory management. - Admin dashboard.

A simple contact or inquiry form may be included only if its submission
behavior is actually configured. Otherwise, use a clearly marked contact
placeholder rather than a nonfunctional form.

### Suggested project structure

Adapt to the existing repository if one exists; do not overwrite working
project files without inspection.

``` text
src/
├── app/
│   ├── page.tsx
│   ├── menu/
│   │   └── page.tsx
│   ├── reading-room/
│   │   └── page.tsx
│   ├── about/
│   │   └── page.tsx
│   ├── visit/
│   │   └── page.tsx
│   ├── layout.tsx
│   └── globals.css
├── components/
│   ├── layout/
│   ├── sections/
│   └── ui/
├── data/
│   ├── menu.ts
│   └── books.ts
└── lib/
    └── utils.ts

public/
└── images/
    └── pahina-menu-assets/
```

### Suggested reusable components

-   `Navbar`
-   `MobileNavigation`
-   `Footer`
-   `PageHeader`
-   `SectionHeading`
-   `ImageFeature`
-   `MenuItem`
-   `MenuCategory`
-   `BookCategory`
-   `VisitInformation`
-   `PrimaryButton`
-   `Reveal`

Components should promote consistency without forcing every page into
the same layout.

### Data-driven menu

Keep menu data separate from presentation components, for example in
`src/data/menu.ts`.

Each menu item may include: - `id` - `name` - `category` - `description`
(only when confirmed or intentionally written as non-factual editorial
copy) - `image` - `sizes` and `prices` where confirmed - `availability`
only if a real availability state is supplied

Do not hardcode the same menu item in multiple page components. Render
from structured data.

------------------------------------------------------------------------

## 10. SEO, Accessibility, and Performance

### SEO

-   Unique page title and meta description for every route.
-   Semantic heading hierarchy.
-   Open Graph metadata.
-   Descriptive image alt text.
-   Clean URLs.
-   Appropriate canonical metadata when deployment domain is known.

### Accessibility

-   Semantic HTML landmarks.
-   Keyboard-accessible navigation and controls.
-   Visible focus indicators.
-   Sufficient text contrast.
-   Meaningful alt text.
-   Proper labels for forms.
-   Reduced-motion support.

### Performance

-   Use optimized images and Next.js image handling where appropriate.
-   Avoid unnecessarily large image downloads.
-   Use responsive image sizes.
-   Load fonts efficiently.
-   Avoid excessive client-side JavaScript.
-   Prefer Server Components unless interactivity requires a Client
    Component.
-   Aim for strong Core Web Vitals.

------------------------------------------------------------------------

## 11. Content and Data Integrity Rules

These rules are important for all agents:

1.  PAHINA is a fictional portfolio concept. Never invent real business
    facts.
2.  Use placeholders for address, hours, phone, social links, and map
    location.
3.  Do not invent food prices.
4.  Drink prices listed in this document are reference values from the
    supplied menu and require final verification.
5.  Do not invent ingredients, recipes, allergens, dietary
    certifications, or nutritional information.
6.  The Reading Room is for in-café reading only. Books cannot be taken
    home.
7.  Keep the boutique scale of the café in all visual assets.
8.  Preserve the approved pastel blue-grey and neutral palette.
9.  Do not add unrelated colors or excessive gradients.
10. Do not add ecommerce, booking, account, or library-management
    features to the static MVP.
11. Do not replace the confirmed typography direction.
12. If an item or business detail is unclear, keep it editable or use a
    placeholder instead of guessing.

------------------------------------------------------------------------

## 12. Implementation Roadmap

Recommended order of work:

1.  Inspect the existing repository and report its current structure
    before changing files.
2.  Establish design tokens: colors, fonts, type scale, spacing, radii,
    and shared layout widths.
3.  Build the global layout, navbar, mobile navigation, and footer.
4.  Build the homepage and refine its responsive composition.
5.  Build the menu page using structured menu data and the supplied
    image assets.
6.  Build the Reading Room page.
7.  Build the About page.
8.  Build the Visit Us page with clearly marked placeholders.
9.  Add restrained motion and page transitions.
10. Test mobile, tablet, and desktop layouts.
11. Check accessibility, SEO, image optimization, and performance.
12. Verify the production build and prepare for Vercel deployment.

### Agent workflow expectations

-   Read this brief fully before implementation.
-   Inspect the repository before making changes.
-   Preserve existing working code and configuration.
-   Build reusable components and maintainable data structures.
-   Do not silently remove requirements.
-   Do not fabricate missing content.
-   Ask only when an unresolved decision blocks implementation;
    otherwise use the specified direction.
-   After implementation, summarize files changed, features completed,
    placeholders remaining, and any decisions that need user approval.

------------------------------------------------------------------------

## 13. Definition of Done

The first version is complete when:

-   All five pages exist and are connected through navigation.
-   The design consistently reflects PAHINA's identity.
-   The homepage communicates the coffee-and-reading concept
    immediately.
-   The menu displays every approved category and item.
-   Menu items use individual image assets where available.
-   Menu pricing is accurate or visibly left unconfirmed.
-   The Reading Room rules are clear.
-   Visit details remain placeholders until supplied.
-   The site is responsive and keyboard accessible.
-   Motion is restrained and reduced-motion preferences are respected.
-   Images, fonts, and code are optimized.
-   SEO metadata is present.
-   The project builds successfully and is ready for Vercel deployment.

------------------------------------------------------------------------

## 14. Core Design Principle

**PAHINA should feel like a small, welcoming book café where customers
can comfortably stay---not a crowded bookstore, a large library, or a
generic coffee chain.**

Every design and implementation decision should support that experience.
