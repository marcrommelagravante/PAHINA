"use client";

import Link from "next/link";
import { useRef } from "react";
import { X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { NAV_ITEMS, SITE_INFO, VISIT_CTA_LINK } from "@/data/site";
import { cn } from "@/lib/utils";
import { useDialogA11y } from "@/lib/useDialogA11y";
import { PahinaEmblem } from "@/components/ui/PahinaEmblem";

interface MobileNavigationProps {
  isOpen: boolean;
  onClose: () => void;
  pathname: string;
}

export function MobileNavigation({
  isOpen,
  onClose,
  pathname,
}: MobileNavigationProps) {
  const prefersReducedMotion = useReducedMotion();
  const drawerRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useDialogA11y({
    isOpen,
    onClose,
    containerRef: drawerRef,
    initialFocusRef: closeButtonRef,
  });

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={drawerRef}
          id="mobile-navigation-drawer"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation"
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: prefersReducedMotion ? 0 : -8 }}
          transition={{ duration: 0.24, ease: [0.32, 0.72, 0, 1] }}
          className="fixed inset-0 z-50 flex flex-col bg-paper px-6 pt-5 pb-10 text-ink md:hidden"
        >
          <div className="flex items-center justify-between border-b border-soft pb-4">
            <Link
              href="/"
              onClick={onClose}
              className="inline-flex items-center gap-3 text-ink"
            >
              <PahinaEmblem size={34} showRingText />
              <span className="font-display text-2xl tracking-[0.22em] uppercase">
                {SITE_INFO.name}
              </span>
            </Link>
            <button
              ref={closeButtonRef}
              type="button"
              onClick={onClose}
              aria-label="Close navigation menu"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-soft text-ink transition-[background-color,transform] duration-150 active:scale-[0.97] hover:bg-soft/70"
            >
              <X className="h-5 w-5" strokeWidth={1.6} aria-hidden="true" />
            </button>
          </div>

          <nav
            aria-label="Primary Mobile Navigation"
            className="mt-10 flex flex-1 flex-col justify-between"
          >
            <ul className="space-y-2">
              {NAV_ITEMS.map((item) => {
                const isActive =
                  item.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(item.href);

                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={onClose}
                      aria-current={isActive ? "page" : undefined}
                      className={cn(
                        "flex min-h-[52px] items-center justify-between rounded-xl px-4 font-display text-3xl tracking-tight transition-[background-color,color] duration-150",
                        isActive
                          ? "bg-powder-soft text-ink italic"
                          : "text-ink hover:bg-soft/60"
                      )}
                    >
                      <span>{item.label}</span>
                      {isActive && (
                        <span
                          className="h-2 w-2 rounded-full bg-ink"
                          aria-hidden="true"
                        />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>

            <div className="space-y-5 border-t border-soft pt-6">
              <Link
                href={VISIT_CTA_LINK.href}
                onClick={onClose}
                className="flex min-h-[48px] w-full items-center justify-center rounded-full bg-ink px-6 py-3 text-sm font-medium tracking-[0.02em] text-paper transition-[background-color,transform] duration-150 active:scale-[0.97] hover:bg-[#2F353A]"
              >
                {VISIT_CTA_LINK.label}
              </Link>
              <p className="text-center font-editorial text-lg italic text-ink-muted">
                {SITE_INFO.tagline}
              </p>
            </div>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
