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
      className={`${styles.section} section-enter`}
      aria-labelledby="voice-title"
    >
      <div className="page-shell">
        <h2 id="voice-title" className={`section-heading ${styles.title}`}>
          {content.title}
        </h2>
        <p className={`${styles.body} prose`}>{content.body}</p>
        <div className={styles.cue} aria-label={content.cueAria}>
          <span className={styles.dot} aria-hidden="true" />
          <svg
            className={styles.line}
            viewBox="0 0 480 36"
            width="480"
            height="36"
            aria-hidden="true"
            focusable="false"
          >
            <path
              d="M2 20h28l10-8 12 14 14-18 16 16 20-10 18 8 22-14 18 12 24-6 20 10 28-16 22 12 26-8 20 14 32-12 24 6 28-10 22 12 18-6"
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
