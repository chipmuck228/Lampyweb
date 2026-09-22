import type { Metadata } from "next";
import { getHomepageContent } from "@/i18n/get-content";
import { localeMetadata } from "@/i18n/metadata";
import { requireLocale } from "@/i18n/require-locale";
import { LegalPage } from "@/components/legal-page";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const locale = await requireLocale(params);
  const content = getHomepageContent(locale);

  return {
    ...localeMetadata(locale, "/terms"),
    title: `${content.legal.termsTitle} | Lampy`,
    description: content.legal.termsBody,
  };
}

export default async function TermsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = await requireLocale(params);
  const content = getHomepageContent(locale).legal;

  return <LegalPage title={content.termsTitle} body={content.termsBody} />;
}
