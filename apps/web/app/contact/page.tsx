import Link from "next/link";
import { ROOT_REDIRECT_SCRIPT } from "@/i18n/root-redirect";

export default function ContactRedirectPage() {
  return (
    <main id="main" className="page-shell" style={{ padding: "4rem 0 6rem" }}>
      <script
        dangerouslySetInnerHTML={{
          __html: ROOT_REDIRECT_SCRIPT.replace(
            "location.replace(next);",
            'location.replace(next + "/contact");',
          ),
        }}
      />
      <noscript>
        <p className="prose">
          <Link href="/en/contact">Contact</Link>
          <span aria-hidden="true"> · </span>
          <Link href="/zh-cn/contact">联系</Link>
        </p>
      </noscript>
    </main>
  );
}
