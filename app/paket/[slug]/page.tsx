import { notFound } from "next/navigation";
import Link from "next/link";
import {
  Plane,
  MapPin,
  BedDouble,
  CalendarDays,
  Check,
  X,
  FileText,
  UserRound,
  Clock,
} from "lucide-react";
import {
  getPackage,
  getPackageSlugs,
  getRelatedPackages,
  getPembimbingBySlug,
  getSettings,
} from "@/lib/cms";
import { getTestimonialsForPackage, aggregateRating } from "@/lib/cms/testimonials";
import { toPackageView, keberangkatanTerdekat } from "@/lib/package-view";
import {
  formatRupiah,
  formatTanggal,
  formatTanggalShort,
  formatJarak,
  daysUntil,
} from "@/lib/format";
import { pageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/seo/json-ld";
import { productLd, breadcrumbLd } from "@/lib/jsonld";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Badge, PackageBadge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { WhatsAppCta } from "@/components/layout/whatsapp-cta";
import { PackageGallery } from "@/components/package/package-gallery";
import { Itinerary } from "@/components/package/itinerary";
import { StickyMobileCta } from "@/components/package/sticky-mobile-cta";
import { BrochureButton } from "@/components/package/brochure-button";
import { ViewPackageTracker } from "@/components/package/view-tracker";
import { InstallmentCalculator } from "@/components/forms/installment-calculator";
import { PackageCard } from "@/components/package/package-card";
import { TestimonialCard } from "@/components/testimonial/testimonial-card";

export const revalidate = 300;
export const dynamicParams = true;

export async function generateStaticParams() {
  return (await getPackageSlugs()).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/paket/[slug]">) {
  const { slug } = await params;
  const paket = await getPackage(slug);
  if (!paket) return {};
  return pageMetadata({
    title: paket.seo.title,
    description: paket.seo.description,
    path: `/paket/${paket.slug}`,
    ogImage: `/paket/${paket.slug}/opengraph-image`,
    noIndex: !paket.aktif,
  });
}

const SectionTitle = ({ children, id }: { children: React.ReactNode; id?: string }) => (
  <h2 id={id} className="mb-4 font-heading text-xl font-bold text-brand-ink sm:text-2xl">
    {children}
  </h2>
);

export default async function PaketDetailPage({ params }: PageProps<"/paket/[slug]">) {
  const { slug } = await params;
  const paket = await getPackage(slug);
  if (!paket) notFound();

  const [related, pembimbing, testimoni, settings, rating] = await Promise.all([
    getRelatedPackages(slug),
    paket.pembimbingSlug ? getPembimbingBySlug(paket.pembimbingSlug) : Promise.resolve(null),
    getTestimonialsForPackage(slug),
    getSettings(),
    aggregateRating(),
  ]);

  const view = toPackageView(paket);
  const terdekat = keberangkatanTerdekat(paket);
  const waTanggal = terdekat ? formatTanggalShort(terdekat.tanggal) : "";

  return (
    <>
      <JsonLd data={productLd(paket, { rating })} />
      <JsonLd
        data={breadcrumbLd([
          { name: "Beranda", path: "/" },
          { name: "Paket", path: "/paket" },
          { name: paket.nama, path: `/paket/${paket.slug}` },
        ])}
      />
      <ViewPackageTracker slug={paket.slug} price={paket.hargaMulai} category={paket.kategori} />

      <Breadcrumb items={[{ name: "Paket", path: "/paket" }, { name: paket.nama, path: `/paket/${paket.slug}` }]} />

      {/* 1. Header */}
      <section id="detail-hero" className="container-page pb-6 pt-2">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="info">{paket.kategori.replace("-", " ")}</Badge>
          {view.badge && <PackageBadge value={view.badge} />}
          {!paket.aktif && (
            <Badge variant="neutral">Tidak tersedia — keberangkatan telah selesai</Badge>
          )}
        </div>
        <h1 className="mt-2 font-heading text-2xl font-bold text-brand-ink sm:text-3xl md:text-4xl">
          {paket.nama}
        </h1>
        <p className="mt-2 max-w-2xl text-brand-muted">{paket.ringkasan}</p>
        <p className="mt-2 flex items-center gap-1.5 text-xs text-brand-muted">
          <Clock className="size-3.5" aria-hidden />
          Diperbarui {formatTanggal(paket.diperbaruiPada)}
        </p>

        <div className="mt-5 grid gap-6 lg:grid-cols-[1.6fr_1fr]">
          <PackageGallery images={paket.galeri} nama={paket.nama} />

          {/* Kartu harga + CTA ganda */}
          <div className="rounded-[var(--radius-card)] border border-brand-border bg-white p-5">
            <p className="text-sm text-brand-muted">Harga per orang</p>
            <table className="mt-2 w-full text-sm">
              <tbody>
                {(
                  [
                    ["Quad (4 orang / kamar)", paket.hargaPerKamar.quad],
                    ["Triple (3 orang / kamar)", paket.hargaPerKamar.triple],
                    ["Double (2 orang / kamar)", paket.hargaPerKamar.double],
                  ] as const
                ).map(([label, harga]) => (
                  <tr key={label} className="border-b border-brand-border last:border-0">
                    <th scope="row" className="py-2 text-left font-normal text-brand-muted">
                      {label}
                    </th>
                    <td className="py-2 text-right font-heading font-bold text-brand-ink">
                      {formatRupiah(harga)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {terdekat && (
              <p className="mt-3 flex items-center gap-1.5 text-sm text-brand-ink">
                <CalendarDays className="size-4 text-brand-primary" aria-hidden />
                Berangkat terdekat {formatTanggal(terdekat.tanggal)}
                {daysUntil(terdekat.tanggal) >= 0 && (
                  <span className="text-brand-muted">({daysUntil(terdekat.tanggal)} hari lagi)</span>
                )}
              </p>
            )}
            {terdekat && terdekat.sisaSeat > 0 && (
              <p
                className={
                  terdekat.sisaSeat <= 6
                    ? "mt-1 text-sm font-medium text-brand-danger"
                    : "mt-1 text-sm text-brand-muted"
                }
              >
                {terdekat.sisaSeat <= 6
                  ? `Sisa ${terdekat.sisaSeat} seat untuk tanggal ini`
                  : `${terdekat.sisaSeat} seat tersedia`}
              </p>
            )}

            <div className="mt-4 flex flex-col gap-2">
              {paket.aktif ? (
                <>
                  <WhatsAppCta
                    kind="package"
                    namaPaket={paket.nama}
                    tanggal={waTanggal}
                    packageSlug={paket.slug}
                    ctaPosition="detail-header"
                    className="w-full"
                  >
                    Chat Sekarang
                  </WhatsAppCta>
                  <Button asChild variant="secondary" className="w-full">
                    <Link href={`/daftar?paket=${paket.slug}`}>Daftar Minat</Link>
                  </Button>
                </>
              ) : (
                <Button asChild className="w-full">
                  <Link href="/paket">Lihat paket yang tersedia</Link>
                </Button>
              )}
              {paket.brosurPdf && (
                <BrochureButton href={paket.brosurPdf} slug={paket.slug} className="w-full justify-center" />
              )}
            </div>
          </div>
        </div>
      </section>

      <div className="container-page grid gap-10 pb-16 lg:grid-cols-[1fr_320px]">
        <div className="min-w-0 space-y-12">
          {/* 3. Ringkasan cepat */}
          <section>
            <SectionTitle>Ringkasan cepat</SectionTitle>
            <dl className="grid grid-cols-2 gap-4 rounded-[var(--radius-card)] border border-brand-border bg-white p-5 text-sm sm:grid-cols-3">
              <div>
                <dt className="flex items-center gap-1.5 text-brand-muted">
                  <CalendarDays className="size-4" aria-hidden /> Durasi
                </dt>
                <dd className="mt-1 font-semibold text-brand-ink">{paket.durasiHari} hari</dd>
              </div>
              <div>
                <dt className="flex items-center gap-1.5 text-brand-muted">
                  <MapPin className="size-4" aria-hidden /> Kota berangkat
                </dt>
                <dd className="mt-1 font-semibold text-brand-ink">
                  {paket.kotaKeberangkatan.join(", ")}
                </dd>
              </div>
              <div>
                <dt className="flex items-center gap-1.5 text-brand-muted">
                  <Plane className="size-4" aria-hidden /> Maskapai
                </dt>
                <dd className="mt-1 font-semibold text-brand-ink">
                  {paket.maskapai.nama} {paket.maskapai.transit ? "(transit)" : "(langsung)"}
                </dd>
              </div>
              <div>
                <dt className="flex items-center gap-1.5 text-brand-muted">
                  <BedDouble className="size-4" aria-hidden /> Hotel Makkah
                </dt>
                <dd className="mt-1 font-semibold text-brand-ink">
                  {paket.hotelMakkah.nama} ★{paket.hotelMakkah.bintang}
                  <span className="block font-normal text-brand-muted">
                    {formatJarak(paket.hotelMakkah.jarakMeter)} dari Masjidil Haram
                  </span>
                </dd>
              </div>
              <div>
                <dt className="flex items-center gap-1.5 text-brand-muted">
                  <BedDouble className="size-4" aria-hidden /> Hotel Madinah
                </dt>
                <dd className="mt-1 font-semibold text-brand-ink">
                  {paket.hotelMadinah.nama} ★{paket.hotelMadinah.bintang}
                  <span className="block font-normal text-brand-muted">
                    {formatJarak(paket.hotelMadinah.jarakMeter)} dari Masjid Nabawi
                  </span>
                </dd>
              </div>
              {pembimbing && (
                <div>
                  <dt className="flex items-center gap-1.5 text-brand-muted">
                    <UserRound className="size-4" aria-hidden /> Pembimbing
                  </dt>
                  <dd className="mt-1 font-semibold text-brand-ink">
                    <Link href="/pembimbing" className="hover:text-brand-primary hover:underline">
                      {pembimbing.nama}
                      {pembimbing.gelar ? `, ${pembimbing.gelar}` : ""}
                    </Link>
                  </dd>
                </div>
              )}
            </dl>
          </section>

          {/* 4. Simulasi cicilan khusus paket ini */}
          <section>
            <SectionTitle id="cicilan">Simulasi cicilan untuk paket ini</SectionTitle>
            <InstallmentCalculator
              variant="inline"
              lockedPaket={{
                slug: paket.slug,
                nama: paket.nama,
                harga: paket.hargaMulai,
                dpMinimum: paket.dpMinimum,
                tenor: paket.tenorCicilan,
                tanggalTerdekat: terdekat?.tanggal ?? null,
              }}
            />
          </section>

          {/* 5. Itinerary harian */}
          <section>
            <SectionTitle id="itinerary">Itinerary harian</SectionTitle>
            <Itinerary items={paket.itinerary} />
          </section>

          {/* 6. Fasilitas termasuk / tidak termasuk */}
          <section>
            <SectionTitle id="fasilitas">Fasilitas</SectionTitle>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-[var(--radius-card)] border border-brand-success/30 bg-brand-success/5 p-4">
                <h3 className="font-heading text-sm font-bold text-brand-ink">Sudah termasuk</h3>
                <ul className="mt-2 space-y-1.5 text-sm text-brand-ink">
                  {paket.termasuk.map((t) => (
                    <li key={t} className="flex gap-2">
                      <Check className="mt-0.5 size-4 shrink-0 text-brand-success" aria-hidden />
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-[var(--radius-card)] border border-brand-border bg-white p-4">
                <h3 className="font-heading text-sm font-bold text-brand-ink">Belum termasuk</h3>
                <ul className="mt-2 space-y-1.5 text-sm text-brand-muted">
                  {paket.tidakTermasuk.map((t) => (
                    <li key={t} className="flex gap-2">
                      <X className="mt-0.5 size-4 shrink-0 text-brand-danger" aria-hidden />
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* 7. Syarat & dokumen */}
          <section>
            <SectionTitle id="dokumen">Syarat &amp; dokumen yang disiapkan</SectionTitle>
            <ul className="grid gap-2 rounded-[var(--radius-card)] border border-brand-border bg-white p-5 text-sm sm:grid-cols-2">
              {paket.syaratDokumen.map((d) => (
                <li key={d} className="flex gap-2">
                  <FileText className="mt-0.5 size-4 shrink-0 text-brand-primary" aria-hidden />
                  {d}
                </li>
              ))}
            </ul>
          </section>

          {/* 8. Kebijakan pembayaran & pembatalan */}
          <section>
            <SectionTitle id="kebijakan">Kebijakan pembayaran &amp; pembatalan</SectionTitle>
            <p className="rounded-[var(--radius-card)] border border-brand-border bg-white p-5 text-sm leading-relaxed text-brand-ink">
              {paket.kebijakanPembayaran}
            </p>
          </section>

          {/* 9. Testimoni jamaah paket serupa */}
          {testimoni.length > 0 && (
            <section>
              <SectionTitle>Cerita jamaah paket serupa</SectionTitle>
              <div className="grid gap-4 sm:grid-cols-2">
                {testimoni.map((t) => (
                  <TestimonialCard key={t.slug} testimoni={t} />
                ))}
              </div>
            </section>
          )}

          {/* 10. Paket lain yang mirip */}
          {related.length > 0 && (
            <section>
              <SectionTitle>Paket lain yang mirip</SectionTitle>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {related.map((p) => (
                  <PackageCard key={p.slug} paket={toPackageView(p)} showCompare={false} />
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Sidebar desktop */}
        <aside className="hidden lg:block">
          <div className="sticky top-24 space-y-4">
            <div className="rounded-[var(--radius-card)] border border-brand-border bg-white p-4">
              <p className="text-xs text-brand-muted">mulai</p>
              <p className="font-heading text-2xl font-bold text-brand-ink">
                {formatRupiah(paket.hargaMulai)}
              </p>
              <p className="text-xs text-brand-muted">per orang (quad)</p>
              {paket.aktif && (
                <div className="mt-3 flex flex-col gap-2">
                  <WhatsAppCta
                    kind="package"
                    namaPaket={paket.nama}
                    tanggal={waTanggal}
                    packageSlug={paket.slug}
                    ctaPosition="detail-sidebar"
                    className="w-full"
                  >
                    Chat Sekarang
                  </WhatsAppCta>
                  <Button asChild variant="secondary" className="w-full">
                    <Link href={`/daftar?paket=${paket.slug}`}>Daftar Minat</Link>
                  </Button>
                </div>
              )}
            </div>
            <nav aria-label="Bagian halaman" className="rounded-[var(--radius-card)] border border-brand-border bg-white p-4 text-sm">
              <p className="mb-2 font-semibold text-brand-ink">Di halaman ini</p>
              <ul className="space-y-1.5 text-brand-muted">
                <li><a href="#cicilan" className="hover:text-brand-primary">Simulasi cicilan</a></li>
                <li><a href="#itinerary" className="hover:text-brand-primary">Itinerary harian</a></li>
                <li><a href="#fasilitas" className="hover:text-brand-primary">Fasilitas</a></li>
                <li><a href="#dokumen" className="hover:text-brand-primary">Syarat &amp; dokumen</a></li>
                <li><a href="#kebijakan" className="hover:text-brand-primary">Kebijakan pembayaran</a></li>
              </ul>
            </nav>
          </div>
        </aside>
      </div>

      {paket.aktif && (
        <StickyMobileCta
          nama={paket.nama}
          slug={paket.slug}
          harga={paket.hargaMulai}
          tanggalTerdekat={terdekat?.tanggal ?? null}
        />
      )}
    </>
  );
}
