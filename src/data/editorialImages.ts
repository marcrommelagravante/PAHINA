/**
 * Central registry for PAHINA's daylight editorial, menu, and Reading Room imagery.
 *
 * High-resolution café-tabletop menu photos live under:
 *   public/images/pahina-menu-assets/<category>/<item-id>.jpg
 *
 * Seamless Paper White (#F4F1EA) editorial cutouts for Home floating spreads live under:
 *   public/images/editorial/float-*.jpg
 *
 * Reading Room architectural & reading-moment scenes live under:
 *   public/images/atmospheric/
 *   (ready for 1:1 drop-in swaps when additional bespoke photography is added).
 */

export const EDITORIAL_IMAGES = {
  emblemSvg: "/images/brand/pahina-emblem.svg",

  // Home
  homeHeroFlatlay: "/images/editorial/hero-flatlay.jpg",
  homeStoryPours: "/images/editorial/story-pours.jpg",
  homeBannerSpread: "/images/editorial/banner-spread.jpg",
  homeReadingFeature: "/images/atmospheric/home-reading-nook.jpg",

  // Menu
  menuHeroFlatlay: "/images/editorial/menu-hero-flatlay.jpg",
  menuFoodBanner: "/images/editorial/banner-spread.jpg",

  // Reading Room — dedicated single-room architectural interior & reading scenes
  readingRoomHero: "/images/atmospheric/reading-room-opening.jpg",
  readingRoomBanner: "/images/atmospheric/reading-room-lounge.jpg",
  readingRoomTour: {
    windowCorner: "/images/atmospheric/reading-room-browsing.jpg",
    tableNook: "/images/atmospheric/reading-room-window-table.jpg",
    tableSpread: "/images/atmospheric/reading-room-lounge.jpg",
    morningRitual: "/images/atmospheric/reading-room-afternoon.jpg",
  },

  // About
  aboutHeroPhoto: "/images/editorial/hero-flatlay.jpg",
  aboutNamePhoto: "/images/editorial/float-open-book-crop.jpg",
  aboutInteriorBanner: "/images/atmospheric/about-interior-banner.jpg",
  aboutPrinciples: {
    scale: "/images/atmospheric/about-principle-scale.jpg",
    comfort: "/images/atmospheric/about-principle-comfort.jpg",
    shelves: "/images/atmospheric/about-principle-shelves.jpg",
    ritual: "/images/editorial/float-cafe-latte-crop.jpg",
  },
  aboutMaterialsFlatlay: "/images/editorial/story-pours.jpg",

  // Visit
  visitWindowsillPhoto: "/images/atmospheric/visit-storefront.jpg",
} as const;

/**
 * Seamless Paper White (#F4F1EA) floating cutout images reserved for
 * borderless Home editorial spreads.
 */
export const FLOATING_MENU_CUTOUTS: Partial<Record<string, string>> = {
  "caramel-macchiato": "/images/editorial/float-caramel-macchiato.jpg",
  "spanish-latte": "/images/editorial/float-spanish-latte.jpg",
  "signature-chocolate": "/images/editorial/float-signature-chocolate.jpg",
  "cafe-latte": "/images/editorial/float-cafe-latte-crop.jpg",
  "aglio-olio": "/images/editorial/float-aglio-olio-crop.jpg",
};

/**
 * Menu item IDs with crisp high-resolution (>= 640px) photography on disk.
 * All 39 menu items now use unified high-resolution café-tabletop shots.
 */
export const HIGH_RES_MENU_IDS = new Set<string>([
  "cafe-americano",
  "cafe-latte",
  "cappuccino",
  "cafe-mocha",
  "hazelnut-latte",
  "caramel-macchiato",
  "spanish-latte",
  "biscoff-latte",
  "vanilla-latte",
  "white-chocolate-mocha",
  "caramel-espresso-con-panna",
  "affogato",
  "oreo-dalgona",
  "signature-chocolate",
  "strawberry-milk-latte",
  "caramel-frappe",
  "hazelnut-frappe",
  "java-chip-frappe",
  "mocha-frappe",
  "salted-caramel-oreo-frappe",
  "lotus-biscoff-frappe",
  "oreo-frappe",
  "peanut-butter-cookie-frappe",
  "ube-frappe",
  "strawberry-frappe",
  "matcha-frappe",
  "aglio-olio",
  "creamy-carbonara",
  "spaghetti-bolognese",
  "creamy-pesto",
  "chicken-alfredo",
  "classic-cheese-pizza",
  "pepperoni-pizza",
  "hawaiian-pizza",
  "four-cheese-pizza",
  "classic-fries",
  "cheese-fries",
  "sour-cream-fries",
  "truffle-parmesan-fries",
]);

export interface ShowcaseImageResolution {
  src: string;
  mode: "cutout" | "high-res" | "compact-specimen";
}

/**
 * Resolves images for Home's borderless floating menu spread, preferring
 * seamless Paper White cutouts where available and falling back to high-res
 * café-tabletop shots.
 */
export function resolveHomeShowcaseImage(
  itemId: string,
  defaultSrc: string
): ShowcaseImageResolution {
  const cutout = FLOATING_MENU_CUTOUTS[itemId];
  if (cutout) {
    return { src: cutout, mode: "cutout" };
  }

  if (HIGH_RES_MENU_IDS.has(itemId)) {
    return { src: defaultSrc, mode: "high-res" };
  }

  return { src: defaultSrc, mode: "compact-specimen" };
}

/**
 * Resolves images for the /menu showcase cards and Tasting Sheet modal,
 * prioritizing unified daylight café-tabletop photography (`defaultSrc`)
 * for every high-res item rather than Paper White cutouts.
 */
export function resolveMenuShowcaseImage(
  itemId: string,
  defaultSrc: string
): ShowcaseImageResolution {
  if (HIGH_RES_MENU_IDS.has(itemId)) {
    return { src: defaultSrc, mode: "high-res" };
  }

  return { src: defaultSrc, mode: "compact-specimen" };
}

/** Backwards-compatible alias pointing to unified Menu resolution. */
export const resolveShowcaseMenuImage = resolveMenuShowcaseImage;
