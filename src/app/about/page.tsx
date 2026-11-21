import type { Metadata } from "next";
import { MarbleSheet } from "@/components/editorial/MarbleSheet";
import { EditorialBanner } from "@/components/editorial/EditorialBanner";
import { FloatingPhoto } from "@/components/editorial/FloatingPhoto";
import { MarginNote } from "@/components/editorial/MarginNote";
import { MaskedHeading } from "@/components/editorial/MaskedHeading";
import { MaterialSwatchInspector } from "@/components/editorial/MaterialSwatchInspector";
import { VisitBanner } from "@/components/sections/VisitBanner";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { EDITORIAL_IMAGES } from "@/data/editorialImages";
import { SITE_INFO } from "@/data/site";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "About",
  description:
    "Discover the idea behind PAHINA—a boutique neighborhood book café shaped around slow coffee, readable rooms, and quiet hospitality.",
};

const ABOUT_PRINCIPLES = [
  {
    id: "scale",
    title: "Boutique neighborhood scale",
    body: "Planned with compact service counters, small individual and two-person oak tables, and wide walkways so guests never feel crowded while carrying a cup or choosing a book.",
    src: EDITORIAL_IMAGES.aboutPrinciples.scale,
    alt: "PAHINA interior with pastel blue-grey walls, oak two-top tables, and open walking aisles",
  },
  {
    id: "comfort",
    title: "Comfort before shelf count",
    body: "Recessed shelves line selected pastel blue-grey walls instead of filling every corner, giving seating comfort and natural daylight clear priority.",
    src: EDITORIAL_IMAGES.aboutPrinciples.comfort,
    alt: "Sunlit reading corner beside arched windows with a warm wooden table and recessed wooden bookshelves",
  },
  {
    id: "shelves",
    title: "Shared in-café shelves",
    body: "The Reading Room is built around trust and ease: pick a title to read while you stay, and return it to the collection before heading out.",
    src: EDITORIAL_IMAGES.aboutPrinciples.shelves,
    alt: "Open cloth-bound book resting beside a ceramic espresso cup on warm oak",
  },
  {
    id: "ritual",
    title: "A calm everyday ritual",
    body: "Whether you arrive for a morning Americano, an afternoon frappe, or a shared plate of pasta, the room invites you to stay without hurry.",
    src: EDITORIAL_IMAGES.aboutPrinciples.ritual,
    alt: "Warm stoneware cup of Café Latte with rosetta microfoam resting on an oak table",
  },
] as const;

export default function AboutPage() {
  return (
    <>
      {/* Magazine opener on honed marble */}
      <MarbleSheet
        ariaLabelledBy="about-hero-heading"
        className="pt-24 pb-10 sm:pt-28 sm:pb-14"
        sheetClassName="px-6 py-10 sm:px-12 sm:py-14 lg:px-16 lg:py-16"
      >
        <div className="mx-auto max-w-3xl text-center">
          <MaskedHeading
            as="h1"
            id="about-hero-heading"
            immediate
            lines={[
              <span key="l1">
                Where coffee{" "}
                <em className="font-normal italic">meets stories.</em>
              </span>,
            ]}
            className="font-display text-4xl leading-[1.04] tracking-[-0.025em] text-ink sm:text-6xl lg:text-[4.25rem]"
          />
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-ink-muted sm:text-lg">
            PAHINA began with a modest idea: a neighborhood room small enough to
            feel calm, warm enough for good conversation, and unhurried enough
            to finish a chapter.
          </p>
        </div>

        <div className="mx-auto mt-10 max-w-3xl">
          <FloatingPhoto
            src={EDITORIAL_IMAGES.aboutHeroPhoto}
            alt="Overhead flat-lay of an open cream-paged book, a stoneware Café Latte, brushed teaspoon, and folded powder-blue linen napkin on warm paper"
            aspect="landscape"
            priority
            drift={22}
            scrollTilt={1.4}
            tiltOnHover
            sizes="(max-width: 1024px) 92vw, 768px"
            imgClassName="rounded-xl"
          />
        </div>
      </MarbleSheet>

      {/* Story spread: The name PAHINA */}
      <section
        aria-labelledby="about-name-heading"
        className="border-b border-soft bg-paper py-20 sm:py-28"
      >
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <Reveal>
            <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-10">
              <div className="space-y-6 lg:col-span-4">
                <MaskedHeading
                  id="about-name-heading"
                  lines={[
                    "The name",
                    <em key="l2" className="font-normal italic">
                      PAHINA.
                    </em>,
                  ]}
                  className="font-display text-3xl leading-[1.12] tracking-[-0.02em] text-ink sm:text-4xl"
                />
                <div className="space-y-4 text-base leading-relaxed text-ink-muted">
                  <p>
                    Meaning <em>page</em>, PAHINA reflects the quiet rhythm of
                    turning from one moment to the next—arriving for an
                    espresso, opening a book by the window, and stepping back
                    outside a little calmer than before.
                  </p>
                  <p>
                    Rather than treating coffee and reading as separate stops in
                    a busy week, the café was conceived as one cohesive room
                    where both feel equally at home.
                  </p>
                </div>
              </div>

              <div className="lg:col-span-4">
                <FloatingPhoto
                  src={EDITORIAL_IMAGES.aboutNamePhoto}
                  alt="Open linen-bound book beside a porcelain cup of espresso on a warm oak table against pastel blue-grey walls"
                  aspect="portrait"
                  drift={30}
                  scrollTilt={1.8}
                  tiltOnHover
                  framed
                  sizes="(max-width: 1024px) 84vw, 30vw"
                  className="mx-auto max-w-[340px] lg:max-w-none"
                />
              </div>

              <div className="flex flex-col justify-between space-y-8 lg:col-span-4 lg:pl-4">
                <div className="space-y-5">
                  <MarginNote label="Means" value="Page" />
                  <MarginNote label="Concept" value="Book café" />
                  <MarginNote label="Shelves" value="6 genres" />
                </div>

                <blockquote className="border-t border-soft pt-6 font-editorial text-2xl italic text-ink">
                  “{SITE_INFO.tagline}”
                </blockquote>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Wide interior banner */}
      <EditorialBanner
        headingId="about-breathing-room-heading"
        surface="elevated"
        src={EDITORIAL_IMAGES.aboutInteriorBanner}
        alt="PAHINA boutique neighborhood café interior with muted pastel blue-grey walls, warm oak tables, arched glass windows, and integrated bookshelves"
        heading={
          <>
            Designed for{" "}
            <em className="font-normal italic">breathing room.</em>
          </>
        }
        description="Most bookstores pack every wall; most cafés pack every table. PAHINA keeps deliberate space between both."
      />

      {/* Four principles as a staggered 4-up editorial showcase with pointer tilt */}
      <section
        aria-labelledby="about-principles-heading"
        className="border-b border-soft bg-paper py-20 sm:py-28"
      >
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div id="about-principles-heading">
            <SectionHeading
              title={
                <>
                  Four quiet{" "}
                  <em className="font-normal italic">commitments.</em>
                </>
              }
              description="Every decision in the room favors warmth, daylight, and generous space around each table."
            />
          </div>

          <Reveal className="mt-14 lg:pb-12">
            <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
              {ABOUT_PRINCIPLES.map((principle, index) => (
                <article
                  key={principle.id}
                  className={cn(
                    "flex flex-col",
                    index % 2 === 1 && "lg:translate-y-10"
                  )}
                >
                  <FloatingPhoto
                    src={principle.src}
                    alt={principle.alt}
                    aspect="portrait"
                    drift={index % 2 === 1 ? -24 : 24}
                    scrollTilt={index % 2 === 1 ? -1.6 : 1.6}
                    tiltOnHover
                    framed
                    sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 22vw"
                  />
                  <div className="mt-5 border-t border-soft pt-4">
                    <h3 className="font-display text-xl leading-snug text-ink sm:text-2xl">
                      {principle.title}
                    </h3>
                    <p className="mt-2.5 text-sm leading-relaxed text-ink-muted">
                      {principle.body}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Quiet materials, soft daylight — interactive Material Swatch Inspector */}
      <section
        aria-labelledby="about-materials-heading"
        className="border-b border-soft bg-surface-elevated py-20 sm:py-28"
      >
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <Reveal>
            <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-12">
              <div className="lg:col-span-5">
                <FloatingPhoto
                  src={EDITORIAL_IMAGES.aboutMaterialsFlatlay}
                  alt="Matte stoneware latte cup, fluted iced glass, woven linen coaster, and charcoal cloth-bound book on warm Paper White"
                  aspect="portrait"
                  drift={28}
                  scrollTilt={1.6}
                  tiltOnHover
                  sizes="(max-width: 1024px) 84vw, 38vw"
                  className="mx-auto max-w-[360px] lg:max-w-none"
                />
              </div>

              <div className="space-y-8 lg:col-span-7">
                <div id="about-materials-heading">
                  <SectionHeading
                    title={
                      <>
                        Quiet materials,{" "}
                        <em className="font-normal italic">soft daylight.</em>
                      </>
                    }
                  />
                </div>

                <p className="max-w-xl text-base leading-relaxed text-ink-muted sm:text-lg">
                  Muted blue-grey paneling, warm natural oak, upholstered lounge
                  chairs, and tall arched glass windows soften the pace of the
                  street outside without ever feeling stiff or formal. Select
                  any swatch below to inspect its role.
                </p>

                <MaterialSwatchInspector />

                <p className="font-editorial text-2xl italic text-ink">
                  “{SITE_INFO.supportingLines.quietPlace}”
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <VisitBanner />
    </>
  );
}
