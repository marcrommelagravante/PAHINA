"use client";

import { useId } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface PahinaEmblemProps {
  className?: string;
  size?: number;
  showRingText?: boolean;
}

/**
 * Engraved round PAHINA emblem:
 * thin double ring, open-book glyph whose spine rises into a single steam curl,
 * and "COFFEE & READING ROOM" set along the ring.
 */
export function PahinaEmblem({
  className,
  size = 34,
  showRingText = true,
}: PahinaEmblemProps) {
  const uid = useId().replace(/:/g, "");
  const topArcId = `pahina-top-arc-${uid}`;
  const bottomArcId = `pahina-bottom-arc-${uid}`;
  const prefersReducedMotion = useReducedMotion();

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      aria-hidden="true"
      className={cn("shrink-0", className)}
    >
      {showRingText && (
        <defs>
          <path id={topArcId} d="M 14,60 A 46,46 0 1,1 106,60" />
          <path id={bottomArcId} d="M 106,60 A 46,46 0 1,1 14,60" />
        </defs>
      )}

      {/* Outer engraved ring */}
      <circle
        cx="60"
        cy="60"
        r="56.5"
        stroke="currentColor"
        strokeWidth="2.1"
        opacity="0.92"
      />

      {/* Inner engraved ring */}
      <circle
        cx="60"
        cy="60"
        r="37.5"
        stroke="currentColor"
        strokeWidth="1.5"
        opacity="0.72"
      />

      {/* Ring inscription */}
      {showRingText && (
        <>
          <text
            fill="currentColor"
            fontSize="6.7"
            fontWeight="500"
            letterSpacing="2.2"
            opacity="0.88"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            <textPath href={`#${topArcId}`} startOffset="50%" textAnchor="middle">
              COFFEE &amp; READING ROOM
            </textPath>
          </text>
          <text
            fill="currentColor"
            fontSize="7"
            fontWeight="400"
            letterSpacing="3.8"
            opacity="0.84"
            style={{ fontFamily: "var(--font-display)" }}
          >
            <textPath
              href={`#${bottomArcId}`}
              startOffset="50%"
              textAnchor="middle"
            >
              PAHINA
            </textPath>
          </text>
        </>
      )}

      {/* Open book whose central spine rises into a single steam curl */}
      <g
        stroke="currentColor"
        strokeWidth="2.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M 60 75 C 53 71.2 45 70.6 38.5 72.2 L 38.5 54 C 45 52.4 53 53 60 57.2" />
        <path d="M 60 75 C 67 71.2 75 70.6 81.5 72.2 L 81.5 54 C 75 52.4 67 53 60 57.2" />
        <path
          d="M 42.5 76 C 48.2 74.8 54.5 75.2 60 78.5 C 65.5 75.2 71.8 74.8 77.5 76"
          strokeWidth="1.6"
          opacity="0.72"
        />
        <motion.path
          d="M 60 75 L 60 57.2 C 60 51 55.6 49 56.4 44.4 C 57.1 39.8 63.6 38.8 63.1 33.8 C 62.8 31 60.6 29.2 59.2 28"
          initial={
            prefersReducedMotion ? false : { pathLength: 0, opacity: 0.3 }
          }
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{
            duration: 0.9,
            delay: 0.15,
            ease: [0.23, 1, 0.32, 1],
          }}
          className="transition-transform duration-300 ease-[var(--ease-out)] group-hover:-translate-y-[2px]"
        />
      </g>
    </svg>
  );
}
