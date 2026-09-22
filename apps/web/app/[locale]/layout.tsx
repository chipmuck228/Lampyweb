import type { Metadata } from "next";
import { HTML_LANG, LOCALE_PATHS } from "@/i18n/config";
import { getHomepageContent } from "@/i18n/get-content";
import { localeMetadata } from "@/i18n/metadata";
import { requireLocale } from "@/i18n/require-locale";
import { getDownloadLinksFromProcessEnv } from "@/lib/download-links";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const dynamicParams = false;

export function generateStaticParams() {
  return LOCALE_PATHS.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const locale = await requireLocale(params);
  return localeMetadata(locale);
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const locale = await requireLocale(params);
  const content = getHomepageContent(locale);
  const downloads = getDownloadLinksFromProcessEnv(content.downloads);

  return (
    <div data-locale={locale} lang={HTML_LANG[locale]}>
      <a className="skip-link" href="#main">
        {content.navigation.skipLabel}
      </a>
      <SiteHeader
        locale={locale}
        content={content.navigation}
        downloads={downloads}
      />
      {children}
      <SiteFooter locale={locale} content={content.footer} />
    </div>
  );
}
