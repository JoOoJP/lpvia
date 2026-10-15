import { pt } from "../../content/pt";
import { PortfolioPage, portfolioMetadata } from "../../portfolio-page";

export const metadata = portfolioMetadata(pt, {
  "pt-BR": "/portfolio",
  en: "/en/portfolio",
  "x-default": "/portfolio",
});

export default function Page() {
  return <PortfolioPage content={pt} />;
}
