import type { Metadata } from "next";
import Link from "next/link";
import { Check, ChevronRight, BookOpen, Calculator, HelpCircle } from "lucide-react";
import { getPackage, getSettings } from "@/lib/cms";
import { pageMetadata } from "@/lib/seo";
import { StarMark } from "@/components/ui/star-mark";
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

const SAMBIL_MENUNGGU = [
  {
    href: "/simulasi-cicilan",
    Icon: Calculator,
    title: "Hitung simulasi cicilan",
    subtitle: "Sesuaikan dengan kemampuan Anda",
  },
  {
    href: "/panduan",
    Icon: BookOpen,
    title: "Panduan persiapan umroh",
    subtitle: "Dokumen, biaya, dan tips perjalanan",
  },
  {
    href: "/faq",
    Icon: HelpCircle,
    title: "Pertanyaan yang sering diajukan",
    subtitle: "Jawaban cepat sebelum Anda bertanya",
  },
] as const;

export default async function TerimaKasihPage({ searchParams }: PageProps<"/terima-kasih">) {
  const sp = await searchParams;
  const paketSlug = typeof sp.paket === "string" ? sp.paket : undefined;
  const nama = typeof sp.nama === "string" ? sp.nama : undefined;
  const [paket, settings] = await Promise.all([
    paketSlug ? getPackage(paketSlug) : Promise.resolve(null),
    getSettings(),
  ]);
  const slaMenit = settings.kontak.slaBalasMenit;

  const timeline = [
    { label: "Sekarang", text: "Pesan Anda sudah masuk ke tim kami", done: true },
    {
      label: `Dalam ${slaMenit} menit`,
      text: "Tim kami membalas lewat WhatsApp (pada jam kerja)",
      done: false,
    },
    {
      label: "Setelah itu",
      text: "Kami bantu hitung skema pembayaran yang pas untuk Anda",
      done: false,
    },
  ];

  return (
    <div className="flex flex-col items-center px-4 py-16 text-center sm:px-6">
      <span className="flex size-[84px] items-center justify-center rounded-full bg-success-bg">
        <Check className="size-9 text-success-text" strokeWidth={2.2} aria-hidden />
      </span>
      <h1 className="mt-[18px] font-heading text-[28px] font-extrabold text-brand-ink sm:text-[32px]">
        Terima kasih, pesan Anda sudah masuk.
      </h1>
      <p className="mt-3 max-w-[520px] text-[15px] leading-relaxed text-brand-muted sm:text-base">
        {nama ? `Terima kasih, ${nama}. ` : ""}
        Tim kami akan menghubungi Anda lewat WhatsApp di nomor yang Anda isi
        {paket ? ` untuk membahas paket ${paket.nama}` : ""}. Kalau ingin lebih cepat, Anda bisa
        langsung memulai percakapan sekarang.
      </p>

      <ThankYouActions nama={nama} paketNama={paket?.nama} paketSlug={paketSlug} />

      <div className="mt-8 w-full max-w-[460px] rounded-[var(--radius-card)] border border-brand-border bg-white p-6 text-left">
        {timeline.map((step, i) => (
          <div key={step.label} className="flex items-start gap-3.5">
            <div className="flex flex-col items-center">
              <span
                className={cnDot(step.done)}
                aria-hidden
              />
              {i < timeline.length - 1 && (
                <span className="min-h-[34px] w-0.5 flex-1 bg-brand-border" aria-hidden />
              )}
            </div>
            <div className={i < timeline.length - 1 ? "pb-[22px]" : ""}>
              <p className="text-[12.5px] font-bold tracking-[0.06em] text-tint-gold-text uppercase">
                {step.label}
              </p>
              <p className="mt-0.5 text-[15.5px] leading-relaxed text-brand-muted-2">{step.text}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-14 w-full max-w-4xl">
        <div className="mb-6 inline-flex items-center gap-[7px]">
          <StarMark size={14} className="text-brand-accent" />
          <span className="text-xs font-bold tracking-[0.1em] text-tint-gold-text uppercase">
            Sambil menunggu
          </span>
        </div>
        <h2 className="mb-5 font-heading text-2xl font-extrabold text-brand-ink sm:text-[30px]">
          Mungkin ini membantu
        </h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {SAMBIL_MENUNGGU.map(({ href, Icon, title, subtitle }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-3.5 rounded-[var(--radius-card)] border border-brand-border bg-white p-5 text-left transition-colors hover:border-brand-primary"
            >
              <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-tint-blue-bg">
                <Icon className="size-5 text-brand-primary" aria-hidden />
              </span>
              <span className="flex-1">
                <span className="block text-[15.5px] font-bold text-brand-ink">{title}</span>
                <span className="mt-0.5 block text-[13.5px] text-brand-muted">{subtitle}</span>
              </span>
              <ChevronRight className="size-[18px] shrink-0 text-brand-muted" aria-hidden />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

function cnDot(done: boolean) {
  return `size-3 shrink-0 rounded-full ${done ? "bg-brand-primary" : "bg-[#BFD7F2]"}`;
}
