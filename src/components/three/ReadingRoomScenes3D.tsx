"use client";

import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { BOOK_GENRES, READING_ROOM_STEPS, type BookGenre } from "@/data/books";
import { PahinaEmblem } from "@/components/ui/PahinaEmblem";
import { cn } from "@/lib/utils";
import { Viewport3DCanvas } from "./Viewport3DCanvas";
import {
  CeramicCup3D,
  DaylightStudioLights,
  GenreBookVolume3D,
  IcedGlassTumbler3D,
  OpenBook3D,
  SoftContactShadow,
} from "./models";

const GENRE_BOOK_STYLES: Record<
  string,
  { color: string; textColor: string; drink: "hot" | "iced"; crema: string }
> = {
  fiction: {
    color: "#41474D",
    textColor: "#F4F1EA",
    drink: "hot",
    crema: "#8B5E34",
  },
  romance: {
    color: "#B9D0E0",
    textColor: "#41474D",
    drink: "iced",
    crema: "#A86B38",
  },
  mystery: {
    color: "#33383D",
    textColor: "#DCE7EF",
    drink: "iced",
    crema: "#3B2314",
  },
  philosophy: {
    color: "#56616B",
    textColor: "#F4F1EA",
    drink: "hot",
    crema: "#7A502C",
  },
  poetry: {
    color: "#DCE7EF",
    textColor: "#41474D",
    drink: "hot",
    crema: "#4E301F",
  },
  nonfiction: {
    color: "#8999A6",
    textColor: "#F4F1EA",
    drink: "hot",
    crema: "#94643A",
  },
};

/* ============================================================================
 * 1. BETWEEN PAGES 3D SCENE (Home — "A place between pages.")
 *    Interactive open book with turning pages beside a steaming porcelain cup
 * ========================================================================== */
function BetweenPagesScene({ pageSignal }: { pageSignal: number }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = -0.15 + Math.sin(t * 0.35) * 0.14;
    }
  });

  return (
    <>
      <DaylightStudioLights />
      <group ref={groupRef} position={[0, -0.28, 0]}>
        {/* Warm oak & Paper White table plinth */}
        <mesh position={[0, -0.12, 0]}>
          <boxGeometry args={[2.45, 0.14, 1.52]} />
          <meshStandardMaterial color="#C8A57E" roughness={0.68} />
        </mesh>
        <mesh position={[0, -0.042, 0]}>
          <boxGeometry args={[2.32, 0.02, 1.4]} />
          <meshStandardMaterial color="#FAF8F3" roughness={0.45} />
        </mesh>
        <SoftContactShadow position={[0, -0.21, 0]} scale={[2.8, 1.8]} opacity={0.5} />

        {/* Open hardcover book with turning page leaf */}
        <OpenBook3D
          position={[-0.32, -0.02, 0.08]}
          rotation={[0.14, 0.18, 0]}
          scale={0.72}
          pageTurnSignal={pageSignal}
          coverColor="#41474D"
        />

        {/* Steaming porcelain latte cup */}
        <CeramicCup3D
          position={[0.72, -0.02, -0.05]}
          scale={0.68}
          cupColor="#FAF8F3"
          cremaColor="#8C5D33"
          showSteam
        />
      </group>
    </>
  );
}

export function BetweenPages3D() {
  const [pageSignal, setPageSignal] = useState(0);

  return (
    <div className="relative">
      <Viewport3DCanvas
        ariaLabel="Interactive 3D open hardcover book with turning pages beside a steaming porcelain cup of coffee"
        cameraPosition={[0, 1.05, 3.25]}
        fov={35}
        className="h-[260px] w-full rounded-2xl border border-soft bg-paper sm:h-[290px]"
        fallback={
          <div className="flex h-full w-full flex-col items-center justify-center rounded-2xl bg-paper p-6 text-center">
            <PahinaEmblem size={42} showRingText={false} />
            <p className="mt-3 font-display text-xl text-ink">
              Brew a cup. Turn a page.
            </p>
          </div>
        }
      >
        <BetweenPagesScene pageSignal={pageSignal} />
      </Viewport3DCanvas>
      <button
        type="button"
        onClick={() => setPageSignal((s) => s + 1)}
        className="absolute right-3 bottom-3 rounded-full border border-soft bg-surface-elevated/90 px-3.5 py-1.5 text-xs font-medium text-ink backdrop-blur-sm transition-colors hover:border-powder hover:bg-powder-soft"
      >
        Turn a Page
      </button>
    </div>
  );
}

/* ============================================================================
 * 2. 6-GENRE 3D BOOKSHELF & PAIRING STAGE
 *    Used in ReadingRoomShelfIndex (/reading-room) & Home Reading Room Feature
 * ========================================================================== */
function GenreShelfScene({
  selectedGenreId,
  onSelectGenre,
}: {
  selectedGenreId: string;
  onSelectGenre?: (id: string) => void;
}) {
  const bookRefs = useRef<(THREE.Group | null)[]>([]);
  const stageRef = useRef<THREE.Group>(null);

  const activeStyle =
    GENRE_BOOK_STYLES[selectedGenreId] ?? GENRE_BOOK_STYLES.fiction;

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    const damp = 1 - Math.exp(-7 * delta);

    if (stageRef.current) {
      stageRef.current.rotation.y = Math.sin(t * 0.28) * 0.1;
    }

    BOOK_GENRES.forEach((genre, idx) => {
      const grp = bookRefs.current[idx];
      if (!grp) return;
      const isSelected = genre.id === selectedGenreId;
      const baseX = -0.68 + idx * 0.255;

      const targetX = isSelected ? -0.32 : baseX;
      const targetY = isSelected ? 0.16 + Math.sin(t * 1.4) * 0.02 : 0.08;
      const targetZ = isSelected ? 0.56 : -0.18;
      const targetRotY = isSelected ? 0.42 : 0;
      const targetRotX = isSelected ? -0.14 : 0;

      grp.position.x = THREE.MathUtils.lerp(grp.position.x, targetX, damp);
      grp.position.y = THREE.MathUtils.lerp(grp.position.y, targetY, damp);
      grp.position.z = THREE.MathUtils.lerp(grp.position.z, targetZ, damp);
      grp.rotation.y = THREE.MathUtils.lerp(grp.rotation.y, targetRotY, damp);
      grp.rotation.x = THREE.MathUtils.lerp(grp.rotation.x, targetRotX, damp);
    });
  });

  return (
    <>
      <DaylightStudioLights />
      <group ref={stageRef} position={[0, -0.22, 0]}>
        {/* Recessed Powder Blue architectural back panel */}
        <mesh position={[0, 0.24, -0.74]}>
          <boxGeometry args={[2.35, 1.85, 0.06]} />
          <meshStandardMaterial color="#DCE7EF" roughness={0.7} />
        </mesh>

        {/* Warm natural oak bookshelf ledge */}
        <mesh position={[0, -0.64, -0.05]}>
          <boxGeometry args={[2.42, 0.12, 1.35]} />
          <meshStandardMaterial color="#C49E74" roughness={0.68} />
        </mesh>
        <SoftContactShadow position={[0, -0.71, -0.05]} scale={[2.6, 1.5]} opacity={0.48} />

        {/* Oak bookends */}
        <mesh position={[-0.95, -0.22, -0.18]}>
          <boxGeometry args={[0.08, 0.74, 0.86]} />
          <meshStandardMaterial color="#B58E63" roughness={0.7} />
        </mesh>
        <mesh position={[0.88, -0.22, -0.18]}>
          <boxGeometry args={[0.08, 0.74, 0.86]} />
          <meshStandardMaterial color="#B58E63" roughness={0.7} />
        </mesh>

        {/* 6 Cloth-bound genre volumes */}
        {BOOK_GENRES.map((genre, idx) => {
          const style = GENRE_BOOK_STYLES[genre.id] ?? GENRE_BOOK_STYLES.fiction;
          const baseX = -0.68 + idx * 0.255;
          return (
            <group
              key={genre.id}
              ref={(el) => {
                bookRefs.current[idx] = el;
              }}
              position={[baseX, 0.08, -0.18]}
              onClick={(e) => {
                e.stopPropagation();
                onSelectGenre?.(genre.id);
              }}
            >
              <GenreBookVolume3D
                title={genre.name}
                color={style.color}
                textColor={style.textColor}
                height={1.32 - (idx % 2) * 0.06}
                thickness={0.22}
                depth={0.88}
              />
            </group>
          );
        })}

        {/* Paired 3D coffee vessel on the foreground reading ledge */}
        <group position={[0.56, -0.58, 0.36]}>
          {activeStyle.drink === "hot" ? (
            <CeramicCup3D
              scale={0.62}
              cupColor="#FAF8F3"
              cremaColor={activeStyle.crema}
              showSteam
            />
          ) : (
            <IcedGlassTumbler3D
              scale={0.62}
              topLayerColor={activeStyle.crema}
              bottomLayerColor="#F3EFE6"
            />
          )}
        </group>
      </group>
    </>
  );
}

export function GenreShelfStage3D({
  selectedGenre,
  onSelectGenre,
  className,
}: {
  selectedGenre: BookGenre;
  onSelectGenre?: (id: string) => void;
  className?: string;
}) {
  return (
    <Viewport3DCanvas
      ariaLabel={`Interactive 3D bookshelf highlighting the ${selectedGenre.name} shelf and its paired drink`}
      cameraPosition={[0, 0.42, 3.35]}
      fov={35}
      className={
        className ??
        "h-[240px] w-full rounded-xl border border-powder bg-paper sm:h-[260px]"
      }
      fallback={
        <div className="flex h-full w-full flex-col items-center justify-center bg-paper p-5 text-center">
          <p className="font-display text-2xl text-ink">{selectedGenre.name}</p>
          <p className="mt-1 font-editorial text-base italic text-ink-muted">
            {selectedGenre.quietPairing}
          </p>
        </div>
      }
    >
      <GenreShelfScene
        selectedGenreId={selectedGenre.id}
        onSelectGenre={onSelectGenre}
      />
    </Viewport3DCanvas>
  );
}

/* ============================================================================
 * 3. HOME READING ROOM MINI SHELF 3D ("Find a story worth staying for.")
 * ========================================================================== */
export function HomeMiniShelf3D() {
  const [selectedId, setSelectedId] = useState<string>(BOOK_GENRES[0].id);
  const selectedGenre =
    BOOK_GENRES.find((g) => g.id === selectedId) ?? BOOK_GENRES[0];

  return (
    <div className="overflow-hidden rounded-2xl border border-soft bg-paper p-4 sm:p-5">
      <GenreShelfStage3D
        selectedGenre={selectedGenre}
        onSelectGenre={setSelectedId}
        className="h-[310px] w-full rounded-xl border border-soft bg-surface-elevated sm:h-[350px]"
      />

      <div
        role="group"
        aria-label="Preview Reading Room shelves in 3D"
        className="mt-4 flex flex-wrap items-center gap-1.5"
      >
        {BOOK_GENRES.map((genre) => {
          const active = genre.id === selectedGenre.id;
          return (
            <button
              key={genre.id}
              type="button"
              onClick={() => setSelectedId(genre.id)}
              aria-pressed={active}
              className={cn(
                "rounded-full border px-3 py-1 text-xs font-medium transition-colors",
                active
                  ? "border-ink bg-ink text-paper"
                  : "border-soft bg-surface-elevated text-ink-muted hover:border-powder hover:text-ink"
              )}
            >
              {genre.name}
            </button>
          );
        })}
      </div>

      <p className="mt-3 font-editorial text-lg italic text-ink">
        {selectedGenre.name} — {selectedGenre.quietPairing}
      </p>
    </div>
  );
}

/* ============================================================================
 * 4. 4-STAGE 3D WORKFLOW VIEWER (/reading-room — "How the Reading Room works.")
 *    01 Browse -> 02 Choose -> 03 Read at Table -> 04 Return before leaving
 * ========================================================================== */
function WorkflowStepScene({ activeStep }: { activeStep: number }) {
  const closedBookRef = useRef<THREE.Group>(null);
  const openBookWrapRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    const damp = 1 - Math.exp(-7 * delta);

    // Step 0: on upper wall shelf (-0.82, 0.52, -0.45)
    // Step 1: chosen & floating center (0, 0.34, 0.25)
    // Step 2: open on oak table (-0.15, -0.28, 0.22)
    // Step 3: returned to right-side collection tray (0.85, -0.18, 0.05)
    if (closedBookRef.current) {
      const targetPos =
        activeStep === 0
          ? [-0.62, 0.48, -0.35]
          : activeStep === 1
            ? [0, 0.26 + Math.sin(t * 1.5) * 0.04, 0.35]
            : activeStep === 2
              ? [-0.15, -0.25, 0.15]
              : [0.78, -0.24, 0.12];

      const targetRot =
        activeStep === 0
          ? [0, 0.08, 0]
          : activeStep === 1
            ? [-0.16, 0.55 + Math.sin(t * 0.8) * 0.15, 0.04]
            : [Math.PI / 2, 0, 0];

      const targetScale = activeStep === 2 ? 0.001 : 0.72;

      closedBookRef.current.position.x = THREE.MathUtils.lerp(
        closedBookRef.current.position.x,
        targetPos[0],
        damp
      );
      closedBookRef.current.position.y = THREE.MathUtils.lerp(
        closedBookRef.current.position.y,
        targetPos[1],
        damp
      );
      closedBookRef.current.position.z = THREE.MathUtils.lerp(
        closedBookRef.current.position.z,
        targetPos[2],
        damp
      );
      closedBookRef.current.rotation.x = THREE.MathUtils.lerp(
        closedBookRef.current.rotation.x,
        targetRot[0],
        damp
      );
      closedBookRef.current.rotation.y = THREE.MathUtils.lerp(
        closedBookRef.current.rotation.y,
        targetRot[1],
        damp
      );
      closedBookRef.current.rotation.z = THREE.MathUtils.lerp(
        closedBookRef.current.rotation.z,
        targetRot[2],
        damp
      );
      closedBookRef.current.scale.setScalar(
        THREE.MathUtils.lerp(closedBookRef.current.scale.x, targetScale, damp)
      );
    }

    if (openBookWrapRef.current) {
      const openScale = activeStep === 2 ? 0.62 : 0.001;
      openBookWrapRef.current.scale.setScalar(
        THREE.MathUtils.lerp(openBookWrapRef.current.scale.x, openScale, damp)
      );
    }
  });

  return (
    <>
      <DaylightStudioLights />
      <group position={[0, -0.1, 0]}>
        {/* Upper wall shelf (Stage 01: Browse) */}
        <group position={[-0.72, 0.42, -0.38]}>
          <mesh position={[0, -0.44, 0]}>
            <boxGeometry args={[1.15, 0.07, 0.68]} />
            <meshStandardMaterial color="#C49E74" roughness={0.68} />
          </mesh>
          <group position={[-0.32, 0.02, 0]}>
            <GenreBookVolume3D
              title="Poetry"
              color="#B9D0E0"
              textColor="#41474D"
              height={0.86}
              thickness={0.15}
              depth={0.58}
            />
          </group>
          <group position={[-0.14, 0.02, 0]}>
            <GenreBookVolume3D
              title="Philosophy"
              color="#56616B"
              textColor="#F4F1EA"
              height={0.9}
              thickness={0.16}
              depth={0.58}
            />
          </group>
        </group>

        {/* Foreground oak reading table (Stage 03: Read comfortably) */}
        <mesh position={[0, -0.38, 0.14]}>
          <boxGeometry args={[2.55, 0.1, 1.28]} />
          <meshStandardMaterial color="#C8A57E" roughness={0.68} />
        </mesh>
        <SoftContactShadow position={[0, -0.44, 0.14]} scale={[2.9, 1.5]} opacity={0.45} />

        {/* Steaming cup waiting at the reading table */}
        <CeramicCup3D
          position={[-0.78, -0.32, 0.22]}
          scale={0.52}
          cupColor="#FAF8F3"
          showSteam
        />

        {/* Open book shown during Step 03 */}
        <group
          ref={openBookWrapRef}
          position={[-0.12, -0.31, 0.22]}
          rotation={[0.08, 0.12, 0]}
          scale={0.001}
        >
          <OpenBook3D pageTurnSignal={activeStep} coverColor="#41474D" />
        </group>

        {/* Designated Return Collection Tray on right (Stage 04: Return before leaving) */}
        <group position={[0.78, -0.29, 0.12]}>
          <mesh>
            <boxGeometry args={[0.78, 0.08, 0.92]} />
            <meshStandardMaterial color="#DCE7EF" roughness={0.5} />
          </mesh>
          <mesh position={[0, 0.045, 0]}>
            <boxGeometry args={[0.68, 0.02, 0.82]} />
            <meshStandardMaterial color="#B9D0E0" roughness={0.45} />
          </mesh>
        </group>

        {/* Travelling hero hardcover book moving through Stages 01 -> 02 -> 04 */}
        <group ref={closedBookRef} position={[-0.62, 0.48, -0.35]} scale={0.72}>
          <GenreBookVolume3D
            title="PAHINA"
            color="#41474D"
            textColor="#F4F1EA"
            height={1.18}
            thickness={0.2}
            depth={0.82}
          />
        </group>
      </group>
    </>
  );
}

export function ReadingRoomSteps3D() {
  const [activeIndex, setActiveIndex] = useState(0);
  const currentStep = READING_ROOM_STEPS[activeIndex] ?? READING_ROOM_STEPS[0];

  return (
    <div className="mt-10 space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {READING_ROOM_STEPS.map((step, idx) => {
          const isActive = idx === activeIndex;
          return (
            <button
              key={step.stepNumber}
              type="button"
              onClick={() => setActiveIndex(idx)}
              aria-pressed={isActive}
              className={cn(
                "rounded-xl border p-6 text-left transition-[background-color,border-color,transform] duration-150 active:scale-[0.985]",
                isActive
                  ? "border-ink bg-powder-soft"
                  : "border-soft bg-surface-elevated hover:border-powder"
              )}
            >
              <div className="flex items-center justify-between">
                <span className="font-display text-3xl text-ink tabular-nums">
                  {step.stepNumber}
                </span>
                <span
                  aria-hidden="true"
                  className={cn(
                    "h-2.5 w-2.5 rounded-full",
                    isActive ? "bg-ink" : "bg-powder"
                  )}
                />
              </div>
              <h3 className="mt-4 font-display text-xl text-ink">
                {step.title}
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-ink-muted">
                {step.description}
              </p>
            </button>
          );
        })}
      </div>

      <div className="overflow-hidden rounded-2xl border border-soft bg-surface-elevated p-4 sm:p-6">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <p className="text-sm font-medium text-ink">
            Step {currentStep.stepNumber} in 3D —{" "}
            <span className="font-display text-lg">{currentStep.title}</span>
          </p>
          <p className="text-xs text-ink-muted">
            Select any step above to animate the Reading Room flow
          </p>
        </div>

        <Viewport3DCanvas
          ariaLabel={`3D demonstration of Step ${currentStep.stepNumber}: ${currentStep.title}`}
          cameraPosition={[0, 0.72, 3.25]}
          fov={35}
          className="h-[250px] w-full rounded-xl border border-soft bg-paper sm:h-[290px]"
          fallback={
            <div className="flex h-full w-full flex-col items-center justify-center bg-paper p-6 text-center">
              <span className="font-display text-3xl text-ink tabular-nums">
                {currentStep.stepNumber}
              </span>
              <p className="mt-2 font-display text-xl text-ink">
                {currentStep.title}
              </p>
              <p className="mt-1 max-w-md text-sm text-ink-muted">
                {currentStep.description}
              </p>
            </div>
          }
        >
          <WorkflowStepScene activeStep={activeIndex} />
        </Viewport3DCanvas>
      </div>
    </div>
  );
}
