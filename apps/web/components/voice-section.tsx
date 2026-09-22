import { SECTION_IDS } from "@/lib/site-config";
import type { HomepageContent } from "@/i18n/types";
import styles from "./voice-section.module.css";

type VoiceSectionProps = {
  content: HomepageContent["voice"];
};

export function VoiceSection({ content }: VoiceSectionProps) {
  return (
    <section
      id={SECTION_IDS.voice}
      className={styles.section}
      data-reveal
      data-reveal-kind="voice"
      aria-labelledby="voice-title"
    >
      <div className={`page-shell ${styles.layout}`}>
        <div className={styles.copy}>
          <h2 id="voice-title" className={`section-heading ${styles.title}`}>
            {content.title}
          </h2>
          <p className={`${styles.body} prose`}>{content.body}</p>
        </div>
        <div className={styles.cue} aria-label={content.cueAria}>
          <span className={styles.dot} aria-hidden="true" />
          <svg
            className={styles.line}
            viewBox="0 0 720 40"
            width="720"
            height="40"
            aria-hidden="true"
            focusable="false"
          >
            <path
              d="M2 22h36l12-9 14 16 16-20 18 18 24-12 20 9 26-16 22 14 28-7 24 11 32-18 26 14 30-9 24 16 36-14 28 7 32-12 26 14 22-7 28 10"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            />
          </svg>
          <span className={styles.time}>{content.time}</span>
        </div>
      </div>
    </section>
  );
}
