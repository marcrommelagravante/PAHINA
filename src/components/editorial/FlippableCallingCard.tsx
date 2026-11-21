"use client";

import { useState } from "react";
import { RotateCw } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { PahinaEmblem } from "@/components/ui/PahinaEmblem";
import { MarginNote } from "@/components/editorial/MarginNote";
import { SITE_INFO } from "@/data/site";

export function FlippableCallingCard() {
  const prefersReducedMotion = useReducedMotion();
  const [isFlipped, setIsFlipped] = useState(false);

  const toggleFlip = () => setIsFlipped((prev) => !prev);

  return (
    <div className="flex h-full flex-col justify-between space-y-6">
      <div className="flex items-center justify-between gap-3">
        <span className="font-editorial text-lg italic text-ink-muted">
          {isFlipped ? "Card Back" : "Card Front"}
        </span>
        <button
          type="button"
          onClick={toggleFlip}
          aria-pressed={isFlipped}
          className="inline-flex min-h-[36px] items-center gap-2 rounded-full border border-soft bg-surface-elevated px-3.5 py-1.5 text-xs font-medium tracking-[0.03em] text-ink transition-[background-color,border-color,transform] duration-150 active:scale-[0.97] hover:border-ink"
        >
          <RotateCw className="h-3.5 w-3.5" strokeWidth={1.6} aria-hidden="true" />
          <span>{isFlipped ? "Show front" : "Flip card"}</span>
        </button>
      </div>

      {prefersReducedMotion ? (
        <div
          onClick={toggleFlip}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              toggleFlip();
            }
          }}
          aria-label={
            isFlipped
              ? "Calling card back. Press to view front."
              : "Calling card front. Press to view back."
          }
          className="cursor-pointer rounded-2xl border border-soft bg-surface-elevated p-6 sm:p-8"
        >
          <AnimatePresence mode="wait">
            {!isFlipped ? (
              <div key="front" className="space-y-6">
                <div className="inline-flex items-center gap-3 text-ink">
                  <PahinaEmblem size={42} showRingText />
                  <span className="font-display text-2xl tracking-[0.22em] uppercase">
                    {SITE_INFO.name}
                  </span>
                </div>
                <h1
                  id="visit-hero-heading"
                  className="font-display text-4xl leading-[1.05] tracking-[-0.025em] text-ink sm:text-5xl"
                >
                  Pull up <em className="font-normal italic">a chair.</em>
                </h1>
                <p className="text-base leading-relaxed text-ink-muted">
                  Plan a quiet afternoon with coffee and a book. The structured
                  placeholders opposite are ready once opening details are
                  confirmed.
                </p>
              </div>
            ) : (
              <div key="back" className="space-y-6">
                <p className="font-editorial text-3xl italic text-ink">
                  “{SITE_INFO.tagline}”
                </p>
                <div className="grid grid-cols-2 gap-5">
                  <MarginNote label="Menu" value="39 items" />
                  <MarginNote label="Shelves" value="6 genres" />
                </div>
                <MarginNote
                  label="Books"
                  value="Read in, return before leaving"
                />
              </div>
            )}
          </AnimatePresence>
        </div>
      ) : (
        <div style={{ perspective: 1100 }} className="w-full">
          <motion.div
            onClick={toggleFlip}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                toggleFlip();
              }
            }}
            aria-label={
              isFlipped
                ? "Calling card back. Press to flip to front."
                : "Calling card front. Press to flip to back."
            }
            animate={{ rotateY: isFlipped ? 180 : 0 }}
            transition={{ type: "spring", stiffness: 220, damping: 24 }}
            style={{ transformStyle: "preserve-3d" }}
            className="grid w-full cursor-pointer will-change-transform"
          >
            {/* Front Face */}
            <div
              style={{ backfaceVisibility: "hidden" }}
              className="[grid-area:1/1] flex min-h-[370px] flex-col justify-between gap-6 rounded-2xl border border-soft bg-surface-elevated p-6 sm:p-7"
            >
              <div className="space-y-4">
                <div className="inline-flex items-center gap-3 text-ink">
                  <PahinaEmblem size={40} showRingText />
                  <span className="font-display text-2xl tracking-[0.22em] uppercase">
                    {SITE_INFO.name}
                  </span>
                </div>

                <h1
                  id="visit-hero-heading"
                  className="font-display text-4xl leading-[1.06] tracking-[-0.025em] text-ink sm:text-[2.75rem]"
                >
                  Pull up <em className="font-normal italic">a chair.</em>
                </h1>

                <p className="text-sm leading-relaxed text-ink-muted sm:text-[15px]">
                  Plan a quiet afternoon with coffee and a book. The structured
                  placeholders opposite are ready once our opening details are
                  confirmed.
                </p>
              </div>

              <p className="border-t border-soft pt-4 text-xs font-medium tracking-[0.04em] text-ink-muted">
                Tap card to read reverse side
              </p>
            </div>

            {/* Back Face */}
            <div
              style={{
                backfaceVisibility: "hidden",
                transform: "rotateY(180deg)",
              }}
              className="[grid-area:1/1] flex min-h-[370px] flex-col justify-between gap-6 rounded-2xl border border-powder bg-powder-soft/75 p-6 sm:p-7"
            >
              <div className="space-y-5">
                <p className="font-editorial text-2xl leading-snug italic text-ink sm:text-3xl">
                  “{SITE_INFO.tagline}”
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <MarginNote label="Menu" value="39 items" />
                  <MarginNote label="Shelves" value="6 genres" />
                </div>
                <MarginNote
                  label="Books"
                  value="Read in, return before leaving"
                />
              </div>

              <p className="border-t border-ink/15 pt-4 text-xs leading-relaxed text-ink-muted">
                Concept stationery stamp — operational details pending final
                confirmation.
              </p>
            </div>
          </motion.div>
        </div>
      )}

      <div className="grid max-w-xs grid-cols-1 gap-4 pt-1">
        <MarginNote label="Status" value="Concept, details to be confirmed" />
      </div>
    </div>
  );
}
