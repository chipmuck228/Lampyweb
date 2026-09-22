import type { Metadata } from "next";
import { HREFLANG, localePath } from "@/i18n/config";
import { getHomepageContent } from "@/i18n/get-content";
import { SITE_NAME } from "@/lib/site-config";
import type { SupportedLocale } from "@/i18n/types";

export function languageAlternates(pathname = "") {
  return {
    [HREFLANG.en]: `/en${pathname}`,
    [HREFLANG["zh-CN"]]: `/zh-cn${pathname}`,
    "x-default": `/en${pathname}`,
  };
}

export function localeMetadata(
  locale: SupportedLocale,
  pathname = "",
): Metadata {
  const content = getHomepageContent(locale);
  const path = `${localePath(locale)}${pathname}`;

  return {
    title: content.metadata.title,
    description: content.metadata.description,
    alternates: {
      canonical: path,
      languages: languageAlternates(pathname),
    },
    openGraph: {
      title: content.metadata.ogTitle,
      description: content.metadata.ogDescription,
      locale: locale === "en" ? "en" : "zh_CN",
      alternateLocale: locale === "en" ? ["zh_CN"] : ["en"],
      url: path,
      siteName: SITE_NAME,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: content.metadata.ogTitle,
      description: content.metadata.ogDescription,
    },
  };
}
