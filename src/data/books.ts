import { EDITORIAL_IMAGES } from "@/data/editorialImages";

export interface BookGenre {
  id: string;
  name: string;
  shelfSummary: string;
  readingMoodNote: string;
  quietPairing: string;
}

export interface ReadingRoomMoment {
  id: string;
  title: string;
  lead: string;
  description: string;
  settingLabel: string;
  settingDetail: string;
  rhythmLabel: string;
  rhythmDetail: string;
  image: string;
  alt: string;
  aspect: "landscape" | "portrait";
}

export interface ReadingRoomStep {
  stepNumber: string;
  title: string;
  description: string;
}

export const READING_ROOM_MOMENTS: ReadingRoomMoment[] = [
  {
    id: "window-corner",
    title: "Two 5-layer shelves & daylight windows",
    lead: "Two 5-tier oak bookcases recessed into pastel blue-grey walls beside arched glass.",
    description:
      "Rather than packing every wall floor-to-ceiling, our collection lives across two matching 5-layer wooden bookshelves kept within easy eye-level reach—leaving the room open to natural street daylight and comfortable walkways.",
    settingLabel: "Shelves",
    settingDetail: "Two 5-layer warm oak bookcases",
    rhythmLabel: "Daylight",
    rhythmDetail: "Tall arched street-facing glass",
    image: EDITORIAL_IMAGES.readingRoomTour.windowCorner,
    alt: "Sunlit reading corner inside PAHINA beside tall arched windows with a warm wooden table, an open book, ceramic coffee cup, cushioned chair, and recessed 5-layer wooden bookshelves along pastel blue-grey walls",
    aspect: "landscape",
  },
  {
    id: "table-nook",
    title: "Tables, chairs & convenient outlets",
    lead: "Many sets of warm oak tables, cushioned chairs, and accessible power outlets.",
    description:
      "Rows of warm oak tables and supportive linen-upholstered chairs are paired with accessible wall and table-side power outlets—so students, readers, and quiet workers can settle in for hours with an open book, notebook, or laptop beside their cup.",
    settingLabel: "Seating",
    settingDetail: "Many oak table & chair sets",
    rhythmLabel: "Amenities",
    rhythmDetail: "Accessible power outlets at tables",
    image: EDITORIAL_IMAGES.readingRoomTour.tableNook,
    alt: "Close-up of an open cloth-bound book resting flat beside a porcelain espresso cup on a warm oak reading table against muted pastel blue-grey wall paneling",
    aspect: "portrait",
  },
  {
    id: "table-spread",
    title: "Room to stay for a meal",
    lead: "Coffee, pasta, and unhurried chapters belong at the same table.",
    description:
      "Unlike a strict library reading hall, you never have to leave your book at the door when hunger arrives. Linger from a morning pour into a warm plate of pasta or shareable fries without rushing your seat.",
    settingLabel: "Tabletop",
    settingDetail: "Space for drinks, plates & open books",
    rhythmLabel: "Stay",
    rhythmDetail: "No timers or rush between chapters",
    image: EDITORIAL_IMAGES.readingRoomTour.tableSpread,
    alt: "Overhead sunlit café table spread with an open cream-paged book marked by a powder-blue ribbon beside a stoneware bowl of Aglio Olio, an iced coffee in fluted glass, and an espresso cup",
    aspect: "landscape",
  },
  {
    id: "morning-ritual",
    title: "An unhurried neighborhood ritual",
    lead: "Walk in, choose any spine along the wall, and return it when you head out.",
    description:
      "There are no memberships, checkout desks, or library cards to navigate. Whether you have twenty minutes for two poems or an entire afternoon for a novel, the shelves stay open for every guest inside the café.",
    settingLabel: "Access",
    settingDetail: "Free in-café reading for all guests",
    rhythmLabel: "Books",
    rhythmDetail: "Read in, return before leaving",
    image: EDITORIAL_IMAGES.readingRoomTour.morningRitual,
    alt: "Overhead morning flat-lay of an open linen-bound book beside a stoneware Café Latte, brushed teaspoon, and folded powder-blue linen napkin on warm paper",
    aspect: "landscape",
  },
];

export const BOOK_GENRES: BookGenre[] = [
  {
    id: "fiction",
    name: "Fiction",
    shelfSummary:
      "Character-driven stories and quiet contemporary novels chosen for unhurried afternoons.",
    readingMoodNote:
      "Unfolds gently over a full afternoon—suited to a sunlit corner table where you can linger across a few chapters without checking the clock.",
    quietPairing: "Best enjoyed with a slow warm pour or classic iced latte.",
  },
  {
    id: "romance",
    name: "Romance",
    shelfSummary:
      "Warm, intimate stories that bring softness and comfort to a slow coffee break.",
    readingMoodNote:
      "Light-footed, tender storytelling meant for soft afternoon light, comfortable lounge chairs, and an unhurried cup.",
    quietPairing: "Best enjoyed alongside something sweet and unhurried.",
  },
  {
    id: "mystery",
    name: "Mystery",
    shelfSummary:
      "Measured puzzles, atmospheric whodunits, and absorbing pages that turn effortlessly.",
    readingMoodNote:
      "Pulls focus inward while the gentle hum of the espresso bar stays quietly in the background—ideal for solo reading sessions.",
    quietPairing: "Best enjoyed with a crisp black coffee or chilled espresso.",
  },
  {
    id: "philosophy",
    name: "Philosophy",
    shelfSummary:
      "Accessible essays and thoughtful reflections meant to be read a few pages at a time.",
    readingMoodNote:
      "Invites pauses between paragraphs—look up, take a sip, jot a thought in a notebook, and return at your own pace.",
    quietPairing: "Best enjoyed during calm morning hours at a window table.",
  },
  {
    id: "poetry",
    name: "Poetry",
    shelfSummary:
      "Slim volumes of verse for brief pauses, quiet mornings, and unhurried contemplation.",
    readingMoodNote:
      "Meant for short visits or quiet transitions in your day—one or two poems read slowly while your drink cools.",
    quietPairing: "Best enjoyed over a warm espresso con panna or chocolate.",
  },
  {
    id: "nonfiction",
    name: "Nonfiction",
    shelfSummary:
      "Cultural essays, craft histories, and grounded observations on everyday curiosity.",
    readingMoodNote:
      "Sparking quiet curiosity without feeling like heavy study—designed for readers who enjoy learning over coffee and food.",
    quietPairing: "Best enjoyed with a light plate and a second cup.",
  },
];

export const READING_ROOM_STEPS: ReadingRoomStep[] = [
  {
    stepNumber: "01",
    title: "Browse the shelves",
    description:
      "Take your time along the wall shelves and notice whatever spine or genre catches your interest.",
  },
  {
    stepNumber: "02",
    title: "Choose a book",
    description:
      "Pick a single volume to keep you company—our staff are glad to help if you are unsure where to start.",
  },
  {
    stepNumber: "03",
    title: "Read comfortably at your table",
    description:
      "Settle into a seat with your coffee or food. Every table has generous breathing room for unhurried reading.",
  },
  {
    stepNumber: "04",
    title: "Return before leaving",
    description:
      "Books remain inside PAHINA so everyone can share them. Simply place your book back in the collection area before you head out.",
  },
];

export const READING_ROOM_GUIDELINES: string[] = [
  "All books in the Reading Room are strictly for in-café reading and must stay inside the premises.",
  "There is no checkout, membership card, or lending fee—simply pick a book while you spend time here.",
  "Please keep drinks and plates clear of open pages so each volume stays welcoming for the next reader.",
  "Return finished or unfinished books to the designated collection area before leaving.",
  "Ask our café staff anytime if you would like a gentle suggestion from the shelves.",
];
