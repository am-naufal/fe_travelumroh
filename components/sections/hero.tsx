import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Figure } from "@/components/ui/media";
import { IslamicPattern } from "@/components/ui/pattern";
import { WhatsAppCta } from "@/components/layout/whatsapp-cta";
import { formatRupiah } from "@/lib/format";
import type { Gambar } from "@/lib/cms/schema";

// PRD §7.1 blok 1 + Lampiran B (contoh copy).
export function Hero({ hargaMulai, gambar }: { hargaMulai: number; gambar: Gambar }) {
  return (
    <section className="relative overflow-hidden bg-brand-primary text-white">
      <IslamicPattern />
      <div className="container-page relative grid gap-8 py-10 md:grid-cols-2 md:items-center md:py-16">
        <div>
          <h1 className="font-heading text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
            Umroh Tanpa Drama Biaya. Mulai {formatRupiah(hargaMulai)}, Bisa Dicicil.
          </h1>
          <p className="mt-4 max-w-md text-base text-white/90 sm:text-lg">
            Harga lengkap dari awal. Hotel dekat, pendamping ramah, dan tim yang membalas
            chat-mu — bukan robot.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" variant="accent">
              <Link href="/paket">Lihat Paket &amp; Harga</Link>
            </Button>
            <WhatsAppCta ctaPosition="hero" size="lg" variant="whatsapp">
              Tanya Langsung via WhatsApp
            </WhatsAppCta>
          </div>
          <p className="mt-4 text-xs text-white/80">
            Berizin resmi Kemenag · SK PPIU No. 1234/2023 · 12.000+ jamaah diberangkatkan
          </p>
        </div>

        <div className="md:pl-6">
          {/* PRD §7.1: LCP element = gambar hero, priority, tampil penuh di 360×640 */}
          <Figure
            image={gambar}
            sizes="(max-width: 768px) 100vw, 45vw"
            ratio="4/3"
            priority
            className="w-full shadow-[var(--shadow-md)]"
          />
        </div>
      </div>
    </section>
  );
}
