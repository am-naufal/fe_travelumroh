import { ShieldCheck, Users, CalendarClock, Star } from "lucide-react";
import type { PengaturanSitus } from "@/lib/cms/schema";
import { pluralJamaah } from "@/lib/format";

// PRD §7.1 blok 2: Nomor SK PPIU (dapat diklik ke verifikasi Kemenag),
// jumlah jamaah, tahun berdiri, rating Google.
export function TrustBar({ settings }: { settings: PengaturanSitus }) {
  const tahunOperasi = new Date().getFullYear() - settings.tahunBerdiri;
  return (
    <section aria-label="Legalitas dan rekam jejak" className="border-b border-brand-border bg-white">
      <div className="container-page grid grid-cols-2 gap-4 py-5 text-sm md:grid-cols-4">
        <a
          href={settings.legalitas.urlVerifikasiKemenag}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-start gap-2"
        >
          <ShieldCheck className="mt-0.5 size-5 shrink-0 text-brand-success" aria-hidden />
          <span>
            <span className="block font-semibold text-brand-ink group-hover:text-brand-primary">
              {settings.legalitas.skPpiu}
            </span>
            <span className="text-xs text-brand-muted underline">Verifikasi di situs Kemenag</span>
          </span>
        </a>

        <div className="flex items-start gap-2">
          <Users className="mt-0.5 size-5 shrink-0 text-brand-primary" aria-hidden />
          <span>
            <span className="block font-semibold text-brand-ink">
              {pluralJamaah(settings.jumlahJamaah)}
            </span>
            <span className="text-xs text-brand-muted">telah diberangkatkan</span>
          </span>
        </div>

        <div className="flex items-start gap-2">
          <CalendarClock className="mt-0.5 size-5 shrink-0 text-brand-primary" aria-hidden />
          <span>
            <span className="block font-semibold text-brand-ink">{tahunOperasi} tahun</span>
            <span className="text-xs text-brand-muted">melayani sejak {settings.tahunBerdiri}</span>
          </span>
        </div>

        <div className="flex items-start gap-2">
          <Star className="mt-0.5 size-5 shrink-0 text-brand-accent" aria-hidden />
          <span>
            <span className="block font-semibold text-brand-ink">
              {settings.ratingGoogle.nilai} / 5
            </span>
            <span className="text-xs text-brand-muted">
              {settings.ratingGoogle.jumlah} ulasan Google
            </span>
          </span>
        </div>
      </div>
    </section>
  );
}
