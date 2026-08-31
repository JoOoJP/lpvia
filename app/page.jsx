import { phoneE164 } from "./contact";
import { Hero } from "./sections/hero";
import { caseProjects } from "./sections/case-projects";
import { Capabilities } from "./sections/capabilities";
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

export default function Home() {
  return (
    <main
      className="via-dark-site"
      id="conteudo-principal"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <SiteHeader />
      <Hero projects={caseProjects} />
      <Capabilities />
      <System />
      <FinalCta />
      <SiteFooter />
    </main>
  );
}
