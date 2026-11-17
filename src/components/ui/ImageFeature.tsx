import Image from "next/image";
import { cn } from "@/lib/utils";

interface ImageFeatureProps {
  src: string;
  alt: string;
  caption?: string;
  aspect?: "portrait" | "landscape" | "square";
  priority?: boolean;
  sizes?: string;
  className?: string;
}

export function ImageFeature({
  src,
  alt,
  caption,
  aspect = "portrait",
  priority = false,
  sizes = "(max-width: 768px) 100vw, 50vw",
  className,
}: ImageFeatureProps) {
  const aspectClass =
    aspect === "landscape"
      ? "aspect-[3/2]"
      : aspect === "square"
        ? "aspect-square"
        : "aspect-[3/4]";

  return (
    <figure className={cn("group space-y-3", className)}>
      <div
        className={cn(
          "relative w-full overflow-hidden rounded-2xl border border-soft bg-soft",
          aspectClass
        )}
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          className="object-cover hover-image-zoom"
        />
      </div>
      {caption && (
        <figcaption className="font-editorial text-lg italic leading-snug text-ink-muted">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
