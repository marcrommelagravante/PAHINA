"use client";

import { useState } from "react";
import type {
  MenuCategoryId,
  MenuCategoryMeta,
  MenuItemData,
} from "@/data/menu";
import { MenuCategory } from "@/components/ui/MenuCategory";
import { MenuTastingPedestal3D } from "@/components/three/MenuTastingPedestal3D";
import { cn } from "@/lib/utils";

interface MenuExplorerProps {
  categories: MenuCategoryMeta[];
  items: MenuItemData[];
}

export function MenuExplorer({ categories, items }: MenuExplorerProps) {
  const [selectedCategory, setSelectedCategory] = useState<
    "all" | MenuCategoryId
  >("all");
  const [activeItem, setActiveItem] = useState<MenuItemData>(
    items.find((i) => i.id === "cafe-latte") ?? items[0]
  );

  const visibleCategories =
    selectedCategory === "all"
      ? categories
      : categories.filter((cat) => cat.id === selectedCategory);

  const handleSelectCategory = (catId: "all" | MenuCategoryId) => {
    setSelectedCategory(catId);
    if (catId !== "all") {
      const firstInCat = items.find((i) => i.category === catId);
      if (firstInCat) {
        setActiveItem(firstInCat);
      }
    }
  };

  return (
    <div>
      <div className="sticky top-[73px] z-30 border-b border-soft bg-paper/95 backdrop-blur-md">
        <div className="mx-auto max-w-6xl px-5 py-3.5 sm:px-8">
          <div
            role="group"
            aria-label="Filter menu by category"
            className="flex flex-wrap items-center gap-2"
          >
            <button
              type="button"
              onClick={() => handleSelectCategory("all")}
              aria-pressed={selectedCategory === "all"}
              className={cn(
                "inline-flex min-h-[38px] items-center rounded-full border px-4 py-1.5 text-sm font-medium transition-[background-color,border-color,color,transform] duration-150 active:scale-[0.97]",
                selectedCategory === "all"
                  ? "border-ink bg-ink text-paper"
                  : "border-soft bg-surface-elevated text-ink-muted hover:border-powder hover:text-ink"
              )}
            >
              All
            </button>

            {categories.map((category) => {
              const isActive = selectedCategory === category.id;
              return (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => handleSelectCategory(category.id)}
                  aria-pressed={isActive}
                  className={cn(
                    "inline-flex min-h-[38px] items-center rounded-full border px-4 py-1.5 text-sm font-medium transition-[background-color,border-color,color,transform] duration-150 active:scale-[0.97]",
                    isActive
                      ? "border-ink bg-ink text-paper"
                      : "border-soft bg-surface-elevated text-ink-muted hover:border-powder hover:text-ink"
                  )}
                >
                  {category.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Interactive 3D Tasting Pedestal synced with categories & all 39 items */}
      <section
        aria-label="Interactive 3D Menu Tasting Pedestal"
        className="border-b border-soft bg-surface-elevated py-8 sm:py-10"
      >
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="grid grid-cols-1 items-center gap-6 rounded-2xl border border-soft bg-paper p-5 sm:p-6 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-7">
              <MenuTastingPedestal3D
                item={activeItem}
                className="h-[260px] w-full rounded-xl border border-soft bg-surface-elevated sm:h-[300px]"
              />
            </div>

            <div className="space-y-4 lg:col-span-5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs font-medium text-ink-muted">
                  3D Tasting Pedestal —{" "}
                  {categories.find((c) => c.id === activeItem.category)?.label}
                </span>
                {activeItem.badge && (
                  <span
                    className={cn(
                      "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium text-ink",
                      activeItem.badge === "Must Try"
                        ? "bg-powder"
                        : "bg-powder-soft"
                    )}
                  >
                    {activeItem.badge}
                  </span>
                )}
              </div>

              <h2 className="font-display text-3xl text-ink">
                {activeItem.name}
              </h2>

              {activeItem.sizes && (
                <dl className="divide-y divide-soft border-t border-soft text-sm">
                  {activeItem.sizes.map((entry) => (
                    <div
                      key={entry.size}
                      className="flex items-baseline justify-between gap-3 py-2"
                    >
                      <dt className="text-ink-muted">
                        <span className="font-medium text-ink">
                          {entry.size}
                        </span>
                        {entry.note && (
                          <span className="ml-1.5 text-xs text-ink-muted">
                            ({entry.note})
                          </span>
                        )}
                      </dt>
                      <dd className="font-medium tabular-nums text-ink">
                        ₱{entry.price}
                      </dd>
                    </div>
                  ))}
                </dl>
              )}

              {activeItem.singlePrice !== undefined && (
                <dl className="border-t border-soft pt-2.5 text-sm">
                  <div className="flex items-baseline justify-between gap-3">
                    <dt className="text-ink-muted">Single serving</dt>
                    <dd className="font-medium tabular-nums text-ink">
                      ₱{activeItem.singlePrice}
                    </dd>
                  </div>
                </dl>
              )}

              {activeItem.priceUnconfirmed && (
                <p className="border-t border-soft pt-2.5 font-editorial text-lg italic text-ink-muted">
                  Price to be confirmed
                </p>
              )}

              <p className="text-xs leading-relaxed text-ink-muted">
                Hover or tap any of the 39 menu cards below to preview its 3D
                serving vessel and photograph on the pedestal.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        {visibleCategories.map((category) => {
          const categoryItems = items.filter(
            (item) => item.category === category.id
          );
          return (
            <MenuCategory
              key={category.id}
              category={category}
              items={categoryItems}
              selectedItemId={activeItem.id}
              onSelectItem={setActiveItem}
            />
          );
        })}
      </div>
    </div>
  );
}
