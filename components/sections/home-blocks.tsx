import Link from "next/link";
import { Wallet, MapPin, HeartHandshake, MessageSquareText, MessageCircle } from "lucide-react";
import { WhatsAppCta } from "@/components/layout/whatsapp-cta";
import { IslamicPattern } from "@/components/ui/pattern";

// PRD §7.1 blok 4: 4 poin pembeda, ≤ 15 kata per poin.
const PEMBEDA = [
  {
    icon: Wallet,
    judul: "Harga jujur dari awal",
    teks: "Semua biaya tampil di halaman paket. Tidak ada tambahan mengejutkan setelah Anda tertarik.",
  },
  {
    icon: MapPin,
    judul: "Hotel dekat, jarak nyata",
    teks: "Kami cantumkan jarak hotel ke Masjid dalam meter, bukan klaim samar 'dekat'.",
  },
  {
    icon: HeartHandshake,
    judul: "Pendamping yang telaten",
    teks: "Muthawif berbahasa Indonesia, sabar mendampingi lansia dan jamaah pertama.",
  },
  {
    icon: MessageSquareText,
    judul: "Dibalas manusia, cepat",
    teks: "Chat dijawab tim sales dalam 15 menit di jam kerja, bukan bot otomatis.",
  },
];

export function WhyLuhas() {
  return (
    <section className="container-page py-12">
      <h2 className="font-heading text-2xl font-bold text-brand-ink sm:text-3xl">Kenapa Luhas</h2>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {PEMBEDA.map(({ icon: Icon, judul, teks }) => (
          <div
            key={judul}
            className="rounded-[var(--radius-card)] border border-brand-border bg-white p-5"
          >
            <span className="flex size-10 items-center justify-center rounded-xl bg-brand-primary/10 text-brand-primary">
              <Icon className="size-5" aria-hidden />
            </span>
            <h3 className="mt-3 font-heading text-base font-bold text-brand-ink">{judul}</h3>
            <p className="mt-1 text-sm text-brand-muted">{teks}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// PRD §7.1 blok 8: 4 langkah — horizontal di desktop, vertikal di mobile.
const LANGKAH = [
  { n: 1, judul: "Konsultasi", teks: "Chat tim kami, ceritakan rencana dan anggaran Anda." },
  { n: 2, judul: "Pilih Paket", teks: "Bandingkan paket, kunci tanggal dan tipe kamar." },
  { n: 3, judul: "Bayar DP", teks: "DP mengunci harga dan seat. Sisa bisa dicicil sampai H-40." },
  { n: 4, judul: "Berangkat", teks: "Ikuti manasik, lengkapi dokumen, lalu berangkat dengan tenang." },
];

export function RegistrationSteps() {
  return (
    <section className="bg-white">
      <div className="container-page py-12">
        <h2 className="font-heading text-2xl font-bold text-brand-ink sm:text-3xl">
          Alur pendaftaran
        </h2>
        <ol className="mt-6 grid gap-4 md:grid-cols-4">
          {LANGKAH.map((s) => (
            <li key={s.n} className="relative rounded-[var(--radius-card)] bg-brand-bg p-5">
              <span className="flex size-9 items-center justify-center rounded-full bg-brand-primary font-heading text-sm font-bold text-white">
                {s.n}
              </span>
              <h3 className="mt-3 font-heading text-base font-bold text-brand-ink">{s.judul}</h3>
              <p className="mt-1 text-sm text-brand-muted">{s.teks}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

// PRD §7.1 blok 11: CTA penutup, blok kontras.
export function ClosingCta() {
  return (
    <section className="relative overflow-hidden bg-brand-ink text-white">
      <IslamicPattern className="text-white/5" />
      <div className="container-page relative flex flex-col items-center gap-5 py-14 text-center">
        <h2 className="max-w-xl font-heading text-2xl font-bold sm:text-3xl">
          Masih menimbang? Tanyakan apa saja, tanpa keharusan mendaftar.
        </h2>
        <p className="max-w-md text-sm text-white/80">
          Tim kami membantu Anda memilih paket sesuai anggaran dan tanggal, lalu menjelaskan
          skema cicilan yang nyaman.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <WhatsAppCta ctaPosition="closing" size="lg">
            <MessageCircle className="size-4" aria-hidden />
            Chat Sekarang
          </WhatsAppCta>
          <Link
            href="/daftar"
            className="inline-flex h-12 items-center justify-center rounded-[var(--radius-btn)] border border-white/30 px-6 text-sm font-semibold hover:bg-white/10"
          >
            Isi Formulir Minat
          </Link>
        </div>
      </div>
    </section>
  );
}
