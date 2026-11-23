import type { Metadata } from "next";
import Image from "next/image";
import { MaskedHeading } from "@/components/editorial/MaskedHeading";
import { ReadingRoomBookHero } from "@/components/editorial/ReadingRoomBookHero";
import { ReadingRoomShelfGuide } from "@/components/editorial/ReadingRoomShelfGuide";
import { ReadingRoomSteps } from "@/components/editorial/ReadingRoomSteps";
import { VisitBanner } from "@/components/sections/VisitBanner";
import { BreadcrumbStructuredData } from "@/components/seo/StructuredData";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import {
  READING_ROOM_GUIDELINES,
  READING_ROOM_MOMENTS,
} from "@/data/books";
import { DEFAULT_OG_IMAGES } from "@/lib/siteUrl";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Reading Room",
  description:
    "See what reading inside PAHINA looks like—sunlit window two-tops, recessed wooden shelves across six genres, and an unhurried neighborhood atmosphere.",
  alternates: {
    canonical: "/reading-room",
  },
  openGraph: {
    title: "Reading Room | PAHINA",
    description:
      "See what reading inside PAHINA looks like—sunlit oak tables, recessed pastel-blue bookshelves, and six curated genres to read beside your cup.",
    url: "/reading-room",
    images: DEFAULT_OG_IMAGES,
  },
};

export default function ReadingRoomPage() {
  return (
    <div className="bg-paper">
      <BreadcrumbStructuredData
        currentName="Reading Room"
        currentPath="/reading-room"
      />

      {/* Photographic split hero showing guests reading inside PAHINA */}
      <ReadingRoomBookHero />

      {/* Visual tour showing customers what reading inside PAHINA actually looks like */}
      <section
        id="inside-the-room"
        aria-labelledby="inside-room-heading"
        className="scroll-mt-24 bg-paper py-16 sm:py-24"
      >
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="max-w-2xl space-y-4 border-t border-soft pt-12 sm:pt-16">
            <MaskedHeading
              id="inside-room-heading"
              lines={[
                <span key="l1">
                  What reading here{" "}
                  <em className="font-normal italic">looks like.</em>
                </span>,
              ]}
              className="font-display text-4xl leading-[1.06] tracking-[-0.025em] text-ink sm:text-5xl"
            />
            <p className="max-w-lg text-[13.5px] leading-[1.72] text-ink-muted">
              PAHINA is shaped for unhurried stays—combining two 5-layer wooden
              bookshelves with many sets of warm oak tables, supportive chairs,
              soft window daylight, and accessible power outlets across the
              room.
            </p>
          </div>

          <div className="mt-14 space-y-20 sm:mt-20 sm:space-y-28">
            {READING_ROOM_MOMENTS.map((moment, index) => {
              const isReversed = index % 2 === 1;
              const isLandscape = moment.aspect === "landscape";

              return (
                <Reveal key={moment.id}>
                  <article className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-14">
                    <div
                      className={cn(
                        isLandscape ? "lg:col-span-7" : "lg:col-span-6",
                        isReversed && "lg:order-2"
                      )}
                    >
                      <div
                        className={cn(
                          "group relative overflow-hidden rounded-[2px] border border-soft bg-surface-elevated",
                          isLandscape
                            ? "aspect-[4/3] w-full"
                            : "mx-auto aspect-[4/5] w-full max-w-[460px] lg:mx-0"
                        )}
                      >
                        <Image
                          src={moment.image}
                          alt={moment.alt}
                          fill
                          sizes={
                            isLandscape
                              ? "(max-width: 1024px) 94vw, 640px"
                              : "(max-width: 1024px) 90vw, 460px"
                          }
                          className="hover-image-zoom object-cover"
                        />
                      </div>
                    </div>

                    <div
                      className={cn(
                        "space-y-5",
                        isLandscape ? "lg:col-span-5" : "lg:col-span-6",
                        isReversed && "lg:order-1"
                      )}
                    >
                      <h3 className="font-display text-3xl leading-[1.08] tracking-[-0.02em] text-ink sm:text-4xl">
                        {moment.title}
                      </h3>

                      <p className="font-editorial text-2xl leading-snug italic text-ink">
                        {moment.lead}
                      </p>

                      <p className="max-w-md text-[13.5px] leading-[1.72] text-ink-muted">
                        {moment.description}
                      </p>

                      <dl className="grid grid-cols-2 gap-6 border-t border-soft pt-5 text-[10px] leading-[1.5] tracking-[0.14em] uppercase text-ink-muted">
                        <div>
                          <dt>{moment.settingLabel}</dt>
                          <dd className="mt-1 font-sans text-xs font-medium tracking-normal normal-case text-ink">
                            {moment.settingDetail}
                          </dd>
                        </div>
                        <div>
                          <dt>{moment.rhythmLabel}</dt>
                          <dd className="mt-1 font-sans text-xs font-medium tracking-normal normal-case text-ink">
                            {moment.rhythmDetail}
                          </dd>
                        </div>
                      </dl>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Compact interactive 6-genre shelf directory (preserves #shelf-<genre> deep links) */}
      <ReadingRoomShelfGuide />

      {/* How it works — clickable numbered 4-step editorial sequence */}
      <section
        id="how-it-works"
        aria-labelledby="how-it-works-heading"
        className="scroll-mt-24 bg-paper py-20 sm:py-28"
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

            <RevealGroup
              as="ul"
              stagger={0.055}
              className="divide-y divide-soft border-y border-soft lg:col-span-7"
            >
              {READING_ROOM_GUIDELINES.map((rule) => (
                <RevealItem
                  as="li"
                  key={rule}
                  y={10}
                  className="flex items-start gap-4 py-5 text-[13px] leading-[1.7] text-ink sm:text-sm"
                >
                  <span
                    aria-hidden="true"
                    className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-powder"
                  />
                  <span>{rule}</span>
                </RevealItem>
              ))}
            </RevealGroup>
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
