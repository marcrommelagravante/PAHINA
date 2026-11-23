"use client";

import Image from "next/image";
import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { MaskedHeading } from "@/components/editorial/MaskedHeading";
import { EditorialButton } from "@/components/home/EditorialButton";
import { EDITORIAL_IMAGES } from "@/data/editorialImages";

const FINALE_SPRING = { stiffness: 110, damping: 24, mass: 0.4 };

export function HomeReadingFinale() {
  const readingRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: readingRef,
    offset: ["start end", "end start"],
  });

  const smoothScroll = useSpring(scrollYProgress, FINALE_SPRING);
  const photoY = useTransform(smoothScroll, [0, 1], [30, -30]);
  const photoRotate = useTransform(smoothScroll, [0, 1], [1.4, -1.4]);

  return (
    <>
      {/* Beat 5: Airy borderless Reading Room spread on unbroken Paper White */}
      <section
        ref={readingRef}
        aria-labelledby="reading-room-feature-heading"
        className="relative overflow-x-clip bg-paper py-24 sm:py-32"
      >
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-6">
              <motion.div
                style={
                  prefersReducedMotion
                    ? undefined
                    : { y: photoY, rotate: photoRotate }
                }
                className="feather-oval relative mx-auto aspect-[4/5] w-full max-w-[440px] overflow-hidden will-change-transform"
              >
                <Image
                  src={EDITORIAL_IMAGES.homeReadingFeature}
                  alt="Open cream-paged cloth-bound book marked with a muted powder-blue ribbon bookmark beside a matte stoneware coffee cup on a warm oak banquette table inside PAHINA, with pastel Powder Blue wainscoting, wall outlets, and oak bookshelves softly blurred behind"
                  fill
                  sizes="(max-width: 1024px) 90vw, 440px"
                  className="object-cover"
                />
              </motion.div>
            </div>

            <div className="space-y-8 lg:col-span-6 lg:pl-6">
              <MaskedHeading
                id="reading-room-feature-heading"
                lines={[
                  "Find a story",
                  <em key="l2" className="font-normal italic">
                    worth staying for.
                  </em>,
                ]}
                className="font-display text-4xl leading-[1.04] tracking-[-0.025em] text-ink sm:text-5xl lg:text-[3.5rem]"
              />

              <div className="max-w-[300px] space-y-3.5 text-[13px] leading-[1.7] text-ink-muted">
                <p>
                  Along our pastel blue-grey walls sits a curated in-café
                  collection across Fiction, Romance, Mystery, Philosophy,
                  Poetry, and Nonfiction.
                </p>
                <p>
                  Pick a volume, bring it to your table beside your cup, and
                  return it before leaving—no library cards or checkout desks.
                </p>
              </div>

              <div className="flex flex-wrap items-end justify-between gap-6 pt-2">
                <EditorialButton href="/reading-room">
                  Reading Room
                </EditorialButton>

                <div className="text-[10px] leading-[1.5] tracking-[0.14em] uppercase text-ink-muted">
                  <p>Books</p>
                  <p className="font-medium text-ink">
                    Read in, return before leaving
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Beat 6: Quiet unboxed closing invitation flowing straight into the Footer */}
      <section
        aria-labelledby="home-closing-heading"
        className="bg-paper pt-16 pb-28 sm:pt-24 sm:pb-36"
      >
        <div className="mx-auto max-w-3xl px-5 text-center sm:px-8">
          <MaskedHeading
            id="home-closing-heading"
            lines={[
              <span key="l1">
                We saved you <em className="font-normal italic">a seat.</em>
              </span>,
            ]}
            className="font-display text-4xl leading-[1.06] tracking-[-0.025em] text-ink sm:text-6xl"
          />

          <p className="mx-auto mt-5 max-w-md text-[13px] leading-[1.7] text-ink-muted">
            Preview our concept location placeholders and opening notes, or
            browse the full 39-item café menu before your next unhurried visit.
          </p>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <EditorialButton href="/visit" variant="solid">
              Visit Us
            </EditorialButton>
            <EditorialButton href="/menu" variant="outline">
              Explore Menu
            </EditorialButton>
          </div>
        </div>
      </section>
    </>
  );
}
