import Link from "next/link";
import type { ComponentType } from "react";
import type { PengaturanSitus } from "@/lib/cms/schema";
import { StarMark } from "@/components/ui/star-mark";
import { MessageCircle } from "lucide-react";
import {
  InstagramIcon,
  TiktokIcon,
  YoutubeIcon,
  FacebookIcon,
} from "@/components/ui/social-icons";

const KOL_PAKET = [
  { href: "/paket", label: "Semua Paket" },
  { href: "/paket?kategori=hemat", label: "Umroh Hemat" },
  { href: "/paket?kategori=ramadhan", label: "Umroh Ramadhan" },
  { href: "/paket?kategori=plus-turki", label: "Umroh Plus Turki" },
  { href: "/simulasi-cicilan", label: "Simulasi Cicilan" },
  { href: "/paket/banding", label: "Banding Paket" },
];

const KOL_INFO = [
  { href: "/tentang", label: "Tentang Luhas" },
  { href: "/pembimbing", label: "Pembimbing Ibadah" },
  { href: "/panduan", label: "Panduan Umroh" },
  { href: "/testimoni", label: "Testimoni Jamaah" },
  { href: "/galeri", label: "Galeri" },
  { href: "/faq", label: "Pertanyaan Umum" },
  { href: "/kontak", label: "Kontak" },
];

const KOL_KEBIJAKAN = [
  { href: "/kebijakan-privasi", label: "Kebijakan Privasi" },
  { href: "/syarat-ketentuan", label: "Syarat & Ketentuan" },
  { href: "/sitemap.xml", label: "Sitemap" },
];

// Warna & susunan persis docs/design/*.html: footer gelap, kolom kicker emas
// huruf kecil-tracked, tautan putih 72% opacity.
export function SiteFooter({ settings }: { settings: PengaturanSitus }) {
  const { legalitas, kontak, sosial } = settings;
  const jamBuka = kontak.jamOperasional[0]?.jam;
  const sosialList = [
    sosial.instagram && { href: sosial.instagram, label: "Instagram Luhas", Icon: InstagramIcon },
    sosial.tiktok && { href: sosial.tiktok, label: "TikTok Luhas", Icon: TiktokIcon },
    sosial.youtube && { href: sosial.youtube, label: "YouTube Luhas", Icon: YoutubeIcon },
    sosial.facebook && { href: sosial.facebook, label: "Facebook Luhas", Icon: FacebookIcon },
  ].filter(Boolean) as { href: string; label: string; Icon: ComponentType }[];

  return (
    <footer className="bg-brand-ink">
      <div className="container-page pt-12 pb-8">
        <Link href="/" className="inline-flex items-center gap-[9px]" aria-label="Luhas — Beranda">
          <StarMark size={18} className="text-brand-accent" />
          <span className="font-heading text-2xl font-extrabold tracking-[-0.03em] text-white">
            Luhas
          </span>
          <span className="pt-1 text-[10px] font-bold uppercase tracking-[0.16em] text-brand-accent">
            Umroh
          </span>
        </Link>
        <p className="mt-3 max-w-md text-sm text-white/72">{settings.deskripsiSingkat}</p>

        <div className="mt-10 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <nav aria-label="Paket & alat">
            <h2 className="mb-3.5 text-[13px] font-bold tracking-[0.08em] text-brand-accent uppercase">
              Paket Umroh
            </h2>
            <ul className="space-y-2.5 text-sm text-white/72">
              {KOL_PAKET.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Informasi">
            <h2 className="mb-3.5 text-[13px] font-bold tracking-[0.08em] text-brand-accent uppercase">
              Informasi
            </h2>
            <ul className="space-y-2.5 text-sm text-white/72">
              {KOL_INFO.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Kebijakan">
            <h2 className="mb-3.5 text-[13px] font-bold tracking-[0.08em] text-brand-accent uppercase">
              Kebijakan
            </h2>
            <ul className="space-y-2.5 text-sm text-white/72">
              {KOL_KEBIJAKAN.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="mb-3.5 text-[13px] font-bold tracking-[0.08em] text-brand-accent uppercase">
              Hubungi Kami
            </h2>
            <a
              href={`https://wa.me/${kontak.waUtama}`}
              className="mb-2 flex items-center gap-2 text-[15px] font-bold text-white"
            >
              <MessageCircle className="size-[18px] text-[#25D366]" aria-hidden />+{kontak.waUtama}
            </a>
            <address className="not-italic text-sm text-white/72">
              <p className="mb-1.5">
                {kontak.alamat.jalan}, {kontak.alamat.kota}
              </p>
              {jamBuka && <p>{jamBuka}</p>}
            </address>
            {sosialList.length > 0 && (
              <div className="mt-4 flex gap-2.5">
                {sosialList.map(({ href, label, Icon }) => (
                  <a
                    key={href}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="flex size-10 items-center justify-center rounded-[10px] border border-white/22 text-white hover:bg-white/10"
                  >
                    <Icon />
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="mt-8 h-px bg-white/12" />

        <div className="mt-5 flex flex-wrap items-center justify-between gap-2 text-[13px] text-white/55">
          <p>
            © {new Date().getFullYear()} {legalitas ? settings.namaLegal : "Luhas"} · Berizin resmi
            Kemenag ·{" "}
            <a
              href={legalitas.urlVerifikasiKemenag}
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-white/30 underline-offset-2 hover:text-white"
            >
              {legalitas.skPpiu}
            </a>
          </p>
          <p>luhas.co.id</p>
        </div>
      </div>
    </footer>
  );
}
