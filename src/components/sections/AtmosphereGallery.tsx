"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { FloatingPhoto } from "@/components/editorial/FloatingPhoto";
import { MaskedHeading } from "@/components/editorial/MaskedHeading";
import { Reveal } from "@/components/ui/Reveal";
import { ATMOSPHERE_GALLERY_IMAGES, SITE_INFO } from "@/data/site";

export function AtmosphereGallery() {
  const prefersReducedMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  const [readingCorner, morningPour, openPages, afternoonGlass] =
    ATMOSPHERE_GALLERY_IMAGES;

  const total = ATMOSPHERE_GALLERY_IMAGES.length;

  useEffect(() => {
    if (activeIndex === null) return;

    closeRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveIndex(null);
      } else if (event.key === "ArrowRight") {
        setActiveIndex((prev) => (prev === null ? null : (prev + 1) % total));
      } else if (event.key === "ArrowLeft") {
        setActiveIndex((prev) =>
          prev === null ? null : (prev - 1 + total) % total
        );
      }
    };

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activeIndex, total]);

  const activePhoto =
    activeIndex !== null ? ATMOSPHERE_GALLERY_IMAGES[activeIndex] : null;

  return (
    <section
      aria-labelledby="atmosphere-gallery-heading"
      className="border-b border-soft bg-paper py-16 sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="max-w-2xl space-y-4">
          <MaskedHeading
            id="atmosphere-gallery-heading"
            lines={[
              <span key="l1">
                Quiet corners and{" "}
                <em className="font-normal italic">unhurried hours.</em>
              </span>,
            ]}
            className="font-display text-3xl leading-[1.12] tracking-[-0.02em] text-ink sm:text-4xl"
          />
          <p className="text-base leading-relaxed text-ink-muted sm:text-lg">
            Pastel blue-grey walls, warm oak tables, and daylight framed for
            reading—not crowded floorplans. Select any frame to inspect up
            close.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-12 md:gap-7">
          <Reveal className="md:col-span-7">
            <figure className="group space-y-3">
              <button
                type="button"
                onClick={() => setActiveIndex(0)}
                aria-label={`Inspect photograph: ${readingCorner.caption}`}
                className="block w-full text-left focus-visible:rounded-2xl"
              >
                <FloatingPhoto
                  src={readingCorner.src}
                  alt={readingCorner.alt}
                  aspect="landscape"
                  drift={22}
                  scrollTilt={1.2}
                  tiltOnHover
                  framed
                  sizes="(max-width: 768px) 100vw, 58vw"
                />
              </button>
              <figcaption className="font-editorial text-lg italic leading-snug text-ink-muted">
                {readingCorner.caption}
              </figcaption>
            </figure>
          </Reveal>

          <Reveal className="md:col-span-5" delay={0.05}>
            <figure className="group space-y-3">
              <button
                type="button"
                onClick={() => setActiveIndex(1)}
                aria-label={`Inspect photograph: ${morningPour.caption}`}
                className="block w-full text-left focus-visible:rounded-2xl"
              >
                <FloatingPhoto
                  src={morningPour.src}
                  alt={morningPour.alt}
                  aspect="portrait"
                  drift={-22}
                  scrollTilt={-1.4}
                  tiltOnHover
                  framed
                  sizes="(max-width: 768px) 100vw, 40vw"
                />
              </button>
              <figcaption className="font-editorial text-lg italic leading-snug text-ink-muted">
                {morningPour.caption}
              </figcaption>
            </figure>
          </Reveal>

          <Reveal className="md:col-span-5" delay={0.05}>
            <figure className="group space-y-3">
              <button
                type="button"
                onClick={() => setActiveIndex(2)}
                aria-label={`Inspect photograph: ${openPages.caption}`}
                className="block w-full text-left focus-visible:rounded-2xl"
              >
                <FloatingPhoto
                  src={openPages.src}
                  alt={openPages.alt}
                  aspect="portrait"
                  drift={24}
                  scrollTilt={1.4}
                  tiltOnHover
                  framed
                  sizes="(max-width: 768px) 100vw, 40vw"
                />
              </button>
              <figcaption className="font-editorial text-lg italic leading-snug text-ink-muted">
                {openPages.caption}
              </figcaption>
            </figure>
          </Reveal>

          <Reveal className="md:col-span-7" delay={0.1}>
            <div className="grid h-full grid-cols-1 gap-6 sm:grid-cols-12 sm:items-end">
              <div className="sm:col-span-7">
                <figure className="group space-y-3">
                  <button
                    type="button"
                    onClick={() => setActiveIndex(3)}
                    aria-label={`Inspect photograph: ${afternoonGlass.caption}`}
                    className="block w-full text-left focus-visible:rounded-2xl"
                  >
                    <FloatingPhoto
                      src={afternoonGlass.src}
                      alt={afternoonGlass.alt}
                      aspect="portrait"
                      drift={-20}
                      scrollTilt={-1.4}
                      tiltOnHover
                      framed
                      sizes="(max-width: 768px) 100vw, 32vw"
                    />
                  </button>
                  <figcaption className="font-editorial text-lg italic leading-snug text-ink-muted">
                    {afternoonGlass.caption}
                  </figcaption>
                </figure>
              </div>

              <div className="flex flex-col justify-between rounded-2xl border border-powder bg-powder-soft p-6 sm:col-span-5 sm:p-7">
                <p className="font-editorial text-2xl leading-snug italic text-ink sm:text-3xl">
                  “{SITE_INFO.supportingLines.experience}”
                </p>
                <p className="mt-6 text-sm leading-relaxed text-ink-muted">
                  Small tables for individuals and pairs, wide walkways, and
                  books kept close without crowding your space.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Editorial Lightbox */}
      <AnimatePresence>
        {activePhoto && activeIndex !== null && (
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Atmosphere photograph viewer"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.22 }}
              onClick={() => setActiveIndex(null)}
              className="fixed inset-0 bg-ink/45 backdrop-blur-xs"
              aria-hidden="true"
            />

            <motion.div
              initial={
                prefersReducedMotion
                  ? { opacity: 1 }
                  : { opacity: 0, scale: 0.96, y: 16 }
              }
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={
                prefersReducedMotion
                  ? { opacity: 0 }
                  : { opacity: 0, scale: 0.97, y: 12 }
              }
              transition={{ duration: 0.28, ease: [0.23, 1, 0.32, 1] }}
              className="relative z-10 w-full max-w-4xl rounded-2xl border border-soft bg-paper p-5 text-ink sm:p-7"
            >
              <div className="mb-4 flex items-center justify-between gap-4 border-b border-soft pb-3">
                <span className="text-xs font-medium tabular-nums tracking-[0.06em] text-ink-muted">
                  {String(activeIndex + 1).padStart(2, "0")} /{" "}
                  {String(total).padStart(2, "0")}
                </span>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      setActiveIndex((prev) =>
                        prev === null ? null : (prev - 1 + total) % total
                      )
                    }
                    aria-label="Previous photograph"
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-soft bg-surface-elevated text-ink transition-colors duration-150 hover:border-ink"
                  >
                    <ChevronLeft className="h-4 w-4" strokeWidth={1.7} />
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setActiveIndex((prev) =>
                        prev === null ? null : (prev + 1) % total
                      )
                    }
                    aria-label="Next photograph"
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-soft bg-surface-elevated text-ink transition-colors duration-150 hover:border-ink"
                  >
                    <ChevronRight className="h-4 w-4" strokeWidth={1.7} />
                  </button>
                  <button
                    ref={closeRef}
                    type="button"
                    onClick={() => setActiveIndex(null)}
                    aria-label="Close photograph viewer"
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-soft bg-surface-elevated text-ink transition-colors duration-150 hover:border-ink"
                  >
                    <X className="h-4 w-4" strokeWidth={1.7} />
                  </button>
                </div>
              </div>

              <AnimatePresence mode="wait">
                <motion.figure
                  key={activePhoto.id}
                  initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={
                    prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -8 }
                  }
                  transition={{ duration: 0.22 }}
                  className="space-y-4"
                >
                  <div className="relative h-[56svh] max-h-[560px] w-full overflow-hidden rounded-xl border border-soft bg-surface-elevated">
                    <Image
                      src={activePhoto.src}
                      alt={activePhoto.alt}
                      fill
                      sizes="(max-width: 1024px) 92vw, 860px"
                      className="object-contain"
                    />
                  </div>
                  <figcaption className="text-center font-editorial text-xl italic text-ink">
                    {activePhoto.caption}
                  </figcaption>
                </motion.figure>
              </AnimatePresence>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
