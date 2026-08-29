import type { ReactNode } from "react";
import { SearchX } from "lucide-react";

// PRD §7.2: kondisi kosong menyertakan tombol reset dan saran.
export function EmptyState({
  title,
  description,
  action,
  icon,
}: {
  title: string;
  description?: string;
  action?: ReactNode;
  icon?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center rounded-[var(--radius-card)] border border-dashed border-brand-border bg-white/60 px-6 py-12 text-center">
      <div className="mb-3 text-brand-muted">{icon ?? <SearchX className="size-10" aria-hidden />}</div>
      <p className="font-heading text-lg font-semibold text-brand-ink">{title}</p>
      {description && <p className="mt-1 max-w-sm text-sm text-brand-muted">{description}</p>}
      {action && <div className="mt-5 flex flex-wrap justify-center gap-3">{action}</div>}
    </div>
  );
}
