import { ImageFeature } from "@/components/ui/ImageFeature";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ATMOSPHERE_GALLERY_IMAGES, SITE_INFO } from "@/data/site";

export function AtmosphereGallery() {
  const [readingCorner, morningPour, openPages, afternoonGlass] =
    ATMOSPHERE_GALLERY_IMAGES;

  return (
    <section
      aria-labelledby="atmosphere-gallery-heading"
      className="border-b border-soft bg-paper py-16 sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div id="atmosphere-gallery-heading">
          <SectionHeading
            title={
              <>
                Quiet corners and{" "}
                <em className="font-normal italic">unhurried hours.</em>
              </>
            }
            description="Pastel blue-grey walls, warm oak tables, and daylight framed for reading—not crowded floorplans."
          />
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-12 md:gap-7">
          <Reveal className="md:col-span-7">
            <ImageFeature
              src={readingCorner.src}
              alt={readingCorner.alt}
              caption={readingCorner.caption}
              aspect="landscape"
              sizes="(max-width: 768px) 100vw, 58vw"
            />
          </Reveal>

          <Reveal className="md:col-span-5" delay={0.05}>
            <ImageFeature
              src={morningPour.src}
              alt={morningPour.alt}
              caption={morningPour.caption}
              aspect="portrait"
              sizes="(max-width: 768px) 100vw, 40vw"
            />
          </Reveal>

          <Reveal className="md:col-span-5" delay={0.05}>
            <ImageFeature
              src={openPages.src}
              alt={openPages.alt}
              caption={openPages.caption}
              aspect="portrait"
              sizes="(max-width: 768px) 100vw, 40vw"
            />
          </Reveal>

          <Reveal className="md:col-span-7" delay={0.1}>
            <div className="grid h-full grid-cols-1 gap-6 sm:grid-cols-12 sm:items-end">
              <div className="sm:col-span-7">
                <ImageFeature
                  src={afternoonGlass.src}
                  alt={afternoonGlass.alt}
                  caption={afternoonGlass.caption}
                  aspect="portrait"
                  sizes="(max-width: 768px) 100vw, 32vw"
                />
              </div>

              <div className="flex flex-col justify-between rounded-2xl border border-powder bg-powder-soft p-6 sm:col-span-5 sm:p-7">
                <p className="font-editorial text-2xl leading-snug italic text-ink sm:text-3xl">
                  “{SITE_INFO.supportingLines.experience}”
                </p>
                <p className="mt-6 text-sm leading-relaxed text-ink-muted">
                  Small tables for individuals and pairs, wide walkways, and
                  books kept close without crowding your space.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
