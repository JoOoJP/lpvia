import { buildWhatsappUrl, phoneE164 } from "./contact";
import { Hero } from "./sections/hero";
import { Capabilities } from "./sections/capabilities";
import { FinalCta } from "./sections/final-cta";
import {
  Faq,
  HowItWorks,
  Method,
  Pain,
  Partners,
  Results,
} from "./sections/persuasion";
import { SiteFooter } from "./sections/site-footer";
import { SiteHeader } from "./sections/site-header";
import { System } from "./sections/system";
import { siteUrl } from "./site";

// Só o que o site afirma de fato: nome, endereço, marca e o canal de contato
// que os botões usam. Sem perfis sociais ou endereço inventados.
function buildOrganizationSchema(content) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "VIA",
    alternateName: "VIA Growth Company",
    url: siteUrl,
    logo: `${siteUrl}/icon.svg`,
    image: `${siteUrl}/og-via.jpg`,
    description: content.meta.description,
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      telephone: phoneE164,
      availableLanguage: content.organization.availableLanguage,
    },
  };
}

export function Home({ content }) {
  const whatsappUrl = buildWhatsappUrl(content.contact.whatsappMessage);
  const organizationSchema = buildOrganizationSchema(content);

  return (
    <main className="via-dark-site" id="conteudo-principal">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <SiteHeader content={content.header} whatsappUrl={whatsappUrl} />
      <Hero
        content={content.hero}
        coverflowContent={content.coverflow}
        projects={content.caseProjects}
        whatsappUrl={whatsappUrl}
      />
      {/* O roteiro de convencimento só existe em pt.js; o site em inglês segue
          com hero, serviços, case e contato. */}
      {content.pain ? <Pain content={content.pain} /> : null}
      {content.method ? <Method content={content.method} /> : null}
      {content.results ? <Results content={content.results} /> : null}
      <System content={content.system} />
      <Capabilities content={content.capabilities} />
      {content.partners ? <Partners content={content.partners} /> : null}
      {content.howItWorks ? <HowItWorks content={content.howItWorks} /> : null}
      {content.faq ? <Faq content={content.faq} /> : null}
      <FinalCta content={content.finalCta} whatsappUrl={whatsappUrl} />
      <SiteFooter content={content.footer} whatsappUrl={whatsappUrl} />
    </main>
  );
}
