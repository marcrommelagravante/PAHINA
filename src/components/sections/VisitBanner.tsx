import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { Reveal } from "@/components/ui/Reveal";
import { PahinaEmblem } from "@/components/ui/PahinaEmblem";
import { cn } from "@/lib/utils";

interface VisitBannerProps {
  heading?: React.ReactNode;
  description?: string;
  ctaLabel?: string;
  ctaHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  className?: string;
}

export function VisitBanner({
  heading = (
    <>
      We saved you <em className="font-normal italic">a seat.</em>
    </>
  ),
  description = "Find our neighborhood location placeholders, concept hours, and contact notes before your next unhurried afternoon.",
  ctaLabel = "Visit Us",
  ctaHref = "/visit",
  secondaryLabel = "Explore Our Menu",
  secondaryHref = "/menu",
  className,
}: VisitBannerProps) {
  return (
    <section className={cn("bg-paper py-16 sm:py-24", className)}>
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <div className="rounded-3xl border border-powder bg-powder-soft/75 px-6 py-12 text-center sm:px-12 sm:py-16">
            <div className="mb-5 flex justify-center">
              <PahinaEmblem size={44} showRingText />
            </div>
            <h2 className="font-display text-3xl leading-[1.1] tracking-[-0.02em] text-ink sm:text-5xl">
              {heading}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-ink-muted sm:text-lg">
              {description}
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3.5">
              <PrimaryButton href={ctaHref} variant="primary">
                {ctaLabel}
              </PrimaryButton>
              {secondaryLabel && secondaryHref && (
                <PrimaryButton href={secondaryHref} variant="secondary">
                  {secondaryLabel}
                </PrimaryButton>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
