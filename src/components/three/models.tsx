"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * Standard sunlit Paper White gallery studio lighting rig shared across section 3D canvases.
 */
export function DaylightStudioLights() {
  return (
    <>
      <ambientLight color="#FAF8F3" intensity={1.25} />
      <directionalLight
        position={[3.4, 4.8, 3.8]}
        intensity={2.2}
        color="#FFFDF8"
      />
      <directionalLight
        position={[-3.6, 2.2, 2.4]}
        intensity={1.1}
        color="#DCE7EF"
      />
      <directionalLight
        position={[0.5, 2.8, -3.5]}
        intensity={1.15}
        color="#B9D0E0"
      />
    </>
  );
}

/**
 * Soft radial ambient occlusion contact shadow plane.
 */
export function SoftContactShadow({
  position = [0, -0.01, 0],
  scale = [1.8, 1.8],
  opacity = 0.65,
}: {
  position?: [number, number, number];
  scale?: [number, number];
  opacity?: number;
}) {
  const shadowTex = useMemo(() => {
    if (typeof document === "undefined") return null;
    const c = document.createElement("canvas");
    c.width = 128;
    c.height = 128;
    const ctx = c.getContext("2d");
    if (ctx) {
      const g = ctx.createRadialGradient(64, 64, 8, 64, 64, 62);
      g.addColorStop(0, "rgba(65, 71, 77, 0.34)");
      g.addColorStop(0.55, "rgba(65, 71, 77, 0.14)");
      g.addColorStop(1, "rgba(65, 71, 77, 0)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, 128, 128);
    }
    const t = new THREE.CanvasTexture(c);
    t.needsUpdate = true;
    return t;
  }, []);

  useEffect(() => {
    return () => {
      shadowTex?.dispose();
    };
  }, [shadowTex]);

  return (
    <mesh position={position} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={scale} />
      <meshBasicMaterial
        map={shadowTex}
        transparent
        opacity={opacity}
        depthWrite={false}
      />
    </mesh>
  );
}

/**
 * 1. Sculpted Ceramic Espresso / Latte Cup & Saucer with swirling latte art and rising steam wisps.
 */
export function CeramicCup3D({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 1,
  cupColor = "#FAF8F3",
  cremaColor = "#8B5E34",
  showSteam = true,
}: {
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
  cupColor?: string;
  cremaColor?: string;
  showSteam?: boolean;
}) {
  const steamGroupRef = useRef<THREE.Group>(null);
  const cremaRef = useRef<THREE.Mesh>(null);

  const latteArtTex = useMemo(() => {
    if (typeof document === "undefined") return null;
    const c = document.createElement("canvas");
    c.width = 256;
    c.height = 256;
    const ctx = c.getContext("2d");
    if (ctx) {
      ctx.fillStyle = cremaColor;
      ctx.fillRect(0, 0, 256, 256);
      const rg = ctx.createRadialGradient(128, 128, 18, 128, 128, 120);
      rg.addColorStop(0, "rgba(250, 248, 243, 0.35)");
      rg.addColorStop(0.6, "rgba(250, 248, 243, 0.08)");
      rg.addColorStop(1, "rgba(32, 22, 16, 0.32)");
      ctx.fillStyle = rg;
      ctx.fillRect(0, 0, 256, 256);

      // Rosetta heart microfoam leaves in Paper White
      ctx.fillStyle = "rgba(250, 248, 243, 0.86)";
      for (let i = 0; i < 4; i++) {
        const y = 165 - i * 24;
        const r = 34 - i * 5;
        ctx.beginPath();
        ctx.arc(128, y, r, 0, Math.PI, true);
        ctx.fill();
      }
      ctx.strokeStyle = cremaColor;
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(128, 65);
      ctx.lineTo(128, 195);
      ctx.stroke();
    }
    const t = new THREE.CanvasTexture(c);
    t.colorSpace = THREE.SRGBColorSpace;
    t.needsUpdate = true;
    return t;
  }, [cremaColor]);

  useEffect(() => {
    return () => {
      latteArtTex?.dispose();
    };
  }, [latteArtTex]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (cremaRef.current) {
      cremaRef.current.rotation.z = t * 0.14;
    }
    if (steamGroupRef.current && showSteam) {
      steamGroupRef.current.children.forEach((child, idx) => {
        const phase = (t * 0.45 + idx * 0.33) % 1;
        child.position.y = 0.46 + phase * 0.48;
        child.position.x = Math.sin(t * 1.4 + idx * 2.1) * 0.055;
        const s = Math.sin(phase * Math.PI);
        child.scale.setScalar(0.65 + s * 0.55);
        const mat = (child as THREE.Mesh).material as THREE.MeshBasicMaterial;
        if (mat) mat.opacity = s * 0.28;
      });
    }
  });

  return (
    <group position={position} rotation={rotation} scale={scale}>
      {/* Ceramic saucer */}
      <mesh position={[0, 0.03, 0]}>
        <cylinderGeometry args={[0.62, 0.44, 0.055, 36]} />
        <meshStandardMaterial color={cupColor} roughness={0.34} metalness={0.04} />
      </mesh>
      <mesh position={[0, 0.059, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.32, 0.58, 36]} />
        <meshStandardMaterial color="#E8E8E4" roughness={0.4} />
      </mesh>

      {/* Ceramic cup body */}
      <mesh position={[0, 0.25, 0]}>
        <cylinderGeometry args={[0.38, 0.28, 0.42, 36]} />
        <meshStandardMaterial color={cupColor} roughness={0.3} metalness={0.05} />
      </mesh>

      {/* Subtle Powder Blue foot ring */}
      <mesh position={[0, 0.06, 0]}>
        <cylinderGeometry args={[0.29, 0.28, 0.025, 32]} />
        <meshStandardMaterial color="#B9D0E0" roughness={0.4} />
      </mesh>

      {/* Inner dark rim & swirling latte art */}
      <mesh
        ref={cremaRef}
        position={[0, 0.445, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <circleGeometry args={[0.355, 36]} />
        <meshStandardMaterial
          map={latteArtTex}
          color="#FFFFFF"
          roughness={0.45}
        />
      </mesh>

      {/* Sculpted cup ear handle */}
      <mesh position={[0.38, 0.26, 0]} rotation={[0, 0, -Math.PI / 2]}>
        <torusGeometry args={[0.115, 0.028, 16, 28, Math.PI]} />
        <meshStandardMaterial color={cupColor} roughness={0.3} />
      </mesh>

      {/* Gentle rising steam wisps */}
      {showSteam && (
        <group ref={steamGroupRef}>
          {[0, 1, 2].map((i) => (
            <mesh key={i} position={[0, 0.55 + i * 0.14, 0]}>
              <sphereGeometry args={[0.065, 12, 12]} />
              <meshBasicMaterial
                color="#8999A6"
                transparent
                opacity={0.18}
                depthWrite={false}
              />
            </mesh>
          ))}
        </group>
      )}
    </group>
  );
}

/**
 * 2. Iced Glass Tumbler with layered milk, cascading espresso, floating ice cubes, and straw.
 */
export function IcedGlassTumbler3D({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 1,
  topLayerColor = "#5E3C23",
  bottomLayerColor = "#EFECE4",
}: {
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
  topLayerColor?: string;
  bottomLayerColor?: string;
}) {
  const iceRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (iceRef.current) {
      iceRef.current.position.y = 0.54 + Math.sin(t * 1.3) * 0.015;
      iceRef.current.rotation.y = t * 0.22;
    }
  });

  return (
    <group position={position} rotation={rotation} scale={scale}>
      {/* Cork / oak coaster */}
      <mesh position={[0, 0.018, 0]}>
        <cylinderGeometry args={[0.42, 0.42, 0.035, 32]} />
        <meshStandardMaterial color="#C8A986" roughness={0.78} />
      </mesh>

      {/* Lower cold milk / base layer */}
      <mesh position={[0, 0.24, 0]}>
        <cylinderGeometry args={[0.31, 0.275, 0.38, 32]} />
        <meshStandardMaterial color={bottomLayerColor} roughness={0.35} />
      </mesh>

      {/* Upper cascading espresso / specialty layer */}
      <mesh position={[0, 0.52, 0]}>
        <cylinderGeometry args={[0.335, 0.31, 0.22, 32]} />
        <meshStandardMaterial color={topLayerColor} roughness={0.32} />
      </mesh>

      {/* Creamy foam collar */}
      <mesh position={[0, 0.645, 0]}>
        <cylinderGeometry args={[0.34, 0.335, 0.045, 32]} />
        <meshStandardMaterial color="#FAF8F3" roughness={0.5} />
      </mesh>

      {/* Floating translucent ice cubes */}
      <group ref={iceRef} position={[0, 0.54, 0]}>
        <mesh position={[-0.09, 0.04, 0.06]} rotation={[0.3, 0.4, 0.2]}>
          <boxGeometry args={[0.13, 0.13, 0.13]} />
          <meshStandardMaterial
            color="#DCE7EF"
            transparent
            opacity={0.75}
            roughness={0.15}
          />
        </mesh>
        <mesh position={[0.1, 0.02, -0.05]} rotation={[-0.2, 0.6, -0.3]}>
          <boxGeometry args={[0.12, 0.12, 0.12]} />
          <meshStandardMaterial
            color="#FFFFFF"
            transparent
            opacity={0.75}
            roughness={0.15}
          />
        </mesh>
      </group>

      {/* Outer translucent architectural glass wall */}
      <mesh position={[0, 0.38, 0]}>
        <cylinderGeometry args={[0.36, 0.295, 0.68, 36]} />
        <meshStandardMaterial
          color="#DCE7EF"
          transparent
          opacity={0.28}
          roughness={0.12}
          metalness={0.1}
        />
      </mesh>

      {/* Minimalist Deep Ink Grey straw */}
      <mesh position={[0.1, 0.56, -0.04]} rotation={[0.08, 0, -0.16]}>
        <cylinderGeometry args={[0.022, 0.022, 0.78, 16]} />
        <meshStandardMaterial color="#41474D" roughness={0.4} />
      </mesh>
    </group>
  );
}

/**
 * 3. Whipped Frappe Glass with blended body, piped whipped cream dome, and drizzle.
 */
export function WhippedFrappeGlass3D({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 1,
  bodyColor = "#9E7B5D",
  drizzleColor = "#4B2E1E",
}: {
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
  bodyColor?: string;
  drizzleColor?: string;
}) {
  return (
    <group position={position} rotation={rotation} scale={scale}>
      {/* Coaster */}
      <mesh position={[0, 0.018, 0]}>
        <cylinderGeometry args={[0.42, 0.42, 0.035, 32]} />
        <meshStandardMaterial color="#DCE7EF" roughness={0.5} />
      </mesh>

      {/* Blended ice-cream coffee body */}
      <mesh position={[0, 0.36, 0]}>
        <cylinderGeometry args={[0.34, 0.25, 0.64, 32]} />
        <meshStandardMaterial color={bodyColor} roughness={0.42} />
      </mesh>

      {/* Outer clear tall glass */}
      <mesh position={[0, 0.37, 0]}>
        <cylinderGeometry args={[0.36, 0.265, 0.68, 36]} />
        <meshStandardMaterial
          color="#FFFFFF"
          transparent
          opacity={0.25}
          roughness={0.12}
        />
      </mesh>

      {/* Piped whipped cream layered dome */}
      <mesh position={[0, 0.72, 0]}>
        <sphereGeometry args={[0.31, 28, 20, 0, Math.PI * 2, 0, Math.PI * 0.65]} />
        <meshStandardMaterial color="#FAF8F3" roughness={0.55} />
      </mesh>
      <mesh position={[0, 0.85, 0]}>
        <sphereGeometry args={[0.2, 24, 16]} />
        <meshStandardMaterial color="#FFFFFF" roughness={0.55} />
      </mesh>

      {/* Sauce / cookie crumble ring on whipped cream */}
      <mesh position={[0, 0.76, 0]} rotation={[Math.PI / 2, 0.15, 0]}>
        <torusGeometry args={[0.24, 0.018, 12, 28]} />
        <meshStandardMaterial color={drizzleColor} roughness={0.35} />
      </mesh>

      {/* Straw */}
      <mesh position={[-0.1, 0.66, 0.05]} rotation={[-0.06, 0, 0.18]}>
        <cylinderGeometry args={[0.025, 0.025, 0.84, 16]} />
        <meshStandardMaterial color="#41474D" roughness={0.38} />
      </mesh>
    </group>
  );
}

/**
 * 4. Ceramic Pasta Bowl with nested golden pasta coils & herb accent.
 */
export function PastaBowl3D({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 1,
  sauceColor = "#E4C998",
}: {
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
  sauceColor?: string;
}) {
  return (
    <group position={position} rotation={rotation} scale={scale}>
      {/* Warm oak table mat */}
      <mesh position={[0, 0.02, 0]}>
        <cylinderGeometry args={[0.72, 0.72, 0.035, 36]} />
        <meshStandardMaterial color="#C8A986" roughness={0.75} />
      </mesh>

      {/* Wide matte stoneware pasta bowl */}
      <mesh position={[0, 0.16, 0]}>
        <cylinderGeometry args={[0.66, 0.44, 0.24, 36]} />
        <meshStandardMaterial color="#FAF8F3" roughness={0.36} />
      </mesh>
      <mesh position={[0, 0.281, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.52, 0.66, 36]} />
        <meshStandardMaterial color="#E8E8E4" roughness={0.4} />
      </mesh>

      {/* Sauce & pasta bed */}
      <mesh position={[0, 0.26, 0]}>
        <cylinderGeometry args={[0.53, 0.48, 0.06, 32]} />
        <meshStandardMaterial color={sauceColor} roughness={0.48} />
      </mesh>

      {/* Twirled pasta nest */}
      <mesh position={[0, 0.33, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusKnotGeometry args={[0.19, 0.055, 64, 12, 2, 3]} />
        <meshStandardMaterial color={sauceColor} roughness={0.42} />
      </mesh>

      {/* Basil leaf garnish */}
      <mesh position={[0.04, 0.42, 0.03]} rotation={[0.3, 0.5, 0.2]}>
        <sphereGeometry args={[0.065, 14, 10]} />
        <meshStandardMaterial color="#5E7B52" roughness={0.5} />
      </mesh>
    </group>
  );
}

/**
 * 5. Artisan Wooden Pizza Board with golden blistered crust & slice grooves.
 */
export function PizzaBoard3D({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 1,
  toppingColor = "#C85A3B",
}: {
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
  toppingColor?: string;
}) {
  return (
    <group position={position} rotation={rotation} scale={scale}>
      {/* Oak serving board + paddle handle */}
      <mesh position={[0, 0.03, 0]}>
        <cylinderGeometry args={[0.74, 0.74, 0.045, 36]} />
        <meshStandardMaterial color="#C4A07A" roughness={0.72} />
      </mesh>
      <mesh position={[0.82, 0.03, 0]}>
        <boxGeometry args={[0.34, 0.042, 0.22]} />
        <meshStandardMaterial color="#C4A07A" roughness={0.72} />
      </mesh>

      {/* Golden baked crust rim */}
      <mesh position={[0, 0.085, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.58, 0.065, 16, 36]} />
        <meshStandardMaterial color="#D69E5C" roughness={0.58} />
      </mesh>

      {/* Melted mozzarella center */}
      <mesh position={[0, 0.08, 0]}>
        <cylinderGeometry args={[0.56, 0.56, 0.045, 32]} />
        <meshStandardMaterial color="#F3E2BA" roughness={0.45} />
      </mesh>

      {/* Topping medallions around the slices */}
      {[0, 1, 2, 3, 4, 5].map((i) => {
        const a = (i / 6) * Math.PI * 2;
        return (
          <mesh
            key={i}
            position={[Math.cos(a) * 0.31, 0.11, Math.sin(a) * 0.31]}
          >
            <cylinderGeometry args={[0.085, 0.085, 0.018, 18]} />
            <meshStandardMaterial color={toppingColor} roughness={0.48} />
          </mesh>
        );
      })}
    </group>
  );
}

/**
 * 6. Ceramic Dish & Parchment Cone with crisp golden fries sticks.
 */
export function FriesCone3D({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 1,
  seasoningColor = "#E6B450",
}: {
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
  seasoningColor?: string;
}) {
  const fryAngles = useMemo(
    () => [
      [-0.08, 0.46, 0.05, 0.18, 0.05, 0.14],
      [0.08, 0.48, -0.04, -0.15, 0.1, -0.16],
      [0.0, 0.52, 0.08, 0.22, 0.0, 0.02],
      [-0.11, 0.44, -0.07, -0.2, -0.1, 0.18],
      [0.12, 0.45, 0.07, 0.16, 0.2, -0.18],
      [-0.03, 0.5, -0.09, -0.22, 0.05, 0.06],
      [0.05, 0.53, 0.01, 0.05, 0.3, -0.06],
    ],
    []
  );

  return (
    <group position={position} rotation={rotation} scale={scale}>
      {/* Stoneware holder bowl */}
      <mesh position={[0, 0.2, 0]}>
        <cylinderGeometry args={[0.38, 0.26, 0.36, 32]} />
        <meshStandardMaterial color="#FAF8F3" roughness={0.35} />
      </mesh>
      <mesh position={[0, 0.04, 0]}>
        <cylinderGeometry args={[0.27, 0.26, 0.04, 32]} />
        <meshStandardMaterial color="#B9D0E0" roughness={0.4} />
      </mesh>

      {/* Crisp golden fries sticks */}
      {fryAngles.map(([x, y, z, rx, ry, rz], idx) => (
        <mesh
          key={idx}
          position={[x, y, z]}
          rotation={[rx, ry, rz]}
        >
          <boxGeometry args={[0.065, 0.44, 0.065]} />
          <meshStandardMaterial color={seasoningColor} roughness={0.52} />
        </mesh>
      ))}
    </group>
  );
}

/**
 * 7. Open Linen Hardcover Book with arched paper pages and an animated turning page leaf.
 */
export function OpenBook3D({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 1,
  pageTurnSignal = 0,
  coverColor = "#41474D",
}: {
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
  pageTurnSignal?: number;
  coverColor?: string;
}) {
  const turningLeafRef = useRef<THREE.Group>(null);
  const turnPhaseRef = useRef(0);
  const lastSignalRef = useRef(pageTurnSignal);

  const pageLinesTex = useMemo(() => {
    if (typeof document === "undefined") return null;
    const c = document.createElement("canvas");
    c.width = 512;
    c.height = 640;
    const ctx = c.getContext("2d");
    if (ctx) {
      ctx.fillStyle = "#F7F4EC";
      ctx.fillRect(0, 0, 512, 640);
      // Spine inner shadow
      const sg = ctx.createLinearGradient(0, 0, 72, 0);
      sg.addColorStop(0, "rgba(65, 71, 77, 0.22)");
      sg.addColorStop(1, "rgba(65, 71, 77, 0)");
      ctx.fillStyle = sg;
      ctx.fillRect(0, 0, 72, 640);

      // Editorial chapter heading & muted paragraph rules
      ctx.fillStyle = "rgba(65, 71, 77, 0.42)";
      ctx.fillRect(76, 84, 160, 8);
      ctx.fillStyle = "rgba(86, 97, 107, 0.24)";
      for (let row = 0; row < 16; row++) {
        if (row === 5 || row === 11) continue;
        const w = row % 4 === 3 ? 240 : 345;
        ctx.fillRect(76, 128 + row * 26, w, 4);
      }
    }
    const t = new THREE.CanvasTexture(c);
    t.colorSpace = THREE.SRGBColorSpace;
    t.needsUpdate = true;
    return t;
  }, []);

  useEffect(() => {
    return () => {
      pageLinesTex?.dispose();
    };
  }, [pageLinesTex]);

  useFrame((state, delta) => {
    if (pageTurnSignal !== lastSignalRef.current) {
      lastSignalRef.current = pageTurnSignal;
      turnPhaseRef.current = 0.01;
    }

    if (turnPhaseRef.current > 0) {
      turnPhaseRef.current += delta * 1.15;
      if (turnPhaseRef.current >= 1) {
        turnPhaseRef.current = 0;
      }
    }

    if (turningLeafRef.current) {
      const t = state.clock.getElapsedTime();
      if (turnPhaseRef.current > 0) {
        const p = turnPhaseRef.current;
        const smooth = p * p * (3 - 2 * p);
        turningLeafRef.current.rotation.z = smooth * Math.PI * 0.94;
      } else {
        // Gentle idle page breeze
        turningLeafRef.current.rotation.z =
          0.18 + Math.sin(t * 0.95) * 0.08;
      }
    }
  });

  return (
    <group position={position} rotation={rotation} scale={scale}>
      {/* Left & right open Deep Ink Grey linen cover boards */}
      <mesh position={[-0.58, 0.02, 0]} rotation={[0, 0, 0.05]}>
        <boxGeometry args={[1.14, 0.032, 1.52]} />
        <meshStandardMaterial color={coverColor} roughness={0.78} />
      </mesh>
      <mesh position={[0.58, 0.02, 0]} rotation={[0, 0, -0.05]}>
        <boxGeometry args={[1.14, 0.032, 1.52]} />
        <meshStandardMaterial color={coverColor} roughness={0.78} />
      </mesh>

      {/* Center cloth spine bridge */}
      <mesh position={[0, 0.01, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.07, 0.07, 1.52, 20, 1, false, -Math.PI / 2, Math.PI]} />
        <meshStandardMaterial color={coverColor} roughness={0.8} />
      </mesh>

      {/* Left & right uncoated paper page blocks */}
      <mesh position={[-0.55, 0.085, 0]} rotation={[0, 0, 0.06]}>
        <boxGeometry args={[1.06, 0.095, 1.44]} />
        <meshStandardMaterial
          map={pageLinesTex}
          color="#FAF8F3"
          roughness={0.88}
        />
      </mesh>
      <mesh position={[0.55, 0.085, 0]} rotation={[0, 0, -0.06]}>
        <boxGeometry args={[1.06, 0.095, 1.44]} />
        <meshStandardMaterial
          map={pageLinesTex}
          color="#FAF8F3"
          roughness={0.88}
        />
      </mesh>

      {/* Powder Blue woven bookmark ribbon */}
      <mesh position={[0.02, 0.14, 0.18]} rotation={[0.02, 0.12, 0]}>
        <boxGeometry args={[0.045, 0.008, 1.38]} />
        <meshStandardMaterial color="#B9D0E0" roughness={0.6} />
      </mesh>

      {/* Animated turning page leaf */}
      <group ref={turningLeafRef} position={[0, 0.135, 0]}>
        <mesh position={[0.52, 0.01, 0]}>
          <boxGeometry args={[1.04, 0.008, 1.42]} />
          <meshStandardMaterial
            map={pageLinesTex}
            color="#FFFFFF"
            roughness={0.85}
          />
        </mesh>
      </group>
    </group>
  );
}

/**
 * 8. Genre Hardcover Volume for 3D Reading Room Bookshelves (blind-debossed genre spine & cover).
 */
export function GenreBookVolume3D({
  title,
  color = "#41474D",
  textColor = "#F4F1EA",
  height = 1.38,
  thickness = 0.21,
  depth = 0.98,
}: {
  title: string;
  color?: string;
  textColor?: string;
  height?: number;
  thickness?: number;
  depth?: number;
}) {
  const spineTex = useMemo(() => {
    if (typeof document === "undefined") return null;
    const c = document.createElement("canvas");
    c.width = 128;
    c.height = 512;
    const ctx = c.getContext("2d");
    if (ctx) {
      ctx.fillStyle = color;
      ctx.fillRect(0, 0, 128, 512);
      // Woven texture lines
      ctx.fillStyle = "rgba(255,255,255,0.06)";
      for (let y = 0; y < 512; y += 4) ctx.fillRect(0, y, 128, 1);

      // Head and tail binding bands
      ctx.fillStyle = textColor;
      ctx.globalAlpha = 0.35;
      ctx.fillRect(18, 46, 92, 3);
      ctx.fillRect(18, 462, 92, 3);

      // Vertical genre title
      ctx.globalAlpha = 0.92;
      ctx.save();
      ctx.translate(64, 256);
      ctx.rotate(-Math.PI / 2);
      ctx.font = '500 28px "Bodoni Moda", Georgia, serif';
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(title.toUpperCase(), 0, 0);
      ctx.restore();
    }
    const t = new THREE.CanvasTexture(c);
    t.colorSpace = THREE.SRGBColorSpace;
    t.needsUpdate = true;
    return t;
  }, [color, textColor, title]);

  useEffect(() => {
    return () => {
      spineTex?.dispose();
    };
  }, [spineTex]);

  return (
    <group>
      {/* Cloth spine & cover block */}
      <mesh>
        <boxGeometry args={[thickness, height, depth]} />
        <meshStandardMaterial color={color} roughness={0.78} metalness={0.05} />
      </mesh>
      {/* Spine label face (+Z facing viewer on shelf) */}
      <mesh position={[0, 0, depth / 2 + 0.002]}>
        <planeGeometry args={[thickness * 0.96, height * 0.98]} />
        <meshStandardMaterial
          map={spineTex}
          roughness={0.75}
          metalness={0.05}
        />
      </mesh>
      {/* Top paper page block edge */}
      <mesh position={[0, height / 2 + 0.002, -0.02]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[thickness * 0.78, depth * 0.92]} />
        <meshStandardMaterial color="#EAE5D9" roughness={0.9} />
      </mesh>
    </group>
  );
}

/**
 * 9. Floating 3D Engraved PAHINA Table Token / Reading Room Medallion.
 */
export function EngravedTableToken3D({
  position = [0, 0, 0],
  scale = 1,
}: {
  position?: [number, number, number];
  scale?: number;
}) {
  const tokenRef = useRef<THREE.Group>(null);

  const tokenFaceTex = useMemo(() => {
    if (typeof document === "undefined") return null;
    const c = document.createElement("canvas");
    c.width = 512;
    c.height = 512;
    const ctx = c.getContext("2d");
    if (ctx) {
      ctx.fillStyle = "#41474D";
      ctx.fillRect(0, 0, 512, 512);

      // Subtle radial brushed sheen
      const g = ctx.createRadialGradient(256, 220, 20, 256, 256, 250);
      g.addColorStop(0, "#525A62");
      g.addColorStop(1, "#353A40");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, 512, 512);

      // Engraved double ring in Paper White / Powder Blue
      ctx.strokeStyle = "#F4F1EA";
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.arc(256, 256, 214, 0, Math.PI * 2);
      ctx.stroke();

      ctx.strokeStyle = "#B9D0E0";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(256, 256, 162, 0, Math.PI * 2);
      ctx.stroke();

      // Center PAHINA wordmark & open book glyph
      ctx.fillStyle = "#F4F1EA";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.font = '400 44px "Bodoni Moda", Georgia, serif';
      ctx.fillText("P A H I N A", 256, 246);

      ctx.fillStyle = "#DCE7EF";
      ctx.font = "500 18px Manrope, sans-serif";
      ctx.fillText("COFFEE & READING ROOM", 256, 294);
    }
    const t = new THREE.CanvasTexture(c);
    t.colorSpace = THREE.SRGBColorSpace;
    t.needsUpdate = true;
    return t;
  }, []);

  useEffect(() => {
    return () => {
      tokenFaceTex?.dispose();
    };
  }, [tokenFaceTex]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (tokenRef.current) {
      tokenRef.current.rotation.y = t * 0.45;
      tokenRef.current.rotation.z = Math.sin(t * 0.7) * 0.05;
      tokenRef.current.position.y =
        position[1] + 0.15 + Math.sin(t * 1.1) * 0.06;
    }
  });

  return (
    <group>
      {/* Architectural Powder Soft & Paper White compass pedestal */}
      <mesh position={[position[0], position[1] - 0.82, position[2]]}>
        <cylinderGeometry args={[0.92, 1.02, 0.14, 48]} />
        <meshStandardMaterial color="#FAF8F3" roughness={0.4} />
      </mesh>
      <mesh position={[position[0], position[1] - 0.74, position[2]]}>
        <cylinderGeometry args={[0.76, 0.76, 0.03, 48]} />
        <meshStandardMaterial color="#B9D0E0" roughness={0.35} />
      </mesh>

      {/* Floating rotating PAHINA medallion token */}
      <group ref={tokenRef} position={position} scale={scale}>
        {/* Outer bevel ring */}
        <mesh>
          <torusGeometry args={[0.78, 0.055, 20, 48]} />
          <meshStandardMaterial
            color="#B9D0E0"
            roughness={0.32}
            metalness={0.35}
          />
        </mesh>

        {/* Main Deep Ink Grey medallion disk */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.76, 0.76, 0.09, 48]} />
          <meshStandardMaterial
            color="#41474D"
            roughness={0.48}
            metalness={0.22}
          />
        </mesh>

        {/* Engraved front & back faces */}
        <mesh position={[0, 0, 0.047]}>
          <circleGeometry args={[0.74, 48]} />
          <meshStandardMaterial
            map={tokenFaceTex}
            roughness={0.45}
            metalness={0.18}
          />
        </mesh>
        <mesh position={[0, 0, -0.047]} rotation={[0, Math.PI, 0]}>
          <circleGeometry args={[0.74, 48]} />
          <meshStandardMaterial
            map={tokenFaceTex}
            roughness={0.45}
            metalness={0.18}
          />
        </mesh>

        {/* Top keytag eyelet ring */}
        <mesh position={[0, 0.88, 0]}>
          <torusGeometry args={[0.11, 0.025, 16, 28]} />
          <meshStandardMaterial
            color="#8999A6"
            roughness={0.35}
            metalness={0.4}
          />
        </mesh>
      </group>
    </group>
  );
}
