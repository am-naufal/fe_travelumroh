import type { Metadata } from "next";
import Script from "next/script";
import { ShieldCheck, Clock } from "lucide-react";
import { getActivePackages, getSettings } from "@/lib/cms";
import { env } from "@/lib/env";
import { pageMetadata } from "@/lib/seo";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { LeadForm } from "@/components/forms/lead-form";
import { WhatsAppCta } from "@/components/layout/whatsapp-cta";

export const metadata: Metadata = pageMetadata({
  title: "Daftar Minat Umroh — Konsultasi Gratis",
  description:
    "Isi formulir minat umroh Luhas. Tim sales akan menghubungi Anda via WhatsApp untuk konsultasi paket, jadwal, dan skema pembayaran. Tanpa keharusan mendaftar.",
  path: "/daftar",
});

export default async function DaftarPage({ searchParams }: PageProps<"/daftar">) {
  const sp = await searchParams;
  const paketParam = typeof sp.paket === "string" ? sp.paket : undefined;
  const [pakets, settings] = await Promise.all([getActivePackages(), getSettings()]);

  return (
    <>
      <Breadcrumb items={[{ name: "Daftar Minat", path: "/daftar" }]} />
      <div className="container-page grid gap-10 py-8 lg:grid-cols-[1fr_360px]">
        <div className="max-w-xl">
          <h1 className="font-heading text-[28px] font-extrabold text-brand-ink sm:text-4xl">
            Formulir Pendaftaran Minat
          </h1>
          <p className="mt-2.5 text-[15px] leading-relaxed text-brand-muted sm:text-base">
            Isi sebentar, lalu tim kami menghubungi Anda lewat WhatsApp. Belum ada pembayaran
            apa pun di tahap ini.
          </p>

          <div className="mt-6 rounded-[var(--radius-card)] border border-brand-border bg-white p-5 shadow-[var(--shadow-sm)] sm:p-8">
            <LeadForm
              pakets={pakets.map((p) => ({ slug: p.slug, nama: p.nama }))}
              defaultPaket={paketParam}
            />
          </div>
        </div>

        <aside className="space-y-4">
          <div className="rounded-[var(--radius-card)] border border-brand-border bg-white p-5 text-sm">
            <p className="flex items-center gap-2 font-semibold text-brand-ink">
              <Clock className="size-4 text-brand-primary" aria-hidden />
              Dibalas ≤ {settings.kontak.slaBalasMenit} menit
            </p>
            <p className="mt-1 text-brand-muted">Pada jam kerja:</p>
            <ul className="mt-1 text-brand-muted">
              {settings.kontak.jamOperasional.map((j) => (
                <li key={j.hari}>
                  {j.hari}: {j.jam}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-[var(--radius-card)] border border-brand-border bg-white p-5 text-sm">
            <p className="flex items-center gap-2 font-semibold text-brand-ink">
              <ShieldCheck className="size-4 text-brand-success" aria-hidden />
              Data Anda aman
            </p>
            <p className="mt-1 text-brand-muted">
              Data hanya dipakai untuk menindaklanjuti minat umroh Anda dan dapat dihapus kapan
              saja.
            </p>
          </div>

          <div className="rounded-[var(--radius-card)] bg-brand-primary/5 p-5 text-sm">
            <p className="font-semibold text-brand-ink">Lebih suka chat langsung?</p>
            <p className="mt-1 text-brand-muted">Lewati formulir, ngobrol dengan tim kami.</p>
            <WhatsAppCta ctaPosition="daftar-sidebar" className="mt-3 w-full">
              Chat via WhatsApp
            </WhatsAppCta>
          </div>
        </aside>
      </div>

      {/* Turnstile script — hanya bila dikonfigurasi (PRD §7.11) */}
      {env.turnstileSiteKey && (
        <>
          <Script
            src="https://challenges.cloudflare.com/turnstile/v0/api.js"
            strategy="afterInteractive"
          />
          <Script id="turnstile-cb" strategy="afterInteractive">{`
            window.onTurnstile = function(token){
              var el = document.querySelector('input[name="turnstileToken"]');
              if (!el) { el = document.createElement('input'); el.type='hidden'; el.name='turnstileToken'; document.forms[0].appendChild(el); }
              el.value = token;
            };
          `}</Script>
        </>
      )}
    </>
  );
}
