"use client";

import { useEffect, useMemo, useRef, type MutableRefObject } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { AFTER_HOURS_TEXTURES } from "@/data/afterHours";

interface CremaHorizon3DProps {
  scrollProgressRef: MutableRefObject<number>;
  isMobile: boolean;
}

function clamp01(v: number) {
  return Math.max(0, Math.min(1, v));
}

function smoothstep(edge0: number, edge1: number, x: number) {
  const t = clamp01((x - edge0) / (edge1 - edge0));
  return t * t * (3 - 2 * t);
}

const CREMA_VERTEX_SHADER = /* glsl */ `
  varying vec3 vNormalWorld;
  varying vec3 vWorldPos;
  varying vec3 vLocalPos;

  void main() {
    vLocalPos = normalize(position);
    vec4 worldPos = modelMatrix * vec4(position, 1.0);
    vWorldPos = worldPos.xyz;
    vNormalWorld = normalize(mat3(modelMatrix) * normal);
    gl_Position = projectionMatrix * viewMatrix * worldPos;
  }
`;

const CREMA_FRAGMENT_SHADER = /* glsl */ `
  uniform sampler2D uCremaMap;
  uniform float uTime;
  uniform float uOpacity;
  uniform float uBeamImpact;
  uniform vec3 uRimColor;

  varying vec3 vNormalWorld;
  varying vec3 vWorldPos;
  varying vec3 vLocalPos;

  // Pole-free top-down azimuthal crema dome mapping so swirling foam never pinches
  vec3 sampleCrema(vec3 dir, float drift) {
    vec2 disk = dir.xz / (0.62 + max(dir.y, -0.2) * 0.58);

    float r = length(disk);
    float angle1 = drift * 0.35 + r * 0.45;
    float c1 = cos(angle1);
    float s1 = sin(angle1);
    vec2 rot1 = mat2(c1, -s1, s1, c1) * disk;

    float angle2 = -drift * 0.22 + r * 0.28 + 1.1;
    float c2 = cos(angle2);
    float s2 = sin(angle2);
    vec2 rot2 = mat2(c2, -s2, s2, c2) * disk;

    vec2 uv1 = rot1 * 0.68 + vec2(0.5, 0.5);
    vec2 uv2 = rot2 * 0.52 + vec2(0.32, 0.64);

    vec3 col1 = texture2D(uCremaMap, uv1).rgb;
    vec3 col2 = texture2D(uCremaMap, uv2).rgb;
    return mix(col1, col2, 0.35);
  }

  void main() {
    vec3 N = normalize(vNormalWorld);
    vec3 V = normalize(cameraPosition - vWorldPos);

    vec3 raw = sampleCrema(normalize(vLocalPos), uTime * 0.032);

    // Rich roasted espresso & velvety warm-ivory crema contrast suited to Paper White daylight
    float luma = dot(raw, vec3(0.299, 0.587, 0.114));
    float filament = smoothstep(0.14, 0.76, luma);
    vec3 deepEspresso = vec3(0.11, 0.085, 0.072);
    vec3 goldenCrema = mix(vec3(0.54, 0.36, 0.20), vec3(0.95, 0.85, 0.68), filament);
    vec3 baseCol = mix(deepEspresso, goldenCrema, pow(filament, 1.15) * 0.94);

    // Soft daylight shading across the dome curvature
    float horizonShade = smoothstep(-0.15, 0.9, N.y);
    baseCol *= (0.48 + 0.62 * horizonShade);

    // Crisp Powder Blue (#B9D0E0) & porcelain daylight Fresnel rim along the curved horizon
    float fresnel = pow(1.0 - max(dot(N, V), 0.0), 3.2);
    float upperMask = smoothstep(-0.08, 0.55, N.y);
    vec3 rimCol = mix(uRimColor, vec3(0.96, 0.95, 0.92), 0.35);
    vec3 shaded = mix(baseCol, rimCol, clamp(fresnel * upperMask * 0.92, 0.0, 0.92));

    // Soft sunlit glow pool where the vertical skylight beam touches the apex
    float apexDist = length(vWorldPos.xz);
    float beamPool = exp(-apexDist * apexDist * 1.45) * smoothstep(0.58, 0.98, N.y) * uBeamImpact;
    shaded = mix(shaded, vec3(0.98, 0.97, 0.94), clamp(beamPool * 0.72, 0.0, 0.72));

    gl_FragColor = vec4(shaded, uOpacity);
  }
`;

const HALO_VERTEX_SHADER = /* glsl */ `
  varying vec3 vNormalWorld;
  varying vec3 vWorldPos;

  void main() {
    vec4 worldPos = modelMatrix * vec4(position, 1.0);
    vWorldPos = worldPos.xyz;
    vNormalWorld = normalize(mat3(modelMatrix) * normal);
    gl_Position = projectionMatrix * viewMatrix * worldPos;
  }
`;

const HALO_FRAGMENT_SHADER = /* glsl */ `
  uniform vec3 uRimColor;
  uniform float uOpacity;
  varying vec3 vNormalWorld;
  varying vec3 vWorldPos;

  void main() {
    vec3 N = normalize(vNormalWorld);
    vec3 V = normalize(cameraPosition - vWorldPos);
    // Clean Powder Blue atmospheric rim visible on light Paper White (#F4F1EA)
    float rim = pow(clamp(0.72 - dot(-N, V), 0.0, 1.0), 2.8);
    float upperMask = smoothstep(0.02, 0.62, N.y);
    float alpha = rim * upperMask * 0.72 * uOpacity;
    gl_FragColor = vec4(uRimColor, alpha);
  }
`;

const BEAM_VERTEX_SHADER = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const BEAM_FRAGMENT_SHADER = /* glsl */ `
  uniform float uProgress;
  uniform float uOpacity;
  varying vec2 vUv;

  void main() {
    // vUv.y = 1 at top (just below CTA), 0 at bottom (contact with crema horizon)
    float headEdge = 1.0 - uProgress;
    float verticalMask = smoothstep(headEdge - 0.08, headEdge + 0.04, vUv.y);
    float topFade = smoothstep(1.0, 0.64, vUv.y);
    float bottomFocus = 0.55 + 0.55 * (1.0 - vUv.y);

    // Whisper-thin architectural meridian beam in Deep Slate / Powder Blue legible on Paper White
    float dx = abs(vUv.x - 0.5) * 2.0;
    float core = exp(-dx * dx * 480.0);
    float halo = exp(-dx * dx * 28.0) * 0.28;

    float alpha = clamp((core * 0.72 + halo) * verticalMask * topFade * bottomFocus * uOpacity, 0.0, 0.9);
    // Slate-ink core feathered into soft Powder Blue halo
    vec3 beamColor = mix(vec3(0.725, 0.816, 0.878), vec3(0.255, 0.278, 0.302), core);

    gl_FragColor = vec4(beamColor, alpha);
  }
`;

/**
 * Act 2 — Rotating velvet espresso crema horizon edged with Powder Blue (#B9D0E0)
 * + slender vertical skylight meridian beam, set directly on Paper White (#F4F1EA).
 */
export function CremaHorizon3D({
  scrollProgressRef,
  isMobile,
}: CremaHorizon3DProps) {
  const groupRef = useRef<THREE.Group>(null);
  const sphereRef = useRef<THREE.Group>(null);
  const cremaMeshRef = useRef<THREE.Mesh>(null);
  const haloMeshRef = useRef<THREE.Mesh>(null);
  const beamMeshRef = useRef<THREE.Mesh>(null);
  const impactRingRef = useRef<THREE.Mesh>(null);

  const cremaTexture = useMemo(() => {
    const loader = new THREE.TextureLoader();
    const tex = loader.load(AFTER_HOURS_TEXTURES.cremaSurface);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.MirroredRepeatWrapping;
    tex.anisotropy = 4;
    return tex;
  }, []);

  const cremaMaterial = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: {
          uCremaMap: { value: cremaTexture },
          uTime: { value: 0 },
          uOpacity: { value: 0 },
          uBeamImpact: { value: 0 },
          uRimColor: { value: new THREE.Color("#B9D0E0") },
        },
        vertexShader: CREMA_VERTEX_SHADER,
        fragmentShader: CREMA_FRAGMENT_SHADER,
        transparent: true,
        depthWrite: true,
      }),
    [cremaTexture]
  );

  const haloMaterial = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: {
          uRimColor: { value: new THREE.Color("#B9D0E0") },
          uOpacity: { value: 0 },
        },
        vertexShader: HALO_VERTEX_SHADER,
        fragmentShader: HALO_FRAGMENT_SHADER,
        transparent: true,
        blending: THREE.NormalBlending,
        side: THREE.BackSide,
        depthWrite: false,
      }),
    []
  );

  const beamMaterial = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: {
          uProgress: { value: 0 },
          uOpacity: { value: 0 },
        },
        vertexShader: BEAM_VERTEX_SHADER,
        fragmentShader: BEAM_FRAGMENT_SHADER,
        transparent: true,
        blending: THREE.NormalBlending,
        depthWrite: false,
      }),
    []
  );

  useEffect(() => {
    return () => {
      cremaTexture.dispose();
      cremaMaterial.dispose();
      haloMaterial.dispose();
      beamMaterial.dispose();
    };
  }, [cremaTexture, cremaMaterial, haloMaterial, beamMaterial]);

  const radius = isMobile ? 3.55 : 4.65;
  const settledY = isMobile ? -4.55 : -5.15;
  const hiddenY = settledY - 2.6;
  const apexY = settledY + radius;

  useFrame((state, delta) => {
    const p = scrollProgressRef.current;

    const enterT = smoothstep(0.28, 0.40, p);
    const exitT = smoothstep(0.55, 0.62, p);
    const opacity = enterT * (1 - exitT);

    if (groupRef.current) {
      groupRef.current.visible = opacity > 0.002;
    }

    if (opacity <= 0.002) return;

    const yPos = THREE.MathUtils.lerp(hiddenY, settledY, enterT) - exitT * 2.1;

    if (sphereRef.current) {
      sphereRef.current.position.y = yPos;
      sphereRef.current.rotation.y += delta * 0.042;
    }

    const beamDescent = smoothstep(0.42, 0.52, p);
    const beamOpacity = smoothstep(0.40, 0.45, p) * (1 - exitT);
    const beamImpact = smoothstep(0.49, 0.54, p) * (1 - exitT);

    if (cremaMeshRef.current) {
      const mat = cremaMeshRef.current.material as THREE.ShaderMaterial;
      mat.uniforms.uTime.value = state.clock.getElapsedTime();
      mat.uniforms.uOpacity.value = opacity;
      mat.uniforms.uBeamImpact.value = beamImpact;
    }

    if (haloMeshRef.current) {
      const mat = haloMeshRef.current.material as THREE.ShaderMaterial;
      mat.uniforms.uOpacity.value = opacity;
    }

    if (beamMeshRef.current) {
      const mat = beamMeshRef.current.material as THREE.ShaderMaterial;
      mat.uniforms.uProgress.value = beamDescent;
      mat.uniforms.uOpacity.value = beamOpacity;
    }

    if (impactRingRef.current) {
      impactRingRef.current.position.y = yPos + radius + 0.02;
      const mat = impactRingRef.current.material as THREE.MeshBasicMaterial;
      mat.opacity = beamImpact * 0.65;
      const ringScale = 0.72 + beamImpact * 0.5;
      impactRingRef.current.scale.set(ringScale, ringScale, 1);
    }
  });

  const beamHeight = isMobile ? 0.92 : 0.78;
  const beamCenterY = apexY + beamHeight / 2 - 0.03;

  return (
    <group ref={groupRef} position={[0, 0, -1.2]}>
      {/* Main crema horizon sphere + Powder Blue daylight atmosphere collar */}
      <group ref={sphereRef} position={[0, hiddenY, 0]} rotation={[0.14, 0, 0.08]}>
        <mesh ref={cremaMeshRef} material={cremaMaterial}>
          <sphereGeometry args={[radius, 88, 88]} />
        </mesh>
        <mesh ref={haloMeshRef} material={haloMaterial}>
          <sphereGeometry args={[radius * 1.028, 64, 64]} />
        </mesh>
      </group>

      {/* Slender descending Powder-Slate vertical beam */}
      <mesh ref={beamMeshRef} position={[0, beamCenterY, 0.15]} material={beamMaterial}>
        <planeGeometry args={[0.55, beamHeight]} />
      </mesh>

      {/* Soft sunlit ring on upper crema apex */}
      <mesh
        ref={impactRingRef}
        position={[0, apexY + 0.02, 0.15]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <ringGeometry args={[0.04, 0.36, 48]} />
        <meshBasicMaterial
          color="#FAF8F3"
          transparent
          opacity={0}
          depthWrite={false}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}
