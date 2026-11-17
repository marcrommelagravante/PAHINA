export interface BookGenre {
  id: string;
  name: string;
  shelfSummary: string;
  readingMoodNote: string;
  quietPairing: string;
}

export interface ReadingRoomStep {
  stepNumber: string;
  title: string;
  description: string;
}

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
