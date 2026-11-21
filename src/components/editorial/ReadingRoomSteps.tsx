"use client";

import { useState } from "react";
import { LayoutGroup, motion, useReducedMotion } from "framer-motion";
import { READING_ROOM_STEPS } from "@/data/books";
import { cn } from "@/lib/utils";

export function ReadingRoomSteps() {
  const prefersReducedMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <LayoutGroup id="reading-room-steps">
      <ol className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">
        {READING_ROOM_STEPS.map((step, index) => {
          const isActive = index === activeIndex;
          return (
            <li key={step.stepNumber} className="relative">
              <button
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-pressed={isActive}
                className={cn(
                  "group relative flex h-full w-full flex-col border-t pt-6 text-left transition-colors duration-200",
                  isActive
                    ? "border-transparent"
                    : "border-soft hover:border-powder"
                )}
              >
                {isActive && (
                  <motion.span
                    layoutId={
                      prefersReducedMotion ? undefined : "reading-step-bar"
                    }
                    aria-hidden="true"
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 32,
                    }}
                    className="absolute inset-x-0 top-0 h-[2px] bg-ink"
                  />
                )}

                <span
                  className={cn(
                    "font-display text-4xl leading-none tracking-[-0.02em] transition-colors duration-200 sm:text-5xl",
                    isActive
                      ? "text-ink italic"
                      : "text-ink-muted group-hover:text-ink"
                  )}
                >
                  {step.stepNumber}
                </span>

                <h3 className="mt-5 font-display text-xl leading-snug text-ink sm:text-2xl">
                  {step.title}
                </h3>

                <p className="mt-3 text-sm leading-relaxed text-ink-muted sm:text-base">
                  {step.description}
                </p>
              </button>
            </li>
          );
        })}
      </ol>
    </LayoutGroup>
  );
}
