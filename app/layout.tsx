import type { Metadata } from "next";
import { Inter, Inter_Tight } from "next/font/google";
import { NavBar } from "@/components/layout/NavBar";
import { Footer } from "@/components/layout/Footer";
import { ConsultantWidget } from "@/components/consultant/ConsultantWidget";
import { contactEmail, siteUrl, socialLinks } from "@/lib/site";
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
  metadataBase: new URL(siteUrl),
  title: {
    default:
      "Corewell Systems — Business Software That Solves Real Operational Problems",
    template: "%s — Corewell Systems",
  },
  description:
    "We design and build business software that solves real operational problems — healthcare, hospitality, education, retail, and custom enterprise systems.",
  openGraph: {
    siteName: "Corewell Systems",
    type: "website",
  },
};

// Organization schema on every page — spec Section 9. sameAs waits on the
// owner's social links.
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Corewell Systems",
  url: siteUrl,
  email: contactEmail,
  logo: `${siteUrl}/icon.png`,
  sameAs: socialLinks.map((social) => social.href),
  description:
    "Software design and engineering company building operational systems for healthcare, hospitality, education, and retail businesses across Canada, the United States, Australia, and Pakistan.",
};

const plausibleDomain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${interTight.variable}`}>
      <body className="flex min-h-screen flex-col font-sans">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
        {plausibleDomain && (
          <script
            defer
            data-domain={plausibleDomain}
            src="https://plausible.io/js/script.js"
          />
        )}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-accent focus:px-5 focus:py-2.5 focus:text-sm focus:font-medium focus:text-white"
        >
          Skip to content
        </a>
        <NavBar />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        <ConsultantWidget />
      </body>
    </html>
  );
}
