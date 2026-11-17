import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface PrimaryButtonProps {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "powder";
  className?: string;
}

export function PrimaryButton({
  href,
  children,
  variant = "primary",
  className,
}: PrimaryButtonProps) {
  const styles =
    variant === "primary"
      ? "bg-ink text-paper hover:bg-[#2F353A]"
      : variant === "powder"
        ? "bg-powder text-ink hover:bg-[#A6C2D6]"
        : "border border-ink/25 bg-transparent text-ink hover:border-ink hover:bg-soft/60";

  return (
    <Link
      href={href}
      className={cn(
        "inline-flex min-h-[44px] items-center justify-center rounded-full px-6 py-2.5 text-sm font-medium tracking-[0.02em] transition-[background-color,border-color,color,transform] duration-150 ease-[var(--ease-out)] active:scale-[0.97]",
        styles,
        className
      )}
    >
      {children}
    </Link>
  );
}
