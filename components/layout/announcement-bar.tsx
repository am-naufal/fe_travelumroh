"use client";

import * as React from "react";
import Link from "next/link";
import { X } from "lucide-react";

// PRD §10.3 PengaturanSitus.banner — pengumuman ringkas, bisa ditutup.
export function AnnouncementBar({ teks, tautan }: { teks: string; tautan?: string }) {
  const [hidden, setHidden] = React.useState(false);
  React.useEffect(() => {
    try {
      setHidden(sessionStorage.getItem("luhas-banner-hidden") === "1");
    } catch {
      /* ignore */
    }
  }, []);
  if (hidden) return null;

  const content = <span className="font-medium">{teks}</span>;

  return (
    <div className="relative bg-brand-primary-dark px-10 py-2 text-center text-sm text-white">
      {tautan ? (
        <Link href={tautan} className="underline underline-offset-2">
          {content}
        </Link>
      ) : (
        content
      )}
      <button
        onClick={() => {
          setHidden(true);
          try {
            sessionStorage.setItem("luhas-banner-hidden", "1");
          } catch {
            /* ignore */
          }
        }}
        className="absolute right-2 top-1/2 flex size-7 -translate-y-1/2 items-center justify-center rounded-full hover:bg-white/15"
        aria-label="Tutup pengumuman"
      >
        <X className="size-4" aria-hidden />
      </button>
    </div>
  );
}
