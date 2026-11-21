"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
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
 * Editorial masked line-by-line serif reveal: each line rises cleanly from
 * behind its own baseline clip, staying static under prefers-reduced-motion.
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
  const HeadingTag = as;

  if (prefersReducedMotion) {
    return (
      <HeadingTag id={id} className={className}>
        {lines.map((line, idx) => (
          <span key={idx} className="block">
            {line}
          </span>
        ))}
      </HeadingTag>
    );
  }

  return (
    <HeadingTag id={id} className={cn(className)}>
      {lines.map((line, idx) => (
        <span
          key={idx}
          className="block overflow-hidden pb-[0.06em] -mb-[0.06em]"
        >
          <motion.span
            className="block will-change-transform"
            initial={{ y: "105%", opacity: 0 }}
            {...(immediate
              ? { animate: { y: "0%", opacity: 1 } }
              : {
                  whileInView: { y: "0%", opacity: 1 },
                  viewport: { once: true, amount: 0.35 },
                })}
            transition={{
              duration: 0.72,
              delay: delay + idx * 0.1,
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
