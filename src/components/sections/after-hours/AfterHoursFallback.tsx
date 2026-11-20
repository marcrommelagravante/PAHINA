"use client";

import Image from "next/image";
import Link from "next/link";
import {
  AFTER_HOURS_COPY,
  AFTER_HOURS_STILLS,
  AMBIENT_STATUS_CHIPS,
} from "@/data/afterHours";

interface AfterHoursFallbackProps {
  reducedMotion?: boolean;
}

function ConcentricRingIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className="shrink-0 text-ink"
    >
      <circle
        cx="8"
        cy="8"
        r="6.25"
        stroke="#8999A6"
        strokeWidth="1.25"
      />
      <circle cx="8" cy="8" r="2.2" fill="currentColor" />
    </svg>
  );
}

/**
 * Static composed Paper White fallback for `prefers-reduced-motion: reduce` and non-WebGL devices:
 * Three calm sunlit gallery frames in PAHINA's original Paper White, Deep Ink Grey, and Powder Blue palette.
 */
export function AfterHoursFallback({
  reducedMotion = false,
}: AfterHoursFallbackProps) {
  return (
    <div
      id="after-hours-stage"
      className="relative border-b border-soft bg-paper text-ink"
    >
      {/* Act 1 — Sunlit Plinth Gallery */}
      <section
        aria-label="PAHINA — Every page holds a story"
        className="relative flex min-h-[100svh] flex-col items-center justify-between overflow-hidden border-b border-soft px-5 pt-28 pb-14 sm:px-8 sm:pt-32 sm:pb-16"
      >
        <Image
          src={AFTER_HOURS_STILLS.act1.src}
          alt={AFTER_HOURS_STILLS.act1.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-paper/75 via-transparent to-paper/65"
        />

        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <h1 className="font-display text-[48px] leading-[1.0] font-normal tracking-[-0.008em] text-ink uppercase sm:text-[64px]">
            {AFTER_HOURS_COPY.act1.line1}
            <br />
            {AFTER_HOURS_COPY.act1.line2}
          </h1>
        </div>

        <div className="relative z-10 pt-8">
          <Link
            href={AFTER_HOURS_COPY.act1.ctaHref}
            className={
              reducedMotion
                ? "inline-flex h-[52px] items-center justify-center rounded-full bg-ink px-6 text-base font-medium text-paper hover:bg-[#2F353A]"
                : "inline-flex h-[52px] items-center justify-center rounded-full bg-ink px-6 text-base font-medium text-paper transition-colors duration-300 hover:bg-[#2F353A]"
            }
          >
            {AFTER_HOURS_COPY.act1.ctaLabel}
          </Link>
        </div>
      </section>

      {/* Act 2 — Crema Horizon & Static Status Chips */}
      <section
        aria-label="A quiet place for curious minds"
        className="relative flex min-h-[96svh] flex-col items-center justify-between overflow-hidden border-b border-soft px-5 py-[120px] sm:px-8"
      >
        <Image
          src={AFTER_HOURS_STILLS.act2.src}
          alt={AFTER_HOURS_STILLS.act2.alt}
          fill
          sizes="100vw"
          className="object-cover object-bottom"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-paper/90 via-paper/20 to-transparent"
        />

        <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center text-center">
          <h2 className="font-display text-[44px] leading-[1.0] font-normal tracking-[-0.008em] text-ink uppercase sm:text-[64px]">
            {AFTER_HOURS_COPY.act2.line1}
            <br />
            {AFTER_HOURS_COPY.act2.line2}
          </h2>
          <p className="mt-6 max-w-xl text-base leading-[1.3] font-medium text-ink-muted sm:text-[18px]">
            {AFTER_HOURS_COPY.act2.body}
          </p>
          <div className="mt-8">
            <Link
              href={AFTER_HOURS_COPY.act2.ctaHref}
              className="inline-flex h-[52px] items-center justify-center rounded-full bg-ink px-6 text-base font-medium text-paper hover:bg-[#2F353A]"
            >
              {AFTER_HOURS_COPY.act2.ctaLabel}
            </Link>
          </div>
        </div>

        <div className="relative z-10 mt-14 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          {AMBIENT_STATUS_CHIPS.map((chip) => (
            <span
              key={chip.id}
              className="inline-flex items-center gap-2 rounded-full border border-ink/12 bg-surface-elevated/88 px-4 py-2 text-[13px] font-medium text-ink backdrop-blur-md"
            >
              <ConcentricRingIcon />
              <span>{chip.label}</span>
            </span>
          ))}
        </div>
      </section>

      {/* Act 3 — Daylight 3D Gallery Still */}
      <section
        aria-label="The book is only the beginning"
        className="relative flex min-h-[96svh] flex-col items-center justify-between overflow-hidden px-5 py-24 sm:px-8 sm:py-28"
      >
        <Image
          src={AFTER_HOURS_STILLS.act3.src}
          alt={AFTER_HOURS_STILLS.act3.alt}
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-paper/80 via-transparent to-paper/80"
        />

        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <h2 className="font-display text-[42px] leading-[1.0] font-normal tracking-[-0.008em] text-ink uppercase sm:text-[52px]">
            {AFTER_HOURS_COPY.act3.headline}
          </h2>
        </div>

        <div className="relative z-10 pt-8">
          <Link
            href={AFTER_HOURS_COPY.act3.ctaHref}
            className="inline-flex h-[52px] items-center justify-center rounded-full bg-powder px-6 text-base font-medium text-ink hover:bg-[#A6C2D6]"
          >
            {AFTER_HOURS_COPY.act3.ctaLabel}
          </Link>
        </div>
      </section>
    </div>
  );
}
