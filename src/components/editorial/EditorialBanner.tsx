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
import { cn } from "@/lib/utils";

interface EditorialBannerProps {
  src: string;
  alt: string;
  heading: ReactNode;
  description?: string;
  headingId?: string;
  className?: string;
  surface?: "paper" | "elevated";
}

const BANNER_SPRING = { stiffness: 120, damping: 26, mass: 0.4 };

export function EditorialBanner({
  src,
  alt,
  heading,
  description,
  headingId,
  className,
  surface = "paper",
}: EditorialBannerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, BANNER_SPRING);
  const imageY = useTransform(smoothProgress, [0, 1], [-22, 22]);
  const imageScale = useTransform(smoothProgress, [0, 0.5, 1], [1.08, 1.04, 1.08]);

  return (
    <section
      aria-labelledby={headingId}
      className={cn(
        "border-b border-soft py-16 sm:py-24",
        surface === "elevated" ? "bg-surface-elevated" : "bg-paper",
        className
      )}
    >
      <div ref={containerRef} className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-soft bg-soft sm:aspect-[21/10]">
          <motion.div
            style={
              prefersReducedMotion
                ? undefined
                : { y: imageY, scale: imageScale }
            }
            className="relative h-full w-full will-change-transform"
          >
            <Image
              src={src}
              alt={alt}
              fill
              sizes="(max-width: 1200px) 100vw, 1152px"
              className="object-cover"
            />
          </motion.div>
        </div>

        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.65, ease: [0.23, 1, 0.32, 1] }}
          className="mx-auto mt-10 max-w-2xl text-center sm:mt-14"
        >
          <h2
            id={headingId}
            className="font-display text-3xl leading-[1.1] tracking-[-0.02em] text-ink sm:text-5xl"
          >
            {heading}
          </h2>
          {description && (
            <p className="mt-4 text-base leading-relaxed text-ink-muted sm:text-lg">
              {description}
            </p>
          )}
        </motion.div>
      </div>
    </section>
  );
}
