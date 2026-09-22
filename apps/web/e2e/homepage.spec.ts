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

    const toggle = page.getByRole("button", { name: /导航菜单/ });
    await expect(toggle).toHaveText("菜单");
    await expect(toggle).toHaveAccessibleName("打开导航菜单");
    await expect(toggle).toHaveCSS("min-height", "44px");
    await toggle.click();
    await expect(toggle).toHaveAttribute("aria-expanded", "true");
    await expect(toggle).toHaveAccessibleName("关闭导航菜单");
    await expect(toggle).toHaveText("关闭");
    await expect(page.getByRole("navigation", { name: "移动端章节" })).toBeVisible();

    await page.getByRole("navigation", { name: "移动端章节" }).getByRole("link", {
      name: "时间",
    }).click();
    await expect(toggle).toHaveAttribute("aria-expanded", "false");
    await expect(toggle).toHaveAccessibleName("打开导航菜单");
  });

  test("returns focus to the menu button after Escape", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/en");

    const toggle = page.getByRole("button", { name: /navigation menu/i });
    await expect(toggle).toHaveText("Menu");
    await expect(toggle).toHaveAccessibleName("Open navigation menu");
    await toggle.click();
    await expect(toggle).toHaveAccessibleName("Close navigation menu");
    await expect(toggle).toHaveText("Close");
    await page.keyboard.press("Escape");
    await expect(toggle).toBeFocused();
    await expect(toggle).toHaveAttribute("aria-expanded", "false");
    await expect(toggle).toHaveAccessibleName("Open navigation menu");
  });

  test("does not name cities in the family section", async ({ page }) => {
    await page.goto("/zh-cn");
    await expect(page.locator("#family")).toContainText("晚饭后 · 留下一段声音");
    await expect(
      page.getByRole("group", { name: /一段生活先被留下/ }),
    ).toBeVisible();
    await expect(page.locator("body")).not.toContainText("杭州");
    await expect(page.locator("body")).not.toContainText("温哥华");

    await page.goto("/en");
    await expect(page.locator("#family")).toContainText("After dinner · a familiar voice");
    await expect(page.getByRole("group", { name: /familiar voice is left after dinner/i })).toBeVisible();
    await expect(page.locator("body")).not.toContainText("Hangzhou");
    await expect(page.locator("body")).not.toContainText("Vancouver");
  });

  test("keeps later section titles queryable", async ({ page }) => {
    await page.goto("/zh-cn");
    await expect(
      page.getByRole("heading", { name: "有些生活，只想交给重要的人。" }),
    ).toBeVisible();
    await expect(page.getByRole("heading", { name: "留下今天，以后还能听见。" })).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "想起什么的时候，再回来就好。" }),
    ).toBeVisible();

    await page.goto("/en");
    await expect(
      page.getByRole("heading", { name: "Hear a moment, and the room comes back." }),
    ).toBeVisible();
    await expect(page.getByRole("heading", { name: "Made for ordinary life." })).toBeVisible();
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

  test("keeps the hero readable on first paint", async ({ page }) => {
    for (const path of ["/en", "/zh-cn"]) {
      await page.goto(path);
      const hero = page.locator("h1");
      await expect(hero).toBeVisible();
      const opacity = await hero.evaluate((node) => Number(getComputedStyle(node).opacity));
      expect(opacity, `${path} hero faded`).toBeGreaterThanOrEqual(0.9);
      await expect(page.getByText(/iOS/i).first()).toBeVisible();
    }
  });

  test("reveals a below-the-fold section once and keeps it shown", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/zh-cn");

    const family = page.locator("#family");
    await expect(family).toHaveAttribute("data-reveal-ready", "true");
    await expect(family).toHaveAttribute("data-revealed", "false");

    await family.scrollIntoViewIfNeeded();
    await expect(family).toHaveAttribute("data-revealed", "true");

    await page.evaluate(() => window.scrollTo(0, 0));
    await expect(family).toHaveAttribute("data-revealed", "true");

    await family.scrollIntoViewIfNeeded();
    await expect(family).toHaveAttribute("data-revealed", "true");
  });

  test("disables entrance motion when reduce motion is requested", async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/en");
    const heroAnimation = await page.locator("h1").evaluate((node) => {
      return getComputedStyle(node.closest("section") ?? node).animationName;
    });
    expect(heroAnimation === "none" || heroAnimation === "").toBeTruthy();
    await expect(page.locator('[data-revealed="false"]')).toHaveCount(0);
    const familyMotion = await page.locator("#family").evaluate((node) => {
      const style = getComputedStyle(node);
      return {
        opacity: Number(style.opacity),
        duration: style.transitionDuration,
      };
    });
    expect(familyMotion.opacity).toBeGreaterThanOrEqual(0.99);
    expect(familyMotion.duration === "0s" || familyMotion.duration === "").toBeTruthy();
  });

  test("shows Family immediately when opened from a hash", async ({ page }) => {
    await page.goto("/zh-cn#family");
    await expect(page.locator("#family")).toHaveAttribute("data-revealed", "true");
    await expect(page.locator("#family-title")).toBeInViewport();
  });

  test("does not leave an anchored header target waiting", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/zh-cn");
    await page.getByRole("navigation", { name: "页面章节" }).getByRole("link", {
      name: "家庭",
    }).click();
    await expect(page).toHaveURL(/#family/);
    await expect(page.locator("#family")).toHaveAttribute("data-revealed", "true");
    await expect(page.locator("#family-title")).toBeInViewport();
  });

  test("captures reveal review screenshots", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/zh-cn");
    await expect(page.locator("h1")).toBeVisible();
    await expect(page.locator("#family")).toHaveAttribute("data-revealed", "false");
    await page.screenshot({
      path: "artifacts/reveal-zh-before-scroll-390.png",
      fullPage: false,
    });

    await page.locator("#family").scrollIntoViewIfNeeded();
    await expect(page.locator("#family")).toHaveAttribute("data-revealed", "true");
    await page.screenshot({
      path: "artifacts/reveal-zh-family-390.png",
      fullPage: false,
    });

    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto("/en");
    await page.locator("#time").scrollIntoViewIfNeeded();
    await expect(page.locator("#time")).toHaveAttribute("data-revealed", "true");
    await page.screenshot({
      path: "artifacts/reveal-en-time-768.png",
      fullPage: false,
    });

    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/en");
    await expect(page.locator("h1")).toBeVisible();
    await page.screenshot({
      path: "artifacts/reveal-en-desktop-1440.png",
      fullPage: true,
    });
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
      path: "artifacts/refinement-en-mobile-390.png",
      fullPage: true,
    });

    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/zh-cn");
    await page.screenshot({
      path: "artifacts/refinement-zh-mobile-390.png",
      fullPage: true,
    });

    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto("/en");
    await page.screenshot({
      path: "artifacts/refinement-en-tablet-768.png",
      fullPage: true,
    });

    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/zh-cn");
    await page.screenshot({
      path: "artifacts/refinement-zh-desktop-1440.png",
      fullPage: true,
    });
  });
});

test.describe("Lampy homepage without JavaScript", () => {
  test.use({ javaScriptEnabled: false });

  test("keeps static locale pages readable", async ({ page }) => {
    await page.goto("/zh-cn");
    await expect(page.locator("h1")).toHaveText("这里，留下自己的生活。");
    await expect(page.locator("#why-lampy")).toBeVisible();
    await expect(page.locator("#family")).toBeVisible();
    await expect(page.locator("#download")).toBeVisible();

    const hidden = await page.evaluate(() => {
      return [...document.querySelectorAll("h1, #why-lampy, #family, #download")].some(
        (node) => Number(getComputedStyle(node).opacity) === 0,
      );
    });
    expect(hidden).toBe(false);
    await expect(page.locator("#family")).not.toHaveAttribute("data-revealed", "false");

    await page.goto("/en");
    await expect(page.locator("h1")).toHaveText(
      "A quiet place for the life you don’t post.",
    );
    await page.locator('a[href="/zh-cn"]').first().click();
    await expect(page).toHaveURL(/\/zh-cn\/?/);
  });
});
