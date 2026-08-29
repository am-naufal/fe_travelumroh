import type { Metadata } from "next";
import { getGallery } from "@/lib/cms";
import { pageMetadata } from "@/lib/seo";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { GalleryView } from "@/components/gallery/gallery-view";

export const revalidate = 300;

export const metadata: Metadata = pageMetadata({
  title: "Galeri Keberangkatan Umroh Luhas",
  description:
    "Dokumentasi asli keberangkatan jamaah Luhas — bukan foto stok. Saring per tahun dan per keberangkatan.",
  path: "/galeri",
});

export default async function GaleriPage() {
  const albums = await getGallery();

  return (
    <>
      <Breadcrumb items={[{ name: "Galeri", path: "/galeri" }]} />
      <div className="container-page py-8">
        <h1 className="font-heading text-2xl font-bold text-brand-ink sm:text-3xl">
          Galeri keberangkatan
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-brand-muted">
          Foto asli dari rombongan yang sudah berangkat bersama Luhas. Klik foto untuk
          memperbesar.
        </p>
        <div className="mt-6">
          <GalleryView albums={albums} />
        </div>
      </div>
    </>
  );
}
