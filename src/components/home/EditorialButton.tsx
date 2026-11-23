"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import { cn } from "@/lib/utils";

interface EditorialButtonProps {
  href: string;
  children: ReactNode;
  variant?: "outline" | "solid";
  className?: string;
}

const MAGNETIC_SPRING = { stiffness: 320, damping: 24, mass: 0.35 };

/**
 * Razor-thin rectangular hairline editorial CTA matching the print-magazine
 * `[ See more ]` proportion from the reference video.
 */
export function EditorialButton({
  href,
  children,
  variant = "outline",
  className,
}: EditorialButtonProps) {
  const prefersReducedMotion = useReducedMotion();
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, MAGNETIC_SPRING);
  const y = useSpring(rawY, MAGNETIC_SPRING);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion) return;
    if (
      typeof window !== "undefined" &&
      !window.matchMedia("(hover: hover) and (pointer: fine)").matches
    ) {
      return;
    }
    const rect = event.currentTarget.getBoundingClientRect();
    rawX.set(((event.clientX - rect.left) / rect.width - 0.5) * 6);
    rawY.set(((event.clientY - rect.top) / rect.height - 0.5) * 5);
  };

  const handleMouseLeave = () => {
    rawX.set(0);
    rawY.set(0);
  };

  return (
    <motion.div
      style={prefersReducedMotion ? undefined : { x, y }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="inline-block"
    >
      <Link
        href={href}
        className={cn(
          "inline-flex min-h-[42px] items-center justify-center rounded-[2px] border px-7 py-2.5 text-xs font-medium tracking-[0.06em] transition-[background-color,border-color,color,transform] duration-200 ease-[var(--ease-out)] active:scale-[0.98]",
          variant === "solid"
            ? "border-ink bg-ink text-paper hover:bg-[#2F353A]"
            : "border-ink/35 bg-transparent text-ink hover:border-ink hover:bg-ink hover:text-paper",
          className
        )}
      >
        {children}
      </Link>
    </motion.div>
  );
}
