import { Suspense } from "react";
import type { Metadata } from "next";
import { getActivePackages } from "@/lib/cms";
import { toPackageView } from "@/lib/package-view";
import { pageMetadata } from "@/lib/seo";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { CompareView } from "@/components/package/compare-view";

export const revalidate = 300;

export const metadata: Metadata = pageMetadata({
  title: "Banding Paket Umroh — Bandingkan hingga 3 Paket",
  description:
    "Bandingkan harga per tipe kamar, durasi, maskapai, jarak hotel, dan fasilitas dari hingga tiga paket umroh Luhas berdampingan.",
  path: "/paket/banding",
});

export default async function BandingPage() {
  const pakets = (await getActivePackages()).map(toPackageView);

  return (
    <>
      <Breadcrumb
        items={[
          { name: "Paket", path: "/paket" },
          { name: "Banding", path: "/paket/banding" },
        ]}
      />
      <div className="container-page py-8">
        <h1 className="font-heading text-2xl font-bold text-brand-ink sm:text-3xl">
          Banding paket
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-brand-muted">
          Baris yang berbeda antar paket disorot berwarna agar mudah terlihat.
        </p>
        <div className="mt-6">
          <Suspense fallback={<p className="text-sm text-brand-muted">Memuat perbandingan…</p>}>
            <CompareView pakets={pakets} />
          </Suspense>
        </div>
      </div>
    </>
  );
}
