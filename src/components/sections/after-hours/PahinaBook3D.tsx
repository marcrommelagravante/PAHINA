"use client";

import { useEffect, useMemo, useState } from "react";
import * as THREE from "three";
import { AFTER_HOURS_TEXTURES } from "@/data/afterHours";
import { createBookCoverMaps } from "./textures";

interface PahinaBook3DProps {
  /** 0 = matte Deep Ink Grey linen (Act 1); 1 = brushed-silver illuminated sheen (Act 3) */
  silverSheen?: number;
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
}

/**
 * Procedurally modelled closed hardcover PAHINA book:
 * - Overhanging linen front & back boards in Deep Ink Grey
 * - Rounded cloth spine with subtle head/tail binding ribs & vertical PAHINA stamp
 * - Inset uncoated paper page block with fine stacked leaf texture
 * - Blind-debossed emblem + wordmark on front; "Every page holds a story." on back
 */
export function PahinaBook3D({
  silverSheen = 0,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 1,
}: PahinaBook3DProps) {
  const [linenImg, setLinenImg] = useState<HTMLImageElement | null>(null);
  const [fontsReady, setFontsReady] = useState(false);

  // Load real Japanese linen cloth photograph asynchronously
  useEffect(() => {
    let active = true;
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      if (active) setLinenImg(img);
    };
    img.src = AFTER_HOURS_TEXTURES.linenCloth;

    if (typeof document !== "undefined" && document.fonts) {
      document.fonts.ready.then(() => {
        if (active) setFontsReady(true);
      });
    }

    return () => {
      active = false;
    };
  }, []);

  const maps = useMemo(() => {
    if (typeof document === "undefined") return null;
    // Rebuild cleanly once fonts & linen cloth texture are ready
    void fontsReady;
    return createBookCoverMaps(linenImg);
  }, [linenImg, fontsReady]);

  useEffect(() => {
    return () => {
      maps?.dispose();
    };
  }, [maps]);

  // Book architectural dimensions (classic royal octavo hardcover ratio ~1 : 1.38)
  const bookW = 1.44;
  const bookH = 1.98;
  const totalDepth = 0.24;
  const boardT = 0.024;
  const pageOverhang = 0.042;
  const pageDepth = totalDepth - boardT * 2;
  const pageW = bookW - pageOverhang;
  const pageH = bookH - pageOverhang * 2;
  const spineRadius = totalDepth / 2;

  // Material calibration: Deep Ink Grey linen cloth in Act 1, elevated cool-silver sheen in Act 3
  const coverColor = useMemo(() => {
    const base = new THREE.Color("#C7CFD4");
    const silver = new THREE.Color("#E1E6E9");
    return base.lerp(silver, silverSheen);
  }, [silverSheen]);

  const metalness = 0.08 + silverSheen * 0.26;
  const roughness = 0.88 - silverSheen * 0.32;
  const bumpScale = 0.018;

  const clothSideColor = useMemo(() => {
    const base = new THREE.Color("#363C42");
    const silver = new THREE.Color("#565E66");
    return base.lerp(silver, silverSheen);
  }, [silverSheen]);

  const frontMaterials = useMemo(() => {
    const edgeMat = new THREE.MeshStandardMaterial({
      color: clothSideColor,
      roughness: roughness + 0.06,
      metalness,
    });
    const faceMat = new THREE.MeshStandardMaterial({
      color: coverColor,
      map: maps?.frontMap ?? null,
      bumpMap: maps?.frontBump ?? null,
      bumpScale,
      roughnessMap: maps?.frontRoughness ?? null,
      roughness,
      metalness,
    });
    // BoxGeometry material order: +x, -x, +y, -y, +z (front), -z (inside board)
    return [edgeMat, edgeMat, edgeMat, edgeMat, faceMat, edgeMat];
  }, [clothSideColor, coverColor, maps, metalness, roughness]);

  const backMaterials = useMemo(() => {
    const edgeMat = new THREE.MeshStandardMaterial({
      color: clothSideColor,
      roughness: roughness + 0.06,
      metalness,
    });
    const faceMat = new THREE.MeshStandardMaterial({
      color: coverColor,
      map: maps?.backMap ?? null,
      bumpMap: maps?.backBump ?? null,
      bumpScale,
      roughnessMap: maps?.backRoughness ?? null,
      roughness,
      metalness,
    });
    // +z is inside board, -z is outer back cover
    return [edgeMat, edgeMat, edgeMat, edgeMat, edgeMat, faceMat];
  }, [clothSideColor, coverColor, maps, metalness, roughness]);

  useEffect(() => {
    return () => {
      frontMaterials.forEach((m) => m.dispose());
    };
  }, [frontMaterials]);

  useEffect(() => {
    return () => {
      backMaterials.forEach((m) => m.dispose());
    };
  }, [backMaterials]);

  return (
    <group position={position} rotation={rotation} scale={scale}>
      {/* Front hardcover board */}
      <mesh
        position={[0, 0, totalDepth / 2 - boardT / 2]}
        material={frontMaterials}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[bookW, bookH, boardT]} />
      </mesh>

      {/* Back hardcover board */}
      <mesh
        position={[0, 0, -totalDepth / 2 + boardT / 2]}
        material={backMaterials}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[bookW, bookH, boardT]} />
      </mesh>

      {/* Rounded linen-bound spine on the left (-X) edge */}
      <mesh
        position={[-bookW / 2 + 0.005, 0, 0]}
        rotation={[0, -Math.PI / 2, 0]}
        castShadow
        receiveShadow
      >
        <cylinderGeometry
          args={[spineRadius, spineRadius, bookH, 28, 1, false, -Math.PI / 2, Math.PI]}
        />
        <meshStandardMaterial
          color={coverColor}
          map={maps?.spineMap ?? null}
          bumpMap={maps?.spineBump ?? null}
          bumpScale={0.014}
          roughness={roughness}
          metalness={metalness}
        />
      </mesh>

      {/* Inset uncoated paper page block */}
      <mesh position={[-pageOverhang * 0.45, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[pageW, pageH, pageDepth]} />
        <meshStandardMaterial
          color="#EAE5D9"
          map={maps?.pagesMap ?? null}
          roughness={0.92}
          metalness={0.02}
        />
      </mesh>

      {/* Subtle woven linen head & tail bands tucked between spine and page block */}
      <mesh position={[-bookW / 2 + 0.032, pageH / 2 + 0.004, 0]}>
        <boxGeometry args={[0.04, 0.016, pageDepth - 0.01]} />
        <meshStandardMaterial color="#B9D0E0" roughness={0.85} metalness={0.04} />
      </mesh>
      <mesh position={[-bookW / 2 + 0.032, -pageH / 2 - 0.004, 0]}>
        <boxGeometry args={[0.04, 0.016, pageDepth - 0.01]} />
        <meshStandardMaterial color="#B9D0E0" roughness={0.85} metalness={0.04} />
      </mesh>
    </group>
  );
}
