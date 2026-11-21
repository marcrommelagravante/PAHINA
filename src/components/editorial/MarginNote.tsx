import { cn } from "@/lib/utils";

interface MarginNoteProps {
  label: string;
  value: string;
  ruled?: boolean;
  align?: "left" | "right";
  className?: string;
}

export function MarginNote({
  label,
  value,
  ruled = true,
  align = "left",
  className,
}: MarginNoteProps) {
  return (
    <div
      className={cn(
        "space-y-1",
        ruled && "border-t border-soft pt-3",
        align === "right" && "text-right",
        className
      )}
    >
      <p className="text-xs font-medium tracking-[0.04em] text-ink-muted">
        {label}
      </p>
      <p className="font-display text-[15px] leading-snug text-ink sm:text-base">
        {value}
      </p>
    </div>
  );
}
