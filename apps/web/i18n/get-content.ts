import { enHomepage } from "@/content/en/homepage";
import { zhCNHomepage } from "@/content/zh-CN/homepage";
import type { HomepageContent, SupportedLocale } from "@/i18n/types";

const CONTENT: Record<SupportedLocale, HomepageContent> = {
  en: enHomepage,
  "zh-CN": zhCNHomepage,
};

export function getHomepageContent(locale: SupportedLocale): HomepageContent {
  const content = CONTENT[locale];
  if (!content) {
    throw new Error(`Missing homepage content for locale: ${locale}`);
  }
  return content;
}
