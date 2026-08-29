import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck, FileCheck2, Building2, Users } from "lucide-react";
import { getSettings, getPembimbing } from "@/lib/cms";
import { aggregateRating } from "@/lib/cms/testimonials";
import { pageMetadata } from "@/lib/seo";
import { pluralJamaah } from "@/lib/format";
import { JsonLd } from "@/components/seo/json-ld";
import { travelAgencyLd } from "@/lib/jsonld";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Figure, AvatarFigure } from "@/components/ui/media";
import { WhatsAppCta } from "@/components/layout/whatsapp-cta";

export const revalidate = 300;

export const metadata: Metadata = pageMetadata({
  title: "Tentang Luhas — Travel Umroh Resmi Berizin Kemenag",
  description:
    "Luhas adalah biro perjalanan umroh berizin PPIU Kemenag sejak 2015. Kenali legalitas, tim, dan pembimbing ibadah kami.",
  path: "/tentang",
});

export default async function TentangPage() {
  const [settings, pembimbing, rating] = await Promise.all([
    getSettings(),
    getPembimbing(),
    aggregateRating(),
  ]);
  const tahunOperasi = new Date().getFullYear() - settings.tahunBerdiri;

  return (
    <>
      <JsonLd
        data={travelAgencyLd({
          nama: settings.namaLegal,
          deskripsi: settings.deskripsiSingkat,
          telepon: `+${settings.kontak.waUtama}`,
          alamat: settings.kontak.alamat,
          skPpiu: settings.legalitas.skPpiu,
          rating: { nilai: rating.nilai || settings.ratingGoogle.nilai, jumlah: rating.jumlah || settings.ratingGoogle.jumlah },
          sosial: Object.values(settings.sosial).filter(Boolean) as string[],
        })}
      />
      <Breadcrumb items={[{ name: "Tentang", path: "/tentang" }]} />

      <section className="container-page py-8">
        <h1 className="font-heading text-2xl font-bold text-brand-ink sm:text-3xl md:text-4xl">
          Kami membuat umroh terasa mungkin — dan jujur
        </h1>
        <div className="mt-4 grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-start">
          <div className="prose-luhas max-w-none text-brand-ink">
            <p>
              Luhas berdiri pada {settings.tahunBerdiri} dari satu keresahan sederhana: terlalu
              banyak calon jamaah muda mengurungkan niat karena harga yang tidak jelas dan proses
              yang menakutkan. Kami memulai dengan satu prinsip yang tidak pernah kami langgar —
              tampilkan semua biaya sejak awal, dan balas setiap pertanyaan seperti manusia.
            </p>
            <p>
              Selama {tahunOperasi} tahun, kami telah memberangkatkan {pluralJamaah(settings.jumlahJamaah)}.
              Sekitar {settings.jamaahPerTahun.toLocaleString("id-ID")} jamaah setiap tahun
              mempercayakan perjalanan ibadahnya kepada kami, banyak di antaranya kembali untuk
              memberangkatkan orang tua dan keluarganya.
            </p>
            <h2>Visi kami</h2>
            <p>
              Menjadi biro umroh yang paling dipercaya generasi muda muslim Indonesia — bukan
              karena paling murah, tetapi karena paling terbuka: harga, jadwal, jarak hotel, dan
              risiko, semuanya kami sampaikan apa adanya.
            </p>
          </div>

          <div className="overflow-hidden rounded-[var(--radius-card)]">
            <Figure
              image={{
                src: "/images/kantor/kantor-luhas.jpg",
                alt: `Kantor Luhas di ${settings.kontak.alamat.kota}, ruang konsultasi dengan jamaah`,
                width: 1000,
                height: 1200,
              }}
              sizes="(max-width: 1024px) 100vw, 380px"
              ratio="4/5"
            />
          </div>
        </div>
      </section>

      {/* Legalitas — PRD §7.6 */}
      <section className="bg-white">
        <div className="container-page py-10">
          <h2 className="font-heading text-xl font-bold text-brand-ink sm:text-2xl">
            Legalitas &amp; perizinan
          </h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <a
              href={settings.legalitas.urlVerifikasiKemenag}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-[var(--radius-card)] border border-brand-border bg-brand-bg p-5"
            >
              <ShieldCheck className="size-6 text-brand-success" aria-hidden />
              <p className="mt-2 font-semibold text-brand-ink">{settings.legalitas.skPpiu}</p>
              <p className="mt-1 text-xs text-brand-primary underline">Verifikasi di situs Kemenag</p>
            </a>
            <div className="rounded-[var(--radius-card)] border border-brand-border bg-brand-bg p-5">
              <FileCheck2 className="size-6 text-brand-primary" aria-hidden />
              <p className="mt-2 font-semibold text-brand-ink">NIB</p>
              <p className="mt-1 text-sm text-brand-muted">{settings.legalitas.nib}</p>
            </div>
            <div className="rounded-[var(--radius-card)] border border-brand-border bg-brand-bg p-5">
              <Building2 className="size-6 text-brand-primary" aria-hidden />
              <p className="mt-2 font-semibold text-brand-ink">Badan hukum</p>
              <p className="mt-1 text-sm text-brand-muted">
                {settings.namaLegal} · {settings.legalitas.akta}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tim pembimbing — PRD §7.6 */}
      <section className="container-page py-10">
        <div className="flex items-end justify-between">
          <h2 className="font-heading text-xl font-bold text-brand-ink sm:text-2xl">
            Pembimbing ibadah kami
          </h2>
          <Link href="/pembimbing" className="text-sm font-semibold text-brand-primary hover:underline">
            Profil lengkap
          </Link>
        </div>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {pembimbing.map((p) => (
            <div key={p.slug} className="flex gap-3 rounded-[var(--radius-card)] border border-brand-border bg-white p-4">
              <AvatarFigure image={p.foto} size={56} />
              <div>
                <p className="font-semibold text-brand-ink">
                  {p.nama}
                  {p.gelar ? `, ${p.gelar}` : ""}
                </p>
                <p className="text-xs text-brand-muted">{p.peran}</p>
                <p className="mt-1 text-xs text-brand-muted">{p.pengalamanTahun} tahun pengalaman</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-brand-primary text-white">
        <div className="container-page flex flex-col items-center gap-4 py-12 text-center">
          <Users className="size-8" aria-hidden />
          <h2 className="font-heading text-xl font-bold sm:text-2xl">
            Punya pertanyaan tentang legalitas atau rekam jejak kami?
          </h2>
          <WhatsAppCta ctaPosition="tentang-cta" variant="accent">
            Tanya tim kami
          </WhatsAppCta>
        </div>
      </section>
    </>
  );
}
