import Image from "next/image";
import { cn } from "@/lib/utils";
import type { Gambar } from "@/lib/cms/schema";

/**
 * Lapisan gambar situs.
 *
 * PRD §5.3 mensyaratkan foto keberangkatan ASLI (min 60 foto, 5 video).
 * Belum tersedia di lingkungan ini, jadi `<Figure>` menampilkan placeholder
 * berdimensi tetap dengan `alt` deskriptif (PRD §11) dan TANPA layout shift
 * (PRD §12, C1). Begitu file gambar nyata diletakkan di `public/`, ubah
 * `USE_REAL_IMAGES` menjadi `true` — semua pemanggilan `<Figure>` otomatis
 * memakai `next/image` (AVIF/WebP, `sizes` eksplisit).
 *
 * Lihat `public/images/README.md`.
 */
export const USE_REAL_IMAGES = process.env.NEXT_PUBLIC_USE_REAL_IMAGES === "true";

function gradientFor(seed: string): string {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  const a = h % 360;
  const b = (a + 40) % 360;
  return `linear-gradient(135deg, hsl(${a} 45% 42%), hsl(${b} 55% 30%))`;
}

interface FigureProps {
  image: Gambar;
  /** PRD §12: sizes eksplisit wajib. */
  sizes: string;
  className?: string;
  imgClassName?: string;
  priority?: boolean;
  rounded?: boolean;
  /** Rasio aspek CSS, mis. "16/10". Default pakai width/height gambar. */
  ratio?: string;
}

export function Figure({
  image,
  sizes,
  className,
  imgClassName,
  priority,
  rounded = true,
  ratio,
}: FigureProps) {
  const style = ratio
    ? { aspectRatio: ratio.replace("/", " / ") }
    : { aspectRatio: `${image.width} / ${image.height}` };

  if (USE_REAL_IMAGES) {
    return (
      <div
        className={cn("relative overflow-hidden bg-brand-ink/5", rounded && "rounded-[var(--radius-card)]", className)}
        style={style}
      >
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes={sizes}
          priority={priority}
          className={cn("object-cover", imgClassName)}
        />
      </div>
    );
  }

  return (
    <div
      role="img"
      aria-label={image.alt}
      className={cn(
        "relative flex items-end overflow-hidden",
        rounded && "rounded-[var(--radius-card)]",
        className,
      )}
      style={{ ...style, backgroundImage: gradientFor(image.alt) }}
    >
      <span className="pointer-events-none m-3 line-clamp-2 rounded bg-black/25 px-2 py-1 text-[11px] font-medium text-white/90 backdrop-blur-sm">
        {image.alt}
      </span>
    </div>
  );
}

/** Placeholder untuk avatar/logo bulat kecil. */
export function AvatarFigure({ image, size = 48 }: { image: Gambar; size?: number }) {
  if (USE_REAL_IMAGES) {
    return (
      <Image
        src={image.src}
        alt={image.alt}
        width={size}
        height={size}
        className="rounded-full object-cover"
      />
    );
  }
  const initials = image.alt
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
  return (
    <span
      role="img"
      aria-label={image.alt}
      className="flex shrink-0 items-center justify-center rounded-full font-heading text-sm font-bold text-white"
      style={{ width: size, height: size, backgroundImage: gradientFor(image.alt) }}
    >
      {initials}
    </span>
  );
}
