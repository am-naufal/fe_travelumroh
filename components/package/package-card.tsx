"use client";

import Link from "next/link";
import { Plane, CalendarDays, Building2, Users } from "lucide-react";
import type { PackageView } from "@/lib/package-view";
import { formatRupiah, formatTanggal, formatTanggalShort, formatJarak } from "@/lib/format";
import { cn } from "@/lib/utils";
import { Figure } from "@/components/ui/media";
import { Badge, PackageBadge } from "@/components/ui/badge";
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
  const urgent =
    paket.sisaSeatTerdekat !== null &&
    paket.sisaSeatTerdekat > 0 &&
    paket.sisaSeatTerdekat <= SEAT_HAMPIR_PENUH;
  const seatLabel =
    paket.sisaSeatTerdekat === null
      ? null
      : paket.sisaSeatTerdekat <= 0
        ? "Kuota penuh"
        : urgent
          ? `Sisa ${paket.sisaSeatTerdekat} seat`
          : `${paket.sisaSeatTerdekat} seat tersedia`;

  return (
    <article className="group flex flex-col overflow-hidden rounded-[var(--radius-card)] border border-brand-border bg-white shadow-[var(--shadow-sm)] transition-shadow hover:shadow-[var(--shadow-md)]">
      <div className="relative">
        <Link href={`/paket/${paket.slug}`} aria-label={`Lihat detail ${paket.nama}`}>
          <Figure
            image={paket.gambarUtama}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 360px"
            rounded={false}
            priority={priority}
            className="h-[178px] w-full"
          />
        </Link>
        <div className="absolute top-3 left-3 z-[3]">
          {paket.kategori === "vip" ? (
            <Badge variant="vip">VIP</Badge>
          ) : urgent ? (
            <PackageBadge value="hampir-penuh" label={seatLabel ?? undefined} />
          ) : (
            paket.badge && <PackageBadge value={paket.badge} />
          )}
        </div>
        <div className="absolute top-3 right-3 z-[3]">
          <Badge variant="info">{paket.durasiHari} hari</Badge>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-3.5 px-4 pt-[18px] pb-4">
        <div className="flex flex-col gap-1.5">
          <h3 className="font-heading text-[19px] font-extrabold text-brand-ink">
            <Link href={`/paket/${paket.slug}`} className="hover:text-brand-primary">
              {paket.nama}
            </Link>
          </h3>
          <p className="text-sm text-brand-muted">
            {paket.durasiHari} hari · Berangkat dari {paket.kotaKeberangkatan.join(", ")}
          </p>
        </div>

        <ul className="flex flex-col gap-2 text-sm text-brand-muted-2">
          {paket.tanggalTerdekat && (
            <li className="flex items-start gap-2.5">
              <CalendarDays className="mt-px size-4 shrink-0 text-brand-muted" aria-hidden />
              <span>Berangkat {formatTanggal(paket.tanggalTerdekat)}</span>
            </li>
          )}
          <li className="flex items-start gap-2.5">
            <Building2 className="mt-px size-4 shrink-0 text-brand-muted" aria-hidden />
            <span>
              Hotel bintang {paket.hotelMakkah.bintang} · {formatJarak(paket.hotelMakkah.jarakMeter)}{" "}
              dari Masjidil Haram
            </span>
          </li>
          <li className="flex items-start gap-2.5">
            <Plane className="mt-px size-4 shrink-0 text-brand-muted" aria-hidden />
            <span>
              {paket.maskapai.nama} · penerbangan {paket.maskapai.transit ? "transit" : "langsung"}
            </span>
          </li>
        </ul>

        <div className="h-px bg-tint-neutral-bg" />

        <div className="flex items-end justify-between gap-3">
          <div>
            <p className="text-xs font-semibold text-brand-muted">Mulai dari · kamar berempat</p>
            <p className="font-heading text-2xl font-extrabold tracking-[-0.02em] text-brand-primary">
              {formatRupiah(paket.hargaMulai)}
            </p>
          </div>
          {seatLabel && (
            <p
              className={cn(
                "flex items-center gap-1.5 text-[13px]",
                urgent ? "font-bold text-brand-danger-text" : "text-brand-muted",
              )}
            >
              <Users className="size-[15px] shrink-0" aria-hidden />
              {seatLabel}
            </p>
          )}
        </div>

        <div className="flex gap-2.5">
          <Button asChild variant="secondary" size="sm" className="flex-1">
            <Link href={`/paket/${paket.slug}`}>Lihat Detail</Link>
          </Button>
          {paket.tanggalTerdekat ? (
            <WhatsAppCta
              kind="package"
              namaPaket={paket.nama}
              tanggal={formatTanggalShort(paket.tanggalTerdekat)}
              packageSlug={paket.slug}
              ctaPosition="package-card"
              size="sm"
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
              className="flex-1"
            >
              Tanya via WA
            </WhatsAppCta>
          )}
        </div>

        {showCompare && (
          <label className="flex cursor-pointer items-center gap-2 text-xs text-brand-muted">
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
      </div>
    </article>
  );
}
