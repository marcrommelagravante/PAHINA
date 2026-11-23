"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

export default function Template({ children }: { children: ReactNode }) {
  const prefersReducedMotion = useReducedMotion();

  // Opacity-only route fade avoids creating a transform containing block
  // that would trap fixed modals or sticky toolbars inside descendant pages.
  return (
    <motion.div
      initial={{ opacity: prefersReducedMotion ? 0.65 : 0.25 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: prefersReducedMotion ? 0.2 : 0.32,
        ease: [0.23, 1, 0.32, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
