import { getSiteUrl } from "@/lib/siteUrl";
import { SITE_INFO } from "@/data/site";
import { MENU_CATEGORIES, MENU_ITEMS } from "@/data/menu";

interface JsonLdProps {
  data: Record<string, unknown>;
}

function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/**
 * Root-level WebSite + CafeOrCoffeeShop structured data.
 * Strictly mirrors verified PAHINA facts — omits unconfirmed address, hours,
 * telephone, and rating fields rather than inventing placeholders.
 */
export function SiteStructuredData() {
  const siteUrl = getSiteUrl();

  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: `${SITE_INFO.name} — ${SITE_INFO.descriptor}`,
        description: `${SITE_INFO.tagline} ${SITE_INFO.supportingLines.curiousMinds}`,
        inLanguage: "en",
      },
      {
        "@type": "CafeOrCoffeeShop",
        "@id": `${siteUrl}/#cafe`,
        name: SITE_INFO.name,
        alternateName: `${SITE_INFO.name} — ${SITE_INFO.descriptor}`,
        slogan: SITE_INFO.tagline,
        description:
          "A boutique neighborhood coffee shop and in-café reading room where guests enjoy espresso, chilled pours, light plates, and curated books.",
        url: siteUrl,
        image: `${siteUrl}/images/editorial/hero-flatlay.jpg`,
        logo: `${siteUrl}/images/brand/pahina-emblem.svg`,
        servesCuisine: ["Coffee", "Espresso", "Pasta", "Pizza"],
        hasMenu: `${siteUrl}/menu`,
      },
    ],
  };

  return <JsonLd data={graph} />;
}

/**
 * Honest Menu structured data for /menu.
 * Publishes verified PHP prices on drink items and omits Offer objects for
 * food items whose prices remain to be confirmed.
 */
export function MenuStructuredData() {
  const siteUrl = getSiteUrl();

  const data = {
    "@context": "https://schema.org",
    "@type": "Menu",
    "@id": `${siteUrl}/menu#menu`,
    name: `${SITE_INFO.name} Café Menu`,
    url: `${siteUrl}/menu`,
    inLanguage: "en",
    hasMenuSection: MENU_CATEGORIES.map((category) => ({
      "@type": "MenuSection",
      name: category.heading,
      description: category.lead,
      hasMenuItem: MENU_ITEMS.filter(
        (item) => item.category === category.id
      ).map((item) => {
        const base: Record<string, unknown> = {
          "@type": "MenuItem",
          name: item.name,
          image: `${siteUrl}${item.image}`,
        };

        if (item.sizes && item.sizes.length > 0) {
          base.offers = item.sizes.map((entry) => ({
            "@type": "Offer",
            name: entry.note ? `${entry.size} (${entry.note})` : entry.size,
            price: entry.price,
            priceCurrency: "PHP",
          }));
        } else if (item.singlePrice !== undefined) {
          base.offers = {
            "@type": "Offer",
            price: item.singlePrice,
            priceCurrency: "PHP",
          };
        }

        return base;
      }),
    })),
  };

  return <JsonLd data={data} />;
}

export function BreadcrumbStructuredData({
  currentName,
  currentPath,
}: {
  currentName: string;
  currentPath: string;
}) {
  const siteUrl = getSiteUrl();

  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: currentName,
        item: `${siteUrl}${currentPath}`,
      },
    ],
  };

  return <JsonLd data={data} />;
}
