import type { MetadataRoute } from "next";
import { SITE_NAME } from "@/lib/site-config";
import { getHomepageContent } from "@/i18n/get-content";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  const english = getHomepageContent("en");

  return {
    name: SITE_NAME,
    short_name: SITE_NAME,
    description: english.metadata.description,
    start_url: "/en",
    display: "browser",
    background_color: "#f3f0e9",
    theme_color: "#f3f0e9",
    lang: "en",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
