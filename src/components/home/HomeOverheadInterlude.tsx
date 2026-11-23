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
import { EDITORIAL_IMAGES } from "@/data/editorialImages";

const INTERLUDE_SPRING = { stiffness: 110, damping: 24, mass: 0.4 };

export function HomeOverheadInterlude() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const smoothScroll = useSpring(scrollYProgress, INTERLUDE_SPRING);
  const photoY = useTransform(smoothScroll, [0, 1], [32, -32]);
  const photoScale = useTransform(smoothScroll, [0, 0.5, 1], [0.97, 1.02, 0.98]);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="brewing-banner-heading"
      className="relative overflow-x-clip bg-paper py-20 sm:py-28 lg:py-36"
    >
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <motion.div
          style={
            prefersReducedMotion
              ? undefined
              : { y: photoY, scale: photoScale }
          }
          className="feather-wide relative mx-auto aspect-[16/9] w-full max-w-4xl overflow-hidden"
        >
          <Image
            src={EDITORIAL_IMAGES.homeBannerSpread}
            alt="Overhead sunlit café table spread with a stoneware bowl of Aglio Olio, an iced coffee, a ceramic espresso cup, and an open cream-paged book with a powder-blue ribbon"
            fill
            sizes="(max-width: 1024px) 96vw, 896px"
            className="object-cover"
          />
        </motion.div>

        <div className="mx-auto mt-10 max-w-2xl text-center sm:mt-14">
          <MaskedHeading
            id="brewing-banner-heading"
            lines={[
              "Something warm is brewing.",
              <em key="l2" className="font-normal italic">
                We’ve got you covered.
              </em>,
            ]}
            className="font-display text-3xl leading-[1.08] tracking-[-0.025em] text-ink sm:text-5xl lg:text-[3.4rem]"
          />
        </div>
      </div>
    </section>
  );
}
