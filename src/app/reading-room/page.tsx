import type { Metadata } from "next";
import { EditorialBanner } from "@/components/editorial/EditorialBanner";
import { FloatingPhoto } from "@/components/editorial/FloatingPhoto";
import { MarginNote } from "@/components/editorial/MarginNote";
import { MaskedHeading } from "@/components/editorial/MaskedHeading";
import { ReadingRoomBookHero } from "@/components/editorial/ReadingRoomBookHero";
import { ReadingRoomSteps } from "@/components/editorial/ReadingRoomSteps";
import { VisitBanner } from "@/components/sections/VisitBanner";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BOOK_GENRES, READING_ROOM_GUIDELINES } from "@/data/books";
import { EDITORIAL_IMAGES } from "@/data/editorialImages";
import { SITE_INFO } from "@/data/site";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Reading Room",
  description:
    "Learn how PAHINA's in-café Reading Room works—browse Fiction, Romance, Mystery, Philosophy, Poetry, and Nonfiction at your table.",
};

const GENRE_IMAGE_ALT: Record<string, string> = {
  fiction:
    "Open linen-bound book resting beside an espresso cup on a warm oak café table",
  romance:
    "Warm stoneware cup of Café Latte with microfoam rosetta in soft afternoon window light",
  mystery:
    "Chilled glass of Café Americano with crisp dark crema on a quiet oak reading table",
  philosophy:
    "Overhead flat-lay of an open blank hardcover book beside a stoneware latte and powder-blue linen napkin",
  poetry:
    "Velvety stoneware Cappuccino resting on an oak café table bathed in soft morning daylight",
  nonfiction:
    "Sunlit corner of PAHINA's pastel blue-grey walls, oak tables, and recessed wooden bookshelves",
};

export default function ReadingRoomPage() {
  return (
    <>
      {/* Open-book hero spread with live Bookmark Preview synced to TOC */}
      <ReadingRoomBookHero />

      {/* Six alternating shelf spreads */}
      <div className="divide-y divide-soft border-b border-soft bg-paper">
        {BOOK_GENRES.map((genre, index) => {
          const isEven = index % 2 === 0;
          const photoSrc =
            EDITORIAL_IMAGES.genreMoods[
              genre.id as keyof typeof EDITORIAL_IMAGES.genreMoods
            ];
          const isFlatlayCutout = genre.id === "philosophy";

          return (
            <section
              key={genre.id}
              id={`shelf-${genre.id}`}
              aria-labelledby={`shelf-heading-${genre.id}`}
              className={cn(
                "scroll-mt-24 py-16 sm:py-24",
                isEven ? "bg-paper" : "bg-surface-elevated"
              )}
            >
              <div className="mx-auto max-w-6xl px-5 sm:px-8">
                <Reveal>
                  <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-14">
                    <div
                      className={cn(
                        "lg:col-span-5",
                        !isEven && "lg:order-2"
                      )}
                    >
                      <FloatingPhoto
                        src={photoSrc}
                        alt={
                          GENRE_IMAGE_ALT[genre.id] ??
                          `${genre.name} reading mood inside PAHINA`
                        }
                        aspect={isFlatlayCutout ? "landscape" : "portrait"}
                        drift={isEven ? 28 : -28}
                        scrollTilt={isEven ? 1.8 : -1.8}
                        tiltOnHover
                        framed={!isFlatlayCutout}
                        sizes="(max-width: 1024px) 92vw, 40vw"
                        className="mx-auto max-w-[400px] lg:max-w-none"
                      />
                    </div>

                    <div
                      className={cn(
                        "space-y-6 lg:col-span-7",
                        !isEven && "lg:order-1"
                      )}
                    >
                      <MaskedHeading
                        id={`shelf-heading-${genre.id}`}
                        lines={[genre.name]}
                        className="font-display text-4xl leading-[1.08] tracking-[-0.02em] text-ink sm:text-5xl"
                      />

                      <p className="max-w-xl font-editorial text-2xl leading-snug italic text-ink">
                        {genre.shelfSummary}
                      </p>

                      <p className="max-w-xl text-base leading-relaxed text-ink-muted sm:text-lg">
                        {genre.readingMoodNote}
                      </p>

                      <div className="max-w-md pt-2">
                        <MarginNote
                          label="Pairs with"
                          value={genre.quietPairing}
                        />
                      </div>
                    </div>
                  </div>
                </Reveal>
              </div>
            </section>
          );
        })}
      </div>

      {/* Wide daylight Reading Room banner */}
      <EditorialBanner
        headingId="reading-room-banner-heading"
        surface="elevated"
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
        className="border-b border-soft bg-paper py-16 sm:py-24"
      >
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div id="how-it-works-heading">
            <SectionHeading
              title={
                <>
                  How the Reading Room{" "}
                  <em className="font-normal italic">works.</em>
                </>
              }
              description="No sign-up, library card, or take-home checkout—just four simple steps inside the café. Select any step to highlight."
            />
          </div>

          <ReadingRoomSteps />
        </div>
      </section>

      {/* Gentle table manners — hairline list */}
      <section
        aria-labelledby="guidelines-heading"
        className="border-b border-soft bg-surface-elevated py-16 sm:py-24"
      >
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <Reveal className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
            <div id="guidelines-heading" className="lg:col-span-5">
              <SectionHeading
                title={
                  <>
                    Gentle{" "}
                    <em className="font-normal italic">table manners.</em>
                  </>
                }
                description="A few thoughtful habits keep our books welcoming for every neighbor who visits after you."
              />
            </div>

            <ul className="divide-y divide-soft border-y border-soft lg:col-span-7">
              {READING_ROOM_GUIDELINES.map((rule) => (
                <li
                  key={rule}
                  className="flex items-start gap-4 py-5 text-sm leading-relaxed text-ink sm:text-base"
                >
                  <span
                    aria-hidden="true"
                    className="mt-2 h-2 w-2 shrink-0 rounded-full bg-powder"
                  />
                  <span>{rule}</span>
                </li>
              ))}
            </ul>
          </Reveal>
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
    </>
  );
}
