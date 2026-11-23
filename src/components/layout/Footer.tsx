import Link from "next/link";
import { NAV_ITEMS, SITE_INFO, VISIT_CTA_LINK } from "@/data/site";
import { PahinaEmblem } from "@/components/ui/PahinaEmblem";

export function Footer() {
  const allLinks = [...NAV_ITEMS, VISIT_CTA_LINK];

  return (
    <footer className="bg-paper text-ink">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="border-t border-soft py-14 sm:py-20">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-8">
            <div className="space-y-3 md:col-span-5">
              <Link
                href="/"
                className="group inline-flex items-center gap-3 text-ink transition-opacity duration-150 hover:opacity-80"
              >
                <PahinaEmblem size={32} showRingText={false} />
                <span className="font-display text-2xl tracking-[0.24em] uppercase">
                  {SITE_INFO.name}
                </span>
              </Link>
              <p className="font-editorial text-xl italic text-ink">
                {SITE_INFO.tagline}
              </p>
              <p className="max-w-xs text-xs leading-relaxed text-ink-muted">
                {SITE_INFO.supportingLines.curiousMinds}
              </p>
            </div>

            <div className="space-y-3 md:col-span-3">
              <h2 className="text-[11px] font-medium tracking-[0.1em] uppercase text-ink-muted">
                Explore
              </h2>
              <ul className="space-y-2">
                {allLinks.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="inline-block font-editorial text-lg italic text-ink-muted underline-offset-4 transition-colors duration-150 hover:text-ink hover:underline"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-3 md:col-span-4">
              <h2 className="text-[11px] font-medium tracking-[0.1em] uppercase text-ink-muted">
                Visit Details
              </h2>
              <dl className="space-y-2 text-xs leading-relaxed text-ink-muted">
                <div>
                  <dt className="font-medium text-ink">Location</dt>
                  <dd>[Café address]</dd>
                </div>
                <div>
                  <dt className="font-medium text-ink">Hours</dt>
                  <dd>[Opening hours]</dd>
                </div>
                <div>
                  <dt className="font-medium text-ink">Contact & Social</dt>
                  <dd>[Phone number] / [Social media URL]</dd>
                </div>
              </dl>
            </div>
          </div>

          <div className="mt-14 flex flex-col gap-2 border-t border-soft pt-6 text-[11px] text-ink-muted sm:flex-row sm:items-center sm:justify-between">
            <p>{SITE_INFO.conceptNotice}</p>
            <p className="shrink-0">
              {SITE_INFO.name} — {SITE_INFO.supportingLines.experience}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
