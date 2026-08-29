import type { Metadata } from "next";
import { getTestimonials, getPackages } from "@/lib/cms";
import { pageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/seo/json-ld";
import { videoLd } from "@/lib/jsonld";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { TestimonialCard } from "@/components/testimonial/testimonial-card";
import { VideoTestimonialCard } from "@/components/testimonial/video-testimonial-card";

export const revalidate = 300;

export const metadata: Metadata = pageMetadata({
  title: "Testimoni Jamaah Umroh Luhas",
  description:
    "Cerita nyata jamaah yang sudah berangkat umroh bersama Luhas — lengkap dengan nama, kota, paket, dan video. Semua atas izin jamaah.",
  path: "/testimoni",
});

function isoDuration(sec?: number) {
  if (!sec) return undefined;
  return `PT${Math.floor(sec / 60)}M${sec % 60}S`;
}

export default async function TestimoniPage() {
  const [testimoni, pakets] = await Promise.all([getTestimonials(), getPackages()]);
  const namaPaket = (slug?: string) => pakets.find((p) => p.slug === slug)?.nama;

  const videos = testimoni.filter((t) => t.video);
  const teks = testimoni;

  return (
    <>
      {videos.map((t) => (
        <JsonLd
          key={t.slug}
          data={videoLd({
            judul: `Testimoni umroh ${t.nama}`,
            deskripsi: t.video!.transkrip ?? t.kutipan,
            thumbnail: t.video!.poster.src,
            tanggalUnggah: `${t.tahun}-01-01`,
            durasiISO: isoDuration(t.video!.durasiDetik),
            contentUrl: t.video!.src,
          })}
        />
      ))}
      <Breadcrumb items={[{ name: "Testimoni", path: "/testimoni" }]} />

      <div className="container-page py-8">
        <h1 className="font-heading text-2xl font-bold text-brand-ink sm:text-3xl">
          Testimoni jamaah
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-brand-muted">
          Semua testimoni di halaman ini ditayangkan atas izin jamaah yang bersangkutan.
        </p>

        {videos.length > 0 && (
          <section className="mt-8">
            <h2 className="font-heading text-lg font-bold text-brand-ink">Video</h2>
            <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {videos.map((t) => (
                <VideoTestimonialCard key={t.slug} testimoni={t} />
              ))}
            </div>
          </section>
        )}

        <section className="mt-10">
          <h2 className="font-heading text-lg font-bold text-brand-ink">Semua cerita</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {teks.map((t) => (
              <TestimonialCard key={t.slug} testimoni={t} paketNama={namaPaket(t.paketSlug)} />
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
