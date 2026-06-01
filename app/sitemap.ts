import type { MetadataRoute } from "next";

const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://ikra-web.vercel.app"
).replace(/\/$/, "");

// Bump this date manually when content changes — do not use new Date()
// which stamps every deploy and causes unnecessary re-crawl signals.
const LAST_MODIFIED = new Date("2026-06-01");

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${siteUrl}/`, lastModified: LAST_MODIFIED, changeFrequency: "monthly", priority: 1.0 },
    { url: `${siteUrl}/privacy`, lastModified: LAST_MODIFIED, changeFrequency: "monthly", priority: 0.7 },
    { url: `${siteUrl}/terms`, lastModified: LAST_MODIFIED, changeFrequency: "monthly", priority: 0.7 },
    { url: `${siteUrl}/support`, lastModified: LAST_MODIFIED, changeFrequency: "monthly", priority: 0.7 },
  ];
}
