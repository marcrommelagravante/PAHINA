"use client";

import { useRef, type ReactNode } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface MaskedHeadingProps {
  lines: ReactNode[];
  as?: "h1" | "h2" | "h3";
  id?: string;
  className?: string;
  immediate?: boolean;
  delay?: number;
}

/**
 * Editorial masked line-by-line serif reveal.
 * Observes the unclipped outer heading element via useInView so lines never
 * stall invisible when offset inside overflow-hidden wrappers, with generous
 * descender padding so tall Bodoni tails ('y', 'g', 'p') never clip.
 */
export function MaskedHeading({
  lines,
  as = "h2",
  id,
  className,
  immediate = false,
  delay = 0,
}: MaskedHeadingProps) {
  const prefersReducedMotion = useReducedMotion();
  const headingRef = useRef<HTMLHeadingElement>(null);
  const isInView = useInView(headingRef, { once: true, amount: 0.15 });
  const HeadingTag = as;

  const shouldReveal = immediate || isInView;

  if (prefersReducedMotion) {
    return (
      <HeadingTag ref={headingRef} id={id} className={cn(className)}>
        {lines.map((line, idx) => (
          <motion.span
            key={idx}
            className="block"
            initial={{ opacity: 0 }}
            animate={shouldReveal ? { opacity: 1 } : { opacity: 0 }}
            transition={{
              duration: 0.25,
              delay: idx * 0.03,
              ease: [0.23, 1, 0.32, 1],
            }}
          >
            {line}
          </motion.span>
        ))}
      </HeadingTag>
    );
  }

  return (
    <HeadingTag ref={headingRef} id={id} className={cn(className)}>
      {lines.map((line, idx) => (
        <span
          key={idx}
          className="block overflow-hidden pt-[0.04em] -mt-[0.04em] pb-[0.2em] -mb-[0.2em]"
        >
          <motion.span
            className="block"
            initial={{ y: "105%", opacity: 0 }}
            animate={
              shouldReveal ? { y: "0%", opacity: 1 } : { y: "105%", opacity: 0 }
            }
            transition={{
              duration: 0.68,
              delay: delay + idx * 0.085,
              ease: [0.23, 1, 0.32, 1],
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </HeadingTag>
  );
}
