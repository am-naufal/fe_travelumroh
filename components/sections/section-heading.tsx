import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function SectionHeading({
  title,
  subtitle,
  link,
  as: As = "h2",
}: {
  title: string;
  subtitle?: string;
  link?: { href: string; label: string };
  as?: "h2" | "h3";
}) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
      <div>
        <As className="font-heading text-2xl font-bold text-brand-ink sm:text-3xl">{title}</As>
        {subtitle && <p className="mt-1 max-w-2xl text-sm text-brand-muted">{subtitle}</p>}
      </div>
      {link && (
        <Link
          href={link.href}
          className="inline-flex items-center gap-1 text-sm font-semibold text-brand-primary hover:underline"
        >
          {link.label}
          <ArrowRight className="size-4" aria-hidden />
        </Link>
      )}
    </div>
  );
}
