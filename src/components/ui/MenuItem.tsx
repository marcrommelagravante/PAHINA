import Image from "next/image";
import type { MenuItemData } from "@/data/menu";
import { cn } from "@/lib/utils";

interface MenuItemProps {
  item: MenuItemData;
  onInspect?: (item: MenuItemData) => void;
}

export function MenuItem({ item, onInspect }: MenuItemProps) {
  return (
    <article className="border-b border-soft/90">
      <button
        type="button"
        onClick={onInspect ? () => onInspect(item) : undefined}
        className={cn(
          "group flex w-full items-start gap-4 py-5 text-left transition-[opacity,transform] duration-150 ease-[var(--ease-out)] sm:gap-5",
          onInspect && "cursor-pointer hover:opacity-85 active:scale-[0.99]"
        )}
      >
        <div className="relative aspect-[4/5] w-[72px] shrink-0 overflow-hidden rounded-[2px] bg-soft sm:w-[78px]">
          <Image
            src={item.image}
            alt={item.alt}
            fill
            sizes="78px"
            className="object-cover hover-image-zoom"
          />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h4 className="font-display text-lg leading-snug text-ink underline-offset-4 group-hover:underline sm:text-xl">
              {item.name}
            </h4>
            <div className="flex items-center gap-3">
              {item.badge && (
                <span className="text-[10px] font-medium tracking-[0.12em] uppercase text-ink-muted">
                  {item.badge}
                </span>
              )}
              {onInspect && (
                <span className="hidden font-editorial text-sm italic text-ink-muted opacity-0 transition-opacity duration-150 group-hover:opacity-100 sm:inline">
                  Inspect
                </span>
              )}
            </div>
          </div>

          {item.sizes && (
            <dl className="mt-2.5 space-y-1 text-xs">
              {item.sizes.map((entry) => (
                <div
                  key={entry.size}
                  className="flex items-baseline justify-between gap-3"
                >
                  <dt className="text-ink-muted">
                    <span className="font-medium text-ink">{entry.size}</span>
                    {entry.note && (
                      <span className="ml-1.5 text-ink-muted">
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
            <dl className="mt-2.5 text-xs">
              <div className="flex items-baseline justify-between gap-3">
                <dt className="text-ink-muted">Single serving</dt>
                <dd className="font-medium tabular-nums text-ink">
                  ₱{item.singlePrice}
                </dd>
              </div>
            </dl>
          )}

          {item.priceUnconfirmed && (
            <p className="mt-2.5 font-editorial text-base italic text-ink-muted">
              Price to be confirmed
            </p>
          )}
        </div>
      </button>
    </article>
  );
}
