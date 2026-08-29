"use client";

import * as React from "react";
import { Search } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/field";
import { EmptyState } from "@/components/ui/empty-state";
import type { FaqItem } from "@/lib/cms/schema";

// PRD §7.9: accordion + pencarian dalam halaman.
export function FaqAccordion({
  groups,
  searchable = false,
}: {
  groups: { grup: string; items: FaqItem[] }[];
  searchable?: boolean;
}) {
  const [q, setQ] = React.useState("");
  const query = q.trim().toLowerCase();

  const filtered = groups
    .map((g) => ({
      ...g,
      items: query
        ? g.items.filter(
            (i) =>
              i.pertanyaan.toLowerCase().includes(query) ||
              i.jawaban.toLowerCase().includes(query),
          )
        : g.items,
    }))
    .filter((g) => g.items.length > 0);

  return (
    <div>
      {searchable && (
        <div className="relative mb-6 max-w-md">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-brand-muted"
            aria-hidden
          />
          <Input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Cari pertanyaan…"
            aria-label="Cari pertanyaan"
            className="pl-9"
          />
        </div>
      )}

      {filtered.length === 0 ? (
        <EmptyState
          title="Tidak ada pertanyaan yang cocok"
          description="Coba kata kunci lain, atau tanyakan langsung ke tim kami via WhatsApp."
        />
      ) : (
        <div className="space-y-8">
          {filtered.map((g) => (
            <div key={g.grup}>
              <h3 className="mb-1 font-heading text-lg font-bold text-brand-ink">{g.grup}</h3>
              <Accordion type="single" collapsible className="rounded-[var(--radius-card)] border border-brand-border bg-white px-4">
                {g.items.map((item, i) => (
                  <AccordionItem key={i} value={`${g.grup}-${i}`}>
                    <AccordionTrigger>{item.pertanyaan}</AccordionTrigger>
                    <AccordionContent>{item.jawaban}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
