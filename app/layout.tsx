import type { Metadata } from "next";
import { Inter, Inter_Tight } from "next/font/google";
import { NavBar } from "@/components/layout/NavBar";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

// Two typefaces max (spec Section 4): Inter Tight for headings, Inter for body.
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const interTight = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "KodeSparc — Business Software That Solves Real Operational Problems",
    template: "%s — KodeSparc",
  },
  description:
    "We design and build business software that solves real operational problems — healthcare, hospitality, education, retail, and custom enterprise systems.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${interTight.variable}`}>
      <body className="flex min-h-screen flex-col font-sans">
        <NavBar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
