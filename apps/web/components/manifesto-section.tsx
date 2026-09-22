import { SECTION_IDS } from "@/lib/site-config";
import type { HomepageContent } from "@/i18n/types";
import styles from "./manifesto-section.module.css";

type ManifestoSectionProps = {
  content: HomepageContent["manifesto"];
};

function contrastLines(contrast: HomepageContent["manifesto"]["contrast"]) {
  if (!contrast) {
    return [];
  }

  return Array.isArray(contrast) ? contrast : [contrast];
}

export function ManifestoSection({ content }: ManifestoSectionProps) {
  const lines = contrastLines(content.contrast);

  return (
    <section
      id={SECTION_IDS.why}
      className={`${styles.section} section-enter`}
      aria-labelledby="manifesto-title"
    >
      <div className="page-shell">
        {content.eyebrow ? <p className={styles.eyebrow}>{content.eyebrow}</p> : null}
        {lines.length > 0 ? (
          <p className={styles.contrast}>
            {lines.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </p>
        ) : null}
        <h2 id="manifesto-title" className={`section-heading ${styles.title}`}>
          {content.title}
        </h2>
        <p className={`${styles.body} prose`}>{content.body}</p>
        <ol className={styles.scale} aria-hidden="true">
          {content.scale.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ol>
      </div>
    </section>
  );
}
