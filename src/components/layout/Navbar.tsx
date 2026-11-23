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

const ALL_NAV_LINKS = [
  ...NAV_ITEMS,
  { label: "Visit", href: VISIT_CTA_LINK.href },
];

export function Navbar() {
  const pathname = usePathname();
  const prefersReducedMotion = useReducedMotion();
  const isMenuRoute = pathname.startsWith("/menu");

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

  return (
    <>
      <ScrollProgressBar />

      <header
        className={cn(
          "fixed inset-x-0 top-0 z-40 w-full transition-[background-color,border-color] duration-200 ease-[var(--ease-cinematic)]",
          isMenuRoute && scrolled
            ? "border-b border-soft bg-paper"
            : scrolled
              ? "bg-gradient-to-b from-paper via-paper/82 to-transparent pb-3"
              : "bg-transparent"
        )}
      >
        <div className="mx-auto flex h-18 max-w-6xl items-center justify-between gap-8 px-5 sm:px-8">
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
            className="shrink-0"
          >
            <Link
              href="/"
              className="group inline-flex items-center gap-2.5 text-ink transition-opacity duration-150 hover:opacity-80"
            >
              <PahinaEmblem size={28} showRingText={false} />
              <span className="font-display text-lg tracking-[0.24em] uppercase sm:text-xl">
                {SITE_INFO.name}
              </span>
            </Link>
          </motion.div>

          <LayoutGroup id="primary-navbar">
            <nav
              aria-label="Primary Navigation"
              className="hidden flex-1 items-center justify-between pl-8 md:flex lg:pl-16"
            >
              {ALL_NAV_LINKS.map((item, idx) => {
                const isActive =
                  item.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(item.href);

                return (
                  <motion.div
                    key={item.href}
                    initial={
                      prefersReducedMotion ? false : { opacity: 0, y: -6 }
                    }
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.5,
                      delay: prefersReducedMotion ? 0 : 0.08 + idx * 0.06,
                      ease: [0.23, 1, 0.32, 1],
                    }}
                  >
                    <Link
                      href={item.href}
                      aria-current={isActive ? "page" : undefined}
                      className={cn(
                        "relative py-2 font-editorial text-xl italic tracking-[0.01em] transition-colors duration-150",
                        isActive
                          ? "text-ink"
                          : "text-ink-muted hover:text-ink"
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
                          className="absolute inset-x-0 bottom-0.5 h-px bg-ink"
                        />
                      )}
                    </Link>
                  </motion.div>
                );
              })}
            </nav>
          </LayoutGroup>

          <button
            type="button"
            onClick={() => setOpenForPathname(pathname)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation-drawer"
            aria-label="Open navigation menu"
            className="inline-flex h-11 w-11 items-center justify-center rounded-[2px] border border-ink/25 bg-paper/85 text-ink backdrop-blur-xs transition-[background-color,border-color,transform] duration-150 active:scale-[0.97] hover:border-ink md:hidden"
          >
            <Menu className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
          </button>
        </div>
      </header>

      <MobileNavigation
        isOpen={mobileOpen}
        onClose={() => setOpenForPathname(null)}
        pathname={pathname}
      />
    </>
  );
}
