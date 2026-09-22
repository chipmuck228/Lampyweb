import { describe, expect, it } from "vitest";
import {
  DEFAULT_LOCALE,
  LOCALE_PATHS,
  HTML_LANG,
  localeFromPath,
  localePath,
  otherLocale,
} from "@/i18n/config";
import { getHomepageContent } from "@/i18n/get-content";
import { languageAlternates, localeMetadata } from "@/i18n/metadata";
import {
  parseAcceptLanguage,
  parseLocaleCookie,
  resolvePreferredLocale,
} from "@/i18n/locale-preference";
import { localizeDownloadLinks, resolveStoreTargets } from "@/lib/download-links";

describe("locale routing", () => {
  it("maps only the supported locale paths", () => {
    expect(LOCALE_PATHS).toEqual(["en", "zh-cn"]);
    expect(localeFromPath("en")).toBe("en");
    expect(localeFromPath("zh-cn")).toBe("zh-CN");
    expect(localeFromPath("fr")).toBeNull();
    expect(localeFromPath("zh")).toBeNull();
    expect(localePath("en")).toBe("/en");
    expect(localePath("zh-CN")).toBe("/zh-cn");
    expect(otherLocale("en")).toBe("zh-CN");
    expect(HTML_LANG.en).toBe("en");
    expect(HTML_LANG["zh-CN"]).toBe("zh-CN");
    expect(DEFAULT_LOCALE).toBe("en");
  });
});

describe("locale preference", () => {
  it("prefers an explicit cookie over Accept-Language", () => {
    expect(
      resolvePreferredLocale({
        cookie: "lampy-locale=zh-CN; Path=/",
        acceptLanguage: "en-US,en;q=0.9",
      }),
    ).toBe("zh-CN");
  });

  it("reads Accept-Language when no cookie is set", () => {
    expect(parseAcceptLanguage("zh-CN,zh;q=0.9,en;q=0.8")).toBe("zh-CN");
    expect(parseAcceptLanguage("en-GB,en;q=0.8")).toBe("en");
    expect(parseLocaleCookie("theme=paper")).toBeNull();
    expect(resolvePreferredLocale({})).toBe("en");
  });
});

describe("locale metadata", () => {
  it("keeps independent titles, canonicals, and hreflang for each locale", () => {
    const en = localeMetadata("en");
    const zh = localeMetadata("zh-CN");

    expect(en.title).toBe(getHomepageContent("en").metadata.title);
    expect(zh.title).toBe(getHomepageContent("zh-CN").metadata.title);
    expect(en.title).not.toBe(zh.title);
    expect(en.alternates?.canonical).toBe("/en");
    expect(zh.alternates?.canonical).toBe("/zh-cn");
    expect(en.alternates?.languages).toEqual(languageAlternates());
    expect(zh.alternates?.languages).toEqual(languageAlternates());
    expect(en.openGraph?.locale).toBe("en");
    expect(zh.openGraph?.locale).toBe("zh_CN");
  });
});

describe("localized download copy", () => {
  it("keeps store targets centralized and independent of language", () => {
    const targets = resolveStoreTargets({ downloadsLive: false });
    const english = localizeDownloadLinks(targets, getHomepageContent("en").downloads);
    const chinese = localizeDownloadLinks(
      targets,
      getHomepageContent("zh-CN").downloads,
    );

    expect(targets.iosHref).toBeNull();
    expect(english.ios.href).toBe(chinese.ios.href);
    expect(english.ios.label).toBe("iOS");
    expect(english.ios.statusLabel).toBe("Coming soon");
    expect(chinese.ios.label).toBe("iOS");
    expect(chinese.ios.statusLabel).toBe("即将开放");
  });
});
