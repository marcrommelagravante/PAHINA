"use client";

import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { PahinaEmblem } from "@/components/ui/PahinaEmblem";
import { Viewport3DCanvas } from "./Viewport3DCanvas";
import {
  CeramicCup3D,
  DaylightStudioLights,
  EngravedTableToken3D,
  IcedGlassTumbler3D,
  OpenBook3D,
  SoftContactShadow,
} from "./models";

function StaticEditorialPlaque({
  label,
  sublabel,
}: {
  label: string;
  sublabel: string;
}) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center rounded-2xl border border-soft bg-surface-elevated p-6 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full border border-powder bg-powder-soft text-ink">
        <PahinaEmblem size={38} showRingText={false} />
      </div>
      <p className="mt-4 font-display text-xl text-ink">{label}</p>
      <p className="mt-1 font-editorial text-base italic text-ink-muted">
        {sublabel}
      </p>
    </div>
  );
}

/* ============================================================================
 * 1. MENU PAGE 3D HERO HEADER (/menu)
 *    Sunlit counter plinth with porcelain cup + iced glass pour + linen menu folio
 * ========================================================================== */
function MenuHeaderScene({ spinBoost }: { spinBoost: number }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (groupRef.current) {
      const targetY = Math.sin(t * 0.38) * 0.24 + spinBoost * Math.PI * 0.5;
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        targetY,
        0.06
      );
    }
  });

  return (
    <>
      <DaylightStudioLights />
      <group ref={groupRef} position={[0, -0.42, 0]}>
        {/* Sculpted Elevated Paper & Powder Blue tasting plinth */}
        <mesh position={[0, -0.1, 0]}>
          <boxGeometry args={[2.35, 0.2, 1.35]} />
          <meshStandardMaterial color="#FAF8F3" roughness={0.42} />
        </mesh>
        <mesh position={[0, 0.008, 0]}>
          <boxGeometry args={[2.37, 0.018, 1.37]} />
          <meshStandardMaterial color="#B9D0E0" roughness={0.38} />
        </mesh>
        <SoftContactShadow position={[0, -0.21, 0]} scale={[2.9, 1.8]} opacity={0.55} />

        {/* Standing Deep Ink Grey linen menu folio card in back-center */}
        <group position={[0.04, 0.62, -0.22]} rotation={[-0.08, -0.18, 0]}>
          <mesh>
            <boxGeometry args={[0.82, 1.18, 0.035]} />
            <meshStandardMaterial color="#41474D" roughness={0.78} />
          </mesh>
          <mesh position={[0, 0, 0.02]}>
            <planeGeometry args={[0.7, 1.04]} />
            <meshStandardMaterial color="#FAF8F3" roughness={0.85} />
          </mesh>
          <mesh position={[0, 0.28, 0.023]}>
            <ringGeometry args={[0.09, 0.12, 28]} />
            <meshStandardMaterial color="#41474D" />
          </mesh>
        </group>

        {/* Hot porcelain latte cup on left */}
        <CeramicCup3D
          position={[-0.58, 0.02, 0.16]}
          scale={0.78}
          cupColor="#FAF8F3"
          cremaColor="#8C5D33"
          showSteam
        />

        {/* Layered iced espresso glass on right */}
        <IcedGlassTumbler3D
          position={[0.62, 0.02, 0.14]}
          scale={0.82}
          topLayerColor="#54351E"
          bottomLayerColor="#F3EFE6"
        />
      </group>
    </>
  );
}

export function MenuHeader3D() {
  const [spinBoost, setSpinBoost] = useState(0);

  return (
    <div className="relative">
      <Viewport3DCanvas
        ariaLabel="Interactive 3D menu counter displaying a hot porcelain latte cup, an iced layered coffee glass, and a linen menu folio"
        cameraPosition={[0, 0.92, 3.55]}
        fov={35}
        className="h-[270px] w-full rounded-2xl border border-soft bg-surface-elevated sm:h-[300px]"
        fallback={
          <StaticEditorialPlaque
            label="Espresso & Kitchen Counter"
            sublabel="Hot pours, chilled classics, and warm plates."
          />
        }
      >
        <MenuHeaderScene spinBoost={spinBoost} />
      </Viewport3DCanvas>
      <button
        type="button"
        onClick={() => setSpinBoost((s) => s + 1)}
        className="absolute right-3 bottom-3 rounded-full border border-soft bg-paper/90 px-3 py-1 text-xs font-medium text-ink backdrop-blur-sm transition-colors hover:border-powder hover:bg-powder-soft"
      >
        Rotate Counter
      </button>
    </div>
  );
}

/* ============================================================================
 * 2. READING ROOM 3D HERO HEADER (/reading-room)
 *    Architectural arched window casting slow daylight beams over an oak table & open book
 * ========================================================================== */
function ReadingRoomHeaderScene({ pageSignal }: { pageSignal: number }) {
  const sceneRef = useRef<THREE.Group>(null);
  const lightBeamRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (sceneRef.current) {
      sceneRef.current.rotation.y = Math.sin(t * 0.32) * 0.16;
    }
    if (lightBeamRef.current) {
      lightBeamRef.current.rotation.z = -0.32 + Math.sin(t * 0.45) * 0.04;
    }
  });

  return (
    <>
      <DaylightStudioLights />
      <group ref={sceneRef} position={[0, -0.35, 0]}>
        {/* Architectural pastel Powder Blue wall panel with arched window frame */}
        <group position={[0, 0.65, -0.68]}>
          {/* Left & right window jambs */}
          <mesh position={[-0.78, -0.1, 0]}>
            <boxGeometry args={[0.38, 1.65, 0.08]} />
            <meshStandardMaterial color="#B9D0E0" roughness={0.65} />
          </mesh>
          <mesh position={[0.78, -0.1, 0]}>
            <boxGeometry args={[0.38, 1.65, 0.08]} />
            <meshStandardMaterial color="#B9D0E0" roughness={0.65} />
          </mesh>
          {/* Top arch ring */}
          <mesh position={[0, 0.42, 0]}>
            <torusGeometry args={[0.6, 0.18, 16, 36, Math.PI]} />
            <meshStandardMaterial color="#B9D0E0" roughness={0.65} />
          </mesh>
          {/* Bright sunlit window pane behind arch */}
          <mesh position={[0, 0.1, -0.05]}>
            <planeGeometry args={[1.25, 1.75]} />
            <meshBasicMaterial color="#FFFFFF" />
          </mesh>
          {/* Window mullion crossbars */}
          <mesh position={[0, 0.05, 0.01]}>
            <boxGeometry args={[0.03, 1.55, 0.03]} />
            <meshStandardMaterial color="#FAF8F3" roughness={0.4} />
          </mesh>
          <mesh position={[0, 0.18, 0.01]}>
            <boxGeometry args={[1.18, 0.03, 0.03]} />
            <meshStandardMaterial color="#FAF8F3" roughness={0.4} />
          </mesh>
        </group>

        {/* Translucent diagonal morning sunbeam shaft from arched window */}
        <mesh
          ref={lightBeamRef}
          position={[0.15, 0.55, -0.1]}
          rotation={[0.2, 0, -0.32]}
        >
          <planeGeometry args={[0.95, 1.85]} />
          <meshBasicMaterial
            color="#FFFDF6"
            transparent
            opacity={0.22}
            depthWrite={false}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Warm natural oak reading table top */}
        <mesh position={[0, -0.12, 0.12]}>
          <boxGeometry args={[2.25, 0.12, 1.38]} />
          <meshStandardMaterial color="#C8A57E" roughness={0.68} />
        </mesh>
        <SoftContactShadow position={[0, -0.22, 0.12]} scale={[2.6, 1.6]} opacity={0.5} />

        {/* Open linen hardcover book with turning page leaf */}
        <OpenBook3D
          position={[-0.25, -0.05, 0.18]}
          rotation={[0.08, 0.16, 0]}
          scale={0.62}
          pageTurnSignal={pageSignal}
          coverColor="#41474D"
        />

        {/* Companion porcelain cup on oak table */}
        <CeramicCup3D
          position={[0.64, -0.06, 0.15]}
          scale={0.58}
          cupColor="#FAF8F3"
          showSteam
        />
      </group>
    </>
  );
}

export function ReadingRoomHeader3D() {
  const [pageSignal, setPageSignal] = useState(0);

  return (
    <div className="relative">
      <Viewport3DCanvas
        ariaLabel="Interactive 3D reading room scene with an arched window casting morning light across an oak table, an open book, and a porcelain cup"
        cameraPosition={[0, 0.88, 3.45]}
        fov={35}
        className="h-[270px] w-full rounded-2xl border border-soft bg-surface-elevated sm:h-[300px]"
        fallback={
          <StaticEditorialPlaque
            label="Sunlit Reading Table"
            sublabel="Six curated shelves for unhurried in-café reading."
          />
        }
      >
        <ReadingRoomHeaderScene pageSignal={pageSignal} />
      </Viewport3DCanvas>
      <button
        type="button"
        onClick={() => setPageSignal((s) => s + 1)}
        className="absolute right-3 bottom-3 rounded-full border border-soft bg-paper/90 px-3 py-1 text-xs font-medium text-ink backdrop-blur-sm transition-colors hover:border-powder hover:bg-powder-soft"
      >
        Turn Page
      </button>
    </div>
  );
}

/* ============================================================================
 * 3. ABOUT PAGE 3D HERO HEADER (/about)
 *    "Where coffee meets stories." — Orbiting open hardcover & porcelain cup
 * ========================================================================== */
function AboutHeaderScene({ pageSignal }: { pageSignal: number }) {
  const orbitRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (orbitRef.current) {
      orbitRef.current.rotation.y = t * 0.28;
    }
  });

  return (
    <>
      <DaylightStudioLights />
      <group position={[0, -0.35, 0]}>
        {/* Sculpted circular Paper White & Powder Blue plinth */}
        <mesh position={[0, -0.14, 0]}>
          <cylinderGeometry args={[1.18, 1.26, 0.18, 48]} />
          <meshStandardMaterial color="#FAF8F3" roughness={0.42} />
        </mesh>
        <mesh position={[0, -0.04, 0]}>
          <cylinderGeometry args={[1.12, 1.12, 0.025, 48]} />
          <meshStandardMaterial color="#B9D0E0" roughness={0.38} />
        </mesh>
        <SoftContactShadow position={[0, -0.24, 0]} scale={[2.7, 2.7]} opacity={0.5} />

        {/* Delicate architectural meridian ring uniting coffee & book */}
        <mesh position={[0, 0.42, 0]} rotation={[Math.PI / 2.3, 0.2, 0]}>
          <torusGeometry args={[0.98, 0.012, 16, 64]} />
          <meshStandardMaterial color="#8999A6" roughness={0.4} metalness={0.3} />
        </mesh>

        {/* Orbiting pair: Open linen book & porcelain cup */}
        <group ref={orbitRef} position={[0, 0.12, 0]}>
          <OpenBook3D
            position={[-0.36, 0.06, 0.12]}
            rotation={[0.22, 0.28, -0.06]}
            scale={0.58}
            pageTurnSignal={pageSignal}
            coverColor="#41474D"
          />
          <CeramicCup3D
            position={[0.56, 0.02, -0.12]}
            scale={0.64}
            cupColor="#FAF8F3"
            showSteam
          />
        </group>
      </group>
    </>
  );
}

export function AboutHeader3D() {
  const [pageSignal, setPageSignal] = useState(0);

  return (
    <div className="relative">
      <Viewport3DCanvas
        ariaLabel="Interactive 3D sculpture of an open PAHINA book and a porcelain espresso cup orbiting together above an architectural plinth"
        cameraPosition={[0, 0.95, 3.45]}
        fov={35}
        className="h-[270px] w-full rounded-2xl border border-soft bg-surface-elevated sm:h-[300px]"
        fallback={
          <StaticEditorialPlaque
            label="Coffee & Stories"
            sublabel="Meaning 'page' — shaped around unhurried time."
          />
        }
      >
        <AboutHeaderScene pageSignal={pageSignal} />
      </Viewport3DCanvas>
      <button
        type="button"
        onClick={() => setPageSignal((s) => s + 1)}
        className="absolute right-3 bottom-3 rounded-full border border-soft bg-paper/90 px-3 py-1 text-xs font-medium text-ink backdrop-blur-sm transition-colors hover:border-powder hover:bg-powder-soft"
      >
        Turn Page
      </button>
    </div>
  );
}

/* ============================================================================
 * 4. VISIT PAGE 3D HERO HEADER (/visit) & SHARED VISIT BANNER 3D TOKEN
 * ========================================================================== */
export function VisitHeader3D({ compact = false }: { compact?: boolean }) {
  return (
    <Viewport3DCanvas
      ariaLabel="Rotating 3D engraved PAHINA table token suspended over a Powder Blue and Paper White compass plinth"
      cameraPosition={[0, 0.25, 3.15]}
      fov={34}
      className={
        compact
          ? "mx-auto h-[180px] w-full max-w-[260px]"
          : "h-[260px] w-full rounded-2xl border border-soft bg-surface-elevated sm:h-[290px]"
      }
      fallback={
        <StaticEditorialPlaque
          label="PAHINA Table Token"
          sublabel="Pull up a chair for coffee and a chapter."
        />
      }
    >
      <DaylightStudioLights />
      <EngravedTableToken3D position={[0, 0.05, 0]} scale={0.85} />
    </Viewport3DCanvas>
  );
}
