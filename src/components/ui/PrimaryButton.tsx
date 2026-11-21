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

interface PrimaryButtonProps {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "powder";
  className?: string;
}

const MAGNETIC_SPRING = { stiffness: 320, damping: 24, mass: 0.35 };

export function PrimaryButton({
  href,
  children,
  variant = "primary",
  className,
}: PrimaryButtonProps) {
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
    const offsetX = ((event.clientX - rect.left) / rect.width - 0.5) * 7;
    const offsetY = ((event.clientY - rect.top) / rect.height - 0.5) * 6;
    rawX.set(offsetX);
    rawY.set(offsetY);
  };

  const handleMouseLeave = () => {
    rawX.set(0);
    rawY.set(0);
  };

  const styles =
    variant === "primary"
      ? "bg-ink text-paper hover:bg-[#2F353A]"
      : variant === "powder"
        ? "bg-powder text-ink hover:bg-[#A6C2D6]"
        : "border border-ink/25 bg-transparent text-ink hover:border-ink hover:bg-soft/60";

  return (
    <motion.div
      style={prefersReducedMotion ? undefined : { x, y }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="inline-block will-change-transform"
    >
      <Link
        href={href}
        className={cn(
          "inline-flex min-h-[44px] items-center justify-center rounded-full px-6 py-2.5 text-sm font-medium tracking-[0.02em] transition-[background-color,border-color,color,transform] duration-150 ease-[var(--ease-out)] active:scale-[0.97]",
          styles,
          className
        )}
      >
        {children}
      </Link>
    </motion.div>
  );
}
