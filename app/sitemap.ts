import type { MetadataRoute } from "next";
import { getCaseStudies, getInsights } from "@/lib/content";
import { demoIndustries, industries } from "@/lib/industries";
import { siteUrl } from "@/lib/site";
import { solutions } from "@/lib/solutions";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/industries",
    "/solutions",
    "/how-we-work",
    "/technology",
    "/case-studies",
    "/insights",
    // "/pricing" withheld from the sitemap while the page is unpublished.
    "/about",
    "/book-consultation",
  ];

  const routes: string[] = [
    ...staticRoutes,
    ...industries.map((i) => `/industries/${i.slug}`),
    ...demoIndustries.map((i) => `/industries/${i.slug}/demo`),
    ...solutions.map((s) => `/solutions/${s.slug}`),
    ...getInsights().map((a) => `/insights/${a.slug}`),
    ...getCaseStudies().map((c) => `/case-studies/${c.slug}`),
  ];

  return routes.map((route) => ({
    url: `${siteUrl}${route}`,
    changeFrequency: route.startsWith("/insights") ? "weekly" : "monthly",
    priority: route === "" ? 1 : route === "/book-consultation" ? 0.9 : 0.7,
  }));
}
