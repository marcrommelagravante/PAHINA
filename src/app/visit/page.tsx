import type { Metadata } from "next";
import { Clock, Compass, Globe, Mail, MapPin, Phone } from "lucide-react";
import { MarbleSheet } from "@/components/editorial/MarbleSheet";
import { FlippableCallingCard } from "@/components/editorial/FlippableCallingCard";
import { VisitInformation } from "@/components/sections/VisitInformation";
import { VISIT_PLACEHOLDERS } from "@/data/site";

export const metadata: Metadata = {
  title: "Visit Us",
  description:
    "View PAHINA's concept location, opening hours, contact, and social media placeholders ready for final neighborhood launch details.",
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
    <>
      {/* Calling card / postcard hero resting on honed marble */}
      <MarbleSheet
        ariaLabelledBy="visit-hero-heading"
        className="pt-24 pb-10 sm:pt-28 sm:pb-14"
        sheetClassName="px-6 py-10 sm:px-12 sm:py-14 lg:px-0 lg:py-0"
      >
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-0 lg:divide-x lg:divide-soft">
          {/* Interactive 3D Flippable Calling Card */}
          <div className="lg:col-span-5 lg:px-12 lg:py-14">
            <FlippableCallingCard />
          </div>

          {/* Printed hairline colophon of the 6 honest placeholders */}
          <div className="border-t border-soft pt-8 lg:col-span-7 lg:border-t-0 lg:px-14 lg:py-14">
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
                    <dt className="flex items-center gap-2 text-xs font-medium tracking-[0.04em] text-ink-muted sm:col-span-4">
                      <Icon
                        className="h-3.5 w-3.5 shrink-0 text-ink"
                        strokeWidth={1.6}
                        aria-hidden="true"
                      />
                      <span>{item.label}</span>
                    </dt>
                    <dd className="sm:col-span-8">
                      <p className="font-display text-xl text-ink">
                        {item.placeholderValue}
                      </p>
                      <p className="mt-1 text-xs leading-relaxed text-ink-muted">
                        {item.helperNote}
                      </p>
                    </dd>
                  </div>
                );
              })}
            </dl>
          </div>
        </div>
      </MarbleSheet>

      <VisitInformation />
    </>
  );
}
