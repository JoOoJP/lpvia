import { siteUrl } from "./site";

// Uma página só: o catálogo do design system fica de fora porque é noindex.
export default function sitemap() {
  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
