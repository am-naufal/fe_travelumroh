import type { Metadata } from "next";
import Script from "next/script";
import { ShieldCheck, Clock, MessageCircle } from "lucide-react";
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
          <h1 className="font-heading text-2xl font-bold text-brand-ink sm:text-3xl">
            Formulir minat umroh
          </h1>
          <p className="mt-2 text-sm text-brand-muted">
            Dua langkah singkat. Setelah ini tim kami menghubungi Anda via WhatsApp untuk
            konsultasi — belum ada kewajiban apa pun.
          </p>

          <div className="mt-6 rounded-[var(--radius-card)] border border-brand-border bg-white p-5 sm:p-6">
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
              <MessageCircle className="size-4" aria-hidden />
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
