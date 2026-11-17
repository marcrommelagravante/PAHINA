import Image from "next/image";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { SITE_INFO } from "@/data/site";

export function HomeHero() {
  return (
    <section className="border-b border-soft bg-paper">
      <div className="mx-auto max-w-6xl px-5 pt-10 pb-14 sm:px-8 sm:pt-14 sm:pb-20 lg:py-20">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="space-y-7 lg:col-span-6">
            <h1 className="font-display text-5xl leading-[1.03] tracking-[-0.025em] text-ink sm:text-6xl lg:text-[4.25rem]">
              Every page
              <br />
              <em className="font-normal italic">holds a story.</em>
            </h1>

            <p className="max-w-lg text-base leading-relaxed text-ink-muted sm:text-lg">
              {SITE_INFO.supportingLines.curiousMinds}
            </p>

            <div className="flex flex-wrap items-center gap-3.5 pt-1">
              <PrimaryButton href="/about" variant="primary">
                Discover PAHINA.
              </PrimaryButton>
              <PrimaryButton href="/menu" variant="secondary">
                Explore Our Menu.
              </PrimaryButton>
            </div>

            <div className="border-t border-soft pt-5">
              <p className="font-editorial text-xl italic text-ink-muted">
                {SITE_INFO.descriptor} — {SITE_INFO.supportingLines.experience}
              </p>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative mx-auto max-w-xl lg:max-w-none">
              <div
                aria-hidden="true"
                className="absolute -right-3 -bottom-3 hidden h-full w-full rounded-2xl bg-powder-soft sm:block lg:-right-4 lg:-bottom-4"
              />
              <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl border border-soft bg-soft">
                <Image
                  src="/images/atmospheric/hero-cafe.jpg"
                  alt="PAHINA boutique neighborhood café interior with muted pastel blue-grey walls, warm oak tables, arched glass windows, and integrated wall bookshelves"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 48vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
