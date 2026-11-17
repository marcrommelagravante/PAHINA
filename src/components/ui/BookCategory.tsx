import type { BookGenre } from "@/data/books";
import { cn } from "@/lib/utils";

interface BookCategoryProps {
  genre: BookGenre;
  isSelected: boolean;
  onSelect: () => void;
}

export function BookCategory({
  genre,
  isSelected,
  onSelect,
}: BookCategoryProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={isSelected}
      className={cn(
        "group w-full rounded-xl border p-5 text-left transition-[background-color,border-color,transform] duration-150 ease-[var(--ease-out)] active:scale-[0.985]",
        isSelected
          ? "border-ink bg-powder-soft"
          : "border-soft bg-surface-elevated hover:border-powder hover:bg-paper"
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <h3 className="font-display text-2xl text-ink">{genre.name}</h3>
        <span
          aria-hidden="true"
          className={cn(
            "h-2.5 w-2.5 rounded-full transition-colors duration-150",
            isSelected ? "bg-ink" : "bg-powder"
          )}
        />
      </div>
      <p className="mt-2.5 text-sm leading-relaxed text-ink-muted">
        {genre.shelfSummary}
      </p>
    </button>
  );
}
