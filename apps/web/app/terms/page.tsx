import Link from "next/link";
import { ROOT_REDIRECT_SCRIPT } from "@/i18n/root-redirect";

export default function TermsRedirectPage() {
  return (
    <main id="main" className="page-shell" style={{ padding: "4rem 0 6rem" }}>
      <script
        dangerouslySetInnerHTML={{
          __html: ROOT_REDIRECT_SCRIPT.replace(
            "location.replace(next);",
            'location.replace(next + "/terms");',
          ),
        }}
      />
      <noscript>
        <p className="prose">
          <Link href="/en/terms">Terms</Link>
          <span aria-hidden="true"> · </span>
          <Link href="/zh-cn/terms">服务条款</Link>
        </p>
      </noscript>
    </main>
  );
}
