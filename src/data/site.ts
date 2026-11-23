export interface NavItem {
  label: string;
  href: string;
}

export interface VisitDetailPlaceholder {
  id: string;
  label: string;
  placeholderValue: string;
  helperNote: string;
}

export const SITE_INFO = {
  name: "PAHINA",
  descriptor: "Coffee & Reading Room",
  tagline: "Every page holds a story.",
  supportingLines: {
    curiousMinds: "A quiet place for coffee, books, and curious minds.",
    quietPlace: "A quiet place for curious minds.",
    experience: "Brew a cup. Turn a page.",
    meetsStories: "Where coffee meets stories.",
  },
  conceptNotice:
    "PAHINA is an editorial café concept. Operational details shown below remain clearly marked placeholders until confirmed.",
} as const;

export const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Menu", href: "/menu" },
  { label: "Reading Room", href: "/reading-room" },
  { label: "About", href: "/about" },
];

export const VISIT_CTA_LINK: NavItem = {
  label: "Visit Us",
  href: "/visit",
};

export const VISIT_PLACEHOLDERS: VisitDetailPlaceholder[] = [
  {
    id: "address",
    label: "Location",
    placeholderValue: "[Café address]",
    helperNote: "Neighborhood street address to be confirmed before opening.",
  },
  {
    id: "hours",
    label: "Opening Hours",
    placeholderValue: "[Opening hours]",
    helperNote: "Daily café and Reading Room schedule to be announced.",
  },
  {
    id: "phone",
    label: "Telephone",
    placeholderValue: "[Phone number]",
    helperNote: "Direct café counter line pending confirmation.",
  },
  {
    id: "email",
    label: "Inquiries",
    placeholderValue: "[Email address]",
    helperNote: "General neighborhood inquiries contact placeholder.",
  },
  {
    id: "social",
    label: "Social",
    placeholderValue: "[Social media URL]",
    helperNote: "Official social profiles will be linked upon launch.",
  },
  {
    id: "directions",
    label: "Directions & Transit",
    placeholderValue: "[Directions or nearby landmark]",
    helperNote: "Walking landmarks and transit notes to be supplied.",
  },
];

export const ATMOSPHERE_GALLERY_IMAGES = [
  {
    id: "reading-corner",
    src: "/images/atmospheric/reading-room-lounge.jpg",
    alt: "Sunlit window-side banquette seating inside PAHINA with a matte ceramic coffee cup, powder-blue ribboned hardcover book, and reading glasses resting on the foreground oak table, looking toward two tall oak bookshelves along the back wall",
    caption: "Morning daylight along the window reading tables.",
    aspect: "landscape" as const,
  },
  {
    id: "morning-pour",
    src: "/images/pahina-menu-assets/coffee/cafe-latte.jpg",
    alt: "Warm cream stoneware cup of Café Latte with rosetta microfoam resting on an oak café table",
    caption: "A slow morning pour set beside an open notebook.",
    aspect: "portrait" as const,
  },
  {
    id: "open-pages",
    src: "/images/atmospheric/home-reading-nook.jpg",
    alt: "Open cream-paged cloth-bound book with a muted powder-blue ribbon bookmark beside a matte stoneware coffee cup on warm oak, with pastel Powder Blue wainscoting and tall oak bookshelves softly blurred behind",
    caption: "Curated books meant to stay beside your cup.",
    aspect: "portrait" as const,
  },
  {
    id: "afternoon-glass",
    src: "/images/pahina-menu-assets/coffee/biscoff-latte.jpg",
    alt: "Iced Biscoff Latte in clear glass with biscuit garnish on a warm oak tabletop inside the café",
    caption: "Afternoon glasses mixed gently for unhurried stays.",
    aspect: "portrait" as const,
  },
] as const;
