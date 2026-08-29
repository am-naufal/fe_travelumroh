import { Star } from "lucide-react";
import { AvatarFigure } from "@/components/ui/media";
import type { Testimoni } from "@/lib/cms/schema";

// PRD §7.7: kartu berisi nama, kota, paket yang diambil, foto, kutipan.
export function TestimonialCard({
  testimoni,
  paketNama,
}: {
  testimoni: Testimoni;
  paketNama?: string;
}) {
  return (
    <figure className="flex flex-col rounded-[var(--radius-card)] border border-brand-border bg-white p-5">
      <div className="flex items-center gap-3">
        {testimoni.foto && <AvatarFigure image={testimoni.foto} size={44} />}
        <div>
          <figcaption className="font-semibold text-brand-ink">{testimoni.nama}</figcaption>
          <p className="text-xs text-brand-muted">
            {testimoni.kota}
            {paketNama ? ` · ${paketNama}` : ""}
          </p>
        </div>
      </div>
      <div className="mt-2 flex gap-0.5" aria-label={`Rating ${testimoni.rating} dari 5`}>
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={
              i < testimoni.rating ? "size-4 fill-brand-accent text-brand-accent" : "size-4 text-brand-border"
            }
            aria-hidden
          />
        ))}
      </div>
      <blockquote className="mt-2 flex-1 text-sm text-brand-ink">“{testimoni.kutipan}”</blockquote>
      <p className="mt-3 text-xs text-brand-muted">{testimoni.tahun}</p>
    </figure>
  );
}
