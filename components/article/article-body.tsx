import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import { ArrowRight } from "lucide-react";
import { WhatsAppCta } from "@/components/layout/whatsapp-cta";

// PRD §7.8: CTA paket di tengah dan akhir artikel.
function InlineCta({ variant }: { variant: "tengah" | "akhir" }) {
  return (
    <aside className="my-8 rounded-[var(--radius-card)] border border-brand-primary/20 bg-brand-primary/5 p-5">
      <p className="font-heading text-base font-bold text-brand-ink">
        {variant === "tengah"
          ? "Sudah siap melihat harga sebenarnya?"
          : "Punya pertanyaan setelah membaca ini?"}
      </p>
      <p className="mt-1 text-sm text-brand-muted">
        {variant === "tengah"
          ? "Semua paket Luhas menampilkan harga per tipe kamar dan simulasi cicilan sejak awal."
          : "Tim kami membantu memilih paket sesuai anggaran dan tanggal Anda."}
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        <Link
          href="/paket"
          className="inline-flex items-center gap-1 rounded-[var(--radius-btn)] bg-brand-primary px-4 py-2 text-sm font-semibold text-white"
        >
          Lihat paket &amp; harga
          <ArrowRight className="size-4" aria-hidden />
        </Link>
        <WhatsAppCta ctaPosition={`artikel-${variant}`} size="md" variant="secondary">
          Tanya via WhatsApp
        </WhatsAppCta>
      </div>
    </aside>
  );
}

const mdComponents = {
  a: ({ href, children }: { href?: string; children?: React.ReactNode }) =>
    href?.startsWith("/") ? (
      <Link href={href}>{children}</Link>
    ) : (
      <a href={href} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    ),
};

export function ArticleBody({ body }: { body: string }) {
  const blocks = body.split(/\n\n+/);
  const mid = Math.max(1, Math.floor(blocks.length / 2));
  const first = blocks.slice(0, mid).join("\n\n");
  const rest = blocks.slice(mid).join("\n\n");

  return (
    <div className="prose-luhas max-w-none">
      <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeSlug]} components={mdComponents}>
        {first}
      </ReactMarkdown>
      <InlineCta variant="tengah" />
      <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeSlug]} components={mdComponents}>
        {rest}
      </ReactMarkdown>
      <InlineCta variant="akhir" />
    </div>
  );
}
