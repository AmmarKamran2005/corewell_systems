import type { MetadataRoute } from "next";
import { getCaseStudies, getInsights } from "@/lib/content";
import { demoIndustries, industries } from "@/lib/industries";
import { siteUrl } from "@/lib/site";
import { solutions } from "@/lib/solutions";

/**
 * `lastModified` is the one field Google has said it actually uses;
 * `changeFrequency` and `priority` are largely ignored, so they are gone.
 *
 * Content routes take their date from the MDX frontmatter — `updated` when a
 * file genuinely changed, otherwise `date`. Static routes take the build date,
 * which is honest: a static page changes when the site is rebuilt. Nothing here
 * invents a freshness signal.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const buildDate = new Date();

  const staticRoutes = [
    "",
    "/industries",
    "/solutions",
    "/how-we-work",
    "/technology",
    "/case-studies",
    "/insights",
    "/trade",
    // "/pricing" withheld from the sitemap while the page is unpublished.
    "/about",
    "/book-consultation",
  ];

  const entries: MetadataRoute.Sitemap = [
    ...staticRoutes.map((route) => ({
      url: `${siteUrl}${route}`,
      lastModified: buildDate,
    })),
    ...industries.map((i) => ({
      url: `${siteUrl}/industries/${i.slug}`,
      lastModified: buildDate,
    })),
    ...demoIndustries.map((i) => ({
      url: `${siteUrl}/industries/${i.slug}/demo`,
      lastModified: buildDate,
    })),
    ...solutions.map((s) => ({
      url: `${siteUrl}/solutions/${s.slug}`,
      lastModified: buildDate,
    })),
    ...getInsights().map((a) => ({
      url: `${siteUrl}/insights/${a.slug}`,
      lastModified: new Date(a.updated ?? a.date),
    })),
    ...getCaseStudies().map((c) => ({
      url: `${siteUrl}/case-studies/${c.slug}`,
      lastModified: new Date(c.updated ?? c.date),
    })),
  ];

  return entries;
}
