import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { InstallmentCalculator } from "@/components/forms/installment-calculator";

interface PaketOption {
  slug: string;
  nama: string;
  harga: number;
  dpMinimum: number;
  tenor: number[];
  tanggalTerdekat: string | null;
}

// PRD §7.1 blok 5: slider harga + tenor → angsuran per bulan, real-time,
// tautan ke kalkulator penuh.
export function MiniCalculator({ pakets }: { pakets: PaketOption[] }) {
  return (
    <section className="bg-white">
      <div className="container-page grid gap-6 py-12 lg:grid-cols-[1fr_1.1fr] lg:items-center">
        <div>
          <h2 className="font-heading text-2xl font-extrabold text-brand-ink sm:text-[30px]">
            Hitung cicilannya dulu, tenang kemudian
          </h2>
          <p className="mt-2.5 text-[15px] leading-relaxed text-brand-muted">
            Geser harga dan pilih tenor untuk melihat perkiraan angsuran bulanan. Tanpa bunga —
            sisa setelah DP dibagi rata sampai H-40 sebelum berangkat.
          </p>
          <Link
            href="/simulasi-cicilan"
            className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-primary hover:underline"
          >
            Buka kalkulator lengkap
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>
        <InstallmentCalculator pakets={pakets} variant="mini" />
      </div>
    </section>
  );
}
