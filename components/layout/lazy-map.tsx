"use client";

import * as React from "react";
import { MapPin } from "lucide-react";
import { env } from "@/lib/env";

// PRD §7.10 / §12: peta dimuat setelah interaksi, bukan iframe otomatis.
export function LazyMap({ alamat }: { alamat: string }) {
  const [loaded, setLoaded] = React.useState(false);
  const src =
    env.mapsEmbedUrl ||
    `https://maps.google.com/maps?q=${encodeURIComponent(alamat)}&output=embed`;

  if (loaded) {
    return (
      <iframe
        title={`Peta lokasi kantor Luhas — ${alamat}`}
        src={src}
        loading="lazy"
        className="h-full w-full rounded-[var(--radius-card)] border border-brand-border"
        referrerPolicy="no-referrer-when-downgrade"
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => setLoaded(true)}
      className="flex h-full w-full flex-col items-center justify-center gap-2 rounded-[var(--radius-card)] border border-dashed border-brand-border bg-white p-6 text-center text-sm text-brand-muted hover:border-brand-primary"
    >
      <MapPin className="size-8 text-brand-primary" aria-hidden />
      <span className="font-medium text-brand-ink">Tampilkan peta lokasi</span>
      <span className="text-xs">Peta dimuat hanya saat Anda menekan tombol ini.</span>
    </button>
  );
}
