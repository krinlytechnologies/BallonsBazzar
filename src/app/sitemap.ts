import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/site";

const routes = ["", "/celebrations", "/gallery", "/about", "/contact"];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date(),
  }));
}
