/**
 * Central registry for PAHINA's daylight editorial & floating cutout imagery.
 *
 * Slots upgraded in Pass 1 (4/4 generated before daily image quota reset):
 * - homeHeroFlatlay      -> /images/editorial/hero-flatlay.jpg (1200x896)
 * - homeStoryPours       -> /images/editorial/story-pours.jpg (623x846)
 * - homeBannerSpread     -> /images/editorial/banner-spread.jpg (1376x768)
 * - menuFoodBanner       -> /images/editorial/banner-spread.jpg (1376x768)
 * - caramel-macchiato    -> /images/editorial/float-caramel-macchiato.jpg (896x1200)
 *                           (also replaced public/images/pahina-menu-assets/coffee/caramel-macchiato.jpg)
 *
 * Remaining slots fall back cleanly to verified high-res daylight assets (or
 * unstretched native-size editorial specimen plates for low-res food crops)
 * until Pass 2 generates them.
 */

export const EDITORIAL_IMAGES = {
  marbleTexture: "/images/editorial/paper-marble.jpg",
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
  readingRoomHeroPhoto: "/images/atmospheric/reading-room-nook.jpg",
  readingRoomBanner: "/images/atmospheric/reading-room-hero.jpg",
  genreMoods: {
    fiction: "/images/atmospheric/reading-room-nook.jpg",
    romance: "/images/pahina-menu-assets/coffee/cafe-latte.jpg",
    mystery: "/images/pahina-menu-assets/coffee/cafe-americano.jpg",
    philosophy: "/images/editorial/hero-flatlay.jpg",
    poetry: "/images/pahina-menu-assets/coffee/cappuccino.jpg",
    nonfiction: "/images/atmospheric/hero-cafe.jpg",
  },

  // About
  aboutHeroPhoto: "/images/editorial/hero-flatlay.jpg",
  aboutNamePhoto: "/images/atmospheric/reading-room-nook.jpg",
  aboutInteriorBanner: "/images/atmospheric/hero-cafe.jpg",
  aboutPrinciples: {
    scale: "/images/atmospheric/hero-cafe.jpg",
    comfort: "/images/atmospheric/reading-room-hero.jpg",
    shelves: "/images/atmospheric/reading-room-nook.jpg",
    ritual: "/images/pahina-menu-assets/coffee/cafe-latte.jpg",
  },
  aboutMaterialsFlatlay: "/images/editorial/story-pours.jpg",

  // Visit
  visitWindowsillPhoto: "/images/atmospheric/reading-room-hero.jpg",
} as const;

/**
 * Seamless Paper White floating cutout images generated for showcased items.
 */
export const FLOATING_MENU_CUTOUTS: Partial<Record<string, string>> = {
  "caramel-macchiato": "/images/editorial/float-caramel-macchiato.jpg",
};

/**
 * Temporary verified 896x1200 daylight stand-ins for Signature showcase drinks
 * whose dedicated floating cutouts are queued for Pass 2.
 */
export const SHOWCASE_HIGH_RES_FALLBACKS: Partial<Record<string, string>> = {
  "spanish-latte": "/images/pahina-menu-assets/coffee/white-chocolate-mocha.jpg",
  "signature-chocolate": "/images/pahina-menu-assets/coffee/cafe-mocha.jpg",
};

/**
 * Menu item IDs that already have crisp high-resolution (>= 800px) photography
 * on disk. Items outside this set are never stretched past compact native sizes.
 */
export const HIGH_RES_MENU_IDS = new Set<string>([
  "cafe-americano",
  "cafe-latte",
  "cappuccino",
  "cafe-mocha",
  "caramel-macchiato",
  "biscoff-latte",
  "vanilla-latte",
  "white-chocolate-mocha",
  "caramel-frappe",
  "hazelnut-frappe",
  "java-chip-frappe",
  "mocha-frappe",
  "salted-caramel-oreo-frappe",
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
