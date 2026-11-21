import { EditorialButton } from "@/components/home/EditorialButton";

export default function NotFound() {
  return (
    <section
      aria-labelledby="not-found-heading"
      className="flex min-h-[78svh] items-center justify-center bg-paper px-5 pt-28 pb-20 sm:px-8"
    >
      <div className="max-w-lg text-center">
        <h1
          id="not-found-heading"
          className="font-display text-5xl leading-[1.04] tracking-[-0.025em] text-ink sm:text-6xl"
        >
          Page <em className="font-normal italic">turned too far.</em>
        </h1>
        <p className="mx-auto mt-5 max-w-sm text-[13px] leading-[1.7] text-ink-muted">
          The page you are looking for is not on these shelves. Head back to our
          front room or browse the café menu instead.
        </p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
          <EditorialButton href="/" variant="solid">
            Return Home
          </EditorialButton>
          <EditorialButton href="/menu" variant="outline">
            Explore Menu
          </EditorialButton>
        </div>
      </div>
    </section>
  );
}
