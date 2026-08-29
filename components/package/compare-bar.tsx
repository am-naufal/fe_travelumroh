"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { X, GitCompareArrows } from "lucide-react";
import type { PackageView } from "@/lib/package-view";
import { useCompare } from "./compare-context";
import { Button } from "@/components/ui/button";
import { track } from "@/lib/analytics";

// PRD §7.2/§7.4: pilih hingga 3 paket lalu buka halaman banding.
export function CompareBar({ pakets }: { pakets: PackageView[] }) {
  const compare = useCompare();
  const router = useRouter();
  if (compare.slugs.length === 0) return null;

  const selected = compare.slugs
    .map((s) => pakets.find((p) => p.slug === s))
    .filter(Boolean) as PackageView[];

  const openCompare = () => {
    track({ name: "compare_open", params: { packages: compare.slugs.join(",") } });
    router.push(`/paket/banding?paket=${compare.slugs.join(",")}`);
  };

  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-brand-border bg-white/95 backdrop-blur">
      <div className="container-page flex items-center gap-3 py-3">
        <div className="flex flex-1 flex-wrap items-center gap-2">
          <span className="text-sm font-medium text-brand-ink">
            Bandingkan ({compare.slugs.length}/{compare.max}):
          </span>
          {selected.map((p) => (
            <span
              key={p.slug}
              className="inline-flex items-center gap-1 rounded-full bg-brand-primary/10 py-1 pl-3 pr-1 text-xs text-brand-ink"
            >
              {p.nama}
              <button
                onClick={() => compare.remove(p.slug)}
                aria-label={`Hapus ${p.nama} dari perbandingan`}
                className="flex size-5 items-center justify-center rounded-full hover:bg-brand-ink/10"
              >
                <X className="size-3" aria-hidden />
              </button>
            </span>
          ))}
        </div>
        <button
          onClick={compare.clear}
          className="hidden text-xs text-brand-muted hover:text-brand-ink sm:block"
        >
          Kosongkan
        </button>
        <Button size="sm" onClick={openCompare} disabled={compare.slugs.length < 2}>
          <GitCompareArrows className="size-4" aria-hidden />
          Banding
        </Button>
      </div>
    </div>
  );
}

/** Versi ringkas untuk halaman selain daftar paket. */
export function CompareBarLink() {
  const compare = useCompare();
  if (compare.slugs.length < 2) return null;
  return (
    <Link
      href={`/paket/banding?paket=${compare.slugs.join(",")}`}
      className="fixed bottom-20 right-4 z-30 rounded-full bg-brand-ink px-4 py-2 text-xs font-semibold text-white shadow-[var(--shadow-md)]"
    >
      Banding {compare.slugs.length} paket
    </Link>
  );
}
