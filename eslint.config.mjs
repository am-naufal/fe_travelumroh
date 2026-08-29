import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    rules: {
      // Pola sah di aplikasi ini: membaca state khusus-klien (localStorage,
      // pathname, Embla API) SETELAH mount untuk keamanan SSR/hidrasi.
      // Rule ini menandainya sebagai potensi cascading render; kami turunkan
      // ke peringatan, bukan error yang memblokir build.
      "react-hooks/set-state-in-effect": "warn",
    },
  },
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts", "scripts/**"]),
]);

export default eslintConfig;
