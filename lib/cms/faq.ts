import "server-only";
import { readJsonFile } from "./_fs";
import { faqFileSchema, grupFaq, type FaqItem } from "./schema";

export async function getFaq(): Promise<FaqItem[]> {
  return readJsonFile("faq.json", faqFileSchema);
}

export async function getFaqGrouped(): Promise<{ grup: string; items: FaqItem[] }[]> {
  const all = await getFaq();
  return grupFaq.map((grup) => ({ grup, items: all.filter((i) => i.grup === grup) }));
}

/** 5 teratas untuk beranda — PRD §7.1 blok 10. */
export async function getFeaturedFaq(limit = 5): Promise<FaqItem[]> {
  const all = await getFaq();
  const unggulan = all.filter((i) => i.unggulan);
  return (unggulan.length ? unggulan : all).slice(0, limit);
}
