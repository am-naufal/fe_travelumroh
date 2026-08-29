import { Suspense } from "react";
import type { Metadata } from "next";
import { getArticles } from "@/lib/cms";
import { pageMetadata } from "@/lib/seo";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { ArticleList } from "@/components/article/article-list";

export const revalidate = 300;

export const metadata: Metadata = pageMetadata({
  title: "Panduan Umroh — Persiapan, Biaya, Ibadah, Tips",
  description:
    "Kumpulan panduan umroh Luhas: rincian biaya, cicilan tanpa riba, cara cek travel resmi, manasik singkat, dan tips perjalanan.",
  path: "/panduan",
});

export default async function PanduanPage() {
  const artikel = await getArticles();

  return (
    <>
      <Breadcrumb items={[{ name: "Panduan", path: "/panduan" }]} />
      <div className="container-page py-8">
        <h1 className="font-heading text-2xl font-bold text-brand-ink sm:text-3xl">
          Panduan umroh
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-brand-muted">
          Bacaan singkat dan jujur untuk menyiapkan perjalanan ibadah Anda.
        </p>
        <div className="mt-5">
          <Suspense fallback={<p className="text-sm text-brand-muted">Memuat…</p>}>
            <ArticleList artikel={artikel} />
          </Suspense>
        </div>
      </div>
    </>
  );
}
