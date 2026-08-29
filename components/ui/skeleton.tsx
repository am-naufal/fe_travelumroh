import { cn } from "@/lib/utils";

// PRD §7.2: "Menampilkan skeleton saat memuat, bukan layar kosong."
export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-brand-ink/10", className)}
      aria-hidden
    />
  );
}

export function PackageCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-[var(--radius-card)] border border-brand-border bg-white">
      <Skeleton className="aspect-[16/10] w-full rounded-none" />
      <div className="space-y-3 p-4">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-6 w-1/2" />
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-2/3" />
        <div className="flex gap-2 pt-2">
          <Skeleton className="h-11 flex-1" />
          <Skeleton className="h-11 flex-1" />
        </div>
      </div>
    </div>
  );
}
