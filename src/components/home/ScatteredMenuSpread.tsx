"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import type { MenuItemData } from "@/data/menu";
import { resolveHomeShowcaseImage } from "@/data/editorialImages";
import { TastingSheetModal } from "@/components/editorial/TastingSheetModal";
import { EditorialButton } from "@/components/home/EditorialButton";
import { cn } from "@/lib/utils";

interface ScatteredMenuSpreadProps {
  items: MenuItemData[];
}

const SPREAD_SPRING = { stiffness: 110, damping: 24, mass: 0.4 };

function formatMicroPrices(item: MenuItemData): string {
  if (item.sizes && item.sizes.length > 0) {
    return item.sizes.map((s) => `${s.size} ₱${s.price}`).join(" / ");
  }
  if (item.singlePrice !== undefined) {
    return `Single ₱${item.singlePrice}`;
  }
  return "Price to be confirmed";
}

function splitTitleLines(name: string): [string, string | null] {
  const parts = name.split(" ");
  if (parts.length <= 1) return [name, null];
  return [parts[0], parts.slice(1).join(" ")];
}

export function ScatteredMenuSpread({ items }: ScatteredMenuSpreadProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [inspectedItem, setInspectedItem] = useState<MenuItemData | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const smoothScroll = useSpring(scrollYProgress, SPREAD_SPRING);
  const leftDrift = useTransform(smoothScroll, [0, 1], [34, -34]);
  const rightDrift = useTransform(smoothScroll, [0, 1], [-26, 26]);
  const centerDrift = useTransform(smoothScroll, [0, 1], [42, -32]);

  const [first, second, third] = items;

  const renderFloatingPlate = (
    item: MenuItemData | undefined,
    opts: {
      driftStyle: typeof leftDrift;
      featherClass: string;
      layout: "text-below" | "text-left" | "text-below-center";
      wrapperClassName: string;
      imgSizeClass: string;
    }
  ) => {
    if (!item) return null;
    const { src } = resolveHomeShowcaseImage(item.id, item.image);
    const [line1, line2] = splitTitleLines(item.name);

    return (
      <motion.article
        style={prefersReducedMotion ? undefined : { y: opts.driftStyle }}
        className={cn("relative will-change-transform", opts.wrapperClassName)}
      >
        <button
          type="button"
          onClick={() => setInspectedItem(item)}
          aria-label={`Open tasting sheet for ${item.name}`}
          className={cn(
            "group block w-full text-left focus-visible:rounded-xl",
            opts.layout === "text-left" &&
              "flex flex-col-reverse gap-4 sm:flex-row sm:items-center sm:gap-2"
          )}
        >
          {opts.layout === "text-left" && (
            <div className="relative z-10 space-y-2 sm:w-44 sm:-mr-6 sm:text-right">
              <h3 className="font-display text-2xl leading-[1.06] tracking-[-0.02em] text-ink transition-opacity duration-200 group-hover:opacity-75 sm:text-[1.9rem]">
                {line1}
                {line2 && (
                  <>
                    <br />
                    <em className="font-normal italic">{line2}</em>
                  </>
                )}
              </h3>
              {item.badge && (
                <p className="text-[10px] font-medium tracking-[0.12em] uppercase text-ink-muted">
                  {item.badge}
                </p>
              )}
              <p className="text-[11.5px] leading-[1.55] tabular-nums text-ink-muted">
                {formatMicroPrices(item)}
              </p>
            </div>
          )}

          <div
            className={cn(
              "relative mx-auto overflow-hidden transition-transform duration-500 ease-[var(--ease-out)] group-hover:-translate-y-1.5 group-hover:scale-[1.02]",
              opts.featherClass,
              opts.imgSizeClass
            )}
          >
            <Image
              src={src}
              alt={item.alt}
              fill
              sizes="(max-width: 768px) 78vw, 320px"
              className="object-cover"
            />
          </div>

          {opts.layout !== "text-left" && (
            <div
              className={cn(
                "relative z-10 mt-3 space-y-1.5",
                opts.layout === "text-below-center"
                  ? "mx-auto max-w-[260px] text-center sm:text-left"
                  : "max-w-[240px]"
              )}
            >
              <h3 className="font-display text-2xl leading-[1.06] tracking-[-0.02em] text-ink transition-opacity duration-200 group-hover:opacity-75 sm:text-[1.9rem]">
                {line1}
                {line2 && (
                  <>
                    <br />
                    <em className="font-normal italic">{line2}</em>
                  </>
                )}
              </h3>
              {item.badge && (
                <p className="text-[10px] font-medium tracking-[0.12em] uppercase text-ink-muted">
                  {item.badge}
                </p>
              )}
              <p className="text-[11.5px] leading-[1.55] tabular-nums text-ink-muted">
                {formatMicroPrices(item)}
              </p>
            </div>
          )}
        </button>
      </motion.article>
    );
  };

  return (
    <section
      ref={sectionRef}
      aria-labelledby="signature-spread-heading"
      className="relative overflow-x-clip bg-paper py-16 sm:py-24 lg:py-32"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <h2 id="signature-spread-heading" className="sr-only">
          Signature Pours
        </h2>

        {/* Open-canvas asymmetric magazine spread matching 00:08 */}
        <div className="relative grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-y-6">
          {/* Top-left floating drink: Caramel Macchiato */}
          {renderFloatingPlate(first, {
            driftStyle: leftDrift,
            featherClass: "feather-tight",
            layout: "text-below",
            wrapperClassName: "lg:col-span-5 lg:pt-10",
            imgSizeClass: "aspect-[4/5] w-[260px] sm:w-[290px]",
          })}

          {/* Top-right floating drink: Spanish Latte */}
          {renderFloatingPlate(second, {
            driftStyle: rightDrift,
            featherClass: "feather-tight",
            layout: "text-left",
            wrapperClassName: "lg:col-span-6 lg:col-start-7 lg:-mt-8",
            imgSizeClass: "aspect-[4/5] w-[250px] sm:w-[295px] shrink-0",
          })}

          {/* Bottom-center floating drink: Signature Chocolate */}
          {renderFloatingPlate(third, {
            driftStyle: centerDrift,
            featherClass: "feather-oval",
            layout: "text-below-center",
            wrapperClassName: "lg:col-span-5 lg:col-start-4 lg:-mt-16",
            imgSizeClass: "aspect-[4/5] w-[250px] sm:w-[285px]",
          })}
        </div>

        {/* Quiet bottom margin note + hairline CTA */}
        <div className="mt-16 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end lg:mt-20">
          <p className="max-w-[280px] text-[12px] leading-[1.65] text-ink-muted">
            Select any drink above to open its tasting sheet, or explore all 39
            items across espresso pours, frappuccinos, pasta, pizza, and fries.
          </p>
          <EditorialButton href="/menu">Explore full menu</EditorialButton>
        </div>
      </div>

      <TastingSheetModal
        item={inspectedItem}
        onClose={() => setInspectedItem(null)}
      />
    </section>
  );
}
