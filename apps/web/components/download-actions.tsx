import type { DownloadLinks } from "@/lib/download-links";
import { StoreLink } from "@/components/store-link";
import styles from "./download-actions.module.css";

type DownloadActionsProps = {
  downloads: DownloadLinks;
  className?: string;
};

export function DownloadActions({ downloads, className }: DownloadActionsProps) {
  const classes = [styles.row, className].filter(Boolean).join(" ");

  return (
    <div className={classes} data-download-actions="true">
      <StoreLink link={downloads.ios} />
      <StoreLink link={downloads.android} />
    </div>
  );
}
