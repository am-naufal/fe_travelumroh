"use client";

import * as React from "react";
import { track } from "@/lib/analytics";

// PRD §14: event view_package saat halaman detail dibuka.
export function ViewPackageTracker({
  slug,
  price,
  category,
}: {
  slug: string;
  price: number;
  category: string;
}) {
  React.useEffect(() => {
    track({ name: "view_package", params: { package_slug: slug, price, category } });
  }, [slug, price, category]);
  return null;
}
