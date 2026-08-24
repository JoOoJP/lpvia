// Endereço público do site, em um lugar só: metadata, sitemap e robots leem
// daqui. A Vercel expõe VERCEL_PROJECT_PRODUCTION_URL sozinha;
// NEXT_PUBLIC_SITE_URL existe para sobrescrever em outra hospedagem.
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

export const siteTitle = "VIA — Estratégia que ganha forma";

export const siteDescription =
  "Estratégia, marca, marketing, comercial e tecnologia conectados para construir negócios em movimento.";
