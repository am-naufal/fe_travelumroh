"use client";

import * as React from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { SlidersHorizontal, X } from "lucide-react";
import type { PackageView } from "@/lib/package-view";
import { formatRupiah, formatTanggalShort } from "@/lib/format";
import { kategoriPaket } from "@/lib/cms/schema";
import { track } from "@/lib/analytics";
import { PackageCard } from "./package-card";
import { CompareBar } from "./compare-bar";
import { Button } from "@/components/ui/button";
import { Chip } from "@/components/ui/chip";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, Label } from "@/components/ui/field";
import { PackageCardSkeleton } from "@/components/ui/skeleton";
import { EmptyState } from "@/components/ui/empty-state";
import { cn } from "@/lib/utils";

const PER_PAGE = 12; // PRD §7.2: paginasi setelah 12 kartu

const KATEGORI_LABEL: Record<string, string> = {
  hemat: "Hemat",
  reguler: "Reguler",
  "plus-turki": "Plus Turki",
  "plus-dubai": "Plus Dubai",
  ramadhan: "Ramadhan",
  vip: "VIP",
};

const SORTS = [
  { value: "harga-terendah", label: "Harga terendah" },
  { value: "keberangkatan-terdekat", label: "Keberangkatan terdekat" },
  { value: "populer", label: "Paling populer" },
] as const;

function monthLabel(ym: string): string {
  const [y, m] = ym.split("-").map(Number);
  return new Date(y, m - 1, 1).toLocaleDateString("id-ID", { month: "long", year: "numeric" });
}

export function PackageExplorer({ pakets }: { pakets: PackageView[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [hydrated, setHydrated] = React.useState(false);
  const [panelOpen, setPanelOpen] = React.useState(false);

  React.useEffect(() => setHydrated(true), []);

  // Opsi dinamis dari data
  const hargaMin = Math.min(...pakets.map((p) => p.hargaMulai));
  const hargaMax = Math.max(...pakets.map((p) => p.hargaMulai));
  const semuaKota = [...new Set(pakets.flatMap((p) => p.kotaKeberangkatan))].sort();
  const semuaMaskapai = [...new Set(pakets.map((p) => p.maskapai.nama))].sort();
  const semuaBulan = [...new Set(pakets.flatMap((p) => p.bulanKeberangkatan))].sort();

  // Baca filter dari URL
  const get = (k: string) => searchParams.get(k) ?? "";
  const getList = (k: string) => (get(k) ? get(k).split(",").filter(Boolean) : []);
  const fKategori = getList("kategori");
  const fBulan = get("bulan");
  const fHargaMax = Number(get("hargaMax")) || hargaMax;
  const fDurasi = get("durasi");
  const fKota = get("kota");
  const fMaskapai = get("maskapai");
  const fBintang = get("bintang");
  const sort = get("urutkan") || "harga-terendah";
  const page = Math.max(1, Number(get("hal")) || 1);

  const activeCount =
    fKategori.length +
    [fBulan, fDurasi, fKota, fMaskapai, fBintang].filter(Boolean).length +
    (Number(get("hargaMax")) ? 1 : 0);

  const setParams = React.useCallback(
    (updates: Record<string, string | null>, resetPage = true) => {
      const next = new URLSearchParams(searchParams.toString());
      for (const [k, v] of Object.entries(updates)) {
        if (v === null || v === "") next.delete(k);
        else next.set(k, v);
      }
      if (resetPage) next.delete("hal");
      // PRD §7.2: filter tidak me-reload halaman penuh; URL tetap bookmarkable
      router.replace(`${pathname}${next.toString() ? `?${next}` : ""}`, { scroll: false });
      track({ name: "filter_apply", params: { filters: next.toString() } });
    },
    [router, pathname, searchParams],
  );

  const toggleKategori = (k: string) => {
    const next = fKategori.includes(k) ? fKategori.filter((x) => x !== k) : [...fKategori, k];
    setParams({ kategori: next.join(",") });
  };

  const reset = () => router.replace(pathname, { scroll: false });

  // Terapkan filter
  let hasil = pakets.filter((p) => {
    if (fKategori.length && !fKategori.includes(p.kategori)) return false;
    if (fBulan && !p.bulanKeberangkatan.includes(fBulan)) return false;
    if (p.hargaMulai > fHargaMax) return false;
    if (fDurasi === "9" && p.durasiHari > 10) return false;
    if (fDurasi === "12" && (p.durasiHari < 11 || p.durasiHari > 13)) return false;
    if (fDurasi === "14plus" && p.durasiHari < 14) return false;
    if (fKota && !p.kotaKeberangkatan.includes(fKota)) return false;
    if (fMaskapai && p.maskapai.nama !== fMaskapai) return false;
    if (fBintang && p.hotelMakkah.bintang < Number(fBintang)) return false;
    return true;
  });

  hasil = [...hasil].sort((a, b) => {
    if (sort === "keberangkatan-terdekat") {
      return (a.tanggalTerdekat ?? "9999").localeCompare(b.tanggalTerdekat ?? "9999");
    }
    if (sort === "populer") {
      const rank = (p: PackageView) =>
        (p.badge === "best-seller" ? 0 : p.badge === "promo" ? 1 : 2);
      return rank(a) - rank(b) || a.hargaMulai - b.hargaMulai;
    }
    return a.hargaMulai - b.hargaMulai;
  });

  const totalPages = Math.max(1, Math.ceil(hasil.length / PER_PAGE));
  const clampedPage = Math.min(page, totalPages);
  const pageItems = hasil.slice((clampedPage - 1) * PER_PAGE, clampedPage * PER_PAGE);

  const FilterPanel = (
    <div className="space-y-6">
      <fieldset>
        <legend className="mb-2.5 text-[13.5px] font-semibold text-brand-muted-2">Kategori</legend>
        <div className="flex flex-wrap gap-2">
          <Chip selected={fKategori.length === 0} onClick={() => setParams({ kategori: null })}>
            Semua
          </Chip>
          {kategoriPaket.map((k) => (
            <Chip key={k} selected={fKategori.includes(k)} onClick={() => toggleKategori(k)}>
              {KATEGORI_LABEL[k]}
            </Chip>
          ))}
        </div>
      </fieldset>

      <div>
        <div className="flex items-center justify-between">
          <Label htmlFor="f-harga" className="mb-0">
            Harga maksimum
          </Label>
          <span className="text-sm font-medium text-brand-ink">{formatRupiah(fHargaMax)}</span>
        </div>
        <Slider
          id="f-harga"
          className="mt-2"
          min={hargaMin}
          max={hargaMax}
          step={500_000}
          value={[fHargaMax]}
          onValueChange={([v]) => setParams({ hargaMax: String(v) })}
          aria-label="Harga maksimum"
        />
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <Label htmlFor="f-bulan">Bulan keberangkatan</Label>
          <Select id="f-bulan" value={fBulan} onChange={(e) => setParams({ bulan: e.target.value })}>
            <option value="">Semua bulan</option>
            {semuaBulan.map((b) => (
              <option key={b} value={b}>
                {monthLabel(b)}
              </option>
            ))}
          </Select>
        </div>
        <div>
          <Label htmlFor="f-durasi">Durasi</Label>
          <Select id="f-durasi" value={fDurasi} onChange={(e) => setParams({ durasi: e.target.value })}>
            <option value="">Semua durasi</option>
            <option value="9">9–10 hari</option>
            <option value="12">11–13 hari</option>
            <option value="14plus">14 hari atau lebih</option>
          </Select>
        </div>
        <div>
          <Label htmlFor="f-kota">Kota keberangkatan</Label>
          <Select id="f-kota" value={fKota} onChange={(e) => setParams({ kota: e.target.value })}>
            <option value="">Semua kota</option>
            {semuaKota.map((k) => (
              <option key={k} value={k}>
                {k}
              </option>
            ))}
          </Select>
        </div>
        <div>
          <Label htmlFor="f-maskapai">Maskapai</Label>
          <Select
            id="f-maskapai"
            value={fMaskapai}
            onChange={(e) => setParams({ maskapai: e.target.value })}
          >
            <option value="">Semua maskapai</option>
            {semuaMaskapai.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </Select>
        </div>
        <div>
          <Label htmlFor="f-bintang">Bintang hotel Makkah</Label>
          <Select
            id="f-bintang"
            value={fBintang}
            onChange={(e) => setParams({ bintang: e.target.value })}
          >
            <option value="">Semua</option>
            <option value="3">Minimal 3</option>
            <option value="4">Minimal 4</option>
            <option value="5">Bintang 5</option>
          </Select>
        </div>
      </div>

      {activeCount > 0 && (
        <Button variant="ghost" size="sm" onClick={reset}>
          <X className="size-4" aria-hidden />
          Reset semua filter
        </Button>
      )}
    </div>
  );

  return (
    <div className="container-page py-8">
      <div className="lg:grid lg:grid-cols-[280px_1fr] lg:gap-8">
        {/* Filter — desktop sidebar */}
        <aside className="hidden lg:block">
          <div className="sticky top-24 rounded-[var(--radius-card)] border border-brand-border bg-white p-6">
            <h2 className="mb-6 flex items-center gap-2.5 font-heading text-base font-extrabold text-brand-ink">
              <SlidersHorizontal className="size-5 text-brand-primary" aria-hidden />
              Saring paket
            </h2>
            {FilterPanel}
          </div>
        </aside>

        <div>
          {/* Toolbar */}
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-brand-muted" aria-live="polite">
              <b className="font-bold text-brand-ink">{hasil.length} paket</b> ditemukan
            </p>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setPanelOpen(true)}
                className="inline-flex items-center gap-1.5 rounded-lg border border-brand-border bg-white px-3 py-2 text-sm font-medium lg:hidden"
              >
                <SlidersHorizontal className="size-4" aria-hidden />
                Filter
                {activeCount > 0 && (
                  <span className="ml-0.5 rounded-full bg-brand-primary px-1.5 text-xs text-white">
                    {activeCount}
                  </span>
                )}
              </button>
              <div>
                <label htmlFor="sort" className="sr-only">
                  Urutkan
                </label>
                <Select
                  id="sort"
                  value={sort}
                  onChange={(e) => setParams({ urutkan: e.target.value }, false)}
                  className="min-h-[40px] py-2 text-sm"
                >
                  {SORTS.map((s) => (
                    <option key={s.value} value={s.value}>
                      {s.label}
                    </option>
                  ))}
                </Select>
              </div>
            </div>
          </div>

          {/* Grid */}
          {!hydrated ? (
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <PackageCardSkeleton key={i} />
              ))}
            </div>
          ) : pageItems.length === 0 ? (
            <EmptyState
              title="Tidak ada paket sesuai filter"
              description="Coba longgarkan filter harga atau bulan keberangkatan. Paket termurah kami mulai dari sekitar Rp 27,5 juta."
              action={
                <>
                  <Button onClick={reset}>Reset filter</Button>
                  <Button variant="secondary" onClick={() => setParams({ hargaMax: null, bulan: null })}>
                    Hapus filter harga &amp; bulan
                  </Button>
                </>
              }
            />
          ) : (
            <>
              <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {pageItems.map((p, i) => (
                  <PackageCard key={p.slug} paket={p} priority={clampedPage === 1 && i === 0} />
                ))}
              </div>

              {totalPages > 1 && (
                <nav
                  className="mt-8 flex items-center justify-center gap-1"
                  aria-label="Paginasi paket"
                >
                  {Array.from({ length: totalPages }).map((_, i) => {
                    const n = i + 1;
                    return (
                      <button
                        key={n}
                        onClick={() => {
                          setParams({ hal: n === 1 ? null : String(n) }, false);
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                        aria-current={n === clampedPage ? "page" : undefined}
                        className={cn(
                          "flex size-10 items-center justify-center rounded-lg text-sm font-medium",
                          n === clampedPage
                            ? "bg-brand-primary text-white"
                            : "border border-brand-border bg-white hover:bg-brand-ink/5",
                        )}
                      >
                        {n}
                      </button>
                    );
                  })}
                </nav>
              )}
            </>
          )}

          {/* Info tanggal terdekat untuk sort */}
          {sort === "keberangkatan-terdekat" && pageItems[0]?.tanggalTerdekat && (
            <p className="mt-4 text-xs text-brand-muted">
              Keberangkatan terdekat: {formatTanggalShort(pageItems[0].tanggalTerdekat)}
            </p>
          )}
        </div>
      </div>

      {/* Filter — mobile sheet */}
      {panelOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-brand-ink/40"
            onClick={() => setPanelOpen(false)}
            aria-hidden
          />
          <div className="absolute inset-x-0 bottom-0 max-h-[85vh] overflow-y-auto rounded-t-[var(--radius-card)] bg-white p-5">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="flex items-center gap-2.5 font-heading text-base font-extrabold text-brand-ink">
                <SlidersHorizontal className="size-5 text-brand-primary" aria-hidden />
                Saring paket
              </h2>
              <button
                onClick={() => setPanelOpen(false)}
                aria-label="Tutup filter"
                className="flex size-9 items-center justify-center rounded-full hover:bg-brand-ink/5"
              >
                <X className="size-5" aria-hidden />
              </button>
            </div>
            {FilterPanel}
            <Button className="mt-6 w-full" onClick={() => setPanelOpen(false)}>
              Lihat {hasil.length} paket
            </Button>
          </div>
        </div>
      )}

      <CompareBar pakets={pakets} />
    </div>
  );
}
