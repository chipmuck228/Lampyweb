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
      <div className={styles.scene} aria-hidden="true">
        <svg
          viewBox="0 0 420 300"
          width="420"
          height="300"
          role="presentation"
          focusable="false"
        >
          <rect width="420" height="300" fill="#e4dccf" />
          <rect x="0" y="0" width="420" height="188" fill="#9aa48d" />
          <rect x="0" y="0" width="420" height="78" fill="#7f8b7a" />
          <path d="M0 188h420" stroke="#d8d0c3" strokeWidth="14" />
          <rect x="286" y="0" width="52" height="188" fill="#d7cebf" opacity="0.72" />
          <rect x="38" y="214" width="86" height="10" fill="#cfc6b6" />
          <ellipse cx="68" cy="228" rx="18" ry="7" fill="#c3b8a6" />
          <rect x="58" y="204" width="20" height="26" fill="#b7ab97" />
          <path
            d="M28 168c36-16 68-8 98 6 34 16 66 8 96-10 28-16 64-14 92 6"
            fill="none"
            stroke="#d8d1c4"
            strokeWidth="1.6"
          />
        </svg>
      </div>
      <p className={styles.sound}>
        <span className={styles.soundMark} aria-hidden="true" />
        <span>{content.sound}</span>
      </p>
      <p className={styles.caption}>{content.caption}</p>
    </aside>
  );
}
