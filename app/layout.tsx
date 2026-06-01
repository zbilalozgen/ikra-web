import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import { cn } from "@/lib/utils";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://ikra-web.vercel.app"
  ),
  title: {
    default: "İkra — Quran Verses & Sahih Hadith Widget App",
    template: "%s — İkra",
  },
  description:
    "Authentic verses and Sahih hadith, refreshed throughout the day — quietly present on your home and lock screens.",
  applicationName: "İkra",
  openGraph: {
    title: "İkra — Quran Verses & Sahih Hadith Widget App",
    description:
      "Authentic verses and Sahih hadith, refreshed throughout the day — quietly present on your home and lock screens.",
    type: "website",
    siteName: "İkra",
    locale: "en_US",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "İkra — Quran Verses & Sahih Hadith Widget App",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "İkra — Quran Verses & Sahih Hadith Widget App",
    description:
      "Authentic verses and Sahih hadith, refreshed throughout the day — quietly present on your home and lock screens.",
    images: ["/opengraph-image"],
  },
};

export const viewport: Viewport = {
  themeColor: "#006B3F",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-cream text-navy-800 font-sans antialiased min-h-screen flex flex-col">
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
