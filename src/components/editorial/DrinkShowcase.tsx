"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { MenuCategoryId, MenuItemData } from "@/data/menu";
import { resolveMenuShowcaseImage } from "@/data/editorialImages";
import { TastingSheetModal } from "@/components/editorial/TastingSheetModal";
import { cn } from "@/lib/utils";

interface DrinkShowcaseProps {
  items: MenuItemData[];
  className?: string;
  onInspectItem?: (item: MenuItemData) => void;
}

const DRINK_CATEGORIES = new Set<MenuCategoryId>([
  "coffee",
  "non-coffee",
  "frappuccino",
]);

function ShowcaseCard({
  item,
  index,
  isTwoUp,
  onInspect,
}: {
  item: MenuItemData;
  index: number;
  isTwoUp: boolean;
  onInspect: (item: MenuItemData) => void;
}) {
  const prefersReducedMotion = useReducedMotion();
  const [selectedSizeIndex, setSelectedSizeIndex] = useState(0);

  const { src, mode } = resolveMenuShowcaseImage(item.id, item.image);
  const isMiddleStagger = !isTwoUp && index === 1;
  const isDrink = DRINK_CATEGORIES.has(item.category);

  const activeSize =
    item.sizes && item.sizes[selectedSizeIndex]
      ? item.sizes[selectedSizeIndex]
      : null;

  return (
    <article
      className={cn("flex flex-col", isMiddleStagger && "md:translate-y-10")}
    >
      <button
        type="button"
        onClick={() => onInspect(item)}
        aria-label={`Open tasting sheet for ${item.name}`}
        className="group block w-full text-left focus-visible:rounded-[2px]"
      >
        {mode === "compact-specimen" ? (
          <div className="mx-auto flex aspect-[4/5] w-full max-w-[320px] flex-col items-center justify-center rounded-[2px] border border-soft bg-surface-elevated p-8 transition-colors duration-200 ease-[var(--ease-out)] group-hover:border-ink/40 md:max-w-none">
            <div className="relative aspect-[4/5] w-32 overflow-hidden rounded-[2px] border border-soft bg-paper">
              <Image
                src={src}
                alt={item.alt}
                fill
                sizes="128px"
                className="object-cover hover-image-zoom"
              />
            </div>
            <p className="mt-5 font-editorial text-base italic text-ink-muted">
              {isDrink ? "From our bar" : "From our kitchen"}
            </p>
          </div>
        ) : (
          <div className="relative mx-auto aspect-[4/5] w-full max-w-[320px] overflow-hidden rounded-[2px] border border-soft bg-surface-elevated transition-colors duration-200 ease-[var(--ease-out)] group-hover:border-ink/35 md:max-w-none">
            <Image
              src={src}
              alt={item.alt}
              fill
              sizes={
                isTwoUp
                  ? "(max-width: 768px) 84vw, 40vw"
                  : "(max-width: 768px) 84vw, 28vw"
              }
              className="object-cover hover-image-zoom"
            />
          </div>
        )}
      </button>

      <div className="mt-5 space-y-3">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <button
            type="button"
            onClick={() => onInspect(item)}
            className="text-left font-display text-2xl leading-snug text-ink underline-offset-4 hover:underline sm:text-[1.65rem]"
          >
            {item.name}
          </button>
          {item.badge && (
            <span className="text-[10px] font-medium tracking-[0.12em] uppercase text-ink-muted">
              {item.badge}
            </span>
          )}
        </div>

        {item.sizes && activeSize && (
          <div className="space-y-2.5 border-t border-soft pt-3">
            <div className="flex items-center justify-between gap-2">
              <div
                role="group"
                aria-label={`Choose size for ${item.name}`}
                className="flex flex-wrap gap-1.5"
              >
                {item.sizes.map((entry, idx) => {
                  const isActive = idx === selectedSizeIndex;
                  return (
                    <button
                      key={entry.size}
                      type="button"
                      onClick={() => setSelectedSizeIndex(idx)}
                      aria-pressed={isActive}
                      className={cn(
                        "relative inline-flex min-h-[32px] items-center rounded-[2px] border px-2.5 py-1 text-[10.5px] font-medium tracking-[0.06em] transition-colors duration-150",
                        isActive
                          ? "border-ink text-paper"
                          : "border-ink/20 bg-transparent text-ink-muted hover:border-ink hover:text-ink"
                      )}
                    >
                      {isActive && (
                        <motion.span
                          layoutId={
                            prefersReducedMotion
                              ? undefined
                              : `showcase-size-${item.id}`
                          }
                          transition={{
                            type: "spring",
                            stiffness: 440,
                            damping: 32,
                          }}
                          className="absolute inset-0 rounded-[1px] bg-ink"
                          aria-hidden="true"
                        />
                      )}
                      <span className="relative z-10">{entry.size}</span>
                    </button>
                  );
                })}
              </div>

              <AnimatePresence mode="wait">
                <motion.span
                  key={`${item.id}-${activeSize.size}`}
                  initial={prefersReducedMotion ? false : { opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={
                    prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -4 }
                  }
                  transition={{ duration: 0.16 }}
                  className="font-display text-xl tabular-nums text-ink"
                >
                  ₱{activeSize.price}
                </motion.span>
              </AnimatePresence>
            </div>

            <ul className="divide-y divide-soft/70 text-[11.5px]">
              {item.sizes.map((entry, idx) => {
                const isActive = idx === selectedSizeIndex;
                return (
                  <li key={entry.size}>
                    <button
                      type="button"
                      onClick={() => setSelectedSizeIndex(idx)}
                      aria-pressed={isActive}
                      className={cn(
                        "flex w-full items-baseline justify-between gap-3 py-1.5 text-left transition-colors duration-150",
                        isActive ? "text-ink" : "text-ink-muted hover:text-ink"
                      )}
                    >
                      <span>
                        <span className={cn(isActive && "font-semibold")}>
                          {entry.size}
                        </span>
                        {entry.note && (
                          <span className="ml-1.5 text-ink-muted">
                            ({entry.note})
                          </span>
                        )}
                      </span>
                      <span
                        className={cn(
                          "tabular-nums",
                          isActive ? "font-semibold text-ink" : "font-medium"
                        )}
                      >
                        ₱{entry.price}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        )}

        {item.singlePrice !== undefined && (
          <dl className="border-t border-soft pt-2 text-xs">
            <div className="flex items-baseline justify-between gap-3">
              <dt className="text-ink-muted">Single serving</dt>
              <dd className="font-medium tabular-nums text-ink">
                ₱{item.singlePrice}
              </dd>
            </div>
          </dl>
        )}

        {item.priceUnconfirmed && (
          <p className="border-t border-soft pt-2 font-editorial text-lg italic text-ink-muted">
            Price to be confirmed
          </p>
        )}

        <div className="pt-0.5">
          <button
            type="button"
            onClick={() => onInspect(item)}
            className="text-[11px] font-medium tracking-[0.06em] text-ink-muted underline decoration-ink/30 underline-offset-4 transition-colors duration-150 hover:text-ink hover:decoration-ink"
          >
            Open tasting sheet
          </button>
        </div>
      </div>
    </article>
  );
}

export function DrinkShowcase({
  items,
  className,
  onInspectItem,
}: DrinkShowcaseProps) {
  const [localItem, setLocalItem] = useState<MenuItemData | null>(null);
  const isTwoUp = items.length === 2;

  const handleInspect = (item: MenuItemData) => {
    if (onInspectItem) {
      onInspectItem(item);
    } else {
      setLocalItem(item);
    }
  };

  return (
    <>
      <div
        className={cn(
          "grid grid-cols-1 gap-14 sm:gap-16",
          isTwoUp
            ? "md:mx-auto md:max-w-4xl md:grid-cols-2 md:gap-12"
            : "md:grid-cols-3 md:gap-8 lg:gap-12",
          className
        )}
      >
        {items.map((item, index) => (
          <ShowcaseCard
            key={item.id}
            item={item}
            index={index}
            isTwoUp={isTwoUp}
            onInspect={handleInspect}
          />
        ))}
      </div>

      {!onInspectItem && (
        <TastingSheetModal item={localItem} onClose={() => setLocalItem(null)} />
      )}
    </>
  );
}
