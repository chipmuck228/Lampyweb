import { describe, expect, it } from "vitest";
import {
  resolveDownloadLinks,
  usesPlaceholderUrl,
} from "@/lib/download-links";

describe("resolveDownloadLinks", () => {
  it("keeps placeholder state off the store URLs when downloads are not live", () => {
    const links = resolveDownloadLinks({
      iosUrl: "https://example.com/lampy/ios",
      androidUrl: "https://example.com/lampy/android",
      downloadsLive: "false",
    });

    expect(links.isLive).toBe(false);
    expect(links.ios.href).toBeNull();
    expect(links.android.href).toBeNull();
    expect(links.ios.label).toBe("iOS");
    expect(links.android.label).toBe("Android");
    expect(links.ios.statusLabel).toBe("即将开放");
    expect(links.android.statusLabel).toBe("正在准备");
    expect(links.ios.label).not.toMatch(/立即下载/);
    expect(links.android.label).not.toMatch(/立即下载/);
    expect(usesPlaceholderUrl(links.ios.href)).toBe(false);
  });

  it("uses official store URLs and copy only when downloads are live", () => {
    const links = resolveDownloadLinks({
      iosUrl: "https://apps.apple.com/app/lampy",
      androidUrl: "https://play.google.com/store/apps/details?id=app.lampy",
      downloadsLive: true,
    });

    expect(links.isLive).toBe(true);
    expect(links.ios.href).toBe("https://apps.apple.com/app/lampy");
    expect(links.android.href).toBe(
      "https://play.google.com/store/apps/details?id=app.lampy",
    );
    expect(links.ios.label).toBe("在 App Store 下载");
    expect(links.android.label).toBe("下载 Android 应用");
    expect(links.ios.statusLabel).toBeNull();
    expect(links.android.statusLabel).toBeNull();
    expect(links.ios.label).not.toMatch(/立即下载/);
  });
});
