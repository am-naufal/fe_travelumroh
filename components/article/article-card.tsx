import Link from "next/link";
import { Clock } from "lucide-react";
import { Figure } from "@/components/ui/media";
import { Badge } from "@/components/ui/badge";
import { formatTanggalShort } from "@/lib/format";
import type { Artikel } from "@/lib/cms/schema";

export function ArticleCard({ artikel }: { artikel: Artikel }) {
  return (
    <article className="flex flex-col overflow-hidden rounded-[var(--radius-card)] border border-brand-border bg-white shadow-[var(--shadow-sm)] transition-shadow hover:shadow-[var(--shadow-md)]">
      <Link href={`/panduan/${artikel.slug}`} aria-label={artikel.judul}>
        <Figure
          image={{ src: artikel.gambar, alt: artikel.gambarAlt, width: 1200, height: 675 }}
          sizes="(max-width: 640px) 100vw, 380px"
          ratio="16/9"
          rounded={false}
        />
      </Link>
      <div className="flex flex-1 flex-col p-4">
        <Badge variant="info" className="self-start">
          {artikel.kategori}
        </Badge>
        <h3 className="mt-2 font-heading text-base font-bold text-brand-ink">
          <Link href={`/panduan/${artikel.slug}`} className="hover:text-brand-primary">
            {artikel.judul}
          </Link>
        </h3>
        <p className="mt-1 line-clamp-2 text-sm text-brand-muted">{artikel.ringkasan}</p>
        <p className="mt-3 flex items-center gap-2 text-xs text-brand-muted">
          <span>{formatTanggalShort(artikel.tanggal)}</span>
          <span aria-hidden>·</span>
          <span className="flex items-center gap-1">
            <Clock className="size-3" aria-hidden />
            {artikel.menitBaca} menit baca
          </span>
        </p>
      </div>
    </article>
  );
}
