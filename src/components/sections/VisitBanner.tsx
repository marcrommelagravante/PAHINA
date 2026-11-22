import { EditorialButton } from "@/components/home/EditorialButton";
import { MaskedHeading } from "@/components/editorial/MaskedHeading";
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
  secondaryLabel = "Explore Menu",
  secondaryHref = "/menu",
  className,
}: VisitBannerProps) {
  return (
    <section className={cn("bg-paper pt-16 pb-24 sm:pt-24 sm:pb-32", className)}>
      <div className="mx-auto max-w-3xl px-5 text-center sm:px-8">
        <div className="mb-6 flex justify-center">
          <PahinaEmblem size={36} showRingText={false} />
        </div>
        <MaskedHeading
          lines={[<span key="l1">{heading}</span>]}
          className="font-display text-4xl leading-[1.06] tracking-[-0.025em] text-ink sm:text-5xl lg:text-6xl"
        />
        <p className="mx-auto mt-5 max-w-md text-[13px] leading-[1.7] text-ink-muted">
          {description}
        </p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
          <EditorialButton href={ctaHref} variant="solid">
            {ctaLabel}
          </EditorialButton>
          {secondaryLabel && secondaryHref && (
            <EditorialButton href={secondaryHref} variant="outline">
              {secondaryLabel}
            </EditorialButton>
          )}
        </div>
      </div>
    </section>
  );
}
