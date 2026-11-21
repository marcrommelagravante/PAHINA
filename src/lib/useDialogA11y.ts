"use client";

import { useEffect, type RefObject } from "react";

const FOCUSABLE_SELECTOR = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
].join(", ");

interface UseDialogA11yOptions {
  isOpen: boolean;
  onClose: () => void;
  containerRef: RefObject<HTMLElement | null>;
  initialFocusRef?: RefObject<HTMLElement | null>;
  onKeyDownExtra?: (event: KeyboardEvent) => void;
}

/**
 * WCAG 2.1 dialog accessibility hook:
 * - Captures the triggering element and restores focus on close
 * - Moves initial focus inside the dialog
 * - Traps Tab / Shift+Tab cycling within focusable elements inside containerRef
 * - Handles Escape close and locks background scroll cleanly
 */
export function useDialogA11y({
  isOpen,
  onClose,
  containerRef,
  initialFocusRef,
  onKeyDownExtra,
}: UseDialogA11yOptions) {
  useEffect(() => {
    if (!isOpen) return;

    const previouslyFocused =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusTimer = window.requestAnimationFrame(() => {
      if (initialFocusRef?.current) {
        initialFocusRef.current.focus();
        return;
      }
      const focusables = containerRef.current?.querySelectorAll<HTMLElement>(
        FOCUSABLE_SELECTOR
      );
      if (focusables && focusables.length > 0) {
        focusables[0].focus();
      }
    });

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key === "Tab" && containerRef.current) {
        const focusables = Array.from(
          containerRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)
        ).filter((el) => el.offsetParent !== null);

        if (focusables.length === 0) {
          event.preventDefault();
          return;
        }

        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        const active = document.activeElement;

        if (event.shiftKey) {
          if (active === first || !containerRef.current.contains(active)) {
            event.preventDefault();
            last.focus();
          }
        } else if (active === last || !containerRef.current.contains(active)) {
          event.preventDefault();
          first.focus();
        }
        return;
      }

      onKeyDownExtra?.(event);
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.cancelAnimationFrame(focusTimer);
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      if (previouslyFocused && document.contains(previouslyFocused)) {
        previouslyFocused.focus();
      }
    };
  }, [isOpen, onClose, containerRef, initialFocusRef, onKeyDownExtra]);
}
