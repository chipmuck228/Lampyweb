import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main" className="page-shell" style={{ padding: "4rem 0 6rem" }}>
      <h1 className="section-heading">Page not found</h1>
      <p className="prose">
        <Link href="/en">English</Link>
        <span aria-hidden="true"> · </span>
        <Link href="/zh-cn">中文</Link>
      </p>
    </main>
  );
}
