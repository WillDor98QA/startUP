import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Inter, Geist_Mono } from "next/font/google";
import "./globals.css";
import { BRAND } from "@/lib/site";
import { SmoothScroll } from "@/components/providers/smooth-scroll";
import { Cursor } from "@/components/ui/cursor";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

const instrument = Instrument_Serif({
  variable: "--font-instrument",
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-mono-geist",
  subsets: ["latin"],
  display: "swap",
});

const SITE_URL = "https://kova.studio";
const DESCRIPTION =
  "Kova is the digital transformation partner for growing businesses. We replace spreadsheets, paper, and manual work with affordable custom software, automation, and real-time visibility.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${BRAND.name} — ${BRAND.positioning}`,
    template: `%s · ${BRAND.name}`,
  },
  description: DESCRIPTION,
  keywords: [
    "digital transformation",
    "custom software for small business",
    "process automation",
    "business dashboards",
    "AI for SMEs",
    "systems integration",
    "mobile applications",
    "replace spreadsheets",
  ],
  authors: [{ name: BRAND.legalName }],
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: `${BRAND.name} — ${BRAND.positioning}`,
    description: DESCRIPTION,
    siteName: BRAND.name,
  },
  twitter: {
    card: "summary_large_image",
    title: `${BRAND.name} — ${BRAND.positioning}`,
    description: DESCRIPTION,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#f3eee3",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${instrument.variable} ${inter.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <body suppressHydrationWarning>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-forest focus:px-5 focus:py-2.5 focus:text-sm focus:text-cream"
        >
          Skip to content
        </a>
        <Cursor />
        <SmoothScroll>
          <Navbar />
          <main id="main">{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
