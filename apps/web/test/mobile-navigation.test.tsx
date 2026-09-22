import { cleanup, fireEvent, render } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { MobileNavigation } from "@/components/mobile-navigation";
import { SiteHeader } from "@/components/site-header";
import { getHomepageContent } from "@/i18n/get-content";
import { getDownloadLinksFromProcessEnv } from "@/lib/download-links";

const download = getDownloadLinksFromProcessEnv(
  getHomepageContent("zh-CN").downloads,
).ios;

describe("mobile navigation copy", () => {
  afterEach(() => {
    cleanup();
    document.body.classList.remove("nav-open");
  });

  it("shows 菜单 and uses a complete Chinese accessible name", () => {
    const content = getHomepageContent("zh-CN");
    const { getByRole } = render(
      <SiteHeader
        locale="zh-CN"
        content={content.navigation}
        downloads={getDownloadLinksFromProcessEnv(content.downloads)}
      />,
    );
    const button = getByRole("button", { name: "打开导航菜单", hidden: true });

    expect(button.textContent).toBe("菜单");
    expect(button.getAttribute("aria-expanded")).toBe("false");
  });

  it("shows Menu and uses a complete English accessible name", () => {
    const content = getHomepageContent("en");
    const { getByRole } = render(
      <SiteHeader
        locale="en"
        content={content.navigation}
        downloads={getDownloadLinksFromProcessEnv(content.downloads)}
      />,
    );
    const button = getByRole("button", { name: "Open navigation menu", hidden: true });

    expect(button.textContent).toBe("Menu");
    expect(button.getAttribute("aria-expanded")).toBe("false");
  });

  it("switches the visible label and accessible name when opened", () => {
    const { getByRole } = render(
      <MobileNavigation
        items={[{ href: "#time", label: "时间" }]}
        download={download}
        menuOpen="菜单"
        menuClose="关闭"
        menuOpenAria="打开导航菜单"
        menuCloseAria="关闭导航菜单"
        ariaLabel="移动端章节"
      />,
    );

    const button = getByRole("button", { name: "打开导航菜单", hidden: true });
    fireEvent.click(button);

    const close = getByRole("button", { name: "关闭导航菜单", hidden: true });
    expect(close.textContent).toBe("关闭");
    expect(close.getAttribute("aria-expanded")).toBe("true");
  });
});
