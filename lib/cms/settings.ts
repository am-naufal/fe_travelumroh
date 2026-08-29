import "server-only";
import { cache } from "react";
import { readJsonFile } from "./_fs";
import { pengaturanSitusSchema, type PengaturanSitus } from "./schema";

/** Di-memo per request (dipakai layout + banyak halaman). */
export const getSettings = cache(async (): Promise<PengaturanSitus> => {
  return readJsonFile("settings.json", pengaturanSitusSchema);
});
