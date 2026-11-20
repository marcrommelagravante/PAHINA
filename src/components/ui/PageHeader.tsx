import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface PageHeaderProps {
  title: ReactNode;
  description: string;
  aside?: ReactNode;
  className?: string;
}

export function PageHeader({
  title,
  description,
  aside,
  className,
}: PageHeaderProps) {
  return (
    <section
      className={cn(
        "border-b border-soft bg-paper pt-10 pb-12 sm:pt-14 sm:pb-16",
        className
      )}
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center">
          <div className={aside ? "lg:col-span-7" : "lg:col-span-8"}>
            <h1 className="font-display text-4xl leading-[1.06] tracking-[-0.02em] text-ink sm:text-5xl lg:text-6xl">
              {title}
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-ink-muted sm:text-lg">
              {description}
            </p>
          </div>
          {aside && <div className="lg:col-span-5">{aside}</div>}
        </div>
      </div>
    </section>
  );
}
