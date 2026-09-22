import type { LocalePath, SupportedLocale } from "@/i18n/types";

export const DEFAULT_LOCALE: SupportedLocale = "en";
export const LOCALE_COOKIE = "lampy-locale";
export const LOCALE_COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

export const LOCALE_PATHS = ["en", "zh-cn"] as const;

export const LOCALE_BY_PATH = {
  en: "en",
  "zh-cn": "zh-CN",
} as const satisfies Record<LocalePath, SupportedLocale>;

export const PATH_BY_LOCALE = {
  en: "en",
  "zh-CN": "zh-cn",
} as const satisfies Record<SupportedLocale, LocalePath>;

export const HTML_LANG = {
  en: "en",
  "zh-CN": "zh-CN",
} as const satisfies Record<SupportedLocale, string>;

export const HREFLANG = {
  en: "en",
  "zh-CN": "zh-CN",
} as const satisfies Record<SupportedLocale, string>;

export function isLocalePath(value: string): value is LocalePath {
  return value === "en" || value === "zh-cn";
}

export function localeFromPath(value: string): SupportedLocale | null {
  return isLocalePath(value) ? LOCALE_BY_PATH[value] : null;
}

export function localePath(locale: SupportedLocale): string {
  return `/${PATH_BY_LOCALE[locale]}`;
}

export function localeHref(locale: SupportedLocale, pathname = ""): string {
  return `${localePath(locale)}${pathname}`;
}

export function otherLocale(locale: SupportedLocale): SupportedLocale {
  return locale === "en" ? "zh-CN" : "en";
}
