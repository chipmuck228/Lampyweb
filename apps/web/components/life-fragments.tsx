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
          <rect x="0" y="0" width="420" height="188" fill="#8f9a84" />
          <rect x="0" y="0" width="420" height="72" fill="#6f7b6b" />
          <rect x="24" y="18" width="372" height="154" fill="#96a28c" />
          <rect x="24" y="18" width="372" height="46" fill="#7d8974" />
          <path d="M210 18v154" stroke="#d7cebf" strokeWidth="6" />
          <path d="M24 95h372" stroke="#d7cebf" strokeWidth="5" />
          <rect x="292" y="18" width="44" height="154" fill="#d4cbbd" opacity="0.62" />
          <path d="M0 188h420" stroke="#d8d0c3" strokeWidth="16" />
          <rect x="0" y="196" width="420" height="104" fill="#e8e1d5" />
          <rect x="28" y="228" width="164" height="8" fill="#cfc6b6" />
          <rect x="48" y="214" width="22" height="28" fill="#b7ab97" />
          <path
            d="M42 226c0-10 8-16 16-16s16 6 16 16"
            fill="none"
            stroke="#a89b86"
            strokeWidth="3"
          />
          <ellipse cx="64" cy="244" rx="16" ry="6" fill="#c3b8a6" />
          <ellipse cx="118" cy="236" rx="22" ry="8" fill="#cfc6b6" />
          <rect x="104" y="228" width="28" height="6" fill="#b7ab97" />
          <path
            d="M36 164c32-12 62-6 90 6 30 14 58 8 86-8 26-14 58-12 84 6"
            fill="none"
            stroke="#d8d1c4"
            strokeWidth="1.5"
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
