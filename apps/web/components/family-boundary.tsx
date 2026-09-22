import { SECTION_IDS } from "@/lib/site-config";
import type { HomepageContent } from "@/i18n/types";
import styles from "./family-boundary.module.css";

type FamilyBoundaryProps = {
  content: HomepageContent["family"];
};

export function FamilyBoundary({ content }: FamilyBoundaryProps) {
  return (
    <section
      id={SECTION_IDS.family}
      className={styles.section}
      data-reveal
      data-reveal-kind="family"
      aria-labelledby="family-title"
    >
      <div className="page-shell">
        <h2 id="family-title" className={`section-heading ${styles.title}`}>
          {content.title}
        </h2>
        <p className={`${styles.body} prose`}>{content.body}</p>
        <div
          className={styles.relation}
          role="group"
          aria-label={content.relationAria}
        >
          <div className={styles.moment}>
            {content.fromLead ? <p className={styles.lead}>{content.fromLead}</p> : null}
            <p className={styles.phrase}>{content.from}</p>
          </div>
          <div className={styles.span} aria-hidden="true">
            <span className={styles.spanLine} />
          </div>
          <div className={styles.moment}>
            {content.toLead ? <p className={styles.lead}>{content.toLead}</p> : null}
            <p className={styles.phrase}>{content.to}</p>
          </div>
        </div>
        <p className={styles.status}>{content.status}</p>
      </div>
    </section>
  );
}
