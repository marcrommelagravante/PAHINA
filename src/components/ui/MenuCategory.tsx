import {
  splitCategoryShowcase,
  type MenuCategoryMeta,
  type MenuItemData,
} from "@/data/menu";
import { DrinkShowcase } from "@/components/editorial/DrinkShowcase";
import { MaskedHeading } from "@/components/editorial/MaskedHeading";
import { MenuItem } from "@/components/ui/MenuItem";
import { Reveal } from "@/components/ui/Reveal";

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
      className="scroll-mt-36 py-20 sm:py-24"
    >
      {/* Editorial category intro with whisper-quiet serving note */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-end lg:gap-10">
        <div className="space-y-3 lg:col-span-7">
          <MaskedHeading
            id={`heading-${category.id}`}
            lines={[category.heading]}
            className="font-display text-4xl leading-[1.06] tracking-[-0.025em] text-ink sm:text-5xl"
          />
          <p className="max-w-md text-[13px] leading-[1.7] text-ink-muted">
            {category.lead}
          </p>
        </div>
        {category.priceNote && (
          <div className="lg:col-span-5 lg:text-right">
            <p className="text-[10px] font-medium tracking-[0.14em] uppercase text-ink-muted">
              Serving note
            </p>
            <p className="mt-1.5 text-[12px] leading-[1.6] text-ink-muted lg:ml-auto lg:max-w-xs">
              {category.priceNote}
            </p>
          </div>
        )}
      </div>

      {/* Category mini-showcase */}
      {showcase.length > 0 && (
        <Reveal className="mt-14 md:pb-12">
          <DrinkShowcase items={showcase} onInspectItem={onInspectItem} />
        </Reveal>
      )}

      {/* Printed hairline ledger for remaining items */}
      {rest.length > 0 && (
        <div className="mt-14 pt-6">
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
                    <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-x-14">
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
              <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-x-14">
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
