import { Suspense } from "react";
import type { Metadata } from "next";
import { getActivePackages } from "@/lib/cms";
import { toPackageView } from "@/lib/package-view";
import { pageMetadata } from "@/lib/seo";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { PackageExplorer } from "@/components/package/package-explorer";
import { PackageCardSkeleton } from "@/components/ui/skeleton";

// PRD §10.2 — SSG + ISR
export const revalidate = 300;

export const metadata: Metadata = pageMetadata({
  title: "Paket Umroh — Harga Transparan, Bisa Dicicil",
  description:
    "Bandingkan semua paket umroh Luhas: hemat, reguler, plus Turki, plus Dubai, Ramadhan, dan VIP. Filter berdasarkan harga, bulan, kota, dan bintang hotel.",
  path: "/paket",
});

export default async function PaketPage() {
  const pakets = (await getActivePackages()).map(toPackageView);

  return (
    <>
      <Breadcrumb items={[{ name: "Paket", path: "/paket" }]} />
      <div className="container-page pt-2">
        <h1 className="font-heading text-2xl font-bold text-brand-ink sm:text-3xl">
          Paket Umroh Luhas
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-brand-muted">
          {pakets.length} paket aktif. Semua harga adalah harga per orang untuk kamar berempat
          (quad) dan sudah termasuk tiket, visa, hotel, makan, dan pembimbing.
        </p>
      </div>

      <Suspense
        fallback={
          <div className="container-page grid gap-5 py-8 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <PackageCardSkeleton key={i} />
            ))}
          </div>
        }
      >
        <PackageExplorer pakets={pakets} />
      </Suspense>
    </>
  );
}
