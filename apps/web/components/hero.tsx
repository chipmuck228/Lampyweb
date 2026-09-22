import type { DownloadLinks } from "@/lib/download-links";
import type { HomepageContent } from "@/i18n/types";
import { DownloadActions } from "@/components/download-actions";
import { LifeFragments } from "@/components/life-fragments";
import styles from "./hero.module.css";

type HeroProps = {
  content: HomepageContent["hero"];
  fragments: HomepageContent["lifeFragments"];
  downloads: DownloadLinks;
};

export function Hero({ content, fragments, downloads }: HeroProps) {
  return (
    <section className={`${styles.hero} hero-enter`} aria-labelledby="hero-title">
      <div className="page-shell">
        <div className={styles.grid}>
          <div className={styles.copy}>
            {content.eyebrow ? <p className={styles.eyebrow}>{content.eyebrow}</p> : null}
            <h1 id="hero-title" className={styles.title}>
              {content.title}
            </h1>
            <p className={styles.lead}>
              {content.descriptionLines.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </p>
            <DownloadActions downloads={downloads} />
          </div>
          <LifeFragments content={fragments} />
        </div>
      </div>
    </section>
  );
}
