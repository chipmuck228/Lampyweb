import { SECTION_IDS } from "@/lib/site-config";
import type { HomepageContent } from "@/i18n/types";
import styles from "./product-principles.module.css";

type ProductPrinciplesProps = {
  content: HomepageContent["principles"];
};

export function ProductPrinciples({ content }: ProductPrinciplesProps) {
  return (
    <section
      id={SECTION_IDS.principles}
      className={`${styles.section} section-enter`}
      aria-labelledby="principles-title"
    >
      <div className="page-shell">
        <h2
          id="principles-title"
          className={content.titleVisible ? `section-heading ${styles.visibleTitle}` : styles.srOnly}
        >
          {content.title}
        </h2>
        <ol className={styles.list}>
          {content.items.map((item, index) => (
            <li key={item.title} className={styles.item}>
              <span className={styles.index} aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
