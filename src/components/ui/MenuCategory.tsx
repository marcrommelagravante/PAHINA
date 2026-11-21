import {
  splitCategoryShowcase,
  type MenuCategoryMeta,
  type MenuItemData,
} from "@/data/menu";
import { DrinkShowcase } from "@/components/editorial/DrinkShowcase";
import { MarginNote } from "@/components/editorial/MarginNote";
import { MenuItem } from "@/components/ui/MenuItem";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

interface MenuCategoryProps {
  category: MenuCategoryMeta;
  items: MenuItemData[];
  onInspectItem?: (item: MenuItemData) => void;
}

export function MenuCategory({
  category,
  items,
  onInspectItem,
}: MenuCategoryProps) {
  const { showcase, rest } = splitCategoryShowcase(category.id, items);

  const restSubcategories = Array.from(
    new Set(rest.map((item) => item.subcategory).filter(Boolean))
  ) as string[];

  return (
    <section
      id={`menu-${category.id}`}
      aria-labelledby={`heading-${category.id}`}
      className="scroll-mt-36 border-b border-soft py-16 last:border-b-0 sm:py-20"
    >
      {/* Editorial category intro with margin price note */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-end lg:gap-10">
        <div id={`heading-${category.id}`} className="lg:col-span-7">
          <SectionHeading title={category.heading} description={category.lead} />
        </div>
        {category.priceNote && (
          <div className="lg:col-span-5 lg:pl-6">
            <MarginNote label="Serving note" value={category.priceNote} />
          </div>
        )}
      </div>

      {/* Category mini-showcase (up to 3 standout items, badged first) */}
      {showcase.length > 0 && (
        <Reveal className="mt-12 md:pb-12">
          <DrinkShowcase items={showcase} onInspectItem={onInspectItem} />
        </Reveal>
      )}

      {/* Printed hairline ledger for the remaining items in this category */}
      {rest.length > 0 && (
        <div className="mt-12 border-t border-soft pt-10">
          {restSubcategories.length > 0 ? (
            <div className="space-y-12">
              {restSubcategories.map((sub) => {
                const groupItems = rest.filter(
                  (item) => item.subcategory === sub
                );
                return (
                  <div key={sub} className="space-y-2">
                    <h3 className="border-b border-soft pb-2.5 font-editorial text-2xl italic text-ink">
                      {sub}
                    </h3>
                    <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-x-12">
                      {groupItems.map((item) => (
                        <MenuItem
                          key={item.id}
                          item={item}
                          onInspect={onInspectItem}
                        />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div>
              <h3 className="border-b border-soft pb-2.5 font-editorial text-2xl italic text-ink">
                More from {category.label}
              </h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-x-12">
                {rest.map((item) => (
                  <MenuItem
                    key={item.id}
                    item={item}
                    onInspect={onInspectItem}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
