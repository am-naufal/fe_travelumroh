/**
 * Builder JSON-LD — PRD §11.
 * Tipe dari `schema-dts`. Render via <JsonLd> (components/seo/json-ld.tsx)
 * yang meng-escape "<" → "<" (rekomendasi Next.js).
 */
import type {
  Article,
  BreadcrumbList,
  FAQPage,
  Product,
  TravelAgency,
  VideoObject,
  WithContext,
} from "schema-dts";
import { absoluteUrl } from "./seo";
import type { Paket } from "./cms/schema";
import { formatTanggal } from "./format";

const CTX = "https://schema.org" as const;

export function travelAgencyLd(settings: {
  nama: string;
  deskripsi: string;
  telepon: string;
  alamat: { jalan: string; kota: string; provinsi: string; kodePos: string };
  skPpiu: string;
  rating?: { nilai: number; jumlah: number };
  sosial: string[];
}): WithContext<TravelAgency> {
  return {
    "@context": CTX,
    "@type": "TravelAgency",
    name: settings.nama,
    description: settings.deskripsi,
    url: absoluteUrl("/"),
    telephone: settings.telepon,
    image: absoluteUrl("/opengraph-image"),
    address: {
      "@type": "PostalAddress",
      streetAddress: settings.alamat.jalan,
      addressLocality: settings.alamat.kota,
      addressRegion: settings.alamat.provinsi,
      postalCode: settings.alamat.kodePos,
      addressCountry: "ID",
    },
    sameAs: settings.sosial,
    ...(settings.rating
      ? {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: settings.rating.nilai,
            reviewCount: settings.rating.jumlah,
          },
        }
      : {}),
    knowsAbout: ["Umroh", "Perjalanan Ibadah", `SK PPIU ${settings.skPpiu}`],
  };
}

export function productLd(paket: Paket, opts?: { rating?: { nilai: number; jumlah: number } }): WithContext<Product> {
  const tanggalTerdekat = [...paket.keberangkatan]
    .filter((k) => k.status !== "tutup")
    .sort((a, b) => a.tanggal.localeCompare(b.tanggal))[0];

  return {
    "@context": CTX,
    "@type": "Product",
    name: paket.nama,
    description: paket.seo.description,
    image: paket.galeri.map((g) => absoluteUrl(g.src)),
    category: paket.kategori,
    brand: { "@type": "Brand", name: "Luhas" },
    offers: {
      "@type": "Offer",
      priceCurrency: "IDR",
      price: paket.hargaMulai,
      availability:
        tanggalTerdekat && tanggalTerdekat.sisaSeat > 0
          ? "https://schema.org/InStock"
          : "https://schema.org/LimitedAvailability",
      url: absoluteUrl(`/paket/${paket.slug}`),
      ...(tanggalTerdekat
        ? { priceValidUntil: tanggalTerdekat.tanggal, validFrom: new Date().toISOString().slice(0, 10) }
        : {}),
      ...(tanggalTerdekat ? { availabilityStarts: tanggalTerdekat.tanggal } : {}),
    },
    ...(opts?.rating
      ? {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: opts.rating.nilai,
            reviewCount: opts.rating.jumlah,
          },
        }
      : {}),
    additionalProperty: [
      { "@type": "PropertyValue", name: "Durasi", value: `${paket.durasiHari} hari` },
      { "@type": "PropertyValue", name: "Maskapai", value: paket.maskapai.nama },
      {
        "@type": "PropertyValue",
        name: "Hotel Makkah",
        value: `${paket.hotelMakkah.nama} (${paket.hotelMakkah.jarakMeter} m)`,
      },
      ...(tanggalTerdekat
        ? [{ "@type": "PropertyValue" as const, name: "Keberangkatan terdekat", value: formatTanggal(tanggalTerdekat.tanggal) }]
        : []),
    ],
  };
}

export function articleLd(a: {
  judul: string;
  ringkasan: string;
  slug: string;
  penulis: string;
  tanggal: string;
  gambar: string;
}): WithContext<Article> {
  return {
    "@context": CTX,
    "@type": "Article",
    headline: a.judul,
    description: a.ringkasan,
    image: absoluteUrl(a.gambar),
    datePublished: a.tanggal,
    dateModified: a.tanggal,
    author: { "@type": "Person", name: a.penulis },
    publisher: {
      "@type": "Organization",
      name: "Luhas",
      logo: { "@type": "ImageObject", url: absoluteUrl("/icon.png") },
    },
    mainEntityOfPage: absoluteUrl(`/panduan/${a.slug}`),
  };
}

export function faqLd(items: { pertanyaan: string; jawaban: string }[]): WithContext<FAQPage> {
  return {
    "@context": CTX,
    "@type": "FAQPage",
    mainEntity: items.map((i) => ({
      "@type": "Question",
      name: i.pertanyaan,
      acceptedAnswer: { "@type": "Answer", text: i.jawaban },
    })),
  };
}

export function breadcrumbLd(crumbs: { name: string; path: string }[]): WithContext<BreadcrumbList> {
  return {
    "@context": CTX,
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: absoluteUrl(c.path),
    })),
  };
}

export function videoLd(v: {
  judul: string;
  deskripsi: string;
  thumbnail: string;
  tanggalUnggah: string;
  durasiISO?: string;
  contentUrl?: string;
}): WithContext<VideoObject> {
  return {
    "@context": CTX,
    "@type": "VideoObject",
    name: v.judul,
    description: v.deskripsi,
    thumbnailUrl: absoluteUrl(v.thumbnail),
    uploadDate: v.tanggalUnggah,
    ...(v.durasiISO ? { duration: v.durasiISO } : {}),
    ...(v.contentUrl ? { contentUrl: absoluteUrl(v.contentUrl) } : {}),
  };
}
