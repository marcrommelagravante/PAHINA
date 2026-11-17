import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { MenuExplorer } from "@/components/sections/MenuExplorer";
import { MENU_CATEGORIES, MENU_ITEMS } from "@/data/menu";

export const metadata: Metadata = {
  title: "Menu",
  description:
    "Explore PAHINA's menu of espresso-based coffee, specialty drinks, non-coffee pours, frappuccinos, pasta including Aglio Olio, pizza, and fries.",
};

export default function MenuPage() {
  return (
    <>
      <PageHeader
        title={
          <>
            Brewed slowly,{" "}
            <em className="font-normal italic">served unhurried.</em>
          </>
        }
        description="Espresso classics, cold pours, ice-blended frappes, and light savory dishes curated for calm reading tables. Drink figures reflect our working café menu; food prices remain to be confirmed."
      />

      <MenuExplorer categories={MENU_CATEGORIES} items={MENU_ITEMS} />
    </>
  );
}
