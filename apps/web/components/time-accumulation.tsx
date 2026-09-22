import { SECTION_IDS } from "@/lib/site-config";
import type { HomepageContent } from "@/i18n/types";
import styles from "./time-accumulation.module.css";

const YEAR_MARKS = [0, 0, 1, 0, 1, 1, 0, 0, 1, 0, 1, 0] as const;
const MONTH_DAYS = [
  { day: "3", filled: false },
  { day: "8", filled: true },
  { day: "12", filled: false },
  { day: "15", filled: true },
  { day: "21", filled: true },
  { day: "27", filled: false },
] as const;

type TimeAccumulationProps = {
  content: HomepageContent["time"];
};

export function TimeAccumulation({ content }: TimeAccumulationProps) {
  return (
    <section
      id={SECTION_IDS.time}
      className={`${styles.section} section-enter`}
      aria-labelledby="time-title"
    >
      <div className="page-shell">
        {content.eyebrow ? <p className={styles.eyebrow}>{content.eyebrow}</p> : null}
        <h2 id="time-title" className={`section-heading ${styles.title}`}>
          {content.title}
        </h2>
        <p className={`${styles.body} prose`}>{content.body}</p>
        <div className={styles.layers}>
          <div>
            <p className={styles.label}>{content.yearLabel}</p>
            <ol className={styles.year} aria-hidden="true">
              {YEAR_MARKS.map((mark, index) => (
                <li key={index} data-filled={mark === 1 ? "true" : "false"} />
              ))}
            </ol>
          </div>
          <div>
            <p className={styles.label}>{content.monthLabel}</p>
            <ol className={styles.month} aria-hidden="true">
              {MONTH_DAYS.map((item) => (
                <li key={item.day} data-filled={item.filled ? "true" : "false"}>
                  {item.day}
                </li>
              ))}
            </ol>
          </div>
          <blockquote className={styles.day}>
            <p className={styles.label}>{content.dayLabel}</p>
            <p>{content.dayNote}</p>
          </blockquote>
        </div>
      </div>
    </section>
  );
}
