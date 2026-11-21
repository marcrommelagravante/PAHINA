"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { EDITORIAL_IMAGES } from "@/data/editorialImages";
import { SITE_INFO } from "@/data/site";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { FloatingPhoto } from "@/components/editorial/FloatingPhoto";
import { MarginNote } from "@/components/editorial/MarginNote";
import { MaskedHeading } from "@/components/editorial/MaskedHeading";

const HERO_SPRING = { stiffness: 120, damping: 26, mass: 0.4 };

export function HeroPageCard() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, HERO_SPRING);
  const scrollRotate = useTransform(smoothProgress, [0, 1], [0, 3.2]);
  const scrollY = useTransform(smoothProgress, [0, 1], [0, -88]);
  const scrollScale = useTransform(smoothProgress, [0, 1], [1, 0.935]);
  const scrollOpacity = useTransform(smoothProgress, [0, 1], [1, 0.58]);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="home-hero-heading"
      className="relative flex min-h-[100svh] items-center overflow-x-clip border-b border-soft bg-paper bg-cover bg-center pt-22 pb-10 sm:pt-26 sm:pb-14"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(244, 241, 234, 0.28), rgba(244, 241, 234, 0.52)), url('${EDITORIAL_IMAGES.marbleTexture}')`,
      }}
    >
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-8">
        <motion.div
          style={
            prefersReducedMotion
              ? undefined
              : {
                  rotate: scrollRotate,
                  y: scrollY,
                  scale: scrollScale,
                  opacity: scrollOpacity,
                }
          }
          className="origin-center will-change-transform"
        >
          <motion.div
            initial={
              prefersReducedMotion
                ? false
                : { rotate: -4, y: 48, opacity: 0 }
            }
            animate={{ rotate: 0, y: 0, opacity: 1 }}
            transition={{
              duration: 1.2,
              ease: [0.65, 0, 0.35, 1],
            }}
            className="rounded-[6px] border border-soft bg-paper px-6 py-10 sm:px-12 sm:py-14 lg:px-16 lg:py-16 will-change-transform"
          >
            <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">
              <div className="flex flex-col justify-between space-y-7 lg:col-span-6">
                <div className="space-y-6">
                  <MaskedHeading
                    as="h1"
                    id="home-hero-heading"
                    immediate
                    delay={0.22}
                    lines={[
                      "Every page",
                      <em key="l2" className="font-normal italic">
                        holds a story.
                      </em>,
                    ]}
                    className="font-display text-5xl leading-[1.02] tracking-[-0.025em] text-ink sm:text-6xl lg:text-[4.35rem]"
                  />

                  <p className="max-w-md text-base leading-relaxed text-ink-muted sm:text-lg">
                    {SITE_INFO.supportingLines.curiousMinds}
                  </p>

                  <div className="flex flex-wrap items-center gap-3.5 pt-1">
                    <PrimaryButton href="/menu" variant="primary">
                      Explore the Menu
                    </PrimaryButton>
                    <PrimaryButton href="/visit" variant="secondary">
                      Visit Us
                    </PrimaryButton>
                  </div>
                </div>

                <div className="grid max-w-sm grid-cols-2 gap-6 pt-4">
                  <MarginNote label="Menu" value="39 items" />
                  <MarginNote label="Shelves" value="6 genres" />
                </div>
              </div>

              <div className="lg:col-span-6">
                <FloatingPhoto
                  src={EDITORIAL_IMAGES.homeHeroFlatlay}
                  alt="Overhead flat-lay of a matte stoneware Café Latte, an open cream-paged book, and a folded powder-blue linen napkin on warm paper"
                  aspect="landscape"
                  priority
                  drift={16}
                  scrollTilt={1.2}
                  tiltOnHover
                  sizes="(max-width: 1024px) 92vw, 46vw"
                  imgClassName="rounded-xl"
                />
                <p className="mt-3 text-right font-editorial text-lg italic text-ink-muted">
                  {SITE_INFO.descriptor}
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
