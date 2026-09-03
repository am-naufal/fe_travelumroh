import Link from "next/link";
import { Wallet, MapPin, HeartHandshake, MessageSquareText, MessageCircle } from "lucide-react";
import { WhatsAppCta } from "@/components/layout/whatsapp-cta";
import { buttonVariants } from "@/components/ui/button";
import { StarMark } from "@/components/ui/star-mark";
import { SectionHeading } from "./section-heading";

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
      <SectionHeading kicker="Kenapa Luhas" title="Empat hal yang kami pegang" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {PEMBEDA.map(({ icon: Icon, judul, teks }) => (
          <div
            key={judul}
            className="flex flex-col gap-3 rounded-[var(--radius-card)] border border-brand-border bg-white p-5"
          >
            <span className="flex size-12 items-center justify-center rounded-[14px] bg-tint-blue-bg text-brand-primary">
              <Icon className="size-6" aria-hidden />
            </span>
            <h3 className="font-heading text-[17px] font-extrabold text-brand-ink">{judul}</h3>
            <p className="text-sm leading-relaxed text-brand-muted-2">{teks}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// PRD §7.1 blok 8: 4 langkah — horizontal di desktop, vertikal di mobile.
const LANGKAH = [
  { n: 1, judul: "Konsultasi", teks: "Chat kami, ceritakan rencana Anda" },
  { n: 2, judul: "Pilih Paket", teks: "Kami bantu carikan yang paling pas" },
  { n: 3, judul: "Uang Muka", teks: "Kursi Anda dikunci setelah uang muka" },
  { n: 4, judul: "Berangkat", teks: "Manasik, dokumen, lalu terbang" },
];

export function RegistrationSteps() {
  return (
    <section className="bg-white">
      <div className="container-page py-12">
        <SectionHeading kicker="Alurnya sederhana" title="Dari chat pertama sampai berangkat" />
        <ol className="grid gap-6 sm:grid-cols-2 md:grid-cols-4">
          {LANGKAH.map((s) => (
            <li key={s.n} className="flex flex-col items-start gap-3.5">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-brand-primary text-base font-extrabold text-white">
                {s.n}
              </span>
              <div>
                <h3 className="font-heading text-base font-extrabold text-brand-ink">{s.judul}</h3>
                <p className="mt-[3px] text-sm text-brand-muted">{s.teks}</p>
              </div>
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
      <StarMark
        size={190}
        className="pointer-events-none absolute -top-[46px] -right-[46px] text-brand-accent opacity-20"
      />
      <div className="container-page relative flex flex-col items-center gap-5 py-14 text-center">
        <div className="inline-flex items-center gap-2">
          <StarMark size={18} className="text-brand-accent" />
          <span className="text-xs font-bold tracking-[0.1em] text-brand-accent uppercase">
            Masih ragu? Tanya dulu
          </span>
        </div>
        <h2 className="max-w-xl font-heading text-2xl font-extrabold text-white sm:text-[30px]">
          Ceritakan rencana Anda. Kami bantu hitung dari awal.
        </h2>
        <p className="max-w-md text-base leading-relaxed text-white/75">
          Tidak perlu langsung memutuskan. Chat saja dulu — tim kami membalas setiap hari pada
          jam kerja.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <WhatsAppCta ctaPosition="closing" size="lg">
            <MessageCircle className="size-4" aria-hidden />
            Chat via WhatsApp
          </WhatsAppCta>
          <Link href="/daftar" className={buttonVariants({ variant: "invert", size: "lg" })}>
            Isi Formulir Pendaftaran
          </Link>
        </div>
      </div>
    </section>
  );
}
