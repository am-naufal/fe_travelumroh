import { ShieldCheck, Users, Star, MessageCircle } from "lucide-react";
import type { PengaturanSitus } from "@/lib/cms/schema";
import { pluralJamaah } from "@/lib/format";

// PRD §7.1 blok 2 — persis docs/design/BerandaDesktop.html: legalitas,
// jumlah jamaah, rating Google, kecepatan balas.
export function TrustBar({ settings }: { settings: PengaturanSitus }) {
  const jamBuka = settings.kontak.jamOperasional[0]?.jam;
  return (
    <section
      aria-label="Legalitas dan rekam jejak"
      className="border-t border-b border-brand-border bg-white"
    >
      <div className="container-page grid grid-cols-2 gap-6 py-6 lg:grid-cols-4">
        <a
          href={settings.legalitas.urlVerifikasiKemenag}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-start gap-[11px]"
        >
          <ShieldCheck className="size-[22px] shrink-0 text-brand-primary" aria-hidden />
          <span>
            <span className="block text-[15px] font-bold text-brand-ink group-hover:text-brand-primary">
              Berizin resmi Kemenag
            </span>
            <span className="mt-0.5 block text-[13px] text-brand-muted underline">
              {settings.legalitas.skPpiu}
            </span>
          </span>
        </a>

        <div className="flex items-start gap-[11px]">
          <Users className="size-[22px] shrink-0 text-brand-primary" aria-hidden />
          <span>
            <span className="block text-[15px] font-bold text-brand-ink">
              {pluralJamaah(settings.jumlahJamaah)}
            </span>
            <span className="mt-0.5 block text-[13px] text-brand-muted">
              Diberangkatkan sejak {settings.tahunBerdiri}
            </span>
          </span>
        </div>

        <div className="flex items-start gap-[11px]">
          <Star className="size-[22px] shrink-0 text-brand-accent" aria-hidden />
          <span>
            <span className="block text-[15px] font-bold text-brand-ink">
              {settings.ratingGoogle.nilai} dari 5
            </span>
            <span className="mt-0.5 block text-[13px] text-brand-muted">
              Ulasan Google {settings.ratingGoogle.jumlah} jamaah
            </span>
          </span>
        </div>

        <div className="flex items-start gap-[11px]">
          <MessageCircle className="size-[22px] shrink-0 text-brand-primary" aria-hidden />
          <span>
            <span className="block text-[15px] font-bold text-brand-ink">
              Dibalas ≤ {settings.kontak.slaBalasMenit} menit
            </span>
            {jamBuka && (
              <span className="mt-0.5 block text-[13px] text-brand-muted">Pada jam kerja: {jamBuka}</span>
            )}
          </span>
        </div>
      </div>
    </section>
  );
}
