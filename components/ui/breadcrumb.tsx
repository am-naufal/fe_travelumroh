import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbLd } from "@/lib/jsonld";

export interface Crumb {
  name: string;
  path: string;
}

// PRD §11: BreadcrumbList structured data + navigasi visual.
export function Breadcrumb({ items }: { items: Crumb[] }) {
  const all: Crumb[] = [{ name: "Beranda", path: "/" }, ...items];
  return (
    <nav aria-label="Breadcrumb" className="container-page py-3">
      <JsonLd data={breadcrumbLd(all)} />
      <ol className="flex flex-wrap items-center gap-1 text-sm text-brand-muted">
        {all.map((c, i) => {
          const last = i === all.length - 1;
          return (
            <li key={c.path} className="flex items-center gap-1">
              {i > 0 && <ChevronRight className="size-3.5 shrink-0" aria-hidden />}
              {last ? (
                <span className="font-medium text-brand-ink" aria-current="page">
                  {c.name}
                </span>
              ) : (
                <Link href={c.path} className="hover:text-brand-primary hover:underline">
                  {c.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
