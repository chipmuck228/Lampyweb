import type { MetadataRoute } from "next";
import { LOCALE_PATHS } from "@/i18n/config";
import { resolveSiteUrl } from "@/lib/site-config";

export const dynamic = "force-static";

const PATHS = ["", "/privacy", "/terms", "/contact"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = resolveSiteUrl(process.env.NEXT_PUBLIC_SITE_URL);
  const lastModified = new Date("2026-09-22");

  return LOCALE_PATHS.flatMap((locale) =>
    PATHS.map((path) => ({
      url: `${siteUrl}/${locale}${path}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : 0.4,
      alternates: {
        languages: {
          en: `${siteUrl}/en${path}`,
          "zh-CN": `${siteUrl}/zh-cn${path}`,
          "x-default": `${siteUrl}/en${path}`,
        },
      },
    })),
  );
}
