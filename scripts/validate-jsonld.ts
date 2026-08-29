/**
 * Validasi struktur JSON-LD (PRD §11).
 * schema-dts hanya tipe; skrip ini mengecek invariant runtime: @context,
 * @type, dan properti wajib per tipe. Bukan pengganti Rich Results Test,
 * tetapi menangkap regresi bentuk.
 */
import { promises as fs } from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import {
  travelAgencyLd,
  productLd,
  articleLd,
  faqLd,
  breadcrumbLd,
  videoLd,
} from "../lib/jsonld";
import { paketSchema } from "../lib/cms/schema";

let failed = 0;
function check(name: string, cond: boolean, msg: string) {
  if (cond) console.log(`  ✓ ${name}`);
  else {
    failed++;
    console.error(`  ✖ ${name}: ${msg}`);
  }
}

function hasCtx(o: Record<string, unknown>) {
  return o["@context"] === "https://schema.org" && typeof o["@type"] === "string";
}

async function main() {
  const settingsRaw = JSON.parse(
    await fs.readFile(path.join(process.cwd(), "content/settings.json"), "utf8"),
  );

  const ta = travelAgencyLd({
    nama: settingsRaw.namaLegal,
    deskripsi: settingsRaw.deskripsiSingkat,
    telepon: `+${settingsRaw.kontak.waUtama}`,
    alamat: settingsRaw.kontak.alamat,
    skPpiu: settingsRaw.legalitas.skPpiu,
    rating: { nilai: 4.8, jumlah: 600 },
    sosial: ["https://instagram.com/x"],
  }) as unknown as Record<string, unknown>;
  check("TravelAgency @context/@type", hasCtx(ta), "salah");
  check("TravelAgency name", typeof ta.name === "string", "name hilang");
  check("TravelAgency address", typeof ta.address === "object", "address hilang");

  const pkgFile = (await fs.readdir(path.join(process.cwd(), "content/packages"))).find((f) =>
    f.endsWith(".json"),
  )!;
  const paket = paketSchema.parse(
    JSON.parse(await fs.readFile(path.join(process.cwd(), "content/packages", pkgFile), "utf8")),
  );
  const prod = productLd(paket, { rating: { nilai: 4.9, jumlah: 12 } }) as unknown as Record<string, unknown>;
  check("Product @context/@type", hasCtx(prod), "salah");
  check("Product offers.price", !!(prod.offers as Record<string, unknown>)?.price, "offer price hilang");
  check(
    "Product offers.priceCurrency=IDR",
    (prod.offers as Record<string, unknown>)?.priceCurrency === "IDR",
    "currency salah",
  );
  check("Product aggregateRating", typeof prod.aggregateRating === "object", "rating hilang");

  const artFile = (await fs.readdir(path.join(process.cwd(), "content/articles"))).find((f) =>
    /\.mdx?$/.test(f),
  )!;
  const { data } = matter(
    await fs.readFile(path.join(process.cwd(), "content/articles", artFile), "utf8"),
  );
  const art = articleLd({
    judul: data.judul,
    ringkasan: data.ringkasan,
    slug: data.slug,
    penulis: data.penulis,
    tanggal: data.tanggal instanceof Date ? data.tanggal.toISOString().slice(0, 10) : data.tanggal,
    gambar: data.gambar,
  }) as unknown as Record<string, unknown>;
  check("Article headline", typeof art.headline === "string", "headline hilang");
  check("Article datePublished", typeof art.datePublished === "string", "tanggal hilang");
  check("Article author", typeof art.author === "object", "author hilang");

  const faq = faqLd([{ pertanyaan: "P?", jawaban: "J." }]) as unknown as Record<string, unknown>;
  check("FAQPage mainEntity[]", Array.isArray(faq.mainEntity), "bukan array");
  check(
    "FAQPage Question.acceptedAnswer",
    !!((faq.mainEntity as Record<string, unknown>[])[0]?.acceptedAnswer),
    "answer hilang",
  );

  const bc = breadcrumbLd([
    { name: "Beranda", path: "/" },
    { name: "Paket", path: "/paket" },
  ]) as unknown as Record<string, unknown>;
  const items = bc.itemListElement as Record<string, unknown>[];
  check("BreadcrumbList positions", items[0].position === 1 && items[1].position === 2, "posisi salah");

  const vid = videoLd({
    judul: "T",
    deskripsi: "D",
    thumbnail: "/x.jpg",
    tanggalUnggah: "2026-01-01",
    durasiISO: "PT1M",
  }) as unknown as Record<string, unknown>;
  check("VideoObject name/thumbnailUrl/uploadDate", !!vid.name && !!vid.thumbnailUrl && !!vid.uploadDate, "properti hilang");

  if (failed > 0) {
    console.error(`\n${failed} kegagalan.`);
    process.exit(1);
  }
  console.log("\nSemua JSON-LD valid secara struktur.");
}

main();
