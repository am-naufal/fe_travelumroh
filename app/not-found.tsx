import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="container-page flex flex-col items-center py-24 text-center">
      <p className="font-heading text-5xl font-bold text-brand-primary">404</p>
      <h1 className="mt-3 font-heading text-2xl font-bold text-brand-ink">
        Halaman tidak ditemukan
      </h1>
      <p className="mt-2 max-w-sm text-sm text-brand-muted">
        Tautannya mungkin sudah berubah atau paket sudah tidak tersedia. Coba mulai dari daftar
        paket.
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <Button asChild>
          <Link href="/paket">Lihat Paket</Link>
        </Button>
        <Button asChild variant="secondary">
          <Link href="/">Beranda</Link>
        </Button>
      </div>
    </div>
  );
}
