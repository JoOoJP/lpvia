import { siteUrl } from "./site";

// O catálogo do design system fica de fora porque é noindex.
export default function sitemap() {
  const lastModified = new Date();

  return [
    {
      url: siteUrl,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
      alternates: {
        languages: {
          "pt-BR": siteUrl,
          en: `${siteUrl}/en`,
        },
      },
    },
    {
      url: `${siteUrl}/en`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
      alternates: {
        languages: {
          "pt-BR": siteUrl,
          en: `${siteUrl}/en`,
        },
      },
    },
  ];
}
