import type { Metadata, Viewport } from "next";
import { Archivo_Narrow, Newsreader, Source_Sans_3 } from "next/font/google";
import { site } from "@/config/site";
import { seo } from "@/config/copy";
import { JsonLd } from "@/components/seo/JsonLd";
import { LandingProvider } from "@/components/providers/LandingProvider";
import "./globals.css";

const display = Archivo_Narrow({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700"],
  display: "swap",
});

const serif = Newsreader({
  subsets: ["latin"],
  variable: "--font-serif",
  style: ["normal", "italic"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const body = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const metadataBase = site.domain
  ? new URL(`https://${site.domain}`)
  : new URL("https://nicolas-rivera.local");

export const metadata: Metadata = {
  metadataBase,
  title: {
    default: seo.title,
    template: `%s · ${site.brandName}`,
  },
  description: seo.description,
  keywords: [...seo.keywords],
  authors: [{ name: site.fullName }],
  creator: site.fullName,
  openGraph: {
    type: "website",
    locale: "fr_CH",
    title: seo.title,
    description: seo.description,
    siteName: site.brandName,
  },
  twitter: {
    card: "summary_large_image",
    title: seo.title,
    description: seo.description,
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: "#F4F1E8",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="fr-CH"
      className={`${display.variable} ${serif.variable} ${body.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-ivory text-ink">
        <JsonLd />
        <LandingProvider>{children}</LandingProvider>
      </body>
    </html>
  );
}
