import type { Metadata } from "next";
import { FloatingPhoto } from "@/components/editorial/FloatingPhoto";
import { MaskedHeading } from "@/components/editorial/MaskedHeading";
import { MenuExplorer } from "@/components/sections/MenuExplorer";
import { VisitBanner } from "@/components/sections/VisitBanner";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import {
  BreadcrumbStructuredData,
  MenuStructuredData,
} from "@/components/seo/StructuredData";
import { EDITORIAL_IMAGES } from "@/data/editorialImages";
import { MENU_CATEGORIES, MENU_ITEMS } from "@/data/menu";
import { DEFAULT_OG_IMAGES } from "@/lib/siteUrl";

export const metadata: Metadata = {
  title: "Menu",
  description:
    "Explore PAHINA's menu of espresso-based coffee, specialty drinks, non-coffee pours, frappuccinos, pasta including Aglio Olio, pizza, and fries.",
  alternates: {
    canonical: "/menu",
  },
  openGraph: {
    title: "Menu | PAHINA",
    description:
      "Explore PAHINA's 39-item café menu of espresso pours, chilled signatures, frappuccinos, pasta, pizza, and fries.",
    url: "/menu",
    images: DEFAULT_OG_IMAGES,
  },
};

export default function MenuPage() {
  return (
    <div className="bg-paper">
      <BreadcrumbStructuredData currentName="Menu" currentPath="/menu" />
      <MenuStructuredData />

      {/* Borderless printed menu hero on unbroken Paper White */}
      <section
        aria-labelledby="menu-hero-heading"
        className="overflow-x-clip bg-paper pt-28 pb-16 sm:pt-36 sm:pb-24"
      >
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-10">
            <div className="space-y-8 lg:col-span-6">
              <div className="space-y-5">
                <MaskedHeading
                  as="h1"
                  id="menu-hero-heading"
                  immediate
                  delay={0.2}
                  lines={[
                    "Brewed slowly,",
                    <em key="l2" className="font-normal italic">
                      served unhurried.
                    </em>,
                  ]}
                  className="font-display text-[clamp(3.2rem,6.4vw,5.4rem)] leading-[0.98] tracking-[-0.03em] text-ink"
                />
                <Reveal delay={0.34} y={12}>
                  <p className="max-w-[290px] text-[13px] leading-[1.7] text-ink-muted">
                    Espresso classics, cold pours, ice-blended frappes, and light
                    savory dishes curated for calm reading tables. Select any item
                    to open its tasting sheet.
                  </p>
                </Reveal>
              </div>

              {/* Hairline printed menu contents */}
              <nav aria-label="Menu contents" className="max-w-md">
                <RevealGroup
                  as="ul"
                  stagger={0.045}
                  delayChildren={0.38}
                  className="divide-y divide-soft border-y border-soft"
                >
                  {MENU_CATEGORIES.map((category) => {
                    const count = MENU_ITEMS.filter(
                      (item) => item.category === category.id
                    ).length;

                    return (
                      <RevealItem as="li" key={category.id} y={8}>
                        <a
                          href={`#menu-${category.id}`}
                          className="group flex items-baseline justify-between gap-4 py-2.5 text-ink transition-[color,transform] duration-150 ease-[var(--ease-out)] active:scale-[0.99] hover:text-ink-muted"
                        >
                          <span className="hover-nudge-x font-display text-xl">
                            {category.label}
                          </span>
                          <span className="text-[11px] font-medium tabular-nums tracking-[0.06em] text-ink-muted">
                            {count} items
                          </span>
                        </a>
                      </RevealItem>
                    );
                  })}
                </RevealGroup>
              </nav>

              <Reveal delay={0.56} y={10}>
                <div className="flex gap-10 text-[10px] leading-[1.5] tracking-[0.14em] uppercase text-ink-muted">
                  <div>
                    <p>Menu</p>
                    <p className="font-medium text-ink">39 Items</p>
                  </div>
                  <div>
                    <p>Food prices</p>
                    <p className="font-medium text-ink">To Be Confirmed</p>
                  </div>
                </div>
              </Reveal>
            </div>

            <div className="lg:col-span-6">
              <FloatingPhoto
                src={EDITORIAL_IMAGES.menuHeroFlatlay}
                alt="Minimalist café still-life on warm Paper White featuring a hot cappuccino in cream stoneware on a saucer, a tall fluted glass of iced coffee, a brushed stainless teaspoon, and a folded oatmeal-linen napkin"
                aspect="portrait"
                priority
                drift={24}
                scrollTilt={1.5}
                tiltOnHover
                feather="oval"
                sizes="(max-width: 1024px) 84vw, 420px"
                className="mx-auto max-w-[380px] lg:max-w-[420px]"
              />
            </div>
          </div>
        </div>
      </section>

      <MenuExplorer categories={MENU_CATEGORIES} items={MENU_ITEMS} />

      <VisitBanner
        heading={
          <>
            Stay for <em className="font-normal italic">a second cup.</em>
          </>
        }
        description="Pair a slow pour with an open shelf in our Reading Room, or review our concept visit details."
        secondaryLabel="Reading Room"
        secondaryHref="/reading-room"
      />
    </div>
  );
}
