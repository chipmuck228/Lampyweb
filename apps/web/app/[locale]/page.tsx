import { getHomepageContent } from "@/i18n/get-content";
import { requireLocale } from "@/i18n/require-locale";
import { getDownloadLinksFromProcessEnv } from "@/lib/download-links";
import { HomePage } from "@/components/home-page";

export default async function LocaleHomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = await requireLocale(params);
  const content = getHomepageContent(locale);
  const downloads = getDownloadLinksFromProcessEnv(content.downloads);

  return <HomePage content={content} downloads={downloads} />;
}
