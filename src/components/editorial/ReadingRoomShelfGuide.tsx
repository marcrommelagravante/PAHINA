"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  AnimatePresence,
  LayoutGroup,
  motion,
  useReducedMotion,
} from "framer-motion";
import { BOOK_GENRES } from "@/data/books";
import { MaskedHeading } from "@/components/editorial/MaskedHeading";
import { cn } from "@/lib/utils";

function resolveGenreIdFromHash(hash: string): string | null {
  if (!hash.startsWith("#shelf-")) return null;
  const candidate = hash.slice("#shelf-".length);
  return BOOK_GENRES.some((genre) => genre.id === candidate) ? candidate : null;
}

export function ReadingRoomShelfGuide() {
  const prefersReducedMotion = useReducedMotion();
  const [activeGenreId, setActiveGenreId] = useState<string>(BOOK_GENRES[0].id);

  useEffect(() => {
    const syncFromHash = () => {
      const matched = resolveGenreIdFromHash(window.location.hash);
      if (matched) {
        setActiveGenreId(matched);
      }
    };

    syncFromHash();
    window.addEventListener("hashchange", syncFromHash);
    return () => window.removeEventListener("hashchange", syncFromHash);
  }, []);

  const activeGenre =
    BOOK_GENRES.find((genre) => genre.id === activeGenreId) ?? BOOK_GENRES[0];

  return (
    <section
      id="curated-shelves"
      aria-labelledby="curated-shelves-heading"
      className="scroll-mt-24 bg-paper py-20 sm:py-28"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="max-w-xl space-y-4">
          <MaskedHeading
            id="curated-shelves-heading"
            lines={[
              <span key="l1">
                Six curated <em className="font-normal italic">shelves.</em>
              </span>,
            ]}
            className="font-display text-4xl leading-[1.06] tracking-[-0.025em] text-ink sm:text-5xl"
          />
          <p className="max-w-md text-[13px] leading-[1.7] text-ink-muted">
            Our in-café collection is organized into six unhurried reading
            moods. Select a shelf to see what sits there and what pairs
            comfortably beside it.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-start lg:gap-12">
          {/* Left column: interactive hairline 6-genre index */}
          <LayoutGroup id="reading-room-shelf-guide">
            <nav
              aria-label="Curated Reading Room genres"
              className="lg:col-span-5"
            >
              <ul className="divide-y divide-soft border-y border-soft">
                {BOOK_GENRES.map((genre) => {
                  const isActive = genre.id === activeGenre.id;
                  return (
                    <li
                      key={genre.id}
                      id={`shelf-${genre.id}`}
                      className="relative scroll-mt-28"
                    >
                      {isActive && (
                        <motion.span
                          layoutId={
                            prefersReducedMotion
                              ? undefined
                              : "shelf-guide-active-rule"
                          }
                          aria-hidden="true"
                          transition={{
                            type: "spring",
                            stiffness: 420,
                            damping: 34,
                          }}
                          className="absolute inset-y-2.5 left-0 w-[2px] bg-ink"
                        />
                      )}
                      <button
                        type="button"
                        onClick={() => setActiveGenreId(genre.id)}
                        aria-pressed={isActive}
                        className={cn(
                          "flex w-full items-baseline justify-between gap-4 py-4 pl-4 text-left transition-colors duration-150",
                          isActive
                            ? "text-ink"
                            : "text-ink-muted hover:text-ink"
                        )}
                      >
                        <span
                          className={cn(
                            "font-display text-2xl transition-transform duration-200 ease-[var(--ease-out)] sm:text-[1.7rem]",
                            isActive && "translate-x-0.5 italic text-ink"
                          )}
                        >
                          {genre.name}
                        </span>
                        <span className="text-[10px] font-medium tracking-[0.12em] uppercase text-ink-muted">
                          {isActive ? "Selected" : "Inspect"}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </LayoutGroup>

          {/* Right column: calm Elevated Paper reading sheet */}
          <div
            aria-live="polite"
            className="rounded-[2px] border border-soft bg-surface-elevated p-7 sm:p-10 lg:col-span-7"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeGenre.id}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={
                  prefersReducedMotion
                    ? { opacity: 0 }
                    : { opacity: 0, y: -6 }
                }
                transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
                className="space-y-6"
              >
                <div className="space-y-3">
                  <h3 className="font-display text-3xl leading-[1.06] tracking-[-0.02em] text-ink sm:text-4xl">
                    {activeGenre.name}
                  </h3>
                  <p className="font-editorial text-2xl leading-snug italic text-ink">
                    {activeGenre.shelfSummary}
                  </p>
                </div>

                <p className="max-w-lg text-[13.5px] leading-[1.72] text-ink-muted">
                  {activeGenre.readingMoodNote}
                </p>

                <div className="flex flex-col gap-4 border-t border-soft pt-5 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <p className="text-[10px] font-medium tracking-[0.14em] uppercase text-ink-muted">
                      Pairs with
                    </p>
                    <p className="mt-1 font-display text-lg text-ink">
                      {activeGenre.quietPairing}
                    </p>
                  </div>

                  <Link
                    href="/menu"
                    className="shrink-0 text-xs font-medium tracking-[0.04em] text-ink underline decoration-ink/35 underline-offset-4 transition-colors duration-150 hover:decoration-ink"
                  >
                    Explore café pairings
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
