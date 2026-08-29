import type { Metadata } from "next";
import { Mail, Phone, Clock, MessageCircle } from "lucide-react";
import { getSettings } from "@/lib/cms";
import { pageMetadata } from "@/lib/seo";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { LazyMap } from "@/components/layout/lazy-map";
import { ContactForm } from "@/components/forms/contact-form";
import { WhatsAppCta } from "@/components/layout/whatsapp-cta";

export const revalidate = 300;

export const metadata: Metadata = pageMetadata({
  title: "Kontak Luhas — WhatsApp, Alamat & Jam Operasional",
  description:
    "Hubungi Luhas: WhatsApp per divisi (umum, grup, cicilan), alamat kantor di Jakarta Selatan, email, dan jam operasional.",
  path: "/kontak",
});

export default async function KontakPage() {
  const settings = await getSettings();
  const { kontak } = settings;
  const alamatLengkap = `${kontak.alamat.jalan}, ${kontak.alamat.kota}, ${kontak.alamat.provinsi} ${kontak.alamat.kodePos}`;

  return (
    <>
      <Breadcrumb items={[{ name: "Kontak", path: "/kontak" }]} />
      <div className="container-page grid gap-10 py-8 lg:grid-cols-2">
        <div>
          <h1 className="font-heading text-2xl font-bold text-brand-ink sm:text-3xl">Kontak</h1>
          <p className="mt-2 text-sm text-brand-muted">
            Cara tercepat menghubungi kami adalah WhatsApp. Pilih divisi yang sesuai.
          </p>

          {/* WA per divisi — PRD §7.10 */}
          <div className="mt-5 space-y-3">
            {kontak.waDivisi.map((d) => (
              <div
                key={d.divisi}
                className="flex items-center justify-between gap-3 rounded-[var(--radius-card)] border border-brand-border bg-white p-4"
              >
                <div>
                  <p className="font-semibold text-brand-ink">{d.divisi}</p>
                  <p className="text-xs text-brand-muted">+{d.nomor}</p>
                </div>
                <WhatsAppCta kind="divisi" divisi={d.divisi} ctaPosition={`kontak-${d.divisi}`} size="sm">
                  <MessageCircle className="size-4" aria-hidden />
                  Chat
                </WhatsAppCta>
              </div>
            ))}
          </div>

          <dl className="mt-6 space-y-3 text-sm">
            <div className="flex gap-2">
              <Phone className="size-4 shrink-0 text-brand-primary" aria-hidden />
              <dd>{kontak.telepon}</dd>
            </div>
            <div className="flex gap-2">
              <Mail className="size-4 shrink-0 text-brand-primary" aria-hidden />
              <dd>
                <a href={`mailto:${kontak.email}`} className="text-brand-primary underline">
                  {kontak.email}
                </a>
              </dd>
            </div>
            <div className="flex gap-2">
              <Clock className="mt-0.5 size-4 shrink-0 text-brand-primary" aria-hidden />
              <dd>
                {kontak.jamOperasional.map((j) => (
                  <div key={j.hari}>
                    <span className="font-medium text-brand-ink">{j.hari}:</span> {j.jam}
                  </div>
                ))}
              </dd>
            </div>
          </dl>

          <address className="mt-6 rounded-[var(--radius-card)] border border-brand-border bg-white p-4 text-sm not-italic">
            <p className="font-semibold text-brand-ink">Kantor Luhas</p>
            <p className="mt-1 text-brand-muted">{alamatLengkap}</p>
          </address>
        </div>

        <div className="space-y-6">
          <div className="h-64">
            <LazyMap alamat={alamatLengkap} />
          </div>
          <div className="rounded-[var(--radius-card)] border border-brand-border bg-white p-5">
            <h2 className="font-heading text-lg font-bold text-brand-ink">Kirim pesan singkat</h2>
            <p className="mt-1 text-sm text-brand-muted">
              Untuk pendaftaran lengkap, gunakan{" "}
              <a href="/daftar" className="text-brand-primary underline">
                formulir minat
              </a>
              .
            </p>
            <div className="mt-4">
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
