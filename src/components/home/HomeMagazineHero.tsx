"use client";

import Image from "next/image";
import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { MaskedHeading } from "@/components/editorial/MaskedHeading";
import { EDITORIAL_IMAGES } from "@/data/editorialImages";
import { SITE_INFO } from "@/data/site";

const SCROLL_SPRING = { stiffness: 110, damping: 24, mass: 0.4 };
const HOVER_SPRING = { stiffness: 240, damping: 22, mass: 0.45 };

export function HomeMagazineHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const smoothScroll = useSpring(scrollYProgress, SCROLL_SPRING);
  const photoY = useTransform(smoothScroll, [0, 1], [0, -70]);
  const photoRotate = useTransform(smoothScroll, [0, 1], [-7, -2]);
  const textY = useTransform(smoothScroll, [0, 1], [0, 40]);

  const hoverX = useMotionValue(0);
  const hoverY = useMotionValue(0);
  const tiltX = useSpring(hoverX, HOVER_SPRING);
  const tiltY = useSpring(hoverY, HOVER_SPRING);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion) return;
    if (
      typeof window !== "undefined" &&
      !window.matchMedia("(hover: hover) and (pointer: fine)").matches
    ) {
      return;
    }
    const rect = event.currentTarget.getBoundingClientRect();
    const nx = (event.clientX - rect.left) / rect.width - 0.5;
    const ny = (event.clientY - rect.top) / rect.height - 0.5;
    hoverY.set(nx * 6);
    hoverX.set(-ny * 6);
  };

  const handleMouseLeave = () => {
    hoverX.set(0);
    hoverY.set(0);
  };

  return (
    <section
      ref={sectionRef}
      aria-labelledby="home-hero-heading"
      className="relative flex min-h-[96svh] items-center overflow-x-clip bg-paper pt-28 pb-20 sm:pt-32 sm:pb-24"
    >
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <div className="relative grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-4">
          {/* Left monumental stacked editorial headline */}
          <motion.div
            style={prefersReducedMotion ? undefined : { y: textY }}
            className="relative z-10 space-y-6 lg:col-span-5"
          >
            <MaskedHeading
              as="h1"
              id="home-hero-heading"
              immediate
              delay={0.34}
              lines={[
                "Every",
                "page holds",
                <em key="l3" className="font-normal italic">
                  a story.
                </em>,
              ]}
              className="font-display text-[clamp(3.6rem,7.2vw,6.35rem)] leading-[0.98] tracking-[-0.03em] text-ink"
            />

            <motion.p
              initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                delay: prefersReducedMotion ? 0 : 0.62,
                ease: [0.23, 1, 0.32, 1],
              }}
              className="max-w-[270px] text-[13px] leading-[1.65] text-ink-muted"
            >
              {SITE_INFO.supportingLines.curiousMinds}
            </motion.p>
          </motion.div>

          {/* Right angled borderless overhead flat-lay floating straight on paper */}
          <div className="relative lg:col-span-7">
            <motion.div
              initial={
                prefersReducedMotion
                  ? false
                  : { opacity: 0, x: 48, scale: 0.96 }
              }
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{
                duration: 1.05,
                delay: prefersReducedMotion ? 0 : 0.38,
                ease: [0.23, 1, 0.32, 1],
              }}
            >
              <motion.div
                style={
                  prefersReducedMotion
                    ? { rotate: -5 }
                    : { y: photoY, rotate: photoRotate, perspective: 950 }
                }
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="mx-auto w-full max-w-[660px]"
              >
                <motion.div
                  style={
                    prefersReducedMotion
                      ? undefined
                      : {
                          rotateX: tiltX,
                          rotateY: tiltY,
                          transformStyle: "preserve-3d",
                        }
                  }
                  className="feather-oval relative aspect-[4/3] w-full overflow-hidden"
                >
                  <Image
                    src={EDITORIAL_IMAGES.homeHeroFlatlay}
                    alt="Overhead flat-lay of a matte stoneware Café Latte, an open cream-paged book, silver teaspoon, and folded powder-blue linen napkin on warm paper"
                    fill
                    priority
                    sizes="(max-width: 1024px) 96vw, 56vw"
                    className="object-cover"
                  />
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Whisper-quiet corner print annotation (honest PAHINA fact) */}
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: 0.6,
                delay: prefersReducedMotion ? 0 : 0.85,
              }}
              className="mt-4 flex justify-end lg:absolute lg:right-2 lg:bottom-0 lg:mt-0"
            >
              <div className="text-right text-[10px] leading-[1.5] tracking-[0.14em] uppercase text-ink-muted">
                <p>Menu</p>
                <p className="font-medium text-ink">39 Items</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
