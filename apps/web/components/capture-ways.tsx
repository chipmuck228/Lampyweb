import { SECTION_IDS } from "@/lib/site-config";
import type { HomepageContent } from "@/i18n/types";
import styles from "./capture-ways.module.css";

type CaptureWaysProps = {
  content: HomepageContent["capture"];
};

export function CaptureWays({ content }: CaptureWaysProps) {
  return (
    <section
      id={SECTION_IDS.capture}
      className={styles.section}
      data-reveal
      data-reveal-kind="capture"
      aria-labelledby="capture-title"
    >
      <div className="page-shell">
        <h2 id="capture-title" className={`section-heading ${styles.title}`}>
          {content.title}
        </h2>
        <p className={`${styles.intro} prose`}>{content.intro}</p>
        <div className={styles.layout}>
          <article className={styles.write}>
            <h3>{content.writeTitle}</h3>
            <p>{content.writeBody}</p>
            <img
              className={styles.still}
              src="/scenes/open-notebook.jpg"
              alt={content.writeImageAlt}
              width={1024}
              height={686}
              decoding="async"
              loading="lazy"
            />
          </article>
          <article className={styles.photo}>
            <h3>{content.photoTitle}</h3>
            <p>{content.photoBody}</p>
            <div className={styles.frames}>
              <img
                src="/scenes/cup-and-phone.jpg"
                alt={content.photoImageAlt}
                width={1024}
                height={686}
                decoding="async"
                loading="lazy"
              />
            </div>
          </article>
          <article className={styles.voice}>
            <h3>{content.voiceTitle}</h3>
            <p>{content.voiceBody}</p>
            <div className={styles.wave} aria-hidden="true" />
          </article>
        </div>
      </div>
    </section>
  );
}
