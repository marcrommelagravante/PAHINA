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
  homeReadingFeature: "/images/atmospheric/reading-room-nook.jpg",

  // Menu
  menuHeroFlatlay: "/images/editorial/story-pours.jpg",
  menuFoodBanner: "/images/editorial/banner-spread.jpg",

  // Reading Room — architectural interior & reading moments
  readingRoomHero: "/images/atmospheric/hero-cafe.jpg",
  readingRoomBanner: "/images/atmospheric/reading-room-hero.jpg",
  readingRoomTour: {
    windowCorner: "/images/atmospheric/reading-room-hero.jpg",
    tableNook: "/images/atmospheric/reading-room-nook.jpg",
    tableSpread: "/images/editorial/banner-spread.jpg",
    morningRitual: "/images/editorial/hero-flatlay.jpg",
  },

  // About
  aboutHeroPhoto: "/images/editorial/hero-flatlay.jpg",
  aboutNamePhoto: "/images/editorial/float-open-book-crop.jpg",
  aboutInteriorBanner: "/images/atmospheric/hero-cafe.jpg",
  aboutPrinciples: {
    scale: "/images/atmospheric/hero-cafe.jpg",
    comfort: "/images/atmospheric/reading-room-hero.jpg",
    shelves: "/images/atmospheric/reading-room-nook.jpg",
    ritual: "/images/editorial/float-cafe-latte-crop.jpg",
  },
  aboutMaterialsFlatlay: "/images/editorial/story-pours.jpg",

  // Visit
  visitWindowsillPhoto: "/images/atmospheric/reading-room-hero.jpg",
} as const;

/**
 * Seamless Paper White (#F4F1EA) floating cutout images reserved for
 * borderless Home editorial spreads.
 */
export const FLOATING_MENU_CUTOUTS: Partial<Record<string, string>> = {
  "caramel-macchiato": "/images/editorial/float-caramel-macchiato.jpg",
  "spanish-latte": "/images/editorial/float-spanish-latte-crop.jpg",
  "cafe-latte": "/images/editorial/float-cafe-latte-crop.jpg",
  "aglio-olio": "/images/editorial/float-aglio-olio-crop.jpg",
};

/**
 * Menu item IDs that currently have crisp high-resolution (>= 640px)
 * photography on disk. Items outside this set display as compact native-size
 * editorial specimen plates so they are never stretched blurry.
 *
 * Add item IDs here as remaining Batch B files are dropped in.
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
  "signature-chocolate",
  "strawberry-milk-latte",
  "caramel-frappe",
  "hazelnut-frappe",
  "java-chip-frappe",
  "mocha-frappe",
  "salted-caramel-oreo-frappe",
  "lotus-biscoff-frappe",
  "peanut-butter-cookie-frappe",
  "aglio-olio",
  "creamy-carbonara",
  "creamy-pesto",
  "classic-cheese-pizza",
  "pepperoni-pizza",
  "four-cheese-pizza",
  "truffle-parmesan-fries",
  "cheese-fries",
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
