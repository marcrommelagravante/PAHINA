"use client";

import { useEffect, useMemo, useRef, type MutableRefObject } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { AFTER_HOURS_TEXTURES } from "@/data/afterHours";
import { PahinaBook3D } from "./PahinaBook3D";

interface PlinthRoom3DProps {
  scrollProgressRef: MutableRefObject<number>;
  introProgressRef: MutableRefObject<number>;
  pointerRef: MutableRefObject<{ x: number; y: number }>;
  isMobile: boolean;
}

function clamp01(v: number) {
  return Math.max(0, Math.min(1, v));
}

function smoothstep(edge0: number, edge1: number, x: number) {
  const t = clamp01((x - edge0) / (edge1 - edge0));
  return t * t * (3 - 2 * t);
}

/**
 * Act 1 — Sunlit Paper White architectural gallery room:
 * - Honed Paper White (#F4F1EA) Carrara marble walls with subtle Powder-Slate veining
 * - Overhead recessed daylight skylight panel (seen first during the intro tilt-down)
 * - Sculpted Elevated Paper (#FAF8F3) architectural plinth with a hairline Powder Blue reveal
 * - Angled Deep Ink Grey (#41474D) linen hardcover PAHINA book catching raking morning sunlight
 * - Smoothly rises away into open Paper White space as the user scrolls toward Act 2
 */
export function PlinthRoom3D({
  scrollProgressRef,
  introProgressRef,
  pointerRef,
  isMobile,
}: PlinthRoom3DProps) {
  const roomGroupRef = useRef<THREE.Group>(null);
  const bookPivotRef = useRef<THREE.Group>(null);
  const backWallMatRef = useRef<THREE.MeshStandardMaterial>(null);
  const leftWallMatRef = useRef<THREE.MeshStandardMaterial>(null);
  const rightWallMatRef = useRef<THREE.MeshStandardMaterial>(null);
  const floorMatRef = useRef<THREE.MeshStandardMaterial>(null);
  const keyLightRef = useRef<THREE.DirectionalLight>(null);
  const fillLightRef = useRef<THREE.DirectionalLight>(null);
  const rimLightRef = useRef<THREE.DirectionalLight>(null);
  const ambientRef = useRef<THREE.AmbientLight>(null);

  // Non-blocking async load of Paper White Carrara marble texture
  const marbleTexture = useMemo(() => {
    const loader = new THREE.TextureLoader();
    const tex = loader.load(AFTER_HOURS_TEXTURES.paperMarble);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(2.0, 1.35);
    tex.anisotropy = 4;
    return tex;
  }, []);

  const floorTexture = useMemo(() => {
    const loader = new THREE.TextureLoader();
    const tex = loader.load(AFTER_HOURS_TEXTURES.paperMarble);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(2.4, 2.0);
    tex.anisotropy = 4;
    return tex;
  }, []);

  // Soft radial ambient occlusion texture for plinth floor & book contact shadows
  const softShadowTexture = useMemo(() => {
    if (typeof document === "undefined") return null;
    const c = document.createElement("canvas");
    c.width = 256;
    c.height = 256;
    const ctx = c.getContext("2d");
    if (ctx) {
      const grad = ctx.createRadialGradient(128, 128, 18, 128, 128, 124);
      grad.addColorStop(0, "rgba(65, 71, 77, 0.34)");
      grad.addColorStop(0.55, "rgba(65, 71, 77, 0.14)");
      grad.addColorStop(1, "rgba(65, 71, 77, 0)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 256, 256);
    }
    const tex = new THREE.CanvasTexture(c);
    tex.needsUpdate = true;
    return tex;
  }, []);

  useEffect(() => {
    return () => {
      marbleTexture.dispose();
      floorTexture.dispose();
      softShadowTexture?.dispose();
    };
  }, [marbleTexture, floorTexture, softShadowTexture]);

  useFrame((state) => {
    const p = scrollProgressRef.current;
    const intro = introProgressRef.current;

    // Act 1 visible p=0..0.31; rises smoothly upward and fades into open Paper White at p=0.13..0.29
    const exitT = smoothstep(0.13, 0.29, p);
    const visibility = 1 - smoothstep(0.25, 0.30, p);

    if (roomGroupRef.current) {
      roomGroupRef.current.visible = visibility > 0.002;
      roomGroupRef.current.position.y = exitT * 6.8;
    }

    if (visibility <= 0.002) return;

    // Subtle composed breathing presence on the Deep Ink Grey linen hardcover
    const elapsed = state.clock.getElapsedTime();
    if (bookPivotRef.current) {
      const baseAngle = -0.34;
      const subtleBreath = Math.sin(elapsed * 0.35) * 0.022;
      const pointerYaw = isMobile ? 0 : pointerRef.current.x * 0.075;
      bookPivotRef.current.rotation.y = THREE.MathUtils.lerp(
        bookPivotRef.current.rotation.y,
        baseAngle + subtleBreath + pointerYaw + exitT * 0.2,
        0.05
      );
    }

    // Fade wall & floor surfaces cleanly into the #F4F1EA background as the room exits
    const roomAlpha = 1 - smoothstep(0.18, 0.29, p);
    if (backWallMatRef.current) backWallMatRef.current.opacity = roomAlpha;
    if (leftWallMatRef.current) leftWallMatRef.current.opacity = roomAlpha;
    if (rightWallMatRef.current) rightWallMatRef.current.opacity = roomAlpha;
    if (floorMatRef.current) floorMatRef.current.opacity = roomAlpha;

    const introGlow = 0.78 + 0.22 * smoothstep(0.05, 0.72, intro);
    const activeIntensity = visibility * (1 - exitT * 0.45);

    if (keyLightRef.current) keyLightRef.current.intensity = 2.35 * introGlow * activeIntensity;
    if (fillLightRef.current) fillLightRef.current.intensity = 1.05 * introGlow * activeIntensity;
    if (rimLightRef.current) rimLightRef.current.intensity = 1.15 * introGlow * activeIntensity;
    if (ambientRef.current) ambientRef.current.intensity = 1.15 * introGlow * activeIntensity;
  });

  // Calibrated plinth & book scale keeps generous museum air both above the book and below the plinth
  const bookScale = isMobile ? 0.66 : 0.72;
  const plinthHeight = isMobile ? 0.44 : 0.4;
  const plinthTopY = isMobile ? -0.82 : -0.78;
  const plinthCenterY = plinthTopY - plinthHeight / 2;
  const bookCenterY = plinthTopY + (1.98 * bookScale) / 2 + 0.004;

  return (
    <group ref={roomGroupRef}>
      {/* Sunlit daylight gallery studio rig */}
      <ambientLight ref={ambientRef} color="#FAF8F3" intensity={1.15} />

      {/* Warm morning raking directional sunlight carving linen texture & blind deboss */}
      <directionalLight
        ref={keyLightRef}
        position={[3.6, 5.2, 4.2]}
        intensity={2.35}
        color="#FFFDF8"
      />

      {/* Cool Powder Blue window bounce fill from left side */}
      <directionalLight
        ref={fillLightRef}
        position={[-4.2, 2.4, 2.6]}
        intensity={1.05}
        color="#DCE7EF"
      />

      {/* Crisp daylight rim tracing paper page edges & spine */}
      <directionalLight
        ref={rimLightRef}
        position={[-1.8, 3.2, -3.4]}
        intensity={1.15}
        color="#FFFFFF"
      />

      {/* Overhead recessed sunlit gallery skylight panel (seen first during intro tilt-down) */}
      <group position={[0, 4.35, -0.45]}>
        <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0.04, 0]}>
          <planeGeometry args={[5.5, 1.38]} />
          <meshBasicMaterial color="#DCE7EF" />
        </mesh>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <planeGeometry args={[4.9, 0.86]} />
          <meshBasicMaterial color="#FFFFFF" />
        </mesh>
      </group>

      {/* Honed Paper White Carrara marble architectural walls */}
      <mesh position={[0, 1.15, -3.65]}>
        <planeGeometry args={[14, 9.4]} />
        <meshStandardMaterial
          ref={backWallMatRef}
          map={marbleTexture}
          color="#FFFFFF"
          roughness={0.68}
          metalness={0.02}
          transparent
          opacity={1}
        />
      </mesh>

      <mesh position={[-5.4, 1.15, -0.2]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[8.5, 9.4]} />
        <meshStandardMaterial
          ref={leftWallMatRef}
          map={marbleTexture}
          color="#F5F3EC"
          roughness={0.72}
          metalness={0.02}
          transparent
          opacity={1}
        />
      </mesh>

      <mesh position={[5.4, 1.15, -0.2]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[8.5, 9.4]} />
        <meshStandardMaterial
          ref={rightWallMatRef}
          map={marbleTexture}
          color="#F5F3EC"
          roughness={0.72}
          metalness={0.02}
          transparent
          opacity={1}
        />
      </mesh>

      {/* Pale honed stone gallery floor */}
      <mesh
        position={[0, plinthTopY - plinthHeight, -0.4]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <planeGeometry args={[14, 10]} />
        <meshStandardMaterial
          ref={floorMatRef}
          map={floorTexture}
          color="#F2EFE7"
          roughness={0.55}
          metalness={0.04}
          transparent
          opacity={1}
        />
      </mesh>

      {/* Sculpted Elevated Paper (#FAF8F3) architectural plinth with Powder Blue reveal */}
      <group position={[0, plinthCenterY, 0]}>
        {/* Main honed alabaster/paper pedestal body */}
        <mesh>
          <boxGeometry args={[1.68, plinthHeight, 1.1]} />
          <meshStandardMaterial
            color="#FAF8F3"
            roughness={0.42}
            metalness={0.03}
          />
        </mesh>

        {/* Subtle recessed Powder Blue (#B9D0E0) architectural light collar */}
        <mesh position={[0, plinthHeight / 2 - 0.022, 0]}>
          <boxGeometry args={[1.7, 0.024, 1.12]} />
          <meshStandardMaterial
            color="#B9D0E0"
            emissive="#DCE7EF"
            emissiveIntensity={0.35}
            roughness={0.38}
            metalness={0.04}
          />
        </mesh>

        {/* Crisp white diffuser top slab */}
        <mesh position={[0, plinthHeight / 2 + 0.005, 0]}>
          <boxGeometry args={[1.68, 0.014, 1.1]} />
          <meshStandardMaterial
            color="#FFFFFF"
            emissive="#FAF8F3"
            emissiveIntensity={0.28}
            roughness={0.28}
            metalness={0.02}
          />
        </mesh>

        {/* Grounding architectural shadow reveal at floor base */}
        <mesh position={[0, -plinthHeight / 2 + 0.012, 0]}>
          <boxGeometry args={[1.62, 0.026, 1.04]} />
          <meshStandardMaterial color="#8999A6" roughness={0.85} />
        </mesh>

        {/* Feathered ambient occlusion shadow beneath plinth (zero hard rectangle edge) */}
        <mesh
          position={[0.02, -plinthHeight / 2 + 0.002, 0.04]}
          rotation={[-Math.PI / 2, 0, 0]}
        >
          <planeGeometry args={[2.95, 2.15]} />
          <meshBasicMaterial
            map={softShadowTexture}
            transparent
            opacity={0.72}
            depthWrite={false}
          />
        </mesh>

        {/* Feathered book contact shadow on top of plinth */}
        <mesh
          position={[0.04, plinthHeight / 2 + 0.014, 0.05]}
          rotation={[-Math.PI / 2, 0, -0.34]}
        >
          <planeGeometry args={[1.65, 0.72]} />
          <meshBasicMaterial
            map={softShadowTexture}
            transparent
            opacity={0.85}
            depthWrite={false}
          />
        </mesh>
      </group>

      {/* Closed hardcover PAHINA book bound in Deep Ink Grey linen */}
      <group ref={bookPivotRef} position={[0, bookCenterY, 0.04]} rotation={[0, -0.34, 0]}>
        <PahinaBook3D silverSheen={0.18} scale={bookScale} />
      </group>
    </group>
  );
}
