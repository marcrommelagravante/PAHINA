"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { BOOK_GENRES } from "@/data/books";
import { MaskedHeading } from "@/components/editorial/MaskedHeading";
import { cn } from "@/lib/utils";

export function ReadingRoomBookHero() {
  const prefersReducedMotion = useReducedMotion();
  const [activeGenreId, setActiveGenreId] = useState<string>(BOOK_GENRES[0].id);

  const activeGenre =
    BOOK_GENRES.find((genre) => genre.id === activeGenreId) ?? BOOK_GENRES[0];

  return (
    <section
      aria-labelledby="reading-room-hero-heading"
      className="overflow-x-clip bg-paper pt-28 pb-20 sm:pt-36 sm:pb-24"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-0 lg:divide-x lg:divide-soft">
          {/* Left page: monumental title + live Reading Bookmark Preview */}
          <div className="flex flex-col justify-between space-y-10 lg:col-span-6 lg:pr-14">
            <div className="space-y-5">
              <p className="font-editorial text-lg italic text-ink-muted">
                Left Page
              </p>
              <MaskedHeading
                as="h1"
                id="reading-room-hero-heading"
                immediate
                delay={0.2}
                lines={[
                  "A quiet room",
                  "of curated",
                  <em key="l3" className="font-normal italic">
                    pages.
                  </em>,
                ]}
                className="font-display text-[clamp(3.2rem,6vw,5.25rem)] leading-[0.98] tracking-[-0.03em] text-ink"
              />
              <p className="max-w-[290px] text-[13px] leading-[1.7] text-ink-muted">
                Our shelves are gathered for comfortable in-café reading—never
                rushed, never crowded, and open to anyone sharing a cup inside
                PAHINA.
              </p>
            </div>

            {/* Delicate hairline Bookmark Preview synced to Right Page TOC */}
            <div
              aria-live="polite"
              className="border-y border-powder py-6"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="text-[10px] font-medium tracking-[0.14em] uppercase text-ink-muted">
                  Bookmark preview
                </span>
                <a
                  href={`#shelf-${activeGenre.id}`}
                  className="text-[11px] font-medium tracking-[0.04em] text-ink underline decoration-ink/35 underline-offset-4 hover:decoration-ink"
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
                    prefersReducedMotion
                      ? { opacity: 0 }
                      : { opacity: 0, y: -6 }
                  }
                  transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
                  className="mt-3 space-y-2.5"
                >
                  <h2 className="font-display text-2xl text-ink">
                    {activeGenre.name}
                  </h2>
                  <p className="max-w-md text-[12.5px] leading-[1.65] text-ink-muted">
                    {activeGenre.readingMoodNote}
                  </p>
                  <p className="pt-1 font-editorial text-lg italic text-ink">
                    {activeGenre.quietPairing}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="flex gap-10 text-[10px] leading-[1.5] tracking-[0.14em] uppercase text-ink-muted">
              <div>
                <p>Shelves</p>
                <p className="font-medium text-ink">6 Genres</p>
              </div>
              <div>
                <p>Books</p>
                <p className="font-medium text-ink">
                  Read in, return before leaving
                </p>
              </div>
            </div>
          </div>

          {/* Right page: interactive 6-genre Table of Contents */}
          <div className="border-t border-soft pt-10 lg:col-span-6 lg:border-t-0 lg:pt-0 lg:pl-14">
            <div className="flex items-baseline justify-between gap-4">
              <p className="font-editorial text-lg italic text-ink-muted">
                Table of Contents
              </p>
              <span className="text-[10px] tracking-[0.12em] uppercase text-ink-muted">
                Select a shelf
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
                          className="absolute inset-y-2.5 -left-3 w-[1.5px] bg-ink"
                        />
                      )}
                      <div
                        onMouseEnter={() => setActiveGenreId(genre.id)}
                        className={cn(
                          "py-4 transition-opacity duration-150",
                          isActive ? "opacity-100" : "opacity-75 hover:opacity-100"
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
                        <p className="mt-1 max-w-md text-[12px] leading-[1.6] text-ink-muted">
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
      </div>
    </section>
  );
}
