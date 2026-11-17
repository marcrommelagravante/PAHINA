import { Clock, Compass, Globe, Mail, MapPin, Phone } from "lucide-react";
import { SITE_INFO, VISIT_PLACEHOLDERS } from "@/data/site";

const ICON_MAP = {
  address: MapPin,
  hours: Clock,
  phone: Phone,
  email: Mail,
  social: Globe,
  directions: Compass,
} as const;

export function VisitInformation() {
  return (
    <section className="py-12 sm:py-16">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="mb-10 rounded-xl border border-powder bg-powder-soft/75 px-5 py-4 text-sm leading-relaxed text-ink">
          {SITE_INFO.conceptNotice}
        </div>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-7">
            {VISIT_PLACEHOLDERS.map((item) => {
              const Icon =
                ICON_MAP[item.id as keyof typeof ICON_MAP] ?? MapPin;

              return (
                <article
                  key={item.id}
                  className="rounded-xl border border-soft bg-surface-elevated p-5 sm:p-6"
                >
                  <div className="flex items-center gap-2.5 text-ink">
                    <Icon
                      className="h-4 w-4 shrink-0"
                      strokeWidth={1.6}
                      aria-hidden="true"
                    />
                    <h2 className="text-sm font-semibold text-ink">
                      {item.label}
                    </h2>
                  </div>

                  <p className="mt-3 font-display text-2xl text-ink">
                    {item.placeholderValue}
                  </p>

                  <p className="mt-2.5 text-sm leading-relaxed text-ink-muted">
                    {item.helperNote}
                  </p>
                </article>
              );
            })}
          </div>

          <div className="space-y-6 lg:col-span-5">
            <div className="flex aspect-[4/3] flex-col items-center justify-center rounded-2xl border border-dashed border-slate bg-surface-elevated p-8 text-center">
              <MapPin
                className="h-7 w-7 text-ink-muted"
                strokeWidth={1.5}
                aria-hidden="true"
              />
              <h2 className="mt-4 font-display text-2xl text-ink">
                [Map Location Placeholder]
              </h2>
              <p className="mt-2 max-w-xs text-sm leading-relaxed text-ink-muted">
                An interactive neighborhood map and confirmed street pin will be
                embedded once a real café address is supplied.
              </p>
            </div>

            <div className="flex aspect-[4/3] flex-col items-center justify-center rounded-2xl border border-dashed border-slate bg-powder-soft/50 p-8 text-center">
              <Compass
                className="h-7 w-7 text-ink-muted"
                strokeWidth={1.5}
                aria-hidden="true"
              />
              <h2 className="mt-4 font-display text-2xl text-ink">
                [Exterior Storefront Photo Placeholder]
              </h2>
              <p className="mt-2 max-w-xs text-sm leading-relaxed text-ink-muted">
                Reserved for the pastel blue-grey facade, arched glass windows,
                and PAHINA wordmark exterior photograph.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
