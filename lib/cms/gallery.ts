import "server-only";
import { readJsonDir } from "./_fs";
import { albumGaleriSchema, type AlbumGaleri } from "./schema";

export async function getGallery(): Promise<AlbumGaleri[]> {
  const list = await readJsonDir("gallery", albumGaleriSchema);
  return list.sort((a, b) => b.tahun - a.tahun);
}

export async function getGalleryYears(): Promise<number[]> {
  const list = await getGallery();
  return [...new Set(list.map((a) => a.tahun))].sort((a, b) => b - a);
}
