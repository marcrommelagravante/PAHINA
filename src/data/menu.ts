export type MenuCategoryId =
  | "coffee"
  | "non-coffee"
  | "frappuccino"
  | "pasta"
  | "pizza"
  | "fries";

export interface MenuSizePrice {
  size: string;
  note?: string;
  price: number;
}

export interface MenuItemData {
  id: string;
  name: string;
  category: MenuCategoryId;
  subcategory?: string;
  image: string;
  alt: string;
  sizes?: MenuSizePrice[];
  singlePrice?: number;
  priceUnconfirmed?: boolean;
  badge?: "Signature" | "Must Try";
  featured?: boolean;
}

export interface MenuCategoryMeta {
  id: MenuCategoryId;
  label: string;
  heading: string;
  lead: string;
  priceNote?: string;
}

export const MENU_CATEGORIES: MenuCategoryMeta[] = [
  {
    id: "coffee",
    label: "Coffee",
    heading: "Espresso & Specialty Coffee",
    lead: "Everyday espresso pours and three signature coffee treats served for lingering at your table.",
    priceNote:
      "Core coffee comes in SMOL 12oz (Hot), MOYEN 16oz (Iced), and GRANDE 22oz (Iced). Reference pricing pending final sign-off.",
  },
  {
    id: "non-coffee",
    label: "Non-Coffee",
    heading: "Non-Coffee",
    lead: "Comforting caffeine-free pours crafted for unhurried afternoons.",
    priceNote:
      "Available in SMOL 12oz (Hot), MOYEN 16oz (Iced), and GRANDE 22oz (Iced).",
  },
  {
    id: "frappuccino",
    label: "Frappuccino",
    heading: "Frappuccino",
    lead: "Ice-blended espresso and cream drinks in 16oz and 22oz servings.",
    priceNote:
      "Available in 16oz (Iced) and 22oz (Iced). Reference pricing verified against the working café menu.",
  },
  {
    id: "pasta",
    label: "Pasta",
    heading: "Pasta",
    lead: "Warm, comforting plates meant to pair cleanly with a quiet read.",
    priceNote: "Food prices are currently to be confirmed.",
  },
  {
    id: "pizza",
    label: "Pizza",
    heading: "Pizza",
    lead: "Crisp baked classics made for sharing across a table or taking slowly.",
    priceNote: "Food prices are currently to be confirmed.",
  },
  {
    id: "fries",
    label: "Fries",
    heading: "Fries",
    lead: "Crisp sides for sharing between conversations and chapters.",
    priceNote: "Food prices are currently to be confirmed.",
  },
];

const CORE_COFFEE_STANDARD_SIZES: MenuSizePrice[] = [
  { size: "SMOL", note: "12oz Hot", price: 145 },
  { size: "MOYEN", note: "16oz Iced", price: 160 },
  { size: "GRANDE", note: "22oz Iced", price: 175 },
];

const AMERICANO_SIZES: MenuSizePrice[] = [
  { size: "SMOL", note: "12oz Hot", price: 125 },
  { size: "MOYEN", note: "16oz Iced", price: 140 },
  { size: "GRANDE", note: "22oz Iced", price: 155 },
];

const FRAPPE_STANDARD_SIZES: MenuSizePrice[] = [
  { size: "16oz", note: "Iced", price: 180 },
  { size: "22oz", note: "Iced", price: 195 },
];

const FRAPPE_SIGNATURE_SIZES: MenuSizePrice[] = [
  { size: "16oz", note: "Iced", price: 200 },
  { size: "22oz", note: "Iced", price: 215 },
];

export const MENU_ITEMS: MenuItemData[] = [
  // A. Coffee — Core Coffee (10)
  {
    id: "cafe-americano",
    name: "Café Americano",
    category: "coffee",
    subcategory: "Core Coffee",
    image: "/images/pahina-menu-assets/coffee/cafe-americano.jpg",
    alt: "Iced Café Americano in a clear fluted glass showing espresso crema on an oak table",
    sizes: AMERICANO_SIZES,
  },
  {
    id: "cafe-latte",
    name: "Café Latte",
    category: "coffee",
    subcategory: "Core Coffee",
    image: "/images/pahina-menu-assets/coffee/cafe-latte.jpg",
    alt: "Hot Café Latte with silky microfoam rosetta in a cream ceramic cup and saucer",
    sizes: CORE_COFFEE_STANDARD_SIZES,
    featured: true,
  },
  {
    id: "cappuccino",
    name: "Cappuccino",
    category: "coffee",
    subcategory: "Core Coffee",
    image: "/images/pahina-menu-assets/coffee/cappuccino.jpg",
    alt: "Hot Cappuccino topped with velvety milk foam and light cocoa dusting in a porcelain cup",
    sizes: CORE_COFFEE_STANDARD_SIZES,
  },
  {
    id: "cafe-mocha",
    name: "Café Mocha",
    category: "coffee",
    subcategory: "Core Coffee",
    image: "/images/pahina-menu-assets/coffee/cafe-mocha.jpg",
    alt: "Hot Café Mocha in a stoneware cup with dark chocolate and espresso foam swirl",
    sizes: CORE_COFFEE_STANDARD_SIZES,
  },
  {
    id: "hazelnut-latte",
    name: "Hazelnut Latte",
    category: "coffee",
    subcategory: "Core Coffee",
    image: "/images/pahina-menu-assets/coffee/hazelnut-latte.jpg",
    alt: "Iced Hazelnut Latte layered with cold milk and espresso in clear glass",
    sizes: CORE_COFFEE_STANDARD_SIZES,
  },
  {
    id: "caramel-macchiato",
    name: "Caramel Macchiato",
    category: "coffee",
    subcategory: "Core Coffee",
    image: "/images/pahina-menu-assets/coffee/caramel-macchiato.jpg",
    alt: "Iced Caramel Macchiato with layered espresso, cold milk, and amber caramel drizzle",
    sizes: CORE_COFFEE_STANDARD_SIZES,
    badge: "Signature",
  },
  {
    id: "spanish-latte",
    name: "Spanish Latte",
    category: "coffee",
    subcategory: "Core Coffee",
    image: "/images/pahina-menu-assets/coffee/spanish-latte.jpg",
    alt: "Iced Spanish Latte showing sweetened milk beneath a golden espresso cascade in a clear glass",
    sizes: CORE_COFFEE_STANDARD_SIZES,
    badge: "Signature",
  },
  {
    id: "biscoff-latte",
    name: "Biscoff Latte",
    category: "coffee",
    subcategory: "Core Coffee",
    image: "/images/pahina-menu-assets/coffee/biscoff-latte.jpg",
    alt: "Iced Biscoff Latte topped with caramelized biscuit crumble and a crisp biscuit beside the glass",
    sizes: CORE_COFFEE_STANDARD_SIZES,
    featured: true,
  },
  {
    id: "vanilla-latte",
    name: "Vanilla Latte",
    category: "coffee",
    subcategory: "Core Coffee",
    image: "/images/pahina-menu-assets/coffee/vanilla-latte.jpg",
    alt: "Hot Vanilla Latte with smooth steamed milk foam in an off-white ceramic cup",
    sizes: CORE_COFFEE_STANDARD_SIZES,
  },
  {
    id: "white-chocolate-mocha",
    name: "White Chocolate Mocha",
    category: "coffee",
    subcategory: "Core Coffee",
    image: "/images/pahina-menu-assets/coffee/white-chocolate-mocha.jpg",
    alt: "Iced White Chocolate Mocha with ivory milk base and espresso swirl in a fluted glass",
    sizes: CORE_COFFEE_STANDARD_SIZES,
    featured: true,
  },

  // A. Coffee — Special Coffee (3)
  {
    id: "caramel-espresso-con-panna",
    name: "Caramel Espresso Con Panna",
    category: "coffee",
    subcategory: "Special Coffee",
    image: "/images/pahina-menu-assets/coffee/caramel-espresso-con-panna.jpg",
    alt: "Caramel Espresso Con Panna served in a small glass cup with whipped cream and caramel ribbon",
    singlePrice: 125,
  },
  {
    id: "affogato",
    name: "Affogato",
    category: "coffee",
    subcategory: "Special Coffee",
    image: "/images/pahina-menu-assets/coffee/affogato.jpg",
    alt: "Affogato with vanilla gelato inside freshly pulled dark espresso in a short glass",
    singlePrice: 140,
  },
  {
    id: "oreo-dalgona",
    name: "Oreo Dalgona",
    category: "coffee",
    subcategory: "Special Coffee",
    image: "/images/pahina-menu-assets/coffee/oreo-dalgona.jpg",
    alt: "Iced Oreo Dalgona with whipped coffee foam and dark cookie crumble over cold milk",
    singlePrice: 140,
  },

  // B. Non-Coffee (2)
  {
    id: "signature-chocolate",
    name: "Signature Chocolate",
    category: "non-coffee",
    image: "/images/pahina-menu-assets/non-coffee/signature-chocolate.jpg",
    alt: "Iced Signature Chocolate served over clear ice in a minimalist café glass",
    sizes: CORE_COFFEE_STANDARD_SIZES,
    badge: "Signature",
  },
  {
    id: "strawberry-milk-latte",
    name: "Strawberry Milk Latte",
    category: "non-coffee",
    image: "/images/pahina-menu-assets/non-coffee/strawberry-milk-latte.jpg",
    alt: "Iced Strawberry Milk Latte with ruby strawberry layer beneath creamy milk in clear glass",
    sizes: CORE_COFFEE_STANDARD_SIZES,
    badge: "Signature",
  },

  // C. Frappuccino — Espresso-Based (6)
  {
    id: "java-chip-frappe",
    name: "Java Chip Frappe",
    category: "frappuccino",
    subcategory: "Espresso-Based",
    image:
      "/images/pahina-menu-assets/frappuccino/espresso-based/java-chip-frappe.jpg",
    alt: "Java Chip Frappe topped with whipped cream and dark chocolate drizzle in a clear tall glass",
    sizes: FRAPPE_STANDARD_SIZES,
  },
  {
    id: "caramel-frappe",
    name: "Caramel Frappe",
    category: "frappuccino",
    subcategory: "Espresso-Based",
    image:
      "/images/pahina-menu-assets/frappuccino/espresso-based/caramel-frappe.jpg",
    alt: "Espresso-based Caramel Frappe crowned with whipped cream and amber caramel lines",
    sizes: FRAPPE_STANDARD_SIZES,
  },
  {
    id: "mocha-frappe",
    name: "Mocha Frappe",
    category: "frappuccino",
    subcategory: "Espresso-Based",
    image:
      "/images/pahina-menu-assets/frappuccino/espresso-based/mocha-frappe.jpg",
    alt: "Mocha Frappe blended with chocolate and espresso topped with whipped cream",
    sizes: FRAPPE_STANDARD_SIZES,
  },
  {
    id: "hazelnut-frappe",
    name: "Hazelnut Frappe",
    category: "frappuccino",
    subcategory: "Espresso-Based",
    image:
      "/images/pahina-menu-assets/frappuccino/espresso-based/hazelnut-frappe.jpg",
    alt: "Hazelnut Frappe topped with soft whipped cream and crushed toasted hazelnuts",
    sizes: FRAPPE_STANDARD_SIZES,
  },
  {
    id: "salted-caramel-oreo-frappe",
    name: "Salted Caramel Oreo Frappe",
    category: "frappuccino",
    subcategory: "Espresso-Based",
    image:
      "/images/pahina-menu-assets/frappuccino/espresso-based/salted-caramel-oreo-frappe.jpg",
    alt: "Salted Caramel Oreo Frappe speckled with dark cookies, caramel drizzle, and a cookie garnish",
    sizes: FRAPPE_SIGNATURE_SIZES,
    badge: "Must Try",
    featured: true,
  },
  {
    id: "lotus-biscoff-frappe",
    name: "Lotus Biscoff Frappe",
    category: "frappuccino",
    subcategory: "Espresso-Based",
    image:
      "/images/pahina-menu-assets/frappuccino/espresso-based/lotus-biscoff-frappe.jpg",
    alt: "Lotus Biscoff Frappe finished with whipped cream, biscuit crumbs, and a caramelized biscuit",
    sizes: FRAPPE_SIGNATURE_SIZES,
    badge: "Must Try",
  },

  // C. Frappuccino — Cream-Based (5)
  {
    id: "oreo-frappe",
    name: "Oreo Frappe",
    category: "frappuccino",
    subcategory: "Cream-Based",
    image:
      "/images/pahina-menu-assets/frappuccino/cream-based/oreo-frappe.jpg",
    alt: "Cream-based Oreo Frappe blended with dark cookie crumbs and topped with whipped cream",
    sizes: FRAPPE_STANDARD_SIZES,
  },
  {
    id: "peanut-butter-cookie-frappe",
    name: "Peanut Butter Cookie Frappe",
    category: "frappuccino",
    subcategory: "Cream-Based",
    image:
      "/images/pahina-menu-assets/frappuccino/cream-based/peanut-butter-cookie-frappe.jpg",
    alt: "Peanut Butter Cookie Frappe topped with whipped cream and golden cookie crumble",
    sizes: FRAPPE_STANDARD_SIZES,
  },
  {
    id: "ube-frappe",
    name: "Ube Frappe",
    category: "frappuccino",
    subcategory: "Cream-Based",
    image: "/images/pahina-menu-assets/frappuccino/cream-based/ube-frappe.jpg",
    alt: "Velvety pastel-purple Ube Frappe topped with piped cream in a tall glass",
    sizes: FRAPPE_STANDARD_SIZES,
  },
  {
    id: "strawberry-frappe",
    name: "Strawberry Frappe",
    category: "frappuccino",
    subcategory: "Cream-Based",
    image:
      "/images/pahina-menu-assets/frappuccino/cream-based/strawberry-frappe.jpg",
    alt: "Pastel pink Strawberry Frappe topped with whipped cream and berry drizzle",
    sizes: FRAPPE_STANDARD_SIZES,
  },
  {
    id: "matcha-frappe",
    name: "Matcha Frappe",
    category: "frappuccino",
    subcategory: "Cream-Based",
    image:
      "/images/pahina-menu-assets/frappuccino/cream-based/matcha-frappe.jpg",
    alt: "Green tea Matcha Frappe finished with cream cap and fine matcha dusting",
    sizes: FRAPPE_STANDARD_SIZES,
  },

  // D. Pasta (5)
  {
    id: "creamy-carbonara",
    name: "Creamy Carbonara",
    category: "pasta",
    image: "/images/pahina-menu-assets/pasta/creamy-carbonara.jpg",
    alt: "Creamy Carbonara plated neatly in a matte cream stoneware bowl on an oak table",
    priceUnconfirmed: true,
  },
  {
    id: "spaghetti-bolognese",
    name: "Spaghetti Bolognese",
    category: "pasta",
    image: "/images/pahina-menu-assets/pasta/spaghetti-bolognese.jpg",
    alt: "Spaghetti Bolognese served in a deep cream ceramic bowl with rich tomato ragu",
    priceUnconfirmed: true,
  },
  {
    id: "creamy-pesto",
    name: "Creamy Pesto",
    category: "pasta",
    image: "/images/pahina-menu-assets/pasta/creamy-pesto.jpg",
    alt: "Creamy Pesto pasta with bright green basil sauce in a ceramic bowl",
    priceUnconfirmed: true,
  },
  {
    id: "chicken-alfredo",
    name: "Chicken Alfredo",
    category: "pasta",
    image: "/images/pahina-menu-assets/pasta/chicken-alfredo.jpg",
    alt: "Chicken Alfredo pasta plated in a warm stoneware bowl on a wooden table",
    priceUnconfirmed: true,
  },
  {
    id: "aglio-olio",
    name: "Aglio Olio",
    category: "pasta",
    image: "/images/pahina-menu-assets/pasta/aglio-olio.jpg",
    alt: "Aglio Olio spaghetti tossed with golden garlic oil, herbs, and chili flakes in a cream bowl",
    priceUnconfirmed: true,
  },

  // E. Pizza (4)
  {
    id: "classic-cheese-pizza",
    name: "Classic Cheese",
    category: "pizza",
    image: "/images/pahina-menu-assets/pizza/classic-cheese-pizza.jpg",
    alt: "Classic Cheese pizza with golden blistered crust and melted mozzarella on a wooden board",
    priceUnconfirmed: true,
  },
  {
    id: "pepperoni-pizza",
    name: "Pepperoni",
    category: "pizza",
    image: "/images/pahina-menu-assets/pizza/pepperoni-pizza.jpg",
    alt: "Pepperoni pizza with crisp edges served on an oak café serving board",
    priceUnconfirmed: true,
  },
  {
    id: "hawaiian-pizza",
    name: "Hawaiian",
    category: "pizza",
    image: "/images/pahina-menu-assets/pizza/hawaiian-pizza.jpg",
    alt: "Hawaiian pizza topped with golden pineapple and ham on an artisan crust",
    priceUnconfirmed: true,
  },
  {
    id: "four-cheese-pizza",
    name: "Four Cheese",
    category: "pizza",
    image: "/images/pahina-menu-assets/pizza/four-cheese-pizza.jpg",
    alt: "Four Cheese pizza baked golden brown on a warm wooden board",
    priceUnconfirmed: true,
  },

  // F. Fries (4)
  {
    id: "classic-fries",
    name: "Classic Fries",
    category: "fries",
    image: "/images/pahina-menu-assets/fries/classic-fries.jpg",
    alt: "Golden crisp Classic Fries served in a ceramic dish lined with unbleached parchment",
    priceUnconfirmed: true,
  },
  {
    id: "cheese-fries",
    name: "Cheese Fries",
    category: "fries",
    image: "/images/pahina-menu-assets/fries/cheese-fries.jpg",
    alt: "Crisp golden Cheese Fries drizzled with warm cheddar cheese sauce in a ceramic dish",
    priceUnconfirmed: true,
  },
  {
    id: "sour-cream-fries",
    name: "Sour Cream Fries",
    category: "fries",
    image: "/images/pahina-menu-assets/fries/sour-cream-fries.jpg",
    alt: "Sour Cream Fries dusted with herb seasoning in a minimalist ceramic bowl",
    priceUnconfirmed: true,
  },
  {
    id: "truffle-parmesan-fries",
    name: "Truffle Parmesan Fries",
    category: "fries",
    image: "/images/pahina-menu-assets/fries/truffle-parmesan-fries.jpg",
    alt: "Truffle Parmesan Fries topped with fine grated aged parmesan and herbs",
    priceUnconfirmed: true,
  },
];

export function getFeaturedMenuItems(): MenuItemData[] {
  return MENU_ITEMS.filter((item) => item.featured);
}
