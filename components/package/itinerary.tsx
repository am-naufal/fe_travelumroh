"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { Paket } from "@/lib/cms/schema";

// PRD §7.3 bagian 5: itinerary harian (accordion per hari).
export function Itinerary({ items }: { items: Paket["itinerary"] }) {
  return (
    <Accordion
      type="multiple"
      defaultValue={[`hari-${items[0]?.hari}`]}
      className="rounded-[var(--radius-card)] border border-brand-border bg-white px-4"
    >
      {items.map((it) => (
        <AccordionItem key={it.hari} value={`hari-${it.hari}`}>
          <AccordionTrigger>
            <span className="flex items-center gap-3">
              <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-brand-primary/10 text-xs font-bold text-brand-primary">
                {it.hari}
              </span>
              <span>
                Hari {it.hari} — {it.judul}
              </span>
            </span>
          </AccordionTrigger>
          <AccordionContent>{it.deskripsi}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
