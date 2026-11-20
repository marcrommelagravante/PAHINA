"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import {
  Component,
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { AFTER_HOURS_COPY, AMBIENT_STATUS_CHIPS } from "@/data/afterHours";
import { AfterHoursFallback } from "./AfterHoursFallback";

const AfterHoursCanvas = dynamic(() => import("./AfterHoursCanvas"), {
  ssr: false,
});

function clamp01(v: number) {
  return Math.max(0, Math.min(1, v));
}

function smoothstep(edge0: number, edge1: number, x: number) {
  const t = clamp01((x - edge0) / (edge1 - edge0));
  return t * t * (3 - 2 * t);
}

function detectWebGLSupport(): boolean {
  if (typeof window === "undefined") return true;
  try {
    const canvas = document.createElement("canvas");
    const gl =
      canvas.getContext("webgl2", { failIfMajorPerformanceCaveat: false }) ||
      canvas.getContext("webgl", { failIfMajorPerformanceCaveat: false }) ||
      canvas.getContext("experimental-webgl");
    return Boolean(gl);
  } catch {
    return false;
  }
}

class CanvasErrorBoundary extends Component<
  { onError: () => void; children: ReactNode },
  { hasError: boolean }
> {
  constructor(props: { onError: () => void; children: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch() {
    this.props.onError();
  }

  render() {
    if (this.state.hasError) return null;
    return this.props.children;
  }
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

const CHIP_POSITIONS: Record<string, string> = {
  "espresso-pulled":
    "left-4 top-[69%] sm:left-[10%] sm:top-[62%] lg:left-[14%] lg:top-[61%]",
  "window-seat-free":
    "right-4 top-[75%] sm:right-[10%] sm:top-[56%] lg:right-[15%] lg:top-[55%]",
  "book-returned":
    "left-1/2 -translate-x-1/2 bottom-[6%] sm:left-[24%] sm:translate-x-0 sm:bottom-[13%] lg:left-[28%] lg:bottom-[15%]",
};

function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(
    (onStoreChange) => {
      const mq = window.matchMedia(query);
      mq.addEventListener("change", onStoreChange);
      return () => mq.removeEventListener("change", onStoreChange);
    },
    () => window.matchMedia(query).matches,
    () => false
  );
}

const emptySubscribe = () => () => {};

function useClientSnapshot<T>(getClient: () => T, serverValue: T): T {
  return useSyncExternalStore(emptySubscribe, getClient, () => serverValue);
}

/**
 * PAHINA 3-act cinematic scroll hero in PAHINA's original Paper White,
 * Deep Ink Grey, and Powder Blue palette:
 * - Act 1: Skylight intro tilt -> sunlit Paper White marble gallery, sculpted plinth, Deep Ink Grey linen book
 * - Act 2: Rising rotating espresso crema horizon with Powder Blue rim, frosted Paper glass chips & vertical skylight beam
 * - Act 3: 3D Paper White exhibition corridor of PAHINA photos & 180°-turning hardcover book revealing back cover
 * - Seamless architectural transition directly into the Paper White homepage sections below.
 */
export function AfterHoursHero() {
  const stageRef = useRef<HTMLDivElement>(null);
  const targetScrollRef = useRef(0);
  const introProgressRef = useRef(0);

  const act1OverlayRef = useRef<HTMLDivElement>(null);
  const act2OverlayRef = useRef<HTMLDivElement>(null);
  const act3OverlayRef = useRef<HTMLDivElement>(null);
  const chipRefs = useRef<(HTMLDivElement | null)[]>([]);

  const mounted = useClientSnapshot(() => true, false);
  const webglSupported = useClientSnapshot(detectWebGLSupport, true);
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const isMobile = useMediaQuery("(max-width: 767px)");
  const [webglRuntimeError, setWebglRuntimeError] = useState(false);

  const webglFailed = !webglSupported || webglRuntimeError;

  const handleIntroProgress = useCallback((t: number) => {
    introProgressRef.current = t;
  }, []);

  const handleWebGLError = useCallback(() => {
    setWebglRuntimeError(true);
  }, []);

  const scrollToActProgress = useCallback((targetP: number) => {
    const stage = stageRef.current;
    if (!stage) return;
    const scrollable = Math.max(1, stage.offsetHeight - window.innerHeight);
    const stageTop = stage.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({
      top: stageTop + scrollable * targetP,
      behavior: "smooth",
    });
  }, []);

  useEffect(() => {
    if (!mounted || reducedMotion || webglFailed) return;

    let rafId = 0;
    const startTime = performance.now();

    const readScrollProgress = () => {
      const stage = stageRef.current;
      if (!stage) return 0;
      const rect = stage.getBoundingClientRect();
      const scrollable = Math.max(1, stage.offsetHeight - window.innerHeight);
      return clamp01(-rect.top / scrollable);
    };

    const tick = (now: number) => {
      const p = readScrollProgress();
      targetScrollRef.current = p;

      const intro = introProgressRef.current;
      const elapsedSec = (now - startTime) * 0.001;

      // --- ACT 1 OVERLAY ---
      if (act1OverlayRef.current) {
        const introFade = smoothstep(0.32, 0.85, intro);
        const scrollOut = 1 - smoothstep(0.11, 0.24, p);
        const alpha1 = introFade * scrollOut;
        const shiftY = (1 - introFade) * 18 - smoothstep(0.11, 0.24, p) * 26;

        act1OverlayRef.current.style.opacity = alpha1.toFixed(3);
        act1OverlayRef.current.style.transform = `translate3d(0, ${shiftY.toFixed(1)}px, 0)`;
        act1OverlayRef.current.style.pointerEvents = alpha1 > 0.2 ? "auto" : "none";
      }

      // --- ACT 2 OVERLAY ---
      const act2In = smoothstep(0.31, 0.41, p);
      const act2Out = 1 - smoothstep(0.55, 0.62, p);
      const alpha2 = act2In * act2Out;

      if (act2OverlayRef.current) {
        const shiftY = (1 - act2In) * 24 - smoothstep(0.55, 0.62, p) * 22;
        act2OverlayRef.current.style.opacity = alpha2.toFixed(3);
        act2OverlayRef.current.style.transform = `translate3d(0, ${shiftY.toFixed(1)}px, 0)`;
        act2OverlayRef.current.style.pointerEvents = alpha2 > 0.2 ? "auto" : "none";
      }

      // --- ACT 2 FLOATING FROSTED PAPER GLASS CHIPS ---
      const act2Local = clamp01((p - 0.31) / 0.28);
      AMBIENT_STATUS_CHIPS.forEach((chip, idx) => {
        const el = chipRefs.current[idx];
        if (!el) return;

        const chipIn = smoothstep(chip.appearAt, chip.appearAt + 0.22, act2Local);
        const chipAlpha = chipIn * act2Out;
        const floatY =
          Math.sin(elapsedSec * (0.55 + idx * 0.14) + idx * 1.9) *
          (6.5 * chip.depth);
        const floatX =
          Math.cos(elapsedSec * (0.38 + idx * 0.11) + idx * 1.3) *
          (4.0 * chip.depth);
        const scrollDrift = (0.5 - act2Local) * 22 * chip.depth;
        const scale = 0.94 + chip.depth * 0.06;

        el.style.opacity = chipAlpha.toFixed(3);
        el.style.transform = `translate3d(${floatX.toFixed(1)}px, ${(floatY + scrollDrift).toFixed(1)}px, 0) scale(${scale.toFixed(3)})`;
      });

      // --- ACT 3 OVERLAY ---
      if (act3OverlayRef.current) {
        const act3In = smoothstep(0.68, 0.78, p);
        const act3Out = 1 - smoothstep(0.955, 1.0, p);
        const alpha3 = act3In * act3Out;
        const shiftY = (1 - act3In) * 22;

        act3OverlayRef.current.style.opacity = alpha3.toFixed(3);
        act3OverlayRef.current.style.transform = `translate3d(0, ${shiftY.toFixed(1)}px, 0)`;
        act3OverlayRef.current.style.pointerEvents = alpha3 > 0.2 ? "auto" : "none";
      }

      rafId = window.requestAnimationFrame(tick);
    };

    rafId = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(rafId);
  }, [mounted, reducedMotion, webglFailed]);

  if (reducedMotion || webglFailed) {
    return <AfterHoursFallback reducedMotion={reducedMotion} />;
  }

  return (
    <div
      id="after-hours-stage"
      className="relative border-b border-soft bg-paper text-ink"
    >
      {/* Scroll runway: ~350vh mobile, ~500vh desktop */}
      <div
        ref={stageRef}
        className="relative h-[350vh] w-full md:h-[500vh]"
      >
        {/* Sticky full-viewport 3D Paper White gallery stage */}
        <div className="sticky top-0 h-[100svh] w-full overflow-hidden bg-paper">
          <div className="absolute inset-0 z-0" aria-hidden="true">
            {mounted && (
              <CanvasErrorBoundary onError={handleWebGLError}>
                <AfterHoursCanvas
                  targetScrollRef={targetScrollRef}
                  onIntroProgress={handleIntroProgress}
                  onWebGLError={handleWebGLError}
                  isMobile={isMobile}
                />
              </CanvasErrorBoundary>
            )}
          </div>

          {/* Subtle Paper White top wash keeps the floating navbar legible */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 z-10 h-28 bg-gradient-to-b from-paper/82 via-paper/28 to-transparent"
          />

          {/* ACT 1 OVERLAY — Sunlit Plinth Hero */}
          <section
            aria-label="PAHINA — Every page holds a story"
            className="pointer-events-none absolute inset-0 z-20"
          >
            <div
              ref={act1OverlayRef}
              style={{ opacity: 0 }}
              className="mx-auto flex h-full max-w-6xl flex-col items-center justify-between px-5 pt-22 pb-10 text-center sm:px-8 sm:pt-22 sm:pb-12"
            >
              <h1 className="font-display text-[48px] leading-[1.0] font-normal tracking-[-0.008em] text-ink uppercase sm:text-[64px]">
                {AFTER_HOURS_COPY.act1.line1}
                <br />
                {AFTER_HOURS_COPY.act1.line2}
              </h1>

              <div className="pointer-events-auto">
                <Link
                  href={AFTER_HOURS_COPY.act1.ctaHref}
                  onFocus={() => scrollToActProgress(0.02)}
                  className="inline-flex h-[52px] items-center justify-center rounded-full bg-ink px-6 text-base font-medium tracking-[0.01em] text-paper transition-[background-color,transform] duration-300 ease-[var(--ease-cinematic)] hover:bg-[#2F353A] active:scale-[0.98]"
                >
                  {AFTER_HOURS_COPY.act1.ctaLabel}
                </Link>
              </div>
            </div>
          </section>

          {/* ACT 2 OVERLAY — Crema Horizon & Frosted Paper Glass Status Chips */}
          <section
            aria-label="A quiet place for curious minds"
            className="pointer-events-none absolute inset-0 z-20"
          >
            <div
              ref={act2OverlayRef}
              style={{ opacity: 0 }}
              className="mx-auto flex h-full max-w-6xl flex-col items-center px-5 pt-22 text-center sm:px-8 sm:pt-28 lg:pt-30"
            >
              <h2 className="font-display text-[40px] leading-[1.0] font-normal tracking-[-0.008em] text-ink uppercase sm:text-[64px]">
                {AFTER_HOURS_COPY.act2.line1}
                <br />
                {AFTER_HOURS_COPY.act2.line2}
              </h2>

              <p className="mt-4 max-w-xl text-base leading-[1.3] font-medium text-ink-muted sm:mt-6 sm:text-[18px]">
                {AFTER_HOURS_COPY.act2.body}
              </p>

              <div className="pointer-events-auto mt-6 sm:mt-8">
                <Link
                  href={AFTER_HOURS_COPY.act2.ctaHref}
                  onFocus={() => scrollToActProgress(0.46)}
                  className="inline-flex h-[52px] items-center justify-center rounded-full bg-ink px-6 text-base font-medium tracking-[0.01em] text-paper transition-[background-color,transform] duration-300 ease-[var(--ease-cinematic)] hover:bg-[#2F353A] active:scale-[0.98]"
                >
                  {AFTER_HOURS_COPY.act2.ctaLabel}
                </Link>
              </div>
            </div>

            {/* Frosted Elevated Paper glass chips drifting around the rising crema dome */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 mx-auto max-w-6xl"
            >
              {AMBIENT_STATUS_CHIPS.map((chip, idx) => (
                <div
                  key={chip.id}
                  ref={(el) => {
                    chipRefs.current[idx] = el;
                  }}
                  style={{ opacity: 0 }}
                  className={`absolute ${CHIP_POSITIONS[chip.id] ?? ""}`}
                >
                  <span className="inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-ink/12 bg-[#FAF8F3]/84 px-4 py-2 text-[13px] font-medium tracking-[0.01em] text-ink backdrop-blur-md">
                    <ConcentricRingIcon />
                    <span>{chip.label}</span>
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* ACT 3 OVERLAY — Daylight 3D Gallery & Turning Book */}
          <section
            aria-label="The book is only the beginning"
            className="pointer-events-none absolute inset-0 z-20"
          >
            <div
              ref={act3OverlayRef}
              style={{ opacity: 0 }}
              className="mx-auto flex h-full max-w-6xl flex-col items-center justify-between px-5 pt-22 pb-10 text-center sm:px-8 sm:pt-24 sm:pb-12"
            >
              <h2 className="max-w-4xl font-display text-[42px] leading-[1.0] font-normal tracking-[-0.008em] text-ink uppercase sm:text-[52px]">
                {AFTER_HOURS_COPY.act3.headline}
              </h2>

              <div className="pointer-events-auto">
                <Link
                  href={AFTER_HOURS_COPY.act3.ctaHref}
                  onFocus={() => scrollToActProgress(0.84)}
                  className="inline-flex h-[52px] items-center justify-center rounded-full bg-powder px-6 text-base font-medium tracking-[0.01em] text-ink transition-[background-color,transform] duration-300 ease-[var(--ease-cinematic)] hover:bg-[#A6C2D6] active:scale-[0.98]"
                >
                  {AFTER_HOURS_COPY.act3.ctaLabel}
                </Link>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Seamless gentle Paper White -> Elevated Paper handoff into "A place between pages." */}
      <div
        aria-hidden="true"
        className="h-16 w-full sm:h-20"
        style={{
          background: "linear-gradient(180deg, #F4F1EA 0%, #FAF8F3 100%)",
        }}
      />
    </div>
  );
}
