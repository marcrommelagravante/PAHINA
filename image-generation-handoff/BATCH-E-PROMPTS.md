# PAHINA — Batch E: Full-Site Visual Consistency Polish (`10` Images)

Generate **1 individual full-bleed image per prompt** in Google AI Studio (never a collage/grid) and save all 10 files into `image-generation-handoff/BATCH E/`.

> **Global Rules (all 10 images):**
> - **Zero text, zero logos, zero brand embossing, zero watermarks, zero gibberish letters** on book spines, signs, menus, or cookies.
> - **Interior continuity:** Every architectural shot (`#1`–`#6`) MUST match the exact single-room interior established in `public/images/atmospheric/reading-room-*.jpg` — clean flat pastel **Powder Blue** (`#B9D0E0`) back wall & wainscoting, Paper White (`#F4F1EA`) upper walls with subtle framed botanical folk prints, vertical warm oak-slat counter with soft warm linear LED under-glow, **two side-by-side tall warm oak bookshelves** with brass picture lights, long cushioned oatmeal-linen banquette, warm oak tables & matching oak-and-linen chairs, flush duplex wall/banquette outlets, and warm herringbone oak floors.

---

## Part 1 — Unified Interior & Brand Shots (`6` Images: About, Home & Visit)

Replaces the 3 outdated mismatched interior photos (`hero-cafe.jpg`, `reading-room-hero.jpg`, `reading-room-nook.jpg`) so every page belongs to the exact same physical café.

### `#1` `about-interior-banner.jpg` — **`16:9` WIDE LANDSCAPE** (`~1376×768` or higher)
- **Target slot:** `/about` wide `EditorialBanner` ("Designed for breathing room")
- **Attach references:**
  - `public/images/atmospheric/reading-room-opening.jpg`
  - `public/images/atmospheric/reading-room-browsing.jpg`
- **Prompt:**
> Wide panoramic horizontal 16:9 architectural editorial photograph inside this EXACT single-room neighborhood book-café, emphasizing open breathing space and generous walkways: on the right runs the curved vertical warm natural oak-slat cashier and espresso counter with soft warm under-counter LED glow, pale stone top, glass pastry case, and minimalist overhead menu board frame (abstract blank lines only, zero readable text); at the far back on the clean flat pastel Powder Blue (#B9D0E0) wall stand the two side-by-side tall warm oak bookshelves with brass picture lights stocked with muted cloth-bound books; along the left runs the long cushioned oatmeal-linen wall banquette with a neatly spaced row of warm oak two-top tables, matching oak-and-linen chairs, flush duplex power outlets along the Powder Blue wainscoting, tall arched window light, and framed botanical folk prints on the Paper White (#F4F1EA) upper wall; warm herringbone oak floor across a wide uncluttered central aisle. Calm natural morning daylight blended with subtle café track lighting, no people, strictly NO text, NO logos, NO watermarks.

### `#2` `about-principle-scale.jpg` — **`3:4` VERTICAL PORTRAIT** (`~896×1200`)
- **Target slot:** `/about` Principle 1 ("Boutique neighborhood scale")
- **Attach references:**
  - `public/images/atmospheric/reading-room-opening.jpg`
  - `public/images/atmospheric/reading-room-browsing.jpg`
- **Prompt:**
> Crisp vertical 3:4 portrait architectural editorial photograph inside this EXACT single-room café taken from a slightly angled mid-room perspective highlighting its compact, approachable neighborhood scale: foreground right shows the warm vertical oak-slat espresso and pastry display counter with soft under-counter glow and clean pale stone top; foreground left shows two neatly spaced warm oak two-top tables with cushioned oatmeal-linen chairs and generous herringbone oak floor walking room between them; background shows the pastel Powder Blue (#B9D0E0) feature wall with the two matching oak bookshelves. Soft natural daylight from the left, calm uncrowded composition, strictly NO text, NO logos, NO gibberish letters.

### `#3` `about-principle-comfort.jpg` — **`3:4` VERTICAL PORTRAIT** (`~896×1200`)
- **Target slot:** `/about` Principle 2 ("Comfort before shelf count")
- **Attach references:**
  - `public/images/atmospheric/reading-room-lounge.jpg`
  - `public/images/atmospheric/reading-room-window-table.jpg`
- **Prompt:**
> Crisp vertical 3:4 portrait architectural editorial photograph inside this EXACT single-room café focusing on natural daylight and seating comfort along the left wall: tall black-mullioned windows flooding soft morning sunlight onto the long plush oatmeal-linen wall banquette, warm oak tables, matching cushioned oak chairs, framed botanical folk prints on the Paper White (#F4F1EA) upper wall, and clean flush power outlets built neatly into the pastel Powder Blue (#B9D0E0) wainscoting and banquette base. In the softly receding background sit the two oak bookshelves on the Powder Blue end wall. Airy, sunlit, unhurried boutique café atmosphere, no people, zero text or logos.

### `#4` `about-principle-shelves.jpg` — **`3:4` VERTICAL PORTRAIT** (`~896×1200`)
- **Target slot:** `/about` Principle 3 ("Shared in-café shelves")
- **Attach references:**
  - `public/images/atmospheric/reading-room-browsing.jpg`
  - `public/images/atmospheric/reading-room-opening.jpg`
- **Prompt:**
> Crisp vertical 3:4 portrait editorial photograph inside this EXACT single-room café looking squarely toward the clean flat pastel Powder Blue (#B9D0E0) feature wall holding the two side-by-side tall warm natural oak bookshelves topped with slim brass picture lights, neatly stocked with muted cloth-bound hardcover books in soft slate, cream, sage, and warm taupe tones (strictly blank/unreadable spines, zero gibberish letters). In the soft foreground bottom-left sits the corner of a warm oak café table with a matte cream stoneware coffee cup, and at the right edge appears the clean pale stone corner of the vertical oak-slat counter. Soft balanced daylight, zero text or logos.

### `#5` `home-reading-nook.jpg` — **`3:4` VERTICAL PORTRAIT** (`~896×1200`)
- **Target slot:** Home (`/`) Beat 5 (`HomeReadingFinale` — "Find a story worth staying for")
- **Attach references:**
  - `public/images/atmospheric/reading-room-lounge.jpg`
  - `public/images/atmospheric/reading-room-window-table.jpg`
- **Prompt:**
> Intimate vertical 3:4 portrait editorial café photograph taken at table height inside this EXACT single-room café: in sharp foreground focus on a warm natural oak café table rests an open linen-bound cream-paged book (blank/soft cream pages, zero readable text) marked with a muted powder-blue ribbon bookmark beside a matte cream stoneware espresso/latte cup on a matching saucer with a small brushed teaspoon. Softly out of focus in the background are the plush oatmeal-linen wall banquette, clean pastel Powder Blue (#B9D0E0) lower wainscoting with a subtle flush wall outlet, tall window daylight from the left, and the warm oak bookshelves softly visible in the distance. Calm morning window sunlight across the wood grain, photorealistic editorial photography, zero text or watermarks.

### `#6` `visit-storefront.jpg` — **`4:3` HORIZONTAL LANDSCAPE** (`~1200×896`)
- **Target slot:** `/visit` "Getting here" storefront showcase (`VisitInformation.tsx`)
- **Attach references:**
  - `public/images/atmospheric/reading-room-opening.jpg`
  - `public/images/atmospheric/reading-room-lounge.jpg`
- **Prompt:**
> Calm horizontal 4:3 daylight architectural editorial photograph of the exterior street-level storefront of this boutique neighborhood book-café, matching its interior architecture and palette: a modest, understated muted pastel Powder Blue (#B9D0E0) and warm Paper White (#F4F1EA) paneled facade with tall arched and black-mullioned clear glass storefront windows, a warm natural oak-framed glass entrance door, a couple of understated potted olive/greenery planters on a clean pale stone sidewalk, and warm inviting glimpses through the glass into the single open room inside showing the warm oak tables, soft pendant/track glow, vertical oak-slat counter, and wooden bookshelves. Strictly NO storefront sign text, NO brand lettering, NO street signs, NO logos, NO people crowding the entrance. Clean soft overcast morning light, realistic European/neighborhood editorial photography.

---

## Part 2 — Menu Frappuccino Consistency Swaps (`3` Images, `3:4` Portrait)

Replaces the 3 older pre-Batch-A frappuccinos that clash with PAHINA's bright room (dark red brick wall, `"OREO"` cookie logo, and dark brown leather/wood backdrop).

- **Attach this EXACT style reference for all 3 (`#7`, `#8`, `#9`):**
  - `public/images/pahina-menu-assets/frappuccino/cream-based/oreo-frappe.jpg`

### `#7` `salted-caramel-oreo-frappe.jpg` — **`3:4` VERTICAL PORTRAIT** (`~896×1200`)
- **Prompt:**
> Photorealistic commercial café beverage photograph, vertical 3:4 portrait, matching the EXACT oak tabletop angle, folded neutral oatmeal linen napkin, slender brushed stainless spoon, soft directional morning window light from the left, and softly blurred muted pastel blue-grey (#B9D0E0) café wall and oak chair background of the reference image: a tall clear straight café glass of espresso-based Salted Caramel Oreo Frappe—creamy golden-tan ice-blended coffee frappe speckled with fine dark chocolate cookie crumbs and subtle amber salted caramel swirls inside the glass, crowned with softly piped white whipped cream, a delicate glossy amber salted caramel drizzle, fine dark cookie crumble, and a plain unbranded dark chocolate sandwich cookie tucked neatly at the edge (strictly NO readable text, NO "OREO" lettering, NO brand embossing on the cookie). Zero text, logos, or watermarks.

### `#8` `java-chip-frappe.jpg` — **`3:4` VERTICAL PORTRAIT** (`~896×1200`)
- **Prompt:**
> Photorealistic commercial café beverage photograph, vertical 3:4 portrait, matching the EXACT oak tabletop angle, folded neutral oatmeal linen napkin, slender brushed stainless spoon, soft directional morning window light from the left, and softly blurred muted pastel blue-grey (#B9D0E0) café wall and oak chair background of the reference image: a tall clear straight café glass of espresso-based Java Chip Frappe—rich velvety mocha-brown ice-blended coffee frappe generously flecked with fine dark chocolate chips throughout, crowned with softly piped white whipped cream, a restrained dark chocolate drizzle, and tiny dark chocolate chips scattered on top. Zero text, logos, or watermarks.

### `#9` `mocha-frappe.jpg` — **`3:4` VERTICAL PORTRAIT** (`~896×1200`)
- **Prompt:**
> Photorealistic commercial café beverage photograph, vertical 3:4 portrait, matching the EXACT oak tabletop angle, folded neutral oatmeal linen napkin, slender brushed stainless spoon, soft directional morning window light from the left, and softly blurred muted pastel blue-grey (#B9D0E0) café wall and oak chair background of the reference image: a tall clear straight café glass of espresso-based Mocha Frappe—smooth velvety chocolate-espresso ice-blended coffee frappe with delicate dark cocoa ribbons along the glass wall, crowned with softly piped white whipped cream and a subtle dark chocolate drizzle. Zero text, logos, or watermarks.

---

## Part 3 — Home Floating Cutout Parity (`1` Image, `3:4` Portrait)

### `#10` `float-spanish-latte.jpg` — **`3:4` VERTICAL PORTRAIT** (`~896×1200`)
- **Target slot:** Home (`/`) `ScatteredMenuSpread` (so all 3 floating drinks — `Caramel Macchiato`, `Spanish Latte`, `Signature Chocolate` — share identical straight-on fluted glass scale, camera angle, and seamless `#F4F1EA` Paper White canvas!)
- **Attach references:**
  - `public/images/editorial/float-caramel-macchiato.jpg` *(for EXACT glass scale, camera height, centering, and shadow)*
  - `public/images/editorial/float-signature-chocolate.jpg` *(for EXACT seamless `#F4F1EA` Paper White tone)*
  - `public/images/pahina-menu-assets/coffee/spanish-latte.jpg` *(for the exact Spanish Latte drink layers)*
- **Prompt:**
> Isolated minimalist studio product photograph, vertical 3:4 portrait (~896x1200), matching `float-caramel-macchiato.jpg` and `float-signature-chocolate.jpg` EXACTLY in fluted glass scale, straight-on camera height, centering, and soft shadow: a single tall clear fluted glass of Iced Spanish Latte over crystal ice cubes (no straw, no whipped cream), showing a distinct pale creamy sweetened condensed milk layer at the bottom beneath a rich amber-gold espresso cascade marbling gently downward through cold milk. Completely uniform, seamless solid warm Paper White (#F4F1EA) background reaching ALL FOUR EDGES with generous clean breathing margin on all sides and a soft natural morning daylight shadow cast gently to the right. Strictly NO white outer border, NO text, NO logos, NO watermarks.
