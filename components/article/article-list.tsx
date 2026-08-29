"use client";

import * as React from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { kategoriArtikel, type Artikel } from "@/lib/cms/schema";
import { ArticleCard } from "./article-card";
import { cn } from "@/lib/utils";

// Filter kategori client-side agar /panduan tetap statis (PRD §10.2, §11).
export function ArticleList({ artikel }: { artikel: Artikel[] }) {
  const sp = useSearchParams();
  const kategori = sp.get("kategori") ?? undefined;
  const filtered = kategori ? artikel.filter((a) => a.kategori === kategori) : artikel;

  const chip = (active: boolean) =>
    cn(
      "rounded-[var(--radius-chip)] border px-3 py-1.5 text-xs font-medium",
      active ? "border-brand-primary bg-brand-primary text-white" : "border-brand-border bg-white",
    );

  return (
    <div>
      <nav aria-label="Kategori panduan" className="flex flex-wrap gap-2">
        <Link href="/panduan" className={chip(!kategori)} scroll={false}>
          Semua
        </Link>
        {kategoriArtikel.map((k) => (
          <Link
            key={k}
            href={`/panduan?kategori=${encodeURIComponent(k)}`}
            className={chip(kategori === k)}
            scroll={false}
          >
            {k}
          </Link>
        ))}
      </nav>

      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((a) => (
          <ArticleCard key={a.slug} artikel={a} />
        ))}
      </div>
      {filtered.length === 0 && (
        <p className="mt-6 text-sm text-brand-muted">Belum ada artikel untuk kategori ini.</p>
      )}
    </div>
  );
}
