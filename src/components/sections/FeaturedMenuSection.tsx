"use client";

import { useState } from "react";
import type { MenuItemData } from "@/data/menu";
import { MenuItem } from "@/components/ui/MenuItem";
import { MenuTastingPedestal3D } from "@/components/three/MenuTastingPedestal3D";

export function FeaturedMenuSection({ items }: { items: MenuItemData[] }) {
  const [selectedItem, setSelectedItem] = useState<MenuItemData>(items[0]);

  return (
    <div className="mt-10 grid grid-cols-1 items-start gap-6 lg:grid-cols-12 lg:gap-8">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-7">
        {items.map((item) => (
          <MenuItem
            key={item.id}
            item={item}
            isSelected={item.id === selectedItem.id}
            onSelect={setSelectedItem}
          />
        ))}
      </div>

      <div className="rounded-2xl border border-soft bg-surface-elevated p-5 lg:col-span-5 lg:sticky lg:top-24">
        <div className="mb-3 flex items-center justify-between gap-2">
          <span className="text-xs font-medium text-ink-muted">
            Interactive 3D Tasting Preview
          </span>
          <span className="font-display text-lg text-ink">
            {selectedItem.name}
          </span>
        </div>

        <MenuTastingPedestal3D
          item={selectedItem}
          className="h-[250px] w-full rounded-xl border border-soft bg-paper sm:h-[280px]"
        />

        <p className="mt-3 text-xs leading-relaxed text-ink-muted">
          Hover or tap any featured drink card to inspect its 3D vessel on the
          tasting plinth.
        </p>
      </div>
    </div>
  );
}
