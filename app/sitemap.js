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

  // /tech é só em português: entra sem par de idioma.
  const tech = {
    url: `${siteUrl}/tech`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.6,
  };

  return [
    ...pair("/", "/en", 1),
    ...pair("/portfolio", "/en/portfolio", 0.8),
    tech,
  ];
}
