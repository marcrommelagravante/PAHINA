"use client";

import { Canvas } from "@react-three/fiber";
import {
  Component,
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import * as THREE from "three";
import { cn } from "@/lib/utils";

interface Viewport3DCanvasProps {
  children: ReactNode;
  fallback: ReactNode;
  className?: string;
  cameraPosition?: [number, number, number];
  fov?: number;
  ariaLabel?: string;
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

class SceneErrorBoundary extends Component<
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

/**
 * Viewport-gated Three.js Canvas wrapper:
 * - Mounts an active WebGL context only when the container is near the viewport
 *   (IntersectionObserver rootMargin: 320px), preventing WebGL context exhaustion
 *   across multi-section 3D pages.
 * - Transparent background (alpha: true) composited cleanly over Paper White / Powder Soft surfaces.
 * - Automatically renders the static Paper White editorial `fallback` when
 *   `prefers-reduced-motion: reduce` is active or WebGL is unavailable.
 */
export function Viewport3DCanvas({
  children,
  fallback,
  className,
  cameraPosition = [0, 1.1, 3.8],
  fov = 36,
  ariaLabel,
}: Viewport3DCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mounted = useClientSnapshot(() => true, false);
  const webglSupported = useClientSnapshot(detectWebGLSupport, true);
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const isMobile = useMediaQuery("(max-width: 767px)");

  const [inView, setInView] = useState(false);
  const [runtimeError, setRuntimeError] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || reducedMotion || !webglSupported || runtimeError) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry) {
          setInView(entry.isIntersecting);
        }
      },
      { rootMargin: "320px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [reducedMotion, runtimeError, webglSupported]);

  const handleError = useCallback(() => {
    setRuntimeError(true);
  }, []);

  if (reducedMotion || !webglSupported || runtimeError) {
    return (
      <div
        ref={containerRef}
        role={ariaLabel ? "img" : undefined}
        aria-label={ariaLabel}
        className={cn("relative overflow-hidden", className)}
      >
        {fallback}
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      role={ariaLabel ? "img" : undefined}
      aria-label={ariaLabel}
      className={cn("relative overflow-hidden", className)}
    >
      {mounted && inView ? (
        <SceneErrorBoundary onError={handleError}>
          <Canvas
            dpr={isMobile ? [1, 1.5] : [1, 2]}
            camera={{
              fov,
              near: 0.1,
              far: 35,
              position: cameraPosition,
            }}
            gl={{
              antialias: true,
              alpha: true,
              powerPreference: "high-performance",
              toneMapping: THREE.ACESFilmicToneMapping,
              toneMappingExposure: 1.02,
            }}
            onCreated={({ gl }) => {
              gl.setClearColor(0x000000, 0);
              const canvas = gl.domElement;
              const onLost = (e: Event) => {
                e.preventDefault();
                handleError();
              };
              canvas.addEventListener("webglcontextlost", onLost, false);
            }}
            className="h-full w-full"
          >
            {children}
          </Canvas>
        </SceneErrorBoundary>
      ) : (
        fallback
      )}
    </div>
  );
}
