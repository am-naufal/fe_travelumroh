import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Figure } from "@/components/ui/media";
import { StarMark } from "@/components/ui/star-mark";
import { WhatsAppCta } from "@/components/layout/whatsapp-cta";
import { formatRupiah, formatTanggalShort } from "@/lib/format";
import type { Gambar } from "@/lib/cms/schema";

// PRD §7.1 blok 1 + Lampiran B — foto latar penuh dengan gradasi gelap di
// kiri untuk keterbacaan teks, persis docs/design/BerandaDesktop.html.
export function Hero({
  hargaMulai,
  gambar,
  tanggalTerdekat,
}: {
  hargaMulai: number;
  gambar: Gambar;
  tanggalTerdekat?: string | null;
}) {
  return (
    <section className="relative overflow-hidden">
      <Figure
        image={gambar}
        sizes="100vw"
        priority
        rounded={false}
        className="absolute inset-0 h-full w-full"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, rgba(11,27,61,0.95) 0%, rgba(11,27,61,0.86) 40%, rgba(11,27,61,0.12) 100%)",
        }}
        aria-hidden
      />
      <div className="container-page relative flex min-h-[520px] items-center py-14 sm:min-h-[560px]">
        <div className="max-w-[700px]">
          {tanggalTerdekat && (
            <div className="mb-[18px] inline-flex items-center gap-2 rounded-full border border-brand-accent/42 bg-brand-accent/16 px-3.5 py-[7px]">
              <StarMark size={15} className="text-brand-accent" />
              <span className="text-[12.5px] font-bold whitespace-nowrap text-brand-accent-vip">
                Berangkat terdekat · {formatTanggalShort(tanggalTerdekat)}
              </span>
            </div>
          )}
          <h1 className="mb-4 text-[32px] leading-[1.15] font-extrabold tracking-[-0.03em] text-white sm:text-[42px]">
            Umroh Tanpa Drama Biaya.
            <br />
            <span className="text-brand-accent-vip">Mulai {formatRupiah(hargaMulai)}.</span>
          </h1>
          <p className="mb-6 max-w-[520px] text-base leading-relaxed text-white/82 sm:text-[17px]">
            Harga lengkap sejak awal, bisa dibayar bertahap. Hotel dekat, pembimbing yang
            mendampingi, dan tim yang benar-benar membalas chat Anda — bukan robot.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button asChild size="lg" variant="accent">
              <Link href="/paket">Lihat Paket &amp; Harga</Link>
            </Button>
            <WhatsAppCta ctaPosition="hero" size="lg">
              Tanya Langsung via WhatsApp
            </WhatsAppCta>
          </div>
        </div>
      </div>
    </section>
  );
}
