import type { Metadata } from "next";
import Link from "next/link";
import { AfterHoursHero } from "@/components/sections/after-hours/AfterHoursHero";
import { AtmosphereGallery } from "@/components/sections/AtmosphereGallery";
import { FeaturedMenuSection } from "@/components/sections/FeaturedMenuSection";
import { VisitBanner } from "@/components/sections/VisitBanner";
import {
  BetweenPages3D,
  HomeMiniShelf3D,
} from "@/components/three/ReadingRoomScenes3D";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getFeaturedMenuItems } from "@/data/menu";
import { SITE_INFO } from "@/data/site";

export const metadata: Metadata = {
  title: `${SITE_INFO.name} — ${SITE_INFO.descriptor}`,
  description: `${SITE_INFO.tagline} ${SITE_INFO.supportingLines.curiousMinds}`,
};

export default function HomePage() {
  const featuredItems = getFeaturedMenuItems();

  return (
    <>
      <AfterHoursHero />

      {/* Brand introduction with interactive 3D open book & steaming cup */}
      <section
        aria-labelledby="between-pages-heading"
        className="border-b border-soft bg-surface-elevated py-16 sm:py-24"
      >
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <Reveal>
            <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">
              <div className="space-y-6 lg:col-span-6">
                <div id="between-pages-heading">
                  <SectionHeading
                    title={
                      <>
                        A place{" "}
                        <em className="font-normal italic">between pages.</em>
                      </>
                    }
                  />
                </div>
                <div className="space-y-5 text-base leading-relaxed text-ink-muted sm:text-lg">
                  <p>
                    PAHINA brings together two ordinary pleasures that belong in
                    the same room: thoughtfully made coffee and unhurried time
                    with a good book.
                  </p>
                  <p>
                    Shaped as a small neighborhood café rather than a bustling
                    chain or crowded hall, the space leaves comfortable room at
                    each table so you can drink slowly, read a chapter or three,
                    and feel settled for as long as your cup lasts.
                  </p>
                  <p className="font-editorial text-2xl italic text-ink">
                    “{SITE_INFO.supportingLines.meetsStories}”
                  </p>
                </div>
              </div>

              <div className="lg:col-span-6">
                <BetweenPages3D />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Featured menu with live 3D drink tasting pedestal */}
      <section
        aria-labelledby="featured-menu-heading"
        className="border-b border-soft bg-paper py-16 sm:py-24"
      >
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div id="featured-menu-heading">
              <SectionHeading
                title={
                  <>
                    Something good{" "}
                    <em className="font-normal italic">is brewing.</em>
                  </>
                }
                description="Espresso classics, chilled signature pours, ice-blended frappes, and comforting plates like Aglio Olio and warm pizza."
              />
            </div>
            <PrimaryButton href="/menu" variant="secondary">
              View Full Menu
            </PrimaryButton>
          </div>

          <Reveal>
            <FeaturedMenuSection items={featuredItems} />
          </Reveal>

          <p className="mt-6 text-sm text-ink-muted">
            Also in our kitchen: warm pasta dishes including Aglio Olio, crisp
            pizzas, and shareable fries—explore all 39 items on the{" "}
            <Link
              href="/menu"
              className="font-medium text-ink underline decoration-powder decoration-2 underline-offset-4 hover:decoration-ink"
            >
              full menu
            </Link>
            .
          </p>
        </div>
      </section>

      {/* Reading Room feature with interactive 3D miniature 6-genre bookshelf */}
      <section
        aria-labelledby="reading-room-feature-heading"
        className="border-b border-soft bg-surface-elevated py-16 sm:py-24"
      >
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <Reveal className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-6">
              <HomeMiniShelf3D />
            </div>

            <div className="space-y-6 lg:col-span-6">
              <div id="reading-room-feature-heading">
                <SectionHeading
                  title={
                    <>
                      Find a story{" "}
                      <em className="font-normal italic">
                        worth staying for.
                      </em>
                    </>
                  }
                  description="Along our walls sits a quiet, curated collection across Fiction, Romance, Mystery, Philosophy, Poetry, and Nonfiction."
                />
              </div>

              <div className="space-y-4 text-base leading-relaxed text-ink-muted">
                <p>
                  Pick a volume from the shelves, bring it back to your table
                  beside your coffee, and read at your own pace. There are no
                  library cards, memberships, or checkout desks.
                </p>
                <p>
                  Because books stay inside the café for every neighbor to enjoy,
                  simply return your book to the collection area before leaving.
                </p>
              </div>

              <div className="pt-2">
                <PrimaryButton href="/reading-room" variant="powder">
                  Explore the Reading Room
                </PrimaryButton>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <AtmosphereGallery />

      <VisitBanner />
    </>
  );
}
