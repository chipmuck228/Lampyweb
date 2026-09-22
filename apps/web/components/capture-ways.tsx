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
      className={`${styles.section} section-enter`}
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
          </article>
          <article className={styles.photo}>
            <h3>{content.photoTitle}</h3>
            <p>{content.photoBody}</p>
            <div className={styles.frames} aria-hidden="true">
              <svg className={styles.wide} viewBox="0 0 240 140" width="240" height="140">
                <rect width="240" height="140" fill="#d8d1c3" />
                <rect width="240" height="58" fill="#8f9b88" />
                <rect y="58" width="240" height="18" fill="#cfc6b6" />
              </svg>
              <svg className={styles.tall} viewBox="0 0 110 168" width="110" height="168">
                <rect width="110" height="168" fill="#e0d8ca" />
                <rect x="18" y="16" width="74" height="118" fill="#7d8974" />
                <rect x="62" y="16" width="18" height="118" fill="#d4cbbd" opacity="0.7" />
              </svg>
              <svg className={styles.square} viewBox="0 0 128 128" width="128" height="128">
                <rect width="128" height="128" fill="#e8e1d5" />
                <rect x="28" y="78" width="72" height="8" fill="#cfc6b6" />
                <ellipse cx="52" cy="90" rx="14" ry="6" fill="#b7ab97" />
                <rect x="44" y="62" width="16" height="22" fill="#a89b86" />
              </svg>
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
