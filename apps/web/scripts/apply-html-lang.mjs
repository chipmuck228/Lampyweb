import fs from "node:fs";
import path from "node:path";

const outDir = path.resolve(import.meta.dirname, "..", "out");

const LOCALES = [
  ["en", "en"],
  ["zh-cn", "zh-CN"],
];

function patchHtml(file, lang) {
  if (!fs.existsSync(file)) {
    return;
  }

  const html = fs.readFileSync(file, "utf8");
  const next = html.replace(/<html([^>]*)>/, (_full, attrs) => {
    const cleaned = String(attrs)
      .replace(/\slang="[^"]*"/g, "")
      .replace(/\sdata-locale="[^"]*"/g, "");
    return `<html${cleaned} lang="${lang}" data-locale="${lang}">`;
  });

  if (next !== html) {
    fs.writeFileSync(file, next);
  }
}

function walk(dir, lang) {
  if (!fs.existsSync(dir)) {
    return;
  }

  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(full, lang);
    } else if (entry.name.endsWith(".html")) {
      patchHtml(full, lang);
    }
  }
}

for (const [folder, lang] of LOCALES) {
  patchHtml(path.join(outDir, `${folder}.html`), lang);
  walk(path.join(outDir, folder), lang);
}
