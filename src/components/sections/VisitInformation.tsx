import { Compass, MapPin } from "lucide-react";
import { EDITORIAL_IMAGES } from "@/data/editorialImages";
import { SITE_INFO, VISIT_PLACEHOLDERS } from "@/data/site";
import { FloatingPhoto } from "@/components/editorial/FloatingPhoto";
import { MarginNote } from "@/components/editorial/MarginNote";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function VisitInformation() {
  const directionsPlaceholder = VISIT_PLACEHOLDERS.find(
    (item) => item.id === "directions"
  );

  return (
    <>
      {/* Concept notice as a centered framed serif statement */}
      <section
        aria-label="Concept notice"
        className="border-b border-soft bg-paper py-14 sm:py-20"
      >
        <div className="mx-auto max-w-4xl px-5 sm:px-8">
          <Reveal>
            <div className="rounded-2xl border border-powder bg-powder-soft/55 px-6 py-8 text-center sm:px-12 sm:py-10">
              <p className="font-editorial text-2xl leading-snug italic text-ink sm:text-3xl">
                {SITE_INFO.conceptNotice}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Getting here — Story spread with windowsill photo & honest directions placeholder */}
      <section
        aria-labelledby="getting-here-heading"
        className="border-b border-soft bg-surface-elevated py-16 sm:py-24"
      >
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <Reveal>
            <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-14">
              <div className="lg:col-span-6">
                <FloatingPhoto
                  src={EDITORIAL_IMAGES.visitWindowsillPhoto}
                  alt="Sunlit window table inside PAHINA with an open book, ceramic coffee cup, arched windows, and bookshelves"
                  aspect="landscape"
                  drift={24}
                  scrollTilt={1.5}
                  tiltOnHover
                  framed
                  sizes="(max-width: 1024px) 100vw, 48vw"
                />
                <p className="mt-3 font-editorial text-lg italic text-ink-muted">
                  [Exterior Storefront Photo Placeholder] — Reserved for the
                  pastel blue-grey facade and arched glass windows.
                </p>
              </div>

              <div className="space-y-6 lg:col-span-6">
                <div id="getting-here-heading">
                  <SectionHeading
                    title={
                      <>
                        Getting <em className="font-normal italic">here.</em>
                      </>
                    }
                    description="Once a neighborhood street address is finalized, walking landmarks, transit stops, and storefront photography will appear here."
                  />
                </div>

                {directionsPlaceholder && (
                  <div className="border-y border-soft py-5">
                    <div className="flex items-center gap-2.5 text-ink">
                      <Compass
                        className="h-4 w-4 shrink-0"
                        strokeWidth={1.6}
                        aria-hidden="true"
                      />
                      <span className="text-xs font-medium tracking-[0.04em] text-ink-muted">
                        {directionsPlaceholder.label}
                      </span>
                    </div>
                    <p className="mt-2 font-display text-2xl text-ink">
                      {directionsPlaceholder.placeholderValue}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                      {directionsPlaceholder.helperNote}
                    </p>
                  </div>
                )}

                <div className="grid max-w-sm grid-cols-2 gap-6">
                  <MarginNote
                    label="Books"
                    value="Read in, return before leaving"
                  />
                  <MarginNote label="Menu" value="39 items" />
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Map placeholder as a full-width dashed sheet on honed marble */}
      <section
        aria-labelledby="map-placeholder-heading"
        className="border-b border-soft bg-paper bg-cover bg-center py-16 sm:py-24"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(244, 241, 234, 0.34), rgba(244, 241, 234, 0.56)), url('${EDITORIAL_IMAGES.marbleTexture}')`,
        }}
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-8">
          <Reveal>
            <div className="flex min-h-[280px] flex-col items-center justify-center rounded-[6px] border border-dashed border-slate bg-paper px-6 py-14 text-center sm:min-h-[340px] sm:px-12">
              <MapPin
                className="h-7 w-7 text-ink-muted"
                strokeWidth={1.5}
                aria-hidden="true"
              />
              <h2
                id="map-placeholder-heading"
                className="mt-4 font-display text-2xl text-ink sm:text-4xl"
              >
                [Map Location Placeholder]
              </h2>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-ink-muted sm:text-base">
                An interactive neighborhood map and confirmed street pin will be
                embedded here once a real café address is supplied.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Closing invitation to Menu & Reading Room (no VisitBanner on Visit itself) */}
      <section className="bg-paper py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-5 text-center sm:px-8">
          <Reveal>
            <h2 className="font-display text-3xl leading-[1.1] tracking-[-0.02em] text-ink sm:text-5xl">
              While the kettle warms,{" "}
              <em className="font-normal italic">browse inside.</em>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-ink-muted sm:text-lg">
              Read through our 39-item counter menu or preview the six shelves
              waiting in the Reading Room.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3.5">
              <PrimaryButton href="/menu" variant="primary">
                Explore Our Menu
              </PrimaryButton>
              <PrimaryButton href="/reading-room" variant="secondary">
                Explore the Reading Room
              </PrimaryButton>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
