import type { Metadata } from "next";
import { HomeMagazineHero } from "@/components/home/HomeMagazineHero";
import { HomeWrapStory } from "@/components/home/HomeWrapStory";
import { HomeOverheadInterlude } from "@/components/home/HomeOverheadInterlude";
import { ScatteredMenuSpread } from "@/components/home/ScatteredMenuSpread";
import { HomeReadingFinale } from "@/components/home/HomeReadingFinale";
import { getHomeShowcaseItems } from "@/data/menu";
import { SITE_INFO } from "@/data/site";

export const metadata: Metadata = {
  title: `${SITE_INFO.name} — ${SITE_INFO.descriptor}`,
  description: `${SITE_INFO.tagline} ${SITE_INFO.supportingLines.curiousMinds}`,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: `${SITE_INFO.name} — ${SITE_INFO.descriptor}`,
    description: `${SITE_INFO.tagline} ${SITE_INFO.supportingLines.curiousMinds}`,
    url: "/",
  },
};

export default function HomePage() {
  const showcaseItems = getHomeShowcaseItems();

  return (
    <div className="bg-paper">
      <HomeMagazineHero />
      <HomeWrapStory />
      <HomeOverheadInterlude />
      <ScatteredMenuSpread items={showcaseItems} />
      <HomeReadingFinale />
    </div>
  );
}
