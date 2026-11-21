"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { MenuItemData } from "@/data/menu";
import { resolveShowcaseMenuImage } from "@/data/editorialImages";
import { FloatingPhoto } from "@/components/editorial/FloatingPhoto";
import { TastingSheetModal } from "@/components/editorial/TastingSheetModal";
import { cn } from "@/lib/utils";

interface DrinkShowcaseProps {
  items: MenuItemData[];
  className?: string;
  onInspectItem?: (item: MenuItemData) => void;
}

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

  const { src, mode } = resolveShowcaseMenuImage(item.id, item.image);
  const isMiddleStagger = !isTwoUp && index === 1;
  const drift = index === 1 ? -26 : 26;
  const scrollTilt = index === 1 ? -1.8 : 1.8;

  const activeSize =
    item.sizes && item.sizes[selectedSizeIndex]
      ? item.sizes[selectedSizeIndex]
      : null;

  return (
    <article
      className={cn("flex flex-col", isMiddleStagger && "md:translate-y-12")}
    >
      <button
        type="button"
        onClick={() => onInspect(item)}
        aria-label={`Open tasting sheet for ${item.name}`}
        className="group block w-full text-left focus-visible:rounded-2xl"
      >
        {mode === "compact-specimen" ? (
          <div className="mx-auto flex aspect-[4/5] w-full max-w-[300px] flex-col items-center justify-center rounded-2xl border border-soft bg-surface-elevated p-8 transition-[border-color,transform] duration-200 ease-[var(--ease-out)] group-hover:-translate-y-1 group-hover:border-powder md:max-w-none">
            <div className="relative aspect-[4/5] w-28 overflow-hidden rounded-lg border border-soft bg-paper">
              <Image
                src={src}
                alt={item.alt}
                fill
                sizes="112px"
                className="object-cover"
              />
            </div>
            <p className="mt-5 font-editorial text-base italic text-ink-muted">
              From our kitchen
            </p>
          </div>
        ) : (
          <FloatingPhoto
            src={src}
            alt={item.alt}
            aspect="portrait"
            drift={drift}
            scrollTilt={scrollTilt}
            tiltOnHover
            framed={mode === "high-res"}
            sizes={
              isTwoUp
                ? "(max-width: 768px) 88vw, 42vw"
                : "(max-width: 768px) 88vw, 29vw"
            }
            className="mx-auto w-full max-w-[300px] md:max-w-none"
          />
        )}
      </button>

      <div className="mt-6 space-y-3">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <button
            type="button"
            onClick={() => onInspect(item)}
            className="text-left font-display text-2xl leading-snug text-ink underline-offset-4 hover:underline sm:text-[1.65rem]"
          >
            {item.name}
          </button>
          {item.badge && (
            <span
              className={cn(
                "inline-flex shrink-0 items-center rounded-full px-2.5 py-0.5 text-xs font-medium text-ink",
                item.badge === "Must Try" ? "bg-powder" : "bg-powder-soft"
              )}
            >
              {item.badge}
            </span>
          )}
        </div>

        {item.sizes && activeSize && (
          <div className="space-y-3 border-t border-soft pt-3">
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
                        "relative inline-flex min-h-[34px] items-center rounded-full border px-3 py-1.5 text-[11px] font-medium tracking-[0.03em] transition-colors duration-150",
                        isActive
                          ? "border-ink text-paper"
                          : "border-soft bg-surface-elevated text-ink-muted hover:border-powder hover:text-ink"
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
                          className="absolute inset-0 rounded-full bg-ink"
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

            <dl className="divide-y divide-soft/70 text-xs">
              {item.sizes.map((entry, idx) => {
                const isActive = idx === selectedSizeIndex;
                return (
                  <div
                    key={entry.size}
                    onClick={() => setSelectedSizeIndex(idx)}
                    className={cn(
                      "flex cursor-pointer items-baseline justify-between gap-3 py-1.5 transition-colors duration-150",
                      isActive ? "text-ink" : "text-ink-muted hover:text-ink"
                    )}
                  >
                    <dt>
                      <span className={cn(isActive && "font-semibold")}>
                        {entry.size}
                      </span>
                      {entry.note && (
                        <span className="ml-1.5 text-ink-muted">
                          ({entry.note})
                        </span>
                      )}
                    </dt>
                    <dd
                      className={cn(
                        "tabular-nums",
                        isActive ? "font-semibold text-ink" : "font-medium"
                      )}
                    >
                      ₱{entry.price}
                    </dd>
                  </div>
                );
              })}
            </dl>
          </div>
        )}

        {item.singlePrice !== undefined && (
          <dl className="border-t border-soft pt-2 text-sm">
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

        <div className="pt-1">
          <button
            type="button"
            onClick={() => onInspect(item)}
            className="text-xs font-medium tracking-[0.03em] text-ink-muted underline decoration-powder decoration-2 underline-offset-4 transition-colors duration-150 hover:text-ink hover:decoration-ink"
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
          "grid grid-cols-1 gap-12 sm:gap-14",
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
