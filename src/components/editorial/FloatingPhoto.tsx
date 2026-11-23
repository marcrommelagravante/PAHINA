"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { cn } from "@/lib/utils";

interface FloatingPhotoProps {
  src: string;
  alt: string;
  aspect?: "portrait" | "landscape" | "square" | "wide";
  sizes?: string;
  priority?: boolean;
  drift?: number;
  scrollTilt?: number;
  tiltOnHover?: boolean;
  /** Inscribed radial edge feathering into Paper White (#F4F1EA). */
  feather?: "none" | "oval" | "tight" | "wide";
  framed?: boolean;
  className?: string;
  imgClassName?: string;
}

const SCROLL_SPRING = { stiffness: 120, damping: 24, mass: 0.35 };
const HOVER_SPRING = { stiffness: 260, damping: 22, mass: 0.45 };

export function FloatingPhoto({
  src,
  alt,
  aspect = "portrait",
  sizes = "(max-width: 768px) 90vw, 33vw",
  priority = false,
  drift = 28,
  scrollTilt = 1.6,
  tiltOnHover = true,
  feather = "oval",
  framed = false,
  className,
  imgClassName,
}: FloatingPhotoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [isHovered, setIsHovered] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, SCROLL_SPRING);
  const scrollY = useTransform(smoothProgress, [0, 1], [drift, -drift]);
  const scrollRotate = useTransform(
    smoothProgress,
    [0, 0.5, 1],
    [-scrollTilt, 0, scrollTilt]
  );
  const scrollScale = useTransform(
    smoothProgress,
    [0, 0.5, 1],
    [0.975, 1.015, 0.985]
  );

  const rawRotateX = useMotionValue(0);
  const rawRotateY = useMotionValue(0);
  const hoverRotateX = useSpring(rawRotateX, HOVER_SPRING);
  const hoverRotateY = useSpring(rawRotateY, HOVER_SPRING);

  const enableScroll = !prefersReducedMotion && drift !== 0;
  const enableTilt = !prefersReducedMotion && tiltOnHover;

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!enableTilt) return;
    if (
      typeof window !== "undefined" &&
      !window.matchMedia("(hover: hover) and (pointer: fine)").matches
    ) {
      return;
    }
    const rect = event.currentTarget.getBoundingClientRect();
    const normX = (event.clientX - rect.left) / rect.width - 0.5;
    const normY = (event.clientY - rect.top) / rect.height - 0.5;
    rawRotateY.set(normX * 8);
    rawRotateX.set(-normY * 8);
  };

  const handleMouseEnter = () => {
    if (!enableTilt) return;
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    if (!enableTilt) return;
    setIsHovered(false);
    rawRotateX.set(0);
    rawRotateY.set(0);
  };

  const aspectClass =
    aspect === "landscape"
      ? "aspect-[4/3]"
      : aspect === "wide"
        ? "aspect-[16/9]"
        : aspect === "square"
          ? "aspect-square"
          : "aspect-[4/5]";

  const featherClass =
    framed || feather === "none"
      ? ""
      : feather === "tight"
        ? "feather-tight"
        : feather === "wide"
          ? "feather-wide"
          : "feather-oval";

  const frameClass = framed
    ? "overflow-hidden rounded-2xl border border-soft bg-soft"
    : "overflow-hidden bg-transparent";

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={enableTilt ? { perspective: 900 } : undefined}
      className={cn("relative w-full", className)}
    >
      <motion.div
        style={
          enableScroll
            ? { y: scrollY, rotate: scrollRotate, scale: scrollScale }
            : undefined
        }
        className="w-full"
      >
        <motion.div
          style={
            enableTilt
              ? {
                  rotateX: hoverRotateX,
                  rotateY: hoverRotateY,
                  transformStyle: "preserve-3d",
                }
              : undefined
          }
          animate={
            enableTilt
              ? { y: isHovered ? -5 : 0, scale: isHovered ? 1.02 : 1 }
              : undefined
          }
          transition={{ duration: 0.28, ease: [0.23, 1, 0.32, 1] }}
          className={cn(
            "relative w-full",
            isHovered && "will-change-transform",
            aspectClass,
            frameClass,
            featherClass
          )}
        >
          <Image
            src={src}
            alt={alt}
            fill
            priority={priority}
            sizes={sizes}
            className={cn("object-cover", imgClassName)}
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
