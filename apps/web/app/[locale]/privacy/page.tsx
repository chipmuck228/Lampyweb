import type { Metadata } from "next";
import { getLegalDocument } from "@/content/legal";
import { localeMetadata } from "@/i18n/metadata";
import { requireLocale } from "@/i18n/require-locale";
import { LegalPage } from "@/components/legal-page";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const locale = await requireLocale(params);
  const document = getLegalDocument(locale, "privacy");

  return {
    ...localeMetadata(locale, "/privacy"),
    title: `${document.title} | Lampy`,
    description: document.summary,
  };
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = await requireLocale(params);
  const document = getLegalDocument(locale, "privacy");

  return <LegalPage document={document} />;
}
