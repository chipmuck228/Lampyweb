import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { LanguageSwitch } from "@/components/language-switch";
import { SiteHeader } from "@/components/site-header";
import { getHomepageContent } from "@/i18n/get-content";
import { getDownloadLinksFromProcessEnv } from "@/lib/download-links";

describe("language switch", () => {
  it("points from English to the Chinese homepage", () => {
    const { container } = render(
      <LanguageSwitch
        locale="en"
        label="中文"
        ariaLabel="Switch to Chinese"
      />,
    );
    const link = container.querySelector("a");

    expect(link?.getAttribute("href")).toBe("/zh-cn");
    expect(link?.getAttribute("aria-label")).toBe("Switch to Chinese");
    expect(link?.getAttribute("hreflang")).toBe("zh-CN");
    expect(link?.textContent).toBe("中文");
  });

  it("points from Chinese to the English homepage", () => {
    const { container } = render(
      <LanguageSwitch
        locale="zh-CN"
        label="EN"
        ariaLabel="Switch to English"
      />,
    );
    const link = container.querySelector("a");

    expect(link?.getAttribute("href")).toBe("/en");
    expect(link?.getAttribute("aria-label")).toBe("Switch to English");
    expect(link?.getAttribute("hreflang")).toBe("en");
    expect(link?.textContent).toBe("EN");
  });

  it("exposes a real language link in the shared header", () => {
    const content = getHomepageContent("en");
    const { container } = render(
      <SiteHeader
        locale="en"
        content={content.navigation}
        downloads={getDownloadLinksFromProcessEnv(content.downloads)}
      />,
    );
    const link = container.querySelector('a[aria-label="Switch to Chinese"]');

    expect(link?.getAttribute("href")).toBe("/zh-cn");
    expect(link?.textContent).toBe("中文");
  });
});
