import { describe, expect, it } from "vitest";

const PAPER = "#f3f0e9";
const PAPER_DEEP = "#e8e1d5";

const TEXT = {
  ink: "#25231f",
  "ink-soft": "#5c5851",
  "sage-ink": "#53604f",
  "clay-ink": "#87513d",
  "sound-ink": "#4f626d",
} as const;

function luminance(hex: string) {
  const rgb = [0, 1, 2].map((index) => {
    const channel = Number.parseInt(hex.slice(1 + index * 2, 3 + index * 2), 16) / 255;
    return channel <= 0.03928
      ? channel / 12.92
      : ((channel + 0.055) / 1.055) ** 2.4;
  });

  return 0.2126 * (rgb[0] ?? 0) + 0.7152 * (rgb[1] ?? 0) + 0.0722 * (rgb[2] ?? 0);
}

function contrast(foreground: string, background: string) {
  const first = luminance(foreground);
  const second = luminance(background);
  const lighter = Math.max(first, second);
  const darker = Math.min(first, second);
  return (lighter + 0.05) / (darker + 0.05);
}

describe("homepage text color contrast", () => {
  for (const [name, hex] of Object.entries(TEXT)) {
    it(`keeps ${name} at least 4.5:1 on both paper grounds`, () => {
      expect(contrast(hex, PAPER)).toBeGreaterThanOrEqual(4.5);
      expect(contrast(hex, PAPER_DEEP)).toBeGreaterThanOrEqual(4.5);
    });
  }
});
