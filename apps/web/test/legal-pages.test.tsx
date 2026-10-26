import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { LegalPage } from "@/components/legal-page";
import { getLegalDocument } from "@/content/legal";

describe("release legal pages", () => {
  for (const locale of ["en", "zh-CN"] as const) {
    for (const kind of ["privacy", "terms", "contact"] as const) {
      it(`${locale} ${kind} is structured, public and contactable without a form`, () => {
        const document = getLegalDocument(locale, kind);
        const html = renderToStaticMarkup(<LegalPage document={document} />);
        expect(html).toContain('href="mailto:dev@yunpura.com"');
        expect(html).toContain("<h2>");
        expect(html).not.toMatch(/placeholder|占位页面|联系方式尚未公布/i);
        expect(html).not.toContain("<form");
        expect(document.updated).toMatch(/2026/);
      });
    }
  }
  it("does not turn withdrawal or a rate window into a deletion guarantee", () => {
    const en = JSON.stringify(getLegalDocument("en", "privacy"));
    const zh = JSON.stringify(getLegalDocument("zh-CN", "privacy"));
    expect(en).toContain("does not guarantee immediate deletion");
    expect(en).toContain("not a deletion deadline");
    expect(en).toContain("no uniform age-based expiry");
    expect(zh).toContain("不保证对应服务端文件");
    expect(zh).toContain("当前尚未统一自动删除全部旧限流记录");
    expect(zh).toContain("历史服务器照片不保证全部清除元数据");
  });
});
