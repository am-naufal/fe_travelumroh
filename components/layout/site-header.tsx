"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import type { PengaturanSitus } from "@/lib/cms/schema";
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

  React.useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-40 border-b border-brand-border bg-white/90 backdrop-blur">
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2" aria-label="Luhas — Beranda">
          <span className="flex size-9 items-center justify-center rounded-[10px] bg-brand-primary font-heading text-lg font-bold text-white">
            L
          </span>
          <span className="font-heading text-xl font-bold text-brand-ink">Luhas</span>
        </Link>

        <nav aria-label="Navigasi utama" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {NAV.map((item) => {
              const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-brand-ink/5",
                      active ? "text-brand-primary" : "text-brand-ink",
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

        <div className="flex items-center gap-2">
          {/* PRD §6: CTA tetap di header */}
          <div className="hidden sm:block">
            <WhatsAppCta ctaPosition="header" size="sm">
              Chat Sekarang
            </WhatsAppCta>
          </div>
          <button
            type="button"
            className="flex size-11 items-center justify-center rounded-lg text-brand-ink hover:bg-brand-ink/5 lg:hidden"
            aria-expanded={open}
            aria-controls="menu-mobile"
            aria-label={open ? "Tutup menu" : "Buka menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-6" aria-hidden /> : <Menu className="size-6" aria-hidden />}
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
                    className="block rounded-lg px-3 py-3 text-base font-medium text-brand-ink hover:bg-brand-ink/5"
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
