import type { Metadata } from "next";
import { getActivePackages, getFeaturedPackages, getArticles, getVideoTestimonials, getFeaturedFaq, getSettings } from "@/lib/cms";
import { toPackageView, keberangkatanTerdekat } from "@/lib/package-view";
import { aggregateRating } from "@/lib/cms/testimonials";
import { pageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/seo/json-ld";
import { travelAgencyLd } from "@/lib/jsonld";
import { Hero } from "@/components/sections/hero";
import { TrustBar } from "@/components/sections/trust-bar";
import { FeaturedPackages } from "@/components/sections/featured-packages";
import { WhyLuhas, RegistrationSteps, ClosingCta } from "@/components/sections/home-blocks";
import { MiniCalculator } from "@/components/sections/mini-calculator";
import { VideoTestimonials } from "@/components/sections/video-testimonials";
import { SocialFeed } from "@/components/sections/social-feed";
import { LatestArticles } from "@/components/sections/latest-articles";
import { FaqPreview } from "@/components/sections/faq-preview";

// PRD §10.2 — SSG + ISR 300 detik
export const revalidate = 300;

export const metadata: Metadata = pageMetadata({
  title: "Umroh Resmi, Harga Transparan & Bisa Dicicil",
  description:
    "Umroh tanpa drama biaya. Travel umroh berizin resmi Kemenag untuk muslim muda — harga lengkap dari awal, hotel dekat, tim yang membalas chat.",
  path: "/",
});

export default async function HomePage() {
  const [featured, active, articles, videos, faq, settings, rating] = await Promise.all([
    getFeaturedPackages(4),
    getActivePackages(),
    getArticles(),
    getVideoTestimonials(),
    getFeaturedFaq(5),
    getSettings(),
    aggregateRating(),
  ]);

  const heroHarga = Math.min(...active.map((p) => p.hargaMulai));
  const heroTanggalTerdekat = active
    .map((p) => keberangkatanTerdekat(p)?.tanggal)
    .filter((t): t is string => Boolean(t))
    .sort()[0];
  const calcOptions = active.map((p) => {
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

      <Hero
        hargaMulai={heroHarga}
        tanggalTerdekat={heroTanggalTerdekat}
        gambar={{
          src: "/images/hero-jamaah.jpg",
          alt: "Jamaah Luhas berdoa bersama menghadap Ka'bah saat matahari terbit",
          width: 1200,
          height: 900,
        }}
      />
      <TrustBar settings={settings} />
      <FeaturedPackages pakets={featured.map(toPackageView)} />
      <WhyLuhas />
      <MiniCalculator pakets={calcOptions} />
      <VideoTestimonials testimoni={videos} />
      <SocialFeed />
      <RegistrationSteps />
      <LatestArticles artikel={articles} />
      <FaqPreview items={faq} />
      <ClosingCta />
    </>
  );
}
