"use client";

import { useState } from "react";
import {
  AnimatePresence,
  LayoutGroup,
  motion,
  useReducedMotion,
} from "framer-motion";
import { cn } from "@/lib/utils";

const MATERIAL_SWATCHES = [
  {
    id: "paper-white",
    name: "Paper White",
    token: "#F4F1EA",
    role: "Uncoated plaster & pages",
    detail:
      "Warm off-white plaster ceilings and uncoated book pages reflect morning window daylight without glare.",
  },
  {
    id: "powder-blue",
    name: "Powder Blue",
    token: "#B9D0E0",
    role: "Muted wall paneling",
    detail:
      "Architectural blue-grey wainscoting softens the acoustic feel of the room and frames recessed wooden shelves.",
  },
  {
    id: "warm-oak",
    name: "Warm Oak",
    token: "#C8A986",
    role: "Two-top reading tables",
    detail:
      "Natural matte oak tabletops and herringbone floors ground each cup and open book in tactile warmth.",
  },
  {
    id: "deep-ink",
    name: "Deep Ink Linen",
    token: "#41474D",
    role: "Book cloth & typography",
    detail:
      "Measured charcoal-slate ink balances light surfaces with crisp contrast across menus, bindings, and signage.",
  },
] as const;

export function MaterialSwatchInspector() {
  const prefersReducedMotion = useReducedMotion();
  const [activeId, setActiveId] = useState<string>(MATERIAL_SWATCHES[0].id);

  const activeSwatch =
    MATERIAL_SWATCHES.find((item) => item.id === activeId) ??
    MATERIAL_SWATCHES[0];

  return (
    <div className="space-y-6 border-t border-soft pt-6">
      <LayoutGroup id="about-material-swatches">
        <div
          role="group"
          aria-label="Inspect PAHINA interior materials"
          className="grid grid-cols-2 gap-4 sm:grid-cols-4"
        >
          {MATERIAL_SWATCHES.map((item) => {
            const isActive = item.id === activeSwatch.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveId(item.id)}
                aria-pressed={isActive}
                className="group flex flex-col items-start text-left"
              >
                <span className="relative inline-flex h-11 w-11 items-center justify-center">
                  {isActive && (
                    <motion.span
                      layoutId={
                        prefersReducedMotion ? undefined : "swatch-active-ring"
                      }
                      aria-hidden="true"
                      transition={{
                        type: "spring",
                        stiffness: 420,
                        damping: 32,
                      }}
                      className="absolute inset-0 rounded-full border border-ink"
                    />
                  )}
                  <span
                    aria-hidden="true"
                    className="h-8 w-8 rounded-full border border-ink/15 transition-transform duration-150 group-hover:scale-105"
                    style={{ backgroundColor: item.token }}
                  />
                </span>
                <span
                  className={cn(
                    "mt-2 font-display text-base transition-colors duration-150",
                    isActive
                      ? "italic text-ink"
                      : "text-ink-muted group-hover:text-ink"
                  )}
                >
                  {item.name}
                </span>
                <span className="mt-0.5 text-[11px] leading-snug text-ink-muted">
                  {item.role}
                </span>
              </button>
            );
          })}
        </div>
      </LayoutGroup>

      <div aria-live="polite" className="border-y border-soft py-5">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSwatch.id}
            initial={prefersReducedMotion ? false : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={
              prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -6 }
            }
            transition={{ duration: 0.2 }}
            className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="space-y-1.5">
              <div className="flex items-baseline gap-3">
                <h3 className="font-display text-2xl text-ink">
                  {activeSwatch.name}
                </h3>
                <span className="text-[11px] font-medium tabular-nums tracking-[0.08em] text-ink-muted">
                  {activeSwatch.token}
                </span>
              </div>
              <p className="max-w-lg text-[12.5px] leading-[1.65] text-ink-muted">
                {activeSwatch.detail}
              </p>
            </div>
            <span
              aria-hidden="true"
              className="h-12 w-12 shrink-0 rounded-[2px] border border-ink/15"
              style={{ backgroundColor: activeSwatch.token }}
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
