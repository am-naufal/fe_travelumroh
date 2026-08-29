import { ArticleCard } from "@/components/article/article-card";
import { SectionHeading } from "./section-heading";
import type { Artikel } from "@/lib/cms/schema";

// PRD §7.1 blok 9: 3 artikel panduan.
export function LatestArticles({ artikel }: { artikel: Artikel[] }) {
  if (artikel.length === 0) return null;
  return (
    <section className="container-page py-12">
      <SectionHeading
        title="Panduan umroh terbaru"
        subtitle="Bacaan singkat untuk menyiapkan perjalanan Anda."
        link={{ href: "/panduan", label: "Semua panduan" }}
      />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {artikel.slice(0, 3).map((a) => (
          <ArticleCard key={a.slug} artikel={a} />
        ))}
      </div>
    </section>
  );
}
