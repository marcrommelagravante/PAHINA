"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { AFTER_HOURS_TEXTURES } from "@/data/afterHours";
import { cn } from "@/lib/utils";
import { Viewport3DCanvas } from "./Viewport3DCanvas";
import { DaylightStudioLights, SoftContactShadow } from "./models";

export interface MaterialSwatchSpec {
  id: string;
  label: string;
  hex: string;
  role: string;
  roughness: number;
  metalness: number;
}

export const PAHINA_MATERIALS: MaterialSwatchSpec[] = [
  {
    id: "powder-panel",
    label: "Powder Blue Paneling",
    hex: "#B9D0E0",
    role: "Recessed wall shelving backdrops, reading nooks, and calm architectural trim.",
    roughness: 0.46,
    metalness: 0.04,
  },
  {
    id: "warm-oak",
    label: "Warm Natural Oak",
    hex: "#C49E74",
    role: "Individual and two-top reading tables, shelf ledges, and serving boards.",
    roughness: 0.62,
    metalness: 0.03,
  },
  {
    id: "ink-linen",
    label: "Deep Ink Bookcloth Linen",
    hex: "#41474D",
    role: "Woven hardcover bindings, tactile menu folios, and primary typographic ink.",
    roughness: 0.78,
    metalness: 0.08,
  },
  {
    id: "paper-stock",
    label: "Uncoated Paper White",
    hex: "#F4F1EA",
    role: "Sunlit primary page surfaces, honed stone counters, and stationery cards.",
    roughness: 0.54,
    metalness: 0.02,
  },
];

function MaterialStudyScene({
  activeId,
  onSelect,
}: {
  activeId: string;
  onSelect: (id: string) => void;
}) {
  const swatchRefs = useRef<(THREE.Group | null)[]>([]);

  const linenTex = useMemo(() => {
    const loader = new THREE.TextureLoader();
    const t = loader.load(AFTER_HOURS_TEXTURES.linenCloth);
    t.colorSpace = THREE.SRGBColorSpace;
    t.anisotropy = 4;
    return t;
  }, []);

  const marbleTex = useMemo(() => {
    const loader = new THREE.TextureLoader();
    const t = loader.load(AFTER_HOURS_TEXTURES.paperMarble);
    t.colorSpace = THREE.SRGBColorSpace;
    t.anisotropy = 4;
    return t;
  }, []);

  useEffect(() => {
    return () => {
      linenTex.dispose();
      marbleTex.dispose();
    };
  }, [linenTex, marbleTex]);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    const damp = 1 - Math.exp(-7 * delta);

    PAHINA_MATERIALS.forEach((mat, idx) => {
      const grp = swatchRefs.current[idx];
      if (!grp) return;
      const isSelected = mat.id === activeId;
      const baseX = -0.96 + idx * 0.64;

      const targetY = isSelected ? 0.32 + Math.sin(t * 1.4) * 0.025 : -0.02;
      const targetZ = isSelected ? 0.45 : -0.1;
      const targetRotX = isSelected ? -0.35 : -0.72;
      const targetRotY = isSelected ? Math.sin(t * 0.6) * 0.22 : 0;

      grp.position.x = THREE.MathUtils.lerp(grp.position.x, baseX, damp);
      grp.position.y = THREE.MathUtils.lerp(grp.position.y, targetY, damp);
      grp.position.z = THREE.MathUtils.lerp(grp.position.z, targetZ, damp);
      grp.rotation.x = THREE.MathUtils.lerp(grp.rotation.x, targetRotX, damp);
      grp.rotation.y = THREE.MathUtils.lerp(grp.rotation.y, targetRotY, damp);
    });
  });

  return (
    <>
      <DaylightStudioLights />
      <group position={[0, -0.18, 0]}>
        {/* Architectural tray base */}
        <mesh position={[0, -0.25, -0.06]}>
          <boxGeometry args={[2.85, 0.1, 1.38]} />
          <meshStandardMaterial color="#FAF8F3" roughness={0.45} />
        </mesh>
        <SoftContactShadow position={[0, -0.31, -0.06]} scale={[3.1, 1.6]} opacity={0.45} />

        {PAHINA_MATERIALS.map((swatch, idx) => {
          const baseX = -0.96 + idx * 0.64;
          const map =
            swatch.id === "ink-linen"
              ? linenTex
              : swatch.id === "paper-stock"
                ? marbleTex
                : null;

          return (
            <group
              key={swatch.id}
              ref={(el) => {
                swatchRefs.current[idx] = el;
              }}
              position={[baseX, -0.02, -0.1]}
              rotation={[-0.72, 0, 0]}
              onClick={(e) => {
                e.stopPropagation();
                onSelect(swatch.id);
              }}
            >
              {/* Material sample slab */}
              <mesh>
                <boxGeometry args={[0.52, 0.76, 0.065]} />
                <meshStandardMaterial
                  color={swatch.hex}
                  map={map}
                  roughness={swatch.roughness}
                  metalness={swatch.metalness}
                />
              </mesh>
              {/* Subtle brass/slate index pin at bottom of swatch */}
              <mesh position={[0, -0.28, 0.036]}>
                <circleGeometry args={[0.04, 24]} />
                <meshStandardMaterial
                  color={swatch.id === "ink-linen" ? "#F4F1EA" : "#41474D"}
                  roughness={0.4}
                />
              </mesh>
            </group>
          );
        })}
      </group>
    </>
  );
}

export function MaterialStudy3D() {
  const [activeId, setActiveId] = useState<string>(PAHINA_MATERIALS[0].id);
  const activeSwatch =
    PAHINA_MATERIALS.find((m) => m.id === activeId) ?? PAHINA_MATERIALS[0];

  return (
    <div className="rounded-2xl border border-soft bg-surface-elevated p-4 sm:p-6">
      <Viewport3DCanvas
        ariaLabel={`Interactive 3D architectural material board highlighting ${activeSwatch.label}`}
        cameraPosition={[0, 0.78, 3.25]}
        fov={35}
        className="h-[260px] w-full rounded-xl border border-soft bg-paper sm:h-[300px]"
        fallback={
          <div className="flex h-full w-full flex-col items-center justify-center bg-paper p-6 text-center">
            <span
              aria-hidden="true"
              className="h-12 w-12 rounded-full border border-soft"
              style={{ backgroundColor: activeSwatch.hex }}
            />
            <p className="mt-3 font-display text-xl text-ink">
              {activeSwatch.label}
            </p>
            <p className="mt-1 max-w-sm text-sm text-ink-muted">
              {activeSwatch.role}
            </p>
          </div>
        }
      >
        <MaterialStudyScene activeId={activeId} onSelect={setActiveId} />
      </Viewport3DCanvas>

      <div
        role="group"
        aria-label="Inspect PAHINA architectural materials in 3D"
        className="mt-4 flex flex-wrap items-center gap-2"
      >
        {PAHINA_MATERIALS.map((swatch) => {
          const isActive = swatch.id === activeSwatch.id;
          return (
            <button
              key={swatch.id}
              type="button"
              onClick={() => setActiveId(swatch.id)}
              aria-pressed={isActive}
              className={cn(
                "inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors",
                isActive
                  ? "border-ink bg-ink text-paper"
                  : "border-soft bg-paper text-ink-muted hover:border-powder hover:text-ink"
              )}
            >
              <span
                aria-hidden="true"
                className="h-2.5 w-2.5 rounded-full border border-ink/20"
                style={{ backgroundColor: swatch.hex }}
              />
              <span>{swatch.label}</span>
            </button>
          );
        })}
      </div>

      <p className="mt-3 text-sm leading-relaxed text-ink-muted">
        <strong className="font-medium text-ink">{activeSwatch.label}:</strong>{" "}
        {activeSwatch.role}
      </p>
    </div>
  );
}
