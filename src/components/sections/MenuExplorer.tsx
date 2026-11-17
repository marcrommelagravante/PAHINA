"use client";

import { useState } from "react";
import type {
  MenuCategoryId,
  MenuCategoryMeta,
  MenuItemData,
} from "@/data/menu";
import { MenuCategory } from "@/components/ui/MenuCategory";
import { cn } from "@/lib/utils";

interface MenuExplorerProps {
  categories: MenuCategoryMeta[];
  items: MenuItemData[];
}

export function MenuExplorer({ categories, items }: MenuExplorerProps) {
  const [selectedCategory, setSelectedCategory] = useState<
    "all" | MenuCategoryId
  >("all");

  const visibleCategories =
    selectedCategory === "all"
      ? categories
      : categories.filter((cat) => cat.id === selectedCategory);

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
              onClick={() => setSelectedCategory("all")}
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
                  onClick={() => setSelectedCategory(category.id)}
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
            />
          );
        })}
      </div>
    </div>
  );
}
