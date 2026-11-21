import { MarbleSheet } from "@/components/editorial/MarbleSheet";
import { PrimaryButton } from "@/components/ui/PrimaryButton";

export default function NotFound() {
  return (
    <MarbleSheet
      ariaLabelledBy="not-found-heading"
      className="pt-28 pb-16 sm:pt-32 sm:pb-20"
      sheetClassName="px-6 py-16 text-center sm:px-12 sm:py-24"
    >
      <div className="mx-auto max-w-lg">
        <h1
          id="not-found-heading"
          className="font-display text-5xl text-ink sm:text-6xl"
        >
          Page <em className="font-normal italic">turned too far.</em>
        </h1>
        <p className="mt-5 text-base leading-relaxed text-ink-muted">
          The page you are looking for is not on these shelves. Head back to our
          front room or browse the café menu instead.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3.5">
          <PrimaryButton href="/" variant="primary">
            Return Home
          </PrimaryButton>
          <PrimaryButton href="/menu" variant="secondary">
            Explore Our Menu
          </PrimaryButton>
        </div>
      </div>
    </MarbleSheet>
  );
}
