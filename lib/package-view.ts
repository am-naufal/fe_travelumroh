/**
 * Bentuk paket yang aman dikirim ke Client Component (tanpa `server-only`).
 * Dipakai kartu, banding, kalkulator klien.
 */
import type { Paket } from "./cms/schema";
import { daysUntil } from "./format";

export const SEAT_HAMPIR_PENUH = 6;

export interface PackageView {
  slug: string;
  nama: string;
  kategori: Paket["kategori"];
  ringkasan: string;
  hargaMulai: number;
  hargaPerKamar: Paket["hargaPerKamar"];
  durasiHari: number;
  kotaKeberangkatan: string[];
  maskapai: Paket["maskapai"];
  hotelMakkah: { nama: string; bintang: number; jarakMeter: number };
  hotelMadinah: { nama: string; bintang: number; jarakMeter: number };
  gambarUtama: Paket["galeri"][number];
  tanggalTerdekat: string | null;
  sisaSeatTerdekat: number | null;
  totalSisaSeat: number;
  /** Semua bulan keberangkatan yang belum tutup, format "YYYY-MM". */
  bulanKeberangkatan: string[];
  jumlahKeberangkatan: number;
  badge: "promo" | "best-seller" | "hampir-penuh" | null;
  termasuk: string[];
  tenorCicilan: number[];
  dpMinimum: number;
  aktif: boolean;
  diperbaruiPada: string;
  brosurPdf?: string;
}

export function keberangkatanTerdekat(p: Paket) {
  return (
    [...p.keberangkatan]
      .filter((k) => k.status !== "tutup" && daysUntil(k.tanggal) >= 0)
      .sort((a, b) => a.tanggal.localeCompare(b.tanggal))[0] ?? null
  );
}

export function totalSisaSeat(p: Paket): number {
  return p.keberangkatan
    .filter((k) => k.status !== "tutup")
    .reduce((s, k) => s + k.sisaSeat, 0);
}

export function badgeEfektif(p: Paket): PackageView["badge"] {
  if (p.badge) return p.badge;
  const k = keberangkatanTerdekat(p);
  if (k && k.sisaSeat > 0 && k.sisaSeat <= SEAT_HAMPIR_PENUH) return "hampir-penuh";
  return null;
}

export function toPackageView(p: Paket): PackageView {
  const k = keberangkatanTerdekat(p);
  return {
    slug: p.slug,
    nama: p.nama,
    kategori: p.kategori,
    ringkasan: p.ringkasan,
    hargaMulai: p.hargaMulai,
    hargaPerKamar: p.hargaPerKamar,
    durasiHari: p.durasiHari,
    kotaKeberangkatan: p.kotaKeberangkatan,
    maskapai: p.maskapai,
    hotelMakkah: {
      nama: p.hotelMakkah.nama,
      bintang: p.hotelMakkah.bintang,
      jarakMeter: p.hotelMakkah.jarakMeter,
    },
    hotelMadinah: {
      nama: p.hotelMadinah.nama,
      bintang: p.hotelMadinah.bintang,
      jarakMeter: p.hotelMadinah.jarakMeter,
    },
    gambarUtama: p.galeri[0],
    tanggalTerdekat: k?.tanggal ?? null,
    sisaSeatTerdekat: k?.sisaSeat ?? null,
    totalSisaSeat: totalSisaSeat(p),
    bulanKeberangkatan: [
      ...new Set(
        p.keberangkatan
          .filter((d) => d.status !== "tutup")
          .map((d) => d.tanggal.slice(0, 7)),
      ),
    ].sort(),
    jumlahKeberangkatan: p.keberangkatan.filter((d) => d.status !== "tutup").length,
    badge: badgeEfektif(p),
    termasuk: p.termasuk,
    tenorCicilan: p.tenorCicilan,
    dpMinimum: p.dpMinimum,
    aktif: p.aktif,
    diperbaruiPada: p.diperbaruiPada,
    brosurPdf: p.brosurPdf,
  };
}
