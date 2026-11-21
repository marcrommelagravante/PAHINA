import type { Metadata } from "next";
import Link from "next/link";
import { HeroPageCard } from "@/components/editorial/HeroPageCard";
import { EditorialBanner } from "@/components/editorial/EditorialBanner";
import { DrinkShowcase } from "@/components/editorial/DrinkShowcase";
import { FloatingPhoto } from "@/components/editorial/FloatingPhoto";
import { MarginNote } from "@/components/editorial/MarginNote";
import { MaskedHeading } from "@/components/editorial/MaskedHeading";
import { AtmosphereGallery } from "@/components/sections/AtmosphereGallery";
import { VisitBanner } from "@/components/sections/VisitBanner";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { Reveal } from "@/components/ui/Reveal";
import { EDITORIAL_IMAGES } from "@/data/editorialImages";
import { getHomeShowcaseItems } from "@/data/menu";
import { SITE_INFO } from "@/data/site";

export const metadata: Metadata = {
  title: `${SITE_INFO.name} — ${SITE_INFO.descriptor}`,
  description: `${SITE_INFO.tagline} ${SITE_INFO.supportingLines.curiousMinds}`,
};

export default function HomePage() {
  const showcaseItems = getHomeShowcaseItems();

  return (
    <>
      <HeroPageCard />

      {/* Story spread: centered floating pours flanked by editorial copy & true margin notes */}
      <section
        aria-labelledby="between-pages-heading"
        className="border-b border-soft bg-paper py-20 sm:py-28"
      >
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <Reveal>
            <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-10">
              <div className="space-y-6 lg:col-span-4">
                <div className="space-y-3">
                  <MaskedHeading
                    id="between-pages-heading"
                    lines={[
                      "A place",
                      <em key="l2" className="font-normal italic">
                        between pages.
                      </em>,
                    ]}
                    className="font-display text-3xl leading-[1.12] tracking-[-0.02em] text-ink sm:text-4xl"
                  />
                  <p className="font-editorial text-lg italic text-ink-muted">
                    ({SITE_INFO.descriptor})
                  </p>
                </div>

                <div className="space-y-4 text-base leading-relaxed text-ink-muted">
                  <p>
                    PAHINA brings together two ordinary pleasures that belong in
                    the same room: thoughtfully made coffee and unhurried time
                    with a good book.
                  </p>
                  <p>
                    Shaped as a small neighborhood café rather than a bustling
                    chain or crowded hall, the space leaves comfortable room at
                    each table so you can drink slowly and stay for a chapter or
                    three.
                  </p>
                </div>
              </div>

              <div className="lg:col-span-4">
                <FloatingPhoto
                  src={EDITORIAL_IMAGES.homeStoryPours}
                  alt="Hot Café Latte in a matte stoneware cup beside an iced Spanish Latte in a fluted glass and a charcoal cloth-bound book on warm paper"
                  aspect="portrait"
                  drift={34}
                  scrollTilt={2}
                  tiltOnHover
                  sizes="(max-width: 1024px) 84vw, 30vw"
                  className="mx-auto max-w-[340px] lg:max-w-none"
                />
              </div>

              <div className="flex flex-col justify-between space-y-8 lg:col-span-4 lg:pl-4">
                <div className="space-y-5">
                  <MarginNote label="Shelves" value="6 genres" />
                  <MarginNote label="Drinks" value="Hot or iced" />
                  <MarginNote label="Sizes" value="12 / 16 / 22 oz" />
                </div>

                <div className="space-y-5 border-t border-soft pt-6">
                  <p className="font-editorial text-2xl italic text-ink">
                    “{SITE_INFO.supportingLines.meetsStories}”
                  </p>
                  <PrimaryButton href="/about" variant="secondary">
                    About PAHINA
                  </PrimaryButton>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Wide overhead table banner */}
      <EditorialBanner
        headingId="brewing-banner-heading"
        surface="elevated"
        src={EDITORIAL_IMAGES.homeBannerSpread}
        alt="Overhead sunlit café table spread with a stoneware bowl of Aglio Olio, an iced coffee, a ceramic espresso cup, and an open cream-paged book with a powder-blue ribbon"
        heading={
          <>
            Something good{" "}
            <em className="font-normal italic">is brewing.</em>
          </>
        }
        description="Espresso classics, chilled signature pours, ice-blended frappes, and comforting plates like Aglio Olio and warm pizza."
      />

      {/* Signature 3-drink staggered showcase */}
      <section
        aria-labelledby="signature-showcase-heading"
        className="border-b border-soft bg-paper py-20 sm:py-28"
      >
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl space-y-4">
              <MaskedHeading
                id="signature-showcase-heading"
                lines={[
                  <span key="l1">
                    Three{" "}
                    <em className="font-normal italic">signature pours.</em>
                  </span>,
                ]}
                className="font-display text-3xl leading-[1.12] tracking-[-0.02em] text-ink sm:text-4xl"
              />
              <p className="text-base leading-relaxed text-ink-muted sm:text-lg">
                Selected house signatures from our espresso and non-coffee bar.
                Switch sizes inline or open any tasting sheet.
              </p>
            </div>
            <PrimaryButton href="/menu" variant="secondary">
              View Full Menu
            </PrimaryButton>
          </div>

          <Reveal className="mt-14 md:pb-12">
            <DrinkShowcase items={showcaseItems} />
          </Reveal>

          <p className="mt-10 border-t border-soft pt-6 text-sm text-ink-muted">
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

      {/* Reading Room editorial feature */}
      <section
        aria-labelledby="reading-room-feature-heading"
        className="border-b border-soft bg-surface-elevated py-20 sm:py-28"
      >
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <Reveal className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-6">
              <figure className="space-y-3">
                <FloatingPhoto
                  src={EDITORIAL_IMAGES.homeReadingFeature}
                  alt="Open linen-bound book beside a porcelain cup of espresso on a warm oak table against pastel blue-grey wall paneling"
                  aspect="portrait"
                  drift={28}
                  scrollTilt={1.5}
                  tiltOnHover
                  framed
                  sizes="(max-width: 1024px) 100vw, 48vw"
                />
                <figcaption className="font-editorial text-lg italic leading-snug text-ink-muted">
                  Curated books meant to stay beside your cup.
                </figcaption>
              </figure>
            </div>

            <div className="space-y-6 lg:col-span-6">
              <div className="space-y-4">
                <MaskedHeading
                  id="reading-room-feature-heading"
                  lines={[
                    "Find a story",
                    <em key="l2" className="font-normal italic">
                      worth staying for.
                    </em>,
                  ]}
                  className="font-display text-3xl leading-[1.12] tracking-[-0.02em] text-ink sm:text-4xl"
                />
                <p className="text-base leading-relaxed text-ink-muted sm:text-lg">
                  Along our walls sits a quiet, curated collection across
                  Fiction, Romance, Mystery, Philosophy, Poetry, and Nonfiction.
                </p>
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

              <div className="grid max-w-sm grid-cols-2 gap-6 pt-2">
                <MarginNote
                  label="Books"
                  value="Read in, return before leaving"
                />
                <MarginNote label="Shelves" value="6 genres" />
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
