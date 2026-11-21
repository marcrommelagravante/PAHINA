import type { Metadata } from "next";
import { Bodoni_Moda, Instrument_Serif, Manrope } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SiteStructuredData } from "@/components/seo/StructuredData";
import { SITE_INFO } from "@/data/site";
import { getSiteUrl } from "@/lib/siteUrl";

const bodoniModa = Bodoni_Moda({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-bodoni",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-manrope",
  display: "swap",
});

const siteUrl = new URL(getSiteUrl());

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: {
    default: `${SITE_INFO.name} — ${SITE_INFO.descriptor}`,
    template: `%s | ${SITE_INFO.name}`,
  },
  description: `${SITE_INFO.tagline} A boutique neighborhood coffee shop and in-café reading room for slow mornings, good pours, and curious minds.`,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    siteName: `${SITE_INFO.name} — ${SITE_INFO.descriptor}`,
    title: `${SITE_INFO.name} — ${SITE_INFO.descriptor}`,
    description: `${SITE_INFO.tagline} ${SITE_INFO.supportingLines.curiousMinds}`,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_INFO.name} — ${SITE_INFO.descriptor}`,
    description: `${SITE_INFO.tagline} ${SITE_INFO.supportingLines.curiousMinds}`,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${bodoniModa.variable} ${instrumentSerif.variable} ${manrope.variable}`}
    >
      <body className="min-h-screen flex flex-col bg-paper text-ink antialiased">
        <SiteStructuredData />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-md focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-paper"
        >
          Skip to main content
        </a>
        <Navbar />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
