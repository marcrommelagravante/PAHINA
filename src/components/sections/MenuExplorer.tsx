"use client";

import { Fragment, useState } from "react";
import { LayoutGroup, motion, useReducedMotion } from "framer-motion";
import type {
  MenuCategoryId,
  MenuCategoryMeta,
  MenuItemData,
} from "@/data/menu";
import { EDITORIAL_IMAGES } from "@/data/editorialImages";
import { EditorialBanner } from "@/components/editorial/EditorialBanner";
import { TastingSheetModal } from "@/components/editorial/TastingSheetModal";
import { MenuCategory } from "@/components/ui/MenuCategory";
import { cn } from "@/lib/utils";

interface MenuExplorerProps {
  categories: MenuCategoryMeta[];
  items: MenuItemData[];
}

export function MenuExplorer({ categories, items }: MenuExplorerProps) {
  const prefersReducedMotion = useReducedMotion();
  const [selectedCategory, setSelectedCategory] = useState<
    "all" | MenuCategoryId
  >("all");
  const [housePicksOnly, setHousePicksOnly] = useState(false);
  const [inspectedItem, setInspectedItem] = useState<MenuItemData | null>(null);

  const filteredItems = housePicksOnly
    ? items.filter((item) => Boolean(item.badge))
    : items;

  const visibleCategories = (
    selectedCategory === "all"
      ? categories
      : categories.filter((cat) => cat.id === selectedCategory)
  ).filter((cat) => filteredItems.some((item) => item.category === cat.id));

  const visibleItemCount = visibleCategories.reduce(
    (sum, cat) =>
      sum + filteredItems.filter((i) => i.category === cat.id).length,
    0
  );

  const tabs: Array<{ id: "all" | MenuCategoryId; label: string }> = [
    { id: "all", label: "All" },
    ...categories.map((cat) => ({ id: cat.id, label: cat.label })),
  ];

  return (
    <div>
      <div className="sticky top-18 z-30 border-b border-soft bg-paper">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-5 py-3.5 sm:px-8">
          <LayoutGroup id="menu-category-filter">
            <div
              role="group"
              aria-label="Filter menu by category"
              className="flex flex-wrap items-center gap-2"
            >
              {tabs.map((tab) => {
                const isActive = selectedCategory === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setSelectedCategory(tab.id)}
                    aria-pressed={isActive}
                    className={cn(
                      "relative inline-flex min-h-[38px] items-center rounded-full border px-4 py-1.5 text-sm font-medium transition-colors duration-150 active:scale-[0.97]",
                      isActive
                        ? "border-ink text-paper"
                        : "border-soft bg-surface-elevated text-ink-muted hover:border-powder hover:text-ink"
                    )}
                  >
                    {isActive && (
                      <motion.span
                        layoutId={
                          prefersReducedMotion ? undefined : "menu-filter-pill"
                        }
                        transition={{
                          type: "spring",
                          stiffness: 420,
                          damping: 32,
                        }}
                        className="absolute inset-0 rounded-full bg-ink"
                        aria-hidden="true"
                      />
                    )}
                    <span className="relative z-10">{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </LayoutGroup>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setHousePicksOnly((prev) => !prev)}
              aria-pressed={housePicksOnly}
              className={cn(
                "inline-flex min-h-[38px] items-center rounded-full border px-4 py-1.5 text-xs font-medium tracking-[0.03em] transition-[background-color,border-color,color,transform] duration-150 active:scale-[0.97]",
                housePicksOnly
                  ? "border-ink bg-powder text-ink"
                  : "border-powder bg-powder-soft/60 text-ink hover:bg-powder/70"
              )}
            >
              House Picks
            </button>
            <span className="text-xs font-medium tabular-nums text-ink-muted">
              {visibleItemCount} of {items.length}
            </span>
          </div>
        </div>
      </div>

      {visibleCategories.length === 0 ? (
        <div className="mx-auto max-w-6xl px-5 py-20 text-center sm:px-8">
          <p className="font-display text-2xl text-ink">
            No House Picks in this category.
          </p>
          <p className="mt-2 text-sm text-ink-muted">
            Signature and Must Try badges live across Coffee, Non-Coffee, and
            Frappuccino.
          </p>
          <button
            type="button"
            onClick={() => {
              setHousePicksOnly(false);
              setSelectedCategory("all");
            }}
            className="mt-6 inline-flex min-h-[42px] items-center rounded-full bg-ink px-5 py-2 text-sm font-medium text-paper transition-transform duration-150 active:scale-[0.97]"
          >
            Show all 39 items
          </button>
        </div>
      ) : (
        visibleCategories.map((category) => {
          const categoryItems = filteredItems.filter(
            (item) => item.category === category.id
          );
          const showKitchenInterlude =
            selectedCategory === "all" &&
            !housePicksOnly &&
            category.id === "pasta";

          return (
            <Fragment key={category.id}>
              {showKitchenInterlude && (
                <EditorialBanner
                  headingId="menu-kitchen-banner"
                  surface="elevated"
                  src={EDITORIAL_IMAGES.menuFoodBanner}
                  alt="Overhead café table with a bowl of Aglio Olio, iced coffee, espresso cup, and open cloth-bound book in soft daylight"
                  heading={
                    <>
                      Something warm{" "}
                      <em className="font-normal italic">
                        for the long chapters.
                      </em>
                    </>
                  }
                  description="Warm pasta plates, crisp baked pizza, and shareable fries made to sit comfortably beside a book."
                />
              )}
              <div className="mx-auto max-w-6xl px-5 sm:px-8">
                <MenuCategory
                  category={category}
                  items={categoryItems}
                  onInspectItem={setInspectedItem}
                />
              </div>
            </Fragment>
          );
        })
      )}

      <TastingSheetModal
        item={inspectedItem}
        onClose={() => setInspectedItem(null)}
      />
    </div>
  );
}
