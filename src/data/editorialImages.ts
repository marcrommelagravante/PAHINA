/**
 * Central registry for PAHINA's daylight editorial & floating cutout imagery.
 *
 * Seamless Paper White (#F4F1EA) assets available now:
 * - hero-flatlay.jpg             (1200x896) — Home & About hero flat-lay
 * - story-pours.jpg              (623x846)  — Home wrap story, Menu hero, About materials
 * - banner-spread.jpg            (1376x768) — Home & Menu wide overhead interlude
 * - float-caramel-macchiato.jpg  (896x1200) — Caramel Macchiato seamless cutout
 * - float-spanish-latte-crop.jpg (640x800)  — Spanish Latte seamless cutout
 * - float-cafe-latte-crop.jpg    (640x800)  — Café Latte ceramic cutout
 * - float-aglio-olio-crop.jpg    (640x800)  — Aglio Olio stoneware bowl cutout (also upgraded aglio-olio.jpg)
 * - float-open-book-crop.jpg     (800x640)  — Open book with powder-blue ribbon cutout
 *
 * Remaining slots fall back cleanly to verified high-res daylight assets (or
 * unstretched native-size editorial specimen plates for low-res food crops)
 * until Pass 2 generates dedicated shots.
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

  // Reading Room
  readingRoomHeroPhoto: "/images/editorial/float-open-book-crop.jpg",
  readingRoomBanner: "/images/atmospheric/reading-room-hero.jpg",
  genreMoods: {
    fiction: "/images/editorial/float-open-book-crop.jpg",
    romance: "/images/editorial/float-cafe-latte-crop.jpg",
    mystery: "/images/pahina-menu-assets/coffee/cafe-americano.jpg",
    philosophy: "/images/editorial/hero-flatlay.jpg",
    poetry: "/images/pahina-menu-assets/coffee/cappuccino.jpg",
    nonfiction: "/images/atmospheric/reading-room-nook.jpg",
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
 * Seamless Paper White floating cutout images for showcased items.
 */
export const FLOATING_MENU_CUTOUTS: Partial<Record<string, string>> = {
  "caramel-macchiato": "/images/editorial/float-caramel-macchiato.jpg",
  "spanish-latte": "/images/editorial/float-spanish-latte-crop.jpg",
  "cafe-latte": "/images/editorial/float-cafe-latte-crop.jpg",
  "aglio-olio": "/images/editorial/float-aglio-olio-crop.jpg",
};

/**
 * Temporary verified 896x1200 daylight stand-ins for Signature showcase drinks
 * whose dedicated floating cutouts are queued for Pass 2.
 */
export const SHOWCASE_HIGH_RES_FALLBACKS: Partial<Record<string, string>> = {
  "signature-chocolate": "/images/pahina-menu-assets/coffee/cafe-mocha.jpg",
};

/**
 * Menu item IDs that have crisp high-resolution (>= 640px) photography
 * on disk. Items outside this set are never stretched past compact native sizes.
 */
export const HIGH_RES_MENU_IDS = new Set<string>([
  "cafe-americano",
  "cafe-latte",
  "cappuccino",
  "cafe-mocha",
  "caramel-macchiato",
  "spanish-latte",
  "biscoff-latte",
  "vanilla-latte",
  "white-chocolate-mocha",
  "caramel-frappe",
  "hazelnut-frappe",
  "java-chip-frappe",
  "mocha-frappe",
  "salted-caramel-oreo-frappe",
  "aglio-olio",
]);

export interface ShowcaseImageResolution {
  src: string;
  mode: "cutout" | "high-res" | "compact-specimen";
}

export function resolveShowcaseMenuImage(
  itemId: string,
  defaultSrc: string
): ShowcaseImageResolution {
  const cutout = FLOATING_MENU_CUTOUTS[itemId];
  if (cutout) {
    return { src: cutout, mode: "cutout" };
  }

  const highResFallback = SHOWCASE_HIGH_RES_FALLBACKS[itemId];
  if (highResFallback) {
    return { src: highResFallback, mode: "high-res" };
  }

  if (HIGH_RES_MENU_IDS.has(itemId)) {
    return { src: defaultSrc, mode: "high-res" };
  }

  return { src: defaultSrc, mode: "compact-specimen" };
}
