import type { Metadata } from "next";
import Link from "next/link";
import { Info } from "lucide-react";
import { getActivePackages } from "@/lib/cms";
import { keberangkatanTerdekat } from "@/lib/package-view";
import { pageMetadata } from "@/lib/seo";
import { PELUNASAN_HARI_SEBELUM_BERANGKAT } from "@/lib/installment";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { InstallmentCalculator } from "@/components/forms/installment-calculator";

export const revalidate = 300;

export const metadata: Metadata = pageMetadata({
  title: "Simulasi Cicilan Umroh — Hitung Angsuran Bulanan",
  description:
    "Hitung perkiraan angsuran umroh Luhas: pilih paket, atur DP, dan tenor 3–12 bulan. Tanpa bunga, pelunasan H-40 sebelum berangkat. Simulasi internal.",
  path: "/simulasi-cicilan",
});

export default async function SimulasiCicilanPage() {
  const pakets = await getActivePackages();
  const options = pakets.map((p) => {
    const k = keberangkatanTerdekat(p);
    return {
      slug: p.slug,
      nama: p.nama,
      harga: p.hargaMulai,
      dpMinimum: p.dpMinimum,
      tenor: p.tenorCicilan,
      tanggalTerdekat: k?.tanggal ?? null,
    };
  });

  return (
    <>
      <Breadcrumb items={[{ name: "Simulasi Cicilan", path: "/simulasi-cicilan" }]} />
      <div className="container-page grid gap-8 py-8 lg:grid-cols-[1fr_1.2fr]">
        <div>
          <h1 className="font-heading text-2xl font-bold text-brand-ink sm:text-3xl">
            Simulasi cicilan umroh
          </h1>
          <p className="mt-2 text-sm text-brand-muted">
            Cicilan Luhas dikelola internal, <strong>tanpa bunga</strong>. Sisa harga setelah DP
            dibagi rata sepanjang tenor yang dipilih.
          </p>

          <div className="mt-6 space-y-4 text-sm">
            <div className="flex gap-2 rounded-lg bg-brand-primary/5 p-4">
              <Info className="size-4 shrink-0 text-brand-primary" aria-hidden />
              <p className="text-brand-ink">
                Pelunasan paling lambat <strong>H-{PELUNASAN_HARI_SEBELUM_BERANGKAT}</strong>{" "}
                sebelum keberangkatan. Bila tanggal berangkat dekat, kalkulator otomatis
                membatasi tenor dan memberi peringatan.
              </p>
            </div>
            <p className="text-brand-muted">
              Butuh skema khusus (mis. gabung tabungan keluarga)?{" "}
              <Link href="/kontak" className="text-brand-primary underline">
                Hubungi tim kami
              </Link>{" "}
              — semua angka final dikonfirmasi setelah konsultasi.
            </p>
          </div>
        </div>

        <InstallmentCalculator pakets={options} variant="full" />
      </div>
    </>
  );
}
