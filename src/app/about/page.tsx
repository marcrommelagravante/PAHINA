import type { Metadata } from "next";
import { ImageFeature } from "@/components/ui/ImageFeature";
import { PageHeader } from "@/components/ui/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { VisitBanner } from "@/components/sections/VisitBanner";
import { SITE_INFO } from "@/data/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Discover the idea behind PAHINA—a boutique neighborhood book café shaped around slow coffee, readable rooms, and quiet hospitality.",
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        title={
          <>
            Where coffee{" "}
            <em className="font-normal italic">meets stories.</em>
          </>
        }
        description="PAHINA began with a modest idea: a neighborhood room small enough to feel calm, warm enough for good conversation, and unhurried enough to finish a chapter."
      />

      {/* Brand story & inspiration */}
      <section className="border-b border-soft bg-paper py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <Reveal className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="space-y-6 lg:col-span-6">
              <SectionHeading
                title={
                  <>
                    The name{" "}
                    <em className="font-normal italic">PAHINA.</em>
                  </>
                }
              />
              <div className="space-y-4 text-base leading-relaxed text-ink-muted sm:text-lg">
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
              <blockquote className="border-t border-soft pt-5 font-editorial text-2xl italic text-ink">
                “{SITE_INFO.tagline}”
              </blockquote>
            </div>

            <div className="lg:col-span-6">
              <ImageFeature
                src="/images/atmospheric/hero-cafe.jpg"
                alt="PAHINA interior with pastel blue-grey walls, oak two-top tables, arched windows, and open walking aisles"
                aspect="portrait"
                sizes="(max-width: 1024px) 100vw, 48vw"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Philosophy & what makes PAHINA different */}
      <section className="border-b border-soft bg-surface-elevated py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <Reveal className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-5">
              <SectionHeading
                title={
                  <>
                    Designed for{" "}
                    <em className="font-normal italic">breathing room.</em>
                  </>
                }
                description="Most bookstores pack every wall; most cafés pack every table. PAHINA keeps deliberate space between both."
              />
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:col-span-7">
              <article className="rounded-xl border border-soft bg-paper p-6">
                <h3 className="font-display text-xl text-ink">
                  Boutique neighborhood scale
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                  Planned with compact service counters, small individual and
                  two-person oak tables, and wide walkways so guests never feel
                  crowded while carrying a cup or choosing a book.
                </p>
              </article>

              <article className="rounded-xl border border-soft bg-paper p-6">
                <h3 className="font-display text-xl text-ink">
                  Comfort before shelf count
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                  Recessed shelves line selected pastel blue-grey walls instead of
                  filling every corner, giving seating comfort and natural
                  daylight clear priority.
                </p>
              </article>

              <article className="rounded-xl border border-soft bg-paper p-6">
                <h3 className="font-display text-xl text-ink">
                  Shared in-café shelves
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                  The Reading Room is built around trust and ease: pick a title
                  to read while you stay, and return it to the collection before
                  heading out.
                </p>
              </article>

              <article className="rounded-xl border border-soft bg-paper p-6">
                <h3 className="font-display text-xl text-ink">
                  A calm everyday ritual
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                  Whether you arrive for a morning Americano, an afternoon
                  frappe, or a shared plate of pasta, the room invites you to
                  stay without hurry.
                </p>
              </article>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Interior atmosphere */}
      <section className="border-b border-soft bg-paper py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <Reveal className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-7">
              <ImageFeature
                src="/images/atmospheric/reading-room-hero.jpg"
                alt="Warm wood table beside tall arched glass windows and recessed pastel blue-grey bookcases inside PAHINA"
                aspect="landscape"
                sizes="(max-width: 1024px) 100vw, 56vw"
              />
            </div>

            <div className="space-y-5 lg:col-span-5">
              <SectionHeading
                title={
                  <>
                    Quiet materials,{" "}
                    <em className="font-normal italic">soft daylight.</em>
                  </>
                }
              />
              <p className="text-base leading-relaxed text-ink-muted">
                Muted blue-grey paneling, warm natural oak, upholstered lounge
                chairs, and tall arched glass windows soften the pace of the
                street outside without ever feeling stiff or formal.
              </p>
              <p className="font-editorial text-xl italic text-ink">
                {SITE_INFO.supportingLines.quietPlace}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <VisitBanner />
    </>
  );
}
