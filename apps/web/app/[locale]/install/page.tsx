import { requireLocale } from "@/i18n/require-locale";
import { InstallPage } from "@/components/install-page";
export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  return <InstallPage locale={await requireLocale(params)} />;
}
