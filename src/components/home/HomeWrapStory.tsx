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
import { EditorialButton } from "@/components/home/EditorialButton";
import { EDITORIAL_IMAGES } from "@/data/editorialImages";
import { SITE_INFO } from "@/data/site";

const STORY_SPRING = { stiffness: 110, damping: 24, mass: 0.4 };

export function HomeWrapStory() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const smoothScroll = useSpring(scrollYProgress, STORY_SPRING);
  const centerPhotoY = useTransform(smoothScroll, [0, 1], [44, -44]);
  const centerPhotoRotate = useTransform(smoothScroll, [0, 1], [-1.8, 1.8]);
  const cornerDriftUp = useTransform(smoothScroll, [0, 1], [22, -22]);
  const cornerDriftDown = useTransform(smoothScroll, [0, 1], [-18, 18]);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="between-pages-heading"
      className="relative overflow-x-clip bg-paper py-24 sm:py-32 lg:py-40"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        {/* Desktop 4-corner wrap-around magazine composition (stacks cleanly on mobile) */}
        <div className="relative grid grid-cols-1 gap-10 lg:min-h-[780px] lg:grid-cols-12 lg:gap-0">
          {/* TOP-LEFT CORNER: Opening statement + italic descriptor */}
          <motion.div
            style={prefersReducedMotion ? undefined : { y: cornerDriftDown }}
            className="relative z-10 lg:col-span-4 lg:self-start"
          >
            <motion.div
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.56, ease: [0.23, 1, 0.32, 1] }}
              className="space-y-4"
            >
              <h2
                id="between-pages-heading"
                className="font-display text-4xl leading-[1.03] tracking-[-0.025em] text-ink sm:text-5xl lg:text-[3.35rem]"
              >
                We believe
                <br />
                in the quiet
              </h2>
              <p className="font-editorial text-xl italic text-ink-muted sm:text-2xl">
                ({SITE_INFO.descriptor})
              </p>
            </motion.div>
          </motion.div>

          {/* CENTER FLOATING DRINKS (positioned dead-center on desktop, flows naturally on mobile) */}
          <div className="relative z-0 mx-auto w-full max-w-[340px] sm:max-w-[390px] lg:pointer-events-none lg:absolute lg:inset-0 lg:flex lg:max-w-none lg:items-center lg:justify-center">
            <motion.div
              style={
                prefersReducedMotion
                  ? undefined
                  : { y: centerPhotoY, rotate: centerPhotoRotate }
              }
              className="w-full lg:w-[430px]"
            >
              <motion.div
                initial={{
                  opacity: 0,
                  scale: prefersReducedMotion ? 1 : 0.96,
                }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.68,
                  delay: prefersReducedMotion ? 0 : 0.08,
                  ease: [0.23, 1, 0.32, 1],
                }}
                className="feather-oval relative aspect-[4/5] w-full"
              >
                <Image
                  src={EDITORIAL_IMAGES.homeStoryPours}
                  alt="Hot Café Latte in cream stoneware beside an iced Spanish Latte in a fluted glass and a charcoal cloth-bound book on warm paper"
                  fill
                  sizes="(max-width: 1024px) 84vw, 430px"
                  className="object-cover"
                />
              </motion.div>
            </motion.div>
          </div>

          {/* TOP-RIGHT CORNER: Continuation phrase + whisper-quiet fact note */}
          <motion.div
            style={prefersReducedMotion ? undefined : { y: cornerDriftUp }}
            className="relative z-10 lg:col-span-4 lg:col-start-9 lg:self-start"
          >
            <motion.div
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.56,
                delay: prefersReducedMotion ? 0 : 0.1,
                ease: [0.23, 1, 0.32, 1],
              }}
              className="flex flex-col justify-between gap-6 lg:items-end lg:text-right"
            >
              <div className="text-[10px] leading-[1.5] tracking-[0.14em] uppercase text-ink-muted">
                <p>Shelves</p>
                <p className="font-medium text-ink">6 Genres</p>
              </div>
              <p
                aria-hidden="true"
                className="font-display text-4xl leading-[1.03] tracking-[-0.025em] text-ink sm:text-5xl lg:text-[3.35rem]"
              >
                of good
                <br />
                coffee
              </p>
            </motion.div>
          </motion.div>

          {/* BOTTOM-LEFT CORNER: Narrow micro-prose column + hairline rectangular CTA */}
          <motion.div
            style={prefersReducedMotion ? undefined : { y: cornerDriftUp }}
            className="relative z-10 lg:col-span-4 lg:self-end lg:pt-24"
          >
            <motion.div
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.56,
                delay: prefersReducedMotion ? 0 : 0.18,
                ease: [0.23, 1, 0.32, 1],
              }}
              className="space-y-6"
            >
              <div className="max-w-[250px] space-y-3.5 text-[12.5px] leading-[1.7] text-ink-muted">
                <p>
                  PAHINA brings together two ordinary pleasures that belong in the
                  same room: thoughtfully made coffee and unhurried time with a
                  good book.
                </p>
                <p>
                  Shaped as a small neighborhood café with sunlit oak tables and
                  muted blue-grey walls, the room leaves quiet breathing space so
                  you can stay for a chapter or three.
                </p>
              </div>

              <EditorialButton href="/about">See more</EditorialButton>
            </motion.div>
          </motion.div>

          {/* BOTTOM-RIGHT CORNER: Closing phrase + micro fact note */}
          <motion.div
            style={prefersReducedMotion ? undefined : { y: cornerDriftDown }}
            className="relative z-10 lg:col-span-4 lg:col-start-9 lg:self-end lg:pt-24"
          >
            <motion.div
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.56,
                delay: prefersReducedMotion ? 0 : 0.25,
                ease: [0.23, 1, 0.32, 1],
              }}
              className="flex flex-col gap-6 lg:items-end lg:text-right"
            >
              <p
                aria-hidden="true"
                className="font-display text-4xl leading-[1.03] tracking-[-0.025em] text-ink sm:text-5xl lg:text-[3.35rem]"
              >
                and slow
                <br />
                <em className="font-normal italic">pages.</em>
              </p>
              <div className="flex gap-8 text-[10px] leading-[1.5] tracking-[0.14em] uppercase text-ink-muted">
                <div>
                  <p>Drinks</p>
                  <p className="font-medium text-ink">Hot or Iced</p>
                </div>
                <div>
                  <p>Sizes</p>
                  <p className="font-medium text-ink">12 / 16 / 22 oz</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
