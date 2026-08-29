import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Luhas — Travel Umroh",
    short_name: "Luhas",
    description:
      "Travel umroh resmi berizin Kemenag. Harga transparan, bisa dicicil, pendamping ramah.",
    start_url: "/",
    display: "standalone",
    background_color: "#f4f7fc",
    theme_color: "#0a5caf",
    lang: "id",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
