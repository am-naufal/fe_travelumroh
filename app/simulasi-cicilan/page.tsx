import type { Metadata } from "next";
import Link from "next/link";
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
      <div className="border-b border-brand-border bg-white py-8">
        <div className="container-page">
          <h1 className="font-heading text-[28px] font-extrabold text-brand-ink sm:text-4xl">
            Simulasi Pembayaran Bertahap
          </h1>
          <p className="mt-2.5 max-w-2xl text-[15px] leading-relaxed text-brand-muted sm:text-base">
            Hitung sendiri perkiraan pembayaran Anda sebelum menghubungi kami.{" "}
            <strong className="text-brand-ink">Tidak ada bunga</strong>, tidak ada biaya
            administrasi.
          </p>
        </div>
      </div>

      <div className="container-page py-10">
        <InstallmentCalculator pakets={options} variant="full" />

        <p className="mt-6 max-w-2xl text-sm text-brand-muted">
          Pelunasan paling lambat H-{PELUNASAN_HARI_SEBELUM_BERANGKAT} sebelum keberangkatan. Bila
          tanggal berangkat dekat, kalkulator otomatis membatasi tenor dan memberi peringatan.
          Butuh skema khusus (mis. gabung tabungan keluarga)?{" "}
          <Link href="/kontak" className="text-brand-primary underline">
            Hubungi tim kami
          </Link>{" "}
          — semua angka final dikonfirmasi setelah konsultasi.
        </p>
      </div>
    </>
  );
}
