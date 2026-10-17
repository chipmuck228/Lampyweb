import type { SupportedLocale } from "@/i18n/types";
export const LAMPY_OPEN_ORIGIN = "https://open.yunpura.com";
export const LAMPY_TESTFLIGHT_URL = "https://testflight.apple.com/join/S5jEsS9c";
export function lampyOpenUrl(locale: SupportedLocale): string {
  return `${LAMPY_OPEN_ORIGIN}/${locale === "zh-CN" ? "zh-cn" : "en"}/install`;
}
