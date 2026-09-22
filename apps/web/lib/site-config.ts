export const SITE_NAME = "Lampy";

export const SITE_TITLE = "Lampy｜这里，留下自己的生活";

export const SITE_DESCRIPTION =
  "用一句话、最多三张照片或一段声音，留下不需要发布的普通生活。";

export const SITE_TAGLINE = "这里，留下自己的生活。";

export const SITE_POSITIONING =
  "写下一句话，留一张照片或一段声音。不必发布，也不用把生活讲得精彩。先把今天留下，以后再回来看看。";

export const FOOTER_DISCLAIMER =
  "本网站介绍产品方向，具体功能以正式版本为准。";

export const DEFAULT_SITE_URL = "http://localhost:3000";
export const DEFAULT_IOS_APP_URL = "https://example.com/lampy/ios";
export const DEFAULT_ANDROID_APP_URL = "https://example.com/lampy/android";

export const NAV_ITEMS = [
  { href: "#why-lampy", label: "为什么是 Lampy" },
  { href: "#capture", label: "留下什么" },
  { href: "#time", label: "时间" },
  { href: "#family", label: "家庭" },
  { href: "#download", label: "下载" },
] as const;

export const SECTION_IDS = {
  why: "why-lampy",
  capture: "capture",
  time: "time",
  family: "family",
  voice: "voice",
  principles: "principles",
  download: "download",
} as const;

export function resolveSiteUrl(value?: string): string {
  const trimmed = value?.trim();
  if (!trimmed) {
    return DEFAULT_SITE_URL;
  }

  return trimmed.replace(/\/$/, "");
}
