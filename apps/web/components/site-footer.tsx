import { localePath } from "@/i18n/config";
import type { HomepageContent, SupportedLocale } from "@/i18n/types";
import styles from "./site-footer.module.css";

type SiteFooterProps = {
  locale: SupportedLocale;
  content: HomepageContent["footer"];
};

export function SiteFooter({ locale, content }: SiteFooterProps) {
  const year = new Date().getFullYear();
  const home = localePath(locale);

  return (
    <footer className={styles.footer}>
      <div className={`page-shell ${styles.grid}`}>
        <div>
          <p className={styles.brand}>{content.brand}</p>
          <p className={styles.positioning}>{content.positioning}</p>
        </div>
        <nav aria-label={content.navAria}>
          <a href={`${home}/privacy`}>{content.privacy}</a>
          <a href={`${home}/terms`}>{content.terms}</a>
          <a href={`${home}/contact`}>{content.contact}</a>
        </nav>
        <p className={styles.meta}>
          © {year} {content.brand}
          <span aria-hidden="true"> · </span>
          {content.disclaimer}
        </p>
      </div>
    </footer>
  );
}
