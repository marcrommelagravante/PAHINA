import type { Metadata } from "next";
import { MarbleSheet } from "@/components/editorial/MarbleSheet";
import { FloatingPhoto } from "@/components/editorial/FloatingPhoto";
import { MarginNote } from "@/components/editorial/MarginNote";
import { MaskedHeading } from "@/components/editorial/MaskedHeading";
import { MenuExplorer } from "@/components/sections/MenuExplorer";
import { VisitBanner } from "@/components/sections/VisitBanner";
import { EDITORIAL_IMAGES } from "@/data/editorialImages";
import { MENU_CATEGORIES, MENU_ITEMS } from "@/data/menu";

export const metadata: Metadata = {
  title: "Menu",
  description:
    "Explore PAHINA's menu of espresso-based coffee, specialty drinks, non-coffee pours, frappuccinos, pasta including Aglio Olio, pizza, and fries.",
};

export default function MenuPage() {
  return (
    <>
      {/* Printed menu sheet resting on honed marble */}
      <MarbleSheet
        ariaLabelledBy="menu-hero-heading"
        className="pt-24 pb-10 sm:pt-28 sm:pb-14"
        sheetClassName="px-6 py-10 sm:px-12 sm:py-14 lg:px-16"
      >
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="space-y-8 lg:col-span-7">
            <div className="space-y-4">
              <MaskedHeading
                as="h1"
                id="menu-hero-heading"
                immediate
                lines={[
                  "Brewed slowly,",
                  <em key="l2" className="font-normal italic">
                    served unhurried.
                  </em>,
                ]}
                className="font-display text-4xl leading-[1.05] tracking-[-0.025em] text-ink sm:text-5xl lg:text-6xl"
              />
              <p className="max-w-xl text-base leading-relaxed text-ink-muted sm:text-lg">
                Espresso classics, cold pours, ice-blended frappes, and light
                savory dishes curated for calm reading tables. Select any item
                to open its tasting sheet.
              </p>
            </div>

            {/* Printed table of contents — tap any category to jump */}
            <nav aria-label="Menu contents">
              <ul className="divide-y divide-soft border-y border-soft">
                {MENU_CATEGORIES.map((category) => {
                  const count = MENU_ITEMS.filter(
                    (item) => item.category === category.id
                  ).length;

                  return (
                    <li key={category.id}>
                      <a
                        href={`#menu-${category.id}`}
                        className="group flex items-baseline justify-between gap-4 py-3 text-ink transition-colors duration-150 hover:text-ink-muted"
                      >
                        <span className="font-display text-xl transition-transform duration-200 ease-[var(--ease-out)] group-hover:translate-x-1 sm:text-2xl">
                          {category.label}
                        </span>
                        <span className="text-xs font-medium tabular-nums text-ink-muted">
                          {count} items
                        </span>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="grid max-w-md grid-cols-2 gap-6">
              <MarginNote label="Menu" value="39 items" />
              <MarginNote label="Food prices" value="To be confirmed" />
            </div>
          </div>

          <div className="lg:col-span-5">
            <FloatingPhoto
              src={EDITORIAL_IMAGES.menuHeroFlatlay}
              alt="Hot Café Latte in cream stoneware beside a fluted glass of iced Spanish Latte and a charcoal linen book on warm paper"
              aspect="portrait"
              priority
              drift={22}
              scrollTilt={1.6}
              tiltOnHover
              sizes="(max-width: 1024px) 84vw, 36vw"
              className="mx-auto max-w-[340px] lg:max-w-none"
            />
          </div>
        </div>
      </MarbleSheet>

      <MenuExplorer categories={MENU_CATEGORIES} items={MENU_ITEMS} />

      <VisitBanner
        heading={
          <>
            Stay for <em className="font-normal italic">a second cup.</em>
          </>
        }
        description="Pair a slow pour with an open shelf in our Reading Room, or review our concept visit details."
        secondaryLabel="Explore the Reading Room"
        secondaryHref="/reading-room"
      />
    </>
  );
}
