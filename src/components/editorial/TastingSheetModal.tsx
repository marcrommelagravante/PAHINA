"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

const emptySubscribe = () => () => {};
import {
  AnimatePresence,
  LayoutGroup,
  motion,
  useReducedMotion,
} from "framer-motion";
import {
  MENU_CATEGORIES,
  type MenuCategoryId,
  type MenuItemData,
} from "@/data/menu";
import { BOOK_GENRES } from "@/data/books";
import { resolveMenuShowcaseImage } from "@/data/editorialImages";
import { useDialogA11y } from "@/lib/useDialogA11y";
import { cn } from "@/lib/utils";

const DRINK_CATEGORIES = new Set<MenuCategoryId>([
  "coffee",
  "non-coffee",
  "frappuccino",
]);

interface TastingSheetModalProps {
  item: MenuItemData | null;
  onClose: () => void;
}

const CATEGORY_GENRE_MAP: Record<MenuCategoryId, string> = {
  coffee: "fiction",
  "non-coffee": "romance",
  frappuccino: "poetry",
  pasta: "nonfiction",
  pizza: "fiction",
  fries: "mystery",
};

export function TastingSheetModal({ item, onClose }: TastingSheetModalProps) {
  const isClient = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
  const prefersReducedMotion = useReducedMotion();
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const [sizeState, setSizeState] = useState<{ itemId: string; index: number }>(
    { itemId: "", index: 0 }
  );

  const activeSizeIdx =
    item && sizeState.itemId === item.id ? sizeState.index : 0;

  useDialogA11y({
    isOpen: Boolean(item),
    onClose,
    containerRef: dialogRef,
    initialFocusRef: closeRef,
  });

  const categoryMeta = item
    ? MENU_CATEGORIES.find((cat) => cat.id === item.category)
    : undefined;

  const suggestedGenre = item
    ? BOOK_GENRES.find((g) => g.id === CATEGORY_GENRE_MAP[item.category]) ??
      BOOK_GENRES[0]
    : undefined;

  const resolvedImg = item
    ? resolveMenuShowcaseImage(item.id, item.image)
    : null;

  const selectedSize =
    item?.sizes && item.sizes[activeSizeIdx] ? item.sizes[activeSizeIdx] : null;

  const modalContent = (
    <AnimatePresence>
      {item && resolvedImg && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="tasting-sheet-title"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{
              opacity: 0,
              transition: { duration: prefersReducedMotion ? 0.12 : 0.18 },
            }}
            transition={{
              duration: prefersReducedMotion ? 0.15 : 0.24,
              ease: [0.23, 1, 0.32, 1],
            }}
            onClick={onClose}
            className="fixed inset-0 bg-ink/35 backdrop-blur-xs"
            aria-hidden="true"
          />

          <motion.div
            ref={dialogRef}
            initial={
              prefersReducedMotion
                ? { opacity: 0 }
                : { opacity: 0, y: 18, scale: 0.96 }
            }
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={
              prefersReducedMotion
                ? { opacity: 0, transition: { duration: 0.14 } }
                : {
                    opacity: 0,
                    y: 12,
                    scale: 0.975,
                    transition: { duration: 0.18, ease: [0.23, 1, 0.32, 1] },
                  }
            }
            transition={{ duration: 0.26, ease: [0.23, 1, 0.32, 1] }}
            className="relative z-10 max-h-[90svh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-soft bg-paper p-6 text-ink sm:p-8"
          >
            <div className="flex items-start justify-between gap-4 border-b border-soft pb-4">
              <div>
                <p className="text-xs font-medium tracking-[0.04em] text-ink-muted">
                  {categoryMeta?.label}
                  {item.subcategory ? ` / ${item.subcategory}` : ""}
                </p>
                <h2
                  id="tasting-sheet-title"
                  className="mt-1 font-display text-3xl leading-tight text-ink sm:text-4xl"
                >
                  {item.name}
                </h2>
              </div>

              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                aria-label="Close tasting sheet"
                className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-soft bg-surface-elevated text-ink transition-[background-color,border-color,transform] duration-150 ease-[var(--ease-out)] active:scale-[0.95] hover:border-ink"
              >
                <X className="h-4 w-4" strokeWidth={1.7} aria-hidden="true" />
              </button>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-12 sm:items-start">
              <motion.div
                initial={
                  prefersReducedMotion ? false : { opacity: 0, y: 10 }
                }
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.32,
                  delay: prefersReducedMotion ? 0 : 0.05,
                  ease: [0.23, 1, 0.32, 1],
                }}
                className="sm:col-span-5"
              >
                {resolvedImg.mode === "compact-specimen" ? (
                  <div className="flex aspect-[4/5] flex-col items-center justify-center rounded-xl border border-soft bg-surface-elevated p-6">
                    <div className="relative aspect-[4/5] w-28 overflow-hidden rounded-lg border border-soft bg-paper">
                      <Image
                        src={resolvedImg.src}
                        alt={item.alt}
                        fill
                        sizes="112px"
                        className="object-cover"
                      />
                    </div>
                    <p className="mt-4 font-editorial text-base italic text-ink-muted">
                      {DRINK_CATEGORIES.has(item.category)
                        ? "Bar pour"
                        : "Kitchen plate"}
                    </p>
                  </div>
                ) : (
                  <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl border border-soft bg-surface-elevated">
                    <Image
                      src={resolvedImg.src}
                      alt={item.alt}
                      fill
                      sizes="(max-width: 640px) 85vw, 240px"
                      className="object-cover"
                    />
                  </div>
                )}
              </motion.div>

              <motion.div
                initial={
                  prefersReducedMotion ? false : { opacity: 0, y: 10 }
                }
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.32,
                  delay: prefersReducedMotion ? 0 : 0.09,
                  ease: [0.23, 1, 0.32, 1],
                }}
                className="space-y-5 sm:col-span-7"
              >
                {item.badge && (
                  <span
                    className={cn(
                      "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium text-ink",
                      item.badge === "Must Try"
                        ? "bg-powder"
                        : "bg-powder-soft"
                    )}
                  >
                    {item.badge}
                  </span>
                )}

                {item.sizes && selectedSize && (
                  <div className="space-y-4">
                    <LayoutGroup id={`tasting-modal-sizes-${item.id}`}>
                      <div
                        role="group"
                        aria-label={`Select size for ${item.name}`}
                        className="flex flex-wrap gap-2"
                      >
                        {item.sizes.map((entry, idx) => {
                          const isActive = idx === activeSizeIdx;
                          return (
                            <button
                              key={entry.size}
                              type="button"
                              onClick={() =>
                                setSizeState({ itemId: item.id, index: idx })
                              }
                              aria-pressed={isActive}
                              className={cn(
                                "relative rounded-full border px-3.5 py-1.5 text-xs font-medium transition-[color,border-color,transform] duration-150 ease-[var(--ease-out)] active:scale-[0.97]",
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
                                      : `modal-size-pill-${item.id}`
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
                              <span className="relative z-10">
                                {entry.size}
                                {entry.note ? ` (${entry.note})` : ""}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </LayoutGroup>

                    <div className="flex items-baseline justify-between border-y border-soft py-3">
                      <span className="text-sm text-ink-muted">
                        Selected serving
                      </span>
                      <AnimatePresence mode="wait">
                        <motion.span
                          key={`${item.id}-${selectedSize.size}`}
                          initial={
                            prefersReducedMotion
                              ? false
                              : { opacity: 0, y: 6 }
                          }
                          animate={{ opacity: 1, y: 0 }}
                          exit={
                            prefersReducedMotion
                              ? { opacity: 0 }
                              : { opacity: 0, y: -6 }
                          }
                          transition={{ duration: 0.16, ease: [0.23, 1, 0.32, 1] }}
                          className="font-display text-3xl tabular-nums text-ink"
                        >
                          ₱{selectedSize.price}
                        </motion.span>
                      </AnimatePresence>
                    </div>
                  </div>
                )}

                {item.singlePrice !== undefined && (
                  <div className="flex items-baseline justify-between border-y border-soft py-3">
                    <span className="text-sm text-ink-muted">
                      Single serving
                    </span>
                    <span className="font-display text-3xl tabular-nums text-ink">
                      ₱{item.singlePrice}
                    </span>
                  </div>
                )}

                {item.priceUnconfirmed && (
                  <p className="border-y border-soft py-3 font-editorial text-xl italic text-ink-muted">
                    Price to be confirmed
                  </p>
                )}

                {categoryMeta?.priceNote && (
                  <p className="text-sm leading-relaxed text-ink-muted">
                    {categoryMeta.priceNote}
                  </p>
                )}

                {suggestedGenre && (
                  <motion.div
                    initial={
                      prefersReducedMotion ? false : { opacity: 0, y: 8 }
                    }
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.3,
                      delay: prefersReducedMotion ? 0 : 0.14,
                      ease: [0.23, 1, 0.32, 1],
                    }}
                    className="rounded-xl border border-powder bg-powder-soft/55 p-4"
                  >
                    <p className="text-xs font-medium tracking-[0.04em] text-ink-muted">
                      Reading Room pairing
                    </p>
                    <p className="mt-1 font-display text-lg text-ink">
                      {suggestedGenre.name} shelf
                    </p>
                    <p className="mt-1 font-editorial text-base italic text-ink-muted">
                      {suggestedGenre.quietPairing}
                    </p>
                    <Link
                      href={`/reading-room#shelf-${suggestedGenre.id}`}
                      onClick={onClose}
                      className="mt-3 inline-block text-xs font-medium text-ink underline decoration-ink/40 underline-offset-4 hover:decoration-ink"
                    >
                      Visit the {suggestedGenre.name} shelf
                    </Link>
                  </motion.div>
                )}
              </motion.div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );

  if (!isClient) {
    return null;
  }

  return createPortal(modalContent, document.body);
}
