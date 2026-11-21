"use client";

import { useState } from "react";
import { RotateCw } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { PahinaEmblem } from "@/components/ui/PahinaEmblem";
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
          className="inline-flex min-h-[34px] items-center gap-2 rounded-[2px] border border-ink/30 bg-transparent px-3.5 py-1 text-[11px] font-medium tracking-[0.06em] text-ink transition-[background-color,border-color,color] duration-150 hover:border-ink hover:bg-ink hover:text-paper"
        >
          <RotateCw
            className="h-3 w-3"
            strokeWidth={1.6}
            aria-hidden="true"
          />
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
          className="cursor-pointer rounded-[2px] border border-ink/20 bg-surface-elevated p-7 sm:p-8"
        >
          <AnimatePresence mode="wait">
            {!isFlipped ? (
              <div key="front" className="space-y-6">
                <div className="inline-flex items-center gap-3 text-ink">
                  <PahinaEmblem size={36} showRingText={false} />
                  <span className="font-display text-xl tracking-[0.24em] uppercase">
                    {SITE_INFO.name}
                  </span>
                </div>
                <h1
                  id="visit-hero-heading"
                  className="font-display text-4xl leading-[1.04] tracking-[-0.025em] text-ink sm:text-5xl"
                >
                  Pull up <em className="font-normal italic">a chair.</em>
                </h1>
                <p className="text-[13px] leading-[1.7] text-ink-muted">
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
                <div className="grid grid-cols-2 gap-5 text-[10px] leading-[1.5] tracking-[0.14em] uppercase text-ink-muted">
                  <div>
                    <p>Menu</p>
                    <p className="font-medium text-ink">39 Items</p>
                  </div>
                  <div>
                    <p>Shelves</p>
                    <p className="font-medium text-ink">6 Genres</p>
                  </div>
                </div>
                <div className="text-[10px] leading-[1.5] tracking-[0.14em] uppercase text-ink-muted">
                  <p>Books</p>
                  <p className="font-medium text-ink">
                    Read in, return before leaving
                  </p>
                </div>
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
              className="[grid-area:1/1] flex min-h-[370px] flex-col justify-between gap-6 rounded-[2px] border border-ink/20 bg-surface-elevated p-7 sm:p-8"
            >
              <div className="space-y-5">
                <div className="inline-flex items-center gap-3 text-ink">
                  <PahinaEmblem size={36} showRingText={false} />
                  <span className="font-display text-xl tracking-[0.24em] uppercase">
                    {SITE_INFO.name}
                  </span>
                </div>

                <h1
                  id="visit-hero-heading"
                  className="font-display text-4xl leading-[1.04] tracking-[-0.025em] text-ink sm:text-[3rem]"
                >
                  Pull up <em className="font-normal italic">a chair.</em>
                </h1>

                <p className="max-w-[260px] text-[13px] leading-[1.7] text-ink-muted">
                  Plan a quiet afternoon with coffee and a book. The structured
                  placeholders opposite are ready once our opening details are
                  confirmed.
                </p>
              </div>

              <p className="border-t border-soft pt-4 text-[10px] font-medium tracking-[0.14em] uppercase text-ink-muted">
                Tap card to read reverse side
              </p>
            </div>

            {/* Back Face */}
            <div
              style={{
                backfaceVisibility: "hidden",
                transform: "rotateY(180deg)",
              }}
              className="[grid-area:1/1] flex min-h-[370px] flex-col justify-between gap-6 rounded-[2px] border border-powder bg-powder-soft/75 p-7 sm:p-8"
            >
              <div className="space-y-6">
                <p className="font-editorial text-2xl leading-snug italic text-ink sm:text-3xl">
                  “{SITE_INFO.tagline}”
                </p>
                <div className="grid grid-cols-2 gap-4 text-[10px] leading-[1.5] tracking-[0.14em] uppercase text-ink-muted">
                  <div>
                    <p>Menu</p>
                    <p className="font-medium text-ink">39 Items</p>
                  </div>
                  <div>
                    <p>Shelves</p>
                    <p className="font-medium text-ink">6 Genres</p>
                  </div>
                </div>
                <div className="text-[10px] leading-[1.5] tracking-[0.14em] uppercase text-ink-muted">
                  <p>Books</p>
                  <p className="font-medium text-ink">
                    Read in, return before leaving
                  </p>
                </div>
              </div>

              <p className="border-t border-ink/15 pt-4 text-[11px] leading-relaxed text-ink-muted">
                Concept stationery stamp — operational details pending final
                confirmation.
              </p>
            </div>
          </motion.div>
        </div>
      )}

      <div className="text-[10px] leading-[1.5] tracking-[0.14em] uppercase text-ink-muted">
        <p>Status</p>
        <p className="font-medium text-ink">Concept, details to be confirmed</p>
      </div>
    </div>
  );
}
