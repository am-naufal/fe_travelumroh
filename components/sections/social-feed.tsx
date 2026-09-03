"use client";

import * as React from "react";
import { ExternalLink } from "lucide-react";
import { TiktokIcon, InstagramIcon } from "@/components/ui/social-icons";
import { SectionHeading } from "./section-heading";

interface FeedItem {
  id: string;
  platform: "instagram" | "tiktok";
  permalink: string;
  caption: string;
  thumbnailAlt: string;
}

// PRD §7.1 blok 7: grid 6 post. Gagal memuat feed tidak merusak layout.
export function SocialFeed() {
  const [items, setItems] = React.useState<FeedItem[] | null>(null);
  const [failed, setFailed] = React.useState(false);

  React.useEffect(() => {
    let alive = true;
    fetch("/api/social-feed")
      .then((r) => r.json())
      .then((d) => {
        if (alive) setItems(d.items ?? []);
      })
      .catch(() => {
        if (alive) setFailed(true);
      });
    return () => {
      alive = false;
    };
  }, []);

  // Graceful degradation: bila gagal total, section tidak dirender.
  if (failed) return null;

  return (
    <section className="container-page py-12">
      <SectionHeading
        kicker="Ikuti keseharian kami"
        title="@luhas.umroh"
        subtitle="Dokumentasi keberangkatan, manasik, dan kabar dari Tanah Suci."
      />
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {items === null
          ? Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="aspect-square animate-pulse rounded-xl bg-brand-ink/10" />
            ))
          : items.map((item) => (
              <a
                key={item.id}
                href={item.permalink}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex aspect-square flex-col justify-between overflow-hidden rounded-xl p-3 text-white transition-opacity hover:opacity-90"
                style={{
                  backgroundImage:
                    "linear-gradient(135deg, var(--color-brand-ink) 0%, var(--color-brand-ink-2) 55%, var(--color-brand-primary) 100%)",
                }}
              >
                <span>{item.platform === "tiktok" ? <TiktokIcon /> : <InstagramIcon />}</span>
                <span className="line-clamp-3 text-xs text-white/85">{item.caption}</span>
                <ExternalLink
                  className="absolute top-2 right-2 size-3.5 text-white/70 opacity-0 transition-opacity group-hover:opacity-100"
                  aria-hidden
                />
                <span className="sr-only">{item.thumbnailAlt}</span>
              </a>
            ))}
      </div>
    </section>
  );
}
