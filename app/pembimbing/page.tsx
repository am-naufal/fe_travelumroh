import type { Metadata } from "next";
import { BadgeCheck } from "lucide-react";
import { getPembimbing } from "@/lib/cms";
import { pageMetadata } from "@/lib/seo";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Figure } from "@/components/ui/media";
import { WhatsAppCta } from "@/components/layout/whatsapp-cta";

export const revalidate = 300;

export const metadata: Metadata = pageMetadata({
  title: "Pembimbing Ibadah & Muthawif Luhas",
  description:
    "Kenali pembimbing ibadah dan muthawif Luhas yang mendampingi jamaah selama umroh — berpengalaman, bersertifikat Kemenag, dan berbahasa Indonesia.",
  path: "/pembimbing",
});

export default async function PembimbingPage() {
  const pembimbing = await getPembimbing();

  return (
    <>
      <Breadcrumb items={[{ name: "Pembimbing", path: "/pembimbing" }]} />
      <div className="container-page py-8">
        <h1 className="font-heading text-2xl font-bold text-brand-ink sm:text-3xl">
          Pembimbing ibadah &amp; muthawif
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-brand-muted">
          Setiap rombongan didampingi pembimbing berbahasa Indonesia yang memandu manasik,
          ziarah, dan menjawab pertanyaan ibadah selama di Tanah Suci.
        </p>

        <div className="mt-8 space-y-8">
          {pembimbing.map((p) => (
            <article
              key={p.slug}
              className="grid gap-5 rounded-[var(--radius-card)] border border-brand-border bg-white p-5 sm:grid-cols-[180px_1fr] sm:p-6"
            >
              <Figure
                image={p.foto}
                sizes="180px"
                ratio="1/1"
                className="w-full max-w-[180px]"
              />
              <div>
                <h2 className="font-heading text-lg font-bold text-brand-ink">
                  {p.nama}
                  {p.gelar ? `, ${p.gelar}` : ""}
                </h2>
                <p className="text-sm font-medium text-brand-primary">{p.peran}</p>
                <p className="mt-2 text-sm text-brand-muted">{p.bio}</p>
                <p className="mt-2 text-xs text-brand-muted">
                  {p.pengalamanTahun} tahun pengalaman membimbing jamaah
                </p>
                {p.sertifikasi.length > 0 && (
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {p.sertifikasi.map((s) => (
                      <li
                        key={s}
                        className="inline-flex items-center gap-1 rounded-full bg-brand-success/10 px-2.5 py-1 text-xs text-brand-success"
                      >
                        <BadgeCheck className="size-3.5" aria-hidden />
                        {s}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 rounded-[var(--radius-card)] bg-brand-primary/5 p-6 text-center">
          <p className="font-heading text-lg font-bold text-brand-ink">
            Ingin tahu siapa pembimbing untuk keberangkatan Anda?
          </p>
          <WhatsAppCta ctaPosition="pembimbing-cta" className="mt-3">
            Tanya via WhatsApp
          </WhatsAppCta>
        </div>
      </div>
    </>
  );
}
