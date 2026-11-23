"use client";

import { useState } from "react";
import {
  AnimatePresence,
  LayoutGroup,
  motion,
  useReducedMotion,
} from "framer-motion";
import { READING_ROOM_STEPS } from "@/data/books";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

const STEP_PRACTICAL_NOTES: Record<string, string> = {
  "01": "Choose from hot or iced pours across SMOL (12oz), MOYEN (16oz), and GRANDE (22oz), or order a warm plate from the kitchen.",
  "02": "Browse two five-layer oak bookcases spanning Fiction, Romance, Mystery, Philosophy, Poetry, and Nonfiction.",
  "03": "Settle into any two-top oak table or cushioned wall banquette with natural daylight and table-side power outlets.",
  "04": "Simply place your volume back on its genre shelf or the return ledge before heading out—ready for the next reader.",
};

export function ReadingRoomSteps() {
  const prefersReducedMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const activeStep = READING_ROOM_STEPS[activeIndex] ?? READING_ROOM_STEPS[0];

  return (
    <LayoutGroup id="reading-room-steps">
      <RevealGroup
        as="ol"
        stagger={0.065}
        className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8"
      >
        {READING_ROOM_STEPS.map((step, index) => {
          const isActive = index === activeIndex;
          return (
            <RevealItem
              as="li"
              key={step.stepNumber}
              className="relative h-full"
            >
              <button
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-pressed={isActive}
                className={cn(
                  "group relative flex h-full w-full flex-col rounded-b-[2px] border-t px-4 pt-6 pb-5 text-left transition-[border-color,color,transform] duration-200 ease-[var(--ease-out)] active:scale-[0.985]",
                  isActive
                    ? "border-transparent"
                    : "border-soft hover:border-powder"
                )}
              >
                {isActive && (
                  <>
                    <motion.span
                      layoutId={
                        prefersReducedMotion
                          ? undefined
                          : "reading-step-surface"
                      }
                      aria-hidden="true"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 32,
                      }}
                      className="absolute inset-0 rounded-b-[2px] bg-surface-elevated"
                    />
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
                  </>
                )}

                <div className="relative z-10 flex items-baseline justify-between gap-2">
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
                  <span className="text-[10px] font-medium tracking-[0.12em] uppercase text-ink-muted">
                    {isActive ? "Active step" : "Select"}
                  </span>
                </div>

                <h3 className="relative z-10 mt-5 font-display text-xl leading-snug text-ink sm:text-2xl">
                  {step.title}
                </h3>

                <p className="relative z-10 mt-3 text-sm leading-relaxed text-ink-muted sm:text-base">
                  {step.description}
                </p>
              </button>
            </RevealItem>
          );
        })}
      </RevealGroup>

      <div
        aria-live="polite"
        className="mt-6 border-y border-soft bg-surface-elevated/60 px-5 py-4 sm:px-6"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={activeStep.stepNumber}
            initial={prefersReducedMotion ? false : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -6 }}
            transition={{ duration: 0.18, ease: [0.23, 1, 0.32, 1] }}
            className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between"
          >
            <p className="font-editorial text-xl italic text-ink">
              Step {activeStep.stepNumber} — {activeStep.title}
            </p>
            <p className="max-w-xl text-[12.5px] leading-[1.65] text-ink-muted">
              {STEP_PRACTICAL_NOTES[activeStep.stepNumber]}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </LayoutGroup>
  );
}
