import { PrimaryButton } from "@/components/ui/PrimaryButton";

export default function NotFound() {
  return (
    <section className="flex min-h-[60vh] items-center justify-center bg-paper px-5 py-20 sm:px-8">
      <div className="max-w-lg text-center">
        <h1 className="font-display text-5xl text-ink sm:text-6xl">
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
    </section>
  );
}
