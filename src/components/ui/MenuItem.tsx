import Image from "next/image";
import type { MenuItemData } from "@/data/menu";
import { cn } from "@/lib/utils";

interface MenuItemProps {
  item: MenuItemData;
}

export function MenuItem({ item }: MenuItemProps) {
  return (
    <article className="group flex items-start gap-4 rounded-xl border border-soft bg-surface-elevated p-4 transition-colors duration-150 hover:border-powder sm:gap-5 sm:p-5">
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
