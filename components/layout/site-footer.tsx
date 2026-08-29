import Link from "next/link";
import type { PengaturanSitus } from "@/lib/cms/schema";
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
  { href: "/testimoni", label: "Testimoni" },
  { href: "/galeri", label: "Galeri" },
  { href: "/faq", label: "FAQ" },
  { href: "/kontak", label: "Kontak" },
];

export function SiteFooter({ settings }: { settings: PengaturanSitus }) {
  const { legalitas, kontak, sosial } = settings;
  return (
    <footer className="mt-16 border-t border-brand-border bg-white">
      <div className="container-page grid gap-10 py-12 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex size-9 items-center justify-center rounded-[10px] bg-brand-primary font-heading text-lg font-bold text-white">
              L
            </span>
            <span className="font-heading text-xl font-bold text-brand-ink">Luhas</span>
          </div>
          <p className="mt-3 text-sm text-brand-muted">{settings.deskripsiSingkat}</p>
          {/* PRD §6, §15: legalitas di footer */}
          <dl className="mt-4 space-y-1 text-xs text-brand-muted">
            <div>
              <dt className="inline font-medium text-brand-ink">SK PPIU Kemenag: </dt>
              <dd className="inline">
                <a
                  href={legalitas.urlVerifikasiKemenag}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-primary underline"
                >
                  {legalitas.skPpiu}
                </a>
              </dd>
            </div>
            <div>
              <dt className="inline font-medium text-brand-ink">NIB: </dt>
              <dd className="inline">{legalitas.nib}</dd>
            </div>
          </dl>
          <div className="mt-4 flex gap-3 text-brand-muted">
            {sosial.instagram && (
              <a href={sosial.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram Luhas" className="hover:text-brand-primary">
                <InstagramIcon />
              </a>
            )}
            {sosial.tiktok && (
              <a href={sosial.tiktok} target="_blank" rel="noopener noreferrer" aria-label="TikTok Luhas" className="hover:text-brand-primary">
                <TiktokIcon />
              </a>
            )}
            {sosial.youtube && (
              <a href={sosial.youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube Luhas" className="hover:text-brand-primary">
                <YoutubeIcon />
              </a>
            )}
            {sosial.facebook && (
              <a href={sosial.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook Luhas" className="hover:text-brand-primary">
                <FacebookIcon />
              </a>
            )}
          </div>
        </div>

        <nav aria-label="Paket & alat">
          <h2 className="font-heading text-sm font-bold text-brand-ink">Paket & Alat</h2>
          <ul className="mt-3 space-y-2 text-sm text-brand-muted">
            {KOL_PAKET.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-brand-primary">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Informasi">
          <h2 className="font-heading text-sm font-bold text-brand-ink">Informasi</h2>
          <ul className="mt-3 space-y-2 text-sm text-brand-muted">
            {KOL_INFO.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-brand-primary">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="font-heading text-sm font-bold text-brand-ink">Kontak</h2>
          <address className="mt-3 space-y-2 text-sm not-italic text-brand-muted">
            <p>
              {kontak.alamat.jalan}, {kontak.alamat.kota}, {kontak.alamat.provinsi}{" "}
              {kontak.alamat.kodePos}
            </p>
            <p>
              WhatsApp:{" "}
              <a href={`https://wa.me/${kontak.waUtama}`} className="text-brand-primary">
                +{kontak.waUtama}
              </a>
            </p>
            <p>
              Email:{" "}
              <a href={`mailto:${kontak.email}`} className="text-brand-primary">
                {kontak.email}
              </a>
            </p>
            <div>
              <p className="font-medium text-brand-ink">Jam operasional</p>
              {kontak.jamOperasional.map((j) => (
                <p key={j.hari}>
                  {j.hari}: {j.jam}
                </p>
              ))}
            </div>
          </address>
        </div>
      </div>

      <div className="border-t border-brand-border">
        <div className="container-page flex flex-col gap-2 py-5 text-xs text-brand-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {legalitas ? settings.namaLegal : "Luhas"}. Seluruh hak
            cipta dilindungi.
          </p>
          <nav aria-label="Kebijakan" className="flex gap-4">
            <Link href="/kebijakan-privasi" className="hover:text-brand-primary">
              Kebijakan Privasi
            </Link>
            <Link href="/syarat-ketentuan" className="hover:text-brand-primary">
              Syarat & Ketentuan
            </Link>
            <Link href="/sitemap.xml" className="hover:text-brand-primary">
              Sitemap
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
