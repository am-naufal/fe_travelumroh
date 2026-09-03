"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import type { PengaturanSitus } from "@/lib/cms/schema";
import { StarMark } from "@/components/ui/star-mark";
import { WhatsAppCta } from "./whatsapp-cta";

// PRD §6: navigasi utama maks 5 item.
const NAV = [
  { href: "/paket", label: "Paket" },
  { href: "/simulasi-cicilan", label: "Simulasi Cicilan" },
  { href: "/panduan", label: "Panduan" },
  { href: "/testimoni", label: "Testimoni" },
  { href: "/tentang", label: "Tentang" },
] as const;

export function SiteHeader({ settings }: { settings: PengaturanSitus }) {
  const [open, setOpen] = React.useState(false);
  const pathname = usePathname();
  const jamBuka = settings.kontak.jamOperasional[0]?.jam;

  React.useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-40 border-b border-brand-border bg-white">
      <div className="container-page flex items-center justify-between gap-4 py-3 lg:py-4">
        <Link href="/" className="flex items-center gap-[9px]" aria-label="Luhas — Beranda">
          <StarMark size={20} className="shrink-0 text-brand-accent" />
          <span className="font-heading text-[22px] font-extrabold tracking-[-0.03em] text-brand-ink lg:text-[26px]">
            Luhas
          </span>
          <span className="pt-1 text-[10px] font-bold uppercase tracking-[0.16em] text-brand-muted">
            Umroh
          </span>
        </Link>

        <nav aria-label="Navigasi utama" className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {NAV.map((item) => {
              const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "block border-b-2 py-2 text-[15px] transition-colors",
                      active
                        ? "border-brand-primary font-bold text-brand-primary"
                        : "border-transparent font-medium text-brand-ink hover:text-brand-primary",
                    )}
                    aria-current={active ? "page" : undefined}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          {jamBuka && (
            <span className="hidden text-[13px] font-semibold text-brand-muted lg:inline">
              {jamBuka}
            </span>
          )}
          <div className="hidden lg:block">
            <WhatsAppCta ctaPosition="header" size="sm">
              Chat Sekarang
            </WhatsAppCta>
          </div>
          <button
            type="button"
            className="flex size-11 items-center justify-center rounded-xl border border-brand-border text-brand-ink lg:hidden"
            aria-expanded={open}
            aria-controls="menu-mobile"
            aria-label={open ? "Tutup menu" : "Buka menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? (
              <X className="size-[22px]" aria-hidden />
            ) : (
              <Menu className="size-[22px]" aria-hidden />
            )}
          </button>
        </div>
      </div>

      {open && (
        <div id="menu-mobile" className="border-t border-brand-border bg-white lg:hidden">
          <nav aria-label="Navigasi utama seluler" className="container-page py-3">
            <ul className="flex flex-col">
              {NAV.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="block rounded-xl px-3 py-3 text-base font-semibold text-brand-ink hover:bg-brand-bg"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-3">
              <WhatsAppCta ctaPosition="header-mobile" size="lg" className="w-full">
                Chat Sekarang
              </WhatsAppCta>
            </div>
            <p className="mt-2 px-3 text-xs text-brand-muted">
              Balas ≤ {settings.kontak.slaBalasMenit} menit pada jam kerja
            </p>
          </nav>
        </div>
      )}
    </header>
  );
}
