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
    <div className="bg-paper">
      <div className="sticky top-18 z-30 border-y border-soft bg-paper">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-5 py-3 sm:px-8">
          <LayoutGroup id="menu-category-filter">
            <div
              role="group"
              aria-label="Filter menu by category"
              className="flex flex-wrap items-center gap-x-6 gap-y-2"
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
                      "relative py-1.5 font-editorial text-lg italic transition-colors duration-150 sm:text-xl",
                      isActive
                        ? "text-ink"
                        : "text-ink-muted hover:text-ink"
                    )}
                  >
                    <span>{tab.label}</span>
                    {isActive && (
                      <motion.span
                        layoutId={
                          prefersReducedMotion ? undefined : "menu-filter-line"
                        }
                        transition={{
                          type: "spring",
                          stiffness: 420,
                          damping: 32,
                        }}
                        className="absolute inset-x-0 bottom-0 h-px bg-ink"
                        aria-hidden="true"
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </LayoutGroup>

          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setHousePicksOnly((prev) => !prev)}
              aria-pressed={housePicksOnly}
              className={cn(
                "inline-flex min-h-[34px] items-center rounded-[2px] border px-3.5 py-1 text-[11px] font-medium tracking-[0.06em] transition-[background-color,border-color,color] duration-150",
                housePicksOnly
                  ? "border-ink bg-ink text-paper"
                  : "border-ink/30 bg-transparent text-ink hover:border-ink"
              )}
            >
              House Picks
            </button>
            <span className="text-[11px] font-medium tabular-nums tracking-[0.08em] text-ink-muted">
              {visibleItemCount} / {items.length}
            </span>
          </div>
        </div>
      </div>

      {visibleCategories.length === 0 ? (
        <div className="mx-auto max-w-6xl px-5 py-24 text-center sm:px-8">
          <p className="font-display text-3xl text-ink">
            No House Picks in this category.
          </p>
          <p className="mt-2 text-[13px] text-ink-muted">
            Signature and Must Try badges live across Coffee, Non-Coffee, and
            Frappuccino.
          </p>
          <button
            type="button"
            onClick={() => {
              setHousePicksOnly(false);
              setSelectedCategory("all");
            }}
            className="mt-6 inline-flex min-h-[42px] items-center rounded-[2px] border border-ink bg-ink px-6 py-2 text-xs font-medium tracking-[0.06em] text-paper transition-opacity duration-150 hover:opacity-85"
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
