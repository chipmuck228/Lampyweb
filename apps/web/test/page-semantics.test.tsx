import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import "@testing-library/jest-dom/vitest";
import { HomePage } from "@/components/home-page";
import { getHomepageContent } from "@/i18n/get-content";
import { getDownloadLinksFromProcessEnv } from "@/lib/download-links";
import { SECTION_IDS } from "@/lib/site-config";

function renderHome(locale: "en" | "zh-CN") {
  const content = getHomepageContent(locale);
  const downloads = getDownloadLinksFromProcessEnv(content.downloads);
  return render(<HomePage content={content} downloads={downloads} />);
}

describe("homepage semantics", () => {
  afterEach(() => {
    cleanup();
  });

  it("exposes the family relation as a named group", () => {
    renderHome("zh-CN");
    expect(
      screen.getByRole("group", {
        name: /一段生活先被留下/,
      }),
    ).toBeInTheDocument();

    cleanup();

    renderHome("en");
    expect(
      screen.getByRole("group", {
        name: /familiar voice is left after dinner/i,
      }),
    ).toBeInTheDocument();
    expect(screen.queryByText(/Share a few with your family when you want/)).toBeNull();
  });

  it("places editorial scene photos instead of svg placeholders", () => {
    const { container } = renderHome("zh-CN");
    const images = [...container.querySelectorAll("img")].map((img) => ({
      src: img.getAttribute("src"),
      alt: img.getAttribute("alt"),
    }));

    expect(images).toEqual(
      expect.arrayContaining([
        {
          src: "/scenes/evening-window.jpg",
          alt: "窗边的一杯水，窗外下着雨。",
        },
        {
          src: "/scenes/open-notebook.jpg",
          alt: "桌上打开的空白笔记本和一支钢笔。",
        },
        {
          src: "/scenes/cup-and-phone.jpg",
          alt: "桌上的杯子和手机。",
        },
        {
          src: "/scenes/family-table.jpg",
          alt: "晚饭后，两个人坐在桌边说话。",
        },
      ]),
    );
    expect(container.querySelector("#capture svg")).toBeNull();
  });

  it("renders a single h1 and the required sections for Chinese", () => {
    const { container } = renderHome("zh-CN");

    expect(container.querySelectorAll("h1")).toHaveLength(1);
    expect(container.querySelector("h1")?.textContent).toBe(
      "这里，留下自己的生活。",
    );

    for (const id of Object.values(SECTION_IDS)) {
      expect(container.querySelector(`#${id}`)).not.toBeNull();
    }
  });

  it("renders the English hero on the shared homepage", () => {
    const { container } = renderHome("en");

    expect(container.querySelectorAll("h1")).toHaveLength(1);
    expect(container.querySelector("h1")?.textContent).toBe(
      "A quiet place for the life you don’t post.",
    );
  });

  it("does not leave key Chinese copy on the English homepage", () => {
    const { container } = renderHome("en");
    const text = container.textContent ?? "";

    expect(text).not.toContain("这里，留下自己的生活");
    expect(text).not.toContain("为什么是 Lampy");
    expect(text).not.toContain("即将开放");
    expect(text).not.toContain("正在准备");
    expect(text).not.toContain("不表演、不评价");
    expect(text).not.toContain("杭州");
    expect(text).not.toContain("温哥华");
  });

  it("does not leave key English body copy on the Chinese homepage", () => {
    const { container } = renderHome("zh-CN");
    const text = container.textContent ?? "";

    expect(text).not.toContain("A quiet place for the life you don’t post");
    expect(text).not.toContain("Coming soon");
    expect(text).not.toContain("Coming to iOS");
    expect(text).not.toContain("Coming to Android");
    expect(text).not.toContain("Made for ordinary life");
    expect(text).not.toContain("Why Lampy");
    expect(text).not.toContain("Hangzhou");
    expect(text).not.toContain("Vancouver");
  });

  it("keeps Family, Voice, Principles, and Download titles queryable", () => {
    const zh = renderHome("zh-CN").container;
    const en = renderHome("en").container;

    expect(zh.querySelector("#family-title")?.textContent).toBe(
      "有些生活，只想交给重要的人。",
    );
    expect(zh.querySelector("#voice-title")?.textContent).toBe(
      "留下今天，以后还能听见。",
    );
    expect(zh.querySelector("#principles-title")?.textContent).toBe(
      "Lampy 对普通生活的四个承诺",
    );
    expect(zh.querySelector("#download-title")?.textContent).toBe(
      "想起什么的时候，再回来就好。",
    );

    expect(en.querySelector("#family-title")?.textContent).toBe(
      "Some moments are only for the people who matter.",
    );
    expect(en.querySelector("#voice-title")?.textContent).toBe(
      "Hear a moment, and the room comes back.",
    );
    expect(en.querySelector("#principles-title")?.textContent).toBe(
      "Made for ordinary life.",
    );
    expect(en.querySelector("#download-title")?.textContent).toBe(
      "Keep today. Come back when it becomes yesterday.",
    );
  });

  it("does not expose placeholder store URLs and shows pending download status", () => {
    const { container } = renderHome("zh-CN");
    const namedLinks = [...container.querySelectorAll("a")].map((link) => ({
      href: link.getAttribute("href"),
      name: link.textContent?.trim(),
    }));

    expect(container.innerHTML).not.toContain("example.com");
    expect(container.querySelector("a[data-platform]")).toBeNull();
    expect(container.textContent).toMatch(/iOS/);
    expect(container.textContent).toMatch(/即将开放/);
    expect(container.textContent).toMatch(/Android/);
    expect(container.textContent).toMatch(/正在准备/);
    expect(container.textContent).not.toMatch(/立即下载/);
    expect(namedLinks.every((link) => Boolean(link.name))).toBe(true);
  });

  it("uses the same centralized download configuration in hero and download section", () => {
    const expected = getDownloadLinksFromProcessEnv(
      getHomepageContent("zh-CN").downloads,
    );
    const { container } = renderHome("zh-CN");
    const groups = container.querySelectorAll("[data-download-actions='true']");

    expect(groups.length).toBeGreaterThanOrEqual(2);
    for (const group of groups) {
      expect(group.textContent).toContain(expected.ios.label);
      expect(group.textContent).toContain(expected.ios.statusLabel);
      expect(group.textContent).toContain(expected.android.label);
      expect(group.textContent).toContain(expected.android.statusLabel);
    }
  });
});
