import type { Metadata } from "next";
import Link from "next/link";
import { languageAlternates } from "@/i18n/metadata";
import { ROOT_REDIRECT_SCRIPT } from "@/i18n/root-redirect";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: true,
  },
  alternates: {
    languages: languageAlternates(),
  },
};

export default function RootPage() {
  return (
    <main id="main" className="page-shell" style={{ padding: "4rem 0 6rem" }}>
      <script dangerouslySetInnerHTML={{ __html: ROOT_REDIRECT_SCRIPT }} />
      <noscript>
        <h1 className="section-heading">Lampy</h1>
        <p className="prose">
          <Link href="/en">English</Link>
          <span aria-hidden="true"> · </span>
          <Link href="/zh-cn">中文</Link>
        </p>
      </noscript>
    </main>
  );
}
