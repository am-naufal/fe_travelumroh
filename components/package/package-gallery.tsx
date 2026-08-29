"use client";

import * as React from "react";
import { Figure } from "@/components/ui/media";
import { Lightbox } from "@/components/ui/lightbox";
import type { Gambar } from "@/lib/cms/schema";

// PRD §7.3 bagian 2: galeri foto paket (hotel, maskapai, dokumentasi rombongan).
export function PackageGallery({ images, nama }: { images: Gambar[]; nama: string }) {
  const [openAt, setOpenAt] = React.useState<number | null>(null);
  const [main, ...rest] = images;

  return (
    <div>
      <div className="grid gap-2 sm:grid-cols-[2fr_1fr]">
        <button
          type="button"
          onClick={() => setOpenAt(0)}
          className="overflow-hidden rounded-[var(--radius-card)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary"
          aria-label={`Perbesar foto ${nama}`}
        >
          <Figure
            image={main}
            sizes="(max-width: 640px) 100vw, 66vw"
            ratio="16/10"
            priority
            className="w-full"
          />
        </button>
        {rest.length > 0 && (
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-1">
            {rest.slice(0, 2).map((img, i) => (
              <button
                key={img.src}
                type="button"
                onClick={() => setOpenAt(i + 1)}
                className="overflow-hidden rounded-[var(--radius-card)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary"
                aria-label={`Perbesar foto ${i + 2}`}
              >
                <Figure image={img} sizes="(max-width: 640px) 50vw, 33vw" ratio="4/3" className="w-full" />
              </button>
            ))}
          </div>
        )}
      </div>
      {images.length > 3 && (
        <button
          type="button"
          onClick={() => setOpenAt(0)}
          className="mt-2 text-sm font-medium text-brand-primary hover:underline"
        >
          Lihat semua {images.length} foto
        </button>
      )}

      <Lightbox
        images={images}
        index={openAt}
        onClose={() => setOpenAt(null)}
        onNavigate={setOpenAt}
      />
    </div>
  );
}
