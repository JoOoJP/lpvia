import { Libre_Bodoni } from "next/font/google";
import { phoneE164 } from "./contact";
import { HeroB } from "./b/hero-b";
import { Capabilities } from "./sections/capabilities";
import { Cases } from "./sections/cases";
import { FinalCta } from "./sections/final-cta";
import { SiteFooter } from "./sections/site-footer";
import { SiteHeader } from "./sections/site-header";
import { System } from "./sections/system";
import { siteDescription, siteUrl } from "./site";

// Só o que o site afirma de fato: nome, endereço, marca e o canal de contato
// que os botões usam. Sem perfis sociais ou endereço inventados.
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "VIA",
  alternateName: "VIA Growth Company",
  url: siteUrl,
  logo: `${siteUrl}/icon.svg`,
  image: `${siteUrl}/og-via.jpg`,
  description: siteDescription,
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "sales",
    telephone: phoneE164,
    availableLanguage: ["pt-BR"],
  },
};

// A serifada aparece apenas nos nomes dos projetos da primeira dobra. Ela
// reforça a direção de estúdio criativo sem trocar a tipografia funcional do
// restante da landing page.
const libreBodoni = Libre_Bodoni({
  variable: "--font-editorial",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <main
      className={`via-dark-site ${libreBodoni.variable}`}
      id="conteudo-principal"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <SiteHeader />
      <HeroB />
      <Capabilities />
      <System />
      <Cases />
      <FinalCta />
      <SiteFooter />
    </main>
  );
}
