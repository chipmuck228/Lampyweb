import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { StoreLink } from "@/components/store-link";
import { resolveDownloadLinks } from "@/lib/download-links";

describe("StoreLink", () => {
  it("renders a non-navigable status when downloads are not live", () => {
    const { ios } = resolveDownloadLinks({ downloadsLive: false });
    const { container } = render(<StoreLink link={ios} />);

    expect(container.querySelector("a")).toBeNull();
    const status = container.querySelector("[data-platform='ios']");
    expect(status?.tagName).toBe("P");
    expect(status?.getAttribute("data-live")).toBe("false");
    expect(status?.textContent).toMatch(/iOS/);
    expect(status?.textContent).toMatch(/即将开放/);
    expect(status?.textContent).not.toMatch(/立即下载/);
  });

  it("renders an official store link only when live", () => {
    const { ios } = resolveDownloadLinks({
      iosUrl: "https://apps.apple.com/app/lampy",
      downloadsLive: true,
    });
    const { container } = render(<StoreLink link={ios} />);
    const link = container.querySelector("a");

    expect(link?.getAttribute("data-live")).toBe("true");
    expect(link?.getAttribute("href")).toBe("https://apps.apple.com/app/lampy");
    expect(link?.textContent).toMatch(/在 App Store 下载/);
    expect(link?.textContent).not.toMatch(/即将开放/);
    expect(link?.getAttribute("rel")).toBe("noopener noreferrer");
  });
});
