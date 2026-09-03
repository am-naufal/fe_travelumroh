import Image from "next/image";
import { Camera } from "lucide-react";
import { cn } from "@/lib/utils";
import type { CSSProperties } from "react";
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

// Placeholder foto — gradasi + garis diagonal tipis, persis docs/design/*.html (.ph).
const PLACEHOLDER_GRADIENT =
  "linear-gradient(135deg, var(--color-brand-ink) 0%, var(--color-brand-ink-2) 55%, var(--color-brand-primary) 100%)";
const PLACEHOLDER_STRIPES =
  "repeating-linear-gradient(45deg, rgba(255,255,255,0.045) 0 12px, rgba(255,255,255,0) 12px 24px)";

function avatarGradientFor(seed: string): string {
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
      style={
        {
          ...style,
          backgroundImage: `${PLACEHOLDER_STRIPES}, ${PLACEHOLDER_GRADIENT}`,
        } as CSSProperties
      }
    >
      <span className="pointer-events-none m-3 inline-flex max-w-[calc(100%-24px)] items-center gap-1.5 rounded-full bg-brand-ink/[.42] px-2.5 py-[5px] text-[11px] font-semibold text-white/80">
        <Camera className="size-3.5 shrink-0" aria-hidden />
        <span className="line-clamp-1">{image.alt}</span>
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
      style={{ width: size, height: size, backgroundImage: avatarGradientFor(image.alt) }}
    >
      {initials}
    </span>
  );
}
