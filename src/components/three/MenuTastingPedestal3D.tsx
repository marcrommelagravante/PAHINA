"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import type { MenuItemData } from "@/data/menu";
import { Viewport3DCanvas } from "./Viewport3DCanvas";
import {
  CeramicCup3D,
  DaylightStudioLights,
  FriesCone3D,
  IcedGlassTumbler3D,
  PastaBowl3D,
  PizzaBoard3D,
  SoftContactShadow,
  WhippedFrappeGlass3D,
} from "./models";

const HOT_COFFEE_IDS = new Set([
  "cafe-latte",
  "cappuccino",
  "cafe-mocha",
  "vanilla-latte",
]);

function resolveVesselConfig(item: MenuItemData) {
  if (item.category === "coffee") {
    if (HOT_COFFEE_IDS.has(item.id)) {
      const crema =
        item.id === "cafe-mocha"
          ? "#4E301F"
          : item.id === "cappuccino"
            ? "#9A6C42"
            : "#8C5D33";
      return { kind: "hot-cup" as const, primary: "#FAF8F3", secondary: crema };
    }
    const top =
      item.id === "biscoff-latte"
        ? "#A86B38"
        : item.id === "white-chocolate-mocha"
          ? "#7A5234"
          : "#4F311C";
    const bottom =
      item.id === "cafe-americano" ? "#3B2314" : "#F3EFE6";
    return { kind: "iced-glass" as const, primary: top, secondary: bottom };
  }

  if (item.category === "non-coffee") {
    if (item.id === "strawberry-milk-latte") {
      return {
        kind: "iced-glass" as const,
        primary: "#F6F3EC",
        secondary: "#D47C8B",
      };
    }
    return {
      kind: "iced-glass" as const,
      primary: "#4B2E20",
      secondary: "#E5D8C8",
    };
  }

  if (item.category === "frappuccino") {
    const body =
      item.id === "ube-frappe"
        ? "#9378AC"
        : item.id === "matcha-frappe"
          ? "#849E6D"
          : item.id === "strawberry-frappe"
            ? "#DA8E9B"
            : item.id.includes("caramel") || item.id.includes("biscoff")
              ? "#B88758"
              : "#6E503D";
    const drizzle =
      item.id === "ube-frappe"
        ? "#5E4378"
        : item.id === "matcha-frappe"
          ? "#4E683B"
          : item.id === "strawberry-frappe"
            ? "#B24C5E"
            : "#4A2C1B";
    return { kind: "frappe" as const, primary: body, secondary: drizzle };
  }

  if (item.category === "pasta") {
    const sauce =
      item.id === "creamy-pesto"
        ? "#73915F"
        : item.id === "spaghetti-bolognese"
          ? "#BC563E"
          : item.id === "aglio-olio"
            ? "#DFBE78"
            : "#E8D7B4";
    return { kind: "pasta" as const, primary: sauce, secondary: "#FAF8F3" };
  }

  if (item.category === "pizza") {
    const topping =
      item.id === "pepperoni-pizza"
        ? "#B84934"
        : item.id === "hawaiian-pizza"
          ? "#E4BD5A"
          : "#D89A4E";
    return { kind: "pizza" as const, primary: topping, secondary: "#F3E2BA" };
  }

  const fryTone =
    item.id === "cheese-fries"
      ? "#E59D38"
      : item.id === "classic-fries"
        ? "#E6B450"
        : "#E4C77A";
  return { kind: "fries" as const, primary: fryTone, secondary: "#FAF8F3" };
}

function PhotoPlaque3D({ imageUrl }: { imageUrl: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const textureCache = useMemo(() => new Map<string, THREE.Texture>(), []);

  useEffect(() => {
    let cancelled = false;
    const existing = textureCache.get(imageUrl);
    if (existing && meshRef.current) {
      const mat = meshRef.current.material as THREE.MeshStandardMaterial;
      mat.map = existing;
      mat.needsUpdate = true;
      return;
    }

    const loader = new THREE.TextureLoader();
    loader.load(imageUrl, (tex) => {
      if (cancelled) {
        tex.dispose();
        return;
      }
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.anisotropy = 4;
      textureCache.set(imageUrl, tex);
      if (meshRef.current) {
        const mat = meshRef.current.material as THREE.MeshStandardMaterial;
        mat.map = tex;
        mat.needsUpdate = true;
      }
    });

    return () => {
      cancelled = true;
    };
  }, [imageUrl, textureCache]);

  useEffect(() => {
    return () => {
      textureCache.forEach((t) => t.dispose());
      textureCache.clear();
    };
  }, [textureCache]);

  return (
    <group position={[0.68, 0.56, -0.18]} rotation={[0, -0.26, 0]}>
      {/* Elevated Paper gallery frame backing */}
      <mesh>
        <boxGeometry args={[0.92, 1.12, 0.04]} />
        <meshStandardMaterial color="#FAF8F3" roughness={0.45} />
      </mesh>
      {/* Powder Blue inner mat frame */}
      <mesh position={[0, 0, 0.018]}>
        <boxGeometry args={[0.84, 1.04, 0.01]} />
        <meshStandardMaterial color="#B9D0E0" roughness={0.5} />
      </mesh>
      {/* Item 4:5 portrait photograph */}
      <mesh ref={meshRef} position={[0, 0, 0.026]}>
        <planeGeometry args={[0.76, 0.95]} />
        <meshStandardMaterial color="#FFFFFF" roughness={0.42} />
      </mesh>
    </group>
  );
}

function TastingPedestalScene({ item }: { item: MenuItemData }) {
  const stageRef = useRef<THREE.Group>(null);
  const vesselGroupRef = useRef<THREE.Group>(null);
  const lastIdRef = useRef(item.id);
  const popRef = useRef(1);

  const config = useMemo(() => resolveVesselConfig(item), [item]);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    if (lastIdRef.current !== item.id) {
      lastIdRef.current = item.id;
      popRef.current = 0.84;
    }
    popRef.current = THREE.MathUtils.lerp(
      popRef.current,
      1,
      1 - Math.exp(-8 * delta)
    );

    if (stageRef.current) {
      stageRef.current.rotation.y = Math.sin(t * 0.35) * 0.14;
    }
    if (vesselGroupRef.current) {
      vesselGroupRef.current.scale.setScalar(popRef.current);
      vesselGroupRef.current.rotation.y = t * 0.32;
    }
  });

  return (
    <>
      <DaylightStudioLights />
      <group ref={stageRef} position={[0, -0.45, 0]}>
        {/* Sculpted Elevated Paper & Powder Blue tasting plinth */}
        <mesh position={[-0.36, -0.09, 0.08]}>
          <cylinderGeometry args={[0.74, 0.8, 0.18, 48]} />
          <meshStandardMaterial color="#FAF8F3" roughness={0.4} />
        </mesh>
        <mesh position={[-0.36, 0.006, 0.08]}>
          <cylinderGeometry args={[0.71, 0.71, 0.02, 48]} />
          <meshStandardMaterial color="#B9D0E0" roughness={0.36} />
        </mesh>
        <SoftContactShadow
          position={[-0.1, -0.19, 0]}
          scale={[2.6, 1.7]}
          opacity={0.5}
        />

        {/* Dynamic 3D vessel for the selected menu item */}
        <group ref={vesselGroupRef} position={[-0.36, 0.02, 0.08]}>
          {config.kind === "hot-cup" && (
            <CeramicCup3D
              scale={0.95}
              cupColor={config.primary}
              cremaColor={config.secondary}
              showSteam
            />
          )}
          {config.kind === "iced-glass" && (
            <IcedGlassTumbler3D
              scale={0.95}
              topLayerColor={config.primary}
              bottomLayerColor={config.secondary}
            />
          )}
          {config.kind === "frappe" && (
            <WhippedFrappeGlass3D
              scale={0.86}
              bodyColor={config.primary}
              drizzleColor={config.secondary}
            />
          )}
          {config.kind === "pasta" && (
            <PastaBowl3D scale={0.88} sauceColor={config.primary} />
          )}
          {config.kind === "pizza" && (
            <PizzaBoard3D scale={0.82} toppingColor={config.primary} />
          )}
          {config.kind === "fries" && (
            <FriesCone3D scale={0.95} seasoningColor={config.primary} />
          )}
        </group>

        {/* Framed 3D gallery plaque displaying the item's photograph */}
        <PhotoPlaque3D imageUrl={item.image} />
      </group>
    </>
  );
}

export function MenuTastingPedestal3D({
  item,
  className,
}: {
  item: MenuItemData;
  className?: string;
}) {
  return (
    <Viewport3DCanvas
      ariaLabel={`3D tasting preview for ${item.name}`}
      cameraPosition={[0, 0.78, 3.25]}
      fov={34}
      className={
        className ??
        "h-[250px] w-full rounded-xl border border-soft bg-paper sm:h-[280px]"
      }
      fallback={
        <div className="flex h-full w-full items-center justify-center gap-4 bg-paper p-5">
          <div className="relative aspect-[4/5] w-24 overflow-hidden rounded-lg border border-soft">
            <Image
              src={item.image}
              alt={item.alt}
              fill
              sizes="96px"
              className="object-cover"
            />
          </div>
          <div>
            <p className="font-display text-xl text-ink">{item.name}</p>
            <p className="mt-1 text-xs text-ink-muted">Selected menu preview</p>
          </div>
        </div>
      }
    >
      <TastingPedestalScene item={item} />
    </Viewport3DCanvas>
  );
}
