"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import { NAV_ITEMS, SITE_INFO, VISIT_CTA_LINK } from "@/data/site";
import { cn } from "@/lib/utils";
import { MobileNavigation } from "@/components/layout/MobileNavigation";

export function Navbar() {
  const pathname = usePathname();
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
          "sticky top-0 z-40 w-full border-b transition-[background-color,border-color] duration-200 ease-[var(--ease-out)]",
          scrolled
            ? "border-soft bg-paper/92 backdrop-blur-md"
            : "border-soft/80 bg-paper"
        )}
      >
        <div className="mx-auto flex h-18 max-w-6xl items-center justify-between px-5 sm:px-8">
          <Link
            href="/"
            className="font-display text-2xl tracking-[0.22em] text-ink uppercase transition-opacity duration-150 hover:opacity-80"
          >
            {SITE_INFO.name}
          </Link>

          <nav
            aria-label="Primary Navigation"
            className="hidden items-center gap-8 md:flex"
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
                    "relative py-2 text-sm font-medium tracking-[0.02em] transition-colors duration-150",
                    isActive
                      ? "text-ink"
                      : "text-ink-muted hover:text-ink"
                  )}
                >
                  <span>{item.label}</span>
                  <span
                    aria-hidden="true"
                    className={cn(
                      "absolute inset-x-0 bottom-0 h-[2px] rounded-full transition-transform duration-200 ease-[var(--ease-out)] origin-left",
                      isActive
                        ? "scale-x-100 bg-ink"
                        : "scale-x-0 bg-powder"
                    )}
                  />
                </Link>
              );
            })}
          </nav>

          <div className="hidden md:flex items-center">
            <Link
              href={VISIT_CTA_LINK.href}
              aria-current={isVisitActive ? "page" : undefined}
              className={cn(
                "inline-flex min-h-[40px] items-center justify-center rounded-full px-5 py-2 text-sm font-medium tracking-[0.02em] transition-[background-color,color,transform] duration-150 ease-[var(--ease-out)] active:scale-[0.97]",
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
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-soft text-ink transition-[background-color,transform] duration-150 active:scale-[0.97] hover:bg-soft/70 md:hidden"
          >
            <Menu className="h-5 w-5" strokeWidth={1.6} aria-hidden="true" />
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
