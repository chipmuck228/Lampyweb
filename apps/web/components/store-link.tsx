import type { StoreLinkModel } from "@/lib/download-links";
import styles from "./store-link.module.css";

type StoreLinkProps = {
  link: StoreLinkModel;
  className?: string;
};

export function StoreLink({ link, className }: StoreLinkProps) {
  const classes = [styles.item, className].filter(Boolean).join(" ");

  if (!link.isLive || !link.href) {
    return (
      <p
        className={classes}
        data-live="false"
        data-platform={link.platform}
      >
        <span className={styles.label}>{link.label}</span>
        {link.statusLabel ? (
          <span className={styles.status}>{link.statusLabel}</span>
        ) : null}
      </p>
    );
  }

  return (
    <a
      className={classes}
      href={link.href}
      rel={link.rel}
      target="_blank"
      data-live="true"
      data-platform={link.platform}
    >
      <span className={styles.label}>{link.label}</span>
    </a>
  );
}
