import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { StarMark } from "@/components/ui/star-mark";

// Motif eyebrow persis docs/design/BerandaDesktop.html: StarMark emas +
// label kecil huruf besar-tracked di atas judul seksi.
export function SectionHeading({
  title,
  subtitle,
  link,
  kicker,
  as: As = "h2",
}: {
  title: string;
  subtitle?: string;
  link?: { href: string; label: string };
  kicker?: string;
  as?: "h2" | "h3";
}) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
      <div>
        {kicker && (
          <div className="mb-2.5 inline-flex items-center gap-[7px]">
            <StarMark size={14} className="text-brand-accent" />
            <span className="text-xs font-bold tracking-[0.1em] text-tint-gold-text uppercase">
              {kicker}
            </span>
          </div>
        )}
        <As className="font-heading text-2xl font-extrabold text-brand-ink sm:text-[30px]">
          {title}
        </As>
        {subtitle && (
          <p className="mt-2.5 max-w-2xl text-[15px] leading-relaxed text-brand-muted">
            {subtitle}
          </p>
        )}
      </div>
      {link && (
        <Link
          href={link.href}
          className="inline-flex items-center gap-1 text-sm font-bold text-brand-primary hover:underline"
        >
          {link.label}
          <ArrowRight className="size-4" aria-hidden />
        </Link>
      )}
    </div>
  );
}
