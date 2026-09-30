import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import LocaleProvider from "@/components/LocaleProvider";
import LanguageToggle from "@/components/LanguageToggle";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BRAND } from "@/lib/data";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  formatDetection: { telephone: false, date: false, email: false, address: false },
  title: `${BRAND.name} — Product Design & Front-End Craft`,
  description:
    "Portfolio of a product designer and front-end builder crafting interfaces, design systems, and case studies for startups and studios.",
  openGraph: {
    title: `${BRAND.name} — Product Design & Front-End Craft`,
    description:
      "Portfolio of a product designer and front-end builder crafting interfaces, design systems, and case studies for startups and studios.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body
        className={`${inter.className} bg-[var(--background)] text-[var(--foreground)] antialiased`}
      >
        <LocaleProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <LanguageToggle />
        </LocaleProvider>
      </body>
    </html>
  );
}