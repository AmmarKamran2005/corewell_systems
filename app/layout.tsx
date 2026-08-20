import type { Metadata, Viewport } from "next";
import { Inter, Inter_Tight } from "next/font/google";
import { NavBar } from "@/components/layout/NavBar";
import { Footer } from "@/components/layout/Footer";
import { ConsultantWidget } from "@/components/consultant/ConsultantWidget";
import { contactEmail, siteUrl, socialLinks } from "@/lib/site";
import "./globals.css";
import { jsonLdScript } from "@/lib/seo";

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
    // Entity class ("custom software development company") sits early on
    // purpose: brand queries for "corewell" surface a large healthcare
    // system, so the snippet has to say what kind of company this is fast.
    default:
      "Corewell Systems | Custom Software Development Company",
    // Pipe, not an em dash: this one line sets the separator in all 31 page
    // titles, every browser tab and every search result. It also reclaims
    // characters against the ~60-char SERP cap.
    template: "%s | Corewell Systems",
  },
  description:
    "Corewell Systems builds custom operational software: clinic and practice management, hotel booking, school systems and retail POS. Try a demo, no signup.",
  keywords: [
    "Corewell Systems",
    "custom software development company",
    "clinic management software",
    "hospital management software",
    "hotel management software",
    "school management system",
    "point of sale software",
    "custom business software",
    "SaaS development",
  ],
  applicationName: "Corewell Systems",
  // No `alternates` here on purpose. App Router metadata is inherited by every
  // child route, so a canonical declared in the layout makes every page claim
  // to be a duplicate of the homepage. Each page declares its own via
  // `canonical()` in lib/seo.ts.
  openGraph: {
    siteName: "Corewell Systems",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
};

// Next 14 moved viewport and themeColor out of `metadata` into their own
// export. `themeColor` tints mobile browser chrome to the canvas colour.
export const viewport: Viewport = {
  themeColor: "#FAF9F6",
};

/**
 * Organization + WebSite schema on every page (spec Section 9).
 *
 * Deliberately verbose on identity. A similarly-named US hospital system
 * dominates the "corewell" entity in search and AI answers, so this block
 * exists to teach the knowledge graph what THIS entity is: a software
 * company, what it knows about, and what it is not affiliated with.
 * `disambiguatingDescription` is the schema.org property built for exactly
 * this situation, and `knowsAbout` gives the topical fingerprint.
 */
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${siteUrl}/#organization`,
  name: "Corewell Systems",
  legalName: "Corewell Systems",
  alternateName: ["Corewell Systems Software", "corewellsystems.com"],
  // Wikidata entity for "software company" — an explicit category signal.
  additionalType: "https://www.wikidata.org/wiki/Q1058914",
  url: siteUrl,
  email: contactEmail,
  logo: `${siteUrl}/icon.png`,
  image: `${siteUrl}/icon.png`,
  sameAs: socialLinks.map((social) => social.href),
  slogan: "We design and build business software that solves real operational problems.",
  description:
    "Corewell Systems is a software design and engineering company that builds custom operational software — clinic and practice management platforms, hotel and booking systems, school management systems, and retail point-of-sale and inventory software.",
  disambiguatingDescription:
    "Corewell Systems is an independent custom software development company. It is not affiliated with, and has no connection to, Corewell Health or any hospital system, health network, or healthcare provider. Corewell Systems builds software for businesses; it does not deliver medical care.",
  areaServed: "Worldwide",
  knowsAbout: [
    "Custom software development",
    "Clinic management software",
    "Practice management systems",
    "Electronic health records",
    "Hospital management software",
    "Physical therapy practice software",
    "Medical billing and insurance claims software",
    "Hotel management software",
    "Property management systems",
    "Online booking platforms",
    "School management systems",
    "Point of sale systems",
    "Inventory management software",
    "SaaS platform development",
    "Multi-tenant software architecture",
    "Mobile app development",
    "AI automation for business operations",
    "Cloud deployment and hosting",
  ],
  serviceType: [
    "Custom Software Development",
    "SaaS Platform Development",
    "Mobile App Development",
    "Cloud Deployment",
    "AI Automation",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "sales",
    email: contactEmail,
    url: `${siteUrl}/book-consultation`,
    availableLanguage: ["English"],
  },
};

const webSiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${siteUrl}/#website`,
  url: siteUrl,
  name: "Corewell Systems",
  alternateName: "Corewell Systems — custom software development",
  description:
    "Custom operational software for clinics, hotels, schools, and retailers — with interactive demos you can open without signing up.",
  publisher: { "@id": `${siteUrl}/#organization` },
  inLanguage: "en",
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
            __html: jsonLdScript(organizationJsonLd),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLdScript(webSiteJsonLd) }}
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
