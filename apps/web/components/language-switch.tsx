"use client";

import Link from "next/link";
import {
  HREFLANG,
  LOCALE_COOKIE,
  LOCALE_COOKIE_MAX_AGE,
  localePath,
  otherLocale,
} from "@/i18n/config";
import type { SupportedLocale } from "@/i18n/types";

type LanguageSwitchProps = {
  locale: SupportedLocale;
  label: string;
  ariaLabel: string;
  className?: string;
};

function persistLocale(locale: SupportedLocale) {
  document.cookie = `${LOCALE_COOKIE}=${locale}; Path=/; Max-Age=${LOCALE_COOKIE_MAX_AGE}; SameSite=Lax`;
}

export function LanguageSwitch({
  locale,
  label,
  ariaLabel,
  className,
}: LanguageSwitchProps) {
  const target = otherLocale(locale);
  const href = localePath(target);

  return (
    <Link
      className={className}
      href={href}
      hrefLang={HREFLANG[target]}
      lang={HREFLANG[target]}
      aria-label={ariaLabel}
      onClick={() => persistLocale(target)}
    >
      {label}
    </Link>
  );
}
