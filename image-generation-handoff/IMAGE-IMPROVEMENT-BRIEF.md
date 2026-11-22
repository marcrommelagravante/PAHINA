# PAHINA — Image Improvement & Generation Handoff Brief

This folder is a self-contained handoff package for generating and replacing **30 images** for the **PAHINA — Coffee & Reading Room** website.

---

## Folder Contents

```text
image-generation-handoff/
├── IMAGE-IMPROVEMENT-BRIEF.md     # This brief (audit, visual direction, exact prompts & wiring)
├── style-references/              # 9 approved high-res PAHINA photos to match visually
├── current-images-to-improve/     # All 23 existing menu images that need replacement
└── generated-output/              # Pre-created output folders matching public/images/
```

### How the Receiving Agent Should Use This Folder
1. **Inspect `style-references/` first** so every newly generated image matches PAHINA's exact lighting, oak table grain, stoneware/glassware, and boutique pastel blue-grey café interior.
2. **Inspect `current-images-to-improve/`** to see the current low-resolution contact-sheet crops (`83×103` to `149×186`) or style-mismatched files you are replacing.
3. **Save outputs as `.jpg`** using the exact filenames and folder paths listed below:
   - If working directly in the repo, write to `public/images/...`
   - If working standalone outside the repo, write to `image-generation-handoff/generated-output/...` (mirrors `public/images/` 1:1).
4. **Strict global quality rules (apply to all 30 images):**
   - **Zero text, zero watermarks, zero brand logos, zero menu labels** (no cookie brand embossing, no printed newsprint text on fry parchment, no readable gibberish on book spines or covers).
   - **No cartoon or over-saturated stock looks** — warm, natural, restrained daylight editorial photography only.
   - **Boutique scale** — PAHINA is a small neighborhood café with muted pastel blue-grey paneled walls (`#B9D0E0`), warm oak tables & herringbone floors, recessed wooden bookshelves, tall arched windows, and Paper White (`#F4F1EA`) surfaces.
   - **Target resolution:** Portrait shots `~896×1200` (`3:4` or `4:5` vertical); Landscape shots `~1200×900` (`4:3` horizontal).

---

## Summary of What Needs Improvement (`30` Images Total)

| Batch | Priority | Count | Problem Today | Target Look |
| --- | --- | --- | --- | --- |
| **A. Menu — Featured Showcase Items** | **P1 (Highest)** | **11** | Tiny contact-sheet crops (`83–178px`) forcing small boxed fallback plates on `/menu`, plus `caramel-macchiato` & `spanish-latte` using plain Paper White cutouts instead of oak tabletop shots | Unified `3:4`/`4:5` warm oak café-tabletop daylight photography matching `01`–`05` in `style-references/` |
| **B. Menu — Remaining Ledger Items** | **P2** | **12** | Tiny contact-sheet crops (`84–186px`) showing softly blurred thumbnails in menu rows and Tasting Sheet modals | Same unified `3:4`/`4:5` warm oak café-tabletop daylight photography |
| **C. Reading Room Dedicated Scenes** | **P3** | **5** | `/reading-room` currently reuses architectural photos shared with Home & About (`hero-cafe.jpg`, `reading-room-hero.jpg`, `reading-room-nook.jpg`, `banner-spread.jpg`, `hero-flatlay.jpg`) | 5 bespoke PAHINA boutique interior & candid reader photographs matching `08` & `09` in `style-references/` |
| **D. Editorial Paper White Studio Shots** | **P4** | **2** | `/menu` hero reuses Home's `story-pours.jpg`; Home's `Signature Chocolate` lacks a seamless `#F4F1EA` cutout matching Caramel Macchiato & Spanish Latte | Seamless solid `#F4F1EA` Paper White studio shots matching `06` & `07` in `style-references/` |

---

## Shared Style Suffix for All 23 Menu Tabletop Images (Batches A & B)

Append this style anchor to every menu prompt in Batches A and B and pass the indicated file from `style-references/` as visual reference:

> *Photorealistic commercial café food and beverage photography, vertical 3:4 or 4:5 portrait, warm natural oak café tabletop in soft directional morning window light from the left, shallow depth of field with a softly blurred small boutique book café interior featuring muted pastel blue-grey paneled walls (#B9D0E0) and recessed warm wooden bookshelves. Realistic appetizing textures, understated editorial café palette. Strictly NO text, NO logos, NO brand markings, NO watermarks.*

---

## Batch A — Priority 1: Featured `/menu` Showcase Items (`11` Images)

These items appear prominently in the large 3-up / 2-up showcase cards on `/menu`. Upgrading these 11 eliminates every remaining fallback box and style mismatch across all 6 menu categories.

### 1. `coffee/spanish-latte.jpg`
- **Current issue:** `104×130` (`5.4 KB`) blurry contact-sheet crop (`current-images-to-improve/coffee/spanish-latte.jpg`); `/menu` currently falls back to a cropped Paper White cutout.
- **Match style reference:** `style-references/01-ref-iced-coffee-oak.jpg`
- **Target path:** `public/images/pahina-menu-assets/coffee/spanish-latte.jpg`
- **What it needs to look like / Prompt:** Iced Spanish Latte in a clear tall fluted café glass over crystal ice cubes on a warm natural oak tabletop: distinct pale creamy sweetened condensed milk layer at the bottom beneath a rich amber-gold espresso cascade marbling gently downward, subtle cold condensation on the glass. *(+ Shared Menu Style Suffix)*

### 2. `coffee/caramel-macchiato.jpg`
- **Current issue:** `896×1200` (`605 KB`) — crisp, **but style-mismatched** (`current-images-to-improve/coffee/caramel-macchiato.jpg` is a plain `#F4F1EA` studio cutout instead of a warm oak tabletop café shot, clashing beside `Biscoff Latte` on `/menu`). *(Keep `public/images/editorial/float-caramel-macchiato.jpg` untouched for Home.)*
- **Match style reference:** `style-references/01-ref-iced-coffee-oak.jpg`
- **Target path:** `public/images/pahina-menu-assets/coffee/caramel-macchiato.jpg`
- **What it needs to look like / Prompt:** Iced Caramel Macchiato in a clear tall fluted café glass over crystal ice on a warm natural oak tabletop: crisp layers of cold white milk at the base, rich dark espresso band in the middle, velvety cold milk foam on top finished with a delicate criss-cross drizzle of glossy amber caramel. *(+ Shared Menu Style Suffix)*

### 3. `non-coffee/strawberry-milk-latte.jpg`
- **Current issue:** `143×178` (`8.3 KB`) tiny crop (`current-images-to-improve/non-coffee/strawberry-milk-latte.jpg`) — featured `Signature` Non-Coffee card currently stuck in a small specimen box beside our high-res `Signature Chocolate`.
- **Match style reference:** `style-references/04-ref-non-coffee-oak.jpg`
- **Target path:** `public/images/pahina-menu-assets/non-coffee/strawberry-milk-latte.jpg`
- **What it needs to look like / Prompt:** Iced Strawberry Milk Latte in a clear tall straight or fluted café glass over clear ice cubes on a warm natural oak tabletop: natural ruby-red macerated strawberry purée layer at the bottom softly marbling upward into creamy chilled white milk, with gentle cold condensation on the glass (refined café iced drink, no heavy whipped cream dome). *(+ Shared Menu Style Suffix)*

### 4. `frappuccino/espresso-based/lotus-biscoff-frappe.jpg`
- **Current issue:** `93×116` (`5.2 KB`) tiny crop (`current-images-to-improve/frappuccino/espresso-based/lotus-biscoff-frappe.jpg`) — featured `Must Try` Frappuccino showcase item currently stuck in a small specimen box.
- **Match style reference:** `style-references/03-ref-frappuccino-oak.jpg`
- **Target path:** `public/images/pahina-menu-assets/frappuccino/espresso-based/lotus-biscoff-frappe.jpg`
- **What it needs to look like / Prompt:** Espresso-based caramelized spiced biscuit frappe in a tall clear café glass resting on a folded neutral oatmeal linen napkin with a slender stainless spoon on a warm oak tabletop: creamy golden-tan ice-blended coffee frappe crowned with softly piped white whipped cream, fine spiced biscuit crumbs, and a plain unbranded rectangular amber caramelized biscuit tucked neatly at the edge (strictly NO readable text or logo stamped on the biscuit). *(+ Shared Menu Style Suffix)*

### 5. `pasta/creamy-carbonara.jpg`
- **Current issue:** `111×138` (`7.1 KB`) tiny crop (`current-images-to-improve/pasta/creamy-carbonara.jpg`) — featured Pasta showcase item stuck in a specimen box right next to our crisp new `Aglio Olio`.
- **Match style reference:** `style-references/05-ref-pasta-oak.jpg`
- **Target path:** `public/images/pahina-menu-assets/pasta/creamy-carbonara.jpg`
- **What it needs to look like / Prompt:** Creamy Carbonara spaghetti neatly twirled in a shallow matte cream-speckled stoneware pasta bowl beside a folded neutral linen napkin and brushed fork on a warm oak café table, 45-degree angle: silky pale cream sauce coating al dente spaghetti with crisp golden pancetta/bacon bits, freshly cracked black pepper, and a restrained sprinkle of finely chopped flat-leaf parsley. *(+ Shared Menu Style Suffix)*

### 6. `pasta/creamy-pesto.jpg`
- **Current issue:** `111×138` (`7.5 KB`) tiny crop (`current-images-to-improve/pasta/creamy-pesto.jpg`) — featured Pasta showcase item stuck in a specimen box.
- **Match style reference:** `style-references/05-ref-pasta-oak.jpg`
- **Target path:** `public/images/pahina-menu-assets/pasta/creamy-pesto.jpg`
- **What it needs to look like / Prompt:** Creamy Basil Pesto spaghetti neatly twirled in a shallow matte cream-speckled stoneware pasta bowl beside a folded neutral linen napkin and brushed fork on a warm oak café table, 45-degree angle: velvety herbaceous green basil cream pesto sauce coating spaghetti, finished with delicate shaved aged parmesan curls and toasted pine nuts. *(+ Shared Menu Style Suffix)*

### 7. `pizza/classic-cheese-pizza.jpg`
- **Current issue:** `106×132` (`7.8 KB`) tiny crop (`current-images-to-improve/pizza/classic-cheese-pizza.jpg`) — featured Pizza showcase item.
- **Match style reference:** `style-references/05-ref-pasta-oak.jpg` & `02-ref-hot-coffee-oak.jpg`
- **Target path:** `public/images/pahina-menu-assets/pizza/classic-cheese-pizza.jpg`
- **What it needs to look like / Prompt:** Café-sized artisan Classic Cheese Pizza served on a round warm rustic oak wooden serving board set on a warm natural oak café tabletop, inviting 45–55 degree three-quarter editorial angle: airy blistered golden thin crust, rich crushed tomato sauce, bubbling melted pale golden mozzarella, and a few fresh whole basil leaves. *(+ Shared Menu Style Suffix)*

### 8. `pizza/pepperoni-pizza.jpg`
- **Current issue:** `107×133` (`7.8 KB`) tiny crop (`current-images-to-improve/pizza/pepperoni-pizza.jpg`) — featured Pizza showcase item.
- **Match style reference:** `style-references/05-ref-pasta-oak.jpg` & `02-ref-hot-coffee-oak.jpg`
- **Target path:** `public/images/pahina-menu-assets/pizza/pepperoni-pizza.jpg`
- **What it needs to look like / Prompt:** Café-sized artisan Pepperoni Pizza served on a round warm oak wooden serving board on a warm natural oak café tabletop, 45–55 degree three-quarter editorial angle: blistered golden thin crust, tomato sauce, bubbling melted mozzarella, and crisp slightly cupped artisanal pepperoni slices finished with a subtle pinch of dried oregano. *(+ Shared Menu Style Suffix)*

### 9. `pizza/four-cheese-pizza.jpg`
- **Current issue:** `107×133` (`8.2 KB`) tiny crop (`current-images-to-improve/pizza/four-cheese-pizza.jpg`) — featured Pizza showcase item.
- **Match style reference:** `style-references/05-ref-pasta-oak.jpg` & `02-ref-hot-coffee-oak.jpg`
- **Target path:** `public/images/pahina-menu-assets/pizza/four-cheese-pizza.jpg`
- **What it needs to look like / Prompt:** Café-sized artisan Four Cheese Pizza served on a round warm oak wooden serving board on a warm oak café tabletop, 45–55 degree three-quarter editorial angle: golden baked white artisan crust bubbling with a rich quartet of melted mozzarella, aged golden cheddar/fontina, shaved parmesan, and soft creamy ricotta spots, finished with cracked black pepper and a whisper of fresh thyme. *(+ Shared Menu Style Suffix)*

### 10. `fries/truffle-parmesan-fries.jpg`
- **Current issue:** `84×105` (`5.8 KB`) tiny crop (`current-images-to-improve/fries/truffle-parmesan-fries.jpg`) — featured Fries showcase item.
- **Match style reference:** `style-references/05-ref-pasta-oak.jpg`
- **Target path:** `public/images/pahina-menu-assets/fries/truffle-parmesan-fries.jpg`
- **What it needs to look like / Prompt:** Generous café serving of crisp golden skin-on French fries piled neatly inside a matte cream ceramic stoneware serving dish lined with plain unbleached cream parchment paper (strictly NO text or newsprint pattern on the parchment), 35–45 degree three-quarter angle on a warm oak tabletop, lightly glossed with truffle oil and generously topped with feathery snow-like finely grated aged parmesan cheese and freshly chopped flat-leaf parsley. *(+ Shared Menu Style Suffix)*

### 11. `fries/cheese-fries.jpg`
- **Current issue:** `84×105` (`5.8 KB`) tiny crop (`current-images-to-improve/fries/cheese-fries.jpg`) — featured Fries showcase item.
- **Match style reference:** `style-references/05-ref-pasta-oak.jpg`
- **Target path:** `public/images/pahina-menu-assets/fries/cheese-fries.jpg`
- **What it needs to look like / Prompt:** Crisp golden French fries piled neatly in a matte cream ceramic stoneware dish lined with plain unbleached parchment paper (no text on parchment) on a warm oak tabletop, 35–45 degree angle, generously drizzled with glossy warm velvety melted cheddar cheese sauce and a delicate scattering of finely chopped green chives. *(+ Shared Menu Style Suffix)*

---

## Batch B — Priority 2: Remaining Menu Ledger & Modal Items (`12` Images)

These items appear in the hairline menu ledger rows and open full-size inside the `TastingSheetModal`.

### 12. `fries/classic-fries.jpg` *(also in Fries 3-up Showcase)*
- **Current issue:** `83×103` (`5.4 KB`) tiny crop (`current-images-to-improve/fries/classic-fries.jpg`).
- **Match style reference:** `style-references/05-ref-pasta-oak.jpg`
- **Target path:** `public/images/pahina-menu-assets/fries/classic-fries.jpg`
- **What it needs to look like / Prompt:** Crisp golden skin-on Classic French Fries dusted lightly with flaky sea salt inside a matte cream ceramic serving dish lined with plain unbleached parchment paper (no printed text) on a warm oak tabletop, 35–45 degree editorial angle. *(+ Shared Menu Style Suffix)*

### 13. `fries/sour-cream-fries.jpg`
- **Current issue:** `84×105` (`5.8 KB`) tiny crop (`current-images-to-improve/fries/sour-cream-fries.jpg`).
- **Match style reference:** `style-references/05-ref-pasta-oak.jpg`
- **Target path:** `public/images/pahina-menu-assets/fries/sour-cream-fries.jpg`
- **What it needs to look like / Prompt:** Crisp golden French fries in a matte cream ceramic dish lined with plain unbleached parchment paper on a warm oak tabletop, 35–45 degree angle, evenly coated in pale savory sour-cream-and-herb seasoning with delicate green chive flecks, accompanied by a tiny matte cream ceramic ramekin of creamy sour cream dip beside the bowl. *(+ Shared Menu Style Suffix)*

### 14. `coffee/caramel-espresso-con-panna.jpg`
- **Current issue:** `149×186` (`10.6 KB`) tiny crop (`current-images-to-improve/coffee/caramel-espresso-con-panna.jpg`).
- **Match style reference:** `style-references/02-ref-hot-coffee-oak.jpg`
- **Target path:** `public/images/pahina-menu-assets/coffee/caramel-espresso-con-panna.jpg`
- **What it needs to look like / Prompt:** Hot Caramel Espresso Con Panna served in a small short faceted clear glass demitasse cup resting on a matte cream ceramic saucer with a tiny brushed spoon on a warm oak tabletop: dark espresso with rich crema crowned with a delicate swirl of softly whipped cream and a subtle fine ribbon of glossy amber caramel. *(+ Shared Menu Style Suffix)*

### 15. `coffee/affogato.jpg`
- **Current issue:** `149×186` (`9.4 KB`) tiny crop (`current-images-to-improve/coffee/affogato.jpg`).
- **Match style reference:** `style-references/02-ref-hot-coffee-oak.jpg`
- **Target path:** `public/images/pahina-menu-assets/coffee/affogato.jpg`
- **What it needs to look like / Prompt:** Classic Affogato in a short clear café glass resting on a matte cream ceramic saucer with a brushed teaspoon on a warm oak tabletop: a neat round scoop of pale creamy vanilla bean gelato nestled in freshly pulled dark espresso with rich golden crema melting gently around the edges. *(+ Shared Menu Style Suffix)*

### 16. `coffee/oreo-dalgona.jpg`
- **Current issue:** `149×186` (`9.0 KB`) tiny crop (`current-images-to-improve/coffee/oreo-dalgona.jpg`).
- **Match style reference:** `style-references/01-ref-iced-coffee-oak.jpg`
- **Target path:** `public/images/pahina-menu-assets/coffee/oreo-dalgona.jpg`
- **What it needs to look like / Prompt:** Iced Oreo Dalgona in a clear straight café glass on a warm oak tabletop: cold white milk over crystal ice cubes topped with a thick velvety cap of whipped caramel-brown dalgona coffee foam and finely crushed dark chocolate cookie crumble (no brand logos or readable cookie stamping). *(+ Shared Menu Style Suffix)*

### 17. `frappuccino/cream-based/oreo-frappe.jpg`
- **Current issue:** `94×117` (`5.7 KB`) tiny crop (`current-images-to-improve/frappuccino/cream-based/oreo-frappe.jpg`).
- **Match style reference:** `style-references/03-ref-frappuccino-oak.jpg`
- **Target path:** `public/images/pahina-menu-assets/frappuccino/cream-based/oreo-frappe.jpg`
- **What it needs to look like / Prompt:** Cream-based cookies-and-cream frappe in a tall clear café glass resting on a folded neutral oatmeal linen napkin with a slender spoon on a warm oak tabletop: velvety off-white ice-blended cream beverage speckled with fine dark chocolate cookie crumbs, crowned with softly piped whipped cream and dark cookie crumble (no brand logos). *(+ Shared Menu Style Suffix)*

### 18. `frappuccino/cream-based/ube-frappe.jpg`
- **Current issue:** `95×118` (`5.0 KB`) tiny crop (`current-images-to-improve/frappuccino/cream-based/ube-frappe.jpg`).
- **Match style reference:** `style-references/03-ref-frappuccino-oak.jpg`
- **Target path:** `public/images/pahina-menu-assets/frappuccino/cream-based/ube-frappe.jpg`
- **What it needs to look like / Prompt:** Ube Frappe in a tall clear café glass resting on a folded neutral oatmeal linen napkin with a slender spoon on a warm oak tabletop: velvety muted soft pastel-lavender purple ice-blended ube cream frappe (natural realistic ube hue, never neon purple), crowned with a neat peak of softly piped white whipped cream. *(+ Shared Menu Style Suffix)*

### 19. `frappuccino/cream-based/strawberry-frappe.jpg`
- **Current issue:** `95×118` (`5.6 KB`) tiny crop (`current-images-to-improve/frappuccino/cream-based/strawberry-frappe.jpg`).
- **Match style reference:** `style-references/03-ref-frappuccino-oak.jpg`
- **Target path:** `public/images/pahina-menu-assets/frappuccino/cream-based/strawberry-frappe.jpg`
- **What it needs to look like / Prompt:** Strawberry Cream Frappe in a tall clear café glass resting on a folded neutral oatmeal linen napkin with a slender spoon on a warm oak tabletop: creamy natural blush-pink ice-blended strawberry cream drink with delicate ruby berry ribbons along the glass wall, crowned with softly piped white whipped cream and a subtle berry drizzle. *(+ Shared Menu Style Suffix)*

### 20. `frappuccino/cream-based/matcha-frappe.jpg`
- **Current issue:** `95×118` (`4.7 KB`) tiny crop (`current-images-to-improve/frappuccino/cream-based/matcha-frappe.jpg`).
- **Match style reference:** `style-references/03-ref-frappuccino-oak.jpg`
- **Target path:** `public/images/pahina-menu-assets/frappuccino/cream-based/matcha-frappe.jpg`
- **What it needs to look like / Prompt:** Ceremonial Matcha Cream Frappe in a tall clear café glass resting on a folded neutral oatmeal linen napkin with a slender spoon on a warm oak tabletop: velvety earthy sage-green ice-blended matcha cream drink, crowned with softly piped white whipped cream and a delicate dusting of fine green matcha powder. *(+ Shared Menu Style Suffix)*

### 21. `pasta/spaghetti-bolognese.jpg`
- **Current issue:** `111×138` (`7.2 KB`) tiny crop (`current-images-to-improve/pasta/spaghetti-bolognese.jpg`).
- **Match style reference:** `style-references/05-ref-pasta-oak.jpg`
- **Target path:** `public/images/pahina-menu-assets/pasta/spaghetti-bolognese.jpg`
- **What it needs to look like / Prompt:** Spaghetti Bolognese in a shallow matte cream-speckled stoneware bowl beside a folded neutral linen napkin and brushed fork on a warm oak café table, 45-degree angle: al dente spaghetti crowned with rich slow-simmered savory tomato and beef ragu sauce, a light dusting of grated aged parmesan, and a single fresh green basil leaf. *(+ Shared Menu Style Suffix)*

### 22. `pasta/chicken-alfredo.jpg`
- **Current issue:** `111×138` (`7.9 KB`) tiny crop (`current-images-to-improve/pasta/chicken-alfredo.jpg`).
- **Match style reference:** `style-references/05-ref-pasta-oak.jpg`
- **Target path:** `public/images/pahina-menu-assets/pasta/chicken-alfredo.jpg`
- **What it needs to look like / Prompt:** Chicken Alfredo pasta ribbons neatly twirled in a shallow matte cream-speckled stoneware bowl beside a folded neutral linen napkin and brushed fork on a warm oak café table, 45-degree angle: velvety ivory parmesan cream sauce topped with neatly sliced tender golden pan-seared chicken breast, freshly cracked black pepper, and finely chopped parsley. *(+ Shared Menu Style Suffix)*

### 23. `pizza/hawaiian-pizza.jpg`
- **Current issue:** `106×132` (`7.8 KB`) tiny crop (`current-images-to-improve/pizza/hawaiian-pizza.jpg`).
- **Match style reference:** `style-references/05-ref-pasta-oak.jpg` & `02-ref-hot-coffee-oak.jpg`
- **Target path:** `public/images/pahina-menu-assets/pizza/hawaiian-pizza.jpg`
- **What it needs to look like / Prompt:** Café-sized artisan Hawaiian Pizza served on a round warm oak wooden serving board on a warm oak café tabletop, 45–55 degree three-quarter editorial angle: blistered golden artisan crust, tomato sauce, bubbling melted mozzarella, lightly caramelized golden pineapple tidbits, and savory folded roasted ham slices. *(+ Shared Menu Style Suffix)*

---

## Batch C — Priority 3: Bespoke Reading Room Scenes (`5` Images)

Right now `/reading-room` uses PAHINA's existing architectural photos cleanly, **but those same files are reused across Home, About, and Visit**. Generating these 5 dedicated scenes gives `/reading-room` its own original visual tour of customers reading inside PAHINA. (See full single-room spatial spec in `PAHINA-AMBIENCE-AND-READING-ROOM.md`.)

**Mandatory Architectural Continuity (match `style-references/10-ref-single-room-cashier-layout.jpg` for floorplan + `08-ref-reading-room-wide-interior.jpg` & `09-ref-reading-room-window-corner.jpg` for PAHINA's palette):**
- **One single open café room** (no separate back library hall): the cashier/espresso counter, the two 5-layer bookshelves, and the seating rows all share the same open room.
- **Right side — Cashier & Espresso Counter:** Long architectural counter with vertical warm natural oak wood slats, soft warm under-counter LED glow, glass food display case, espresso bar, and minimalist overhead menu frame.
- **Next to the Cashier — Two 5-Layer Bookshelves:** Directly beside the far end of the cashier counter on a muted pastel Powder Blue (`#B9D0E0`) wall stand **two side-by-side 5-layer (5-tier) warm oak wooden bookshelves** stocked with cloth-bound books.
- **Left side & Open Floor — Many Tables, Chairs & Outlets:** Across a wide walkway from the cashier counter runs a long cushioned oatmeal-linen wall banquette with a continuous row of warm oak tables and matching chairs, plus additional 2-person and 4-person oak table-and-chair sets and **accessible flush power outlets** built along the pastel blue-grey wall wainscoting and banquette base.
- Soft natural window daylight blended with warm café track lighting on Paper White (`#F4F1EA`) and warm oak/stone surfaces — **strictly NO gibberish text on menu boards, book covers, or spines**.

### 24. `atmospheric/reading-room-opening.jpg` (`3:4` / `4:5` portrait)
- **Replaces reuse of:** `hero-cafe.jpg` in `ReadingRoomBookHero`
- **Match style references:** `style-references/10-ref-single-room-cashier-layout.jpg` + `08-ref-reading-room-wide-interior.jpg`
- **Target path:** `public/images/atmospheric/reading-room-opening.jpg`
- **What it needs to look like / Prompt:** Wide architectural overview of PAHINA's single-room café and reading room, vertical 3:4 portrait, matching the exact layout of `10-ref-single-room-cashier-layout.jpg` in PAHINA's pastel Powder Blue (#B9D0E0), Paper White (#F4F1EA), and warm natural oak palette: on the right stretches the long cashier and espresso counter with vertical warm oak wood slats, soft warm under-counter lighting, glass food display case, and minimalist overhead menu frame. Directly beside the end of the cashier counter on the pastel Powder Blue feature wall stand two side-by-side 5-layer (5-tier) warm oak bookshelves filled with muted cloth-bound books. Across the wide walkway on the left runs a long cushioned wall banquette with a row of warm oak tables, matching wooden chairs, and visible flush power outlets along the wall and banquette base, plus additional table-and-chair sets where a few guests sit reading open books beside coffee cups. Soft daylight blended with warm café lighting, zero readable text or logos.

### 25. `atmospheric/reading-room-browsing.jpg` (`4:3` landscape)
- **Replaces reuse of:** `reading-room-hero.jpg` in Reading Room Tour Spread 1
- **Match style references:** `style-references/10-ref-single-room-cashier-layout.jpg` + `09-ref-reading-room-window-corner.jpg`
- **Target path:** `public/images/atmospheric/reading-room-browsing.jpg`
- **What it needs to look like / Prompt:** Candid natural-light editorial photograph inside PAHINA's single open café room, horizontal 4:3 landscape: medium-wide view showing the junction where the warm oak-slat cashier and pastry display counter on the right meets the muted pastel Powder Blue (#B9D0E0) wall holding two side-by-side 5-layer (5-tier) warm oak wooden bookshelves stocked with cloth-bound books. A customer who just ordered at the cashier stands beside the counter gently choosing a book from one of the 5 shelf tiers, while to the left across the walkway, rows of warm oak tables, cushioned chairs, and wall banquette seating with power outlets sit ready in soft daylight and warm café lighting. Strictly no readable text on books or menu boards.

### 26. `atmospheric/reading-room-window-table.jpg` (`3:4` / `4:5` portrait)
- **Replaces reuse of:** `reading-room-nook.jpg` in Reading Room Tour Spread 2
- **Match style references:** `style-references/10-ref-single-room-cashier-layout.jpg` + `08-ref-reading-room-wide-interior.jpg`
- **Target path:** `public/images/atmospheric/reading-room-window-table.jpg`
- **What it needs to look like / Prompt:** Editorial perspective along PAHINA's left-side seating zone inside the single open café room, vertical 3:4 portrait: a reader seated at one of many warm oak tables lined along a cushioned oatmeal-linen wall banquette with matching oak chairs opposite, an open hardcover book and ceramic stoneware latte cup on the table. Right beside the table along the pastel Powder Blue (#B9D0E0) wall wainscoting and banquette base are clean flush duplex power outlets. Across the open walkway in the softly focused background are the warm oak-slat cashier counter and the two 5-layer wooden bookshelves next to the register. Soft window daylight and warm café lighting, zero text artifacts.

### 27. `atmospheric/reading-room-lounge.jpg` (`4:3` landscape)
- **Replaces reuse of:** `banner-spread.jpg` in Reading Room Tour Spread 3
- **Match style references:** `style-references/10-ref-single-room-cashier-layout.jpg` + `09-ref-reading-room-window-corner.jpg`
- **Target path:** `public/images/atmospheric/reading-room-lounge.jpg`
- **What it needs to look like / Prompt:** Serene daylight-and-warm-track-lit interior photograph of PAHINA's single-room floorplan, horizontal 4:3 landscape (no people): looking from the seating area across many neatly arranged sets of warm natural oak tables, cushioned chairs, and the wall banquette row with accessible power outlets clearly visible along the pastel Powder Blue (#B9D0E0) lower wall molding beside each table. On the foreground oak table rests an open cloth-bound book with a powder-blue ribbon bookmark beside a ceramic coffee cup; in the background stand the two side-by-side 5-layer oak bookshelves right beside the vertical oak-slat cashier and espresso counter. Clean editorial photography, zero readable text.

### 28. `atmospheric/reading-room-afternoon.jpg` (`3:4` / `4:5` portrait)
- **Replaces reuse of:** `hero-flatlay.jpg` in Reading Room Tour Spread 4
- **Match style references:** `style-references/10-ref-single-room-cashier-layout.jpg` + `08-ref-reading-room-wide-interior.jpg`
- **Target path:** `public/images/atmospheric/reading-room-afternoon.jpg`
- **What it needs to look like / Prompt:** Warm mid-afternoon editorial photograph inside PAHINA's single open room, vertical 3:4 portrait: soft daylight and warm café lights illuminate the many sets of warm oak tables and upholstered chairs along the left banquette wall (with power outlets at table height) and the vertical oak-slat cashier counter and two 5-layer oak bookshelves on the pastel Powder Blue (#B9D0E0) wall across the walkway. Guests and students sit comfortably at several tables reading books, writing in notebooks, and sipping iced coffee from fluted glasses while a barista stands quietly at the espresso bar. Welcoming neighborhood book-café atmosphere, zero readable text.

---

## Batch D — Priority 4: Bespoke Paper White (`#F4F1EA`) Editorial Studio Shots (`2` Images)

Match `style-references/06-ref-studio-cutout-paper.jpg` and `07-ref-studio-flatlay-paper.jpg` exactly: uniform seamless solid warm Paper White (`#F4F1EA`) background reaching all four edges with generous breathing margin and soft diffused studio daylight shadows so the image blends invisibly into PAHINA's `#F4F1EA` canvas.

### 29. `editorial/menu-hero-flatlay.jpg` (`3:4` / `4:5` portrait)
- **Current issue:** `/menu` hero currently reuses `story-pours.jpg`, which is already used on Home (`HomeWrapStory`) and About (`aboutMaterialsFlatlay`).
- **Match style reference:** `style-references/07-ref-studio-flatlay-paper.jpg`
- **Target path:** `public/images/editorial/menu-hero-flatlay.jpg`
- **What it needs to look like / Prompt:** Minimalist high-end café editorial still-life photographed from an elevated 45-degree angle on a completely seamless solid warm Paper White (`#F4F1EA`) background with generous clean margin around all four edges: a matte cream stoneware cappuccino cup with delicate microfoam on a ceramic saucer, a clear tall fluted glass of iced coffee with crystal ice and espresso marbling, a slender brushed stainless teaspoon, and a small folded neutral-linen coaster (distinct airy composition from `story-pours.jpg`). Soft diffused morning studio light, gentle realistic shadows, zero text or logos.

### 30. `editorial/float-signature-chocolate.jpg` (`3:4` / `4:5` portrait)
- **Current issue:** Home's `ScatteredMenuSpread` currently renders `Signature Chocolate` using the oak-tabletop photo inside an oval feather mask, whereas its neighbors (`Caramel Macchiato` & `Spanish Latte`) are seamless Paper White studio cutouts.
- **Match style reference:** `style-references/06-ref-studio-cutout-paper.jpg`
- **Target path:** `public/images/editorial/float-signature-chocolate.jpg`
- **What it needs to look like / Prompt:** Isolated minimalist studio product photograph matching `06-ref-studio-cutout-paper.jpg` exactly in scale, camera height, and framing: a single tall clear fluted glass of Iced Signature Chocolate over crystal ice cubes, rich velvety dark cocoa body with gentle cold sheen (no whipped cream), centered with generous uniform solid `#F4F1EA` Paper White margin on all four sides and a soft natural daylight shadow cast gently to the right. Zero text or logos.

---

## Wiring Checklist After Images Are Generated

Once files are copied into `public/images/`, update `src/data/editorialImages.ts`:

1. Add all newly replaced menu IDs to `HIGH_RES_MENU_IDS` (once all 23 menu files are replaced, all **39** menu items will be high-res and `compact-specimen` boxes disappear completely).
2. Remove `"spanish-latte"` from `MENU_HIGH_RES_OVERRIDES` once `public/images/pahina-menu-assets/coffee/spanish-latte.jpg` is replaced.
3. Point `EDITORIAL_IMAGES.menuHeroFlatlay` to `"/images/editorial/menu-hero-flatlay.jpg"`.
4. Add `"signature-chocolate": "/images/editorial/float-signature-chocolate.jpg"` to `FLOATING_MENU_CUTOUTS`.
5. Point `EDITORIAL_IMAGES.readingRoomHero` and `EDITORIAL_IMAGES.readingRoomTour` to the 5 new `atmospheric/reading-room-*.jpg` paths (and update `aspect` on `READING_ROOM_MOMENTS` in `src/data/books.ts` if any spread changes between portrait and landscape).
6. Run `npx tsc --noEmit && npm run lint && npm run build` to verify zero issues.
