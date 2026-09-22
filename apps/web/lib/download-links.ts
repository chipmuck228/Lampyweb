import { getHomepageContent } from "@/i18n/get-content";
import {
  DEFAULT_ANDROID_APP_URL,
  DEFAULT_IOS_APP_URL,
} from "@/lib/site-config";
import type { HomepageContent } from "@/i18n/types";

export type StoreLinks = {
  ios: string;
  android: string;
};

export type DownloadPlatform = "ios" | "android";

export type StoreLinkModel = {
  platform: DownloadPlatform;
  href: string | null;
  label: string;
  statusLabel: string | null;
  isLive: boolean;
  rel: "noopener noreferrer";
};

export type DownloadLinks = {
  ios: StoreLinkModel;
  android: StoreLinkModel;
  isLive: boolean;
};

export type DownloadEnv = {
  iosUrl?: string | undefined;
  androidUrl?: string | undefined;
  downloadsLive?: string | boolean | undefined;
};

export type StoreTargets = {
  iosHref: string | null;
  androidHref: string | null;
  isLive: boolean;
};

function readUrl(value: string | undefined, fallback: string): string {
  const trimmed = value?.trim();
  return trimmed ? trimmed : fallback;
}

function isLiveFlag(value: string | boolean | undefined): boolean {
  if (typeof value === "boolean") {
    return value;
  }

  return value?.trim().toLowerCase() === "true";
}

export function resolveStoreTargets(env: DownloadEnv = {}): StoreTargets {
  const isLive = isLiveFlag(env.downloadsLive);

  return {
    isLive,
    iosHref: isLive ? readUrl(env.iosUrl, DEFAULT_IOS_APP_URL) : null,
    androidHref: isLive ? readUrl(env.androidUrl, DEFAULT_ANDROID_APP_URL) : null,
  };
}

export function localizeDownloadLinks(
  targets: StoreTargets,
  copy: HomepageContent["downloads"],
): DownloadLinks {
  const ios: StoreLinkModel = {
    platform: "ios",
    href: targets.iosHref,
    label: targets.isLive ? copy.iosLive : copy.iosPending,
    statusLabel: targets.isLive ? null : copy.iosPendingNote,
    isLive: targets.isLive,
    rel: "noopener noreferrer",
  };

  const android: StoreLinkModel = {
    platform: "android",
    href: targets.androidHref,
    label: targets.isLive ? copy.androidLive : copy.androidPending,
    statusLabel: targets.isLive ? null : copy.androidPendingNote,
    isLive: targets.isLive,
    rel: "noopener noreferrer",
  };

  return { ios, android, isLive: targets.isLive };
}

export function getStoreTargetsFromProcessEnv(
  env: NodeJS.ProcessEnv = process.env,
): StoreTargets {
  return resolveStoreTargets({
    iosUrl: env.NEXT_PUBLIC_IOS_APP_URL,
    androidUrl: env.NEXT_PUBLIC_ANDROID_APP_URL,
    downloadsLive: env.NEXT_PUBLIC_DOWNLOADS_LIVE,
  });
}

export function resolveDownloadLinks(
  env: DownloadEnv = {},
  copy: HomepageContent["downloads"] = getHomepageContent("zh-CN").downloads,
): DownloadLinks {
  return localizeDownloadLinks(resolveStoreTargets(env), copy);
}

export function getDownloadLinksFromProcessEnv(
  copy: HomepageContent["downloads"] = getHomepageContent("zh-CN").downloads,
  env: NodeJS.ProcessEnv = process.env,
): DownloadLinks {
  return localizeDownloadLinks(getStoreTargetsFromProcessEnv(env), copy);
}

export function usesPlaceholderUrl(href: string | null): boolean {
  if (!href) {
    return false;
  }

  return (
    href === DEFAULT_IOS_APP_URL ||
    href === DEFAULT_ANDROID_APP_URL ||
    href.includes("example.com")
  );
}
