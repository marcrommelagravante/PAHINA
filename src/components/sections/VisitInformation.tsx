import { Compass, MapPin } from "lucide-react";
import { EDITORIAL_IMAGES } from "@/data/editorialImages";
import { SITE_INFO, VISIT_PLACEHOLDERS } from "@/data/site";
import { FloatingPhoto } from "@/components/editorial/FloatingPhoto";
import { MaskedHeading } from "@/components/editorial/MaskedHeading";
import { EditorialButton } from "@/components/home/EditorialButton";

export function VisitInformation() {
  const directionsPlaceholder = VISIT_PLACEHOLDERS.find(
    (item) => item.id === "directions"
  );

  return (
    <div className="bg-paper">
      {/* Concept notice framed cleanly with Powder Blue hairlines */}
      <section aria-label="Concept notice" className="bg-paper py-12 sm:py-16">
        <div className="mx-auto max-w-3xl px-5 sm:px-8">
          <div className="border-y border-powder py-8 text-center">
            <p className="font-editorial text-2xl leading-snug italic text-ink sm:text-3xl">
              {SITE_INFO.conceptNotice}
            </p>
          </div>
        </div>
      </section>

      {/* Getting here — borderless feathered daylight spread */}
      <section
        aria-labelledby="getting-here-heading"
        className="overflow-x-clip bg-paper py-20 sm:py-28"
      >
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-6">
              <FloatingPhoto
                src={EDITORIAL_IMAGES.visitWindowsillPhoto}
                alt="Sunlit window table inside PAHINA with an open book, ceramic coffee cup, arched windows, and bookshelves"
                aspect="landscape"
                drift={24}
                scrollTilt={1.4}
                tiltOnHover
                feather="oval"
                sizes="(max-width: 1024px) 96vw, 48vw"
              />
              <p className="mt-3 text-center font-editorial text-base italic text-ink-muted">
                [Exterior Storefront Photo Placeholder] — Reserved for the
                pastel blue-grey facade and arched glass windows.
              </p>
            </div>

            <div className="space-y-7 lg:col-span-6">
              <div className="space-y-4">
                <MaskedHeading
                  id="getting-here-heading"
                  lines={[
                    <span key="l1">
                      Getting <em className="font-normal italic">here.</em>
                    </span>,
                  ]}
                  className="font-display text-4xl leading-[1.06] tracking-[-0.025em] text-ink sm:text-5xl"
                />
                <p className="max-w-md text-[13px] leading-[1.7] text-ink-muted">
                  Once a neighborhood street address is finalized, walking
                  landmarks, transit stops, and storefront photography will
                  appear here.
                </p>
              </div>

              {directionsPlaceholder && (
                <div className="border-y border-soft py-5">
                  <div className="flex items-center gap-2 text-ink">
                    <Compass
                      className="h-3.5 w-3.5 shrink-0"
                      strokeWidth={1.6}
                      aria-hidden="true"
                    />
                    <span className="text-[10px] font-medium tracking-[0.14em] uppercase text-ink-muted">
                      {directionsPlaceholder.label}
                    </span>
                  </div>
                  <p className="mt-2 font-display text-2xl text-ink">
                    {directionsPlaceholder.placeholderValue}
                  </p>
                  <p className="mt-1.5 text-[12px] leading-relaxed text-ink-muted">
                    {directionsPlaceholder.helperNote}
                  </p>
                </div>
              )}

              <div className="flex gap-10 text-[10px] leading-[1.5] tracking-[0.14em] uppercase text-ink-muted">
                <div>
                  <p>Books</p>
                  <p className="font-medium text-ink">
                    Read in, return before leaving
                  </p>
                </div>
                <div>
                  <p>Menu</p>
                  <p className="font-medium text-ink">39 Items</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Architectural dashed map placeholder on bare Paper White */}
      <section
        aria-labelledby="map-placeholder-heading"
        className="bg-paper py-12 sm:py-20"
      >
        <div className="mx-auto max-w-5xl px-5 sm:px-8">
          <div className="flex min-h-[260px] flex-col items-center justify-center rounded-[2px] border border-dashed border-slate/80 bg-paper px-6 py-14 text-center sm:min-h-[320px] sm:px-12">
            <MapPin
              className="h-6 w-6 text-ink-muted"
              strokeWidth={1.4}
              aria-hidden="true"
            />
            <h2
              id="map-placeholder-heading"
              className="mt-4 font-display text-2xl text-ink sm:text-4xl"
            >
              [Map Location Placeholder]
            </h2>
            <p className="mt-3 max-w-sm text-[13px] leading-[1.7] text-ink-muted">
              An interactive neighborhood map and confirmed street pin will be
              embedded here once a real café address is supplied.
            </p>
          </div>
        </div>
      </section>

      {/* Closing invitation to Menu & Reading Room */}
      <section className="bg-paper pt-16 pb-24 sm:pt-24 sm:pb-32">
        <div className="mx-auto max-w-3xl px-5 text-center sm:px-8">
          <MaskedHeading
            lines={[
              <span key="l1">
                While the kettle warms,{" "}
                <em className="font-normal italic">browse inside.</em>
              </span>,
            ]}
            className="font-display text-4xl leading-[1.06] tracking-[-0.025em] text-ink sm:text-5xl lg:text-6xl"
          />
          <p className="mx-auto mt-5 max-w-md text-[13px] leading-[1.7] text-ink-muted">
            Read through our 39-item counter menu or preview the six shelves
            waiting in the Reading Room.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <EditorialButton href="/menu" variant="solid">
              Explore Menu
            </EditorialButton>
            <EditorialButton href="/reading-room" variant="outline">
              Reading Room
            </EditorialButton>
          </div>
        </div>
      </section>
    </div>
  );
}
