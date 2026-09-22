import type { DownloadLinks } from "@/lib/download-links";
import type { HomepageContent } from "@/i18n/types";
import { CaptureWays } from "@/components/capture-ways";
import { DownloadSection } from "@/components/download-section";
import { FamilyBoundary } from "@/components/family-boundary";
import { Hero } from "@/components/hero";
import { ManifestoSection } from "@/components/manifesto-section";
import { ProductPrinciples } from "@/components/product-principles";
import { TimeAccumulation } from "@/components/time-accumulation";
import { VoiceSection } from "@/components/voice-section";

type HomePageProps = {
  content: HomepageContent;
  downloads: DownloadLinks;
};

export function HomePage({ content, downloads }: HomePageProps) {
  return (
    <main id="main">
      <Hero
        content={content.hero}
        fragments={content.lifeFragments}
        downloads={downloads}
      />
      <ManifestoSection content={content.manifesto} />
      <CaptureWays content={content.capture} />
      <TimeAccumulation content={content.time} />
      <FamilyBoundary content={content.family} />
      <VoiceSection content={content.voice} />
      <ProductPrinciples content={content.principles} />
      <DownloadSection content={content.downloads} downloads={downloads} />
    </main>
  );
}
