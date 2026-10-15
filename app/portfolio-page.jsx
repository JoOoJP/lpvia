import Image from "next/image";
import { buildWhatsappUrl } from "./contact";
import { FinalCta } from "./sections/final-cta";
import { PortfolioGallery } from "./sections/portfolio-gallery";
import { SiteFooter } from "./sections/site-footer";
import { SiteHeader } from "./sections/site-header";
import styles from "./portfolio-page.module.css";

// O openGraph da página substitui o do layout por inteiro, então a imagem
// social precisa ser declarada de novo aqui.
export function portfolioMetadata(content, languages) {
  const { title, description } = content.portfolio.meta;

  return {
    title,
    description,
    alternates: { canonical: content.portfolio.path, languages },
    openGraph: {
      title,
      description,
      type: "website",
      images: [
        {
          url: "/og-via.jpg",
          width: 1200,
          height: 630,
          type: "image/jpeg",
          alt: content.meta.ogImageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/og-via.jpg"],
    },
  };
}

export function PortfolioPage({ content }) {
  const { portfolio } = content;
  const { about } = portfolio;
  const whatsappUrl = buildWhatsappUrl(content.contact.whatsappMessage);
  const header = {
    ...content.header,
    langSwitch: { ...content.header.langSwitch, href: portfolio.langHref },
  };

  return (
    <main className="via-dark-site" id="conteudo-principal">
      <SiteHeader
        content={header}
        whatsappUrl={whatsappUrl}
        pageBase={content.path}
        localAnchors={["contato"]}
        currentPage="portfolio"
      />

      <section
        className={`${styles.intro} section`}
        id="inicio"
        aria-labelledby="sobre-titulo"
      >
        <div className={styles.portrait}>
          <Image
            src={about.image.src}
            alt={about.image.alt}
            width={about.image.width}
            height={about.image.height}
            sizes="(max-width: 760px) 100vw, 40vw"
            priority
          />
        </div>
        <div className={styles.aboutCopy}>
          <p className="dark-kicker">{about.kicker}</p>
          <h1 id="sobre-titulo">
            {about.titleLead}
            <span>{about.titleHighlight}</span>
          </h1>
          {about.paragraphs.map((paragraph) => (
            <p className={styles.lead} key={paragraph}>
              {paragraph}
            </p>
          ))}
        </div>
      </section>

      <PortfolioGallery content={portfolio.gallery} items={portfolio.items}>
        <header className={styles.galleryHeader}>
          <p className="dark-kicker">{portfolio.kicker}</p>
          <h2>
            {portfolio.titleLead}
            <span>{portfolio.titleHighlight}</span>
          </h2>
          <p className={styles.lead}>{portfolio.description}</p>
        </header>
      </PortfolioGallery>

      <FinalCta content={content.finalCta} whatsappUrl={whatsappUrl} />
      <SiteFooter content={content.footer} whatsappUrl={whatsappUrl} />
    </main>
  );
}
