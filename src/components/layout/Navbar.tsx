"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import { LayoutGroup, motion, useReducedMotion } from "framer-motion";
import { NAV_ITEMS, SITE_INFO, VISIT_CTA_LINK } from "@/data/site";
import { cn } from "@/lib/utils";
import { MobileNavigation } from "@/components/layout/MobileNavigation";
import { ScrollProgressBar } from "@/components/editorial/ScrollProgressBar";
import { PahinaEmblem } from "@/components/ui/PahinaEmblem";

export function Navbar() {
  const pathname = usePathname();
  const prefersReducedMotion = useReducedMotion();

  const [scrolled, setScrolled] = useState(false);
  const [openForPathname, setOpenForPathname] = useState<string | null>(null);
  const mobileOpen = openForPathname === pathname;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isVisitActive = pathname.startsWith(VISIT_CTA_LINK.href);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-40 w-full border-b transition-[background-color,border-color] duration-200 ease-[var(--ease-cinematic)]",
          scrolled
            ? "border-soft bg-paper"
            : "border-transparent bg-transparent"
        )}
      >
        <div className="mx-auto flex h-18 max-w-6xl items-center justify-between px-5 sm:px-8">
          <Link
            href="/"
            className="inline-flex items-center gap-3 text-ink transition-opacity duration-150 hover:opacity-80"
          >
            <PahinaEmblem size={36} showRingText />
            <span className="font-display text-2xl tracking-[0.22em] uppercase">
              {SITE_INFO.name}
            </span>
          </Link>

          <LayoutGroup id="primary-navbar">
            <nav
              aria-label="Primary Navigation"
              className="hidden items-center gap-9 md:flex"
            >
              {NAV_ITEMS.map((item) => {
                const isActive =
                  item.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={isActive ? "page" : undefined}
                    className={cn(
                      "relative py-2 text-[13px] font-medium tracking-[0.04em] transition-colors duration-150",
                      isActive ? "text-ink" : "text-ink-muted hover:text-ink"
                    )}
                  >
                    <span>{item.label}</span>
                    {isActive && (
                      <motion.span
                        layoutId={
                          prefersReducedMotion
                            ? undefined
                            : "nav-active-underline"
                        }
                        aria-hidden="true"
                        transition={{
                          type: "spring",
                          stiffness: 420,
                          damping: 34,
                        }}
                        className="absolute inset-x-0 bottom-0 h-px bg-ink"
                      />
                    )}
                  </Link>
                );
              })}
            </nav>
          </LayoutGroup>

          <div className="hidden items-center md:flex">
            <Link
              href={VISIT_CTA_LINK.href}
              aria-current={isVisitActive ? "page" : undefined}
              className={cn(
                "inline-flex min-h-[42px] items-center justify-center rounded-full px-5 py-2 text-[13px] font-medium tracking-[0.04em] transition-[background-color,color,transform] duration-150 ease-[var(--ease-out)] active:scale-[0.97]",
                isVisitActive
                  ? "bg-ink text-paper"
                  : "bg-powder text-ink hover:bg-[#A6C2D6]"
              )}
            >
              {VISIT_CTA_LINK.label}
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setOpenForPathname(pathname)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation-drawer"
            aria-label="Open navigation menu"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-soft bg-paper/80 text-ink backdrop-blur-sm transition-[background-color,transform] duration-150 active:scale-[0.97] hover:bg-soft/70 md:hidden"
          >
            <Menu className="h-5 w-5" strokeWidth={1.6} aria-hidden="true" />
          </button>
        </div>

        <ScrollProgressBar />
      </header>

      <MobileNavigation
        isOpen={mobileOpen}
        onClose={() => setOpenForPathname(null)}
        pathname={pathname}
      />
    </>
  );
}
