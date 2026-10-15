import { siteUrl } from "./site";

// O catálogo do design system fica de fora porque é noindex.
export default function sitemap() {
  const lastModified = new Date();

  const pair = (ptPath, enPath, priority) =>
    [ptPath, enPath].map((path, index) => ({
      url: `${siteUrl}${path === "/" ? "" : path}`,
      lastModified,
      changeFrequency: "monthly",
      priority: index === 0 ? priority : priority - 0.1,
      alternates: {
        languages: {
          "pt-BR": `${siteUrl}${ptPath === "/" ? "" : ptPath}`,
          en: `${siteUrl}${enPath}`,
        },
      },
    }));

  return [...pair("/", "/en", 1), ...pair("/portfolio", "/en/portfolio", 0.8)];
}
