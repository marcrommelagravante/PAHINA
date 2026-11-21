import type { Metadata } from "next";
import { EditorialBanner } from "@/components/editorial/EditorialBanner";
import { FloatingPhoto } from "@/components/editorial/FloatingPhoto";
import { MaskedHeading } from "@/components/editorial/MaskedHeading";
import { MaterialSwatchInspector } from "@/components/editorial/MaterialSwatchInspector";
import { VisitBanner } from "@/components/sections/VisitBanner";
import { BreadcrumbStructuredData } from "@/components/seo/StructuredData";
import { Reveal } from "@/components/ui/Reveal";
import { EDITORIAL_IMAGES } from "@/data/editorialImages";
import { SITE_INFO } from "@/data/site";
import { DEFAULT_OG_IMAGES } from "@/lib/siteUrl";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "About",
  description:
    "Discover the idea behind PAHINA—a boutique neighborhood book café shaped around slow coffee, readable rooms, and quiet hospitality.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About | PAHINA",
    description:
      "Discover the story and architectural philosophy behind PAHINA—a boutique neighborhood coffee shop and reading room.",
    url: "/about",
    images: DEFAULT_OG_IMAGES,
  },
};

const ABOUT_PRINCIPLES = [
  {
    id: "scale",
    title: "Boutique neighborhood scale",
    body: "Planned with compact service counters, small individual and two-person oak tables, and wide walkways so guests never feel crowded while carrying a cup or choosing a book.",
    src: EDITORIAL_IMAGES.aboutPrinciples.scale,
    alt: "PAHINA interior with pastel blue-grey walls, oak two-top tables, and open walking aisles",
    feather: "oval" as const,
  },
  {
    id: "comfort",
    title: "Comfort before shelf count",
    body: "Recessed shelves line selected pastel blue-grey walls instead of filling every corner, giving seating comfort and natural daylight clear priority.",
    src: EDITORIAL_IMAGES.aboutPrinciples.comfort,
    alt: "Sunlit reading corner beside arched windows with a warm wooden table and recessed wooden bookshelves",
    feather: "oval" as const,
  },
  {
    id: "shelves",
    title: "Shared in-café shelves",
    body: "The Reading Room is built around trust and ease: pick a title to read while you stay, and return it to the collection before heading out.",
    src: EDITORIAL_IMAGES.aboutPrinciples.shelves,
    alt: "Open cloth-bound book resting beside a ceramic espresso cup on warm oak",
    feather: "oval" as const,
  },
  {
    id: "ritual",
    title: "A calm everyday ritual",
    body: "Whether you arrive for a morning Americano, an afternoon frappe, or a shared plate of pasta, the room invites you to stay without hurry.",
    src: EDITORIAL_IMAGES.aboutPrinciples.ritual,
    alt: "Warm stoneware cup of Café Latte with rosetta microfoam resting on a woven linen coaster",
    feather: "tight" as const,
  },
] as const;

export default function AboutPage() {
  return (
    <div className="bg-paper">
      <BreadcrumbStructuredData currentName="About" currentPath="/about" />

      {/* Borderless magazine opener on unbroken Paper White */}
      <section
        aria-labelledby="about-hero-heading"
        className="overflow-x-clip bg-paper pt-28 pb-16 sm:pt-36 sm:pb-24"
      >
        <div className="mx-auto max-w-5xl px-5 sm:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <MaskedHeading
              as="h1"
              id="about-hero-heading"
              immediate
              delay={0.2}
              lines={[
                <span key="l1">
                  Where coffee{" "}
                  <em className="font-normal italic">meets stories.</em>
                </span>,
              ]}
              className="font-display text-[clamp(3.2rem,6.6vw,5.6rem)] leading-[0.98] tracking-[-0.03em] text-ink"
            />
            <p className="mx-auto mt-6 max-w-md text-[13px] leading-[1.7] text-ink-muted">
              PAHINA began with a modest idea: a neighborhood room small enough
              to feel calm, warm enough for good conversation, and unhurried
              enough to finish a chapter.
            </p>
          </div>

          <div className="mx-auto mt-12 max-w-3xl">
            <FloatingPhoto
              src={EDITORIAL_IMAGES.aboutHeroPhoto}
              alt="Overhead flat-lay of an open cream-paged book, a stoneware Café Latte, brushed teaspoon, and folded powder-blue linen napkin on warm paper"
              aspect="landscape"
              priority
              drift={22}
              scrollTilt={1.3}
              tiltOnHover
              feather="oval"
              sizes="(max-width: 1024px) 92vw, 768px"
            />
          </div>
        </div>
      </section>

      {/* Story spread: The name PAHINA */}
      <section
        aria-labelledby="about-name-heading"
        className="overflow-x-clip bg-paper py-20 sm:py-28"
      >
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
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
                className="font-display text-4xl leading-[1.04] tracking-[-0.025em] text-ink sm:text-5xl"
              />
              <div className="max-w-[260px] space-y-3.5 text-[12.5px] leading-[1.7] text-ink-muted">
                <p>
                  Meaning <em>page</em>, PAHINA reflects the quiet rhythm of
                  turning from one moment to the next—arriving for an espresso,
                  opening a book by the window, and stepping back outside a
                  little calmer than before.
                </p>
                <p>
                  Rather than treating coffee and reading as separate stops in a
                  busy week, the café was conceived as one cohesive room where
                  both feel equally at home.
                </p>
              </div>
            </div>

            <div className="lg:col-span-5">
              <FloatingPhoto
                src={EDITORIAL_IMAGES.aboutNamePhoto}
                alt="Open cream-paged book with a muted powder-blue ribbon bookmark beside iced coffee on warm paper"
                aspect="landscape"
                drift={28}
                scrollTilt={1.6}
                tiltOnHover
                feather="tight"
                sizes="(max-width: 1024px) 88vw, 460px"
                className="mx-auto max-w-[440px] lg:max-w-none"
              />
            </div>

            <div className="flex flex-col justify-between space-y-8 lg:col-span-3 lg:pl-4 lg:text-right">
              <div className="space-y-5 text-[10px] leading-[1.5] tracking-[0.14em] uppercase text-ink-muted">
                <div>
                  <p>Means</p>
                  <p className="font-medium text-ink">Page</p>
                </div>
                <div>
                  <p>Concept</p>
                  <p className="font-medium text-ink">Book Café</p>
                </div>
                <div>
                  <p>Shelves</p>
                  <p className="font-medium text-ink">6 Genres</p>
                </div>
              </div>

              <blockquote className="border-t border-soft pt-5 font-editorial text-2xl italic text-ink">
                “{SITE_INFO.tagline}”
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* Wide borderless interior interlude */}
      <EditorialBanner
        headingId="about-breathing-room-heading"
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

      {/* Four principles as a borderless staggered 4-up editorial showcase */}
      <section
        aria-labelledby="about-principles-heading"
        className="overflow-x-clip bg-paper py-20 sm:py-28"
      >
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="max-w-xl space-y-4">
            <MaskedHeading
              id="about-principles-heading"
              lines={[
                <span key="l1">
                  Four quiet{" "}
                  <em className="font-normal italic">commitments.</em>
                </span>,
              ]}
              className="font-display text-4xl leading-[1.06] tracking-[-0.025em] text-ink sm:text-5xl"
            />
            <p className="max-w-sm text-[13px] leading-[1.7] text-ink-muted">
              Every decision in the room favors warmth, daylight, and generous
              space around each table.
            </p>
          </div>

          <Reveal className="mt-14 lg:pb-12">
            <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
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
                    drift={index % 2 === 1 ? -22 : 22}
                    scrollTilt={index % 2 === 1 ? -1.4 : 1.4}
                    tiltOnHover
                    feather={principle.feather}
                    sizes="(max-width: 640px) 84vw, (max-width: 1024px) 44vw, 22vw"
                  />
                  <div className="mt-5 border-t border-soft pt-4">
                    <h3 className="font-display text-xl leading-snug text-ink sm:text-2xl">
                      {principle.title}
                    </h3>
                    <p className="mt-2.5 text-[12.5px] leading-[1.65] text-ink-muted">
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
        className="overflow-x-clip bg-paper py-20 sm:py-28"
      >
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-5">
              <FloatingPhoto
                src={EDITORIAL_IMAGES.aboutMaterialsFlatlay}
                alt="Matte stoneware latte cup, fluted iced glass, woven linen coaster, and charcoal cloth-bound book on warm Paper White"
                aspect="portrait"
                drift={26}
                scrollTilt={1.5}
                tiltOnHover
                feather="oval"
                sizes="(max-width: 1024px) 84vw, 380px"
                className="mx-auto max-w-[360px] lg:max-w-none"
              />
            </div>

            <div className="space-y-8 lg:col-span-7">
              <MaskedHeading
                id="about-materials-heading"
                lines={[
                  <span key="l1">
                    Quiet materials,{" "}
                    <em className="font-normal italic">soft daylight.</em>
                  </span>,
                ]}
                className="font-display text-4xl leading-[1.06] tracking-[-0.025em] text-ink sm:text-5xl"
              />

              <p className="max-w-lg text-[13px] leading-[1.7] text-ink-muted">
                Muted blue-grey paneling, warm natural oak, upholstered lounge
                chairs, and tall arched glass windows soften the pace of the
                street outside without ever feeling stiff or formal. Select any
                swatch below to inspect its role.
              </p>

              <MaterialSwatchInspector />

              <p className="font-editorial text-2xl italic text-ink">
                “{SITE_INFO.supportingLines.quietPlace}”
              </p>
            </div>
          </div>
        </div>
      </section>

      <VisitBanner />
    </div>
  );
}
