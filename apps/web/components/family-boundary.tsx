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
      className={`${styles.section} section-enter`}
      aria-labelledby="family-title"
    >
      <div className="page-shell">
        <h2 id="family-title" className={`section-heading ${styles.title}`}>
          {content.title}
        </h2>
        <p className={`${styles.body} prose`}>{content.body}</p>
        <p className={styles.relation} aria-label={content.relationAria}>
          <span>{content.from}</span>
          <span className={styles.arrow} aria-hidden="true">
            ↓
          </span>
          <span>{content.to}</span>
        </p>
        <p className={styles.status}>{content.status}</p>
      </div>
    </section>
  );
}
