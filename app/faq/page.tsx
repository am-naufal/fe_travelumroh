import type { Metadata } from "next";
import { getFaq, getFaqGrouped } from "@/lib/cms";
import { pageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/seo/json-ld";
import { faqLd } from "@/lib/jsonld";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { FaqAccordion } from "@/components/faq/faq-accordion";
import { WhatsAppCta } from "@/components/layout/whatsapp-cta";

export const revalidate = 300;

export const metadata: Metadata = pageMetadata({
  title: "FAQ — Pertanyaan Seputar Umroh Bersama Luhas",
  description:
    "Jawaban atas pertanyaan yang sering diajukan tentang biaya, pembayaran, dokumen, keberangkatan, dan kebijakan umroh Luhas.",
  path: "/faq",
});

export default async function FaqPage() {
  const [all, grouped] = await Promise.all([getFaq(), getFaqGrouped()]);

  return (
    <>
      {/* PRD §11: FAQPage schema */}
      <JsonLd data={faqLd(all.map((i) => ({ pertanyaan: i.pertanyaan, jawaban: i.jawaban })))} />
      <Breadcrumb items={[{ name: "FAQ", path: "/faq" }]} />

      <div className="container-page py-8">
        <h1 className="font-heading text-2xl font-bold text-brand-ink sm:text-3xl">
          Pertanyaan yang sering diajukan
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-brand-muted">
          {all.length} pertanyaan, dikelompokkan per topik. Gunakan kotak pencarian untuk
          menemukan jawaban lebih cepat.
        </p>

        <div className="mt-6">
          <FaqAccordion groups={grouped} searchable />
        </div>

        <div className="mt-10 rounded-[var(--radius-card)] bg-brand-primary/5 p-6 text-center">
          <p className="font-heading text-lg font-bold text-brand-ink">
            Pertanyaan Anda belum terjawab?
          </p>
          <p className="mt-1 text-sm text-brand-muted">
            Tim kami siap membantu langsung via WhatsApp.
          </p>
          <WhatsAppCta ctaPosition="faq-cta" className="mt-3">
            Tanya sekarang
          </WhatsAppCta>
        </div>
      </div>
    </>
  );
}
