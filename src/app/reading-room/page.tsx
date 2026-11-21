import type { Metadata } from "next";
import { EditorialBanner } from "@/components/editorial/EditorialBanner";
import { FloatingPhoto } from "@/components/editorial/FloatingPhoto";
import { MaskedHeading } from "@/components/editorial/MaskedHeading";
import { ReadingRoomBookHero } from "@/components/editorial/ReadingRoomBookHero";
import { ReadingRoomSteps } from "@/components/editorial/ReadingRoomSteps";
import { VisitBanner } from "@/components/sections/VisitBanner";
import { BreadcrumbStructuredData } from "@/components/seo/StructuredData";
import { BOOK_GENRES, READING_ROOM_GUIDELINES } from "@/data/books";
import { EDITORIAL_IMAGES } from "@/data/editorialImages";
import { SITE_INFO } from "@/data/site";
import { DEFAULT_OG_IMAGES } from "@/lib/siteUrl";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Reading Room",
  description:
    "Learn how PAHINA's in-café Reading Room works—browse Fiction, Romance, Mystery, Philosophy, Poetry, and Nonfiction at your table.",
  alternates: {
    canonical: "/reading-room",
  },
  openGraph: {
    title: "Reading Room | PAHINA",
    description:
      "Curated in-café bookshelves across Fiction, Romance, Mystery, Philosophy, Poetry, and Nonfiction—read comfortably beside your cup.",
    url: "/reading-room",
    images: DEFAULT_OG_IMAGES,
  },
};

const GENRE_IMAGE_ALT: Record<string, string> = {
  fiction:
    "Open cream-paged book with a muted powder-blue ribbon bookmark beside iced coffee on warm paper",
  romance:
    "Matte cream stoneware cup of Café Latte with rosetta microfoam resting on a woven linen coaster",
  mystery:
    "Chilled glass of Café Americano with crisp dark crema on a quiet oak reading table",
  philosophy:
    "Overhead flat-lay of an open blank hardcover book beside a stoneware latte and powder-blue linen napkin",
  poetry:
    "Velvety stoneware Cappuccino resting on an oak café table bathed in soft morning daylight",
  nonfiction:
    "Open linen-bound book beside a porcelain cup of espresso against pastel blue-grey walls",
};

export default function ReadingRoomPage() {
  return (
    <div className="bg-paper">
      <BreadcrumbStructuredData
        currentName="Reading Room"
        currentPath="/reading-room"
      />

      <ReadingRoomBookHero />

      {/* Six alternating borderless shelf spreads on unbroken Paper White */}
      <div className="bg-paper">
        {BOOK_GENRES.map((genre, index) => {
          const isEven = index % 2 === 0;
          const photoSrc =
            EDITORIAL_IMAGES.genreMoods[
              genre.id as keyof typeof EDITORIAL_IMAGES.genreMoods
            ];
          const isLandscape =
            genre.id === "fiction" || genre.id === "philosophy";
          const isCutout = genre.id === "fiction" || genre.id === "romance";

          return (
            <section
              key={genre.id}
              id={`shelf-${genre.id}`}
              aria-labelledby={`shelf-heading-${genre.id}`}
              className="scroll-mt-24 overflow-x-clip bg-paper py-20 sm:py-28"
            >
              <div className="mx-auto max-w-6xl px-5 sm:px-8">
                <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-14">
                  <div
                    className={cn(
                      "lg:col-span-6",
                      !isEven && "lg:order-2"
                    )}
                  >
                    <FloatingPhoto
                      src={photoSrc}
                      alt={
                        GENRE_IMAGE_ALT[genre.id] ??
                        `${genre.name} reading mood inside PAHINA`
                      }
                      aspect={isLandscape ? "landscape" : "portrait"}
                      drift={isEven ? 28 : -28}
                      scrollTilt={isEven ? 1.6 : -1.6}
                      tiltOnHover
                      feather={isCutout ? "tight" : "oval"}
                      sizes="(max-width: 1024px) 90vw, 440px"
                      className="mx-auto max-w-[420px] lg:max-w-[460px]"
                    />
                  </div>

                  <div
                    className={cn(
                      "space-y-6 lg:col-span-6",
                      !isEven && "lg:order-1"
                    )}
                  >
                    <MaskedHeading
                      id={`shelf-heading-${genre.id}`}
                      lines={[genre.name]}
                      className="font-display text-4xl leading-[1.04] tracking-[-0.025em] text-ink sm:text-5xl lg:text-[3.5rem]"
                    />

                    <p className="max-w-md font-editorial text-2xl leading-snug italic text-ink">
                      {genre.shelfSummary}
                    </p>

                    <p className="max-w-[340px] text-[13px] leading-[1.7] text-ink-muted">
                      {genre.readingMoodNote}
                    </p>

                    <div className="pt-2">
                      <p className="text-[10px] font-medium tracking-[0.14em] uppercase text-ink-muted">
                        Pairs with
                      </p>
                      <p className="mt-1 font-display text-base text-ink">
                        {genre.quietPairing}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          );
        })}
      </div>

      {/* Wide borderless Reading Room interlude */}
      <EditorialBanner
        headingId="reading-room-banner-heading"
        src={EDITORIAL_IMAGES.readingRoomBanner}
        alt="Sunlit corner reading table beside tall arched windows inside PAHINA with an open cloth-bound book, ceramic cup, and wooden bookshelves"
        heading={
          <>
            Brew a cup.{" "}
            <em className="font-normal italic">Turn a page.</em>
          </>
        }
        description={SITE_INFO.supportingLines.curiousMinds}
      />

      {/* How it works — clickable numbered 4-step editorial sequence */}
      <section
        aria-labelledby="how-it-works-heading"
        className="bg-paper py-20 sm:py-28"
      >
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="max-w-xl space-y-4">
            <MaskedHeading
              id="how-it-works-heading"
              lines={[
                <span key="l1">
                  How the Reading Room{" "}
                  <em className="font-normal italic">works.</em>
                </span>,
              ]}
              className="font-display text-4xl leading-[1.06] tracking-[-0.025em] text-ink sm:text-5xl"
            />
            <p className="max-w-sm text-[13px] leading-[1.7] text-ink-muted">
              No sign-up, library card, or take-home checkout—just four simple
              steps inside the café. Select any step to focus.
            </p>
          </div>

          <ReadingRoomSteps />
        </div>
      </section>

      {/* Gentle table manners — airy hairline list */}
      <section
        aria-labelledby="guidelines-heading"
        className="bg-paper py-16 sm:py-24"
      >
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="space-y-4 lg:col-span-5">
              <MaskedHeading
                id="guidelines-heading"
                lines={[
                  <span key="l1">
                    Gentle{" "}
                    <em className="font-normal italic">table manners.</em>
                  </span>,
                ]}
                className="font-display text-4xl leading-[1.06] tracking-[-0.025em] text-ink sm:text-5xl"
              />
              <p className="max-w-xs text-[13px] leading-[1.7] text-ink-muted">
                A few thoughtful habits keep our books welcoming for every
                neighbor who visits after you.
              </p>
            </div>

            <ul className="divide-y divide-soft border-y border-soft lg:col-span-7">
              {READING_ROOM_GUIDELINES.map((rule) => (
                <li
                  key={rule}
                  className="flex items-start gap-4 py-5 text-[13px] leading-[1.7] text-ink sm:text-sm"
                >
                  <span
                    aria-hidden="true"
                    className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-powder"
                  />
                  <span>{rule}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <VisitBanner
        heading={
          <>
            Come read{" "}
            <em className="font-normal italic">for a quiet hour.</em>
          </>
        }
        description="Explore our location placeholders and concept visit notes, or pair a shelf pick with something warm from the counter."
      />
    </div>
  );
}
