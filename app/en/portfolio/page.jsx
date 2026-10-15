import { en } from "../../content/en";
import { PortfolioPage, portfolioMetadata } from "../../portfolio-page";

export const metadata = portfolioMetadata(en, {
  "pt-BR": "/portfolio",
  en: "/en/portfolio",
  "x-default": "/portfolio",
});

export default function Page() {
  return <PortfolioPage content={en} />;
}
