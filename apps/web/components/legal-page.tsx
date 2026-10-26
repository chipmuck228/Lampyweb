import type { LegalDocument } from "@/content/legal";
import styles from "./legal-page.module.css";

export function LegalPage({ document }: { document: LegalDocument }) {
  return (
    <main id="main" className={`page-shell ${styles.page}`}>
      <article className={styles.article}>
        <h1 className="section-heading">{document.title}</h1>
        <p className={styles.updated}>{document.updated}</p>
        <p className="prose">{document.summary}</p>
        <p className={styles.contact}>
          {document.emailLabel}<br />
          <a href="mailto:dev@yunpura.com">dev@yunpura.com</a>
        </p>
        {document.sections.map((section) => (
          <section key={section.title} className={styles.section}>
            <h2>{section.title}</h2>
            {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </section>
        ))}
      </article>
    </main>
  );
}
