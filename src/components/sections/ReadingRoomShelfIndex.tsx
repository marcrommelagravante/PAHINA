"use client";

import { useState } from "react";
import { BookOpen } from "lucide-react";
import { BOOK_GENRES } from "@/data/books";
import { BookCategory } from "@/components/ui/BookCategory";
import { GenreShelfStage3D } from "@/components/three/ReadingRoomScenes3D";

export function ReadingRoomShelfIndex() {
  const [selectedId, setSelectedId] = useState<string>(BOOK_GENRES[0].id);

  const selectedGenre =
    BOOK_GENRES.find((genre) => genre.id === selectedId) ?? BOOK_GENRES[0];

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-start">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-7">
        {BOOK_GENRES.map((genre) => (
          <BookCategory
            key={genre.id}
            genre={genre}
            isSelected={genre.id === selectedGenre.id}
            onSelect={() => setSelectedId(genre.id)}
          />
        ))}
      </div>

      <aside
        aria-live="polite"
        aria-label="Selected shelf reading note"
        className="rounded-2xl border border-powder bg-powder-soft p-6 sm:p-7 lg:col-span-5 lg:sticky lg:top-24"
      >
        <div className="flex items-center justify-between gap-3 text-ink">
          <div className="flex items-center gap-2.5">
            <BookOpen
              className="h-5 w-5 shrink-0"
              strokeWidth={1.5}
              aria-hidden="true"
            />
            <span className="text-sm font-medium text-ink-muted">
              Selected shelf in 3D
            </span>
          </div>
          <span className="font-display text-2xl text-ink">
            {selectedGenre.name}
          </span>
        </div>

        <div className="mt-4">
          <GenreShelfStage3D
            selectedGenre={selectedGenre}
            onSelectGenre={setSelectedId}
            className="h-[235px] w-full rounded-xl border border-powder bg-paper sm:h-[255px]"
          />
        </div>

        <p className="mt-4 text-base leading-relaxed text-ink">
          {selectedGenre.readingMoodNote}
        </p>

        <p className="mt-4 border-t border-ink/15 pt-4 font-editorial text-xl italic text-ink">
          {selectedGenre.quietPairing}
        </p>

        <p className="mt-4 text-xs leading-relaxed text-ink-muted">
          Curated titles rotate organically on our shelves and are strictly for
          reading inside PAHINA. Ask our staff anytime for a shelf suggestion.
        </p>
      </aside>
    </div>
  );
}
