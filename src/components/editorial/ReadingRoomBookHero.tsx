"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { BOOK_GENRES } from "@/data/books";
import { MarbleSheet } from "@/components/editorial/MarbleSheet";
import { MarginNote } from "@/components/editorial/MarginNote";
import { MaskedHeading } from "@/components/editorial/MaskedHeading";
import { cn } from "@/lib/utils";

export function ReadingRoomBookHero() {
  const prefersReducedMotion = useReducedMotion();
  const [activeGenreId, setActiveGenreId] = useState<string>(BOOK_GENRES[0].id);

  const activeGenre =
    BOOK_GENRES.find((genre) => genre.id === activeGenreId) ?? BOOK_GENRES[0];

  return (
    <MarbleSheet
      ariaLabelledBy="reading-room-hero-heading"
      className="pt-24 pb-10 sm:pt-28 sm:pb-14"
      sheetClassName="px-6 py-10 sm:px-12 sm:py-14 lg:px-0 lg:py-0"
    >
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-0 lg:divide-x lg:divide-soft">
        {/* Left page: title + live Reading Bookmark Preview */}
        <div className="flex flex-col justify-between space-y-8 lg:col-span-6 lg:px-14 lg:py-16">
          <div className="space-y-5">
            <p className="font-editorial text-lg italic text-ink-muted">
              Left Page
            </p>
            <MaskedHeading
              as="h1"
              id="reading-room-hero-heading"
              immediate
              lines={[
                "A quiet room",
                <em key="l2" className="font-normal italic">
                  of curated pages.
                </em>,
              ]}
              className="font-display text-4xl leading-[1.05] tracking-[-0.025em] text-ink sm:text-5xl lg:text-6xl"
            />
            <p className="max-w-lg text-base leading-relaxed text-ink-muted sm:text-lg">
              Our shelves are gathered for comfortable in-café reading—never
              rushed, never crowded, and open to anyone sharing a cup inside
              PAHINA.
            </p>
          </div>

          {/* Interactive Reading Bookmark Preview synced to Right Page TOC */}
          <div
            aria-live="polite"
            className="rounded-xl border border-powder bg-powder-soft/55 p-5 sm:p-6"
          >
            <div className="flex items-center justify-between gap-3">
              <span className="text-xs font-medium tracking-[0.04em] text-ink-muted">
                Bookmark preview
              </span>
              <a
                href={`#shelf-${activeGenre.id}`}
                className="text-xs font-medium text-ink underline decoration-ink/40 underline-offset-4 hover:decoration-ink"
              >
                Jump to {activeGenre.name}
              </a>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeGenre.id}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={
                  prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -6 }
                }
                transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
                className="mt-3 space-y-2.5"
              >
                <h2 className="font-display text-2xl text-ink">
                  {activeGenre.name}
                </h2>
                <p className="text-sm leading-relaxed text-ink-muted">
                  {activeGenre.readingMoodNote}
                </p>
                <p className="border-t border-ink/15 pt-2.5 font-editorial text-lg italic text-ink">
                  {activeGenre.quietPairing}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="grid max-w-md grid-cols-2 gap-6 pt-1">
            <MarginNote label="Shelves" value="6 genres" />
            <MarginNote
              label="Books"
              value="Read in, return before leaving"
            />
          </div>
        </div>

        {/* Right page: interactive 6-genre Table of Contents */}
        <div className="border-t border-soft pt-8 lg:col-span-6 lg:border-t-0 lg:px-14 lg:py-16">
          <div className="flex items-baseline justify-between gap-4">
            <p className="font-editorial text-lg italic text-ink-muted">
              Table of Contents
            </p>
            <span className="text-xs text-ink-muted">
              Select a shelf to preview
            </span>
          </div>

          <nav aria-label="Reading Room shelves" className="mt-5">
            <ul className="divide-y divide-soft border-y border-soft">
              {BOOK_GENRES.map((genre) => {
                const isActive = genre.id === activeGenre.id;
                return (
                  <li key={genre.id} className="relative">
                    {isActive && (
                      <motion.span
                        layoutId={
                          prefersReducedMotion ? undefined : "toc-active-rule"
                        }
                        aria-hidden="true"
                        transition={{
                          type: "spring",
                          stiffness: 420,
                          damping: 34,
                        }}
                        className="absolute inset-y-2 -left-3 w-[2px] bg-ink"
                      />
                    )}
                    <div
                      onMouseEnter={() => setActiveGenreId(genre.id)}
                      className={cn(
                        "py-3.5 transition-colors duration-150",
                        isActive ? "opacity-100" : "opacity-80 hover:opacity-100"
                      )}
                    >
                      <div className="flex items-baseline justify-between gap-4">
                        <button
                          type="button"
                          onClick={() => setActiveGenreId(genre.id)}
                          aria-pressed={isActive}
                          className={cn(
                            "text-left font-display text-2xl transition-transform duration-200 ease-[var(--ease-out)] sm:text-[1.75rem]",
                            isActive
                              ? "translate-x-1 italic text-ink"
                              : "text-ink hover:translate-x-1"
                          )}
                        >
                          {genre.name}
                        </button>
                        <a
                          href={`#shelf-${genre.id}`}
                          className="font-editorial text-base italic text-ink-muted underline-offset-4 hover:text-ink hover:underline"
                        >
                          Read spread
                        </a>
                      </div>
                      <p className="mt-1 text-sm leading-relaxed text-ink-muted">
                        {genre.shelfSummary}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </div>
    </MarbleSheet>
  );
}
