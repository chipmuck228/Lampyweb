import { expect, test } from "@playwright/test";

test.describe("Lampy homepage locales", () => {
  test("serves the English homepage at /en", async ({ page }) => {
    await page.goto("/en");
    await expect(page.locator("html")).toHaveAttribute("lang", "en");
    await expect(page.locator("h1")).toHaveText(
      "A quiet place for the life you don’t post.",
    );
    await expect(page.locator("#why-lampy")).toBeVisible();
    await expect(page.getByRole("link", { name: "Switch to Chinese" })).toHaveAttribute(
      "href",
      "/zh-cn",
    );
    await expect(page.locator("body")).not.toContainText("这里，留下自己的生活");
  });

  test("serves the Chinese homepage at /zh-cn", async ({ page }) => {
    await page.goto("/zh-cn");
    await expect(page.locator("html")).toHaveAttribute("lang", "zh-CN");
    await expect(page.locator("h1")).toHaveText("这里，留下自己的生活。");
    await expect(page.locator("#download")).toBeVisible();
    await expect(page.getByRole("link", { name: "Switch to English" })).toHaveAttribute(
      "href",
      "/en",
    );
    await expect(page.locator("body")).not.toContainText(
      "A quiet place for the life you don’t post",
    );
  });

  test("switches from Chinese to English and back", async ({ page }) => {
    await page.goto("/zh-cn");
    await page.getByRole("link", { name: "Switch to English" }).click();
    await expect(page).toHaveURL(/\/en\/?$/);
    await expect(page.locator("h1")).toHaveText(
      "A quiet place for the life you don’t post.",
    );

    await page.getByRole("link", { name: "Switch to Chinese" }).click();
    await expect(page).toHaveURL(/\/zh-cn\/?$/);
    await expect(page.locator("h1")).toHaveText("这里，留下自己的生活。");
  });

  test("keeps the chosen language after refresh", async ({ page }) => {
    await page.goto("/en");
    await page.getByRole("link", { name: "Switch to Chinese" }).click();
    await expect(page).toHaveURL(/\/zh-cn\/?$/);
    await page.reload();
    await expect(page).toHaveURL(/\/zh-cn\/?$/);
    await expect(page.locator("html")).toHaveAttribute("lang", "zh-CN");
    await expect(page.locator("h1")).toHaveText("这里，留下自己的生活。");
  });

  test("lets a language cookie send / to the chosen homepage", async ({
    page,
    context,
  }) => {
    await context.addCookies([
      {
        name: "lampy-locale",
        value: "zh-CN",
        url: "http://127.0.0.1:3100",
      },
    ]);
    await page.goto("/");
    await expect(page).toHaveURL(/\/zh-cn\/?$/);
    await expect(page.locator("h1")).toHaveText("这里，留下自己的生活。");
  });

  test("returns 404 for an unsupported locale", async ({ page }) => {
    const response = await page.goto("/fr");
    expect(response?.status()).toBe(404);
  });

  test("moves to in-page sections from desktop navigation", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/zh-cn");
    await page.getByRole("navigation", { name: "页面章节" }).getByRole("link", {
      name: "为什么是 Lampy",
    }).click();
    await expect(page).toHaveURL(/#why-lampy/);
    await expect(page.locator("#why-lampy")).toBeInViewport();
  });

  test("opens and closes the mobile menu", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/zh-cn");

    const toggle = page.getByRole("button", { name: /菜单/ });
    await expect(toggle).toHaveCSS("min-height", "44px");
    await toggle.click();
    await expect(toggle).toHaveAttribute("aria-expanded", "true");
    await expect(page.getByRole("navigation", { name: "移动端章节" })).toBeVisible();

    await page.getByRole("navigation", { name: "移动端章节" }).getByRole("link", {
      name: "时间",
    }).click();
    await expect(page.getByRole("button", { name: /菜单/ })).toHaveAttribute(
      "aria-expanded",
      "false",
    );
  });

  test("switches language on a phone-sized viewport", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/en");
    const switcher = page.getByRole("link", { name: "Switch to Chinese" });
    await expect(switcher).toBeVisible();
    const box = await switcher.boundingBox();
    expect(box?.width).toBeGreaterThanOrEqual(44);
    expect(box?.height).toBeGreaterThanOrEqual(44);
    await switcher.click();
    await expect(page).toHaveURL(/\/zh-cn\/?$/);
  });

  test("reaches the language switch with a keyboard", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/en");
    await page.keyboard.press("Tab");
    await expect(page.getByRole("link", { name: "Skip to main content" })).toBeFocused();

    let focusedName = "";
    for (let i = 0; i < 12; i += 1) {
      await page.keyboard.press("Tab");
      focusedName = await page.evaluate(
        () => document.activeElement?.getAttribute("aria-label") ?? "",
      );
      if (focusedName === "Switch to Chinese") {
        break;
      }
    }

    expect(focusedName).toBe("Switch to Chinese");
    await page.keyboard.press("Enter");
    await expect(page).toHaveURL(/\/zh-cn\/?$/);
  });

  test("shows pending download status without placeholder store links", async ({
    page,
  }) => {
    await page.goto("/zh-cn");

    await expect(page.locator('a[href*="example.com"]')).toHaveCount(0);
    await expect(page.locator("a[data-platform]")).toHaveCount(0);
    await expect(page.getByText("即将开放").first()).toBeVisible();
    await expect(page.getByText("正在准备").first()).toBeVisible();
    await expect(page.getByText("立即下载")).toHaveCount(0);
  });

  test("does not overflow horizontally at 320px in either language", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 320, height: 720 });

    for (const path of ["/en", "/zh-cn"]) {
      await page.goto(path);
      const overflow = await page.evaluate(() => {
        return (
          document.documentElement.scrollWidth >
          document.documentElement.clientWidth + 1
        );
      });
      expect(overflow, `${path} overflowed`).toBe(false);
    }
  });

  test("disables entrance motion when reduce motion is requested", async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/en");
    const animation = await page.locator("h1").evaluate((node) => {
      return getComputedStyle(node.closest("section") ?? node).animationName;
    });
    expect(animation === "none" || animation === "").toBeTruthy();
  });

  test("has independent metadata for each language", async ({ page }) => {
    await page.goto("/en");
    await expect(page).toHaveTitle(/quiet place/i);
    const enCanonical = page.locator('link[rel="canonical"]');
    await expect(enCanonical).toHaveAttribute("href", /\/en\/?$/);

    await page.goto("/zh-cn");
    await expect(page).toHaveTitle(/留下自己的生活/);
    const zhCanonical = page.locator('link[rel="canonical"]');
    await expect(zhCanonical).toHaveAttribute("href", /\/zh-cn\/?$/);
  });

  test("captures review screenshots", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/en");
    await expect(page.locator("h1")).toBeVisible();
    await page.screenshot({
      path: "artifacts/home-en-mobile-390.png",
      fullPage: true,
    });

    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/en");
    await page.screenshot({
      path: "artifacts/home-en-desktop-1440.png",
      fullPage: true,
    });

    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/zh-cn");
    await page.screenshot({
      path: "artifacts/home-zh-mobile-390.png",
      fullPage: true,
    });
  });
});
