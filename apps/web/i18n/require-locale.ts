import { notFound } from "next/navigation";
import { localeFromPath } from "@/i18n/config";
import type { SupportedLocale } from "@/i18n/types";

export async function requireLocale(
  params: Promise<{ locale: string }>,
): Promise<SupportedLocale> {
  const { locale } = await params;
  const resolved = localeFromPath(locale);

  if (!resolved) {
    notFound();
  }

  return resolved;
}
