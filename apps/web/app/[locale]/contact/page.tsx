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
  const document = getLegalDocument(locale, "contact");

  return {
    ...localeMetadata(locale, "/contact"),
    title: `${document.title} | Lampy`,
    description: document.summary,
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = await requireLocale(params);
  const document = getLegalDocument(locale, "contact");

  return <LegalPage document={document} />;
}
