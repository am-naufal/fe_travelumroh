"use client";

import Link from "next/link";
import { Plane, MapPin, CalendarDays, Building2, RefreshCw } from "lucide-react";
import type { PackageView } from "@/lib/package-view";
import { formatRupiah, formatTanggalShort, formatJarak, daysUntil } from "@/lib/format";
import { cn } from "@/lib/utils";
import { Figure } from "@/components/ui/media";
import { PackageBadge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { WhatsAppCta } from "@/components/layout/whatsapp-cta";
import { useCompare } from "./compare-context";
import { SEAT_HAMPIR_PENUH } from "@/lib/package-view";

// PRD §7.2 — kartu paket wajib memuat: nama, foto, harga quad, durasi,
// tanggal terdekat, maskapai, hotel Makkah + jarak (meter), badge sisa seat,
// tombol Detail + Tanya WA, checkbox Bandingkan.
export function PackageCard({
  paket,
  priority = false,
  showCompare = true,
}: {
  paket: PackageView;
  priority?: boolean;
  showCompare?: boolean;
}) {
  const compare = useCompare();
  const checked = compare.has(paket.slug);
  const seatLabel =
    paket.sisaSeatTerdekat === null
      ? null
      : paket.sisaSeatTerdekat <= 0
        ? "Kuota penuh"
        : paket.sisaSeatTerdekat <= SEAT_HAMPIR_PENUH
          ? `Sisa ${paket.sisaSeatTerdekat} seat`
          : `${paket.sisaSeatTerdekat} seat tersedia`;

  return (
    <article className="group flex flex-col overflow-hidden rounded-[var(--radius-card)] border border-brand-border bg-white shadow-[var(--shadow-sm)] transition-shadow hover:shadow-[var(--shadow-md)]">
      <div className="relative">
        <Link href={`/paket/${paket.slug}`} aria-label={`Lihat detail ${paket.nama}`}>
          <Figure
            image={paket.gambarUtama}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 360px"
            ratio="16/10"
            rounded={false}
            priority={priority}
            className="w-full"
          />
        </Link>
        <div className="absolute left-3 top-3 flex gap-2">
          {paket.badge && <PackageBadge value={paket.badge} />}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-heading text-base font-bold text-brand-ink">
            <Link href={`/paket/${paket.slug}`} className="hover:text-brand-primary">
              {paket.nama}
            </Link>
          </h3>
        </div>

        <p className="mt-1 line-clamp-2 text-sm text-brand-muted">{paket.ringkasan}</p>

        <div className="mt-3">
          <div className="flex items-baseline gap-1.5">
            <span className="text-xs text-brand-muted">mulai</span>
            <span className="font-heading text-xl font-bold text-brand-ink">
              {formatRupiah(paket.hargaMulai)}
            </span>
            <span className="text-xs text-brand-muted">/ orang (quad)</span>
          </div>
        </div>

        <ul className="mt-3 grid gap-1.5 text-xs text-brand-muted">
          <li className="flex items-center gap-1.5">
            <CalendarDays className="size-3.5 shrink-0" aria-hidden />
            {paket.durasiHari} hari
            {paket.tanggalTerdekat && ` · berangkat ${formatTanggalShort(paket.tanggalTerdekat)}`}
          </li>
          <li className="flex items-center gap-1.5">
            <Plane className="size-3.5 shrink-0" aria-hidden />
            {paket.maskapai.nama}
            {paket.maskapai.transit ? " (transit)" : " (langsung)"}
          </li>
          <li className="flex items-center gap-1.5">
            <Building2 className="size-3.5 shrink-0" aria-hidden />
            {paket.hotelMakkah.nama} ★{paket.hotelMakkah.bintang} ·{" "}
            {formatJarak(paket.hotelMakkah.jarakMeter)} dari Masjidil Haram
          </li>
          <li className="flex items-center gap-1.5">
            <MapPin className="size-3.5 shrink-0" aria-hidden />
            {paket.kotaKeberangkatan.join(", ")}
          </li>
        </ul>

        {/* PRD §9.2/§13: sisa seat sertakan teks, bukan hanya warna */}
        {seatLabel && (
          <p
            className={cn(
              "mt-3 text-xs font-medium",
              paket.sisaSeatTerdekat !== null &&
                paket.sisaSeatTerdekat > 0 &&
                paket.sisaSeatTerdekat <= SEAT_HAMPIR_PENUH
                ? "text-brand-danger"
                : "text-brand-muted",
            )}
          >
            {seatLabel}
          </p>
        )}

        <div className="mt-4 flex flex-col gap-2 sm:flex-row">
          <Button asChild size="sm" className="flex-1">
            <Link href={`/paket/${paket.slug}`}>Detail</Link>
          </Button>
          {paket.tanggalTerdekat ? (
            <WhatsAppCta
              kind="package"
              namaPaket={paket.nama}
              tanggal={formatTanggalShort(paket.tanggalTerdekat)}
              packageSlug={paket.slug}
              ctaPosition="package-card"
              size="sm"
              variant="secondary"
              className="flex-1"
            >
              Tanya via WA
            </WhatsAppCta>
          ) : (
            <WhatsAppCta
              kind="custom"
              text={`Assalamualaikum, saya tertarik dengan paket ${paket.nama}. Mohon informasi jadwal keberangkatan berikutnya.`}
              ctaPosition="package-card"
              size="sm"
              variant="secondary"
              className="flex-1"
            >
              Tanya via WA
            </WhatsAppCta>
          )}
        </div>

        {showCompare && (
          <label className="mt-3 flex cursor-pointer items-center gap-2 text-xs text-brand-muted">
            <Checkbox
              checked={checked}
              onCheckedChange={() => compare.toggle(paket.slug)}
              disabled={!checked && compare.isFull}
              aria-label={`Bandingkan ${paket.nama}`}
            />
            Bandingkan
            {!checked && compare.isFull && " (maks 3 paket)"}
          </label>
        )}

        <p className="mt-2 flex items-center gap-1 text-[11px] text-brand-muted/80">
          <RefreshCw className="size-3" aria-hidden />
          Diperbarui {formatTanggalShort(paket.diperbaruiPada)}
          {paket.tanggalTerdekat && daysUntil(paket.tanggalTerdekat) >= 0
            ? ` · ${daysUntil(paket.tanggalTerdekat)} hari lagi`
            : ""}
        </p>
      </div>
    </article>
  );
}
