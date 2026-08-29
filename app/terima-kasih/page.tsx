import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { getPackage, getSettings } from "@/lib/cms";
import { pageMetadata } from "@/lib/seo";
import { ThankYouActions } from "@/components/forms/thank-you-actions";

// PRD §7.11 / §14: halaman konfirmasi untuk tracking konversi.
export const metadata: Metadata = {
  ...pageMetadata({
    title: "Terima kasih — Pendaftaran diterima",
    description: "Pendaftaran minat Anda sudah kami terima. Tim Luhas akan segera menghubungi.",
    path: "/terima-kasih",
    noIndex: true,
  }),
};

export default async function TerimaKasihPage({ searchParams }: PageProps<"/terima-kasih">) {
  const sp = await searchParams;
  const paketSlug = typeof sp.paket === "string" ? sp.paket : undefined;
  const nama = typeof sp.nama === "string" ? sp.nama : undefined;
  const [paket, settings] = await Promise.all([
    paketSlug ? getPackage(paketSlug) : Promise.resolve(null),
    getSettings(),
  ]);

  return (
    <div className="container-page flex flex-col items-center py-16 text-center">
      <CheckCircle2 className="size-14 text-brand-success" aria-hidden />
      <h1 className="mt-4 font-heading text-2xl font-bold text-brand-ink sm:text-3xl">
        Pendaftaran Anda sudah kami terima
      </h1>
      <p className="mt-2 max-w-md text-sm text-brand-muted">
        {nama ? `Terima kasih, ${nama}. ` : ""}
        Tim kami akan menghubungi via WhatsApp dalam {settings.kontak.slaBalasMenit} menit pada
        jam kerja
        {paket ? ` untuk membahas paket ${paket.nama}` : ""}. Untuk lebih cepat, mulai chat
        sekarang.
      </p>

      <ThankYouActions
        nama={nama}
        paketNama={paket?.nama}
        paketSlug={paketSlug}
      />

      <div className="mt-10 grid w-full max-w-lg gap-3 text-left">
        <p className="text-sm font-semibold text-brand-ink">Sambil menunggu, Anda bisa:</p>
        <Link href="/simulasi-cicilan" className="rounded-lg border border-brand-border bg-white p-4 text-sm hover:border-brand-primary">
          Menghitung simulasi cicilan lebih detail →
        </Link>
        <Link href="/panduan" className="rounded-lg border border-brand-border bg-white p-4 text-sm hover:border-brand-primary">
          Membaca panduan persiapan umroh →
        </Link>
        <Link href="/faq" className="rounded-lg border border-brand-border bg-white p-4 text-sm hover:border-brand-primary">
          Melihat pertanyaan yang sering diajukan →
        </Link>
      </div>
    </div>
  );
}
