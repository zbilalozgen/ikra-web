import type { MetadataRoute } from "next";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://ikra-web.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    { url: `${siteUrl}/`, lastModified, changeFrequency: "monthly", priority: 1.0 },
    { url: `${siteUrl}/privacy`, lastModified, changeFrequency: "monthly", priority: 0.7 },
    { url: `${siteUrl}/terms`, lastModified, changeFrequency: "monthly", priority: 0.7 },
    { url: `${siteUrl}/support`, lastModified, changeFrequency: "monthly", priority: 0.7 },
  ];
}
