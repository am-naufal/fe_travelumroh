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
        title="Dari feed kami"
        subtitle="Ikuti keseharian keberangkatan dan tips di Instagram & TikTok."
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
                className="group relative flex aspect-square flex-col justify-between overflow-hidden rounded-xl bg-brand-primary/10 p-3 text-brand-ink transition-colors hover:bg-brand-primary/15"
              >
                <span className="text-brand-primary">
                  {item.platform === "tiktok" ? <TiktokIcon /> : <InstagramIcon />}
                </span>
                <span className="line-clamp-3 text-xs">{item.caption}</span>
                <ExternalLink
                  className="absolute right-2 top-2 size-3.5 text-brand-muted opacity-0 transition-opacity group-hover:opacity-100"
                  aria-hidden
                />
                <span className="sr-only">{item.thumbnailAlt}</span>
              </a>
            ))}
      </div>
    </section>
  );
}
