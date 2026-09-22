import type { Metadata, Viewport } from "next";
import { SITE_NAME, resolveSiteUrl } from "@/lib/site-config";
import { languageAlternates } from "@/i18n/metadata";
import "./globals.css";

const siteUrl = resolveSiteUrl(process.env.NEXT_PUBLIC_SITE_URL);

const LANG_BOOTSTRAP = `(function(){var path=location.pathname.toLowerCase();var lang=path.indexOf("/zh-cn")===0?"zh-CN":"en";document.documentElement.lang=lang;document.documentElement.setAttribute("data-locale",lang);})();`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: SITE_NAME,
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    languages: languageAlternates(),
  },
  icons: {
    icon: "/icon.svg",
    apple: "/apple-touch-icon.svg",
  },
  manifest: "/manifest.webmanifest",
};

export const viewport: Viewport = {
  themeColor: "#f3f0e9",
  colorScheme: "only light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: LANG_BOOTSTRAP }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
