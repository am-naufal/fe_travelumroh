import { notFound } from "next/navigation";
import Link from "next/link";
import { Clock, CalendarDays, UserRound } from "lucide-react";
import GithubSlugger from "github-slugger";
import { getArticle, getArticleSlugs, getRelatedArticles } from "@/lib/cms";
import { pageMetadata } from "@/lib/seo";
import { formatTanggal } from "@/lib/format";
import { JsonLd } from "@/components/seo/json-ld";
import { articleLd, breadcrumbLd } from "@/lib/jsonld";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Badge } from "@/components/ui/badge";
import { Figure } from "@/components/ui/media";
import { ArticleBody } from "@/components/article/article-body";
import { ArticleCard } from "@/components/article/article-card";

export const revalidate = 300;
export const dynamicParams = true;

export async function generateStaticParams() {
  return (await getArticleSlugs()).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/panduan/[slug]">) {
  const { slug } = await params;
  const a = await getArticle(slug);
  if (!a) return {};
  return pageMetadata({
    title: a.seoTitle ?? a.judul,
    description: a.seoDescription ?? a.ringkasan,
    path: `/panduan/${a.slug}`,
    type: "article",
    publishedTime: a.tanggal,
    authors: [a.penulis],
    ogImage: a.gambar,
  });
}

function extractToc(body: string) {
  const slugger = new GithubSlugger();
  return [...body.matchAll(/^##\s+(.+)$/gm)].map((m) => {
    const text = m[1].trim();
    return { text, id: slugger.slug(text) };
  });
}

export default async function ArtikelPage({ params }: PageProps<"/panduan/[slug]">) {
  const { slug } = await params;
  const artikel = await getArticle(slug);
  if (!artikel) notFound();

  const related = await getRelatedArticles(slug);
  const toc = extractToc(artikel.body);

  return (
    <>
      <JsonLd
        data={articleLd({
          judul: artikel.judul,
          ringkasan: artikel.ringkasan,
          slug: artikel.slug,
          penulis: artikel.penulis,
          tanggal: artikel.tanggal,
          gambar: artikel.gambar,
        })}
      />
      <JsonLd
        data={breadcrumbLd([
          { name: "Beranda", path: "/" },
          { name: "Panduan", path: "/panduan" },
          { name: artikel.judul, path: `/panduan/${artikel.slug}` },
        ])}
      />
      <Breadcrumb
        items={[
          { name: "Panduan", path: "/panduan" },
          { name: artikel.judul, path: `/panduan/${artikel.slug}` },
        ]}
      />

      <article className="container-page grid gap-10 py-8 lg:grid-cols-[1fr_240px]">
        <div className="min-w-0 max-w-2xl">
          <Badge variant="info">{artikel.kategori}</Badge>
          <h1 className="mt-2 font-heading text-2xl font-bold text-brand-ink sm:text-3xl md:text-4xl">
            {artikel.judul}
          </h1>
          <p className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-brand-muted">
            <span className="flex items-center gap-1">
              <UserRound className="size-3.5" aria-hidden />
              {artikel.penulis}
            </span>
            <span className="flex items-center gap-1">
              <CalendarDays className="size-3.5" aria-hidden />
              {formatTanggal(artikel.tanggal)}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="size-3.5" aria-hidden />
              {artikel.menitBaca} menit baca
            </span>
          </p>

          <div className="mt-5 overflow-hidden rounded-[var(--radius-card)]">
            <Figure
              image={{ src: artikel.gambar, alt: artikel.gambarAlt, width: 1200, height: 675 }}
              sizes="(max-width: 1024px) 100vw, 640px"
              ratio="16/9"
              priority
            />
          </div>

          <div className="mt-6">
            <ArticleBody body={artikel.body} />
          </div>
        </div>

        <aside className="hidden lg:block">
          {toc.length > 0 && (
            <nav aria-label="Daftar isi" className="sticky top-24 rounded-[var(--radius-card)] border border-brand-border bg-white p-4 text-sm">
              <p className="mb-2 font-semibold text-brand-ink">Daftar isi</p>
              <ul className="space-y-1.5 text-brand-muted">
                {toc.map((h) => (
                  <li key={h.id}>
                    <a href={`#${h.id}`} className="hover:text-brand-primary">
                      {h.text}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          )}
        </aside>
      </article>

      {related.length > 0 && (
        <section className="container-page pb-16">
          <h2 className="mb-4 font-heading text-xl font-bold text-brand-ink">Artikel terkait</h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((a) => (
              <ArticleCard key={a.slug} artikel={a} />
            ))}
          </div>
          <p className="mt-6 text-sm">
            <Link href="/panduan" className="font-semibold text-brand-primary hover:underline">
              ← Kembali ke semua panduan
            </Link>
          </p>
        </section>
      )}
    </>
  );
}
