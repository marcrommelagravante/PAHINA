export interface GalleryPhotoSource {
  id: string;
  src: string;
  alt: string;
  aspect: "portrait" | "landscape";
}

export interface GalleryTilePlacement {
  id: string;
  src: string;
  aspect: "portrait" | "landscape";
  x: number;
  y: number;
  z: number;
  scale: number;
  rotY: number;
  parallaxSpeed: number;
}

export interface AmbientStatusChip {
  id: string;
  label: string;
  /** Depth factor for parallax drift (0.6 = deeper/slower, 1.3 = closer/faster) */
  depth: number;
  /** Stagger offset inside Act 2 (0..1) */
  appearAt: number;
}

export const AFTER_HOURS_COPY = {
  act1: {
    line1: "EVERY PAGE",
    line2: "HOLDS A STORY",
    ctaLabel: "Visit Us",
    ctaHref: "/visit",
  },
  act2: {
    line1: "A QUIET PLACE",
    line2: "FOR CURIOUS MINDS",
    body: "Between espresso and the last chapter, PAHINA gives its neighbours a slower way to spend an afternoon.",
    ctaLabel: "Explore the Menu",
    ctaHref: "/menu",
  },
  act3: {
    headline: "THE BOOK IS ONLY THE BEGINNING",
    ctaLabel: "Explore the Reading Room",
    ctaHref: "/reading-room",
  },
} as const;

export const AMBIENT_STATUS_CHIPS: AmbientStatusChip[] = [
  {
    id: "espresso-pulled",
    label: "Espresso Pulled",
    depth: 1.15,
    appearAt: 0.08,
  },
  {
    id: "window-seat-free",
    label: "Window Seat Free",
    depth: 0.85,
    appearAt: 0.16,
  },
  {
    id: "book-returned",
    label: "Book Returned to Shelf",
    depth: 1.0,
    appearAt: 0.24,
  },
];

export const AFTER_HOURS_TEXTURES = {
  paperMarble: "/images/after-hours/textures/paper-marble.jpg",
  blackMarble: "/images/after-hours/textures/black-marble.jpg",
  linenCloth: "/images/after-hours/textures/linen-cloth.jpg",
  cremaSurface: "/images/after-hours/textures/crema-surface.jpg",
} as const;

export const AFTER_HOURS_STILLS = {
  act1: {
    src: "/images/after-hours/stills/still-act1-plinth-light.jpg",
    alt: "A closed Deep Ink Grey linen PAHINA hardcover book standing on a Paper White gallery plinth against honed Carrara marble walls.",
  },
  act2: {
    src: "/images/after-hours/stills/still-act2-crema-light.jpg",
    alt: "A curved espresso crema horizon edged with a thin Powder Blue rim beneath a slender vertical skylight beam on Paper White.",
  },
  act3: {
    src: "/images/after-hours/stills/still-act3-gallery-light.jpg",
    alt: "A solitary PAHINA linen hardcover book framed inside a sunlit three-dimensional Paper White gallery of café and reading-room photographs.",
  },
} as const;

/**
 * Curated sunlit PAHINA gallery leading with PAHINA's own warm atmospheric and
 * high-resolution menu photography, complemented by quiet architectural stills.
 */
export const GALLERY_PHOTO_SOURCES: GalleryPhotoSource[] = [
  // Lead with PAHINA's own sunlit atmospheric & high-res menu photography
  {
    id: "atm-hero-cafe",
    src: "/images/atmospheric/hero-cafe.jpg",
    alt: "PAHINA neighborhood café interior",
    aspect: "portrait",
  },
  {
    id: "menu-latte",
    src: "/images/pahina-menu-assets/coffee/cafe-latte.jpg",
    alt: "Cafe Latte",
    aspect: "portrait",
  },
  {
    id: "atm-reading-room",
    src: "/images/atmospheric/reading-room-hero.jpg",
    alt: "PAHINA Reading Room shelving",
    aspect: "landscape",
  },
  {
    id: "menu-biscoff",
    src: "/images/pahina-menu-assets/coffee/biscoff-latte.jpg",
    alt: "Biscoff Latte",
    aspect: "portrait",
  },
  {
    id: "atm-reading-nook",
    src: "/images/atmospheric/reading-room-nook.jpg",
    alt: "Open book beside porcelain espresso cup",
    aspect: "portrait",
  },
  {
    id: "menu-cappuccino",
    src: "/images/pahina-menu-assets/coffee/cappuccino.jpg",
    alt: "Cappuccino",
    aspect: "portrait",
  },
  {
    id: "menu-americano",
    src: "/images/pahina-menu-assets/coffee/cafe-americano.jpg",
    alt: "Cafe Americano",
    aspect: "portrait",
  },
  {
    id: "menu-vanilla",
    src: "/images/pahina-menu-assets/coffee/vanilla-latte.jpg",
    alt: "Vanilla Latte",
    aspect: "portrait",
  },
  {
    id: "menu-mocha",
    src: "/images/pahina-menu-assets/coffee/cafe-mocha.jpg",
    alt: "Cafe Mocha",
    aspect: "portrait",
  },
  {
    id: "menu-white-mocha",
    src: "/images/pahina-menu-assets/coffee/white-chocolate-mocha.jpg",
    alt: "White Chocolate Mocha",
    aspect: "portrait",
  },
  {
    id: "menu-caramel-frappe",
    src: "/images/pahina-menu-assets/frappuccino/espresso-based/caramel-frappe.jpg",
    alt: "Caramel Frappe",
    aspect: "portrait",
  },
  {
    id: "menu-hazelnut-frappe",
    src: "/images/pahina-menu-assets/frappuccino/espresso-based/hazelnut-frappe.jpg",
    alt: "Hazelnut Frappe",
    aspect: "portrait",
  },
  {
    id: "menu-java-chip",
    src: "/images/pahina-menu-assets/frappuccino/espresso-based/java-chip-frappe.jpg",
    alt: "Java Chip Frappe",
    aspect: "portrait",
  },
  {
    id: "menu-mocha-frappe",
    src: "/images/pahina-menu-assets/frappuccino/espresso-based/mocha-frappe.jpg",
    alt: "Mocha Frappe",
    aspect: "portrait",
  },
  {
    id: "menu-salted-caramel",
    src: "/images/pahina-menu-assets/frappuccino/espresso-based/salted-caramel-oreo-frappe.jpg",
    alt: "Salted Caramel Oreo Frappe",
    aspect: "portrait",
  },
  // Architectural reading-room & coffee detail studies
  {
    id: "ah-linen-spines",
    src: "/images/after-hours/gallery/gallery-08-linen-spines.jpg",
    alt: "Row of linen-bound book spines",
    aspect: "portrait",
  },
  {
    id: "ah-ceramic-linen",
    src: "/images/after-hours/gallery/gallery-09-ceramic-linen.jpg",
    alt: "Ceramic cup beside a closed linen hardcover",
    aspect: "landscape",
  },
  {
    id: "ah-oak-table",
    src: "/images/after-hours/gallery/gallery-07-oak-table.jpg",
    alt: "Quiet oak reading tables",
    aspect: "landscape",
  },
  {
    id: "ah-shelves-dusk",
    src: "/images/after-hours/gallery/gallery-01-shelves-dusk.jpg",
    alt: "Tall oak bookshelves",
    aspect: "portrait",
  },
  {
    id: "ah-reading-armchair",
    src: "/images/after-hours/gallery/gallery-11-reading-armchair.jpg",
    alt: "Solitary oak and linen reading chair",
    aspect: "portrait",
  },
  {
    id: "ah-pourover",
    src: "/images/after-hours/gallery/gallery-03-pourover-closeup.jpg",
    alt: "Pour-over coffee stream",
    aspect: "portrait",
  },
  {
    id: "ah-reading-lamp",
    src: "/images/after-hours/gallery/gallery-02-reading-lamp.jpg",
    alt: "Reading lamp over an open book",
    aspect: "landscape",
  },
  {
    id: "ah-espresso-bar",
    src: "/images/after-hours/gallery/gallery-10-espresso-bar.jpg",
    alt: "Minimalist espresso bar counter",
    aspect: "landscape",
  },
];

/**
 * Deterministic architectural corridor layout for Act 3's 3D photo gallery.
 * Frames the left and right wings across layered Z depths while preserving
 * a clean central corridor for the turning PAHINA book and display headline.
 */
export function buildGalleryPlacements(isMobile: boolean): GalleryTilePlacement[] {
  const count = isMobile ? 18 : 36;
  const placements: GalleryTilePlacement[] = [];

  const hash = (n: number) => {
    const x = Math.sin(n * 127.1 + 311.7) * 43758.5453123;
    return x - Math.floor(x);
  };

  for (let i = 0; i < count; i++) {
    // Prioritize PAHINA's own sunlit shots (indices 0..14) on closer foreground & mid layers
    const photo = GALLERY_PHOTO_SOURCES[i % GALLERY_PHOTO_SOURCES.length];
    const side = i % 2 === 0 ? -1 : 1;
    const layer = Math.floor(i / 2);
    const totalLayers = Math.ceil(count / 2);
    const layerNorm = layer / Math.max(1, totalLayers - 1);

    const wingBand = (i >> 1) % 3;
    const baseRadiusX = isMobile
      ? wingBand === 0
        ? 1.95
        : wingBand === 1
          ? 2.85
          : 3.55
      : wingBand === 0
        ? 2.55
        : wingBand === 1
          ? 4.15
          : 5.75;

    const jitterX = (hash(i + 1) - 0.5) * (isMobile ? 0.45 : 0.72);
    const x = side * (baseRadiusX + jitterX);

    const rowPattern = [-1.85, -0.68, 0.52, 1.48];
    const baseY = rowPattern[(layer + (side > 0 ? 1 : 0)) % rowPattern.length];
    const jitterY = (hash(i + 41) - 0.5) * 0.44;
    const y = baseY * (isMobile ? 0.85 : 0.96) + jitterY;

    const zStart = isMobile ? -17.5 : -22.5;
    const zEnd = isMobile ? 1.4 : 2.1;
    const zJitter = (hash(i + 97) - 0.5) * 1.1;
    const z = zStart + layerNorm * (zEnd - zStart) + zJitter;

    const scale =
      (isMobile ? 0.72 : 0.88) + hash(i + 151) * (isMobile ? 0.24 : 0.34);

    const rotY = -side * (0.06 + hash(i + 211) * 0.1);
    const parallaxSpeed = 0.85 + hash(i + 307) * 0.45;

    placements.push({
      id: `${photo.id}-${i}`,
      src: photo.src,
      aspect: photo.aspect,
      x,
      y,
      z,
      scale,
      rotY,
      parallaxSpeed,
    });
  }

  return placements;
}
