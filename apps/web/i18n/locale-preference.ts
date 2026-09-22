import {
  DEFAULT_LOCALE,
  LOCALE_COOKIE,
  localeFromPath,
} from "@/i18n/config";
import type { SupportedLocale } from "@/i18n/types";

export function parseLocaleCookie(cookieHeader?: string | null): SupportedLocale | null {
  if (!cookieHeader) {
    return null;
  }

  const parts = cookieHeader.split(";");
  for (const part of parts) {
    const [rawName, ...rest] = part.trim().split("=");
    if (rawName !== LOCALE_COOKIE) {
      continue;
    }

    const value = rest.join("=");
    if (value === "en" || value === "zh-CN") {
      return value;
    }
    if (value === "zh-cn") {
      return "zh-CN";
    }
  }

  return null;
}

export function parseAcceptLanguage(header?: string | null): SupportedLocale | null {
  if (!header) {
    return null;
  }

  const tokens = header
    .split(",")
    .map((entry) => {
      const [range, ...params] = entry.trim().split(";");
      const qParam = params.find((param) => param.trim().startsWith("q="));
      const quality = qParam ? Number(qParam.trim().slice(2)) : 1;
      return { range: range?.toLowerCase() ?? "", quality };
    })
    .filter((entry) => entry.range)
    .sort((a, b) => b.quality - a.quality);

  for (const token of tokens) {
    if (token.range === "en" || token.range.startsWith("en-")) {
      return "en";
    }
    if (token.range === "zh" || token.range.startsWith("zh-")) {
      return "zh-CN";
    }
  }

  return null;
}

export function resolvePreferredLocale(input: {
  cookie?: string | null;
  acceptLanguage?: string | null;
}): SupportedLocale {
  return (
    parseLocaleCookie(input.cookie) ??
    parseAcceptLanguage(input.acceptLanguage) ??
    DEFAULT_LOCALE
  );
}

export function localeFromUnknownSegment(value: string): SupportedLocale | null {
  return localeFromPath(value);
}
