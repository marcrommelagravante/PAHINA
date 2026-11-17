import type { Metadata } from "next";
import { ImageFeature } from "@/components/ui/ImageFeature";
import { PageHeader } from "@/components/ui/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ReadingRoomShelfIndex } from "@/components/sections/ReadingRoomShelfIndex";
import { VisitBanner } from "@/components/sections/VisitBanner";
import { READING_ROOM_GUIDELINES, READING_ROOM_STEPS } from "@/data/books";

export const metadata: Metadata = {
  title: "Reading Room",
  description:
    "Learn how PAHINA's in-café Reading Room works—browse Fiction, Romance, Mystery, Philosophy, Poetry, and Nonfiction at your table.",
};

export default function ReadingRoomPage() {
  return (
    <>
      <PageHeader
        title={
          <>
            A quiet room{" "}
            <em className="font-normal italic">of curated pages.</em>
          </>
        }
        description="Our shelves are gathered for comfortable in-café reading—never rushed, never crowded, and open to anyone sharing a cup inside PAHINA."
      />

      {/* Atmospheric hero feature */}
      <section className="border-b border-soft bg-paper py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <ImageFeature
            src="/images/atmospheric/reading-room-hero.jpg"
            alt="Sunlit corner reading table beside tall arched windows inside PAHINA with an open cloth-bound book, ceramic cup, and wooden bookshelves"
            caption="Natural window light beside selected shelves—built for lingering rather than rushing."
            aspect="landscape"
            priority
            sizes="(max-width: 1200px) 100vw, 1152px"
          />
        </div>
      </section>

      {/* Curated collection & interactive category index */}
      <section
        aria-labelledby="shelf-index-heading"
        className="border-b border-soft bg-surface-elevated py-16 sm:py-24"
      >
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div id="shelf-index-heading">
            <SectionHeading
              title={
                <>
                  Curated{" "}
                  <em className="font-normal italic">by mood and curiosity.</em>
                </>
              }
              description="Select any shelf below to preview the reading mood each category brings to your table. Titles rotate in the café and stay on the premises."
            />
          </div>

          <div className="mt-10">
            <ReadingRoomShelfIndex />
          </div>
        </div>
      </section>

      {/* How it works — genuine 4-step sequence */}
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
              description="No sign-up, library card, or take-home checkout—just four simple steps inside the café."
            />
          </div>

          <Reveal className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {READING_ROOM_STEPS.map((step) => (
              <article
                key={step.stepNumber}
                className="rounded-xl border border-soft bg-surface-elevated p-6"
              >
                <span className="font-display text-3xl text-ink tabular-nums">
                  {step.stepNumber}
                </span>
                <h3 className="mt-4 font-display text-xl text-ink">
                  {step.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-ink-muted">
                  {step.description}
                </p>
              </article>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Gentle guidelines */}
      <section
        aria-labelledby="guidelines-heading"
        className="border-b border-soft bg-surface-elevated py-16 sm:py-20"
      >
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <Reveal className="grid grid-cols-1 gap-8 lg:grid-cols-12">
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

            <ul className="space-y-4 lg:col-span-7">
              {READING_ROOM_GUIDELINES.map((rule) => (
                <li
                  key={rule}
                  className="flex items-start gap-4 rounded-xl border border-soft bg-paper px-5 py-4 text-sm leading-relaxed text-ink sm:text-base"
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
