"use client";

import * as React from "react";
import { Play } from "lucide-react";
import { Figure } from "@/components/ui/media";
import { track } from "@/lib/analytics";
import type { Testimoni } from "@/lib/cms/schema";

// PRD §7.1 blok 6 + §13: poster + load-on-click, tanpa autoplay bersuara,
// disertai transkrip. PRD §14: event video_play.
export function VideoTestimonialCard({ testimoni }: { testimoni: Testimoni }) {
  const [playing, setPlaying] = React.useState(false);
  const video = testimoni.video;
  if (!video) return null;

  return (
    <figure className="overflow-hidden rounded-[var(--radius-card)] border border-brand-border bg-white">
      <div className="relative aspect-[9/16] bg-brand-ink">
        {playing ? (
          <video
            src={video.src}
            poster={video.poster.src}
            controls
            autoPlay
            playsInline
            className="h-full w-full object-cover"
            aria-label={`Video testimoni ${testimoni.nama}`}
          >
            {video.transkrip && (
              <track kind="descriptions" label="Transkrip" srcLang="id" />
            )}
          </video>
        ) : (
          <button
            type="button"
            onClick={() => {
              setPlaying(true);
              track({ name: "video_play", params: { video_id: testimoni.slug } });
            }}
            className="group absolute inset-0 h-full w-full"
            aria-label={`Putar video testimoni ${testimoni.nama} dari ${testimoni.kota}`}
          >
            <Figure
              image={video.poster}
              sizes="(max-width: 640px) 70vw, 240px"
              ratio="9/16"
              rounded={false}
              className="h-full w-full"
            />
            <span className="absolute inset-0 flex items-center justify-center bg-brand-ink/20 transition-colors group-hover:bg-brand-ink/30">
              <span className="flex size-14 items-center justify-center rounded-full bg-white/90 text-brand-primary shadow-[var(--shadow-md)]">
                <Play className="ml-0.5 size-6" aria-hidden />
              </span>
            </span>
          </button>
        )}
      </div>
      <figcaption className="p-3">
        <p className="text-sm font-semibold text-brand-ink">
          {testimoni.nama} · {testimoni.kota}
        </p>
        <p className="mt-1 line-clamp-2 text-xs text-brand-muted">“{testimoni.kutipan}”</p>
        {video.transkrip && (
          <details className="mt-2 text-xs text-brand-muted">
            <summary className="cursor-pointer font-medium text-brand-primary">
              Baca transkrip
            </summary>
            <p className="mt-1">{video.transkrip}</p>
          </details>
        )}
      </figcaption>
    </figure>
  );
}
