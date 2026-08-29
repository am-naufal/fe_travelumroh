"use client";

import * as React from "react";
import Link from "next/link";
import { formatRupiah, formatTanggalShort } from "@/lib/format";
import { WhatsAppCta } from "@/components/layout/whatsapp-cta";

// PRD §7.3 bagian 11: sticky bottom bar di mobile — harga + "Chat Sekarang".
// PRD kriteria: muncul setelah scroll melewati hero, tidak menutupi konten penting.
export function StickyMobileCta({
  nama,
  slug,
  harga,
  tanggalTerdekat,
}: {
  nama: string;
  slug: string;
  harga: number;
  tanggalTerdekat: string | null;
}) {
  const [show, setShow] = React.useState(false);

  React.useEffect(() => {
    const hero = document.getElementById("detail-hero");
    if (!hero) return;
    const obs = new IntersectionObserver(
      ([entry]) => setShow(!entry.isIntersecting),
      { rootMargin: "-80px 0px 0px 0px" },
    );
    obs.observe(hero);

    // Sembunyikan FAB global agar tidak menumpuk (PRD: tidak menutupi konten)
    document.body.setAttribute("data-sticky-cta", "on");
    return () => {
      obs.disconnect();
      document.body.removeAttribute("data-sticky-cta");
    };
  }, []);

  return (
    <div
      data-visible={show}
      className="fixed inset-x-0 bottom-0 z-40 border-t border-brand-border bg-white p-3 transition-transform duration-200 data-[visible=false]:translate-y-full lg:hidden"
    >
      <div className="flex items-center gap-3">
        <div className="min-w-0 flex-1">
          <p className="text-xs text-brand-muted">mulai</p>
          <p className="truncate font-heading text-base font-bold text-brand-ink">
            {formatRupiah(harga)}
          </p>
        </div>
        <Link
          href={`/daftar?paket=${slug}`}
          className="inline-flex h-11 items-center justify-center rounded-[var(--radius-btn)] border border-brand-primary px-4 text-sm font-semibold text-brand-primary"
        >
          Daftar
        </Link>
        {tanggalTerdekat ? (
          <WhatsAppCta
            kind="package"
            namaPaket={nama}
            tanggal={formatTanggalShort(tanggalTerdekat)}
            packageSlug={slug}
            ctaPosition="sticky-mobile"
            size="md"
          >
            Chat Sekarang
          </WhatsAppCta>
        ) : (
          <WhatsAppCta
            kind="custom"
            text={`Assalamualaikum, saya tertarik dengan paket ${nama}. Mohon info jadwal berikutnya.`}
            ctaPosition="sticky-mobile"
            size="md"
          >
            Chat Sekarang
          </WhatsAppCta>
        )}
      </div>
    </div>
  );
}
