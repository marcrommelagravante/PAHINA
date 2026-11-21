import type { Metadata } from "next";
import { Clock, Compass, Globe, Mail, MapPin, Phone } from "lucide-react";
import { FlippableCallingCard } from "@/components/editorial/FlippableCallingCard";
import { VisitInformation } from "@/components/sections/VisitInformation";
import { BreadcrumbStructuredData } from "@/components/seo/StructuredData";
import { VISIT_PLACEHOLDERS } from "@/data/site";
import { DEFAULT_OG_IMAGES } from "@/lib/siteUrl";

export const metadata: Metadata = {
  title: "Visit Us",
  description:
    "View PAHINA's concept location, opening hours, contact, and social media placeholders ready for final neighborhood launch details.",
  alternates: {
    canonical: "/visit",
  },
  openGraph: {
    title: "Visit Us | PAHINA",
    description:
      "Plan a visit to PAHINA—structured location, hours, and contact placeholders ready for neighborhood launch details.",
    url: "/visit",
    images: DEFAULT_OG_IMAGES,
  },
};

const ICON_MAP = {
  address: MapPin,
  hours: Clock,
  phone: Phone,
  email: Mail,
  social: Globe,
  directions: Compass,
} as const;

export default function VisitPage() {
  return (
    <div className="bg-paper">
      <BreadcrumbStructuredData currentName="Visit Us" currentPath="/visit" />

      {/* Open Paper White Calling Card + Visit Directory spread */}
      <section
        aria-labelledby="visit-hero-heading"
        className="overflow-x-clip bg-paper pt-28 pb-16 sm:pt-36 sm:pb-24"
      >
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-0 lg:divide-x lg:divide-soft">
            <div className="lg:col-span-5 lg:pr-12">
              <FlippableCallingCard />
            </div>

            <div className="border-t border-soft pt-10 lg:col-span-7 lg:border-t-0 lg:pt-0 lg:pl-14">
              <p className="font-editorial text-lg italic text-ink-muted">
                Visit Directory
              </p>
              <dl className="mt-4 divide-y divide-soft border-y border-soft">
                {VISIT_PLACEHOLDERS.map((item) => {
                  const Icon =
                    ICON_MAP[item.id as keyof typeof ICON_MAP] ?? MapPin;

                  return (
                    <div
                      key={item.id}
                      className="grid grid-cols-1 gap-2 py-4 sm:grid-cols-12 sm:items-baseline sm:gap-4"
                    >
                      <dt className="flex items-center gap-2 text-[10.5px] font-medium tracking-[0.1em] uppercase text-ink-muted sm:col-span-4">
                        <Icon
                          className="h-3.5 w-3.5 shrink-0 text-ink"
                          strokeWidth={1.5}
                          aria-hidden="true"
                        />
                        <span>{item.label}</span>
                      </dt>
                      <dd className="sm:col-span-8">
                        <p className="font-display text-xl text-ink">
                          {item.placeholderValue}
                        </p>
                        <p className="mt-1 text-[12px] leading-relaxed text-ink-muted">
                          {item.helperNote}
                        </p>
                      </dd>
                    </div>
                  );
                })}
              </dl>
            </div>
          </div>
        </div>
      </section>

      <VisitInformation />
    </div>
  );
}
