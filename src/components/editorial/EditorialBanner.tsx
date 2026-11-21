"use client";

import Image from "next/image";
import { useRef, type ReactNode } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { MaskedHeading } from "@/components/editorial/MaskedHeading";
import { cn } from "@/lib/utils";

interface EditorialBannerProps {
  src: string;
  alt: string;
  heading: ReactNode;
  description?: string;
  headingId?: string;
  className?: string;
}

const BANNER_SPRING = { stiffness: 110, damping: 24, mass: 0.4 };

export function EditorialBanner({
  src,
  alt,
  heading,
  description,
  headingId,
  className,
}: EditorialBannerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, BANNER_SPRING);
  const imageY = useTransform(smoothProgress, [0, 1], [30, -30]);
  const imageScale = useTransform(smoothProgress, [0, 0.5, 1], [0.97, 1.02, 0.98]);

  return (
    <section
      aria-labelledby={headingId}
      className={cn("overflow-x-clip bg-paper py-20 sm:py-28 lg:py-32", className)}
    >
      <div ref={containerRef} className="mx-auto max-w-5xl px-5 sm:px-8">
        <motion.div
          style={
            prefersReducedMotion
              ? undefined
              : { y: imageY, scale: imageScale }
          }
          className="feather-wide relative mx-auto aspect-[16/9] w-full max-w-4xl overflow-hidden will-change-transform"
        >
          <Image
            src={src}
            alt={alt}
            fill
            sizes="(max-width: 1024px) 96vw, 896px"
            className="object-cover"
          />
        </motion.div>

        <div className="mx-auto mt-10 max-w-2xl text-center sm:mt-14">
          <MaskedHeading
            id={headingId}
            lines={[heading]}
            className="font-display text-3xl leading-[1.08] tracking-[-0.025em] text-ink sm:text-5xl lg:text-[3.35rem]"
          />
          {description && (
            <p className="mx-auto mt-4 max-w-md text-[13px] leading-[1.7] text-ink-muted">
              {description}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
