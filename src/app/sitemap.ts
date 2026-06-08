import type { MetadataRoute } from "next";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "https://www.reshamsutra.com");

const routes = [
  "",
  "/about",
  "/programs",
  "/programs/clusters",
  "/programs/solar",
  "/programs/district",
  "/products",
  "/products/machines",
  "/products/items",
  "/products/services",
  "/impact",
  "/contact",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return routes.map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : path.startsWith("/programs") || path.startsWith("/products") ? 0.8 : 0.7,
  }));
}
