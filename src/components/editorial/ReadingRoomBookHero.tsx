import Image from "next/image";
import { MaskedHeading } from "@/components/editorial/MaskedHeading";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { EDITORIAL_IMAGES } from "@/data/editorialImages";

const HERO_JUMP_LINKS = [
  {
    href: "#inside-the-room",
    label: "Inside the room",
    meta: "Seating, daylight & spacing",
  },
  {
    href: "#curated-shelves",
    label: "Curated shelves",
    meta: "6 genres",
  },
  {
    href: "#how-it-works",
    label: "How it works",
    meta: "4 simple steps",
  },
] as const;

export function ReadingRoomBookHero() {
  return (
    <section
      aria-labelledby="reading-room-hero-heading"
      className="overflow-x-clip bg-paper pt-28 pb-16 sm:pt-36 sm:pb-24"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-12">
          {/* Left column: editorial introduction & page index */}
          <div className="space-y-8 lg:col-span-6">
            <div className="space-y-6">
              <MaskedHeading
                as="h1"
                id="reading-room-hero-heading"
                immediate
                delay={0.18}
                lines={[
                  "A quiet room",
                  "made for",
                  <em key="l3" className="font-normal italic">
                    slow pages.
                  </em>,
                ]}
                className="font-display text-[clamp(3.2rem,6vw,5.25rem)] leading-[1.03] tracking-[-0.03em] text-ink"
              />
              <Reveal delay={0.34} y={12}>
                <p className="max-w-md text-[13.5px] leading-[1.72] text-ink-muted">
                  Step inside a neighborhood reading room anchored by two 5-layer
                  wooden bookshelves, tall arched daylight windows, and many sets
                  of warm oak tables, upholstered chairs, and table-side power
                  outlets. Everything on our shelves is open to read beside your
                  cup—no library card or sign-up required.
                </p>
              </Reveal>
            </div>

            {/* Clean hairline index of the Reading Room page */}
            <nav aria-label="Reading Room sections" className="max-w-md">
              <RevealGroup
                as="ul"
                stagger={0.055}
                delayChildren={0.4}
                className="divide-y divide-soft border-y border-soft"
              >
                {HERO_JUMP_LINKS.map((item) => (
                  <RevealItem as="li" key={item.href} y={10}>
                    <a
                      href={item.href}
                      className="group flex items-baseline justify-between gap-4 py-3 text-ink transition-[color,transform] duration-150 ease-[var(--ease-out)] active:scale-[0.99] hover:text-ink-muted"
                    >
                      <span className="hover-nudge-x font-display text-xl">
                        {item.label}
                      </span>
                      <span className="text-[11px] font-medium tracking-[0.06em] text-ink-muted">
                        {item.meta}
                      </span>
                    </a>
                  </RevealItem>
                ))}
              </RevealGroup>
            </nav>

            <Reveal delay={0.54} y={10}>
              <div className="flex flex-wrap gap-10 text-[10px] leading-[1.5] tracking-[0.14em] uppercase text-ink-muted">
                <div>
                  <p>Shelves</p>
                  <p className="font-medium text-ink">
                    Two 5-Layer Bookcases (6 Genres)
                  </p>
                </div>
                <div>
                  <p>Seating & Power</p>
                  <p className="font-medium text-ink">
                    Tables, Chairs & Outlets
                  </p>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right column: crisp architectural photograph of PAHINA's single-room café & reading room */}
          <Reveal delay={0.28} y={18} className="lg:col-span-6">
            <figure className="group">
              <div className="relative mx-auto aspect-[4/5] w-full max-w-[490px] overflow-hidden rounded-[2px] border border-soft bg-surface-elevated lg:ml-auto lg:mr-0">
                <Image
                  src={EDITORIAL_IMAGES.readingRoomHero}
                  alt="Wide architectural view inside PAHINA's single-room café and reading room featuring a vertical oak-slat espresso and pastry counter with warm under-glow on the right, two tall oak bookshelves along the pastel Powder Blue back wall, herringbone oak floors, and a long oatmeal-linen banquette with warm oak tables, chairs, and flush wall outlets on the left"
                  fill
                  priority
                  sizes="(max-width: 1024px) 92vw, 490px"
                  className="hover-image-zoom object-cover"
                />
              </div>
              <figcaption className="mx-auto mt-3.5 max-w-[490px] font-editorial text-base italic text-ink-muted lg:ml-auto lg:mr-0">
                Soft daylight across our warm oak tables, espresso counter, and
                side-by-side bookshelves—all inside one calm, uncrowded room.
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
