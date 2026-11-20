import type { MenuCategoryMeta, MenuItemData } from "@/data/menu";
import { MenuItem } from "@/components/ui/MenuItem";
import { SectionHeading } from "@/components/ui/SectionHeading";

interface MenuCategoryProps {
  category: MenuCategoryMeta;
  items: MenuItemData[];
  selectedItemId?: string;
  onSelectItem?: (item: MenuItemData) => void;
}

export function MenuCategory({
  category,
  items,
  selectedItemId,
  onSelectItem,
}: MenuCategoryProps) {
  const subcategories = Array.from(
    new Set(items.map((item) => item.subcategory).filter(Boolean))
  ) as string[];

  return (
    <section
      id={`menu-${category.id}`}
      aria-labelledby={`heading-${category.id}`}
      className="scroll-mt-36 border-b border-soft py-12 last:border-b-0 sm:py-16"
    >
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div id={`heading-${category.id}`}>
          <SectionHeading title={category.heading} description={category.lead} />
        </div>
        {category.priceNote && (
          <p className="max-w-md rounded-xl border border-soft bg-surface-elevated px-4 py-3 text-xs leading-relaxed text-ink-muted">
            {category.priceNote}
          </p>
        )}
      </div>

      {subcategories.length > 0 ? (
        <div className="mt-8 space-y-10">
          {subcategories.map((sub) => {
            const groupItems = items.filter((item) => item.subcategory === sub);
            return (
              <div key={sub} className="space-y-4">
                <h3 className="border-b border-soft pb-2 font-editorial text-2xl italic text-ink">
                  {sub}
                </h3>
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-5">
                  {groupItems.map((item) => (
                    <MenuItem
                      key={item.id}
                      item={item}
                      isSelected={item.id === selectedItemId}
                      onSelect={onSelectItem}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-5">
          {items.map((item) => (
            <MenuItem
              key={item.id}
              item={item}
              isSelected={item.id === selectedItemId}
              onSelect={onSelectItem}
            />
          ))}
        </div>
      )}
    </section>
  );
}
