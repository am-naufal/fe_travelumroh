import { PackageCard } from "@/components/package/package-card";
import { SectionHeading } from "./section-heading";
import type { PackageView } from "@/lib/package-view";

// PRD §7.1 blok 3: 3–4 kartu paket dengan badge.
export function FeaturedPackages({ pakets }: { pakets: PackageView[] }) {
  return (
    <section className="container-page py-12">
      <SectionHeading
        kicker="Paket pilihan"
        title="Paket yang paling sering diambil jamaah kami"
        subtitle="Dipilih tim kami untuk keseimbangan harga, jarak hotel, dan jadwal."
        link={{ href: "/paket", label: "Lihat semua paket" }}
      />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {pakets.map((p, i) => (
          <PackageCard key={p.slug} paket={p} priority={i === 0} />
        ))}
      </div>
    </section>
  );
}
