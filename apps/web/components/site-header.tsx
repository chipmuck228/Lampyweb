import type { DownloadLinks } from "@/lib/download-links";
import type { HomepageContent, SupportedLocale } from "@/i18n/types";
import { localePath } from "@/i18n/config";
import { LanguageSwitch } from "@/components/language-switch";
import { MobileNavigation } from "@/components/mobile-navigation";
import { StoreLink } from "@/components/store-link";
import styles from "./site-header.module.css";

type SiteHeaderProps = {
  locale: SupportedLocale;
  content: HomepageContent["navigation"];
  downloads: DownloadLinks;
};

export function SiteHeader({ locale, content, downloads }: SiteHeaderProps) {
  const homeHref = localePath(locale);
  const items = content.items.map((item) => ({
    ...item,
    href: item.href.startsWith("#") ? `${homeHref}${item.href}` : item.href,
  }));

  return (
    <header className={styles.header} id="top">
      <div className={`page-shell ${styles.bar}`}>
        <a className={styles.brand} href={homeHref}>
          <span className={styles.mark} aria-hidden="true" />
          <span className={styles.wordmark}>{content.brandLabel}</span>
        </a>
        <nav className={styles.desktopNav} aria-label={content.sectionsAria}>
          {items.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
        <noscript>
          <nav className={styles.noscriptNav} aria-label={content.noscriptAria}>
            {items.map((item) => (
              <a key={item.href} href={item.href}>
                {item.label}
              </a>
            ))}
          </nav>
        </noscript>
        <div className={styles.actions}>
          <LanguageSwitch
            locale={locale}
            label={content.languageLabel}
            ariaLabel={content.languageAria}
            className={styles.language}
          />
          <div className={styles.desktopDownload}>
            <StoreLink link={downloads.ios} className={styles.headerStatus} />
          </div>
          <MobileNavigation
            items={items}
            download={downloads.ios}
            menuOpen={content.menuOpen}
            menuClose={content.menuClose}
            menuOpenAria={content.menuOpenAria}
            menuCloseAria={content.menuCloseAria}
            ariaLabel={content.mobileNavAria}
          />
        </div>
      </div>
    </header>
  );
}
