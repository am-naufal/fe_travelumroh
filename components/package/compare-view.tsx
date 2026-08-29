"use client";

import * as React from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Plus, X, Check } from "lucide-react";
import type { PackageView } from "@/lib/package-view";
import { formatRupiah, formatTanggalShort, formatJarak } from "@/lib/format";
import { useCompare } from "./compare-context";
import { EmptyState } from "@/components/ui/empty-state";
import { Button } from "@/components/ui/button";
import { WhatsAppCta } from "@/components/layout/whatsapp-cta";
import { cn } from "@/lib/utils";

// PRD §7.4: tabel berdampingan hingga 3 paket. Perbedaan disorot.
// Mobile: tabel geser horizontal, kolom nama terkunci.
export function CompareView({ pakets }: { pakets: PackageView[] }) {
  const compare = useCompare();
  const searchParams = useSearchParams();
  const initedRef = React.useRef(false);

  // Sinkronkan dari ?paket=a,b,c sekali saat masuk lewat tautan.
  React.useEffect(() => {
    if (initedRef.current) return;
    initedRef.current = true;
    const fromUrl = (searchParams.get("paket") ?? "").split(",").filter(Boolean);
    if (fromUrl.length && compare.slugs.length === 0) {
      fromUrl.slice(0, compare.max).forEach((s) => {
        if (pakets.some((p) => p.slug === s)) compare.toggle(s);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const selected = compare.slugs
    .map((s) => pakets.find((p) => p.slug === s))
    .filter(Boolean) as PackageView[];

  const available = pakets.filter((p) => !compare.has(p.slug));

  if (selected.length === 0) {
    return (
      <EmptyState
        title="Belum ada paket untuk dibandingkan"
        description="Pilih paket dari halaman daftar, atau tambahkan langsung di sini."
        action={
          <Button asChild>
            <Link href="/paket">Buka daftar paket</Link>
          </Button>
        }
      />
    );
  }

  const rows: { label: string; render: (p: PackageView) => React.ReactNode; key: (p: PackageView) => string }[] = [
    {
      label: "Harga quad",
      render: (p) => formatRupiah(p.hargaPerKamar.quad),
      key: (p) => String(p.hargaPerKamar.quad),
    },
    {
      label: "Harga triple",
      render: (p) => formatRupiah(p.hargaPerKamar.triple),
      key: (p) => String(p.hargaPerKamar.triple),
    },
    {
      label: "Harga double",
      render: (p) => formatRupiah(p.hargaPerKamar.double),
      key: (p) => String(p.hargaPerKamar.double),
    },
    { label: "Durasi", render: (p) => `${p.durasiHari} hari`, key: (p) => String(p.durasiHari) },
    {
      label: "Maskapai",
      render: (p) => `${p.maskapai.nama} ${p.maskapai.transit ? "(transit)" : "(langsung)"}`,
      key: (p) => p.maskapai.nama + p.maskapai.transit,
    },
    {
      label: "Hotel Makkah",
      render: (p) => `${p.hotelMakkah.nama} ★${p.hotelMakkah.bintang} · ${formatJarak(p.hotelMakkah.jarakMeter)}`,
      key: (p) => p.hotelMakkah.nama,
    },
    {
      label: "Hotel Madinah",
      render: (p) => `${p.hotelMadinah.nama} ★${p.hotelMadinah.bintang} · ${formatJarak(p.hotelMadinah.jarakMeter)}`,
      key: (p) => p.hotelMadinah.nama,
    },
    {
      label: "Keberangkatan terdekat",
      render: (p) => (p.tanggalTerdekat ? formatTanggalShort(p.tanggalTerdekat) : "—"),
      key: (p) => p.tanggalTerdekat ?? "-",
    },
    {
      label: "Sisa seat (terdekat)",
      render: (p) => (p.sisaSeatTerdekat === null ? "—" : `${p.sisaSeatTerdekat} seat`),
      key: (p) => String(p.sisaSeatTerdekat),
    },
  ];

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[560px] border-collapse text-sm">
          <thead>
            <tr>
              <th className="sticky left-0 z-10 w-40 bg-brand-bg p-3 text-left align-bottom" scope="col">
                <span className="sr-only">Kriteria</span>
              </th>
              {selected.map((p) => (
                <th key={p.slug} scope="col" className="min-w-[180px] p-3 text-left align-bottom">
                  <div className="flex items-start justify-between gap-2">
                    <Link href={`/paket/${p.slug}`} className="font-heading font-bold text-brand-ink hover:text-brand-primary">
                      {p.nama}
                    </Link>
                    <button
                      onClick={() => compare.remove(p.slug)}
                      aria-label={`Hapus ${p.nama}`}
                      className="flex size-6 shrink-0 items-center justify-center rounded-full text-brand-muted hover:bg-brand-ink/10"
                    >
                      <X className="size-3.5" aria-hidden />
                    </button>
                  </div>
                </th>
              ))}
              {selected.length < compare.max && available.length > 0 && (
                <th className="min-w-[160px] p-3 align-bottom">
                  <label htmlFor="tambah-banding" className="sr-only">
                    Tambah paket
                  </label>
                  <select
                    id="tambah-banding"
                    className="w-full rounded-lg border border-dashed border-brand-border bg-white p-2 text-xs"
                    value=""
                    onChange={(e) => e.target.value && compare.toggle(e.target.value)}
                  >
                    <option value="">+ Tambah paket…</option>
                    {available.map((p) => (
                      <option key={p.slug} value={p.slug}>
                        {p.nama}
                      </option>
                    ))}
                  </select>
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => {
              const values = selected.map(row.key);
              const allSame = values.every((v) => v === values[0]);
              return (
                <tr key={row.label} className="border-t border-brand-border">
                  <th
                    scope="row"
                    className="sticky left-0 z-10 bg-brand-bg p-3 text-left font-medium text-brand-muted"
                  >
                    {row.label}
                  </th>
                  {selected.map((p) => (
                    <td
                      key={p.slug}
                      className={cn(
                        "p-3 align-top",
                        // PRD §7.4: perbedaan disorot secara visual
                        !allSame && "bg-brand-accent/10 font-medium text-brand-ink",
                      )}
                    >
                      {row.render(p)}
                    </td>
                  ))}
                  {selected.length < compare.max && available.length > 0 && <td />}
                </tr>
              );
            })}

            {/* Fasilitas termasuk — gabungan */}
            <tr className="border-t border-brand-border">
              <th scope="row" className="sticky left-0 z-10 bg-brand-bg p-3 text-left font-medium text-brand-muted">
                Fasilitas termasuk
              </th>
              {selected.map((p) => (
                <td key={p.slug} className="p-3 align-top">
                  <ul className="space-y-1">
                    {p.termasuk.slice(0, 6).map((t) => (
                      <li key={t} className="flex gap-1.5 text-xs">
                        <Check className="mt-0.5 size-3 shrink-0 text-brand-success" aria-hidden />
                        {t}
                      </li>
                    ))}
                  </ul>
                </td>
              ))}
              {selected.length < compare.max && available.length > 0 && <td />}
            </tr>

            <tr className="border-t border-brand-border">
              <th scope="row" className="sticky left-0 z-10 bg-brand-bg p-3" />
              {selected.map((p) => (
                <td key={p.slug} className="p-3">
                  <div className="flex flex-col gap-2">
                    <Button asChild size="sm">
                      <Link href={`/paket/${p.slug}`}>Detail</Link>
                    </Button>
                    <WhatsAppCta
                      kind="custom"
                      text={`Assalamualaikum, saya membandingkan beberapa paket dan tertarik dengan ${p.nama}. Mohon informasinya.`}
                      ctaPosition="compare-table"
                      size="sm"
                      variant="secondary"
                    >
                      Tanya WA
                    </WhatsAppCta>
                  </div>
                </td>
              ))}
              {selected.length < compare.max && available.length > 0 && <td />}
            </tr>
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <button onClick={compare.clear} className="text-sm text-brand-muted hover:text-brand-ink">
          Kosongkan perbandingan
        </button>
        <Link href="/paket" className="inline-flex items-center gap-1 text-sm font-medium text-brand-primary hover:underline">
          <Plus className="size-4" aria-hidden />
          Cari paket lain
        </Link>
      </div>
    </div>
  );
}
