"use client";

import * as React from "react";
import { Figure } from "@/components/ui/media";
import { Lightbox } from "@/components/ui/lightbox";
import type { AlbumGaleri, Gambar } from "@/lib/cms/schema";
import { cn } from "@/lib/utils";

// PRD §7.7: grid masonry, filter per keberangkatan/tahun, lightbox.
export function GalleryView({ albums }: { albums: AlbumGaleri[] }) {
  const tahunList = [...new Set(albums.map((a) => a.tahun))].sort((a, b) => b - a);
  const [tahun, setTahun] = React.useState<number | "semua">("semua");
  const [albumSlug, setAlbumSlug] = React.useState<string | "semua">("semua");

  const filtered = albums.filter(
    (a) => (tahun === "semua" || a.tahun === tahun) && (albumSlug === "semua" || a.slug === albumSlug),
  );
  const fotoFlat: Gambar[] = filtered.flatMap((a) => a.foto);
  const [openAt, setOpenAt] = React.useState<number | null>(null);

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setTahun("semua")}
          className={cn(
            "rounded-[var(--radius-chip)] border px-3 py-1.5 text-xs font-medium",
            tahun === "semua"
              ? "border-brand-primary bg-brand-primary text-white"
              : "border-brand-border bg-white",
          )}
        >
          Semua tahun
        </button>
        {tahunList.map((t) => (
          <button
            key={t}
            onClick={() => setTahun(t)}
            className={cn(
              "rounded-[var(--radius-chip)] border px-3 py-1.5 text-xs font-medium",
              tahun === t
                ? "border-brand-primary bg-brand-primary text-white"
                : "border-brand-border bg-white",
            )}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="mt-3">
        <label htmlFor="album" className="sr-only">
          Pilih keberangkatan
        </label>
        <select
          id="album"
          value={albumSlug}
          onChange={(e) => setAlbumSlug(e.target.value)}
          className="rounded-lg border border-brand-border bg-white px-3 py-2 text-sm"
        >
          <option value="semua">Semua keberangkatan</option>
          {albums
            .filter((a) => tahun === "semua" || a.tahun === tahun)
            .map((a) => (
              <option key={a.slug} value={a.slug}>
                {a.judul}
              </option>
            ))}
        </select>
      </div>

      {/* Masonry via CSS columns */}
      <div className="mt-6 [column-gap:1rem] sm:columns-2 lg:columns-3">
        {fotoFlat.map((foto, i) => (
          <button
            key={foto.src}
            type="button"
            onClick={() => setOpenAt(i)}
            className="mb-4 block w-full break-inside-avoid overflow-hidden rounded-[var(--radius-card)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary"
            aria-label={`Perbesar: ${foto.alt}`}
          >
            <Figure
              image={foto}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              ratio={i % 3 === 0 ? "3/4" : "4/3"}
            />
          </button>
        ))}
      </div>

      {fotoFlat.length === 0 && (
        <p className="mt-6 text-sm text-brand-muted">Belum ada foto untuk filter ini.</p>
      )}

      <Lightbox images={fotoFlat} index={openAt} onClose={() => setOpenAt(null)} onNavigate={setOpenAt} />
    </div>
  );
}
