import type { HomepageContent } from "@/i18n/types";
import styles from "./life-fragments.module.css";

type LifeFragmentsProps = {
  content: HomepageContent["lifeFragments"];
};

export function LifeFragments({ content }: LifeFragmentsProps) {
  return (
    <aside className={styles.composition} aria-label={content.ariaLabel}>
      <p className={styles.date}>
        <time dateTime={content.dateTime}>{content.date}</time>
        <span aria-hidden="true"> / </span>
        <span>{content.weekday}</span>
      </p>
      <p className={styles.note}>{content.note}</p>
      <div className={styles.scene}>
        <img
          src="/scenes/evening-window.jpg"
          alt={content.sceneAlt}
          width={1024}
          height={686}
          decoding="async"
        />
      </div>
      <p className={styles.sound}>
        <span className={styles.soundMark} aria-hidden="true" />
        <span>{content.sound}</span>
      </p>
      <p className={styles.caption}>{content.caption}</p>
    </aside>
  );
}
