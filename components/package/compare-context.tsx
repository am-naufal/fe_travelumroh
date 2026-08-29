"use client";

import * as React from "react";

/**
 * State banding paket — PRD §7.4, §10.1
 * ("hindari state global kecuali untuk fitur banding paket").
 * Disimpan di localStorage agar bertahan lintas halaman.
 */
const MAX = 3; // PRD §7.4: bandingkan hingga 3 paket
const KEY = "luhas-compare-v1";

interface CompareContextValue {
  slugs: string[];
  toggle: (slug: string) => void;
  remove: (slug: string) => void;
  clear: () => void;
  has: (slug: string) => boolean;
  isFull: boolean;
  max: number;
}

const CompareContext = React.createContext<CompareContextValue | null>(null);

export function useCompare() {
  const ctx = React.useContext(CompareContext);
  if (!ctx) throw new Error("useCompare harus di dalam <CompareProvider>");
  return ctx;
}

export function CompareProvider({ children }: { children: React.ReactNode }) {
  const [slugs, setSlugs] = React.useState<string[]>([]);

  React.useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setSlugs(JSON.parse(raw));
    } catch {
      /* ignore */
    }
  }, []);

  const persist = React.useCallback((next: string[]) => {
    setSlugs(next);
    try {
      localStorage.setItem(KEY, JSON.stringify(next));
    } catch {
      /* ignore */
    }
  }, []);

  const value = React.useMemo<CompareContextValue>(
    () => ({
      slugs,
      max: MAX,
      isFull: slugs.length >= MAX,
      has: (slug) => slugs.includes(slug),
      toggle: (slug) =>
        persist(
          slugs.includes(slug)
            ? slugs.filter((s) => s !== slug)
            : slugs.length >= MAX
              ? slugs
              : [...slugs, slug],
        ),
      remove: (slug) => persist(slugs.filter((s) => s !== slug)),
      clear: () => persist([]),
    }),
    [slugs, persist],
  );

  return <CompareContext.Provider value={value}>{children}</CompareContext.Provider>;
}
