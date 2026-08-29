import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { JsonLd } from "@/components/seo/json-ld";
import { faqLd } from "@/lib/jsonld";
import { SectionHeading } from "./section-heading";
import type { FaqItem } from "@/lib/cms/schema";

// PRD §7.1 blok 10: 5 pertanyaan teratas + tautan ke FAQ penuh, FAQPage schema.
export function FaqPreview({ items }: { items: FaqItem[] }) {
  return (
    <section className="container-page py-12">
      <JsonLd data={faqLd(items.map((i) => ({ pertanyaan: i.pertanyaan, jawaban: i.jawaban })))} />
      <SectionHeading
        title="Pertanyaan yang sering diajukan"
        link={{ href: "/faq", label: "Lihat semua FAQ" }}
      />
      <Accordion
        type="single"
        collapsible
        className="rounded-[var(--radius-card)] border border-brand-border bg-white px-4"
      >
        {items.map((item, i) => (
          <AccordionItem key={i} value={`faq-${i}`}>
            <AccordionTrigger>{item.pertanyaan}</AccordionTrigger>
            <AccordionContent>{item.jawaban}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
