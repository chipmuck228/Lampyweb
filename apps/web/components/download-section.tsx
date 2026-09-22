import type { DownloadLinks } from "@/lib/download-links";
import type { HomepageContent } from "@/i18n/types";
import { SECTION_IDS } from "@/lib/site-config";
import { DownloadActions } from "@/components/download-actions";
import styles from "./download-section.module.css";

type DownloadSectionProps = {
  content: HomepageContent["downloads"];
  downloads: DownloadLinks;
};

export function DownloadSection({ content, downloads }: DownloadSectionProps) {
  return (
    <section
      id={SECTION_IDS.download}
      className={`${styles.section} section-enter`}
      aria-labelledby="download-title"
    >
      <div className="page-shell">
        <h2 id="download-title" className={`section-heading ${styles.title}`}>
          {content.title}
        </h2>
        <p className={`${styles.body} prose`}>
          {downloads.isLive ? content.bodyLive : content.body}
        </p>
        <div
          className={styles.platforms}
          data-state={downloads.isLive ? "live" : "pending"}
        >
          <DownloadActions downloads={downloads} />
        </div>
      </div>
    </section>
  );
}
