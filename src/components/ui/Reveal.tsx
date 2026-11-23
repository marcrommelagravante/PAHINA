"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

const EASE_OUT: [number, number, number, number] = [0.23, 1, 0.32, 1];

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}

export function Reveal({
  children,
  className,
  delay = 0,
  y = 16,
}: RevealProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: prefersReducedMotion ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.14 }}
      transition={{
        duration: prefersReducedMotion ? 0.24 : 0.52,
        delay: prefersReducedMotion ? 0 : delay,
        ease: EASE_OUT,
      }}
    >
      {children}
    </motion.div>
  );
}

interface RevealGroupProps {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delayChildren?: number;
  amount?: number;
  as?: "div" | "ul" | "ol" | "dl";
}

export function RevealGroup({
  children,
  className,
  stagger = 0.06,
  delayChildren = 0.04,
  amount = 0.12,
  as = "div",
}: RevealGroupProps) {
  const prefersReducedMotion = useReducedMotion();
  const MotionTag = motion[as];

  const containerVariants: Variants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0.02 : stagger,
        delayChildren: prefersReducedMotion ? 0 : delayChildren,
      },
    },
  };

  return (
    <MotionTag
      className={className}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
    >
      {children}
    </MotionTag>
  );
}

interface RevealItemProps {
  children: ReactNode;
  className?: string;
  y?: number;
  as?: "div" | "li" | "article";
}

export function RevealItem({
  children,
  className,
  y = 16,
  as = "div",
}: RevealItemProps) {
  const prefersReducedMotion = useReducedMotion();
  const MotionTag = motion[as];

  const itemVariants: Variants = {
    hidden: {
      opacity: 0,
      y: prefersReducedMotion ? 0 : y,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReducedMotion ? 0.22 : 0.52,
        ease: EASE_OUT,
      },
    },
  };

  return (
    <MotionTag className={className} variants={itemVariants}>
      {children}
    </MotionTag>
  );
}
