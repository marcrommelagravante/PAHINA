import Image from "next/image";
import type { MenuItemData } from "@/data/menu";
import { cn } from "@/lib/utils";

interface MenuItemProps {
  item: MenuItemData;
  isSelected?: boolean;
  onSelect?: (item: MenuItemData) => void;
}

export function MenuItem({
  item,
  isSelected = false,
  onSelect,
}: MenuItemProps) {
  return (
    <article
      onClick={onSelect ? () => onSelect(item) : undefined}
      onMouseEnter={onSelect ? () => onSelect(item) : undefined}
      className={cn(
        "group flex items-start gap-4 rounded-xl border p-4 transition-colors duration-150 sm:gap-5 sm:p-5",
        onSelect && "cursor-pointer",
        isSelected
          ? "border-ink bg-powder-soft/45"
          : "border-soft bg-surface-elevated hover:border-powder"
      )}
    >
      <div className="relative aspect-[4/5] w-24 shrink-0 overflow-hidden rounded-lg bg-soft sm:w-[104px]">
        <Image
          src={item.image}
          alt={item.alt}
          fill
          sizes="(max-width: 640px) 96px, 104px"
          className="object-cover hover-image-zoom"
        />
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <h3 className="font-display text-lg leading-snug text-ink sm:text-xl">
            {item.name}
          </h3>
          <div className="flex items-center gap-1.5">
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
            {isSelected && (
              <span className="inline-flex shrink-0 items-center rounded-full bg-ink px-2 py-0.5 text-[11px] font-medium text-paper">
                In 3D
              </span>
            )}
          </div>
        </div>

        {item.sizes && (
          <dl className="mt-3 divide-y divide-soft/80 border-t border-soft/80 text-sm">
            {item.sizes.map((entry) => (
              <div
                key={entry.size}
                className="flex items-baseline justify-between gap-3 py-1.5"
              >
                <dt className="text-ink-muted">
                  <span className="font-medium text-ink">{entry.size}</span>
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

        {item.singlePrice !== undefined && (
          <dl className="mt-3 border-t border-soft/80 pt-2 text-sm">
            <div className="flex items-baseline justify-between gap-3">
              <dt className="text-ink-muted">Single serving</dt>
              <dd className="font-medium tabular-nums text-ink">
                ₱{item.singlePrice}
              </dd>
            </div>
          </dl>
        )}

        {item.priceUnconfirmed && (
          <p className="mt-3 border-t border-soft/80 pt-2 font-editorial text-base italic text-ink-muted">
            Price to be confirmed
          </p>
        )}
      </div>
    </article>
  );
}
