import { siteUrl } from "./site";

export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/design-system", "/b"],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
