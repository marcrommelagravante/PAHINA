"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { EDITORIAL_IMAGES } from "@/data/editorialImages";
import { cn } from "@/lib/utils";

interface MarbleSheetProps {
  children: ReactNode;
  className?: string;
  sheetClassName?: string;
  animateOnMount?: boolean;
  as?: "section" | "footer";
  ariaLabelledBy?: string;
}

/**
 * Shared honed-marble backdrop carrying a Paper White editorial sheet.
 * Used for inner-route heroes (settles gently on load, no scroll tilt)
 * and the site footer bookend.
 */
export function MarbleSheet({
  children,
  className,
  sheetClassName,
  animateOnMount = true,
  as = "section",
  ariaLabelledBy,
}: MarbleSheetProps) {
  const prefersReducedMotion = useReducedMotion();
  const shouldAnimate = animateOnMount && !prefersReducedMotion;

  const Wrapper = as;

  return (
    <Wrapper
      aria-labelledby={ariaLabelledBy}
      className={cn(
        "relative overflow-x-clip border-b border-soft bg-paper bg-cover bg-center",
        className
      )}
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(244, 241, 234, 0.34), rgba(244, 241, 234, 0.56)), url('${EDITORIAL_IMAGES.marbleTexture}')`,
      }}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-8">
        <motion.div
          initial={
            shouldAnimate
              ? { opacity: 0.15, y: 18, rotate: -1.4 }
              : false
          }
          animate={{ opacity: 1, y: 0, rotate: 0 }}
          transition={{
            duration: 0.75,
            ease: [0.65, 0, 0.35, 1],
          }}
          className={cn(
            "rounded-[6px] border border-soft bg-paper will-change-transform",
            sheetClassName
          )}
        >
          {children}
        </motion.div>
      </div>
    </Wrapper>
  );
}
