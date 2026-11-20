"use client";

import { useEffect, useMemo, useRef, type MutableRefObject } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import {
  buildGalleryPlacements,
  type GalleryTilePlacement,
} from "@/data/afterHours";
import { PahinaBook3D } from "./PahinaBook3D";

interface GalleryCorridor3DProps {
  scrollProgressRef: MutableRefObject<number>;
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

const TILE_VERTEX_SHADER = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

/**
 * Daylight Paper White exhibition photo shader:
 * - Clean ~4px-equivalent rounded corners via signed-distance field
 * - Subtle UV inset for crisp edge-to-edge photography
 * - Distant tiles sit veiled in cool Paper White gallery mist & subtle desaturation
 * - As tiles glide forward toward the camera, mist clears into full natural colour
 * - Delicate 1px Soft Grey / Ink hairline framing matching PAHINA's printed-stationery aesthetic
 */
const TILE_FRAGMENT_SHADER = /* glsl */ `
  uniform sampler2D uMap;
  uniform float uHasMap;
  uniform float uOpacity;
  uniform float uProximity;
  uniform vec2 uAspect;

  varying vec2 vUv;

  float roundedBoxSDF(vec2 p, vec2 b, float r) {
    vec2 q = abs(p) - b + vec2(r);
    return length(max(q, 0.0)) + min(max(q.x, q.y), 0.0) - r;
  }

  void main() {
    vec2 centered = (vUv - 0.5) * uAspect;
    float cornerR = 0.026;
    float dist = roundedBoxSDF(centered, uAspect * 0.5, cornerR);
    float edgeAlpha = 1.0 - smoothstep(-0.006, 0.006, dist);
    if (edgeAlpha <= 0.004) discard;

    vec2 uv = vUv * 0.96 + 0.02;
    vec3 paperWhite = vec3(0.957, 0.945, 0.918);
    vec3 texCol = uHasMap > 0.5
      ? texture2D(uMap, uv).rgb
      : vec3(0.88, 0.87, 0.84);

    // Subtle cool-slate desaturation at depth lifting to natural colour as tile nears camera
    float luma = dot(texCol, vec3(0.299, 0.587, 0.114));
    vec3 softMono = vec3(luma * 0.98, luma * 0.99, luma * 1.01);
    float saturation = mix(0.25, 0.96, uProximity);
    vec3 graded = mix(softMono, texCol, saturation);

    // Paper White atmospheric mist veils distant photographs cleanly into #F4F1EA
    float mist = mix(0.68, 0.04, uProximity);
    vec3 finalCol = mix(graded, paperWhite, mist);

    // Delicate architectural hairline border matching Soft Grey (#E8E8E4) / Slate
    float rim = smoothstep(-0.015, -0.002, dist) * edgeAlpha;
    vec3 borderCol = vec3(0.84, 0.85, 0.83);
    finalCol = mix(finalCol, borderCol, rim * 0.72);

    gl_FragColor = vec4(finalCol, edgeAlpha * uOpacity);
  }
`;

interface GalleryTileProps {
  tile: GalleryTilePlacement;
  textureCache: Map<string, THREE.Texture>;
  act3ProgressRef: MutableRefObject<number>;
  visibilityRef: MutableRefObject<number>;
}

function GalleryTileMesh({
  tile,
  textureCache,
  act3ProgressRef,
  visibilityRef,
}: GalleryTileProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  const dims = useMemo(() => {
    const w = tile.aspect === "landscape" ? 1.56 : 1.12;
    const h = tile.aspect === "landscape" ? 1.16 : 1.44;
    return { w: w * tile.scale, h: h * tile.scale };
  }, [tile.aspect, tile.scale]);

  const material = useMemo(() => {
    const existing = textureCache.get(tile.src);
    return new THREE.ShaderMaterial({
      uniforms: {
        uMap: { value: existing ?? null },
        uHasMap: { value: existing ? 1 : 0 },
        uOpacity: { value: 0 },
        uProximity: { value: 0 },
        uAspect: { value: new THREE.Vector2(dims.w, dims.h) },
      },
      vertexShader: TILE_VERTEX_SHADER,
      fragmentShader: TILE_FRAGMENT_SHADER,
      transparent: true,
      depthWrite: false,
    });
  }, [dims.h, dims.w, textureCache, tile.src]);

  useEffect(() => {
    return () => {
      material.dispose();
    };
  }, [material]);

  useFrame(() => {
    const mesh = meshRef.current;
    if (!mesh) return;

    const vis = visibilityRef.current;
    if (vis <= 0.002) {
      mesh.visible = false;
      return;
    }

    const mat = mesh.material as THREE.ShaderMaterial;
    if (mat.uniforms.uHasMap.value < 0.5) {
      const tex = textureCache.get(tile.src);
      if (tex) {
        mat.uniforms.uMap.value = tex;
        mat.uniforms.uHasMap.value = 1;
      }
    }

    const p3 = act3ProgressRef.current;
    const travel = p3 * 14.5 * tile.parallaxSpeed;
    const currentZ = tile.z + travel;

    mesh.position.z = currentZ;

    const farFade = smoothstep(-23.5, -10.5, currentZ);
    const nearFade = 1 - smoothstep(2.1, 4.9, currentZ);
    const tileAlpha = farFade * nearFade * vis;

    mesh.visible = tileAlpha > 0.004;
    if (!mesh.visible) return;

    const proximity = smoothstep(-13.0, 1.4, currentZ);

    mat.uniforms.uOpacity.value = tileAlpha;
    mat.uniforms.uProximity.value = proximity;
  });

  return (
    <mesh
      ref={meshRef}
      position={[tile.x, tile.y, tile.z]}
      rotation={[0, tile.rotY, 0]}
      material={material}
    >
      <planeGeometry args={[dims.w, dims.h]} />
    </mesh>
  );
}

/**
 * Act 3 — Daylight Paper White 3D exhibition corridor with parallaxing PAHINA photos
 * and the centered Deep Ink Grey hardcover book rotating 180° scrubbed to scroll,
 * revealing the back cover ("Every page holds a story.").
 */
export function GalleryCorridor3D({
  scrollProgressRef,
  pointerRef,
  isMobile,
}: GalleryCorridor3DProps) {
  const groupRef = useRef<THREE.Group>(null);
  const bookPivotRef = useRef<THREE.Group>(null);
  const keyLightRef = useRef<THREE.DirectionalLight>(null);
  const fillLightRef = useRef<THREE.DirectionalLight>(null);
  const rimLightRef = useRef<THREE.DirectionalLight>(null);
  const ambientRef = useRef<THREE.AmbientLight>(null);

  const act3ProgressRef = useRef(0);
  const visibilityRef = useRef(0);

  const placements = useMemo(() => buildGalleryPlacements(isMobile), [isMobile]);
  const textureCache = useMemo(() => new Map<string, THREE.Texture>(), []);

  useEffect(() => {
    let disposed = false;
    const loader = new THREE.TextureLoader();
    const uniqueUrls = Array.from(new Set(placements.map((p) => p.src)));

    uniqueUrls.forEach((url) => {
      if (textureCache.has(url)) return;
      loader.load(url, (tex) => {
        if (disposed) {
          tex.dispose();
          return;
        }
        tex.colorSpace = THREE.SRGBColorSpace;
        tex.minFilter = THREE.LinearMipmapLinearFilter;
        tex.magFilter = THREE.LinearFilter;
        tex.anisotropy = 4;
        textureCache.set(url, tex);
      });
    });

    return () => {
      disposed = true;
      textureCache.forEach((t) => t.dispose());
      textureCache.clear();
    };
  }, [placements, textureCache]);

  useFrame((state) => {
    const p = scrollProgressRef.current;

    const enterT = smoothstep(0.64, 0.72, p);
    const exitT = smoothstep(0.935, 0.992, p);
    const vis = enterT * (1 - exitT);
    const act3Local = clamp01((p - 0.64) / 0.34);

    act3ProgressRef.current = act3Local;
    visibilityRef.current = vis;

    if (groupRef.current) {
      groupRef.current.visible = vis > 0.01;
    }

    if (vis <= 0.01) return;

    if (bookPivotRef.current) {
      const elapsed = state.clock.getElapsedTime();
      const targetRotY = -0.22 + smoothstep(0.06, 0.92, act3Local) * (Math.PI + 0.36);
      const pointerYaw = isMobile ? 0 : pointerRef.current.x * 0.1;
      const pointerPitch = isMobile ? 0 : pointerRef.current.y * 0.05;

      bookPivotRef.current.rotation.y = THREE.MathUtils.lerp(
        bookPivotRef.current.rotation.y,
        targetRotY + pointerYaw,
        0.12
      );
      bookPivotRef.current.rotation.x = THREE.MathUtils.lerp(
        bookPivotRef.current.rotation.x,
        0.04 + pointerPitch,
        0.08
      );
      const baseY = isMobile ? -0.16 : -0.18;
      bookPivotRef.current.position.y =
        baseY + Math.sin(elapsed * 0.42) * 0.03 - (1 - enterT) * 0.45;
      const s = 0.88 + enterT * 0.12;
      bookPivotRef.current.scale.setScalar(s);
    }

    // Crisp sunlit gallery studio illumination for the turning Deep Ink Grey linen book
    const lightGain = Math.max(0.55, vis);
    if (keyLightRef.current) keyLightRef.current.intensity = 2.4 * lightGain;
    if (fillLightRef.current) fillLightRef.current.intensity = 1.25 * lightGain;
    if (rimLightRef.current) rimLightRef.current.intensity = 1.3 * lightGain;
    if (ambientRef.current) ambientRef.current.intensity = 1.2 * lightGain;
  });

  const bookScale = isMobile ? 0.62 : 0.74;

  return (
    <group ref={groupRef}>
      {/* Sunlit gallery lighting rig */}
      <ambientLight ref={ambientRef} color="#FAF8F3" intensity={1.2} />

      <directionalLight
        ref={keyLightRef}
        position={[3.2, 4.0, 4.8]}
        intensity={2.4}
        color="#FFFDF8"
      />

      <directionalLight
        ref={fillLightRef}
        position={[-3.8, 1.6, 3.2]}
        intensity={1.25}
        color="#DCE7EF"
      />

      <directionalLight
        ref={rimLightRef}
        position={[1.8, 2.2, -3.5]}
        intensity={1.3}
        color="#B9D0E0"
      />

      {/* 3D parallax photo corridor flanking both sides */}
      {placements.map((tile) => (
        <GalleryTileMesh
          key={tile.id}
          tile={tile}
          textureCache={textureCache}
          act3ProgressRef={act3ProgressRef}
          visibilityRef={visibilityRef}
        />
      ))}

      {/* Centered hardcover PAHINA book rotating ~180° to reveal "Every page holds a story." */}
      <group ref={bookPivotRef} position={[0, -0.18, 0.35]}>
        <PahinaBook3D silverSheen={0.35} scale={bookScale} />
      </group>
    </group>
  );
}
