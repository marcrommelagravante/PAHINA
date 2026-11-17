import Link from "next/link";
import { NAV_ITEMS, SITE_INFO, VISIT_CTA_LINK } from "@/data/site";

export function Footer() {
  const allLinks = [...NAV_ITEMS, VISIT_CTA_LINK];

  return (
    <footer className="border-t border-soft bg-soft/45 text-ink">
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-5 space-y-4">
            <Link
              href="/"
              className="inline-block font-display text-3xl tracking-[0.22em] text-ink uppercase"
            >
              {SITE_INFO.name}
            </Link>
            <p className="text-sm font-medium text-ink-muted">
              {SITE_INFO.descriptor}
            </p>
            <p className="font-editorial text-2xl italic text-ink">
              {SITE_INFO.tagline}
            </p>
            <p className="max-w-sm text-sm leading-relaxed text-ink-muted">
              {SITE_INFO.supportingLines.curiousMinds}
            </p>
          </div>

          <div className="md:col-span-3 space-y-4">
            <h2 className="text-sm font-semibold text-ink">Explore</h2>
            <ul className="space-y-2.5 text-sm">
              {allLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="inline-block py-0.5 text-ink-muted underline-offset-4 transition-colors duration-150 hover:text-ink hover:underline"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4 space-y-4">
            <h2 className="text-sm font-semibold text-ink">Visit Details</h2>
            <dl className="space-y-2.5 text-sm text-ink-muted">
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

        <div className="mt-12 flex flex-col gap-3 border-t border-soft pt-6 text-xs text-ink-muted sm:flex-row sm:items-center sm:justify-between">
          <p>{SITE_INFO.conceptNotice}</p>
          <p className="shrink-0">
            {SITE_INFO.name} — {SITE_INFO.supportingLines.experience}
          </p>
        </div>
      </div>
    </footer>
  );
}
