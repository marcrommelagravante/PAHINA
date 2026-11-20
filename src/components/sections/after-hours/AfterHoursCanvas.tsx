"use client";

import { useEffect, useRef, type MutableRefObject } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { PlinthRoom3D } from "./PlinthRoom3D";
import { CremaHorizon3D } from "./CremaHorizon3D";
import { GalleryCorridor3D } from "./GalleryCorridor3D";

interface AfterHoursCanvasProps {
  targetScrollRef: MutableRefObject<number>;
  onIntroProgress?: (t: number) => void;
  onWebGLError: () => void;
  isMobile: boolean;
}

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function smoothstep(edge0: number, edge1: number, x: number) {
  const t = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}

interface SceneRigProps {
  targetScrollRef: MutableRefObject<number>;
  onIntroProgress?: (t: number) => void;
  isMobile: boolean;
}

function AfterHoursScene({
  targetScrollRef,
  onIntroProgress,
  isMobile,
}: SceneRigProps) {
  const smoothScrollRef = useRef(0);
  const initializedRef = useRef(false);
  const introProgressRef = useRef(0);
  const introElapsedRef = useRef(0);
  const introDoneNotifiedRef = useRef(false);
  const pointerRef = useRef({ x: 0, y: 0 });
  const lookTargetRef = useRef(new THREE.Vector3(0, 0.1, 0));

  useEffect(() => {
    if (isMobile) return;
    const onPointerMove = (e: PointerEvent) => {
      pointerRef.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      pointerRef.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", onPointerMove);
  }, [isMobile]);

  useFrame((state, rawDelta) => {
    const delta = Math.min(rawDelta, 0.05);
    const scrollDelta = Math.min(rawDelta, 0.14);

    if (!initializedRef.current) {
      initializedRef.current = true;
      smoothScrollRef.current = targetScrollRef.current;
    }

    // 1. Cinematic intro tilt-down from overhead sunlit skylight panel (1.65s heavy ease-in-out)
    if (introProgressRef.current < 1) {
      if (targetScrollRef.current > 0.08 && introElapsedRef.current < 0.15) {
        introProgressRef.current = 1;
        introElapsedRef.current = 1.65;
      } else {
        introElapsedRef.current += delta;
        const linear = Math.min(1, introElapsedRef.current / 1.65);
        introProgressRef.current = easeInOutCubic(linear);
      }

      if (onIntroProgress) {
        onIntroProgress(introProgressRef.current);
      }
      if (introProgressRef.current >= 1 && !introDoneNotifiedRef.current) {
        introDoneNotifiedRef.current = true;
      }
    }

    // 2. Smooth, weighted camera scroll damping
    const damp = 1 - Math.exp(-7.5 * scrollDelta);
    smoothScrollRef.current = THREE.MathUtils.lerp(
      smoothScrollRef.current,
      targetScrollRef.current,
      damp
    );

    const p = smoothScrollRef.current;
    const intro = introProgressRef.current;

    // 3. Camera choreography across all 3 acts
    const act2Mix = smoothstep(0.26, 0.42, p) * (1 - smoothstep(0.58, 0.68, p));
    const act3Mix = smoothstep(0.62, 0.74, p);

    const px = isMobile ? 0 : pointerRef.current.x * 0.16;
    const py = isMobile ? 0 : -pointerRef.current.y * 0.09;

    const baseCamZ = isMobile ? 6.15 : 5.25;
    const camZ =
      baseCamZ +
      (1 - intro) * 0.45 -
      act2Mix * 0.15 -
      act3Mix * (isMobile ? 0.3 : 0.45);

    const camY =
      THREE.MathUtils.lerp(1.55, 0.14, intro) -
      act2Mix * 0.18 -
      act3Mix * 0.1 +
      py;

    const camX = px;

    const lookY =
      THREE.MathUtils.lerp(4.25, -0.04, intro) * (1 - act2Mix - act3Mix) +
      act2Mix * -0.15 +
      act3Mix * -0.02;

    const cam = state.camera;
    cam.position.x = THREE.MathUtils.lerp(cam.position.x, camX, 0.08);
    cam.position.y = THREE.MathUtils.lerp(cam.position.y, camY, 0.12);
    cam.position.z = THREE.MathUtils.lerp(cam.position.z, camZ, 0.1);

    lookTargetRef.current.set(px * 0.2, lookY, -0.2);
    cam.lookAt(lookTargetRef.current);
  });

  return (
    <>
      <PlinthRoom3D
        scrollProgressRef={smoothScrollRef}
        introProgressRef={introProgressRef}
        pointerRef={pointerRef}
        isMobile={isMobile}
      />

      <CremaHorizon3D
        scrollProgressRef={smoothScrollRef}
        isMobile={isMobile}
      />

      <GalleryCorridor3D
        scrollProgressRef={smoothScrollRef}
        pointerRef={pointerRef}
        isMobile={isMobile}
      />
    </>
  );
}

/**
 * Transparent WebGL canvas composited cleanly over PAHINA's pixel-exact
 * Paper White (#F4F1EA) ground so zero tone-mapping shift or seam appears.
 */
export default function AfterHoursCanvas({
  targetScrollRef,
  onIntroProgress,
  onWebGLError,
  isMobile,
}: AfterHoursCanvasProps) {
  return (
    <Canvas
      dpr={isMobile ? [1, 1.5] : [1, 2]}
      camera={{
        fov: isMobile ? 44 : 38,
        near: 0.1,
        far: 45,
        position: [0, 1.55, 5.7],
      }}
      gl={{
        antialias: true,
        powerPreference: "high-performance",
        alpha: true,
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.0,
      }}
      onCreated={({ gl }) => {
        gl.setClearColor(0x000000, 0);
        const canvas = gl.domElement;
        const handleLost = (e: Event) => {
          e.preventDefault();
          onWebGLError();
        };
        canvas.addEventListener("webglcontextlost", handleLost, false);
      }}
      className="h-full w-full"
    >
      <AfterHoursScene
        targetScrollRef={targetScrollRef}
        onIntroProgress={onIntroProgress}
        isMobile={isMobile}
      />
    </Canvas>
  );
}
